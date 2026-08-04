export class ResourceRegistryInspectorPanel {
    constructor() {
        this.id = 'resource-registry-inspector';
        this.title = 'Resource Registry Inspector';
    }

    getViewModel() {
        return {
            id: this.id,
            title: this.title,
            summary: 'Placeholder inspector for future resource registry diagnostics.'
        };
    }
}

export function createResourceRegistryInspectorPanel() {
    return new ResourceRegistryInspectorPanel();
}
