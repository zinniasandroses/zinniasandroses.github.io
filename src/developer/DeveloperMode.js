export class DeveloperMode {
    constructor() {
        this.enabled = false;
        this.tools = new Map();
    }

    enable() {
        this.enabled = true;
        return this;
    }

    disable() {
        this.enabled = false;
        return this;
    }

    registerTool(name, tool) {
        this.tools.set(name, tool);
        return tool;
    }

    getTool(name) {
        return this.tools.get(name) ?? null;
    }

    getState() {
        return {
            enabled: this.enabled,
            toolCount: this.tools.size
        };
    }
}

export function createDeveloperMode() {
    return new DeveloperMode();
}
