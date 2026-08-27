import type { NationDto, VehicleTypeDto } from '@/shared/api/encyclopediaDto'
import type { NationOption, ShipTypeOption } from '../model/encyclopediaReference'

const LOCALE = 'en'

function toHexColor(packedColor: number): string {
  return `#${packedColor.toString(16).padStart(6, '0')}`
}

export function normalizeNations(nations: NationDto[], mediaPath: string): NationOption[] {
  return nations
    .map((nation) => ({
      id: nation.name,
      name: nation.localization.mark[LOCALE] ?? nation.name,
      color: toHexColor(nation.color),
      flagUrl: nation.icons.small ? mediaPath + nation.icons.small : '',
    }))
    .sort((first, second) => first.name.localeCompare(second.name))
}

export function normalizeShipTypes(
  vehicleTypes: Record<string, VehicleTypeDto>,
  mediaPath: string,
): ShipTypeOption[] {
  return Object.entries(vehicleTypes)
    .map(([id, type]) => ({
      id,
      name: type.localization.mark[LOCALE] ?? id,
      iconUrl: type.icons.default ? mediaPath + type.icons.default : '',
      sortOrder: type.sort_order,
    }))
    .sort((first, second) => first.sortOrder - second.sortOrder)
}
