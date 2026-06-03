const header = document.getElementById('header');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
});

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});

const revealElements = document.querySelectorAll('.reveal');

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

revealElements.forEach(item => revealObserver.observe(item));

const interactiveCards = document.querySelectorAll(
  '.glass-card, .analytics-main, .scatter-card, .comparison-box, .builder-card, .roles, .settings-panel, .final-card, .trend-card',
);

interactiveCards.forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    card.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, rgba(198,255,0,.14), transparent 34%)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.backgroundImage = '';
  });
});

const tabButtons = document.querySelectorAll(
  '.tabs button, .formation-tabs button',
);

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const parent = button.parentElement;

    parent.querySelectorAll('button').forEach(item => {
      item.classList.remove('active');
    });

    button.classList.add('active');
  });
});

const leagueButtons = document.querySelectorAll('.league-row button');

leagueButtons.forEach(button => {
  button.addEventListener('click', () => {
    leagueButtons.forEach(item => item.classList.remove('active-league'));
    button.classList.add('active-league');

    button.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(.94)' },
        { transform: 'scale(1)' },
      ],
      {
        duration: 230,
        easing: 'ease-out',
      },
    );
  });
});

const probabilityBars = document.querySelectorAll('.bar span');

const barObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const currentWidth = entry.target.style.width;
      entry.target.style.width = '0%';

      setTimeout(() => {
        entry.target.style.transition = 'width 1.2s cubic-bezier(.2,.9,.2,1)';
        entry.target.style.width = currentWidth;
      }, 120);
    });
  },
  {
    threshold: 0.45,
  },
);

probabilityBars.forEach(bar => barObserver.observe(bar));

const compareBars = document.querySelectorAll('.dual-bar i');

const compareObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const width = entry.target.style.width;
      entry.target.style.width = '0%';

      setTimeout(() => {
        entry.target.style.transition = 'width 1s cubic-bezier(.2,.9,.2,1)';
        entry.target.style.width = width;
      }, 140);
    });
  },
  {
    threshold: 0.45,
  },
);

compareBars.forEach(bar => compareObserver.observe(bar));

const dots = document.querySelectorAll('.scatter .dot');

dots.forEach((dot, index) => {
  dot.animate(
    [
      { transform: 'translateY(0) scale(1)', opacity: 0.85 },
      { transform: 'translateY(-6px) scale(1.12)', opacity: 1 },
      { transform: 'translateY(0) scale(1)', opacity: 0.85 },
    ],
    {
      duration: 1800 + index * 120,
      iterations: Infinity,
      easing: 'ease-in-out',
      delay: index * 90,
    },
  );
});

const balls = document.querySelectorAll('.mini-pitch .ball');

balls.forEach((ball, index) => {
  ball.animate(
    [
      { transform: 'translate(-50%, -50%) scale(1)', filter: 'brightness(1)' },
      {
        transform: 'translate(-50%, -50%) scale(1.18)',
        filter: 'brightness(1.45)',
      },
      { transform: 'translate(-50%, -50%) scale(1)', filter: 'brightness(1)' },
    ],
    {
      duration: 1600 + index * 80,
      iterations: Infinity,
      easing: 'ease-in-out',
      delay: index * 110,
    },
  );
});

const downloadLinks = document.querySelectorAll('a[href*="play.google.com"]');

downloadLinks.forEach(link => {
  link.addEventListener('click', () => {
    link.animate(
      [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-4px)' },
        { transform: 'translateY(0)' },
      ],
      {
        duration: 260,
        easing: 'ease-out',
      },
    );
  });
});
