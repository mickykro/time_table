import {initializeApp} from 'firebase/app'
import {getFirestore , collection,  addDoc} from 'firebase/firestore/lite'

const firebaseConfig = {
    apiKey: "AIzaSyAitY9e9Irqjo_M4hNHKODjBZJhlPdRUAo",
    authDomain: "time-table-22bb7.firebaseapp.com",
    projectId: "time-table-22bb7",
    storageBucket: "time-table-22bb7.appspot.com",
    messagingSenderId: "692016464751",
    appId: "1:692016464751:web:ecafd402db55016932de9a",
    measurementId: "G-CPSHSC7JHR"
  };


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const dbCollection  = collection(db, 'users')

const addValue = async(data) =>{
   return addDoc(data).then(()=>{
        console.log('uploaded to firebase')
    })
}

export default { db, addValue} 