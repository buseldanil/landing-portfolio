const body = document.body;
const header = document.querySelector('.site-header');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const cursorLight = document.querySelector('.cursor-light');

if (burger && nav) {
  burger.addEventListener('click', () => {
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
  if (!cursorLight) return;

  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
  cursorLight.style.opacity = '1';
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

const magneticButtons = document.querySelectorAll('.magnetic');

magneticButtons.forEach(button => {
  button.addEventListener('mousemove', event => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.14}px, ${y * 0.16}px) translateY(-4px)`;
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = '';
  });
});

const tiltElements = document.querySelectorAll('.tilt');

tiltElements.forEach(item => {
  const originalTransform = getComputedStyle(item).transform;

  item.addEventListener('mousemove', event => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 9;
    const rotateX = (y / rect.height - 0.5) * -9;

    item.style.transition = 'transform 0.08s ease';
    item.style.transform = `${originalTransform === 'none' ? '' : originalTransform} rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transition = 'transform 0.35s ease';
    item.style.transform = '';
  });
});

const screenCards = document.querySelectorAll('.screen-card');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const screenTitle = document.querySelector('#screenTitle');

let activeScreen = 0;
let carouselTimer;

function renderCarousel() {
  screenCards.forEach((card, index) => {
    card.classList.remove('active', 'prev-screen', 'next-screen');

    if (index === activeScreen) {
      card.classList.add('active');

      if (screenTitle) {
        screenTitle.textContent = card.dataset.title || 'Preview';
      }
    }

    if (
      index ===
      (activeScreen - 1 + screenCards.length) % screenCards.length
    ) {
      card.classList.add('prev-screen');
    }

    if (index === (activeScreen + 1) % screenCards.length) {
      card.classList.add('next-screen');
    }
  });
}

function nextSlide() {
  activeScreen = (activeScreen + 1) % screenCards.length;
  renderCarousel();
}

function prevSlide() {
  activeScreen = (activeScreen - 1 + screenCards.length) % screenCards.length;
  renderCarousel();
}

function startCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(nextSlide, 4200);
}

if (screenCards.length) {
  renderCarousel();
  startCarousel();

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      nextSlide();
      startCarousel();
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      prevSlide();
      startCarousel();
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
