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
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
        }>;
    };
    categories: number[];
    date_gmt: string;
    yoast_head_json?: {
        og_image?: Array<{ url: string }>;
        twitter_misc?: {
            'Escrito por': string;
            'Est. tempo de leitura': string;
        };
        author?: string;
    };
} 

export interface ImageSize {
  url: string;
  width: number;
  height: number;
  cropped: boolean;
}

export interface FeaturedImageSizes {
  full: ImageSize;
  thumbnail: ImageSize;
  medium: ImageSize;
  medium_large: ImageSize;
  large: ImageSize;
  '1536x1536': ImageSize;
  '2048x2048': ImageSize;
} 

function formatImageSizes(uagbFeaturedImageSrc: any) {
  const sizes: Record<string, ImageSize> = {};
  
  Object.entries(uagbFeaturedImageSrc).forEach(([key, value]: [string, any]) => {
    if (Array.isArray(value) && value.length === 4) {
      sizes[key] = {
        url: value[0],
        width: value[1],
        height: value[2],
        cropped: value[3]
      };
    }
  });
  
  return sizes;
}