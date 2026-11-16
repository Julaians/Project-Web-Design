/* ==========================================================
   task-modal.js  -  ADD / EDIT TASK POP-UP (MODAL)
   Builds the modal's HTML (a native <dialog>), connects its
   events, and resets the form back to default values.
   Any element with a data-open-task-modal attribute opens it.
   ========================================================== */

const MODAL_LABEL = 'mb-1 block text-sm font-semibold text-slate-700';
const MODAL_INPUT = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200';
const MODAL_ERROR = 'mt-1 text-sm text-red-600';

function openTaskModal() {
    const dialog = document.getElementById('taskModal');
    if (dialog && !dialog.open) dialog.showModal();
}

function closeTaskModal() {
    const dialog = document.getElementById('taskModal');
    if (dialog && dialog.open) dialog.close();
}

function setupTaskModal() {
    let modalContainer = document.getElementById('modal-container');
    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';
        document.body.appendChild(modalContainer);
    }

    if (document.getElementById('taskModal')) return;

    modalContainer.innerHTML = `
        <dialog id="taskModal" aria-labelledby="modal-title" class="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-900/50">
            <header class="flex items-center justify-between rounded-t-2xl border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h2 id="modal-title" class="text-lg font-bold">Add New Task</h2>
                <button type="button" data-close-modal aria-label="Close" class="rounded px-2 text-2xl leading-none text-slate-500 hover:text-slate-900">×</button>
            </header>
            <form id="task-form" class="space-y-4 p-6" novalidate>
                <input type="hidden" id="task-id">

                <div>
                    <label class="${MODAL_LABEL}" for="task-title">Task Title</label>
                    <input type="text" id="task-title" class="${MODAL_INPUT}" placeholder="Enter task title" aria-describedby="title-error" autofocus>
                    <p class="${MODAL_ERROR}" id="title-error" aria-live="polite"></p>
                </div>

                <!-- Date Picker -->
                <div>
                    <label class="${MODAL_LABEL}" for="task-date">Date</label>
                    <input type="date" id="task-date" class="${MODAL_INPUT}" aria-describedby="date-error">
                    <p class="${MODAL_ERROR}" id="date-error" aria-live="polite"></p>
                </div>

                <!-- Time Range (Start & End) -->
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="${MODAL_LABEL}" for="task-start-time">Start Time</label>
                        <input type="time" id="task-start-time" class="${MODAL_INPUT}" value="09:00" aria-describedby="start-time-error">
                        <p class="${MODAL_ERROR}" id="start-time-error" aria-live="polite"></p>
                    </div>
                    <div>
                        <label class="${MODAL_LABEL}" for="task-end-time">End Time</label>
                        <input type="time" id="task-end-time" class="${MODAL_INPUT}" value="10:00" aria-describedby="end-time-error">
                        <p class="${MODAL_ERROR}" id="end-time-error" aria-live="polite"></p>
                    </div>
                </div>

                <div>
                    <label class="${MODAL_LABEL}" for="task-category">Category</label>
                    <select id="task-category" class="${MODAL_INPUT}" aria-describedby="category-error">
                        <option value="">Select Category...</option>
                        <option value="Study">Study</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                    </select>
                    <p class="${MODAL_ERROR}" id="category-error" aria-live="polite"></p>
                </div>

                <div>
                    <label class="${MODAL_LABEL}" for="task-priority">Priority</label>
                    <select id="task-priority" class="${MODAL_INPUT}">
                        <option value="Low">Low</option>
                        <option value="Medium" selected>Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <button type="submit" class="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save Task</button>
            </form>
        </dialog>
    `;

    const taskForm = document.getElementById('task-form');
    if (taskForm) {
        taskForm.addEventListener('submit', handleTaskSubmit);
    }

    const dialog = document.getElementById('taskModal');
    if (dialog) {
        // Reset the form whenever the dialog closes (Esc, X button, backdrop, or after saving)
        dialog.addEventListener('close', resetForm);
        // Clicking the dark backdrop closes it
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) closeTaskModal();
        });
        const closeBtn = dialog.querySelector('[data-close-modal]');
        if (closeBtn) closeBtn.addEventListener('click', closeTaskModal);
    }

    // Any "Add Task" style button opens a fresh form
    document.addEventListener('click', (e) => {
        if (e.target.closest('[data-open-task-modal]')) {
            resetForm();
            openTaskModal();
        }
    });
}

function resetForm() {
    const form = document.getElementById('task-form');
    if (form) form.reset();

    const idEl = document.getElementById('task-id');
    if (idEl) idEl.value = '';

    const titleEl = document.getElementById('modal-title');
    if (titleEl) titleEl.textContent = 'Add New Task';

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateEl = document.getElementById('task-date');
    if (dateEl) dateEl.value = `${year}-${month}-${day}`;

    const startTimeEl = document.getElementById('task-start-time');
    if (startTimeEl) startTimeEl.value = '09:00';
    const endTimeEl = document.getElementById('task-end-time');
    if (endTimeEl) endTimeEl.value = '10:00';

    ['title-error', 'date-error', 'start-time-error', 'end-time-error', 'category-error'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '';
    });
}
