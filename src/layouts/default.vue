<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-header.bg-grey-10(elevated )
    q-toolbar
      img(src="/code.svg" style="width: 30px;")
      q-space
      q-btn.text-weight-medium(label="登出" text-color="blue-grey-4" icon="r_logout" flat @click="logout" :loading="loading")

  q-page-container.bg-blue-grey-10
    q-page.q-mx-auto(padding style="width: 1280px; max-width: 100%;")
      router-view
    q-page-sticky(position="bottom-right" :offset="[18, 18]")
      q-fab(icon="r_widgets" direction="up" color="orange-9" text-color="grey-3")
        q-fab-action(icon="r_money" color="blue-7")
</template>

<script>
import { loading, dispatch } from '~/setup/useDispatch'

export default {
  setup() {
    const logout = () => dispatch('auth/logout')

    return {
      logout,
      loading
    }
  }
}
</script>
