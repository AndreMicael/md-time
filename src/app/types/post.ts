export interface Post {
    id: number;
    slug: string;
    title: string;
    content: string;
    excerpt: string | null;
    author: {
        name: string;
    };
    publishedAt: Date;
    categories: Array<{ name: string }>;
    featuredImage: string | null;
    featuredImageSizes: any | null;
    readingTime: string | null;
    updatedAt: Date;
    createdAt: Date;
    uagbFeaturedImgSrc: string | null;
} 