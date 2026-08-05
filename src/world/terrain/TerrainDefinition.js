export class TerrainDefinition {
    constructor({ id, label, type = 'terrain', description = '', walkable = true, buildable = true, movementCost = 1, terrainTags = [] } = {}) {
        this.id = id;
        this.label = label ?? id;
        this.type = type;
        this.description = description;
        this.walkable = walkable;
        this.buildable = buildable;
        this.movementCost = movementCost;
        this.terrainTags = [...terrainTags];
    }

    serialize() {
        return {
            id: this.id,
            label: this.label,
            type: this.type,
            description: this.description,
            walkable: this.walkable,
            buildable: this.buildable,
            movementCost: this.movementCost,
            terrainTags: [...this.terrainTags]
        };
    }
}

export function createTerrainDefinition(options = {}) {
    return new TerrainDefinition(options);
}
