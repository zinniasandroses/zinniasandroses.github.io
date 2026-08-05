export class TileInspectorPanel {
    constructor() {
        this.id = 'tile-inspector';
        this.title = 'Tile Inspector';
    }

    getViewModel() {
        return {
            id: this.id,
            title: this.title,
            summary: 'Placeholder inspector for tile metadata, grid coordinates, and tile-level state.'
        };
    }
}

export function createTileInspectorPanel() {
    return new TileInspectorPanel();
}
