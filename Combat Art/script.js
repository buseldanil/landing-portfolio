const header = document.getElementById('header');
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const revealItems = document.querySelectorAll('.reveal');
const tiltCards = document.querySelectorAll('.tilt-card');
const counters = document.querySelectorAll('.counter');

const slides = document.querySelectorAll('.carousel-slide');
const dotsWrap = document.getElementById('carouselDots');
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');
const carouselTitle = document.getElementById('carouselTitle');
const carouselText = document.getElementById('carouselText');

let activeSlide = 0;
let autoPlay = null;

function updateHeader() {
  if (!header) return;
  if (window.scrollY > 18) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
    });
  });
}

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');

      const localCounters = entry.target.querySelectorAll('.counter');
      if (localCounters.length) runCounters(localCounters);

      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
  },
);

revealItems.forEach(item => revealObserver.observe(item));

function runCounters(counterItems) {
  counterItems.forEach(counter => {
    if (counter.dataset.started === 'true') return;

    counter.dataset.started = 'true';
    const target = Number(counter.dataset.target || 0);
    const duration = 1300;
    const startTime = performance.now();

    function animate(time) {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  });
}

tiltCards.forEach(card => {
  card.addEventListener('mousemove', event => {
    if (window.innerWidth < 900) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((centerY - y) / centerY) * 5;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

function createDots() {
  if (!dotsWrap || !slides.length) return;

  dotsWrap.innerHTML = '';

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => {
      goToSlide(index);
      restartAutoPlay();
    });
    dotsWrap.appendChild(dot);
  });
}

function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('is-active', index === activeSlide);
  });

  const dots = dotsWrap ? dotsWrap.querySelectorAll('.carousel-dot') : [];
  dots.forEach((dot, index) => {
    dot.classList.toggle('is-active', index === activeSlide);
  });

  const current = slides[activeSlide];
  if (current && carouselTitle && carouselText) {
    carouselTitle.textContent = current.dataset.title || '';
    carouselText.textContent = current.dataset.text || '';
  }
}

function goToSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  updateCarousel();
}

function nextSlide() {
  goToSlide(activeSlide + 1);
}

function prevSlide() {
  goToSlide(activeSlide - 1);
}

function startAutoPlay() {
  if (!slides.length) return;
  autoPlay = setInterval(() => {
    nextSlide();
  }, 3600);
}

function restartAutoPlay() {
  clearInterval(autoPlay);
  startAutoPlay();
}

if (slides.length) {
  createDots();
  updateCarousel();
  startAutoPlay();
}

if (nextSlideBtn) {
  nextSlideBtn.addEventListener('click', () => {
    nextSlide();
    restartAutoPlay();
  });
}

if (prevSlideBtn) {
  prevSlideBtn.addEventListener('click', () => {
    prevSlide();
    restartAutoPlay();
  });
}
