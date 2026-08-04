import { eventBus } from '../core/EventBus.js';
import { GameEvents } from '../events/EventNames.js';
import { createStatisticsManager } from './managers/StatisticsManager.js';
import { createStorageService } from './services/StorageService.js';
import { createPowerService } from './services/PowerService.js';
import { createWaterService } from './services/WaterService.js';
import { createLandService } from './services/LandService.js';
import { createOwnershipService } from './services/OwnershipService.js';
import { createExpansionService } from './services/ExpansionService.js';

export class Farm {
    constructor({ definition = {}, resourceState = {}, parcels = [], farmState = 'normal' } = {}) {
        this.id = definition.id ?? 'farm-player';
        this.name = definition.name ?? 'Player Farm';
        this.owner = definition.owner ?? 'player';
        this.establishedDate = definition.establishedDate ?? new Date().toISOString();
        this.currentDay = definition.currentDay ?? 1;
        this.currentSeason = definition.currentSeason ?? 'spring';
        this.currentYear = definition.currentYear ?? 1;
        this.currentWeather = definition.currentWeather ?? 'sunny';
        this.farmReputation = definition.farmReputation ?? 0;
        this.netWorth = definition.netWorth ?? 0;
        this.landOwned = definition.landOwned ?? 25;
        this.developedAcres = definition.developedAcres ?? 0;
        this.undevelopedAcres = definition.undevelopedAcres ?? this.landOwned;
        this.storageCapacity = definition.storageCapacity ?? 0;
        this.animalCapacity = definition.animalCapacity ?? 0;
        this.equipmentCapacity = definition.equipmentCapacity ?? 0;
        this.fuelStorage = definition.fuelStorage ?? 0;
        this.waterStorage = definition.waterStorage ?? 0;
        this.powerGeneration = definition.powerGeneration ?? 0;
        this.powerConsumption = definition.powerConsumption ?? 0;
        this.population = definition.population ?? 1;
        this.employees = definition.employees ?? 0;
        this.farmhands = definition.farmhands ?? 0;
        this.vehicles = definition.vehicles ?? [];
        this.expansionLevel = definition.expansionLevel ?? 1;
        this.difficulty = definition.difficulty ?? 'normal';
        this.gameVersion = definition.gameVersion ?? '0.0.0';
        this.saveVersion = definition.saveVersion ?? 1;

        this.farmState = farmState;
        this.parcels = parcels;
        this.resources = { ...resourceState };
        this.statistics = createStatisticsManager();
        this.services = {
            storage: createStorageService(),
            power: createPowerService(),
            water: createWaterService(),
            land: createLandService({ landOwned: this.landOwned }),
            statistics: this.statistics,
            ownership: createOwnershipService({ parcels }),
            expansion: createExpansionService({ landOwned: this.landOwned })
        };

        eventBus.emit(GameEvents.GameLoaded, {
            farm: this.serialize(),
            source: 'farm-framework'
        });
    }

    serialize() {
        return {
            id: this.id,
            name: this.name,
            owner: this.owner,
            establishedDate: this.establishedDate,
            currentDay: this.currentDay,
            currentSeason: this.currentSeason,
            currentYear: this.currentYear,
            currentWeather: this.currentWeather,
            farmReputation: this.farmReputation,
            netWorth: this.netWorth,
            landOwned: this.landOwned,
            developedAcres: this.developedAcres,
            undevelopedAcres: this.undevelopedAcres,
            storageCapacity: this.storageCapacity,
            animalCapacity: this.animalCapacity,
            equipmentCapacity: this.equipmentCapacity,
            fuelStorage: this.fuelStorage,
            waterStorage: this.waterStorage,
            powerGeneration: this.powerGeneration,
            powerConsumption: this.powerConsumption,
            population: this.population,
            employees: this.employees,
            farmhands: this.farmhands,
            vehicles: [...this.vehicles],
            expansionLevel: this.expansionLevel,
            difficulty: this.difficulty,
            gameVersion: this.gameVersion,
            saveVersion: this.saveVersion,
            farmState: this.farmState,
            parcels: [...this.parcels],
            resources: { ...this.resources }
        };
    }

    hydrate(payload = {}) {
        Object.assign(this, payload);
        this.services = {
            storage: createStorageService(),
            power: createPowerService(),
            water: createWaterService(),
            land: createLandService({ landOwned: this.landOwned }),
            statistics: this.statistics ?? createStatisticsManager(),
            ownership: createOwnershipService({ parcels: payload.parcels ?? [] }),
            expansion: createExpansionService({ landOwned: this.landOwned })
        };
        return this;
    }
}

export function createFarm(options = {}) {
    return new Farm(options);
}
