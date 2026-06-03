const header = document.getElementById('header');
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
const cursorGlow = document.getElementById('cursorGlow');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
});

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});

if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', event => {
    cursorGlow.style.opacity = '1';
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });

  window.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
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
    threshold: 0.16,
  },
);

revealItems.forEach(item => revealObserver.observe(item));

const cards = Array.from(document.querySelectorAll('.screen-card'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsWrap = document.getElementById('carouselDots');

let activeIndex = 0;
let autoplayTimer;

cards.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Open screenshot ${index + 1}`);
  dot.addEventListener('click', () => {
    activeIndex = index;
    updateCarousel();
    restartAutoplay();
  });
  dotsWrap.appendChild(dot);
});

const dots = Array.from(dotsWrap.querySelectorAll('button'));

function updateCarousel() {
  cards.forEach((card, index) => {
    card.classList.remove(
      'is-active',
      'is-prev',
      'is-next',
      'is-prev2',
      'is-next2',
    );

    const total = cards.length;
    const prev = (activeIndex - 1 + total) % total;
    const next = (activeIndex + 1) % total;
    const prev2 = (activeIndex - 2 + total) % total;
    const next2 = (activeIndex + 2) % total;

    if (index === activeIndex) card.classList.add('is-active');
    if (index === prev) card.classList.add('is-prev');
    if (index === next) card.classList.add('is-next');
    if (index === prev2) card.classList.add('is-prev2');
    if (index === next2) card.classList.add('is-next2');
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeIndex);
  });
}

function nextSlide() {
  activeIndex = (activeIndex + 1) % cards.length;
  updateCarousel();
}

function prevSlide() {
  activeIndex = (activeIndex - 1 + cards.length) % cards.length;
  updateCarousel();
}

function startAutoplay() {
  autoplayTimer = setInterval(nextSlide, 3600);
}

function restartAutoplay() {
  clearInterval(autoplayTimer);
  startAutoplay();
}

nextBtn.addEventListener('click', () => {
  nextSlide();
  restartAutoplay();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  restartAutoplay();
});

updateCarousel();
startAutoplay();

const magneticButtons = document.querySelectorAll(
  '.btn, .header-download, .carousel-btn',
);

magneticButtons.forEach(button => {
  button.addEventListener('mousemove', event => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = '';
  });
});
