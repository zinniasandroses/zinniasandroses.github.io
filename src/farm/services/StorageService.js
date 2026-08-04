export class StorageService {
    constructor() {
        this.storageCapacity = 0;
        this.utilization = 0;
    }

    setCapacity(capacity) {
        this.storageCapacity = capacity;
        return this;
    }

    setUtilization(utilization) {
        this.utilization = utilization;
        return this;
    }

    getState() {
        return {
            storageCapacity: this.storageCapacity,
            utilization: this.utilization
        };
    }
}

export function createStorageService() {
    return new StorageService();
}
