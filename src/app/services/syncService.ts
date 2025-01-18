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
                throw new Error('Resposta da API não é um array válido');
            }
            
            for (const post of posts) {
                console.log(`Processando post ID: ${post?.id}`);
                const featuredMediaUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                const contentImages = this.extractImagesFromContent(post.content.rendered);
                
                console.log(`Sincronizando post: ${post.id} - ${post.title.rendered}`);
                
                const result = await prisma.wordPressPost.upsert({
                    where: { id: post.id },
                    update: {
                        title: post.title.rendered,
                        content: post.content.rendered,
                        excerpt: post.excerpt?.rendered,
                        author_name: post.yoast_head_json?.author,
                        published_at: new Date(post.date_gmt),
                        categories: post.categories.map(String),
                        reading_time: post.yoast_head_json?.twitter_misc?.['Est. tempo de leitura'],
                        featured_image: featuredMediaUrl,
                        content_images: contentImages,
                        uagb_featured_image_src: post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes || {},
                    },
                    create: {
                        id: post.id,
                        slug: post.slug,
                        title: post.title.rendered,
                        content: post.content.rendered,
                        excerpt: post.excerpt?.rendered,
                        author_name: post.yoast_head_json?.author,
                        published_at: new Date(post.date_gmt),
                        categories: post.categories.map(String),
                        reading_time: post.yoast_head_json?.twitter_misc?.['Est. tempo de leitura'],
                        featured_image: featuredMediaUrl,
                        content_images: contentImages,
                        uagb_featured_image_src: post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes || {},
                    },
                });
                
                console.log(`Post ${post.id} sincronizado com sucesso:`, result);
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
                        publishedAt: new Date(item.snippet.publishedAt),
                        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                    },
                    create: {
                        id: item.id.videoId,
                        title: item.snippet.title,
                        description: item.snippet.description,
                        thumbnailUrl: item.snippet.thumbnails.high.url,
                        publishedAt: new Date(item.snippet.publishedAt),
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
                        published_at: new Date(post.date_gmt),
                        categories: post.categories.map(String),
                        reading_time: post.yoast_head_json?.twitter_misc?.['Est. tempo de leitura'] || '',
                        featured_image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
                        uagb_featured_image_src: post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes || {},
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