import { type ShipFilterState } from '../model/shipFilter'

const PARAM = {
  search: 'q',
  nations: 'nation',
  types: 'type',
  tiers: 'tier',
  rare: 'rare',
} as const

export function parseFilterFromSearchParams(params: URLSearchParams): ShipFilterState {
  const readList = (key: string) => params.get(key)?.split(',').filter(Boolean) ?? []

  return {
    searchQuery: params.get(PARAM.search)?.toLowerCase() ?? '',
    nationIds: readList(PARAM.nations),
    typeIds: readList(PARAM.types),
    tiers: readList(PARAM.tiers).map(Number).filter(Number.isInteger),
    rareOnly: params.get(PARAM.rare) === '1',
  }
}

export function serializeFilterToSearchParams(filter: ShipFilterState): URLSearchParams {
  const params = new URLSearchParams()

  if (filter.searchQuery) params.set(PARAM.search, filter.searchQuery)
  if (filter.nationIds.length) params.set(PARAM.nations, filter.nationIds.join(','))
  if (filter.typeIds.length) params.set(PARAM.types, filter.typeIds.join(','))
  if (filter.tiers.length) params.set(PARAM.tiers, filter.tiers.join(','))
  if (filter.rareOnly) params.set(PARAM.rare, '1')

  return params
}
