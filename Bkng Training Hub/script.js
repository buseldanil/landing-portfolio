const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav a');
const reveals = document.querySelectorAll('.reveal');
const cursorGlow = document.querySelector('.cursor-glow');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    body.classList.toggle('menu-open');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
  });
});

if (cursorGlow) {
  window.addEventListener('pointermove', event => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.15,
  },
);

reveals.forEach(element => revealObserver.observe(element));

const cards = Array.from(document.querySelectorAll('.screen-card'));
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dotsWrap = document.querySelector('.carousel-dots');

let currentIndex = 0;
let autoplay;

function normalizeIndex(index) {
  if (index < 0) return cards.length - 1;
  if (index >= cards.length) return 0;
  return index;
}

function renderCarousel() {
  if (!cards.length) return;

  cards.forEach((card, index) => {
    card.className = 'screen-card';

    const prev1 = normalizeIndex(currentIndex - 1);
    const next1 = normalizeIndex(currentIndex + 1);
    const prev2 = normalizeIndex(currentIndex - 2);
    const next2 = normalizeIndex(currentIndex + 2);

    if (index === currentIndex) card.classList.add('active');
    if (index === prev1) card.classList.add('prev-1');
    if (index === next1) card.classList.add('next-1');
    if (index === prev2) card.classList.add('prev-2');
    if (index === next2) card.classList.add('next-2');
  });

  if (dotsWrap) {
    const dots = dotsWrap.querySelectorAll('button');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
}

function goToSlide(index) {
  currentIndex = normalizeIndex(index);
  renderCarousel();
  restartAutoplay();
}

function nextSlide() {
  goToSlide(currentIndex + 1);
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

function startAutoplay() {
  autoplay = setInterval(() => {
    currentIndex = normalizeIndex(currentIndex + 1);
    renderCarousel();
  }, 3200);
}

function restartAutoplay() {
  clearInterval(autoplay);
  startAutoplay();
}

if (dotsWrap && cards.length) {
  cards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to screen ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsWrap.appendChild(dot);
  });
}

if (prevBtn && nextBtn && cards.length) {
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  renderCarousel();
  startAutoplay();
}

let startX = 0;
let endX = 0;
const carouselStage = document.querySelector('.carousel-stage');

if (carouselStage) {
  carouselStage.addEventListener('touchstart', event => {
    startX = event.touches[0].clientX;
  });

  carouselStage.addEventListener('touchmove', event => {
    endX = event.touches[0].clientX;
  });

  carouselStage.addEventListener('touchend', () => {
    const diff = startX - endX;

    if (Math.abs(diff) > 45) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }

    startX = 0;
    endX = 0;
  });
}
