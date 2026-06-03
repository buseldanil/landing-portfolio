// script.js
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    burger.classList.toggle('active');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.classList.remove('active');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');

if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
    },
  );

  revealItems.forEach(item => revealObserver.observe(item));
}

const screenImages = [
  {
    src: 'photo1.jpeg',
    alt: 'Winter Plays onboarding welcome screen',
  },
  {
    src: 'photo2.jpeg',
    alt: 'Winter Plays key features screen',
  },
  {
    src: 'photo3.jpeg',
    alt: 'Winter Plays home dashboard',
  },
  {
    src: 'photo4.jpeg',
    alt: 'Winter Plays disciplines screen',
  },
  {
    src: 'photo5.jpeg',
    alt: 'Winter Plays favourites screen',
  },
  {
    src: 'photo6.jpeg',
    alt: 'Winter Plays records screen',
  },
  {
    src: 'photo7.jpeg',
    alt: 'Winter Plays live results screen',
  },
  {
    src: 'photo8.jpeg',
    alt: 'Winter Plays tickets screen',
  },
];

const sliderImage = document.getElementById('sliderImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');

let currentSlide = 0;
let autoPlay;

function renderDots() {
  if (!sliderDots) return;
  sliderDots.innerHTML = '';

  screenImages.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to screen ${index + 1}`);
    if (index === currentSlide) dot.classList.add('active');

    dot.addEventListener('click', () => {
      currentSlide = index;
      updateSlider();
      restartAutoplay();
    });

    sliderDots.appendChild(dot);
  });
}

function updateSlider() {
  if (!sliderImage) return;

  sliderImage.style.opacity = '0';

  setTimeout(() => {
    sliderImage.src = screenImages[currentSlide].src;
    sliderImage.alt = screenImages[currentSlide].alt;
    sliderImage.style.opacity = '1';
    renderDots();
  }, 160);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % screenImages.length;
  updateSlider();
}

function prevSlideAction() {
  currentSlide = (currentSlide - 1 + screenImages.length) % screenImages.length;
  updateSlider();
}

function startAutoplay() {
  autoPlay = setInterval(nextSlide, 3500);
}

function restartAutoplay() {
  clearInterval(autoPlay);
  startAutoplay();
}

if (sliderImage) {
  sliderImage.style.transition = 'opacity 0.25s ease';
  renderDots();
  startAutoplay();

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlideAction();
      restartAutoplay();
    });
  }
}
