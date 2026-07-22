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
- Keep prototype UI and CSS stable.

## Constraint
The current prototype must remain playable at every milestone.
