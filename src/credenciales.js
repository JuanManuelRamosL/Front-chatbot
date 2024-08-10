// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtNEFr0mG3lOIUnPDy8ono07sqSu1PRIE",
  authDomain: "codeforge-ae62e.firebaseapp.com",
  projectId: "codeforge-ae62e",
  storageBucket: "codeforge-ae62e.appspot.com",
  messagingSenderId: "402467981822",
  appId: "1:402467981822:web:02e836e9fd85de93e318af",
  measurementId: "G-LKF73TDBX4"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase)
