// PoC 1: IWIC Unified Data, Model & Application Catalog (synthetic data only).
import { I18N, t, getLang, initIWICLayout } from './common-ui.js';

Object.assign(I18N.en, {
  'p1.eyebrow': 'PoC 1 · Unified Data, Model & Application Catalog',
  'p1.title': 'Find Illinois <span>water data, models &amp; tools</span>',
  'p1.search.label': 'Search the catalog',
  'p1.search.placeholder': 'Search datasets, models, agencies, HUC-8 codes…',
  'p1.chips.label': 'Quick filters',
  'p1.chip.popular': 'Popular Datasets (Last 2 Weeks)',
  'p1.chip.flood': 'Flood', 'p1.chip.gw': 'Groundwater', 'p1.chip.loss': 'Water loss', 'p1.chip.levee': 'Levees',
  'p1.featured': 'Explore Featured IWIC Applications',
  'p1.browse': 'Browse resources',
  'p1.tabs.label': 'Resource types',
  'p1.tab.all': 'All Resources', 'p1.tab.datasets': 'Datasets', 'p1.tab.apps': 'Applications & Models',
  'p1.tab.orgs': 'Organizations', 'p1.tab.groups': 'Thematic Groups',
  'p1.filters': 'Filters',
  'p1.facet.category': 'State Water Plan Category (Fig. 7.3)',
  'p1.facet.org': 'Holding Organization / Agency',
  'p1.facet.format': 'File / Model Format',
  'p1.sort': 'Sort by', 'p1.sort.rel': 'Relevance', 'p1.sort.views': 'Most viewed',
  'p1.sort.updated': 'Recently updated', 'p1.sort.title': 'Title (A–Z)',
  'p1.results': '{n} of {total} resources',
  'p1.results.popular': 'Showing the {n} most viewed resources of the last 2 weeks',
  'p1.empty': 'No resources match your search and filters.',
  'p1.views': '{n} views (2 wks)',
  'p1.huc': 'HUC-8',
  'p1.updated': 'Updated',
  'p1.inspect': 'Inspect Metadata & Preview Data',
  'p1.openmap': 'Open on IWIC Map (PoC 2)',
  'p1.close': 'Close',
  'p1.resources': '{n} resources',
  'p1.browse.org': 'Show resources',
  'p1.remove': 'Remove filter',
  'p1.meta.type': 'Resource type', 'p1.meta.category': 'State Water Plan category', 'p1.meta.org': 'Holding organization',
  'p1.meta.group': 'Thematic group', 'p1.meta.formats': 'Formats', 'p1.meta.coverage': 'Spatial coverage',
  'p1.meta.huc': 'Watershed (HUC-8)', 'p1.meta.updated': 'Last updated', 'p1.meta.custodian': 'Custodian contact',
  'p1.meta.id': 'Catalog ID', 'p1.meta.summary': 'Summary',
  'p1.m.records': 'Records', 'p1.m.complete': 'Completeness', 'p1.m.freq': 'Update frequency', 'p1.m.quality': 'Quality score (of 5)',
  'p1.preview': 'Synthetic data preview',
  'p1.preview.caption': 'First 8 rows of a spoofed sample generated in your browser',
  'p1.download': 'Download Synthetic Sample (JSON/CSV)',
  'p1.download.fmt': 'Sample file format',
  'p1.col.id': 'Record', 'p1.col.date': 'Date', 'p1.col.location': 'Location', 'p1.col.value': 'Value', 'p1.col.unit': 'Unit', 'p1.col.qa': 'QA flag',
  'p1.featured.open': 'Open demo on map',
  'p1.err': 'The catalog could not be loaded. Serve this site over HTTP (e.g. GitHub Pages) and retry.',
  'p1.search.fallback': 'Fuzzy search library unavailable; using basic keyword matching.',
  'p1.f1.t': 'Illinois Bridge Hydraulic Model Locator', 'p1.f1.d': 'Find HEC-RAS bridge models and effective profiles by stream, county or HUC-8.',
  'p1.f2.t': 'Lake Michigan Water Loss & SRF Tracker', 'p1.f2.d': 'Track non-revenue water loss and SRF priority points for 200+ allocatees.',
  'p1.f3.t': 'SAFR Structure Flood Risk Viewer', 'p1.f3.d': 'Structure-level flood damage estimates from Statewide Assessment of Flood Risk.',
  'p1.f4.t': 'Mahomet Aquifer Real-Time Explorer', 'p1.f4.d': 'Observation-well levels, withdrawals and drought indicators for the Mahomet Aquifer.',
});

const CAT_ES = {
  'County and Community Hazard Mitigation Plans': 'Planes de mitigación de riesgos de condados y comunidades',
  'Drought Preparedness Information': 'Información de preparación ante sequías',
  'Flood Damage Assessment Information via SAFR': 'Evaluación de daños por inundación mediante SAFR',
  'Flood Mitigation and Flood Preparedness Information': 'Información de mitigación y preparación ante inundaciones',
  'GIS Meta Data': 'Metadatos SIG',
  'Groundwater and Well Data': 'Datos de aguas subterráneas y pozos',
  'Historical Flood Assessment Reports': 'Informes históricos de evaluación de inundaciones',
  'Hydraulic Studies': 'Estudios hidráulicos',
  'Levee Database Information': 'Información de la base de datos de diques',
  'NFIP Letters of Map Amendment': 'Cartas de enmienda de mapa del NFIP (LOMA)',
  'NFIP Letters of Map Revisions': 'Cartas de revisión de mapa del NFIP (LOMR)',
  'Port and Navigation Information': 'Información de puertos y navegación',
  'Public Water Use/Consumption Data': 'Datos de uso y consumo público de agua',
  'Regulatory Floodplain Inundation and Floodway Mapping': 'Mapeo regulatorio de llanuras de inundación y cauces de crecida',
  'Updated rainfall information': 'Información actualizada de precipitaciones',
  'Water Infrastructure Systems Mapping': 'Mapeo de sistemas de infraestructura hídrica',
};
const GROUP_ES = {
  'Flooding & Hydraulics': 'Inundaciones e hidráulica',
  'Groundwater & Drought': 'Aguas subterráneas y sequía',
  'Hazard Mitigation': 'Mitigación de riesgos',
  'Infrastructure & Navigation': 'Infraestructura y navegación',
  'Water Supply & Loss': 'Suministro y pérdida de agua',
};
const TYPE_ES = { Dataset: 'Conjunto de datos', Model: 'Modelo', Application: 'Aplicación', Plan: 'Plan' };
const FREQ_ES = { Monthly: 'Mensual', 'Event-based': 'Por evento', Daily: 'Diaria', Annual: 'Anual', Weekly: 'Semanal', Quarterly: 'Trimestral', 'Real-time': 'Tiempo real', Hourly: 'Cada hora' };

Object.assign(I18N.es, {
  'p1.eyebrow': 'PoC 1 · Catálogo unificado de datos, modelos y aplicaciones',
  'p1.title': 'Encuentre <span>datos, modelos y herramientas del agua</span> de Illinois',
  'p1.search.label': 'Buscar en el catálogo',
  'p1.search.placeholder': 'Busque datos, modelos, agencias, códigos HUC-8…',
  'p1.chips.label': 'Filtros rápidos',
  'p1.chip.popular': 'Conjuntos de datos populares (últimas 2 semanas)',
  'p1.chip.flood': 'Inundación', 'p1.chip.gw': 'Aguas subterráneas', 'p1.chip.loss': 'Pérdida de agua', 'p1.chip.levee': 'Diques',
  'p1.featured': 'Explore las aplicaciones destacadas de IWIC',
  'p1.browse': 'Explorar recursos',
  'p1.tabs.label': 'Tipos de recurso',
  'p1.tab.all': 'Todos los recursos', 'p1.tab.datasets': 'Conjuntos de datos', 'p1.tab.apps': 'Aplicaciones y modelos',
  'p1.tab.orgs': 'Organizaciones', 'p1.tab.groups': 'Grupos temáticos',
  'p1.filters': 'Filtros',
  'p1.facet.category': 'Categoría del Plan Estatal del Agua (Fig. 7.3)',
  'p1.facet.org': 'Organización / agencia responsable',
  'p1.facet.format': 'Formato de archivo / modelo',
  'p1.sort': 'Ordenar por', 'p1.sort.rel': 'Relevancia', 'p1.sort.views': 'Más vistos',
  'p1.sort.updated': 'Actualizados recientemente', 'p1.sort.title': 'Título (A–Z)',
  'p1.results': '{n} de {total} recursos',
  'p1.results.popular': 'Mostrando los {n} recursos más vistos en las últimas 2 semanas',
  'p1.empty': 'Ningún recurso coincide con su búsqueda y filtros.',
  'p1.views': '{n} vistas (2 sem.)',
  'p1.huc': 'HUC-8',
  'p1.updated': 'Actualizado',
  'p1.inspect': 'Inspeccionar metadatos y vista previa de datos',
  'p1.openmap': 'Abrir en el mapa IWIC (PoC 2)',
  'p1.close': 'Cerrar',
  'p1.resources': '{n} recursos',
  'p1.browse.org': 'Mostrar recursos',
  'p1.remove': 'Quitar filtro',
  'p1.meta.type': 'Tipo de recurso', 'p1.meta.category': 'Categoría del Plan Estatal del Agua', 'p1.meta.org': 'Organización responsable',
  'p1.meta.group': 'Grupo temático', 'p1.meta.formats': 'Formatos', 'p1.meta.coverage': 'Cobertura espacial',
  'p1.meta.huc': 'Cuenca (HUC-8)', 'p1.meta.updated': 'Última actualización', 'p1.meta.custodian': 'Contacto del custodio',
  'p1.meta.id': 'ID de catálogo', 'p1.meta.summary': 'Resumen',
  'p1.m.records': 'Registros', 'p1.m.complete': 'Integridad', 'p1.m.freq': 'Frecuencia de actualización', 'p1.m.quality': 'Puntaje de calidad (de 5)',
  'p1.preview': 'Vista previa de datos sintéticos',
  'p1.preview.caption': 'Primeras 8 filas de una muestra simulada generada en su navegador',
  'p1.download': 'Descargar muestra sintética (JSON/CSV)',
  'p1.download.fmt': 'Formato del archivo de muestra',
  'p1.col.id': 'Registro', 'p1.col.date': 'Fecha', 'p1.col.location': 'Ubicación', 'p1.col.value': 'Valor', 'p1.col.unit': 'Unidad', 'p1.col.qa': 'Indicador de calidad',
  'p1.featured.open': 'Abrir demostración en el mapa',
  'p1.err': 'No se pudo cargar el catálogo. Sirva este sitio por HTTP (p. ej., GitHub Pages) e intente de nuevo.',
  'p1.search.fallback': 'Biblioteca de búsqueda difusa no disponible; se usa coincidencia básica de palabras clave.',
  'p1.f1.t': 'Localizador de modelos hidráulicos de puentes de Illinois', 'p1.f1.d': 'Encuentre modelos HEC-RAS de puentes y perfiles vigentes por arroyo, condado o HUC-8.',
  'p1.f2.t': 'Seguimiento de pérdida de agua del lago Míchigan y SRF', 'p1.f2.d': 'Siga la pérdida de agua no facturada y los puntos de prioridad SRF de más de 200 asignatarios.',
  'p1.f3.t': 'Visor de riesgo de inundación de estructuras SAFR', 'p1.f3.d': 'Estimaciones de daños por inundación a nivel de estructura de la evaluación estatal SAFR.',
  'p1.f4.t': 'Explorador en tiempo real del acuífero Mahomet', 'p1.f4.d': 'Niveles de pozos de observación, extracciones e indicadores de sequía del acuífero Mahomet.',
});

const FEATURED = [
  { key: 'p1.f1', slug: 'bridge-models', badges: ['HEC-RAS', 'GeoJSON'], org: 'IDNR-OWR' },
  { key: 'p1.f2', slug: 'lake-michigan-srf', badges: ['XLSX', 'CSV'], org: 'IDNR-OWR' },
  { key: 'p1.f3', slug: 'safr-structures', badges: ['SAFR', 'GeoJSON'], org: 'IDNR-OWR' },
  { key: 'p1.f4', slug: 'mahomet-aquifer', badges: ['CSV', 'GeoJSON'], org: 'ISWS / PRI' },
];

const ORG_ORDER = ['ISWS/PRI', 'IDNR-OWR', 'IEPA', 'IEMA', 'USACE', 'FEMA', 'County/Consultants'];
const FORMAT_ORDER = ['HEC-RAS', 'GeoJSON', 'CSV', 'XLSX', 'PDF', 'GIS Metadata'];
const FUSE_URL = 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.mjs';
const FACETS = [
  { id: 'category', labelKey: 'p1.facet.category' },
  { id: 'org', labelKey: 'p1.facet.org' },
  { id: 'format', labelKey: 'p1.facet.format' },
];
const TABS = ['all', 'datasets', 'apps', 'orgs', 'groups'];

const state = {
  items: [], fuse: null, query: '', tab: 'all', popular: false, sort: 'relevance',
  sel: { category: new Set(), org: new Set(), format: new Set() }, group: null, lastFocus: null,
};
const $ = (id) => document.getElementById(id);

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (key, vars) => Object.entries(vars).reduce((s, [k, v]) => s.replace(`{${k}}`, v), t(key));
const es = () => getLang() === 'es';
const num = (n) => Number(n).toLocaleString(es() ? 'es-US' : 'en-US');
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const normOrg = (o) => {
  if (/^ISWS/.test(o)) return 'ISWS/PRI';
  if (/^USACE/.test(o)) return 'USACE';
  if (/^FEMA/.test(o)) return 'FEMA';
  return o;
};
const title = (d) => (es() && d.title_es) || d.title;
const summary = (d) => (es() && d.summary_es) || d.summary;
const catLabel = (c) => (es() && CAT_ES[c]) || c;
const groupLabel = (g) => (es() && GROUP_ES[g]) || g;
const typeLabel = (ty) => (es() && TYPE_ES[ty]) || ty;
const badgeClass = (f) => `badge badge--${slug(f)}`;

/* ---------- Data & search ---------- */
async function load() {
  const res = await fetch('data/iwic-catalog.json');
  if (!res.ok) throw new Error(res.status);
  state.items = (await res.json()).map((d) => ({ ...d, org: normOrg(d.organization) }));
  try {
    const { default: Fuse } = await import(FUSE_URL);
    state.fuse = new Fuse(state.items, {
      keys: [
        { name: 'title', weight: 3 }, { name: 'title_es', weight: 2 }, { name: 'summary', weight: 1.5 },
        { name: 'summary_es', weight: 1 }, { name: 'category', weight: 1.5 }, { name: 'organization', weight: 1 },
        { name: 'watershed_huc8', weight: 1 }, { name: 'formats', weight: 1 },
      ],
      threshold: 0.32, ignoreLocation: true, minMatchCharLength: 2,
    });
  } catch {
    state.fuse = null;
  }
}

function tabMatch(d) {
  if (state.tab === 'datasets') return d.type === 'Dataset' || d.type === 'Plan';
  if (state.tab === 'apps') return d.type === 'Application' || d.type === 'Model';
  return true;
}

function searchHits() {
  const q = state.query.trim();
  if (!q) return state.items.slice();
  if (state.fuse) return state.fuse.search(q).map((r) => r.item);
  const needle = q.toLowerCase();
  return state.items.filter((d) => JSON.stringify(d).toLowerCase().includes(needle));
}

const hasSel = (skip) => FACETS.some((f) => f.id !== skip && state.sel[f.id].size);

function passes(d, skip) {
  const s = state.sel;
  if (skip !== 'category' && s.category.size && !s.category.has(d.category)) return false;
  if (skip !== 'org' && s.org.size && !s.org.has(d.org)) return false;
  if (skip !== 'format' && s.format.size && !d.formats.some((f) => s.format.has(f))) return false;
  if (state.group && d.group !== state.group) return false;
  return true;
}

function results() {
  let list = searchHits().filter((d) => tabMatch(d) && passes(d));
  if (state.popular) {
    list = list.filter((d) => d.type === 'Dataset' || d.type === 'Plan').sort((a, b) => b.views_recent - a.views_recent).slice(0, 8);
    return list;
  }
  const sorters = {
    views: (a, b) => b.views_recent - a.views_recent,
    updated: (a, b) => b.updated_date.localeCompare(a.updated_date),
    title: (a, b) => title(a).localeCompare(title(b), getLang()),
  };
  if (sorters[state.sort]) list.sort(sorters[state.sort]);
  return list;
}

/* ---------- Rendering ---------- */
function renderTabs() {
  const base = searchHits();
  const counts = {
    all: base.length,
    datasets: base.filter((d) => d.type === 'Dataset' || d.type === 'Plan').length,
    apps: base.filter((d) => d.type === 'Application' || d.type === 'Model').length,
    orgs: new Set(base.map((d) => d.org)).size,
    groups: new Set(base.map((d) => d.group)).size,
  };
  $('tabs').innerHTML = TABS.map((id) => `<button type="button" role="tab" id="tab-${id}" data-tab="${id}"
    aria-selected="${state.tab === id}" tabindex="${state.tab === id ? 0 : -1}" aria-controls="results">
    ${esc(t(`p1.tab.${id}`))} <span class="count">(${counts[id]})</span></button>`).join('');
}

function renderFacets() {
  const open = new Set([...document.querySelectorAll('#facets details[open]')].map((e) => e.dataset.facet));
  const firstRender = !$('facets').children.length;
  const base = searchHits().filter(tabMatch);
  const catSet = [...new Set(state.items.map((d) => d.category))].sort((a, b) => catLabel(a).localeCompare(catLabel(b), getLang()));
  const orgSet = [...ORG_ORDER, ...new Set(state.items.map((d) => d.org))].filter((v, i, a) => a.indexOf(v) === i);
  const fmtSet = [...FORMAT_ORDER, ...new Set(state.items.flatMap((d) => d.formats))].filter((v, i, a) => a.indexOf(v) === i);
  const values = { category: catSet, org: orgSet, format: fmtSet };
  const count = (id, v) => base.filter((d) => passes(d, id) && (id === 'format' ? d.formats.includes(v) : (id === 'org' ? d.org : d.category) === v)).length;
  const label = (id, v) => (id === 'category' ? catLabel(v) : v);

  $('facets').innerHTML = FACETS.map((f) => `
    <details data-facet="${f.id}" ${firstRender || open.has(f.id) ? 'open' : ''}>
      <summary>${esc(t(f.labelKey))}</summary>
      <ul class="facet-list">${values[f.id].map((v) => {
        const n = count(f.id, v);
        const checked = state.sel[f.id].has(v);
        return `<li><label><input type="checkbox" data-facet="${f.id}" value="${esc(v)}" ${checked ? 'checked' : ''}>
          <span>${esc(label(f.id, v))}</span><span class="facet-count" aria-label="${n}">${n}</span></label></li>`;
      }).join('')}</ul>
    </details>`).join('');
}

function cardHTML(d) {
  const formats = d.formats.map((f) => `<span class="${badgeClass(f)}">${esc(f)}</span>`).join('');
  return `<article class="card card--blue result-card" aria-labelledby="t-${d.id}">
    <span class="cat">${esc(catLabel(d.category))}</span>
    <h3 id="t-${d.id}">${esc(title(d))}</h3>
    <div class="tags">
      <span class="badge badge--agency">${esc(d.organization)}</span>
      <span class="badge badge--type">${esc(typeLabel(d.type))}</span>
      ${formats}
      <span class="badge badge--huc">${esc(t('p1.huc'))} ${esc(d.watershed_huc8)}</span>
    </div>
    <p>${esc(summary(d))}</p>
    <p class="meta">${esc(fmt('p1.views', { n: num(d.views_recent) }))} · ${esc(t('p1.updated'))} ${esc(d.updated_date)}</p>
    <div class="actions">
      <button type="button" class="btn" data-inspect="${esc(d.id)}">${esc(t('p1.inspect'))}</button>
      <a class="btn btn--secondary" href="poc2-map.html?dataset=${encodeURIComponent(d.id)}">${esc(t('p1.openmap'))}</a>
    </div>
  </article>`;
}

function renderBrowseGroups(kind) {
  const key = kind === 'orgs' ? 'org' : 'group';
  const map = new Map();
  searchHits().forEach((d) => map.set(d[key], (map.get(d[key]) || 0) + 1));
  const entries = [...map].sort((a, b) => b[1] - a[1]);
  $('result-count').textContent = '';
  $('results').innerHTML = `<div class="grid grid--3 results-grid">${entries.map(([name, n]) => `
    <article class="card card--prairie result-card">
      <h3>${esc(kind === 'groups' ? groupLabel(name) : name)}</h3>
      <p class="meta">${esc(fmt('p1.resources', { n }))}</p>
      <div class="actions"><button type="button" class="btn" data-browse="${kind}" data-value="${esc(name)}">${esc(t('p1.browse.org'))}</button></div>
    </article>`).join('')}</div>`;
}

function renderActive() {
  const chips = [];
  FACETS.forEach((f) => state.sel[f.id].forEach((v) => chips.push({ f: f.id, v, label: f.id === 'category' ? catLabel(v) : v })));
  if (state.group) chips.push({ f: 'group', v: state.group, label: groupLabel(state.group) });
  $('active-filters').innerHTML = chips.map((c) =>
    `<button type="button" data-remove="${c.f}" data-value="${esc(c.v)}" aria-label="${esc(t('p1.remove'))}: ${esc(c.label)}">${esc(c.label)} ✕</button>`).join('');
}

function render() {
  renderTabs();
  renderFacets();
  renderActive();
  const sortWrap = $('sort').closest('label');
  const browsing = state.tab === 'orgs' || state.tab === 'groups';
  sortWrap.hidden = browsing || state.popular;
  $('chip-popular').setAttribute('aria-pressed', String(state.popular));
  document.querySelectorAll('.chip[data-kw]').forEach((c) => c.setAttribute('aria-pressed', String(!state.popular && state.query === c.dataset.kw)));
  if (browsing) { renderBrowseGroups(state.tab); return; }
  const list = results();
  $('result-count').textContent = state.popular
    ? fmt('p1.results.popular', { n: list.length })
    : fmt('p1.results', { n: list.length, total: state.items.length });
  $('results').innerHTML = list.length
    ? `<div class="grid results-grid">${list.map(cardHTML).join('')}</div>`
    : `<p class="empty">${esc(t('p1.empty'))}</p>`;
}

function renderFeatured() {
  $('featured').innerHTML = FEATURED.map((f) => `
    <article class="card card--link" role="listitem">
      <span class="card-num">${esc(f.org)}</span>
      <h3><a class="stretched" href="poc2-map.html?app=${f.slug}">${esc(t(`${f.key}.t`))}</a></h3>
      <p>${esc(t(`${f.key}.d`))}</p>
      <p>${f.badges.map((b) => `<span class="${badgeClass(b)}">${esc(b)}</span>`).join(' ')}</p>
      <span class="card-cta" aria-hidden="true">${esc(t('p1.featured.open'))} →</span>
    </article>`).join('');
}

/* ---------- Synthetic preview & download ---------- */
function rng(seedStr) {
  let h = 2166136261;
  for (const c of seedStr) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return () => { h += 0x6D2B79F5; let x = Math.imul(h ^ (h >>> 15), 1 | h); x ^= x + Math.imul(x ^ (x >>> 7), 61 | x); return ((x ^ (x >>> 14)) >>> 0) / 4294967296; };
}

function sampleRows(d, n = 25) {
  const r = rng(d.id);
  const unitByCat = {
    'Updated rainfall information': ['Precip. depth', 'in'], 'Groundwater and Well Data': ['Water level depth', 'ft'],
    'Public Water Use/Consumption Data': ['Withdrawal', 'MGD'], 'Hydraulic Studies': ['100-yr WSE', 'ft NAVD88'],
    'Drought Preparedness Information': ['Drought index', 'PDSI'], 'Levee Database Information': ['Crest freeboard', 'ft'],
  };
  const [param, unit] = unitByCat[d.category] || ['Metric value', 'units'];
  const places = d.spatial_coverage.split(/\s*&\s*|,\s*/);
  const base = new Date(d.updated_date + 'T00:00:00Z');
  return Array.from({ length: n }, (_, i) => {
    const date = new Date(base.getTime() - i * 86400000 * 7).toISOString().slice(0, 10);
    return {
      record_id: `${d.id}-${String(i + 1).padStart(4, '0')}`,
      date,
      location: places[i % places.length],
      parameter: param,
      value: Number((r() * 90 + 5).toFixed(2)),
      unit,
      qa_flag: r() > 0.85 ? 'REVIEW' : 'OK',
    };
  });
}

function download(d, kind) {
  const rows = sampleRows(d);
  let body; let mime;
  if (kind === 'csv') {
    const cols = Object.keys(rows[0]);
    body = [cols.join(','), ...rows.map((r) => cols.map((c) => `"${String(r[c]).replace(/"/g, '""')}"`).join(','))].join('\n');
    mime = 'text/csv;charset=utf-8';
  } else {
    body = JSON.stringify({
      notice: 'SYNTHETIC DATA: generated for IWIC workshop demonstration only.',
      dataset: { id: d.id, title: d.title, organization: d.organization, category: d.category, huc8: d.watershed_huc8 },
      records: rows,
    }, null, 2);
    mime = 'application/json';
  }
  const url = URL.createObjectURL(new Blob([body], { type: mime }));
  const a = Object.assign(document.createElement('a'), { href: url, download: `${d.id}-synthetic-sample.${kind}` });
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ---------- Modal ---------- */
function openModal(id, trigger) {
  const d = state.items.find((x) => x.id === id);
  if (!d) return;
  state.modalId = id;
  state.lastFocus = trigger || document.activeElement;
  fillModal(d);
  const dlg = $('modal');
  if (!dlg.open) dlg.showModal();
  $('modal-close').focus();
}

function fillModal(d) {
  const m = d.synthetic_metrics;
  const rows = sampleRows(d).slice(0, 8);
  const dd = (k, v) => `<dt>${esc(t(k))}</dt><dd>${v}</dd>`;
  const contact = `${esc(d.contact_role)}, ${esc(d.organization)} — <a href="mailto:synthetic-steward@example.invalid">synthetic-steward@example.invalid</a>`;
  $('modal-title').textContent = title(d);
  $('modal-body').innerHTML = `
    <p class="pill pill--info">${esc(t('banner.title'))}</p>
    <p>${esc(summary(d))}</p>
    <dl class="meta-grid">
      ${dd('p1.meta.id', esc(d.id))}
      ${dd('p1.meta.type', esc(typeLabel(d.type)))}
      ${dd('p1.meta.category', esc(catLabel(d.category)))}
      ${dd('p1.meta.group', esc(groupLabel(d.group)))}
      ${dd('p1.meta.org', esc(d.organization))}
      ${dd('p1.meta.formats', d.formats.map((f) => `<span class="${badgeClass(f)}">${esc(f)}</span>`).join(' '))}
      ${dd('p1.meta.coverage', esc(d.spatial_coverage))}
      ${dd('p1.meta.huc', esc(d.watershed_huc8))}
      ${dd('p1.meta.updated', esc(d.updated_date))}
      ${dd('p1.meta.custodian', contact)}
    </dl>
    <div class="metrics">
      <div class="metric"><strong>${num(m.record_count)}</strong><span>${esc(t('p1.m.records'))}</span></div>
      <div class="metric"><strong>${m.completeness_pct}%</strong><span>${esc(t('p1.m.complete'))}</span></div>
      <div class="metric"><strong>${esc((es() && FREQ_ES[m.update_frequency]) || m.update_frequency)}</strong><span>${esc(t('p1.m.freq'))}</span></div>
      <div class="metric"><strong>${m.quality_score}</strong><span>${esc(t('p1.m.quality'))}</span></div>
    </div>
    <h3>${esc(t('p1.preview'))}</h3>
    <div class="table-wrap" tabindex="0" role="region" aria-label="${esc(t('p1.preview'))}">
      <table>
        <caption>${esc(t('p1.preview.caption'))}</caption>
        <thead><tr>${['id', 'date', 'location', 'value', 'unit', 'qa'].map((c) => `<th scope="col">${esc(t(`p1.col.${c}`))}</th>`).join('')}</tr></thead>
        <tbody>${rows.map((r) => `<tr><td>${esc(r.record_id)}</td><td>${esc(r.date)}</td><td>${esc(r.location)}</td><td>${r.value}</td><td>${esc(r.unit)}</td><td>${esc(r.qa_flag)}</td></tr>`).join('')}</tbody>
      </table>
    </div>
    <div class="download-row">
      <label><span class="sr-only" style="position:absolute;left:-9999px">${esc(t('p1.download.fmt'))}</span>
        <select id="dl-format"><option value="json">JSON</option><option value="csv">CSV</option></select></label>
      <button type="button" class="btn" id="dl-btn">${esc(t('p1.download'))}</button>
      <a class="btn btn--secondary" href="poc2-map.html?dataset=${encodeURIComponent(d.id)}">${esc(t('p1.openmap'))}</a>
    </div>`;
  $('dl-btn').addEventListener('click', () => download(d, $('dl-format').value));
}

function closeModal() { $('modal').close(); }

/* ---------- Events ---------- */
function resetFilters() {
  FACETS.forEach((f) => state.sel[f.id].clear());
  state.group = null; state.popular = false; state.query = ''; $('q').value = '';
}

function wire() {
  $('search-form').addEventListener('submit', (e) => { e.preventDefault(); state.popular = false; state.query = $('q').value; render(); });
  $('q').addEventListener('input', () => { state.popular = false; state.query = $('q').value; render(); });
  $('chip-popular').addEventListener('click', () => {
    state.popular = !state.popular;
    if (state.popular) { state.tab = 'datasets'; state.query = ''; $('q').value = ''; }
    else state.tab = 'all';
    render();
  });
  document.querySelectorAll('.chip[data-kw]').forEach((c) => c.addEventListener('click', () => {
    const same = state.query === c.dataset.kw && !state.popular;
    state.popular = false; state.tab = 'all';
    state.query = same ? '' : c.dataset.kw; $('q').value = state.query; render();
  }));
  $('sort').addEventListener('change', (e) => { state.sort = e.target.value; render(); });
  $('reset').addEventListener('click', () => { resetFilters(); state.tab = 'all'; render(); });

  $('tabs').addEventListener('click', (e) => {
    const b = e.target.closest('[data-tab]');
    if (b) { state.tab = b.dataset.tab; state.popular = false; render(); }
  });
  $('tabs').addEventListener('keydown', (e) => {
    const i = TABS.indexOf(state.tab);
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: TABS.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    state.tab = TABS[(next + TABS.length) % TABS.length]; state.popular = false; render();
    $(`tab-${state.tab}`).focus();
  });

  $('facets').addEventListener('change', (e) => {
    const cb = e.target.closest('input[data-facet]');
    if (!cb) return;
    state.popular = false;
    const set = state.sel[cb.dataset.facet];
    cb.checked ? set.add(cb.value) : set.delete(cb.value);
    render();
  });
  $('active-filters').addEventListener('click', (e) => {
    const b = e.target.closest('[data-remove]');
    if (!b) return;
    if (b.dataset.remove === 'group') state.group = null; else state.sel[b.dataset.remove].delete(b.dataset.value);
    render();
  });
  $('results').addEventListener('click', (e) => {
    const ins = e.target.closest('[data-inspect]');
    if (ins) { openModal(ins.dataset.inspect, ins); return; }
    const br = e.target.closest('[data-browse]');
    if (br) {
      if (br.dataset.browse === 'orgs') { state.sel.org.clear(); state.sel.org.add(br.dataset.value); }
      else state.group = br.dataset.value;
      state.tab = 'all'; render();
      $('tab-all').focus();
    }
  });

  $('filter-toggle').addEventListener('click', () => {
    const sb = $('sidebar');
    const collapsed = sb.dataset.collapsed === 'true';
    sb.dataset.collapsed = String(!collapsed);
    $('filter-toggle').setAttribute('aria-expanded', String(collapsed));
  });
  const mq = window.matchMedia('(max-width: 900px)');
  const syncSidebar = () => { $('sidebar').dataset.collapsed = String(mq.matches); $('filter-toggle').setAttribute('aria-expanded', 'false'); };
  syncSidebar(); mq.addEventListener('change', syncSidebar);

  $('modal-close').addEventListener('click', closeModal);
  $('modal').addEventListener('click', (e) => { if (e.target === $('modal')) closeModal(); });
  $('modal').addEventListener('close', () => { state.modalId = null; state.lastFocus?.focus?.(); });

  document.addEventListener('iwic:langchange', () => {
    $('q').placeholder = t('p1.search.placeholder');
    renderFeatured();
    render();
    const d = state.modalId && state.items.find((x) => x.id === state.modalId);
    if (d && $('modal').open) fillModal(d);
  });
}

async function init() {
  initIWICLayout('poc1');
  $('q').placeholder = t('p1.search.placeholder');
  renderFeatured();
  wire();
  try {
    await load();
  } catch {
    $('results').innerHTML = `<p class="empty" role="alert">${esc(t('p1.err'))}</p>`;
    return;
  }
  if (!state.fuse) $('result-count').insertAdjacentHTML('afterend', `<p class="muted" role="note">${esc(t('p1.search.fallback'))}</p>`);
  render();
}

init();
