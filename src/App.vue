<template lang="pug">
router-view
</template>

<script>
import { onMounted } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()

    const {
      needRefresh,
      updateServiceWorker,
    } = useRegisterSW()

    console.log(needRefresh.value)

    onMounted(() => {
      if (needRefresh.value) {
        $q.notify({
          message: '發現更新，將於3秒後重新整理頁面',
          position: 'bottom-right'
        })

        setTimeout(updateServiceWorker, 3000)
      }
    })
  }
}
</script>
