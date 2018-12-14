<!-- @format -->

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',

  components: {},
  mounted() {
    const options = {
      client_id: '0cbaa9173943569cad4c0b8267981147bac0cf5d',
      client_secret: 'be6a34d0830ab6fb3db837958d50faace249e0d1',
      grant_type: 'password',
      username: 'ash@andrewscarpetcleaning.com',
      password: 'sugarlips42'
    }

    axios
      .post('/token', options)
      .then(response => {
        console.log('1')
        console.log(response.data.access_token)
      })
      .catch(err => {
        console.log('2')
        console.log(err)
      })
  }
}
</script>

<style lang="scss">
@import './assets/styles/style.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
