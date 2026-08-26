<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import { ShipsPage } from '@/pages/ships'
import './styles/base.css'

const renderError = ref<Error | null>(null)

onErrorCaptured((error, instance, info) => {
  renderError.value = error instanceof Error ? error : new Error(String(error))

  if (import.meta.env.DEV) {
    console.error('[render error]', info, error, instance)
  }

  return false
})

function reload(): void {
  window.location.reload()
}
</script>

<template>
  <div v-if="renderError" class="app-crash">
    <h1 class="app-crash__title">Something went wrong</h1>
    <p class="app-crash__message">{{ renderError.message }}</p>
    <button class="app-crash__action" type="button" @click="reload">Reload the page</button>
  </div>

  <ShipsPage v-else />
</template>

<style scoped>
.app-crash {
  max-width: 480px;
  margin: 96px auto;
  padding: 0 24px;
  text-align: center;
}

.app-crash__title {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.app-crash__message {
  margin-top: 12px;
  color: var(--color-text-muted);
  font-family: ui-monospace, monospace;
  font-size: 13px;
}

.app-crash__action {
  margin-top: 24px;
  padding: 10px 20px;
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font: inherit;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
}

.app-crash__action:hover {
  border-color: var(--color-accent);
  color: var(--color-text);
}
</style>
