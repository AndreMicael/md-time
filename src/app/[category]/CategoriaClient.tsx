'use client';

import CardPost from '../components/CardPost';
import { Post } from '@/app/types/post'; // Mova a interface Post para um arquivo separado

interface CategoriaClientProps {
    posts: Post[];
    category: string;
}

export default function CategoriaClient({ posts, category }: CategoriaClientProps) {
    const formatarCategoria = (categoria: string) => {
        if (categoria === 'video') {
            return 'Vídeos';
        } else if (categoria === 'review') {
            return 'Reviews';
        } else if (categoria === 'dicas') {
            return 'Dicas';
        } else if (categoria === 'promocoes') {
            return 'Promoções';
        } else {
            return 'Início';
        }
    };

    return (
        <div>
            <div className="w-full">
                <h1 className="text-center font-bold text-lg capitalize">
                    {formatarCategoria(category)}
                </h1>
            </div>
            <div className="w-full h-full flex flex-col align-center">
                <div>
                    <CardPost posts={posts} />
                </div>
            </div>
        </div>
    );
} 