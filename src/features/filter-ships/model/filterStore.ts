import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { EMPTY_FILTER_STATE, countActiveFilters, type ShipFilterState } from './shipFilter'
import { parseFilterFromSearchParams, serializeFilterToSearchParams } from '../lib/shipFilter'

export const useShipFilterStore = defineStore('shipFilter', () => {
  const filter = ref<ShipFilterState>(
    parseFilterFromSearchParams(new URLSearchParams(window.location.search)),
  )

  const activeFilterCount = computed(() => countActiveFilters(filter.value))

  function toggleInList<TValue>(list: TValue[], value: TValue): TValue[] {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
  }

  function toggleNation(nationId: string): void {
    filter.value.nationIds = toggleInList(filter.value.nationIds, nationId)
  }

  function toggleType(typeId: string): void {
    filter.value.typeIds = toggleInList(filter.value.typeIds, typeId)
  }

  function toggleTier(tier: number): void {
    filter.value.tiers = toggleInList(filter.value.tiers, tier)
  }

  function setSearchQuery(query: string): void {
    filter.value.searchQuery = query.trim().toLowerCase()
  }

  function toggleRareOnly(): void {
    filter.value.rareOnly = !filter.value.rareOnly
  }

  function reset(): void {
    filter.value = { ...EMPTY_FILTER_STATE }
  }

  watch(
    filter,
    (currentFilter) => {
      const query = serializeFilterToSearchParams(currentFilter).toString()
      window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname)
    },
    { deep: true },
  )

  return {
    filter,
    activeFilterCount,
    toggleNation,
    toggleType,
    toggleTier,
    setSearchQuery,
    toggleRareOnly,
    reset,
  }
})
