/** @format */

// import TaggedApi from "../../classes/TaggedApi";
import CloudApi from '../cbAPI'

class DeviceApi extends CloudApi {
  start() {
    return this.startListeners()
  }

  addEmployee(employeeId) {
    return this.deviceAddEmployee(employeeId)
  }
  removeEmployee(employeeId) {
    return this.deviceRemoveEmployee(employeeId)
  }
  index() {
    return this.get('/api/devices')
  }

  update(id, data) {
    return this.put('/api/devices/' + id, data)
  }

  remove(id) {
    return this.delete('/api/devices/' + id)
  }

  create(data) {
    return this.post('/api/devices', data)
  }
}

export { DeviceApi as default }
