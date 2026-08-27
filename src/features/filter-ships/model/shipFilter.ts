import type { Ship } from '@/entities/ship'

export interface ShipFilterState {
  searchQuery: string
  nationIds: string[]
  typeIds: string[]
  tiers: number[]
  rareOnly: boolean
}

export const EMPTY_FILTER_STATE: ShipFilterState = {
  searchQuery: '',
  nationIds: [],
  typeIds: [],
  tiers: [],
  rareOnly: false,
}

export function matchesFilter(ship: Ship, filter: ShipFilterState): boolean {
  if (filter.searchQuery && !ship.searchableName.includes(filter.searchQuery)) return false
  if (filter.nationIds.length && !filter.nationIds.includes(ship.nationId)) return false
  if (filter.typeIds.length && !filter.typeIds.includes(ship.typeId)) return false
  if (filter.tiers.length && !filter.tiers.includes(ship.tier)) return false
  if (filter.rareOnly && ship.rarity === 'tech') return false
  return true
}

export function countActiveFilters(filter: ShipFilterState): number {
  return (
    filter.nationIds.length +
    filter.typeIds.length +
    filter.tiers.length +
    (filter.rareOnly ? 1 : 0) +
    (filter.searchQuery ? 1 : 0)
  )
}
