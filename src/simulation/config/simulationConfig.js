export const DEFAULT_SIMULATION_CONFIG = Object.freeze({
    calendar: {
        day: 1,
        week: 1,
        month: 1,
        season: 'spring',
        year: 1,
        minutesPerDay: 20,
        weekLength: 7,
        monthLength: 4,
        seasonLength: 4,
        yearLength: 12
    },
    seasons: [
        { id: 'spring', label: 'Spring', order: 1 },
        { id: 'summer', label: 'Summer', order: 2 },
        { id: 'autumn', label: 'Autumn', order: 3 },
        { id: 'winter', label: 'Winter', order: 4 }
    ],
    weather: [
        { id: 'sunny', label: 'Sunny', severity: 0 },
        { id: 'cloudy', label: 'Cloudy', severity: 1 },
        { id: 'rain', label: 'Rain', severity: 2 },
        { id: 'storm', label: 'Storm', severity: 3 },
        { id: 'heat-wave', label: 'Heat Wave', severity: 4 },
        { id: 'snow', label: 'Snow', severity: 5 },
        { id: 'blizzard', label: 'Blizzard', severity: 6 },
        { id: 'drought', label: 'Drought', severity: 7 }
    ],
    simulation: {
        minuteStep: 1,
        developerModeSpeedMultiplier: 1,
        eventCooldownMinutes: 30
    }
});

export function getSimulationConfig(overrides = {}) {
    return {
        ...DEFAULT_SIMULATION_CONFIG,
        ...overrides,
        calendar: {
            ...DEFAULT_SIMULATION_CONFIG.calendar,
            ...(overrides.calendar ?? {})
        },
        seasons: overrides.seasons ?? DEFAULT_SIMULATION_CONFIG.seasons,
        weather: overrides.weather ?? DEFAULT_SIMULATION_CONFIG.weather,
        simulation: {
            ...DEFAULT_SIMULATION_CONFIG.simulation,
            ...(overrides.simulation ?? {})
        }
    };
}
