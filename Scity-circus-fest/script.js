const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const revealItems = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('[data-counter]');
const tiltCards = document.querySelectorAll('.tilt-card');
const navLinks = document.querySelectorAll('.mobile-menu a, .desktop-nav a');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  });
});

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  },
);

revealItems.forEach(item => revealObserver.observe(item));

const animateCounter = element => {
  const target = Number(element.dataset.counter || 0);
  let current = 0;
  const duration = 1400;
  const stepTime = 16;
  const totalSteps = Math.ceil(duration / stepTime);
  const increment = target / totalSteps;

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      element.textContent = `${target}`;
      clearInterval(timer);
      return;
    }

    element.textContent = `${Math.floor(current)}`;
  }, stepTime);
};

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.45,
  },
);

counters.forEach(counter => counterObserver.observe(counter));

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

const applyTilt = (card, x, y) => {
  const rect = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const rotateX = ((y - centerY) / rect.height) * -10;
  const rotateY = ((x - centerX) / rect.width) * 10;

  card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
};

const resetTilt = card => {
  card.style.transform =
    'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)';
};

tiltCards.forEach(card => {
  card.addEventListener('mousemove', event => {
    applyTilt(card, event.clientX, event.clientY);
  });

  card.addEventListener('mouseleave', () => {
    resetTilt(card);
  });

  card.addEventListener('touchstart', () => {
    card.style.transition = 'transform 0.2s ease';
  });

  card.addEventListener('touchend', () => {
    resetTilt(card);
  });
});

const currentYearElement = document.querySelector('[data-current-year]');

if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

const setActiveNav = () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 120;

  sections.forEach(section => {
    const id = section.getAttribute('id');
    const navTargets = document.querySelectorAll(`a[href="#${id}"]`);

    if (
      scrollPosition >= section.offsetTop &&
      scrollPosition < section.offsetTop + section.offsetHeight
    ) {
      navTargets.forEach(link => link.classList.add('active-link'));
    } else {
      navTargets.forEach(link => link.classList.remove('active-link'));
    }
  });
};

window.addEventListener('scroll', setActiveNav);
window.addEventListener('load', setActiveNav);

const fadeHeaderOnScroll = () => {
  const header = document.querySelector('.site-header');

  if (!header) return;

  if (window.scrollY > 20) {
    header.style.background = 'rgba(7, 4, 2, 0.78)';
    header.style.borderBottom = '1px solid rgba(255, 229, 173, 0.12)';
  } else {
    header.style.background = 'rgba(7, 4, 2, 0.48)';
    header.style.borderBottom = '1px solid rgba(255, 229, 173, 0.08)';
  }
};

window.addEventListener('scroll', fadeHeaderOnScroll);
window.addEventListener('load', fadeHeaderOnScroll);

const marqueeTrack = document.querySelector('.marquee-track');

if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });

  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

const preloadImportantImages = () => {
  const imageSources = [
    'photo1.jpeg',
    'photo2.jpeg',
    'photo3.jpeg',
    'photo4.jpeg',
    'photo5.jpeg',
    'photo8.jpeg',
  ];

  imageSources.forEach(src => {
    const image = new Image();
    image.src = src;
  });
};

window.addEventListener('load', preloadImportantImages);
