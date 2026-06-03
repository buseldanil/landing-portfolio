const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const revealItems = document.querySelectorAll('.reveal');

const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentSlide = 0;
let autoSlide = null;

function handleHeader() {
  if (window.scrollY > 12) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

handleHeader();
window.addEventListener('scroll', handleHeader);

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15 },
);

revealItems.forEach(item => revealObserver.observe(item));

function updateCarousel(index) {
  if (!track || !slides.length) return;

  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === currentSlide);
  });

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === currentSlide);
  });
}

function nextSlide() {
  updateCarousel(currentSlide + 1);
}

function prevSlide() {
  updateCarousel(currentSlide - 1);
}

function startAutoSlide() {
  stopAutoSlide();
  autoSlide = setInterval(() => {
    nextSlide();
  }, 4200);
}

function stopAutoSlide() {
  if (autoSlide) {
    clearInterval(autoSlide);
  }
}

if (slides.length) {
  updateCarousel(0);
  startAutoSlide();

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    startAutoSlide();
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    startAutoSlide();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      updateCarousel(Number(dot.dataset.slide));
      startAutoSlide();
    });
  });

  track?.addEventListener('mouseenter', stopAutoSlide);
  track?.addEventListener('mouseleave', startAutoSlide);
  window.addEventListener('blur', stopAutoSlide);
  window.addEventListener('focus', startAutoSlide);
}

const counters = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.count);
      const duration = 1200;
      const start = performance.now();

      function animate(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.round(target * eased);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.textContent = target;
        }
      }

      requestAnimationFrame(animate);
      counterObserver.unobserve(element);
    });
  },
  { threshold: 0.5 },
);

counters.forEach(counter => counterObserver.observe(counter));
