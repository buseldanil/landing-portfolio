const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

const cursorGlow = document.querySelector('.cursor-glow');

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

const cards = Array.from(document.querySelectorAll('.screen-card'));
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const dotsWrap = document.getElementById('carouselDots');

let activeIndex = 0;
let autoplayTimer;

function createDots() {
  if (!dotsWrap) return;

  dotsWrap.innerHTML = '';

  cards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Go to screenshot ${index + 1}`);

    dot.addEventListener('click', () => {
      activeIndex = index;
      updateCarousel();
      restartAutoplay();
    });

    dotsWrap.appendChild(dot);
  });
}

function updateCarousel() {
  cards.forEach((card, index) => {
    card.classList.remove(
      'active',
      'prev-one',
      'next-one',
      'prev-two',
      'next-two',
    );

    const total = cards.length;
    const prevOne = (activeIndex - 1 + total) % total;
    const nextOne = (activeIndex + 1) % total;
    const prevTwo = (activeIndex - 2 + total) % total;
    const nextTwo = (activeIndex + 2) % total;

    if (index === activeIndex) {
      card.classList.add('active');
    } else if (index === prevOne) {
      card.classList.add('prev-one');
    } else if (index === nextOne) {
      card.classList.add('next-one');
    } else if (index === prevTwo) {
      card.classList.add('prev-two');
    } else if (index === nextTwo) {
      card.classList.add('next-two');
    }
  });

  const dots = document.querySelectorAll('.carousel-dot');
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

if (cards.length) {
  createDots();
  updateCarousel();
  startAutoplay();

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartAutoplay();
    });
  }
}

const tiltCards = document.querySelectorAll(
  '.feature-card, .resource-card, .review-card, .drill-card, .match-board',
);

tiltCards.forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -4;
    const rotateY = (x / rect.width - 0.5) * 4;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
