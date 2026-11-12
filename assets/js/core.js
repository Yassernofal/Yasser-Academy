// ==========================================
// 🧠 Core.js - قلب أكاديمية مستر ياسر نوفل
// كل الصفحات تستخدم الملف ده
// ==========================================

// ==========================================
// 1️⃣ تحميل بيانات JSON (Units + Exams)
// ==========================================
let _unitsCache = null;
let _examsCache = null;

export async function loadUnits() {
  if (_unitsCache) return _unitsCache;
  try {
    const res = await fetch('/data/units.json');
    if (!res.ok) throw new Error('Failed to load units.json');
    _unitsCache = await res.json();
    return _unitsCache;
  } catch (err) {
    console.error('❌ loadUnits error:', err);
    return {};
  }
}

export async function loadExams() {
  if (_examsCache) return _examsCache;
  try {
    const res = await fetch('/data/exams.json');
    if (!res.ok) throw new Error('Failed to load exams.json');
    _examsCache = await res.json();
    return _examsCache;
  } catch (err) {
    console.error('❌ loadExams error:', err);
    return {};
  }
}

// ==========================================
// 2️⃣ Toast Notifications (نظام الإشعارات)
// ==========================================
export function showToast(message, type = 'success') {
  // لو مش موجود container، ننشئه
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.style.cssText = 'position:fixed;bottom:30px;right:30px;z-index:9999;min-width:300px;';
    toast.innerHTML = `
      <div class="toast align-items-center text-white border-0 toast-custom" role="alert" style="border-radius:16px;box-shadow:0 8px 30px rgba(0,0,0,0.15);padding:12px 20px;display:flex;align-items:center;gap:10px;">
        <div class="d-flex align-items-center w-100">
          <span class="toast-icon" id="toastIcon" style="font-size:1.5rem;">✅</span>
          <div class="toast-body flex-grow-1" id="toastMessage">تم بنجاح</div>
          <button type="button" class="btn-close btn-close-white ms-2" onclick="document.getElementById('toastNotification').style.display='none'"></button>
        </div>
      </div>`;
    document.body.appendChild(toast);
  }

  const icons = { success: '✅', danger: '❌', info: 'ℹ️', warning: '⚠️' };
  const bgColors = { success: 'bg-success', danger: 'bg-danger', info: 'bg-info', warning: 'bg-warning' };
  
  document.getElementById('toastMessage').textContent = message;
  document.getElementById('toastIcon').textContent = icons[type] || '✅';
  const toastDiv = toast.querySelector('.toast');
  toastDiv.className = `toast align-items-center text-white border-0 toast-custom ${bgColors[type] || 'bg-success'}`;
  toast.style.display = 'block';
  
  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.style.display = 'none';
  }, 4000);
}

// ==========================================
// 3️⃣ تحميل بيانات الطالب من Firebase
// ==========================================
export async function loadStudentData(database, get, ref, uid) {
  try {
    const snapshot = await get(ref(database, `students/${uid}`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
    // لو مفيش بيانات، ننشئ بيانات افتراضية
    const defaultData = {
      name: 'طالب جديد',
      grade: 'sec1',
      level: '1',
      progress: '0',
      grade_percentage: '0%',
      certificates: '0',
      lessonsCompleted: '0',
      tests: [],
      unitProgress: {}
    };
    return defaultData;
  } catch (err) {
    console.error('❌ loadStudentData error:', err);
    return null;
  }
}

// ==========================================
// 4️⃣ أدوات مساعدة (Helpers)
// ==========================================

// تحويل التاريخ لصيغة عربية
export function formatDate(dateStr) {
  if (!dateStr) return '--';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

// حماية الصفحات: توجيه لو مش مسجل دخول
export function requireAuth(auth, onAuthStateChanged, redirectTo = '/pages/login.html') {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = redirectTo;
    }
  });
}

// ==========================================
// 5️⃣ إعدادات ثابتة
// ==========================================
export const CONFIG = {
  siteName: 'أكاديمية مستر ياسر نوفل',
  phone: '01203145717',
  email: 'info@yassernofalacademy.com',
  copyright: '© 2026 أكاديمية مستر ياسر نوفل – جميع الحقوق محفوظة',
  grades: ['prep1', 'prep2', 'prep3', 'sec1', 'sec2', 'sec3'],
  colors: {
    primary: '#0a1f44',
    gold: '#f7e05e',
    orange: '#f59e0b',
    purple: '#7c3aed',
    red: '#dc2626',
    green: '#28a745'
  }
};
// ==========================================
// 6️⃣ نظام قفل المحتوى (Paywall)
// ==========================================
export async function checkSubscription(database, get, ref, currentUser) {
  if (!currentUser) {
    window.location.href = '/login.html';
    return false;
  }

  try {
    const snapshot = await get(ref(database, `students/${currentUser.uid}`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      
      // لو الاشتراك مش مفعل، نوديه لصفحة الدفع
      if (data.subscriptionStatus !== 'active') {
        window.location.href = '/subscribe.html';
        return false;
      }
      // لو الاشتراك مفعل، نكمل عادي
      return true;
    } else {
      // لو مفيش بيانات للطالب، نوديه لصفحة الدفع
      window.location.href = '/subscribe.html';
      return false;
    }
  } catch (error) {
    console.error('Error checking subscription:', error);
    return false;
  }
}

console.log('✅ Core.js loaded successfully');