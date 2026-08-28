<script setup lang="ts">
defineProps<{
  label: string
  isActive: boolean
  iconUrl?: string
  accentColor?: string
}>()
</script>

<template>
  <button
    class="filter-chip"
    type="button"
    :aria-pressed="isActive"
    :style="accentColor ? { borderLeftColor: accentColor } : undefined"
  >
    <img v-if="iconUrl" class="filter-chip__icon" :src="iconUrl" alt="" loading="lazy" />
    {{ label }}
  </button>
</template>

<style scoped>
.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 44px;
  padding: 0 10px;
  background: #101f2a;
  border: 1px solid var(--color-border);
  border-left-width: 3px;
  color: var(--color-text-muted);
  font: inherit;
  font-size: 13.5px;
  cursor: pointer;
  transition:
    border-color 0.12s,
    color 0.12s,
    background 0.12s;
}

.filter-chip:hover {
  color: var(--color-text);
}

.filter-chip[aria-pressed='true'] {
  background: rgba(212, 162, 74, 0.2);
  border-color: var(--color-accent);
  color: var(--color-text);
}

.filter-chip__icon {
  width: 17px;
  height: 17px;
  object-fit: contain;
  flex: none;
}

@media (min-width: 769px) {
  .filter-chip {
    min-height: 32px;
  }
}
</style>
