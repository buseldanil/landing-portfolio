const cursorGlow = document.querySelector('.cursor-glow');

window.addEventListener('mousemove', event => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.18 },
);

revealItems.forEach(item => revealObserver.observe(item));

const cards = document.querySelectorAll('.screen-card');
const dotsContainer = document.querySelector('.carousel-dots');
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
let currentSlide = 0;
let carouselTimer;

function buildDots() {
  cards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
      restartCarouselTimer();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateCarousel() {
  cards.forEach(card => {
    card.classList.remove('is-active', 'prev-card', 'next-card');
  });

  const previous = (currentSlide - 1 + cards.length) % cards.length;
  const next = (currentSlide + 1) % cards.length;

  cards[currentSlide].classList.add('is-active');
  cards[previous].classList.add('prev-card');
  cards[next].classList.add('next-card');

  const dots = dotsContainer.querySelectorAll('button');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % cards.length;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + cards.length) % cards.length;
  updateCarousel();
}

function restartCarouselTimer() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(nextSlide, 3200);
}

if (cards.length) {
  buildDots();
  updateCarousel();
  restartCarouselTimer();

  nextBtn.addEventListener('click', () => {
    nextSlide();
    restartCarouselTimer();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    restartCarouselTimer();
  });
}

document
  .querySelectorAll('.feature-card, .review-grid article, .tactic-card')
  .forEach(card => {
    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.backgroundImage = `
      radial-gradient(circle at ${x}px ${y}px, rgba(168,255,101,0.18), transparent 34%),
      linear-gradient(145deg, rgba(18,72,31,0.72), rgba(6,22,10,0.8))
    `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.backgroundImage = '';
    });
  });
