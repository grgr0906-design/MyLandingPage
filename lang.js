(function(){
  const stored = localStorage.getItem('siteLang');
  let currentLang = stored || 'ko';

  function applyLang(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-ko]').forEach((node) => {
      const val = node.dataset[lang];
      if (typeof val !== 'undefined') node.textContent = val;
    });

    document.querySelectorAll('[data-ko-placeholder]').forEach((node) => {
      const key = lang === 'ko' ? 'koPlaceholder' : (lang === 'en' ? 'enPlaceholder' : 'frPlaceholder');
      if (node.dataset && node.dataset[key]) node.placeholder = node.dataset[key];
    });

    const btn = document.getElementById('langBtn');
    if (btn) btn.textContent = lang === 'ko' ? 'English' : (lang === 'en' ? 'Français' : '한국어');
  }

  function setLanguage(lang) {
    currentLang = lang;
    window.currentLang = lang;
    applyLang(lang);
    localStorage.setItem('siteLang', lang);
  }

  // expose for other scripts
  window.setLanguage = setLanguage;
  window.getCurrentLang = () => currentLang;
  window.currentLang = currentLang;

  // initialize immediately
  applyLang(currentLang);

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('langBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        const next = window.currentLang === 'ko' ? 'en' : (window.currentLang === 'en' ? 'fr' : 'ko');
        setLanguage(next);
      });
    }
  });
})();
