const header = document.getElementById('header');
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const cursorGlow = document.getElementById('cursorGlow');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
});

burger.addEventListener('click', () => {
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

window.addEventListener('mouseleave', () => {
  cursorGlow.style.opacity = '0';
});

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 65);
      }
    });
  },
  {
    threshold: 0.16,
  },
);

revealItems.forEach(item => revealObserver.observe(item));

const screens = [
  {
    image: 'photo1.jpeg',
    title: 'Welcome flow',
    text: 'Bold red onboarding with a clean Football IQ identity and simple first step.',
  },
  {
    image: 'photo2.jpeg',
    title: 'Dream squad promise',
    text: 'The app connects quizzes with coins, coins with legendary players, and players with replay value.',
  },
  {
    image: 'photo3.jpeg',
    title: 'Saved progress',
    text: 'A clear promise that progress, coins, unlocked players and scores stay with the user.',
  },
  {
    image: 'photo4.jpeg',
    title: 'Home screen',
    text: 'Quick access to the main quiz loop with a tactical pressure card and a simple football fact block.',
  },
  {
    image: 'photo5.jpeg',
    title: 'Quiz launch',
    text: 'The pressure mechanic is explained before the user starts, so the game feels easy to understand.',
  },
  {
    image: 'photo6.jpeg',
    title: 'Live question',
    text: 'Answer choices feel large, readable, and tense, with the correct state highlighted in green.',
  },
  {
    image: 'photo7.jpeg',
    title: 'Squad unlocks',
    text: 'Legendary footballers become goals to chase through coins earned from quiz sessions.',
  },
  {
    image: 'photo8.jpeg',
    title: 'Stats board',
    text: 'A clean overview of coins, best score, quizzes played, rank and unlock progress.',
  },
];

let currentScreen = 3;

const leftImg = document.getElementById('leftImg');
const activeImg = document.getElementById('activeImg');
const rightImg = document.getElementById('rightImg');
const screenCount = document.getElementById('screenCount');
const screenTitle = document.getElementById('screenTitle');
const screenText = document.getElementById('screenText');
const screenDots = document.getElementById('screenDots');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');

function padNumber(number) {
  return String(number).padStart(2, '0');
}

function getIndex(index) {
  if (index < 0) return screens.length - 1;
  if (index >= screens.length) return 0;
  return index;
}

function renderDots() {
  screenDots.innerHTML = '';

  screens.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Open screen ${index + 1}`);

    if (index === currentScreen) {
      dot.classList.add('active');
    }

    dot.addEventListener('click', () => {
      currentScreen = index;
      renderCarousel();
    });

    screenDots.appendChild(dot);
  });
}

function renderCarousel() {
  const leftIndex = getIndex(currentScreen - 1);
  const rightIndex = getIndex(currentScreen + 1);
  const active = screens[currentScreen];

  leftImg.src = screens[leftIndex].image;
  activeImg.src = active.image;
  rightImg.src = screens[rightIndex].image;

  screenCount.textContent = `${padNumber(currentScreen + 1)} / ${padNumber(screens.length)}`;
  screenTitle.textContent = active.title;
  screenText.textContent = active.text;

  renderDots();

  document.querySelectorAll('.screen-card').forEach(card => {
    card.animate(
      [
        { transform: card.style.transform, filter: 'blur(4px)', opacity: 0.4 },
        {
          filter: 'blur(0)',
          opacity: card.classList.contains('active') ? 1 : 0.58,
        },
      ],
      {
        duration: 420,
        easing: 'cubic-bezier(.16, 1, .3, 1)',
      },
    );
  });
}

function nextScreen() {
  currentScreen = getIndex(currentScreen + 1);
  renderCarousel();
}

function prevScreen() {
  currentScreen = getIndex(currentScreen - 1);
  renderCarousel();
}

nextSlide.addEventListener('click', nextScreen);
prevSlide.addEventListener('click', prevScreen);

let autoSlide = setInterval(nextScreen, 4200);

document.querySelector('.showcase').addEventListener('mouseenter', () => {
  clearInterval(autoSlide);
});

document.querySelector('.showcase').addEventListener('mouseleave', () => {
  autoSlide = setInterval(nextScreen, 4200);
});

let touchStartX = 0;

document
  .querySelector('.carousel-stage')
  .addEventListener('touchstart', event => {
    touchStartX = event.touches[0].clientX;
  });

document
  .querySelector('.carousel-stage')
  .addEventListener('touchend', event => {
    const touchEndX = event.changedTouches[0].clientX;
    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > 45) {
      if (difference > 0) {
        nextScreen();
      } else {
        prevScreen();
      }
    }
  });

renderCarousel();
