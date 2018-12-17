/** @format */

// import TaggedApi from "../../classes/TaggedApi";
import CloudApi from '../cbAPI'
import * as humanity from '../humanity'

class CloudAPI extends CloudApi {
  /** AUTH API **/

  // data = {access_token}
  //   loginWithProvider(provider, data) {
  //     return this.post("/api/social/login/" + provider, data);
  //   }

  // updateWithProvider(provider, data) {
  //   return this.put('/api/social/update/' + provider, data)
  // }

  // matchFriendsWithProvider(provider, data) {
  //   return this.post('/api/social/friends/' + provider, data)
  // }

  /**
   * User login
   * @param {Object} creds {
   *    @param {String} email
   *    @param {String} password
   *    @param {String} device_id
   *    @param {String} device_type
   *    @param {Integer} app_version
   *  }
   * @return {} token
   */

  checkAuth() {
    return this.getCurrentDeviceFromLocal()
  }
  // login(creds) {
  //   var user = new CB.CloudUser()
  //   user.set('username', 'my_username')
  //   user.set('password', 'my_solid_password')
  //   user.logIn({
  //     success: function(user) {
  //       // Login successfull
  //     },
  //     error: function(error) {
  //       // Error.
  //     }
  //   })
  //   return this.post('/api/login', creds)
  // }
  // getClockStatusOf1444044() {
  //   return humanity.getClockStatusOf1444044()
  // }
  // clockIn(humanityId) {
  //   console.log(humanityId)
  //   return humanity.clockInUser(humanityId)
  // }
  // clockOut(humanityId) {
  //   console.log(humanityId)
  //   return humanity.clockOutUser(humanityId)
  // }
  // /**
  //  * User logout.
  //  * @return {}
  //  */
  // logout() {
  //   return this.post('/api//logout')
  // }

  // /**
  //  * Retoken.
  //  * @param {Object} data {
  //  *    @param {Integer} app_version
  //  *  }
  //  * @return {} token
  //  */
  // retoken(data) {
  //   return this.post('/api/retoken', data)
  // }

  // /**
  //  * Activate.
  //  * @param {Object} data {
  //  *    @param {String} device_id
  //  *    @param {String} device_type
  //  *    @param {Integer} app_version
  //  *  }
  //  * @param {String} activationToken
  //  * @return {} token
  //  */
  // activate(activationToken, data) {
  //   return this.post('/api/activate/' + activationToken, data)
  // }

  // /**
  //  * Reset password by email.
  //  * @param {Object} data {
  //  *    @param {String} email
  //  *  }
  //  * @return {}
  //  */
  // resetPassword(data) {
  //   return this.post('/api/reset-password', data)
  // }

  // /**
  //  * Change password by email.
  //  * @param {Object} data {
  //  *    @param {String} password
  //  *    @param {String} password_confirmation
  //  *  }
  //  * @return {}
  //  */
  // changePassword(token, data) {
  //   return this.post('/api/change-password/' + token, data)
  // }
}

export { CloudAPI as default }
