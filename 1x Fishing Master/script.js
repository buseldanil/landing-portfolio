const body = document.body;
const header = document.querySelector('.header');
const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('.nav');
const glow = document.querySelector('.cursor-glow');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    body.classList.toggle('menu-open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      body.classList.remove('menu-open');
    });
  });
}

window.addEventListener('mousemove', event => {
  if (!glow) return;

  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
  glow.style.opacity = '1';
});

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${Math.min(index * 55, 220)}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 },
);

revealItems.forEach(item => revealObserver.observe(item));

const screens = document.querySelectorAll('.screen');
const nextBtn = document.querySelector('#nextBtn');
const prevBtn = document.querySelector('#prevBtn');
const screenTitle = document.querySelector('#screenTitle');
const dotsWrap = document.querySelector('#dots');

let activeScreen = 0;
let carouselTimer;

function createDots() {
  if (!dotsWrap) return;

  screens.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.addEventListener('click', () => {
      activeScreen = index;
      renderCarousel();
      restartCarousel();
    });
    dotsWrap.appendChild(dot);
  });
}

function renderCarousel() {
  screens.forEach((screen, index) => {
    screen.classList.remove('active', 'prev-screen', 'next-screen');

    if (index === activeScreen) {
      screen.classList.add('active');
      if (screenTitle)
        screenTitle.textContent = screen.dataset.title || 'Preview';
    }

    if (index === (activeScreen - 1 + screens.length) % screens.length) {
      screen.classList.add('prev-screen');
    }

    if (index === (activeScreen + 1) % screens.length) {
      screen.classList.add('next-screen');
    }
  });

  document.querySelectorAll('#dots button').forEach((dot, index) => {
    dot.classList.toggle('active', index === activeScreen);
  });
}

function nextScreen() {
  activeScreen = (activeScreen + 1) % screens.length;
  renderCarousel();
}

function prevScreen() {
  activeScreen = (activeScreen - 1 + screens.length) % screens.length;
  renderCarousel();
}

function restartCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(nextScreen, 4200);
}

if (screens.length) {
  createDots();
  renderCarousel();
  restartCarousel();

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextScreen();
      restartCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevScreen();
      restartCarousel();
    });
  }
}

let previousScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (header) {
    if (currentScroll > 130 && currentScroll > previousScroll) {
      header.style.transform = 'translateY(-120px)';
    } else {
      header.style.transform = 'translateY(0)';
    }
  }

  previousScroll = currentScroll;
});

document.querySelectorAll('.feature-card, .tool-card').forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    card.style.background = `
      radial-gradient(circle at ${x}% ${y}%, rgba(53,191,255,.22), transparent 34%),
      linear-gradient(180deg, rgba(27, 91, 145, 0.34), rgba(6, 22, 38, 0.72))
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background =
      'linear-gradient(180deg, rgba(27, 91, 145, 0.34), rgba(6, 22, 38, 0.72))';
  });
});
