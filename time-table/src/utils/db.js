// DOCS: https://firebase.google.com/docs/firestore/query-data/get-data

import { initializeApp } from 'firebase/app'
import store from '../store'

import { getFirestore, collection, addDoc, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore/lite'

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
  let shiftsMap = (await getDocs(endedShiftsCollection)).docs
  let shiftsArray = []
  shiftsMap = shiftsMap.map(doc => {
    console.log(`${doc.data().id}: started at: ${new Date(doc.data().start).toLocaleDateString('He-IL', { month: 'long', day: '2-digit', minute: '2-digit', hour: '2-digit' })} - ended : ${doc.data().end}`)
    shiftsArray.push(doc.data())
  })
  console.log(shiftsArray)
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
  console.log('is the user on shift', shift)
  return shift
}

const enterOrExit = async (id) => {
  const userOnShift = await isUserOnShift(id)
  if (userOnShift.docId) {
    endShift(id)
  }
  else {
    entered(id)
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
}
const entered = async (id) => {
  try {
    await addDoc(collection(db, 'shifts'), { id, start: Date.now(), onClock: true });
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