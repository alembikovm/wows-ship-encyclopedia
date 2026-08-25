import type { VehiclesResponse, NationDto, VehicleTypeDto } from '@/shared/api/enciclopediaDto'
import { SHIP_TYPE_TAGS, type Ship, type ShipRarity, type ShipTypeId } from '../model/ship'

interface EncyclopediaDictionaries {
  nations: NationDto[]
  vehicleTypes: Record<string, VehicleTypeDto>
  mediaPath: string
}

const DEFAULT_NATION_COLOR = '#3f5b6b'
const LOCALE = 'en'

function toHexColor(packedColor: number): string {
  return `#${packedColor.toString(16).padStart(6, '0')}`
}

function resolveTypeId(tags: string[]): ShipTypeId | null {
  return SHIP_TYPE_TAGS.find((tag) => tags.includes(tag)) ?? null
}

function resolveRarity(tags: string[]): ShipRarity {
  if (tags.includes('uiPremium')) return 'premium'
  if (tags.includes('uiSpecial')) return 'special'
  return 'tech'
}

function resolveTypeIconVariant(rarity: ShipRarity): string {
  return rarity === 'tech' ? 'default' : rarity
}

export function normalizeShips(
  response: VehiclesResponse,
  dictionaries: EncyclopediaDictionaries,
): Ship[] {
  const nationsByName = new Map(dictionaries.nations.map((nation) => [nation.name, nation]))
  const toAbsoluteUrl = (path: string | undefined) => (path ? dictionaries.mediaPath + path : '')

  const ships: Ship[] = []

  for (const [id, vehicle] of Object.entries(response.data)) {
    const typeId = resolveTypeId(vehicle.tags)
    if (!typeId) continue

    const nation = nationsByName.get(vehicle.nation)
    const vehicleType = dictionaries.vehicleTypes[typeId]
    const rarity = resolveRarity(vehicle.tags)
    const name = vehicle.localization.mark[LOCALE] ?? vehicle.name

    ships.push({
      id,
      name,
      searchableName: name.toLowerCase(),
      description: vehicle.localization.description[LOCALE] ?? '',
      tier: vehicle.level,
      nationId: vehicle.nation,
      nationName: nation?.localization.mark[LOCALE] ?? vehicle.nation,
      nationColor: nation ? toHexColor(nation.color) : DEFAULT_NATION_COLOR,
      nationFlagUrl: toAbsoluteUrl(nation?.icons.small),
      typeId,
      typeName: vehicleType?.localization.mark[LOCALE] ?? typeId,
      typeSortOrder: vehicleType?.sort_order ?? Number.MAX_SAFE_INTEGER,
      typeIconUrl: toAbsoluteUrl(vehicleType?.icons[resolveTypeIconVariant(rarity)]),
      rarity,
      previewImageUrl: toAbsoluteUrl(vehicle.icons.medium),
      detailImageUrl: toAbsoluteUrl(vehicle.icons.large),
    })
  }

  return ships
}
