const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.14,
  },
);

revealItems.forEach(item => revealObserver.observe(item));

function showFormStatus() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get('status');

  if (!status) return;

  const notice = document.createElement('div');
  notice.className = `site-notice ${status === 'success' ? 'success' : 'error'}`;

  notice.textContent =
    status === 'success'
      ? 'Дякуємо! Заявку відправлено. Ми зв’яжемося з вами найближчим часом.'
      : 'Не вдалося відправити заявку. Спробуйте подзвонити напряму.';

  document.body.appendChild(notice);

  setTimeout(() => {
    notice.classList.add('show');
  }, 100);

  setTimeout(() => {
    notice.classList.remove('show');
  }, 5200);

  const cleanUrl = window.location.pathname;
  window.history.replaceState({}, document.title, cleanUrl);
}

showFormStatus();
