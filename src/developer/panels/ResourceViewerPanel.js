export class ResourceViewerPanel {
    constructor() {
        this.id = 'resource-viewer';
        this.title = 'Resource Viewer';
    }

    getViewModel() {
        return {
            id: this.id,
            title: this.title,
            summary: 'Placeholder inspector for resource usage and farm-wide resource state.'
        };
    }
}

export function createResourceViewerPanel() {
    return new ResourceViewerPanel();
}
