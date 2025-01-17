import { useState, useEffect } from 'react';
import { Post } from '../types/interfaces';
import { fetchPosts, getCategoryId } from '../api/fetchPosts';

export function usePosts(category?: string) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPosts = async () => {
            try {
                if (category) {
                    const categoryId = getCategoryId(category);
                    if (!categoryId) {
                        setError('Categoria não encontrada');
                        return;
                    }
                    const data = await fetchPosts(categoryId.toString());
                    setPosts(data);
                } else {
                    const data = await fetchPosts();
                    setPosts(data);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao carregar posts');
            } finally {
                setLoading(false);
            }
        };

        getPosts();
    }, [category]);

    return { posts, loading, error };
} 