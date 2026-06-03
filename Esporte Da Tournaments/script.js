const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    body.classList.toggle('menu-open');
  });
}

mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
  });
});

const revealElements = document.querySelectorAll('.reveal');

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

revealElements.forEach(element => revealObserver.observe(element));

const track = document.getElementById('showcaseTrack');
const dots = document.querySelectorAll('#showcaseDots .dot');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
const slides = document.querySelectorAll('.showcase-slide');

let currentIndex = 0;
let autoSlider;

function updateSlider(index) {
  if (!track || !slides.length) return;

  currentIndex = index;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === currentIndex);
  });
}

function goNext() {
  const nextIndex = (currentIndex + 1) % slides.length;
  updateSlider(nextIndex);
}

function goPrev() {
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider(prevIndex);
}

function startAutoSlider() {
  if (!slides.length) return;
  autoSlider = setInterval(goNext, 4600);
}

function restartAutoSlider() {
  clearInterval(autoSlider);
  startAutoSlider();
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    goNext();
    restartAutoSlider();
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    goPrev();
    restartAutoSlider();
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    updateSlider(index);
    restartAutoSlider();
  });
});

updateSlider(0);
startAutoSlider();
