import { NextResponse } from 'next/server';
import { SyncService } from '@/app/services/syncService';

export async function POST(request: Request) {
    try {
        // Sincroniza os dados
        await SyncService.syncWordPressPosts();
        //await SyncService.syncYouTubeVideos();

        return NextResponse.json({ message: 'Sincronização concluída com sucesso' });
    } catch (error) {
        console.error('Erro na sincronização:', error);
        return NextResponse.json(
            { error: 'Erro ao sincronizar dados' },
            { status: 500 }
        );
    }
} 