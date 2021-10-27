<template>
  <div class="Admin">
    <h1>these are the shifts</h1>
    <select v-model="chosenWorker" name="worker" id="worker" v-if="workers" @change="getUserShifts()">
        <option selected=worker.id v-for="worker in workers" v-bind:key="worker.id" v-text="worker.id" ></option>
    </select>
  <Shifts/>
  </div>
</template>
<script>
import db from '../utils/db' 
import store from '../store'
import Shifts from '../components/Shifts.vue'
export default {
  components:{
    Shifts
  },
  name: 'Admin',
  data(){
    return {
      workers: [], 
      chosenWorker: 0
    }
  },
  methods: {
    calculateLength: (shift)=>{
      return `${Math.floor((shift.end - shift.start)/1000/60/60)}.${Math.floor((shift.end - shift.start)/1000/60)}`
    },
    getUserShifts: ()=>{
      this.shifts = shifts.filter(shift=> (shift.id === chosenWorker))
      console.log(this.shifts)
    }
  },
  mounted:  function(){
      db.getUsers().then(users=> {
        console.log('users Admin 33 : ', users)
        this.workers = users
      }
      )
      
    
  }
}
</script>
