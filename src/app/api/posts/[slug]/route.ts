import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const post = await prisma.wordPressPost.findUnique({
            where: {
                slug: params.slug
            }
        });

        if (!post) {
            return NextResponse.json(
                { error: 'Post não encontrado' },
                { status: 404 }
            );
        }

        const formattedPost = {
            id: post.id,
            slug: post.slug,
            title: post.title,
            content: post.content,
            excerpt: post.excerpt || '',
            author: {
                name: post.authorName || 'Autor Desconhecido'
            },
            publishedAt: post.publishedAt,
            categories: post.categories.map((category: string) => ({ name: category })),
            featuredImage: post.featuredImage,
            readingTime: post.readingTime || '',
            updatedAt: post.updatedAt,
            createdAt: post.createdAt
        };

        return NextResponse.json(formattedPost);
    } catch (error) {
        console.error('Erro ao buscar post:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
} 