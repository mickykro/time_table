
<template>
<div>
  <div id="nav">
            <router-link to="/" class="nav-item nav-link">Home</router-link>
            <router-link to="/Admin" class=" nav-item nav-link" >Admin</router-link>
  
 </div>
 <router-view :key="$route.path"/>
</div>
 
</template>


<script>
import "bootstrap/dist/css/bootstrap.min.css";
import db from './utils/db'
export default {
  mounted: ()=>{
      db.getUsers()
      db.getShifts()
    }
  }

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #55799e;
  background-color: transparent;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
#nav {
  padding: 30px;
  margin-left: 25%;
  margin-right: 25%;
}
a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  #nav a.router-link-exact-active {
  color: whitesmoke;
  background: blue;
  border-radius: .5rem;
}

</style>
