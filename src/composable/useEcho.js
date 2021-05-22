import Echo from 'laravel-echo'
import 'pusher-js'
import axios from '~/setup/axios'

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

const connect = () => {
  return new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_ECHO_KEY,
    wsHost: import.meta.env.VITE_ECHO_HOST,
    encrypted: false,
    forceTLS: true,
    disableStats: true,
    authorizer
  })
}


export default (user) => {
  const echo = connect()

  echo.private(`users.${user.id}`)
    .notification(notification => {
      console.log(notification)
    })

  echo.channel('event').listen('TestEvent', e => console.log(e))

  return echo
}
