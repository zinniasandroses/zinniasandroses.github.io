import { createRegistry } from '../registries/Registry.js';
import { validateContent } from '../validation/schema.js';
import { ItemDefinition } from './models/ItemDefinition.js';
import { eventBus } from '../core/EventBus.js';
import { GameEvents } from '../events/EventNames.js';

const ITEM_REGISTRY_SCHEMA = Object.freeze({
    id: { required: true, type: 'string' },
    label: { required: true, type: 'string' },
    internalName: { required: true, type: 'string' },
    category: { required: true, type: 'string' },
    subcategory: { required: true, type: 'string' },
    description: { required: false, type: 'string' },
    icon: { required: false, type: 'string' },
    stackSize: { required: true, type: 'number' },
    weight: { required: true, type: 'number' },
    value: { required: true, type: 'number' },
    sellable: { required: true, type: 'boolean' },
    purchasable: { required: true, type: 'boolean' },
    tradable: { required: true, type: 'boolean' },
    spoilable: { required: true, type: 'boolean' },
    metadata: { required: false, type: 'object' },
    tags: { required: true, type: 'object' },
    futureComponents: { required: false, type: 'object' }
});

export class ItemRegistry {
    constructor() {
        this.registry = createRegistry({
            name: 'item-registry',
            schemaDefinition: ITEM_REGISTRY_SCHEMA
        });
        this.catalog = new Map();
    }

    discover(items = []) {
        return items.map((entry) => this.register(entry));
    }

    register(entry) {
        const item = ItemDefinition.from(entry);
        const payload = item.toJSON();
        const validation = validateContent(payload, this.registry.schema);

        if (!validation.valid) {
            this.registry.errors.push({ id: payload.id ?? 'unknown', errors: validation.errors });
            return null;
        }

        this.catalog.set(payload.id, payload);
        const registered = this.registry.register(payload);
        eventBus.emit(GameEvents.ItemCreated, { item: payload, source: 'registry' });
        return registered;
    }

    get(id) {
        return this.catalog.get(id) ?? this.registry.get(id) ?? null;
    }

    getAll() {
        return Array.from(this.catalog.values());
    }

    getByCategory(category) {
        return this.getAll().filter((item) => item.category === category);
    }

    search(term = '') {
        const normalized = term.trim().toLowerCase();

        if (!normalized) {
            return this.getAll();
        }

        return this.getAll().filter((item) => {
            const haystack = [item.label, item.internalName, item.category, item.subcategory, ...(item.tags ?? [])]
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

export function createItemRegistry() {
    return new ItemRegistry();
}
