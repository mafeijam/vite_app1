import axios from '~/setup/axios'
import router from '~/router'

export default {
  namespaced: true,
  state() {
    return {
      booted: false,
      isLoggedIn: false,
      user: null,
      errors: null
    }
  },
  mutations: {
    setAuth(state, { isLoggedIn, user }) {
      state.isLoggedIn = isLoggedIn
      state.user = user
    },
    setBooted(state) {
      state.booted = true
    },
    setErrors(state, errors) {
      state.errors = errors
    }
  },
  actions: {
    async boot({ commit }) {
      try {
        const { data: user } = await axios.get('/me')
        commit('setAuth', { isLoggedIn: true, user })
        commit('setBooted')
      } catch (e) {
        commit('setBooted')
      }
    },
    async login({ commit }, credentials) {
      try {
        await axios.get('/csrf-cookie')
        const { data: user } = await axios.post('/login', credentials)
        commit('setAuth', { isLoggedIn: true, user })
        commit('setBooted')
        router.push('/')
      } catch (e) {
        commit('setErrors', e.response.data)
      }
    },
    async logout({ commit }) {
      await axios.post('/logout')
      commit('setAuth', { isLoggedIn: false, user: null })
      router.push('/login')
      setTimeout(() => window.location.reload(), 100)
    }
  }
}
