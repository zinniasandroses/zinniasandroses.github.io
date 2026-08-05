export class PathfindingService {
    constructor({ allowDiagonal = false } = {}) {
        this.allowDiagonal = allowDiagonal;
    }

    getNeighbors(tile) {
        if (!tile || !tile.gridPosition) {
            return [];
        }

        const { x, y } = tile.gridPosition;
        const neighbors = [
            { x: x + 1, y },
            { x: x - 1, y },
            { x, y: y + 1 },
            { x, y: y - 1 }
        ];

        if (this.allowDiagonal) {
            neighbors.push(
                { x: x + 1, y: y + 1 },
                { x: x + 1, y: y - 1 },
                { x: x - 1, y: y + 1 },
                { x: x - 1, y: y - 1 }
            );
        }

        return neighbors;
    }

    findPath(gridSystem, fromTile, toTile) {
        if (!gridSystem || !fromTile || !toTile) {
            return [];
        }

        return [
            { ...fromTile.gridPosition },
            { ...toTile.gridPosition }
        ];
    }
}

export function createPathfindingService(options = {}) {
    return new PathfindingService(options);
}
