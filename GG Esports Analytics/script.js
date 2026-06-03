// script.js
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const header = document.querySelector('.site-header');
const cursorLight = document.querySelector('.cursor-light');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

window.addEventListener('mousemove', event => {
  if (!cursorLight) return;

  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
  cursorLight.style.opacity = '1';
});

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

revealElements.forEach(item => revealObserver.observe(item));

document
  .querySelectorAll('.match-card, .player-card, .analytics-card')
  .forEach(card => {
    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });

document.querySelectorAll('.magnetic').forEach(button => {
  button.addEventListener('mousemove', event => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.14}px, ${y * 0.16}px) translateY(-4px)`;
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = '';
  });
});

document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 8;

    card.style.transition = 'transform 0.08s ease';
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.35s ease';
    card.style.transform = '';
  });
});

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (header) {
    if (currentScroll > 140 && currentScroll > lastScroll) {
      header.style.transform = 'translateX(-50%) translateY(-120px)';
    } else {
      header.style.transform = 'translateX(-50%) translateY(0)';
    }
  }

  lastScroll = currentScroll;
});

const counters = document.querySelectorAll('[data-count]');

const countObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.count || 0);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 44));

      const interval = setInterval(() => {
        current += step;

        if (current >= target) {
          current = target;
          clearInterval(interval);
        }

        element.textContent = current;
      }, 24);

      countObserver.unobserve(element);
    });
  },
  { threshold: 0.4 },
);

counters.forEach(counter => countObserver.observe(counter));
