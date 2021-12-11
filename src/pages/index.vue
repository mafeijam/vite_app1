<template lang="pug">
q-card.bg-grey-2.shadow-1
  q-card-section.text-subtitle1.text-weight-bold
    .text-grey-8 text
    .text-red-7 red
    .text-blue-8 blue
    .text-green-7 green
    .text-purple-6 purple
    .text-teal-6 teal
    .text-indigo-5 indigo
    .text-orange-8 orange
  q-card-section
    div(ref="telegram")
</template>

<script>
import axios from '~/setup/axios'

export default {
  mounted() {
    if (window.location.host.match(/jw/)) {
      window.onTelegramAuth = (user) => axios.post('/telegram/callback', user)
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://telegram.org/js/telegram-widget.js?15'
      script.setAttribute('data-telegram-login', 'jw1021bot')
      script.setAttribute('data-size', 'large')
      script.setAttribute('data-request-access', 'write')
      script.setAttribute('data-onauth', 'window.onTelegramAuth(user)')
      script.setAttribute('data-radius', '6')
      this.$refs.telegram.appendChild(script)
    }
  }
}
</script>
