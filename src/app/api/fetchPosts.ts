import { Post } from '../types/interfaces';
import { CategoryId } from '../constants/categories';
import prisma from '@/app/lib/prisma';
export async function fetchPosts() {
    
    const apiUrl = process.env.WORDPRESS_API_URL || 'https://mdtime.com.br/wp-json/wp/v2/posts?_embed';
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Erro ao buscar posts: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar posts do WordPress:', error);
        throw error;
    }
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
