// ===== assets/js/exam-storage.js =====
// إدارة حفظ وقراءة بيانات الامتحانات من Firebase

import { database } from '../../firebase-config.js';
import { ref, get, set, update, push, query, orderByChild, equalTo } from "firebase/database";

// ===== جلب امتحان واحد بالمعرف =====
export async function getExam(examId) {
  try {
    const examRef = ref(database, `exams/${examId}`);
    const snapshot = await get(examRef);
    
    if (snapshot.exists()) {
      return { id: examId, ...snapshot.val() };
    }
    console.warn('⚠️ الامتحان غير موجود:', examId);
    return null;
  } catch (error) {
    console.error('❌ خطأ في جلب الامتحان:', error);
    return null;
  }
}

// ===== جلب أسئلة امتحان معين =====
export async function getExamQuestions(examId) {
  try {
    const exam = await getExam(examId);
    if (!exam || !exam.questions) {
      console.warn('⚠️ الامتحان ليس به أسئلة');
      return [];
    }

    const questions = [];
    for (const qId of exam.questions) {
      const qRef = ref(database, `questionBank/${qId}`);
      const qSnapshot = await get(qRef);
      
      if (qSnapshot.exists()) {
        questions.push({ id: qId, ...qSnapshot.val() });
      }
    }
    
    return questions;
  } catch (error) {
    console.error('❌ خطأ في جلب أسئلة الامتحان:', error);
    return [];
  }
}

// ===== جلب كل الامتحانات المتاحة لصف معين =====
export async function getExamsByGrade(grade) {
  try {
    const examsRef = ref(database, 'exams');
    const snapshot = await get(examsRef);
    
    if (!snapshot.exists()) return [];
    
    const exams = [];
    snapshot.forEach(child => {
      const exam = { id: child.key, ...child.val() };
      if (exam.grade === grade && exam.active !== false) {
        exams.push(exam);
      }
    });
    
    return exams.sort((a, b) => 
      new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
  } catch (error) {
    console.error('❌ خطأ في جلب الامتحانات:', error);
    return [];
  }
}

// ===== جلب كل الامتحانات (للمدير) =====
export async function getAllExams() {
  try {
    const examsRef = ref(database, 'exams');
    const snapshot = await get(examsRef);
    
    if (!snapshot.exists()) return [];
    
    const exams = [];
    snapshot.forEach(child => {
      exams.push({ id: child.key, ...child.val() });
    });
    
    return exams.sort((a, b) => 
      new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
  } catch (error) {
    console.error('❌ خطأ في جلب الامتحانات:', error);
    return [];
  }
}

// ===== حفظ نتيجة امتحان للطالب =====
export async function saveExamResult(studentUid, examId, result) {
  try {
    const resultRef = ref(database, `examResults/${studentUid}/${examId}`);
    await set(resultRef, {
      ...result,
      savedAt: new Date().toISOString()
    });
    
    console.log('✅ تم حفظ النتيجة:', resultRef.toString());
    return true;
  } catch (error) {
    console.error('❌ خطأ في حفظ النتيجة:', error);
    return false;
  }
}

// ===== جلب نتائج طالب =====
export async function getStudentResults(studentUid) {
  try {
    const resultsRef = ref(database, `examResults/${studentUid}`);
    const snapshot = await get(resultsRef);
    
    if (!snapshot.exists()) return [];
    
    const results = [];
    snapshot.forEach(child => {
      results.push({ examId: child.key, ...child.val() });
    });
    
    return results.sort((a, b) => 
      new Date(b.finishedAt || 0) - new Date(a.finishedAt || 0)
    );
  } catch (error) {
    console.error('❌ خطأ في جلب النتائج:', error);
    return [];
  }
}

// ===== جلب نتيجة امتحان واحد للطالب =====
export async function getExamResult(studentUid, examId) {
  try {
    const resultRef = ref(database, `examResults/${studentUid}/${examId}`);
    const snapshot = await get(resultRef);
    
    if (snapshot.exists()) {
      return { examId, ...snapshot.val() };
    }
    return null;
  } catch (error) {
    console.error('❌ خطأ في جلب النتيجة:', error);
    return null;
  }
}

// ===== حفظ امتحان جديد (للمدير) =====
export async function saveExam(examData) {
  try {
    const examsRef = ref(database, 'exams');
    const newExamRef = push(examsRef);
    
    await set(newExamRef, {
      ...examData,
      createdAt: new Date().toISOString(),
      active: true
    });
    
    console.log('✅ تم حفظ الامتحان:', newExamRef.key);
    return newExamRef.key;
  } catch (error) {
    console.error('❌ خطأ في حفظ الامتحان:', error);
    return null;
  }
}

// ===== حفظ سؤال جديد في بنك الأسئلة (للمدير) =====
export async function saveQuestion(questionData) {
  try {
    const questionsRef = ref(database, 'questionBank');
    const newQuestionRef = push(questionsRef);
    
    await set(newQuestionRef, {
      ...questionData,
      createdAt: new Date().toISOString()
    });
    
    console.log('✅ تم حفظ السؤال:', newQuestionRef.key);
    return newQuestionRef.key;
  } catch (error) {
    console.error('❌ خطأ في حفظ السؤال:', error);
    return null;
  }
}

// ===== جلب بنك الأسئلة حسب الصف = (للمدير) =====
export async function getQuestionBank(grade, topic = null) {
  try {
    const qbRef = ref(database, 'questionBank');
    const snapshot = await get(qbRef);
    
    if (!snapshot.exists()) return [];
    
    const questions = [];
    snapshot.forEach(child => {
      const q = { id: child.key, ...child.val() };
      if (q.grade === grade) {
        if (!topic || q.topic === topic) {
          questions.push(q);
        }
      }
    });
    
    return questions;
  } catch (error) {
    console.error('❌ خطأ في جلب بنك الأسئلة:', error);
    return [];
  }
}

// ===== حذف امتحان (للمدير) =====
export async function deleteExam(examId) {
  try {
    const examRef = ref(database, `exams/${examId}`);
    await set(examRef, null);
    console.log('✅ تم حذف الامتحان:', examId);
    return true;
  } catch (error) {
    console.error('❌ خطأ في حذف الامتحان:', error);
    return false;
  }
}

// ===== تفعيل/تعطيل امتحان (للمدير) =====
export async function toggleExamActive(examId, isActive) {
  try {
    const examRef = ref(database, `exams/${examId}`);
    await update(examRef, { active: isActive });
    console.log('✅ تم تحديث حالة الامتحان:', examId, isActive);
    return true;
  } catch (error) {
    console.error('❌ خطأ في تحديث حالة الامتحان:', error);
    return false;
  }
}

// ===== إحصائيات امتحان معين (للمدير) =====
export async function getExamStats(examId) {
  try {
    const resultsRef = ref(database, 'examResults');
    const snapshot = await get(resultsRef);
    
    if (!snapshot.exists()) {
      return { totalAttempts: 0, averageScore: 0, passRate: 0 };
    }
    
    let totalAttempts = 0;
    let totalScore = 0;
    let passed = 0;
    
    snapshot.forEach(student => {
      const studentResults = student.val();
      if (studentResults[examId]) {
        const result = studentResults[examId];
        totalAttempts++;
        totalScore += result.percentage || 0;
        if ((result.percentage || 0) >= 50) passed++;
      }
    });
    
    return {
      totalAttempts,
      averageScore: totalAttempts > 0 ? Math.round(totalScore / totalAttempts) : 0,
      passRate: totalAttempts > 0 ? Math.round((passed / totalAttempts) * 100) : 0
    };
  } catch (error) {
    console.error('❌ خطأ في جلب الإحصائيات:', error);
    return { totalAttempts: 0, averageScore: 0, passRate: 0 };
  }
}

console.log('✅ Exam Storage loaded');