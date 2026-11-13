import { auth, database } from '/firebase-config.js'; 
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = '/login.html';
    return;
  }

  try {
    const snapshot = await get(ref(database, 'students/' + user.uid));
    if (snapshot.exists()) {
      const userData = snapshot.val();
      
      // لو الطالب مش مشترك
      if (userData.subscriptionStatus !== 'active') {
        alert('⚠️ هذا المحتوى متاح للمشتركين فقط. يرجى الاشتراك أولاً.');
        // نرجعه لصفحة الطالب عشان يشوف حالته
        window.location.href = '/student-dashboard.html';
      }
    } else {
      window.location.href = '/login.html';
    }
  } catch (error) {
    console.error("Auth Guard Error:", error);
    window.location.href = '/login.html';
  }
});