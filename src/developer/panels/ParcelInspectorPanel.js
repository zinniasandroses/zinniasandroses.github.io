export class ParcelInspectorPanel {
    constructor() {
        this.id = 'parcel-inspector';
    }

    render() {
        return {
            title: 'Parcel Inspector',
            status: 'placeholder',
            details: 'Future parcel diagnostics will render here.'
        };
    }
}

export function createParcelInspectorPanel() {
    return new ParcelInspectorPanel();
}
