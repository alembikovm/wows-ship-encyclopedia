<script setup lang="ts">
import type { Ship } from '../model/ship'

const TIER_NUMERALS = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']

const RARITY_LABELS: Record<string, string> = {
  premium: 'Premium',
  special: 'Special',
}

const props = defineProps<{ ship: Ship }>()

function hideBrokenImage(event: Event): void {
  const image = event.target as HTMLImageElement
  image.style.visibility = 'hidden'
}
</script>

<template>
  <article class="ship-details">
    <header class="ship-details__nation">
      <img
        class="ship-details__flag"
        :src="props.ship.nationFlagUrl"
        alt="Ship nation flag"
        @error="hideBrokenImage"
      />
      <span>{{ props.ship.nationName }}</span>
    </header>

    <h1 class="ship-details__name">{{ props.ship.name }}</h1>

    <div class="ship-details__badges">
      <span class="ship-details__tier">{{ TIER_NUMERALS[props.ship.tier] }}</span>
      <span class="ship-details__type">
        <img
          class="ship-details__type-icon"
          :src="props.ship.typeIconUrl"
          alt="Ship type icon"
          @error="hideBrokenImage"
        />
        {{ props.ship.typeName }}
      </span>
      <span v-if="props.ship.rarity !== 'tech'" class="ship-details__rarity">
        {{ RARITY_LABELS[props.ship.rarity] }}
      </span>
    </div>

    <p v-if="props.ship.description" class="ship-details__description">
      {{ props.ship.description }}
    </p>
  </article>
</template>

<style scoped>
.ship-details {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px 24px;
  overflow-y: auto;
}

.ship-details__nation {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.ship-details__flag {
  width: 38px;
  height: 26px;
  object-fit: cover;
}

.ship-details__name {
  font-size: 27px;
  font-weight: 500;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  line-height: 1.15;
}

.ship-details__badges {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--color-border);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.ship-details__tier {
  min-width: 34px;
  padding: 4px 7px;
  border: 1px solid var(--color-border);
  text-align: center;
  color: var(--color-text-muted);
}

.ship-details__type {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.ship-details__type-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.ship-details__rarity {
  color: var(--color-accent);
}

.ship-details__description {
  margin-top: 32px;
  font-size: 14.5px;
  line-height: 1.8;
  color: #a9bdc9;
}
</style>
