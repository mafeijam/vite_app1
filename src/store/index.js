import { createStore, createLogger } from 'vuex'
import auth from './modules/auth'

const store = createStore({
  modules: {
    auth
  },
  plugins: process.env.NODE_ENV === 'production'
    ? []
    : [createLogger()]
})

export default store
