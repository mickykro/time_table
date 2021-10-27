<template>
<div>
    <div v-for="shift in shifts" v-bind:key="shift">
    <div  v-text=" new Date(shift.start)"></div>
    <div  v-text="calculateLength(shift)"> </div>
  </div>
</div>
</template>
<script>
import store from '../store'
import db from '../utils/db'
export default {
    data(){
        return {
            shifts: store.state.globalShifts
        }
    },
   async created() {
        db.getShifts().then(shifts => {
        store.state.globalShifts = shifts
      })
    },
    methods: {
         calculateLength: (shift)=>{
      return `${Math.floor((shift.end - shift.start)/1000/60/60)}.${Math.floor((shift.end - shift.start)/1000/60)}`
    },
    }
}
</script>