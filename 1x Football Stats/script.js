const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
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
  { threshold: 0.14 },
);

revealItems.forEach(item => revealObserver.observe(item));

const screens = Array.from(document.querySelectorAll('.screen'));
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsBox = document.querySelector('.dots');
const currentSlide = document.querySelector('.current-slide');
const progressBar = document.querySelector('.bar i');

let active = 0;
let autoplayTimer;

function numberLabel(index) {
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

    const prev = (active - 1 + total) % total;
    const next = (active + 1) % total;
    const farPrev = (active - 2 + total) % total;
    const farNext = (active + 2) % total;

    if (index === active) screen.classList.add('active');
    if (index === prev) screen.classList.add('prev-card');
    if (index === next) screen.classList.add('next-card');
    if (index === farPrev) screen.classList.add('far-prev');
    if (index === farNext) screen.classList.add('far-next');
  });

  if (currentSlide) currentSlide.textContent = numberLabel(active);
  if (progressBar) progressBar.style.transform = `translateX(${active * 100}%)`;

  if (dotsBox) {
    dotsBox.querySelectorAll('button').forEach((dot, index) => {
      dot.classList.toggle('active', index === active);
    });
  }
}

function goNext() {
  active = (active + 1) % screens.length;
  renderCarousel();
}

function goPrev() {
  active = (active - 1 + screens.length) % screens.length;
  renderCarousel();
}

function restartAutoplay() {
  clearInterval(autoplayTimer);
  autoplayTimer = setInterval(goNext, 3600);
}

if (screens.length && dotsBox) {
  screens.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Open screenshot ${index + 1}`);
    dot.addEventListener('click', () => {
      active = index;
      renderCarousel();
      restartAutoplay();
    });
    dotsBox.appendChild(dot);
  });

  nextBtn?.addEventListener('click', () => {
    goNext();
    restartAutoplay();
  });

  prevBtn?.addEventListener('click', () => {
    goPrev();
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
      diff > 0 ? goNext() : goPrev();
      restartAutoplay();
    }
  });

  renderCarousel();
  restartAutoplay();
}

const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (!header) return;

  if (window.scrollY > 35) {
    header.style.background = 'rgba(3, 10, 22, .94)';
    header.style.borderColor = 'rgba(67, 168, 255, .34)';
  } else {
    header.style.background = 'rgba(3, 10, 22, .72)';
    header.style.borderColor = 'rgba(118, 190, 255, .2)';
  }
});

document
  .querySelectorAll('.feature-card, .flow-card, .final-card')
  .forEach(card => {
    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.background = `
      radial-gradient(circle at ${x}px ${y}px, rgba(67,168,255,.18), transparent 34%),
      linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.025))
    `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
