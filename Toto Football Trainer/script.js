// script.js
const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('#nav');
const cursorGlow = document.querySelector('#cursorGlow');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});

window.addEventListener('mousemove', event => {
  cursorGlow.style.opacity = '1';
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach(element => revealObserver.observe(element));

const skillButtons = document.querySelectorAll('.skill-pills button');
const skillIcon = document.querySelector('#skillIcon');
const skillTitle = document.querySelector('#skillTitle');
const skillMeta = document.querySelector('#skillMeta');
const skillText = document.querySelector('#skillText');
const skillLevel = document.querySelector('#skillLevel');

const skills = {
  shooting: {
    icon: '🎯',
    title: 'Shooting Target Grid',
    meta: 'Medium · 15 min · 80 points',
    level: 'Medium',
    text: 'Hit 4 target zones in the goal from 12 meters. Place markers in goal corners, take 20 shots, and count only clean target hits.',
  },
  dribbling: {
    icon: '⚡',
    title: 'Cone Slalom Control',
    meta: 'Easy · 12 min · 60 points',
    level: 'Easy',
    text: 'Move through a cone line with tight touches, keep the ball close, and finish each run with a controlled turn.',
  },
  passing: {
    icon: '🎯',
    title: 'Passing Wall Precision',
    meta: 'Hard · 30 min · 180 points',
    level: 'Hard',
    text: 'Land 100 accurate passes into a marked wall zone from 8 meters. Track successful target hits with both feet.',
  },
  juggling: {
    icon: '🔥',
    title: 'Juggling Ladder',
    meta: 'Medium · 25 min · 120 points',
    level: 'Medium',
    text: 'Build touch control by completing juggling sets with both feet. Increase the count every round and avoid drops.',
  },
};

skillButtons.forEach(button => {
  button.addEventListener('click', () => {
    skillButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');

    const data = skills[button.dataset.skill];

    skillIcon.textContent = data.icon;
    skillTitle.textContent = data.title;
    skillMeta.textContent = data.meta;
    skillText.textContent = data.text;
    skillLevel.textContent = data.level;
  });
});

const timerText = document.querySelector('#timerText');
const timerCircle = document.querySelector('#timerCircle');
const startTimer = document.querySelector('#startTimer');
const resetTimer = document.querySelector('#resetTimer');

let timerInterval = null;
let elapsed = 0;
let running = false;
const maxDemoTime = 180;
const circleLength = 590;

function formatTime(value) {
  const minutes = String(Math.floor(value / 60)).padStart(2, '0');
  const seconds = String(value % 60).padStart(2, '0');

  return `${minutes}:${seconds}`;
}

function updateTimer() {
  timerText.textContent = formatTime(elapsed);

  const progress = Math.min(elapsed / maxDemoTime, 1);
  timerCircle.style.strokeDashoffset = `${circleLength - circleLength * progress}`;
}

startTimer.addEventListener('click', () => {
  if (running) {
    running = false;
    startTimer.textContent = 'Start';
    clearInterval(timerInterval);
    return;
  }

  running = true;
  startTimer.textContent = 'Pause';

  timerInterval = setInterval(() => {
    elapsed += 1;
    updateTimer();

    if (elapsed >= maxDemoTime) {
      clearInterval(timerInterval);
      running = false;
      startTimer.textContent = 'Start';
    }
  }, 1000);
});

resetTimer.addEventListener('click', () => {
  clearInterval(timerInterval);
  elapsed = 0;
  running = false;
  startTimer.textContent = 'Start';
  updateTimer();
});

updateTimer();

const magnets = document.querySelectorAll('.magnet');

magnets.forEach(button => {
  button.addEventListener('mousemove', event => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px) scale(1.04)`;
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = '';
  });
});

const phone = document.querySelector('.phone');

window.addEventListener('mousemove', event => {
  if (!phone || window.innerWidth < 1100) return;

  const x = (event.clientX / window.innerWidth - 0.5) * 10;
  const y = (event.clientY / window.innerHeight - 0.5) * -10;

  phone.style.transform = `rotateY(${x - 10}deg) rotateX(${y + 4}deg)`;
});
// add to script.js

const shotCards = document.querySelectorAll('.shot-card');
const prevShot = document.querySelector('#prevShot');
const nextShot = document.querySelector('#nextShot');
const carouselDots = document.querySelector('#carouselDots');

let currentShot = 0;
let carouselTimer = null;

function normalizeIndex(index) {
  if (index < 0) return shotCards.length - 1;
  if (index >= shotCards.length) return 0;
  return index;
}

function renderCarousel() {
  shotCards.forEach((card, index) => {
    card.classList.remove('active', 'prev-1', 'next-1', 'prev-2', 'next-2');

    const prevOne = normalizeIndex(currentShot - 1);
    const nextOne = normalizeIndex(currentShot + 1);
    const prevTwo = normalizeIndex(currentShot - 2);
    const nextTwo = normalizeIndex(currentShot + 2);

    if (index === currentShot) card.classList.add('active');
    if (index === prevOne) card.classList.add('prev-1');
    if (index === nextOne) card.classList.add('next-1');
    if (index === prevTwo) card.classList.add('prev-2');
    if (index === nextTwo) card.classList.add('next-2');
  });

  document.querySelectorAll('.carousel-dots button').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentShot);
  });
}

function goToShot(index) {
  currentShot = normalizeIndex(index);
  renderCarousel();
  restartCarouselAuto();
}

function restartCarouselAuto() {
  clearInterval(carouselTimer);

  carouselTimer = setInterval(() => {
    currentShot = normalizeIndex(currentShot + 1);
    renderCarousel();
  }, 3600);
}

shotCards.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Open screenshot ${index + 1}`);
  dot.addEventListener('click', () => goToShot(index));
  carouselDots.appendChild(dot);
});

prevShot.addEventListener('click', () => goToShot(currentShot - 1));
nextShot.addEventListener('click', () => goToShot(currentShot + 1));

renderCarousel();
restartCarouselAuto();
