export class WorldSaveStrategy {
    constructor() {
        this.deltaEntries = [];
    }

    recordChange(change) {
        this.deltaEntries.push(change);
        return change;
    }

    getSnapshot() {
        return [...this.deltaEntries];
    }

    clear() {
        this.deltaEntries = [];
    }
}

export function createWorldSaveStrategy() {
    return new WorldSaveStrategy();
}
