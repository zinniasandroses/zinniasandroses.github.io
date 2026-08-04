export class FarmInspectorPanel {
    constructor() {
        this.id = 'farm-inspector';
        this.title = 'Farm Inspector';
    }

    getViewModel() {
        return {
            id: this.id,
            title: this.title,
            summary: 'Placeholder inspector for farm metadata, core state, and save payload review.'
        };
    }
}

export function createFarmInspectorPanel() {
    return new FarmInspectorPanel();
}
