const header = document.getElementById('siteHeader');
const burger = document.getElementById('burger');
const nav = document.getElementById('mainNav');
const cursorLight = document.getElementById('cursorLight');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

burger.addEventListener('click', () => {
  nav.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});

if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', event => {
    cursorLight.style.opacity = '1';
    cursorLight.style.left = `${event.clientX}px`;
    cursorLight.style.top = `${event.clientY}px`;
  });

  window.addEventListener('mouseleave', () => {
    cursorLight.style.opacity = '0';
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
    threshold: 0.16,
  },
);

revealElements.forEach(element => revealObserver.observe(element));

const screens = Array.from(document.querySelectorAll('.screen'));
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
const dotsWrap = document.getElementById('carouselDots');

let activeSlide = 0;
let sliderTimer = null;

screens.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Open screenshot ${index + 1}`);
  dot.addEventListener('click', () => {
    activeSlide = index;
    updateSlider();
    restartSlider();
  });
  dotsWrap.appendChild(dot);
});

const dots = Array.from(dotsWrap.querySelectorAll('button'));

function updateSlider() {
  const total = screens.length;
  const prev = (activeSlide - 1 + total) % total;
  const next = (activeSlide + 1) % total;
  const prev2 = (activeSlide - 2 + total) % total;
  const next2 = (activeSlide + 2) % total;

  screens.forEach((screen, index) => {
    screen.classList.remove('active', 'prev', 'next', 'prev2', 'next2');

    if (index === activeSlide) {
      screen.classList.add('active');
    }

    if (index === prev) {
      screen.classList.add('prev');
    }

    if (index === next) {
      screen.classList.add('next');
    }

    if (index === prev2) {
      screen.classList.add('prev2');
    }

    if (index === next2) {
      screen.classList.add('next2');
    }
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeSlide);
  });
}

function goNext() {
  activeSlide = (activeSlide + 1) % screens.length;
  updateSlider();
}

function goPrev() {
  activeSlide = (activeSlide - 1 + screens.length) % screens.length;
  updateSlider();
}

function startSlider() {
  sliderTimer = setInterval(goNext, 3500);
}

function restartSlider() {
  clearInterval(sliderTimer);
  startSlider();
}

nextSlide.addEventListener('click', () => {
  goNext();
  restartSlider();
});

prevSlide.addEventListener('click', () => {
  goPrev();
  restartSlider();
});

updateSlider();
startSlider();

const magneticItems = document.querySelectorAll(
  '.btn, .download-btn, .carousel-arrow',
);

magneticItems.forEach(item => {
  item.addEventListener('mousemove', event => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    item.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});
