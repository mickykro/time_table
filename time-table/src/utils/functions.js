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

export default { idExists, isUserOnShift}