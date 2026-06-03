const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('open');
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
  { threshold: 0.16 },
);

revealItems.forEach(item => revealObserver.observe(item));

const carouselTrack = document.querySelector('.carousel-track');
const carouselCards = Array.from(document.querySelectorAll('.screen-card'));
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
const dotsWrap = document.querySelector('.carousel-dots');

let carouselIndex = 0;
let autoTimer;

function getCardStep() {
  const card = carouselCards[0];
  if (!card) return 0;
  const style = window.getComputedStyle(carouselTrack);
  const gap = parseFloat(style.columnGap || style.gap || 0);
  return card.getBoundingClientRect().width + gap;
}

function buildDots() {
  if (!dotsWrap) return;

  dotsWrap.innerHTML = '';

  carouselCards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to screen ${index + 1}`);

    dot.addEventListener('click', () => {
      carouselIndex = index;
      updateCarousel();
      restartCarousel();
    });

    dotsWrap.appendChild(dot);
  });
}

function updateCarousel() {
  if (!carouselTrack || !carouselCards.length) return;

  const step = getCardStep();
  carouselTrack.style.transform = `translateX(${-carouselIndex * step}px)`;

  carouselCards.forEach((card, index) => {
    card.classList.toggle('is-active', index === carouselIndex);
  });

  if (dotsWrap) {
    Array.from(dotsWrap.children).forEach((dot, index) => {
      dot.classList.toggle('active', index === carouselIndex);
    });
  }
}

function nextSlide() {
  carouselIndex = (carouselIndex + 1) % carouselCards.length;
  updateCarousel();
}

function prevSlide() {
  carouselIndex =
    (carouselIndex - 1 + carouselCards.length) % carouselCards.length;
  updateCarousel();
}

function startCarousel() {
  autoTimer = setInterval(nextSlide, 3600);
}

function restartCarousel() {
  clearInterval(autoTimer);
  startCarousel();
}

if (carouselTrack && carouselCards.length) {
  buildDots();
  updateCarousel();
  startCarousel();

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    restartCarousel();
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    restartCarousel();
  });

  window.addEventListener('resize', updateCarousel);

  carouselTrack.addEventListener('mouseenter', () => clearInterval(autoTimer));
  carouselTrack.addEventListener('mouseleave', startCarousel);
}

const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (!header) return;

  if (window.scrollY > 20) {
    header.style.boxShadow = '0 22px 70px rgba(9, 81, 76, 0.16)';
    header.style.background = 'rgba(255, 255, 255, 0.9)';
  } else {
    header.style.boxShadow = '0 18px 60px rgba(9, 81, 76, 0.10)';
    header.style.background = 'rgba(255, 255, 255, 0.78)';
  }
});

const animatedNumbers = document.querySelectorAll('.hero-stats strong');

animatedNumbers.forEach(number => {
  const raw = number.textContent.trim();

  if (!/^\d+$/.test(raw)) return;

  const target = Number(raw);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 28));

  const numberObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;

      const interval = setInterval(() => {
        current += step;

        if (current >= target) {
          number.textContent = target;
          clearInterval(interval);
        } else {
          number.textContent = current;
        }
      }, 28);

      numberObserver.disconnect();
    },
    { threshold: 0.6 },
  );

  numberObserver.observe(number);
});
