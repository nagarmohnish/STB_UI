// ======================================
// Shark Tank Blog - Auth System (Frontend UI)
// Magic Link Login Modal + Nav State
// ======================================

document.addEventListener('DOMContentLoaded', function () {
    initAuthUI();
});

// ---- Modal state ----
var LOGIN_STATE = 'default'; // 'default' | 'loading' | 'success'
var LOGIN_EMAIL = '';

function initAuthUI() {
    const navRight = document.querySelector('.nav-right');
    if (!navRight) return;

    const user = getUser();
    const contactBtn = navRight.querySelector('.btn-contact');

    if (user) {
        // Logged in: show user avatar + dropdown
        const userEl = document.createElement('div');
        userEl.className = 'nav-user';
        userEl.innerHTML = `
            <div class="nav-user-avatar">${user.name.charAt(0).toUpperCase()}</div>
            <span class="nav-user-name">${user.name.split(' ')[0]}</span>
            <div class="nav-user-dropdown" id="userDropdown">
                <a href="subscription.html"><i class="fa fa-crown"></i> My Subscription</a>
                <a href="#" id="logoutBtn"><i class="fa fa-sign-out-alt"></i> Sign Out</a>
            </div>
        `;
        if (contactBtn) {
            navRight.insertBefore(userEl, contactBtn);
        } else {
            navRight.appendChild(userEl);
        }

        userEl.addEventListener('click', function (e) {
            e.stopPropagation();
            document.getElementById('userDropdown').classList.toggle('active');
        });

        document.addEventListener('click', function () {
            const dd = document.getElementById('userDropdown');
            if (dd) dd.classList.remove('active');
        });

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function (e) {
                e.preventDefault();
                logout();
            });
        }
    } else {
        // Not logged in: show Sign In button (opens modal)
        const signinBtn = document.createElement('button');
        signinBtn.className = 'btn-signin';
        signinBtn.textContent = 'Sign In';
        signinBtn.addEventListener('click', function () {
            openLoginModal();
        });

        if (contactBtn) {
            navRight.insertBefore(signinBtn, contactBtn);
        } else {
            navRight.appendChild(signinBtn);
        }
    }
}

// ======================================
// LOGIN MODAL
// ======================================

function openLoginModal() {
    LOGIN_STATE = 'default';
    LOGIN_EMAIL = '';

    var overlay = document.createElement('div');
    overlay.className = 'login-overlay';
    overlay.id = 'loginOverlay';

    overlay.innerHTML = '<div class="login-modal" id="loginModal">' +
        '<button class="login-close" id="loginClose">&times;</button>' +
        '<div class="login-body" id="loginBody"></div>' +
        '</div>';

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Trigger fade-in
    requestAnimationFrame(function () {
        overlay.classList.add('active');
    });

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeLoginModal();
    });
    document.getElementById('loginClose').addEventListener('click', closeLoginModal);
    document.addEventListener('keydown', loginEscHandler);

    renderLoginState();
}

function closeLoginModal() {
    var overlay = document.getElementById('loginOverlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    setTimeout(function () {
        overlay.remove();
        document.body.style.overflow = '';
    }, 200);
    document.removeEventListener('keydown', loginEscHandler);
}

function loginEscHandler(e) {
    if (e.key === 'Escape') closeLoginModal();
}

function renderLoginState() {
    var body = document.getElementById('loginBody');
    if (!body) return;

    if (LOGIN_STATE === 'default') {
        body.innerHTML = renderDefault();
        bindDefaultEvents();
    } else if (LOGIN_STATE === 'loading') {
        body.innerHTML = renderLoading();
    } else if (LOGIN_STATE === 'success') {
        body.innerHTML = renderSuccess();
        bindSuccessEvents();
        // Auto-close after 5 seconds
        setTimeout(function () {
            var overlay = document.getElementById('loginOverlay');
            if (overlay && LOGIN_STATE === 'success') {
                demoLogin('magic_link');
            }
        }, 5000);
    }
}

// ---- Default State ----
function renderDefault() {
    return '<h2 class="login-title">Sign in to Shark Tank Blog</h2>' +
        '<div class="login-form">' +
            '<label class="login-label" for="loginEmail">Email address</label>' +
            '<input type="email" class="login-input" id="loginEmail" placeholder="you@example.com" autocomplete="email">' +
            '<div class="login-error" id="loginError"></div>' +
            '<button class="login-cta" id="loginSend">Send Magic Link</button>' +
        '</div>' +
        '<div class="login-divider"><span>or</span></div>' +
        '<button class="login-google" id="loginGoogle">' +
            '<svg width="18" height="18" viewBox="0 0 48 48"><path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>' +
            'Sign in with Google' +
        '</button>';
}

function bindDefaultEvents() {
    var input = document.getElementById('loginEmail');
    var btn = document.getElementById('loginSend');
    var error = document.getElementById('loginError');
    var google = document.getElementById('loginGoogle');

    // Enter key
    if (input) {
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') handleSendLink();
        });
        // Auto-focus
        setTimeout(function () { input.focus(); }, 100);
    }

    if (btn) btn.addEventListener('click', handleSendLink);

    if (google) {
        google.addEventListener('click', function () {
            demoLogin('google');
        });
    }

    function handleSendLink() {
        var email = input.value.trim();
        error.textContent = '';
        error.classList.remove('visible');

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            error.textContent = 'Please enter a valid email address.';
            error.classList.add('visible');
            input.focus();
            return;
        }

        LOGIN_EMAIL = email;
        LOGIN_STATE = 'loading';
        renderLoginState();

        // Fake 2s delay
        setTimeout(function () {
            LOGIN_STATE = 'success';
            renderLoginState();
        }, 2000);
    }
}

// ---- Loading State ----
function renderLoading() {
    return '<h2 class="login-title">Sending link...</h2>' +
        '<div class="login-form">' +
            '<input type="email" class="login-input" value="' + LOGIN_EMAIL + '" disabled>' +
            '<button class="login-cta loading" disabled>' +
                '<span class="login-spinner"></span> Sending...' +
            '</button>' +
        '</div>';
}

// ---- Success State ----
function renderSuccess() {
    return '<div class="login-success">' +
            '<div class="login-check">&#10003;</div>' +
            '<h2 class="login-title">Check your email!</h2>' +
            '<p class="login-success-text">We sent a login link to <strong>' + LOGIN_EMAIL + '</strong></p>' +
            '<button class="login-resend" id="loginResend">Resend link</button>' +
        '</div>';
}

function bindSuccessEvents() {
    var resend = document.getElementById('loginResend');
    if (resend) {
        resend.addEventListener('click', function () {
            LOGIN_STATE = 'loading';
            renderLoginState();
            setTimeout(function () {
                LOGIN_STATE = 'success';
                renderLoginState();
            }, 2000);
        });
    }
}

// ======================================
// AUTH HELPERS
// ======================================

function getUser() {
    try {
        var data = localStorage.getItem('stb_user');
        return data ? JSON.parse(data) : null;
    } catch (e) {
        return null;
    }
}

function setUser(user) {
    localStorage.setItem('stb_user', JSON.stringify(user));
}

function logout() {
    localStorage.removeItem('stb_user');
    window.location.href = 'index.html';
}

function demoLogin(method) {
    var user = {
        name: 'Demo User',
        email: LOGIN_EMAIL || 'demo@sharktankblog.com',
        plan: 'free',
        price: '$0',
        method: method || 'magic_link',
        memberSince: new Date().toISOString(),
        avatar: 'D'
    };
    setUser(user);
    closeLoginModal();

    var params = new URLSearchParams(window.location.search);
    var redirect = params.get('redirect');
    window.location.href = redirect || window.location.href;
}

function subscribeToPlan(planName, price) {
    var user = getUser();
    if (!user) {
        openLoginModal();
        return;
    }
    user.plan = planName;
    user.price = price;
    user.billingCycle = 'Monthly';
    user.nextBilling = getNextMonth();
    user.paymentMethod = 'Visa ending in 4242';
    setUser(user);
    window.location.href = 'subscription.html';
}

function getNextMonth() {
    var d = new Date();
    d.setMonth(d.getMonth() + 1);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
