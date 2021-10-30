// DOCS: https://firebase.google.com/docs/firestore/query-data/get-data

import { initializeApp } from 'firebase/app'
import {useToast} from 'primevue/usetoast'
import store from '../store'

import { getFirestore, collection, addDoc, getDocs, doc, getDoc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore/lite'
import functions from './functions';

const firebaseConfig = {
  apiKey: "AIzaSyAitY9e9Irqjo_M4hNHKODjBZJhlPdRUAo",
  authDomain: "time-table-22bb7.firebaseapp.com",
  projectId: "time-table-22bb7",
  storageBucket: "time-table-22bb7.appspot.com",
  messagingSenderId: "692016464751",
  appId: "1:692016464751:web:ecafd402db55016932de9a",
  measurementId: "G-CPSHSC7JHR"
};
//initialization
const app = initializeApp(firebaseConfig)
//constants
const db = getFirestore(app)
const workersCollection = collection(db, 'users')
const shiftsCollection = collection(db, 'shifts')
const endedShiftsCollection = collection(db, 'ended-shifts')


//getters
const getUsers = async () => {
  try {
    const snapshot = await getDocs(workersCollection)
    const userList = snapshot.docs.map(doc => doc.data())
    store.state.users = userList
  } catch (error) {
    console.log("🚀 ~ file: db.js ~ line 33 ~ getUsers ~ error", error)
  }
}
const getShifts = async () => {
  
  let shiftsMap = (await getDocs(query(endedShiftsCollection,orderBy('start','desc')))).docs
  let shiftsArray = []
  shiftsMap = shiftsMap.map(doc => {
    shiftsArray.push(doc.data())
  })
  store.state.globalShifts = shiftsArray
  return shiftsArray
}

const getEntity = async (collection, id) => {
  let userDoc
  let docId
  const docs = await getDocs(collection)

  docs.docs.map(doc => {
    if (doc.data().id === id) {
      userDoc = doc.data()
      docId = doc.id
    }
  })
  return { userDoc, docId }
}


const isUserOnShift = async (id) => {
  const shift = await getEntity(collection(db, 'shifts'), id)
  return shift
}

const enterOrExit = async (id) => {
  const userOnShift = await isUserOnShift(id)
  if (userOnShift.docId) {
   return {shift: endShift(id), enter:true}
    // .then(shift=> useToast().add({severity: 'info', summary: 'worker ended the shift', detail: `worked for ${functions.calculateShiftLength(shift)}`}))
  }
  else {
    return {shift: entered(id), enter: false}
    // .then(shift=> useToast().add({severity: 'info', summary: 'worker entered the shift', detail: `started at ${new Date(shift.start).toLocaleString('He-IL', { month: 'long', day: '2-digit', minute: '2-digit', hour: '2-digit' })}`}))
  }
}

//shift actions
const endShift = async (id) => {
  let shiftEntity = await getEntity(shiftsCollection, id)
  let shift = shiftEntity.userDoc
  shift['end'] = Date.now()

  if (shiftEntity) {
    addDoc(endedShiftsCollection, shift)
    deleteDoc(doc(shiftsCollection, shiftEntity.docId))
  }
  return shift
}
const entered = async (id) => {
  try {
    const shift = { id, start: Date.now(), onClock: true }
    await addDoc(collection(db, 'shifts'), shift);
    return shift
  } catch (error) {
    console.log("🚀 ~ file: db.js ~ line 36 ~ addValue ~ error", error)
  }
}
const createNewUser = async (id, name) => {
  try {
    const data = { id, name }
    const createdDoc = await addDoc(workersCollection, data)
    getUsers()
  } catch (error) {
    console.log("🚀 ~ file: db.js ~ line 92 ~ createNewUser ~ error", error)
  }
}

export default { db, entered, createNewUser, getUsers, endShift, enterOrExit, getShifts }