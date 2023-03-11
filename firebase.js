// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCG_ei2HLdvUwRP8iuSjjnaGnGYpI_bbJ4",
  authDomain: "react-e92c5.firebaseapp.com",
  projectId: "react-e92c5",
  storageBucket: "react-e92c5.appspot.com",
  messagingSenderId: "200992844236",
  appId: "1:200992844236:web:27042a337babfa41db9569",
  measurementId: "G-6P32GGPX8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth =getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);