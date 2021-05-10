<template lang="pug">
.bg-blue-grey-1.window-height.window-width.flex.items-center.justify-center
  q-card
    q-card-section
      q-btn(label="login" @click="login")
</template>

<script>
import { useStore, mapState } from 'vuex'

export default {
  setup() {
    const store = useStore()
    return {
      login: () => store.dispatch('auth/login', {
        email: 'admin@jw.mini',
        password: '123456'
      })
    }
  }
}
</script>
