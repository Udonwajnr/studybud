import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "chatapp-e57c7.firebaseapp.com",
  projectId: "chatapp-e57c7",
  storageBucket: "chatapp-e57c7.appspot.com",
  messagingSenderId: "848249975015",
  appId: "1:848249975015:web:591207dc83c977dd0af242",
  measurementId: "G-4MC5CZVT8M"
};

// console.log(process.env.REACT_APP_FIREBASE_KEY)


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
