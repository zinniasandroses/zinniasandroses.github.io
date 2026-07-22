import { eventBus } from '../../core/EventBus.js';
import { GameEvents } from '../../events/EventNames.js';

export class WeatherManager {
    constructor({ weatherDefinitions = [], currentWeather = 'sunny', defaultWeather = 'sunny' } = {}) {
        this.weatherDefinitions = weatherDefinitions;
        this.currentWeather = currentWeather ?? defaultWeather;
        this.defaultWeather = defaultWeather;
    }

    getCurrentWeather() {
        return this.currentWeather;
    }

    getDefinition(weatherId) {
        return this.weatherDefinitions.find((weather) => weather.id === weatherId) ?? null;
    }

    setWeather(weatherId) {
        const definition = this.getDefinition(weatherId);
        if (!definition) {
            return null;
        }

        this.currentWeather = definition.id;
        eventBus.emit(GameEvents.WeatherChanged, {
            weather: this.currentWeather,
            definition
        });

        return this.currentWeather;
    }
}

export function createWeatherManager(options) {
    return new WeatherManager(options);
}
