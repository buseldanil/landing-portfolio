const body = document.body;
const cursorGlow = document.querySelector('.mouse-glow');
const reveals = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.counter');
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const tiltCards = document.querySelectorAll('.tilt-card');
const magneticButtons = document.querySelectorAll('.magnetic');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTriggers = document.querySelectorAll('.modal-open');
const modalClose = document.querySelector('.modal-close');

if (cursorGlow) {
  window.addEventListener('mousemove', event => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  },
);

reveals.forEach(item => revealObserver.observe(item));

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.target || 0);
      const duration = 1400;
      const start = performance.now();

      const animate = time => {
        const progress = Math.min((time - start) / duration, 1);
        const value = Math.floor(progress * target);
        element.textContent = value;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.textContent = target;
        }
      };

      requestAnimationFrame(animate);
      counterObserver.unobserve(element);
    });
  },
  {
    threshold: 0.55,
  },
);

counters.forEach(counter => counterObserver.observe(counter));

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  const mobileLinks = mobileMenu.querySelectorAll('a');

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1100) {
      burger.classList.remove('active');
      mobileMenu.classList.remove('open');
    }
  });
}

const updateActiveLink = () => {
  let currentId = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 180;
    if (window.scrollY >= sectionTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (!href.startsWith('#')) return;
    link.classList.toggle('active', href === `#${currentId}`);
  });
};

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.dataset.tab;

    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));

    button.classList.add('active');

    const panel = document.getElementById(tabId);
    if (panel) panel.classList.add('active');
  });
});

tiltCards.forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 10;
    const rotateX = (y / rect.height - 0.5) * -10;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  });
});

magneticButtons.forEach(button => {
  button.addEventListener('mousemove', event => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translate(0, 0)';
  });
});

if (modal && modalImage) {
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const image = trigger.dataset.image;
      if (!image) return;

      modalImage.src = image;
      modal.classList.add('active');
      body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    body.style.overflow = '';
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', event => {
    if (
      event.target.classList.contains('image-modal') ||
      event.target.classList.contains('image-modal-backdrop')
    ) {
      closeModal();
    }
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
}

const heroParallax = () => {
  const y = window.scrollY;
  const mainPhone = document.querySelector('.phone-main');
  const sideLeft = document.querySelector('.side-left');
  const sideRight = document.querySelector('.side-right');
  const floatLeft = document.querySelector('.float-left');
  const floatRight = document.querySelector('.float-right');

  if (mainPhone) {
    mainPhone.style.transform = `translateY(${y * 0.04}px)`;
  }

  if (sideLeft) {
    sideLeft.style.transform = `translateY(${y * 0.08}px) rotate(-10deg)`;
  }

  if (sideRight) {
    sideRight.style.transform = `translateY(${y * -0.05}px) rotate(10deg)`;
  }

  if (floatLeft) {
    floatLeft.style.transform = `translateY(${y * 0.03}px)`;
  }

  if (floatRight) {
    floatRight.style.transform = `translateY(${y * -0.02}px)`;
  }
};

window.addEventListener('scroll', heroParallax);
heroParallax();
