<script setup lang="ts">
import { toRef } from 'vue'
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { ShipTile, type Ship } from '@/entities/ship'
import { useDockLayout, TILE_HEIGHT_PX, TILE_GAP_PX } from '../model/useDockLayout'

const props = defineProps<{
  ships: Ship[]
  selectedShipId: string | null
}>()

const emit = defineEmits<{ select(shipId: string): void }>()

const { rowCount, columns, columnWidth, dockHeight } = useDockLayout(toRef(props, 'ships'))
</script>

<template>
  <div class="ship-dock" :style="{ height: `${dockHeight}px` }">
    <RecycleScroller
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
  </div>
</template>

<style scoped>
.ship-dock {
  background: rgba(6, 13, 18, 0.95);
  border-top: 1px solid var(--color-border);
}

.ship-dock__scroller {
  height: 100%;
}

.ship-dock__column {
  display: grid;
  height: 100%;
  padding-right: 2px;
}
</style>
