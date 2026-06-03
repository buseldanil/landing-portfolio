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
  { threshold: 0.14 },
);

revealItems.forEach(item => revealObserver.observe(item));

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

let currentSlide = 0;
let sliderInterval = null;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  currentSlide = index;
}

function nextSlide() {
  if (!slides.length) return;
  const nextIndex = (currentSlide + 1) % slides.length;
  showSlide(nextIndex);
}

function prevSlide() {
  if (!slides.length) return;
  const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
}

function startSlider() {
  if (slides.length > 1) {
    stopSlider();
    sliderInterval = setInterval(nextSlide, 3500);
  }
}

function stopSlider() {
  if (sliderInterval) {
    clearInterval(sliderInterval);
  }
}

if (slides.length) {
  startSlider();

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    startSlider();
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    startSlider();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startSlider();
    });
  });
}

const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 10;
    const rotateX = (y / rect.height - 0.5) * -10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (!header) return;

  if (window.scrollY > 20) {
    header.style.background = 'rgba(4, 16, 36, 0.88)';
    header.style.boxShadow = '0 10px 35px rgba(0,0,0,0.28)';
  } else {
    header.style.background = 'rgba(4, 16, 36, 0.7)';
    header.style.boxShadow = 'none';
  }
});

const parallaxTargets = document.querySelectorAll('.phone-side, .phone-main');

window.addEventListener('mousemove', event => {
  const x = (event.clientX / window.innerWidth - 0.5) * 10;
  const y = (event.clientY / window.innerHeight - 0.5) * 10;

  parallaxTargets.forEach(item => {
    if (item.classList.contains('phone-main')) {
      item.style.transform = `translate3d(${x * 0.4}px, ${y * 0.4}px, 0)`;
    }
    if (item.classList.contains('phone-side-left')) {
      item.style.transform = `rotate(-14deg) translate3d(${x * 0.6}px, ${y * 0.6}px, 0)`;
    }
    if (item.classList.contains('phone-side-right')) {
      item.style.transform = `rotate(14deg) translate3d(${x * 0.6}px, ${y * 0.6}px, 0)`;
    }
  });
});
