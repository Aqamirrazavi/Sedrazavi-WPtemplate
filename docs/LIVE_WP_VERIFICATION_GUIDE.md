# Live WordPress + WP-CLI Verification Guide

This guide explains how to execute the automated Phase 2/3 verification suite against a real **PHP 8.2 + MariaDB 10.11 + WordPress 6.7 + Elementor** environment so modules can transition from `TESTED (Node Static)` to `VERIFIED (Live WordPress)`.

---

## 1. Local Docker Execution (Recommended)

### Prerequisites
- Docker Engine & Docker Compose (`docker compose v2+`)
- Fresh build artifacts (`npm run build && node scripts/convert-to-standalone-themes.cjs`)

### Run Full Live E2E Suite
```bash
# 1. Start isolated MariaDB + WordPress 6.7 container stack
docker compose -f docker-compose.test.yml up -d db wordpress

# 2. Wait until WordPress healthcheck passes, then execute full WP-CLI E2E verification
docker compose -f docker-compose.test.yml run --rm wpcli /scripts/wp-e2e-verify.sh

# 3. Clean up containers & volumes after inspection
docker compose -f docker-compose.test.yml down -v
```

### What `wp-e2e-verify.sh` Verifies
1. **`php -l` Syntax Sweep:** Parses every `.php` file in `elementor-addon-suite/`, `sedrazavi-companion/`, `sedrazavi-addons/`, `wordpress-theme/`, and `scripts/`.
2. **Offline PHP Harnesses:** Runs `test-phase1-elementor-harness.php`, `test-phase6-independence-harness.php`, and `test-phase2-ecosystem-harness.php`.
3. **Site A Clean Install & Custom Kit Compilation:** Installs WordPress + Elementor via WP-CLI, activates the suite, and exports a Custom Project Kit ZIP containing widgets, templates, Gutenberg blocks (`sovereign-section`, `sovereign-badge`), public CPT schemas (`portfolio`, `services`), and design tokens.
4. **Site B Clean Transfer & Hydration:** Deactivates the full suite, switches to an autonomous standalone theme (`sedrazavi-legal-theme`), unzips and activates ONLY the exported Custom Project Kit plugin, and asserts:
   - Runtime SHA-256 `uas_bundle_integrity_*` self-verification passes (`verified === true`).
   - Elementor Library (`elementor_library`) hydrates imported templates with `_uas_package_id`.
   - Public portable CPTs (`portfolio`, `services`) are registered cleanly.
5. **REST API Security Smoke Tests:** Asserts HTTP `404` on confidential CPT REST routes (`sedrazavi_case`, `sedrazavi_appointment`, `sedrazavi_booking`, `arbitration_case`) and HTTP `401`/`403` on protected staff/admin endpoints.
6. **Clean Rollback:** Deactivates and cleans up the custom kit plugin without errors.

---

## 2. GitHub Actions Optional Live E2E Job

The workflow at `.github/workflows/build-and-release.yml` preserves the standard `build-and-package` job and adds an optional `wp-live-e2e` job triggered via **Actions -> Run workflow (`workflow_dispatch`)** with `run_live_e2e: true`.
