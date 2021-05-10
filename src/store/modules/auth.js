import axios from 'axios'
import router from '~/router'

export default {
  namespaced: true,
  state() {
    return {
      booted: false,
      isLoggedIn: false,
      user: null
    }
  },
  mutations: {
    setAuth(state, { isLoggedIn, user }) {
      state.isLoggedIn = isLoggedIn
      state.user = user
    },
    setBooted(state) {
      state.booted = true
    }
  },
  actions: {
    async boot({ commit }) {
      try {
        const { data: user } = await axios.get('/api/me')
        commit('setAuth', { isLoggedIn: true, user })
        commit('setBooted')
      } catch (e) {
        commit('setBooted')
      }
    },
    async login({ commit }, credentials) {
      try {
        const { data: user } = await axios.post('/api/login', credentials)
        commit('setAuth', { isLoggedIn: true, user })
        router.push('/')
      } catch (e) {}
    },
    async logout({ commit }) {
      await axios.post('/api/logout')
      commit('setAuth', { isLoggedIn: false, user: null })
      router.push('/login')
    }
  }
}
