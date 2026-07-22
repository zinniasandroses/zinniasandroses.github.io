export class CoordinateViewerPanel {
    constructor() {
        this.id = 'coordinate-viewer';
    }

    render() {
        return {
            title: 'Coordinate Viewer',
            status: 'placeholder',
            details: 'Future coordinate diagnostics will render here.'
        };
    }
}

export function createCoordinateViewerPanel() {
    return new CoordinateViewerPanel();
}
