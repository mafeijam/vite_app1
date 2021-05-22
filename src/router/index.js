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

router.beforeEach(async (to) => {
  const authRoute = to.matched.some(record => record.meta.auth)
  const guestRoute = to.matched.some(record => record.meta.guest)
  const isLoggedIn = store.state.auth.isLoggedIn

  if (authRoute && !isLoggedIn) {
    return '/login'
  } else if (guestRoute && isLoggedIn) {
    return '/'
  }

  const tenMinutesAfter = Date.now() - lastPing >= 600 * 1000

  if (isLoggedIn && authRoute && tenMinutesAfter) {
    await axios.get('/ping')
    lastPing = Date.now()
  }
})

export default router
