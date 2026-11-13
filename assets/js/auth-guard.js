import { auth, database } from '/firebase-config.js'; 
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // لو مش مسجل دخول، يروح للوجين
    window.location.href = '/login.html';
    return;
  }

  try {
    const snapshot = await get(ref(database, 'students/' + user.uid));
    if (snapshot.exists()) {
      const userData = snapshot.val();
      
      // لو الطالب مش مشترك (subscriptionStatus مش active)
      if (userData.subscriptionStatus !== 'active') {
        // يظهر إشعار
        alert('⚠️ هذا الدرس متاح للمشتركين فقط. يرجى الاشتراك أولاً.');
        // ونرجعه لصفحة الطالب
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