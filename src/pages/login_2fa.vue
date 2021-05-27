<template lang="pug">
.window-height.window-width.flex.justify-center.login-bg.relative-position.q-pa-lg
  .absolute-full.bg-blur
  q-card.login-card.shadow-12(:class="$q.screen.gt.xs ? 'q-mt-xl' : 'q-my-auto'")
    .flex.justify-center(:class="$q.screen.gt.xs ? 'q-px-xl q-mt-xl' : 'q-px-lg q-mt-lg'")
      img(src="/code.svg" style="width: 80px;")

    q-card-section.q-pt-none(:class="$q.screen.gt.xs ? 'q-pa-xl' : 'q-pa-lg'")
      q-form(@submit.prevent="login" :class="$q.screen.gt.xs ? 'q-gutter-xl' : 'q-gutter-lg'")
        .text-h6.text-purple-8.text-center 2FA 登入模式

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
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useQuasar, QSpinnerBars } from 'quasar'
import useLoading from '~/composable/useLoading'
import axios from '~/setup/axios'
import { connect } from '~/composable/useEcho'

export default {
  setup() {
    const store = useStore()
    const { loading, callable } = useLoading()
    const $q = useQuasar()

    const expired = ref(localStorage.getItem('session_expired'))
    localStorage.removeItem('session_expired')

    const form = reactive({
      email: 'admin@jw.mini',
      password: '123456',
      remember: true
    })

    let timer

    const loginFn = async () => {
      try {
        let { data } = await axios.post('/2fa/login', form)
        window.onbeforeunload = (e) => axios.get('/2fa/cancel')

        $q.loading.show({
          message: 'Pending 2FA from Telegram',
          boxClass: 'bg-orange-2 text-orange-14 text-h5 q-pa-xl',
          spinner: QSpinnerBars,
          spinnerSize: '5em'
        })

        timer = setTimeout(() => {
          $q.loading.hide()
          timer = null
        }, 60 * 10 * 1000)

        const echo = connect()

        echo.channel(`2fa.${data.token}`).listen('TwoFactorAnswered', async (e) => {
          clearTimeout(timer)
          $q.loading.hide()
          window.onbeforeunload = null
          echo.leaveChannel(`2fa.${data.token}`)
          await store.dispatch('auth/answer', e.answer)
        })
      } catch (e) {
        window.onbeforeunload = null
        store.commit('setErrors', e.response.data)
      }
    }

    return {
      form,
      loading,
      expired,
      errors: computed(() => store.state.errors),
      cantSubmit: computed(() => ['email', 'password'].some(k => !!form[k] === false)),
      login: () => {
        callable(loginFn)
        expired.value = false
      },
    }
  }
}
</script>
