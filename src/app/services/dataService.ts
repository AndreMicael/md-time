import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DataService {
    static async getWordPressPosts(category?: string) {
        const where = category ? {
            categories: {
                has: category
            }
        } : {};

        return prisma.wordPressPost.findMany({
            where,
            orderBy: {
                publishedAt: 'desc'
            }
        });
    }

    static async getYouTubeVideos() {
        return prisma.youTubeVideo.findMany({
            orderBy: {
                publishedAt: 'desc'
            }
        });
    }

    static async getPostBySlug(slug: string) {
        return prisma.wordPressPost.findUnique({
            where: { slug }
        });
    }
} 