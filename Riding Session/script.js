const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
const allMenuLinks = document.querySelectorAll('.nav-menu a');
const revealItems = document.querySelectorAll('.reveal');

if (burger && navMenu) {
  burger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  document.addEventListener('click', event => {
    const isInsideMenu = navMenu.contains(event.target);
    const isBurger = burger.contains(event.target);

    if (!isInsideMenu && !isBurger) {
      navMenu.classList.remove('open');
    }
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();

    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

allMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu) {
      navMenu.classList.remove('open');
    }
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealItems.forEach(item => observer.observe(item));
