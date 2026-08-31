import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

function vercelApiDevPlugin(): Plugin {
  return {
    name: 'vercel-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/', async (req, res, next) => {
        const [name, search = ''] = (req.url ?? '/').slice(1).split('?')
        if (!/^[a-z0-9-]+$/.test(name)) return next()

        const mod = await server.ssrLoadModule(`/api/${name}.js`)
        const handler = mod[(req.method ?? 'GET').toUpperCase()]
        if (typeof handler !== 'function') {
          res.statusCode = 405
          return res.end()
        }

        const requestUrl = `http://localhost/api/${name}${search ? `?${search}` : ''}`
        const response: Response = await handler(new Request(requestUrl))
        res.writeHead(response.status, Object.fromEntries(response.headers))
        res.end(await response.text())
      })
    },
  }
}

export default defineConfig({
  plugins: [vue(), vueDevTools(), vercelApiDevPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
