const USERS_KEY = 'planit_users';
const SESSION_KEY = 'planit_session';

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function checkAuth() {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY));
    const path = window.location.pathname;
    const isAuthPage = path.includes('login.html') || path.includes('register.html');

    if (!session && !isAuthPage) {
        window.location.href = 'login.html';
    } else if (session && isAuthPage) {
        window.location.href = 'dashboard.html';
    }

    return session;
}

const currentUser = checkAuth();

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const errorDiv = document.getElementById('auth-error');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const users = getUsers();

            const userMatch = users.find(u => u.username === username && u.password === password);

            if (userMatch) {
                localStorage.setItem(SESSION_KEY, JSON.stringify({ id: userMatch.id, username: userMatch.username }));
                window.location.href = 'dashboard.html';
            } else {
                errorDiv.textContent = 'Invalid username or password.';
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('reg-username').value.trim();
            const password = document.getElementById('reg-password').value.trim();
            const users = getUsers();

            if (users.some(u => u.username === username)) {
                errorDiv.textContent = 'Username already exists.';
                return;
            }

            const newUser = { id: 'user_' + Date.now(), username, password };
            users.push(newUser);
            localStorage.setItem(USERS_KEY, JSON.stringify(users));

            localStorage.setItem(SESSION_KEY, JSON.stringify({ id: newUser.id, username: newUser.username }));
            window.location.href = 'dashboard.html';
        });
    }
});

function logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'login.html';
}