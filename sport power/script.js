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
      const href = link.getAttribute('href');
      const target = document.querySelector(href);

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
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
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
  const featureText = document.getElementById('featureText');

  function activateFeature(card) {
    if (!card || !featureImage || !featureTitle || !featureText) return;

    featureCards.forEach(item => item.classList.remove('active-feature'));
    card.classList.add('active-feature');

    featureImage.src = card.dataset.image || '';
    featureTitle.textContent = card.dataset.title || '';
    featureText.textContent = card.dataset.text || '';
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
      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  const reviewCards = document.querySelectorAll('.review-card');

  if (reviewCards.length > 1) {
    let index = 0;

    setInterval(() => {
      reviewCards.forEach(card => card.classList.remove('featured-review'));
      index = (index + 1) % reviewCards.length;
      reviewCards[index].classList.add('featured-review');
    }, 3200);
  }

  document.querySelectorAll('#year').forEach(element => {
    element.textContent = new Date().getFullYear();
  });
});
