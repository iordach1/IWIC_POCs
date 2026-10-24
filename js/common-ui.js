// Shared IWIC layout: UIUC header, synthetic-data banner, footer, and EN/ES i18n.

const STORAGE_KEY = 'iwic-lang';
const SUPPORTED = ['en', 'es'];

export const I18N = {
  en: {
    'skip': 'Skip to main content',
    'parent.unit': 'Prairie Research Institute | Illinois State Water Survey',
    'parent.univ': 'University of Illinois Urbana-Champaign',
    'site.title': 'Illinois Integrated Water Information Center (IWIC)',
    'site.subtitle': 'Illinois State Water Plan · Chapter 7 Recommendation',
    'nav.label': 'Main navigation',
    'nav.home': 'Home (Overview)',
    'nav.poc1': 'PoC 1: Data & Model Catalog',
    'nav.poc2': 'PoC 2: Geospatial & Priority Explorer',
    'nav.poc3': 'PoC 3: AI Water & Grant Navigator',
    'lang.label': 'Language',
    'banner.title': 'PROTOTYPE & SYNTHETIC DATA NOTICE:',
    'banner.body': 'This application is a conceptual Proof of Concept for the Illinois Integrated Water Information Center (IWIC). While it references real Illinois waterways, municipalities, aquifers, and state/federal agencies, all underlying numerical metrics, model files, and statuses are 100% synthetic (spoofed) and generated strictly for workshop demonstration purposes.',
    'btn.search': 'Search',
    'btn.explore': 'Explore',
    'btn.launch': 'Launch demo',
    'btn.download': 'Download',
    'btn.details': 'View details',
    'btn.reset': 'Reset filters',
    'btn.close': 'Close',
    'btn.ask': 'Ask IWIC',
    'section.datasets': 'Datasets & Models',
    'section.map': 'Map Explorer',
    'section.funding': 'Funding Programs',
    'section.about': 'About IWIC',
    'section.partners': 'Task Force Partners',
    'footer.mission': 'Mission',
    'footer.mission.body': 'As the land-grant university of Illinois, the University of Illinois Urbana-Champaign and its Prairie Research Institute advance the public good through research, teaching, and service, including science-based stewardship of the state\u2019s water resources.',
    'footer.partners': 'State Water Plan Task Force Partners',
    'footer.colophon.title': 'Open-Source Zero-Budget Architecture',
    'footer.colophon.body': 'Built with static HTML/CSS/JS on GitHub Pages, Leaflet, Fuse.js, Chart.js and WebLLM. No paid APIs, no servers, $0 hosting.',

    'hero.eyebrow': 'Illinois State Water Plan Task Force Workshop',
    'hero.title': 'One front door for Illinois <span>water science</span>',
    'hero.body': 'The Illinois Integrated Water Information Center (IWIC), housed at the Prairie Research Institute at the University of Illinois, is envisioned as a centralized library of water science-based information and technology: the data, models, maps, and applications that agencies, utilities, and communities need, in one trusted place.',
    'hero.cta1': 'Explore the 3 proofs of concept',
    'hero.cta2': 'See the $0 architecture',
    'poc.heading': '3 Proofs of Concept',
    'poc.intro': 'Three working demos share a single synthetic dataset and show what IWIC could deliver for different audiences.',
    'poc.serves': 'Serves:',
    'poc1.title': 'Unified Data, Model & Application Catalog',
    'poc1.body': 'Search and filter datasets, hydraulic models and applications across all State Water Plan categories with fuzzy, faceted search and rich metadata.',
    'poc2.title': 'Geospatial Hydraulics & SRF Equity Explorer',
    'poc2.body': 'Map stream gages, bridge models, levees and utilities, then rank State Revolving Fund candidates using water loss and disadvantaged-community scores.',
    'poc3.title': '\u201CAsk IWIC\u201D Multilingual AI & Grant Navigator',
    'poc3.body': 'Ask plain-language questions in English or Spanish and get cited answers and matching grant programs, running entirely in the browser.',
    'persona.engineers': 'State agency engineers',
    'persona.operators': 'Municipal water operators',
    'persona.emergency': 'Emergency managers',
    'persona.communities': 'Disadvantaged communities',
    'lang.callout': 'Overcoming language barriers is a State Water Plan recommendation. Use the English | Español toggle in the header to see the interface switch languages instantly.',
    'budget.heading': 'De Minimis Budget Architecture',
    'budget.intro': 'Every tool in this workshop is built from free, open-source software and runs client-side. There are no servers to maintain, no API keys, and no licenses to buy.',
    'budget.hosting': 'GitHub Pages hosting',
    'budget.hosting.body': 'Static files served free from a GitHub repository. Automated deploys via GitHub Actions.',
    'budget.leaflet': 'Interactive mapping with OpenStreetMap, CartoDB and USGS hydrography tiles. No API keys.',
    'budget.fuse': 'Client-side fuzzy search over the catalog. No search server.',
    'budget.chart': 'Accessible, responsive charts for priority scoring and trends.',
    'budget.webllm': 'Optional in-browser WebGPU language model; falls back to built-in instant retrieval (RAG).',
    'budget.total': 'Total recurring cost',
    'budget.total.body': 'Hosting, search, mapping, charts, and AI assistant, all at no recurring cost.',
    'cost.zero': '$0',
  },
  es: {
    'skip': 'Saltar al contenido principal',
    'parent.unit': 'Instituto de Investigación Prairie | Estudio de Aguas de Illinois',
    'parent.univ': 'Universidad de Illinois en Urbana-Champaign',
    'site.title': 'Centro Integrado de Información del Agua de Illinois (IWIC)',
    'site.subtitle': 'Plan Estatal del Agua de Illinois · Recomendación del Capítulo 7',
    'nav.label': 'Navegación principal',
    'nav.home': 'Inicio (Resumen)',
    'nav.poc1': 'PoC 1: Catálogo de Datos y Modelos',
    'nav.poc2': 'PoC 2: Explorador Geoespacial y de Prioridades',
    'nav.poc3': 'PoC 3: Navegador de Agua y Subvenciones con IA',
    'lang.label': 'Idioma',
    'banner.title': 'AVISO DE PROTOTIPO Y DATOS SINTÉTICOS:',
    'banner.body': 'Esta aplicación es una Prueba de Concepto conceptual para el Centro Integrado de Información del Agua de Illinois (IWIC). Aunque hace referencia a vías fluviales, municipios, acuíferos y agencias estatales y federales reales de Illinois, todas las métricas numéricas, archivos de modelos y estados subyacentes son 100 % sintéticos (simulados) y se generaron estrictamente para fines de demostración en el taller.',
    'btn.search': 'Buscar',
    'btn.explore': 'Explorar',
    'btn.launch': 'Iniciar demostración',
    'btn.download': 'Descargar',
    'btn.details': 'Ver detalles',
    'btn.reset': 'Restablecer filtros',
    'btn.close': 'Cerrar',
    'btn.ask': 'Preguntar a IWIC',
    'section.datasets': 'Conjuntos de datos y modelos',
    'section.map': 'Explorador de mapas',
    'section.funding': 'Programas de financiamiento',
    'section.about': 'Acerca de IWIC',
    'section.partners': 'Socios del Grupo de Trabajo',
    'footer.mission': 'Misión',
    'footer.mission.body': 'Como universidad de concesión de tierras de Illinois, la Universidad de Illinois en Urbana-Champaign y su Instituto de Investigación Prairie promueven el bien público mediante la investigación, la enseñanza y el servicio, incluida la gestión científica de los recursos hídricos del estado.',
    'footer.partners': 'Socios del Grupo de Trabajo del Plan Estatal del Agua',
    'footer.colophon.title': 'Arquitectura de código abierto y presupuesto cero',
    'footer.colophon.body': 'Construido con HTML/CSS/JS estático en GitHub Pages, Leaflet, Fuse.js, Chart.js y WebLLM. Sin API de pago, sin servidores, alojamiento de $0.',

    'hero.eyebrow': 'Taller del Grupo de Trabajo del Plan Estatal del Agua de Illinois',
    'hero.title': 'Una sola puerta de entrada a la <span>ciencia del agua</span> de Illinois',
    'hero.body': 'El Centro Integrado de Información del Agua de Illinois (IWIC), alojado en el Instituto de Investigación Prairie de la Universidad de Illinois, se concibe como una biblioteca centralizada de información y tecnología basadas en la ciencia del agua: los datos, modelos, mapas y aplicaciones que necesitan las agencias, los servicios públicos y las comunidades, en un solo lugar confiable.',
    'hero.cta1': 'Explorar las 3 pruebas de concepto',
    'hero.cta2': 'Ver la arquitectura de $0',
    'poc.heading': '3 Pruebas de Concepto',
    'poc.intro': 'Tres demostraciones funcionales comparten un único conjunto de datos sintéticos y muestran lo que IWIC podría ofrecer a distintas audiencias.',
    'poc.serves': 'Dirigido a:',
    'poc1.title': 'Catálogo unificado de datos, modelos y aplicaciones',
    'poc1.body': 'Busque y filtre conjuntos de datos, modelos hidráulicos y aplicaciones de todas las categorías del Plan Estatal del Agua con búsqueda difusa, facetas y metadatos completos.',
    'poc2.title': 'Explorador geoespacial hidráulico y de equidad del SRF',
    'poc2.body': 'Mapee estaciones de aforo, modelos de puentes, diques y servicios públicos, y clasifique candidatos del Fondo Rotatorio Estatal según la pérdida de agua y los puntajes de comunidades desfavorecidas.',
    'poc3.title': '\u00ABPregunte a IWIC\u00BB: IA multilingüe y navegador de subvenciones',
    'poc3.body': 'Haga preguntas en lenguaje sencillo en inglés o español y obtenga respuestas con fuentes y programas de subvenciones relevantes, todo dentro del navegador.',
    'persona.engineers': 'Ingenieros de agencias estatales',
    'persona.operators': 'Operadores municipales de agua',
    'persona.emergency': 'Gestores de emergencias',
    'persona.communities': 'Comunidades desfavorecidas',
    'lang.callout': 'Superar las barreras del idioma es una recomendación del Plan Estatal del Agua. Use el selector English | Español del encabezado para ver cómo la interfaz cambia de idioma al instante.',
    'budget.heading': 'Arquitectura de presupuesto mínimo',
    'budget.intro': 'Todas las herramientas de este taller se construyen con software libre y de código abierto y se ejecutan en el cliente. No hay servidores que mantener, ni claves de API, ni licencias que comprar.',
    'budget.hosting': 'Alojamiento en GitHub Pages',
    'budget.hosting.body': 'Archivos estáticos servidos gratis desde un repositorio de GitHub. Despliegues automatizados con GitHub Actions.',
    'budget.leaflet': 'Mapas interactivos con teselas de OpenStreetMap, CartoDB e hidrografía del USGS. Sin claves de API.',
    'budget.fuse': 'Búsqueda difusa en el cliente sobre el catálogo. Sin servidor de búsqueda.',
    'budget.chart': 'Gráficos accesibles y adaptables para puntajes de prioridad y tendencias.',
    'budget.webllm': 'Modelo de lenguaje WebGPU opcional en el navegador; recurre a la recuperación instantánea integrada (RAG).',
    'budget.total': 'Costo recurrente total',
    'budget.total.body': 'Alojamiento, búsqueda, mapas, gráficos y asistente de IA, sin costo recurrente.',
    'cost.zero': '$0',
  },
};

const NAV = [
  { href: 'index.html', key: 'nav.home', id: 'home' },
  { href: 'poc1-catalog.html', key: 'nav.poc1', id: 'poc1' },
  { href: 'poc2-map.html', key: 'nav.poc2', id: 'poc2' },
  { href: 'poc3-assistant.html', key: 'nav.poc3', id: 'poc3' },
];

const PARTNERS = [
  ['IDNR-OWR', 'https://dnr.illinois.gov/waterresources.html'],
  ['IEPA', 'https://epa.illinois.gov/'],
  ['IEMA', 'https://iema.illinois.gov/'],
  ['IDCEO', 'https://dceo.illinois.gov/'],
  ['IDOA', 'https://agr.illinois.gov/'],
  ['ISWS', 'https://www.isws.illinois.edu/'],
];

export function getLang() {
  let stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch { /* storage unavailable */ }
  return SUPPORTED.includes(stored) ? stored : 'en';
}

export function t(key, lang = getLang()) {
  return I18N[lang]?.[key] ?? I18N.en[key] ?? key;
}

/** Translate every [data-i18n] (text) and [data-i18n-html] (trusted markup) under root. */
export function applyTranslations(root = document, lang = getLang()) {
  root.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n, lang); });
  root.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml, lang); });
  root.querySelectorAll('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria, lang)); });
  document.documentElement.lang = lang;
}

export function setLang(lang) {
  if (!SUPPORTED.includes(lang)) return;
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* storage unavailable */ }
  applyTranslations(document, lang);
  document.querySelectorAll('.lang-toggle button').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
  });
  document.dispatchEvent(new CustomEvent('iwic:langchange', { detail: { lang } }));
}

const blockI = `
<svg class="block-i" viewBox="0 0 44 56" role="img" aria-label="University of Illinois Block I" focusable="false">
  <rect width="44" height="56" fill="#13294B"/>
  <path d="M4 3h36v12H29v26h11v12H4V41h11V15H4z" fill="#FF5F05" stroke="#FFFFFF" stroke-width="1.5" stroke-linejoin="round"/>
</svg>`;

const warnIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path d="M12 2 1 21h22z" fill="#FCB316" stroke="#13294B" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M12 9v5m0 3v.5" stroke="#13294B" stroke-width="2" stroke-linecap="round"/>
</svg>`;

function headerHTML(activePage) {
  const lang = getLang();
  const links = NAV.map((n) =>
    `<li><a href="${n.href}" data-i18n="${n.key}"${n.id === activePage ? ' aria-current="page"' : ''}></a></li>`).join('');
  return `
<a class="skip-link" href="#main" data-i18n="skip"></a>
<div class="parent-bar"><div class="container">
  <strong data-i18n="parent.unit"></strong><span data-i18n="parent.univ"></span>
</div></div>
<header class="site-header">
  <div class="container identity">
    <a href="index.html">${blockI}
      <span class="site-title"><span data-i18n="site.title"></span><small data-i18n="site.subtitle"></small></span>
    </a>
  </div>
  <nav class="main-nav" data-i18n-aria="nav.label" aria-label="${t('nav.label', lang)}">
    <div class="container">
      <ul>${links}</ul>
      <div class="lang-toggle" role="group" data-i18n-aria="lang.label" aria-label="${t('lang.label', lang)}">
        <button type="button" data-lang="en" lang="en" aria-pressed="${lang === 'en'}">English</button>
        <button type="button" data-lang="es" lang="es" aria-pressed="${lang === 'es'}">Español</button>
      </div>
    </div>
  </nav>
</header>
<div class="synthetic-banner" role="region" aria-labelledby="synthetic-title">
  <div class="container">${warnIcon}
    <p><strong id="synthetic-title" data-i18n="banner.title"></strong> <span data-i18n="banner.body"></span></p>
  </div>
</div>`;
}

function footerHTML() {
  const partners = PARTNERS.map(([n, u]) => `<li><a href="${u}" rel="noopener">${n}</a></li>`).join('');
  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div><h2 data-i18n="footer.mission"></h2><p data-i18n="footer.mission.body"></p></div>
      <div><h2 data-i18n="footer.partners"></h2><ul>${partners}</ul></div>
      <div><h2 data-i18n="footer.colophon.title"></h2><p data-i18n="footer.colophon.body"></p></div>
    </div>
    <p class="colophon">© University of Illinois Board of Trustees · Prairie Research Institute · Illinois State Water Survey</p>
  </div>
</footer>`;
}

/**
 * Inject shared header/banner/footer and wire up the language switcher.
 * @param {'home'|'poc1'|'poc2'|'poc3'} activePage
 */
export function initIWICLayout(activePage = 'home') {
  document.body.insertAdjacentHTML('afterbegin', headerHTML(activePage));
  document.body.insertAdjacentHTML('beforeend', footerHTML());
  const main = document.querySelector('main');
  if (main && !main.id) main.id = 'main';

  document.querySelector('.lang-toggle').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-lang]');
    if (btn) setLang(btn.dataset.lang);
  });
  setLang(getLang());
}
