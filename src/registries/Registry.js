import { createSchema, validateContent } from '../validation/schema.js';

export class Registry {
    constructor({ name, schemaDefinition = {} }) {
        this.name = name;
        this.schema = createSchema(schemaDefinition);
        this.entries = new Map();
        this.errors = [];
    }

    discover(entries = []) {
        return entries.map((entry) => this.register(entry));
    }

    register(entry) {
        const result = validateContent(entry, this.schema);

        if (!result.valid) {
            this.errors.push({ id: entry?.id ?? 'unknown', errors: result.errors });
            return null;
        }

        this.entries.set(entry.id, entry);
        return entry;
    }

    get(id) {
        return this.entries.get(id) ?? null;
    }

    getAll() {
        return Array.from(this.entries.values());
    }

    clear() {
        this.entries.clear();
        this.errors = [];
    }
}

export function createRegistry(options) {
    return new Registry(options);
}
