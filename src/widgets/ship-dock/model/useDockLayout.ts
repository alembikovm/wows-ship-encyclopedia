import { ref, computed, onMounted, onUnmounted, toValue, type MaybeRefOrGetter } from 'vue'
import { resolveRowCount, chunkIntoColumns, type Column } from '@/shared/lib/dockLayout'
import type { Ship } from '@/entities/ship'

export const TILE_WIDTH_PX = 118
export const TILE_HEIGHT_PX = 66
export const TILE_GAP_PX = 2

export function useDockLayout(ships: MaybeRefOrGetter<Ship[]>) {
  const viewportHeight = ref(window.innerHeight)

  function syncViewportHeight() {
    viewportHeight.value = window.innerHeight
  }

  onMounted(() => {
    window.addEventListener('resize', syncViewportHeight, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', syncViewportHeight)
  })

  const rowCount = computed(() => resolveRowCount(viewportHeight.value))

  const columns = computed<Column<Ship>[]>(() => chunkIntoColumns(toValue(ships), rowCount.value))

  const columnWidth = computed(() => TILE_WIDTH_PX + TILE_GAP_PX)

  const dockHeight = computed(
    () => rowCount.value * TILE_HEIGHT_PX + (rowCount.value - 1) * TILE_GAP_PX,
  )

  return {
    rowCount,
    columns,
    columnWidth,
    dockHeight,
  }
}
