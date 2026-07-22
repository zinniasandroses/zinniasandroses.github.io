export class ObjectPlacementDebuggerPanel {
    constructor() {
        this.id = 'object-placement-debugger';
    }

    render() {
        return {
            title: 'Object Placement Debugger',
            status: 'placeholder',
            details: 'Future placement diagnostics will render here.'
        };
    }
}

export function createObjectPlacementDebuggerPanel() {
    return new ObjectPlacementDebuggerPanel();
}
