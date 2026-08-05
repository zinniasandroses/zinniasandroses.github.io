export class TileDefinition {
    constructor({
        id,
        gridPosition = { x: 0, y: 0 },
        worldPosition = { x: 0, y: 0 },
        terrainType = 'grass',
        elevation = 0,
        slope = 0,
        moisture = 0,
        soilType = 'loam',
        soilPh = 6.5,
        fertility = 0,
        drainage = 0,
        temperatureModifier = 0,
        waterTable = 0,
        currentOwner = null,
        currentObject = null,
        currentCrop = null,
        currentBuilding = null,
        currentAnimal = null,
        movementCost = 1,
        buildable = true,
        walkable = true,
        occupied = false,
        reserved = false,
        visibility = 'hidden',
        discoveryState = 'undiscovered',
        futureUtilityConnections = [],
        soil = {}
    } = {}) {
        this.id = id ?? `tile-${gridPosition.x}-${gridPosition.y}`;
        this.gridPosition = { ...gridPosition };
        this.worldPosition = { ...worldPosition };
        this.terrainType = terrainType;
        this.elevation = elevation;
        this.slope = slope;
        this.moisture = moisture;
        this.soilType = soilType;
        this.soilPh = soilPh;
        this.fertility = fertility;
        this.drainage = drainage;
        this.temperatureModifier = temperatureModifier;
        this.waterTable = waterTable;
        this.currentOwner = currentOwner;
        this.currentObject = currentObject;
        this.currentCrop = currentCrop;
        this.currentBuilding = currentBuilding;
        this.currentAnimal = currentAnimal;
        this.movementCost = movementCost;
        this.buildable = buildable;
        this.walkable = walkable;
        this.occupied = occupied;
        this.reserved = reserved;
        this.visibility = visibility;
        this.discoveryState = discoveryState;
        this.futureUtilityConnections = [...futureUtilityConnections];
        this.soil = {
            organicMatter: soil.organicMatter ?? 0,
            nitrogen: soil.nitrogen ?? 0,
            phosphorus: soil.phosphorus ?? 0,
            potassium: soil.potassium ?? 0,
            compaction: soil.compaction ?? 0,
            acidity: soil.acidity ?? soilPh,
            waterSaturation: soil.waterSaturation ?? 0,
            temperature: soil.temperature ?? 0,
            weedPressure: soil.weedPressure ?? 0,
            diseaseRisk: soil.diseaseRisk ?? 0
        };
    }

    serialize() {
        return {
            id: this.id,
            gridPosition: { ...this.gridPosition },
            worldPosition: { ...this.worldPosition },
            terrainType: this.terrainType,
            elevation: this.elevation,
            slope: this.slope,
            moisture: this.moisture,
            soilType: this.soilType,
            soilPh: this.soilPh,
            fertility: this.fertility,
            drainage: this.drainage,
            temperatureModifier: this.temperatureModifier,
            waterTable: this.waterTable,
            currentOwner: this.currentOwner,
            currentObject: this.currentObject,
            currentCrop: this.currentCrop,
            currentBuilding: this.currentBuilding,
            currentAnimal: this.currentAnimal,
            movementCost: this.movementCost,
            buildable: this.buildable,
            walkable: this.walkable,
            occupied: this.occupied,
            reserved: this.reserved,
            visibility: this.visibility,
            discoveryState: this.discoveryState,
            futureUtilityConnections: [...this.futureUtilityConnections],
            soil: { ...this.soil }
        };
    }
}

export function createTileDefinition(options = {}) {
    return new TileDefinition(options);
}
