/* ==========================================================
   render-board.js  -  SCHEDULE BOARD PAGE (board.html)
   Sorts pending tasks into 4 columns:
   Past Due / Today / Tomorrow / Upcoming.
   ========================================================== */

function renderBoard() {
    const userTasks = getUserTasks();
    const cols = { past: '', today: '', tomorrow: '', upcoming: '' };

    userTasks.filter(t => !t.isCompleted).forEach(task => {
        const safeTitle = escapeHTML(task.title);
        const html = `
            <li>
                <article class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h3 class="mb-1 font-bold">${safeTitle}</h3>
                    <p class="mb-2 text-sm font-semibold text-slate-600">${task.startTime || '09:00'} - ${task.endTime || '10:00'}</p>
                    <p class="mb-3"><span class="${BADGE} ${getCategoryColor(task.category)}">${task.category}</span></p>
                    <div class="flex items-center justify-between text-sm font-semibold text-slate-600">
                        <time datetime="${task.date}">${task.date}</time>
                        <button type="button" class="rounded-md border border-emerald-300 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50" aria-label="Mark &quot;${safeTitle}&quot; as complete" onclick="toggleTaskStatus('${task.id}')">Complete</button>
                    </div>
                </article>
            </li>
        `;

        const dueStatus = getTaskDueStatus(task);
        if (dueStatus === 'past') {
            cols.past += html;
        } else if (dueStatus === 'today') {
            cols.today += html;
        } else if (dueStatus === 'tomorrow') {
            cols.tomorrow += html;
        } else {
            cols.upcoming += html;
        }
    });

    const empty = text => `<li class="py-2 text-center text-sm text-slate-500">${text}</li>`;

    document.getElementById('board-past-due').innerHTML = cols.past || empty('No past due tasks');
    document.getElementById('board-today').innerHTML = cols.today || empty('No tasks today');
    document.getElementById('board-tomorrow').innerHTML = cols.tomorrow || empty('No tasks tomorrow');
    document.getElementById('board-upcoming').innerHTML = cols.upcoming || empty('No upcoming tasks');
}
