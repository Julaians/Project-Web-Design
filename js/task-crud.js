/* ==========================================================
   task-crud.js  -  CREATE / READ(edit) / UPDATE / DELETE
   Everything that changes a task: add, edit, mark complete,
   delete. Every change is saved and the screen is re-drawn.
   ========================================================== */

// CREATE + UPDATE (runs when the modal form is submitted)
function handleTaskSubmit(e) {
    e.preventDefault();

    const { isValid, values } = validateTaskForm();
    if (!isValid) return;

    const { id, title, date, startTime, endTime, category, priority } = values;

    if (id) {
        // UPDATE existing task
        allTasks = allTasks.map(task => {
            if (task.id === id) {
                return { ...task, title, date, startTime, endTime, category, priority };
            }
            return task;
        });
        showNotification('Task updated successfully!');
    } else {
        // CREATE new task
        const newTask = {
            id: 'task_' + Date.now(),
            userId: currentUser.id,
            title,
            date,
            startTime,
            endTime,
            category,
            priority,
            isCompleted: false
        };
        allTasks.push(newTask);
        showNotification('Task added successfully!');
    }

    saveTasksToStorage();
    closeTaskModal();   // see task-modal.js
    renderCurrentView();
}

// UPDATE (complete / un-complete a task)
function toggleTaskStatus(id) {
    allTasks = allTasks.map(t => {
        if (t.id === id) {
            const isNowCompleted = !t.isCompleted;
            return {
                ...t,
                isCompleted: isNowCompleted,
                completedAt: isNowCompleted ? new Date().toISOString() : null
            };
        }
        return t;
    });
    saveTasksToStorage();
    renderCurrentView();
}

// DELETE
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        allTasks = allTasks.filter(t => t.id !== id);
        saveTasksToStorage();
        renderCurrentView();
        showNotification('Task deleted.', 'error');
    }
}

// EDIT (fills the modal with the task's data, then opens it)
window.editTask = function (id) {
    const task = allTasks.find(t => t.id === id);
    if (!task) return;

    const modalEl = document.getElementById('taskModal');
    if (!modalEl) return;

    document.getElementById('task-id').value = task.id;
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-date').value = task.date;
    document.getElementById('task-start-time').value = task.startTime || '09:00';
    document.getElementById('task-end-time').value = task.endTime || '10:00';
    document.getElementById('task-category').value = task.category;
    document.getElementById('task-priority').value = task.priority;
    document.getElementById('modal-title').textContent = 'Edit Task';

    openTaskModal();   // see task-modal.js
};