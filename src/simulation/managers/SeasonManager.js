import { eventBus } from '../../core/EventBus.js';
import { GameEvents } from '../../events/EventNames.js';

export class SeasonManager {
    constructor({ seasons = [], currentSeason = 'spring' } = {}) {
        this.seasons = seasons;
        this.currentSeason = currentSeason;
    }

    getCurrentSeason() {
        return this.currentSeason;
    }

    getNextSeason() {
        const currentIndex = this.seasons.findIndex((season) => season.id === this.currentSeason);
        if (currentIndex === -1) {
            return this.seasons[0]?.id ?? null;
        }

        const nextIndex = (currentIndex + 1) % this.seasons.length;
        return this.seasons[nextIndex]?.id ?? null;
    }

    setSeason(seasonId) {
        const nextSeason = this.seasons.find((season) => season.id === seasonId);
        if (!nextSeason) {
            return null;
        }

        this.currentSeason = nextSeason.id;
        eventBus.emit(GameEvents.SeasonChanged, {
            season: this.currentSeason,
            seasonInfo: nextSeason
        });

        return this.currentSeason;
    }

    getSeasonInfo() {
        return this.seasons.find((season) => season.id === this.currentSeason) ?? null;
    }
}

export function createSeasonManager(options) {
    return new SeasonManager(options);
}
