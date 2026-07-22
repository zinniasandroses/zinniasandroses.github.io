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

## Best practices
- Keep field names explicit and stable.
- Prefer data over behavior.
- Use schema-driven templates where possible.
