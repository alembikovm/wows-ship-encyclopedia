<script setup lang="ts">
import { ref } from 'vue'
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { ShipTile, type Ship } from '@/entities/ship'
import { useDockLayout, TILE_HEIGHT_PX, TILE_GAP_PX } from '../model/useDockLayout'
import { useHorizontalScroll } from '@/shared/lib/useHorizontalScroll'

const props = defineProps<{
  ships: Ship[]
  selectedShipId: string | null
}>()

const emit = defineEmits<{ select: [shipId: string] }>()

const { rowCount, columns, columnWidth, dockHeight } = useDockLayout(() => props.ships)

const scrollerRef = ref<InstanceType<typeof RecycleScroller> | null>(null)

const { canScrollBackward, canScrollForward, scrollByPage } = useHorizontalScroll(
  () => (scrollerRef.value?.$el as HTMLElement | undefined) ?? null,
  columnWidth,
)
</script>

<template>
  <div class="ship-dock" :style="{ height: `${dockHeight}px` }">
    <button
      v-if="canScrollBackward"
      class="ship-dock__arrow ship-dock__arrow--backward"
      type="button"
      aria-label="Scroll left"
      @click="scrollByPage(-1)"
    >
      ‹
    </button>

    <RecycleScroller
      ref="scrollerRef"
      class="ship-dock__scroller"
      direction="horizontal"
      :items="columns"
      :item-size="columnWidth"
      key-field="id"
      :buffer="600"
      v-slot="{ item: column }"
    >
      <div
        class="ship-dock__column"
        :style="{
          width: `${columnWidth}px`,
          height: `${dockHeight}px`,
          gridTemplateRows: `repeat(${rowCount}, ${TILE_HEIGHT_PX}px)`,
          gap: `${TILE_GAP_PX}px`,
        }"
      >
        <ShipTile
          v-for="ship in column.items"
          :key="ship.id"
          :ship="ship"
          :is-selected="ship.id === props.selectedShipId"
          @click="emit('select', ship.id)"
        />
      </div>
    </RecycleScroller>

    <button
      v-if="canScrollForward"
      class="ship-dock__arrow ship-dock__arrow--forward"
      type="button"
      aria-label="Scroll right"
      @click="scrollByPage(1)"
    >
      ›
    </button>
  </div>
</template>

<style scoped>
.ship-dock {
  position: relative;
  background: rgba(6, 13, 18, 0.95);
  border-top: 1px solid var(--color-border);
}

.ship-dock__scroller {
  height: 100%;
  scrollbar-width: none;
}

.ship-dock__scroller::-webkit-scrollbar {
  display: none;
}

.ship-dock__column {
  display: grid;
  padding-right: 2px;
}

.ship-dock__arrow {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 2;
  width: 44px;
  display: grid;
  place-items: center;
  border: none;
  color: var(--color-text-muted);
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  transition: color 0.12s;
}

.ship-dock__arrow:hover {
  color: var(--color-text);
}

.ship-dock__arrow--backward {
  left: 0;
  background: linear-gradient(90deg, rgba(6, 13, 18, 0.95) 40%, transparent);
}

.ship-dock__arrow--forward {
  right: 0;
  background: linear-gradient(270deg, rgba(6, 13, 18, 0.95) 40%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .ship-dock__arrow {
    transition: none;
  }
}
</style>
