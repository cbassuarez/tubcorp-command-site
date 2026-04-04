import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'tubcorp-command-site'
const base = process.env.VITE_BASE_PATH ?? (process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/')

export default defineConfig({
  plugins: [react()],
  base,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      heerich: path.resolve(__dirname, './node_modules/heerich/src/heerich.js'),
    },
  },
})
