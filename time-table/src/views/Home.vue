<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="testDB()">testDB</button>
  </div>
</template>

<script>
// @ is an alias to /src
import addValue from '../utils/db'
export default {
  name: 'Home',
  methods:{
    testDB(){ addValue({name: 'micky'}) }
  }
}
</script>
