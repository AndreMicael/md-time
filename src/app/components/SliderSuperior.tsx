import { fetchSinglePost } from '@/app/api/fetchPosts';
import Image from 'next/image';
import Link from 'next/link';
import NavbarHome from './NavbarHome';
import { useState, useEffect } from 'react';
import { Post } from '../types/interfaces';


interface SliderProps {
    slug: string;
}

const formatarData = (data: string): string => {
    const dataFormatada = new Date(data);
    const meses = [
        'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez',
    ];

    const dia = dataFormatada.getDate();
    const mes = meses[dataFormatada.getMonth()];
    const ano = dataFormatada.getFullYear();

    return `${dia} ${mes}, ${ano}`;
};

const retornarIdCategoria = (id: string): string => {
    switch (id) {
        case '10': return 'Destaques';
        case '8': return 'Dicas';
        case '17': return 'Novidades';
        case '9': return 'Promoções';
        case '7': return 'Review';
        case '12': return 'Video';
        default: return 'Categoria desconhecida';
    }
};

const getImageUrl = (post: any) => {
    if (post.featuredImage) {
        return post.featuredImage;
    }
    return 'https://i0.wp.com/mdtime.com.br/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-10-at-16.06.48.webp?resize=1200%2C675&ssl=1';
};

const stripHtml = (html: string): string => {
    if (typeof window === 'undefined') return html.replace(/<[^>]*>/g, '');
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
};

const SliderSuperior: React.FC<SliderProps> = ({ slug }) => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPost = async () => {
            try {
                const fetchedPost = await fetchSinglePost(slug);
                if (!fetchedPost) {
                    throw new Error('Post não encontrado');
                }
                console.log('Post recebido:', fetchedPost);
                setPost(fetchedPost);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao carregar o post');
                console.error('Detalhes do erro:', err);
            } finally {
                setLoading(false);
            }
        };

        getPost();
    }, [slug]);
    
    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;
    if (!post) return null;

    const imageUrl = getImageUrl(post);
    
    const tempoLeitura = post.readingTime || '5 min';

    return (
        <div className="w-full relative clip-path-bottom-skew">
            {post && (
                <div className="flex z-[4] h-[80vh] bg-red-400 flex-col">
                    <div className="z-[2] w-full absolute top-1 mx-auto text-white">
                        <NavbarHome />
                    </div>
                    <div className="absolute bg-black p-4 rounded-2xl flex bg-opacity-40 flex-col gap-2 bottom-4 text-sm left-[20vw] w-[35vw] z-[2] text-white">
                        <p className="flex gap-2">
                            <span>{post.author ? post.author.name : 'Autor não informado'}</span> •
                            <span>{formatarData(post.date || post.publishedAt)}</span> •
                            <span className="px-2 bg-red-500 rounded-lg font-medium">
                                {post.categories && post.categories[0]
                                    ? retornarIdCategoria(post.categories[0].id.toString())
                                    : 'Categoria não disponível'}
                            </span>
                        </p>

                        <div className="text-2xl font-bold">
                            {post.title ? stripHtml(post.title.rendered) : 'Título não disponível'}
                        </div>
                    
                        <p>
                            {post.excerpt ? stripHtml(post.excerpt.rendered) : ''}
                        </p>

                        <Link
                            key={post.id}
                            href={`/${post.categories && post.categories[0]
                                ? retornarIdCategoria(post.categories[0].id.toString()).toLowerCase()
                                : 'sem-categoria'}/articles/${post.slug}`}
                        >
                            <button className="hover:bg-white hover:bg-opacity-30 transition ease-in-out border-[1.5px] py-1 text-white font-bold rounded-lg px-4 self-start">
                                Ver Mais
                            </button>
                        </Link>
                    </div>
                    <div className="relative w-full h-full">
                        <Image
                            priority={true}
                            layout="fill"
                            src={imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover object-top"
                            quality={100}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-1"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SliderSuperior;