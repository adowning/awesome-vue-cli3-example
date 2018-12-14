/** @format */

// /** @format */

export const $ajax = require('./ajax').default
export const $apis = require('./api').default
export const $auth = require('./auth').default
export const $utils = require('./utils').default
export const $lodash = require('./lodash').default
export const $document = require('./document').default
// export const $cb = require('./cloudboost').default
/* jshint esversion: 6 */
/*
    Vue Plugin
    Install all services on Vue System
*/

// import Network from './network.js'
import Auth from './auth.js'
import Api from './api'

function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  //   Vue.prototype.$network = Network
  Vue.prototype.$auth = Auth
  Vue.prototype.$api = Api
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
