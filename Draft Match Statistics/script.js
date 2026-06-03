const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const revealItems = document.querySelectorAll('.reveal');
const faqItems = document.querySelectorAll('.faq-item');

const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentSlide = 0;
let autoSlide;

function setHeaderState() {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

setHeaderState();
window.addEventListener('scroll', setHeaderState);

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  },
);

revealItems.forEach(item => observer.observe(item));

faqItems.forEach(item => {
  const button = item.querySelector('.faq-question');

  button.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    faqItems.forEach(faq => faq.classList.remove('active'));

    if (!isActive) {
      item.classList.add('active');
    }
  });
});

function updateCarousel(index) {
  if (!track || !slides.length) return;

  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === currentSlide);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === currentSlide);
  });
}

function nextSlide() {
  updateCarousel(currentSlide + 1);
}

function prevSlide() {
  updateCarousel(currentSlide - 1);
}

function startAutoSlide() {
  stopAutoSlide();
  autoSlide = setInterval(() => {
    nextSlide();
  }, 4200);
}

function stopAutoSlide() {
  if (autoSlide) {
    clearInterval(autoSlide);
  }
}

if (track && slides.length) {
  updateCarousel(0);
  startAutoSlide();

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    startAutoSlide();
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    startAutoSlide();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = Number(dot.dataset.slide);
      updateCarousel(slideIndex);
      startAutoSlide();
    });
  });

  track.addEventListener('mouseenter', stopAutoSlide);
  track.addEventListener('mouseleave', startAutoSlide);

  window.addEventListener('blur', stopAutoSlide);
  window.addEventListener('focus', startAutoSlide);
}

const animatedNumbers = document.querySelectorAll('[data-target]');

const numberObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.target);
      const duration = 1200;
      const startTime = performance.now();

      function animate(time) {
        const progress = Math.min((time - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        element.textContent = value;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.textContent = target;
        }
      }

      requestAnimationFrame(animate);
      numberObserver.unobserve(element);
    });
  },
  {
    threshold: 0.5,
  },
);

animatedNumbers.forEach(number => numberObserver.observe(number));
