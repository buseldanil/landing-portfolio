document.addEventListener('DOMContentLoaded', () => {
  const siteHeader = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');

  const updateHeader = () => {
    if (!siteHeader) return;
    if (window.scrollY > 10) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader);

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      siteNav.classList.toggle('is-open');
    });

    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
      });
    });

    document.addEventListener('click', event => {
      const insideNav = siteNav.contains(event.target);
      const insideToggle = menuToggle.contains(event.target);

      if (!insideNav && !insideToggle) {
        siteNav.classList.remove('is-open');
      }
    });
  }

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
        threshold: 0.14,
        rootMargin: '0px 0px -40px 0px',
      },
    );

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const counters = document.querySelectorAll('.counter');

  const animateCounter = element => {
    const target = Number(element.dataset.target || 0);
    const duration = 1600;
    const start = performance.now();

    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      element.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(tick);
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

  const carouselTrack = document.getElementById('carouselTrack');
  const carouselTitle = document.getElementById('carouselTitle');
  const carouselText = document.getElementById('carouselText');
  const carouselDots = document.getElementById('carouselDots');
  const prevSlide = document.getElementById('prevSlide');
  const nextSlide = document.getElementById('nextSlide');

  if (carouselTrack && carouselTitle && carouselText && carouselDots) {
    const slides = Array.from(
      carouselTrack.querySelectorAll('.carousel-slide'),
    );
    let current = slides.findIndex(slide =>
      slide.classList.contains('is-active'),
    );
    if (current < 0) current = 0;

    const renderDots = () => {
      carouselDots.innerHTML = '';

      slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goTo(index));
        carouselDots.appendChild(dot);
      });
    };

    const updateCarousel = () => {
      slides.forEach((slide, index) => {
        slide.classList.toggle('is-active', index === current);
      });

      const active = slides[current];
      carouselTitle.textContent = active.dataset.title || '';
      carouselText.textContent = active.dataset.text || '';

      carouselDots.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('is-active', index === current);
      });
    };

    const goTo = index => {
      current = (index + slides.length) % slides.length;
      updateCarousel();
    };

    renderDots();
    updateCarousel();

    prevSlide?.addEventListener('click', () => goTo(current - 1));
    nextSlide?.addEventListener('click', () => goTo(current + 1));

    let autoRotate = setInterval(() => {
      goTo(current + 1);
    }, 4300);

    const resetAutoRotate = () => {
      clearInterval(autoRotate);
      autoRotate = setInterval(() => {
        goTo(current + 1);
      }, 4300);
    };

    [carouselTrack, prevSlide, nextSlide, carouselDots].forEach(element => {
      element?.addEventListener('mouseenter', () => clearInterval(autoRotate));
      element?.addEventListener('mouseleave', resetAutoRotate);
      element?.addEventListener('click', resetAutoRotate);
    });

    let startX = 0;
    let endX = 0;

    carouselTrack.addEventListener('touchstart', event => {
      startX = event.changedTouches[0].clientX;
    });

    carouselTrack.addEventListener('touchend', event => {
      endX = event.changedTouches[0].clientX;
      const diff = endX - startX;

      if (Math.abs(diff) < 40) return;

      if (diff < 0) {
        goTo(current + 1);
      } else {
        goTo(current - 1);
      }

      resetAutoRotate();
    });
  }

  const tiltCards = document.querySelectorAll('.tilt-card');
  const enableTilt = window.matchMedia('(min-width: 901px)').matches;

  if (enableTilt && tiltCards.length) {
    tiltCards.forEach(card => {
      let frameId = null;

      const handleMove = event => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 6;
        const rotateX = ((centerY - y) / centerY) * 6;

        if (frameId) cancelAnimationFrame(frameId);

        frameId = requestAnimationFrame(() => {
          card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
      };

      const reset = () => {
        if (frameId) cancelAnimationFrame(frameId);
        card.style.transform = '';
      };

      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseleave', reset);
    });
  }

  const glows = document.querySelectorAll('.site-glow');

  if (glows.length && window.matchMedia('(min-width: 901px)').matches) {
    window.addEventListener('mousemove', event => {
      const x = (event.clientX / window.innerWidth - 0.5) * 20;
      const y = (event.clientY / window.innerHeight - 0.5) * 20;

      glows.forEach((glow, index) => {
        const speed = (index + 1) * 0.6;
        glow.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  }
});
