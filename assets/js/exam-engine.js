// ===== assets/js/exam-engine.js =====
// محرك الامتحانات — يدير الأسئلة، الوقت، التصحيح

export const QUESTION_TYPES = {
  MCQ: 'mcq',
  TRUE_FALSE: 'true_false',
  FILL_BLANK: 'fill_blank',
  MATCHING: 'matching',
  ORDERING: 'ordering',
  TRANSLATION: 'translation'
};

// ===== دالة اختيار أسئلة عشوائية =====
export function pickRandomQuestions(bank, count) {
  const shuffled = [...bank];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export class ExamEngine {
  constructor(exam, questions, options = {}) {
    this.exam = exam;
    const requestedCount = exam.questionCount || questions.length;
    const actualCount = Math.min(requestedCount, questions.length);
    
    this.questions = pickRandomQuestions(questions, actualCount);
    
    this.answers = {};
    this.currentIndex = 0;
    this.startTime = null;
    this.endTime = null;
    this.timerInterval = null;
    this.timeRemaining = (exam.duration || 30) * 60;
    this.shuffleQuestions = options.shuffleQuestions !== false;
    this.shuffleOptions = options.shuffleOptions !== false;
    this.onTick = options.onTick || (() => {});
    this.onFinish = options.onFinish || (() => {});
    this.onAnswer = options.onAnswer || (() => {});
  }

  start() {
    this.startTime = new Date();
    
    if (this.shuffleQuestions) {
      this.questions = this.shuffleArray([...this.questions]);
    }
    
    if (this.shuffleOptions) {
      this.questions = this.questions.map(q => {
        if (q.type === QUESTION_TYPES.MCQ && q.options && Array.isArray(q.options)) {
          const optionsWithIndex = q.options.map((opt, idx) => ({
            option: opt,
            originalIndex: idx
          }));
          
          const shuffled = this.shuffleArray([...optionsWithIndex]);
          const newOptions = shuffled.map(o => o.option);
          
          const newCorrectIndex = shuffled.findIndex(
            o => o.originalIndex === Number(q.correctAnswer)
          );
          
          return {
            ...q,
            options: newOptions,
            correctAnswer: newCorrectIndex
          };
        }
        return q;
      });
    }
    
    this.startTimer();
    console.log('✅ بدأ الامتحان:', this.exam.title, '| عدد الأسئلة:', this.questions.length);
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      this.onTick(this.timeRemaining);
      
      if (this.timeRemaining <= 0) {
        this.finish('timeout');
      }
    }, 1000);
    
    this.onTick(this.timeRemaining);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  answer(questionId, answer) {
    this.answers[questionId] = answer;
    this.onAnswer(questionId, answer);
  }

  next() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      return true;
    }
    return false;
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return true;
    }
    return false;
  }

  goTo(index) {
    if (index >= 0 && index < this.questions.length) {
      this.currentIndex = index;
      return true;
    }
    return false;
  }

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
        passage: q.passage || '',
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

  checkAnswer(question, answer) {
    if (answer === undefined || answer === null || answer === '') return false;
    
    switch (question.type) {
      case QUESTION_TYPES.MCQ:
      case QUESTION_TYPES.TRUE_FALSE:
        return Number(answer) === Number(question.correctAnswer);
      
      case QUESTION_TYPES.FILL_BLANK:
        return String(answer).trim().toLowerCase() === 
               String(question.correctAnswer).trim().toLowerCase();
      
      case QUESTION_TYPES.TRANSLATION:
        return String(answer).trim().toLowerCase() === 
               String(question.correctAnswer).trim().toLowerCase();
      
      default:
        return Number(answer) === Number(question.correctAnswer);
    }
  }

  getGrade(percentage) {
    if (percentage >= 90) return 'ممتاز';
    if (percentage >= 80) return 'جيد جداً';
    if (percentage >= 70) return 'جيد';
    if (percentage >= 60) return 'مقبول';
    if (percentage >= 50) return 'ضعيف';
    return 'راسب';
  }

  shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  getAllQuestions() {
    return this.questions;
  }

  getProgress() {
    const answered = Object.keys(this.answers).length;
    return {
      answered,
      total: this.questions.length,
      percentage: Math.round((answered / this.questions.length) * 100)
    };
  }

  destroy() {
    this.stopTimer();
  }
}

console.log('✅ Exam Engine loaded with random selection & passage support');