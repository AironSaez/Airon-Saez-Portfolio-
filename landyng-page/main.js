// Toggle de tema claro/oscuro (añade/remueve .dark en <html>)
const toggle = document.getElementById('themeToggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });
}

// Resaltado de sección activa en el menú
const links = Array.from(document.querySelectorAll('.nav a'));
const targets = links
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const id = '#' + entry.target.id;
      const link = links.find(a => a.getAttribute('href') === id);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(a => a.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'page');
      }
    });
  },
  { threshold: 0.3 }
);

targets.forEach(t => io.observe(t));

// Scroll suave del botón flotante
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-scroll]');
  if (!btn) return;
  const target = document.querySelector(btn.dataset.scroll);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
});
