export class ConfigurationViewerPanel {
    constructor() {
        this.id = 'configuration-viewer';
    }

    render() {
        return {
            title: 'Configuration Viewer',
            status: 'placeholder',
            details: 'Future configuration diagnostics will render here.'
        };
    }
}

export function createConfigurationViewerPanel() {
    return new ConfigurationViewerPanel();
}
