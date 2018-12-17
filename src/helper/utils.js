/** @format */

import Vue from 'vue'
import * as Fingerprint2 from 'fingerprintjs2'

if (typeof String.prototype.startsWith !== 'function') {
  Window.String.prototype.startsWith = function(prefix) {
    return this.slice(0, prefix.length) === prefix
  }
}

export default {
  async getFingerprint() {
    console.log('fp gening')
    const secure = await new Promise(resolve => {
      new Fingerprint2.get(components => {
        let values = components.map(function(component) {
          return component.value
        })
        resolve(Fingerprint2.x64hash128(values.join(''), 31))
      })
    })
    return secure
  },

  resMsg(res) {
    let key = {
      zh: 'Chinese',
      en: 'English'
    }[Vue.config.lang]
    try {
      let obj = JSON.parse(res.Message)
      return obj[key] || obj.Chinese
    } catch (e) {
      return res && res.Message
    }
  },

  serverUrl(apiName) {
    return `app/${apiName}`
  },

  titleLang(zhStr, enStr) {
    return {
      zh: zhStr,
      en: enStr
    }
  },

  query(search) {
    let str = search || window.location.search
    let objURL = {}

    str.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
      objURL[$1] = $3
    })
    return objURL
  },

  queryString(url, query) {
    let str = []
    for (let key in query) {
      str.push(key + '=' + query[key])
    }
    let paramStr = str.join('&')
    return paramStr ? `${url}?${paramStr}` : url
  },

  /* -----------------------------localStorage------------------------------------ */
  /*
   * set localStorage
   */
  setStorage(name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },

  /**
   * get localStorage
   */
  getStorage(name) {
    if (!name) return
    let content = window.localStorage.getItem(name)
    return JSON.parse(content)
  },

  /**
   * delete localStorage
   */
  removeStorage(name) {
    if (!name) return
    window.localStorage.removeItem(name)
  }
}

export function today() {
  let _today = new Date()
  let dd = _today.getDate()
  let mm = _today.getMonth() + 1
  let yyyy = _today.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  return yyyy + '-' + mm + '-' + dd
}
export function stringify(o) {
  var seen = []
  return JSON.stringify(o, function(_, value) {
    if (typeof value === 'object' && value !== null) {
      if (seen.indexOf(value) !== -1) return
      else seen.push(value)
    }
    return value
  })
}

export function getRoute(value, subRoute = '') {
  if (!subRoute) {
    subRoute = ''
  }

  if (value && value.length) {
    return process.env.API_URL + subRoute + value
  } else {
    return process.env.ROUTE_BASE + 'static/img/default-profile.png'
  }
}

export function inputIsNumber(event) {
  console.log(event.type)
  if (event.type.toUpperCase() === 'KEYDOWN') {
    if (!eventNumberKeyInput(event)) {
      event.preventDefault()
      return event
    }
  } else if (event.type.toUpperCase() === 'PASTE') {
    if (!eventNumberPaste(event)) {
      event.preventDefault()
      return false
    }
  }
}

export function isDigit(code) {
  let stringCode = String.fromCharCode(code)
  return /^\d$/.test(stringCode)
}

export function isNumber(variable) {
  return /^\d+$/.test(variable)
}

export function eventNumberKeyInput(event) {
  if (
    event.ctrlKey ||
    event.altKey ||
    (event.keyCode > 47 && event.keyCode < 58 && event.shiftKey === false) ||
    (event.keyCode > 95 && event.keyCode < 106) ||
    event.keyCode === 8 ||
    event.keyCode === 9 ||
    (event.keyCode > 34 && event.keyCode < 40) ||
    event.keyCode === 46
  ) {
    return true
  } else {
    return false
  }
}

export function eventNumberPaste(event) {
  if (clipboardIsNumeric(event)) {
    return true
  } else {
    return false
  }
}

export function clipboardIsNumeric(event) {
  var clipboardData = event.clipboardData
    ? event.clipboardData.getData('Text')
    : window.clipboardData.getData('Text')
  var isNumber = /^\d+$/.test(clipboardData)
  return isNumber
}

export function debounce(func, wait, immediate) {
  let timeout
  return function() {
    let context = this
    let args = arguments
    let later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    let callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

export function getCityName(data) {
  let city
  let province
  let name
  if (data.address_components) {
    for (let ind = 0; ind < data.address_components.length; ind++) {
      if (data.address_components[ind].types[0] === 'locality') {
        city = data.address_components[ind].long_name.replace('Ciudad de ', '')
      } else if (
        data.address_components[ind].types[0] === 'administrative_area_level_1'
      ) {
        province = data.address_components[ind].short_name.replace(
          'Provincia de ',
          ''
        )
      }
    }
  }
  if (city && province) {
    name = city + ', ' + province
  } else {
    if (data.formatted_address) {
      name = data.formatted_address
    } else {
      name = data.name
    }
    name = name.replace(', Argentina', '')
  }
  return name
}
