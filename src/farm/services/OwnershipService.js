export class OwnershipService {
    constructor({ parcels = [] } = {}) {
        this.parcels = parcels;
    }

    addParcel(parcel) {
        this.parcels.push(parcel);
        return parcel;
    }

    getParcels() {
        return [...this.parcels];
    }
}

export function createOwnershipService(options = {}) {
    return new OwnershipService(options);
}
