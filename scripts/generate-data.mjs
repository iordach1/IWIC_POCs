// Regenerates the shared synthetic IWIC datasets in /data. Run: node scripts/generate-data.mjs
// All metrics are SYNTHETIC (seeded PRNG); locations and agencies reference real Illinois entities.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'data');
mkdirSync(OUT, { recursive: true });

let seed = 20260101;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const between = (a, b, d = 0) => +(a + rnd() * (b - a)).toFixed(d);
const write = (name, data) => writeFileSync(join(OUT, name), JSON.stringify(data, null, 2) + '\n');

// ---- 1. Catalog -----------------------------------------------------------
// Figure 7.3 category labels supplied for the IWIC catalog.
const G = {
  F: 'Flooding & Hydraulics', W: 'Water Supply & Loss', D: 'Groundwater & Drought',
  I: 'Infrastructure & Navigation', H: 'Hazard Mitigation'
};
const C = [
  // title, title_es, type, category, org, group, formats, coverage, huc8, summary, summary_es, role
  ['Fox River Reach 4 HEC-RAS 2D Hydraulic Model (Millhurst Dam to Oswego Bridge)',
    'Modelo hidráulico HEC-RAS 2D del río Fox, tramo 4 (presa Millhurst a puente Oswego)', 'Model',
    'Hydraulic Studies', 'IDNR-OWR', G.F, ['HEC-RAS', 'GeoJSON'], 'Kendall & Kane Counties', '07120007',
    'Two-dimensional unsteady flow model with calibrated 100-year water surface profiles and inundation extents.',
    'Modelo bidimensional de flujo no permanente con perfiles calibrados de la superficie del agua a 100 años y zonas de inundación.', 'Hydraulic Engineer'],
  ['Lake Michigan Water Allocation & Non-Revenue Water Loss Annual Report (200+ Allocatees)',
    'Informe anual de asignación de agua del lago Míchigan y pérdida de agua no facturada (más de 200 asignatarios)', 'Dataset',
    'Public Water Use/Consumption Data', 'IDNR-OWR', G.W, ['XLSX', 'CSV', 'PDF'], 'Northeastern Illinois', '04040002',
    'Annual allocation, pumpage and water-audit results for Lake Michigan allocatees, flagging loss above 10%.',
    'Asignación anual, bombeo y resultados de auditoría de agua de los asignatarios del lago Míchigan, con pérdidas superiores al 10%.', 'Water Allocation Program Manager'],
  ['Mahomet Aquifer Observation Well Network & Drought Preparedness Index',
    'Red de pozos de observación del acuífero Mahomet e índice de preparación ante sequías', 'Dataset',
    'Groundwater and Well Data', 'ISWS / PRI', G.D, ['CSV', 'GeoJSON'], 'Champaign, Piatt, McLean, Mason Counties', '07130006',
    'Monthly water-level records from observation wells combined with a composite drought preparedness index.',
    'Registros mensuales de niveles de agua en pozos de observación combinados con un índice compuesto de preparación ante sequías.', 'Groundwater Hydrologist'],
  ['Illinois Structure Address Flood Risk (SAFR) & NFIP LOMR/LOMA Repository',
    'Repositorio de riesgo de inundación por dirección de estructuras (SAFR) y LOMR/LOMA del NFIP', 'Dataset',
    'NFIP Letters of Map Revisions', 'FEMA Region 5', G.H, ['CSV', 'PDF', 'GeoJSON'], 'Statewide', '07120004',
    'Structure-level flood risk attributes linked to letters of map change for the National Flood Insurance Program.',
    'Atributos de riesgo de inundación por estructura vinculados a cartas de cambio de mapa del Programa Nacional de Seguro contra Inundaciones.', 'Floodplain Mapping Coordinator'],
  ['Illinois Waterway Port & Levee Accreditation Database (Peoria to Cairo)',
    'Base de datos de puertos y acreditación de diques de la vía fluvial de Illinois (Peoria a Cairo)', 'Dataset',
    'Levee Database Information', 'USACE Rock Island', G.I, ['GeoJSON', 'XLSX'], 'Peoria to Cairo', '07130001',
    'Inventory of river ports and levee systems with accreditation, inspection ratings and rehabilitation needs.',
    'Inventario de puertos fluviales y sistemas de diques con acreditación, calificaciones de inspección y necesidades de rehabilitación.', 'Levee Safety Program Lead'],
  ['Bulletin 75 Updated Illinois Precipitation Frequency Estimates',
    'Estimaciones actualizadas de frecuencia de precipitación de Illinois (Boletín 75)', 'Dataset',
    'Updated rainfall information', 'ISWS / PRI', G.F, ['CSV', 'PDF'], 'Statewide', '07120001',
    'Updated rainfall depth-duration-frequency estimates with confidence intervals for design and floodplain studies.',
    'Estimaciones actualizadas de profundidad-duración-frecuencia de lluvia con intervalos de confianza para diseño y estudios de planicies de inundación.', 'State Climatologist Office'],
  ['Des Plaines River Riverside Hydraulic Bridge Model Suite',
    'Conjunto de modelos hidráulicos de puentes del río Des Plaines en Riverside', 'Model',
    'Hydraulic Studies', 'USACE Chicago', G.F, ['HEC-RAS'], 'Cook County', '07120004',
    'Steady-flow bridge and culvert models supporting urban flood control planning.',
    'Modelos de flujo permanente de puentes y alcantarillas para la planificación del control de inundaciones urbanas.', 'Hydraulic Engineer'],
  ['Illinois Streamgage & Historical Flood Assessment Reports',
    'Red de estaciones de aforo e información de niveles en tiempo real de Illinois', 'Dataset',
    'Historical Flood Assessment Reports', 'USGS', G.F, ['CSV', 'GeoJSON'], 'Statewide', '07130011',
    'Continuous stage and discharge from stream gages with flood-stage thresholds.',
    'Nivel y caudal continuos de estaciones de aforo con umbrales de nivel de inundación.', 'Hydrologic Technician'],
  ['Illinois Community Water Supply Water-Loss Dashboard',
    'Panel de pérdida de agua de los sistemas comunitarios de agua potable de Illinois', 'Application',
    'Public Water Use/Consumption Data', 'IEPA', G.W, ['CSV'], 'Statewide', '07130011',
    'Interactive view of system-level water loss, audits and Water System Improvement Plan status.',
    'Vista interactiva de pérdidas de agua por sistema, auditorías y estado del Plan de Mejoras del Sistema de Agua.', 'Public Water Supply Analyst'],
  ['Lead Service Line Inventory Statewide Tracker',
    'Seguimiento estatal del inventario de líneas de servicio de plomo', 'Dataset',
    'Water Infrastructure Systems Mapping', 'IEPA', G.W, ['CSV', 'XLSX'], 'Statewide', '07120003',
    'Municipal lead service line inventories with replacement progress and funding eligibility.',
    'Inventarios municipales de líneas de servicio de plomo con avance de reemplazo y elegibilidad de financiamiento.', 'Lead Program Coordinator'],
  ['State Revolving Fund Intended Use Plan Priority List',
    'Lista de prioridades del Plan de Uso Previsto del Fondo Rotatorio Estatal', 'Plan',
    'Water Infrastructure Systems Mapping', 'IEPA', G.W, ['PDF', 'XLSX'], 'Statewide', '07130011',
    'Ranked drinking water and clean water projects with priority points and disadvantaged community flags.',
    'Proyectos de agua potable y saneamiento clasificados con puntos de prioridad e indicadores de comunidades desfavorecidas.', 'SRF Program Manager'],
  ['Illinois Drought Monitor & Water Supply Outlook',
    'Monitor de sequía y perspectiva de suministro de agua de Illinois', 'Application',
    'Drought Preparedness Information', 'ISWS / PRI', G.D, ['CSV', 'GeoJSON'], 'Statewide', '07130006',
    'Weekly drought severity, reservoir storage and aquifer stress indicators.',
    'Severidad semanal de sequía, almacenamiento de embalses e indicadores de estrés de acuíferos.', 'Climatologist'],
  ['Regional Water Supply Planning Area Demand Projections',
    'Proyecciones de demanda de las áreas regionales de planificación de suministro de agua', 'Plan',
    'Drought Preparedness Information', 'ISWS / PRI', G.D, ['PDF', 'XLSX'], 'Regional Planning Areas', '07130006',
    'Projected 2060 demand and supply scenarios for Illinois regional water supply planning areas.',
    'Proyecciones de demanda y escenarios de suministro a 2060 para las áreas regionales de planificación de agua de Illinois.', 'Water Supply Planner'],
  ['Kaskaskia River Carlyle Lake Operations & Release Model',
    'Modelo de operaciones y descargas del lago Carlyle, río Kaskaskia', 'Model',
    'Hydraulic Studies', 'USACE Chicago', G.F, ['HEC-ResSim', 'CSV'], 'Clinton County', '07140204',
    'Reservoir operations model supporting flood storage and downstream release decisions.',
    'Modelo de operación de embalse que apoya decisiones de almacenamiento de inundaciones y descargas aguas abajo.', 'Reservoir Operations Engineer'],
  ['Illinois Urban Flood Susceptibility Index',
    'Índice de susceptibilidad a inundaciones urbanas de Illinois', 'Dataset',
    'Regulatory Floodplain Inundation and Floodway Mapping', 'ISWS / PRI', G.F, ['GeoJSON', 'CSV'], 'Statewide', '07120004',
    'Block-group scale index of urban flooding susceptibility blending claims, imperviousness and drainage data.',
    'Índice a escala de grupo de bloques de susceptibilidad a inundaciones urbanas que combina reclamos, impermeabilidad y drenaje.', 'Urban Flooding Specialist'],
  ['Hazard Mitigation Grant Program Project Tracker',
    'Seguimiento de proyectos del Programa de Subvenciones para Mitigación de Riesgos', 'Application',
    'Flood Mitigation and Flood Preparedness Information', 'IEMA', G.H, ['CSV', 'XLSX'], 'Statewide', '07130011',
    'Status of HMGP and BRIC subapplications by county, hazard type and funding stage.',
    'Estado de las subsolicitudes de HMGP y BRIC por condado, tipo de peligro y etapa de financiamiento.', 'Mitigation Grants Officer'],
  ['Illinois State Hazard Mitigation Plan Flood Annex',
    'Anexo de inundaciones del Plan estatal de mitigación de riesgos de Illinois', 'Plan',
    'County and Community Hazard Mitigation Plans', 'IEMA', G.H, ['PDF'], 'Statewide', '07130011',
    'Flood hazard profiles, vulnerability findings and mitigation actions for state planning.',
    'Perfiles de riesgo de inundación, hallazgos de vulnerabilidad y acciones de mitigación para la planificación estatal.', 'State Hazard Mitigation Officer'],
  ['Rock River Moline Floodway & Bridge Hydraulic Studies',
    'Estudios hidráulicos de cauce de inundación y puentes del río Rock en Moline', 'Model',
    'Hydraulic Studies', 'USACE Rock Island', G.F, ['HEC-RAS', 'PDF'], 'Rock Island County', '07090005',
    'Hydraulic studies for floodway delineation and bridge scour assessments.',
    'Estudios hidráulicos para delimitación de cauces de inundación y evaluación de socavación en puentes.', 'Hydraulic Engineer'],
  ['Illinois River Navigation Lock & Dam Condition Assessment',
    'Evaluación de condición de esclusas y presas de navegación del río Illinois', 'Dataset',
    'Port and Navigation Information', 'USACE Rock Island', G.I, ['XLSX', 'PDF'], 'Illinois Waterway', '07130001',
    'Condition ratings, outage history and rehabilitation schedule for Illinois Waterway locks.',
    'Calificaciones de condición, historial de interrupciones y calendario de rehabilitación de las esclusas de la vía fluvial de Illinois.', 'Navigation Project Manager'],
  ['Community Development Block Grant Water Infrastructure Awards',
    'Adjudicaciones de infraestructura de agua del Programa de Subvenciones en Bloque para el Desarrollo Comunitario', 'Dataset',
    'Water Infrastructure Systems Mapping', 'IDCEO', G.W, ['CSV', 'XLSX'], 'Statewide', '07130011',
    'Public infrastructure awards for water and sewer projects in low- and moderate-income communities.',
    'Adjudicaciones de infraestructura pública para proyectos de agua y alcantarillado en comunidades de ingresos bajos y moderados.', 'CDBG Program Officer'],
  ['Conservation Practices Cost-Share & Nutrient Reduction Tracker',
    'Seguimiento de prácticas de conservación con costos compartidos y reducción de nutrientes', 'Application',
    'Drought Preparedness Information', 'IDNR-OWR', G.D, ['CSV', 'GeoJSON'], 'Statewide', '07130011',
    'Practice-level cost-share, acres treated and modeled nutrient reductions by watershed.',
    'Costos compartidos por práctica, acres tratados y reducciones modeladas de nutrientes por cuenca.', 'Conservation Program Specialist'],
  ['Illinois Surface Water Quality & Wastewater Discharge Monitoring',
    'Monitoreo de calidad del agua superficial y descargas de aguas residuales de Illinois', 'Dataset',
    'GIS Meta Data', 'IEPA', G.I, ['CSV'], 'Statewide', '07130011',
    'Ambient stream monitoring and permitted discharge results with impairment status.',
    'Monitoreo ambiental de arroyos y resultados de descargas permitidas con estado de deterioro.', 'Water Quality Analyst'],
  ['Illinois NFIP Letters of Map Amendment (LOMA) Repository',
    'Repositorio de cartas de modificación de mapa (LOMA) del NFIP de Illinois', 'Dataset',
    'NFIP Letters of Map Amendment', 'FEMA Region 5', G.H, ['CSV', 'GeoJSON', 'PDF'], 'Statewide', '07130011',
    'Synthetic index of Illinois LOMA cases, communities and map amendment status.',
    'Índice sintético de casos LOMA de Illinois, comunidades y estado de modificación de mapas.', 'Floodplain Mapping Coordinator'],
  ['Cache River & Cairo Levee Interior Drainage Model',
    'Modelo de drenaje interior del río Cache y el dique de Cairo', 'Model',
    'Flood Damage Assessment Information via SAFR', 'USACE Chicago', G.I, ['HEC-HMS', 'HEC-RAS'], 'Alexander County', '07140108',
    'Interior drainage and pumping model supporting levee certification and flood response.',
    'Modelo de drenaje interior y bombeo que apoya la certificación de diques y la respuesta a inundaciones.', 'Levee Safety Engineer']
];
const orgs = ['ISWS / PRI', 'IDNR-OWR', 'IEPA', 'IEMA', 'IDCEO', 'USACE Rock Island', 'USACE Chicago', 'FEMA Region 5', 'USGS'];
const catalog = C.map((c, i) => {
  if (!orgs.includes(c[4])) throw new Error('bad org ' + c[4]);
  return {
    id: `IWIC-${String(i + 1).padStart(3, '0')}`, title: c[0], title_es: c[1], type: c[2], category: c[3],
    organization: c[4], group: c[5], formats: c[6], spatial_coverage: c[7], watershed_huc8: c[8],
    updated_date: `2026-${String(between(1, 9)).padStart(2, '0')}-${String(between(1, 28)).padStart(2, '0')}`,
    views_recent: between(120, 9800), summary: c[9], summary_es: c[10], contact_role: c[11],
    synthetic_metrics: { record_count: between(250, 250000), completeness_pct: between(72, 99, 1), update_frequency: ['Daily', 'Monthly', 'Annual', 'Event-based'][between(0, 3)], quality_score: between(3, 5, 1) },
    is_synthetic: true
  };
});
const cid = (frag) => {
  const hit = catalog.find((c) => c.title.includes(frag));
  if (!hit) throw new Error('no catalog match for ' + frag);
  return hit.id;
};
write('iwic-catalog.json', catalog);

// ---- 2. Hydraulic models GeoJSON -----------------------------------------
const T = { B: 'Hydraulic Bridge Model', L: 'Levee System', G: 'Stream Gage / Rainfall', W: 'Observation Well', N: 'NFIP LOMR Site' };
const F = [
  // name, waterway, county, type, agency, software, lng, lat, q100, floodStage, catalogFrag
  ['Fox River at Millhurst Dam', 'Fox River', 'Kendall', T.B, 'IDNR-OWR', 'HEC-RAS 6.5 2D', -88.4090, 41.6910, 38500, 13, 'Fox River Reach 4'],
  ['Fox River at Oswego Bridge', 'Fox River', 'Kendall', T.B, 'IDNR-OWR', 'HEC-RAS 6.5 2D', -88.3515, 41.6828, 39200, 12, 'Fox River Reach 4'],
  ['Des Plaines River at Riverside', 'Des Plaines River', 'Cook', T.B, 'USACE', 'HEC-RAS 6.5', -87.8206, 41.8353, 17200, 7, 'Des Plaines River Riverside'],
  ['Des Plaines River at Riverside Gage', 'Des Plaines River', 'Cook', T.G, 'ISWS', 'HEC-HMS', -87.8231, 41.8306, 17200, 7, 'Streamgage'],
  ['Sangamon River at Decatur', 'Sangamon River', 'Macon', T.G, 'ISWS', 'HEC-HMS', -88.9548, 39.8403, 21500, 18, 'Streamgage'],
  ['Illinois River at Peoria', 'Illinois River', 'Peoria', T.G, 'USACE', 'HEC-RAS 6.5', -89.5890, 40.6936, 112000, 18, 'Streamgage'],
  ['Peoria Riverfront Levee System', 'Illinois River', 'Peoria', T.L, 'USACE', 'HEC-RAS 6.5', -89.6010, 40.7100, 112000, 18, 'Port & Levee'],
  ['Cache River / Cairo Levee', 'Cache River', 'Alexander', T.L, 'USACE', 'HEC-HMS', -89.1770, 37.0050, 58000, 40, 'Cache River'],
  ['Kaskaskia River at Carlyle', 'Kaskaskia River', 'Clinton', T.G, 'USACE', 'HEC-ResSim', -89.3720, 38.6100, 31500, 26, 'Kaskaskia'],
  ['Embarras River at Lawrenceville', 'Embarras River', 'Lawrence', T.G, 'USGS', 'HEC-HMS', -87.6816, 38.7300, 24800, 22, 'Streamgage'],
  ['Rock River at Moline', 'Rock River', 'Rock Island', T.B, 'County Highway Dept', 'HEC-RAS 6.5', -90.5151, 41.5067, 64500, 12, 'Rock River Moline'],
  ['Mahomet Aquifer Well Champaign Cluster', 'Mahomet Aquifer', 'Champaign', T.W, 'ISWS', 'MODFLOW 6', -88.2434, 40.1164, 0, 0, 'Mahomet Aquifer'],
  ['Mahomet Aquifer Well Mason County', 'Mahomet Aquifer', 'Mason', T.W, 'ISWS', 'MODFLOW 6', -89.8000, 40.2400, 0, 0, 'Mahomet Aquifer'],
  ['Fox River Algonquin LOMR Site', 'Fox River', 'McHenry', T.N, 'FEMA', 'HEC-RAS 6.5', -88.2942, 42.1656, 27800, 9, 'SAFR'],
  ['Skokie River Highland Park LOMR Site', 'Skokie River', 'Lake', T.N, 'Private Engineering Consultant', 'HEC-RAS 6.5', -87.8003, 42.1817, 3900, 6, 'SAFR'],
  ['Mississippi River at Cairo Port', 'Mississippi River', 'Alexander', T.L, 'USACE', 'HEC-RAS 6.5', -89.1765, 37.0042, 1250000, 40, 'Port & Levee'],
  ['Big Muddy River at Murphysboro', 'Big Muddy River', 'Jackson', T.N, 'FEMA', 'HEC-RAS 6.5', -89.3351, 37.7645, 36000, 20, 'SAFR'],
  ['Lake Decatur Watershed Rainfall Network', 'Sangamon River', 'Macon', T.G, 'ISWS', 'HEC-HMS', -88.9100, 39.8700, 21500, 18, 'Bulletin 75']
];
const statuses = ['Verified', 'Needs Update', 'Advisory'];
const features = F.map((f, i) => {
  const [lng, lat] = [f[6], f[7]];
  const geometry = f[3] === T.L
    ? { type: 'Polygon', coordinates: [[[lng - 0.02, lat - 0.012], [lng + 0.02, lat - 0.012], [lng + 0.02, lat + 0.012], [lng - 0.02, lat + 0.012], [lng - 0.02, lat - 0.012]]] }
    : { type: 'Point', coordinates: [lng, lat] };
  const stage = f[9] ? +(f[9] * between(0.25, 1.1, 2)).toFixed(1) : null;
  return {
    type: 'Feature', geometry,
    properties: {
      id: `HM-${String(i + 1).padStart(3, '0')}`, name: f[0], waterway: f[1], county: f[2], feature_type: f[3],
      holding_agency: f[4], model_software: f[5], return_period_100yr_cfs: f[8], flood_stage_ft: f[9],
      current_stage_ft: stage, status: statuses[i % 3 === 0 ? 1 : (i % 5 === 0 ? 2 : 0)],
      catalog_id: cid(f[10]), is_synthetic: true
    }
  };
});
write('hydraulic-models.geojson', { type: 'FeatureCollection', name: 'iwic-hydraulic-models', is_synthetic: true, features });

// ---- 3. Water systems / SRF ----------------------------------------------
const LM = 'Lake Michigan Allocation', MA = 'Mahomet Aquifer', SD = 'Silurian Dolomite Aquifer', SR = 'Sangamon River Reservoir';
const S = [
  // municipality, county, lat, lng, source, pop, mgd, loss, dac, income, lsl
  ['Evanston', 'Cook', 42.0451, -87.6877, LM, 75500, 9.1, 6.3, false, 86000, 5400],
  ['Skokie', 'Cook', 42.0324, -87.7416, LM, 67000, 7.8, 8.9, false, 83000, 3100],
  ['Oak Park', 'Cook', 41.8850, -87.7845, LM, 54000, 6.2, 12.4, false, 91000, 7200],
  ['Cicero', 'Cook', 41.8456, -87.7539, LM, 83000, 9.5, 24.1, true, 46500, 11800],
  ['Oak Lawn', 'Cook', 41.7109, -87.7581, LM, 58000, 7.0, 10.8, false, 74000, 4600],
  ['Des Plaines', 'Cook', 42.0334, -87.8834, LM, 60000, 7.3, 14.6, false, 76000, 3900],
  ['Arlington Heights', 'Cook', 42.0884, -87.9806, LM, 77000, 9.4, 5.1, false, 95000, 1800],
  ['Schaumburg', 'Cook', 42.0334, -88.0834, LM, 78000, 11.2, 4.2, false, 89000, 900],
  ['Naperville', 'DuPage', 41.7508, -88.1535, LM, 149000, 17.5, 7.4, false, 128000, 2100],
  ['Waukegan', 'Lake', 42.3636, -87.8448, LM, 89000, 11.9, 21.7, true, 52000, 9600],
  ['Elgin', 'Kane', 42.0354, -88.2826, LM, 114000, 13.8, 9.6, false, 70000, 6300],
  ['Joliet', 'Will', 41.5250, -88.0817, LM, 150000, 18.4, 17.3, true, 63000, 12400],
  ['Champaign', 'Champaign', 40.1164, -88.2434, MA, 88000, 11.6, 8.2, false, 51000, 2900],
  ['Urbana', 'Champaign', 40.1106, -88.2073, MA, 38000, 5.4, 11.7, true, 44500, 3400],
  ['Mahomet', 'Champaign', 40.1942, -88.4034, MA, 8500, 0.9, 5.8, false, 88000, 150],
  ['Rantoul', 'Champaign', 40.3081, -88.1559, MA, 12500, 1.6, 19.2, true, 45000, 1100],
  ['Kankakee', 'Kankakee', 41.1200, -87.8612, SD, 24000, 3.4, 26.8, true, 41000, 4800],
  ['Bourbonnais', 'Kankakee', 41.1536, -87.8756, SD, 18500, 2.5, 13.1, false, 69000, 1200],
  ['Decatur', 'Macon', 39.8403, -88.9548, SR, 70000, 14.5, 15.9, true, 48000, 7900],
  ['Mount Zion', 'Macon', 39.7700, -88.8751, SR, 6000, 0.7, 6.6, false, 78000, 210]
];
const systems = S.map((s, i) => {
  const loss = s[7];
  const wsip = loss < 10 ? 'Compliant (<10% Loss)' : (i % 2 === 0 ? 'Plan Submitted' : 'Action Required (>10% Loss)');
  const score = Math.round(Math.min(100, loss * 1.8 + (s[8] ? 25 : 0) + Math.min(20, s[10] / 600) + Math.max(0, (80000 - s[9]) / 4000)));
  const agency = s[8] && s[10] > 3000 ? 'IEPA State Revolving Fund' : (s[8] ? 'IDCEO Community Development Block Grant' : (loss >= 10 ? 'IDNR Local Assistance' : 'IEPA State Revolving Fund'));
  return {
    pws_id: `IL${String(3100000 + (i + 1) * 137).padStart(7, '0')}`, municipality: s[0], county: s[1], lat: s[2], lng: s[3],
    water_source: s[4], population_served: s[5], annual_supply_mgd: s[6], water_loss_pct: loss, wsip_status: wsip,
    is_disadvantaged_community: s[8], median_household_income: s[9], lead_service_lines_est: s[10],
    srf_priority_score: score, recommended_funding_agency: agency, is_synthetic: true
  };
});
write('water-systems-srf.json', systems);

// ---- 4. Agency funding programs ------------------------------------------
const P = [
  ['IDNR-OWR', 'Urban Flood Control Grant Program', 'Programa de subvenciones para control de inundaciones urbanas', ['Urban Flooding', 'Bridge/Culvert Hydraulics'], 25, true,
    ['Engineering planning (hydrologic & hydraulic study)', 'Floodway permit', 'Land rights / easements', 'Bid documents'], '6-12 months after award; reimbursement',
    'Cost-share grants for structural and nonstructural urban flood reduction projects.', 'Subvenciones de costos compartidos para proyectos estructurales y no estructurales de reducción de inundaciones urbanas.'],
  ['IDNR-OWR', 'Local Assistance & Water Loss Technical Program', 'Programa de asistencia local y pérdida de agua', ['Water Loss >10%', 'Drought Resiliency'], 20, false,
    ['Water audit', 'Water System Improvement Plan (WSIP)', 'Local council resolution'], '3-9 months; technical assistance',
    'Support for allocatees to complete audits and WSIPs when non-revenue water exceeds 10%.', 'Apoyo a asignatarios para completar auditorías y planes cuando el agua no facturada supera el 10%.'],
  ['IEPA', 'Drinking Water State Revolving Fund (DWSRF)', 'Fondo rotatorio estatal de agua potable (DWSRF)', ['Lead Service Lines', 'Water Loss >10%', 'Drought Resiliency'], 0, true,
    ['Facility plan / preliminary engineering', 'Construction permit', 'Land rights', 'Bid documents', 'Environmental review'], '12-24 months; low-interest loan with principal forgiveness',
    'Low-interest loans and principal forgiveness for drinking water infrastructure and lead line replacement.', 'Préstamos de bajo interés y condonación de capital para infraestructura de agua potable y reemplazo de líneas de plomo.'],
  ['IEPA', 'Clean Water State Revolving Fund (CWSRF)', 'Fondo rotatorio estatal de agua limpia (CWSRF)', ['Urban Flooding', 'Levee Rehabilitation'], 0, true,
    ['Facility plan', 'NPDES / construction permit', 'Land rights', 'Bid documents'], '12-24 months; low-interest loan',
    'Low-interest loans for wastewater, stormwater and green infrastructure projects.', 'Préstamos de bajo interés para proyectos de aguas residuales, aguas pluviales e infraestructura verde.'],
  ['IEMA', 'Hazard Mitigation Grant Program (HMGP)', 'Programa de subvenciones para mitigación de riesgos (HMGP)', ['Urban Flooding', 'Levee Rehabilitation', 'Bridge/Culvert Hydraulics'], 25, false,
    ['Benefit-cost analysis', 'Engineering planning', 'Local hazard mitigation plan', 'Environmental & historic review'], '18-36 months after disaster declaration; reimbursement',
    'Post-disaster FEMA-funded mitigation for flood buyouts, elevation and drainage improvements.', 'Mitigación financiada por FEMA tras desastres para compras, elevación y mejoras de drenaje.'],
  ['IEMA', 'Building Resilient Infrastructure and Communities (BRIC)', 'Infraestructura y comunidades resilientes (BRIC)', ['Urban Flooding', 'Drought Resiliency', 'Levee Rehabilitation'], 25, true,
    ['Benefit-cost analysis', 'Engineering planning', 'Local hazard mitigation plan', 'Land rights'], '24-48 months; competitive national award',
    'Competitive pre-disaster mitigation funding with higher federal share for small impoverished communities.', 'Financiamiento competitivo de mitigación previa a desastres con mayor aporte federal para comunidades pequeñas.'],
  ['IDCEO', 'Community Development Block Grant (CDBG) Public Infrastructure', 'Subvención en bloque para infraestructura pública (CDBG)', ['Water Loss >10%', 'Lead Service Lines', 'Urban Flooding'], 10, true,
    ['Low-to-moderate-income benefit survey', 'Engineering planning', 'Land rights', 'Bid documents'], '9-18 months; reimbursement',
    'Grants for water, sewer and drainage in low- and moderate-income communities.', 'Subvenciones para agua, alcantarillado y drenaje en comunidades de ingresos bajos y moderados.'],
  ['IDOA', 'Conservation Practices Cost-Share Program', 'Programa de costos compartidos de prácticas de conservación', ['Drought Resiliency', 'Urban Flooding'], 25, false,
    ['Conservation plan', 'Soil & Water Conservation District approval', 'Landowner agreement'], '3-6 months; cost-share after practice installation',
    'Cost-share for erosion, soil health and water quality practices through Soil and Water Conservation Districts.', 'Costos compartidos para prácticas de erosión, salud del suelo y calidad del agua a través de distritos de conservación.']
];
write('agency-funding.json', P.map((p, i) => ({
  program_id: `FUND-${String(i + 1).padStart(2, '0')}`, agency: p[0], program_name: p[1], program_name_es: p[2],
  eligible_issues: p[3], local_match_pct: p[4], dac_waiver_available: p[5], prerequisites: p[6],
  disbursement_timeline: p[7], summary: p[8], summary_es: p[9], is_synthetic: true
})));

console.log(`Wrote ${catalog.length} catalog, ${features.length} features, ${systems.length} systems, ${P.length} programs to ${OUT}`);
