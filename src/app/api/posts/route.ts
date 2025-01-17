import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get('categoryId');

        const posts = await prisma.wordPressPost.findMany({
            where: categoryId ? {
                categories: {
                    has: categoryId
                }
            } : undefined,
            orderBy: {
                publishedAt: 'desc'
            }
        });

        const formattedPosts = posts.map(post => ({
            id: post.id,
            slug: post.slug,
            title: post.title,
            content: post.content,
            excerpt: post.excerpt || '',
            author: {
                name: post.authorName || 'Autor Desconhecido'
            },
            publishedAt: post.publishedAt,
            categories: post.categories.map(category => ({ name: category })),
            featuredImage: post.featuredImage,
            readingTime: post.readingTime || '',
            updatedAt: post.updatedAt,
            createdAt: post.createdAt
        }));

        return NextResponse.json(formattedPosts);
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        return NextResponse.json(
            { error: 'Erro interno ao buscar posts' },
            { status: 500 }
        );
    }
} 