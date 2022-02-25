import firebase from "firebase/compat/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_Vi2OAo7BPsDLPt_JA-jMj5In-XMZpc0",
  authDomain: "given-b6d8f.firebaseapp.com",
  projectId: "given-b6d8f",
  storageBucket: "given-b6d8f.appspot.com",
  messagingSenderId: "768901697904",
  databaseURL:"https://given-b6d8f-default-rtdb.europe-west1.firebasedatabase.app/",
  appId: "1:768901697904:web:f7a618413338910e8d7fb5"
};
  const db = firebase.initializeApp(firebaseConfig);

export default db;