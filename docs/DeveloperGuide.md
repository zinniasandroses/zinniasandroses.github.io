# Developer Guide

## Folder structure
- `src/` contains engine and system code.
- `data/` contains configuration and content JSON.
- `docs/` contains written project documentation.
- `script.js` remains the prototype entry point for now.

## How to add a crop
1. Add a new JSON entry to `data/content/crops.json`.
2. Keep the content in a registry-compatible shape.
3. Validate it via the content validation layer.
4. Register it through the content loader.

## How to add an animal
1. Add a JSON definition under `data/content/animals.json`.
2. Use a stable `id`.
3. Keep attributes data-driven.

## How to add a building
1. Add a JSON entry to `data/content/buildings.json`.
2. Keep all building metadata in the content file.

## How to add an event
1. Add a template entry to `data/content/events.json`.
2. Attach severity, probability, and cooldown metadata.

## How to create dialogue
1. Add dialogue payloads to `data/content/dialogue.json`.
2. Use stable IDs and speaker references.

## How validation works
- Content is validated against schema definitions.
- Validation errors are reported but should not terminate the game.
- Item and resource definitions should include required metadata such as category, weight, stack size, tags, localization readiness, and asset references.

## How registries work
Registries should only discover, validate, store, and lookup content objects. They should not embed game rules.

## Item and resource registry architecture
- `ItemRegistry`: validates and registers the generic item model.
- `ResourceRegistry`: validates and registers the generic resource model.
- `ItemCategoryRegistry`: stores category metadata in a data-driven catalog.
- `CurrencyRegistry`: stores currency conversion rules that future systems can query without hardcoding.
- `InventoryFoundation`: stores stacks, supports filter/search/sort, and is ready for future container systems.

## How saves work
Save files are versioned. The save layer is separate from the runtime logic so migrations can be added later.

## Farm framework architecture
- `Farm` is the first-class object that owns all player-facing simulation state.
- `StatisticsManager` tracks durable aggregated metrics and can register future metrics automatically.
- `FarmStateManager` stores temporary state modifiers such as drought, flood, economic boom, recession, storm damage, and wildfire recovery.
- `StorageService`, `PowerService`, `WaterService`, `LandService`, `OwnershipService`, and `ExpansionService` remain independent service managers and should not be merged into one monolithic object.

## Farm settings data
Use `data/farm/*.json` for default values and difficulty profiles. Keep all configurable farm values in JSON instead of hardcoding them into engine code.

## How to extend systems
- Keep one clear responsibility per module.
- Communicate through the EventBus whenever reasonable.
- Avoid circular dependencies.
- Keep item, resource, and currency definitions data-driven and reusable.

## WorldManager
The `WorldManager` is responsible for the world boundary, generation, regions, and placement orchestration. It should not contain gameplay logic.

## Parcel system
The parcel system is data-driven. Add parcel definitions in `data/world/parcels.json` and keep parcel metadata stable.

## Placement system
The placement system is the generic object-placement boundary for all world objects. Use it for buildings, trees, rocks, decorations, and future machinery.

## Object lifecycle
Each world object should be modeled with:
- unique ID
- position
- rotation
- owner
- definition data
- interaction rules
- save payload

## Land and tile simulation architecture
- `GridSystem` is the persistent tile-first map foundation.
- `TileDefinition` holds the universal per-tile data contract.
- `TerrainRegistry` stores terrain data as loadable JSON content.
- `PathfindingService` provides a generic movement interface that is future-proof for players, animals, farmhands, neighbors, and vehicles.
- `WorldManager` now orchestrates the grid, terrain catalog, pathfinding service, and broader world-snapshot surfaces.

## Developer mode expansion
Use the new developer panels for the next-tier world inspection layer:
- `TileInspectorPanel`
- `SoilInspectorPanel`
- `TerrainPainterPanel` (disabled placeholder)
- `PathfindingOverlayPanel`
- `ChunkViewerPanel`

## Save strategy
World saves store changes, not the whole map. Keep delta-based world edits in the save layer for efficiency and future compatibility.
