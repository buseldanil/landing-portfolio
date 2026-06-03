document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      siteNav.classList.toggle('is-open');
    });

    document.addEventListener('click', event => {
      const clickedInsideNav = siteNav.contains(event.target);
      const clickedMenuButton = menuToggle.contains(event.target);

      if (!clickedInsideNav && !clickedMenuButton) {
        siteNav.classList.remove('is-open');
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        siteNav?.classList.remove('is-open');
      }
    });
  });

  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealItems.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
      },
    );

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const counters = document.querySelectorAll('[data-counter]');

  const animateCounter = el => {
    const target = Number(el.dataset.counter || 0);
    const duration = 1400;
    const startTime = performance.now();

    const update = now => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(update);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.55 },
    );

    counters.forEach(counter => counterObserver.observe(counter));
  } else {
    counters.forEach(counter => animateCounter(counter));
  }

  const featureCards = document.querySelectorAll('.feature-card');
  const previewImage = document.getElementById('featurePreview');
  const previewTitle = document.getElementById('featureTitle');
  const previewText = document.getElementById('featureText');

  const activateFeatureCard = card => {
    if (!card || !previewImage || !previewTitle || !previewText) return;

    featureCards.forEach(item => item.classList.remove('is-active'));
    card.classList.add('is-active');

    const image = card.dataset.image;
    const title = card.dataset.title;
    const text = card.dataset.text;

    previewImage.src = image;
    previewTitle.textContent = title;
    previewText.textContent = text;
  };

  featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => activateFeatureCard(card));
    card.addEventListener('focus', () => activateFeatureCard(card));
    card.addEventListener('click', () => activateFeatureCard(card));
  });

  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', event => {
      if (window.innerWidth < 900) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxClose = document.getElementById('lightboxClose');

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (galleryCards.length && lightbox && lightboxImage && lightboxTitle) {
    galleryCards.forEach(card => {
      card.addEventListener('click', () => {
        const image = card.dataset.image;
        const title = card.dataset.title || 'Preview';

        lightboxImage.src = image;
        lightboxTitle.textContent = title;
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  lightboxClose?.addEventListener('click', closeLightbox);

  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  });

  const reviewCards = document.querySelectorAll('.review-card');

  if (reviewCards.length > 1) {
    let activeIndex = 0;

    setInterval(() => {
      reviewCards.forEach(card => card.classList.remove('is-highlighted'));
      activeIndex = (activeIndex + 1) % reviewCards.length;
      reviewCards[activeIndex].classList.add('is-highlighted');
    }, 3200);
  }

  const yearEls = document.querySelectorAll('#year');
  const currentYear = new Date().getFullYear();

  yearEls.forEach(el => {
    el.textContent = currentYear;
  });
});
