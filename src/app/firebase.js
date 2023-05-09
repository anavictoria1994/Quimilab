// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCX6hZaH2vP1e55WSYYaWBxOf9naL8o70",
  authDomain: "quimilab-f5900.firebaseapp.com",
  projectId: "quimilab-f5900",
  storageBucket: "quimilab-f5900.appspot.com",
  messagingSenderId: "226798236270",
  appId: "1:226798236270:web:42a97dffc1d6487ffb2c7f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
