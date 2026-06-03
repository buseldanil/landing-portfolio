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
let autoPlay;

function renderScreens() {
  screens.forEach((screen, index) => {
    screen.classList.remove('active', 'prev-screen', 'next-screen');

    if (index === currentScreen) {
      screen.classList.add('active');
      if (screenTitle) {
        screenTitle.textContent = screen.dataset.title || 'Preview';
      }
    }

    if (index === (currentScreen - 1 + screens.length) % screens.length) {
      screen.classList.add('prev-screen');
    }

    if (index === (currentScreen + 1) % screens.length) {
      screen.classList.add('next-screen');
    }
  });
}

function goNext() {
  currentScreen = (currentScreen + 1) % screens.length;
  renderScreens();
}

function goPrev() {
  currentScreen = (currentScreen - 1 + screens.length) % screens.length;
  renderScreens();
}

function startAutoPlay() {
  clearInterval(autoPlay);
  autoPlay = setInterval(goNext, 4200);
}

if (screens.length) {
  renderScreens();
  startAutoPlay();

  nextButton.addEventListener('click', () => {
    goNext();
    startAutoPlay();
  });

  prevButton.addEventListener('click', () => {
    goPrev();
    startAutoPlay();
  });
}

const cursorGlow = document.querySelector('.cursor-glow');

window.addEventListener('mousemove', event => {
  if (cursorGlow) {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    cursorGlow.style.opacity = '1';
  }
});

const magneticItems = document.querySelectorAll('.magnetic');

magneticItems.forEach(item => {
  item.addEventListener('mousemove', event => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.16}px, ${y * 0.18}px) translateY(-4px)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});

const hoverCards = document.querySelectorAll(
  '.feature-card, .mini-card, .workflow-step, .review-card',
);

hoverCards.forEach(card => {
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
    const rotateY = (x / rect.width - 0.5) * 10;
    const rotateX = (y / rect.height - 0.5) * -10;

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

  if (currentScroll > 80 && currentScroll > lastScroll) {
    header.style.transform = 'translateY(-110px)';
  } else {
    header.style.transform = 'translateY(0)';
  }

  lastScroll = currentScroll;
});
