import Image from 'next/image';

interface SliderProps {
    post: {
        id: number;
        title: {
            rendered: string;
        };
        uagb_featured_image_src: {
            '2048x2048': [string, number, number, boolean];
        };
        date_gmt: string;
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
    return dataFormatada.toLocaleDateString('pt-BR', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

const SliderSuperior: React.FC<SliderProps> = ({ post }) => {
    const imageUrl = post.uagb_featured_image_src['2048x2048'][0];

    // Verifique se o URL da imagem está correto
    console.log(imageUrl);

    return (
        <div className="w-full h-[60vh] relative">
            {post && imageUrl && (
                <div>
                    <div className="absolute z-[2] text-white">
                        <h1>{post.title.rendered}</h1>
                        <p>
                            {post.yoast_head_json.twitter_misc['Escrito por']} |
                            {formatarData(post.date_gmt)}
                        </p>
                    </div>{' '}
                    <Image
                        src={imageUrl}
                        alt={post.title.rendered}
                        layout="fill"
                        className="object-cover object-center"
                        quality={100}
                    />
                </div>
            )}
        </div>
    );
};

export default SliderSuperior;
