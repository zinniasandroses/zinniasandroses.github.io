import { createRegistry } from '../registries/Registry.js';
import { validateContent } from '../validation/schema.js';
import { CurrencyDefinition } from './models/CurrencyDefinition.js';

const CURRENCY_SCHEMA = Object.freeze({
    id: { required: true, type: 'string' },
    label: { required: true, type: 'string' },
    internalName: { required: true, type: 'string' },
    category: { required: true, type: 'string' },
    description: { required: false, type: 'string' },
    symbol: { required: false, type: 'string' },
    conversionRate: { required: true, type: 'number' },
    conversionUnit: { required: true, type: 'string' },
    metadata: { required: false, type: 'object' },
    tags: { required: true, type: 'object' }
});

export class CurrencyRegistry {
    constructor() {
        this.registry = createRegistry({
            name: 'currency-registry',
            schemaDefinition: CURRENCY_SCHEMA
        });
        this.catalog = new Map();
    }

    discover(entries = []) {
        return entries.map((entry) => this.register(entry));
    }

    register(entry) {
        const currency = CurrencyDefinition.from(entry);
        const payload = currency.toJSON();
        const validation = validateContent(payload, this.registry.schema);

        if (!validation.valid) {
            this.registry.errors.push({ id: payload.id ?? 'unknown', errors: validation.errors });
            return null;
        }

        this.catalog.set(payload.id, payload);
        return this.registry.register(payload);
    }

    get(id) {
        return this.catalog.get(id) ?? this.registry.get(id) ?? null;
    }

    getAll() {
        return Array.from(this.catalog.values());
    }
}

export function createCurrencyRegistry() {
    return new CurrencyRegistry();
}
