/** @format */

import { DeviceApi } from '../../helper/api'
import * as types from '../mutation-types'
import bus from '../../helper/bus-event'
import cache, { keys } from '../../helper/cache'
import CloudApi from '../../helper/cbAPI'
import * as humanity from '../../helper/humanity'
let cloudApi = new CloudApi()

/* eslint-disable no-undef */

// initial state
let deviceApi = new DeviceApi()

const state = {
  devices: [],
  current: null,
  resolution: {
    width: screen.width,
    height: screen.height
  },
  thisDeviceEmployeeList: [],
  allEmployees: [],
  allDevices: []
}

// getters
const getters = {
  thisDeviceEmployeeList: state => state.thisDeviceEmployeeList,
  resolution: state => state.resolution,
  isMobile: state => state.resolution.width < 768,
  isTablet: state =>
    state.resolution.width >= 768 && state.resolution.width < 992,
  isDesktop: state => state.resolution.width >= 992,
  isNotLargeDesktop: state => state.resolution.width < 1300,
  isFacebokApp: state => window.name !== '',
  isBrowser: state => {
    let isBrowser = true
    if (window.device && window.device.platform) {
      if (window.device.platform.toLowerCase() !== 'browser') {
        isBrowser = false
      }
    }
    return isBrowser
  }
}

// actions
const actions = {
  async init(store) {
    var init = await cloudApi.startListeners()
    var device = await cloudApi.getCurrentDeviceFromLocal()
    store.commit(types.DEVICE_SET_EMPLOYEELIST, device[0].document.employeeList)
    // store.commit(types.DEVICE_SET_CURRENT_DEVICE, device[0].document)

    // var stuff = await Promise.all([
    //   cloudApi.getAllEmployees(),
    //   cloudApi.getAllDevices()
    // ])
    const humanityToken = humanity.setToken()
    const allEmps = cloudApi.getAllEmployees()
    const allDevs = cloudApi.getAllDevices()
    const finalResult = [await humanityToken, await allEmps, await allDevs]

    console.log(finalResult)
    if (finalResult[1].lenght > 0) {
      store.commit(types.DEVICE_ALL_EMPLOYEES, finalResult[0])
    }
    if (finalResult[2].lenght > 0) {
      store.commit(types.DEVICE_ALL_DEVICES, finalResult[1])
    }

    bus.emit('system-ready')
    return finalResult
  },
  addEmployee(store, employeeId) {
    console.log('adding from device')
    return deviceApi
      .addEmployee(employeeId)
      .then(response => {
        store.commit(types.DEVICE_SET_EMPLOYEELIST, response)
      })
      .catch(err => {
        console.log(err)
      })
  },
  removeEmployee(store, employeeId) {
    console.log('removing from device')

    return deviceApi
      .removeEmployee(employeeId)
      .then(response => {
        store.commit(types.DEVICE_SET_EMPLOYEELIST, response)
      })
      .catch(err => {
        console.log(err)
      })
  },

  resize() {
    var w = window
    var d = document
    var e = d.documentElement
    var g = d.getElementsByTagName('body')[0]
    var x = w.innerWidth || e.clientWidth || g.clientWidth
    var y = w.innerHeight || e.clientHeight || g.clientHeight

    state.resolution.width = x
    state.resolution.height = y
    bus.emit('resize', state.resolution)
  },
  scrolling() {
    let realScroll = document.body.scrollHeight - state.resolution.height

    var supportPageOffset = window.pageXOffset !== undefined
    var isCSS1Compat = (document.compatMode || '') === 'CSS1Compat'

    let scrollPosition = supportPageOffset
      ? window.pageYOffset
      : isCSS1Compat
      ? document.documentElement.scrollTop
      : document.body.scrollTop

    if (scrollPosition + 400 > realScroll) {
      bus.emit('scroll-bottom', state.resolution)
    }
  }
}

// mutations
const mutations = {
  [types.DEVICE_SET_EMPLOYEELIST](state, list) {
    state.thisDeviceEmployeeList = list
  },
  [types.DEVICE_ALL_EMPLOYEES](state, list) {
    state.allEmployees = list
  },
  [types.DEVICE_ALL_DEVICES](state, list) {
    state.allDevices = list
  },
  // [types.DEVICE_SET_CURRENT_DEVICE](state, device) {
  //   state.current = device
  //   console.log(keys.DEVICE_KEY)
  //   console.log(device)
  //   cache.setItem(keys.DEVICE_KEY, device)
  //   let i = state.devices.findIndex(i => i.id === device.id)
  //   if (i >= 0) {
  //     state.devices[i] = device
  //   } else {
  //     state.devices.push(device)
  //   }
  // },

  [types.DEVICE_SET_DEVICES](state, devices) {
    state.devices = devices
  },

  [types.DEVICE_DELETE](state, id) {
    if (id) {
      let i = state.devices.findIndex(i => i.id === id)
      if (i >= 0) {
        state.devices.splice(i, 1)
      }
    } else {
      state.devices = []
      state.current = null
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

window.addEventListener('resize', actions.resize, false)
document.addEventListener('scroll', actions.scrolling, false)
