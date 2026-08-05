import { eventBus } from '../../core/EventBus.js';
import { GameEvents } from '../../events/EventNames.js';
import { createTileDefinition } from './TileDefinition.js';

export class GridSystem {
    constructor({ width = 64, height = 64, tileSize = 1, chunkSize = 16, worldOrigin = { x: 0, y: 0 }, startingTerrain = 'grass', terrainCatalog = [] } = {}) {
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.chunkSize = chunkSize;
        this.worldOrigin = { ...worldOrigin };
        this.tiles = new Map();
        this.changedTiles = new Map();
        this.terrainCatalog = terrainCatalog;
        this.initialized = false;

        this.initialize(startingTerrain);
    }

    initialize(startingTerrain = 'grass') {
        for (let y = 0; y < this.height; y += 1) {
            for (let x = 0; x < this.width; x += 1) {
                const tile = createTileDefinition({
                    id: `tile-${x}-${y}`,
                    gridPosition: { x, y },
                    worldPosition: { x: this.worldOrigin.x + x * this.tileSize, y: this.worldOrigin.y + y * this.tileSize },
                    terrainType: startingTerrain,
                    soilType: 'loam',
                    moisture: 50,
                    fertility: 60,
                    drainage: 1,
                    waterTable: 0,
                    soilPh: 6.5,
                    temperatureModifier: 0,
                    visibility: 'visible',
                    discoveryState: 'discovered'
                });

                this.tiles.set(tile.id, tile);
            }
        }

        this.initialized = true;
    }

    keyFor(gridX, gridY) {
        return `tile-${gridX}-${gridY}`;
    }

    getTileAt(gridX, gridY) {
        return this.tiles.get(this.keyFor(gridX, gridY)) ?? null;
    }

    getTileById(id) {
        return this.tiles.get(id) ?? null;
    }

    setTile(tile) {
        this.tiles.set(tile.id, tile);
        this.changedTiles.set(tile.id, tile.serialize());
        eventBus.emit(GameEvents.TileChanged, { tile: tile.serialize(), source: 'grid-system' });
        return tile;
    }

    setTerrainAt(gridX, gridY, terrainType) {
        const tile = this.getTileAt(gridX, gridY);
        if (!tile) {
            return null;
        }

        tile.terrainType = terrainType;
        this.changedTiles.set(tile.id, tile.serialize());
        eventBus.emit(GameEvents.TerrainChanged, { tileId: tile.id, terrainType, source: 'grid-system' });
        return tile;
    }

    setSoilAt(gridX, gridY, soilPatch = {}) {
        const tile = this.getTileAt(gridX, gridY);
        if (!tile) {
            return null;
        }

        tile.soil = {
            ...tile.soil,
            ...soilPatch
        };
        tile.soilType = soilPatch.soilType ?? tile.soilType;
        tile.soilPh = soilPatch.acidity ?? tile.soilPh;
        this.changedTiles.set(tile.id, tile.serialize());
        eventBus.emit(GameEvents.SoilChanged, { tileId: tile.id, soil: tile.soil, source: 'grid-system' });
        return tile;
    }

    setOwnerAt(gridX, gridY, ownerId) {
        const tile = this.getTileAt(gridX, gridY);
        if (!tile) {
            return null;
        }

        tile.currentOwner = ownerId;
        this.changedTiles.set(tile.id, tile.serialize());
        eventBus.emit(GameEvents.OwnershipChanged, { tileId: tile.id, ownerId, source: 'grid-system' });
        return tile;
    }

    placeObjectAt(gridX, gridY, objectPayload = {}) {
        const tile = this.getTileAt(gridX, gridY);
        if (!tile) {
            return null;
        }

        tile.currentObject = { ...objectPayload };
        tile.occupied = Boolean(objectPayload.id);
        this.changedTiles.set(tile.id, tile.serialize());
        eventBus.emit(GameEvents.ObjectPlaced, { tileId: tile.id, object: tile.currentObject, source: 'grid-system' });
        return tile;
    }

    removeObjectAt(gridX, gridY) {
        const tile = this.getTileAt(gridX, gridY);
        if (!tile) {
            return null;
        }

        const removed = tile.currentObject;
        tile.currentObject = null;
        tile.occupied = false;
        this.changedTiles.set(tile.id, tile.serialize());
        eventBus.emit(GameEvents.ObjectRemoved, { tileId: tile.id, object: removed, source: 'grid-system' });
        return removed;
    }

    getChunk(chunkX, chunkY, chunkSize = this.chunkSize) {
        const startX = chunkX * chunkSize;
        const startY = chunkY * chunkSize;
        const chunkTiles = [];

        for (let y = startY; y < startY + chunkSize; y += 1) {
            for (let x = startX; x < startX + chunkSize; x += 1) {
                const tile = this.getTileAt(x, y);
                if (tile) {
                    chunkTiles.push(tile.serialize());
                }
            }
        }

        return {
            chunkX,
            chunkY,
            tiles: chunkTiles
        };
    }

    getDirtyTiles() {
        return Array.from(this.changedTiles.values());
    }

    clearDirtyTiles() {
        this.changedTiles.clear();
    }

    getSnapshot() {
        return {
            width: this.width,
            height: this.height,
            tileSize: this.tileSize,
            chunkSize: this.chunkSize,
            worldOrigin: { ...this.worldOrigin },
            tiles: Array.from(this.tiles.values()).map((tile) => tile.serialize())
        };
    }
}

export function createGridSystem(options = {}) {
    return new GridSystem(options);
}
