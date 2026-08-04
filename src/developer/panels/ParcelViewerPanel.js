export class ParcelViewerPanel {
    constructor() {
        this.id = 'parcel-viewer';
        this.title = 'Parcel Viewer';
    }

    getViewModel() {
        return {
            id: this.id,
            title: this.title,
            summary: 'Placeholder inspector for parcel ownership, terrain, and farmland allocation.'
        };
    }
}

export function createParcelViewerPanel() {
    return new ParcelViewerPanel();
}
