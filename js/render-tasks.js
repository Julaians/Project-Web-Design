/* ==========================================================
   render-tasks.js  -  TASK LIST PAGE (tasks.html)
   Applies the search box + filters, then draws the task cards
   as <li><article> items inside the #tasks-container <ul>.
   ========================================================== */

function renderTasks() {
    const container = document.getElementById('tasks-container') || document.getElementById('task-list-container');
    if (!container) return;

    const userTasks = getUserTasks();
    const searchInput = document.getElementById('search-task') || document.getElementById('search-input');
    const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';

    const dueFilterEl = document.getElementById('filter-due');
    const filterDue = dueFilterEl ? dueFilterEl.value.toLowerCase() : 'all';

    const categoryFilterEl = document.getElementById('filter-category');
    const filterCategory = categoryFilterEl ? categoryFilterEl.value : 'all';

    const priorityFilterEl = document.getElementById('filter-priority');
    const filterPriority = priorityFilterEl ? priorityFilterEl.value : 'all';

    const statusFilterEl = document.getElementById('filter-status');
    const filterStatus = statusFilterEl ? statusFilterEl.value : 'all';

    const searchWords = searchQuery.split(' ').filter(word => word.trim() !== '');

    const filtered = userTasks.filter(task => {
        const taskTitleLower = task.title.toLowerCase();
        const matchesSearch = searchWords.every(word => taskTitleLower.includes(word));

        const taskDueStatus = getTaskDueStatus(task);
        const matchesDue = filterDue === 'all' ||
            filterDue === taskDueStatus ||
            (filterDue === 'past due' && taskDueStatus === 'past');

        const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
        const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
        const matchesStatus = filterStatus === 'all' ||
            (filterStatus === 'completed' && task.isCompleted) ||
            (filterStatus === 'pending' && !task.isCompleted);

        return matchesSearch && matchesDue && matchesCategory && matchesPriority && matchesStatus;
    });

    if (filtered.length === 0) {
        container.innerHTML = '<li class="col-span-full py-12 text-center text-slate-500">No tasks found matching your filters.</li>';
        return;
    }

    container.innerHTML = filtered.map(task => {
        const dueInfo = getDueStatusInfo(task);
        const safeTitle = escapeHTML(task.title);
        return `
        <li class="flex">
            <article class="flex w-full flex-col rounded-xl border border-l-4 border-slate-200 bg-white p-4 shadow-sm ${task.isCompleted ? 'border-l-green-500 opacity-75' : 'border-l-indigo-500'}">
                <div class="mb-2 flex items-start justify-between gap-2">
                    <h2 class="text-lg font-bold ${task.isCompleted ? 'text-slate-500 line-through' : ''}">${safeTitle}</h2>
                    <input class="mt-1.5 size-4 shrink-0 accent-indigo-600" type="checkbox" ${task.isCompleted ? 'checked' : ''} aria-label="Mark &quot;${safeTitle}&quot; as completed" onchange="toggleTaskStatus('${task.id}')">
                </div>
                <div class="mb-2 flex flex-wrap gap-1">
                    <span class="${BADGE} ${dueInfo.badgeClass}">${dueInfo.label}</span>
                    <span class="${BADGE} ${getCategoryColor(task.category)}">${task.category}</span>
                    <span class="${BADGE} ${getPriorityColor(task.priority)}">${task.priority}</span>
                </div>
                <p class="mb-3 text-sm font-semibold text-slate-600">
                    Time: ${task.startTime || '09:00'} - ${task.endTime || '10:00'}
                </p>
                <footer class="mt-auto flex items-center justify-between border-t border-slate-200 pt-3 text-sm font-semibold text-slate-600">
                    <span>Date: <time datetime="${task.date}">${task.date}</time></span>
                    <div class="flex gap-1">
                        <button type="button" class="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100" aria-label="Edit &quot;${safeTitle}&quot;" onclick="editTask('${task.id}')">Edit</button>
                        <button type="button" class="rounded-md border border-red-300 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-50" aria-label="Delete &quot;${safeTitle}&quot;" onclick="deleteTask('${task.id}')">Delete</button>
                    </div>
                </footer>
            </article>
        </li>
    `;
    }).join('');
}
