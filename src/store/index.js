import { createStore, createLogger } from 'vuex'
import auth from './modules/auth'
import axios from '~/setup/axios'
import useEcho from '~/composable/useEcho'

const state = {
  isSubscribed: false,
  subscription: null,
  echo: null,
  errors: null
}

const mutations = {
  setSubscription(state, { isSubscribed, subscription }) {
    state.isSubscribed = isSubscribed
    state.subscription = subscription
  },
  setEcho(state, echo) {
    state.echo = echo
  },
  setErrors(state, errors) {
    state.errors = errors
  }
}

const actions = {
  async subscribe({ commit }) {
    let reg = await navigator.serviceWorker.ready
    let result = await Notification.requestPermission()
    console.log(result)

    if (result === 'granted') {
      console.log('adding subscription...')

      let newSubscription  = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY
      })

      await axios.post('/subscribe', newSubscription)

      commit('setSubscription', {
        isSubscribed: true,
        subscription: newSubscription
      })
    }
  },
  async unsubscribe({ commit }) {
    console.log('deleting subscription...')
    let reg = await navigator.serviceWorker.ready
    let subscription = await reg.pushManager.getSubscription()
    await subscription.unsubscribe()
    await axios.post('/unsubscribe', subscription)
    commit('setSubscription', {
      isSubscribed: false,
      subscription: null
    })
  },
  async checkPushSubscription({ commit }) {
    let reg = await navigator.serviceWorker.ready
    let subscription = await reg.pushManager.getSubscription()
    console.log('checking subscription...')
    if (subscription) {
      console.log('updating subscription...')
      commit('setSubscription', {
        isSubscribed: true,
        subscription: subscription
      })
    }
  },
  async connectEcho({ commit, state }) {
    console.log('connecting ws...')
    const echo = useEcho(state.auth.user)
    commit('setEcho', echo)
  }
}

const store = createStore({
  modules: {
    auth
  },
  plugins: process.env.NODE_ENV === 'production'
    ? []
    : [createLogger()],
  state,
  mutations,
  actions
})

export default store
