// دالة جلب الوحدات
export async function loadUnits() {
  try {
    const response = await fetch('/data/units.json');
    if (!response.ok) throw new Error('Failed to fetch units');
    return await response.json();
  } catch (error) {
    console.error('Error loading units:', error);
    return {};
  }
}

// دالة جلب الامتحانات
export async function loadExams() {
  try {
    const response = await fetch('/data/exams.json');
    if (!response.ok) throw new Error('Failed to fetch exams');
    return await response.json();
  } catch (error) {
    console.error('Error loading exams:', error);
    return {};
  }
}

// دالة عرض الإشعارات (Toast)
export function showToast(message, type = 'info') {
  // لو عايز تعمل شكل جميل للإشعار، هنا مكانه
  // دلوقتي هنستخدم Alert بسيط عشان نضمن إنه شغال
  alert(message); 
}