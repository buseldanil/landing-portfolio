const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 },
);

revealItems.forEach(item => observer.observe(item));

const screens = document.querySelectorAll('.screen');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let active = 0;

function updateCarousel() {
  screens.forEach((screen, index) => {
    screen.classList.remove('active', 'prev-screen', 'next-screen');

    if (index === active) screen.classList.add('active');
    if (index === (active - 1 + screens.length) % screens.length)
      screen.classList.add('prev-screen');
    if (index === (active + 1) % screens.length)
      screen.classList.add('next-screen');
  });
}

if (screens.length) {
  updateCarousel();

  next.addEventListener('click', () => {
    active = (active + 1) % screens.length;
    updateCarousel();
  });

  prev.addEventListener('click', () => {
    active = (active - 1 + screens.length) % screens.length;
    updateCarousel();
  });

  setInterval(() => {
    active = (active + 1) % screens.length;
    updateCarousel();
  }, 4300);
}

const heroVisual = document.querySelector('.hero-visual');

if (heroVisual) {
  window.addEventListener('mousemove', event => {
    const x = (event.clientX / window.innerWidth - 0.5) * 16;
    const y = (event.clientY / window.innerHeight - 0.5) * 16;
    heroVisual.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
}

const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  header.style.transform =
    window.scrollY > 40 ? 'translateY(-4px)' : 'translateY(0)';
});
