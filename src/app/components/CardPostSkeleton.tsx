import React from 'react';

const CardPostSkeleton = () => {
    return (
        <li className="flex flex-col gap-2 w-[20vw] p-2 rounded mb-4 animate-pulse">
            {/* Imagem skeleton */}
            <div className="w-[18vw] mx-auto h-[12vw] bg-gray-200 rounded-xl" />
            
            {/* Data e autor skeleton */}
            <div className="w-[18vw] mx-auto">
                <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
            
            {/* Título skeleton */}
            <div className="w-[18vw] mx-auto">
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-4/5" />
            </div>
            
            {/* Excerpt skeleton */}
            <div className="w-[18vw] mx-auto">
                <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
            
            {/* Categoria skeleton */}
            <div>
                <div className="h-6 bg-gray-200 rounded-xl w-20" />
            </div>
        </li>
    );
};

export default CardPostSkeleton;