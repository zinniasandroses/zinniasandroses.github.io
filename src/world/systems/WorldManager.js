import { createRegistry } from '../../registries/Registry.js';
import { createGridSystem } from '../grid/GridSystem.js';
import { createTerrainRegistry } from '../terrain/TerrainRegistry.js';
import { createPathfindingService } from '../../pathfinding/PathfindingService.js';

export class WorldManager {
    constructor({ grid = {}, parcels = [], objects = [], regions = [], terrainCatalog = [], chunkSize = 16 } = {}) {
        this.grid = {
            width: grid.width ?? 64,
            height: grid.height ?? 64,
            tileSize: grid.tileSize ?? 1,
            cellSize: grid.cellSize ?? 1,
            worldOrigin: grid.worldOrigin ?? { x: 0, y: 0 }
        };

        this.gridSystem = createGridSystem({
            width: this.grid.width,
            height: this.grid.height,
            tileSize: this.grid.tileSize,
            chunkSize,
            worldOrigin: this.grid.worldOrigin,
            terrainCatalog
        });

        this.terrainRegistry = createTerrainRegistry({ definitions: terrainCatalog });
        this.pathfindingService = createPathfindingService({ allowDiagonal: false });

        this.parcelRegistry = createRegistry({
            name: 'parcel-registry',
            schemaDefinition: {
                id: { required: true, type: 'string' },
                owner: { required: false, type: 'string' },
                terrainType: { required: false, type: 'string' },
                biome: { required: false, type: 'string' }
            }
        });

        this.objectRegistry = createRegistry({
            name: 'world-object-registry',
            schemaDefinition: {
                id: { required: true, type: 'string' },
                type: { required: true, type: 'string' },
                position: { required: true, type: 'object' }
            }
        });

        this.parcelRegistry.discover(parcels);
        this.objectRegistry.discover(objects);
        this.regions = regions;
        this.defaultFarmSizeAcres = 25;
    }

    getGrid() {
        return { ...this.grid };
    }

    getGridSystem() {
        return this.gridSystem;
    }

    getTerrainRegistry() {
        return this.terrainRegistry;
    }

    getPathfindingService() {
        return this.pathfindingService;
    }

    getParcels() {
        return this.parcelRegistry.getAll();
    }

    getObjects() {
        return this.objectRegistry.getAll();
    }

    registerParcel(parcel) {
        return this.parcelRegistry.register(parcel);
    }

    registerObject(object) {
        return this.objectRegistry.register(object);
    }

    getRegionDefinitions() {
        return this.regions;
    }

    getDirtyTiles() {
        return this.gridSystem.getDirtyTiles();
    }

    getChunk(chunkX, chunkY) {
        return this.gridSystem.getChunk(chunkX, chunkY);
    }
}

export function createWorldManager(options) {
    return new WorldManager(options);
}
