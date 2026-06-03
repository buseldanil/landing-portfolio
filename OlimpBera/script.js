document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });

    document.addEventListener('click', event => {
      const insideNav = mainNav.contains(event.target);
      const insideToggle = menuToggle.contains(event.target);

      if (!insideNav && !insideToggle) {
        mainNav.classList.remove('open');
      }
    });
  }

  document.querySelectorAll('.main-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');
      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      mainNav?.classList.remove('open');
    });
  });

  const revealItems = document.querySelectorAll('.reveal');

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

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  const counters = document.querySelectorAll('[data-counter]');

  function animateCounter(node) {
    const target = Number(node.dataset.counter || 0);
    const duration = 1400;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = Math.floor(target * eased);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        node.textContent = target;
      }
    }

    requestAnimationFrame(frame);
  }

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.45 },
    );

    counters.forEach(counter => counterObserver.observe(counter));
  } else {
    counters.forEach(counter => animateCounter(counter));
  }

  const experienceItems = document.querySelectorAll('.experience-item');
  const previewImage = document.getElementById('experiencePreviewImage');
  const previewTitle = document.getElementById('experiencePreviewTitle');
  const previewText = document.getElementById('experiencePreviewText');

  function setExperience(item) {
    if (!item || !previewImage || !previewTitle || !previewText) return;

    experienceItems.forEach(entry => entry.classList.remove('active-exp'));
    item.classList.add('active-exp');

    previewImage.src = item.dataset.image || '';
    previewTitle.textContent = item.dataset.title || '';
    previewText.textContent = item.dataset.text || '';
  }

  experienceItems.forEach(item => {
    item.addEventListener('mouseenter', () => setExperience(item));
    item.addEventListener('click', () => setExperience(item));
    item.addEventListener('focus', () => setExperience(item));
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

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  const sectionLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  const sections = document.querySelectorAll('main section[id]');

  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          sectionLinks.forEach(link => {
            link.classList.toggle(
              'active-link',
              link.getAttribute('href') === `#${entry.target.id}`,
            );
          });
        });
      },
      { threshold: 0.45 },
    );

    sections.forEach(section => navObserver.observe(section));
  }
});
