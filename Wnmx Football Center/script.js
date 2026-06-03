const header = document.getElementById('siteHeader');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const cursorLight = document.getElementById('cursorLight');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
});

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});

window.addEventListener('mousemove', event => {
  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
});

const revealItems = document.querySelectorAll('.reveal');

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

revealItems.forEach(item => observer.observe(item));

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

const slides = document.querySelectorAll('.screen-card');
const dots = document.querySelectorAll('#carouselDots button');
const prev = document.getElementById('prevSlide');
const next = document.getElementById('nextSlide');

let currentSlide = 0;

function showSlide(index) {
  if (!slides.length) return;

  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

if (prev && next) {
  prev.addEventListener('click', () => showSlide(currentSlide - 1));
  next.addEventListener('click', () => showSlide(currentSlide + 1));
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showSlide(index));
});

setInterval(() => {
  if (window.innerWidth <= 1080) {
    showSlide(currentSlide + 1);
  }
}, 4300);

const chips = document.querySelectorAll(
  '.chip-row span, .segmented span, .mood-row span',
);

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    const parent = chip.parentElement;
    parent
      .querySelectorAll('span')
      .forEach(item => item.classList.remove('active'));
    chip.classList.add('active');
  });
});

const statCards = document.querySelectorAll(
  '.overview-card, .player-row, .glass-stat, .screen-card',
);

statCards.forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    card.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, rgba(245, 50, 54, 0.16), transparent 36%)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.backgroundImage = '';
  });
});
