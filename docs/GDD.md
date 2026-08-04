# Game Design Document

## Production direction
This project is a browser-based farm survival prototype that is evolving into a long-term simulation game.

## Current prototype scope
- Plant crops
- Harvest crops
- Advance the day
- Expand the farm
- Gather seeds
- Save progress in the browser

## Planned future scope
- Animals
- Weather
- Seasons
- Reputation
- Market
- Events
- NPCs
- Multi-region simulation
- Developer tools
- Farm management systems
- Parcel ownership and expansion
- Farm-wide resource flow
- Multiplayer-ready save structure

## Farm management direction
The farm is the first-class owner of all future gameplay state. Farm metadata, resource state, and ownership are intentionally modeled as a stable object with service boundaries rather than scattered globals.

## Design principles
- Preserve working UI and CSS.
- Keep gameplay systems modular.
- Keep all content data-driven.
- Avoid hardcoding values into engine code.
