'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { fetchPosts } from '@/app/api/fetchPosts';
import CardPost from '@/app/components/CardPost';
import CardPostSkeleton from '../components/CardPostSkeleton';
import Newsletter from '../components/Newsletter';

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
            <div className="container w-[65vw] mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Blog</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="  rounded-lg p-4 animate-pulse">
                            <CardPostSkeleton />
                        </div>
                    ))}
                </div>
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
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Blog</h1>
            <div className="flex flex-col w-full">
                <CardPost posts={posts} />
                <Newsletter />
            </div>
        </div>
    );
};

export default Home;
