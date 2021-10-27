<template>
  <div class="home">
   <h1>Time Table</h1>
   <input type="number" v-model="id" @change="userExists(id)" @keypress="hideError()"/>
    <button @click="enterExit(id)">enter/exit</button>
    <div v-if="IDerror">id is too short</div>
  <div>
    <input type="text" v-if="isNewUser" v-model="name">
    <button v-if="isNewUser" @click="newUser(id, name)">addUser</button>
    <div v-if="addError">please create a new user before entering the shift</div>
  </div>
  </div>
</template>

<script>
import db from '../utils/db'
export default {
  name: 'Home',
  methods:{
    enterExit: async function(id){
      this.isNewUser =await db.idExists(id)
      if(!this.wasUserCreated && this.isNewUser){ 
        this.addError = true
        return }
       
      db.enterOrExit(id)
    },
    newUser: function(id, name){
      
      if(id/10000000 < 1) {
        this.IDerror = true
        return
      }
      db.createNewUser(id, name)
      this.wasUserCreated =true
      this.addError = false
      this.IDerror = false
    },
    userExists:  async function(id){
      console.log(this.isNewUser)
      this.isNewUser = !await db.idExists(id)
    },
    hideError: function(){
      this.error = false
    }

    
  },
  data() {
    return {
      id: 0, 
      name: '',
      IDerror: false,
      addError: false,
      isNewUser: false,
      wasUserCreated: false
      }
  }
}
</script>
