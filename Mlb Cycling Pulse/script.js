const header = document.getElementById('header');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const cursorLight = document.querySelector('.cursor-light');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
});

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });
}

if (cursorLight) {
  window.addEventListener('mousemove', event => {
    cursorLight.style.left = `${event.clientX}px`;
    cursorLight.style.top = `${event.clientY}px`;
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
  {
    threshold: 0.14,
  },
);

revealElements.forEach(element => revealObserver.observe(element));

const slides = Array.from(document.querySelectorAll('.slide'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dots');

let currentSlide = 0;
let autoPlay;

function createDots() {
  if (!dotsContainer) return;

  dotsContainer.innerHTML = '';

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('aria-label', `Open slide ${index + 1}`);

    dot.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
      restartAutoPlay();
    });

    dotsContainer.appendChild(dot);
  });
}

function updateCarousel() {
  const total = slides.length;

  slides.forEach((slide, index) => {
    slide.classList.remove(
      'active',
      'prev-one',
      'next-one',
      'prev-two',
      'next-two',
    );

    const prevOne = (currentSlide - 1 + total) % total;
    const nextOne = (currentSlide + 1) % total;
    const prevTwo = (currentSlide - 2 + total) % total;
    const nextTwo = (currentSlide + 2) % total;

    if (index === currentSlide) {
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
    dot.classList.toggle('active', index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
}

function startAutoPlay() {
  autoPlay = setInterval(nextSlide, 3800);
}

function restartAutoPlay() {
  clearInterval(autoPlay);
  startAutoPlay();
}

if (slides.length) {
  createDots();
  updateCarousel();
  startAutoPlay();

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    restartAutoPlay();
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    restartAutoPlay();
  });
}

const interactiveCards = document.querySelectorAll(
  '.feature-card, .news-card, .challenge-item, .dashboard-card, .preview-card',
);

interactiveCards.forEach(card => {
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
