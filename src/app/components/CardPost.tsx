import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CardPostSkeleton from './CardPostSkeleton';
interface Post {
    id: number;
    slug: string;
    title: {
        rendered: string;
    };
    categories: number[];
    yoast_head_json: {
        author: string;
        twitter_misc: {
            'Escrito por': string;
            'Est. tempo de leitura': string;
        };
    };
    excerpt: {
        rendered: string;
    };
    date_gmt: string;
    _embedded?: {
        'wp:featuredmedia'?: [
            {
                source_url: string;
            },
        ];
    };
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

const CardPost: React.FC<CardPostProps> = ({ posts, postsPerPage = 6 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simula o carregamento inicial
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Efeito para sincronizar com a URL na inicialização
    useEffect(() => {
        const url = new URL(window.location.href);
        const pageParam = url.searchParams.get('page');
        if (pageParam) {
            const page = parseInt(pageParam);
            if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
            }
        }
    }, []);

    // Calcula o índice inicial e final dos posts para a página atual
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Calcula o número total de páginas
    const totalPages = Math.ceil(posts.length / postsPerPage);

    // Função para mudar de página
    const paginate = (pageNumber: number) => {
        setIsLoading(true);
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Atualiza a URL com o número da página
        const url = new URL(window.location.href);
        url.searchParams.set('page', pageNumber.toString());
        window.history.pushState({}, '', url);

        // Simula o tempo de carregamento ao mudar de página
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className="w-[65vw] mx-auto">
            {isLoading ? (
                <ul className="flex-row flex-wrap gap-2 justify-center items-start flex">
                    {Array.from({ length: postsPerPage }).map((_, index) => (
                        <CardPostSkeleton key={index} />
                    ))}
                </ul>
            ) : !posts || posts.length === 0 ? (
                <p>Nenhum post encontrado</p>
            ) : (
                <>
                    <ul className="flex-row flex-wrap gap-2 justify-center items-start flex">
                        {currentPosts.map((post) => (
                            <Link key={post.id} href={`/articles/${post.slug}`}>
                                <li className=" flex flex-col gap-2  w-[20vw] p-2 rounded mb-4">
                                    {post._embedded &&
                                        post._embedded['wp:featuredmedia'] &&
                                        post._embedded['wp:featuredmedia'].length > 0 && (
                                            <div className="w-[18vw] mx-auto h-[12vw] relative">
                                                <Image
                                                    src={
                                                        post._embedded['wp:featuredmedia'][0]
                                                            .source_url
                                                    }
                                                    alt={post.title.rendered}
                                                    fill
                                                    className="object-cover rounded-xl"
                                                    sizes="(max-width: 768px) 192px, 192px"
                                                    quality={100}
                                                />
                                            </div>
                                        )}
                                    <div className="text-xs font-medium w-[18vw] mx-auto">
                                        {formatarData(post.date_gmt)} ⋅{' '}
                                        {post.yoast_head_json.author}
                                    </div>
                                    <div className="w-[18vw] font-semibold text-sm mx-auto">
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    post.title.rendered.length > 80
                                                        ? post.title.rendered.substring(0, 80) +
                                                          '...'
                                                        : post.title.rendered +
                                                          (post.title.rendered.length < 80
                                                              ? '&nbsp;'.repeat(
                                                                    80 - post.title.rendered.length,
                                                                )
                                                              : ''),
                                            }}
                                        />
                                    </div>
                                    <div className="w-[18vw] mx-auto text-sm text-justify">
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    post.excerpt.rendered.length > 95
                                                        ? post.excerpt.rendered.substring(0, 95) +
                                                          '...'
                                                        : post.excerpt.rendered +
                                                          (post.excerpt.rendered.length < 95
                                                              ? '</br>'
                                                              : ''),
                                            }}
                                        />
                                    </div>
                                    <div>
                                        {post.categories.map((category) => (
                                            <span
                                                key={category}
                                                className="text-xs border px-3 py-1 rounded-xl font-semibold border-slate-800 text-slate-800"
                                            >
                                                {retornarIdCategoria(category)}
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
