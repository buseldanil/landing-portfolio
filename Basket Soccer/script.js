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

      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      siteNav?.classList.remove('open');
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

  function animateCounter(element) {
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

  const commandSteps = document.querySelectorAll('.command-step');
  const commandImage = document.getElementById('commandImage');
  const commandTitle = document.getElementById('commandTitle');
  const commandText = document.getElementById('commandText');

  function activateCommandStep(step) {
    if (!step || !commandImage || !commandTitle || !commandText) return;

    commandSteps.forEach(item => item.classList.remove('active-step'));
    step.classList.add('active-step');

    commandImage.src = step.dataset.image || '';
    commandTitle.textContent = step.dataset.title || '';
    commandText.textContent = step.dataset.text || '';
  }

  commandSteps.forEach(step => {
    step.addEventListener('mouseenter', () => activateCommandStep(step));
    step.addEventListener('focus', () => activateCommandStep(step));
    step.addEventListener('click', () => activateCommandStep(step));
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

  const track = document.getElementById('sliderTrack');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevButton = document.getElementById('prevSlide');
  const nextButton = document.getElementById('nextSlide');
  const title = document.getElementById('carouselTitle');
  const dotsContainer = document.getElementById('sliderDots');

  let currentSlide = 0;
  let autoSlideInterval = null;

  function buildDots() {
    if (!dotsContainer || !slides.length) return;

    dotsContainer.innerHTML = '';

    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);

      if (index === 0) {
        dot.classList.add('active-dot');
      }

      dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
      });

      dotsContainer.appendChild(dot);
    });
  }

  function updateSlider() {
    if (!track || !slides.length) return;

    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    if (title) {
      title.textContent = slides[currentSlide].dataset.title || 'Screen';
    }

    if (dotsContainer) {
      [...dotsContainer.children].forEach((dot, index) => {
        dot.classList.toggle('active-dot', index === currentSlide);
      });
    }
  }

  function startAutoSlide() {
    if (!slides.length) return;

    autoSlideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    }, 4200);
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  prevButton?.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  });

  nextButton?.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  });

  if (slides.length) {
    buildDots();
    updateSlider();
    startAutoSlide();

    track?.addEventListener('mouseenter', stopAutoSlide);
    track?.addEventListener('mouseleave', startAutoSlide);
  }

  const reviewCards = document.querySelectorAll('.review-card');

  if (reviewCards.length > 1) {
    let featuredIndex = 0;

    setInterval(() => {
      reviewCards.forEach(card => card.classList.remove('featured-review'));
      featuredIndex = (featuredIndex + 1) % reviewCards.length;
      reviewCards[featuredIndex].classList.add('featured-review');
    }, 3200);
  }

  const anchorSections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          navLinks.forEach(link => {
            link.classList.toggle(
              'active-link',
              link.getAttribute('href') === `#${entry.target.id}`,
            );
          });
        });
      },
      { threshold: 0.45 },
    );

    anchorSections.forEach(section => navObserver.observe(section));
  }

  document.querySelectorAll('#year').forEach(element => {
    element.textContent = new Date().getFullYear();
  });
});
