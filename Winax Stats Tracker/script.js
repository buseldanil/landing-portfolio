const body = document.body;
const menuButton = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
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
        entry.target.style.transitionDelay = `${Math.min(index * 70, 260)}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealItems.forEach(item => revealObserver.observe(item));

const screenItems = document.querySelectorAll('.screen-item');
const nextButton = document.querySelector('.screen-next');
const prevButton = document.querySelector('.screen-prev');
const screenTitle = document.querySelector('#screenTitle');

let activeScreen = 0;
let screenInterval;

function renderScreens() {
  screenItems.forEach((screen, index) => {
    screen.classList.remove('active', 'prev-screen', 'next-screen');

    if (index === activeScreen) {
      screen.classList.add('active');

      if (screenTitle) {
        screenTitle.textContent = screen.dataset.title || 'Preview';
      }
    }

    if (
      index ===
      (activeScreen - 1 + screenItems.length) % screenItems.length
    ) {
      screen.classList.add('prev-screen');
    }

    if (index === (activeScreen + 1) % screenItems.length) {
      screen.classList.add('next-screen');
    }
  });
}

function nextScreen() {
  activeScreen = (activeScreen + 1) % screenItems.length;
  renderScreens();
}

function previousScreen() {
  activeScreen = (activeScreen - 1 + screenItems.length) % screenItems.length;
  renderScreens();
}

function restartScreenAutoplay() {
  clearInterval(screenInterval);
  screenInterval = setInterval(nextScreen, 4300);
}

if (screenItems.length) {
  renderScreens();
  restartScreenAutoplay();

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      nextScreen();
      restartScreenAutoplay();
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      previousScreen();
      restartScreenAutoplay();
    });
  }
}

const cursorLight = document.querySelector('.cursor-light');

window.addEventListener('mousemove', event => {
  if (!cursorLight) return;

  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
  cursorLight.style.opacity = '1';
});

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

const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 7;
    const rotateX = (y / rect.height - 0.5) * -7;

    card.style.transition = 'transform 0.08s ease';
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.35s ease';
    card.style.transform = '';
  });
});

const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (header) {
    if (currentScroll > 110 && currentScroll > lastScroll) {
      header.style.transform = 'translateY(-112px)';
    } else {
      header.style.transform = 'translateY(0)';
    }
  }

  lastScroll = currentScroll;
});
