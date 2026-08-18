const menuButton=document.querySelector('.menu');const nav=document.querySelector('.header nav');menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');}));const modal=document.querySelector('#appointment-modal');const openButtons=document.querySelectorAll('.js-open-appointment');const closeButtons=document.querySelectorAll('.js-close-appointment');function openModal(){modal?.classList.add('open');modal?.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');modal?.querySelector('input:not([type="hidden"])')?.focus();}function closeModal(){modal?.classList.remove('open');modal?.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');}openButtons.forEach(b=>b.addEventListener('click',openModal));closeButtons.forEach(b=>b.addEventListener('click',closeModal));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});const params=new URLSearchParams(location.search);if(params.get('cita')==='abrir'){openModal();history.replaceState({},'',location.pathname+location.hash);}if(params.get('cita')==='enviada'){const toast=document.createElement('div');toast.className='success-toast';toast.textContent='Recibimos tu solicitud. Nos comunicaremos contigo para confirmar la cita.';document.body.appendChild(toast);history.replaceState({},'',location.pathname+location.hash);setTimeout(()=>toast.remove(),7000);}

// Analítica de conversiones (GA4). No enviar datos personales ni contenido del formulario.
(function(){
  function track(eventName, params){
    if(typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, Object.assign({
      page_path: window.location.pathname
    }, params || {}));
  }

  function textOf(el){
    return (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g,' ').slice(0,80);
  }

  // WhatsApp, teléfono y Maps (en cualquier página que cargue site.js).
  document.addEventListener('click', function(e){
    const link=e.target.closest('a');
    if(!link) return;
    const href=link.getAttribute('href') || '';
    const label=textOf(link);
    if(/(?:wa\.me|whatsapp\.com)/i.test(href)){
      track('whatsapp_click',{link_text:label});
    } else if(/^tel:/i.test(href)){
      track('phone_click',{link_text:label});
    } else if(/(?:maps\.app\.goo\.gl|google\.[^/]+\/maps|google\.com\/maps)/i.test(href)){
      track('maps_click',{link_text:label});
    }
  }, true);

  // Botones/enlaces que abren o llevan a solicitar cita.
  document.addEventListener('click', function(e){
    const el=e.target.closest('.js-open-appointment, a[href*="cita=abrir"]');
    if(!el) return;
    track('appointment_click',{button_text:textOf(el)});
  }, true);

  // Envío del formulario. Solo se registra el evento; nunca los valores de los campos.
  const appointmentForm=document.querySelector('#appointment-form');
  appointmentForm?.addEventListener('submit', function(){
    track('appointment_form_submit',{form_name:'appointment'});
  });
})();
