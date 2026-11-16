/* ==========================================================
   main.js  -  APP ENTRY POINT
   Runs when the page is ready: makes sure a user exists,
   builds the layout, and draws the correct page content.
   Must be loaded LAST (after all the other js/ files).
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Fallback user if currentUser is undefined in auth.js
    if (typeof currentUser === 'undefined' || !currentUser) {
        currentUser = JSON.parse(localStorage.getItem('ots_session')) ||
                      JSON.parse(localStorage.getItem('currentUser')) ||
                      { id: 'default_user', username: 'User' };
    }

    setupLayout();
    renderCurrentView();
});

// Draws whichever page we are on (detects it by the elements that exist)
function renderCurrentView() {
    if (document.getElementById('tasks-container') || document.getElementById('task-list-container')) renderTasks();
    if (document.getElementById('board-past-due')) renderBoard();
    if (document.getElementById('stat-total')) renderDashboard();
}
