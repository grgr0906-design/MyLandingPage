(function(){
  const LANGS = ['ko', 'en', 'fr'];
  const LANG_LABELS = {
    ko: '한국어',
    en: 'English',
    fr: 'Français'
  };

  const stored = localStorage.getItem('siteLang');
  let currentLang = stored || 'ko';

  const LOGIN_MESSAGES = {
    ko: {
      missing: '모든 항목을 입력해주세요.',
      success: '로그인되었습니다.',
      logout: '로그아웃 되었습니다.',
      signupSuccess: '회원가입이 완료되었습니다.',
      signupMismatch: '비밀번호가 일치하지 않습니다.',
      loginFailed: '이메일 또는 비밀번호가 올바르지 않습니다.',
      alreadyExists: '이미 등록된 이메일입니다.',
      emailTaken: '이미 등록된 이메일입니다.',
      emailAvailable: '사용 가능한 이메일입니다.',
      usernameMissing: '아이디를 입력해주세요.',
      phoneInvalid: '전화번호 형식이 올바르지 않습니다.',
      phoneTaken: '이미 사용 중인 전화번호입니다.',
      phoneAvailable: '사용 가능한 전화번호입니다.',
      passwordInvalid: '비밀번호는 영문, 숫자, 특수문자 포함 8자리 이상이어야 합니다.',
      usernameTaken: '이미 사용 중인 아이디입니다.',
      usernameAvailable: '사용 가능한 아이디입니다.'
    },
    en: {
      missing: 'Please fill in all fields.',
      success: 'Login successful.',
      logout: 'Logged out.',
      signupSuccess: 'Sign up completed.',
      signupMismatch: 'Passwords do not match.',
      loginFailed: 'Email or password is incorrect.',
      alreadyExists: 'This email is already registered.',
      emailTaken: 'This email is already registered.',
      emailAvailable: 'This email is available.',
      usernameMissing: 'Please enter a username.',
      phoneInvalid: 'Phone number format is invalid.',
      phoneTaken: 'This phone number is already used.',
      phoneAvailable: 'This phone number is available.',
      passwordInvalid: 'Password must be 8+ chars with letters, numbers and special characters.',
      usernameTaken: 'That username is already taken.',
      usernameAvailable: 'That username is available.'
    },
    fr: {
      missing: 'Veuillez remplir tous les champs.',
      success: 'Connexion réussie.',
      logout: 'Déconnecté.',
      signupSuccess: 'Inscription terminée.',
      signupMismatch: 'Les mots de passe ne correspondent pas.',
      loginFailed: 'E-mail ou mot de passe incorrect.',
      alreadyExists: 'Cet e-mail est déjà enregistré.',
      emailTaken: 'Cet e-mail est déjà enregistré.',
      emailAvailable: 'Cet e-mail est disponible.',
      usernameMissing: 'Veuillez saisir un identifiant.',
      phoneInvalid: 'Le format du téléphone est invalide.',
      phoneTaken: 'Ce numéro de téléphone est déjà utilisé.',
      phoneAvailable: 'Ce numéro de téléphone est disponible.',
      passwordInvalid: 'Le mot de passe doit comporter 8 caractères avec lettres, chiffres et symboles.',
      usernameTaken: 'Cet identifiant est déjà pris.',
      usernameAvailable: 'Cet identifiant est disponible.'
    }
  };

  const AUTH_BUTTON_LABELS = {
    login: { ko: '로그인', en: 'Login', fr: 'Connexion' },
    signup: { ko: '회원가입', en: 'Sign Up', fr: 'Inscription' }
  };

  const FIELD_PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\d{2,3}-?\d{3,4}-?\d{4}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]).{8,}$/
  };

  function applyAuthLabels() {
    const authSubmit = document.getElementById('authSubmit');
    const authCancel = document.getElementById('authCancel');
    const loginBtn = document.getElementById('loginBtn');
    const loginAria = document.getElementById('loginGreeting')?.textContent ? (currentLang === 'ko' ? '내 정보' : (currentLang === 'fr' ? 'Mon compte' : 'My Account')) : (currentLang === 'ko' ? '로그인' : (currentLang === 'fr' ? 'Connexion' : 'Login'));
    if (authSubmit) authSubmit.textContent = AUTH_BUTTON_LABELS[document.getElementById('authMode')?.value || 'login'][currentLang];
    if (authCancel) authCancel.textContent = currentLang === 'ko' ? '취소' : (currentLang === 'fr' ? 'Annuler' : 'Cancel');
    if (loginBtn) loginBtn.setAttribute('aria-label', loginAria);
  }

  function setAuthMode(mode) {
    const authModeInput = document.getElementById('authMode');
    const confirmLabel = document.querySelector('.auth-confirm-label');
    const loginTab = document.querySelector('.tab[data-tab="login"]');
    const signupTab = document.querySelector('.tab[data-tab="signup"]');
    const authSubmit = document.getElementById('authSubmit');
    const extraFields = document.querySelectorAll('.auth-extra');
    const usernameInput = document.getElementById('authUsername');
    const phoneInput = document.getElementById('authPhone');
    const confirmInput = document.getElementById('authPasswordConfirm');

    if (!authModeInput || !authSubmit) return;
    authModeInput.value = mode;
    if (confirmLabel) confirmLabel.hidden = mode !== 'signup';
    extraFields.forEach(field => {
      field.hidden = mode !== 'signup';
    });

    if (loginTab && signupTab) {
      loginTab.classList.toggle('active', mode === 'login');
      loginTab.setAttribute('aria-selected', String(mode === 'login'));
      signupTab.classList.toggle('active', mode === 'signup');
      signupTab.setAttribute('aria-selected', String(mode === 'signup'));
    }
    if (authSubmit) authSubmit.textContent = AUTH_BUTTON_LABELS[mode][currentLang];
    closeVerifyDialog();
    if (mode === 'login') {
      if (usernameInput) usernameInput.value = '';
      if (phoneInput) phoneInput.value = '';
      if (confirmInput) confirmInput.value = '';
    }
  }

  function getLoginMessage(key) {
    return LOGIN_MESSAGES[currentLang][key] || '';
  }

  function openLoginPanel() {
    const panel = document.getElementById('loginPanel');
    const loginBtn = document.getElementById('loginBtn');
    if (!panel || !loginBtn) return;
    panel.classList.add('show');
    panel.setAttribute('aria-hidden', 'false');
    loginBtn.setAttribute('aria-expanded', 'true');
  }

  function closeLoginPanel() {
    const panel = document.getElementById('loginPanel');
    const loginBtn = document.getElementById('loginBtn');
    if (!panel || !loginBtn) return;
    panel.classList.remove('show');
    panel.setAttribute('aria-hidden', 'true');
    loginBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleLoginPanel() {
    const panel = document.getElementById('loginPanel');
    if (!panel) return;
    if (panel.classList.contains('show')) {
      closeLoginPanel();
    } else {
      setAuthMode('login');
      openLoginPanel();
    }
  }

  function getStoredAccounts() {
    const raw = localStorage.getItem('busanAccounts');
    try {
      return raw ? JSON.parse(raw) : {};
    } catch (error) {
      return {};
    }
  }

  function saveStoredAccounts(accounts) {
    localStorage.setItem('busanAccounts', JSON.stringify(accounts));
  }

  function isValidEmail(value) {
    return FIELD_PATTERNS.email.test(value);
  }

  function isValidPhone(value) {
    return FIELD_PATTERNS.phone.test(value);
  }

  function isValidPassword(value) {
    return FIELD_PATTERNS.password.test(value);
  }

  function isUsernameTaken(username, accounts) {
    return Object.values(accounts).some((account) => account.username === username);
  }

  function isPhoneTaken(phone, accounts) {
    return Object.values(accounts).some((account) => account.phone === phone);
  }

  function showVerifyDialog(message) {
    const dialog = document.getElementById('verifyDialog');
    const messageNode = document.getElementById('verifyMessage');
    if (!dialog || !messageNode) return;
    messageNode.textContent = message;
    dialog.hidden = false;
    dialog.classList.add('show');
  }

  function closeVerifyDialog() {
    const dialog = document.getElementById('verifyDialog');
    if (!dialog) return;
    dialog.hidden = true;
    dialog.classList.remove('show');
  }

  function updateLoginUI() {
    const storedUser = localStorage.getItem('busanUser');
    const loginGreeting = document.getElementById('loginGreeting');
    const loginBtn = document.getElementById('loginBtn');
    if (storedUser) {
      if (loginGreeting) {
        loginGreeting.textContent = storedUser + (currentLang === 'ko' ? '님, 환영합니다.' : (currentLang === 'fr' ? ', bienvenue !' : ', welcome back!'));
      }
      if (loginBtn) {
        loginBtn.setAttribute('aria-label', currentLang === 'ko' ? '내 정보' : (currentLang === 'fr' ? 'Mon compte' : 'My Account'));
      }
    } else {
      if (loginGreeting) loginGreeting.textContent = '';
      if (loginBtn) {
        loginBtn.setAttribute('aria-label', currentLang === 'ko' ? '로그인' : (currentLang === 'fr' ? 'Connexion' : 'Login'));
      }
    }
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-ko]').forEach((node) => {
      const value = node.dataset[lang];
      if (typeof value !== 'undefined') node.textContent = value;
    });

    document.querySelectorAll('[data-ko-placeholder]').forEach((node) => {
      const key = lang === 'ko' ? 'koPlaceholder' : (lang === 'en' ? 'enPlaceholder' : 'frPlaceholder');
      if (node.dataset && node.dataset[key]) node.placeholder = node.dataset[key];
    });

    const btn = document.getElementById('langBtn');
    if (btn) {
      btn.setAttribute('aria-label', LANG_LABELS[lang] || 'Language');
    }

    const menu = document.getElementById('langMenu');
    if (menu) {
      menu.querySelectorAll('.lang-option').forEach(option => {
        option.classList.toggle('active', option.dataset.lang === lang);
      });
    }
  }

  function setLanguage(lang) {
    if (!LANGS.includes(lang)) return;
    currentLang = lang;
    window.currentLang = lang;
    localStorage.setItem('siteLang', lang);
    applyLang(lang);
    applyAuthLabels();
  }

  function closeLangMenu() {
    const menu = document.getElementById('langMenu');
    const button = document.getElementById('langBtn');
    if (menu) {
      menu.classList.remove('show');
      menu.setAttribute('aria-hidden', 'true');
    }
    if (button) {
      button.setAttribute('aria-expanded', 'false');
    }
  }

  function toggleLangMenu() {
    const menu = document.getElementById('langMenu');
    const button = document.getElementById('langBtn');
    if (!menu || !button) return;

    const isOpen = !menu.classList.contains('show');
    menu.classList.toggle('show', isOpen);
    menu.setAttribute('aria-hidden', String(!isOpen));
    button.setAttribute('aria-expanded', String(isOpen));

    if (isOpen) {
      const activeOption = menu.querySelector(`.lang-option[data-lang="${currentLang}"]`);
      if (activeOption) activeOption.focus();
    }
  }

  window.setLanguage = setLanguage;
  window.getCurrentLang = () => currentLang;
  window.currentLang = currentLang;

  document.addEventListener('DOMContentLoaded', () => {
    applyLang(currentLang);
    applyAuthLabels();
    updateLoginUI();

    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
      langBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleLangMenu();
      });
    }

    const menu = document.getElementById('langMenu');
    if (menu) {
      menu.addEventListener('click', (event) => {
        const option = event.target.closest('.lang-option');
        if (!option) return;
        const lang = option.dataset.lang;
        setLanguage(lang);
        closeLangMenu();
      });
    }

    const loginBtn = document.getElementById('loginBtn');
    const loginCloseBtn = document.getElementById('loginCloseBtn');
    const loginPanel = document.getElementById('loginPanel');
    const authForm = document.getElementById('authForm');
    const authStatus = document.getElementById('authStatus');
    const authCancel = document.getElementById('authCancel');
    const authModeInput = document.getElementById('authMode');
    const authPasswordConfirm = document.getElementById('authPasswordConfirm');
    const loginTabs = Array.from(document.querySelectorAll('.tab'));
    const verifyCloseBtn = document.getElementById('verifyCloseBtn');
    const verifyButtons = Array.from(document.querySelectorAll('.verify-btn'));

    function updateLoginUI() {
      const storedUser = localStorage.getItem('busanUser');
      const loginGreeting = document.getElementById('loginGreeting');
      const loginBtn = document.getElementById('loginBtn');
      if (storedUser) {
        if (loginGreeting) {
          loginGreeting.textContent = storedUser + (currentLang === 'ko' ? '님, 환영합니다.' : (currentLang === 'fr' ? ', bienvenue !' : ', welcome back!'));
        }
        if (loginBtn) {
          loginBtn.setAttribute('aria-label', currentLang === 'ko' ? '내 정보' : (currentLang === 'fr' ? 'Mon compte' : 'My Account'));
        }
      } else {
        if (loginGreeting) loginGreeting.textContent = '';
        if (loginBtn) {
          loginBtn.setAttribute('aria-label', currentLang === 'ko' ? '로그인' : (currentLang === 'fr' ? 'Connexion' : 'Login'));
        }
      }
    }

    function clearAuthStatus() {
      if (authStatus) authStatus.textContent = '';
    }

    function closeLoginPanel() {
      if (loginPanel) {
        loginPanel.classList.remove('show');
        loginPanel.setAttribute('aria-hidden', 'true');
      }
      if (loginBtn) loginBtn.setAttribute('aria-expanded', 'false');
      clearAuthStatus();
    }

    function openLoginPanel() {
      if (loginPanel) {
        loginPanel.classList.add('show');
        loginPanel.setAttribute('aria-hidden', 'false');
      }
      if (loginBtn) loginBtn.setAttribute('aria-expanded', 'true');
      setAuthMode('login');
    }

    if (loginBtn) {
      loginBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        if (loginPanel && loginPanel.classList.contains('show')) {
          closeLoginPanel();
        } else {
          openLoginPanel();
        }
      });
    }

    if (loginCloseBtn) {
      loginCloseBtn.addEventListener('click', () => closeLoginPanel());
    }

    loginTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const mode = tab.dataset.tab;
        setAuthMode(mode);
        clearAuthStatus();
      });
    });

    const togglePasswordButtons = Array.from(document.querySelectorAll('.toggle-password'));
    togglePasswordButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const targetId = button.dataset.target;
        const input = document.getElementById(targetId);
        if (!input) return;
        input.type = input.type === 'password' ? 'text' : 'password';
        const isHidden = input.type === 'password';
        button.textContent = isHidden ? '👁' : '🙈';
        button.setAttribute('aria-label', isHidden ? (currentLang === 'ko' ? '비밀번호 보기' : (currentLang === 'fr' ? 'Afficher le mot de passe' : 'Show password')) : (currentLang === 'ko' ? '비밀번호 숨기기' : (currentLang === 'fr' ? 'Masquer le mot de passe' : 'Hide password')));
      });
    });

    if (authCancel) {
      authCancel.addEventListener('click', () => closeLoginPanel());
    }

    if (verifyCloseBtn) {
      verifyCloseBtn.addEventListener('click', () => closeVerifyDialog());
    }

    verifyButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const type = button.dataset.verify;
        const accounts = getStoredAccounts();
        let message = '';

        if (type === 'email') {
          const email = document.getElementById('authEmail')?.value.trim();
          if (!isValidEmail(email)) {
            message = getLoginMessage('emailInvalid');
          } else if (accounts[email]) {
            message = getLoginMessage('emailTaken');
          } else {
            message = getLoginMessage('emailAvailable');
          }
        }

        if (type === 'username') {
          const username = document.getElementById('authUsername')?.value.trim();
          if (!username) {
            message = getLoginMessage('usernameMissing');
          } else if (isUsernameTaken(username, accounts)) {
            message = getLoginMessage('usernameTaken');
          } else {
            message = getLoginMessage('usernameAvailable');
          }
        }

        if (type === 'phone') {
          const phone = document.getElementById('authPhone')?.value.trim();
          if (!isValidPhone(phone)) {
            message = getLoginMessage('phoneInvalid');
          } else if (isPhoneTaken(phone, accounts)) {
            message = getLoginMessage('phoneTaken');
          } else {
            message = getLoginMessage('phoneAvailable');
          }
        }

        if (message) {
          showVerifyDialog(message);
        }
      });
    });

    if (authForm) {
      authForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('authEmail')?.value.trim();
        const password = document.getElementById('authPassword')?.value.trim();
        const username = document.getElementById('authUsername')?.value.trim();
        const phone = document.getElementById('authPhone')?.value.trim();
        const mode = authModeInput?.value || 'login';
        const statusElement = authStatus;
        if (!email || !password) {
          if (statusElement) statusElement.textContent = getLoginMessage('missing');
          return;
        }

        const accounts = getStoredAccounts();

        if (mode === 'signup') {
          const confirmPassword = authPasswordConfirm?.value.trim();
          if (!username) {
            if (statusElement) statusElement.textContent = getLoginMessage('usernameMissing');
            return;
          }
          if (!isValidEmail(email)) {
            if (statusElement) statusElement.textContent = getLoginMessage('emailInvalid');
            return;
          }
          if (!phone || !isValidPhone(phone)) {
            if (statusElement) statusElement.textContent = getLoginMessage('phoneInvalid');
            return;
          }
          if (!isValidPassword(password)) {
            if (statusElement) statusElement.textContent = getLoginMessage('passwordInvalid');
            return;
          }
          if (!confirmPassword || password !== confirmPassword) {
            if (statusElement) statusElement.textContent = getLoginMessage('signupMismatch');
            return;
          }
          if (accounts[email]) {
            if (statusElement) statusElement.textContent = getLoginMessage('alreadyExists');
            return;
          }
          if (isUsernameTaken(username, accounts)) {
            if (statusElement) statusElement.textContent = getLoginMessage('usernameTaken');
            return;
          }

          accounts[email] = {
            password,
            username,
            phone
          };
          saveStoredAccounts(accounts);
          localStorage.setItem('busanUser', email);
          if (statusElement) statusElement.textContent = getLoginMessage('signupSuccess');
          alert('환영합니다');
          updateLoginUI();
          setTimeout(closeLoginPanel, 800);
          return;
        }

        if (!accounts[email] || accounts[email].password !== password) {
          if (statusElement) statusElement.textContent = getLoginMessage('loginFailed');
          return;
        }

        localStorage.setItem('busanUser', email);
        if (statusElement) statusElement.textContent = getLoginMessage('success');
        updateLoginUI();
        setTimeout(closeLoginPanel, 800);
      });
    }

    document.addEventListener('click', (event) => {
      if (!event.target.closest('#langMenu') && !event.target.closest('#langBtn')) {
        closeLangMenu();
      }
      if (!event.target.closest('#loginPanel') && !event.target.closest('#loginBtn')) {
        closeLoginPanel();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeLangMenu();
        closeLoginPanel();
      }
    });
  });
})();
