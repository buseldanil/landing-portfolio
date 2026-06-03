const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const scrollTopButton = document.getElementById('scrollTopButton');
const revealElements = document.querySelectorAll('.reveal');
const counterElements = document.querySelectorAll('[data-counter]');
const tiltCards = document.querySelectorAll('.tilt-card');
const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-menu a');
const heroStripTrack = document.querySelector('.hero-strip-track');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenu && mobileMenu.classList.contains('open')) {
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
  { threshold: 0.18 },
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});

const animateCounter = element => {
  const target = Number(element.dataset.counter || 0);
  let current = 0;
  const totalDuration = 1300;
  const frameTime = 16;
  const steps = Math.ceil(totalDuration / frameTime);
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      element.textContent = `${target}`;
      clearInterval(timer);
      return;
    }

    element.textContent = `${Math.floor(current)}`;
  }, frameTime);
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
  { threshold: 0.4 },
);

counterElements.forEach(counter => {
  counterObserver.observe(counter);
});

window.addEventListener('scroll', () => {
  if (!scrollTopButton) {
    return;
  }

  if (window.scrollY > 420) {
    scrollTopButton.classList.add('show');
  } else {
    scrollTopButton.classList.remove('show');
  }
});

if (scrollTopButton) {
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

const updateActiveNav = () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 140;

  sections.forEach(section => {
    const id = section.getAttribute('id');
    const relatedLinks = document.querySelectorAll(`a[href="#${id}"]`);

    if (
      scrollPosition >= section.offsetTop &&
      scrollPosition < section.offsetTop + section.offsetHeight
    ) {
      relatedLinks.forEach(link => link.classList.add('active-link'));
    } else {
      relatedLinks.forEach(link => link.classList.remove('active-link'));
    }
  });
};

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

const updateHeaderState = () => {
  const header = document.querySelector('.site-header');

  if (!header) {
    return;
  }

  if (window.scrollY > 30) {
    header.style.background = 'rgba(10, 11, 14, 0.82)';
    header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
  } else {
    header.style.background = 'rgba(10, 11, 14, 0.56)';
    header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.06)';
  }
};

window.addEventListener('scroll', updateHeaderState);
window.addEventListener('load', updateHeaderState);

const applyTiltEffect = (card, clientX, clientY) => {
  const rect = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const rotateX = ((clientY - centerY) / rect.height) * -10;
  const rotateY = ((clientX - centerX) / rect.width) * 10;

  card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
};

const resetTiltEffect = card => {
  card.style.transform =
    'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)';
};

tiltCards.forEach(card => {
  card.addEventListener('mousemove', event => {
    applyTiltEffect(card, event.clientX, event.clientY);
  });

  card.addEventListener('mouseleave', () => {
    resetTiltEffect(card);
  });

  card.addEventListener('touchend', () => {
    resetTiltEffect(card);
  });
});

if (heroStripTrack) {
  heroStripTrack.addEventListener('mouseenter', () => {
    heroStripTrack.style.animationPlayState = 'paused';
  });

  heroStripTrack.addEventListener('mouseleave', () => {
    heroStripTrack.style.animationPlayState = 'running';
  });
}

const preloadImages = () => {
  const imageSources = [
    'photo1.jpeg',
    'photo2.jpeg',
    'photo3.jpeg',
    'photo6.jpeg',
    'photo7.jpeg',
    'photo9.jpeg',
    'photo10.jpeg',
  ];

  imageSources.forEach(src => {
    const image = new Image();
    image.src = src;
  });
};

window.addEventListener('load', preloadImages);

const pulseHeroButtons = () => {
  const buttons = document.querySelectorAll(
    '.primary-btn, .header-download-btn',
  );

  buttons.forEach((button, index) => {
    setTimeout(
      () => {
        button.style.transform = 'translateY(-2px) scale(1.02)';

        setTimeout(() => {
          button.style.transform = '';
        }, 260);
      },
      500 + index * 150,
    );
  });
};

window.addEventListener('load', pulseHeroButtons);
