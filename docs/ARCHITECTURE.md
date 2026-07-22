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

## Current architecture status
The engine is not yet wired into every gameplay system, but the boundaries are now present for future extension without redesign.

## System responsibilities
- SimulationManager: orchestrates world updates and emits simulation lifecycle events.
- CalendarService: tracks date-like world state.
- SeasonManager: tracks the current season and emits season changes.
- WeatherManager: tracks weather state from data definitions.
- EventManager: acts as the future event orchestration boundary.
- Registry: validates, stores, and looks up content.
- ContentLoader: discovers and registers content entries.
- SaveSystem: provides a versioned save contract.

## Extension principle
Every future gameplay system should plug into the simulation backbone rather than replacing it.
