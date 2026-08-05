import { createRegistry } from '../../registries/Registry.js';
import { createTerrainDefinition } from './TerrainDefinition.js';

export class TerrainRegistry {
    constructor({ definitions = [] } = {}) {
        this.registry = createRegistry({
            name: 'terrain-registry',
            schemaDefinition: {
                id: { required: true, type: 'string' },
                label: { required: false, type: 'string' },
                type: { required: false, type: 'string' },
                movementCost: { required: false, type: 'number' }
            }
        });

        this.registry.discover(definitions.map((definition) => createTerrainDefinition(definition)));
    }

    register(definition) {
        return this.registry.register(createTerrainDefinition(definition));
    }

    get(id) {
        return this.registry.get(id);
    }

    getAll() {
        return this.registry.getAll();
    }
}

export function createTerrainRegistry(options = {}) {
    return new TerrainRegistry(options);
}
