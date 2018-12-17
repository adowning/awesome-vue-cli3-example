/** @format */

// /** @format */

// import * as CloudBoost from 'cloudboost'
// import bus from './bus-event'
// import Utils from './utils'
// import { getCombinedModifierFlags } from 'typescript'
// //{"appId":"andrewsDev","keys":{"js":"6d47c270-f65c-44ff-b030-afb3f1e4d8f7","master":"85520530-5b9c-4f42-9795-08cdf41a3ece"},"_id":"5c128f7873889a49c5abd75e"}%
// // async function init(_CloudBoost) {
// //   _CloudBoost.CloudApp.init(
// //     // 'https://localhost:8443',
// //     // 'https://api.ashdevtools.com',
// //     'https://api.ashdevtools.com',
// //     'andrewsDev',
// //     'c4ecdb3f-b741-4824-9393-2bbc0ab3b47b'
// //   )
// //   return _CloudBoost
// // }
// // export function getCB() {
// //   console.log(this.CloudApi.CB)
// //   return CloudApi.CB
// // }
// class CloudApi {
//   constructor() {
//     if (CloudApi.INSTANCE) {
//       return CloudApi
//     }
//     console.log('xxxxxx')
//     // const CBx = init(CloudBoost)
//     // const CB = CloudBoost
//     console.log(CB.CloudUser.current)
//     this.CB = null

//     if (!CloudBoost.CloudUser.current) {
//       // init(CB)

//       this.CB = CBx
//       // CB.CloudUser.current.logOut({
//       //   success: function(user) {
//       //     console.log(user)
//       //     //log out successfull
//       //   },
//       //   error: function(err) {
//       //     //Error occured in user registration.
//       //   }
//       // })
//       // Utils.getFingerprint().then(fingerPrint => {
//       //   var x = this.loginDevice(fingerPrint)
//       //   console.log(x)
//       // })
//     }
//     this.CB = CB

//     CloudApi.INSTANCE = this
//   }
//   get logoutUser() {
//     return this.CB.CloudUser.current.logOut({
//       success: function(user) {
//         console.log(user)
//         return user
//         //log out successfull
//       },
//       error: function(err) {
//         return err
//         //Error occured in user registration.
//       }
//     })
//   }
//   async loginDevice(_user) {
//     const secure = await new Promise(resolve => {
//       var user = new this.CB.CloudUser()
//       user.set('username', _user)
//       user.set('password', _user)
//       user.logIn({
//         success: function(user) {
//           console.log('logged in user')
//           // that.setCurrentDevice(user)
//           resolve(user)
//         },
//         error: function(err) {
//           //Error occured in user registration.
//           console.error(err)
//         }
//       })
//     })
//     return secure
//   }
// }
// // const cbApi = new CloudApi()
// export default CloudApi
// // export { CloudApi as default }
// // if (process.env.NODE_ENV == 'production') {
// //   CB.CloudApp.init(
// //     'https://api.ashdevtools.com',
// //     'andrewsDev',
// //     '85520530-5b9c-4f42-9795-08cdf41a3ece'
// //   )
// // } else {
// //info: Secure Key: 6fe406fa-a4bb-4116-b9f7-052e1b80bb0d

// // }

// // super() {}
// // this.cbapi = CB
// // constructor() {
// //   this.cbapi = CB
// //   // if (CloudApi.INSTANCE) {
// //   //   return CloudApi.INSTANCE
// //   // }
// //   // if (CB.CloudUser.current) {
// //   //   console.log(CB.CloudUser.current)
// //   // } else {
// //   //   init()
// //   //   if (!CB.CloudUser.current) {
// //   //     Utils.getFingerprint().then(fingerPrint => {
// //   //       var x = this.loginDevice(fingerPrint)
// //   //       console.log(x)
// //   //     })
// //   //   }
// //   // }
// //   // console.log(this)
// //   // CloudApi.INSTANCE = this
// // }

// // async startListeners(user) {
// //   // if (!this.currentUser) {
// //   console.log(this.currentUser)
// //   await this.loginDevice(user)
// //   // }
// //   if (!this.listening) {
// //     CB.CloudObject.on('Tablet', 'updated', async function(obj) {
// //       console.log('tablet updated ', obj)
// //     })
// //     CB.CloudNotification.on('User', function(data) {
// //       console.log('user updated ', data)
// //     })
// //     this.listening = true
// //     console.log('CB is now listening to updates')
// //   }
// // }
// // pin(obj) {
// //   var o = obj
// //   CB.CloudObject.unPin(obj).then(
// //     function(res) {
// //       CB.CloudObject.pin(o).then(
// //         function(res) {},
// //         function(err) {
// //           console.log(err)
// //         }
// //       )
// //     },
// //     function() {
// //       CB.CloudObject.pin(o).then(
// //         function(res) {
// //           console.log(res)
// //         },
// //         function(err) {
// //           console.log(err)
// //         }
// //       )
// //     }
// //   )
// // }
// // //  bulkPin(arr){
// // //  }
// // async setCurrentDevice(user) {
// //   var that = this
// //   var query = new CB.CloudQuery('Tablet')
// //   query.equalTo('deviceId', user.username) //find all Students who age is 21
// //   query.findOne({
// //     success: function(obj) {
// //       // user.relate('tablet', 'Tablet', obj.id) //relates the teacher in the Teacher table with id xxxxx to this student.
// //       // let arr = []
// //       // arr.push(obj)
// //       // arr.push(user)
// //       that.pin(obj)
// //     },
// //     error: function(err) {
// //       //Error in retrieving the data.
// //       console.error(err)
// //     }
// //   })
// // }
// // async getCurrentDeviceFromLocal() {
// //   var query = new CB.CloudQuery('Tablet')
// //   query.equalTo('deviceId', this.currentUser.document.username)
// //   return new Promise(function(resolve, reject) {
// //     query.findFromLocalStore({
// //       success: function(obj) {
// //         resolve(obj)
// //       },
// //       error: function(err) {
// //         //Error in retrieving the data.
// //         console.error(err)
// //         reject(err)
// //       }
// //     })
// //   })
// // }
// // async getAllEmployees() {
// //   var that = this
// //   var query = new CB.CloudQuery('Employee')
// //   query.paginate(1, 50)
// //   query.exists('employee_id')
// //   return new Promise(function(resolve, reject) {
// //     query.find({
// //       success: function(obj) {
// //         that.pin(obj)
// //         resolve(obj)
// //       },
// //       error: function(err) {
// //         console.error(err)
// //         reject(err)
// //       }
// //     })
// //   })
// // }
// // async getAllDevices() {
// //   var query = new CB.CloudQuery('Tablet')
// //   query.equalTo('active', true)
// //   return new Promise(function(resolve, reject) {
// //     query.find({
// //       success: function(obj) {
// //         resolve(obj)
// //       },
// //       error: function(err) {
// //         console.error(err)
// //         reject(err)
// //       }
// //     })
// //   })
// // }
// // async sync() {
// //   CB.CloudObject.sync().then(
// //     function(res) {
// //       console.log(res)
// //     },
// //     function(err) {
// //       console.log(err)
// //     }
// //   )
// // }
// // async getObject(id, type) {
// //   var query = new CB.CloudQuery(type)
// //   return await query.get(id, {
// //     success: function(obj) {
// //       return obj
// //     },
// //     error: function(err) {
// //       return err
// //     }
// //   })
// // }
// // async deviceAddEmployee(employeeId) {
// //   var device = await this.getCurrentDeviceFromLocal()
// //   device[0].document.employeeList.push(employeeId)
// //   this.pin(device)
// //   console.log(device[0].document.employeeList)
// //   return await device[0].document.employeeList
// // }
// // async deviceRemoveEmployee(employeeId) {
// //   var device = await this.getCurrentDeviceFromLocal()
// //   console.log(device[0].document.employeeList.length)
// //   function remove(array, element) {
// //     return array.filter(el => el !== element)
// //   }
// //   const updatedDevice = remove(device[0].document.employeeList, employeeId)
// //   console.log(updatedDevice)
// //   console.log(device[0].document.employeeList)
// //   device[0].document.employeeList = updatedDevice
// //   this.pin(device)
// //   return await device[0].document.employeeList
// // }
// // // createUser(_user) {
// // //   var user = new CB.CloudUser()
// // //   user.set('username', _user.username)
// // //   user.set('password', 'asdfasdf')
// // //   user.set('email', _user.username + '@sample.com')
// // //   user.signUp({
// // //     success: function(user) {
// // //       console.log('created user ', user)
// // //     },
// // //     error: function(error) {
// // //       //Error in user registration.
// // //       console.log('>>>>>>>>. ERROR')
// // //       console.log(error)
// // //       return error
// // //     }
// // //   })
// // // }
// // export { CloudApi as default }
// /*
// {
//     "_id": "iMHpE4bb",
//     "_tableName": "Employee",
//     "ACL": {
//         "read": {
//             "allow": {
//                 "user": [
//                     "all"
//                 ],
//                 "role": []
//             },
//             "deny": {
//                 "user": [],
//                 "role": []
//             }
//         },
//         "write": {
//             "allow": {
//                 "user": [
//                     "all"
//                 ],
//                 "role": []
//             },
//             "deny": {
//                 "user": [],
//                 "role": []
//             }
//         }
//     },
//     "_type": "custom",
//     "expires": null,
//     "birthday": 0,
//     "birthmonth": 0,
//     "cellphone": "903-530-1197",
//     "currentDevice": null,
//     "currentDeviceOwner": null,
//     "data__work_start_date": {
//         "$date": "2018-05-08T00:00:00.000Z"
//     },
//     "email": "test@groupandrews.com",
//     "firstname": "test",
//     "husername": "testgroupandrews.com",
//     "employee_id": 4041624,
//     "lastactive": {
//         "$date": "1970-01-18T16:19:27.000Z"
//     },
//     "name": "Test test",
//     "password": "Andrews1",
//     "photo_url": "avatars/4041624-5b435a2dee479.jpg",
//     "wage": 12592,
//     "work_start_date": {
//         "$date": "1970-01-18T15:49:49.000Z"
//     },
//     "objectId": "F21E9C26-57A3-8677-FF6A-0270570F1B00",
//     "ownerId": null,
//     "updated": null,
//     "bckls__userTypeId": 1,
//     "bckls__socialId": null,
//     "bckls__displayName": null,
//     "username": "",
//     "createdAt": {
//         "$date": "2018-11-14T15:12:56.765Z"
//     },
//     "updatedAt": {
//         "$date": "2018-11-14T15:12:56.765Z"
//     },
//     "_version": 0
// }
// */

// // export function createCloudApi() {
// //   return new CloudApi()
// // }

// // export function getCloudApi() {
// //   return CloudApi.INSTANCE
// // }
// // export function getCB() {
// //   return CB
// // }
