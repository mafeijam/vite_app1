import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

import store from '~/store'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition
      ? savedPosition
      : { top: 0 }
  },
  routes
})

router.beforeEach(async (to, from, next) => {
  if (store.state.auth.booted === false) {
    await store.dispatch('auth/boot')
  }

  const isLoggedIn = store.state.auth.isLoggedIn

  if (to.matched.some(record => record.meta.auth) && !isLoggedIn) {
    return next('/login')
  }

  if (to.matched.some(record => record.meta.guest) && isLoggedIn) {
    return next('/')
  }

  next()
})

export default router
