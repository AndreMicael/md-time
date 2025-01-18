export interface Post {
    id: number;
    slug: string;
    title: string;
    content: string;
    excerpt: string | null;
    authorName: string | null;
    publishedAt: Date;
    categories: Array<{ name: string }>;
    featuredImage: string | null;
    featuredImageSizes: any | null;
    readingTime: string | null;
    updatedAt: Date;
    createdAt: Date;
    uagbFeaturedImgSrc: string | null;
} 