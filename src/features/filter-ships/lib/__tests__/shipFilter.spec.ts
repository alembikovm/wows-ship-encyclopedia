import { describe, it, expect } from 'vitest'
import { matchesFilter, EMPTY_FILTER_STATE } from '@/features/filter-ships/model/shipFilter'
import type { Ship } from '@/entities/ship'

const yamato = {
  searchableName: 'yamato',
  nationId: 'japan',
  typeId: 'Battleship',
  tier: 10,
  rarity: 'tech',
} as Ship

describe('matchesFilter', () => {
  it('treats empty criteria as no filtering', () => {
    expect(matchesFilter(yamato, EMPTY_FILTER_STATE)).toBe(true)
  })

  it('combines criteria with AND', () => {
    expect(
      matchesFilter(yamato, { ...EMPTY_FILTER_STATE, nationIds: ['japan'], tiers: [10] }),
    ).toBe(true)

    expect(matchesFilter(yamato, { ...EMPTY_FILTER_STATE, nationIds: ['japan'], tiers: [9] })).toBe(
      false,
    )
  })

  it('matches a partial name', () => {
    expect(matchesFilter(yamato, { ...EMPTY_FILTER_STATE, searchQuery: 'yam' })).toBe(true)
    expect(matchesFilter(yamato, { ...EMPTY_FILTER_STATE, searchQuery: 'zzz' })).toBe(false)
  })
})
