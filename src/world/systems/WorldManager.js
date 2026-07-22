import { createRegistry } from '../../registries/Registry.js';

export class WorldManager {
    constructor({ grid = {}, parcels = [], objects = [], regions = [] } = {}) {
        this.grid = {
            width: grid.width ?? 64,
            height: grid.height ?? 64,
            tileSize: grid.tileSize ?? 1,
            cellSize: grid.cellSize ?? 1
        };

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
}

export function createWorldManager(options) {
    return new WorldManager(options);
}
