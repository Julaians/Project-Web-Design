/* ==========================================================
   task-validation.js  -  FORM VALIDATION
   Reads the Add/Edit Task form, checks every field and shows
   the red error messages. Returns { isValid, values }.
   ========================================================== */

function validateTaskForm() {
    const values = {
        id: document.getElementById('task-id').value,
        title: document.getElementById('task-title').value.trim(),
        date: document.getElementById('task-date').value,
        startTime: document.getElementById('task-start-time').value,
        endTime: document.getElementById('task-end-time').value,
        category: document.getElementById('task-category').value,
        priority: document.getElementById('task-priority').value
    };
    const { title, date, startTime, endTime, category } = values;

    // Clear old error messages
    document.getElementById('title-error').textContent = '';
    document.getElementById('date-error').textContent = '';
    document.getElementById('start-time-error').textContent = '';
    document.getElementById('end-time-error').textContent = '';
    document.getElementById('category-error').textContent = '';

    let isValid = true;

    if (!title) {
        document.getElementById('title-error').textContent = 'Task title is required.';
        isValid = false;
    }

    if (!date) {
        document.getElementById('date-error').textContent = 'Date is required.';
        isValid = false;
    } else {
        const selectedDate = new Date(date + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            document.getElementById('date-error').textContent = 'Cannot select a past date.';
            isValid = false;
        }
    }

    if (!startTime) {
        document.getElementById('start-time-error').textContent = 'Required.';
        isValid = false;
    }
    if (!endTime) {
        document.getElementById('end-time-error').textContent = 'Required.';
        isValid = false;
    } else if (startTime && endTime <= startTime) {
        document.getElementById('end-time-error').textContent = 'End time must be after start time.';
        isValid = false;
    }

    if (!category) {
        document.getElementById('category-error').textContent = 'Category is required.';
        isValid = false;
    }

    return { isValid, values };
}
