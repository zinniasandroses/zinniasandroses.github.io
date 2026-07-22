export class ObjectInspectorPanel {
    constructor() {
        this.id = 'object-inspector';
    }

    render() {
        return {
            title: 'Object Inspector',
            status: 'placeholder',
            details: 'Future world object diagnostics will render here.'
        };
    }
}

export function createObjectInspectorPanel() {
    return new ObjectInspectorPanel();
}
