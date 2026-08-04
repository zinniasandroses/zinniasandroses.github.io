# Farm Framework Summary

## Objective
The Farm Management Framework introduces a permanent first-class simulation object so farm state is no longer scattered across UI globals and ad hoc prototype state.

## Core model
- `Farm` is the runtime owner object for identity, ownership, land, capacity, resources, and future simulation systems.
- The object is serializable, hydratable, and intentionally separate from the active gameplay UI.

## Farm services
The farm exposes the following service boundaries:
- `StorageService`
- `PowerService`
- `WaterService`
- `LandService`
- `OwnershipService`
- `ExpansionService`

These are intentionally independent shells so future crop, animal, and building systems can plug into them without rewriting the farm model.

## Metrics and modifiers
- `StatisticsManager` tracks durable game-wide counters such as days played, harvests, money earned/spent, plots farmed, and other future gameplay metrics.
- `FarmStateManager` registers temporary modifiers such as `normal`, `drought`, `flooded`, `economic-boom`, `economic-recession`, and `storm-damage`, but it does not yet apply gameplay effects.

## Data layer
Starter farm configuration data lives under `data/farm/` and defines difficulty profiles and baseline resource profiles. This keeps farm defaults data-driven instead of hardcoded into runtime logic.

## Runtime posture
The current browser prototype remains playable and stable while the farm layer exists as an architecture-ready backbone. No crop-growth, animal-management, or building-management logic has been introduced in this milestone.

## Stop condition
This is a clean framework milestone stop point: the project remains buildable, the static shell is served, the browser prototype is still interactive, and the save loop still persists across reload. The farm framework is now present as the permanent owner object for future systems.
