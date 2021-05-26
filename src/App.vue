<template lang="pug">
router-view
</template>

<script>
import { watch } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const {
      needRefresh,
      updateServiceWorker,
    } = useRegisterSW()

    const $q = useQuasar()

    watch(needRefresh, val => {
      if (val) {
        $q.notify({
          message: '發現更新，將於3秒後重新整理頁面',
          position: 'bottom-right',
          icon: 'r_info',
          color: 'orange-2',
          textColor: 'orange-14',
          progress: true,
          timeout: 3000
        })

        setTimeout(updateServiceWorker, 3000)
      }
    }, {
      immediate: true
    })
  }
}
</script>
