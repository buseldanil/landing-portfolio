document.addEventListener('DOMContentLoaded', () => {
  const siteHeader = document.querySelector('.site-header');
  const pageProgress = document.getElementById('pageProgress');
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');
  const hero = document.querySelector('.hero');
  const heroSpotlight = document.getElementById('heroSpotlight');

  const storySteps = document.querySelectorAll('.story-step');
  const storyImage = document.getElementById('storyImage');
  const storyTitle = document.getElementById('storyTitle');
  const storyText = document.getElementById('storyText');
  const storyProgressFill = document.getElementById('storyProgressFill');

  const tiltCards = document.querySelectorAll('.tilt-card');
  const magneticItems = document.querySelectorAll('.magnetic');

  const sliderTrack = document.getElementById('sliderTrack');
  const sliderTitle = document.getElementById('carouselTitle');
  const sliderDots = document.getElementById('sliderDots');
  const prevSlideButton = document.getElementById('prevSlide');
  const nextSlideButton = document.getElementById('nextSlide');
  const slides = document.querySelectorAll('.carousel-slide');

  const reviewCards = document.querySelectorAll('.review-card');
  const revealElements = document.querySelectorAll('.reveal');
  const counterElements = document.querySelectorAll('[data-counter]');
  const navAnchorLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  const observedSections = document.querySelectorAll('main section[id]');

  let currentSlide = 0;
  let autoSlideInterval = null;

  function handleHeaderState() {
    if (!siteHeader) return;

    if (window.scrollY > 16) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }

  function handlePageProgress() {
    if (!pageProgress) return;

    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    pageProgress.style.width = `${Math.min(progress, 100)}%`;
  }

  function setupMobileMenu() {
    if (!menuToggle || !siteNav) return;

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

  function setupSmoothAnchors() {
    navAnchorLinks.forEach(link => {
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
  }

  function setupRevealAnimations() {
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(element => element.classList.add('visible'));
      return;
    }

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

    revealElements.forEach(element => revealObserver.observe(element));
  }

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

  function setupCounters() {
    if (!('IntersectionObserver' in window)) {
      counterElements.forEach(element => animateCounter(element));
      return;
    }

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.55,
      },
    );

    counterElements.forEach(element => counterObserver.observe(element));
  }

  function setupHeroSpotlight() {
    if (!hero || !heroSpotlight) return;

    hero.addEventListener('mousemove', event => {
      const rect = hero.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      heroSpotlight.style.left = `${x}px`;
      heroSpotlight.style.top = `${y}px`;
      heroSpotlight.style.opacity = '1';
    });

    hero.addEventListener('mouseleave', () => {
      heroSpotlight.style.opacity = '0';
    });
  }

  function setupMagneticElements() {
    magneticItems.forEach(item => {
      item.addEventListener('mousemove', event => {
        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        item.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
      });

      item.addEventListener('mouseleave', () => {
        item.style.transform = '';
      });
    });
  }

  function setupTiltCards() {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', event => {
        if (window.innerWidth < 900) return;

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4.8;
        const rotateY = ((x - centerX) / centerX) * 4.8;

        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  function updateStoryProgress(index) {
    if (!storyProgressFill || !storySteps.length) return;

    const progress = ((index + 1) / storySteps.length) * 100;
    storyProgressFill.style.width = `${progress}%`;
  }

  function activateStoryStep(step) {
    if (!step || !storyImage || !storyTitle || !storyText) return;

    storySteps.forEach(item => item.classList.remove('active-step'));
    step.classList.add('active-step');

    const nextImage = step.dataset.image || '';
    const nextTitle = step.dataset.title || '';
    const nextText = step.dataset.text || '';

    storyImage.src = nextImage;
    storyTitle.textContent = nextTitle;
    storyText.textContent = nextText;

    const stepIndex = [...storySteps].indexOf(step);
    updateStoryProgress(stepIndex);
  }

  function setupStorySteps() {
    if (!storySteps.length) return;

    storySteps.forEach(step => {
      step.addEventListener('mouseenter', () => activateStoryStep(step));
      step.addEventListener('focus', () => activateStoryStep(step));
      step.addEventListener('click', () => activateStoryStep(step));
    });

    if ('IntersectionObserver' in window) {
      const storyObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              activateStoryStep(entry.target);
            }
          });
        },
        {
          threshold: 0.62,
        },
      );

      storySteps.forEach(step => storyObserver.observe(step));
    } else {
      activateStoryStep(storySteps[0]);
    }
  }

  function setActiveNavLink(id) {
    navAnchorLinks.forEach(link => {
      link.classList.toggle(
        'active-link',
        link.getAttribute('href') === `#${id}`,
      );
    });
  }

  function setupActiveNavTracking() {
    if (!('IntersectionObserver' in window) || !observedSections.length) return;

    const navObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          setActiveNavLink(entry.target.id);
        });
      },
      {
        threshold: 0.45,
      },
    );

    observedSections.forEach(section => navObserver.observe(section));
  }

  function buildSliderDots() {
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
      sliderTitle.textContent = slides[currentSlide].dataset.title || 'Frame';
    }

    if (sliderDots) {
      [...sliderDots.children].forEach((dot, index) => {
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
    if (!autoSlideInterval) return;

    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }

  function setupSlider() {
    if (!slides.length) return;

    buildSliderDots();
    updateSlider();

    prevSlideButton?.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
    });

    nextSlideButton?.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    });

    if (slides.length > 1) {
      startAutoSlide();

      sliderTrack?.addEventListener('mouseenter', stopAutoSlide);
      sliderTrack?.addEventListener('mouseleave', startAutoSlide);

      prevSlideButton?.addEventListener('mouseenter', stopAutoSlide);
      prevSlideButton?.addEventListener('mouseleave', startAutoSlide);

      nextSlideButton?.addEventListener('mouseenter', stopAutoSlide);
      nextSlideButton?.addEventListener('mouseleave', startAutoSlide);
    }
  }

  function setupReviewRotation() {
    if (reviewCards.length <= 1) return;

    let featuredIndex = 0;

    setInterval(() => {
      reviewCards.forEach(card => card.classList.remove('featured-review'));
      featuredIndex = (featuredIndex + 1) % reviewCards.length;
      reviewCards[featuredIndex].classList.add('featured-review');
    }, 3200);
  }

  function updateCurrentYear() {
    document.querySelectorAll('#year').forEach(element => {
      element.textContent = new Date().getFullYear();
    });
  }

  function onScrollEffects() {
    handleHeaderState();
    handlePageProgress();
  }

  setupMobileMenu();
  setupSmoothAnchors();
  setupRevealAnimations();
  setupCounters();
  setupHeroSpotlight();
  setupMagneticElements();
  setupTiltCards();
  setupStorySteps();
  setupActiveNavTracking();
  setupSlider();
  setupReviewRotation();
  updateCurrentYear();
  onScrollEffects();

  window.addEventListener('scroll', onScrollEffects, { passive: true });
  window.addEventListener('resize', handlePageProgress);
});
