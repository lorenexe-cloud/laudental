const button=document.querySelector('.menu');
const nav=document.querySelector('.header nav');
button?.addEventListener('click',()=>nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const modal=document.querySelector('#appointment-modal');
const openButtons=document.querySelectorAll('.js-open-appointment');
const closeButtons=document.querySelectorAll('.js-close-appointment');
const openModal=()=>{modal?.classList.add('open');modal?.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');modal?.querySelector('input:not([type="hidden"])')?.focus();};
const closeModal=()=>{modal?.classList.remove('open');modal?.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');};
openButtons.forEach(btn=>btn.addEventListener('click',openModal));
closeButtons.forEach(btn=>btn.addEventListener('click',closeModal));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeModal();});

const params=new URLSearchParams(location.search);
if(params.get('cita')==='enviada'){
  const toast=document.createElement('div');
  toast.className='success-toast';
  toast.textContent='¡Gracias! Recibimos tu solicitud de cita.';
  document.body.appendChild(toast);
  history.replaceState({},'',location.pathname+location.hash);
  setTimeout(()=>toast.remove(),6000);
}
