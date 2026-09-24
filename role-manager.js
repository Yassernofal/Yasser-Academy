// ===== role-manager.js =====
// نظام إدارة الصلاحيات المركزي

import { auth, database } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { ref, get, set, update } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

// ===== الثوابت =====
export const ROLES = {
  STUDENT: 'student',
  PARENT: 'parent',
  ADMIN: 'admin'
};

export const PAGES = {
  STUDENT_DASHBOARD: 'student-dashboard.html',
  PARENT_DASHBOARD: 'parent-dashboard.html',
  ADMIN_DASHBOARD: 'admin-dashboard.html',
  LOGIN: 'login.html',
  INDEX: 'index.html'
};

// ===== دالة جلب بيانات المستخدم =====
export async function getUserData(uid) {
  try {
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error) {
    console.error('❌ خطأ في جلب بيانات المستخدم:', error);
    return null;
  }
}

// ===== دالة جلب دور المستخدم =====
export async function getUserRole(uid) {
  const userData = await getUserData(uid);
  return userData ? userData.role : null;
}

// ===== دالة حفظ بيانات المستخدم الجديد =====
export async function saveUserData(uid, data) {
  try {
    await set(ref(database, `users/${uid}`), {
      ...data,
      createdAt: new Date().toISOString()
    });
    console.log('✅ تم حفظ بيانات المستخدم:', uid);
    return true;
  } catch (error) {
    console.error('❌ خطأ في حفظ بيانات المستخدم:', error);
    return false;
  }
}

// ===== دالة حماية الصفحة =====
export function protectPage(allowedRoles = []) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.log('❌ غير مسجل دخول، جاري التحويل...');
      window.location.href = PAGES.LOGIN;
      return;
    }

    const role = await getUserRole(user.uid);
    console.log('👤 دور المستخدم:', role);

    if (!role) {
      console.log('❌ لا يوجد دور محدد، جاري التحويل...');
      await signOut(auth);
      window.location.href = PAGES.LOGIN;
      return;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      console.log(`⛔ الدور "${role}" غير مسموح له بالوصول`);
      redirectToCorrectDashboard(role);
      return;
    }

    console.log('✅ مسموح بالوصول');
    document.body.style.display = 'block';
    
    window.dispatchEvent(new CustomEvent('userReady', { detail: { user, role } }));
  });
}

// ===== دالة توجيه المستخدم للوحة الصحيحة =====
export function redirectToCorrectDashboard(role) {
  switch (role) {
    case ROLES.STUDENT:
      window.location.href = PAGES.STUDENT_DASHBOARD;
      break;
    case ROLES.PARENT:
      window.location.href = PAGES.PARENT_DASHBOARD;
      break;
    case ROLES.ADMIN:
      window.location.href = PAGES.ADMIN_DASHBOARD;
      break;
    default:
      window.location.href = PAGES.LOGIN;
  }
}

// ===== دالة التحقق من المستخدم الحالي =====
export function isCurrentUser(uid) {
  return auth.currentUser && auth.currentUser.uid === uid;
}

// ===== دالة تسجيل الخروج =====
export async function logout() {
  try {
    await signOut(auth);
    console.log('✅ تم تسجيل الخروج');
    window.location.href = PAGES.INDEX;
  } catch (error) {
    console.error('❌ خطأ في تسجيل الخروج:', error);
  }
}

// ===== دالة جلب أبناء ولي الأمر =====
export async function getParentChildren(parentId) {
  try {
    const parentRef = ref(database, `parents/${parentId}/children`);
    const snapshot = await get(parentRef);
    if (snapshot.exists()) {
      const childrenIds = snapshot.val();
      const childrenData = [];
      
      for (const childId of Object.keys(childrenIds)) {
        const childRef = ref(database, `students/${childId}`);
        const childSnapshot = await get(childRef);
        if (childSnapshot.exists()) {
          childrenData.push({ id: childId, ...childSnapshot.val() });
        }
      }
      return childrenData;
    }
    return [];
  } catch (error) {
    console.error('❌ خطأ في جلب الأبناء:', error);
    return [];
  }
}

console.log('✅ Role Manager loaded');