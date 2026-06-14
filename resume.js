// ── Security ──
document.addEventListener('contextmenu', e => {
  e.preventDefault();
  alert("Right-click is disabled on this page.");
});

document.addEventListener('keydown', e => {
  if ((e.ctrlKey && ['c','x','s','u'].includes(e.key.toLowerCase())) ||
      (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i')) {
    e.preventDefault();
    alert("Copying and viewing source are disabled.");
  }
});

// ── Skill bar animation on scroll/load ──
function animateSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill')
          .forEach(fill => fill.classList.add('animated'));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const grids = document.querySelectorAll('.skill-grid');
  grids.forEach(g => observer.observe(g));
}

// Run after a short delay so the page fade-in completes first
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(animateSkillBars, 400);
});
