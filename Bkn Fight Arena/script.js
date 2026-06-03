const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
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
  {
    threshold: 0.18,
  },
);

revealItems.forEach(item => revealObserver.observe(item));

const cards = Array.from(document.querySelectorAll('.screen-card'));
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dotsWrap = document.querySelector('.carousel-dots');
const currentSlide = document.querySelector('.current-slide');
const progressLine = document.querySelector('.slide-line i');

let activeIndex = 0;
let autoTimer;

function twoDigits(num) {
  return String(num + 1).padStart(2, '0');
}

function updateCarousel() {
  cards.forEach((card, index) => {
    card.classList.remove(
      'active',
      'prev-card',
      'next-card',
      'far-prev',
      'far-next',
    );

    const total = cards.length;
    const prevIndex = (activeIndex - 1 + total) % total;
    const nextIndex = (activeIndex + 1) % total;
    const farPrevIndex = (activeIndex - 2 + total) % total;
    const farNextIndex = (activeIndex + 2) % total;

    if (index === activeIndex) {
      card.classList.add('active');
    } else if (index === prevIndex) {
      card.classList.add('prev-card');
    } else if (index === nextIndex) {
      card.classList.add('next-card');
    } else if (index === farPrevIndex) {
      card.classList.add('far-prev');
    } else if (index === farNextIndex) {
      card.classList.add('far-next');
    }
  });

  if (currentSlide) {
    currentSlide.textContent = twoDigits(activeIndex);
  }

  if (progressLine) {
    const offset = activeIndex * 100;
    progressLine.style.transform = `translateX(${offset}%)`;
  }

  if (dotsWrap) {
    dotsWrap.querySelectorAll('button').forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  }
}

function nextSlide() {
  activeIndex = (activeIndex + 1) % cards.length;
  updateCarousel();
}

function prevSlide() {
  activeIndex = (activeIndex - 1 + cards.length) % cards.length;
  updateCarousel();
}

function restartAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(nextSlide, 3600);
}

if (cards.length) {
  cards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Open screenshot ${index + 1}`);
    dot.addEventListener('click', () => {
      activeIndex = index;
      updateCarousel();
      restartAuto();
    });
    dotsWrap.appendChild(dot);
  });

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    restartAuto();
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    restartAuto();
  });

  let startX = 0;

  document
    .querySelector('.premium-carousel')
    ?.addEventListener('touchstart', event => {
      startX = event.touches[0].clientX;
    });

  document
    .querySelector('.premium-carousel')
    ?.addEventListener('touchend', event => {
      const endX = event.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 45) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }

        restartAuto();
      }
    });

  updateCarousel();
  restartAuto();
}

const header = document.querySelector('.site-header');
let headerTicking = false;
let scrollEndTimer;

function updateHeaderState() {
  if (!header) return;

  header.classList.toggle('scrolled', window.scrollY > 40);
  headerTicking = false;
}

window.addEventListener(
  'scroll',
  () => {
    document.body.classList.add('is-scrolling');
    clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => {
      document.body.classList.remove('is-scrolling');
    }, 140);

    if (!headerTicking) {
      window.requestAnimationFrame(updateHeaderState);
      headerTicking = true;
    }
  },
  { passive: true },
);

updateHeaderState();

if (window.matchMedia('(pointer: fine)').matches) {
  document
    .querySelectorAll('.feature-card, .dna-card, .arena-panel, .final-card')
    .forEach(card => {
      let frame = null;

      card.addEventListener('mousemove', event => {
        if (frame) return;

        frame = window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          card.style.setProperty('--spot-x', `${x}px`);
          card.style.setProperty('--spot-y', `${y}px`);
          frame = null;
        });
      });

      card.addEventListener('mouseleave', () => {
        card.style.removeProperty('--spot-x');
        card.style.removeProperty('--spot-y');
      });
    });
}
