// script.js
const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('.nav');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.16 },
);

revealItems.forEach(item => observer.observe(item));

const phone = document.querySelector('.phone');

window.addEventListener('mousemove', event => {
  if (!phone || window.innerWidth < 900) return;

  const x = (event.clientX / window.innerWidth - 0.5) * 10;
  const y = (event.clientY / window.innerHeight - 0.5) * 10;

  phone.style.transform = `rotate(3deg) translate(${x}px, ${y}px)`;
});

const balls = document.querySelectorAll('.small-balls span');

setInterval(() => {
  balls.forEach(ball => ball.classList.remove('active'));
  const randomBall = balls[Math.floor(Math.random() * balls.length)];
  randomBall.style.transform = 'scale(1.12)';
  randomBall.style.background = '#126bc0';
  randomBall.style.color = '#fff';

  setTimeout(() => {
    randomBall.style.transform = '';
    randomBall.style.background = '';
    randomBall.style.color = '';
  }, 700);
}, 1200);
