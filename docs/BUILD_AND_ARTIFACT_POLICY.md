# Source-vs-Build & Reproducible Artifact Policy

This document establishes clear separation between **authoritative hand-authored source code** and **generated build/distribution artifacts** in the `Sedrazavi-WPtemplate` repository.

## 1. Classification Matrix

| Path / Pattern | Role | Authoritative Source or Generated? | Generation Command |
| :--- | :--- | :--- | :--- |
| `src/` | TypeScript/React SPA, Security Middleware & Ecosystem Data | **Authoritative Source** | N/A |
| `wordpress-theme/` *(excluding `app-dist/`)* | Master WordPress Theme PHP/CSS/JS | **Authoritative Source** | N/A |
| `elementor-addon-suite/`, `sedrazavi-addons/`, `sedrazavi-companion/`, `sedrazavi-designer-core/` | WordPress Plugins (Widgets, Templates, Blocks, Cockpit, Legal, Designer Core) | **Authoritative Source** | N/A |
| `scripts/` | Build, Packaging, Sync & Verification Suites | **Authoritative Source** | N/A |
| `public/app-dist/` & `wordpress-theme/app-dist/` | Compiled Vite Frontend Bundle & Assets | **Generated Artifact** | `npm run build` |
| `standalone-themes/*/` *(runtime includes synced from master theme)* | 8 Decoupled Niche Themes | **Derived / Generated** *(synced from master)* | `node scripts/convert-to-standalone-themes.cjs` |
| `*.zip` *(root + `public/*.zip`)* | Installable WordPress Theme & Plugin ZIPs | **Generated Artifact** | `node scripts/pack-theme-zips.cjs` |
| `artifacts/evidence/v31.0.0/checksums.sha256` | Release SHA-256 Digest Manifest | **Generated Verification Evidence** | `sha256sum` over release ZIPs |

## 2. Standard Deterministic Rebuild Workflow

Never hand-edit files inside `public/app-dist/`, `wordpress-theme/app-dist/`, or binary ZIP archives. After any source modification:

```bash
npm run sync:all
node scripts/convert-to-standalone-themes.cjs
npm run build
node scripts/pack-theme-zips.cjs
npm run test:all
```

## 3. Compatibility Baseline Matrix (Single Source of Truth)

All plugin headers, theme headers, `Package_Registry` manifests, `Package_Exporter` requirements, and `README.md` MUST maintain this uniform contract:

- **Minimum Supported Baseline:** `PHP >= 7.4`, `WordPress >= 6.0`, `Elementor >= 3.10` *(conditional: only required when Elementor widgets or JSON templates are included in a bundle)*.
- **Recommended & CI-Targeted Runtime:** `PHP 8.0 – 8.3`, `WordPress 6.4 – 6.7`, `Elementor 3.20+` *(Elementor Pro optional via `Theme_Builder_Bridge`)*.
