'use client';

import CardPost from '../components/CardPost';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { fetchPosts } from '@/app/api/fetchPosts';
import { useParams } from 'next/dist/client/components/navigation';

interface Post {
    id: number;
    title: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    link: string;
    featured_media: number;
}

export default function CategoryPage() {
    const params = useParams();
    const category = params.category as string;
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState<string | null>(null);

    useEffect(() => {
        const getCategoryId = async () => {
            try {
                const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/categories?slug=${category}`;
                console.log('URL da API:', apiUrl);
                console.log('Variável de ambiente NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);

                const response = await fetch(apiUrl);
                console.log('Status da resposta:', response.status);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const text = await response.text();
                console.log('Resposta bruta:', text);
                
                if (!text) {
                    throw new Error('Resposta vazia do servidor');
                }
                
                const categories = JSON.parse(text);
                console.log('Categories parseadas:', categories);
                
                if (categories.length > 0) {
                    setCategoryId(categories[0].id.toString());
                } else {
                    setError('Categoria não encontrada');
                    setLoading(false);
                }
            } catch (err: any) {
                console.error('Erro completo:', err);
                console.error('Mensagem de erro:', err.message);
                setError(`Erro ao carregar a categoria: ${err.message}`);
                setLoading(false);
            }
        };
        getCategoryId();
    }, [category]);

    useEffect(() => {
        const getPosts = async () => {
            if (!categoryId) return;
            try {
                const fetchedPosts = await fetchPosts(categoryId);
                setPosts(fetchedPosts);
            } catch (err) {
                setError('Erro ao carregar os posts');
                console.error('Erro ao carregar os posts', err);
            } finally {
                setLoading(false);
            }
        };
        getPosts();
    }, [categoryId]);

    if (loading) {
        return (
            <main>
                <Navbar />
                <div className="w-full flex justify-center items-center h-[25vw]">
                    Carregando...
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main>
                <Navbar />
                <div className="w-full flex justify-center items-center h-[25vw] text-red-500">
                    {error}
                </div>
            </main>
        );
    }

    return (
        <main>
            <Navbar />
            <div className="w-full">
                <h1 className="text-center font-bold text-lg">
                    {decodeURIComponent(category)}
                </h1>
            </div>
            <CardPost posts={posts} />
        </main>
    );
}
