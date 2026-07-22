# JSON Schemas

## Purpose
Schemas provide a shared validation contract for data-driven content.

## Planned schema set
- crop.schema.json
- animal.schema.json
- building.schema.json
- weather.schema.json
- event.schema.json
- dialogue.schema.json
- skill.schema.json
- resource.schema.json
- item.schema.json

## Validation rule
All content should be validated before being registered into a runtime registry.

## Error handling principle
Malformed content should be reported with file, property, expected value, actual value, and suggested fix. The game should continue loading the remaining content.
