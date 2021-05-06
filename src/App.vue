<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-page-container.bg-blue-grey-1
    q-page.q-mx-auto(padding style="width: 1280px;")
      q-card.shadow-1
        q-card-section {{ offlineReady }} | {{ needRefresh }}
</template>

<script>
import { useRegisterSW } from 'virtual:pwa-register/vue'

export default {
  setup() {
    const {
      offlineReady,
      needRefresh,
      updateServiceWorker,
    } = useRegisterSW()

    return {
      offlineReady,
      needRefresh,
      updateServiceWorker,
    }
  }
}
</script>
