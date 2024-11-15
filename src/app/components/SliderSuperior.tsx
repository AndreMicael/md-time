import Image from 'next/image';
import Link from 'next/link';

interface SliderProps {
    post: {
        id: number;
        title: {
            rendered: string;
        };
        slug: string;
        categories: number[];
        uagb_featured_image_src: {
            '2048x2048': [string, number, number, boolean];
        };
        date_gmt: string;
        excerpt: {
            rendered: string;
        };
        yoast_head_json: {
            author: string;
            twitter_misc: {
                'Escrito por': string;
                'Est. tempo de leitura': string;
            };
        };
    };
}
const formatarData = (data: string): string => {
    const dataFormatada = new Date(data);
    const meses = [
        'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
        'jul', 'ago', 'set', 'out', 'nov', 'dez'
    ];
    
    const dia = dataFormatada.getDate();
    const mes = meses[dataFormatada.getMonth()];
    const ano = dataFormatada.getFullYear();
    
    return `${dia} ${mes}, ${ano}`;
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

const SliderSuperior: React.FC<SliderProps> = ({ post }) => {
    const imageUrl = post.uagb_featured_image_src['2048x2048'][0];

    // Verifique se o URL da imagem está correto
    console.log(imageUrl);

    return (
        <div className="w-full h-[80vh] relative clip-path-bottom-skew">
            {post && imageUrl && (
                <div className="flex z-[4] h-[80vh] bg-red-400 flex-col">
                    <div className="z-[2] absolute top-1 text-white"> Navbar </div>
                    <div className="absolute bg-black p-4 rounded-2xl flex bg-opacity-40 flex-col gap-2 bottom-16 text-sm left-[20vw]  w-[35vw] z-[2] text-white">
                        <h1
                            className="font-bold text-lg"
                            dangerouslySetInnerHTML={{
                                __html: post.title.rendered,
                            }}
                        />
                        <p className="flex gap-2">
                            <span>{post.yoast_head_json.twitter_misc['Escrito por']}</span> •
                            <span>{formatarData(post.date_gmt)}</span> •{' '}
                            <span className="px-2 bg-red-500 rounded-lg  font-medium">
                                {' '}
                                {retornarIdCategoria(post.categories[0])}
                            </span>
                        </p>
                        <p>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html:
                                        post.excerpt.rendered.length > 500
                                            ? post.excerpt.rendered.substring(0, 500) + '...'
                                            : post.excerpt.rendered +
                                              (post.excerpt.rendered.length < 95 ? '</br>' : ''),
                                }}
                            />
                        </p>
                        <Link key={post.id} href={`/articles/${post.slug}`}>
                            <button className="border hover:bg-white hover:bg-opacity-30 transition ease-in-out border-[1.5px] py-1 text-white font-bold rounded-lg px-4 self-start">
                                Ver Mais
                            </button>
                        </Link>
                    </div>
                    <div className="relative w-full h-full">
                        <Image
                            src={imageUrl}
                            alt={post.title.rendered}
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
