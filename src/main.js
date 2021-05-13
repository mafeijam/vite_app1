import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Quasar, Notify } from 'quasar'
import 'quasar/dist/quasar.prod.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import iconSet from 'quasar/icon-set/material-icons-round'

import './app.css'

import './setup/preventZoom'


createApp(App)
  .use(Quasar, {
    plugins: {
      Notify
    },
    iconSet
  })
  .use(router)
  .use(store)
  .mount('#app')
