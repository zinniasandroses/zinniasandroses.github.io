export class WaterService {
    constructor() {
        this.waterStorage = 0;
        this.utilization = 0;
    }

    setStorage(value) {
        this.waterStorage = value;
        return this;
    }

    setUtilization(value) {
        this.utilization = value;
        return this;
    }

    getState() {
        return {
            waterStorage: this.waterStorage,
            utilization: this.utilization
        };
    }
}

export function createWaterService() {
    return new WaterService();
}
