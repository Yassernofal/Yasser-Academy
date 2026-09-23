// ============================================================
// نظام الإشعارات المتكامل - Mr. Yasser Nofal Academy
// ============================================================

// ===== 1. إشعارات الموقع (في الصفحة) =====
function showNotification(title, message, type = 'info', duration = 5000) {
    // التأكد من وجود حاوية الإشعارات
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            z-index: 9999;
            max-width: 400px;
            width: 100%;
            direction: rtl;
        `;
        document.body.appendChild(container);
    }

    const colors = {
        success: { bg: '#d4edda', border: '#28a745', icon: '✅' },
        error: { bg: '#f8d7da', border: '#dc3545', icon: '❌' },
        warning: { bg: '#fff3cd', border: '#ffc107', icon: '⚠️' },
        info: { bg: '#cce5ff', border: '#17a2b8', icon: 'ℹ️' }
    };

    const color = colors[type] || colors.info;

    const notification = document.createElement('div');
    notification.style.cssText = `
        background: ${color.bg};
        border-right: 4px solid ${color.border};
        border-radius: 12px;
        padding: 15px 20px;
        margin-bottom: 10px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        animation: slideIn 0.3s ease;
        direction: rtl;
        transition: opacity 0.3s;
    `;

    notification.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:start;gap:10px;">
            <div style="flex:1;">
                <strong style="font-size:1.1rem;color:#0a1f44;">${color.icon} ${title}</strong>
                <p style="margin:5px 0 0;color:#333;font-size:0.95rem;">${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:#888;flex-shrink:0;">
                &times;
            </button>
        </div>
    `;

    container.appendChild(notification);

    // إزالة الإشعار بعد المدة المحددة
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
}

// ===== 2. إشعارات البريد الإلكتروني (باستخدام EmailJS) =====
// سجل في EmailJS وحط الـ Keys بتاعتك
function sendEmailNotification(to, subject, message) {
    // تأكد من تحميل EmailJS في الصفحة
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS not loaded. Please add: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>');
        return;
    }

    const templateParams = {
        to_email: to,
        subject: subject,
        message: message,
        from_name: 'Mr. Yasser Nofal Academy'
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
        .then(() => {
            showNotification('📧 تم الإرسال', 'تم إرسال الإشعار إلى بريدك الإلكتروني', 'success');
        })
        .catch((error) => {
            console.error('Email error:', error);
            showNotification('❌ خطأ', 'فشل إرسال البريد الإلكتروني', 'error');
        });
}

// ===== 3. إشعارات واتساب =====
function sendWhatsAppNotification(phone, message) {
    if (!phone) {
        showNotification('❌ خطأ', 'رقم الهاتف مطلوب لإرسال إشعار واتساب', 'error');
        return;
    }
    // تنظيف رقم الهاتف (إزالة الأصفار الزائدة)
    let cleanPhone = phone.replace(/^0+/, '');
    if (!cleanPhone.startsWith('2')) {
        cleanPhone = '2' + cleanPhone;
    }
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// ===== 4. إشعارات مخصصة (للموقع) =====
function notifyUser(action, data = {}) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    const notifications = {
        'login': {
            title: '👋 مرحباً بك!',
            message: `أهلاً بعودتك ${user.name || 'الطالب'}!`,
            type: 'success'
        },
        'test_completed': {
            title: '📝 تم إكمال الاختبار!',
            message: `حصلت على ${data.score || 0}% في اختبار ${data.testName || 'المستوى'}`,
            type: 'info'
        },
        'level_up': {
            title: '🎉 تهانينا!',
            message: `لقد وصلت إلى المستوى ${data.level || 'الجديد'}`,
            type: 'success'
        },
        'badge_earned': {
            title: '🏅 شارة جديدة!',
            message: `حصلت على شارة ${data.badge || 'جديدة'}`,
            type: 'success'
        },
        'booking_confirmed': {
            title: '✅ تأكيد حجز',
            message: `تم تأكيد حجزك في كورس ${data.course || 'الإنجليزية'}`,
            type: 'success'
        },
        'payment_received': {
            title: '💰 استلام دفع',
            message: `تم استلام مبلغ ${data.amount || 0} ج.م`,
            type: 'success'
        }
    };

    const notification = notifications[action];
    if (notification) {
        showNotification(notification.title, notification.message, notification.type);
    }
}

// ===== 5. إضافة CSS للأنيميشن (مرة واحدة) =====
(function addStyles() {
    if (document.getElementById('notification-styles')) return;
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            0% { opacity: 0; transform: translateX(50px); }
            100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOut {
            0% { opacity: 1; transform: translateX(0); }
            100% { opacity: 0; transform: translateX(50px); }
        }
    `;
    document.head.appendChild(style);
})();

// ===== 6. تشغيل عند تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', function() {
    // إشعار ترحيبي إذا كان المستخدم مسجل دخول
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        // تأخير بسيط عشان تظهر الصفحة أولاً
        setTimeout(() => {
            // نتحقق من آخر نشاط (لو في نشاط جديد)
            const lastNotification = localStorage.getItem('lastNotification');
            const today = new Date().toDateString();
            if (lastNotification !== today) {
                notifyUser('login');
                localStorage.setItem('lastNotification', today);
            }
        }, 1000);
    }
});

// ===== تصدير الدوال للاستخدام العالمي =====
window.showNotification = showNotification;
window.sendEmailNotification = sendEmailNotification;
window.sendWhatsAppNotification = sendWhatsAppNotification;
window.notifyUser = notifyUser;

console.log('✅ نظام الإشعارات تم تحميله بنجاح');