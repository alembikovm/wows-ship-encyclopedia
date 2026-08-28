import { describe, it, expect } from 'vitest'
import { normalizeShips } from '../normalizeShips'
import vehicles from '@/shared/api/__fixtures__/vehicles.json'
import nations from '@/shared/api/__fixtures__/nations.json'
import vehicleTypes from '@/shared/api/__fixtures__/vehicle_types.json'
import { FALLBACK_MEDIA_PATH } from '@/shared/api/endpoints'

const dictionaries = {
  nations: nations.data,
  vehicleTypes: vehicleTypes.data,
  mediaPath: 'https://cdn.example/',
}

const expectedCount = Object.keys(vehicles.data).length

describe('normalizeShips', () => {
  it('maps every vehicle that carries a type tag', () => {
    const ships = normalizeShips(vehicles, dictionaries)

    expect(ships).toHaveLength(expectedCount)
    expect(ships.every((ship) => ship.name.length > 0)).toBe(true)
    expect(ships.every((ship) => ship.tier >= 1 && ship.tier <= 11)).toBe(true)
  })

  it('resolves display names from the dictionaries', () => {
    const [ship] = normalizeShips(vehicles, dictionaries)

    expect(ship!.nationName).not.toBe(ship!.nationId)
    expect(ship!.nationColor).toMatch(/^#[0-9a-f]{6}$/)
    expect(ship!.previewImageUrl.startsWith('https://cdn.example/')).toBe(true)
  })

  it('keeps every ship when the dictionaries fail to load', () => {
    const ships = normalizeShips(vehicles, {
      nations: [],
      vehicleTypes: {},
      mediaPath: FALLBACK_MEDIA_PATH,
    })
    const [ship] = ships

    expect(ships).toHaveLength(expectedCount)
    expect(ship!.nationName).toBe(ship!.nationId)
    expect(ship!.typeName).toBe(ship!.typeId)
    expect(ship!.nationFlagUrl).toBe('')
    expect(ship!.previewImageUrl.startsWith(FALLBACK_MEDIA_PATH)).toBe(true)
  })

  it('derives rarity from tags rather than a dedicated field', () => {
    const ships = normalizeShips(vehicles, dictionaries)

    expect(new Set(ships.map((ship) => ship.rarity))).toEqual(expect.any(Set))
    expect(ships.every((ship) => ['tech', 'premium', 'special'].includes(ship.rarity))).toBe(true)
  })
})
