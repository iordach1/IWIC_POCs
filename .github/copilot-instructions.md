# GitHub Copilot Project Instructions: Illinois Integrated Water Information Center (IWIC) PoC Suite

## 1. Project Context & Purpose
You are building a static, zero-cost web application suite hosted on **GitHub Pages** for an upcoming implementation workshop on the **Illinois Integrated Water Information Center (IWIC)**, a priority recommendation in Chapter 7 of the Illinois State Water Plan (housed at the Prairie Research Institute, University of Illinois Urbana-Champaign).

The goal is to showcase three distinct Proofs of Concept (PoCs) built on top of a **single common synthetic dataset** (`/data/`) using **only free, open-source, client-side tools** (no paid APIs, no backend servers, no proprietary licenses).

## 2. Mandatory Synthetic Data Disclaimer
Every page MUST display a persistent, accessible banner at the top of the viewport (below the campus header) stating:
> **PROTOTYPE & SYNTHETIC DATA NOTICE:** This application is a conceptual Proof of Concept for the Illinois Integrated Water Information Center (IWIC). While it references real Illinois waterways, municipalities, aquifers, and state/federal agencies, **all underlying numerical metrics, model files, and statuses are 100% synthetic (spoofed)** and generated strictly for workshop demonstration purposes.

## 3. University of Illinois Urbana-Champaign (UIUC) Web Branding Guidelines
All pages must strictly adhere to official University of Illinois digital brand standards and WCAG 2.1 AA accessibility rules:

### Color Palette (Define as CSS Custom Properties in `:root`)
- `--il-orange: #FF5F05;` (Primary Illini Orange — use for large headings on dark backgrounds, primary callout borders, and accents. **NEVER** use `#FF5F05` for small/normal body text on a white background due to 3.05:1 contrast ratio).
- `--il-blue: #13294B;` (Primary Illini Blue — use for headers, primary navigation, primary buttons, headings, and high-contrast text).
- `--il-blue-darker: #000033;` (Official footer background color).
- `--il-altgeld: #C84113;` (Accessible darker orange — use for links, hover states, and small orange text on white or light gray backgrounds).
- `--il-industrial: #0071CE;` (Secondary Industrial Blue — primary water data accent, interactive links, map highlights).
- `--il-industrial-light: #3CB4E5;` (Secondary water/hydrology chart series color).
- `--il-industrial-bg: #D5EAF7;` (Light tint for info callouts and active filter pills).
- `--il-prairie: #006230;` (Prairie Green — use for "Compliant / Normal / Funded" status badges).
- `--il-harvest: #FCB316;` (Harvest Gold — use for "Warning / Watch / In Review" status badges).
- `--il-berry: #5C0E41;` (Berry — accent for specialized environmental/PFAS layers).
- `--il-storm-dark: #252525;` (Body typography color).
- `--il-storm: #707372;` (Muted metadata text).
- `--il-storm-light: #C8C6C7;` (Card borders and dividers).
- `--il-storm-bg: #F4F4F4;` (Page section and sidebar backgrounds).
- `--il-white: #FFFFFF;`

### Typography (Load via Google Fonts)
- **Headings & Navigation**: `'Montserrat', sans-serif` (weights: 600, 700, 800).
- **Body Copy, Tables & UI Controls**: `'Source Sans 3', 'Source Sans Pro', sans-serif` (weights: 400, 600).
- **Editorial Callouts**: `'Georgia', serif`.

### Institutional Header & Footer
- **Top Identity Bar**: Include the official University of Illinois Block "I" mark (rendered as an accessible inline SVG in `#FF5F05` and `#FFFFFF` on `#13294B`), unit attribution for **Prairie Research Institute | Illinois State Water Survey**, and site title **Illinois Integrated Water Information Center (IWIC)**.
- **Global Navigation**: Links to `Home (Overview)`, `PoC 1: Data & Model Catalog`, `PoC 2: Geospatial & Priority Explorer`, `PoC 3: AI Water & Grant Navigator`, plus a global **Language Toggle (`English` | `Español`)** to demonstrate multi-lingual accessibility.
- **Footer**: Background `--il-blue-darker` (`#000033`), displaying PRI/UIUC Land Grant mission statement, links to State Water Plan Task Force partner agencies (IDNR-OWR, IEPA, IEMA, IDCEO, IDOA, ISWS), and an "Open-Source Zero-Budget Architecture" colophon.

## 4. Technical Stack Constraints (100% Free & Open Source, Static GitHub Pages)
- **HTML5 / CSS3 / Vanilla ES6+ JavaScript** (modular ES modules so the site runs directly on GitHub Pages without complex build failures, or via a zero-config static deployment).
- **Search & Indexing (PoC 1)**: `Fuse.js` (via open CDN `https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.mjs`).
- **Mapping & GIS (PoC 2)**: `Leaflet.js` (`1.9.4` via unpkg/jsDelivr) with free OpenStreetMap and USGS National Map Hydrography (`USGSHydroCached`) tile layers. No API keys allowed.
- **Charts & Analytics (PoC 2)**: `Chart.js` (`4.4.x` via jsDelivr).
- **Client-Side AI Assistant (PoC 3)**:
  - **Primary Mode (Instant, Zero-Download)**: Deterministic Client-Side Retrieval-Augmented Generation (RAG) engine written in JavaScript using TF-IDF / BM25 scoring over `/data/iwic-catalog.json`, `/data/water-systems-srf.json`, `/data/hydraulic-models.geojson`, and `/data/agency-funding-programs.json`.
  - **Enhanced Mode (Optional Toggle)**: Browser-native WebGPU LLM powered by `@mlc-ai/web-llm` (`Llama-3.2-1B-Instruct-q4f16_1-MLC`) that runs 100% locally in the user's browser with $0 server or API cost, falling back gracefully to Instant Client-Side RAG if WebGPU is unavailable.

## 5. Repository File Structure
```text
/
├── .github/
│   ├── copilot-instructions.md
│   └── workflows/
│       └── deploy-pages.yml
├── index.html                  # Executive Workshop Landing Page & Architecture Overview
├── poc1-catalog.html           # PoC 1: IWIC Unified Data, Model & Application Catalog
├── poc2-map.html               # PoC 2: Geospatial Hydraulics & SRF Equity Explorer
├── poc3-assistant.html         # PoC 3: "Ask IWIC" Multilingual AI & Local Assistance Navigator
├── css/
│   └── illinois-brand.css      # Shared UIUC design system, responsive grid, WCAG styles
├── js/
│   ├── common-ui.js            # Shared UIUC header/footer injection, EN/ES i18n, synthetic banner
│   ├── poc1-catalog.js         # Fuse.js search, organization/group facets, metadata modal
│   ├── poc2-map.js             # Leaflet GIS layers, SRF prioritization calculator, Chart.js
│   └── poc3-assistant.js       # Client-side RAG engine, WebLLM integration, grant wizard
├── data/
│   ├── iwic-catalog.json       # 30+ synthetic datasets & apps across all 15 Fig. 7.3 categories
│   ├── hydraulic-models.geojson# Synthetic stream gages, HEC-RAS bridge models, levees, LOMRs
│   ├── water-systems-srf.json  # Synthetic Lake Michigan allocatees & IL water utilities (water loss & DAC scores)
│   └── agency-funding.json     # Synthetic cross-agency grant matrix (IDNR, IEPA, IEMA, IDCEO, IDOA)
├── scripts/
│   └── generate-data.mjs       # Node.js script to regenerate or expand the synthetic datasets
└── README.md                   # Workshop documentation, budget comparison, and setup guide