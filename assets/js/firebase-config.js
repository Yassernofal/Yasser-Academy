// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFuAjSYHumAxJ_98AbYxFI8N9dSd27xL8",
  authDomain: "yasser-nofal-english-academy.firebaseapp.com",
  databaseURL: "https://yasser-nofal-english-academy-default-rtdb.firebaseio.com",
  projectId: "yasser-nofal-english-academy",
  storageBucket: "yasser-nofal-english-academy.firebasestorage.app",
  messagingSenderId: "654488740819",
  appId: "1:654488740819:web:7a513cb6c2a74d98324526"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const database = getDatabase(app);