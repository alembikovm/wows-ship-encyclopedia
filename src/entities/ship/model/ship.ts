export const SHIP_TYPE_TAGS = [
  'Submarine',
  'Destroyer',
  'Cruiser',
  'Battleship',
  'AirCarrier',
] as const
export type ShipTypeId = (typeof SHIP_TYPE_TAGS)[number]

export type ShipRarity = 'tech' | 'premium' | 'special'

export interface Ship {
  id: string
  name: string
  searchableName: string
  description: string
  tier: number
  nationId: string
  nationName: string
  nationColor: string
  nationFlagUrl: string
  typeId: ShipTypeId
  typeName: string
  typeSortOrder: number
  typeIconUrl: string
  rarity: ShipRarity
  previewImageUrl: string
  detailImageUrl: string
}
