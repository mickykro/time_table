<template >
  <div class="background">
    <h1 :style="{textShadow: ' 1px 1px 1px #000000'}" class="font-weight-bolder" >Time Table</h1>

    <button :disabled="isDisabled" @click="enterExit(id)" class="border border-primary rounded-circle shadow-lg p-3 mb-5 bg-white enter">
       <div>
         <h2 v-text="isDisabled ? 'enter id' : 'press to enter or exit'"></h2>
          <input 
          class= 'border '
          placeholder="enter id"
      type="number"
      v-model="id"
      @keypress="hideError($event)"
    /></div>
    </button>
     <h3 v-if="IDerror" class="error">
        id is too short     
      </h3>
          <div>
       <teleport to="body"> <div :class="userInShift ? 'modal entered': 'modal exited'" v-if="openDialog" > <p v-text="userInShift ? `started working at ${new Date(Date.now()).toLocaleDateString('He-IL', {  minute: '2-digit', hour: '2-digit' })}`: 
       `finished working at ${new Date(Date.now()).toLocaleDateString('He-IL', {  minute: '2-digit', hour: '2-digit' })}`"></p>
       <button @click="openDialog = !openDialog">close</button>
       </div></teleport>
      <input type="text" v-if="isNewUser" v-model="name" placeholder="enter name" />
      <button v-if="isNewUser" @click="newUser(id, name)">addUser</button>
      <div v-if="addError">
        please create a new user before entering the shift
      </div>
    </div>
    <div class="home" ></div> 
  </div>
  
</template>

<script>
import db from "../utils/db";
import functions from "../utils/functions";
export default {
  name: "Home",
  methods: {
    enterExit: async function (id) {
      if (id / 10000000 < 1) {
        this.IDerror = true;
        return;
      }
      if (functions.idExists(id)) {
        db.enterOrExit(id).then(({shift, enter}) => {
          this.userInShift = enter;
          this.openDialog = true;
        });
      } else {
        this.isNewUser = true;
      }
      if (!this.wasUserCreated && this.isNewUser) {
        this.addError = true;
        return;
      }
    },
    newUser: function (id, name) {
      if (id / 10000000 < 1) {
        this.IDerror = true;
        return;
      }
      db.createNewUser(id, name).then((res) => {
        this.wasUserCreated = true;
        this.addError = false;
        this.IDerror = false;
      });
    },
    userExists: async function (id) {
      this.isNewUser = !functions.idExists(id);
    },
    hideError: function (event) {
      if (/^[0-9]+$/.test(event.key)) {
        this.isDisabled = false;
        this.IDerror = false;
      }
    },
  },
  data() {
    return {
      id: 0,
      name: "",
      isDisabled: true,
      IDerror: false,
      addError: false,
      isNewUser: false,
      wasUserCreated: false,
      userInShift: false,
      openDialog: false
    };
  },
};
</script>
<style >
.home {
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background-image: "url(https://img.freepik.com/free-vector/illustration-new-year-decoration_53876-37431.jpg?size=626&ext=jpg)";
}
.enter {
  height: 250px;
  width: 250px;
}
.error {
  background-color: tomato;
  color: white;
  width: 50%;
  text-align: center;
  align-content: center;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
.modal{
  position: absolute;
  width: 25%;
  margin-left: 25%;
  margin-top:25%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
}
.entered{
    background-color: green;
}
.exited{
      background-color: red;

}

</style>
