import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

import store from '~/store'
import axios from '~/setup/axios'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition
      ? savedPosition
      : { top: 0 }
  },
  routes
})

let lastPing = Date.now()

router.beforeEach(async (to, from, next) => {
  const needAuth = to.matched.some(record => record.meta.auth)
  const isGuest = to.matched.some(record => record.meta.guest)

  if (store.state.auth.booted === false && needAuth) {
    await store.dispatch('auth/boot')
  }

  const isLoggedIn = store.state.auth.isLoggedIn

  if (needAuth && !isLoggedIn) {
    return next('/login')
  }

  if (isGuest && isLoggedIn) {
    return next('/')
  }

  const tenMinutesAfter = Date.now() - lastPing >= 600 * 1000

  if (isLoggedIn && needAuth && tenMinutesAfter) {
    await axios.get('/ping')
    lastPing = Date.now()
  }

  next()
})

export default router
