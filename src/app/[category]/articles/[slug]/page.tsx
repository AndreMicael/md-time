'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchSinglePost } from '@/app/api/fetchPosts';
import Newsletter from '@/app/components/Newsletter';
import Navbar from '@/app/components/Navbar';

interface Post {
    id: number;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
}

export default function ArticlePage() {
    const { slug } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPost = async () => {
            try {
                const fetchedPost = await fetchSinglePost(slug as string);
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
                    slug,
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

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;
    if (!post) return <div>Post não encontrado</div>;

    return (
        <div className="container mx-auto  ">
            <Navbar />
            <section className="w-[75vw] mx-auto">
                <h1
                    className="text-3xl font-bold mb-6"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
            </section>
            <Newsletter />
        </div>
    );
}
