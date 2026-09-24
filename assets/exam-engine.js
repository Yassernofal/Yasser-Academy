// ===== assets/js/exam-engine.js =====
// محرك الامتحانات — يدير الأسئلة، الوقت، التصحيح

// ===== أنواع الأسئلة المدعومة =====
export const QUESTION_TYPES = {
  MCQ: 'mcq',
  TRUE_FALSE: 'true_false',
  FILL_BLANK: 'fill_blank',
  MATCHING: 'matching',
  ORDERING: 'ordering',
  TRANSLATION: 'translation'
};

// ===== حالة الامتحان =====
export class ExamEngine {
  constructor(exam, questions, options = {}) {
    this.exam = exam;                    // بيانات الامتحان (العنوان، المدة، إلخ)
    this.questions = questions;          // قائمة الأسئلة
    this.answers = {};                   // إجابات الطالب
    this.currentIndex = 0;               // السؤال الحالي
    this.startTime = null;               // وقت البدء
    this.endTime = null;                 // وقت الانتهاء
    this.timerInterval = null;           // مؤقت العد التنازلي
    this.timeRemaining = (exam.duration || 30) * 60; // بالثواني
    this.shuffleQuestions = options.shuffleQuestions !== false;
    this.shuffleOptions = options.shuffleOptions !== false;
    this.onTick = options.onTick || (() => {});      // كل ثانية
    this.onFinish = options.onFinish || (() => {});  // عند الانتهاء
    this.onAnswer = options.onAnswer || (() => {});  // عند الإجابة
  }

  // ===== بدء الامتحان =====
  start() {
    this.startTime = new Date();
    
    // خلط الأسئلة
    if (this.shuffleQuestions) {
      this.questions = this.shuffleArray([...this.questions]);
    }
    
    // خلط الإجابات
    if (this.shuffleOptions) {
      this.questions = this.questions.map(q => {
        if (q.type === QUESTION_TYPES.MCQ && q.options) {
          return { ...q, options: this.shuffleArray([...q.options]) };
        }
        return q;
      });
    }
    
    // بدء المؤقت
    this.startTimer();
    console.log('✅ بدأ الامتحان:', this.exam.title);
  }

  // ===== بدء المؤقت =====
  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      this.onTick(this.timeRemaining);
      
      if (this.timeRemaining <= 0) {
        this.finish('timeout');
      }
    }, 1000);
    
    // استدعاء أولي عشان يعرض الوقت فوراً
    this.onTick(this.timeRemaining);
  }

  // ===== إيقاف المؤقت =====
  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  // ===== تسجيل إجابة =====
  answer(questionId, answer) {
    this.answers[questionId] = answer;
    this.onAnswer(questionId, answer);
    console.log('✅ تم تسجيل الإجابة:', questionId, answer);
  }

  // ===== الانتقال للسؤال التالي =====
  next() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      return true;
    }
    return false;
  }

  // ===== الرجوع للسؤال السابق =====
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return true;
    }
    return false;
  }

  // ===== الانتقال لسؤال محدد =====
  goTo(index) {
    if (index >= 0 && index < this.questions.length) {
      this.currentIndex = index;
      return true;
    }
    return false;
  }

  // ===== إنهاء الامتحان =====
  finish(reason = 'manual') {
    this.stopTimer();
    this.endTime = new Date();
    
    const result = this.calculateScore();
    result.reason = reason;
    result.timeSpent = Math.floor((this.endTime - this.startTime) / 1000);
    result.startedAt = this.startTime.toISOString();
    result.finishedAt = this.endTime.toISOString();
    
    console.log('✅ انتهى الامتحان:', result);
    this.onFinish(result);
    
    return result;
  }

  // ===== حساب النتيجة =====
  calculateScore() {
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    const details = [];
    
    this.questions.forEach(q => {
      const studentAnswer = this.answers[q.id];
      const isCorrect = this.checkAnswer(q, studentAnswer);
      
      if (studentAnswer === undefined || studentAnswer === null || studentAnswer === '') {
        unanswered++;
      } else if (isCorrect) {
        correct++;
      } else {
        wrong++;
      }
      
      details.push({
        questionId: q.id,
        questionText: q.text,
        studentAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation || ''
      });
    });
    
    const total = this.questions.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    
    return {
      correct,
      wrong,
      unanswered,
      total,
      percentage,
      grade: this.getGrade(percentage),
      details
    };
  }

  // ===== التحقق من صحة الإجابة =====
  checkAnswer(question, answer) {
    if (answer === undefined || answer === null) return false;
    
    switch (question.type) {
      case QUESTION_TYPES.MCQ:
      case QUESTION_TYPES.TRUE_FALSE:
        return String(answer) === String(question.correctAnswer);
      
      case QUESTION_TYPES.FILL_BLANK:
        // مقارنة بدون حساسية لحالة الأحرف
        return String(answer).trim().toLowerCase() === 
               String(question.correctAnswer).trim().toLowerCase();
      
      case QUESTION_TYPES.TRANSLATION:
        // مقارنة تقريبية
        return String(answer).trim().toLowerCase() === 
               String(question.correctAnswer).trim().toLowerCase();
      
      default:
        return String(answer) === String(question.correctAnswer);
    }
  }

  // ===== تحديد التقدير =====
  getGrade(percentage) {
    if (percentage >= 90) return 'ممتاز';
    if (percentage >= 80) return 'جيد جداً';
    if (percentage >= 70) return 'جيد';
    if (percentage >= 60) return 'مقبول';
    if (percentage >= 50) return 'ضعيف';
    return 'راسب';
  }

  // ===== خلط مصفوفة =====
  shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // ===== تنسيق الوقت (MM:SS) =====
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // ===== الحصول على السؤال الحالي =====
  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  // ===== الحصول على كل الأسئلة =====
  getAllQuestions() {
    return this.questions;
  }

  // ===== الحصول على التقدم =====
  getProgress() {
    const answered = Object.keys(this.answers).length;
    return {
      answered,
      total: this.questions.length,
      percentage: Math.round((answered / this.questions.length) * 100)
    };
  }

  // ===== تنظيف =====
  destroy() {
    this.stopTimer();
    console.log('✅ تم تنظيف محرك الامتحان');
  }
}

console.log('✅ Exam Engine loaded');