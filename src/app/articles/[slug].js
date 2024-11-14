import { fetchPosts } from '@/app/api/fetchPosts';
import { useRouter } from 'next/router';

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