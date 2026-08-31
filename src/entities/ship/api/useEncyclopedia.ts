import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { fetchJson } from '@/shared/api/httpClient'
import type { Ship } from '../model/ship'
import type { NationOption, ShipTypeOption } from '../model/encyclopediaReference'

export type DegradedSource = never

interface ShipsIndexResponse {
  ships: Ship[]
  nations: NationOption[]
  shipTypes: ShipTypeOption[]
}

const EMPTY: ShipsIndexResponse = { ships: [], nations: [], shipTypes: [] }

export function useEncyclopedia() {
  const indexQuery = useQuery({
    queryKey: ['ships-index'],
    queryFn: () => fetchJson<ShipsIndexResponse>('/api/ships-index'),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 2,
  })

  const data = computed(() => indexQuery.data.value ?? EMPTY)

  return {
    ships: computed(() => data.value.ships),
    nations: computed(() => data.value.nations),
    shipTypes: computed(() => data.value.shipTypes),
    degradedSources: computed<DegradedSource[]>(() => []),
    isLoading: computed(() => indexQuery.isPending.value),
    hasFatalError: computed(() => indexQuery.isError.value),
    retry: () => indexQuery.refetch(),
  }
}
