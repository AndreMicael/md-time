'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';

interface Video {
    id: { videoId: string };
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            default: { url: string };
            high: { url: string };
        };
    };
}

// Componente que só será renderizado no cliente
const YouTubeVideos = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: 'start',
            slidesToScroll: 1,
            containScroll: 'trimSnaps',
            loop: true,
        },
        [Autoplay({ delay: 5000, stopOnInteraction: false })],
    );

    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    useEffect(() => {
        setMounted(true);

        const fetchVideos = async () => {
            try {
                const response = await fetch('/api/youtube');
                const data = await response.json();

                if (data.error) {
                    setError(data.error);
                } else {
                    setVideos(data.items || []);
                }
            } catch (err) {
                setError('Erro ao carregar os vídeos');
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    // Não renderiza nada até que o componente esteja montado no cliente
    if (!mounted) return null;

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {videos.map((video) => (
                        <div
                            key={video.id.videoId}
                            className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4"
                        >
                            <Link target='_blank' href={`https://www.youtube.com/watch?v=${video.id.videoId}`}>
                                <div className="border flex rounded-lg p-4 shadow-md mr-4">
                                    <img
                                        src={video.snippet.thumbnails.high.url}
                                        alt={video.snippet.title}
                                        className="w-[15vw] h-[10vw]"
                                    />
                                    <div>
                                        <h3 className="text-sm font-semibold mb-2">
                                            {video.snippet.title}
                                        </h3>
                                        <p className="text-sm">{video.snippet.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
            </button>

            <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                </svg>
            </button>
        </div>
    );
};

// Exporta o componente com renderização apenas no cliente
export default dynamic(() => Promise.resolve(YouTubeVideos), {
    ssr: false,
});
