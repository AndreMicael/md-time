export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch('https://mdtime.com.br/wp-json/wp/v2/posts?_embed', {
      next: { revalidate: 60 }
    });
    if (!response.ok) {
      throw new Error('Falha ao buscar posts');
    }
    const posts = await response.json();
    console.log('Resposta da API:', JSON.stringify(posts, null, 2));
    return posts;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }
};

const API_BASE_URL = 'https://www.mdtime.com.br'; // Substitua pela URL real do seu WordPress

export async function fetchSinglePost(slug: string) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/wp-json/wp/v2/posts?slug=${slug}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const posts = await response.json();
        
        // A API retorna um array, mesmo para um único post
        return posts.length > 0 ? posts[0] : null;
    } catch (error) {
        console.error('Erro na fetchSinglePost:', {
            slug,
            error,
            url: `${API_BASE_URL}/wp-json/wp/v2/posts?slug=${slug}`
        });
        throw error;
    }
} 