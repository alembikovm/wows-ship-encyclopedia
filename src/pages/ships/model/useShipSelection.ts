import { ref, computed, watch, toValue, type MaybeRefOrGetter } from 'vue'
import type { Ship } from '@/entities/ship'

const SHIP_PARAM = 'ship'

function readShipIdFromUrl(): string | null {
  return new URLSearchParams(window.location.search).get(SHIP_PARAM)
}

function writeShipIdToUrl(shipId: string | null): void {
  const params = new URLSearchParams(window.location.search)

  if (shipId) {
    params.set(SHIP_PARAM, shipId)
  } else {
    params.delete(SHIP_PARAM)
  }

  const query = params.toString()
  window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname)
}

export function useShipSelection(availableShips: MaybeRefOrGetter<Ship[]>) {
  const selectedShipId = ref<string | null>(readShipIdFromUrl())

  const selectedShip = computed(() => {
    const ships = toValue(availableShips)
    return ships.find((ship) => ship.id === selectedShipId.value) ?? null
  })

  watch(
    () => toValue(availableShips),
    (ships) => {
      if (!ships.length) {
        selectedShipId.value = null
        return
      }

      const isSelectionAvailable = ships.some((ship) => ship.id === selectedShipId.value)
      if (!isSelectionAvailable) {
        selectedShipId.value = ships[0]!.id
      }
    },
    { immediate: true },
  )

  watch(selectedShipId, writeShipIdToUrl)

  function selectShip(shipId: string): void {
    selectedShipId.value = shipId
  }

  return { selectedShipId, selectedShip, selectShip }
}
