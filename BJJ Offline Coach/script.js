const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  },
);

revealElements.forEach(element => revealObserver.observe(element));

const frames = document.querySelectorAll('.screen-frame');
const nextBtn = document.querySelector('.screen-next');
const prevBtn = document.querySelector('.screen-prev');
let currentFrame = 0;

function updateFrames() {
  frames.forEach((frame, index) => {
    frame.classList.remove('active', 'prev-view', 'next-view');

    if (index === currentFrame) {
      frame.classList.add('active');
    }

    if (index === (currentFrame - 1 + frames.length) % frames.length) {
      frame.classList.add('prev-view');
    }

    if (index === (currentFrame + 1) % frames.length) {
      frame.classList.add('next-view');
    }
  });
}

if (frames.length) {
  updateFrames();

  nextBtn.addEventListener('click', () => {
    currentFrame = (currentFrame + 1) % frames.length;
    updateFrames();
  });

  prevBtn.addEventListener('click', () => {
    currentFrame = (currentFrame - 1 + frames.length) % frames.length;
    updateFrames();
  });

  setInterval(() => {
    currentFrame = (currentFrame + 1) % frames.length;
    updateFrames();
  }, 4200);
}

const heroVisual = document.querySelector('.hero-visual');

if (heroVisual) {
  window.addEventListener('mousemove', event => {
    const x = (event.clientX / window.innerWidth - 0.5) * 18;
    const y = (event.clientY / window.innerHeight - 0.5) * 18;

    heroVisual.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
}

const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
