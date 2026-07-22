export class GridOverlayPanel {
    constructor() {
        this.id = 'grid-overlay';
    }

    render() {
        return {
            title: 'Grid Overlay',
            status: 'placeholder',
            details: 'Future grid diagnostics will render here.'
        };
    }
}

export function createGridOverlayPanel() {
    return new GridOverlayPanel();
}
