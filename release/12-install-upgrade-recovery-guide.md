# Install, Upgrade, Standalone Portability & Recovery Guide (v31.0.0)

> **Target Versions:** WordPress `>= 6.0` (Recommended `6.4–6.7`), PHP `>= 7.4` (Recommended `8.0–8.3`), Elementor `>= 3.10` (Free supported via `Theme_Builder_Bridge`; Pro optional).

---

## 1. Clean WordPress Installation Order

1. **Upload & Activate Theme (Pick One Autonomous Package):**
   - Master Theme: `public/sedrazavi-theme.zip`
   - Dedicated Designer Theme: `public/sedrazavi-designer-theme.zip` (or bundled `sedrazavi-designer-bundle.zip`)
   - Or any 1 of the 8 standalone vertical themes under `public/themes/sedrazavi-*-theme.zip` (**100% standalone — do NOT install `sedrazavi-theme` as parent**).
2. **Install & Activate Core Plugins:**
   - Upload `public/elementor-addon-suite.zip` (requires Elementor Free active for Elementor widget/template import; degrades safely if deactivated).
   - Upload `public/sedrazavi-companion.zip` (provides Frontend Cockpit Engine, Legal Intake/Portal workflows, Demo Importer & Library Engine).
   - Upload `public/sedrazavi-addons.zip` (optional vertical specializations).
3. **Sync Design Tokens & Import Templates:**
   - Open **Elementor Suite -> Settings -> Sync Active Kit Tokens** (or import via Companion Demo Importer).
   - Verify Elementor Active Kit contains `Vazirmatn` typography and sovereign color palette variables.

---

## 2. Upgrade Procedure from Prior Versions

1. **Pre-Upgrade Backup:**
   - Export WordPress database (`wp db export backup-pre-v31.sql`) and copy `wp-content/uploads/`.
   - Package Manager automatically snapshots target folders before overwriting during package installation.
2. **Verify Archive Integrity Before Upload:**
   ```bash
   sha256sum -c artifacts/evidence/v31.0.0/checksums.sha256
   ```
3. **Replace Plugin & Theme Archives Atomically:**
   - Use WordPress **Plugins -> Add New -> Upload Plugin -> Replace current with uploaded** (or WP-CLI `wp plugin install <zip> --force --activate`).
   - Run `wp elementor flush_css` (or use **Elementor -> Tools -> Regenerate CSS & Data**) so upgraded CSS tokens & Flexbox templates render immediately.
4. **Upgrade Compatibility Notes (v30 -> v31):**
   - `wordpress-theme/inc/frontend-cockpit-engine.php` is now a backward-compatibility adapter delegating to `sedrazavi-companion/includes/class-frontend-cockpit.php`. Keeping both updated prevents duplicate class redeclaration.
   - Confidential CPT `sedrazavi_case` enforces `private` status and dedicated legal capabilities (`sedrazavi_manage_cases`, `view_sedrazavi_cases`); verify lawyer accounts carry the `sedrazavi_lawyer` role if migrating from older `edit_posts`-based roles.

---

## 3. Atomic Rollback & Recovery Procedures

### A. Package Manager Atomic Rollback (Custom Kits)
- Every package imported via `UniversalElementorSuite\Package_Manager` stores a pre-import backup state and per-file SHA-256 checksums (`uas_bundle_integrity_<slug>`).
- If checksum verification or dependency resolution fails, `Package_Installer::rollback_package_installation()` automatically restores the pre-overwrite backup and deletes transient caches.
- To roll back imported `elementor_library` posts programmatically, invoke `Template_Importer::rollback_imported_batch($post_ids)`.

### B. Clean Zero-Residue Uninstall
- By default, uninstalling `elementor-addon-suite` preserves imported user templates unless `uas_delete_templates_on_uninstall` is explicitly enabled in settings (preventing accidental loss of customized user pages).
- Each plugin (`elementor-addon-suite`, `sedrazavi-addons`, `sedrazavi-companion`, `sedrazavi-designer-core`) ships a multisite-aware `uninstall.php` iterating across network blogs (`switch_to_blog`) when `is_multisite()` is enabled.

### C. Emergency Recovery (White Screen / Plugin Conflict)
1. Rename or deactivate conflicting plugin via WP-CLI or SFTP (`wp plugin deactivate elementor-addon-suite`).
2. `wordpress-theme`, `sedrazavi-theme`, and all 8 `standalone-themes` wrap Elementor calls in `did_action('elementor/loaded')` and `sedrazavi_standalone_try_render_elementor()` guards, falling back cleanly to native PHP templates with zero Fatal Errors.

---

## 4. Executing Full Live PHP & WordPress Docker Verification

In a Docker-enabled host with PHP 8.2+ and WP-CLI:

```bash
# 1. Verify archive checksums
sha256sum -c artifacts/evidence/v31.0.0/checksums.sha256

# 2. Boot ephemeral WordPress + MariaDB + WP-CLI test stack & run wp-e2e-verify.sh
docker compose -f docker-compose.test.yml up --build --abort-on-container-exit
```
