import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteComponents from 'vite-plugin-components'
import { VitePWA, cachePreset } from 'vite-plugin-pwa'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config({ path: './.env' })

const viteConfig = {
  ...(process.env.KEY && process.env.CERT ? {
    server: {
      https: {
        key: fs.readFileSync(process.env.KEY),
        cert: fs.readFileSync(process.env.CERT)
      },
      proxy: {
        '/api': 'http://127.0.0.1:8000'
      }
    }
  } : {}),

  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    Vue(),
    ViteComponents(),
    VitePWA({
      manifest: {
        name: 'App',
        short_name: 'App',
        background_color: '#CFD8DC',
        theme_color: '#CFD8DC',
        icons: [
          {
            "src": "/pwa-196.png",
            "sizes": "196x196",
            "type": "image/png",
          },
          {
            "src": "/pwa-512.png",
            "sizes": "512x512",
            "type": "image/png",
          },
        ]
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
