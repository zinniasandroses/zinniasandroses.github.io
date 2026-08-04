export class StatisticsViewerPanel {
    constructor() {
        this.id = 'statistics-viewer';
        this.title = 'Statistics Viewer';
    }

    getViewModel() {
        return {
            id: this.id,
            title: this.title,
            summary: 'Placeholder inspector for statistics registration and metric visibility.'
        };
    }
}

export function createStatisticsViewerPanel() {
    return new StatisticsViewerPanel();
}
