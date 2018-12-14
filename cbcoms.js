/** @format */

// import * as CB from 'cloudboost'
var CB = require('cloudboost')
CB.CloudApp.init(
  'http://localhost:4730',
  'andrewsDev',
  '85520530-5b9c-4f42-9795-08cdf41a3ece'
)
CB.CloudApp.connect({
  success: function() {
    console.log('Hurray! I am feeling connected.')
  },
  error: function(error) {
    console.log('Shit! not connected.', error)
  }
})

var arg = process.argv.slice(2)
console.log(arg[1])
if (CB.CloudApp.isConnected) {
  console.log('Hurray! I am feeling connected.')
} else {
  console.log('Shit! not connected.')
}
function createTabletTable(user) {
  var table = new CB.CloudTable('Tablet')
  var column = new CB.Column('employeeList', 'List')
  table.addColumn(column)
  var column = new CB.Column('user', 'User')
  table.addColumn(column)

  table.save().then(
    function(obj) {
      var obj = new CB.CloudObject('Tablet')
      obj.set('deviceId', 'browser')
      obj.set('employeeList', [])
      obj.save({
        success: function(obj) {
          console.log(obj) //a new id is automatically generated.
          obj.relate('user', 'User', user.id) //relates the teacher in the Teacher table with id xxxxx to this student.
        },
        error: function(error) {
          //object failed to save.
          console.error(obj)
        }
      })
      console.log(obj)
    },
    function(err) {
      console.log(err)
    }
  )
}
switch (arg[0]) {
  case 'setUp':
    var obj = new CB.CloudObject('Employee')
    obj.set('name', 'asdf')
    // obj.set('humanityUsername', 'ttest')
    obj.set('humanityId', '1444044')
    obj.save({
      success: function(obj) {
        console.log(obj.id) //a new id is automatically generated.
      },
      error: function(error) {
        //object failed to save.
      }
    })
    var user = new CB.CloudUser()
    user.set('name', 'browser')
    user.set('password', 'asdfasdf')
    user.set('email', 'browser@sample.com')
    user.signUp({
      success: function(user) {
        createTabletTable(user.id)
      },
      error: function(error) {
        //Error in user registration.
        console.log('>>>>>>>>. ERROR')
        console.log(error)
        return error
      }
    })

    break
  case 'addColumn':
    var table = new CB.CloudTable('Tablet')
    var column = new CB.Column('employeeList', 'List')
    table.addColumn(column)
    table.save().then(
      function(obj) {
        //new table object with new column
        console.log(obj)
      },
      function(err) {
        console.log(err)
      }
    )
    break
  case 'createTablet':
    var obj = new CB.CloudObject('Tablet')
    obj.set('deviceId', 'browser2')
    obj.set('userList', [])
    obj.save({
      success: function(obj) {
        console.log(obj) //a new id is automatically generated.
      },
      error: function(error) {
        //object failed to save.
        console.error(obj)
      }
    })
    break
  case 'createEmployee':
    var obj = new CB.CloudObject('Employee')
    obj.set('name', 'asdf')
    // obj.set('humanityUsername', 'ttest')
    obj.set('humanityId', '1444044')
    obj.save({
      success: function(obj) {
        console.log(obj.id) //a new id is automatically generated.
      },
      error: function(error) {
        //object failed to save.
      }
    })
    break
  case 'createUser':
    var user = new CB.CloudUser()
    user.set('name', arg[1])
    user.set('password', 'asdfasdf')
    user.set('email', arg[1] + '@sample.com')
    user.signUp({
      success: function(user) {
        console.log('created user ', user)
      },
      error: function(error) {
        //Error in user registration.
        console.log('>>>>>>>>. ERROR')
        console.log(error)
        return error
      }
    })
    break
  case 'createTable':
    var table = new CB.CloudTable(arg[1])
    var column = new CB.Column('name', 'Text')
    table.addColumn(column)
    table.save({
      success: function(table) {
        console.log(table)
      },
      error: function(error) {
        console.log(error)
      }
    })

    break
  case 'repeat':
    ;(function myLoop(i) {
      setTimeout(function() {
        var obj = new CB.CloudObject('Temp')
        obj.set('Name', i)
        obj.save({
          success: function(obj) {
            console.log(obj.id) //a new id is automatically generated.
          },
          error: function(error) {
            console.log(error) //a new id is automatically generated.
          }
        })
        //  your code here
        if (--i) myLoop(i) //  decrement i and call myLoop again if i > 0
      }, 2000)
    })(10)

    // expected output: "Mangoes and papayas are $2.79 a pound."
    break
  default:
    console.log('Sorry, we are out of ' + arg + '.')
}
console.log('done')
