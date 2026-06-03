const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

burger?.addEventListener('click', () => {
  nav?.classList.toggle('open');
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.13 },
);

revealElements.forEach(el => revealObserver.observe(el));

const shots = Array.from(document.querySelectorAll('.shot'));
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const dots = document.querySelector('.dots');
const current = document.querySelector('#current');
const progress = document.querySelector('.progress i');

let index = 0;
let timer;

function label(num) {
  return String(num + 1).padStart(2, '0');
}

function updateCarousel() {
  const total = shots.length;

  shots.forEach((shot, i) => {
    shot.classList.remove(
      'active',
      'prev-card',
      'next-card',
      'far-prev',
      'far-next',
    );

    const prevIndex = (index - 1 + total) % total;
    const nextIndex = (index + 1) % total;
    const farPrev = (index - 2 + total) % total;
    const farNext = (index + 2) % total;

    if (i === index) shot.classList.add('active');
    if (i === prevIndex) shot.classList.add('prev-card');
    if (i === nextIndex) shot.classList.add('next-card');
    if (i === farPrev) shot.classList.add('far-prev');
    if (i === farNext) shot.classList.add('far-next');
  });

  if (current) current.textContent = label(index);
  if (progress) progress.style.transform = `translateX(${index * 100}%)`;

  dots?.querySelectorAll('button').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function goNext() {
  index = (index + 1) % shots.length;
  updateCarousel();
}

function goPrev() {
  index = (index - 1 + shots.length) % shots.length;
  updateCarousel();
}

function restart() {
  clearInterval(timer);
  timer = setInterval(goNext, 3600);
}

if (shots.length) {
  shots.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Screenshot ${i + 1}`);
    dot.addEventListener('click', () => {
      index = i;
      updateCarousel();
      restart();
    });
    dots?.appendChild(dot);
  });

  next?.addEventListener('click', () => {
    goNext();
    restart();
  });

  prev?.addEventListener('click', () => {
    goPrev();
    restart();
  });

  const carousel = document.querySelector('.carousel');
  let startX = 0;

  carousel?.addEventListener('touchstart', event => {
    startX = event.touches[0].clientX;
  });

  carousel?.addEventListener('touchend', event => {
    const endX = event.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 45) {
      diff > 0 ? goNext() : goPrev();
      restart();
    }
  });

  updateCarousel();
  restart();
}

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (!header) return;

  if (window.scrollY > 40) {
    header.style.background = 'rgba(4, 8, 6, .95)';
    header.style.borderColor = 'rgba(0, 233, 120, .42)';
  } else {
    header.style.background = 'rgba(4, 8, 6, .72)';
    header.style.borderColor = 'rgba(0, 233, 120, .28)';
  }
});

document
  .querySelectorAll('.glass-card, .deep-card, .final-box, .policy-document')
  .forEach(card => {
    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.background = `
      radial-gradient(circle at ${x}px ${y}px, rgba(0,233,120,.17), transparent 34%),
      linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.025))
    `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
