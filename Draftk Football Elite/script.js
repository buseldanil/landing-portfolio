// script.js
const header = document.getElementById('header');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const cursorLight = document.getElementById('cursorLight');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
});

burger.addEventListener('click', () => {
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
  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
});

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
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

revealItems.forEach(item => revealObserver.observe(item));

const magneticButtons = document.querySelectorAll('.magnetic');

magneticButtons.forEach(button => {
  button.addEventListener('mousemove', event => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translate(0, 0)';
  });
});

const slides = document.querySelectorAll('.screen-slide');
const dots = document.querySelectorAll('#carouselDots button');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');

let currentSlide = 0;

function showSlide(index) {
  if (!slides.length) return;

  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

if (prevSlide && nextSlide) {
  prevSlide.addEventListener('click', () => showSlide(currentSlide - 1));
  nextSlide.addEventListener('click', () => showSlide(currentSlide + 1));
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showSlide(index));
});

setInterval(() => {
  if (window.innerWidth <= 1020) {
    showSlide(currentSlide + 1);
  }
}, 4300);

const playRows = document.querySelectorAll('.play-row');

playRows.forEach(row => {
  row.addEventListener('click', () => {
    playRows.forEach(item => item.classList.remove('active'));
    row.classList.add('active');
  });
});
