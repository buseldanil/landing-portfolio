const body = document.body;
const burger = document.getElementById('burger');
const siteHeader = document.getElementById('siteHeader');
const cursorLight = document.querySelector('.cursor-light');

if (burger) {
  burger.addEventListener('click', () => {
    body.classList.toggle('menu-open');
  });
}

window.addEventListener('scroll', () => {
  if (!siteHeader) return;

  if (window.scrollY > 20) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
  });
});

if (cursorLight) {
  window.addEventListener('mousemove', event => {
    cursorLight.style.left = `${event.clientX}px`;
    cursorLight.style.top = `${event.clientY}px`;
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
const dotsWrap = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

let activeSlide = 0;
let autoSlideTimer;

function createDots() {
  if (!dotsWrap || !cards.length) return;

  dotsWrap.innerHTML = '';

  cards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);

    dot.addEventListener('click', () => {
      activeSlide = index;
      updateCarousel();
      restartAutoSlider();
    });

    dotsWrap.appendChild(dot);
  });
}

function getPosition(index) {
  const total = cards.length;
  let diff = index - activeSlide;

  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;

  return diff;
}

function updateCarousel() {
  if (!cards.length) return;

  cards.forEach((card, index) => {
    card.classList.remove('active', 'prev-1', 'next-1', 'prev-2', 'next-2');

    const position = getPosition(index);

    if (position === 0) card.classList.add('active');
    if (position === -1) card.classList.add('prev-1');
    if (position === 1) card.classList.add('next-1');
    if (position === -2) card.classList.add('prev-2');
    if (position === 2) card.classList.add('next-2');
  });

  if (dotsWrap) {
    Array.from(dotsWrap.children).forEach((dot, index) => {
      dot.classList.toggle('active', index === activeSlide);
    });
  }
}

function nextSlide() {
  activeSlide = (activeSlide + 1) % cards.length;
  updateCarousel();
}

function prevSlide() {
  activeSlide = (activeSlide - 1 + cards.length) % cards.length;
  updateCarousel();
}

function startAutoSlider() {
  if (!cards.length) return;
  autoSlideTimer = setInterval(nextSlide, 3600);
}

function restartAutoSlider() {
  clearInterval(autoSlideTimer);
  startAutoSlider();
}

if (cards.length) {
  createDots();
  updateCarousel();
  startAutoSlider();

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoSlider();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartAutoSlider();
    });
  }
}

const buttons = document.querySelectorAll(
  '.btn, .download-btn, .carousel-arrow',
);

buttons.forEach(button => {
  button.addEventListener('mousemove', event => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
  });
});
