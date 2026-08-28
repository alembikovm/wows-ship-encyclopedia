import { describe, it, expect } from 'vitest'
import {
  parseFilterFromSearchParams,
  serializeFilterToSearchParams,
} from '@/features/filter-ships/lib/shipFilter'
import { EMPTY_FILTER_STATE, type ShipFilterState } from '@/features/filter-ships/model/shipFilter'

describe('filter URL serialization', () => {
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

  it('ignores malformed tier values', () => {
    const params = new URLSearchParams('tier=10,abc,9')
    expect(parseFilterFromSearchParams(params).tiers).toEqual([10, 9])
  })
})
