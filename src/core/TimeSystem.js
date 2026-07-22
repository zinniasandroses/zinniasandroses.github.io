export const MINUTES_PER_DAY = 20;

export class TimeSystem {
    constructor({ minutesPerDay = MINUTES_PER_DAY, nowFn = () => Date.now() } = {}) {
        this.minutesPerDay = minutesPerDay;
        this.nowFn = nowFn;
        this.lastTick = nowFn();
        this.activeMinutes = 0;
        this.isPaused = false;
    }

    markPaused(paused) {
        this.isPaused = paused;
    }

    getDayProgress() {
        return this.activeMinutes % this.minutesPerDay;
    }

    getDayNumber() {
        return Math.floor(this.activeMinutes / this.minutesPerDay) + 1;
    }

    registerMinute() {
        if (this.isPaused) {
            return null;
        }

        this.activeMinutes += 1;
        return this.getDayProgress();
    }

    syncFromClock() {
        const now = this.nowFn();
        const elapsedMinutes = Math.max(0, Math.floor((now - this.lastTick) / 60000));
        if (elapsedMinutes === 0) {
            return this.getDayProgress();
        }

        this.lastTick = now;
        if (!this.isPaused) {
            this.activeMinutes += elapsedMinutes;
        }

        return this.getDayProgress();
    }
}

export function createTimeSystem(options = {}) {
    return new TimeSystem(options);
}
