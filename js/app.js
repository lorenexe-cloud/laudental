(() => {
  const config = window.LAUDENTAL_CONFIG || {};
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  const setScrolled = () => header?.classList.toggle('scrolled', window.scrollY > 16);
  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });

  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('open');
    document.body.classList.remove('menu-open');
  }));

  const whatsappUrl = (message) => `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message || config.defaultWhatsappMessage || '')}`;
  document.querySelectorAll('.js-whatsapp').forEach(link => {
    link.href = whatsappUrl();
    link.target = '_blank';
    link.rel = 'noopener';
  });

  document.querySelectorAll('[data-phone]').forEach(el => el.textContent = config.phoneDisplay || '');
  document.querySelectorAll('[data-whatsapp-label]').forEach(el => el.textContent = config.phoneDisplay || '');
  document.querySelectorAll('[data-address]').forEach(el => el.textContent = config.address || '');
  document.querySelectorAll('[data-hours]').forEach(el => el.textContent = config.hours || '');
  document.querySelectorAll('[data-map-link]').forEach(el => el.href = config.mapUrl || '#');
  document.querySelectorAll('a[href^="tel:"]').forEach(el => el.href = `tel:${config.phoneInternational || ''}`);

  const form = document.getElementById('appointment-form');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const message = [
      'Hola, me gustaría solicitar una cita en Lau Dental.',
      `Nombre: ${data.get('name') || ''}`,
      `Teléfono: ${data.get('phone') || ''}`,
      `Tratamiento: ${data.get('service') || ''}`,
      `Mensaje: ${data.get('message') || 'Sin mensaje adicional'}`
    ].join('\n');
    window.open(whatsappUrl(message), '_blank', 'noopener');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
