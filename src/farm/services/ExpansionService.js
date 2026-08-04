export class ExpansionService {
    constructor({ landOwned = 25 } = {}) {
        this.landOwned = landOwned;
        this.expansionLevel = 1;
    }

    addLand(amount = 0) {
        this.landOwned += amount;
        this.expansionLevel += amount > 0 ? 1 : 0;
        return this.landOwned;
    }

    getState() {
        return {
            landOwned: this.landOwned,
            expansionLevel: this.expansionLevel
        };
    }
}

export function createExpansionService(options = {}) {
    return new ExpansionService(options);
}
