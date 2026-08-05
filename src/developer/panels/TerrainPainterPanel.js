export class TerrainPainterPanel {
    constructor() {
        this.id = 'terrain-painter';
        this.title = 'Terrain Painter';
        this.disabled = true;
    }

    getViewModel() {
        return {
            id: this.id,
            title: this.title,
            disabled: this.disabled,
            summary: 'Disabled placeholder for future terrain painting and live tile edits.'
        };
    }
}

export function createTerrainPainterPanel() {
    return new TerrainPainterPanel();
}
