const body = document.body;
const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const cursorGlow = document.querySelector('.cursor-glow');
const header = document.querySelector('.header');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
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
  if (!cursorGlow) return;

  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
  cursorGlow.style.opacity = '1';
});

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  },
);

revealItems.forEach(item => revealObserver.observe(item));

const hoverCards = document.querySelectorAll('.hover-card');

hoverCards.forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

const magneticItems = document.querySelectorAll('.magnetic');

magneticItems.forEach(item => {
  item.addEventListener('mousemove', event => {
    const rect = item.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    item.style.transform = `translate(${x * 0.14}px, ${y * 0.16}px) translateY(-4px)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});

const tiltItems = document.querySelectorAll('.tilt');

tiltItems.forEach(item => {
  item.addEventListener('mousemove', event => {
    const rect = item.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 8;
    const rotateX = (y / rect.height - 0.5) * -8;

    item.style.transition = 'transform 0.08s ease';
    item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transition = 'transform 0.35s ease';
    item.style.transform = '';
  });
});

const screens = document.querySelectorAll('.screen');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const screenTitle = document.querySelector('#screenTitle');

let activeScreen = 0;
let autoplay;

function renderScreens() {
  screens.forEach((screen, index) => {
    screen.classList.remove('active', 'prev-screen', 'next-screen');

    if (index === activeScreen) {
      screen.classList.add('active');

      if (screenTitle) {
        screenTitle.textContent = screen.dataset.title || 'Preview';
      }
    }

    if (index === (activeScreen - 1 + screens.length) % screens.length) {
      screen.classList.add('prev-screen');
    }

    if (index === (activeScreen + 1) % screens.length) {
      screen.classList.add('next-screen');
    }
  });
}

function goNext() {
  activeScreen = (activeScreen + 1) % screens.length;
  renderScreens();
}

function goPrev() {
  activeScreen = (activeScreen - 1 + screens.length) % screens.length;
  renderScreens();
}

function restartAutoplay() {
  clearInterval(autoplay);
  autoplay = setInterval(goNext, 4200);
}

if (screens.length) {
  renderScreens();
  restartAutoplay();

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      goNext();
      restartAutoplay();
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      goPrev();
      restartAutoplay();
    });
  }
}

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (header) {
    if (currentScroll > 120 && currentScroll > lastScroll) {
      header.style.transform = 'translateY(-120px)';
    } else {
      header.style.transform = 'translateY(0)';
    }
  }

  lastScroll = currentScroll;
});
