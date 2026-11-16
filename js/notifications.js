/* ==========================================================
   notifications.js  -  TOAST NOTIFICATIONS
   Shows the small success / warning / error message at the
   bottom-right corner of the screen.
   ========================================================== */

function showNotification(message, type = 'success') {
    const styles = {
        success: { box: 'border-green-200 bg-green-50 text-green-900', icon: '✅', role: 'status' },
        danger:  { box: 'border-red-200 bg-red-50 text-red-900', icon: '❌', role: 'alert' },
        warning: { box: 'border-amber-200 bg-amber-50 text-amber-900', icon: '⚠️', role: 'alert' }
    };

    let key = 'success';
    if (type === 'error' || type === 'danger') key = 'danger';
    else if (type === 'warning') key = 'warning';
    const style = styles[key];

    // Dismiss any existing notification toast
    const existing = document.querySelector('.custom-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `custom-toast fixed bottom-4 right-4 z-[9999] flex max-w-md items-center gap-3 rounded-xl border px-4 py-3 shadow-lg transition-opacity duration-200 ${style.box}`;
    toast.setAttribute('role', style.role);

    const icon = document.createElement('span');
    icon.className = 'text-xl';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = style.icon;

    const text = document.createElement('p');
    text.className = 'text-sm font-semibold';
    text.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'ml-auto rounded px-1 text-xl leading-none opacity-60 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2';
    closeBtn.setAttribute('aria-label', 'Dismiss notification');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => toast.remove());

    toast.append(icon, text, closeBtn);
    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast.isConnected) {
            toast.classList.add('opacity-0');
            setTimeout(() => toast.remove(), 250);
        }
    }, 4500);
}
