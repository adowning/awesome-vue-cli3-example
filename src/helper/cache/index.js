/** @format */

import NativeStorage from './NativeStorage.js'
import LocalStorage from './LocalStorage.js'

let cache = null
if (window.cordova && window.cordova.platformId !== 'browser') {
  cache = new NativeStorage()
} else {
  cache = new LocalStorage()
}

export default cache

export const keys = {
  TOKEN_KEY: 'TOKEN',
  USER_KEY: 'USER',
  DEVICE_KEY: 'CURRENT_DEVICE'
}
