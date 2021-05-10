<template lang="pug">
div {{ user }}
q-btn(label="logout" @click="logout" v-if="user")
router-view

      //- q-card.shadow-1
      //-   q-card-section testing sw {{ isSub }}

      //-   q-card-section(v-if="needRefresh")
      //-     q-btn(label="reload" icon="r_sync" @click="updateServiceWorker" color="primary")

      //-   q-card-section
      //-     q-btn(label="unsub" @click="unsub" v-if="isSub")
      //-     q-btn(label="sub" @click="sub" v-else)
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore, mapState } from 'vuex'
import { useRegisterSW } from 'virtual:pwa-register/vue'

export default {
  setup() {
    const store = useStore()

    // const auth = computed(() => store.state.auth.isLoggedIn)

    const logout = () => store.dispatch('auth/logout')

    const {
      needRefresh,
      updateServiceWorker,
    } = useRegisterSW()

    const isSub = ref(false)

    const sub = async () => {
      let result = await Notification.requestPermission()
      console.log(result)

      if (result === 'granted') {
        let reg = await navigator.serviceWorker.ready
        let push = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'BCQpG-mAs4gvU3m37DNaJRDn8r8_OLfHbKgfmywaTLtRLOpGkBFVAUzP1tRWYxroOJ1UH3tC63Z8f9PYi3jkzS0'
        })
        console.log(JSON.stringify(push))
        isSub.value = true
      }
    }

    const getSubscription = async () => {
      let reg = await navigator.serviceWorker.ready
      return await reg.pushManager.getSubscription()
    }

    const unsub = async () => {
      let subscription = await getSubscription()
      console.log(subscription)
      await subscription?.unsubscribe()
      isSub.value = false
    }

    onMounted(async () => {
      console.log('checking subscription...')
      let subscription = await getSubscription()
      console.log(subscription)

      if (subscription) {
        console.log('updating subscription...')
        isSub.value = true
      }
    })

    // axios.get('/api/ping').then(r => console.log(r.data))

    return {
      needRefresh,
      updateServiceWorker,
      sub,
      unsub,
      isSub,
      logout
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}
</script>
