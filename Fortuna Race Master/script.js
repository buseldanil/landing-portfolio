// mobile menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
}

// reveal animations
const revealElements = document.querySelectorAll('.reveal');

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

revealElements.forEach(el => revealObserver.observe(el));

// counters
const counters = document.querySelectorAll('.metric-value');
let countersStarted = false;

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 1500;
  const start = performance.now();

  function update(time) {
    const progress = Math.min((time - start) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

const metricBar = document.querySelector('.metrics-bar');

if (metricBar) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          counters.forEach(c => animateCounter(c));
          countersStarted = true;
        }
      });
    },
    { threshold: 0.3 },
  );

  observer.observe(metricBar);
}

// scroll to top
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (!scrollTopBtn) return;

  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

// carousel
const slides = document.querySelectorAll('.carousel-slide');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const dotsContainer = document.getElementById('carouselDots');

let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');

  updateDots();
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// create dots
function createDots() {
  if (!dotsContainer) return;

  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'carousel-dot';

    dot.addEventListener('click', () => {
      showSlide(i);
    });

    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = document.querySelectorAll('.carousel-dot');

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

if (slides.length) {
  createDots();
  showSlide(0);
}

if (nextBtn) {
  nextBtn.addEventListener('click', nextSlide);
}

if (prevBtn) {
  prevBtn.addEventListener('click', prevSlide);
}

// autoplay
let autoSlide = setInterval(nextSlide, 5000);

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextSlide, 5000);
}

if (nextBtn) nextBtn.addEventListener('click', resetAutoSlide);
if (prevBtn) prevBtn.addEventListener('click', resetAutoSlide);

// active navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll(
  '.desktop-nav a[href^="#"], .mobile-menu a[href^="#"]',
);

function updateActiveLink() {
  let current = '';

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;

    if (window.scrollY >= top && window.scrollY < top + height) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active-link');

    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active-link');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);
