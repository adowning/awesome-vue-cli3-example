<!-- @format -->

<template>
  <v-app id="app">
    <v-expansion-panel v-if="this.$devmode">
      <v-expansion-panel-content>
        <div slot="header">developer shit</div>
        <v-card>
          <v-btn block color="primary" @click="reload">reload</v-btn>
          <v-btn block @click="addEmp">addEmp</v-btn>
          <v-btn block @click="removeEmp">removeEmp</v-btn>
          <v-btn block @click="getClockStatusOf1444044">getClockStatusOf1444044</v-btn>
          <v-btn block @click="createUser">createUser</v-btn>
          <v-btn block @click="createTabletTable">createTabletTable</v-btn>
          <v-btn block @click="addTablet">addTablet</v-btn>
          <v-btn block @click="relateTabletUser">relateTabletUser</v-btn>
          <!-- <v-btn block @click="createEmployee">createEmployee</v-btn> -->
          <v-btn block @click="gotoProfile">gotoProfile</v-btn>
          <v-btn block @click="gotoProfile">gotoProfile</v-btn>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <router-view></router-view>
  </v-app>
</template>
<script>
import * as CB from 'cloudboost'
import store from './store'
export default {
  name: 'app',
  mounted() {
    console.log(store.getters['auth/checkLogin'])
  },
  methods: {
    gotoProfile() {
      this.$router.push({ path: '/profile:iMHpE4bb' })
    },
    reload() {
      location.reload()
    },
    getClockStatusOf1444044() {
      this.$store.dispatch('auth/getClockStatusOf1444044')
    },
    addEmp() {
      var employeeId = 'Z3o1zDDS'
      this.store.dispatch('device/addEmployee', employeeId)
    },
    removeEmp() {
      var employeeId = 'Z3o1zDDS'
      this.store.dispatch('device/removeEmployee', employeeId)
    },
    createUser() {
      var user = new CB.CloudUser()
      user.set('username', 'browser2')
      user.set('password', 'asdfasdf')
      user.set('email', 'browser@sample.com')
      user.signUp({
        success: function(user) {
          console.log(user)
        },
        error: function(error) {
          //Error in user registration.
          console.error(error)
          return error
        }
      })
    },
    createTable() {
      var user = new CB.CloudUser()
      user.set('username', 'browser2')
      user.set('password', 'asdfasdf')
      user.set('email', 'browser@sample.com')
      user.signUp({
        success: function(user) {
          console.log(user)
        },
        error: function(error) {
          //Error in user registration.
          console.error(error)
          return error
        }
      })
    },
    relateTabletUser() {
      var query = new CB.CloudQuery('User')
      query.equalTo('username', 'browser') //find all Students who age is 21
      query.findOne({
        success: function(obj) {
          obj.relate('tablet', 'Tablet', 'sFaZ4VqR')
          console.log(obj)
        },
        error: function(err) {
          //Error in retrieving the data.
          console.error(err)
        }
      })
    },
    addTablet() {
      var obj = new CB.CloudObject('Tablet')
      obj.set('deviceId', 'browser')
      obj.set('employeeList', [])
      obj.save({
        success: function(obj) {
          console.log(obj) //a new id is automatically generated.
          obj.relate('user', 'User', 'Q5PLv7Aj') //relates the teacher in the Teacher table with id xxxxx to this student.
        },
        error: function(error) {
          //object failed to save.
          console.error(error)
        }
      })
    },
    createTabletTable() {
      console.log('1')

      var table = new CB.CloudTable('Tablet')
      // var column = new CB.Column('employeeList', 'List')
      // table.addColumn(column)

      // var column = new CB.Column('user', 'User')
      // table.addColumn(column)
      console.log('1')
      table.save().then(
        function(objx) {
          console.log(objx)
          // var obj = new CB.CloudObject('Tablet')
          // obj.set('deviceId', 'browser')
          // obj.set('employeeList', [])
          // obj.save({
          //   success: function(obj) {
          //     console.log(obj) //a new id is automatically generated.
          //     obj.relate('user', 'User', 'Q5PLv7Aj') //relates the teacher in the Teacher table with id xxxxx to this student.
          //   },
          //   error: function(error) {
          //     //object failed to save.
          //     console.error(obj)
          //   }
          // })
          // console.log(obj)
        },
        function(err) {
          console.log(err)
        }
      )
    }
  }
}
</script>
<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
