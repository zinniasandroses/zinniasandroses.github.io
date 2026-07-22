export class SaveInspectorPanel {
    constructor() {
        this.id = 'save-inspector';
    }

    render() {
        return {
            title: 'Save Inspector',
            status: 'placeholder',
            details: 'Future save diagnostics will render here.'
        };
    }
}

export function createSaveInspectorPanel() {
    return new SaveInspectorPanel();
}
