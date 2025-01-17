'use client';

import CardPost from '../components/CardPost';
import { Post } from '@/app/types/interfaces';
import { CategoryNames } from '@/app/constants/categories';

interface CategoriaClientProps {
    posts: Post[];
    category: string;
}

export default function CategoriaClient({ posts, category }: CategoriaClientProps) {
    const formatarCategoria = (categoria: string) => {
        const normalizedCategory = categoria.toLowerCase() as unknown as keyof typeof CategoryNames;
        return CategoryNames[normalizedCategory] || 'Início';
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