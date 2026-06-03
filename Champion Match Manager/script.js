const header = document.getElementById('siteHeader');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
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
        }, index * 70);
      }
    });
  },
  { threshold: 0.14 },
);

revealItems.forEach(item => revealObserver.observe(item));

const glowCards = document.querySelectorAll(
  '.pitch-card, .collection-preview, .pack-card, .reveal-stage, .match-arena, .mode-card, .final-card',
);

glowCards.forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    card.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.16), transparent 34%)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.backgroundImage = '';
  });
});

const collectionTabs = document.querySelectorAll('.collection-tabs button');

collectionTabs.forEach(button => {
  button.addEventListener('click', () => {
    collectionTabs.forEach(tab => tab.classList.remove('active'));
    button.classList.add('active');
  });
});

const packButtons = document.querySelectorAll('.pack-card button');
const stageCards = document.querySelectorAll('.opened-cards .player-big');

packButtons.forEach(button => {
  button.addEventListener('click', () => {
    stageCards.forEach((card, index) => {
      card.style.transform = 'translateY(20px) scale(.96)';
      card.style.opacity = '0';

      setTimeout(() => {
        card.style.transition = '0.55s cubic-bezier(.2,.9,.2,1.2)';
        card.style.transform = 'translateY(0) scale(1)';
        card.style.opacity = '1';
      }, index * 160);
    });

    button.textContent = 'Opened';
    setTimeout(() => {
      button.textContent = 'Open';
    }, 1500);
  });
});

const quickButtons = document.querySelectorAll(
  '.quick-play button, .mode-card, .arena-content button',
);

quickButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.style.transform = 'scale(0.97)';
    setTimeout(() => {
      button.style.transform = '';
    }, 180);
  });
});

const miniPlayers = document.querySelectorAll('.player-card.mini');

miniPlayers.forEach((player, index) => {
  player.style.animation = `float ${4 + index * 0.12}s ease-in-out infinite`;
  player.style.animationDelay = `${index * -0.18}s`;
});
