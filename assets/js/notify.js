// ==========================================
// 📢 نظام الإشعارات (تليجرام)
// أكاديمية مستر ياسر نوفل
// ==========================================

// ⚠️ هتحط التوكن بتاعك هنا بين علامات التنصيص
const TELEGRAM_BOT_TOKEN = "bot9169498579:AAFxoR6-3OT0sZEJz7QPxO3__KQrlE0GV_0";

// ⚠️ هتحط الـ Chat ID بتاعك هنا
const TELEGRAM_CHAT_ID = "6887472928";

/**
 * دالة إرسال رسالة على التليجرام
 * @param {string} message - نص الرسالة
 */
export async function sendTelegramNotification(message) {
  if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === "ضع_التوكن_هنا") {
    console.warn('⚠️ لم يتم إعداد توكن التليجرام بعد.');
    return;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML' // عشان نقدر نستخدم خط عريض
      })
    });

    const data = await response.json();
    if (data.ok) {
      console.log('✅ تم إرسال الإشعار بنجاح');
    } else {
      console.error('❌ فشل إرسال الإشعار:', data.description);
    }
  } catch (error) {
    console.error('❌ خطأ في الاتصال بالشبكة:', error);
  }
}