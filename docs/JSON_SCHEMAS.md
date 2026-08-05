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
- currency.schema.json
- item-category.schema.json

## Item and resource validation requirements
Item and resource definitions must validate the following fields before runtime registration:
- required identity fields such as `id`, `label`, and `internalName`
- category and subcategory metadata
- weight and stack size constraints
- tags for future localization and search support
- asset reference metadata
- localization readiness metadata
- currency conversion metadata where applicable

## Farm validation requirements
Farm JSON should validate:
- stable farm ID and owner metadata
- acreage and capacity bounds
- default resource state
- current season and weather assignment
- difficulty profile mapping
- serialization compatibility metadata

## Land simulation content requirements
The terrain and tile pipeline should validate:
- stable terrain IDs and labels
- movement and buildability metadata
- tile coordinate and world coordinate compatibility
- soil chemistry values for storage-only simulation state
- biome membership and terrain tags
- future placement and utility metadata

## Validation rule
All content should be validated before being registered into a runtime registry.

## Error handling principle
Malformed content should be reported with file, property, expected value, actual value, and suggested fix. The game should continue loading the remaining content.
