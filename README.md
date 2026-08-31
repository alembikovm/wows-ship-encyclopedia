# WoWS Ship Encyclopedia

Browse every ship in World of Warships - filter by nation, type and tier, search by name.

**Live:** https://wows-ship-encyclopedia.vercel.app/

## Quick start

Node.js 22 (see `.nvmrc`). No environment variables or API keys needed.

```bash
npm install
npm run dev
```

`npm run verify` runs type check, lint and tests.

## Stack

Vue 3 + TypeScript + Vite. Pinia for filter state, `@tanstack/vue-query` for loading and
retries, `vue-virtual-scroller` for the dock. Native CSS. GSAP for stage animations.

## Architecture

Feature-Sliced Design, enforced by `eslint-plugin-boundaries`. The domain model is flat - `normalizeShips` resolves names, colours and icon URLs
into plain fields at the boundary.

## Data

Four endpoints: `vehicles`, `nations`, `vehicle_types_common`, `media_path`. The last three
are dictionaries, joined into the ship model once during normalization.


## Performance

Added /api/ships-index BFF, cached per Vercel region
Normalization runs inside `queryFn`.
## Responsiveness

Mobile-first; desktop layout from 769px. The stage is a fixed band on mobile with the
description below it, and fills the height on desktop with the panel overlaid. Row count
follows viewport height, so rotating re-chunks the dock.

## Networking

Vortex sends no CORS headers, so requests go to a same-origin path (`/vortex/*`) - proxied
by Vite in development and by a CDN rewrite in production.

## Animations
Used GSAP for ship switching animations.

## Error handling

`vehicles` is the only critical source. Dictionaries degrade independently: without
`nations` the flags disappear but ships still render, without `vehicle_types_common` the
type shows as its raw tag. Fallbacks live in normalization, not in the UI.

## Tests

`npm run test:unit`
