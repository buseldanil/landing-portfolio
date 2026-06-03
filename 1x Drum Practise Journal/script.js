document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      siteNav.classList.toggle('open');
    });

    document.addEventListener('click', event => {
      const insideNav = siteNav.contains(event.target);
      const insideToggle = menuToggle.contains(event.target);

      if (!insideNav && !insideToggle) {
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
      {
        threshold: 0.14,
      },
    );

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  const counters = document.querySelectorAll('[data-counter]');

  function animateCounter(element) {
    const target = Number(element.dataset.counter || 0);
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.floor(target * eased);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(tick);
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
      {
        threshold: 0.5,
      },
    );

    counters.forEach(counter => counterObserver.observe(counter));
  } else {
    counters.forEach(counter => animateCounter(counter));
  }

  const workflowSteps = document.querySelectorAll('.workflow-step');
  const workflowPreviewImage = document.getElementById('workflowPreviewImage');
  const workflowPreviewTitle = document.getElementById('workflowPreviewTitle');
  const workflowPreviewText = document.getElementById('workflowPreviewText');

  function setActiveWorkflow(step) {
    if (
      !step ||
      !workflowPreviewImage ||
      !workflowPreviewTitle ||
      !workflowPreviewText
    ) {
      return;
    }

    workflowSteps.forEach(item => item.classList.remove('active-step'));
    step.classList.add('active-step');

    workflowPreviewImage.src = step.dataset.image || '';
    workflowPreviewTitle.textContent = step.dataset.title || '';
    workflowPreviewText.textContent = step.dataset.text || '';
  }

  workflowSteps.forEach(step => {
    step.addEventListener('mouseenter', () => setActiveWorkflow(step));
    step.addEventListener('focus', () => setActiveWorkflow(step));
    step.addEventListener('click', () => setActiveWorkflow(step));
  });

  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', event => {
      if (window.innerWidth < 920) return;

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

  const sliderTrack = document.getElementById('sliderTrack');
  const slides = document.querySelectorAll('.slider-slide');
  const sliderDots = document.getElementById('sliderDots');
  const sliderTitle = document.getElementById('sliderTitle');
  const prevSlide = document.getElementById('prevSlide');
  const nextSlide = document.getElementById('nextSlide');

  let currentSlide = 0;
  let autoSlider = null;

  function renderDots() {
    if (!sliderDots || !slides.length) return;

    sliderDots.innerHTML = '';

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

      sliderDots.appendChild(dot);
    });
  }

  function updateSlider() {
    if (!sliderTrack || !slides.length) return;

    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    if (sliderTitle) {
      sliderTitle.textContent = slides[currentSlide].dataset.title || 'Screen';
    }

    if (sliderDots) {
      [...sliderDots.children].forEach((dot, index) => {
        dot.classList.toggle('active-dot', index === currentSlide);
      });
    }
  }

  function startAutoSlider() {
    if (!slides.length) return;

    autoSlider = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    }, 4200);
  }

  function stopAutoSlider() {
    if (autoSlider) {
      clearInterval(autoSlider);
      autoSlider = null;
    }
  }

  prevSlide?.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  });

  nextSlide?.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  });

  if (slides.length) {
    renderDots();
    updateSlider();
    startAutoSlider();

    sliderTrack?.addEventListener('mouseenter', stopAutoSlider);
    sliderTrack?.addEventListener('mouseleave', startAutoSlider);
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

  const sections = document.querySelectorAll('main section[id]');
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
      {
        threshold: 0.45,
      },
    );

    sections.forEach(section => navObserver.observe(section));
  }

  document.querySelectorAll('#year').forEach(item => {
    item.textContent = new Date().getFullYear();
  });
});
