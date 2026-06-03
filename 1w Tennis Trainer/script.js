// script.js
const slides = document.querySelectorAll('.slide');
const dotsWrap = document.querySelector('.dots');
const prevBtn = document.querySelector('.car-btn.prev');
const nextBtn = document.querySelector('.next-btn');
const currentTitle = document.querySelector('.carousel-meta strong');

const titles = [
  'Clean dashboard',
  'Match setup',
  'Live scoring',
  'Training library',
  'Smart timer',
  'Player profile',
];

let activeSlide = 0;

slides.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.addEventListener('click', () => {
    activeSlide = index;
    updateCarousel();
  });
  dotsWrap.appendChild(dot);
});

const dots = dotsWrap.querySelectorAll('button');

function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.className = 'slide';

    const diff = (index - activeSlide + slides.length) % slides.length;

    if (diff === 0) slide.classList.add('active');
    else if (diff === 1) slide.classList.add('next');
    else if (diff === 2) slide.classList.add('far');
    else if (diff === slides.length - 1) slide.classList.add('prev');
    else if (diff === slides.length - 2) slide.classList.add('far-left');
    else slide.classList.add('hidden');
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeSlide);
  });

  if (currentTitle)
    currentTitle.textContent = titles[activeSlide] || 'App preview';
}

function nextSlide() {
  activeSlide = (activeSlide + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  activeSlide = (activeSlide - 1 + slides.length) % slides.length;
  updateCarousel();
}

nextBtn?.addEventListener('click', nextSlide);
prevBtn?.addEventListener('click', prevSlide);

let autoSlide = setInterval(nextSlide, 3600);

document.querySelector('.carousel')?.addEventListener('mouseenter', () => {
  clearInterval(autoSlide);
});

document.querySelector('.carousel')?.addEventListener('mouseleave', () => {
  autoSlide = setInterval(nextSlide, 3600);
});

updateCarousel();

const revealItems = document.querySelectorAll(
  '.section-head, .feature-grid article, .training-left, .training-panel, .match-card, .score-ui, .cta-box',
);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.18 },
);

revealItems.forEach(item => {
  item.classList.add('reveal');
  revealObserver.observe(item);
});

const style = document.createElement('style');
style.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(34px);
    transition: opacity .75s ease, transform .75s ease;
  }

  .reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .feature-grid article:nth-child(2) { transition-delay: .08s; }
  .feature-grid article:nth-child(3) { transition-delay: .16s; }
  .feature-grid article:nth-child(4) { transition-delay: .24s; }
`;
document.head.appendChild(style);

const navLinks = document.querySelectorAll(".nav a, .footer a[href^='#']");
navLinks.forEach(link => {
  link.addEventListener('click', event => {
    const href = link.getAttribute('href');

    if (href && href.startsWith('#')) {
      event.preventDefault();
      document.querySelector(href)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

const buttons = document.querySelectorAll('.btn, .download, .car-btn');
buttons.forEach(button => {
  button.addEventListener('mousemove', event => {
    const rect = button.getBoundingClientRect();
    button.style.setProperty('--x', `${event.clientX - rect.left}px`);
    button.style.setProperty('--y', `${event.clientY - rect.top}px`);
  });
});

let playerScore = 0;
let friendScore = 0;

const scoreText = document.querySelector('.score-box strong');
const scoreButtons = document.querySelectorAll('.score-columns button');

scoreButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (index === 0) playerScore++;
    if (index === 1) friendScore++;

    if (scoreText) scoreText.textContent = `${playerScore} - ${friendScore}`;

    button.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.16)' },
        { transform: 'scale(1)' },
      ],
      {
        duration: 260,
        easing: 'ease-out',
      },
    );
  });
});

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 24) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
});

const headerStyle = document.createElement('style');
headerStyle.textContent = `
  .header.scrolled {
    background: rgba(255,255,255,.9);
    box-shadow: 0 20px 60px rgba(33,135,176,.18);
  }
`;
document.head.appendChild(headerStyle);
