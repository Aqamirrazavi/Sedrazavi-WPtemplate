# P0/P1 Audit Defect & Remediation Ledger — SedRazavi Ecosystem

This ledger traces every security, data-integrity, packaging, and documentation defect identified in code audit, its exact remediation, and reproducible verification status.

---

## Defect 1 (P0) — Excessive `edit_posts` Permission & IDOR on `/cases` Endpoints

- **Affected Files & Symbols:**
  - `wordpress-theme/inc/rest-api.php`: `SedRazavi_REST_API::check_lawyer_or_admin_permission()`, `handle_get_cases()`, `handle_dashboard_stats()`, `handle_cases_timeline()`, `handle_lawyer_notifications()`, `handle_lawyer_export_csv()`
  - `wordpress-theme/inc/wp-rest-auth.php`: `SedRazavi_WP_REST_Auth::check_case_access_permission()`, `handle_get_current_user()`, `handle_get_secure_cases()`, `handle_get_secure_case_detail()`
  - `wordpress-theme/inc/class-sedrazavi-dashboard.php`: `check_staff_permission()`, `rest_get_cases()`
  - `wordpress-theme/inc/class-sedrazavi-client-portal.php`: `verify_portal_access()`
  - `wordpress-theme/page-dashboard.php`, `wordpress-theme/page-template-dashboard.php`, `sedrazavi-addons/includes/class-sedrazavi-odr-arbitration.php`
- **Root Cause:** Permission callbacks relied on generic WordPress `current_user_can('edit_posts')` (which Contributors and Authors hold by default), and `handle_get_cases()` queried all cases globally without filtering by per-object ownership.
- **Remediation:**
  1. Created `SedRazavi_Case_Data_Service` (`wordpress-theme/inc/class-case-data-service.php`) and `sedrazavi_lawyer` role (`wordpress-theme/inc/user-roles.php`) granting dedicated legal capabilities (`sedrazavi_manage_cases`, `sedrazavi_view_cases`, `sedrazavi_view_all_cases`, `sedrazavi_create_cases`, and CPT primitive caps `*_sedrazavi_case(s)`).
  2. Removed `edit_posts` from all legal dossier authorization checks across REST, AJAX, and dashboard templates; added `check_cases_read_permission()` and per-object filtering via `SedRazavi_Case_Data_Service::can_user_access_case($post, $uid)`.
  3. Non-privileged callers and Contributors without explicit legal capabilities receive `403`, and scoped client/counsel callers only retrieve dossiers matching `post_author`, `_sedrazavi_assigned_lawyer_id`, `_sedrazavi_client_user_id`, `_client_user_id`, or `_sedrazavi_assigned_case_id`.
- **Verification:** Verified via `scripts/test-mandatory-audit-remediation.cjs` (Test Group 11) and `scripts/test-phase4.php` (`php -l` / WP live execution deferred until PHP/Docker host).

---

## Defect 2 (P0) — Confidential Case CPT Slug Split & Fragmented Registration

- **Affected Files & Symbols:**
  - `wordpress-theme/functions.php` (`sedrazavi_register_custom_post_types`)
  - `wordpress-theme/inc/case-management.php` (`sedrazavi_register_case_cpt`)
  - `sedrazavi-addons/includes/post-types.php` (`sedrazavi_addons_register_post_types`)
  - `elementor-addon-suite/includes/class-dynamic-query-engine.php` (`execute_query`)
- **Root Cause:** `functions.php` registered CPT `'case'` while `case-management.php`, `sedrazavi-addons`, and REST endpoints registered/queried `'sedrazavi_case'`. Additionally, `Dynamic_Query_Engine` only guarded `'case'`, not `'sedrazavi_case'`.
- **Remediation:**
  1. Consolidated canonical CPT `'sedrazavi_case'` into `SedRazavi_Case_Data_Service::register_canonical_case_cpt()` with custom `capability_type => ['sedrazavi_case', 'sedrazavi_cases']` and `map_meta_cap => true`.
  2. Preserved `'case'` in `functions.php` strictly as a hidden (`show_ui => false`, `public => false`, `show_in_rest => false`) backward-compatible read alias, while read helpers query `['sedrazavi_case', 'case']`.
  3. Hardened `Dynamic_Query_Engine::execute_query()` to block `['case', 'sedrazavi_case', 'arbitration_case', 'sedrazavi_dashboard']` unless caller holds `manage_options` or `sedrazavi_manage_cases` / `sedrazavi_view_all_cases`.
- **Verification:** Static AST assertions in `scripts/test-mandatory-audit-remediation.cjs` & `scripts/test-inc-completeness.cjs`.

---

## Defect 3 (P0) — Newly Created Confidential Cases Saved as `post_status => 'publish'`

- **Affected Files & Symbols:**
  - `wordpress-theme/inc/rest-api.php`: `handle_create_case()`, `handle_track_case()`, `handle_get_cases()`, `handle_dashboard_stats()`, `handle_cases_timeline()`
  - `wordpress-theme/inc/case-management.php`: `sedrazavi_ajax_track_case()`
  - `wordpress-theme/inc/analytics-reports.php`: `sedrazavi_get_kpi_metrics()`
  - `sedrazavi-addons/sedrazavi-addons.php`: `sedrazavi_api_track_case_handler()`
- **Root Cause:** `handle_create_case()` inserted confidential cases with `'post_status' => 'publish'`, and tracking/dashboard queries queried `'post_status' => 'publish'`.
- **Remediation:** Changed `handle_create_case()` to `'post_status' => 'private'` with explicit `post_author`, `_sedrazavi_assigned_lawyer_id`, and optional `_sedrazavi_client_user_id` / `_client_user_id`; updated all case queries and counters across theme + `sedrazavi-addons` to read `['private', 'publish']` (backward-compatible with legacy records).

---

## Defect 4 (P1) — Runtime Version Matrix Inconsistency

- **Affected Files:** `README.md`, `wordpress-theme/style.css`, `wordpress-theme/readme.txt`, `wordpress-theme/README.md`, `elementor-addon-suite/elementor-addon-suite.php`, `sedrazavi-addons/sedrazavi-addons.php`, `sedrazavi-companion/sedrazavi-companion.php`, `Package_Registry`, `Package_Exporter`
- **Root Cause:** Headers mixed `WP 5.8`, `WP 6.0`, `WP 6.4–6.7` and `PHP 7.4` vs `PHP 8.0–8.3`.
- **Remediation:** Standardized all headers and documentation onto an explicit two-tier contract: **Minimum Baseline (`PHP >= 7.4`, `WordPress >= 6.0`)** and **Recommended / CI Target (`PHP 8.0–8.3`, `WordPress 6.4–6.7`, `Elementor >= 3.20`)**.

---

## Defect 5 & 6 (P1) — Artifact Transparency & Live WordPress Test Honesty

- **Affected Files:** `docs/BUILD_AND_ARTIFACT_POLICY.md`, `README.md`, `IMPLEMENTATION_STATUS.md`, `PHASE_HANDOFF.md`
- **Remediation:** Documented exact Source-vs-Generated boundaries for `public/app-dist/`, `wordpress-theme/app-dist/`, `standalone-themes/`, and `*.zip` packages; maintained strict `BLOCKED (PHP_NOT_INSTALLED)` honesty for PHP CLI (`php -l`) and Docker live WordPress E2E execution until run on a host with PHP 8.x + Docker.

---

## Defect 7 (P0 CI) — GitHub Actions Phase 12 SHA-256 Checksum Mismatches (`20 / 25`)

- **Affected Files:** `scripts/pack-theme-zips.cjs`, `artifacts/evidence/v31.0.0/checksums.sha256`
- **Root Cause:** `JSZip.file()` used live wall-clock timestamps and unsorted `fs.readdirSync()` traversal order, causing every CI run of `pack-theme-zips.cjs` to produce ZIPs whose SHA-256 differed from committed digests even when source files were identical.
- **Remediation:** Pinned `DETERMINISTIC_ZIP_DATE` (`2026-01-01T00:00:00Z`), sorted all directory/buffer keys prior to compression, disabled non-deterministic folder entries, and regenerated deterministic SHA-256 digests verified across repeated builds.

---

## Defect 8 (P1 Evidence) — Widget Usage Count Drift (`18` vs `24`), Missing `OPTIONAL_PRO` Flags & Inflated `VERIFIED` CSV Statuses

- **Affected Files:** `scripts/audit-reconcile-evidence.cjs`, `artifacts/evidence/v31.0.0/*-verification.csv`, `qa/*-verification.csv`, `docs/PHASE0_AUDIT_AND_V29_CROSSWALK.md`
- **Root Cause:** Verification CSVs contained stale hand-typed `widget_ids` claiming 24 used custom widgets, marked Pro Theme Builder JSONs as `pro_required = NO`, and labeled static Node checks as `editor_test = PASS`, `status = VERIFIED`.
- **Remediation:** Created `scripts/audit-reconcile-evidence.cjs` (`--check` integrated into `npm run test:all`) to compute exact widget usage (`18/31` across `29/33` JSONs, `13/31` unused in JSONs), flag `4` Theme Builder JSONs as `OPTIONAL_PRO`, and enforce strict `STATICALLY_CHECKED` vs `NOT_RUN` labels.

