<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-header.bg-grey-10(elevated )
    q-toolbar
      q-avatar.cursor-pointer(@click="$router.push('/')")
        img.q-pa-xs(src="/code.svg")
      q-space
      q-btn.q-mr-md(icon="r_campaign" flat round dense color="grey-5" @click="broadcast")
      q-btn.q-mr-md(icon="r_notifications" flat round dense color="grey-5" @click="drawer = !drawer")
        q-badge(rounded floating color="orange-14" label="1")
      q-btn(icon="r_more_vert" flat round dense color="grey-5")
        q-menu.bg-blue-grey-10(anchor="bottom right" self="top right" :offset="[0, 6]" style="width: 200px;")
          q-item
            q-item-section
              q-item-label.text-orange-14.text-weight-bold.text-uppercase {{ user.name }}
          q-separator
          q-item(tag="label" v-ripple v-if="!$q.platform.is.ios")
            q-item-section
              q-item-label.text-grey-5 接收通知
            q-item-section(side)
              q-toggle(v-model="subscription" color="orange-14" keep-color dense)
          q-item(clickable v-ripple @click="logout" :disable="loading")
            q-item-section
              q-item-label.text-grey-5 登出
            q-item-section(avatar)
              q-icon(name="r_logout" color="orange-14")

  q-drawer.bg-blue-grey-1(v-model="drawer" :width="300" bordered side="right")
    q-scroll-area.fit
      .q-pa-md
        div(v-for="i in 12") {{ i }}

  q-page-container.bg-grey-3
    q-page.q-mx-auto(padding style="width: 1380px; max-width: 100%;")
      router-view(v-slot="{ Component }")
        transition(
          name="slide-x-transition"
          mode="out-in"
        )
          component(:is="Component")
    q-page-sticky(position="bottom-right" :offset="[18, 18]")
      q-fab(icon="r_widgets" direction="up" color="orange-14" text-color="grey-1")
        q-fab-action(icon="r_money" color="blue-7" to="/bank")
</template>

<script setup>
import useLoading from '~/composable/useLoading'
import axios from '~/setup/axios'

const store = useStore()
const { loading, callable } = useLoading()

const drawer = ref(false)

const user = computed(() => store.state.auth.user)

const subscription = computed({
  get: () => store.state.isSubscribed,
  set: val => store.dispatch(val ? 'subscribe' : 'unsubscribe')
})

const logout = () => callable(() => store.dispatch('auth/logout'))

const broadcast = () => axios.post('/broadcast')
</script>
