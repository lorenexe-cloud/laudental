(() => {
  const get = (obj, path) => path.split('.').reduce((v, k) => v && v[k], obj);
  const escapeHtml = (value='') => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  fetch('/content/site.json', { cache: 'no-store' })
    .then(r => { if (!r.ok) throw new Error('No se pudo cargar el contenido'); return r.json(); })
    .then(data => {
      window.LAUDENTAL_CONFIG = data.contact || {};
      if (data.site?.title) document.title = data.site.title;
      const meta = document.querySelector('meta[name="description"]'); if(meta && data.site?.description) meta.content=data.site.description;
      document.querySelectorAll('[data-cms]').forEach(el => { const v=get(data,el.dataset.cms); if(v!==undefined) el.textContent=v; });
      document.querySelectorAll('.brand img,.site-footer img').forEach(img => { if(data.site?.logo) img.src=data.site.logo; });
      const highlights=document.getElementById('about-highlights');
      if(highlights) highlights.innerHTML=(data.about?.highlights||[]).map(x=>`<li>${escapeHtml(x)}</li>`).join('');
      const services=document.getElementById('services-grid');
      if(services) services.innerHTML=(data.treatments||[]).map((s,i)=>`<article class="service-card reveal visible"><div class="service-icon">${escapeHtml(s.icon||'✦')}</div><h3>${escapeHtml(s.name)}</h3><p>${escapeHtml(s.description)}</p></article>`).join('');
      const doctors=document.getElementById('doctors-grid');
      if(doctors) doctors.innerHTML=(data.doctors||[]).map(d=>`<article class="doctor-card reveal visible"><div class="doctor-avatar"><img src="${escapeHtml(d.image)}" alt="${escapeHtml(d.name)}" loading="lazy"></div><div class="doctor-info"><h3>${escapeHtml(d.name)}</h3><p class="doctor-role">${escapeHtml(d.specialty)}</p><ul>${(d.credentials||[]).map(c=>`<li>${escapeHtml(c)}</li>`).join('')}</ul></div></article>`).join('');
      const script=document.createElement('script'); script.src='/js/app.js'; document.body.appendChild(script);
    })
    .catch(err => { console.error(err); window.LAUDENTAL_CONFIG={}; const script=document.createElement('script'); script.src='/js/app.js'; document.body.appendChild(script); });
})();
