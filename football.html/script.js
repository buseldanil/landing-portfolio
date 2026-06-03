document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const reveals = document.querySelectorAll('.reveal');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  const countItems = document.querySelectorAll('[data-count]');
  const downloadIds = ['downloadTop', 'downloadHero', 'downloadBottom'];

  const STORE_URL = '#';

  downloadIds.forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', e => {
      e.preventDefault();
      window.open(STORE_URL, '_blank');
    });
  });

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  const onScrollHeader = () => {
    if (window.scrollY > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };

  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader);

  // reveal on scroll
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 },
  );

  reveals.forEach(el => observer.observe(el));

  // counter animation
  const counterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        let current = 0;
        const duration = 1200;
        const stepTime = 20;
        const increment = Math.max(
          1,
          Math.ceil(target / (duration / stepTime)),
        );

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }

          if (target === 100) {
            el.textContent = `${current}%`;
          } else {
            el.textContent = current;
          }
        }, stepTime);

        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.6 },
  );

  countItems.forEach(item => counterObserver.observe(item));

  // tilt effect
  const tiltCards = document.querySelectorAll('.tilt');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      if (window.innerWidth < 861) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 6;
      const rotateX = ((centerY - y) / centerY) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // smooth anchors with header offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const top =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight -
        12;

      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    });
  });
});
