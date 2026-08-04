# Technical Design Document

## Purpose
This document captures the technical target state for the project.

## Technical goals
- Stable browser-first runtime
- Modular manager-based architecture
- Content-driven registries
- Scripted events and weather changes
- Developer tooling shell
- Save versioning support

## System direction
- Use a shared EventBus for domain communication.
- Use registries for lookup and validation.
- Use a central SimulationManager for orchestration.
- Use a WorldManager for world generation, parcel ownership, placement, and region structure.
- Use a Farm model as the stable owner object for simulation-level state and service orchestration.
- Keep prototype UI and CSS stable.

## Farm service direction
- `StorageService`, `PowerService`, `WaterService`, `LandService`, `OwnershipService`, and `ExpansionService` are independent service shells.
- `StatisticsManager` remains a standalone manager for persistent metrics and play history.
- `FarmStateManager` hosts temporary modifiers and should not implement gameplay effects yet.

## Constraint
The current prototype must remain playable at every milestone.
