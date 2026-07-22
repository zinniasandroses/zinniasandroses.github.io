export class SimulationInspectorPanel {
    constructor() {
        this.id = 'simulation-inspector';
    }

    render() {
        return {
            title: 'Simulation Inspector',
            status: 'placeholder',
            details: 'Future simulation diagnostics will render here.'
        };
    }
}

export function createSimulationInspectorPanel() {
    return new SimulationInspectorPanel();
}
