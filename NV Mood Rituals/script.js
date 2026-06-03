const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  {
    threshold: 0.16,
  },
);

revealItems.forEach(item => revealObserver.observe(item));

const shots = Array.from(document.querySelectorAll('.shot'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsWrap = document.getElementById('carouselDots');

let activeIndex = 0;
let autoTimer;

function buildDots() {
  if (!dotsWrap) return;

  shots.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to screenshot ${index + 1}`);
    dot.addEventListener('click', () => {
      activeIndex = index;
      updateCarousel();
      restartAuto();
    });
    dotsWrap.appendChild(dot);
  });
}

function updateCarousel() {
  const total = shots.length;

  shots.forEach((shot, index) => {
    shot.className = 'shot';

    const diff = (index - activeIndex + total) % total;

    if (diff === 0) {
      shot.classList.add('active');
    } else if (diff === 1) {
      shot.classList.add('next');
    } else if (diff === 2) {
      shot.classList.add('far-next');
    } else if (diff === total - 1) {
      shot.classList.add('prev');
    } else if (diff === total - 2) {
      shot.classList.add('far-prev');
    } else {
      shot.classList.add('hidden-shot');
    }
  });

  if (dotsWrap) {
    Array.from(dotsWrap.children).forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  }
}

function nextSlide() {
  activeIndex = (activeIndex + 1) % shots.length;
  updateCarousel();
}

function prevSlide() {
  activeIndex = (activeIndex - 1 + shots.length) % shots.length;
  updateCarousel();
}

function startAuto() {
  autoTimer = setInterval(nextSlide, 3600);
}

function restartAuto() {
  clearInterval(autoTimer);
  startAuto();
}

if (shots.length) {
  buildDots();
  updateCarousel();
  startAuto();

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAuto();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartAuto();
    });
  }
}

let startX = 0;
let endX = 0;
const carousel = document.getElementById('carousel');

if (carousel) {
  carousel.addEventListener('touchstart', event => {
    startX = event.touches[0].clientX;
  });

  carousel.addEventListener('touchmove', event => {
    endX = event.touches[0].clientX;
  });

  carousel.addEventListener('touchend', () => {
    const distance = startX - endX;

    if (Math.abs(distance) > 45) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }

      restartAuto();
    }

    startX = 0;
    endX = 0;
  });
}
