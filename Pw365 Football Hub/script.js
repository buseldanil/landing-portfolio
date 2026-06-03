// script.js
const header = document.getElementById('header');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const cursorGlow = document.querySelector('.cursor-glow');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  document.body.classList.toggle('locked');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.classList.remove('locked');
  });
});

window.addEventListener('mousemove', event => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 },
);

reveals.forEach(item => revealObserver.observe(item));

const magneticItems = document.querySelectorAll('.magnetic');

magneticItems.forEach(item => {
  item.addEventListener('mousemove', event => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    item.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translate(0, 0)';
  });
});

const cards = document.querySelectorAll('.screen-card');
const dots = document.querySelectorAll('#carouselDots button');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

let activeSlide = 0;

function showSlide(index) {
  cards.forEach(card => card.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  activeSlide = (index + cards.length) % cards.length;

  cards[activeSlide].classList.add('active');
  dots[activeSlide].classList.add('active');
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => showSlide(activeSlide - 1));
  nextBtn.addEventListener('click', () => showSlide(activeSlide + 1));
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showSlide(index));
});

setInterval(() => {
  if (window.innerWidth <= 980) {
    showSlide(activeSlide + 1);
  }
}, 4500);
