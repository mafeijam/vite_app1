import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents from 'vite-plugin-components'
import { VitePWA, cachePreset } from 'vite-plugin-pwa'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config({ path: './.env' })

const viteConfig = {
  ...(process.env.KEY && process.env.CERT ? {
    server: {
      https: {
        key: fs.readFileSync(process.env.KEY),
        cert: fs.readFileSync(process.env.CERT)
      }
    }
  } : {}),

  plugins: [
    vue(),
    ViteComponents(),
    VitePWA({
      // strategies: 'injectManifest',
      manifest: {
        name: 'App',
        short_name: 'App'
      },
      workbox: {
        runtimeCaching: cachePreset,
        importScripts: ['sw-import.js']
      }
    })
  ],
  build: {
    brotliSize: false,
    chunkSizeWarningLimit: 1000
  }
}

// https://vitejs.dev/config/
export default defineConfig(viteConfig)
