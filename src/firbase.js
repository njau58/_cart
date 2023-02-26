import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "clone-5c3dc.firebaseapp.com",
  projectId: "clone-5c3dc",
  storageBucket: "clone-5c3dc.appspot.com",
  messagingSenderId: "245173482247",
  appId: "1:245173482247:web:1ea070b20e122c691b0ba2",
  measurementId: "G-RHJCGMCB71"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
