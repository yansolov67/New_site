
document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute(
        'aria-label',
        isOpen ? 'Закрыть меню' : 'Открыть меню'
      );
      toggle.textContent = isOpen ? '×' : '☰';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Открыть меню');
        toggle.textContent = '☰';
      });
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Открыть меню');
        toggle.textContent = '☰';
      }
    });
  }

  // Reveal elements when scrolling
  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Portfolio filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project[data-category]');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      projects.forEach(project => {
        project.hidden = filter !== 'all' &&
          project.dataset.category !== filter;
      });
    });
  });

  // Back to top
  const backTop = document.querySelector('.back-top');

  if (backTop) {
    const updateBackTop = () => {
      backTop.classList.toggle('visible', window.scrollY > 500);
    };

    window.addEventListener('scroll', updateBackTop, { passive: true });
    updateBackTop();

    backTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches ? 'auto' : 'smooth'
      });
    });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  // Demo contact form validation
  const form = document.querySelector('#contact-form');

  if (form) {
    const status = form.querySelector('.form-status');

    form.addEventListener('submit', event => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const message = String(data.get('message') || '').trim();

      if (!name || !email || !message) {
        status.textContent = 'Заполните все обязательные поля.';
        status.className = 'form-status error';
        return;
      }

      status.textContent =
        'Форма заполнена корректно. Для отправки сообщений подключите сервер или почтовый сервис.';
      status.className = 'form-status success';
    });
  }
});