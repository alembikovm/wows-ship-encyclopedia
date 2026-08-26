<script setup lang="ts">
import { ref } from 'vue'
import { useEncyclopedia } from '@/entities/ship'
import { ShipDock } from '@/widgets/ship-dock'

const { ships, degradedSources, isLoading, isError, hasFatalError, retry } = useEncyclopedia()

const selectedShipId = ref<string | null>(null)

function selectShip(shipId: string): void {
  selectedShipId.value = shipId
}
</script>

<template>
  <main class="ships-page">
    <p v-if="isLoading">Loading Encyclopedia...</p>

    <div v-else-if="hasFatalError" class="ships-page__status">
      <p>The encyclopedia service is unavailable.</p>
      <button type="button" @click="retry">Try again</button>
    </div>

    <template v-else>
      <p v-if="degradedSources.length" class="ships-page__notice">
        Some reference data is missing: {{ degradedSources.join(', ') }}
      </p>

      <div class="ships-page__stage">
        <p>{{ ships.length }} ships · selected: {{ selectedShipId ?? 'none' }}</p>
      </div>

      <ShipDock :ships="ships" :selected-ship-id="selectedShipId" @select="selectShip" />
    </template>
  </main>
</template>

<style scoped>
.ships-page {
  display: flex;
  flex-direction: column;
  height: 100dvh;
}

.ships-page__stage {
  flex: 1;
  min-height: 0;
  display: grid;
  place-items: center;
  color: var(--color-text-muted);
}

.ships-page__status,
.ships-page__notice {
  padding: 16px;
}
</style>
