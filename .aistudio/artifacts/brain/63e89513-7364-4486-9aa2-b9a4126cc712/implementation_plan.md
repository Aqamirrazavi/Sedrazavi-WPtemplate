# Sovereign WordPress & Elementor No-Code Designer Ecosystem (v16.0–v30.0)

A comprehensive architectural blueprint for the standalone, zero-React, 100% Elementor-native landing page and plugin ecosystem for Seyed Amir Hossein Razavi Fordoei (`@sedrazavi`), featuring in-theme automated plugin bundling and activation, an interstellar warp starfield background engine, front-end font upload and customization, and a Zoomit-inspired tech-editorial aesthetic.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following decisions were clarified and approved during the interview phase:

- **Confirmed Decision 1 (In-Theme Plugin Bundling & 1-Click Installer)**: The standalone theme (`sedrazavi-designer-theme`) will embed a pre-packaged zip of the core vertical plugin in `inc/plugins/sedrazavi-designer-core.zip`. A dedicated 1-click installer and activator handler (`inc/plugin-installer.php`) will allow the site administrator to install and activate the plugin directly from the front-end Designer Cockpit (`/designer-cockpit/`) and the WP Admin notification bar via AJAX/REST, while ensuring the theme remains 100% resilient and functional even if the plugin is not activated.
- **Confirmed Decision 2 (Default Background Engine - Addenda 29.0 & 30.0)**: The default background animation across the site is the **Pure Galactic Interstellar Warp Drive** (Pattern #01). It features a pure cosmic canvas (zero cockpit or window frame obstruction), idle cruising velocity, scroll-driven impulse acceleration, exponential damping inertia deceleration ($\lambda = 0.92$), and light streak tails, fully controllable in Elementor Site Settings.
- **Confirmed Decision 3 (Typography & Front-End Font Studio)**: Sovereign local **Vazirmatn (WOFF2)** is the zero-risk open-source default (OFL). The Designer Cockpit provides an intuitive front-end font selector and secure WOFF2 custom font uploader (for commercial fonts like Yekan Bakh, Dana, or IRANYekanX) that updates CSS variables and Elementor typography kit without manual code edits.

---

## 1. Overview & Core Concept

- **What It Does**: Delivers an all-in-one, high-performance WordPress portfolio and landing page ecosystem specifically tailored for a premier No-Code WordPress & Elementor Architect. It bridges frontend client interactions with backend WordPress features—including automated project tracking (`SR-XXXXX`), interactive Elementor widgets, live quote calculators, client portals, and tech-editorial case studies.
- **Target Audience / Persona**: High-value businesses, e-commerce stores, startups, and institutions seeking bespoke WordPress websites, sales landing pages, and complex Elementor layouts without bloat or code fragility.
- **Key Value**: Drastically accelerates project delivery (zero-code setup) while providing clients and designers with dedicated front-end dashboards, eliminating the need to expose `/wp-admin/` to clients.

---

## 2. User Experience & Visual Design

### Visual Identity & Aesthetic Direction
- **Atmospheric Palette**: Dark Cyberpunk Obsidian (`#0B0F19` deep space background, `#111827` surface cards, `#1F2937` hover elevated surfaces) accented by **Zoomit Vibrant Red** (`#E11D48`), **Cyber Neon Cyan** (`#00D1FF`), and **Electric Emerald** (`#10B981`), backed by a 66-palette dynamic switcher (33 dark and 33 light palettes).
- **Typography**: Editorial Iranian font scale utilizing self-hosted **Vazirmatn** with options for **Yekan Bakh** and **Dana**, paired with **JetBrains Mono** for technical specs, timestamps, and metric data.
- **Surface Math & Structure**: Hairline borders (`1px solid rgba(255,255,255,0.08)`), subtle glassmorphism blur (`backdrop-filter: blur(12px)`), $12\text{px}$ card radius, and clean unboxed typographic metadata.

### 10 Core Landing Page Sections (Elementor Flexbox Containers)
1. **Sticky Glass Header & Reading Progress Bar**: Real-time reading progress line, designer live availability pulse indicator, theme toggle, and drawer navigation.
2. **Horizontal Video & Demo Stories Bar**: Touch-snap carousel of 30-second vertical demo reels and customer testimonials with gradient neon rings.
3. **Asymmetrical Bento Hero Grid**: 2/3 flagship project showcase with $16:9$ media and executive summary + 1/3 vertical column of numbered tech insights (`01`, `02`, `03`).
4. **Hot Topics Pill Bar**: Interactive filter chips (`#NoCode`, `#WooCommerce`, `#ElementorPro`) triggering instant client-side project filtering.
5. **Interactive Services & 3D Tech Bento**: 3D interactive world clock globe, live jalali/gregorian/hijri chrono clock, and instant project scope cost calculator.
6. **Flagship Case Studies & Pros/Cons Matrix**: Zoomit-style 60-second quick-take summary boxes, dual-column solved challenges, and $9.8/10$ performance review badges.
7. **Retro Cyber Entertainment Hub**: Pure Vanilla JS Chrome Dino runner with local high-score tracking and cyberpunk music player with SVG audio visualizer.
8. **Editorial Tech Magazine Grid**: Responsive article cards with local bookmarks (no-login), reading time, and author bio.
9. **VIP Lead Capture & Order Inquiry Portal**: Hardened consultation intake form with automatic guest account provisioning and instant `SR-XXXXX` tracking code generation.
10. **Multi-Column Editorial Footer**: System HUD status, dual-language switch (FA/EN), social handles (`@sedrazavi`), and copyright.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Standalone Theme + Bundled Core Plugin**:
  - *Chosen Approach*: The theme (`sedrazavi-designer-theme`) and vertical core plugin (`sedrazavi-designer-core`) are packaged as separate folders for distribution. Additionally, `sedrazavi-designer-core.zip` is bundled inside `sedrazavi-designer-theme/inc/plugins/` with an AJAX-powered 1-click installer in the front-end Designer Cockpit and WP admin.
  - *Why*: Allows standalone portability (the theme runs gracefully with built-in fallbacks if the plugin is deactivated), while providing a friction-free 1-click installation experience for new sites.
  - *Alternatives Considered*: Hardcoding all functionality inside the theme only (violates WordPress best practices for data persistence when switching themes) or forcing manual zip uploads in `/wp-admin/` (cumbersome for designers).
- **Decision 2: Zero React in Theme/Plugin Frontend**:
  - *Chosen Approach*: 100% native WordPress PHP templates, semantic HTML5, CSS3 Custom Properties, and Vanilla ES6+ JS (<15KB).
  - *Why*: Guarantees instant sub-800ms loading speeds, eliminates build-step dependencies on live hosts, and ensures 100% compatibility with the Elementor visual editor.
- **Decision 3: Single Source of Truth (SSOT) via `sedrazavi_config`**:
  - *Chosen Approach*: Configuration data is authored and saved to a dedicated CPT `sedrazavi_config` with slug `master-config`, version locking (`_sr_config_version`), and SHA-256 integrity verification (`_sr_config_sha256`), with automatic snapshots for instant rollback.

---

## 4. Technical Architecture & System Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                   SEDRAZAVI DESIGNER THEME & CORE                       │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
         ┌───────────────────────────┴───────────────────────────┐
         ▼                                                       ▼
┌──────────────────────────────────┐   ┌─────────────────────────────────┐
│     sedrazavi-designer-theme     │   │      sedrazavi-designer-core    │
│  - style.css (100% Standalone)   │   │  - sedrazavi-core.php           │
│  - header.php / footer.php       │   │  - inc/database-installer.php   │
│  - front-page.php (10 Sections)  │   │  - inc/auto-provisioning.php    │
│  - 12 Dynamic Page Templates     │   │  - inc/custom-post-types.php    │
│  - single.php (4 Layout Archetypes)  │  - inc/settings-sync.php (SSOT) │
│  - inc/starfield-warp.php        │   │  - inc/lead-manager.php         │
│  - inc/plugin-installer.php      │   │  - inc/auth-guard.php           │
│  - inc/local-font-loader.php     │   │  - 4 Elementor Widgets          │
│  - inc/plugins/core-bundle.zip   │   │  - 33 Elementor JSON Templates  │
└────────────────┬─────────────────┘   └────────────────┬────────────────┘
                 │                                      │
                 └───────────────────┬──────────────────┘
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      FRONT-END APPLICATION LAYERS                      │
├────────────────────────────────────────────────────────────────────────┤
│  1. Interstellar Warp Starfield Canvas (Pure Cosmic Space Engine)      │
│  2. Front-End Designer Cockpit (1-Click Core Install + Font Studio)    │
│  3. Front-End Client Dashboard (Order Status + Designer Messages)      │
│  4. Public Inquiry Tracker (/track-order/?tracking_code=SR-XXXXX)      │
│  5. 100% Elementor Theme Builder Locations (header/footer/single/arch) │
└────────────────────────────────────────────────────────────────────────┘
```

### Key Modules to Create / Upgrade:
1. **`inc/starfield-warp.php` & `assets/js/starfield-warp.js`**: Implement the pure cosmic interstellar starfield engine with acceleration formula $V(t) = \min(V_{\text{warp}} + |\Delta Y| \times 0.22, 18.0)$, exponential damping ($\lambda = 0.92$), and light streak tails.
2. **`inc/plugin-installer.php`**: Built-in 1-click plugin extraction and activation handler supporting both the front-end Designer Cockpit and WP admin.
3. **`inc/font-studio.php`**: Front-end font uploader and switcher supporting Vazirmatn, Yekan Bakh, Dana, and IRANYekanX with dynamic `@font-face` injection.
4. **Theme & Core Distribution**: Update packaging script (`scripts/pack-theme-zips.cjs`) to embed `sedrazavi-designer-core.zip` inside `sedrazavi-designer-theme/inc/plugins/` and build release bundles.
5. **Automated Verification**: Extend test suite (`scripts/test-designer-landing-ecosystem.cjs`) to verify the starfield engine, plugin installer, font studio, and 100% compliance with master prompt v30.0.
