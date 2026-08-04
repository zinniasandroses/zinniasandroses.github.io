export class LandService {
    constructor({ landOwned = 25 } = {}) {
        this.landOwned = landOwned;
        this.parcels = [];
    }

    addParcel(parcel) {
        this.parcels.push(parcel);
        return parcel;
    }

    getState() {
        return {
            landOwned: this.landOwned,
            parcelCount: this.parcels.length
        };
    }
}

export function createLandService(options = {}) {
    return new LandService(options);
}
