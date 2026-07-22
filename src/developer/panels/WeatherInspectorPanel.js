export class WeatherInspectorPanel {
    constructor() {
        this.id = 'weather-inspector';
    }

    render() {
        return {
            title: 'Weather Inspector',
            status: 'placeholder',
            details: 'Future weather controls will render here.'
        };
    }
}

export function createWeatherInspectorPanel() {
    return new WeatherInspectorPanel();
}
