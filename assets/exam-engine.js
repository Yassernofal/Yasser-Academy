// ===== exam-engine.js =====
// محرك الامتحانات التفاعلي

export class ExamEngine {
  constructor(examId, options = {}) {
    this.examId = examId;
    this.onComplete = options.onComplete || (() => {});
    this.examData = null;
    this.currentIndex = 0;
    this.answers = [];
    this.startTime = null;
    this.timerInterval = null;
    this.timeLeft = 0;
  }

  async load() {
    try {
      // تحميل ملف JSON
      const response = await fetch(`./assets/js/exam-data/${this.examId}.json`);
      if (!response.ok) throw new Error('لم يتم العثور على ملف الامتحان');
      this.examData = await response.json();

      console.log('✅ تم تحميل الامتحان:', this.examData.title);

      // تهيئة الحالة
      this.currentIndex = 0;
      this.answers = new Array(this.examData.questions.length).fill(null);
      this.startTime = Date.now();
      this.timeLeft = this.examData.duration || 1800;

      this.renderExam();
      this.startTimer();
    } catch (error) {
      console.error('❌ خطأ في تحميل الامتحان:', error);
      throw error;
    }
  }

  renderExam() {
    document.getElementById('loadingScreen').style.display = 'none';
    document.getElementById('examScreen').style.display = 'block';
    document.getElementById('resultsScreen').style.display = 'none';

    document.getElementById('examTitle').textContent = this.examData.title;
    document.getElementById('totalQuestions').textContent = this.examData.questions.length;

    this.renderQuestion();
  }

  renderQuestion() {
    const q = this.examData.questions[this.currentIndex];
    const total = this.examData.questions.length;

    // تحديث العداد والتقدم
    document.getElementById('currentQuestionNum').textContent = this.currentIndex + 1;
    document.getElementById('questionNumber').textContent = this.currentIndex + 1;
    document.getElementById('progressBar').style.width = `${((this.currentIndex) / total) * 100}%`;

    // نوع السؤال
    const typeLabels = {
      'mcq': 'اختيار من متعدد',
      'true-false': 'صح أم خطأ',
      'fill-blank': 'إكمال الفراغ'
    };
    document.getElementById('questionType').textContent = typeLabels[q.type] || q.type;

    // نص السؤال
    document.getElementById('questionText').textContent = q.question;

    // عرض الخيارات حسب النوع
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';

    if (q.type === 'mcq') {
      q.options.forEach((opt, i) => {
        const letter = String.fromCharCode(65 + i); // A, B, C, D
        const div = document.createElement('div');
        div.className = 'option';
        div.dataset.index = i;
        div.innerHTML = `<span class="option-letter">${letter}</span> ${opt}`;
        div.onclick = () => this.selectAnswer(i);
        container.appendChild(div);
      });
    } else if (q.type === 'true-false') {
      ['صح ✓', 'خطأ ✗'].forEach((opt, i) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.dataset.index = i;
        div.innerHTML = `<span class="option-letter">${i === 0 ? 'T' : 'F'}</span> ${opt}`;
        div.onclick = () => this.selectAnswer(i === 0);
        container.appendChild(div);
      });
    }

    // استرجاع الإجابة السابقة إن وجدت
    const prevAnswer = this.answers[this.currentIndex];
    if (prevAnswer !== null) {
      document.querySelectorAll('.option').forEach(el => {
        const idx = el.dataset.index;
        if (String(prevAnswer) === String(idx) || 
            (q.type === 'true-false' && String(prevAnswer) === String(idx === '0'))) {
          el.classList.add('selected');
        }
      });
      document.getElementById('nextBtn').disabled = false;
    } else {
      document.getElementById('nextBtn').disabled = true;
    }

    // إخفاء الشرح
    document.getElementById('explanationBox').classList.remove('show');

    // تغيير نص الزر في آخر سؤال
    const nextBtn = document.getElementById('nextBtn');
    if (this.currentIndex === total - 1) {
      nextBtn.innerHTML = 'إنهاء الامتحان <i class="fas fa-check"></i>';
    } else {
      nextBtn.innerHTML = 'التالي <i class="fas fa-arrow-left"></i>';
    }
  }

  selectAnswer(answer) {
    this.answers[this.currentIndex] = answer;
    document.querySelectorAll('.option').forEach(el => {
      el.classList.remove('selected');
      if (String(el.dataset.index) === String(answer) || 
          (typeof answer === 'boolean' && String(el.dataset.index) === (answer ? '0' : '1'))) {
        el.classList.add('selected');
      }
    });
    document.getElementById('nextBtn').disabled = false;
  }

  nextQuestion() {
    if (this.currentIndex < this.examData.questions.length - 1) {
      this.currentIndex++;
      this.renderQuestion();
    } else {
      this.finishExam();
    }
  }

  skipQuestion() {
    if (this.currentIndex < this.examData.questions.length - 1) {
      this.currentIndex++;
      this.renderQuestion();
    }
  }

  startTimer() {
    this.updateTimerDisplay();
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();
      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.finishExam();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const min = Math.floor(this.timeLeft / 60);
    const sec = this.timeLeft % 60;
    const timerEl = document.getElementById('examTimer');
    timerEl.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    
    if (this.timeLeft <= 60) {
      timerEl.classList.add('warning');
    }
  }

  finishExam() {
    clearInterval(this.timerInterval);
    const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);

    // حساب النتيجة
    let correct = 0;
    let wrong = 0;
    const details = [];

    this.examData.questions.forEach((q, i) => {
      const userAnswer = this.answers[i];
      let isCorrect = false;

      if (q.type === 'mcq') {
        isCorrect = userAnswer === q.correctAnswer;
      } else if (q.type === 'true-false') {
        isCorrect = userAnswer === q.correctAnswer;
      } else if (q.type === 'fill-blank') {
        isCorrect = String(userAnswer || '').trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();
      }

      if (isCorrect) correct++;
      else wrong++;

      details.push({
        questionId: q.id,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect
      });
    });

    const total = this.examData.questions.length;
    const percentage = Math.round((correct / total) * 100);
    const passed = percentage >= (this.examData.passingScore || 70);

    const result = {
      examId: this.examId,
      title: this.examData.title,
      score: percentage,
      correct,
      wrong,
      total,
      passed,
      timeTaken,
      details,
      date: new Date().toISOString()
    };

    this.showResults(result);
    this.onComplete(result);
  }

  showResults(result) {
    document.getElementById('examScreen').style.display = 'none';
    document.getElementById('resultsScreen').style.display = 'block';

    document.getElementById('scorePercent').textContent = result.score + '%';
    document.getElementById('correctCount').textContent = result.correct;
    document.getElementById('wrongCount').textContent = result.wrong;

    const min = Math.floor(result.timeTaken / 60);
    const sec = result.timeTaken % 60;
    document.getElementById('timeTaken').textContent = `${min}:${String(sec).padStart(2, '0')}`;

    // دائرة النتيجة
    const circle = document.getElementById('scoreCircle');
    const color = result.passed ? '#28a745' : '#dc3545';
    circle.style.background = `conic-gradient(${color} ${result.score}%, #e9ecef ${result.score}%)`;

    // العنوان والرسالة
    if (result.passed) {
      document.getElementById('resultTitle').textContent = '🎉 مبروك! نجحت';
      document.getElementById('resultTitle').style.color = '#28a745';
      document.getElementById('resultMessage').textContent = 
        `لقد حصلت على ${result.score}% وحققت النجاح في هذا الامتحان. استمر في التقدم!`;
    } else {
      document.getElementById('resultTitle').textContent = '😔 لم تنجح هذه المرة';
      document.getElementById('resultTitle').style.color = '#dc3545';
      document.getElementById('resultMessage').textContent = 
        `لقد حصلت على ${result.score}%. تحتاج إلى ${this.examData.passingScore || 70}% للنجاح. حاول مرة أخرى!`;
    }
  }

  retry() {
    this.load();
  }
}

console.log('✅ Exam Engine loaded');