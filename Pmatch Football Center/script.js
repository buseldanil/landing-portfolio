const header = document.getElementById('header');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  document.body.classList.toggle('lock');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.classList.remove('lock');
  });
});

const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, index) => {
      if (!entry.isIntersecting) return;

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 70);

      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.14 },
);

reveals.forEach(item => revealObserver.observe(item));

const tiltItems = document.querySelectorAll('.tilt');

tiltItems.forEach(item => {
  item.addEventListener('mousemove', event => {
    if (window.innerWidth < 900) return;

    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 12;
    const rotateX = (y / rect.height - 0.5) * -10;

    item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});

const carousel = document.querySelector('.carousel');

if (carousel) {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  carousel.addEventListener('mousedown', event => {
    isDown = true;
    startX = event.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
  });

  carousel.addEventListener('mouseup', () => {
    isDown = false;
  });

  carousel.addEventListener('mousemove', event => {
    if (!isDown) return;

    event.preventDefault();
    const x = event.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.25;
    carousel.scrollLeft = scrollLeft - walk;
  });
}

document
  .querySelectorAll('.feature-card, .screen-card, .news-card')
  .forEach(card => {
    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      card.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,.22), transparent 36%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.backgroundImage = '';
    });
  });
