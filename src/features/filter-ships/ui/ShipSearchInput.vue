<!-- src/features/search-ships/ui/ShipSearchInput.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useShipFilterStore } from '@/features/filter-ships'

const filterStore = useShipFilterStore()

const searchQuery = computed({
  get: () => filterStore.filter.searchQuery,
  set: (value: string) => filterStore.setSearchQuery(value),
})
</script>

<template>
  <div class="ship-search">
    <span class="ship-search__icon" aria-hidden="true">⌕</span>

    <input
      v-model="searchQuery"
      class="ship-search__input"
      type="search"
      placeholder="Search ships"
      aria-label="Search ships by name"
      autocomplete="off"
      spellcheck="false"
    />

    <button
      v-if="searchQuery"
      class="ship-search__clear"
      type="button"
      aria-label="Clear search"
      @click="searchQuery = ''"
    >
      ×
    </button>
  </div>
</template>

<style scoped>
.ship-search {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.ship-search__icon {
  position: absolute;
  left: 10px;
  color: var(--color-text-muted);
  font-size: 14px;
  pointer-events: none;
}

.ship-search__input {
  width: 100%;
  min-height: 44px;
  padding: 0 36px 0 30px;
  background: rgba(10, 22, 32, 0.85);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font: inherit;
  font-size: 14px;
}

.ship-search__input::placeholder {
  color: #5d7382;
}

.ship-search__input:focus {
  border-color: var(--color-accent);
  outline: none;
}

.ship-search__input::-webkit-search-cancel-button {
  appearance: none;
}

.ship-search__clear {
  position: absolute;
  right: 0;
  width: 36px;
  height: 44px;
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}

.ship-search__clear:hover {
  color: var(--color-text);
}

@media (min-width: 769px) {
  .ship-search__input {
    min-height: 36px;
  }

  .ship-search__clear {
    height: 36px;
  }
}
</style>
