export class ItemRegistryInspectorPanel {
    constructor() {
        this.id = 'item-registry-inspector';
        this.title = 'Item Registry Inspector';
    }

    getViewModel() {
        return {
            id: this.id,
            title: this.title,
            summary: 'Placeholder inspector for future item registry diagnostics.'
        };
    }
}

export function createItemRegistryInspectorPanel() {
    return new ItemRegistryInspectorPanel();
}
