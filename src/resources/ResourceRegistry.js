import { createRegistry } from '../registries/Registry.js';
import { validateContent } from '../validation/schema.js';
import { ResourceDefinition } from './models/ResourceDefinition.js';
import { eventBus } from '../core/EventBus.js';
import { GameEvents } from '../events/EventNames.js';

const RESOURCE_REGISTRY_SCHEMA = Object.freeze({
    id: { required: true, type: 'string' },
    label: { required: true, type: 'string' },
    internalName: { required: true, type: 'string' },
    category: { required: true, type: 'string' },
    description: { required: false, type: 'string' },
    minimum: { required: true, type: 'number' },
    maximum: { required: true, type: 'number' },
    current: { required: true, type: 'number' },
    regeneration: { required: true, type: 'number' },
    consumption: { required: true, type: 'number' },
    metadata: { required: false, type: 'object' },
    events: { required: false, type: 'object' },
    serialization: { required: false, type: 'object' },
    tags: { required: true, type: 'object' }
});

export class ResourceRegistry {
    constructor() {
        this.registry = createRegistry({
            name: 'resource-registry',
            schemaDefinition: RESOURCE_REGISTRY_SCHEMA
        });
        this.catalog = new Map();
    }

    discover(resources = []) {
        return resources.map((entry) => this.register(entry));
    }

    register(entry) {
        const resource = ResourceDefinition.from(entry);
        const payload = resource.toJSON();
        const validation = validateContent(payload, this.registry.schema);

        if (!validation.valid) {
            this.registry.errors.push({ id: payload.id ?? 'unknown', errors: validation.errors });
            return null;
        }

        this.catalog.set(payload.id, payload);
        const registered = this.registry.register(payload);
        eventBus.emit(GameEvents.ItemCreated, { resource: payload, source: 'resource-registry' });
        return registered;
    }

    get(id) {
        return this.catalog.get(id) ?? this.registry.get(id) ?? null;
    }

    getAll() {
        return Array.from(this.catalog.values());
    }

    search(term = '') {
        const normalized = term.trim().toLowerCase();

        if (!normalized) {
            return this.getAll();
        }

        return this.getAll().filter((resource) => {
            const haystack = [resource.label, resource.internalName, resource.category, ...(resource.tags ?? [])]
                .join(' ')
                .toLowerCase();
            return haystack.includes(normalized);
        });
    }

    clear() {
        this.catalog.clear();
        this.registry.clear();
    }
}

export function createResourceRegistry() {
    return new ResourceRegistry();
}
