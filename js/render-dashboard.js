/* ==========================================================
   render-dashboard.js  -  DASHBOARD PAGE (dashboard.html)
   Calculates the statistic numbers and draws the two Chart.js
   charts (task status doughnut + tasks-by-category bar).
   ========================================================== */

let statusChart, categoryChart;

function renderDashboard() {
    // Allows imported templates to be included in dashboard stats
    const userTasks = allTasks.filter(task => !task.userId || (currentUser && task.userId === currentUser.id));
    const total = userTasks.length;

    let compOnTime = 0;
    let compLate = 0;
    let pending = 0;
    const now = new Date();

    userTasks.forEach(t => {
        if (t.isCompleted) {
            const taskEndDateTime = new Date(`${t.date}T${t.endTime || '23:59'}:00`);
            const completedTime = t.completedAt ? new Date(t.completedAt) : now;

            if (completedTime > taskEndDateTime) {
                compLate++;
            } else {
                compOnTime++;
            }
        } else {
            pending++;
        }
    });

    const totalCompleted = compOnTime + compLate;

    // ----- Stat cards -----
    const statTotalEl = document.getElementById('stat-total');
    const statCompEl = document.getElementById('stat-completed');
    const statLateEl = document.getElementById('stat-late');
    const statPendEl = document.getElementById('stat-pending');

    if (statTotalEl) statTotalEl.textContent = total;
    if (statCompEl) statCompEl.textContent = totalCompleted;
    if (statLateEl) statLateEl.textContent = compLate;
    if (statPendEl) statPendEl.textContent = pending;

    // ----- Status doughnut chart -----
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx && typeof Chart !== 'undefined') {
        if (statusChart) statusChart.destroy();
        statusChart = new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Completed (On Time)', 'Completed (Late)', 'Pending'],
                datasets: [{
                    data: [compOnTime, compLate, pending],
                    backgroundColor: ['#198754', '#dc3545', '#ffc107'],
                    borderWidth: 0
                }]
            },
            options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
        });
    }

    // ----- Category bar chart -----
    const catCtx = document.getElementById('categoryChart');
    if (catCtx && typeof Chart !== 'undefined') {
        const catCounts = { Study: 0, Work: 0, Personal: 0 };
        userTasks.forEach(t => { if (catCounts[t.category] !== undefined) catCounts[t.category]++; });

        if (categoryChart) categoryChart.destroy();
        categoryChart = new Chart(catCtx, {
            type: 'bar',
            data: {
                labels: ['Study', 'Work', 'Personal'],
                datasets: [{
                    label: 'Tasks',
                    data: [catCounts.Study, catCounts.Work, catCounts.Personal],
                    backgroundColor: ['#0d6efd', '#ffc107', '#dc3545'],
                    borderRadius: 4
                }]
            },
            options: { responsive: true, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }, plugins: { legend: { display: false } } }
        });
    }
}
