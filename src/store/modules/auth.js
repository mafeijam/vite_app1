import axios from '~/setup/axios'
import router from '~/router'

function setUserAndConnectEcho(commit, dispatch, data) {
  commit('setAuth', { isLoggedIn: true, user: data.user })
  dispatch('connectEcho', null, { root: true })
  dispatch('checkPushSubscription', null, { root: true })
  localStorage.setItem('guest', 'n')
}

const guestState = localStorage.getItem('guest') || 'n'

const state = {
  isLoggedIn: false,
  user: { name: null },
}

const mutations = {
  setAuth(state, { isLoggedIn, user }) {
    state.isLoggedIn = isLoggedIn
    state.user = user
  },
}

const actions = {
  async boot({ commit, dispatch }) {
    if (guestState === 'y') {
      return
    }

    try {
      const { data } = await axios.get('/me')
      setUserAndConnectEcho(commit, dispatch, data)
    } catch (e) {
      localStorage.setItem('guest', 'y')
    }
  },
  async login({ commit, dispatch }, credentials) {
    try {
      await axios.get('/csrf-cookie')
      const { data } = await axios.post('/login', credentials)
      setUserAndConnectEcho(commit, dispatch, data)
      router.push('/')
    } catch (e) {
      commit('setErrors', e.response.data, { root: true })
      localStorage.setItem('guest', 'y')
    }
  },
  async answer({ commit, dispatch }, answer) {
    try {
      const { data } = await axios.get(`/2fa/answered/${answer}`)
      setUserAndConnectEcho(commit, dispatch, data)
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
