const WA = '526121768359';
const defaultText = 'Hola, me gustaría solicitar información y agendar una cita en Lau Dental.';
const waUrl = text => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
document.querySelectorAll('.js-whatsapp').forEach(a => { a.href = waUrl(defaultText); a.target='_blank'; a.rel='noopener'; });
const form=document.querySelector('#appointment-form');
if(form) form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const text=`Hola, me gustaría solicitar una cita en Lau Dental.\n\nNombre: ${d.get('name')}\nTeléfono: ${d.get('phone')}\nTratamiento: ${d.get('service')}\nMensaje: ${d.get('message')||'Sin mensaje adicional'}`;window.open(waUrl(text),'_blank','noopener');});
const menu=document.querySelector('.menu-button'),nav=document.querySelector('#nav');
if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open');});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));}
document.querySelector('#year').textContent=new Date().getFullYear();
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
