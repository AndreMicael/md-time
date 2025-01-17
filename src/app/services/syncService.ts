import { PrismaClient } from '@prisma/client';
import { fetchPosts } from '../api/fetchPosts';

const prisma = new PrismaClient();

export class SyncService {
    // Sincroniza posts do WordPress
    static async syncWordPressPosts() {
        try {
            const posts = await fetchPosts();
            
            for (const post of posts) {
                await prisma.wordPressPost.upsert({
                    where: { id: post.id },
                    update: {
                        title: post.title.rendered,
                        content: post.content.rendered,
                        excerpt: post.excerpt?.rendered,
                        authorName: post.yoast_head_json?.author,
                        publishedAt: new Date(post.date_gmt),
                        categories: post.categories.map(String),
                        readingTime: post.yoast_head_json?.twitter_misc?.['Est. tempo de leitura'],
                        // Adicione outros campos conforme necessário
                    },
                    create: {
                        id: post.id,
                        slug: post.slug,
                        title: post.title.rendered,
                        content: post.content.rendered,
                        excerpt: post.excerpt?.rendered,
                        authorName: post.yoast_head_json?.author,
                        publishedAt: new Date(post.date_gmt),
                        categories: post.categories.map(String),
                        readingTime: post.yoast_head_json?.twitter_misc?.['Est. tempo de leitura'],
                        // Adicione outros campos conforme necessário
                    },
                });
            }

            console.log('WordPress posts sincronizados com sucesso!');
        } catch (error) {
            console.error('Erro ao sincronizar posts do WordPress:', error);
            throw error;
        }
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
} 