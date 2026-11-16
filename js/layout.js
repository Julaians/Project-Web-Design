/* ==========================================================
   layout.js  -  PAGE LAYOUT (navbar, sidebar, modal, filters)
   Prepares the parts shared by every page after it loads.
   ========================================================== */

function setupLayout() {
    setupNavbarUsername();
    setupNavbarToggle();
    setupSidebar();
    setupTaskModal();      // see task-modal.js
    setupFilterListeners();
}

function setupNavbarUsername() {
    const navUsername = document.getElementById('nav-username');
    if (navUsername && currentUser && currentUser.username) {
        navUsername.textContent = currentUser.username;
    }
}

// Mobile menu button: shows / hides the navigation links
function setupNavbarToggle() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('navbarNav');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isHidden = menu.classList.toggle('hidden');
        toggle.setAttribute('aria-expanded', String(!isHidden));
    });
}

function setupSidebar() {
    const sidebar = document.getElementById('sidebar-nav');
    if (!sidebar) return;

    const currentPage = window.location.pathname.split("/").pop() || 'dashboard.html';
    const linkClass = 'block rounded-lg px-3 py-2 text-white hover:bg-slate-700 aria-[current=page]:bg-indigo-600';
    const current = page => (currentPage === page ? 'aria-current="page"' : '');

    sidebar.innerHTML = `
        <p class="mb-4 text-2xl font-bold text-indigo-400">PlanIt.</p>
        <p class="mb-4 border-b border-slate-600 pb-3 text-sm text-white">
            Logged in as:<br><strong class="text-base">${escapeHTML(currentUser.username)}</strong>
        </p>
        <ul class="mb-auto flex flex-col gap-2">
            <li><a href="dashboard.html" ${current('dashboard.html')} class="${linkClass}">Dashboard</a></li>
            <li><a href="tasks.html" ${current('tasks.html')} class="${linkClass}">Task List</a></li>
            <li><a href="board.html" ${current('board.html')} class="${linkClass}">Schedule Board</a></li>
            <li class="mt-3"><button type="button" data-open-task-modal class="w-full rounded-lg bg-indigo-600 px-3 py-2 text-left font-bold text-white hover:bg-indigo-500">+ New Task</button></li>
        </ul>
        <button type="button" onclick="logout()" class="mt-4 rounded-lg border border-red-400 px-3 py-2 font-bold text-red-300 hover:bg-red-950">Log Out</button>
    `;
}

function setupFilterListeners() {
    const searchTask = document.getElementById('search-task') || document.getElementById('search-input');
    if (searchTask) {
        searchTask.addEventListener('input', renderTasks);
    }
    ['filter-due', 'filter-category', 'filter-priority', 'filter-status'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', renderTasks);
        }
    });
}
