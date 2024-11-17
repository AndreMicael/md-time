'use client';

import React, { use, useEffect, useState } from 'react';
import { fetchSinglePost } from '@/app/api/fetchPosts';

interface Post {
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
}

interface ArticleContentProps {
    slug: string;
}

export default function ArticleContent({ slug }: ArticleContentProps) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPost = async () => {
            try {
                const fetchedPost = await fetchSinglePost(slug);
                if (fetchedPost) {
                    setPost(fetchedPost);
                } else {
                    setError(`Post não encontrado. Slug: ${slug}`);
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
                setError(`Erro ao carregar o post: ${errorMessage}`);

                console.error('Detalhes do erro:', {
                    message: errorMessage,
                    slug: slug,
                    error: err,
                    tipo: 'Erro de parsing JSON - A API retornou HTML ao invés de JSON',
                });

                if (errorMessage.includes('Unexpected token')) {
                    console.warn('Instruções de debug:', [
                        '1. Verifique a URL da API no console do navegador (Network tab)',
                        '2. Abra a URL da API diretamente no navegador para ver a resposta',
                        '3. Confirme se o endpoint está correto no WordPress',
                        '4. Verifique se o post existe no WordPress',
                    ]);

                    console.warn(
                        'Dica: Verifique a chamada para:',
                        `[URL_BASE]/wp-json/wp/v2/posts?slug=${slug}`,
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        getPost();
    }, [slug]);

    if (loading)
        return (
            <div className="container mx-auto">
                <section className="w-[75vw] mx-auto">
                    <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-6 animate-pulse" />

                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-md w-5/6 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-md w-4/6 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse" />
                    </div>
                    <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-6 animate-pulse" />

                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-md w-5/6 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-md w-4/6 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse" />
                    </div>
                    <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-6 animate-pulse" />

                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-md w-5/6 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-md w-4/6 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse" />
                    </div>
                    <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-6 animate-pulse" />

                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-md w-5/6 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-md w-4/6 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse" />
                    </div>
                    <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-6 animate-pulse" />

                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-md w-5/6 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-md w-4/6 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse" />
                    </div>
                    <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-6 animate-pulse" />

                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-md w-5/6 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-md w-4/6 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse" />
                    </div>
                </section>
            </div>
        );
    if (error) return <div>{error}</div>;
    if (!post) return <div>Post não encontrado</div>;

    return (
        <section className="w-[75vw] mx-auto">
            <section className="w-[75vw]  mx-auto">
                <h1
                    className="text-3xl font-bold mb-6"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
            </section>
        </section>
    );
}
