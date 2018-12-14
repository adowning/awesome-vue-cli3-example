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
    path: '/profile:id',
    meta: {
      ignoreAuth: true,
      title: 'profile'
    },
    component: resolve => require(['@components/profile/Index.vue'], resolve)
  }
]
