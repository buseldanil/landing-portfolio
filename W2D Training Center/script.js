document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  /* ---------------- HEADER ---------------- */
  const siteHeader = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');

  const handleHeaderState = () => {
    if (!siteHeader) return;
    if (window.scrollY > 12) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  };

  handleHeaderState();
  window.addEventListener('scroll', handleHeaderState);

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      siteNav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open');
    });

    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
      });
    });

    document.addEventListener('click', event => {
      const clickedInsideNav = siteNav.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideNav && !clickedToggle) {
        siteNav.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
      }
    });
  }

  /* ---------------- REVEAL ---------------- */
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
        threshold: 0.16,
        rootMargin: '0px 0px -60px 0px',
      },
    );

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  /* ---------------- COUNTERS ---------------- */
  const counters = document.querySelectorAll('.counter');

  const animateCounter = element => {
    const target = Number(element.dataset.target || 0);
    const duration = 1500;
    const startTime = performance.now();

    const update = now => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      element.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
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
      { threshold: 0.7 },
    );

    counters.forEach(counter => counterObserver.observe(counter));
  } else {
    counters.forEach(counter => animateCounter(counter));
  }

  /* ---------------- SHOWCASE SLIDER ---------------- */
  const showcaseView = document.getElementById('showcaseView');
  const showcaseTitle = document.getElementById('showcaseTitle');
  const showcaseText = document.getElementById('showcaseText');
  const prevSlideBtn = document.getElementById('prevSlide');
  const nextSlideBtn = document.getElementById('nextSlide');
  const dotsContainer = document.getElementById('showcaseDots');

  if (showcaseView && showcaseTitle && showcaseText && dotsContainer) {
    const slides = Array.from(showcaseView.querySelectorAll('.showcase-slide'));
    let currentIndex = slides.findIndex(slide =>
      slide.classList.contains('is-active'),
    );
    if (currentIndex < 0) currentIndex = 0;

    const createDots = () => {
      dotsContainer.innerHTML = '';
      slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'showcase-dot';
        dot.setAttribute('aria-label', `Open slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
    };

    const updateSlider = () => {
      slides.forEach((slide, index) => {
        slide.classList.toggle('is-active', index === currentIndex);
      });

      const activeSlide = slides[currentIndex];
      showcaseTitle.textContent = activeSlide.dataset.title || '';
      showcaseText.textContent = activeSlide.dataset.text || '';

      const dots = dotsContainer.querySelectorAll('.showcase-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('is-active', index === currentIndex);
      });
    };

    const goToSlide = index => {
      currentIndex = (index + slides.length) % slides.length;
      updateSlider();
    };

    createDots();
    updateSlider();

    prevSlideBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextSlideBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));

    let autoSlide = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 4200);

    const resetAutoSlide = () => {
      clearInterval(autoSlide);
      autoSlide = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 4200);
    };

    [prevSlideBtn, nextSlideBtn, dotsContainer, showcaseView].forEach(
      element => {
        element?.addEventListener('mouseenter', () => clearInterval(autoSlide));
        element?.addEventListener('mouseleave', resetAutoSlide);
        element?.addEventListener('click', resetAutoSlide);
      },
    );

    let startX = 0;
    let endX = 0;

    showcaseView.addEventListener('touchstart', event => {
      startX = event.changedTouches[0].clientX;
    });

    showcaseView.addEventListener('touchend', event => {
      endX = event.changedTouches[0].clientX;
      const delta = endX - startX;

      if (Math.abs(delta) < 45) return;
      if (delta < 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
      resetAutoSlide();
    });
  }

  /* ---------------- TILT EFFECT ---------------- */
  const tiltCards = document.querySelectorAll('.tilt-card');

  const isDesktop = window.matchMedia('(min-width: 901px)').matches;

  if (isDesktop && tiltCards.length) {
    tiltCards.forEach(card => {
      let rafId = null;

      const setTilt = event => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 6;
        const rotateX = ((centerY - y) / centerY) * 6;

        if (rafId) cancelAnimationFrame(rafId);

        rafId = requestAnimationFrame(() => {
          card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
        });
      };

      const resetTilt = () => {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transform = '';
      };

      card.addEventListener('mousemove', setTilt);
      card.addEventListener('mouseleave', resetTilt);
      card.addEventListener('blur', resetTilt);
    });
  }

  /* ---------------- PARALLAX ORBS ---------------- */
  const orbs = document.querySelectorAll('.page-orb');
  if (orbs.length && window.matchMedia('(min-width: 901px)').matches) {
    window.addEventListener('mousemove', event => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 18;

      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.55;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  }

  /* ---------------- ACTIVE NAV BY HASH ---------------- */
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  const setActiveNav = () => {
    const scrollPosition = window.scrollY + 160;

    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (!section) return;

      const isActive =
        scrollPosition >= section.offsetTop &&
        scrollPosition < section.offsetTop + section.offsetHeight;

      link.classList.toggle('is-active', isActive);
    });
  };

  if (navLinks.length) {
    window.addEventListener('scroll', setActiveNav);
    setActiveNav();
  }
});
