export class TimeInspectorPanel {
    constructor() {
        this.id = 'time-inspector';
    }

    render() {
        return {
            title: 'Time Inspector',
            status: 'placeholder',
            details: 'Future time controls will render here.'
        };
    }
}

export function createTimeInspectorPanel() {
    return new TimeInspectorPanel();
}
