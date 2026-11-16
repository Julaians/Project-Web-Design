/* ==========================================================
   utils.js  -  SMALL HELPER FUNCTIONS
   Reusable helpers: HTML escaping (security) and the Tailwind
   badge colours for categories and priorities.
   ========================================================== */

// Shape shared by every badge (colour classes are added per badge)
const BADGE = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold';

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}

function getCategoryColor(cat) {
    return {
        'Study': 'bg-blue-100 text-blue-800',
        'Work': 'bg-amber-100 text-amber-800',
        'Personal': 'bg-rose-100 text-rose-800'
    }[cat] || 'bg-slate-100 text-slate-700';
}

function getPriorityColor(pri) {
    return {
        'High': 'bg-red-100 text-red-800',
        'Medium': 'bg-slate-200 text-slate-700',
        'Low': 'bg-green-100 text-green-800'
    }[pri] || 'bg-slate-200 text-slate-700';
}
