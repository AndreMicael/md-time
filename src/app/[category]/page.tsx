'use client';

import CardPost from '../components/CardPost';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { fetchPosts } from '@/app/api/fetchPosts';

interface Post {
    id: number;
    slug: string;
    title: {
        rendered: string;
    };
    categories: any;
    yoast_head_json: any;
    excerpt: any;
    date_gmt: string;
    uagb_featured_image_src: {
        '2048x2048': [string, number, number, boolean];
        full: [string, number, number, boolean];
        large: string;
        medium: string;
        thumbnail: string;
    };
}

export default function CategoryPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const fetchedPosts = await fetchPosts();
                console.log('Posts recebidos:', fetchedPosts[0]); // Verifique os dados no console
                setPosts(fetchedPosts);
            } catch (err) {
                setError('Erro ao carregar os posts');
                console.error('Erro ao carregar os posts', err);
            } finally {
                setLoading(false);
            }
        };
        getPosts();
    }, []);

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
                <h1 className="text-center font-bold text-lg">Categoria</h1>
            </div>
            <CardPost posts={posts} />
        </main>
    );
}
