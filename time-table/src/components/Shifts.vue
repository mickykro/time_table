<template>
<div>
    <div v-for="shift in filterById" v-bind:key="shift">
    <div v-text="shift.id"></div>
    <div  v-text=" new Date(shift.start)"></div>
    <div  v-text="calculateLength(shift)"> </div>
  </div>
</div>
</template>
<script>
import store from '../store'
import db from '../utils/db'
export default {
    props: {
        workerId: 0
    },
    data(){
        return {
            shifts: store.state.globalShifts,
            currentShifts: []
        }
    },
   async created() {
        db.getShifts().then(Allshifts => {
            this.shifts = Allshifts
        store.state.globalShifts = Allshifts
      })
    },
    methods: {
         calculateLength: (shift)=>{
            return `${Math.floor((shift.end - shift.start)/1000/60/60)}.${Math.floor((shift.end - shift.start)/1000/60)}`
        },
        firstShift(){
             return this.currentShifts.length <1
         }
    },
    computed:{
        filterById(){
           if(this.workerId > 0){
               this.currentShifts = 
                 store.state.globalShifts.filter(
                    shift => {
                       return shift.id == this.workerId})
                       return this.currentShifts
           }
            this.currentShifts =  store.state.globalShifts
           return  store.state.globalShifts
         }, 
    }
}
</script>