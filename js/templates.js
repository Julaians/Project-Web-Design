/* ==========================================================
   templates.js  -  LOAD TASK TEMPLATES FROM THE API
   Fetches ready-made tasks from the json-server API
   (http://localhost:3000/templates, started with "npm run api")
   and adds them to the user's task list.
   ========================================================== */

async function fetchTemplates() {
    const btn = document.querySelector('button[onclick*="fetchTemplates"]');
    const originalText = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<svg class="mr-2 size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>Loading...';
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    try {
        const response = await fetch('http://localhost:3000/templates', {
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`API server responded with status ${response.status}`);
        }

        const templates = await response.json();

        if (!Array.isArray(templates) || templates.length === 0) {
            showNotification('No templates found on server.', 'warning');
            return;
        }

        templates.forEach(tpl => {
            const newTask = {
                id: 'task_' + Date.now() + Math.random().toString(16).slice(2),
                userId: currentUser.id,
                title: tpl.title,
                date: tpl.date,
                startTime: tpl.startTime,
                endTime: tpl.endTime,
                category: tpl.category,
                priority: tpl.priority,
                isCompleted: false,
                completedAt: null
            };
            allTasks.push(newTask);
        });

        saveTasksToStorage();
        renderCurrentView();
        showNotification(`${templates.length} task templates imported successfully!`, 'success');

    } catch (error) {
        clearTimeout(timeoutId);
        console.warn('API server connection failed:', error);
        showNotification('Warning: API server is offline! Please run "npm run api" in your terminal first to load templates.', 'warning');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    }
}

window.fetchTemplates = fetchTemplates;
window.addTemplate = fetchTemplates;
window.addTemplates = fetchTemplates;
