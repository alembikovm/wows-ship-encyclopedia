<script setup lang="ts">
import { ShipDetails, type Ship } from '@/entities/ship'

const TIER_NUMERALS = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']

const props = defineProps<{ ship: Ship | null }>()

function hideBrokenImage(event: Event): void {
  const image = event.target as HTMLImageElement
  image.style.visibility = 'hidden'
}
</script>

<template>
  <section class="ship-stage">
    <div class="ship-stage__sky" />
    <div class="ship-stage__sea" />

    <template v-if="props.ship">
      <img
        class="ship-stage__artwork"
        :src="props.ship.detailImageUrl"
        :alt="props.ship.name"
        fetchpriority="high"
        @error="hideBrokenImage"
      />

      <div class="ship-stage__plate">
        <p class="ship-stage__plate-tier">
          Tier {{ TIER_NUMERALS[props.ship.tier] }} · {{ props.ship.typeName }}
        </p>
        <h2 class="ship-stage__plate-name">{{ props.ship.name }}</h2>
      </div>

      <aside class="ship-stage__panel">
        <ShipDetails :ship="props.ship" />
      </aside>
    </template>
  </section>
</template>

<style scoped>
.ship-stage {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.ship-stage__sky {
  position: absolute;
  inset: 0 0 46% 0;
  background: linear-gradient(180deg, #2a4a5a, #4d7383 52%, #728f95);
}

.ship-stage__sea {
  position: absolute;
  inset: 46% 0 0 0;
  background: linear-gradient(180deg, #44727e, #22434f 34%, #0e2430);
}

.ship-stage__artwork {
  position: absolute;
  left: 44%;
  top: 54%;
  transform: translate(-50%, -50%);
  width: min(62%, 760px);
  height: auto;
  filter: drop-shadow(0 22px 30px rgba(0, 0, 0, 0.55));
}

.ship-stage__plate {
  position: absolute;
  left: 24px;
  bottom: 24px;
  max-width: 300px;
}

.ship-stage__plate-tier {
  font-size: 11px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.ship-stage__plate-name {
  font-size: 38px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1.05;
  text-shadow: 0 3px 16px rgba(0, 0, 0, 0.8);
}

.ship-stage__panel {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 340px;
  background: rgba(9, 20, 28, 0.3);
  border-left: 1px solid var(--color-border);
}
</style>
