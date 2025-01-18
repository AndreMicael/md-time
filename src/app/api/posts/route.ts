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
                published_at: 'desc'
            }
        });

        const formattedPosts = posts.map(post => ({
            id: post.id,
            slug: post.slug,
            title: { rendered: post.title },
            content: { rendered: post.content },
            excerpt: { rendered: post.excerpt || '' },
            author: {
                name: post.author_name || 'Autor Desconhecido'
            },
            publishedAt: post.published_at,
            categories: post.categories.map(category => ({ name: category })),
            featuredImage: post.featured_image,
            featuredImageSizes: post.featured_image_sizes ? JSON.parse(post.featured_image_sizes) : null,
            uagbFeaturedImageSrc: post.uagb_featured_image_src,
            readingTime: post.reading_time || '',
            updatedAt: post.updated_at,
            createdAt: post.created_at
        }));

        return NextResponse.json({ data: formattedPosts });
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor', data: [] },
            { status: 500 }
        );
    }
} 