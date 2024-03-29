import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteComponents from 'unplugin-vue-components/vite'
import { VitePWA, cachePreset } from 'vite-plugin-pwa'
import AutoImport from 'unplugin-auto-import/vite'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config({ path: './.env' })

const manifest = {
  name: 'App',
  short_name: 'App',
  background_color: '#212121',
  theme_color: '#212121',
  icons: [
    {
      src: "/manifest-icon-192.png",
      sizes: "196x196",
      type: "image/png",
    },
    {
      src: "/manifest-icon-512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      src: "/manifest-icon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: 'any maskable',
    },
  ]
}

const workbox = {
  runtimeCaching: cachePreset,
  importScripts: ['sw-import.js'],
}

const viteConfig = {
  ...(process.env.KEY && process.env.CERT ? {
    server: {
      https: {
        key: fs.readFileSync(process.env.KEY),
        cert: fs.readFileSync(process.env.CERT)
      },
      proxy: {
        '/api': 'http://192.168.50.52:8000'
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
      manifest,
      workbox
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vuex',
        'quasar'
      ],
    })
  ],
  build: {
    brotliSize: false,
    chunkSizeWarningLimit: 1000
  }
}

// https://vitejs.dev/config/
export default defineConfig(viteConfig)
