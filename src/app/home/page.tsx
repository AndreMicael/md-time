'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from '@/app/components/Footer';
import { fetchPosts } from '@/app/api/fetchPosts';

interface Post {
    id: number;
    slug: string;
    title: {
        rendered: string;
    };
}

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const fetchedPosts = await fetchPosts();
                setPosts(fetchedPosts);
            } catch (err) {
                setError('Erro ao carregar os posts');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Carregando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Blog</h1>
            {!posts || posts.length === 0 ? (
                <p>Nenhum post encontrado</p>
            ) : (
                <ul className="space-y-4">
                    {posts.map((post) => (
                        <li key={post.id} className="hover:bg-gray-100 p-2 rounded">
                            <Link href={`/articles/${post.slug}`}>{post.title.rendered}</Link>
                        </li>
                    ))}
                </ul>
            )}
            <Footer />
        </div>
    );
};

export default Home;
