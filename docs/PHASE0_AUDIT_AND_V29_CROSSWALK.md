# Phase 0 Audit Report, Page Map & v29 -> v30/v31 Traceability Crosswalk

> **Audit Mode:** Strictly read-only inspection followed by Phase 1 Evidence Reconciliation & CI Determinism Fixes.  
> **Strict Status Rule:** No component may carry `VERIFIED` based on static checks. Static Node/AST assertions carry `STATICALLY_CHECKED`; runtime WordPress, Elementor Editor, Gutenberg Block Editor, and cross-site portability carry `NOT_RUN` (`BLOCKED` in containers without PHP CLI / Docker).

---

## 1. Executive Summary of Resolved Discrepancies

| Audit Topic | Prior Claim / Symptom | Verified Ground Truth (Direct AST & Code Audit) | Phase 1 Resolution |
| :--- | :--- | :--- | :--- |
| **GitHub Actions CI Phase 12 (`20 / 25`)** | 5 SHA-256 checksum mismatches failed Release artifact upload | `scripts/pack-theme-zips.cjs` wrote unsynchronized wall-clock `Date()` timestamps and unsorted directory entries inside JSZip buffers | Pinned `DETERMINISTIC_ZIP_DATE` (`2026-01-01T00:00:00Z`), sorted directories/keys, added `audit-reconcile-evidence.cjs --check` |
| **Custom Widgets Usage Count (`18` vs `24`)** | `template-verification.csv` listed **24** custom widget IDs while `IMPLEMENTATION_STATUS.md` stated **18** | Direct recursive AST walk of all **33** Elementor JSON files proves **exactly 18** custom `uas_*` widgets are used across **29/33** templates; **13** implemented `Widget_Base` classes have `0` prebuilt JSON usages | Created `scripts/audit-reconcile-evidence.cjs` to auto-extract every JSON `widgetType` into CSVs with zero manual drift |
| **Elementor Pro Dependency Flag (`NO` on all 33)** | `template-verification.csv` flagged `pro_required = NO` on all 33 templates | **4** Theme Builder JSON templates (`archive-blog-grid`, `header-sticky-glass`, `footer-mega-4col`, `single-post-modern`) contain Elementor Pro nodes (`archive-posts`, `nav-menu`, `theme-*`) | Reclassified those **4** templates as `OPTIONAL_PRO` (fallback handled by `Theme_Builder_Bridge` when Pro is inactive); **29** remain Free-only (`NO`) |
| **Inflated `VERIFIED` CSV Labels** | `widget-verification.csv`, `template-verification.csv`, and `block-verification.csv` marked `editor_test = PASS`, `status = VERIFIED` | Only offline static Node scripts ran (`test-phase3-templates.cjs`, `test-portability-lifecycle.cjs`, `test-phase10-gutenberg-sovereign-audit.cjs`); Elementor Editor was never launched | Reclassified static checks to `STATICALLY_CHECKED` and live `editor_open` / `edit_save` / `frontend_render` / `responsive_check` / `keyboard_test` to `NOT_RUN` |

---

## 2. Exact Custom Widget Inventory (31 `Widget_Base` Classes vs 33 JSON Templates)

All **31** widgets in `elementor-addon-suite/includes/widgets/` are genuine PHP classes extending `\Elementor\Widget_Base` (via `Base_Widget`), registered through `elementor/widgets/register` with native `Content`, `Style`, and `Advanced` controls.

### 2A. Actively Placed in Prebuilt Elementor JSONs (**18 / 31** Custom Widgets)
`uas_hero` (10), `uas_cta` (4), `uas_services_grid` (3), `uas_case_timeline` (2), `uas_contact_booking` (2), `uas_faq` (2), `uas_vip_pricing` (2), `uas_banner_slider` (1), `uas_bento_tabs` (1), `uas_dynamic_grid` (1), `uas_floating_cta` (1), `uas_fomo_countdown` (1), `uas_posts_grid` (1), `uas_pricing_matrix` (1), `uas_stat_counter` (1), `uas_story_bar` (1), `uas_team` (1), `uas_testimonials` (1).

### 2B. Implemented in PHP/CSS/JS Only — Zero Appearances in Prebuilt JSONs (**13 / 31** Custom Widgets)
`uas_before_after`, `uas_client_portal`, `uas_download_box`, `uas_email_otp`, `uas_firm_milestones`, `uas_floating_dock`, `uas_hero_split`, `uas_news_ticker`, `uas_pricing_switcher`, `uas_radar_chart`, `uas_spotplayer_course`, `uas_theme_toggle`, `uas_video`.
*(Scheduled for controlled template integration in Phases 5, 6, and 10 after Golden Slice proof.)*

### 2C. Elementor Built-In Widgets Found Inside the 33 JSONs (**15** Non-Custom Types)
- **Elementor Free Core (5):** `heading` (7), `text-editor` (4), `button` (2), `icon-list` (2), `image` (1).
- **Elementor Pro Theme Builder (10 across 4 templates):** `archive-posts`, `theme-archive-title`, `theme-site-logo`, `nav-menu`, `theme-post-title`, `post-info`, `theme-post-featured-image`, `theme-post-content`, `author-box`, `post-comments`.

---

## 3. Current Theme & Page Classification Matrix (Phase 0 Inventory)

| Page / Theme Family | Current Location | Current Build Technology | Native `_elementor_data` Default? | Elementor Editable Now? | Target Phase & Migration Action |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **Master Home (`front-page.php`)** | `wordpress-theme/front-page.php` | Conditional `_elementor_data` + PHP archetypes (`template-parts/front-*.php`) | Conditional (Demo Import only) | **Partial / Conditional** | **Phase 5–6a (Golden Slice)** -> Native Container Home JSON kit |
| **Legal, Agency, Corporate, Clinic, Store Niche Fronts** | `wordpress-theme/template-parts/front-*.php` & `page-*.php` | Hardcoded HTML/PHP + Tailwind + `[sedrazavi_*]` shortcodes | No | **No** | **Phase 6b Priority 1, 5, 6, 7** -> Native Elementor Page JSONs |
| **Services, About, Portfolio, Contact** | `wordpress-theme/page-*.php` & `sedrazavi-designer-theme/page-*.php` | PHP templates + `WP_Query` + forms | Conditional in Designer Theme | **No / Conditional** | **Phase 6b Priority 2–3** -> Elementor Query/Booking Widget Kits |
| **Header, Footer, Single Post, Blog Archive** | `header.php`, `footer.php`, `single.php`, `archive.php` | PHP Templates + `Theme_Builder_Bridge` + 4 Pro JSON templates | Mixed | **Conditional** | **Phase 3 & 6b Priority 4** -> Pro Theme Builder + Free Bridge |
| **Frontend Cockpit & Client Portal** | `sedrazavi-companion/includes/class-frontend-cockpit.php`, `page-frontend-cockpit.php` | Dedicated operational shortcode / REST app | No (Application screen) | **No (Application Layer)** | Remains plugin-owned operational UI per Rule 9 |
| **8 Autonomous Standalone Themes** | `standalone-themes/sedrazavi-*-theme/` | Standalone PHP (`header.php`, `footer.php`, `index.php`, `page.php`, `single.php`) | No | **No** | **Phase 11** -> Vertical native Elementor Template Kits |
| **33 Elementor Suite JSON Templates** | `elementor-addon-suite/templates/` | Native Elementor Flexbox Container JSON | **Yes** | **STATICALLY_CHECKED** (`NOT_RUN` in live Editor) | **Phase 6 & 8** -> Live Editor open/edit/save/portability proof |

---

## 4. Requirement -> File -> Feature -> Test -> Evidence Matrix (v29 -> v30/v31)

| Requirement / Spec Domain | v29 Concept Scope | v30 / v31 Spec Target | Current Implementation Module(s) | Automated Test Suite | Current Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-01: P0 Case Security, RBAC & Anti-IDOR** | Conceptual role rules | Dedicated legal caps, no `edit_posts`, `private` CPT status, per-object filtering | `class-case-data-service.php`, `rest-api.php`, `wp-rest-auth.php`, `class-dynamic-query-engine.php` | `test-mandatory-audit-remediation.cjs` (Group 11), `test-phase4.php` | `TESTED` (Node Static) / `NOT_RUN` (Live WP REST) |
| **REQ-02: Native Elementor Widgets (`Widget_Base`)** | 96×3 catalog proposals (`CATALOGED_ONLY`) | Clean core set + vertical pack extensions (`IMPLEMENTED`) | `elementor-addon-suite/includes/class-plugin.php` + 31 files in `includes/widgets/` | `test-portability-lifecycle.cjs`, `audit-reconcile-evidence.cjs` | `STATICALLY_CHECKED` (`NOT_RUN` in Elementor Editor) |
| **REQ-03: Native Elementor JSON Templates** | Conceptual showcase banks (`CATALOGED_ONLY`) | 30+ validated JSON templates + popups | `elementor-addon-suite/templates/` (30 + 3 popups) + `class-template-importer.php` | `test-phase3-templates.cjs`, `test-phase10-controlled-banks.cjs`, `audit-reconcile-evidence.cjs` | `STATICALLY_CHECKED` (`NOT_RUN` in live Elementor) |
| **REQ-04: Native Gutenberg Blocks** | Early block ideas | `block.json` + server render callbacks (no shortcode fallback hacks) | `elementor-addon-suite/blocks/*/block.json` (7 blocks) + `class-gutenberg-blocks.php` | `test-phase10-gutenberg-sovereign-audit.cjs` | `STATICALLY_CHECKED` (`NOT_RUN` in Block Editor) |
| **REQ-05: Portable Package Manager & Rollback** | Concept bundler spec | Preflight, Resolver, SHA-256 Checksums, Pre-overwrite Backup, Atomic Rollback | `elementor-addon-suite/includes/packaging/*` (6 modular classes) | `test-mpca-architecture.cjs`, `test-mandatory-audit-remediation.cjs` | `TESTED` (Node + JSZip) / `NOT_RUN` (Live Site A -> B) |
| **REQ-06: Standalone Theme Independence** | Child-theme architecture | 8 Autonomous Standalone Themes + Plugin-owned Cockpit Engine | `standalone-themes/*`, `sedrazavi-companion/includes/class-frontend-cockpit.php` | `test-phase11-vertical-packs.cjs`, `test-frontend-management-cockpit.cjs` | `TESTED` (Node + JSZip) / `NOT_RUN` (Live Theme Switch) |
| **REQ-07: Reproducible Release & CI Evidence** | Manual ZIP scripts | Deterministic ZIP generation, SHA-256 manifest, SBOM, CSV ledgers | `scripts/pack-theme-zips.cjs`, `scripts/audit-reconcile-evidence.cjs`, `artifacts/evidence/v31.0.0/` | `test-phase12-release-hardening.cjs` (25/25) | `TESTED` (Deterministic Node Build) / `BLOCKED` (`wp-live-e2e` needs Docker) |

---

## 5. Remaining Gaps After Phase 1 (Pre-Conditions for Phase 2–12)

1. Live PHP CLI (`php -l`), live WordPress + WP-CLI installation, and live Elementor Editor save/re-open E2E remain `NOT_RUN` / `BLOCKED` inside the Node-only build container and must be executed via `docker compose -f docker-compose.test.yml` or GitHub Actions `workflow_dispatch` (`run_live_e2e: true`).
2. Only **18 / 31** custom widgets currently appear in prebuilt JSONs, and **most theme frontend pages** remain PHP/HTML layouts; migrating them requires completing Phase 5 (`Golden Widget uas_hero`) and Phase 6 (`Golden Template` + gradual page migration) before touching bulk widget expansion (Phase 10).
