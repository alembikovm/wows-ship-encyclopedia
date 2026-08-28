<script setup lang="ts">
import type { Ship } from '@/entities/ship'

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
    </template>
  </section>
</template>

<style scoped>
.ship-stage {
  position: relative;
  flex: none;
  height: 270px;
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
  left: 50%;
  top: 48%;
  transform: translate(-50%, -50%);
  width: 92%;
  height: auto;
  filter: drop-shadow(0 14px 22px rgba(0, 0, 0, 0.55));
}

.ship-stage__plate {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 12px;
}

.ship-stage__plate-tier {
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.ship-stage__plate-name {
  font-size: 26px;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  line-height: 1.05;
  text-shadow: 0 3px 14px rgba(0, 0, 0, 0.85);
}

@media (min-width: 769px) {
  .ship-stage {
    flex: 1;
    height: auto;
    min-height: 0;
  }

  .ship-stage__artwork {
    left: 44%;
    top: 54%;
    width: min(62%, 760px);
    filter: drop-shadow(0 22px 30px rgba(0, 0, 0, 0.55));
  }

  .ship-stage__plate {
    left: 24px;
    right: auto;
    bottom: 24px;
    max-width: 300px;
  }

  .ship-stage__plate-tier {
    font-size: 11px;
    letter-spacing: 0.24em;
  }

  .ship-stage__plate-name {
    font-size: 38px;
    letter-spacing: 0.08em;
    text-shadow: 0 3px 16px rgba(0, 0, 0, 0.8);
  }
}
</style>
