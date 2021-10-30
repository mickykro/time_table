import store from '../store'
const idExists = (id)=>{
    let exists = false
    store.state.users.forEach(user=>{
        if(id == user.id) exists = true
    })
    return exists 
}

const isUserOnShift = (id) =>{
    let exists = false;
    if(idExists){
        store.state.globalShifts.forEach(shift=>{
            if(shift.id == id) exists = true
        })
        return exists

    }
}
const calculateShiftLength = (shift)=>{
    
    return `shift legnth:  ${Math.floor((shift.end - shift.start)/1000/60/60)}.${Math.floor((shift.end - shift.start)/1000/60%60%10)}`
}
const getNameById = (id)=>{
    let name = ''
    store.state.users.forEach(user=>{
      if(user.id == id){
        name = user.name
      }
    })
    return name
  }

export default { idExists, isUserOnShift, calculateShiftLength, getNameById}