export const SAVE_SCHEMA_VERSION = 1;

export class SaveSystem {
    constructor({ storageKey, version = SAVE_SCHEMA_VERSION, migrations = [] }) {
        this.storageKey = storageKey;
        this.version = version;
        this.migrations = migrations;
    }

    load() {
        const raw = localStorage.getItem(this.storageKey);
        if (!raw) {
            return null;
        }

        try {
            const parsed = JSON.parse(raw);
            return this.migrate(parsed);
        } catch (error) {
            console.warn(`Failed to load save from ${this.storageKey}:`, error);
            return null;
        }
    }

    save(state) {
        const payload = {
            schemaVersion: this.version,
            data: state
        };

        localStorage.setItem(this.storageKey, JSON.stringify(payload));
        return payload;
    }

    migrate(savePayload) {
        if (!savePayload || typeof savePayload !== 'object') {
            return null;
        }

        const version = savePayload.schemaVersion ?? 0;
        let migrated = structuredClone(savePayload);

        for (const migration of this.migrations) {
            if (migration.from <= version && version < migration.to) {
                migrated = migration.up(migrated);
            }
        }

        return migrated;
    }
}

export function createSaveSystem(options) {
    return new SaveSystem(options);
}
