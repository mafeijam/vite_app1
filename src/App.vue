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

    watch(needRefresh, val => {
      if (val) {
        useQuasar().notify({
          message: '發現更新，將於5秒後重新整理頁面',
          position: 'bottom-right',
          icon: 'r_info',
          color: 'orange-2',
          textColor: 'orange-14',
          timeout: 0
        })

        setTimeout(updateServiceWorker, 5000)
      }
    }, {
      immediate: true
    })
  }
}
</script>
