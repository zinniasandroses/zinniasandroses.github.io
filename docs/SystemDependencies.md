# System Dependencies

## Runtime dependencies
- Browser runtime for the interactive prototype
- LocalStorage for current save support
- JSON-based content discovery for future registry loading
- Shared EventBus for cross-system communication

## Internal dependencies
- SimulationManager depends on CalendarService, SeasonManager, WeatherManager, and EventManager.
- Registries depend on validation utilities.
- Content loaders depend on the content catalog and file discovery path.

## Dependency rules
- Keep dependencies pointing inward toward stable system boundaries.
- Avoid circular dependencies.
- Keep content files independent of engine logic.
- Keep UI code separate from manager logic where practical.
