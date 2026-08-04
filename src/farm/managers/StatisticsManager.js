export class StatisticsManager {
    constructor() {
        this.metrics = new Map();
        this.register('daysPlayed', 0);
        this.register('yearsPlayed', 0);
        this.register('moneyEarned', 0);
        this.register('moneySpent', 0);
        this.register('harvests', 0);
        this.register('animalsRaised', 0);
        this.register('treesChopped', 0);
        this.register('fishCaught', 0);
        this.register('buildingsConstructed', 0);
        this.register('neighborsHelped', 0);
        this.register('eventsSurvived', 0);
        this.register('plotsFarmed', 0);
        this.register('distanceWalked', 0);
        this.register('timePlayed', 0);
    }

    register(name, initialValue = 0) {
        if (!this.metrics.has(name)) {
            this.metrics.set(name, initialValue);
        }
        return this;
    }

    increment(name, amount = 1) {
        const current = this.metrics.get(name) ?? 0;
        this.metrics.set(name, current + amount);
        return this.metrics.get(name);
    }

    get(name) {
        return this.metrics.get(name) ?? 0;
    }

    getAll() {
        return Object.fromEntries(this.metrics.entries());
    }
}

export function createStatisticsManager() {
    return new StatisticsManager();
}
