import Image from 'next/image';
import Link from 'next/link';
import NavbarHome from './NavbarHome';

interface SliderProps {
    slug: string;
    posts: {
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
    }[];
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
    return '/imagem-padrao.jpg';
};

const SliderSuperior: React.FC<SliderProps> = ({ slug, posts }) => {
    const post = posts.find(post => post.slug === slug);
    if (!post) return null;

    const imageUrl = getImageUrl(post);
    
    const autorPost = post.author?.name || 'Autor não informado';
    const tempoLeitura = post.readingTime || '5 min';
    
    const removerTagsHTML = (texto: string) => {
        return texto.replace(/<[^>]*>/g, '');
    };

    return (
        <div className="w-full relative clip-path-bottom-skew">
            {post && (
                <div className="flex z-[4] h-[80vh] bg-red-400 flex-col">
                    <div className="z-[2] w-full absolute top-1 mx-auto text-white">
                        <NavbarHome />
                    </div>
                    <div className="absolute bg-black p-4 rounded-2xl flex bg-opacity-40 flex-col gap-2 bottom-4 text-sm left-[20vw] w-[35vw] z-[2] text-white">
                        <h1 className="font-bold text-lg">
                            {post.title}
                        </h1>
                        <p className="flex gap-2">
                            <span>{autorPost}</span> •
                            <span>{formatarData(post.publishedAt)}</span> •
                            <span className="px-2 bg-red-500 rounded-lg font-medium">
                                {retornarIdCategoria(post.categories[0].name)}
                            </span>
                        </p>
                        <p>
                            {removerTagsHTML(post.content).length > 500 
                                ? removerTagsHTML(post.content).substring(0, 500) + '...' 
                                : removerTagsHTML(post.content)}
                        </p>
                        <Link
                            key={post.id}
                            href={`${post.categories.map(cat => retornarIdCategoria(cat.name)).join(',').toLowerCase()}/articles/${post.slug}`}
                        >
                            <button className="  hover:bg-white hover:bg-opacity-30 transition ease-in-out border-[1.5px] py-1 text-white font-bold rounded-lg px-4 self-start">
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