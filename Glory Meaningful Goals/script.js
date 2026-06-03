const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.14 },
);

revealElements.forEach(item => revealObserver.observe(item));

const slides = document.querySelectorAll('.carousel__slide');
const dots = document.querySelectorAll('.carousel-dot');
const prevBtn = document.querySelector('.carousel-btn--prev');
const nextBtn = document.querySelector('.carousel-btn--next');

let currentSlide = 0;
let autoSlider = null;

function showSlide(index) {
  if (!slides.length) return;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  currentSlide = index;
}

function nextSlide() {
  const next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

function prevSlide() {
  const prev = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prev);
}

function startSlider() {
  if (slides.length <= 1) return;
  stopSlider();
  autoSlider = setInterval(nextSlide, 4200);
}

function stopSlider() {
  if (autoSlider) {
    clearInterval(autoSlider);
  }
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    nextSlide();
    startSlider();
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    prevSlide();
    startSlider();
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    startSlider();
  });
});

showSlide(0);
startSlider();

const counters = document.querySelectorAll('[data-count]');

const countObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      if (element.dataset.done === 'true') return;

      const endValue = parseInt(element.dataset.count, 10);
      let current = 0;
      const duration = 850;
      const step = Math.max(20, Math.floor(duration / endValue));

      const timer = setInterval(() => {
        current += 1;
        element.textContent = current;

        if (current >= endValue) {
          element.textContent = endValue;
          element.dataset.done = 'true';
          clearInterval(timer);
        }
      }, step);
    });
  },
  { threshold: 0.6 },
);

counters.forEach(counter => countObserver.observe(counter));
