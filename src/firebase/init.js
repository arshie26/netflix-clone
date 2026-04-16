// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

//Lets us use Firebase authentication APIs
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSPA2G83t2HwXu7hOHbBFhdS5d_XKq0OQ",
  authDomain: "netflix-clone-4008d.firebaseapp.com",
  projectId: "netflix-clone-4008d",
  storageBucket: "netflix-clone-4008d.firebasestorage.app",
  messagingSenderId: "693538855226",
  appId: "1:693538855226:web:d6a28cd748de8d29a3d803"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Gets authentication and database and 
//exports so it can be used in file
export const auth = getAuth();
export const db = getFirestore(app, "netflix");