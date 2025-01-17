import { SyncService } from '../app/services/syncService';

async function syncData() {
    try {
        await SyncService.syncWordPressPosts();
        await SyncService.syncYouTubeVideos();
        console.log('Sincronização concluída com sucesso!');
    } catch (error) {
        console.error('Erro na sincronização:', error);
        process.exit(1);
    }
}

syncData(); 