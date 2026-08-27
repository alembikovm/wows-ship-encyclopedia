import { describe, it, expect } from 'vitest'
import { EMPTY_FILTER_STATE, type ShipFilterState } from '@/features/filter-ships/model/shipFilter'
import {
  parseFilterFromSearchParams,
  serializeFilterToSearchParams,
} from '@/features/filter-ships/lib/shipFilter'

describe('shipFilter', () => {
  it('survives a round trip', () => {
    const filter: ShipFilterState = {
      searchQuery: 'yamato',
      nationIds: ['japan', 'usa'],
      typeIds: ['Battleship'],
      tiers: [9, 10],
      rareOnly: true,
    }
    expect(parseFilterFromSearchParams(serializeFilterToSearchParams(filter))).toEqual(filter)
  })

  it('produces an empty query string for the default state', () => {
    expect(serializeFilterToSearchParams(EMPTY_FILTER_STATE).toString()).toBe('')
  })
})
