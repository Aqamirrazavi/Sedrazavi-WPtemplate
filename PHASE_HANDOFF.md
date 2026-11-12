# Phase Handoff Ledger — SedRazavi WordPress Ecosystem

## Current Phase: Phase 2 Completed (Ready for Phase 3 Live Docker / WP-CLI Execution)

### 1. What Was Completed in Phases 0, 1A, 1B & 2
- **Phase 0 Audit & Architecture Freeze:** Full read-only inspection of themes, plugins, REST routes, CPT registrations, registries, build scripts, and Node tests.
- **Phase 1A — P0 Security & Standalone Themes SSOT:** Hardened confidential CPTs (`public => false`, `show_in_rest => false`), enforced strict REST auth/HMAC/rate-limiting, and established `standalone-themes/<slug>` as the exclusive Single Source of Truth.
- **Phase 1B — Registry Unification, Package Manager Decomposition & Remaining Security Hardening:** Unified 31-widget SSOT registries, decomposed `class-package-manager.php` into 6 modular packaging classes under `elementor-addon-suite/includes/packaging/`, embedded per-file SHA-256 manifests, and hardened remaining auth/OTP/payment/intake REST routes.
- **Phase 2 — Granular Gutenberg/CPT Bundling, Frontend Cockpit DB Parity & Reproducible WP E2E Harness:**
  1. **Workstream A — Granular Gutenberg Blocks, CPT Schemas & Standalone Self-Checksums:**
     - Added `get_gutenberg_blocks_catalog()` (all 7 `sovereign-*` blocks) and `get_cpt_schemas_catalog()` (public portable `portfolio`, `services`, `case_study`) to `Package_Registry`, filtered safely via `Dependency_Resolver::resolve_blocks_and_cpts()`.
     - Updated `Package_Exporter::build_custom_project_bundle()`, `generate_kit_cpt_schemas_file()`, `generate_custom_bundle_plugin_file()`, `Contract_Registry`, `Package_Manager`, `class-admin-settings.php`, and `admin-settings.js` to support selective Gutenberg/CPT/design-token bundling, fix stale counts (`۳۱ ویجت + ۷ بلوک + ۳۳ الگو`), define standalone `UAS_PATH`/`UAS_VERSION` constants, and enforce `uas_verify_bundle_checksums_*()` disk-level SHA-256 verification on plugin activation before hydrating Elementor templates.
  2. **Workstream B — Frontend Cockpit <-> WordPress DB Parity & Snippet Hardening:**
     - Implemented previously missing `ajax_get_cpt_data()` + `.sr-btn-edit-cpt` modal hydration in `frontend-cockpit-engine.php` & `frontend-cockpit.js`.
     - Added Tab 6 (`#tab-settings`) + `ajax_save_site_settings()` persisting `sedrazavi_*` options & `theme_mods`.
     - Wired granular Gutenberg block / CPT schema selectors, `design_tokens` injection from DB options, and `sr_cockpit_deployed_kits` option ledger synced across Site Kit install/rollback.
     - Hardened inline lead capture endpoint generated in `src/components/admin/WordPressPackagingAndStudioTab.tsx` (`sedrazavi_verify_public_lead_request`, transient IP rate-limit + honeypot + `private` post status).
  3. **Workstream C — WordPress + WP-CLI + PHP E2E Verification Harness:**
     - Created `docker-compose.test.yml` (MariaDB 10.11 + WordPress 6.7 PHP 8.2 + WP-CLI), `scripts/test-phase2-ecosystem-harness.php`, `scripts/wp-e2e-verify.sh`, and `docs/LIVE_WP_VERIFICATION_GUIDE.md`.
     - Added optional manual `wp-live-e2e` job (`workflow_dispatch` with `run_live_e2e` boolean input) to `.github/workflows/build-and-release.yml`.
  4. **Workstream D — Regression Suites, Packaging & Checksums:**
     - Extended `scripts/test-frontend-management-cockpit.cjs` (Test Group 9) and `scripts/test-portability-lifecycle.cjs` (Test Group 8).
     - Rebuilt bundles (`sync:all`, `build`, `convert-to-standalone-themes.cjs`, `pack-theme-zips.cjs`), regenerated `artifacts/evidence/v31.0.0/checksums.sha256`, and verified `npm run test:all` + `compile_applet` + `lint_applet`.

### 2. Next Phase: Phase 3 — Live PHP + WordPress + Elementor Runtime Execution
1. Run `docker compose -f docker-compose.test.yml up -d db wordpress && docker compose -f docker-compose.test.yml run --rm wpcli /scripts/wp-e2e-verify.sh` in a Docker-enabled host or via GitHub Actions `workflow_dispatch` (`run_live_e2e: true`).
2. Inspect generated `/artifacts/evidence/live-e2e/` outputs, live REST HTTP 401/403/404 status assertions, and Site A -> Site B Elementor editor hydration.
3. Upon clean `wp-e2e-verify.sh` completion in live Docker/CI, promote `VERIFIED` status in `IMPLEMENTATION_STATUS.md`.

### 3. Open Blockers Requiring User / External Environment
- **PHP & Live WordPress Runtime (`BLOCKED`):** Current container lacks `php` CLI (`PHP_NOT_INSTALLED`) and Docker daemon. Live `php -l` syntax sweep, PHP harnesses (`test-phase1-elementor-harness.php`, `test-phase6-independence-harness.php`, `test-phase2-ecosystem-harness.php`), and `wp-e2e-verify.sh` require Docker / PHP 8.2 + WordPress execution.
