const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
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
  { threshold: 0.16 },
);

revealElements.forEach(el => revealObserver.observe(el));

const screens = Array.from(document.querySelectorAll('.screen'));
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const dots = document.querySelector('.dots');
const slideNumber = document.querySelector('.slide-number');
const progress = document.querySelector('.progress i');

let active = 0;
let autoplay;

function formatNumber(index) {
  return String(index + 1).padStart(2, '0');
}

function renderCarousel() {
  const total = screens.length;

  screens.forEach((screen, index) => {
    screen.classList.remove(
      'active',
      'prev-card',
      'next-card',
      'far-prev',
      'far-next',
    );

    const prevIndex = (active - 1 + total) % total;
    const nextIndex = (active + 1) % total;
    const farPrevIndex = (active - 2 + total) % total;
    const farNextIndex = (active + 2) % total;

    if (index === active) screen.classList.add('active');
    if (index === prevIndex) screen.classList.add('prev-card');
    if (index === nextIndex) screen.classList.add('next-card');
    if (index === farPrevIndex) screen.classList.add('far-prev');
    if (index === farNextIndex) screen.classList.add('far-next');
  });

  if (slideNumber) {
    slideNumber.textContent = formatNumber(active);
  }

  if (progress) {
    progress.style.transform = `translateX(${active * 100}%)`;
  }

  if (dots) {
    dots.querySelectorAll('button').forEach((dot, index) => {
      dot.classList.toggle('active', index === active);
    });
  }
}

function nextSlide() {
  active = (active + 1) % screens.length;
  renderCarousel();
}

function prevSlide() {
  active = (active - 1 + screens.length) % screens.length;
  renderCarousel();
}

function restartAutoplay() {
  clearInterval(autoplay);
  autoplay = setInterval(nextSlide, 3600);
}

if (screens.length && dots) {
  screens.forEach((_, index) => {
    const button = document.createElement('button');
    button.setAttribute('aria-label', `Open screen ${index + 1}`);
    button.addEventListener('click', () => {
      active = index;
      renderCarousel();
      restartAutoplay();
    });
    dots.appendChild(button);
  });

  next?.addEventListener('click', () => {
    nextSlide();
    restartAutoplay();
  });

  prev?.addEventListener('click', () => {
    prevSlide();
    restartAutoplay();
  });

  const carousel = document.querySelector('.carousel');
  let startX = 0;

  carousel?.addEventListener('touchstart', event => {
    startX = event.touches[0].clientX;
  });

  carousel?.addEventListener('touchend', event => {
    const endX = event.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 45) {
      diff > 0 ? nextSlide() : prevSlide();
      restartAutoplay();
    }
  });

  renderCarousel();
  restartAutoplay();
}

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (!header) return;

  if (window.scrollY > 40) {
    header.style.background = 'rgba(5, 9, 20, .92)';
    header.style.borderColor = 'rgba(23, 200, 244, .3)';
  } else {
    header.style.background = 'rgba(5, 9, 20, .72)';
    header.style.borderColor = 'rgba(110, 174, 255, .18)';
  }
});

document
  .querySelectorAll('.feature-card, .tactic-card, .final-card')
  .forEach(card => {
    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.background = `
      radial-gradient(circle at ${x}px ${y}px, rgba(23,200,244,.17), transparent 34%),
      linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.025))
    `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
