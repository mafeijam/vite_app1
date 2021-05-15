<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-header.bg-grey-10(elevated )
    q-toolbar
      q-avatar.cursor-pointer(@click="$router.push('/')")
        img.q-pa-xs(src="/code.svg")
      q-space
      q-btn.q-mr-xs(icon="r_mail_outline" flat round color="grey-5")
      q-btn(icon="r_more_vert" flat round color="grey-5")
        q-menu.bg-blue-grey-10(anchor="bottom right" self="top right" :offset="[0, 6]" style="width: 200px;")
          q-item
            q-item-section
              q-item-label.text-orange-14.text-weight-bold.text-uppercase {{ $store.state.auth.user.name }}
          q-separator
          q-item(tag="label" v-ripple v-if="!$q.platform.is.ios")
            q-item-section
              q-item-label.text-grey-5 接收通知
            q-item-section(side)
              q-toggle(v-model="subscription" color="orange-14" keep-color dense)
          q-item(clickable v-ripple @click="logout")
            q-item-section
              q-item-label.text-grey-5 登出
            q-item-section(avatar)
              q-icon(name="r_logout" color="orange-14")

  q-page-container.bg-grey-3
    q-page.q-mx-auto(padding style="width: 1280px; max-width: 100%;")
      transition(
        name="slide-x-transition"
        mode="out-in"
      )
        router-view
    q-page-sticky(position="bottom-right" :offset="[18, 18]")
      q-fab(icon="r_widgets" direction="up" color="orange-14" text-color="orange-1")
        q-fab-action(icon="r_money" color="blue-7" to="/bank")
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { loading, dispatch } from '~/setup/useDispatch'

export default {
  setup() {
    const store = useStore()

    const subscription = computed({
      get: () => store.state.isSubscribed,
      set: val => store.dispatch(val ? 'subscribe' : 'unsubscribe')
    })

    const logout = () => dispatch('auth/logout')

    onMounted(() => store.dispatch('checkPushSubscription'))

    return {
      logout,
      loading,
      subscription
    }
  }
}
</script>
