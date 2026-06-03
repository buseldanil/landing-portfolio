const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  },
);

revealItems.forEach(item => revealObserver.observe(item));

const screenData = [
  {
    image: 'photo1.jpeg',
    title: 'Home gaming hub',
    text: 'A central dashboard with quick actions, progress cards, rewards, and a bold gaming-first first impression.',
  },
  {
    image: 'photo3.jpeg',
    title: 'Quest progress',
    text: 'Daily and weekly quests help users stay active, complete tasks, and keep their progress moving.',
  },
  {
    image: 'photo6.jpeg',
    title: 'Reward collection',
    text: 'Reward states, unlock cards, and glowing progress blocks make small wins feel satisfying.',
  },
  {
    image: 'photo7.jpeg',
    title: 'Player profile',
    text: 'Profile data, activity, and level progress give users a clear identity inside the app.',
  },
  {
    image: 'photo5.jpeg',
    title: 'Stats and events',
    text: 'Tournament-style cards and activity stats keep the experience dynamic and easy to follow.',
  },
];

const mainScreen = document.getElementById('mainScreen');
const screenTitle = document.getElementById('screenTitle');
const screenText = document.getElementById('screenText');
const screenTabs = document.querySelectorAll('.screen-tab');
const prevScreen = document.getElementById('prevScreen');
const nextScreen = document.getElementById('nextScreen');

let activeScreen = 0;

function renderScreen(index) {
  activeScreen = (index + screenData.length) % screenData.length;

  if (!mainScreen || !screenTitle || !screenText) return;

  mainScreen.style.opacity = '0';
  mainScreen.style.transform = 'translateY(12px) scale(0.97)';

  setTimeout(() => {
    mainScreen.src = screenData[activeScreen].image;
    screenTitle.textContent = screenData[activeScreen].title;
    screenText.textContent = screenData[activeScreen].text;
    mainScreen.style.opacity = '1';
    mainScreen.style.transform = 'translateY(0) scale(1)';
  }, 180);

  screenTabs.forEach((tab, index) => {
    tab.classList.toggle('active', index === activeScreen);
  });
}

screenTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    renderScreen(Number(tab.dataset.index));
  });
});

if (prevScreen) {
  prevScreen.addEventListener('click', () => {
    renderScreen(activeScreen - 1);
  });
}

if (nextScreen) {
  nextScreen.addEventListener('click', () => {
    renderScreen(activeScreen + 1);
  });
}

if (mainScreen) {
  setInterval(() => {
    renderScreen(activeScreen + 1);
  }, 5200);
}
