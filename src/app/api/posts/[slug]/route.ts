import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { formatImageSizes } from '@/app/types/interfaces';

export async function GET() {
    try {
        const posts = await prisma.wordPressPost.findMany({
            orderBy: {
                published_at: 'desc'
            }
        });

        if (!posts || posts.length === 0) {
            return NextResponse.json(
                { data: [] },
                { status: 404 }
            );
        }

        const formattedPosts = posts.map(post => ({
            id: post.id || '',
            slug: post.slug || '',
            title: { rendered: post.title || '' },
            content: { rendered: post.content || '' },
            excerpt: { rendered: post.excerpt || '' },
            author: {
                name: post.author_name || 'Autor Desconhecido'
            },
            publishedAt: post.published_at || null,
            categories: post.categories || [],
            featuredImage: post.featured_image || null,
            featuredImageSizes: post.featured_image_sizes ? JSON.parse(post.featured_image_sizes) : null,
            uagbFeaturedImageSrc: post.uagb_featured_image_src 
                ? formatImageSizes(post.uagb_featured_image_src)
                : null,
            readingTime: post.reading_time || '',
            updatedAt: post.updated_at || null,
            createdAt: post.created_at || null,
            contentImages: post.content_images || []
        }));

        return NextResponse.json({ data: formattedPosts });
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor', data: null },
            { status: 500 }
        );
    }
} 