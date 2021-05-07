import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents from 'vite-plugin-components'
import { VitePWA } from 'vite-plugin-pwa'
import dotenv from 'dotenv'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig(() => {
  dotenv.config({ path: './.env' })
  
  return {
    server: {
      https: {
        key: fs.readFileSync(process.env.KEY),
        cert: fs.readFileSync(process.env.CERT)
      }
    },
    plugins: [
      vue(),
      ViteComponents(),
      VitePWA({
        strategies: 'injectManifest',
        manifest: {
          name: 'App',
          short_name: 'App'
        }
      })
    ]
  }
}) 
