import fs from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

const faviconPath = path.resolve(__dirname, 'public/favicon.svg')

// Browsers request /favicon.ico at the host root even when the app is mounted
// under the Pages base. Serve the project icon so preview has no 404.
function rootFavicon() {
  const handler = (req, res, next) => {
    const url = req.url?.split('?')[0]
    if (url !== '/favicon.ico') return next()
    res.statusCode = 200
    res.setHeader('Content-Type', 'image/svg+xml')
    fs.createReadStream(faviconPath).pipe(res)
  }
  return {
    name: 'root-favicon',
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    },
  }
}

// GitHub Pages project sites are served at /<repository>/.
// Actions sets GITHUB_REPOSITORY; local builds use this repo's name.
const repositoryName =
  process.env.GITHUB_REPOSITORY?.split('/').pop() || 'AGENTROPOLIS-33.3FM'

// Standalone Vite config — no Base44 plugin
export default defineConfig({
  plugins: [react(), rootFavicon()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  base: `/${repositoryName}/`,
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
  },
})