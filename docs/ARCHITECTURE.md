# Architecture

## Production direction
The project is now moving from a single-file browser prototype into a production-minded, data-driven simulation architecture.

## Architecture goals
- Preserve the current prototype UI and CSS.
- Keep gameplay behavior stable.
- Extract only stable, self-contained, reusable code.
- Use registries, validation, and event-driven communication.
- Keep content loadable without touching engine code.
- Keep the save layer versioned and future-compatible.

## Layer model
1. Prototype shell
   - [index.html](index.html), [style.css](style.css), and [script.js](script.js) remain the current interactive layer.
2. Foundation layer
   - Event bus, validation, registry, save system, and version metadata.
3. Simulation layer
   - Calendar, season, weather, event orchestration, and world-state management.
4. World layer
   - WorldManager, ParcelSystem, PlacementSystem, world objects, region definitions, and delta save strategy.
5. Content layer
   - JSON content, schemas, templates, and discovery/loading systems.
6. Item and resource layer
   - ItemDefinition, ItemRegistry, ItemCategoryRegistry, ResourceDefinition, ResourceRegistry, InventoryFoundation, currency definitions, and data-driven item templates.
7. Farm management layer
   - Farm model, farm state manager, statistics manager, ownership service, land service, storage service, power service, water service, and expansion service.

## Current architecture status
The engine is not yet wired into every gameplay system, but the boundaries are now present for future extension without redesign.

## System responsibilities
- SimulationManager: orchestrates world updates and emits simulation lifecycle events.
- CalendarService: tracks date-like world state.
- SeasonManager: tracks the current season and emits season changes.
- WeatherManager: tracks weather state from data definitions.
- EventManager: acts as the future event orchestration boundary.
- Registry: validates, stores, and looks up content.
- ItemRegistry: validates, registers, and searches item definitions.
- ResourceRegistry: validates, registers, and searches resource definitions.
- InventoryFoundation: provides stack, sort, filter, and search support for future containers and warehouses.
- CurrencyRegistry: stores data-driven conversion metadata.
- ContentLoader: discovers and registers content entries.
- Farm: the first-class farm object that owns the player's long-term simulation state.
- StatisticsManager: tracks the durable business metrics and play-history snapshot.
- StorageService, WaterService, PowerService, LandService, OwnershipService, ExpansionService: independent service boundaries around the farm's shared systems.
- SaveSystem: provides a versioned save contract.

## Farm architecture
The farm object is a stable simulation entity that owns the player's identity, season/day state, parcel ownership state, farm-wide resources, capacity profile, and future management diagnostics.

## Ownership system
Ownership is parcel-centric. Each parcel is a world-owned boundary that can attach to the farm and later be used for expansion, placements, and utility registration.

## Statistics system
The statistics manager registers durable metrics for time in game, money earned/spent, harvests, animals raised, tree chopping, fish caught, construction, neighbors helped, and other future event counters.

## Resource flow
Farm-wide resources are stored as a separate resource bucket from inventory stacks. This keeps player inventory and farm state from collapsing into one global data object.

## Expansion framework
Expansion should remain parcel-based and attach more land to the player without any hardcoded maximum. The expansion service is the dedicated boundary for the farm's land growth path.

## Future multiplayer considerations
The farm model is serialized independently so multiple future farm entities can coexist under one save structure or a multiplayer-aware service model.

## Item lifecycle
1. A data entry is loaded from JSON.
2. The registry validates the payload.
3. The registry stores a stable definition.
4. The event bus emits lifecycle events such as `ItemCreated`, `ItemAdded`, `ItemRemoved`, and `ItemCrafted`.
5. Future gameplay systems consume the registry rather than specializing around a single product.

## Extension principle
Every future gameplay system should plug into the simulation backbone rather than replacing it.
