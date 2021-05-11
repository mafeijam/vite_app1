<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-header.bg-grey-10(elevated )
    q-toolbar
      q-space
      q-btn(label="登出" text-color="blue-grey-3" icon="r_logout" flat @click="logout" :loading="loading")

  q-page-container.bg-blue-grey-10
    q-page.q-mx-auto(padding style="width: 1280px;")
      router-view
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
