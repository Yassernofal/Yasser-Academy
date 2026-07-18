// content-protection.js - حماية المحتوى
(function() {
  'use strict';

  // منع النقر الأيمن
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('🚫 تم تعطيل القائمة المنبثقة لحماية المحتوى');
  });

  // منع تحديد النص
  document.addEventListener('selectstart', function(e) {
    if (!e.target.closest('.allow-copy')) {
      e.preventDefault();
    }
  });

  // منع النسخ
  document.addEventListener('copy', function(e) {
    if (!e.target.closest('.allow-copy')) {
      e.preventDefault();
      alert('📋 النسخ غير مسموح به');
    }
  });

  // منع أدوات المطور
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F12') {
      e.preventDefault();
      alert('🔧 تم تعطيل F12');
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
      e.preventDefault();
      alert('🔧 تم تعطيل أدوات المطور');
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
      e.preventDefault();
      alert('📄 عرض المصدر غير مسموح');
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      alert('💾 حفظ الصفحة غير مسموح');
    }
  });

  console.log('🔒 تم تفعيل نظام حماية المحتوى');
})();
