/** @format */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './global.js'
import './registerServiceWorker'
import cordova from './cordova'

import bus from './helper/bus-event'

window.store = store
if (process.env.NODE_ENV === 'development') {
  console.log('In development wait for cordova')
  setTimeout(function() {
    if (!window.cordova) {
      console.log('Not running in cordova')
      store.dispatch('init')
    }
  }, 2000)
}
bus.on('system-ready', () => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
