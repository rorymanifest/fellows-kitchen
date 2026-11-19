// ===== Mobile menu =====
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');

if (toggle) {
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  // Close the menu when resizing up to desktop
  window.matchMedia('(min-width: 1025px)').addEventListener('change', (e) => {
    if (e.matches) {
      header.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', false);
    }
  });
}

// ===== Carousels (prev / next buttons) =====
document.querySelectorAll('[data-carousel]').forEach((wrap) => {
  const track = wrap.querySelector('.carousel');
  const prev = wrap.querySelector('[data-prev]');
  const next = wrap.querySelector('[data-next]');
  if (!track || !prev || !next) return;

  const step = () => {
    const card = track.firstElementChild;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth;
  };

  const update = () => {
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  };

  prev.addEventListener('click', () => track.scrollBy({ left: -step() }));
  next.addEventListener('click', () => track.scrollBy({ left: step() }));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
});

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// ===== Footer year =====
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
