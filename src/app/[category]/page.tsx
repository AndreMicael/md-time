import CardPostSkeleton from '@/app/components/CardPostSkeleton';
import Categorias from './Categorias';
import { Suspense } from 'react';
import CategoriaClient from './CategoriaClient';
import { getCategoryId, fetchPosts } from '../api/fetchPosts';

import { Post } from '../types/post';

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const categoryId = await getCategoryId(params.category);
    if (!categoryId) {
        throw new Error(`Categoria '${params.category}' não encontrada`);
    }
    const posts = (await fetchPosts(categoryId.toString())) as unknown as Post[];

    return (
        <div>
            <Suspense fallback={<LoadingCategory />}>
                <CategoriaClient posts={posts} category={params.category} />
            </Suspense>
        </div>
    );
}

function LoadingCategory() {
    return (
        <div className="w-full flex justify-center items-center h-screen">
            <div className="container w-[65vw] mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="rounded-lg p-4 animate-pulse">
                            <CardPostSkeleton />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
