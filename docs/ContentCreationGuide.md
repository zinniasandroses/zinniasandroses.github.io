# Content Creation Guide

## Goal
Future content creators should be able to add content without touching engine code.

## Supported content types
- Crops
- Animals
- Buildings
- Items
- Weather
- Events
- Neighbors
- Fish
- Trees
- Fuel
- Resources
- Skills
- Dialogue
- Recipes

## Rules
- Every content item must have a stable `id`.
- Avoid embedding engine logic into the content JSON.
- Keep descriptions and metadata data-driven.
- Validate content before runtime registration.
- Every item definition must carry a category, weight, stack size, tags, and optional metadata such as asset references and localization readiness.
- Every resource definition must carry a bounded numeric profile, optional regeneration/consumption metadata, and a stable serialization contract.
- Every farm definition should stay stable and serializable with a provider-level resource and capacity profile.

## Item template format
Item templates must stay generic and use the shared item model. The template should capture the engine-facing fields while leaving gameplay-specific behaviors in data definitions.

## Resource template format
Resource templates should enumerate baseline limits, current value, regeneration, and consumption data. They should never be confused with inventory stacks.

## Farm starter data format
Starter farm data should be a serializable profile that includes metadata, farm state, default capacities, and baseline resource state. This data can then be consumed by the `Farm` object without any UI or gameplay-specific logic.

## Best practices
- Keep field names explicit and stable.
- Prefer data over behavior.
- Use schema-driven templates where possible.
