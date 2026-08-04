export class FarmStateViewerPanel {
    constructor() {
        this.id = 'farm-state-viewer';
        this.title = 'Farm State Viewer';
    }

    getViewModel() {
        return {
            id: this.id,
            title: this.title,
            summary: 'Placeholder inspector for farm state modifiers and temporary state metadata.'
        };
    }
}

export function createFarmStateViewerPanel() {
    return new FarmStateViewerPanel();
}
