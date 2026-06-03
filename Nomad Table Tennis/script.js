const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    burger.classList.toggle('active');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.classList.remove('active');
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
    threshold: 0.14,
  },
);

revealItems.forEach(item => revealObserver.observe(item));

const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentSlide = 0;
let autoPlay;

function showSlide(index) {
  if (!slides.length) return;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  currentSlide = index;
}

function nextSlide() {
  const next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

function prevSlide() {
  const prev = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prev);
}

function startAutoPlay() {
  if (slides.length <= 1) return;
  stopAutoPlay();
  autoPlay = setInterval(nextSlide, 4200);
}

function stopAutoPlay() {
  clearInterval(autoPlay);
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    nextSlide();
    startAutoPlay();
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    prevSlide();
    startAutoPlay();
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    startAutoPlay();
  });
});

showSlide(0);
startAutoPlay();

const metricNumbers = document.querySelectorAll('.metric-card strong');

const animateCounter = element => {
  const finalText = element.textContent.trim();
  const finalValue = parseInt(finalText, 10);

  if (Number.isNaN(finalValue)) return;

  let current = 0;
  const duration = 900;
  const stepTime = Math.max(20, Math.floor(duration / finalValue));

  const timer = setInterval(() => {
    current += 1;
    element.textContent = current;

    if (current >= finalValue) {
      element.textContent = finalText;
      clearInterval(timer);
    }
  }, stepTime);
};

const metricObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const strong = entry.target.querySelector('strong');
        if (strong && !entry.target.dataset.animated) {
          animateCounter(strong);
          entry.target.dataset.animated = 'true';
        }
      }
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll('.metric-card').forEach(card => {
  metricObserver.observe(card);
});

const heroVisual = document.querySelector('.hero-visual');

window.addEventListener('mousemove', event => {
  if (!heroVisual || window.innerWidth < 1100) return;

  const rect = heroVisual.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const moveX = (event.clientX - centerX) / 45;
  const moveY = (event.clientY - centerY) / 45;

  heroVisual.style.transform = `translate3d(${moveX * 0.35}px, ${moveY * 0.35}px, 0)`;
});
