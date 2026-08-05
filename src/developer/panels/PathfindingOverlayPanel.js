export class PathfindingOverlayPanel {
    constructor() {
        this.id = 'pathfinding-overlay';
        this.title = 'Pathfinding Overlay';
    }

    getViewModel() {
        return {
            id: this.id,
            title: this.title,
            summary: 'Placeholder overlay for future movement, route, and path visualization.'
        };
    }
}

export function createPathfindingOverlayPanel() {
    return new PathfindingOverlayPanel();
}
