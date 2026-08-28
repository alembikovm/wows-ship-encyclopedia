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
retries, `vue-virtual-scroller` for the dock. Native CSS, no UI kit.

## Architecture

Feature-Sliced Design, enforced by `eslint-plugin-boundaries` so layer violations fail the
build. The domain model is flat - `normalizeShips` resolves names, colours and icon URLs
into plain fields at the boundary, so components never see raw DTOs.

## Data

Four endpoints: `vehicles`, `nations`, `vehicle_types_common`, `media_path`. The last three
are dictionaries, joined into the ship model once during normalization.

`vehicles` is 19.7 MB, 94% of which is localization for 19 languages. There is no
pagination - the response has no `meta` or `next`, and filters span the full set anyway.
Ship type and premium status are derived from `tags`; neither has its own field.

A BFF layer running the same normalization would cut this to ~0.27 MB, but a server is out
of scope for the task.

## Performance

Normalization runs inside `queryFn`, so the raw 19.7 MB never reaches the query cache -
~0.27 MB does. The dock is virtualized by column, ~25 of ~350 in the DOM at a time.

Measured: LCP 2.62 s, CLS 0, INP 112 ms. LCP is bound by the payload, not by images: the
artwork can't start loading until the ship list is fetched and parsed. Same BFF caveat.

## Responsiveness

Mobile-first; desktop layout from 769px. The stage is a fixed band on mobile with the
description below it, and fills the height on desktop with the panel overlaid. Row count
follows viewport height, so rotating re-chunks the dock.

## Networking

Vortex sends no CORS headers, so requests go to a same-origin path (`/vortex/*`) - proxied
by Vite in development and by a CDN rewrite in production.

## Error handling

`vehicles` is the only critical source. Dictionaries degrade independently: without
`nations` the flags disappear but ships still render, without `vehicle_types_common` the
type shows as its raw tag. Fallbacks live in normalization, not in the UI.

## Tests

`npm run test:unit` - normalization (including a dictionary-failure case), the filter
predicate, the filter URL round trip, and the dock layout maths. Fixtures are a slice of the real API response;
