export interface Post {
    id: number;
    slug: string;
    title: string;
    content: string;
    excerpt: string;
    author: {
        name: string;
    };
    publishedAt: string;
    categories: Array<{ name: string }>;
    featuredImage: string;
    readingTime: string;
    updatedAt: string;
    createdAt: string;
    yoast_head_json?: {
        og_image?: Array<{ url: string }>;
        twitter_misc?: {
            'Escrito por': string;
            'Est. tempo de leitura': string;
        };
    };
    date_gmt: string;
} 