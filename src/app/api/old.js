import { NextResponse } from 'next/server';
import { getLatestVideos } from '../getLatestVideos';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const API_KEY = process.env.API_KEY;
    const CHANNEL_ID = process.env.CHANNEL_ID;
    
    console.log('Verificando credenciais:', { 
      temAPI: !!API_KEY, 
      temChannel: !!CHANNEL_ID 
    });

    if (!API_KEY || !CHANNEL_ID) {
      return NextResponse.json(
        { error: 'Credenciais não configuradas' },
        { status: 500 }
      );
    }

    const videos = await getLatestVideos(CHANNEL_ID, API_KEY);
    console.log('Videos obtidos:', videos);

    return NextResponse.json({ success: true, data: videos });
    
  } catch (error) {
    console.error('Erro na API:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}