// script.js
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

const revealItems = document.querySelectorAll(
  '.section-head, .feature-card, .builder-copy, .pitch-card, .league-card, .cta-box',
);

revealItems.forEach(item => item.classList.add('reveal'));

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

revealItems.forEach(item => revealObserver.observe(item));

const slides = Array.from(document.querySelectorAll('.screen-slide'));
const dots = Array.from(document.querySelectorAll('.carousel-dots button'));
const slideTitle = document.getElementById('slideTitle');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');

let activeIndex = 0;
let autoplayTimer = null;

function getPosition(index, active) {
  const total = slides.length;
  const diff = (index - active + total) % total;

  if (diff === 0) return 'is-active';
  if (diff === 1) return 'is-next';
  if (diff === 2) return 'is-far';
  if (diff === total - 1) return 'is-prev';
  if (diff === total - 2) return 'is-far-prev';

  return 'is-hidden';
}

function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.className = `screen-slide ${getPosition(index, activeIndex)}`;
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeIndex);
  });

  if (slideTitle && slides[activeIndex]) {
    slideTitle.textContent = slides[activeIndex].dataset.title || 'App Screen';
  }
}

function nextSlide() {
  activeIndex = (activeIndex + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  activeIndex = (activeIndex - 1 + slides.length) % slides.length;
  updateCarousel();
}

function restartAutoplay() {
  clearInterval(autoplayTimer);
  autoplayTimer = setInterval(nextSlide, 3600);
}

if (nextBtn && prevBtn && slides.length) {
  nextBtn.addEventListener('click', () => {
    nextSlide();
    restartAutoplay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    restartAutoplay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      activeIndex = index;
      updateCarousel();
      restartAutoplay();
    });
  });

  updateCarousel();
  restartAutoplay();
}

const cardStack = document.querySelector('.card-stack');

if (cardStack) {
  window.addEventListener('mousemove', event => {
    const x = (event.clientX / window.innerWidth - 0.5) * 18;
    const y = (event.clientY / window.innerHeight - 0.5) * 18;

    cardStack.style.transform = `translateX(-50%) rotateX(${-y * 0.25}deg) rotateY(${x * 0.25}deg)`;
  });

  window.addEventListener('mouseleave', () => {
    cardStack.style.transform = 'translateX(-50%) rotateX(0) rotateY(0)';
  });
}

const pitchPositions = document.querySelectorAll('.pos');

pitchPositions.forEach(pos => {
  pos.addEventListener('click', () => {
    pos.classList.toggle('filled');

    if (pos.classList.contains('filled')) {
      const role = pos.querySelector('small')?.textContent || 'PL';
      pos.innerHTML = `<span>${role}</span><small>74</small>`;
      pos.style.background = 'linear-gradient(135deg, #ff7b98, #b40731)';
      pos.style.color = '#fff';
      pos.style.boxShadow = '0 20px 45px rgba(180, 7, 49, 0.28)';
    } else {
      const role = pos.querySelector('span')?.textContent || 'ST';
      pos.innerHTML = `+<small>${role}</small>`;
      pos.style.background = 'rgba(255, 255, 255, 0.82)';
      pos.style.color = 'var(--red-dark)';
      pos.style.boxShadow = '0 12px 30px rgba(189, 39, 75, 0.1)';
    }
  });
});

const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
  if (!header) return;

  if (window.scrollY > 60) {
    header.style.boxShadow = '0 18px 60px rgba(90, 22, 37, 0.22)';
    header.style.background = 'rgba(255, 255, 255, 0.86)';
  } else {
    header.style.boxShadow = '0 18px 60px rgba(90, 22, 37, 0.14)';
    header.style.background = 'rgba(255, 255, 255, 0.72)';
  }
});
