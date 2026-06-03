document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initMobileMenu();
  initSmoothActiveLinks();
  initSlider();
});

function initReveal() {
  const items = document.querySelectorAll('.reveal');

  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -60px 0px',
    },
  );

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
    observer.observe(item);
  });
}

function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
    });
  });

  document.addEventListener('click', event => {
    const clickedInsideNav = nav.contains(event.target);
    const clickedToggle = toggle.contains(event.target);

    if (!clickedInsideNav && !clickedToggle) {
      document.body.classList.remove('menu-open');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 920) {
      document.body.classList.remove('menu-open');
    }
  });
}

function initSmoothActiveLinks() {
  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...document.querySelectorAll('.nav-link[href^="#"]')];

  if (!sections.length || !links.length) return;

  const setActive = () => {
    const scrollY = window.scrollY + 140;
    let currentId = sections[0].id;

    sections.forEach(section => {
      if (scrollY >= section.offsetTop) {
        currentId = section.id;
      }
    });

    links.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${currentId}`);
    });
  };

  setActive();
  window.addEventListener('scroll', setActive, { passive: true });
}

function initSlider() {
  const slider = document.querySelector('.screen-slider');
  if (!slider) return;

  const slides = [...slider.querySelectorAll('.screen-slide')];
  const dots = [...slider.querySelectorAll('.dot')];
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');

  if (!slides.length) return;

  let current = 0;
  let autoPlay;

  const render = index => {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === current);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  };

  const next = () => render(current + 1);
  const prev = () => render(current - 1);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlay = setInterval(next, 4200);
  };

  const stopAutoPlay = () => {
    if (autoPlay) clearInterval(autoPlay);
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      next();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prev();
      startAutoPlay();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      render(index);
      startAutoPlay();
    });
  });

  let startX = 0;
  let endX = 0;

  slider.addEventListener(
    'touchstart',
    event => {
      startX = event.changedTouches[0].clientX;
    },
    { passive: true },
  );

  slider.addEventListener(
    'touchend',
    event => {
      endX = event.changedTouches[0].clientX;
      const diff = endX - startX;

      if (Math.abs(diff) < 40) return;

      if (diff < 0) next();
      if (diff > 0) prev();

      startAutoPlay();
    },
    { passive: true },
  );

  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoPlay();
    else startAutoPlay();
  });

  render(0);
  startAutoPlay();
}
