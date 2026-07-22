export const PROJECT_VERSION_INFO = Object.freeze({
    engineVersion: '0.1.0',
    contentVersion: '0.1.0',
    saveVersion: '1.0.0',
    schemaVersion: '1.0.0'
});

export class ProjectVersion {
    constructor(info = PROJECT_VERSION_INFO) {
        this.info = { ...PROJECT_VERSION_INFO, ...info };
    }

    getInfo() {
        return { ...this.info };
    }
}

export function createProjectVersion(info) {
    return new ProjectVersion(info);
}
