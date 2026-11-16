/* ==========================================================
   due-status.js  -  DUE DATE LOGIC
   Decides whether a task is Past Due, Today, Tomorrow or
   Upcoming, and returns the label + badge colour for it.
   ========================================================== */

function getTaskDueStatus(task) {
    if (!task || !task.date) return 'upcoming';

    const now = new Date();
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);

    const tomorrowMidnight = new Date(todayMidnight);
    tomorrowMidnight.setDate(tomorrowMidnight.getDate() + 1);

    const taskEndTimeStr = task.endTime || '23:59';
    const taskEndDateTime = new Date(`${task.date}T${taskEndTimeStr}:00`);
    const taskDateMidnight = new Date(`${task.date}T00:00:00`);

    if (isNaN(taskEndDateTime.getTime()) || isNaN(taskDateMidnight.getTime())) {
        return 'upcoming';
    }

    if (now > taskEndDateTime) {
        return 'past';
    } else if (taskDateMidnight.getTime() === todayMidnight.getTime()) {
        return 'today';
    } else if (taskDateMidnight.getTime() === tomorrowMidnight.getTime()) {
        return 'tomorrow';
    } else {
        return 'upcoming';
    }
}

function getDueStatusInfo(task) {
    const status = getTaskDueStatus(task);
    switch (status) {
        case 'past':
            return { key: 'past', label: 'Past Due', badgeClass: 'bg-red-100 text-red-800' };
        case 'today':
            return { key: 'today', label: 'Today', badgeClass: 'bg-indigo-100 text-indigo-800' };
        case 'tomorrow':
            return { key: 'tomorrow', label: 'Tomorrow', badgeClass: 'bg-amber-100 text-amber-800' };
        case 'upcoming':
        default:
            return { key: 'upcoming', label: 'Upcoming', badgeClass: 'bg-green-100 text-green-800' };
    }
}
