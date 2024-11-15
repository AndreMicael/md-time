import { NextResponse } from 'next/server';

export async function GET() {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

    if (!API_KEY || !CHANNEL_ID) {
        return NextResponse.json(
            { error: 'Configurações da API do YouTube ausentes' },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?` + 
            new URLSearchParams({
                key: API_KEY,
                channelId: CHANNEL_ID,
                part: 'snippet',
                order: 'date',
                maxResults: '20',
                type: 'video'
            })
        );
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro da API do YouTube:', errorData);
            return NextResponse.json(
                { error: `Erro na API do YouTube: ${errorData.error?.message || 'Erro desconhecido'}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar vídeos:', error);
        return NextResponse.json(
            { error: 'Erro ao buscar vídeos do YouTube' },
            { status: 500 }
        );
    }
}