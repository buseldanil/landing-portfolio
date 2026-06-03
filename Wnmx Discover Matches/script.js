const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

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

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  },
);

revealItems.forEach(item => revealObserver.observe(item));

const screens = document.querySelectorAll('.screen');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
let activeScreen = 0;

function renderScreens() {
  screens.forEach((screen, index) => {
    screen.classList.remove('active', 'prev-screen', 'next-screen');

    if (index === activeScreen) {
      screen.classList.add('active');
    }

    if (index === (activeScreen - 1 + screens.length) % screens.length) {
      screen.classList.add('prev-screen');
    }

    if (index === (activeScreen + 1) % screens.length) {
      screen.classList.add('next-screen');
    }
  });
}

if (screens.length) {
  renderScreens();

  nextButton.addEventListener('click', () => {
    activeScreen = (activeScreen + 1) % screens.length;
    renderScreens();
  });

  prevButton.addEventListener('click', () => {
    activeScreen = (activeScreen - 1 + screens.length) % screens.length;
    renderScreens();
  });

  setInterval(() => {
    activeScreen = (activeScreen + 1) % screens.length;
    renderScreens();
  }, 4300);
}

const heroVisual = document.querySelector('.hero-visual');

if (heroVisual) {
  window.addEventListener('mousemove', event => {
    const x = (event.clientX / window.innerWidth - 0.5) * 16;
    const y = (event.clientY / window.innerHeight - 0.5) * 16;
    heroVisual.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
}

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.style.transform = 'translateY(-4px)';
  } else {
    header.style.transform = 'translateY(0)';
  }
});
