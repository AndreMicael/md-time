'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { fetchPosts } from '@/app/api/fetchPosts';
import CardPost from '@/app/components/CardPost';
import CardPostSkeleton from '../components/CardPostSkeleton';
import Newsletter from '../components/Newsletter';
import SliderSuperior from '../components/SliderSuperior';
import Youtube from '../components/Youtube';

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
                console.log('Posts recebidos:', fetchedPosts[0]); // Verifique os dados no console
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
            {posts.length > 0 && posts[0].uagb_featured_image_src?.['2048x2048'] && (
                <SliderSuperior post={posts[0]} />
            )}

            <div className="flex flex-col w-full">
                {/* <Youtube /> */}
                <CardPost posts={posts} />
                <Newsletter />
            </div>
        </div>
    );
};

export default Home;
