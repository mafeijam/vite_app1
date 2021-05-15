import axios from '~/setup/axios'
import router from '~/router'

const state = {
  booted: false,
  isLoggedIn: false,
  user: null
}

const mutations = {
  setAuth(state, { isLoggedIn, user }) {
    state.isLoggedIn = isLoggedIn
    state.user = user
  },
  setBooted(state) {
    state.booted = true
  },
}

const actions = {
  async boot({ commit }) {
    try {
      const { data } = await axios.get('/me')
      commit('setAuth', { isLoggedIn: true, user: data.user })
      commit('setBooted')
    } catch (e) {
      commit('setBooted')
    }
  },
  async login({ commit }, credentials) {
    try {
      await axios.get('/csrf-cookie')
      const { data } = await axios.post('/login', credentials)
      commit('setAuth', { isLoggedIn: true, user: data.user })
      commit('setBooted')
      router.push('/')
    } catch (e) {
      commit('setErrors', e.response.data, { root: true })
    }
  },
  async logout({ commit }) {
    await axios.post('/logout')
    commit('setAuth', { isLoggedIn: false, user: null })
    router.push('/login')
    setTimeout(() => window.location.reload(), 100)
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
