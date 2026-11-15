// Mobile menu toggle
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
