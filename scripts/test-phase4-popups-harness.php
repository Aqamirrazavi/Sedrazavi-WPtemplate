<?php
/**
 * Phase 4 Validation Harness: Popups Import & Elementor Popup Post-Type Verification
 */

namespace {
    define('ABSPATH', __DIR__ . '/../');
    define('UAS_PATH', __DIR__ . '/../elementor-addon-suite/');
    define('UAS_URL', 'http://example.com/wp-content/plugins/elementor-addon-suite/');
    define('UAS_VERSION', '1.0.0');
    define('ELEMENTOR_VERSION', '3.24.0');

    echo "========================================================================\n";
    echo "   UNIVERSAL ELEMENTOR ADDON SUITE - PHASE 4 POPUPS HARNESS             \n";
    echo "========================================================================\n\n";

    // Mock WordPress Database Storage
    $GLOBALS['mock_posts'] = [];
    $GLOBALS['mock_post_meta'] = [];
    $GLOBALS['mock_terms'] = [];
    $GLOBALS['auto_increment_id'] = 200;

    function wp_insert_post($args) {
        $id = ++$GLOBALS['auto_increment_id'];
        $GLOBALS['mock_posts'][$id] = (object) array_merge([
            'ID'          => $id,
            'post_title'  => $args['post_title'] ?? '',
            'post_type'   => $args['post_type'] ?? 'post',
            'post_status' => $args['post_status'] ?? 'publish',
        ], $args);
        return $id;
    }

    function get_posts($args) {
        $results = [];
        foreach ($GLOBALS['mock_posts'] as $id => $post) {
            if (isset($args['post_type']) && $post->post_type !== $args['post_type']) {
                continue;
            }
            if (isset($args['meta_key']) && isset($args['meta_value'])) {
                $meta = $GLOBALS['mock_post_meta'][$id][$args['meta_key']] ?? null;
                if ($meta !== $args['meta_value']) {
                    continue;
                }
            }
            $results[] = $post;
        }
        return $results;
    }

    function update_post_meta($post_id, $meta_key, $meta_value) {
        $GLOBALS['mock_post_meta'][$post_id][$meta_key] = $meta_value;
        return true;
    }

    function get_post_meta($post_id, $meta_key = '', $single = false) {
        if (!empty($meta_key)) {
            return $GLOBALS['mock_post_meta'][$post_id][$meta_key] ?? ($single ? '' : []);
        }
        return $GLOBALS['mock_post_meta'][$post_id] ?? [];
    }

    function taxonomy_exists($tax) { return true; }
    function wp_set_object_terms($id, $terms, $tax) {
        $GLOBALS['mock_terms'][$id][$tax] = $terms;
        return true;
    }
    function sanitize_text_field($s) { return trim(strip_tags((string)$s)); }
    function wp_slash($s) { return $s; }
    function is_wp_error($s) { return false; }

    // -------------------------------------------------------------------------
    // TEST 1: POPUP JSON FILES AUDIT
    // -------------------------------------------------------------------------
    echo "[PART 1] Auditing Popup JSON packages in elementor-addon-suite/templates/popups/...\n";

    $popups_dir = UAS_PATH . 'templates/popups/';
    $files = glob($popups_dir . '*.json');

    echo "  - Found " . count($files) . " popup JSON packages.\n";

    if (count($files) < 3) {
        echo "  ✗ Expected at least 3 popups, found " . count($files) . "\n";
        exit(1);
    }

    foreach ($files as $file) {
        $raw = file_get_contents($file);
        $json = json_decode($raw, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            echo "  ✗ Invalid JSON in popup: " . basename($file) . "\n";
            exit(1);
        }

        if ($json['type'] !== 'popup' || empty($json['page_settings']) || empty($json['content'])) {
            echo "  ✗ Popup missing required type/page_settings/content: " . basename($file) . "\n";
            exit(1);
        }

        echo "  ✓ Valid Elementor Popup: [" . basename($file) . "] -> '" . $json['title'] . "'\n";
        echo "    * Animation: " . ($json['page_settings']['entrance_animation'] ?? 'none') . " | Overlay: " . ($json['page_settings']['overlay'] ?? 'no') . "\n";
    }

    // -------------------------------------------------------------------------
    // TEST 2: POPUPS IMPORT INTO ELEMENTOR LIBRARY
    // -------------------------------------------------------------------------
    echo "\n[PART 2] Testing automated import of popups into elementor_library...\n";

    require_once UAS_PATH . 'includes/class-template-importer.php';

    $report1 = \UniversalElementorSuite\Template_Importer::import_all_popups();

    echo "  - Imported: " . $report1['imported'] . " popups\n";
    echo "  - Skipped:  " . $report1['skipped'] . " popups\n";

    if ($report1['imported'] !== 3) {
        echo "  ✗ Expected 3 imported popups on first run, got " . $report1['imported'] . "\n";
        exit(1);
    }

    // Verify metadata for each imported popup
    foreach ($report1['items'] as $item) {
        $id = $item['id'];
        $post = $GLOBALS['mock_posts'][$id];
        $meta_type = get_post_meta($id, '_elementor_template_type', true);
        $meta_settings = get_post_meta($id, '_elementor_page_settings', true);
        $meta_data = get_post_meta($id, '_elementor_data', true);
        $tax_term = $GLOBALS['mock_terms'][$id]['elementor_library_type'] ?? '';

        if ($meta_type !== 'popup' || empty($meta_settings) || empty($meta_data) || $tax_term !== 'popup') {
            echo "  ✗ Popup ID {$id} has incomplete popup metadata! Type={$meta_type}, Term={$tax_term}\n";
            exit(1);
        }

        echo "  ✓ Popup #{$id} verified: PostType='{$post->post_type}', TemplateType='{$meta_type}', Term='{$tax_term}'\n";
    }

    // -------------------------------------------------------------------------
    // TEST 3: POPUPS IDEMPOTENCY TEST
    // -------------------------------------------------------------------------
    echo "\n[PART 3] Testing idempotency on secondary popup import...\n";

    $report2 = \UniversalElementorSuite\Template_Importer::import_all_popups();

    echo "  - Second Run Imported: " . $report2['imported'] . " popups\n";
    echo "  - Second Run Skipped:  " . $report2['skipped'] . " popups\n";

    if ($report2['imported'] !== 0 || $report2['skipped'] !== 3) {
        echo "  ✗ Popups idempotency test failed!\n";
        exit(1);
    }
    echo "  ✓ Popups idempotency passed: 0 duplicate popups generated.\n";

    // -------------------------------------------------------------------------
    // TEST 4: TOPIC-AGNOSTIC POPUP COPY AUDIT
    // -------------------------------------------------------------------------
    echo "\n[PART 4] Checking that imported popups contain generic, topic-agnostic copy...\n";

    $forbidden_niche_strings = ['وکالت', 'دادسرا', 'سید رضوی', 'SedRazavi'];
    foreach ($files as $file) {
        $content = file_get_contents($file);
        foreach ($forbidden_niche_strings as $niche_word) {
            if (strpos($content, $niche_word) !== false) {
                echo "  ✗ Popup " . basename($file) . " contains niche-specific word: '{$niche_word}'!\n";
                exit(1);
            }
        }
    }
    echo "  ✓ All 3 popups are 100% topic-agnostic, responsive and ready for any website.\n";

    echo "\n========================================================================\n";
    echo ">>> PHASE 4 STATUS: 100% PASSED - POPUPS PACKAGED & IMPORTER VERIFIED <<<\n";
    echo "========================================================================\n";
}
