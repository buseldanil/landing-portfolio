const body = document.body;
const header = document.querySelector('.header');
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const glow = document.querySelector('.cursor-glow');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    body.classList.toggle('menu-open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      body.classList.remove('menu-open');
    });
  });
}

window.addEventListener('mousemove', event => {
  if (!glow) return;

  glow.style.left = event.clientX + 'px';
  glow.style.top = event.clientY + 'px';
  glow.style.opacity = '1';
});

const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = Math.min(index * 55, 220) + 'ms';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 },
);

revealItems.forEach(item => observer.observe(item));

document.querySelectorAll('.hover-card').forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();

    card.style.setProperty(
      '--mx',
      ((event.clientX - rect.left) / rect.width) * 100 + '%',
    );
    card.style.setProperty(
      '--my',
      ((event.clientY - rect.top) / rect.height) * 100 + '%',
    );
  });
});

document.querySelectorAll('.magnetic').forEach(button => {
  button.addEventListener('mousemove', event => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.13}px, ${y * 0.15}px) translateY(-4px)`;
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = '';
  });
});

document.querySelectorAll('.tilt').forEach(item => {
  item.addEventListener('mousemove', event => {
    const rect = item.getBoundingClientRect();
    const rx = ((event.clientY - rect.top) / rect.height - 0.5) * -9;
    const ry = ((event.clientX - rect.left) / rect.width - 0.5) * 9;

    item.style.transition = 'transform 0.08s ease';
    item.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transition = 'transform 0.35s ease';
    item.style.transform = '';
  });
});

const cards = document.querySelectorAll('.screen-card');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const label = document.querySelector('#screenName');

let active = 0;
let timer;

function renderCarousel() {
  cards.forEach((card, index) => {
    card.classList.remove('active', 'prev-screen', 'next-screen');

    if (index === active) {
      card.classList.add('active');

      if (label) {
        label.textContent = card.dataset.label || 'Preview';
      }
    }

    if (index === (active - 1 + cards.length) % cards.length) {
      card.classList.add('prev-screen');
    }

    if (index === (active + 1) % cards.length) {
      card.classList.add('next-screen');
    }
  });
}

function goNext() {
  active = (active + 1) % cards.length;
  renderCarousel();
}

function goPrev() {
  active = (active - 1 + cards.length) % cards.length;
  renderCarousel();
}

function restartCarousel() {
  clearInterval(timer);
  timer = setInterval(goNext, 4200);
}

if (cards.length) {
  renderCarousel();
  restartCarousel();

  if (next) {
    next.addEventListener('click', () => {
      goNext();
      restartCarousel();
    });
  }

  if (prev) {
    prev.addEventListener('click', () => {
      goPrev();
      restartCarousel();
    });
  }
}

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = scrollY;

  if (header) {
    header.style.transform =
      currentScroll > 130 && currentScroll > lastScroll
        ? 'translateX(-50%) translateY(-120px)'
        : 'translateX(-50%) translateY(0)';
  }

  lastScroll = currentScroll;
});
