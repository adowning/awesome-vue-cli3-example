/** @format */

import * as types from './mutation-types'
import { AuthApi } from '../helper/api'
import { DeviceApi } from '../helper/api'
import CloudApi, { createCloudApi } from '../helper/cbAPI'
// var x = createCloudApi()

//import Fingerprint2 from 'fingerprintjs2'
// require('fingerprintjs2')

import bus from '../helper/bus-event'
let authApi = new AuthApi()
let deviceApi = new DeviceApi()
import * as humanity from '../helper/humanity'
// const cloudApi = new CloudApi()
export const init = store => {
  console.log('starting application')
  startApp(store)
}

export const startApp = store => {
  async function f() {
    // var user = await cloudApi.startListeners(await p)
    // console.log(user)
    // const device = cloudApi.getCurrentDeviceFromLocal()
    // const humanityToken = humanity.setToken()
    // const allEmps = cloudApi.getAllEmployees()
    // const allDevs = cloudApi.getAllDevices()
    // const finalResult = [
    //   await device,
    //   await humanityToken,
    //   await allEmps,
    //   await allDevs
    // ]
    // store.commit(
    //   types.DEVICE_SET_EMPLOYEELIST,
    //   finalResult[0][0].document.employeeList,
    //   { root: true }
    // )
    // if (finalResult[2].lenght > 0) {
    //   store.commit(types.DEVICE_ALL_EMPLOYEES, finalResult[0])
    // }
    // if (finalResult[3].lenght > 0) {
    //   store.commit(types.DEVICE_ALL_DEVICES, finalResult[1])
    // }
    // bus.emit('system-ready')
    // return finalResult
  }
  f()
}

export const startThread = store => {
  let fn = function() {
    store.dispatch('notifications/count')
  }
  let th = new Thread(fn, 'NOTIFICATIONS')
  th.run(30000, true)
}

export const stopThread = store => {
  stopThreads('NOTIFICATIONS')
}
