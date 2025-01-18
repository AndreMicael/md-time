export interface Post {
    id: number;
    slug: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    author: {
        name: string;
    };
    publishedAt: string;
    categories: Array<{
        name: string;
    }>;
    featuredImage: string;
    featuredImageSizes: null | {
        [key: string]: {
            file: string;
            width: number;
            height: number;
            source_url: string;
        };
    };
    uagbFeaturedImageSrc: {
        full: ImageSize;
        large: ImageSize;
        medium: ImageSize;
        thumbnail: ImageSize;
        medium_large: ImageSize;
    };
    readingTime: string;
    updatedAt: string;
    createdAt: string;
}

interface ImageSize {
    file: string;
    width: number;
    height: number;
    sources: {
        'image/webp': {
            file: string;
            filesize: number;
            source_url: string;
        };
    };
    mime_type: string;
    source_url: string;
    filesize?: number;
}

export function formatImageSizes(uagbFeaturedImageSrc: any) {
    const sizes: Record<string, ImageSize> = {};
    
    Object.entries(uagbFeaturedImageSrc).forEach(([key, value]: [string, any]) => {
        if (value && typeof value === 'object') {
            sizes[key] = {
                file: value.file,
                width: value.width,
                height: value.height,
                sources: value.sources,
                mime_type: value.mime_type,
                source_url: value.source_url,
                filesize: value.filesize
            };
        }
    });
    
    return sizes;
}