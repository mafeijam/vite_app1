import axios from 'axios'
import store from '~/store'

const client = axios.create({
  baseURL: '/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

client.interceptors.request.use(config => {
  store.commit('setErrors', null)
  return config
}, error => Promise.reject(error))

client.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401 && store.state.auth.booted) {
      localStorage.setItem('session_expired', '登陸已超時')

      return window.location.reload()
    }

    return Promise.reject(error)
  }
)

export default client
