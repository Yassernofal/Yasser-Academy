export async function sendTelegramNotification(message) {
  // ضع هنا توكن البوت الخاص بك ومعرف المحادثة (Chat ID)
  const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
  const CHAT_ID = 'YOUR_CHAT_ID_HERE';

  if (BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' || CHAT_ID === 'YOUR_CHAT_ID_HERE') {
    console.log('⚠️ لم يتم إعداد إشعارات التليجرام بعد.');
    return;
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      }),
    });
  } catch (error) {
    console.error('❌ فشل إرسال إشعار التليجرام:', error);
  }
}