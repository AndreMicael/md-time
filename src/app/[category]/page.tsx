'use client';

import CardPost from '../components/CardPost';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { fetchPosts } from '@/app/api/fetchPosts';
import { getCategoryId } from '@/app/api/fetchPosts';
import CardPostSkeleton from '@/app/components/CardPostSkeleton';
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
    uagb_featured_image_src: {
        '2048x2048': [string, number, number, boolean];
        full: [string, number, number, boolean];
        large: string;
        medium: string;
        thumbnail: string;
    };
}

interface ApiError {
    message: string;
    status?: number;
}

export default function CategoryPage({ params }: { params: { category: string } }) {
    const category = params.category;

    const formatarCategoria = (categoria: string) => {
        if (categoria === 'video') {
            return 'Vídeos';
        } else if (categoria === 'review') {
            return 'Reviews';
        } else if (categoria === 'dicas') {
            return 'Dicas';
        } else if (categoria === 'promocoes') {
            return 'Promoções';
        } else {
            return 'Início';
        }
    };
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPosts = async () => {
            console.log('Iniciando getPosts para categoria:', category);
            try {
                const categoryId = await getCategoryId(category);
                console.log('CategoryId obtido:', categoryId);

                if (!categoryId) {
                    setError('Categoria não encontrada');
                    return;
                }

                const fetchedPosts = await fetchPosts(categoryId.toString());
                console.log('Posts obtidos:', fetchedPosts);
                setPosts(fetchedPosts as unknown as Post[]);
            } catch (err: unknown) {
                console.error('Erro detalhado:', err);
                setError('Erro ao carregar os posts');
            } finally {
                setLoading(false);
            }
        };
        getPosts();
    }, [category]);

    if (loading) {
        return (
            <main>
                <Navbar />
                <div className="w-full flex justify-center items-center h-screen">
                    <div className="container w-[65vw] mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="  rounded-lg p-4 animate-pulse">
                                    <CardPostSkeleton />
                                </div>
                            ))}
                        </div>
                    </div>
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
                <h1 className="text-center font-bold text-lg capitalize">
                    {category ? formatarCategoria(category) : ''}
                </h1>
            </div>
            {loading && (
                <div>
                    {' '}
                    <div className="container w-[65vw] mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="  rounded-lg p-4 animate-pulse">
                                    <CardPostSkeleton />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <div className="   w-full h-full flex flex-col align-center">
                {' '}
                <div className=" ">
                    {' '}
                    <CardPost posts={posts} />
                </div>
            </div>

            <Newsletter />
        </main>
    );
}
