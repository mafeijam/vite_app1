import axios from 'axios'
import store from '~/store'

const guestState = localStorage.getItem('guest') || 'n'

const client = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

client.interceptors.request.use(config => {
  store.commit('setErrors', null)
  config.headers['X-Socket-Id'] = store.state.echo?.socketId()
  return config
}, error => Promise.reject(error))

client.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401 && guestState === 'n') {
      localStorage.setItem('session_expired', '登陸已超時')

      return window.location.reload()
    }

    return Promise.reject(error)
  }
)

export default client
