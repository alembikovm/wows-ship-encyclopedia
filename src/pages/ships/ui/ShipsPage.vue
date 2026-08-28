<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEncyclopedia, ShipDetails } from '@/entities/ship'
import { ShipStage } from '@/widgets/ship-stage'
import { ShipDock } from '@/widgets/ship-dock'
import { ShipFilterPanel, useShipFilterStore, matchesFilter } from '@/features/filter-ships'
import { useShipSelection } from '../model/useShipSelection'
import { ShipSearchInput } from '@/features/filter-ships'

const { ships, nations, shipTypes, degradedSources, isLoading, hasFatalError, retry } =
  useEncyclopedia()

const filterStore = useShipFilterStore()

const visibleShips = computed(() =>
  ships.value.filter((ship) => matchesFilter(ship, filterStore.filter)),
)

const { selectedShipId, selectedShip, selectShip } = useShipSelection(visibleShips)

const isFilterPanelOpen = ref(false)

function toggleFilterPanel(): void {
  isFilterPanelOpen.value = !isFilterPanelOpen.value
}
</script>

<template>
  <main class="ships-page">
    <p v-if="isLoading" class="ships-page__status">Loading encyclopedia…</p>

    <div v-else-if="hasFatalError" class="ships-page__status">
      <p>The encyclopedia service is unavailable.</p>
      <button class="ships-page__retry" type="button" @click="retry">Try again</button>
    </div>

    <template v-else>
      <p v-if="degradedSources.length" class="ships-page__notice">
        Some reference data is missing: {{ degradedSources.join(', ') }}
      </p>

      <p v-if="!visibleShips.length" class="ships-page__empty">
        No ships match the selected filters.
      </p>

      <div v-else class="ships-page__viewport">
        <header class="ships-page__header">
          <ShipSearchInput class="ships-page__search" />
          <p class="ships-page__count">{{ visibleShips.length }} of {{ ships.length }}</p>
        </header>

        <ShipStage :ship="selectedShip" />

        <section v-if="selectedShip" class="ships-page__details">
          <ShipDetails :ship="selectedShip" />
        </section>
      </div>

      <div class="ships-page__dock-area">
        <ShipFilterPanel v-if="isFilterPanelOpen" :nations="nations" :ship-types="shipTypes" />

        <div class="ships-page__dock">
          <button
            class="ships-page__filter-toggle"
            type="button"
            :aria-pressed="isFilterPanelOpen"
            :aria-expanded="isFilterPanelOpen"
            @click="toggleFilterPanel"
          >
            <span>Filter</span>
            <span class="ships-page__filter-count">{{ filterStore.activeFilterCount }}</span>
          </button>

          <ShipDock
            class="ships-page__dock-scroller"
            :ships="visibleShips"
            :selected-ship-id="selectedShipId"
            @select="selectShip"
          />
        </div>
      </div>
    </template>
  </main>
</template>

<style scoped>
.ships-page {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
}

.ships-page__viewport {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.ships-page__details {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  border-top: 1px solid var(--color-border);
}

.ships-page__status,
.ships-page__empty {
  flex: 1;
  display: grid;
  place-content: center;
  gap: 16px;
  justify-items: center;
  padding: 24px;
  text-align: center;
  color: var(--color-text-muted);
}

.ships-page__notice {
  flex: none;
  padding: 8px 16px;
  background: rgba(176, 57, 44, 0.13);
  border-bottom: 1px solid rgba(176, 57, 44, 0.45);
  font-size: 13px;
  color: #e6b7b1;
}

.ships-page__retry {
  min-height: 44px;
  padding: 10px 20px;
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font: inherit;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
}

.ships-page__retry:hover {
  border-color: var(--color-accent);
  color: var(--color-text);
}

.ships-page__dock-area {
  flex: none;
}

.ships-page__dock {
  display: flex;
}

.ships-page__dock-scroller {
  flex: 1;
  min-width: 0;
}

.ships-page__filter-toggle {
  flex: none;
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: rgba(6, 13, 18, 0.95);
  border: none;
  border-right: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font: inherit;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  cursor: pointer;
}

.ships-page__filter-toggle[aria-pressed='true'] {
  color: var(--color-accent);
}

.ships-page__filter-count {
  min-width: 18px;
  height: 18px;
  display: grid;
  place-items: center;
  padding: 0 4px;
  background: var(--color-accent);
  color: #0a141c;
  border-radius: 9px;
  font-size: 11px;
  font-weight: 600;
}

.ships-page__header {
  flex: none;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: rgba(6, 13, 18, 0.94);
  border-bottom: 1px solid var(--color-border);
}

.ships-page__search {
  flex: 1;
  min-width: 0;
}

.ships-page__count {
  flex: none;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  white-space: nowrap;
}

@media (min-width: 769px) {
  .ships-page__header {
    padding: 8px 16px;
  }

  .ships-page__search {
    flex: none;
    width: 264px;
  }
}

@media (min-width: 769px) {
  .ships-page__viewport {
    position: relative;
  }

  .ships-page__details {
    position: absolute;
    inset: 0 0 0 auto;
    width: 340px;
    flex: none;
    background: rgba(9, 20, 28, 0.9);
    border-top: none;
    border-left: 1px solid var(--color-border);
  }

  .ships-page__filter-toggle {
    width: 88px;
  }
}
</style>
