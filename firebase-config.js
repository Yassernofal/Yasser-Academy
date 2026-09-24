// ===== firebase-config.js =====
// الإعدادات المركزية لـ Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAFuAjSYHumAxJ_98AbYxFI8N9dSd27xL8",
  authDomain: "yasser-nofal-english-academy.firebaseapp.com",
  databaseURL: "https://yasser-nofal-english-academy-default-rtdb.firebaseio.com",
  projectId: "yasser-nofal-english-academy",
  storageBucket: "yasser-nofal-english-academy.firebasestorage.app",
  messagingSenderId: "654488740819",
  appId: "1:654488740819:web:7a513cb6c2a74d98324526"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

console.log('✅ Firebase initialized');