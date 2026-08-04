import { createRegistry } from '../registries/Registry.js';

const CATEGORY_SCHEMA = Object.freeze({
    id: { required: true, type: 'string' },
    label: { required: true, type: 'string' },
    description: { required: false, type: 'string' },
    parentCategory: { required: false, type: 'string' }
});

export class ItemCategoryRegistry {
    constructor() {
        this.registry = createRegistry({
            name: 'item-category-registry',
            schemaDefinition: CATEGORY_SCHEMA
        });
        this.categories = new Map();
    }

    discover(categories = []) {
        return categories.map((entry) => this.register(entry));
    }

    register(entry) {
        const result = this.registry.register(entry);
        if (!result) {
            return null;
        }

        this.categories.set(entry.id, result);
        return result;
    }

    get(id) {
        return this.categories.get(id) ?? null;
    }

    getAll() {
        return Array.from(this.categories.values());
    }
}

export function createItemCategoryRegistry() {
    return new ItemCategoryRegistry();
}
