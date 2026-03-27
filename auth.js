// ======================================
// Shark Tank Blog - Auth System (Frontend UI)
// ======================================

document.addEventListener('DOMContentLoaded', function () {
    initAuthUI();
});

function initAuthUI() {
    const navRight = document.querySelector('.nav-right');
    if (!navRight) return;

    const user = getUser();

    // Find or create auth buttons container (insert before Contact Us)
    const contactBtn = navRight.querySelector('.btn-contact');
    const searchToggle = navRight.querySelector('.search-toggle');

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
        // Insert after search toggle
        if (contactBtn) {
            navRight.insertBefore(userEl, contactBtn);
        } else {
            navRight.appendChild(userEl);
        }

        // Toggle dropdown
        userEl.addEventListener('click', function (e) {
            e.stopPropagation();
            document.getElementById('userDropdown').classList.toggle('active');
        });

        document.addEventListener('click', function () {
            const dd = document.getElementById('userDropdown');
            if (dd) dd.classList.remove('active');
        });

        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function (e) {
                e.preventDefault();
                logout();
            });
        }
    } else {
        // Not logged in: show Sign In + Subscribe buttons
        const signinLink = document.createElement('a');
        signinLink.href = 'login.html';
        signinLink.className = 'btn-signin';
        signinLink.textContent = 'Sign In';

        const subscribeLink = document.createElement('a');
        subscribeLink.href = 'subscribe.html';
        subscribeLink.className = 'btn-subscribe-nav';
        subscribeLink.textContent = 'Subscribe';

        if (contactBtn) {
            navRight.insertBefore(subscribeLink, contactBtn);
            navRight.insertBefore(signinLink, subscribeLink);
        } else {
            navRight.appendChild(signinLink);
            navRight.appendChild(subscribeLink);
        }
    }
}

// ---- Auth helpers ----

function getUser() {
    try {
        const data = localStorage.getItem('stb_user');
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

// Demo login function (used by login page)
function demoLogin(method) {
    const user = {
        name: 'Demo User',
        email: 'demo@sharktankblog.com',
        plan: 'free',
        price: '$0',
        method: method || 'magic_link',
        memberSince: new Date().toISOString(),
        avatar: 'D'
    };
    setUser(user);

    // Check for redirect
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    window.location.href = redirect || 'index.html';
}

// Subscribe to a plan
function subscribeToPlan(planName, price) {
    const user = getUser();
    if (!user) {
        window.location.href = 'login.html?redirect=subscribe.html';
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
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
