/**
 * /*
 * 路由跳转权限控制
 *
 * @format
 */

import Vue from 'vue'
import { $auth } from '@helper'
import store from '../store'

export default {
  // Check the login status
  checkLoginAuth(to, from, next) {
    if (to.meta.title && to.meta.title[Vue.config.lang]) {
      document.title = to.meta.title[Vue.config.lang]
    }
    // if ($auth.checkSession() == 'badDevice') {
    //   next({ path: '/register' })
    // }
    if (to.meta && to.meta.ignoreAuth) {
      next()
    } else {
      console.log($auth.checkSession())
      if (
        $auth.checkSession() &&
        $auth.checkSession() != 'false' &&
        $auth.checkSession() != 'badDevice'
      ) {
        console.log('kookie good')
        // if (store.getters['device/thisDeviceEmployeeList'].length > 0) {
        next()
      } else {
        console.log('forcingi login')

        next({ path: '/login' })
      }
    }
  },

  // Check page permissions
  checkPageAuth(to, from, next) {
    if (to.meta && to.meta.ignoreAuth) {
      next()
    } else {
      // check user auth here....
      next()
    }
  }
}
