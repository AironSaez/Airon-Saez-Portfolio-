// ------- Menú móvil -------
const menuBtn = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  // Cerrar al hacer click en un enlace
  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      menu.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    })
  );
}

// ------- Resaltado de sección activa -------
const links = Array.from(document.querySelectorAll('.menu a'));
const targets = links
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = `#${entry.target.id}`;
    const link = links.find(a => a.getAttribute('href') === id);
    if (!link) return;
    if (entry.isIntersecting) {
      links.forEach(a => a.removeAttribute('aria-current'));
      link.setAttribute('aria-current', 'page');
    }
  });
}, { threshold: 0.5 });

targets.forEach(t => io.observe(t));

// ------- Scroll suave para botones con data-scroll -------
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-scroll]');
  if (!btn) return;
  const target = document.querySelector(btn.dataset.scroll);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
});

// ------- Filtros de proyectos -------
const chipButtons = Array.from(document.querySelectorAll('.chip[data-filter]'));
const cards = Array.from(document.querySelectorAll('.card[data-tags]'));

function setFilter(tag) {
  chipButtons.forEach(b => b.classList.toggle('is-active', b.dataset.filter === tag || (tag === 'all' && b.dataset.filter === 'all')));
  cards.forEach(card => {
    const ok = tag === 'all' || (card.dataset.tags || '').includes(tag);
    card.style.display = ok ? '' : 'none';
  });
}

chipButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    chipButtons.forEach(b => b.setAttribute('aria-selected', 'false'));
    btn.setAttribute('aria-selected', 'true');
    setFilter(btn.dataset.filter);
  });
});

// Estado inicial
setFilter('all');

// ------- Lazy para imágenes sin atributo loading -------
document.querySelectorAll('img:not([loading])').forEach(img => img.loading = 'lazy');
