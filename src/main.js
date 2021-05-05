import { createApp } from 'vue'
import App from './App.vue'

import { Quasar } from 'quasar'
import 'quasar/dist/quasar.prod.css'

createApp(App)
  .use(Quasar)
  .mount('#app')
