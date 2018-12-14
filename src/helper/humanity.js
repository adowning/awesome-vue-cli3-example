/** @format */

import axios from 'axios'
import cache from './cache/'
// const axios = require('axios')
var tokenBaseURL = ''
var baseURL = ''
if (process.env.NODE_ENV == 'development') {
  tokenBaseURL = '/token'
  baseURL = '/humanity'
}
if (process.env.NODE_ENV == 'production') {
  tokenBaseURL = 'https://www.humanity.com/oauth2/token.php'
  baseURL = 'https://www.humanity.com/api/v2'
}
const AxiosInstanceHumanityToken = axios.create({
  baseURL: tokenBaseURL
})
const AxiosInstanceHumanity = axios.create({
  baseURL: baseURL
})
var token = ''

export async function setToken() {
  const options = {
    client_id: '0cbaa9173943569cad4c0b8267981147bac0cf5d',
    client_secret: 'be6a34d0830ab6fb3db837958d50faace249e0d1',
    grant_type: 'password',
    username: 'ash@andrewscarpetcleaning.com',
    password: 'sugarlips42'
  }

  return await AxiosInstanceHumanityToken.post('/', options).then(response => {
    cache.setItem('humanityToken', response.data.access_token)
    console.log(response.data.access_token)
  })
}
//www.humanity.com/api/v2/timeclocks/status/2736727/1?access_token=xxxxxxx

export async function getClockStatusOf1444044() {
  token = await cache.getItem('humanityToken')
  console.log(token)

  var x = await AxiosInstanceHumanity.get(
    '/timeclocks/status/1444044/1?access_token=' + token
  ).then(response => {
    // this.token = response.data.access_token;
    var string = response.data
    console.log(string)
    return string
  })
  return x
}

export async function clockInUser(empId) {
  token = await cache.getItem('humanityToken')
  var x = await AxiosInstanceHumanity.post(
    `/employees/${empId}/clockin?access_token=` + token
  ).then(response => {
    // this.token = response.data.access_token;
    var string = response.data
    console.log(string)
    return string
  })
  return x
}

export async function clockOutUser(empId) {
  var token = await cache.getItem('humanityToken')
  console.log(token)
  console.log(empId)
  var res = await AxiosInstanceHumanity.put(
    `/employees/${empId}/clockout?access_token=` + token
  )
    .then(response => {
      console.log(response)
      // this.token = response.data.access_token;
      var string = response.data
      console.log(string)
      return string
    })
    .catch(error => {
      console.log(error)
    })
  return res
}

/* eslint-disable */
// import axios from "axios"
// import payload from "./jhumanity"
// var token

// export async function getUsers() {
//   try {
//     var result = await axios.post(
//       "https://www.humanity.com/oauth2/token.php",
//       payload
//     )
//     callback(result)
//   } catch (error) {
//     console.log("my error")
//     console.error(error)
//   }
// }
// exports.getToken = async function(option, callback) {
//   try {
//     var result = await axios.post(
//       "https://www.humanity.com/oauth2/token.php",
//       payload
//     )
//     token = result.data.access_token
//     callback(result)
//   } catch (error) {
//     console.log("my error")
//     console.error(error)
//   }
// }
