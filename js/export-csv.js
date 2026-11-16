/* ==========================================================
   export-csv.js  -  EXPORT TO CSV
   Downloads the logged-in user's tasks as a .csv file.
   ========================================================== */

function exportToCSV() {
    const userTasks = getUserTasks();
    if (userTasks.length === 0) return showNotification('No tasks to export.', 'error');

    const headers = ['ID', 'Title', 'Date', 'Start Time', 'End Time', 'Category', 'Priority', 'Status'];
    const csvRows = userTasks.map(task => [
        task.id,
        `"${task.title.replace(/"/g, '""')}"`,
        task.date,
        task.startTime || 'N/A',
        task.endTime || 'N/A',
        task.category,
        task.priority,
        task.isCompleted ? 'Completed' : 'Pending'
    ].join(','));

    const blob = new Blob([[headers.join(','), ...csvRows].join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `OnlineTaskScheduler_${currentUser.username}_tasks.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    showNotification('Tasks exported to CSV successfully!');
}
