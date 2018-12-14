/**
 * @format
 */

import NotFound from '@components/pages/partials/NotFound'

export default [
  {
    path: '/',
    meta: {
      title: 'Vue-cli Overall Example',
      ignoreAuth: false
    },
    component: resolve => require(['@components/pages/homepage'], resolve)
  },
  {
    path: '/',
    redirect: '/homepage'
  },
  {
    path: '*',
    meta: {
      title: 'Page Not Found',
      ignoreAuth: true
    },
    component: NotFound
  }
]
