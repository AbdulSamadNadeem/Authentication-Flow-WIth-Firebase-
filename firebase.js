import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore ,collection, addDoc ,getDocs , doc, deleteDoc , getDoc   } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getAuth ,createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged , signOut ,sendPasswordResetEmail  , } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCIE_JWlN1lG9AbODBzCuL3a2ZK8txM5Yo",
  authDomain: "quiz-app-8e7e4.firebaseapp.com",
  projectId: "quiz-app-8e7e4",
  storageBucket: "quiz-app-8e7e4.appspot.com",
  messagingSenderId: "492025116076",
  appId: "1:492025116076:web:eb2976eb4b6ebec93bf609",
  measurementId: "G-E7142KM05H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export{db, auth , createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged , signOut ,collection, addDoc , getDocs ,sendPasswordResetEmail , doc, deleteDoc ,getDoc } 