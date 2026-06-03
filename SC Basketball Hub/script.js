const header = document.getElementById('header');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const cursorGlow = document.querySelector('.cursor-glow');

window.addEventListener('scroll', () => {
  if (window.scrollY > 18) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
});

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    document.body.classList.toggle('locked');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.classList.remove('locked');
    });
  });
}

if (cursorGlow) {
  window.addEventListener('mousemove', event => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.14,
  },
);

revealItems.forEach(item => revealObserver.observe(item));

const slides = Array.from(document.querySelectorAll('.slide'));
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
const dotsWrap = document.getElementById('carouselDots');

let activeSlide = 0;
let carouselTimer;

function buildDots() {
  if (!dotsWrap) return;

  dotsWrap.innerHTML = '';

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);

    dot.addEventListener('click', () => {
      activeSlide = index;
      updateSlides();
      restartCarousel();
    });

    dotsWrap.appendChild(dot);
  });
}

function updateSlides() {
  const total = slides.length;

  slides.forEach((slide, index) => {
    slide.classList.remove(
      'active',
      'prev-one',
      'next-one',
      'prev-two',
      'next-two',
    );

    const prevOne = (activeSlide - 1 + total) % total;
    const nextOne = (activeSlide + 1) % total;
    const prevTwo = (activeSlide - 2 + total) % total;
    const nextTwo = (activeSlide + 2) % total;

    if (index === activeSlide) {
      slide.classList.add('active');
    } else if (index === prevOne) {
      slide.classList.add('prev-one');
    } else if (index === nextOne) {
      slide.classList.add('next-one');
    } else if (index === prevTwo) {
      slide.classList.add('prev-two');
    } else if (index === nextTwo) {
      slide.classList.add('next-two');
    }
  });

  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === activeSlide);
  });
}

function showNextSlide() {
  activeSlide = (activeSlide + 1) % slides.length;
  updateSlides();
}

function showPrevSlide() {
  activeSlide = (activeSlide - 1 + slides.length) % slides.length;
  updateSlides();
}

function startCarousel() {
  carouselTimer = setInterval(showNextSlide, 3600);
}

function restartCarousel() {
  clearInterval(carouselTimer);
  startCarousel();
}

if (slides.length) {
  buildDots();
  updateSlides();
  startCarousel();

  nextSlide?.addEventListener('click', () => {
    showNextSlide();
    restartCarousel();
  });

  prevSlide?.addEventListener('click', () => {
    showPrevSlide();
    restartCarousel();
  });
}

const magneticItems = document.querySelectorAll(
  '.feature-card, .player-card, .world-card, .tip-card, .chart-panel, .versus-card',
);

magneticItems.forEach(item => {
  item.addEventListener('mousemove', event => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -5;
    const rotateY = (x / rect.width - 0.5) * 5;

    item.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-7px)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});

const navDownload = document.querySelector('.nav-download');
const primaryButtons = document.querySelectorAll('.btn-primary');

[navDownload, ...primaryButtons].forEach(button => {
  if (!button) return;

  button.addEventListener('mouseenter', () => {
    button.style.filter = 'brightness(1.12)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.filter = '';
  });
});
