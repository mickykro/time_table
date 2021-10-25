// DOCS: https://firebase.google.com/docs/firestore/query-data/get-data

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore/lite'

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
const dbCollection = collection(db, 'users')
console.log("🚀 ~ file: db.js ~ line 18 ~ dbCollection", dbCollection)

const getUsers = async () => {
  try {
    const userCollection = collection(db, 'users')
    const snapshot = await getDocs(userCollection)
    const userList = snapshot.docs.map(doc => doc.data())
    console.log("🚀 ~ file: db.js ~ line 25 ~ getUsers ~ userList", userList)
    return userList
  } catch (error) {
    console.log("🚀 ~ file: firebase.mjs ~ line 30 ~ getUsers ~ error", error)
  }
}

const addValue = async (newDoc) => {
  try {
    const resultDoc = await addDoc(collection(db, "users"), newDoc);
    console.log("🚀 ~ file: db.js ~ line 35 ~ addValue ~ newDoc", resultDoc.id)

    const docRef = doc(db, "users", resultDoc.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log("🚀 ~ file: db.js ~ line 36 ~ addValue ~ error", error)
  }
}

// getUsers()
addValue({ name: 'avi-test' })

export default { db, addValue, getUsers }