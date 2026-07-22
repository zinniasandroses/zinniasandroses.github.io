export class WorldObject {
    constructor({ id, type, position, rotation = 0, owner = 'neutral', definition = {}, interactionRules = {}, saveData = {} } = {}) {
        this.id = id;
        this.type = type;
        this.position = position;
        this.rotation = rotation;
        this.owner = owner;
        this.definition = definition;
        this.interactionRules = interactionRules;
        this.saveData = saveData;
    }

    getSnapshot() {
        return {
            id: this.id,
            type: this.type,
            position: { ...this.position },
            rotation: this.rotation,
            owner: this.owner,
            definition: { ...this.definition },
            interactionRules: { ...this.interactionRules },
            saveData: { ...this.saveData }
        };
    }
}

export function createWorldObject(options) {
    return new WorldObject(options);
}
