'use client';

import React, { useEffect, useState } from 'react';

import { fetchPosts } from '@/app/api/fetchPosts';
import CardPost from '@/app/components/CardPost';
import CardPostSkeleton from '../components/CardPostSkeleton';
import Newsletter from '../components/Newsletter';
import SliderSuperior from '../components/SliderSuperior';
import Navbar from '../components/Navbar';

interface Post {
    id: number;
    title: string;
    slug: string;
    categories: {
        name: string;
    }[];
    featuredImage: string | null;
    publishedAt: string;
    author: {
        name: string;
    };
    readingTime: string;
    content: string;
    excerpt: {
        rendered: string;
    };
    date_gmt: string;
    uagb_featured_image_src: {
        '2048x2048': [string, number, number, boolean];
        full: [string, number, number, boolean];
        large: string;
        medium: string;
        thumbnail: string;
    };
}

interface YouTubeVideo {
    id: string;
    title: string;
}

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const fetchedPosts = await fetchPosts();
                console.log('Posts recebidos:', fetchedPosts); // Verifique os dados no console
                if (!Array.isArray(fetchedPosts)) {
                    throw new Error('Dados inválidos recebidos');
                }
                setPosts(fetchedPosts);
            } catch (err) {
                setError('Erro ao carregar os posts: ' + (err instanceof Error ? err.message : 'Erro desconhecido'));
                console.error('Detalhes do erro:', err);
            } finally {
                setLoading(false);
            }
        };

        getPosts();
    }, []);

    if (loading) {
        return (
            <div className="container w-[65vw] mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="rounded-lg p-4 animate-pulse">
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
            <SliderSuperior slug="lancamento-exclusivo-orient-stock-car-speedtech-mbttc018-f49tt037-e-yn8tt006" /> 

            <div className="flex flex-col w-full">
                 {/* <CardPost posts={posts} />  */}
                <Newsletter />
            </div>
        </div>
    );
};

export default Home;