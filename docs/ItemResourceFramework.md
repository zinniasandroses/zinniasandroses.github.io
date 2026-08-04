# Item and Resource Framework Summary

## Architecture summary
- The project now has a universal item layer that is registry-backed and data-driven.
- The item layer stays generic and externalizes all specific semantics into content JSON.
- Resources are separate from inventory stacks and model bounded systems such as currencies, reputation, water, fuel, and storage.
- The inventory foundation supports stacks, sort, filter, and search so future containers and warehouses can be added safely.

## New folder structure
- `src/items/` for item models and registries
- `src/resources/` for resource models and registries
- `src/inventory/` for inventory foundation and stack container behavior
- `src/currency/` for currency registry and conversion rules
- `data/content/` for starter item, resource, category, and currency JSON
- `templates/` for item/resource starter templates

## New data structure
- item definitions contain identity, metadata, tags, and future-composition fields.
- resource definitions contain bordered numeric state plus regeneration, consumption, and serialization metadata.
- category and currency JSON live alongside content payloads so the engine stays externally configured.

## Registry summary
- `ItemRegistry` discovers, validates, and registers item definitions.
- `ResourceRegistry` performs the same pattern for resource definitions.
- `ItemCategoryRegistry` stores category metadata in a data-driven catalog.
- `CurrencyRegistry` stores currency conversion metadata without hardcoding rules inside engine code.

## Resource summary
- Currency resources are modeled through the resource layer and data-driven conversion metadata.
- The starter resources include `Arim`, `Cinat`, `Reputation`, `Water`, and `Fuel`.
- Resources are not inventory items.

## Item hierarchy diagram
```text
ItemDefinition
  ├─ Seed
  ├─ Crop
  ├─ Harvest
  ├─ Food
  ├─ Medicine
  ├─ Fuel
  ├─ Tool
  ├─ Crafting Material
  └─ Miscellaneous
```

## Inventory architecture diagram
```text
InventoryFoundation
  ├─ Stacks (itemId -> quantity + metadata)
  ├─ Sorting
  ├─ Filtering
  ├─ Searching
  └─ Serialization / hydration
```

## Recommendation for Milestone 6
Focus on making the new item/resource system observable in the live runtime without touching gameplay rules. The next safe milestone should connect the registries into the current prototype shell using developer inspectors only, then begin a narrow item-aware save migration path.
