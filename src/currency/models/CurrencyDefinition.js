const DEFAULT_CURRENCY_SHAPE = Object.freeze({
    id: '',
    label: '',
    internalName: '',
    category: 'currency',
    description: '',
    symbol: '',
    conversionRate: 1,
    conversionUnit: 'base',
    metadata: {},
    tags: []
});

export class CurrencyDefinition {
    constructor(payload = {}) {
        const normalized = {
            ...DEFAULT_CURRENCY_SHAPE,
            ...payload,
            internalName: payload.internalName ?? payload.id ?? payload.label ?? '',
            metadata: payload.metadata ?? {},
            tags: Array.isArray(payload.tags) ? payload.tags : []
        };

        Object.assign(this, normalized);
    }

    static from(payload = {}) {
        return new CurrencyDefinition(payload);
    }

    toJSON() {
        return {
            id: this.id,
            label: this.label,
            internalName: this.internalName,
            category: this.category,
            description: this.description,
            symbol: this.symbol,
            conversionRate: this.conversionRate,
            conversionUnit: this.conversionUnit,
            metadata: { ...this.metadata },
            tags: [...this.tags]
        };
    }
}

export function createCurrencyDefinition(payload = {}) {
    return CurrencyDefinition.from(payload);
}
