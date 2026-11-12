import { auth, database } from '../../firebase-config.js'; 
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
      
      // لو الحساب ولي أمر أو الطالب دفع واشتراكه مفعل -> يفتح الدرس
      if (userData.subscriptionStatus !== 'active') {
        alert('⚠️ هذا الدرس متاح للمشتركين فقط. يرجى الاشتراك أولاً.');
        window.location.href = '/subscribe.html';
      }
    } else {
      window.location.href = '/login.html';
    }
  } catch (error) {
    console.error("Auth Guard Error:", error);
    window.location.href = '/login.html';
  }
});