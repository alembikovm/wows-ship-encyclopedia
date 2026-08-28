<script setup lang="ts">
import { FilterChip } from '@/shared/ui'
import type { NationOption, ShipTypeOption } from '@/entities/ship'
import { useShipFilterStore } from '../model/filterStore'

const TIER_NUMERALS = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']
const AVAILABLE_TIERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

defineProps<{
  nations: NationOption[]
  shipTypes: ShipTypeOption[]
}>()

const filterStore = useShipFilterStore()
</script>

<template>
  <div class="ship-filter-panel">
    <fieldset v-if="nations.length" class="ship-filter-panel__group">
      <legend class="ship-filter-panel__legend">Nation</legend>
      <div class="ship-filter-panel__chips">
        <FilterChip
          v-for="nation in nations"
          :key="nation.id"
          :label="nation.name"
          :icon-url="nation.flagUrl"
          :accent-color="nation.color"
          :is-active="filterStore.filter.nationIds.includes(nation.id)"
          @click="filterStore.toggleNation(nation.id)"
        />
      </div>
    </fieldset>

    <fieldset v-if="shipTypes.length" class="ship-filter-panel__group">
      <legend class="ship-filter-panel__legend">Type</legend>
      <div class="ship-filter-panel__chips">
        <FilterChip
          v-for="shipType in shipTypes"
          :key="shipType.id"
          :label="shipType.name"
          :icon-url="shipType.iconUrl"
          :is-active="filterStore.filter.typeIds.includes(shipType.id)"
          @click="filterStore.toggleType(shipType.id)"
        />
      </div>
    </fieldset>

    <fieldset class="ship-filter-panel__group">
      <legend class="ship-filter-panel__legend">Tier</legend>
      <div class="ship-filter-panel__chips">
        <FilterChip
          v-for="tier in AVAILABLE_TIERS"
          :key="tier"
          :label="TIER_NUMERALS[tier]!"
          :is-active="filterStore.filter.tiers.includes(tier)"
          @click="filterStore.toggleTier(tier)"
        />
      </div>
    </fieldset>

    <div class="ship-filter-panel__actions">
      <FilterChip
        label="Premium and special"
        :is-active="filterStore.filter.rareOnly"
        @click="filterStore.toggleRareOnly()"
      />
      <button class="ship-filter-panel__reset" type="button" @click="filterStore.reset()">
        Reset
      </button>
    </div>
  </div>
</template>

<style scoped>
.ship-filter-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 12px;
  max-height: 50dvh;
  overflow-y: auto;
  overscroll-behavior: contain;
  background: rgba(9, 20, 28, 0.97);
  border-top: 1px solid var(--color-accent);
}

.ship-filter-panel__group {
  grid-column: 1;
  border: none;
  padding: 0;
}

.ship-filter-panel__group + .ship-filter-panel__group {
  margin-top: 16px;
}

.ship-filter-panel__legend {
  margin-bottom: 12px;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.ship-filter-panel__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.ship-filter-panel__actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ship-filter-panel__reset {
  padding: 9px;
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font: inherit;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
}

.ship-filter-panel__reset:hover {
  border-color: #b0392c;
  color: #e0a49c;
}

@media (min-width: 769px) {
  .ship-filter-panel {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 24px;
    align-items: start;
    padding: 16px 24px;
    max-height: 250px;
  }

  .ship-filter-panel__group {
    grid-column: 1;
  }

  .ship-filter-panel__actions {
    grid-column: 2;
    grid-row: 1 / -1;
    position: sticky;
    top: 0;
    min-width: 170px;
  }
}
</style>
