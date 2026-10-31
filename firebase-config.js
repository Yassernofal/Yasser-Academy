// ==========================================
// 🔥 Firebase Configuration - Unified File
// أكاديمية مستر ياسر نوفل
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAFuAjSYHumAxJ_98AbYxFI8N9dSd27xL8",
  authDomain: "yasser-nofal-english-academy.firebaseapp.com",
  databaseURL: "https://yasser-nofal-english-academy-default-rtdb.firebaseio.com",
  projectId: "yasser-nofal-english-academy",
  storageBucket: "yasser-nofal-english-academy.firebasestorage.app",
  messagingSenderId: "654488740819",
  appId: "1:654488740819:web:7a513cb6c2a74d98324526"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// تصدير الخدمات
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

console.log('✅ Firebase initialized successfully');