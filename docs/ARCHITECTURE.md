# Project architecture foundation

This repository is currently a static browser game prototype. The existing UI and CSS are intentionally preserved.

## Architecture goals

- Keep the current prototype working.
- Extend the existing codebase without a rewrite.
- Move reusable logic into small modules over time.
- Keep all future content data-driven.
- Preserve backward compatibility for saves.

## Current foundation

The initial extraction introduces the following reusable layers:

- `src/core/EventBus.js` for application-wide event broadcasting.
- `src/core/SaveSystem.js` for versioned local save scaffolding.
- `src/core/TimeSystem.js` for time progression consistency.
- `src/data/loaders/ContentLoader.js` for content discovery and registration.
- `src/data/loaders/contentCatalog.js` for the full future content inventory.
- `src/registries/Registry.js` for content validation and lookup.
- `src/validation/schema.js` for simple content validation.
- `src/events/EventNames.js` for event naming consistency.
- `src/developer/DeveloperMode.js` for future tool registration.

## Rules followed

- No gameplay rewrite.
- No UI/CSS redesign.
- No migration of old gameplay data.
- No breaking changes to existing behavior.

## Next milestone direction

The next safe extraction focuses on utilities and constants before any gameplay boundary changes.
