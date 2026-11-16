/* ==========================================================
   storage.js  -  LOCAL STORAGE
   Loads and saves tasks in the browser's localStorage and
   returns only the tasks that belong to the logged-in user.
   ========================================================== */

const TASKS_KEY = 'ots_tasks';
let allTasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || [];

function getUserTasks() {
    if (!currentUser) return allTasks;
    return allTasks.filter(task => !task.userId || task.userId === currentUser.id);
}

function saveTasksToStorage() {
    localStorage.setItem(TASKS_KEY, JSON.stringify(allTasks));
}
