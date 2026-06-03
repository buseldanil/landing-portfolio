// Mobile menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
}

// Reveal on scroll
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
    threshold: 0.15,
  },
);

revealItems.forEach(item => revealObserver.observe(item));

// Counter animation
const counters = document.querySelectorAll('.stat-number');
let countersStarted = false;

function animateCounter(el) {
  const target = Number(el.dataset.count);
  const duration = 1400;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(updateCounter);
}

const statsStrip = document.querySelector('.stats-strip');

if (statsStrip) {
  const statsObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          counters.forEach(counter => animateCounter(counter));
          countersStarted = true;
        }
      });
    },
    {
      threshold: 0.3,
    },
  );

  statsObserver.observe(statsStrip);
}

// Scroll top button
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

// Carousel
const slides = document.querySelectorAll('.screen-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

let currentSlide = 0;
let autoSlide;

function createDots() {
  if (!dotsContainer || !slides.length) return;

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = document.querySelectorAll('.carousel-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function goToSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));

  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  updateDots();
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

function startAutoSlide() {
  if (slides.length <= 1) return;
  autoSlide = setInterval(() => {
    nextSlide();
  }, 4500);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

if (slides.length) {
  createDots();
  goToSlide(0);
  startAutoSlide();

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
  }
}

// Header shadow on scroll
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (!header) return;

  if (window.scrollY > 20) {
    header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.25)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll(
  '.nav-menu a[href^="#"], .mobile-menu a[href^="#"]',
);

function setActiveLink() {
  let currentId = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active-link');
    }
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Small parallax effect for background orbs
const orbs = document.querySelectorAll('.orb');

window.addEventListener('mousemove', e => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 10;
    const moveX = (x - 0.5) * speed;
    const moveY = (y - 0.5) * speed;
    orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});
