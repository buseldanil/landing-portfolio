// script.js
const glow = document.querySelector('.cursor-glow');

window.addEventListener('mousemove', e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  },
  { threshold: 0.15 },
);

revealItems.forEach(item => revealObserver.observe(item));

const shotCards = document.querySelectorAll('.shot-card');
const prevShot = document.querySelector('#prevShot');
const nextShot = document.querySelector('#nextShot');
const carouselDots = document.querySelector('#carouselDots');

let currentShot = 0;
let carouselTimer;

function normalize(index) {
  if (index < 0) return shotCards.length - 1;
  if (index >= shotCards.length) return 0;
  return index;
}

function renderCarousel() {
  shotCards.forEach((card, index) => {
    card.className = 'shot-card';

    if (index === currentShot) card.classList.add('active');
    if (index === normalize(currentShot - 1)) card.classList.add('prev-1');
    if (index === normalize(currentShot + 1)) card.classList.add('next-1');
    if (index === normalize(currentShot - 2)) card.classList.add('prev-2');
    if (index === normalize(currentShot + 2)) card.classList.add('next-2');
  });

  document.querySelectorAll('.carousel-dots button').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentShot);
  });
}

function goToShot(index) {
  currentShot = normalize(index);
  renderCarousel();
  restartAuto();
}

function restartAuto() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    currentShot = normalize(currentShot + 1);
    renderCarousel();
  }, 3600);
}

shotCards.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.addEventListener('click', () => goToShot(index));
  carouselDots.appendChild(dot);
});

prevShot.addEventListener('click', () => goToShot(currentShot - 1));
nextShot.addEventListener('click', () => goToShot(currentShot + 1));

renderCarousel();
restartAuto();
