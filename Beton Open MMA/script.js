const burger = document.querySelector('.burger');
const body = document.body;
const mobileLinks = document.querySelectorAll('.mobile-menu a');

if (burger) {
  burger.addEventListener('click', () => {
    body.classList.toggle('menu-open');
  });
}

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
  });
});

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  },
  {
    threshold: 0.14,
  },
);

revealItems.forEach(item => revealObserver.observe(item));

const sliderTrack = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');

let currentSlide = 0;
let autoSlide;

function updateSlider(index) {
  if (!sliderTrack || !slides.length) return;

  currentSlide = index;
  sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() {
  const nextIndex = (currentSlide + 1) % slides.length;
  updateSlider(nextIndex);
}

function prevSlide() {
  const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
  updateSlider(prevIndex);
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    nextSlide();
    restartAutoSlide();
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    prevSlide();
    restartAutoSlide();
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    updateSlider(index);
    restartAutoSlide();
  });
});

function startAutoSlide() {
  if (!slides.length) return;
  autoSlide = setInterval(nextSlide, 4800);
}

function restartAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

updateSlider(0);
startAutoSlide();
