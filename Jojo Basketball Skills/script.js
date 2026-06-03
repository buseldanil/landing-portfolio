const header = document.getElementById('header');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const navLinks = document.querySelectorAll('.mobile-menu a, .nav a');
const revealItems = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.counter');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const tiltCards = document.querySelectorAll('.tilt-card');
const screenCards = document.querySelectorAll('.screen-card, .shot-card');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

function updateHeaderState() {
  if (window.scrollY > 20) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
}

updateHeaderState();
window.addEventListener('scroll', updateHeaderState);

function openMenu() {
  mobileMenu.classList.add('is-open');
  burger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (burger) {
  burger.addEventListener('click', openMenu);
}

if (closeMenu) {
  closeMenu.addEventListener('click', closeMobileMenu);
}

if (mobileMenu) {
  mobileMenu.addEventListener('click', event => {
    if (event.target === mobileMenu) {
      closeMobileMenu();
    }
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMobileMenu();
  });
});

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.12 },
);

revealItems.forEach(item => revealObserver.observe(item));

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.target);
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 35));

      const step = () => {
        current += increment;
        if (current >= target) {
          element.textContent = target;
          return;
        }
        element.textContent = current;
        requestAnimationFrame(step);
      };

      step();
      observer.unobserve(element);
    });
  },
  { threshold: 0.55 },
);

counters.forEach(counter => counterObserver.observe(counter));

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.tab;

    tabButtons.forEach(btn => btn.classList.remove('is-active'));
    tabPanels.forEach(panel => panel.classList.remove('is-active'));

    button.classList.add('is-active');
    document.getElementById(targetId)?.classList.add('is-active');
  });
});

tiltCards.forEach(card => {
  card.addEventListener('mousemove', event => {
    if (window.innerWidth < 992) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt || 'Preview';
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightboxImage.src = '';
  document.body.style.overflow = '';
}

screenCards.forEach(card => {
  card.addEventListener('click', () => {
    const src = card.dataset.image;
    const alt = card.querySelector('img')?.alt || 'Preview';
    openLightbox(src, alt);
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeLightbox();
    closeMobileMenu();
  }
});

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const orbOne = document.querySelector('.hero__orb--one');
  const orbTwo = document.querySelector('.hero__orb--two');

  if (orbOne) {
    orbOne.style.transform = `translateY(${scrolled * 0.05}px)`;
  }

  if (orbTwo) {
    orbTwo.style.transform = `translateY(${scrolled * -0.04}px)`;
  }
});
