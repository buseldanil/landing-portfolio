const header = document.getElementById('header');
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const revealItems = document.querySelectorAll('.reveal');
const tiltCards = document.querySelectorAll('.tilt-card');
const counters = document.querySelectorAll('.counter');
const lightboxButtons = document.querySelectorAll('.js-lightbox');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');

function handleHeader() {
  if (window.scrollY > 16) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
}

handleHeader();
window.addEventListener('scroll', handleHeader, { passive: true });

if (burger) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });
}

if (nav) {
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
    });
  });
}

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');

      if (entry.target.querySelector('.counter')) {
        startCounters(entry.target.querySelectorAll('.counter'));
      }

      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.16 },
);

revealItems.forEach(item => revealObserver.observe(item));

function startCounters(counterItems) {
  counterItems.forEach(counter => {
    if (counter.dataset.started === 'true') return;
    counter.dataset.started = 'true';

    const target = Number(counter.dataset.target || 0);
    const duration = 1300;
    const startTime = performance.now();

    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  });
}

tiltCards.forEach(card => {
  card.addEventListener('mousemove', event => {
    if (window.innerWidth < 900) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((centerY - y) / centerY) * 5;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

function openLightbox(src) {
  if (!lightbox || !lightboxImage) return;

  lightboxImage.src = src;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  setTimeout(() => {
    lightboxImage.src = '';
  }, 180);
}

lightboxButtons.forEach(button => {
  button.addEventListener('click', () => {
    const image = button.dataset.image;
    if (image) {
      openLightbox(image);
    }
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxBackdrop) {
  lightboxBackdrop.addEventListener('click', closeLightbox);
}

window.addEventListener('keydown', event => {
  if (event.key === 'Escape' && lightbox?.classList.contains('is-open')) {
    closeLightbox();
  }
});
