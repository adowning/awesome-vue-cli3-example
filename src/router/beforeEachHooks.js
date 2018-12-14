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
    console.log(to.path)
    if (to.meta.title && to.meta.title[Vue.config.lang]) {
      document.title = to.meta.title[Vue.config.lang]
    }

    if (to.meta && to.meta.ignoreAuth) {
      next()
    } else {
      // if ($auth.checkSession()) {
      if (store.getters['device/thisDeviceEmployeeList'].length > 0) {
        next()
      } else {
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
