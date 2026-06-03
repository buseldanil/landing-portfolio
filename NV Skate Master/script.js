document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      siteNav.classList.toggle('open');
    });

    document.addEventListener('click', event => {
      const clickedInsideMenu = siteNav.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        siteNav.classList.remove('open');
      }
    });
  }

  document.querySelectorAll('.site-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        siteNav?.classList.remove('open');
      }
    });
  });

  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14 },
    );

    revealElements.forEach(element => revealObserver.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add('visible'));
  }

  const counters = document.querySelectorAll('[data-counter]');

  function runCounter(element) {
    const target = Number(element.dataset.counter || 0);
    const duration = 1400;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.floor(target * eased);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.55 },
    );

    counters.forEach(counter => counterObserver.observe(counter));
  } else {
    counters.forEach(counter => runCounter(counter));
  }

  const featureCards = document.querySelectorAll('.feature-card');
  const featureImage = document.getElementById('featureImage');
  const featureTitle = document.getElementById('featureTitle');
  const featureDescription = document.getElementById('featureDescription');

  function activateFeature(card) {
    if (!card || !featureImage || !featureTitle || !featureDescription) return;

    featureCards.forEach(item => item.classList.remove('active-feature'));
    card.classList.add('active-feature');

    featureImage.src = card.dataset.image || '';
    featureTitle.textContent = card.dataset.title || '';
    featureDescription.textContent = card.dataset.description || '';
  }

  featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => activateFeature(card));
    card.addEventListener('focus', () => activateFeature(card));
    card.addEventListener('click', () => activateFeature(card));
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
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxClose = document.getElementById('lightboxClose');

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-visible');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      if (!lightbox || !lightboxImage || !lightboxTitle) return;

      lightboxImage.src = item.dataset.image || '';
      lightboxTitle.textContent = item.dataset.title || 'Preview';
      lightbox.classList.add('is-visible');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

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
    let index = 0;

    setInterval(() => {
      reviewCards.forEach(card => card.classList.remove('spotlight-review'));
      index = (index + 1) % reviewCards.length;
      reviewCards[index].classList.add('spotlight-review');
    }, 3200);
  }

  document.querySelectorAll('#year').forEach(element => {
    element.textContent = new Date().getFullYear();
  });
});
