# Prompt Index

## Milestone Tracking

| Prompt Number | Purpose | Files Modified | Systems Added | Status | Dependencies | Recommended Next Milestone |
|---|---|---|---|---|---|---|
| 1 | Project analysis and architectural review | README, index.html, script.js, style.css | none | Completed | Project rules and current prototype | Foundation |
| 2 | Foundation extraction | src/core, src/registries, src/validation, docs | EventBus, SaveSystem, TimeSystem, Registry, schemas | Completed | Existing prototype | Simulation backbone |
| 3 | Simulation backbone | src/simulation, data/config, docs | SimulationManager, CalendarService, SeasonManager, WeatherManager, EventManager | Completed | Foundation modules | Config extraction and content loading |
| 4 | Farm world foundation | src/world, data/world, docs | WorldManager, ParcelSystem, PlacementSystem, WorldSaveStrategy, region placeholders, developer world panels | Completed | Simulation backbone and data/config foundation | Runtime integration and utility extraction |
| 5 | Item & resource framework | src/items, src/resources, src/inventory, src/currency, data/content, templates, docs | ItemDefinition, ResourceDefinition, ItemRegistry, ResourceRegistry, ItemCategoryRegistry, CurrencyRegistry, InventoryFoundation, currency conversion service, starter content templates | Completed | Runtime bootstrap and world foundation | Runtime observability bridge and item-aware save migration |
| 6 | Farm management framework | src/farm, data/farm, src/developer/panels, docs | Farm model, StatisticsManager, FarmStateManager, farm services, starter farm data, placeholder runtime inspectors | Completed | Item/resource framework and simulation bootstrap | Farm save-schema bridge and runtime observability |
| 7 | Land & tile simulation | src/world/grid, src/world/terrain, src/world/soil, src/pathfinding, src/developer/panels, templates, docs | TileDefinition, GridSystem, TerrainDefinition, TerrainRegistry, SoilDefinition, PathfindingService, event-driven tile change hooks, developer world panels | In progress | Farm management framework and world bootstrap | Crop/building/animal integration later |

## Notes
This index should be updated at the end of every milestone.
