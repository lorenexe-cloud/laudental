LAU DENTAL 2.0 — SITIO + PANEL DE ADMINISTRACIÓN

QUÉ INCLUYE
- Logo proporcionado por Lau Dental, optimizado en JPG y WebP.
- Sitio adaptable a celular y computadora.
- Panel de administración en /admin.
- Edición de portada, nosotros, tratamientos, especialistas, contacto, logo y fotografías.
- Contenido guardado en content/site.json.
- Publicación automática mediante GitHub + Cloudflare Pages.

IMPORTANTE
El panel está integrado, pero el acceso necesita enlazarse una sola vez con una cuenta de GitHub y un autenticador OAuth. No publiques el panel sin completar estos datos.

PASOS DE ACTIVACIÓN
1. Crea un repositorio de GitHub llamado laudental y sube TODO el contenido de esta carpeta, no el ZIP.
2. Abre admin/config.yml y cambia:
   repo: TU_USUARIO_GITHUB/laudental
   por tu usuario y repositorio reales.
3. Crea un proyecto nuevo en Cloudflare Pages usando “Connect to Git”. No reutilices un proyecto creado como Direct Upload, porque Cloudflare no permite convertirlo después a integración Git.
4. Selecciona el repositorio laudental. Framework preset: None. Build command: dejar vacío. Output directory: / o dejar vacío.
5. Configura un proveedor OAuth compatible con Decap CMS para GitHub. Puedes usar un autenticador desplegado en Cloudflare Workers.
6. En admin/config.yml cambia:
   base_url: https://TU-AUTENTICADOR.workers.dev
   por la dirección real del autenticador.
7. Confirma los cambios en GitHub. Cloudflare publicará automáticamente.
8. Entra a https://TU-DOMINIO/admin e inicia sesión con GitHub.

DATOS QUE DEBES CAMBIAR ANTES DE PUBLICAR
Desde content/site.json o, cuando el panel ya funcione, desde /admin:
- Teléfono
- WhatsApp
- Dirección
- Horario
- Google Maps
- Correo
- Fotografías reales de especialistas e instalaciones

CÓMO SE ACTUALIZA
Cada cambio guardado desde /admin genera una actualización en GitHub. Cloudflare Pages detecta el cambio y vuelve a publicar el sitio automáticamente.

ARCHIVOS PRINCIPALES
- index.html: estructura del sitio
- content/site.json: contenido editable
- admin/index.html: panel Decap CMS
- admin/config.yml: campos y conexión con GitHub
- js/content.js: carga el contenido editable
