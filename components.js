// ============================================
// مكونات جاهزة لكل الصفحات — أكاديمية ياسر نوفل
// ============================================

(function() {
  'use strict';

  // ---------- 1. تطبيق الوضع المحفوظ ----------
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // ---------- 2. بناء الـ Navbar ----------
  function buildNavbar() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isAdmin = currentPage.startsWith('admin-');
    
    const menuItems = isAdmin ? [
      { href: 'admin-dashboard.html', label: 'لوحة التحكم' },
      { href: 'admin-students.html',  label: 'الطلاب' },
      { href: 'admin-lessons.html',   label: 'الدروس' },
      { href: 'admin-bookings.html',  label: 'الحجوزات' },
      { href: 'admin-reports.html',   label: 'التقارير' }
    ] : [
      { href: 'index.html',       label: 'الرئيسية' },
      { href: 'lessons.html',     label: 'الدروس' },
      { href: 'questions.html',   label: 'بنك الأسئلة' },
      { href: 'bookings.html',    label: 'الحجز' },
      { href: 'contact.html',     label: 'تواصل' }
    ];

    const menuHTML = menuItems.map(item => {
      const active = currentPage === item.href ? 'active' : '';
      return `<li><a href="${item.href}" class="${active}">${item.label}</a></li>`;
    }).join('');

    return `
      <nav class="navbar">
        <div class="container navbar-inner">
          <a href="${isAdmin ? 'admin-dashboard.html' : 'index.html'}" class="navbar-brand">
            <span class="navbar-brand-icon">📚</span>
            <span>أكاديمية ياسر نوفل</span>
          </a>
          <ul class="navbar-menu" id="navbarMenu">
            ${menuHTML}
          </ul>
          <div class="flex items-center gap-2">
            <button class="btn btn-icon btn-ghost" id="themeToggle" title="تبديل الوضع">
              <span id="themeIcon">${savedTheme === 'dark' ? '☀️' : '🌙'}</span>
            </button>
            <button class="navbar-toggle" id="navbarToggle">☰</button>
          </div>
        </div>
      </nav>
    `;
  }

  // ---------- 3. بناء الـ Footer ----------
  function buildFooter() {
    const year = new Date().getFullYear();
    return `
      <footer class="footer">
        <div class="container">
          <div class="grid grid-3">
            <div>
              <h3 style="color:#fff; margin-bottom: 12px;">أكاديمية ياسر نوفل</h3>
              <p style="font-size: 14px; line-height: 1.8;">
                تعليم اللغة الإنجليزية باحترافية لطلاب الإعدادي والثانوي.
              </p>
            </div>
            <div>
              <h4 style="color:#fff; margin-bottom: 12px;">روابط سريعة</h4>
              <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; font-size:14px;">
                <li><a href="lessons.html">الدروس</a></li>
                <li><a href="questions.html">بنك الأسئلة</a></li>
                <li><a href="bookings.html">الحجز</a></li>
              </ul>
            </div>
            <div>
              <h4 style="color:#fff; margin-bottom: 12px;">تواصل</h4>
              <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; font-size:14px;">
                <li>📱 واتساب: 01XXXXXXXXX</li>
                <li>📧 info@yasser-academy.com</li>
              </ul>
            </div>
          </div>
          <div style="text-align:center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #334155; font-size: 13px;">
            © ${year} أكاديمية مستر ياسر نوفل — جميع الحقوق محفوظة
          </div>
        </div>
      </footer>
    `;
  }

  // ---------- 4. التهيئة عند تحميل الصفحة ----------
  document.addEventListener('DOMContentLoaded', function() {
    // أدخل الـ Navbar في بداية body إن لم يكن موجوداً
    if (!document.querySelector('.navbar')) {
      document.body.insertAdjacentHTML('afterbegin', buildNavbar());
    }

    // أدخل الـ Footer في نهاية body إن لم يكن موجوداً
    if (!document.querySelector('.footer')) {
      document.body.insertAdjacentHTML('beforeend', buildFooter());
    }

    // زر تبديل الوضع الليلي
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        document.getElementById('themeIcon').textContent = next === 'dark' ? '☀️' : '🌙';
      });
    }

    // زر القائمة على الجوال
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    if (navbarToggle && navbarMenu) {
      navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('open');
      });
    }
  });
})();