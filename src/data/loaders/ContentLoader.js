export class ContentLoader {
    constructor({ basePath = './data/content' } = {}) {
        this.basePath = basePath;
        this.registry = new Map();
    }

    async loadJsonFile(filePath) {
        const response = await fetch(`${this.basePath}/${filePath}`);
        if (!response.ok) {
            throw new Error(`Unable to load content file: ${filePath}`);
        }

        return response.json();
    }

    async discoverEntries(entries) {
        const results = [];

        for (const entry of entries) {
            try {
                const payload = await this.loadJsonFile(entry.filePath);
                const normalized = Array.isArray(payload) ? payload : [payload];
                results.push(...normalized.map((item) => ({ ...item, __contentType: entry.type })));
            } catch (error) {
                console.warn(`Content discovery failed for ${entry.filePath}:`, error);
            }
        }

        return results;
    }

    register(type, item) {
        const bucket = this.registry.get(type) ?? [];
        bucket.push(item);
        this.registry.set(type, bucket);
        return item;
    }

    get(type) {
        return this.registry.get(type) ?? [];
    }
}

export function createContentLoader(options) {
    return new ContentLoader(options);
}
