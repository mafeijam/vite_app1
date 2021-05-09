import { createApp } from 'vue'
import App from './App.vue'

import { Quasar } from 'quasar'
import 'quasar/dist/quasar.prod.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import iconSet from 'quasar/icon-set/material-icons-round'

import './app.css'

createApp(App)
  .use(Quasar, {
    iconSet
  })
  .mount('#app')