import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
const repositoryName =
  process.env.GITHUB_REPOSITORY?.split('/').pop() || 'AGENTROPOLIS-33.3FM'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  base: `/${repositoryName}/`,
  server: { port: 5173, host: '0.0.0.0' }
})
