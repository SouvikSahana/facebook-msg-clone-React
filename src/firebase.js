import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "my-projects-2525.firebaseapp.com",
  databaseURL: "https://my-projects-2525-default-rtdb.firebaseio.com",
  projectId: "my-projects-2525",
  storageBucket: "my-projects-2525.appspot.com",
  messagingSenderId: "951108535534",
  appId:process.env.APP_ID ,
  measurementId: "G-79V54QZBM6"
};

  const firebaseApp=firebase.initializeApp(firebaseConfig)

const db=firebaseApp.firestore()

export {db};