// ============================================
// محرك الامتحانات التفاعلية — أكاديمية ياسر نوفل
// ============================================

class ExamEngine {
  constructor(config) {
    this.questions = config.questions || [];
    this.duration = config.duration || 30; // بالدقائق
    this.container = document.getElementById('examContainer');
    this.currentIndex = 0;
    this.answers = {};
    this.flagged = new Set();
    this.startTime = null;
    this.timerInterval = null;
    this.remainingSeconds = this.duration * 60;
    this.isFinished = false;
    
    this.init();
  }

  init() {
    this.renderHeader();
    this.renderQuestion();
    this.renderNavigation();
    this.startTimer();
    this.bindEvents();
  }

  // ============ الهيدر ============
  renderHeader() {
    const header = document.getElementById('examHeader');
    if (!header) return;
    
    header.innerHTML = `
      <h1>📝 ${document.title.split('|')[0].trim()}</h1>
      <div class="exam-timer" id="timer">${this.formatTime(this.remainingSeconds)}</div>
    `;
  }

  // ============ عرض السؤال الحالي ============
  renderQuestion() {
    const q = this.questions[this.currentIndex];
    if (!q) return;

    const answered = this.answers[this.currentIndex];
    
    let optionsHTML = '';
    q.options.forEach((opt, i) => {
      const isSelected = answered === i;
      optionsHTML += `
        <label class="option ${isSelected ? 'selected' : ''}" data-index="${i}">
          <input type="radio" name="q${this.currentIndex}" value="${i}" 
                 ${isSelected ? 'checked' : ''}>
          <span>${String.fromCharCode(65 + i)}. ${opt}</span>
        </label>
      `;
    });

    this.container.innerHTML = `
      <div class="question-card" id="questionCard">
        <div class="question-text">
          <span class="question-number">${this.currentIndex + 1}</span>
          ${q.questionAr || q.question}
          ${q.questionEn ? `<span class="en">${q.questionEn}</span>` : ''}
        </div>
        <div class="options">
          ${optionsHTML}
        </div>
        <div class="explanation" id="explanation">
          <strong>💡 التفسير:</strong> ${q.explanation || 'راجع الشرح في الوحدة.'}
        </div>
      </div>
      <div style="display:flex; justify-content:space-between; gap:12px; margin-top:24px; flex-wrap:wrap;">
        <button class="btn btn-outline" id="prevBtn" ${this.currentIndex === 0 ? 'disabled' : ''}>
          ← السابق
        </button>
        <button class="btn btn-primary" id="nextBtn">
          ${this.currentIndex === this.questions.length - 1 ? 'إنهاء الامتحان ✓' : 'التالي →'}
        </button>
      </div>
    `;

    // ربط الأحداث
    this.container.querySelectorAll('.option').forEach(opt => {
      opt.addEventListener('click', () => this.selectAnswer(parseInt(opt.dataset.index)));
    });

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) prevBtn.onclick = () => this.prevQuestion();
    if (nextBtn) nextBtn.onclick = () => this.nextQuestion();
  }

  // ============ اختيار إجابة ============
  selectAnswer(index) {
    if (this.isFinished) return;
    this.answers[this.currentIndex] = index;
    
    // تحديث الواجهة
    this.container.querySelectorAll('.option').forEach((opt, i) => {
      opt.classList.toggle('selected', i === index);
    });
  }

  // ============ التنقل ============
  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderQuestion();
      this.updateNav();
    }
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.renderQuestion();
      this.updateNav();
    } else {
      this.finishExam();
    }
  }

  goToQuestion(index) {
    this.currentIndex = index;
    this.renderQuestion();
    this.updateNav();
  }

  // ============ شريط التنقل ============
  renderNavigation() {
    const nav = document.getElementById('examNav');
    if (!nav) return;
    
    let html = '<div style="display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin-top:20px;">';
    this.questions.forEach((q, i) => {
      html += `<button class="btn" style="min-width:40px; padding:8px; font-size:14px;" 
                data-q="${i}">${i + 1}</button>`;
    });
    html += '</div>';
    nav.innerHTML = html;

    nav.querySelectorAll('button[data-q]').forEach(btn => {
      btn.onclick = () => this.goToQuestion(parseInt(btn.dataset.q));
    });
    this.updateNav();
  }

  updateNav() {
    const nav = document.getElementById('examNav');
    if (!nav) return;
    
    nav.querySelectorAll('button[data-q]').forEach(btn => {
      const i = parseInt(btn.dataset.q);
      btn.classList.remove('btn-primary', 'btn-success', 'btn-outline');
      
      if (i === this.currentIndex) {
        btn.classList.add('btn-primary');
      } else if (this.answers[i] !== undefined) {
        btn.classList.add('btn-success');
      } else {
        btn.classList.add('btn-outline');
      }
    });
  }

  // ============ المؤقت ============
  startTimer() {
    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      this.remainingSeconds--;
      const timer = document.getElementById('timer');
      if (timer) {
        timer.textContent = this.formatTime(this.remainingSeconds);
        timer.classList.remove('warning', 'danger');
        if (this.remainingSeconds <= 60) {
          timer.classList.add('danger');
        } else if (this.remainingSeconds <= 300) {
          timer.classList.add('warning');
        }
      }
      if (this.remainingSeconds <= 0) {
        this.finishExam();
      }
    }, 1000);
  }

  formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  // ============ إنهاء الامتحان ============
  finishExam() {
    if (this.isFinished) return;
    this.isFinished = true;
    clearInterval(this.timerInterval);

    // حساب النتيجة
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    this.questions.forEach((q, i) => {
      const ans = this.answers[i];
      if (ans === undefined) {
        skipped++;
      } else if (ans === q.correct) {
        correct++;
      } else {
        wrong++;
      }
    });

    const total = this.questions.length;
    const percentage = Math.round((correct / total) * 100);
    const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);

    this.renderResult(correct, wrong, skipped, total, percentage, timeTaken);
  }

  // ============ عرض النتيجة ============
  renderResult(correct, wrong, skipped, total, percentage, timeTaken) {
    let message, emoji, color;
    if (percentage >= 90) {
      message = 'ممتاز! أداء رائع جداً 🎉';
      emoji = '🏆';
      color = 'var(--success)';
    } else if (percentage >= 75) {
      message = 'جيد جداً! استمر في التقدم 👏';
      emoji = '🌟';
      color = 'var(--primary)';
    } else if (percentage >= 60) {
      message = 'جيد، لكن يحتاج مزيداً من المراجعة 📚';
      emoji = '💪';
      color = 'var(--warning)';
    } else {
      message = 'يحتاج مراجعة شاملة للوحدة 📖';
      emoji = '📝';
      color = 'var(--danger)';
    }

    const timeMin = Math.floor(timeTaken / 60);
    const timeSec = timeTaken % 60;

    this.container.innerHTML = `
      <div class="result-card">
        <div style="font-size:64px;">${emoji}</div>
        <div class="result-score">${percentage}%</div>
        <div class="result-message" style="color:${color};">${message}</div>
        
        <div class="result-stats">
          <div class="stat-box">
            <div class="num" style="color:var(--success);">${correct}</div>
            <div class="label">✅ إجابات صحيحة</div>
          </div>
          <div class="stat-box">
            <div class="num" style="color:var(--danger);">${wrong}</div>
            <div class="label">❌ إجابات خاطئة</div>
          </div>
          <div class="stat-box">
            <div class="num" style="color:var(--text-muted);">${skipped}</div>
            <div class="label">⏭️ لم تُجب</div>
          </div>
          <div class="stat-box">
            <div class="num" style="color:var(--primary);">${timeMin}:${String(timeSec).padStart(2,'0')}</div>
            <div class="label">⏱️ الوقت المستغرق</div>
          </div>
        </div>

        <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:24px;">
          <button class="btn btn-primary" onclick="location.reload()">🔄 إعادة الامتحان</button>
          <a href="../index.html" class="btn btn-outline">🏠 الرئيسية</a>
        </div>

        <div style="margin-top:32px; text-align:right;">
          <h3 style="color:var(--primary-dark); margin-bottom:16px;">📋 مراجعة الإجابات:</h3>
          ${this.renderReview()}
        </div>
      </div>
    `;

    // حفظ النتيجة
    this.saveResult(percentage, correct, total);
  }

  // ============ مراجعة الإجابات ============
  renderReview() {
    let html = '';
    this.questions.forEach((q, i) => {
      const ans = this.answers[i];
      const isCorrect = ans === q.correct;
      const isSkipped = ans === undefined;
      
      html += `
        <div class="question-card" style="border-color: ${isSkipped ? 'var(--text-muted)' : isCorrect ? 'var(--success)' : 'var(--danger)'}; padding:16px; margin-bottom:12px;">
          <div style="font-weight:700; margin-bottom:8px;">
            <span class="question-number" style="background: ${isSkipped ? 'var(--text-muted)' : isCorrect ? 'var(--success)' : 'var(--danger)'};">${i + 1}</span>
            ${q.questionAr || q.question}
            ${q.questionEn ? `<span class="en" style="font-family:'Poppins'; direction:ltr; display:block; text-align:left; color:var(--primary-dark); font-size:14px; margin-top:4px;">${q.questionEn}</span>` : ''}
          </div>
          <div style="padding-right:44px; font-family:'Poppins'; direction:ltr; text-align:left; font-size:14px;">
            <div style="color:var(--success); margin-bottom:4px;">
              ✅ <strong>Correct:</strong> ${q.options[q.correct]}
            </div>
            ${!isCorrect && !isSkipped ? `
              <div style="color:var(--danger);">
                ❌ <strong>Your answer:</strong> ${q.options[ans]}
              </div>
            ` : ''}
            ${isSkipped ? '<div style="color:var(--text-muted);">⏭️ لم تُجب على هذا السؤال</div>' : ''}
          </div>
          <div class="explanation show" style="margin-right:44px; margin-top:8px;">
            💡 ${q.explanation}
          </div>
        </div>
      `;
    });
    return html;
  }

  // ============ حفظ النتيجة ============
  saveResult(percentage, correct, total) {
    try {
      const history = JSON.parse(localStorage.getItem('examHistory') || '[]');
      history.push({
        exam: document.title,
        percentage,
        correct,
        total,
        date: new Date().toISOString()
      });
      localStorage.setItem('examHistory', JSON.stringify(history));
    } catch (e) {
      console.warn('Could not save result:', e);
    }
  }

  bindEvents() {
    // منع الخروج أثناء الامتحان
    window.addEventListener('beforeunload', (e) => {
      if (!this.isFinished && Object.keys(this.answers).length > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    });
  }
}

// تصدير للاستخدام العام
window.ExamEngine = ExamEngine;