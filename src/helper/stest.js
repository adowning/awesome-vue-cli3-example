/**
 * ·@format·
 *
 * @format
 */

let singletonInstance = null

class Singleton {
  constructor() {
    // Check if the instance exists or is null
    if (!singletonInstance) {
      // If null, set singletonInstance to this Class
      singletonInstance = this
      console.log('singleton instance created')
    } else {
      console.log('you are referencing the existing singleton class')
    }
    // Returns the initiated Class
    return singletonInstance
  }

  speak() {
    console.log('hello')
  }
}
