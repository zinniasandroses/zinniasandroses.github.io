import { eventBus } from '../core/EventBus.js';
import { GameEvents } from '../events/EventNames.js';

export class InventoryFoundation {
    constructor({ capacity = Number.POSITIVE_INFINITY, stacks = [] } = {}) {
        this.capacity = capacity;
        this.stacks = new Map();
        this.sorting = 'category';
        this.filters = new Set();
        this.metadata = {};

        for (const stack of stacks) {
            this.addStack(stack);
        }
    }

    addStack(stack) {
        const key = stack.itemId ?? stack.id;
        this.stacks.set(key, {
            itemId: key,
            quantity: stack.quantity ?? 1,
            metadata: stack.metadata ?? {},
            category: stack.category ?? 'miscellaneous'
        });

        eventBus.emit(GameEvents.ItemAdded, {
            itemId: key,
            quantity: stack.quantity ?? 1,
            inventory: this.serialize()
        });

        return this.stacks.get(key);
    }

    addItem(itemId, quantity = 1, metadata = {}, category = 'miscellaneous') {
        const existingStack = this.stacks.get(itemId);
        if (existingStack) {
            existingStack.quantity += quantity;
            existingStack.metadata = {
                ...existingStack.metadata,
                ...metadata
            };
        } else {
            this.stacks.set(itemId, {
                itemId,
                quantity,
                metadata,
                category
            });
        }

        eventBus.emit(GameEvents.ItemAdded, {
            itemId,
            quantity,
            inventory: this.serialize()
        });

        return this.stacks.get(itemId);
    }

    removeItem(itemId, quantity = 1) {
        const existingStack = this.stacks.get(itemId);
        if (!existingStack) {
            return null;
        }

        existingStack.quantity -= quantity;
        if (existingStack.quantity <= 0) {
            this.stacks.delete(itemId);
        }

        eventBus.emit(GameEvents.ItemRemoved, {
            itemId,
            quantity,
            inventory: this.serialize()
        });

        return this.stacks.get(itemId) ?? null;
    }

    search(term = '') {
        const normalized = term.trim().toLowerCase();
        const entries = Array.from(this.stacks.values());

        if (!normalized) {
            return entries;
        }

        return entries.filter((stack) => {
            const haystack = [stack.itemId, stack.category, JSON.stringify(stack.metadata ?? {})]
                .join(' ')
                .toLowerCase();
            return haystack.includes(normalized);
        });
    }

    filterByCategory(category) {
        return Array.from(this.stacks.values()).filter((stack) => stack.category === category);
    }

    sort(by = 'category') {
        this.sorting = by;
        return Array.from(this.stacks.values()).sort((left, right) => {
            if (by === 'quantity') {
                return right.quantity - left.quantity;
            }

            return String(left[by] ?? '').localeCompare(String(right[by] ?? ''));
        });
    }

    serialize() {
        return {
            capacity: this.capacity,
            sorting: this.sorting,
            stacks: Array.from(this.stacks.values())
        };
    }

    hydrate(payload = {}) {
        this.capacity = payload.capacity ?? this.capacity;
        this.sorting = payload.sorting ?? this.sorting;
        this.metadata = payload.metadata ?? {};
        this.stacks = new Map((payload.stacks ?? []).map((stack) => [stack.itemId, stack]));
        return this;
    }
}

export function createInventoryFoundation(options = {}) {
    return new InventoryFoundation(options);
}
