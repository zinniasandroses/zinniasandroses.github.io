export class PowerService {
    constructor() {
        this.powerGeneration = 0;
        this.powerConsumption = 0;
    }

    setGeneration(value) {
        this.powerGeneration = value;
        return this;
    }

    setConsumption(value) {
        this.powerConsumption = value;
        return this;
    }

    getState() {
        return {
            powerGeneration: this.powerGeneration,
            powerConsumption: this.powerConsumption
        };
    }
}

export function createPowerService() {
    return new PowerService();
}
