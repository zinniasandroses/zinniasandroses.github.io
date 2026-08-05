export class SoilInspectorPanel {
    constructor() {
        this.id = 'soil-inspector';
        this.title = 'Soil Inspector';
    }

    getViewModel() {
        return {
            id: this.id,
            title: this.title,
            summary: 'Placeholder inspector for soil chemistry, saturation, compaction, and disease risk storage.'
        };
    }
}

export function createSoilInspectorPanel() {
    return new SoilInspectorPanel();
}
