export class WorldInspectorPanel {
    constructor() {
        this.id = 'world-inspector';
    }

    render() {
        return {
            title: 'World Inspector',
            status: 'placeholder',
            details: 'Future world diagnostics will render here.'
        };
    }
}

export function createWorldInspectorPanel() {
    return new WorldInspectorPanel();
}
