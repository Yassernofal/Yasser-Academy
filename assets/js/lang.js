// ===== نظام الترجمة =====
let currentLang = localStorage.getItem('lang') || 'ar';

async function loadTranslations(lang) {
    try {
        const response = await fetch(`assets/locales/${lang}.json`);
        return await response.json();
    } catch (error) {
        return {};
    }
}

function applyTranslations(translations) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            el.innerHTML = translations[key];
        }
    });
}

function updateDirection(lang) {
    const html = document.documentElement;
    if (lang === 'ar') {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
    } else {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
    }
}

function updateActiveButton(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

async function switchLanguage(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem('lang', lang);
    const translations = await loadTranslations(lang);
    applyTranslations(translations);
    updateDirection(lang);
    updateActiveButton(lang);
}

document.addEventListener('DOMContentLoaded', async function() {
    const translations = await loadTranslations(currentLang);
    applyTranslations(translations);
    updateDirection(currentLang);
    updateActiveButton(currentLang);
});