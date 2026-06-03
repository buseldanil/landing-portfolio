const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    body.classList.toggle('menu-open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      body.classList.remove('menu-open');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${Math.min(index * 80, 240)}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 },
);

revealItems.forEach(item => revealObserver.observe(item));

const screens = document.querySelectorAll('.screen');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const screenTitle = document.querySelector('#screenTitle');
let currentScreen = 0;
let autoplay;

function renderScreens() {
  screens.forEach((screen, index) => {
    screen.classList.remove('active', 'prev-screen', 'next-screen');

    if (index === currentScreen) {
      screen.classList.add('active');
      if (screenTitle)
        screenTitle.textContent = screen.dataset.title || 'Preview';
    }

    if (index === (currentScreen - 1 + screens.length) % screens.length) {
      screen.classList.add('prev-screen');
    }

    if (index === (currentScreen + 1) % screens.length) {
      screen.classList.add('next-screen');
    }
  });
}

function nextScreen() {
  currentScreen = (currentScreen + 1) % screens.length;
  renderScreens();
}

function prevScreen() {
  currentScreen = (currentScreen - 1 + screens.length) % screens.length;
  renderScreens();
}

function restartAutoplay() {
  clearInterval(autoplay);
  autoplay = setInterval(nextScreen, 4300);
}

if (screens.length) {
  renderScreens();
  restartAutoplay();

  nextButton.addEventListener('click', () => {
    nextScreen();
    restartAutoplay();
  });

  prevButton.addEventListener('click', () => {
    prevScreen();
    restartAutoplay();
  });
}

const cursorLight = document.querySelector('.cursor-light');

window.addEventListener('mousemove', event => {
  if (!cursorLight) return;
  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
  cursorLight.style.opacity = '1';
});

const magneticItems = document.querySelectorAll('.magnetic');

magneticItems.forEach(item => {
  item.addEventListener('mousemove', event => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.15}px, ${y * 0.17}px) translateY(-4px)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});

const glowCards = document.querySelectorAll(
  '.feature-card, .mini-card, .step, .review-card',
);

glowCards.forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * 9;
    const rotateX = (y / rect.height - 0.5) * -9;

    card.style.transition = 'transform .08s ease';
    card.style.transform += ` rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform .35s ease';
    card.style.transform = '';
  });
});

const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 90 && currentScroll > lastScroll) {
    header.style.transform = 'translateY(-110px)';
  } else {
    header.style.transform = 'translateY(0)';
  }

  lastScroll = currentScroll;
});
