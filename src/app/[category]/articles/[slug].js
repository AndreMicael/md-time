import { fetchPosts } from '@/app/api/fetchPosts';
import { useRouter } from 'next/router';

/**
 * Componente que renderiza um post.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {Object} props.post - O objeto do post a ser renderizado.
 * @param {Object} props.post.title - O título do post.
 * @param {Object} props.post.title.rendered - O título renderizado do post.
 * @param {Object} props.post.content - O conteúdo do post.
 * @param {Object} props.post.content.rendered - O conteúdo renderizado do post.
 * @returns {JSX.Element} O componente de post.
 */
export default function Post({ post }) {
    const router = useRouter();

    if (router.isFallback) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <h1>{post.title.rendered}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
    );
}

export async function getStaticPaths() {
    const posts = await fetchPosts();
    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }));

    return {
        paths,
        fallback: true, // permite ISR
    };
}

export async function getStaticProps({ params }) {
    const posts = await fetchPosts();
    const post = posts.find((p) => p.slug === params.slug);

    return {
        props: { post },
        revalidate: 60,
    };
}