import { PrismaClient } from '@prisma/client';
import { fetchPosts } from '../api/fetchPosts';

const prisma = new PrismaClient();

export class SyncService {
    // Sincroniza posts do WordPress
    static async syncWordPressPosts() {
        try {
            console.log('Iniciando sincronização...');
            const posts = await fetchPosts();
            console.log(`Encontrados ${posts.length} posts para sincronizar`);
            
            if (!Array.isArray(posts)) {
                console.error('Resposta da API:', posts);
                throw new Error('Resposta da API não é um array válido');
            }
            
            for (const post of posts) {
                try {
                    console.log(`Processando post ID: ${post?.id}`);
                    const featuredMediaUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                    const contentImages = this.extractImagesFromContent(post.content.rendered);
                    
                    console.log(`Sincronizando post: ${post.id} - ${post.title.rendered}`);
                    
                    // Tratamento correto das datas
                    const publishedAt = post.date_gmt ? new Date(post.date_gmt) : null;
                    const validPublishedAt = publishedAt && !isNaN(publishedAt.getTime()) ? publishedAt : null;
                    
                    if (!validPublishedAt) {
                        console.warn(`Post ID ${post.id} tem uma data de publicação inválida.`);
                    }
                    
                    const categories = Array.isArray(post.categories) 
                        ? post.categories
                            .map((cat: any) => cat.name)
                            .filter((name: string | undefined): name is string => name !== undefined)
                        : [];
                    
                    const postId = parseInt(post.id.toString(), 10);
                    if (isNaN(postId)) {
                        throw new Error(`ID inválido para o post: ${post.id}`);
                    }
                    
                    const postData = {
                        title: post.title?.rendered || '',
                        content: post.content?.rendered || '',
                        excerpt: post.excerpt?.rendered || '',
                        author_name: post.yoast_head_json?.author || '',
                        published_at: validPublishedAt,
                        categories: categories || [],
                        reading_time: post.yoast_head_json?.twitter_misc?.['Est. tempo de leitura'] || '',
                        featured_image: featuredMediaUrl,
                        featured_image_sizes: JSON.stringify(post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes || {}),
                        content_images: contentImages,
                        uagb_featured_image_src: post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes || {}
                    };
                    
                    const result = await prisma.wordPressPost.upsert({
                        where: { id: postId },
                        update: postData,
                        create: {
                            id: postId,
                            slug: post.slug || '',
                            ...postData
                        },
                    });
                    
                    console.log(`Post ${post.id} sincronizado com sucesso:`, result);
                } catch (postError) {
                    console.error(`Erro ao processar post ${post?.id}:`, postError);
                    // Continua com o próximo post mesmo se houver erro
                    continue;
                }
            }

            console.log('WordPress posts sincronizados com sucesso!');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            console.error('Erro ao sincronizar posts do WordPress:', errorMessage);
            throw new Error(`Falha na sincronização: ${errorMessage}`);
        }
    }

    // Novo método auxiliar para extrair URLs de imagens do conteúdo
    private static extractImagesFromContent(content: string): string[] {
        const imgRegex = /<img[^>]+src="([^">]+)"/g;
        const images: string[] = [];
        let match;

        while ((match = imgRegex.exec(content)) !== null) {
            images.push(match[1]);
        }

        return images;
    }

    // Sincroniza vídeos do YouTube
    static async syncYouTubeVideos() {
        try {
            const response = await fetch('/api/youtube');
            const data = await response.json();
            
            for (const item of data.items) {
                await prisma.youTubeVideo.upsert({
                    where: { id: item.id.videoId },
                    update: {
                        title: item.snippet.title,
                        description: item.snippet.description,
                        thumbnailUrl: item.snippet.thumbnails.high.url,
                        publishedAt: typeof item.snippet.publishedAt === 'string' ? item.snippet.publishedAt : new Date(item.snippet.publishedAt).toISOString() || null,
                        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                    },
                    create: {
                        id: item.id.videoId,
                        title: item.snippet.title,
                        description: item.snippet.description,
                        thumbnailUrl: item.snippet.thumbnails.high.url,
                        publishedAt: typeof item.snippet.publishedAt === 'string' ? item.snippet.publishedAt : new Date(item.snippet.publishedAt).toISOString() || null,
                        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                    },
                });
            }

            console.log('Vídeos do YouTube sincronizados com sucesso!');
        } catch (error) {
            console.error('Erro ao sincronizar vídeos do YouTube:', error);
            throw error;
        }
    }

    static async testDatabaseConnection() {
        try {
            const count = await prisma.wordPressPost.count();
            console.log('Número de posts no banco:', count);
            return true;
        } catch (error) {
            console.error('Erro ao conectar com o banco:', error);
            return false;
        }
    }

    static async testSync() {
        try {
            // Testa conexão com o banco
            await this.testDatabaseConnection();
            
            // Testa busca de posts
            const posts = await fetchPosts();
            console.log('Posts encontrados:', posts.length);
            
            // Tenta sincronizar um post específico
            if (posts.length > 0) {
                const post = posts[0];
                const result = await prisma.wordPressPost.create({
                    data: {
                        id: post.id,
                        slug: post.slug,
                        title: post.title.rendered,
                        content: post.content.rendered,
                        excerpt: post.excerpt?.rendered || '',
                        author_name: post.yoast_head_json?.author || '',
                        published_at: new Date(post.date_gmt) || null,
                        categories: post.categories.map((cat: any) => cat.name).filter((name: string | undefined): name is string => name !== undefined),
                        reading_time: post.yoast_head_json?.twitter_misc?.['Est. tempo de leitura'] || '',
                        featured_image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
                        featured_image_sizes: JSON.stringify(post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes || {}),
                        uagb_featured_image_src: JSON.stringify(post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes || {}),
                        content_images: [],
                    },
                });
                console.log('Post de teste criado:', result);
            }
        } catch (error) {
            console.error('Erro no teste de sincronização:', error);
            throw error;
        }
    }
}