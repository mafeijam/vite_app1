<template lang="pug">
.window-height.window-width.flex.justify-center.login-bg.relative-position.q-pa-lg
  .absolute-full.bg-blur
  q-card.login-card.shadow-12(:class="$q.screen.gt.xs ? 'q-mt-xl' : 'q-my-auto'")
    .flex.justify-center(:class="$q.screen.gt.xs ? 'q-px-xl q-mt-xl' : 'q-px-lg q-mt-lg'")
      img(src="/code.svg" style="width: 80px;")

    q-card-section.q-pt-none(:class="$q.screen.gt.xs ? 'q-pa-xl' : 'q-pa-lg'")
      q-form(@submit.prevent="login" :class="$q.screen.gt.xs ? 'q-gutter-xl' : 'q-gutter-lg'")
        q-input(
          v-model="form.email" label="電郵"
          filled label-color="blue-grey-10"
          color="blue-grey-10" bg-color="blue-grey-3"
          :autofocus="$q.platform.is.desktop"
        )
          template(#prepend)
            q-icon(name="r_email")
        q-input(
          v-model="form.password" label="密碼" type="password"
          filled label-color="blue-grey-10"
          color="blue-grey-10" bg-color="blue-grey-3"
        )
          template(#prepend)
            q-icon(name="r_lock")

        .row.justify-between
          q-checkbox(v-model="form.remember" color="orange-14" keep-color dense)
            .text-grey-6.text-weight-medium.q-ml-sm 記住我
          q-btn.text-weight-medium(
            label="登入" type="submit" color="orange-14" text-color="grey-1"
            icon-right="r_login" :loading="loading" :disable="cantSubmit"
          )

        .row.justify-center
          q-btn(
            label="使用2FA 登入" color="purple-10" text-color="grey-2"
            to="/login_2fa" icon-right="r_security"
          )

    q-card-section.text-teal-8.bg-info-trans(v-if="expired" :class="$q.screen.gt.xs ? 'q-pa-xl' : 'q-pa-lg'")
      .flex.items-center
        q-icon(name="r_info_outline" size="1.8em")
        .text-h6.text-weight-bold.q-ml-md {{ expired }}

    q-card-section.text-pink-8.bg-error-trans(v-if="errors" :class="$q.screen.gt.xs ? 'q-pa-xl' : 'q-pa-lg'")
      .flex.items-center
        q-icon(name="r_warning_amber" size="1.8em")
        .text-h6.text-weight-bold.q-ml-md {{ errors.message }}
</template>

<script>
import { useStore } from 'vuex'
import useLoading from '~/composable/useLoading'

export default {
  setup() {
    const store = useStore()
    const { loading, callable } = useLoading()

    const expired = ref(localStorage.getItem('session_expired'))
    localStorage.removeItem('session_expired')

    const form = reactive({
      email: 'admin@jw.mini',
      password: '123456',
      remember: true
    })

    return {
      form,
      loading,
      expired,
      errors: computed(() => store.state.errors),
      cantSubmit: computed(() => ['email', 'password'].some(k => !!form[k] === false)),
      login: () => {
        callable(() => store.dispatch('auth/login', form))
        expired.value = false
      },
    }
  }
}
</script>
