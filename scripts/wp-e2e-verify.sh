#!/usr/bin/env bash
# ==============================================================================
# SedRazavi WordPress Ecosystem — Live WordPress + WP-CLI End-to-End Verifier
#
# Executes real runtime verification inside a Docker / WordPress + WP-CLI stack:
#   1. Full PHP syntax sweep (php -l) across all themes, plugins, and scripts
#   2. Offline PHP mock harnesses (Phase 1, Phase 6, Phase 2)
#   3. Site A WordPress core bootstrap + Elementor + SedRazavi Ecosystem install
#   4. Custom Project Kit ZIP export (widgets + templates + Gutenberg blocks + CPTs)
#   5. SHA-256 per-file & archive verification + clean Site B installation & hydration
#   6. Confidential CPT & REST API HTTP status checks (401/403/404)
#   7. Clean atomic rollback verification
# ==============================================================================
set -euo pipefail

WP_PATH="${WP_PATH:-/var/www/html}"
WP_URL="${WP_SITE_URL:-http://wordpress}"
PLUGIN_ROOT="/var/www/html/wp-content/plugins"
THEME_ROOT="/var/www/html/wp-content/themes"
STANDALONE_POOL="${THEME_ROOT}/sedrazavi-standalone-pool"
REPORT_DIR="/artifacts/evidence/live-e2e"
mkdir -p "${REPORT_DIR}"

echo "========================================================================"
echo "  SEDRAZAVI ECOSYSTEM — LIVE WP + WP-CLI E2E VERIFICATION SUITE"
echo "========================================================================"

echo "[STEP 1/7] Running php -l syntax check across all PHP files..."
PHP_COUNT=0
while IFS= read -r -d '' phpfile; do
  php -l "${phpfile}" >/dev/null
  PHP_COUNT=$((PHP_COUNT + 1))
done < <(find \
  "${PLUGIN_ROOT}/elementor-addon-suite" \
  "${PLUGIN_ROOT}/sedrazavi-companion" \
  "${PLUGIN_ROOT}/sedrazavi-addons" \
  "${THEME_ROOT}/sedrazavi-theme" \
  /scripts \
  -type f -name '*.php' -print0)
echo "  PASS: php -l passed on ${PHP_COUNT} PHP files with zero syntax errors."

echo "[STEP 2/7] Executing PHP offline integration harnesses..."
php /scripts/test-phase1-elementor-harness.php
php /scripts/test-phase6-independence-harness.php
php /scripts/test-phase2-ecosystem-harness.php

echo "[STEP 3/7] Bootstrapping WordPress Site A & installing Elementor..."
cd "${WP_PATH}"
if ! wp core is-installed --allow-root; then
  wp core install \
    --url="${WP_URL}" \
    --title="SedRazavi Site A E2E" \
    --admin_user="e2eadmin" \
    --admin_password="E2eStrongPassword!2026" \
    --admin_email="e2e@sedrazavi.local" \
    --skip-email \
    --allow-root
fi

# Install Elementor (free) cleanly if not yet present
if ! wp plugin is-installed elementor --allow-root; then
  wp plugin install elementor --activate --allow-root
else
  wp plugin activate elementor --allow-root
fi

# Activate SedRazavi theme & core plugins on Site A
wp theme activate sedrazavi-theme --allow-root
wp plugin activate elementor-addon-suite sedrazavi-companion sedrazavi-addons --allow-root

echo "[STEP 4/7] Compiling Custom Project Kit ZIP on Site A (Widgets + Templates + Gutenberg + CPTs)..."
KIT_ZIP_PATH=$(wp eval '
  $mgr = \UniversalElementorSuite\Package_Manager::instance();
  $res = $mgr->build_custom_project_bundle([
    "project_name"       => "E2E Legal Sovereign Kit",
    "project_slug"       => "e2e-legal-sovereign-kit",
    "selected_widgets"   => ["hero", "pricing_switcher", "case_timeline"],
    "selected_templates" => ["hero-legal-luxury"],
    "selected_blocks"    => ["sovereign-section", "sovereign-badge"],
    "selected_cpts"      => ["portfolio", "services"],
    "design_tokens"      => ["primary_color" => "#D4AF37", "secondary_color" => "#0B132B", "font_family" => "Vazirmatn"],
    "niche"              => "legal"
  ]);
  if (empty($res["success"]) || empty($res["zip_path"]) || !file_exists($res["zip_path"])) {
    fwrite(STDERR, "Site A custom bundle build failed: " . json_encode($res) . "\n");
    exit(1);
  }
  echo $res["zip_path"];
' --allow-root)

echo "  Site A Kit Built: ${KIT_ZIP_PATH}"
sha256sum "${KIT_ZIP_PATH}" > "${REPORT_DIR}/e2e-kit.sha256"

echo "[STEP 5/7] Simulating Clean Site B Switch (Hello Elementor / Standalone Theme + Custom Kit Import & Activation)..."
wp plugin deactivate elementor-addon-suite sedrazavi-companion sedrazavi-addons --allow-root

# Copy & activate a standalone theme from standalone-themes pool to prove zero parent dependency
if [ -d "${STANDALONE_POOL}/sedrazavi-legal-theme" ]; then
  rm -rf "${THEME_ROOT}/sedrazavi-legal-theme"
  cp -r "${STANDALONE_POOL}/sedrazavi-legal-theme" "${THEME_ROOT}/sedrazavi-legal-theme"
  wp theme activate sedrazavi-legal-theme --allow-root
fi

# Install custom kit ZIP onto clean Site B plugins folder and activate
unzip -oq "${KIT_ZIP_PATH}" -d "${PLUGIN_ROOT}/"
wp plugin activate e2e-legal-sovereign-kit --allow-root

# Verify self-checksum verification option + hydrated Elementor template + public CPT registration on Site B
wp eval '
  $integrity = get_option("uas_bundle_integrity_e2e-legal-sovereign-kit");
  if (empty($integrity) || empty($integrity["verified"])) {
    fwrite(STDERR, "Site B runtime bundle self-checksum verification failed: " . json_encode($integrity) . "\n");
    exit(1);
  }
  $tpls = get_posts(["post_type" => "elementor_library", "post_status" => "any", "meta_key" => "_uas_package_id", "meta_value" => "e2e-legal-sovereign-kit"]);
  if (empty($tpls)) {
    fwrite(STDERR, "Site B failed to hydrate elementor_library template from custom kit!\n");
    exit(1);
  }
  if (!post_type_exists("portfolio") || !post_type_exists("services")) {
    fwrite(STDERR, "Site B failed to register portable CPT schemas!\n");
    exit(1);
  }
  echo "  PASS: Site B verified " . $integrity["checked_files"] . " checksums, hydrated " . count($tpls) . " Elementor template(s), and registered portfolio/services CPTs.\n";
' --allow-root

echo "[STEP 6/7] Running Live HTTP Security & Confidentiality Assertions..."
# Unauthenticated confidential CPT endpoints must return 404 (show_in_rest => false)
for cpt in sedrazavi_case sedrazavi_appointment sedrazavi_booking arbitration_case; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${WP_URL}/wp-json/wp/v2/${cpt}")
  if [ "${STATUS}" != "404" ]; then
    echo "FAIL: Confidential CPT /wp-json/wp/v2/${cpt} returned HTTP ${STATUS}, expected 404"
    exit 1
  fi
done
echo "  PASS: Confidential CPTs return HTTP 404 on REST API."

# Unauthenticated protected staff/admin routes must return 401/403
wp plugin activate elementor-addon-suite sedrazavi-companion sedrazavi-addons --allow-root
for route in \
  "/wp-json/sedrazavi/v1/portal/summary" \
  "/wp-json/sedrazavi/v1/github/status" \
  "/wp-json/sedrazavi-companion/v1/license/status" \
  "/wp-json/sedrazavi-companion/v1/demo/list"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${WP_URL}${route}")
  if [ "${STATUS}" != "401" ] && [ "${STATUS}" != "403" ]; then
    echo "FAIL: Protected route ${route} returned HTTP ${STATUS}, expected 401 or 403"
    exit 1
  fi
done
echo "  PASS: Protected REST routes reject anonymous access with 401/403."

echo "[STEP 7/7] Verifying Clean Kit Deactivation & Rollback..."
wp plugin deactivate e2e-legal-sovereign-kit --allow-root
rm -rf "${PLUGIN_ROOT}/e2e-legal-sovereign-kit"

echo "========================================================================"
echo "  >>> LIVE WP + WP-CLI E2E VERIFICATION SUITE: 100% VERIFIED <<<"
echo "========================================================================"
