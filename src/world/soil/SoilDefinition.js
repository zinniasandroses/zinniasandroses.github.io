export class SoilDefinition {
    constructor({ id, label, description = '', organicMatter = 0, nitrogen = 0, phosphorus = 0, potassium = 0, compaction = 0, acidity = 6.5, waterSaturation = 0, temperature = 0, weedPressure = 0, diseaseRisk = 0 } = {}) {
        this.id = id;
        this.label = label ?? id;
        this.description = description;
        this.organicMatter = organicMatter;
        this.nitrogen = nitrogen;
        this.phosphorus = phosphorus;
        this.potassium = potassium;
        this.compaction = compaction;
        this.acidity = acidity;
        this.waterSaturation = waterSaturation;
        this.temperature = temperature;
        this.weedPressure = weedPressure;
        this.diseaseRisk = diseaseRisk;
    }

    serialize() {
        return {
            id: this.id,
            label: this.label,
            description: this.description,
            organicMatter: this.organicMatter,
            nitrogen: this.nitrogen,
            phosphorus: this.phosphorus,
            potassium: this.potassium,
            compaction: this.compaction,
            acidity: this.acidity,
            waterSaturation: this.waterSaturation,
            temperature: this.temperature,
            weedPressure: this.weedPressure,
            diseaseRisk: this.diseaseRisk
        };
    }
}

export function createSoilDefinition(options = {}) {
    return new SoilDefinition(options);
}
