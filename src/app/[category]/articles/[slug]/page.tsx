import React from 'react';
import { Suspense } from 'react';
import ArticleContent from './ArticleContent';
import Newsletter from '@/app/components/Newsletter';
import Navbar from '@/app/components/Navbar';

export default function ArticlePage({ params }: { params: { category: string; slug: string } }) {
    return (
        <div className="container mx-auto">
            <Navbar />
            <Suspense fallback={<LoadingArticle />}>
                <ArticleContent slug={params.slug} />
            </Suspense>
            <Newsletter />
        </div>
    );
}

function LoadingArticle() {
    return (
        <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
    );
}
