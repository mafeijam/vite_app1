export default [
  {
    path: '/',
    meta: { auth: true },
    component: () => import('~/layouts/default.vue'),
    children: [
      {
        path: '',
        component: () => import('~/pages/index.vue')
      },
      {
        path: '/bank',
        component: () => import('~/pages/bank/index.vue')
      },
      {
        path: '/setting',
        component: () => import('~/pages/setting/index.vue')
      }
    ]
  },
  {
    path: '/login',
    meta: { guest: true },
    component: () => import('~/pages/login.vue')
  },
  {
    path: '/:404(.*)*',
    component: () => import('~/pages/404error.vue')
  }
]
