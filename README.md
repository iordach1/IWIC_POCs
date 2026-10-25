# Illinois Integrated Water Information Center (IWIC) – Workshop PoC Suite

> **PROTOTYPE & SYNTHETIC DATA NOTICE:** This application is a conceptual Proof of Concept for the Illinois Integrated Water Information Center (IWIC). While it references real Illinois waterways, municipalities, aquifers, and state/federal agencies, **all underlying numerical metrics, model files, and statuses are 100% synthetic (spoofed)** and generated strictly for workshop demonstration purposes.

Three static, client-side proofs of concept for the Illinois Water Implementation Workshop, hosted free on GitHub Pages with no backend, paid APIs, or proprietary licenses.

## Background: State Water Plan, Chapter 7

Chapter 7 (*Integrated Water Management*) of the Illinois State Water Plan identifies a structural barrier: Illinois water resources are interlinked, but management, regulation, modeling, and monitoring are fragmented across state agencies, federal agencies, counties, and private consultants. The State Water Plan Task Force and lead agency **IDNR – Office of Water Resources** recommend establishing, staffing, and funding the **Illinois Integrated Water Information Center (IWIC)** within the **Prairie Research Institute (PRI)** at the **University of Illinois Urbana-Champaign**. It would serve as an authoritative clearinghouse for water data, models, tools, and interagency coordination, advancing the Land Grant public-service mission.

### Problems addressed

1. **Data siloing** – e.g., finding a HEC-RAS model for a bridge replacement or the Fox River / Millhurst Dam removal analysis can mean contacting half a dozen entities.
2. **The 1984 precedent** – the Illinois Natural Resources Information Center was authorized but lapsed for lack of dedicated funding and staff. The plan estimates **$5.7M in Year 1 and $3.9M in Year 2** for full IWIC operation; these PoCs show discovery services can start at *de minimis* cost.
3. **Navigation for disadvantaged communities** – grant and loan programs (IDNR, IEPA, IEMA, IDCEO) have differing criteria, match rules, and timelines.
4. **Underused regulatory data** – under the Level of Lake Michigan Act (615 ILCS 50), IDNR-OWR collects water loss data from 200+ allocatees; those over **10% loss** must prepare a Water System Improvement Plan. This data has not been integrated with IEPA SRF prioritization.
5. **Language barriers** – outreach and grant materials are almost exclusively English.

### Scope of IWIC (Figure 7.3)

| ID | Category | ID | Category |
| :-- | :-- | :-- | :-- |
| CAT-01 | Precipitation frequency (Bulletin 75) | CAT-09 | Groundwater & well data |
| CAT-02 | Hydraulic studies & models | CAT-10 | Water infrastructure mapping |
| CAT-03 | Floodplain & floodway mapping | CAT-11 | Port & navigation information |
| CAT-04 | NFIP LOMRs | CAT-12 | Levee database information |
| CAT-05 | NFIP LOMAs | CAT-13 | Flood damage assessment (SAFR) |
| CAT-06 | Hazard mitigation plans | CAT-14 | Flood mitigation & preparedness |
| CAT-07 | Historical flood reports | CAT-15 | Drought preparedness & GIS metadata |
| CAT-08 | Public water use & consumption | | |

## Synthetic Data Architecture

All three PoCs share one dataset in [`/data`](data/). **Real** Illinois hydrography (Fox, Illinois, Mississippi, Kankakee rivers, Lake Michigan), municipalities, aquifers (e.g., Mahomet), and agencies are paired with **spoofed** metrics: water-loss percentages, DAC scores, model statuses, funding amounts, and dates. Nothing here is authoritative; do not use for decisions.

| File | Contents |
| :-- | :-- |
| `data/iwic-catalog.json` | Synthetic datasets, models, and apps across the 15 Fig. 7.3 categories |
| `data/hydraulic-models.geojson` | Stream gages, HEC-RAS bridge models, levees, LOMRs |
| `data/water-systems-srf.json` | Lake Michigan allocatees and utilities (water loss, DAC scores) |
| `data/agency-funding.json` | Cross-agency grant matrix (IDNR, IEPA, IEMA, IDCEO, IDOA) |

## The Three Proofs of Concept

| PoC | Page | Description | Stack |
| :-- | :-- | :-- | :-- |
| 1 | `poc1-catalog.html` | **Unified Data, Model & Application Catalog** modeled on New Mexico Water Data: fuzzy search, facets, metadata inspection | Fuse.js |
| 2 | `poc2-map.html` | **Geospatial & SRF Priority Explorer**: links hydraulic models with >10% water loss and DAC metrics to demonstrate SRF prioritization | Leaflet, Chart.js, OSM / USGS tiles |
| 3 | `poc3-assistant.html` | **AI Water & Grant Navigator** (English/Español): BM25/TF-IDF RAG over the shared data, plus optional in-browser WebGPU LLM | Vanilla JS, `@mlc-ai/web-llm` (optional) |

PoC 3 works instantly with deterministic client-side retrieval; enhanced mode (Llama-3.2-1B, q4f16_1) runs locally in the browser and falls back to RAG if WebGPU is unavailable.

## Zero-Budget / De Minimis Implementation Roadmap

| Phase | Action | Open standard / tool | Cost | Outcome |
| :-- | :-- | :-- | :-- | :-- |
| 0 | Agencies publish a metadata inventory of datasets, models, and apps | CSV/JSON using CKAN-style schema fields | Staff time | Shared inventory replaces email chains |
| 1 | Federate catalog records without moving data | CKAN package schema, STAC for imagery/rasters | $0 (static JSON) | Single searchable index (PoC 1) |
| 2 | Publish spatial assets as open files | GeoJSON, link-outs to ArcGIS/USGS services | $0 | Map-ready models, gages, levees (PoC 2) |
| 3 | Join regulatory data to funding needs | Lake Michigan water-loss + SRF DAC scoring | $0 | Transparent prioritization |
| 4 | Client-side search and assistance | Fuse.js, BM25 RAG, optional WebLLM | $0 hosting (GitHub Pages) | Multilingual guidance |
| 5 | Seek appropriations for permanence | Plan estimate: $5.7M Yr 1, $3.9M Yr 2 | Legislative | Staffed, sustained IWIC avoiding the 1984 lapse |

## Run Locally

```bash
npx serve .
# or
python3 -m http.server 8000   # then open http://localhost:8000
```

A web server is required (ES modules and `fetch` do not work from `file://`).

### Regenerate synthetic data

```bash
node scripts/generate-data.mjs
```

## Deployment

`.github/workflows/deploy-pages.yml` deploys the repository root to GitHub Pages on pushes to `main`/`master` or manual dispatch. Enable it under **Settings → Pages → Source: GitHub Actions**.

## Branding & Accessibility

UIUC brand colors and typography (Montserrat, Source Sans 3) with WCAG 2.1 AA targets, defined in `css/illinois-brand.css`.

## Budget Comparison

| Item | Typical commercial approach | This prototype |
| :-- | :-- | :-- |
| Hosting | Cloud VMs / PaaS | GitHub Pages ($0) |
| Search | Managed search service | Fuse.js (client-side) |
| Maps | Proprietary basemap APIs | Leaflet + OSM/USGS (no keys) |
| AI | Paid LLM API | Local RAG / WebLLM in-browser |
