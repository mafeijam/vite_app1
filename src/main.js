import { createApp } from 'vue'
import RootApp from './App.vue'
import router from './router'
import store from './store'

import { Quasar } from 'quasar'
import quasarConfig from '~/setup/quasarConfig'

import './setup/preventZoom'

import './app.css'

async function run() {
  await store.dispatch('auth/boot')

  createApp(RootApp)
    .use(Quasar, quasarConfig)
    .use(router)
    .use(store)
    .mount('#app')
}

run()
