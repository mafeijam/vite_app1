import axios from '~/setup/axios'
import router from '~/router'

function commitAuth(commit, data) {
  commit('setAuth', { isLoggedIn: true, user: data.user })
  commit('setBooted')
  localStorage.setItem('guest', 'n')
}

const state = {
  booted: false,
  isLoggedIn: false,
  user: { name: null }
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
      commitAuth(commit, data)
    } catch (e) {
      commit('setBooted')
      localStorage.setItem('guest', 'y')
    }
  },
  async login({ commit }, credentials) {
    try {
      await axios.get('/csrf-cookie')
      const { data } = await axios.post('/login', credentials)
      commitAuth(commit, data)
      router.push('/')
    } catch (e) {
      commit('setErrors', e.response.data, { root: true })
      localStorage.setItem('guest', 'y')
    }
  },
  async logout({ commit }) {
    await axios.post('/logout')
    commit('setAuth', { isLoggedIn: false, user: { name: null } })
    localStorage.setItem('guest', 'y')
    setTimeout(() => window.location.reload(), 100)
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
