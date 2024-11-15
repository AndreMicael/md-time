'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { fetchPosts } from '@/app/api/fetchPosts';
import CardPost from '@/app/components/CardPost';

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
            <div className="flex w-full">
                <CardPost posts={posts} />
            </div>
        </div>
    );
};

export default Home;
