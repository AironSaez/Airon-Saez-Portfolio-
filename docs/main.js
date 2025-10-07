// Menú móvil 
const menuBtn = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      menu.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    })
  );
}

// Resaltado de sección activa
const navLinks = Array.from(document.querySelectorAll('.menu a'));
const targets = navLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

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

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-scroll]');
  if (!btn) return;
  const target = document.querySelector(btn.dataset.scroll);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
});

const chipButtons = Array.from(document.querySelectorAll('.chip[data-filter]'));
const cards = Array.from(document.querySelectorAll('.card[data-tags]'));

function setFilter(tag) {
  chipButtons.forEach(b => {
    const isActive = b.dataset.filter === tag || (tag === 'all' && b.dataset.filter === 'all');
    b.classList.toggle('is-active', isActive);
    b.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
  cards.forEach(card => {
    const ok = tag === 'all' || (card.dataset.tags || '').includes(tag);
    card.style.display = ok ? '' : 'none';
  });
}

chipButtons.forEach(btn => {
  btn.addEventListener('click', () => setFilter(btn.dataset.filter));
});

// Estado inicial
setFilter('all');


document.querySelectorAll('img:not([loading])').forEach(img => img.loading = 'lazy');

// Copiar correo
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

// Modal "Ver caso"
const modal = document.getElementById('modal-caso');
const modalDialog = modal?.querySelector('.modal__dialog');
const openers = document.querySelectorAll('[data-case]');
const closers = modal?.querySelectorAll('[data-close-modal], .modal__close, .modal__backdrop');

let lastFocus = null;

function openModal() {
  if (!modal) return;
  lastFocus = document.activeElement;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  const focusable = modal.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
  focusable?.focus();
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lastFocus?.focus();
}

openers.forEach(btn => btn.addEventListener('click', openModal));
closers?.forEach(btn => btn.addEventListener('click', closeModal));

document.addEventListener('keydown', (e) => {
  if (!modal?.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'Tab') {
    // Trap focus
    const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const list = Array.from(focusables);
    const i = list.indexOf(document.activeElement);
    if (e.shiftKey && (i === 0 || i === -1)) { list[list.length - 1].focus(); e.preventDefault(); }
    else if (!e.shiftKey && i === list.length - 1) { list[0].focus(); e.preventDefault(); }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const correoBtn = document.getElementById("btnCorreo");
  const toast = document.getElementById("toast");
  const correo = "aironsaez4@gmail.com";

  correoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(correo).then(() => {
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2000);
    });
  });
});

//descripcion de habilidades
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".pill-list li").forEach(li => {
    const img = li.querySelector("img");
    if (img) {
      const label = img.getAttribute("alt") || img.getAttribute("title") || "";
      li.setAttribute("data-label", label);
      img.setAttribute("tabindex", "0");
      img.setAttribute("aria-label", label);
      img.setAttribute("role", "img");
    }
  });
});


