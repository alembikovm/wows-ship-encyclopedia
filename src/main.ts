import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './app/App.vue'

createApp(App).use(createPinia()).use(VueQueryPlugin).mount('#app')
