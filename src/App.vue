<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-page-container.bg-blue-grey-1
    q-page.q-mx-auto(padding style="width: 1280px;")
      q-card.shadow-1
        q-card-section testing sw {{ isSub }}

        q-card-section(v-if="needRefresh")
          q-btn(label="reload" icon="r_sync" @click="updateServiceWorker" color="primary")

        q-card-section
          q-btn(label="unsub" @click="unsub" v-if="isSub")
          q-btn(label="sub" @click="sub" v-else)
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

export default {
  setup() {
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

    return {
      needRefresh,
      updateServiceWorker,
      sub,
      unsub,
      isSub
    }
  }
}
</script>
