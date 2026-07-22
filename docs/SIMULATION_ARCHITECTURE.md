# Simulation architecture

## Overview

The simulation layer is intentionally small and modular. It coordinates several manager-style services without owning gameplay rules.

## Responsibilities

- `SimulationManager`: orchestrates world updates and emits simulation lifecycle events.
- `CalendarService`: maintains the date-like state of the world.
- `SeasonManager`: tracks season state and emits season change events.
- `WeatherManager`: tracks weather state from data-driven definitions.
- `EventManager`: acts as the event orchestration boundary for future scripted or weighted events.

## Event flow

1. `SimulationManager.tick()` runs on each simulation step.
2. `MinutePassed` is emitted.
3. `SimulationTick` is emitted with current world context.
4. On day completion, `DayEnded` is emitted.
5. `CalendarService.advanceDay()` updates date state.
6. `DayStarted` is emitted for the next day.

## Extension guide

To add future systems:

1. Create a manager class with one clear responsibility.
2. Expose a stable, small interface.
3. Communicate through the shared event bus.
4. Load data from configuration files instead of hardcoding values.
5. Keep managers independent of DOM and UI code.
