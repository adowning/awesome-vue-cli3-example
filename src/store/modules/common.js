/** @format */
import * as types from '../mutation-types'
import cache, { keys } from '../../helper/cache'
import bus from '../../helper/bus-event'
export const init = store => {
  console.log('starting application')

  let promises = []
  let loadStateMap = [
    {
      key: keys.TOKEN_KEY,
      mutation: 'auth/' + types.AUTH_SET_TOKEN
    },
    {
      key: keys.USER_KEY,
      mutation: 'auth/' + types.AUTH_SET_USER
    },
    {
      key: keys.DEVICE_KEY,
      mutation: 'device/' + types.DEVICE_SET_CURRENT_DEVICE
    }
  ]
  store.dispatch('auth/checkAuth', {}, { root: true }).then(() => {
    loadStateMap.forEach(obj => {
      var p = new Promise((resolve, reject) => {
        cache
          .getItem(obj.key)
          .then(value => {
            store.commit(obj.mutation, value)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
      promises.push(p)
    })
  })
  return Promise.all(promises).then(() => {
    console.log('State loaded from cache')
    if (!store.state.auth) {
      console.log('State got no auth')
      startApp(store)
      // store
      //   .dispatch('auth/checkAuth', {}, { root: true })
      //   .then(() => startApp(store))
    } else {
      startApp(store)
    }
  })
}

export const startApp = store => {
  store.dispatch('device/start', {}, { root: true })
  // store.dispatch('trips/tripsSearch', { is_passenger: false })
  console.log(store.getters[('auth/checkLogin', { root: true })])
  if (store.state.auth.auth) {
    console.log('got auth ', store.state.auth.auth)
    // store.dispatch('auth/fetchUserList')
    store.dispatch('startThread')
    if (store.state.cordova.device) {
      store.dispatch('device/update')
    }
  }
  store.dispatch('device/resize')

  bus.emit('system-ready')
}

export const startThread = store => {
  let fn = function() {
    store.dispatch('notifications/count')
  }
  let th = new Thread(fn, 'NOTIFICATIONS')
  th.run(30000, true)
}

// eslint-disable-next-line
export const stopThread = store => {
  // eslint-disable-next-line
  stopThreads('NOTIFICATIONS')
}

const actions = {
  init,
  startApp,
  startThread,
  stopThread
}
export default {
  namespaced: true,
  actions
}
