document.addEventListener('DOMContentLoaded', () => {
  const siteHeader = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');

  const setHeaderState = () => {
    if (!siteHeader) return;
    if (window.scrollY > 10) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  };

  setHeaderState();
  window.addEventListener('scroll', setHeaderState);

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
        threshold: 0.16,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const counters = document.querySelectorAll('.counter');

  const animateCounter = element => {
    const target = Number(element.dataset.target || 0);
    const duration = 1500;
    const start = performance.now();

    const update = time => {
      const progress = Math.min((time - start) / duration, 1);
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

  const sliderMain = document.getElementById('sliderMain');
  const sliderTitle = document.getElementById('sliderTitle');
  const sliderText = document.getElementById('sliderText');
  const sliderDots = document.getElementById('sliderDots');
  const prevSlide = document.getElementById('prevSlide');
  const nextSlide = document.getElementById('nextSlide');

  if (sliderMain && sliderTitle && sliderText && sliderDots) {
    const slides = Array.from(sliderMain.querySelectorAll('.slide'));
    let current = slides.findIndex(slide =>
      slide.classList.contains('is-active'),
    );
    if (current < 0) current = 0;

    const renderDots = () => {
      sliderDots.innerHTML = '';
      slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'slider-dot';
        dot.setAttribute('aria-label', `Open slide ${index + 1}`);
        dot.addEventListener('click', () => goTo(index));
        sliderDots.appendChild(dot);
      });
    };

    const updateSlider = () => {
      slides.forEach((slide, index) => {
        slide.classList.toggle('is-active', index === current);
      });

      const activeSlide = slides[current];
      sliderTitle.textContent = activeSlide.dataset.title || '';
      sliderText.textContent = activeSlide.dataset.text || '';

      const dots = sliderDots.querySelectorAll('.slider-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('is-active', index === current);
      });
    };

    const goTo = index => {
      current = (index + slides.length) % slides.length;
      updateSlider();
    };

    renderDots();
    updateSlider();

    prevSlide?.addEventListener('click', () => goTo(current - 1));
    nextSlide?.addEventListener('click', () => goTo(current + 1));

    let autoSlider = setInterval(() => {
      goTo(current + 1);
    }, 4200);

    const resetAuto = () => {
      clearInterval(autoSlider);
      autoSlider = setInterval(() => {
        goTo(current + 1);
      }, 4200);
    };

    [sliderMain, prevSlide, nextSlide, sliderDots].forEach(item => {
      item?.addEventListener('mouseenter', () => clearInterval(autoSlider));
      item?.addEventListener('mouseleave', resetAuto);
      item?.addEventListener('click', resetAuto);
    });

    let touchStartX = 0;
    let touchEndX = 0;

    sliderMain.addEventListener('touchstart', event => {
      touchStartX = event.changedTouches[0].clientX;
    });

    sliderMain.addEventListener('touchend', event => {
      touchEndX = event.changedTouches[0].clientX;
      const diff = touchEndX - touchStartX;

      if (Math.abs(diff) < 40) return;

      if (diff < 0) {
        goTo(current + 1);
      } else {
        goTo(current - 1);
      }

      resetAuto();
    });
  }

  const tiltCards = document.querySelectorAll('.tilt-card');
  const desktopTilt = window.matchMedia('(min-width: 901px)').matches;

  if (desktopTilt && tiltCards.length) {
    tiltCards.forEach(card => {
      let frameId = null;

      const move = event => {
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

      const leave = () => {
        if (frameId) cancelAnimationFrame(frameId);
        card.style.transform = '';
      };

      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
    });
  }

  const orbs = document.querySelectorAll('.page-orb');

  if (orbs.length && window.matchMedia('(min-width: 901px)').matches) {
    window.addEventListener('mousemove', event => {
      const x = (event.clientX / window.innerWidth - 0.5) * 20;
      const y = (event.clientY / window.innerHeight - 0.5) * 20;

      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.55;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  }
});
