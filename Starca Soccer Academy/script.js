const siteHeader = document.getElementById('siteHeader');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 18);
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

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
      }
    });
  },
  {
    threshold: 0.14,
  },
);

revealItems.forEach(item => revealObserver.observe(item));

const tabButtons = document.querySelectorAll('.tabs button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabName = button.dataset.tab;

    tabButtons.forEach(item => item.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(tabName).classList.add('active');
  });
});

const hoverCards = document.querySelectorAll(
  '.feature-card, .tabs-card, .learn-phone, .quiz-card, .quiz-result, .coach-board, .reaction-panel, .sessions-card, .final-card',
);

hoverCards.forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    card.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.14), transparent 36%)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.backgroundImage = '';
  });
});

const quizButton = document.getElementById('startQuiz');

if (quizButton) {
  quizButton.addEventListener('click', () => {
    quizButton.textContent = '✓ Quiz Preview Started';
    quizButton.style.transform = 'scale(0.96)';

    setTimeout(() => {
      quizButton.textContent = '▶ Start Quiz';
      quizButton.style.transform = '';
    }, 1700);
  });
}

const chatInput = document.querySelector('.chat-input input');
const chatButton = document.querySelector('.chat-input button');
const coachBoard = document.querySelector('.coach-board');

function addCoachMessage() {
  if (!chatInput || !coachBoard) return;

  const value = chatInput.value.trim();

  if (!value) {
    chatInput.focus();
    return;
  }

  const message = document.createElement('div');
  message.className = 'chat-message generated';
  message.innerHTML = `
    <p>⚽ Good question. Start with the simple idea first: keep your shape compact, move together, and choose the formation that helps your strongest players touch the ball more often.</p>
    <small>now</small>
  `;

  const suggestions = document.querySelector('.suggestions');
  coachBoard.insertBefore(message, suggestions);
  chatInput.value = '';
}

if (chatButton) {
  chatButton.addEventListener('click', addCoachMessage);
}

if (chatInput) {
  chatInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      addCoachMessage();
    }
  });
}

const reactionButton = document.querySelector('.training-pitch button');
const roundBox = document.querySelector(
  '.reaction-stats div:first-child strong',
);
const avgBox = document.querySelector(
  '.reaction-stats div:nth-child(2) strong',
);
const bestBox = document.querySelector(
  '.reaction-stats div:nth-child(3) strong',
);

if (reactionButton) {
  let round = 0;
  let running = false;

  reactionButton.addEventListener('click', () => {
    if (running) return;

    running = true;
    round = 0;
    reactionButton.textContent = '⚡ Running...';

    const interval = setInterval(() => {
      round += 1;

      if (roundBox) roundBox.textContent = `${round}/8`;
      if (avgBox) avgBox.textContent = `${(0.42 + round / 100).toFixed(2)}s`;
      if (bestBox) bestBox.textContent = `${(0.31 + round / 120).toFixed(2)}s`;

      if (round >= 8) {
        clearInterval(interval);
        running = false;
        reactionButton.textContent = '▶ Start Training';
      }
    }, 280);
  });
}
