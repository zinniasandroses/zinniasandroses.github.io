import { CONTENT_CATALOG } from './contentCatalog.js';
import { ContentLoader } from './ContentLoader.js';

export class AutoContentDiscovery {
    constructor({ basePath = './data/content', loader = new ContentLoader({ basePath }) } = {}) {
        this.basePath = basePath;
        this.loader = loader;
    }

    async discover() {
        const entries = await this.loader.discoverEntries(CONTENT_CATALOG);
        entries.forEach((entry) => {
            this.loader.register(entry.__contentType, entry);
        });

        return this.loader.registry;
    }
}

export function createAutoContentDiscovery(options) {
    return new AutoContentDiscovery(options);
}
