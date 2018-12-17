/** @format */
import * as CB from 'cloudboost'
import Utils from './utils'
import bus from './bus-event'
import Cookies from 'js-cookie'
const loginDevice = async function(_user) {
  return new Promise((resolve, reject) => {
    var user = new CB.CloudUser()
    user.set('username', _user)
    user.set('password', _user)
    user.logIn({
      success: function(user) {
        console.log('logged in user')
        // that.setCurrentDevice(user)
        // return user
        resolve(user)
      },
      error: function(err) {
        // return err
        resolve(err.message)

        // if (err.message == 'Request failed with status code 401') {
        //   return '401'
        // }
      }
    })
  })
  // return user
}

const CBPlugin = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  async install(Vue, options) {
    CB.CloudApp.init(
      // 'https://localhost:8443',
      'https://api.ashdevtools.com',
      'andrewsDev',
      'c4ecdb3f-b741-4824-9393-2bbc0ab3b47b'
    )

    var fp = await Utils.getFingerprint()
    var login = await loginDevice(fp)
    if (login == 'Request failed with status code 401') {
      var user = new CB.CloudUser()
      user.set('username', fp)
      user.set('password', fp)
      user.set('email', fp + '@groupandrews.com')
      user.signUp({
        success: function(user) {
          CB.CloudPush._addDevice('android', fp, fp, 'xyxy', 'auth_key', {
            success: function() {
              //Success
            },
            error: function(error) {
              //Error
            }
          })
          var query = new CB.CloudQuery('Device')
          query.containedIn('channels', 'hackers')
          CB.CloudPush.enableWebNotifications({
            success: function() {},
            error: function(error) {}
          })
          // var obj = new CB.CloudObject('Devices')
          // obj.set('name', 'Smith')
          // obj.save({
          //   success: function(obj) {
          //     //Saving successfull
          //     //obj is instance of CloudObject
          //   },
          //   error: function(err) {
          //     //Error occured in saving the object
          //   }
          // })
        },
        error: function(err) {
          //Error in user registration.
        }
      })
      // Cookies.set('isLogin', 'badDevice')
      // bus.emit('system-ready')
      // console.log('bad device login')
    }
    Vue.prototype.$CB = CB

    // We call Vue.mixin() here to inject functionality into all components.
    // Vue.mixin({
    //   // Anything added to a mixin will be injected into all components.
    //   // In this case, the mounted() method runs when the component is added to the DOM.
    //   mounted() {
    //     console.log('Mounted!')
    //   }
    // })
  }
}

export default CBPlugin
