export class FarmStateManager {
    constructor() {
        this.states = new Map();
        this.registerState('normal', { label: 'Normal', modifier: 1 });
        this.registerState('drought', { label: 'Drought', modifier: 0.9 });
        this.registerState('flooded', { label: 'Flooded', modifier: 0.9 });
        this.registerState('disease-outbreak', { label: 'Disease Outbreak', modifier: 0.8 });
        this.registerState('economic-boom', { label: 'Economic Boom', modifier: 1.1 });
        this.registerState('economic-recession', { label: 'Economic Recession', modifier: 0.8 });
        this.registerState('wildfire-recovery', { label: 'Wildfire Recovery', modifier: 0.9 });
        this.registerState('storm-damage', { label: 'Storm Damage', modifier: 0.85 });
    }

    registerState(id, definition) {
        this.states.set(id, definition);
        return this;
    }

    getState(id) {
        return this.states.get(id) ?? null;
    }

    getAllStates() {
        return Object.fromEntries(this.states.entries());
    }
}

export function createFarmStateManager() {
    return new FarmStateManager();
}
