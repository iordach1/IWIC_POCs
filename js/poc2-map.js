// PoC 2 · Geospatial Hydraulics & SRF Equity Explorer (all data synthetic)
import { initIWICLayout } from './common-ui.js';

const COLORS = {
  blue: '#13294B', industrial: '#0071CE', industrialLight: '#3CB4E5', altgeld: '#C84113',
  harvest: '#FCB316', prairie: '#006230', berry: '#5C0E41', storm: '#707372',
};
const AGENCY_COLORS = {
  'IDNR-OWR': COLORS.blue, ISWS: COLORS.industrial, USACE: COLORS.altgeld,
  FEMA: COLORS.prairie, County: COLORS.harvest, Other: COLORS.storm,
};
const DEFAULT_WEIGHTS = { loss: 40, dac: 35, lead: 25 };
const LOSS_CAP_PCT = 20;

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (n) => Number(n).toLocaleString('en-US');

const state = {
  scenario: 'a', software: 'all', search: '',
  weights: { ...DEFAULT_WEIGHTS }, models: [], systems: [], catalog: [],
  selected: null,
};
let map, layerA, layerB, detailChart, srfChart, maxLead = 1;
const markerById = new Map();

function agencyGroup(a) {
  if (AGENCY_COLORS[a]) return a;
  return /county/i.test(a) ? 'County' : 'Other';
}

function softwareGroups(p) {
  const g = [];
  const sw = p.model_software || '';
  if (/LOMR/i.test(p.feature_type)) g.push('LOMR');
  if (/MODFLOW/i.test(sw)) g.push('MODFLOW');
  if (/HEC-RAS/i.test(sw)) g.push(/2D/i.test(sw) ? 'HEC-RAS 2D' : 'HEC-RAS');
  if (/HEC-HMS|HEC-ResSim/i.test(sw)) g.push('HEC-HMS/ResSim');
  return g;
}

function svgIcon(color, shape) {
  const body = shape === 'polygon'
    ? `<rect x="4" y="4" width="16" height="16" rx="2" fill="${color}" stroke="#fff" stroke-width="2"/>`
    : `<path d="M12 1C7 1 3.5 4.6 3.5 9.3 3.5 15.4 12 23 12 23s8.5-7.6 8.5-13.7C20.5 4.6 17 1 12 1z" fill="${color}" stroke="#fff" stroke-width="2"/><circle cx="12" cy="9.3" r="3.2" fill="#fff"/>`;
  return L.divIcon({
    className: 'iwic-marker', iconSize: [28, 28], iconAnchor: [14, 26], popupAnchor: [0, -24],
    html: `<svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`,
  });
}

/* ---------- scoring ---------- */
function score(s, w = state.weights) {
  const total = w.loss + w.dac + w.lead;
  if (!total) return 0;
  const parts = {
    loss: Math.min(s.water_loss_pct / LOSS_CAP_PCT, 1),
    dac: s.is_disadvantaged_community ? 1 : 0,
    lead: s.lead_service_lines_est / maxLead,
  };
  return Math.round((100 * (w.loss * parts.loss + w.dac * parts.dac + w.lead * parts.lead)) / total * 10) / 10;
}

function sysCategory(s) {
  if (s.water_loss_pct > 10 && s.is_disadvantaged_community) return { key: 'high', color: COLORS.altgeld, label: 'DAC with >10% loss (High Priority SRF)' };
  if (s.water_loss_pct > 10) return { key: 'loss', color: COLORS.harvest, label: '>10% loss (Non-DAC)' };
  return { key: 'ok', color: COLORS.prairie, label: 'Compliant (<10% loss)' };
}

/* ---------- map ---------- */
function initMap() {
  map = L.map('map', { zoomControl: true }).setView([40.0, -89.2], 7);
  const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' });
  // Public, client-side CARTO basemap key; restrict it by domain in the CARTO dashboard.
  const CARTO_API_KEY = 'cb1_45a0_1_0fd240c90c2200d1262e9adf';
  const carto = L.tileLayer(`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?api_key=${CARTO_API_KEY}`, { maxZoom: 19, subdomains: 'abcd', attribution: '&copy; OpenStreetMap contributors &copy; CARTO' });
  const usgs = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/{z}/{y}/{x}', { maxZoom: 16, attribution: 'USGS The National Map: Hydrography' });
  carto.addTo(map);
  L.control.layers({ 'CartoDB Positron': carto, OpenStreetMap: osm, 'USGS National Map Hydrography': usgs }, {}, { collapsed: true }).addTo(map);
  layerA = L.layerGroup().addTo(map);
  layerB = L.layerGroup();
}

function featureCenter(f) {
  if (f.geometry.type === 'Point') return [f.geometry.coordinates[1], f.geometry.coordinates[0]];
  const ring = f.geometry.coordinates[0];
  return [ring.reduce((a, c) => a + c[1], 0) / ring.length, ring.reduce((a, c) => a + c[0], 0) / ring.length];
}

function modelVisible(f) {
  const p = f.properties;
  if (state.software !== 'all' && !softwareGroups(p).includes(state.software)) return false;
  const q = state.search.trim().toLowerCase();
  if (q && !`${p.name} ${p.waterway} ${p.county} ${p.id}`.toLowerCase().includes(q)) return false;
  return true;
}

function popupA(p) {
  return `<h3>${esc(p.name)}</h3><div>${esc(p.feature_type)} · ${esc(p.model_software)}</div>
    <div>Held by <strong>${esc(p.holding_agency)}</strong></div>
    <div><a href="poc1-catalog.html?q=${encodeURIComponent(p.catalog_id || '')}">Catalog record ${esc(p.catalog_id || '')}</a></div>`;
}

function renderModels() {
  layerA.clearLayers();
  markerById.clear();
  let shown = 0;
  const agencies = new Set();
  state.models.forEach((f) => {
    if (!modelVisible(f)) return;
    const p = f.properties;
    const color = AGENCY_COLORS[agencyGroup(p.holding_agency)];
    let layer;
    if (f.geometry.type === 'Point') {
      layer = L.marker(featureCenter(f), { icon: svgIcon(color), title: p.name, alt: p.name, keyboard: true });
    } else {
      layer = L.geoJSON(f, { style: { color, weight: 2, fillColor: color, fillOpacity: 0.3 } });
    }
    layer.bindPopup(popupA(p));
    layer.on('click', () => selectModel(f, false));
    layer.addTo(layerA);
    markerById.set(p.id, { layer, f });
    shown++; agencies.add(p.holding_agency);
  });
  $('stats-a').innerHTML = `<div class="stat"><strong>${shown}</strong><span>models shown</span></div>
    <div class="stat"><strong>${agencies.size}</strong><span>holding agencies</span></div>`;
}

function renderSystems() {
  layerB.clearLayers();
  markerById.clear();
  const maxPop = Math.max(...state.systems.map((s) => s.population_served));
  state.systems.forEach((s) => {
    const c = sysCategory(s);
    const r = 6 + 20 * Math.sqrt(s.population_served / maxPop);
    const m = L.circleMarker([s.lat, s.lng], { radius: r, color: COLORS.blue, weight: 1.5, fillColor: c.color, fillOpacity: 0.8 });
    m.bindPopup(`<h3>${esc(s.municipality)}</h3><div>${esc(s.county)} County · ${fmt(s.population_served)} served</div>
      <div>Water loss <strong>${s.water_loss_pct}%</strong> · ${s.is_disadvantaged_community ? 'DAC' : 'Non-DAC'}</div>
      <div>SRF score <strong>${score(s)}</strong></div>`);
    m.on('click', () => selectSystem(s, false));
    m.addTo(layerB);
    markerById.set(s.pws_id, { layer: m, s });
  });
}

/* ---------- selection & charts ---------- */
const chartText = { color: '#252525', font: { family: "'Source Sans 3', sans-serif" } };

function hydrographSeries(p) {
  // Deterministic synthetic hydrograph peaking near the current stage
  const hours = Array.from({ length: 25 }, (_, i) => i * 2);
  const peak = Math.max(p.current_stage_ft * 1.35, p.current_stage_ft + 1);
  const base = Math.max(p.current_stage_ft * 0.35, 0.5);
  return {
    hours,
    stage: hours.map((h) => Math.round((base + (peak - base) * Math.exp(-Math.pow((h - 30) / 14, 2))) * 10) / 10),
  };
}

function showDetailChart(config) {
  if (detailChart) detailChart.destroy();
  detailChart = new Chart($('chart-detail'), config);
}

function selectModel(f, fly = true) {
  const p = f.properties;
  state.selected = p.id;
  const swGroups = softwareGroups(p).join(', ');
  $('drawer-title').textContent = p.name;
  $('detail').innerHTML = `<dl class="meta-grid">
    <dt>Feature type</dt><dd>${esc(p.feature_type)}</dd>
    <dt>Software</dt><dd>${esc(p.model_software)} <span class="note">(${esc(swGroups)})</span></dd>
    <dt>Holding agency</dt><dd>${esc(p.holding_agency)}</dd>
    <dt>Waterway</dt><dd>${esc(p.waterway)}, ${esc(p.county)} Co.</dd>
    <dt>100-yr flow</dt><dd>${p.return_period_100yr_cfs != null ? fmt(p.return_period_100yr_cfs) + ' cfs' : '—'}</dd>
    <dt>Status</dt><dd><span class="badge-status">${esc(p.status)}</span></dd>
    <dt>Catalog</dt><dd><a href="poc1-catalog.html?q=${encodeURIComponent(p.catalog_id || '')}">${esc(p.catalog_id || '—')}</a></dd>
  </dl>
  <p class="note">${nearbyNote(f)}</p>`;
  const hasStage = p.flood_stage_ft != null && p.current_stage_ft != null;
  if (hasStage) {
    const { hours, stage } = hydrographSeries(p);
    showDetailChart({
      type: 'line',
      data: {
        labels: hours.map((h) => `${h}h`),
        datasets: [
          { label: 'Synthetic stage (ft)', data: stage, borderColor: COLORS.industrial, backgroundColor: COLORS.industrialLight, tension: 0.35, pointRadius: 0, fill: false },
          { label: `Flood stage (${p.flood_stage_ft} ft)`, data: hours.map(() => p.flood_stage_ft), borderColor: COLORS.altgeld, borderDash: [6, 4], pointRadius: 0 },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { title: { display: true, text: 'Hydrograph vs. flood stage (synthetic)', ...chartText }, legend: { labels: chartText } },
        scales: { y: { title: { display: true, text: 'Stage (ft)', ...chartText }, beginAtZero: true }, x: { title: { display: true, text: 'Forecast hours', ...chartText } } },
      },
    });
  } else {
    showDetailChart({
      type: 'bar',
      data: { labels: ['100-yr flow (cfs)'], datasets: [{ label: p.name, data: [p.return_period_100yr_cfs || 0], backgroundColor: AGENCY_COLORS[agencyGroup(p.holding_agency)] }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'No stage data for this feature type', ...chartText } } },
    });
  }
  openDrawer();
  const entry = markerById.get(p.id);
  if (fly) {
    map.flyTo(featureCenter(f), 11, { duration: 0.8 });
    if (entry) setTimeout(() => (entry.layer.openPopup ? entry.layer.openPopup() : null), 900);
  }
}

function nearbyNote(f) {
  const [lat, lng] = featureCenter(f);
  const near = state.models.filter((o) => o !== f && modelVisible(o) && map.distance([lat, lng], featureCenter(o)) < 25000);
  if (!near.length) return 'No other visible models within 25 km.';
  const list = near.map((o) => `${esc(o.properties.name)} (${esc(o.properties.holding_agency)})`).join('; ');
  return `<strong>${near.length} other model(s) within 25 km:</strong> ${list}`;
}

function selectSystem(s, fly = true) {
  state.selected = s.pws_id;
  const c = sysCategory(s);
  $('drawer-title').textContent = s.municipality;
  $('detail').innerHTML = `<dl class="meta-grid">
    <dt>PWS ID</dt><dd>${esc(s.pws_id)}</dd>
    <dt>County</dt><dd>${esc(s.county)}</dd>
    <dt>Source</dt><dd>${esc(s.water_source)}</dd>
    <dt>Population</dt><dd>${fmt(s.population_served)}</dd>
    <dt>Water loss</dt><dd>${s.water_loss_pct}% (${esc(s.wsip_status)})</dd>
    <dt>DAC status</dt><dd>${s.is_disadvantaged_community ? 'Disadvantaged' : 'Not disadvantaged'} · MHI $${fmt(s.median_household_income)}</dd>
    <dt>Lead lines (est.)</dt><dd>${fmt(s.lead_service_lines_est)}</dd>
    <dt>Class</dt><dd>${esc(c.label)}</dd>
    <dt>SRF score</dt><dd><strong>${score(s)}</strong> · ${esc(s.recommended_funding_agency)}</dd>
  </dl>`;
  const w = state.weights, total = w.loss + w.dac + w.lead || 1;
  const comp = (wt, v) => Math.round((100 * wt * v) / total * 10) / 10;
  showDetailChart({
    type: 'bar',
    data: {
      labels: ['Water loss', 'DAC status', 'Lead lines'],
      datasets: [{
        label: 'Weighted contribution to score',
        data: [comp(w.loss, Math.min(s.water_loss_pct / LOSS_CAP_PCT, 1)), comp(w.dac, s.is_disadvantaged_community ? 1 : 0), comp(w.lead, s.lead_service_lines_est / maxLead)],
        backgroundColor: [COLORS.industrial, COLORS.altgeld, COLORS.berry],
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false, indexAxis: 'y',
      plugins: { title: { display: true, text: 'Score composition (points)', ...chartText }, legend: { display: false } },
      scales: { x: { beginAtZero: true } },
    },
  });
  openDrawer();
  if (fly) {
    map.flyTo([s.lat, s.lng], 10, { duration: 0.8 });
    const e = markerById.get(s.pws_id);
    if (e) setTimeout(() => e.layer.openPopup(), 900);
  }
  highlightRank();
}

function openDrawer() {
  $('drawer').dataset.open = 'true';
  $('drawer-toggle').textContent = 'Collapse';
  $('drawer-toggle').setAttribute('aria-expanded', 'true');
}

/* ---------- Scenario B analytics ---------- */
function ranked() {
  return state.systems.map((s) => ({ s, score: score(s) })).sort((a, b) => b.score - a.score);
}

function refreshB() {
  const w = state.weights;
  $('v-loss').textContent = w.loss; $('v-dac').textContent = w.dac; $('v-lead').textContent = w.lead;
  const r = ranked();
  $('rank').tBodies[0].innerHTML = r.map((x, i) => `<tr tabindex="0" data-id="${esc(x.s.pws_id)}">
    <td class="n">${i + 1}</td><td>${esc(x.s.municipality)}${x.s.is_disadvantaged_community ? ' <abbr title="Disadvantaged Community">DAC</abbr>' : ''}</td>
    <td class="n">${x.s.water_loss_pct}%</td><td class="n"><strong>${x.score}</strong></td></tr>`).join('');
  const high = state.systems.filter((s) => sysCategory(s).key === 'high').length;
  const over = state.systems.filter((s) => s.water_loss_pct > 10).length;
  $('stats-b').innerHTML = `<div class="stat"><strong>${high}</strong><span>High-priority SRF</span></div>
    <div class="stat"><strong>${over}</strong><span>systems &gt;10% loss</span></div>`;
  state.systems.forEach((s) => { s.srf_priority_score = score(s); });
  drawScatter(r);
  highlightRank();
  if (state.selected && markerById.get(state.selected)?.s) selectSystem(markerById.get(state.selected).s, false);
}

function highlightRank() {
  document.querySelectorAll('#rank tbody tr').forEach((tr) => {
    const on = tr.dataset.id === state.selected;
    tr.style.outline = on ? '2px solid #C84113' : '';
  });
}

function drawScatter(r) {
  const data = r.map((x) => ({ x: x.s.water_loss_pct, y: x.score, name: x.s.municipality, id: x.s.pws_id }));
  const colors = r.map((x) => sysCategory(x.s).color);
  if (srfChart) {
    srfChart.data.datasets[0].data = data;
    srfChart.data.datasets[0].backgroundColor = colors;
    srfChart.update();
    return;
  }
  srfChart = new Chart($('chart-srf'), {
    type: 'scatter',
    data: { datasets: [{ label: 'Public water systems', data, backgroundColor: colors, borderColor: COLORS.blue, pointRadius: 6, pointHoverRadius: 9 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      onClick: (_, els) => { if (els.length) { const d = srfChart.data.datasets[0].data[els[0].index]; selectSystem(markerById.get(d.id).s); } },
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Water loss % vs. SRF priority score (colors match map legend)', ...chartText },
        tooltip: { callbacks: { label: (c) => `${c.raw.name}: ${c.raw.x}% loss, score ${c.raw.y}` } },
      },
      scales: { x: { title: { display: true, text: 'Water loss (%)', ...chartText } }, y: { title: { display: true, text: 'SRF priority score', ...chartText }, min: 0, max: 100 } },
    },
  });
}

/* ---------- scenarios ---------- */
const DESC = {
  a: 'Engineer designing a replacement bridge? Locate existing HEC-RAS and related models held by FEMA, USACE, IDNR-OWR, ISWS and counties — e.g., Fox River at Millhurst Dam.',
  b: 'Lake Michigan allocatees and Illinois utilities: find systems losing >10% of water and combine with Disadvantaged Community status to prioritize IEPA SRF capital grants.',
};

function setScenario(sc, { fit = true } = {}) {
  state.scenario = sc;
  state.selected = null;
  $('sc-a').setAttribute('aria-pressed', String(sc === 'a'));
  $('sc-b').setAttribute('aria-pressed', String(sc === 'b'));
  $('scenario-desc').textContent = DESC[sc];
  $('ctl-a').classList.toggle('hidden', sc !== 'a');
  $('ctl-b').classList.toggle('hidden', sc !== 'b');
  $('box-b').classList.toggle('hidden', sc !== 'b');
  $('drawer-title').textContent = 'Details & analytics';
  $('detail').innerHTML = '<p class="note">Select a map feature to see its details.</p>';
  if (detailChart) { detailChart.destroy(); detailChart = null; }
  if (sc === 'a') {
    map.removeLayer(layerB); layerA.addTo(map); renderModels();
    if (fit) map.flyTo([41.69, -88.4], 9, { duration: 0.8 });
  } else {
    map.removeLayer(layerA); layerB.addTo(map); renderSystems(); refreshB();
    if (fit) map.flyTo([40.6, -88.6], 7, { duration: 0.8 });
  }
}

/* ---------- URL parameters ---------- */
function applyQuery() {
  const params = new URLSearchParams(location.search);
  const ds = params.get('dataset');
  const sc = params.get('scenario');
  if (sc === 'a' || sc === 'b') setScenario(sc, { fit: false });
  if (!ds) return;
  const key = ds.trim().toLowerCase();
  const model = state.models.find((f) => [f.properties.id, f.properties.catalog_id].some((v) => v && v.toLowerCase() === key));
  const system = state.systems.find((s) => s.pws_id.toLowerCase() === key);
  if (system) {
    setScenario('b', { fit: false });
    selectSystem(system);
    return;
  }
  if (model) {
    setScenario('a', { fit: false });
    const matches = state.models.filter((f) => f.properties.catalog_id && f.properties.catalog_id.toLowerCase() === key);
    const target = model;
    selectModel(target);
    if (matches.length > 1) {
      map.fitBounds(L.latLngBounds(matches.map(featureCenter)).pad(0.3), { maxZoom: 11 });
    }
    return;
  }
  const rec = state.catalog.find((d) => d.id.toLowerCase() === key);
  if (rec) {
    const water = /water loss|srf|lead|utility|drinking/i.test(`${rec.title} ${rec.category} ${rec.summary}`);
    setScenario(water ? 'b' : 'a');
    $('scenario-desc').textContent = `Catalog record “${rec.title}” (${rec.id}) has no mapped feature in this synthetic sample. ${DESC[state.scenario]}`;
  }
}

/* ---------- init ---------- */
async function init() {
  initIWICLayout('poc2');
  initMap();
  try {
    const [gj, sys, cat] = await Promise.all([
      fetch('data/hydraulic-models.geojson').then((r) => r.json()),
      fetch('data/water-systems-srf.json').then((r) => r.json()),
      fetch('data/iwic-catalog.json').then((r) => r.json()).catch(() => []),
    ]);
    state.models = gj.features;
    state.systems = sys;
    state.catalog = Array.isArray(cat) ? cat : [];
    maxLead = Math.max(...sys.map((s) => s.lead_service_lines_est), 1);
  } catch (e) {
    $('detail').innerHTML = '<p role="alert">Unable to load synthetic datasets. Serve this site over HTTP (e.g., <code>python3 -m http.server</code>).</p>';
    return;
  }

  $('legend-a').innerHTML = Object.entries(AGENCY_COLORS).map(([a, c]) => `<li><span class="swatch" style="background:${c}"></span>${a === 'Other' ? 'Other (USGS, private)' : a}</li>`).join('');

  $('sc-a').addEventListener('click', () => setScenario('a'));
  $('sc-b').addEventListener('click', () => setScenario('b'));
  $('f-software').addEventListener('change', (e) => { state.software = e.target.value; renderModels(); });
  $('f-search').addEventListener('input', (e) => { state.search = e.target.value; renderModels(); });
  [['w-loss', 'loss'], ['w-dac', 'dac'], ['w-lead', 'lead']].forEach(([id, k]) => {
    $(id).addEventListener('input', (e) => { state.weights[k] = Number(e.target.value); refreshB(); });
  });
  $('w-reset').addEventListener('click', () => {
    state.weights = { ...DEFAULT_WEIGHTS };
    $('w-loss').value = DEFAULT_WEIGHTS.loss; $('w-dac').value = DEFAULT_WEIGHTS.dac; $('w-lead').value = DEFAULT_WEIGHTS.lead;
    refreshB();
  });
  const pickRow = (e) => {
    const tr = e.target.closest('tr[data-id]');
    if (tr && (e.type === 'click' || e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); selectSystem(markerById.get(tr.dataset.id).s); }
  };
  $('rank').addEventListener('click', pickRow);
  $('rank').addEventListener('keydown', pickRow);

  $('toggle-panel').addEventListener('click', () => {
    const app = $('app');
    const collapsed = app.dataset.collapsed !== 'true';
    app.dataset.collapsed = String(collapsed);
    $('toggle-panel').textContent = collapsed ? 'Show panel' : 'Hide panel';
    $('toggle-panel').setAttribute('aria-expanded', String(!collapsed));
    setTimeout(() => map.invalidateSize(), 50);
  });
  $('drawer-toggle').addEventListener('click', () => {
    const open = $('drawer').dataset.open !== 'true';
    $('drawer').dataset.open = String(open);
    $('drawer-toggle').textContent = open ? 'Collapse' : 'Expand';
    $('drawer-toggle').setAttribute('aria-expanded', String(open));
    setTimeout(() => map.invalidateSize(), 50);
  });

  setScenario('a', { fit: false });
  applyQuery();
}

init();
