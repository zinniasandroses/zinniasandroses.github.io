const DEFAULT_RESOURCE_SHAPE = Object.freeze({
    id: '',
    label: '',
    internalName: '',
    category: 'resource',
    description: '',
    minimum: 0,
    maximum: 100,
    current: 0,
    regeneration: 0,
    consumption: 0,
    metadata: {},
    events: [],
    serialization: {},
    tags: []
});

export class ResourceDefinition {
    constructor(payload = {}) {
        const normalized = {
            ...DEFAULT_RESOURCE_SHAPE,
            ...payload,
            internalName: payload.internalName ?? payload.id ?? payload.label ?? '',
            metadata: payload.metadata ?? {},
            events: Array.isArray(payload.events) ? payload.events : [],
            serialization: payload.serialization ?? {},
            tags: Array.isArray(payload.tags) ? payload.tags : []
        };

        Object.assign(this, normalized);
    }

    static from(payload = {}) {
        return new ResourceDefinition(payload);
    }

    clone() {
        return new ResourceDefinition(this.toJSON());
    }

    toJSON() {
        return {
            id: this.id,
            label: this.label,
            internalName: this.internalName,
            category: this.category,
            description: this.description,
            minimum: this.minimum,
            maximum: this.maximum,
            current: this.current,
            regeneration: this.regeneration,
            consumption: this.consumption,
            metadata: { ...this.metadata },
            events: [...this.events],
            serialization: { ...this.serialization },
            tags: [...this.tags]
        };
    }

    validate() {
        const errors = [];

        if (!this.id) {
            errors.push('id is required.');
        }

        if (!this.label) {
            errors.push('label is required.');
        }

        if (this.maximum < this.minimum) {
            errors.push('maximum must be greater than or equal to minimum.');
        }

        if (this.current < this.minimum || this.current > this.maximum) {
            errors.push('current must stay within the configured minimum and maximum.');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }
}

export function createResourceDefinition(payload = {}) {
    return ResourceDefinition.from(payload);
}
