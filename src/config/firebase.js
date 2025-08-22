import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjMqI6dnoxGHddf_7DURYZzOpYCSkwZb8",
  authDomain: "dsa-platform-7078f.firebaseapp.com",
  projectId: "dsa-platform-7078f",
  storageBucket: "dsa-platform-7078f.firebasestorage.app",
  messagingSenderId: "588582683238",
  appId: "1:588582683238:web:465af6b2847d06c7ed23a7"
};

const app= initializeApp(firebaseConfig);

export const auth = getAuth(app); //AUTHENTICATION
export const db = getFirestore(app); // Database
