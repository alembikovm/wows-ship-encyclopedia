<script setup lang="ts">
import type { Ship } from '../model/ship'

const TIER_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']

const props = defineProps<{
  ship: Ship
  isSelected: boolean
}>()

function hideBrokenImage(event: Event): void {
  const image = event.target as HTMLImageElement
  image.style.visibility = 'hidden'
}
</script>

<template>
  <button
    class="ship-tile"
    type="button"
    :aria-current="props.isSelected"
    :title="props.ship.name"
    :style="{ borderLeftColor: props.isSelected ? 'var(--color-accent)' : props.ship.nationColor }"
  >
    <img
      class="ship-tile__preview"
      :src="props.ship.previewImageUrl"
      alt="ship preview"
      loading="lazy"
      @error="hideBrokenImage"
    />
    <span class="ship-tile__tier">{{ TIER_NUMERALS[props.ship.tier] }}</span>
    <img
      class="ship-tile__flag"
      :src="props.ship.nationFlagUrl"
      alt="nation flag"
      loading="lazy"
      @error="hideBrokenImage"
    />
    <span class="ship-tile__name">{{ props.ship.name }}</span>
  </button>
</template>

<style scoped>
.ship-tile {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
  background: linear-gradient(180deg, #1a2f3c, #0f1d28);
  border: 1px solid #1b3140;
  border-left-width: 3px;
  cursor: pointer;
  transition: background 0.12s;
}

.ship-tile:hover {
  background: linear-gradient(180deg, #22404f, #152836);
}

.ship-tile[aria-current='true'] {
  border-color: var(--color-accent);
}

.ship-tile__preview {
  position: absolute;
  inset: 2px 0 15px;
  width: 100%;
  height: calc(100% - 17px);
  object-fit: contain;
  opacity: 0.92;
}

.ship-tile__tier {
  position: absolute;
  top: 2px;
  left: 4px;
  font-size: 11px;
  text-shadow: 0 1px 3px #000;
}

.ship-tile__flag {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 18px;
  height: 12px;
  object-fit: cover;
}

.ship-tile__name {
  position: absolute;
  inset: auto 0 0;
  padding: 1px 5px;
  background: rgba(6, 13, 18, 0.9);
  font-size: 10px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
