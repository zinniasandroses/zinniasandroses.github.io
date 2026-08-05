# Milestones

## Milestone 1 - Project Foundation
Date: 2026-07-22
Objectives:
- Create a non-invasive architectural foundation.
- Preserve the working browser prototype.
- Add reusable modules for events, save, time, content loading, validation, and developer hooks.

Completed work:
- Added the first modular folder structure under `src/`.
- Created core utilities for event bus, save system, and time foundation.
- Added validation, registry, data loader, and developer mode scaffolds.
- Added content discovery placeholders and architecture documentation.

Files created:
- `src/core/EventBus.js`
- `src/core/SaveSystem.js`
- `src/core/TimeSystem.js`
- `src/validation/schema.js`
- `src/registries/Registry.js`
- `src/data/loaders/ContentLoader.js`
- `src/data/loaders/contentCatalog.js`
- `src/events/EventNames.js`
- `src/developer/DeveloperMode.js`
- `docs/ARCHITECTURE.md`
- `data/content/*.json`

Files modified:
- none

Architecture changes:
- Introduced the first data-driven foundation and documentation shell.

Remaining work:
- Begin simulation layering and manager orchestration.

Known issues:
- Existing gameplay remains in a single `script.js` file.
- No manager orchestration is yet active.

Technical debt:
- Browser prototype still mixes rules, rendering, and state.

Recommendations for the next milestone:
- Build the simulation backbone without touching current gameplay behavior.

## Milestone 2 - Core Simulation Framework
Date: 2026-07-22
Objectives:
- Create a simulation backbone that can coordinate future systems.
- Preserve the current prototype and its UI/CSS.
- Introduce modular manager and service abstractions without gameplay logic.

Completed work:
- Added `SimulationManager` orchestration.
- Added `CalendarService`, `SeasonManager`, `WeatherManager`, and `EventManager` shells.
- Added configurable JSON under `data/config/`.
- Added simulation docs and developer inspection placeholder panels.

Files created:
- `src/simulation/SimulationManager.js`
- `src/simulation/config/simulationConfig.js`
- `src/simulation/services/CalendarService.js`
- `src/simulation/managers/SeasonManager.js`
- `src/simulation/managers/WeatherManager.js`
- `src/simulation/managers/EventManager.js`
- `src/developer/panels/*.js`
- `data/config/*.json`
- `docs/SIMULATION_ARCHITECTURE.md`

Files modified:
- `MILESTONES.md`
- `docs/ARCHITECTURE.md`

Architecture changes:
- Introduced a simulation layer separate from the prototype shell.
- Added event-driven orchestration boundaries.

Remaining work:
- Convert the project documentation set into a formal production artifact set.
- Add versioning, validation reporting, automated discovery, and content templates.

Known issues:
- The simulation layer is scaffolded, but it is not yet connected to the live runtime gameplay shell.
- Some content is still placeholder-only.

Technical debt:
- The active game loop remains concentrated in `script.js`.

Recommendations for the next milestone:
- Formalize documentation and content-management infrastructure while preserving gameplay behavior.

## Milestone 3 - Project Transformation
Date: 2026-07-22
Objectives:
- Build a production-grade documentation and data foundation.
- Keep the prototype playable throughout modernization.
- Prepare the repository for long-term maintainability and future content loading.

Completed work:
- Created the missing project documentation set: GameBible, GDD, TDD, API, JSON schemas, DeveloperGuide, ContentCreationGuide, Architecture, and SystemDependencies.
- Added schema files and starter content templates.
- Added version metadata, validation diagnostics, and automatic discovery scaffolding.
- Updated the prompt/index milestone documentation.

Files created:
- `docs/GameBible.md`
- `docs/GDD.md`
- `docs/TDD.md`
- `docs/PROMPT_INDEX.md`
- `docs/API.md`
- `docs/JSON_SCHEMAS.md`
- `docs/DeveloperGuide.md`
- `docs/ContentCreationGuide.md`
- `docs/SystemDependencies.md`
- `schemas/*.json`
- `templates/*.json`
- `src/core/ProjectVersion.js`
- `src/validation/contentDiagnostics.js`
- `src/data/loaders/AutoContentDiscovery.js`

Files modified:
- `docs/ARCHITECTURE.md`
- `MILESTONES.md`
- `docs/PROMPT_INDEX.md`

Architecture changes:
- Added version metadata and the first content-validation diagnostics path.
- Added automatic content discovery scaffolding.
- Formalized the documentation and config baselines needed for future engines and mods.

Remaining work:
- Wire the new orchestration layer into the running prototype safely.
- Continue reducing the responsibilities inside `script.js` in small, safe extractions.

Known issues:
- The active game loop still needs controlled extraction.
- The engine is not yet fully integrated with the full content registry pipeline.

Technical debt:
- The production architecture is now documented, but runtime integration remains incremental.

Recommendations for the next milestone:
- Begin a safe utility/config extraction from `script.js` and connect the new simulation and content foundation to startup without changing gameplay behavior.

## Milestone 5 - Item & Resource Framework
Date: 2026-08-04
Objectives:
- Build a universal item/resource backbone that keeps gameplay logic out of content definitions.
- Establish registry-backed, data-driven item and resource definitions.
- Preserve existing gameplay, UI, and CSS while introducing only the framework layer.

Completed work:
- Added a universal `ItemDefinition` model with shared fields for identity, metadata, tags, value, stack capacity, and future components.
- Added resource definitions for currencies, reputation, water, and fuel with bounds, regeneration, consumption, and serialization metadata.
- Expanded the registry layer with `ItemRegistry`, `ResourceRegistry`, `ItemCategoryRegistry`, and `CurrencyRegistry`.
- Added an inventory foundation supporting stack add/remove, search, filter, sorting, and serialization.
- Added starter data for item definitions, categories, resources, and currencies in data-driven JSON.
- Added templates for item, seed, and resource definitions.
- Expanded developer-mode placeholder inspectors for item and resource registry inspection.
- Added the item lifecycle event vocabulary to the shared event bus surface.

Files created:
- `src/items/models/ItemDefinition.js`
- `src/resources/models/ResourceDefinition.js`
- `src/items/ItemRegistry.js`
- `src/resources/ResourceRegistry.js`
- `src/items/ItemCategoryRegistry.js`
- `src/inventory/InventoryFoundation.js`
- `src/currency/models/CurrencyDefinition.js`
- `src/currency/CurrencyRegistry.js`
- `src/currency/CurrencyConversionService.js`
- `src/developer/panels/ItemRegistryInspectorPanel.js`
- `src/developer/panels/ResourceRegistryInspectorPanel.js`
- `docs/ItemResourceFramework.md`
- `data/content/items.json`
- `data/content/resources.json`
- `data/content/currencies.json`
- `data/content/itemCategories.json`
- `templates/template_item.json`
- `templates/template_resource.json`
- `templates/template_seed.json`

Files modified:
- `src/events/EventNames.js`
- `docs/Architecture.md`
- `docs/DeveloperGuide.md`
- `docs/GameBible.md`
- `docs/JSON_SCHEMAS.md`
- `docs/ContentCreationGuide.md`
- `MILESTONES.md`
- `docs/PROMPT_INDEX.md`

Architecture changes:
- Introduced a generic item/resource layer that is separate from the current prototype loop.
- Kept the prototype shell and existing UI/CSS intact.
- Added data-driven categories and currency metadata.
- Added future-ready item lifecycle event names to the shared event bus.

Remaining work:
- Attach the new registry layer to the runtime developer tooling in a safe, non-gameplay way.
- Use the new structures for a future save migration path and item-aware data loading.

Known issues:
- No gameplay systems consume the new item/resource model yet.
- No UI is present for inventory inspection or template viewing.

Technical debt:
- The new item/resource layer is architecture-only and intentionally not yet attached to gameplay systems.

Recommendations for the next milestone:
- Create a runtime developer inspection bridge so the item/resource registries become observable in the live prototype with zero gameplay changes.

## Milestone 6 - Farm Management Framework
Date: 2026-08-04
Objectives:
- Build the permanent Farm Management Framework as the first-class simulation owner.
- Keep crop growth, animal systems, and building systems out of scope for this milestone.
- Preserve the current gameplay loop, UI, and CSS while adding stable farm data, diagnostics, and runtime-ready service boundaries.

Completed work:
- Added a dedicated `Farm` model that serializes the player's persistent simulation identity and runtime farm state.
- Added `StatisticsManager` for game-wide metric registration and counters that can be extended later without changing the player loop.
- Added `FarmStateManager` as a placeholder registry for temporary farm modifiers such as drought, flood, economic boom, recession, wildfire recovery, and storm damage.
- Added independent farm service shells for storage, power, water, land, ownership, and expansion.
- Added starter farm data definitions under `data/farm/` for difficulty and default farm initialization.
- Added placeholder developer inspection panels for farm, resource, parcel, expansion, and state view summaries.
- Updated the architecture and content documentation to reflect the new farm-owned simulation architecture.

Files created:
- `src/farm/Farm.js`
- `src/farm/managers/StatisticsManager.js`
- `src/farm/managers/FarmStateManager.js`
- `src/farm/services/StorageService.js`
- `src/farm/services/PowerService.js`
- `src/farm/services/WaterService.js`
- `src/farm/services/LandService.js`
- `src/farm/services/OwnershipService.js`
- `src/farm/services/ExpansionService.js`
- `src/developer/panels/FarmInspectorPanel.js`
- `src/developer/panels/StatisticsViewerPanel.js`
- `src/developer/panels/ResourceViewerPanel.js`
- `src/developer/panels/ParcelViewerPanel.js`
- `src/developer/panels/ExpansionViewerPanel.js`
- `src/developer/panels/FarmStateViewerPanel.js`
- `data/farm/starterFarm.json`
- `data/farm/difficulty_normal.json`
- `data/farm/difficulty_easy.json`
- `data/farm/difficulty_hard.json`
- `data/farm/resource_defaults.json`
- `data/farm/farm_defaults.json`
- `docs/FarmFrameworkSummary.md`

Files modified:
- `docs/Architecture.md`
- `docs/DeveloperGuide.md`
- `docs/GameBible.md`
- `docs/GDD.md`
- `docs/TDD.md`
- `docs/JSON_SCHEMAS.md`
- `docs/ContentCreationGuide.md`
- `MILESTONES.md`
- `docs/PROMPT_INDEX.md`

Architecture changes:
- Introduced the farm as a first-class simulation object that owns the long-term persistent state for the player.
- Separated persistent farm metrics, farm state modifiers, and farm service responsibilities into independent, future-ready service boundaries.
- Preserved the current prototype shell while building a stable runtime foundation for later crop, animal, and building systems.

Remaining work:
- Wire the farm object into the live save contract and developer observability path without altering gameplay rules.
- Keep the framework abstract until crop growth, animals, and buildings are fully modeled in later milestones.

Known issues:
- The farm framework is scaffolded but not yet consumed by active crop or animal logic.
- Service effects are intentionally placeholder-only and should remain inert until their gameplay rules are defined.

Technical debt:
- The farm layer is now an architecture-ready backbone, but its deeper gameplay effects are intentionally deferred.

Recommendations for the next milestone:
- Connect the farm model to the save payload and runtime developer observers so the framework becomes inspectable in the live browser prototype without modifying any gameplay behavior.

## Milestone 7 - Land & Tile Simulation
Date: 2026-08-04
Objectives:
- Build the permanent land simulation foundation that all future gameplay systems will use.
- Keep crops, buildings, and animals out of scope for the milestone.
- Preserve the current prototype loop, UI, CSS, and save behavior while introducing a tile-first world foundation.

Completed work:
- Added `TileDefinition` as the universal tile data contract with coordinates, terrain, owner, object, crop/building/animal references, movement, occupancy, and visibility metadata.
- Added `GridSystem` as the permanent grid model with world origin, chunk size, coordinate lookup, dirty tile tracking, chunk snapshot retrieval, and event emission.
- Added `TerrainDefinition` and `TerrainRegistry` to keep terrain types data-driven and JSON-loadable.
- Added `SoilDefinition` to store the soil chemistry and state fields required by the future land simulation.
- Added a generic `PathfindingService` foundation interface for future player, animal, farmhand, neighbor, and vehicle movement routing.
- Extended the shared event vocabulary with `TileChanged`, `ObjectPlaced`, `ObjectRemoved`, `TerrainChanged`, `OwnershipChanged`, `SoilChanged`, and `WaterChanged` events.
- Added developer placeholder tools for tile, soil, terrain painting, pathfinding overlay, and chunk inspection.
- Added JSON templates for terrain, tile types, soil types, biome definitions, and terrain decorations.

Files created:
- `src/world/grid/TileDefinition.js`
- `src/world/grid/GridSystem.js`
- `src/world/terrain/TerrainDefinition.js`
- `src/world/terrain/TerrainRegistry.js`
- `src/world/soil/SoilDefinition.js`
- `src/pathfinding/PathfindingService.js`
- `src/developer/panels/TileInspectorPanel.js`
- `src/developer/panels/SoilInspectorPanel.js`
- `src/developer/panels/TerrainPainterPanel.js`
- `src/developer/panels/PathfindingOverlayPanel.js`
- `src/developer/panels/ChunkViewerPanel.js`
- `templates/template_terrain.json`
- `templates/template_tile_type.json`
- `templates/template_soil_type.json`
- `templates/template_biome_definition.json`
- `templates/template_terrain_decoration.json`
- `PROJECTVISION.md`
- `GAME_FEATURE_QUEUE.md`

Files modified:
- `src/world/systems/WorldManager.js`
- `src/events/EventNames.js`
- `docs/Architecture.md`
- `docs/DeveloperGuide.md`
- `docs/GameBible.md`
- `docs/JSON_SCHEMAS.md`
- `docs/ContentCreationGuide.md`
- `docs/PROMPT_INDEX.md`
- `MILESTONES.md`

Architecture changes:
- Introduced a tile-first land simulation foundation that is independent from crop, animal, and building logic.
- Kept the active browser prototype stable while placing every future gameplay object behind the world grid and tile boundary.
- Added a chunk-aware dirty-tile operational model that is designed for efficient delta saves.
- Preserved the modular, data-driven philosophy through registries, templates, and event-driven lifecycle propagation.

Remaining work:
- Connect the tile grid into a save migration path and developer runtime bridge without changing the active player loop.
- Expand the terrain registry and content validation pipeline with richer biome/terrain content definitions.
- Keep all future land systems inert until their gameplay rules are explicitly designed.

Known issues:
- Tile rendering and terrain painting are not yet exposed to the live UI.
- No gameplay systems consume the tile and soil data yet.
- Pathfinding remains a placeholder interface and not a route optimizer.

Technical debt:
- The land simulation is now structural and future-ready, but gameplay-bound behaviors are intentionally withheld until a later milestone.

Recommendations for the next milestone:
- Wire the tile and chunk model into the live save contract and developer runtime observation path while leaving the current gameplay loop unchanged.

