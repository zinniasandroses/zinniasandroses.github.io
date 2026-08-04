import { eventBus } from '../../core/EventBus.js';
import { GameEvents } from '../../events/EventNames.js';

const DEFAULT_ITEM_SHAPE = Object.freeze({
    id: '',
    label: '',
    internalName: '',
    category: 'miscellaneous',
    subcategory: 'general',
    description: '',
    icon: '',
    stackSize: 1,
    weight: 0,
    value: 0,
    sellable: true,
    purchasable: false,
    tradable: true,
    spoilable: false,
    metadata: {},
    tags: [],
    futureComponents: []
});

export class ItemDefinition {
    constructor(payload = {}) {
        const normalized = {
            ...DEFAULT_ITEM_SHAPE,
            ...payload,
            internalName: payload.internalName ?? payload.id ?? payload.label ?? '',
            metadata: payload.metadata ?? {},
            tags: Array.isArray(payload.tags) ? payload.tags : [],
            futureComponents: Array.isArray(payload.futureComponents) ? payload.futureComponents : []
        };

        Object.assign(this, normalized);
    }

    static from(payload = {}) {
        return new ItemDefinition(payload);
    }

    clone() {
        return new ItemDefinition(this.toJSON());
    }

    toJSON() {
        return {
            id: this.id,
            label: this.label,
            internalName: this.internalName,
            category: this.category,
            subcategory: this.subcategory,
            description: this.description,
            icon: this.icon,
            stackSize: this.stackSize,
            weight: this.weight,
            value: this.value,
            sellable: this.sellable,
            purchasable: this.purchasable,
            tradable: this.tradable,
            spoilable: this.spoilable,
            metadata: { ...this.metadata },
            tags: [...this.tags],
            futureComponents: [...this.futureComponents]
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

        if (!this.category) {
            errors.push('category is required.');
        }

        if (this.stackSize < 1) {
            errors.push('stackSize must be greater than zero.');
        }

        if (this.weight < 0) {
            errors.push('weight cannot be negative.');
        }

        if (this.tags.length === 0) {
            errors.push('tags is required for localization and content discovery.');
        }

        eventBus.emit(GameEvents.ItemCreated, {
            item: this.toJSON(),
            valid: errors.length === 0,
            errors
        });

        return {
            valid: errors.length === 0,
            errors
        };
    }
}

export function createItemDefinition(payload = {}) {
    return ItemDefinition.from(payload);
}
