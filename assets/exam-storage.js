// ===== exam-storage.js =====
// حفظ نتائج الامتحانات في Firebase

import { database } from '../../firebase-config.js';
import { ref, set, push, get, update } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

export async function saveExamResult(uid, examId, result) {
  try {
    // حفظ النتيجة تحت students/{uid}/exams/{examId}_{timestamp}
    const examRef = ref(database, `students/${uid}/exams/${examId}_${Date.now()}`);
    await set(examRef, {
      examId,
      title: result.title,
      score: result.score,
      correct: result.correct,
      wrong: result.wrong,
      total: result.total,
      passed: result.passed,
      timeTaken: result.timeTaken,
      date: result.date,
      details: result.details
    });

    // تحديث إحصائيات الطالب
    const studentRef = ref(database, `students/${uid}`);
    const snapshot = await get(studentRef);
    
    if (snapshot.exists()) {
      const student = snapshot.val();
      const currentTotal = parseInt(student.totalScore) || 0;
      const currentExams = parseInt(student.examsCount) || 0;
      
      const newTotal = currentTotal + result.score;
      const newExams = currentExams + 1;
      const newAverage = Math.round(newTotal / newExams);

      await update(studentRef, {
        totalScore: newTotal,
        examsCount: newExams,
        grade: newAverage + '%',
        lastExamDate: result.date
      });
    }

    console.log('✅ تم حفظ نتيجة الامتحان:', examId);
    return true;
  } catch (error) {
    console.error('❌ خطأ في حفظ النتيجة:', error);
    return false;
  }
}

export async function getStudentExams(uid) {
  try {
    const examsRef = ref(database, `students/${uid}/exams`);
    const snapshot = await get(examsRef);
    if (snapshot.exists()) {
      const exams = snapshot.val();
      return Object.values(exams).sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return [];
  } catch (error) {
    console.error('❌ خطأ في جلب النتائج:', error);
    return [];
  }
}

console.log('✅ Exam Storage loaded');