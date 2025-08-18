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
const navLinks = Array.from(document.querySelectorAll('.menu a'));
const targets = navLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

if (targets.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = `#${entry.target.id}`;
      const link = navLinks.find(a => a.getAttribute('href') === id);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'page');
      }
    });
  }, { threshold: 0.5, rootMargin: '0px 0px -30% 0px' });

  targets.forEach(t => sectionObserver.observe(t));
}

// ------- Scroll suave para cualquier [data-scroll] (si lo agregas) -------
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-scroll]');
  if (!btn) return;
  const target = document.querySelector(btn.dataset.scroll);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
});

// ------- Lazy para imágenes sin atributo loading -------
document.querySelectorAll('img:not([loading])').forEach(img => img.loading = 'lazy');

// ------- Copiar correo -------
document.addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-copy]');
  if (!btn) return;
  const sel = btn.getAttribute('data-copy');
  const el = document.querySelector(sel);
  if (!el) return;
  const href = el.getAttribute('href') || '';
  const text = href.startsWith('mailto:') ? href.replace('mailto:', '') : (el.textContent || '').trim();
  try {
    await navigator.clipboard.writeText(text);
    const prev = btn.textContent;
    btn.textContent = 'Copiado ✓';
    setTimeout(() => (btn.textContent = prev), 1800);
  } catch {
    const prev = btn.textContent;
    btn.textContent = 'Error';
    setTimeout(() => (btn.textContent = prev), 1800);
  }
});
