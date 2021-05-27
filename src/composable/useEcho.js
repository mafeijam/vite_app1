import Echo from 'laravel-echo'
import 'pusher-js'
import axios from '~/setup/axios'
import { Notify } from 'quasar'
import store from '~/store'

const authorizer = (channel) => {
  return {
    authorize(socketId, callback) {
      axios.post('/broadcasting/auth', {
        socket_id: socketId,
        channel_name: channel.name
      })
      .then(response => callback(false, response.data))
      .catch(error => callback(true, error))
    }
  }
}

let connected = false

export const connect = () => {
  if (connected === false) {
    connected = new Echo({
      broadcaster: 'pusher',
      key: import.meta.env.VITE_ECHO_KEY,
      wsHost: import.meta.env.VITE_ECHO_HOST,
      encrypted: false,
      forceTLS: true,
      disableStats: true,
      authorizer
    })
  }

  return connected
}

export default (user) => {
  const echo = connect()

  echo.private(`users.${user.id}`)
    .notification(notification => {
      console.log(notification)
    })

  echo.channel('event').listen('TestEvent', e => {
    Notify.create({
      message: 'Test Event',
      position: 'top-left',
      icon: 'r_info',
      color: 'grey-2',
      textColor: 'grey-14',
    })
  })

  return echo
}
