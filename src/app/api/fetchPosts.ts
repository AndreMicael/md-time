interface Post {
    id: number;
    slug: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
   
}

export const fetchPosts = async (categoryId?: string): Promise<Post[]> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
        throw new Error('URL da API não configurada');
    }

    const url = categoryId 
        ? `${baseUrl}/posts?categories=${categoryId}&per_page=100`
        : `${baseUrl}/posts?per_page=100`;
    
    try {
        const response = await fetch(url);
        
        if (response.status === 404) {
            console.warn(`Categoria ${categoryId} não encontrada`);
            return [];
        }
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }
        
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error('Erro ao buscar posts:', {
            categoryId,
            error,
            url
        });
        return [];
    }
};

export async function fetchSinglePost(slug: string): Promise<Post | null> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
        throw new Error('URL da API não configurada');
    }

    try {
        const response = await fetch(`${baseUrl}/posts?slug=${slug}`);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        const posts = await response.json();

        // A API retorna um array, mesmo para um único post
        return posts.length > 0 ? posts[0] : null;
    } catch (error) {
        console.error('Erro na fetchSinglePost:', {
            slug,
            error,
            url: `${baseUrl}/posts?slug=${slug}`,
        });
        throw error;
    }
}

export const getCategoryId = (categoryName: string): number | undefined => {
    const categoryMap: { [key: string]: number } = {
        'destaques': 10,
        'dicas': 8,
        'novidades': 17,
        'promocoes': 9,
        'review': 7,
        'video': 12
    };

    // Normaliza o nome da categoria (remove acentos e converte para minúsculas)
    const normalizedName = categoryName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    return categoryMap[normalizedName];
};
