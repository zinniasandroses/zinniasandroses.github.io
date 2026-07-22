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

## How registries work
Registries should only discover, validate, store, and lookup content objects. They should not embed game rules.

## How saves work
Save files are versioned. The save layer is separate from the runtime logic so migrations can be added later.

## How to extend systems
- Keep one clear responsibility per module.
- Communicate through the EventBus whenever reasonable.
- Avoid circular dependencies.

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

## Save strategy
World saves store changes, not the whole map. Keep delta-based world edits in the save layer for efficiency and future compatibility.
