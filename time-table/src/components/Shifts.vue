<template>
<div>
    <div v-for="shift in filterById" v-bind:key="shift" class="border border-primary shift">
    <div v-text="getName(shift.id)" class="border border-info"></div>
    <div  v-text="new Date(shift.start).toLocaleDateString('He-IL', {  minute: '2-digit', hour: '2-digit' })+ ' - '+ new Date(shift.end).toLocaleDateString('He-IL', {  minute: '2-digit', hour: '2-digit' })"></div>
    <div  v-text="calculateLength(shift)"> </div>
  </div>
</div>
</template>
<script>
import store from '../store'
import db from '../utils/db'
import functions from '../utils/functions'
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
            return  functions.calculateShiftLength(shift)
        },
        firstShift(){
             return this.currentShifts.length <1
         },
         getName(id){
             return functions.getNameById(id)
         }
    },
    
    computed:{
        filterById(){
           if(this.workerId > 0){
               this.currentShifts = 
                 store.state.globalShifts.filter(
                    shift => {
                       return shift.id == this.workerId })
                       return this.currentShifts
           }
            this.currentShifts =  store.state.globalShifts
           return  store.state.globalShifts
         }, 
    }
}
</script>
<style >
.shift{
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 3px;
}
</style>