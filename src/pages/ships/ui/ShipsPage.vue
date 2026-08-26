<script setup lang="ts">
import { useEncyclopedia } from '@/entities/ship'

const { ships, degradedSources, isLoading, isError, hasFatalError, retry } = useEncyclopedia()
</script>

<template>
  <p v-if="isLoading">Loading Encyclopedia...</p>

  <p v-else-if="isError">Error occurred while loading Encyclopedia.</p>
  <div v-else-if="hasFatalError">
    <p>Fatal error occurred while loading Encyclopedia.</p>
    <p v-if="degradedSources.length">Degraded sources: {{ degradedSources.join(', ') }}</p>
    <button @click="retry">Try Again</button>
  </div>

  <template v-else>
    <p v-if="degradedSources.length">
      Some reference data is missing: {{ degradedSources.join(', ') }}
    </p>

    <p>{{ ships.length }} ships loaded.</p>
    <ul>
      <li v-for="ship in ships" :key="ship.id">
        {{ ship.tier }} · {{ ship.name }} · {{ ship.typeName }} · {{ ship.nationName }}
      </li>
    </ul>
  </template>
</template>
