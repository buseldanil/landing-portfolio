const header = document.getElementById('header');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 16);
});

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});

const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 70);
      }
    });
  },
  {
    threshold: 0.14,
  },
);

revealElements.forEach(element => observer.observe(element));

const cards = document.querySelectorAll(
  '.service-card, .workflow-card, .map-board, .profile-card, .profile-copy, .final-card',
);

cards.forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    card.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, rgba(255,212,0,0.14), transparent 36%)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.backgroundImage = '';
  });
});

const filterButtons = document.querySelectorAll('.filter-row button');
const pins = document.querySelectorAll('.pin');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');

    const filter = button.textContent.trim().toLowerCase();

    pins.forEach(pin => {
      if (filter === 'all') {
        pin.style.opacity = '1';
        pin.style.transform = 'translate(-50%, -50%) scale(1)';
        return;
      }

      const matched =
        (filter === 'roads' && pin.classList.contains('road')) ||
        (filter === 'water' && pin.classList.contains('water')) ||
        (filter === 'safety' && pin.classList.contains('safety')) ||
        (filter === 'parks' && pin.classList.contains('park'));

      pin.style.opacity = matched ? '1' : '0.22';
      pin.style.transform = matched
        ? 'translate(-50%, -50%) scale(1.18)'
        : 'translate(-50%, -50%) scale(0.9)';
    });
  });
});

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h3').textContent;
    const original = card.querySelector('p').textContent;

    card.querySelector('p').textContent =
      `Selected: ${title}. Open the app to continue this request.`;

    setTimeout(() => {
      card.querySelector('p').textContent = original;
    }, 1800);
  });
});

const profileButton = document.querySelector('.profile-card button');

if (profileButton) {
  profileButton.addEventListener('click', () => {
    const oldText = profileButton.textContent;
    profileButton.textContent = '✓ Preview Saved';
    profileButton.style.transform = 'scale(0.97)';

    setTimeout(() => {
      profileButton.textContent = oldText;
      profileButton.style.transform = '';
    }, 1500);
  });
}

const requestFab = document.querySelector('.fab');

if (requestFab) {
  requestFab.addEventListener('click', () => {
    requestFab.textContent = '✓';

    setTimeout(() => {
      requestFab.textContent = '+';
    }, 1200);
  });
}
