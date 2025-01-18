import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ImageSize } from '../types/interfaces';

interface Post {
    id: number;
    slug: string;
    title: string;
    content: string;
    author: {
        name: string;
    };
    publishedAt: string;
    categories: {
        name: string;
    }[];
    featuredImage: string | null;
    readingTime: string;
    updatedAt: string;
    createdAt: string;
    featuredImageSizes: Record<string, ImageSize> | null;
}

interface CardPostProps {
    posts: Post[];
    postsPerPage?: number;
}

const formatarData = (data: string): string => {
    const dataFormatada = new Date(data);
    return dataFormatada.toLocaleDateString('pt-BR', {
        month: 'short',
        day: 'numeric',
        year: '2-digit',
    });
};

const retornarIdCategoria = (id: number): string => {
    switch (id) {
        case 10:
            return 'Destaques';
        case 8:
            return 'Dicas';
        case 17:
            return 'Novidades';
        case 9:
            return 'Promoções';
        case 7:
            return 'Review';
        case 12:
            return 'Video';
        default:
            return 'Categoria desconhecida';
    }
};

const stripHtml = (html: string): string => {
    // Verificação para ambiente client-side
    if (typeof window !== 'undefined') {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }
    // Fallback para server-side
    return html.replace(/<[^>]*>/g, '');
};

const getImageUrlBySize = (post: Post, size: string = 'medium') => {
    if (post.featuredImageSizes) {
        const sizes = post.featuredImageSizes as Record<string, ImageSize>;
        return sizes[size]?.url || post.featuredImage || '/images/default-post.jpg';
    }
    return post.featuredImage || '/images/default-post.jpg';
};

const CardPost: React.FC<CardPostProps> = ({ posts, postsPerPage = 6 }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calcula o índice inicial e final dos posts para a página atual
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Calcula o número total de páginas
    const totalPages = Math.ceil(posts.length / postsPerPage);

    // Função para mudar de página
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-[65vw] h-fit mx-auto flex flex-col items-center align-center justify-center">
            {!posts || posts.length === 0 ? (
                <p className="w-full text-center">Nenhum post encontrado</p>
            ) : (
                <>
                    <ul className="flex flex-row flex-wrap gap-2 justify-start items-start">
                        {currentPosts.map((post) => (
                            <Link
                                key={post.id}
                                href={`${post.categories
                                    .map(cat => retornarIdCategoria(Number(cat.name)))
                                    .join(',')
                                    .toLowerCase()}/articles/${post.slug}`}
                            >
                                <li className="hover:opacity-70 flex flex-col gap-2 w-[20vw] p-2 rounded mb-4">
                                    <div className="w-[300px] mx-auto h-[200px] relative">
                                        <Image
                                            src={getImageUrlBySize(post)}
                                            alt={post.title}
                                            fill
                                            sizes="(max-width: 300px) 100vw, 300px"
                                            className="object-cover rounded-xl"
                                            priority={false}
                                        />
                                    </div>
                                    <div className="text-xs font-medium w-[18vw] mx-auto">
                                        {formatarData(post.publishedAt)} ⋅ {post.author.name}
                                    </div>
                                    <div className="w-[18vw] font-semibold text-sm mx-auto">
                                        {post.title.length > 70
                                            ? post.title.substring(0, 70) + '...'
                                            : post.title}
                                    </div>
                                    <div className="w-[18vw] mx-auto text-sm text-justify">
                                        {typeof post.content === 'string' 
                                            ? (stripHtml(post.content).length > 95
                                                ? stripHtml(post.content).substring(0, 95) + '...'
                                                : stripHtml(post.content))
                                            : ''}
                                    </div>
                                    <div>
                                        {post.categories.map((category, index) => (
                                            <span
                                                key={index}
                                                className="text-xs border px-3 py-1 rounded-xl font-semibold border-slate-800 text-slate-800"
                                            >
                                                {retornarIdCategoria(Number(category.name))}
                                            </span>
                                        ))}
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>

                    {/* Paginação */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-8 mb-4">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded ${
                                    currentPage === 1
                                        ? 'bg-gray-200 text-gray-500'
                                        : 'bg-azul text-white hover:bg-indigo-900'
                                }`}
                            >
                                Anterior
                            </button>

                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => paginate(index + 1)}
                                    className={`px-4 py-2 rounded ${
                                        currentPage === index + 1
                                            ? 'bg-azul text-white'
                                            : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded ${
                                    currentPage === totalPages
                                        ? 'bg-gray-200 text-gray-500'
                                        : 'bg-azul text-white hover:bg-indigo-900'
                                }`}
                            >
                                Próxima
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CardPost;
