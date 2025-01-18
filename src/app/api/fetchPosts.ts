import { Post } from '../types/interfaces';
import { CategoryId } from '../constants/categories';
import prisma from '@/app/lib/prisma';

export async function fetchPosts() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}?_embed`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();
    console.log('Posts recuperados da API:', posts.length);
    return posts;
}

export const getCategoryId = (categoryName: string): number | undefined => {
    const normalizedName = categoryName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    const categoryMap = {
        destaques: CategoryId.DESTAQUES,
        dicas: CategoryId.DICAS,
        novidades: CategoryId.NOVIDADES,
        promocoes: CategoryId.PROMOCOES,
        review: CategoryId.REVIEW,
        video: CategoryId.VIDEO,
    };

    return categoryMap[normalizedName as keyof typeof categoryMap];
};

export async function fetchSinglePost(slug: string): Promise<Post | null> {
    try {
        const response = await fetch(`/api/posts/${slug}`);
        
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const post = await response.json();
        return post;
    } catch (error) {
        console.error('Erro na fetchSinglePost:', error);
        throw error;
    }
}
