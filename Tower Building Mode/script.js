const menuToggle = document.querySelector('.menu-toggle');
const body = document.body;
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    body.classList.toggle('menu-open');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
  });
});

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  },
  {
    threshold: 0.14,
  },
);

revealItems.forEach(item => revealObserver.observe(item));

const previewData = [
  {
    image: 'photo1.jpeg',
    title:
      'Home screen with weather banner, quick actions and highlighted guides.',
    text: 'The landing view introduces practical content immediately and keeps the interface calm and easy to scan.',
  },
  {
    image: 'photo2.jpeg',
    title: 'Guide catalog with categories, search and content cards.',
    text: 'Users can jump into foundation and structural topics quickly without friction or clutter.',
  },
  {
    image: 'photo3.jpeg',
    title: 'Tips section with clear advice cards and simple category filters.',
    text: 'Useful knowledge is broken into fast, readable pieces that work well on mobile.',
  },
  {
    image: 'photo4.jpeg',
    title:
      'History screen for engineering milestones and architectural context.',
    text: 'The app adds depth by mixing practical reference with broader construction knowledge.',
  },
  {
    image: 'photo5.jpeg',
    title: 'More section keeps extra actions grouped in one clean panel.',
    text: 'Secondary routes stay accessible without overloading the main navigation.',
  },
  {
    image: 'photo6.jpeg',
    title:
      'Settings view keeps data actions and app info direct and lightweight.',
    text: 'The flow feels simple, modern and easy to understand at first glance.',
  },
  {
    image: 'photo7.jpeg',
    title:
      'Long-form article layout makes detailed guides more comfortable to read.',
    text: 'Spacing, contrast and typography support deeper reading without visual fatigue.',
  },
  {
    image: 'photo8.jpeg',
    title:
      'Detailed technical content stays structured even in longer instructional pages.',
    text: 'That makes the app useful both for quick refreshers and more serious studying.',
  },
];

const mainPreview = document.getElementById('mainPreview');
const noteTitle = document.getElementById('screenNoteTitle');
const noteText = document.getElementById('screenNoteText');
const prevScreen = document.getElementById('prevScreen');
const nextScreen = document.getElementById('nextScreen');
const thumbs = document.querySelectorAll('.thumb');

let currentScreenIndex = 0;

function renderScreen(index) {
  if (!mainPreview || !noteTitle || !noteText) return;

  currentScreenIndex = index;
  mainPreview.style.opacity = '0.25';
  mainPreview.style.transform = 'translateY(8px) scale(0.98)';

  setTimeout(() => {
    mainPreview.src = previewData[index].image;
    mainPreview.style.opacity = '1';
    mainPreview.style.transform = 'translateY(0) scale(1)';
  }, 150);

  noteTitle.innerHTML = `
    <span>Overview</span>
    <strong>${previewData[index].title}</strong>
  `;

  noteText.innerHTML = `
    <span>Why it works</span>
    <strong>${previewData[index].text}</strong>
  `;

  thumbs.forEach(thumb => thumb.classList.remove('active'));
  const currentThumb = document.querySelector(`.thumb[data-index="${index}"]`);
  if (currentThumb) currentThumb.classList.add('active');
}

if (prevScreen) {
  prevScreen.addEventListener('click', () => {
    const nextIndex =
      (currentScreenIndex - 1 + previewData.length) % previewData.length;
    renderScreen(nextIndex);
  });
}

if (nextScreen) {
  nextScreen.addEventListener('click', () => {
    const nextIndex = (currentScreenIndex + 1) % previewData.length;
    renderScreen(nextIndex);
  });
}

thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    const index = Number(thumb.dataset.index);
    renderScreen(index);
  });
});

if (mainPreview) {
  setInterval(() => {
    const nextIndex = (currentScreenIndex + 1) % previewData.length;
    renderScreen(nextIndex);
  }, 5000);
}
