export class PlacementSystem {
    constructor({ grid = {} } = {}) {
        this.grid = {
            width: grid.width ?? 64,
            height: grid.height ?? 64,
            tileSize: grid.tileSize ?? 1,
            cellSize: grid.cellSize ?? 1
        };
        this.placedObjects = [];
    }

    canPlace(position) {
        return Boolean(position && typeof position.x === 'number' && typeof position.y === 'number');
    }

    placeObject(object) {
        if (!this.canPlace(object.position)) {
            return null;
        }

        this.placedObjects.push({ ...object });
        return object;
    }

    removeObject(id) {
        const index = this.placedObjects.findIndex((item) => item.id === id);
        if (index === -1) {
            return null;
        }

        const [removed] = this.placedObjects.splice(index, 1);
        return removed;
    }

    getPlacementSnapshot() {
        return this.placedObjects.map((object) => ({ ...object }));
    }
}

export function createPlacementSystem(options) {
    return new PlacementSystem(options);
}
