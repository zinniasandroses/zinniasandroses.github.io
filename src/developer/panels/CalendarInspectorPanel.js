export class CalendarInspectorPanel {
    constructor() {
        this.id = 'calendar-inspector';
    }

    render() {
        return {
            title: 'Calendar Inspector',
            status: 'placeholder',
            details: 'Future calendar diagnostics will render here.'
        };
    }
}

export function createCalendarInspectorPanel() {
    return new CalendarInspectorPanel();
}
