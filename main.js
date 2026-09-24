// Theme persistence
(function() {
  const savedTheme = localStorage.getItem('harshil-theme') || 'dark';
  if (savedTheme === 'warm') {
    document.documentElement.setAttribute('data-theme', 'warm');
  }
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const target = current === 'warm' ? 'dark' : 'warm';
  if (target === 'warm') {
    document.documentElement.setAttribute('data-theme', 'warm');
    localStorage.setItem('harshil-theme', 'warm');
    updateThemeBtnText('DARK');
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('harshil-theme', 'dark');
    updateThemeBtnText('LIGHT');
  }
}

function updateThemeBtnText(text) {
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = text;
}

document.addEventListener('DOMContentLoaded', () => {
  const isWarm = document.documentElement.getAttribute('data-theme') === 'warm';
  updateThemeBtnText(isWarm ? 'DARK' : 'LIGHT');
});
