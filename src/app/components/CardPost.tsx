import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPosts } from '@/app/api/fetchPosts';
import Image from 'next/image';

interface Post {
    id: number;
    slug: string;
    title: {
        rendered: string;
    };
    _embedded?: {
        'wp:featuredmedia'?: [{
            source_url: string;
        }];
    };
}

interface CardPostProps {
    posts: Post[];
}

const CardPost: React.FC<CardPostProps> = ({ posts }) => {
    return (
        <div>
            {!posts || posts.length === 0 ? (
                <p>Nenhum post encontrado</p>
            ) : (
                <ul className="space-y-4">
                    {posts.map((post) => (                        
                        <li key={post.id} className="hover:bg-gray-100 p-2 rounded flex items-center gap-4">
                            {post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'].length > 0 && (
                                <div className="w-24 h-24 relative">
                                    <Image 
                                        src={post._embedded['wp:featuredmedia'][0].source_url} 
                                        alt={post.title.rendered} 
                                        fill
                                        className="object-cover rounded"
                                        sizes="(max-width: 768px) 96px, 96px"
                                    />
                                </div>
                            )}
                            <Link href={`/articles/${post.slug}`} className="flex-1">
                                {post.title.rendered}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CardPost;
