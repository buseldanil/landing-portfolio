const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const revealItems = document.querySelectorAll('.reveal');
const tiltCards = document.querySelectorAll('.tilt-card');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalButtons = document.querySelectorAll('.modal-open');
const modalClose = document.querySelector('.image-modal-close');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
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
  },
);

revealItems.forEach(item => revealObserver.observe(item));

function updateActiveNav() {
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 180;
    if (window.scrollY >= sectionTop) {
      currentSection = section.id;
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    link.classList.toggle('active', href === `#${currentSection}`);
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

tiltCards.forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 6;
    const rotateX = (y / rect.height - 0.5) * -6;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  });
});

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.tab;

    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));

    button.classList.add('active');

    const panel = document.getElementById(targetId);
    if (panel) {
      panel.classList.add('active');
    }
  });
});

if (modal && modalImage) {
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const imagePath = button.dataset.image;
      if (!imagePath) return;

      modalImage.src = imagePath;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', event => {
    if (
      event.target.classList.contains('image-modal') ||
      event.target.classList.contains('image-modal-overlay')
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
