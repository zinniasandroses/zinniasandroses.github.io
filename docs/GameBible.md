# Game Bible

## Purpose
This document is the permanent encyclopedia for the project. It defines the shared vocabulary, world rules, and future design constraints.

## Core pillars
- Browser-first gameplay
- Data-driven content
- Local saves with future cloud-save compatibility
- Modular systems over hardcoded monoliths
- Long-term maintainability

## Core currencies
- Cinat: small currency unit
- Arim: large currency unit
- Conversion rule: 5 cinat = 1 arim

## World rules
- The game is a farming simulation prototype that will grow into a larger world simulation.
- Time advances naturally through active play.
- Content is kept data-driven and registry-backed.
- Save files must remain backward compatible whenever possible.

## Naming conventions
- Use stable IDs for all content objects.
- Prefer lowercase identifiers with hyphen naming in content data.
- Keep engine-facing schemas separate from presentation text.

## Gameplay philosophy
- Preserve existing functionality before adding new mechanics.
- Extend the system rather than replace it.
- Favor modular managers over large global rule blocks.

## Resources
- money
- seeds
- fuel
- animals
- reputation
- items
- water
- electricity
- storage capacity

## Universal item model
The universal item model is data-driven and keeps generic fields in one place. Every item stores a stable ID, display name, internal name, category, subcategory, description, icon, stack size, weight, value, and sale/trade metadata.

## Resource model
Resources are not inventory items. They represent bounded or regenerating systems such as money, reputation, fuel reserves, electricity, water storage, storage capacity, and future government credits.

## Currency architecture
The game's currencies are modeled by data definitions that keep conversion rules out of engine code. The conversion path always resolves through the currency registry and the configured conversion metadata.

## Farm architecture
- The farm is the permanent first-class simulation object for the player.
- Everything in the game is expected to belong to a farm. The farm owns the player’s identity, active simulation state, parcel ownership, capacity profile, and resource profile.
- The farm object intentionally stays separate from the active gameplay UI.

## Farm states
Temporary farm states such as drought, flood, economic boom, recession, wildfire recovery, and storm damage should be represented as modifiers only for now.

## Resource flow
Farm-wide resources such as money, water, fuel, power, building capacity, animal capacity, storage capacity, population, and employees are stored separately from inventory stacks.

## Expansion framework
Expansion remains parcel-based and should simply attach more land to the farm through the ownership and expansion services.

## Future extension principles
- Registries should not contain gameplay logic.
- Managers should orchestrate systems.
- Content should be loadable without engine code changes.

## World architecture
- The world is organized through a shared `WorldManager` that owns generation, chunk loading, regions, farm boundaries, placement structure, and the new tile-first simulation foundation.
- The player's farm begins at 25 acres and is designed for future expansion through adjacent parcels.
- The world remains data-driven and extends from the world manager through modular grid, terrain, soil, and object systems.
- Every world object uses a common object definition with stable IDs, position, owner, data definition, interaction rules, and save payload.
- Save data records deltas rather than full-map snapshots.

## Land and tile simulation
The permanent grid system is the structural backbone for all future farming systems. It provides tile coordinates, world coordinates, chunk-based save boundaries, and a stable tile data contract that will be consumed by crop, building, animal, road, fence, and utility systems later.

## Terrain system
Terrains are data-driven and registry-backed. The terrain content model supports grass, dirt, farmland, forest, pond, river, road, rock, and wetland as starters, with future rule-driven terrain types loaded from JSON.

## Soil framework
The soil framework stores each tile's soil chemistry and physical state, including organic matter, nitrogen, phosphorus, potassium, compaction, acidity, water saturation, temperature, weed pressure, and disease risk. These values are stored and updated now and remain inert until gameplay effects are designed.

## Object layer
The object layer is tile-aware and supports trees, buildings, decorations, rocks, fences, machines, animals, crop plots, roads, utilities, and future underground utility connections. Objects register through the shared world boundary and emit tile lifecycle events.

## Pathfinding foundation
A non-optimized but future-ready generic pathfinding service is present so movement routing can later support players, animals, farmhands, neighbors, and vehicles.

## Parcel model
Every parcel stores ownership, terrain, moisture, fertility, drainage, water access, and future land usage.

## Placement model
All world content uses the same placement framework:
- buildings
- trees
- rocks
- crops
- decorations
- future roads, irrigation, fencing, and machinery
