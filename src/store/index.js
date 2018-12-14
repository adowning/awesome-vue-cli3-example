/** @format */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
// import * as getters from './getters'
// import common from './modules/common'
import auth from './modules/auth'
import cordova from './modules/cordova'
import device from './modules/device'
import conversations from './modules/conversations'
import notifications from './modules/notifications'
import actionbars from './modules/actionbars'
import profile from './modules/profile'
import background from './modules/background'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  // getters,
  state: {
    appVersion: 3
  },
  modules: {
    auth,
    cordova,
    device,
    // common,
    conversations,
    notifications,
    actionbars,
    profile,
    background
  }
})

// /** @format */

// import Vue from 'vue'
// import Vuex from 'vuex'
// import createLogger from 'vuex/dist/logger'
// import modules from './modules'

// Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

// export default new Vuex.Store({
//   modules,
//   strict: debug,
//   plugins: debug ? [createLogger()] : []
// })
