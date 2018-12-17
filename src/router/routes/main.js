/** @format */

export default [
  {
    path: '/login',
    meta: {
      ignoreAuth: true,
      title: 'login'
    },
    component: resolve => require(['@components/pages/login'], resolve)
  },
  {
    path: '/register',
    meta: {
      ignoreAuth: true,
      title: 'register'
    },
    component: resolve => require(['@components/pages/login'], resolve)
  },
  {
    path: '/profile:id',
    meta: {
      ignoreAuth: true,
      title: 'profile'
    },
    component: resolve => require(['@components/profile/Index.vue'], resolve)
  }
]
