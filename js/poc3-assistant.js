// PoC 3: "Ask IWIC" client-side RAG assistant + multi-agency funding matrix (synthetic data only).
import { I18N, t, getLang, setLang, initIWICLayout } from './common-ui.js';

Object.assign(I18N.en, {
  'p3.ask.title': '\u201CAsk IWIC\u201D Conversational Assistant',
  'p3.mode.label': 'Assistant mode',
  'p3.mode.rag': 'Mode 1 · Client-Side RAG (instant)',
  'p3.mode.llm': 'Mode 2 · Browser WebLLM (WebGPU)',
  'p3.mode.rag.note': 'Searches /data/*.json in memory and answers with exact citations in milliseconds. No download, works offline.',
  'p3.mode.llm.note': 'Optional: a small open-source LLM runs on your own GPU ($0 server cost) to rephrase the retrieved facts. First use downloads the model.',
  'p3.llm.model': 'Local model',
  'p3.llm.nogpu': 'WebGPU is not available in this browser. Staying in instant RAG mode.',
  'p3.llm.loading': 'Downloading model…',
  'p3.llm.ready': 'Model ready.',
  'p3.llm.fail': 'Could not load the local model. Using instant RAG.',
  'p3.llm.gen': 'Local LLM synthesis',
  'p3.chips.en': 'Workshop prompts · English',
  'p3.chips.es': 'Preguntas de taller · Español',
  'p3.input.label': 'Your question',
  'p3.input.ph': 'Ask about models, water loss, SRF priority or grants…',
  'p3.send': 'Ask',
  'p3.you': 'You', 'p3.bot': 'Ask IWIC',
  'p3.welcome': 'Hello! I answer only from the synthetic IWIC datasets (catalog, hydraulic models, water systems, funding programs). Try a prompt chip or type a question in English or Spanish.',
  'p3.nohit': 'I could not find matching synthetic records. Try mentioning a river, agency, water-loss percentage or grant topic.',
  'p3.timing': 'Retrieved {n} records in {ms} ms · client-side BM25',
  'p3.sources': 'Sources',
  'p3.open.catalog': 'Open in PoC 1 catalog', 'p3.open.map': 'Zoom on PoC 2 map', 'p3.apply': 'Show in funding matrix',
  'p3.kind.catalog': 'Catalog record', 'p3.kind.model': 'Hydraulic model / asset', 'p3.kind.system': 'Water system', 'p3.kind.funding': 'Funding program',
  'p3.matrix.title': 'Multi-Agency Funding & Local Assistance Matrix',
  'p3.matrix.desc': 'Select your water challenges to compare non-uniform criteria, local match and timelines.',
  'p3.matrix.challenges': 'Your water challenge',
  'p3.matrix.dac': 'Disadvantaged Community Status',
  'p3.matrix.summary': '{n} programs across {a} agencies match.',
  'p3.matrix.all': 'No challenge selected: showing all programs.',
  'p3.matrix.none': 'No matching program for this challenge.',
  'p3.match': 'Local match', 'p3.timeline': 'Timeline', 'p3.prereq': 'Prerequisites',
  'p3.match.waived': '0% (DAC waiver, standard {p}%)', 'p3.match.nowaiver': '{p}% (no DAC waiver)', 'p3.match.std': '{p}%', 'p3.match.loan': 'None (loan / forgivable principal)',
  'p3.ans.systems': '{n} synthetic water systems match ({crit}):',
  'p3.ans.systems.none': 'No synthetic water systems match ({crit}).',
  'p3.crit.loss': 'water loss over {x}%', 'p3.crit.lake': 'Lake Michigan allocatee', 'p3.crit.dac': 'disadvantaged community',
  'p3.ans.sys.row': '{name} ({county} Co.): {loss}% loss, SRF score {score}, DAC: {dac}. Suggested: {fund}',
  'p3.yes': 'yes', 'p3.no': 'no',
  'p3.ans.models': 'Most relevant hydraulic models and assets:',
  'p3.ans.model.row': '{name}: {type}, {sw}, status {status}, held by {agency}',
  'p3.ans.catalog': 'Related catalog records:',
  'p3.ans.funding': 'Funding programs compared (non-uniform criteria):',
  'p3.ans.fund.row': '{agency} · {name}: match {match}; {timeline}',
  'p3.ans.dachint': 'Tip: for disadvantaged communities, check the DAC toggle in the matrix to see waived local match.',
  'p3.ans.generic': 'Top matching synthetic records:',
  'p3.llm.sys': 'You are Ask IWIC, a concise assistant. Answer ONLY using the CONTEXT. All data is synthetic. Cite record IDs in brackets. Answer in English.',
});
Object.assign(I18N.es, {
  'p3.ask.title': '\u00ABPregunte a IWIC\u00BB: asistente conversacional',
  'p3.mode.label': 'Modo del asistente',
  'p3.mode.rag': 'Modo 1 · RAG en el navegador (instantáneo)',
  'p3.mode.llm': 'Modo 2 · WebLLM en el navegador (WebGPU)',
  'p3.mode.rag.note': 'Busca en /data/*.json en memoria y responde con citas exactas en milisegundos. Sin descargas, funciona sin conexión.',
  'p3.mode.llm.note': 'Opcional: un modelo de código abierto pequeño se ejecuta en su propia GPU (costo de servidor $0) para redactar los datos recuperados. El primer uso descarga el modelo.',
  'p3.llm.model': 'Modelo local',
  'p3.llm.nogpu': 'WebGPU no está disponible en este navegador. Se mantiene el modo RAG instantáneo.',
  'p3.llm.loading': 'Descargando modelo…',
  'p3.llm.ready': 'Modelo listo.',
  'p3.llm.fail': 'No se pudo cargar el modelo local. Se usa RAG instantáneo.',
  'p3.llm.gen': 'Síntesis con LLM local',
  'p3.chips.en': 'Workshop prompts · English',
  'p3.chips.es': 'Preguntas de taller · Español',
  'p3.input.label': 'Su pregunta',
  'p3.input.ph': 'Pregunte sobre modelos, pérdida de agua, prioridad SRF o subvenciones…',
  'p3.send': 'Preguntar',
  'p3.you': 'Usted', 'p3.bot': 'Pregunte a IWIC',
  'p3.welcome': '¡Hola! Respondo únicamente con los datos sintéticos de IWIC (catálogo, modelos hidráulicos, sistemas de agua, programas de financiamiento). Pruebe una pregunta sugerida o escriba en inglés o español.',
  'p3.nohit': 'No encontré registros sintéticos relacionados. Mencione un río, agencia, porcentaje de pérdida de agua o tema de subvención.',
  'p3.timing': '{n} registros recuperados en {ms} ms · BM25 en el navegador',
  'p3.sources': 'Fuentes',
  'p3.open.catalog': 'Abrir en catálogo (PoC 1)', 'p3.open.map': 'Acercar en el mapa (PoC 2)', 'p3.apply': 'Ver en la matriz de fondos',
  'p3.kind.catalog': 'Registro del catálogo', 'p3.kind.model': 'Modelo hidráulico / activo', 'p3.kind.system': 'Sistema de agua', 'p3.kind.funding': 'Programa de financiamiento',
  'p3.matrix.title': 'Matriz multiagencia de financiamiento y asistencia local',
  'p3.matrix.desc': 'Seleccione sus retos hídricos para comparar criterios no uniformes, contrapartida local y plazos.',
  'p3.matrix.challenges': 'Su reto hídrico',
  'p3.matrix.dac': 'Estatus de comunidad desfavorecida',
  'p3.matrix.summary': '{n} programas en {a} agencias coinciden.',
  'p3.matrix.all': 'Sin reto seleccionado: se muestran todos los programas.',
  'p3.matrix.none': 'Ningún programa coincide con este reto.',
  'p3.match': 'Contrapartida local', 'p3.timeline': 'Plazo', 'p3.prereq': 'Requisitos previos',
  'p3.match.waived': '0% (exención DAC, estándar {p}%)', 'p3.match.nowaiver': '{p}% (sin exención DAC)', 'p3.match.std': '{p}%', 'p3.match.loan': 'Ninguna (préstamo / condonación de capital)',
  'p3.ans.systems': '{n} sistemas de agua sintéticos coinciden ({crit}):',
  'p3.ans.systems.none': 'Ningún sistema de agua sintético coincide ({crit}).',
  'p3.crit.loss': 'pérdida de agua mayor a {x}%', 'p3.crit.lake': 'asignatario del lago Míchigan', 'p3.crit.dac': 'comunidad desfavorecida',
  'p3.ans.sys.row': '{name} (condado de {county}): {loss}% de pérdida, puntaje SRF {score}, DAC: {dac}. Sugerido: {fund}',
  'p3.yes': 'sí', 'p3.no': 'no',
  'p3.ans.models': 'Modelos hidráulicos y activos más relevantes:',
  'p3.ans.model.row': '{name}: {type}, {sw}, estado {status}, a cargo de {agency}',
  'p3.ans.catalog': 'Registros del catálogo relacionados:',
  'p3.ans.funding': 'Programas de financiamiento comparados (criterios no uniformes):',
  'p3.ans.fund.row': '{agency} · {name}: contrapartida {match}; {timeline}',
  'p3.ans.dachint': 'Consejo: para comunidades desfavorecidas, active el estatus DAC en la matriz para ver la exención de contrapartida local.',
  'p3.ans.generic': 'Registros sintéticos más relevantes:',
  'p3.llm.sys': 'Usted es Pregunte a IWIC, un asistente conciso. Responda SOLO con el CONTEXTO. Todos los datos son sintéticos. Cite los IDs entre corchetes. Responda en español.',
});

const WEBLLM_URL = 'https://esm.run/@mlc-ai/web-llm';

const PROMPTS = {
  en: [
    'Where can I find a HEC-RAS hydraulic model for a bridge replacement on the Fox River?',
    'Which Lake Michigan water allocatees have water loss over 10% and qualify for disadvantaged community SRF priority?',
    'Compare flood mitigation grant criteria across IDNR, IEMA, IEPA, and IDCEO for a small rural municipality.',
  ],
  es: [
    '¿Dónde puedo encontrar un modelo hidráulico HEC-RAS para reemplazar un puente en el río Fox?',
    '¿Qué asignatarios de agua del lago Míchigan tienen pérdida de agua superior al 10% y califican para prioridad SRF como comunidad desfavorecida?',
    'Compare los criterios de subvenciones para mitigación de inundaciones entre IDNR, IEMA, IEPA e IDCEO para un municipio rural pequeño.',
    '¿Qué programas de asistencia existen para comunidades desfavorecidas con problemas de inundaciones o pérdida de agua?',
  ],
};

const ISSUES = [
  { id: 'Urban Flooding', en: 'Urban Flooding', es: 'Inundaciones urbanas' },
  { id: 'Water Loss >10%', en: 'Water Loss >10%', es: 'Pérdida de agua >10%' },
  { id: 'Bridge/Culvert Hydraulics', en: 'Bridge/Culvert Replacement', es: 'Reemplazo de puentes/alcantarillas' },
  { id: 'Drought Resiliency', en: 'Drought/Well Supply', es: 'Sequía/suministro de pozos' },
  { id: 'Lead Service Lines', en: 'Lead Service Lines', es: 'Líneas de servicio de plomo' },
  { id: 'Levee Rehabilitation', en: 'Levee Rehabilitation', es: 'Rehabilitación de diques' },
];

const TIMELINE_ES = [
  [/after disaster declaration/g, 'tras la declaración de desastre'], [/after practice installation/g, 'tras la instalación de la práctica'],
  [/after award/g, 'tras la adjudicación'], [/months/g, 'meses'], [/reimbursement/g, 'reembolso'],
  [/technical assistance/g, 'asistencia técnica'], [/low-interest loan with principal forgiveness/g, 'préstamo de bajo interés con condonación de capital'],
  [/low-interest loan/g, 'préstamo de bajo interés'], [/competitive national award/g, 'adjudicación nacional competitiva'],
  [/cost-share/g, 'costos compartidos'],
];

const state = { catalog: [], models: [], systems: [], funding: [], docs: [], index: null, mode: 'rag', engine: null, loadedModel: null, busy: false, challenges: new Set(), dac: false };
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (key, vars, lang) => Object.entries(vars).reduce((s, [k, v]) => s.split(`{${k}}`).join(v), t(key, lang));
const issueLabel = (id, lang) => ISSUES.find((i) => i.id === id)?.[lang] || id;
const timelineText = (s, lang) => (lang === 'es' ? TIMELINE_ES.reduce((x, [r, v]) => x.replace(r, v), s) : s);

/* ---------- Tokenizing & BM25 ---------- */
const STOP = new Set(('a an the of for to in on at and or is are be can do does with by from as it that this which what where who how me my i we our your you any '
  + 'el la los las un una unos unas de del y o en con por para que como donde qué cual cuales es son hay existen puedo tiene tienen se al lo su sus mas').split(' '));

// Spanish (accent-stripped) stems mapped to English index terms so both languages hit the same records.
const SYN = {
  inundacion: 'flood', inundaciones: 'flood', puente: 'bridge', puentes: 'bridge', perdida: 'loss', agua: 'water', desfavorecida: 'disadvantaged',
  desfavorecidas: 'disadvantaged', comunidad: 'community', comunidades: 'community', subvencion: 'grant', subvenciones: 'grant', asistencia: 'assistance',
  sequia: 'drought', plomo: 'lead', dique: 'levee', diques: 'levee', rio: 'river', modelo: 'model', modelos: 'model', programa: 'program', programas: 'program',
  municipio: 'municipal', pozo: 'well', pozos: 'well', acuifero: 'aquifer', financiamiento: 'funding', contrapartida: 'match', asignatarios: 'allocatee',
  asignatario: 'allocatee', rural: 'rural', criterios: 'criteria', hidraulico: 'hydraulic', mitigacion: 'mitigation', condado: 'county', lago: 'lake',
  michigan: 'michigan', miguigan: 'michigan', alcantarilla: 'culvert', alcantarillas: 'culvert', reemplazo: 'replacement', reemplazar: 'replacement',
};

const fold = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const stem = (w) => (w.length > 4 && w.endsWith('s') ? w.slice(0, -1) : w);

function tokenize(text, expand = false) {
  const out = [];
  for (const w of fold(text).split(/[^a-z0-9]+/)) {
    if (!w || STOP.has(w)) continue;
    out.push(stem(w));
    if (expand && SYN[w]) out.push(stem(SYN[w]));
  }
  return out;
}

function buildIndex(docs) {
  const df = new Map();
  let total = 0;
  docs.forEach((d) => {
    d.tf = new Map();
    tokenize(d.text).forEach((tok) => d.tf.set(tok, (d.tf.get(tok) || 0) + 1));
    d.len = [...d.tf.values()].reduce((a, b) => a + b, 0);
    total += d.len;
    d.tf.forEach((_, tok) => df.set(tok, (df.get(tok) || 0) + 1));
  });
  return { df, avg: total / Math.max(docs.length, 1), n: docs.length };
}

function search(query, k = 8) {
  const { df, avg, n } = state.index;
  const k1 = 1.4, b = 0.75;
  const qt = [...new Set(tokenize(query, true))];
  const scored = state.docs.map((d) => {
    let s = 0;
    for (const tok of qt) {
      const f = d.tf.get(tok);
      if (!f) continue;
      const idf = Math.log(1 + (n - df.get(tok) + 0.5) / (df.get(tok) + 0.5));
      s += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / avg)));
    }
    return { d, s };
  }).filter((x) => x.s > 0).sort((a, b2) => b2.s - a.s);
  return scored.slice(0, k);
}

/* ---------- Data ---------- */
async function loadJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url} ${r.status}`);
  return r.json();
}

function buildDocs() {
  const docs = [];
  state.catalog.forEach((c) => docs.push({
    kind: 'catalog', id: c.id, rec: c,
    text: [c.title, c.title_es, c.summary, c.summary_es, c.type, c.category, c.organization, c.group, (c.formats || []).join(' '), c.spatial_coverage, c.watershed_huc8].join(' '),
  }));
  state.models.forEach((f) => {
    const p = f.properties;
    docs.push({
      kind: 'model', id: p.id, rec: p, geom: f.geometry,
      text: [p.name, p.waterway, p.county, p.feature_type, p.holding_agency, p.model_software, p.status, p.catalog_id,
        /bridge/i.test(`${p.feature_type} ${p.name}`) ? 'bridge culvert replacement hydraulic' : '', /levee/i.test(p.feature_type) ? 'levee flood' : ''].join(' '),
    });
  });
  state.systems.forEach((s) => docs.push({
    kind: 'system', id: s.pws_id, rec: s,
    text: [s.municipality, s.county, s.water_source, s.wsip_status, s.recommended_funding_agency, s.is_disadvantaged_community ? 'disadvantaged community DAC' : '',
      s.water_loss_pct > 10 ? 'water loss high non-revenue SRF priority' : 'water loss'].join(' '),
  }));
  state.funding.forEach((f) => docs.push({
    kind: 'funding', id: f.program_id, rec: f,
    text: [f.program_name, f.program_name_es, f.agency, f.summary, f.summary_es, f.eligible_issues.join(' '), f.prerequisites.join(' '), f.disbursement_timeline,
      f.dac_waiver_available ? 'disadvantaged community waiver' : '', 'grant funding criteria match'].join(' '),
  }));
  state.docs = docs;
  state.index = buildIndex(docs);
}

/* ---------- Language ---------- */
function detectLang(q) {
  if (/[¿¡ñáéíóúü]/i.test(q)) return 'es';
  const w = fold(q).split(/[^a-z]+/);
  const es = w.filter((x) => ['que', 'donde', 'como', 'para', 'por', 'los', 'las', 'del', 'una', 'existen', 'programas', 'agua', 'perdida', 'comunidades', 'puedo', 'hay', 'rio'].includes(x)).length;
  const en = w.filter((x) => ['what', 'where', 'how', 'which', 'the', 'for', 'and', 'with', 'are', 'can', 'find', 'compare', 'over'].includes(x)).length;
  return es > en ? 'es' : es === en ? getLang() : 'en';
}

/* ---------- Funding helpers ---------- */
function matchText(p, dac, lang) {
  if (p.local_match_pct === 0) return t('p3.match.loan', lang);
  if (dac && p.dac_waiver_available) return fmt('p3.match.waived', { p: p.local_match_pct }, lang);
  if (dac) return fmt('p3.match.nowaiver', { p: p.local_match_pct }, lang);
  return fmt('p3.match.std', { p: p.local_match_pct }, lang);
}
const pname = (p, lang) => (lang === 'es' && p.program_name_es) || p.program_name;
const psum = (p, lang) => (lang === 'es' && p.summary_es) || p.summary;

/* ---------- Answer synthesis ---------- */
function analyze(q) {
  const f = fold(q);
  const num = f.match(/(\d+(?:\.\d+)?)\s*%/);
  const lossWords = /water loss|non-?revenue|perdida de agua|perdida/.test(f);
  return {
    loss: lossWords ? (num ? parseFloat(num[1]) : 10) : null,
    lake: /lake michigan|lago michigan|allocat|asignatari/.test(f),
    dac: /disadvantaged|\bdac\b|desfavorecid/.test(f),
    systems: /allocat|asignatari|utilit|water system|sistema|srf|municipal|water loss|perdida/.test(f),
    models: /model|hec-?ras|hydraul|hidraul|bridge|puente|culvert|levee|dique|gage|aforo|lomr|river|rio\b|floodplain/.test(f),
    funding: /grant|fund|program|criteri|subvenc|financ|asistencia|assistance|compare|compar|match|contrapartida|srf|mitigat/.test(f),
    flood: /flood|inundaci/.test(f),
  };
}

function inferChallenges(q, a) {
  const f = fold(q);
  const set = new Set();
  if (a.flood) set.add('Urban Flooding');
  if (a.loss !== null) set.add('Water Loss >10%');
  if (/bridge|puente|culvert|alcantarilla/.test(f)) set.add('Bridge/Culvert Hydraulics');
  if (/drought|sequia|well|pozo/.test(f)) set.add('Drought Resiliency');
  if (/lead|plomo/.test(f)) set.add('Lead Service Lines');
  if (/levee|dique/.test(f)) set.add('Levee Rehabilitation');
  return set;
}

function synthesize(q, lang) {
  const a = analyze(q);
  const hits = search(q, 12);
  const cites = [];
  const parts = [];
  const seen = new Set();
  const addCite = (d) => { if (!seen.has(d.kind + d.id)) { seen.add(d.kind + d.id); cites.push(d); } };

  if (a.systems && (a.loss !== null || a.lake || a.dac || /srf/.test(fold(q)))) {
    const crit = [];
    let list = state.systems.slice();
    if (a.lake) { list = list.filter((s) => /Lake Michigan/i.test(s.water_source)); crit.push(t('p3.crit.lake', lang)); }
    if (a.loss !== null) { list = list.filter((s) => s.water_loss_pct > a.loss); crit.push(fmt('p3.crit.loss', { x: a.loss }, lang)); }
    if (a.dac) { list = list.filter((s) => s.is_disadvantaged_community); crit.push(t('p3.crit.dac', lang)); }
    list.sort((x, y) => y.srf_priority_score - x.srf_priority_score);
    if (!list.length) parts.push(`<p>${esc(fmt('p3.ans.systems.none', { crit: crit.join(', ') }, lang))}</p>`);
    else {
      parts.push(`<p>${esc(fmt('p3.ans.systems', { n: list.length, crit: crit.join(', ') }, lang))}</p><ul>${list.slice(0, 8).map((s) => `<li>${esc(fmt('p3.ans.sys.row', {
        name: s.municipality, county: s.county, loss: s.water_loss_pct, score: s.srf_priority_score,
        dac: t(s.is_disadvantaged_community ? 'p3.yes' : 'p3.no', lang), fund: s.recommended_funding_agency,
      }, lang))} [${esc(s.pws_id)}]</li>`).join('')}</ul>`);
      list.slice(0, 4).forEach((s) => addCite({ kind: 'system', id: s.pws_id, rec: s }));
    }
  }

  if (a.models) {
    const ms = hits.filter((h) => h.d.kind === 'model').slice(0, 4).map((h) => h.d);
    if (ms.length) {
      parts.push(`<p>${esc(t('p3.ans.models', lang))}</p><ul>${ms.map((d) => `<li>${esc(fmt('p3.ans.model.row', {
        name: d.rec.name, type: d.rec.feature_type, sw: d.rec.model_software || '—', status: d.rec.status, agency: d.rec.holding_agency,
      }, lang))} [${esc(d.id)}]</li>`).join('')}</ul>`);
      ms.forEach(addCite);
    }
    const cs = hits.filter((h) => h.d.kind === 'catalog').slice(0, 2).map((h) => h.d);
    if (cs.length) {
      parts.push(`<p>${esc(t('p3.ans.catalog', lang))}</p><ul>${cs.map((d) => `<li>${esc((lang === 'es' && d.rec.title_es) || d.rec.title)} [${esc(d.id)}]</li>`).join('')}</ul>`);
      cs.forEach(addCite);
    }
  }

  if (a.funding || (!a.systems && !a.models)) {
    const wanted = inferChallenges(q, a);
    let fs = hits.filter((h) => h.d.kind === 'funding').map((h) => h.d);
    if (wanted.size) {
      const byIssue = state.funding.filter((p) => p.eligible_issues.some((i) => wanted.has(i)));
      fs = [...new Map([...byIssue.map((p) => ({ kind: 'funding', id: p.program_id, rec: p })), ...fs].map((d) => [d.id, d])).values()];
    }
    fs = fs.slice(0, 6);
    if (fs.length) {
      const dac = a.dac;
      parts.push(`<p>${esc(t('p3.ans.funding', lang))}</p><ul>${fs.map((d) => `<li>${esc(fmt('p3.ans.fund.row', {
        agency: d.rec.agency, name: pname(d.rec, lang), match: matchText(d.rec, dac, lang), timeline: timelineText(d.rec.disbursement_timeline, lang),
      }, lang))} [${esc(d.id)}]</li>`).join('')}</ul>`);
      if (!dac && /rural|small|pequeñ|pequen/.test(fold(q)) === false && /comunidad|communit/.test(fold(q))) parts.push(`<p>${esc(t('p3.ans.dachint', lang))}</p>`);
      fs.forEach(addCite);
      state.lastAnswerChallenges = wanted;
    }
  }

  if (!parts.length) {
    const top = hits.slice(0, 4).map((h) => h.d);
    if (top.length) {
      parts.push(`<p>${esc(t('p3.ans.generic', lang))}</p><ul>${top.map((d) => `<li>${esc(label(d, lang))} [${esc(d.id)}]</li>`).join('')}</ul>`);
      top.forEach(addCite);
    } else parts.push(`<p>${esc(t('p3.nohit', lang))}</p>`);
  }
  return { html: parts.join(''), cites: cites.slice(0, 8), n: hits.length };
}

function label(d, lang) {
  if (d.kind === 'catalog') return (lang === 'es' && d.rec.title_es) || d.rec.title;
  if (d.kind === 'model') return d.rec.name;
  if (d.kind === 'system') return `${d.rec.municipality} (${d.rec.pws_id})`;
  return `${d.rec.agency} · ${pname(d.rec, lang)}`;
}

function detailLine(d, lang) {
  const r = d.rec;
  if (d.kind === 'catalog') return `${r.organization} · ${r.category}`;
  if (d.kind === 'model') return `${r.feature_type} · ${r.waterway}, ${r.county}`;
  if (d.kind === 'system') return `${r.water_source} · ${r.water_loss_pct}%`;
  return `${r.agency} · ${psum(r, lang)}`;
}

function citeCard(d, lang) {
  let links = '';
  const cid = d.kind === 'catalog' ? d.id : d.kind === 'model' ? d.rec.catalog_id : null;
  if (cid) links += `<a href="poc1-catalog.html?id=${encodeURIComponent(cid)}">${esc(t('p3.open.catalog', lang))}</a>`;
  if (d.kind === 'model' || d.kind === 'system') links += `<a href="poc2-map.html?dataset=${encodeURIComponent(d.id)}">${esc(t('p3.open.map', lang))}</a>`;
  if (d.kind === 'funding') links += `<button type="button" class="lnk" data-apply="${esc(d.id)}">${esc(t('p3.apply', lang))}</button>`;
  return `<div class="cite" data-kind="${d.kind}"><span class="k">${esc(t(`p3.kind.${d.kind}`, lang))} · ${esc(d.id)}</span>
    <strong>${esc(label(d, lang))}</strong><span>${esc(detailLine(d, lang))}</span><div class="links">${links}</div></div>`;
}

/* ---------- Chat UI ---------- */
function addMsg(role, html, lang) {
  const el = document.createElement('div');
  el.className = `msg ${role}`;
  el.innerHTML = `<div class="who">${esc(t(role === 'user' ? 'p3.you' : 'p3.bot'))}</div><div class="bubble" lang="${lang || getLang()}">${html}</div>`;
  $('chat').appendChild(el);
  $('chat').scrollTop = $('chat').scrollHeight;
  return el.querySelector('.bubble');
}

async function ask(q) {
  q = q.trim();
  if (!q || state.busy) return;
  state.busy = true;
  const lang = detectLang(q);
  if (lang !== getLang()) setLang(lang);
  addMsg('user', esc(q), lang);
  const t0 = performance.now();
  const out = synthesize(q, lang);
  const ms = Math.max(1, Math.round(performance.now() - t0));
  const bubble = addMsg('bot', `${out.html}${out.cites.length ? `<h3 style="font-size:.85rem">${esc(t('p3.sources', lang))}</h3><div class="cites">${out.cites.map((c) => citeCard(c, lang)).join('')}</div>` : ''}
    <p class="meta">${esc(fmt('p3.timing', { n: out.n, ms }, lang))}</p>`, lang);
  if (state.mode === 'llm' && state.engine && out.cites.length) await llmSynthesize(q, out, lang, bubble);
  state.busy = false;
  $('chat').scrollTop = $('chat').scrollHeight;
}

/* ---------- WebLLM (optional) ---------- */
async function enableLLM() {
  const status = $('llm-status'), prog = $('llm-progress');
  if (!('gpu' in navigator)) { status.textContent = t('p3.llm.nogpu'); return false; }
  const model = $('llm-model').value;
  if (state.engine && state.loadedModel === model) return true;
  try {
    prog.hidden = false; status.textContent = t('p3.llm.loading');
    const webllm = await import(WEBLLM_URL);
    state.engine = await webllm.CreateMLCEngine(model, {
      initProgressCallback: (p) => { prog.value = p.progress ?? 0; status.textContent = p.text || t('p3.llm.loading'); },
    });
    state.loadedModel = model;
    status.textContent = t('p3.llm.ready');
    prog.hidden = true;
    return true;
  } catch {
    state.engine = null; prog.hidden = true; status.textContent = t('p3.llm.fail');
    return false;
  }
}

async function llmSynthesize(q, out, lang, bubble) {
  const ctx = out.cites.map((c) => `[${c.id}] ${label(c, lang)} — ${detailLine(c, lang)}`).join('\n');
  const box = document.createElement('div');
  box.innerHTML = `<h3 style="font-size:.85rem">${esc(t('p3.llm.gen', lang))}</h3><p class="llm-out"></p>`;
  bubble.insertBefore(box, bubble.querySelector('.meta'));
  const target = box.querySelector('.llm-out');
  try {
    const stream = await state.engine.chat.completions.create({
      stream: true, temperature: 0.2, max_tokens: 300,
      messages: [{ role: 'system', content: t('p3.llm.sys', lang) }, { role: 'user', content: `CONTEXT:\n${ctx}\n\nQUESTION: ${q}` }],
    });
    for await (const chunk of stream) target.textContent += chunk.choices[0]?.delta?.content || '';
  } catch {
    box.remove();
    $('llm-status').textContent = t('p3.llm.fail');
  }
}

async function setMode(mode) {
  if (mode === 'llm' && !(await enableLLM())) mode = 'rag';
  state.mode = mode;
  $('mode-rag').setAttribute('aria-pressed', String(mode === 'rag'));
  $('mode-llm').setAttribute('aria-pressed', String(mode === 'llm'));
  $('llm-opts').hidden = mode !== 'llm' && !$('llm-status').textContent;
  $('mode-note').textContent = t(mode === 'llm' ? 'p3.mode.llm.note' : 'p3.mode.rag.note');
}

/* ---------- Funding matrix ---------- */
function renderChallenges() {
  const lang = getLang();
  const fs = $('challenges');
  fs.querySelectorAll('label').forEach((l) => l.remove());
  ISSUES.forEach((i) => {
    const l = document.createElement('label');
    l.innerHTML = `<input type="checkbox" value="${esc(i.id)}" ${state.challenges.has(i.id) ? 'checked' : ''}> <span>${esc(i[lang])}</span>`;
    fs.appendChild(l);
  });
}

function renderMatrix(highlightId) {
  const lang = getLang();
  const sel = state.challenges;
  const agencies = ['IDNR-OWR', 'IEPA', 'IEMA', 'IDCEO', 'IDOA'];
  let total = 0, withHits = 0;
  $('matrix').innerHTML = agencies.map((ag) => {
    const progs = state.funding.filter((p) => p.agency === ag && (!sel.size || p.eligible_issues.some((i) => sel.has(i))));
    total += progs.length; if (progs.length) withHits += 1;
    const body = progs.length ? progs.map((p) => {
      const waived = state.dac && p.dac_waiver_available && p.local_match_pct > 0;
      const tagCls = p.local_match_pct === 0 ? 'tag--neutral' : waived ? 'tag--ok' : state.dac ? 'tag--warn' : 'tag--neutral';
      return `<article class="prog${p.program_id === highlightId ? ' hl' : ''}" id="prog-${esc(p.program_id)}">
        <h4>${esc(pname(p, lang))}</h4>
        <dl><dt>${esc(t('p3.match', lang))}</dt><dd><span class="tag ${tagCls}">${esc(matchText(p, state.dac, lang))}</span></dd>
        <dt>${esc(t('p3.timeline', lang))}</dt><dd>${esc(timelineText(p.disbursement_timeline, lang))}</dd>
        <dt>${esc(t('p3.prereq', lang))}</dt><dd>${esc(p.prerequisites.join('; '))}</dd></dl></article>`;
    }).join('') : `<p class="none">${esc(t('p3.matrix.none', lang))}</p>`;
    return `<section class="agency" aria-label="${esc(ag)}"><h3>${esc(ag)}</h3>${body}</section>`;
  }).join('');
  $('matrix-summary').textContent = sel.size ? fmt('p3.matrix.summary', { n: total, a: withHits }, lang) : t('p3.matrix.all', lang);
}

/* ---------- Wiring ---------- */
function renderChips() {
  const mk = (list, lang) => list.map((p) => `<button type="button" class="pchip" lang="${lang}">${esc(p)}</button>`).join('');
  $('chips-en').innerHTML = mk(PROMPTS.en, 'en');
  $('chips-es').innerHTML = mk(PROMPTS.es, 'es');
}

function refreshStatic() {
  $('q').placeholder = t('p3.input.ph');
  $('mode-note').textContent = t(state.mode === 'llm' ? 'p3.mode.llm.note' : 'p3.mode.rag.note');
  renderChallenges();
  renderMatrix();
}

function wire() {
  $('ask-form').addEventListener('submit', (e) => { e.preventDefault(); const v = $('q').value; $('q').value = ''; ask(v); });
  document.querySelector('.p3').addEventListener('click', (e) => {
    const chip = e.target.closest('.pchip');
    if (chip) { ask(chip.textContent); return; }
    const ap = e.target.closest('[data-apply]');
    if (ap) {
      const p = state.funding.find((x) => x.program_id === ap.dataset.apply);
      state.challenges = new Set(p.eligible_issues);
      renderChallenges(); renderMatrix(p.program_id);
      document.getElementById(`prog-${p.program_id}`)?.scrollIntoView({ block: 'center' });
    }
  });
  $('challenges').addEventListener('change', (e) => {
    const cb = e.target.closest('input[type="checkbox"]');
    if (!cb) return;
    cb.checked ? state.challenges.add(cb.value) : state.challenges.delete(cb.value);
    renderMatrix();
  });
  $('dac').addEventListener('change', (e) => { state.dac = e.target.checked; renderMatrix(); });
  $('mode-rag').addEventListener('click', () => setMode('rag'));
  $('mode-llm').addEventListener('click', () => setMode('llm'));
  $('llm-model').addEventListener('change', () => { if (state.mode === 'llm') setMode('llm'); });
  document.addEventListener('iwic:langchange', refreshStatic);
}

async function init() {
  initIWICLayout('poc3');
  renderChips();
  wire();
  refreshStatic();
  try {
    const [catalog, geo, systems, funding] = await Promise.all([
      loadJSON('data/iwic-catalog.json'), loadJSON('data/hydraulic-models.geojson'),
      loadJSON('data/water-systems-srf.json'), loadJSON('data/agency-funding.json'),
    ]);
    Object.assign(state, { catalog, models: geo.features, systems, funding });
    buildDocs();
    refreshStatic();
    addMsg('bot', `<p>${esc(t('p3.welcome'))}</p>`);
  } catch {
    addMsg('bot', `<p role="alert">${esc(t('p3.nohit'))}</p>`);
  }
}

init();
