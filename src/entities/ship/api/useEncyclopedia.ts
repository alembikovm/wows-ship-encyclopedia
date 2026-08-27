import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { ENDPOINTS, FALLBACK_MEDIA_PATH } from '@/shared/api/endpoints'
import { fetchJson } from '@/shared/api/httpClient'
import type {
  VehiclesResponse,
  NationsResponse,
  VehicleTypesResponse,
  MediaPathResponse,
} from '@/shared/api/enciclopediaDto'
import { normalizeShips } from './normalizeShips'
import { normalizeNations, normalizeShipTypes } from './normalizeReference'

const STATIC_REFERENCE_QUERY = { staleTime: Infinity, gcTime: Infinity, retry: 2 } as const

export type DegradedSource = 'nations' | 'vehicleTypes'

export function useEncyclopedia() {
  const nationsQuery = useQuery({
    queryKey: ['encyclopedia', 'nations'],
    queryFn: () => fetchJson<NationsResponse>(ENDPOINTS.nations),
    ...STATIC_REFERENCE_QUERY,
  })

  const vehicleTypesQuery = useQuery({
    queryKey: ['encyclopedia', 'vehicleTypes'],
    queryFn: () => fetchJson<VehicleTypesResponse>(ENDPOINTS.vehicleTypes),
    ...STATIC_REFERENCE_QUERY,
  })

  const mediaPathQuery = useQuery({
    queryKey: ['encyclopedia', 'mediaPath'],
    queryFn: () => fetchJson<MediaPathResponse>(ENDPOINTS.mediaPath),
    ...STATIC_REFERENCE_QUERY,
  })

  const mediaPath = computed(() => mediaPathQuery.data.value?.data ?? FALLBACK_MEDIA_PATH)

  const areDictionariesSettled = computed(
    () =>
      !nationsQuery.isPending.value &&
      !vehicleTypesQuery.isPending.value &&
      !mediaPathQuery.isPending.value,
  )

  const shipsQuery = useQuery({
    queryKey: ['encyclopedia', 'ships'],
    enabled: areDictionariesSettled,
    queryFn: async () => {
      const response = await fetchJson<VehiclesResponse>(ENDPOINTS.vehicles)
      return normalizeShips(response, {
        nations: nationsQuery.data.value?.data ?? [],
        vehicleTypes: vehicleTypesQuery.data.value?.data ?? {},
        mediaPath: mediaPath.value,
      })
    },
    ...STATIC_REFERENCE_QUERY,
  })

  const degradedSources = computed<DegradedSource[]>(() => {
    const sources: DegradedSource[] = []
    if (nationsQuery.isError.value) sources.push('nations')
    if (vehicleTypesQuery.isError.value) sources.push('vehicleTypes')
    return sources
  })

  return {
    ships: computed(() => shipsQuery.data.value ?? []),
    degradedSources,
    nations: computed(() => normalizeNations(nationsQuery.data.value?.data ?? [], mediaPath.value)),
    shipTypes: computed(() =>
      normalizeShipTypes(vehicleTypesQuery.data.value?.data ?? {}, mediaPath.value),
    ),
    isLoading: computed(() => !areDictionariesSettled.value || shipsQuery.isPending.value),
    hasFatalError: shipsQuery.isError,
    retry: () => shipsQuery.refetch(),
  }
}
