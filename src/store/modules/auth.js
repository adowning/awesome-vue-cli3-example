/** @format */
import * as types from '../mutation-types'
import { AuthApi, UserApi } from '../../helper/api'
import router from '../../router'
import cache, { keys } from '../../helper/cache'
import CloudApi from '../../helper/cbAPI'
import * as humanity from '../../helper/humanity'
import globalStore from '../index'

let authApi = new AuthApi()
let userApi = new UserApi()

const state = {
  auth: false,
  user: null,
  token: null,
  firstTime: false,
  appConfig: null
}

// getters
const getters = {
  checkLogin: state => state.auth,
  authHeader: state =>
    state.auth ? { Authorization: 'Bearer ' + state.token } : {},
  user: state => state.user,
  firstTime: state => state.firstTime,
  appConfig: state => state.appConfig
}

// actions

function getClockStatusOf1444044() {
  console.log('hi')
  return authApi.getClockStatusOf1444044().then(response => {
    // onClockIn(store, response.user)
    // store.commit(types.DEVICE_ADD_USER_USERLIST, employeeId)
    // console.log(response.status)
    return Promise.resolve(response)
  })
}

function clockIn(store, creds) {
  return humanity.clockInUser(creds.humanityId).then(
    response => {
      console.log(response)
      // onClockIn(store, response.user)
      // store.commit(types.DEVICE_ADD_USER_USERLIST, employeeId)
      if (response.status == '13') {
        // router.push({ name: 'login' })
        return Promise.reject(response)
      }
      // store.commit(types.AUTH_SET_TOKEN, token)
      store
        .dispatch('device/addEmployee', creds.employeeId, { root: true })
        .then(res => {
          router.push({ name: 'home' })
          return Promise.resolve()
        })
      // return Promise.reject(response)
    }
    // ({ data, status }) => {
    //   return Promise.reject(data)
    // }
  )
}

function checkAuth(store) {
  return humanity.clockOutUser().then(response => {
    console.log(response[0].document.employeeList.length)
    if (response[0].document.employeeList.length > 0) {
      store.commit(types.AUTH_SET_AUTH, true)
    } else {
      store.commit(types.AUTH_SET_AUTH, false)
    }
    return Promise.resolve(response)
  })
}
function clockOut(store, creds) {
  // return authApi.clockOut(creds.humanityId).then(
  return humanity.clockOutUser(creds.humanityId).then(
    response => {
      console.log(response)

      // onClockIn(store, response.user)
      // store.commit(types.DEVICE_ADD_USER_USERLIST, employeeId)

      if (response.status == '13') {
        console.log(response.status)
        router.push({ name: 'login' })
        return Promise.reject(response)
      }
      store
        .dispatch('device/removeEmployee', creds.employeeId, { root: true })
        .then(res => {
          router.push({ name: 'login' })
          return Promise.resolve(response)
        })
    }
    // ({ data, status }) => {
    //   return Promise.reject(data)
    // }
  )
}
function firstTime(store, firstTime) {
  store.commit(types.AUTH_FIRST_TIME, firstTime)
}

// store = { commit, state, rootState, rootGetters }
function activate(store, activationToken) {
  console.log('activate action')
  firstTime(store, true)
  return authApi
    .activate(activationToken, {})
    .then(response => {
      onLoggin(store, response.token)
    })
    .catch(err => {
      if (err) {
      }
    })
}

function resetPassword(store, email) {
  return authApi
    .resetPassword({ email })
    .then(() => {
      return Promise.resolve()
    })
    .catch(err => {
      if (err) {
        return Promise.reject()
      }
    })
}

function changePassword(store, { token, data }) {
  return authApi
    .changePassword(token, data)
    .then(() => {
      router.push({ name: 'login' })

      return Promise.resolve()
    })
    .catch(err => {
      if (err) {
        return Promise.reject()
      }
    })
}

function register(
  store,
  { email, password, passwordConfirmation, name, birthday, termsAndConditions }
) {
  let data = {}
  data.email = email
  data.password = password
  data.password_confirmation = passwordConfirmation
  data.name = name
  data.password = password
  data.terms_and_conditions = termsAndConditions
  data.birthday = birthday

  return userApi
    .register(data)
    .then(data => {
      return Promise.resolve()
    })
    .catch(err => {
      if (err.response) {
      } else {
        if (err.message === 'Could not create new user.') {
        }
      }
      return Promise.reject(err)
    })
}

function fetchUser(store) {
  return userApi
    .show()
    .then(response => {
      store.commit(types.AUTH_SET_USER, response.data)
    })
    .catch(({ data, status }) => {
      console.log(data, status)
    })
}

function retoken(store) {
  let data = {}
  // data.app_version = store.rootState.appVersion;

  return new Promise((resolve, reject) => {
    authApi
      .retoken(data)
      .then(response => {
        console.log('retoken response', response)
        store.commit(types.AUTH_SET_TOKEN, response.token)
        store.commit('AUTH_APP_CONFIG', response.config)
        resolve()
      })
      .catch(({ data, status }) => {
        // check for internet problems -> not resolve until retoken finish
        console.log(data, status)
        store.commit(types.AUTH_LOGOUT)
        router.push({ name: 'login' })
        resolve()
      })
  })
}

function logout(store) {
  let device = globalStore.state.device.current
  if (device) {
    globalStore.dispatch('device/delete', device.id)
  }
  store.commit(types.AUTH_LOGOUT)
  globalStore.commit('device/' + types.DEVICE_SET_DEVICES, [])
  globalStore.dispatch('stopThread')
  router.replace({ name: 'trips' })
}

function update(store, data) {
  return userApi
    .update(data)
    .then(response => {
      firstTime(store, false)
      store.commit(types.AUTH_SET_USER, response.data)
      return Promise.resolve(response.data)
    })
    .catch(({ data, status }) => {
      console.log(data, status)
      return Promise.reject(data)
    })
}

function updatePhoto(store, data) {
  return userApi
    .updatePhoto(data)
    .then(response => {
      store.commit(types.AUTH_SET_USER, response.data)
      return Promise.resolve(response.data)
    })
    .catch(({ data, status }) => {
      console.log(data, status)
      return Promise.reject(data)
    })
}

const actions = {
  // login,
  clockIn,
  clockOut,
  activate,
  register,
  getClockStatusOf1444044,
  fetchUser,
  retoken,
  logout,
  resetPassword,
  checkAuth,
  changePassword,
  update,
  updatePhoto
}

// mutations
const mutations = {
  [types.AUTH_SET_AUTH](state, bool) {
    state.auth = bool
  },
  [types.AUTH_SET_TOKEN](state, token) {
    state.token = token.replace('"', '')
    state.auth = true
    cache.setItem(keys.TOKEN_KEY, token)
  },
  [types.AUTH_SET_USER](state, user) {
    state.user = user
    cache.setItem(keys.USER_KEY, user)
  },
  [types.AUTH_LOGOUT](state) {
    state.token = null
    state.user = null
    state.auth = false
    cache.clear()
  },
  [types.AUTH_FIRST_TIME](state, firstTime) {
    state.firstTime = firstTime
  },

  AUTH_APP_CONFIG(state, appConfig) {
    state.appConfig = appConfig
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
