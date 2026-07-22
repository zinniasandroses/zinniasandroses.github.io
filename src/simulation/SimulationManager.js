import { eventBus } from '../core/EventBus.js';
import { GameEvents } from '../events/EventNames.js';
import { createCalendarService } from './services/CalendarService.js';
import { createSeasonManager } from './managers/SeasonManager.js';
import { createWeatherManager } from './managers/WeatherManager.js';
import { createEventManager } from './managers/EventManager.js';
import { DEFAULT_SIMULATION_CONFIG } from './config/simulationConfig.js';

export class SimulationManager {
    constructor(options = {}) {
        const config = options.config ?? DEFAULT_SIMULATION_CONFIG;

        this.config = config;
        this.calendar = createCalendarService(config);
        this.seasonManager = createSeasonManager({
            seasons: config.seasons,
            currentSeason: config.calendar.season
        });
        this.weatherManager = createWeatherManager({
            weatherDefinitions: config.weather,
            currentWeather: 'sunny'
        });
        this.eventManager = createEventManager({
            events: [],
            cooldownMinutes: config.simulation?.eventCooldownMinutes ?? 30
        });
        this.tickCount = 0;
        this.isPaused = false;
        this.isRunning = false;
    }

    start() {
        this.isRunning = true;
        eventBus.emit(GameEvents.GameStarted, { simulation: this });
        return this;
    }

    pause() {
        this.isPaused = true;
        return this;
    }

    resume() {
        this.isPaused = false;
        return this;
    }

    tick() {
        if (this.isPaused || !this.isRunning) {
            return null;
        }

        this.tickCount += 1;
        eventBus.emit(GameEvents.MinutePassed, { tick: this.tickCount });
        eventBus.emit(GameEvents.SimulationTick, {
            tick: this.tickCount,
            calendar: this.calendar.getState(),
            season: this.seasonManager.getCurrentSeason(),
            weather: this.weatherManager.getCurrentWeather()
        });

        if (this.tickCount % this.config.calendar.minutesPerDay === 0) {
            eventBus.emit(GameEvents.DayEnded, {
                day: this.calendar.getDayNumber(),
                calendar: this.calendar.getState()
            });

            this.calendar.advanceDay();
            eventBus.emit(GameEvents.DayStarted, {
                day: this.calendar.getDayNumber(),
                calendar: this.calendar.getState()
            });
        }

        return this.tickCount;
    }

    getState() {
        return {
            tickCount: this.tickCount,
            paused: this.isPaused,
            running: this.isRunning,
            calendar: this.calendar.getState(),
            season: this.seasonManager.getCurrentSeason(),
            weather: this.weatherManager.getCurrentWeather()
        };
    }
}

export function createSimulationManager(options) {
    return new SimulationManager(options);
}
