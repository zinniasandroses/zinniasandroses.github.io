export class ExpansionViewerPanel {
    constructor() {
        this.id = 'expansion-viewer';
        this.title = 'Expansion Viewer';
    }

    getViewModel() {
        return {
            id: this.id,
            title: this.title,
            summary: 'Placeholder inspector for land expansion progress and parcel growth projections.'
        };
    }
}

export function createExpansionViewerPanel() {
    return new ExpansionViewerPanel();
}
