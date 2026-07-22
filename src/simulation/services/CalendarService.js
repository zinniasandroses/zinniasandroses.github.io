import { DEFAULT_SIMULATION_CONFIG } from '../config/simulationConfig.js';

export class CalendarService {
    constructor(config = DEFAULT_SIMULATION_CONFIG) {
        this.config = config;
        this.state = {
            day: config.calendar.day ?? 1,
            week: config.calendar.week ?? 1,
            month: config.calendar.month ?? 1,
            season: config.calendar.season ?? 'spring',
            year: config.calendar.year ?? 1
        };
    }

    getState() {
        return { ...this.state };
    }

    getSeasonInfo() {
        return this.config.seasons.find((season) => season.id === this.state.season) ?? null;
    }

    getDayNumber() {
        return this.state.day;
    }

    getWeekNumber() {
        return this.state.week;
    }

    getMonthNumber() {
        return this.state.month;
    }

    getSeasonId() {
        return this.state.season;
    }

    getYearNumber() {
        return this.state.year;
    }

    advanceDay() {
        this.state.day += 1;

        if (this.state.day > this.config.calendar.weekLength) {
            this.state.day = 1;
            this.state.week += 1;
        }

        if (this.state.week > this.config.calendar.monthLength) {
            this.state.week = 1;
            this.state.month += 1;
        }

        if (this.state.month > this.config.calendar.yearLength) {
            this.state.month = 1;
            this.state.year += 1;
        }

        return { ...this.state };
    }
}

export function createCalendarService(config) {
    return new CalendarService(config);
}
