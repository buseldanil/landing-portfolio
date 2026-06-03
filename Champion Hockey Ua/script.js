const body = document.body;
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
const lightboxTriggers = document.querySelectorAll('.js-lightbox');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const heroBackdrop = document.querySelector('.hero__backdrop');
function updateHeaderState() {
  if (window.scrollY > 20) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
}
updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });
function openMenu() {
  mobileMenu.classList.add('is-open');
  body.classList.add('menu-open');
}
function closeMobileMenu() {
  mobileMenu.classList.remove('is-open');
  body.classList.remove('menu-open');
}
burger?.addEventListener('click', openMenu);
closeMenu?.addEventListener('click', closeMobileMenu);
mobileMenu?.addEventListener('click', event => {
  if (event.target === mobileMenu) {
    closeMobileMenu();
  }
});
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
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: '0px 0px -40px 0px' },
);
revealItems.forEach(item => revealObserver.observe(item));
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.target);
      const duration = 1200;
      const startTime = performance.now();
      function animate(time) {
        const progress = Math.min((time - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        element.textContent = value;
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.textContent = target;
        }
      }
      requestAnimationFrame(animate);
      observer.unobserve(element);
    });
  },
  { threshold: 0.6 },
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
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg)
rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt || 'Preview';
  lightbox.classList.add('is-open');
  body.classList.add('lightbox-open');
}
function closeLightbox() {
  lightbox.classList.remove('is-open');
  body.classList.remove('lightbox-open');
  lightboxImage.src = '';
}
lightboxTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const src = trigger.dataset.image;
    const alt = trigger.querySelector('img')?.alt || 'Preview';
    openLightbox(src, alt);
  });
});
lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});
window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeLightbox();
    closeMobileMenu();
  }
});
let ticking = false;
function applyParallax() {
  const scrollY = window.scrollY;
  if (heroBackdrop && window.innerWidth > 720) {
    heroBackdrop.style.transform = `scale(1.08) translateY(${scrollY * 0.08}px)`;
  }
  ticking = false;
}
window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      requestAnimationFrame(applyParallax);
      ticking = true;
    }
  },
  { passive: true },
);
