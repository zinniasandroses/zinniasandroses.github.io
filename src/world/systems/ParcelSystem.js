export class ParcelSystem {
    constructor({ parcels = [] } = {}) {
        this.parcels = parcels.map((parcel) => ({
            id: parcel.id,
            owner: parcel.owner ?? 'neutral',
            terrainType: parcel.terrainType ?? 'grassland',
            biome: parcel.biome ?? 'fields',
            elevation: parcel.elevation ?? 0,
            moisture: parcel.moisture ?? 0,
            soilType: parcel.soilType ?? 'loam',
            soilPh: parcel.soilPh ?? 6.5,
            drainage: parcel.drainage ?? 'moderate',
            fertility: parcel.fertility ?? 0,
            waterAccess: parcel.waterAccess ?? false,
            treeDensity: parcel.treeDensity ?? 0,
            rockDensity: parcel.rockDensity ?? 0,
            roadAccess: parcel.roadAccess ?? false,
            currentUsage: parcel.currentUsage ?? 'empty',
            buildable: parcel.buildable ?? true,
            protected: parcel.protected ?? false,
            futureReserved: parcel.futureReserved ?? false
        }));
    }

    getParcel(id) {
        return this.parcels.find((parcel) => parcel.id === id) ?? null;
    }

    getAllParcels() {
        return [...this.parcels];
    }

    createParcel(parcel) {
        this.parcels.push({ ...parcel });
        return parcel;
    }
}

export function createParcelSystem(options) {
    return new ParcelSystem(options);
}
