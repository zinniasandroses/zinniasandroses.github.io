export class ChunkViewerPanel {
    constructor() {
        this.id = 'chunk-viewer';
        this.title = 'Chunk Viewer';
    }

    getViewModel() {
        return {
            id: this.id,
            title: this.title,
            summary: 'Placeholder viewer for chunk-level tile snapshots and delta save review.'
        };
    }
}

export function createChunkViewerPanel() {
    return new ChunkViewerPanel();
}
