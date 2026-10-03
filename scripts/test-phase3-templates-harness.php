<?php
/**
 * Phase 3 Validation Harness: Saved Templates Import & Idempotency Testing
 */

namespace {
    define('ABSPATH', __DIR__ . '/../');
    define('UAS_PATH', __DIR__ . '/../elementor-addon-suite/');
    define('UAS_URL', 'http://example.com/wp-content/plugins/elementor-addon-suite/');
    define('UAS_VERSION', '1.0.0');
    define('ELEMENTOR_VERSION', '3.24.0');

    echo "========================================================================\n";
    echo "   UNIVERSAL ELEMENTOR ADDON SUITE - PHASE 3 TEMPLATES HARNESS          \n";
    echo "========================================================================\n\n";

    // Mock WordPress Database Storage
    $GLOBALS['mock_posts'] = [];
    $GLOBALS['mock_post_meta'] = [];
    $GLOBALS['mock_terms'] = [];
    $GLOBALS['auto_increment_id'] = 100;

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
    // TEST 1: TEMPLATE JSON FILES INSPECTION
    // -------------------------------------------------------------------------
    echo "[PART 1] Scanning and validating template JSON files in elementor-addon-suite/templates/...\n";

    $template_dir = UAS_PATH . 'templates/';
    $files = glob($template_dir . '*.json');

    echo "  - Found " . count($files) . " template JSON packages.\n";

    if (count($files) < 5) {
        echo "  ✗ Expected at least 5 templates, found " . count($files) . "\n";
        exit(1);
    }

    foreach ($files as $file) {
        $raw = file_get_contents($file);
        $json = json_decode($raw, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            echo "  ✗ Invalid JSON in file: " . basename($file) . " (" . json_last_error_msg() . ")\n";
            exit(1);
        }

        if (empty($json['title']) || empty($json['content']) || empty($json['type'])) {
            echo "  ✗ Template missing required Elementor schema: " . basename($file) . "\n";
            exit(1);
        }

        echo "  ✓ Valid Elementor JSON: [" . basename($file) . "] -> '" . $json['title'] . "' (Type: " . $json['type'] . ")\n";
    }

    // -------------------------------------------------------------------------
    // TEST 2: AUTOMATIC IMPORT INTO SAVED TEMPLATES
    // -------------------------------------------------------------------------
    echo "\n[PART 2] Testing initial template import into Elementor Saved Templates (elementor_library)...\n";

    require_once UAS_PATH . 'includes/class-template-importer.php';

    $report1 = \UniversalElementorSuite\Template_Importer::import_all_templates();

    echo "  - Imported: " . $report1['imported'] . " templates\n";
    echo "  - Skipped:  " . $report1['skipped'] . " templates\n";

    if ($report1['imported'] !== 5) {
        echo "  ✗ Expected 5 imported templates on first run, got " . $report1['imported'] . "\n";
        exit(1);
    }

    // Verify metadata for each imported template
    foreach ($report1['items'] as $item) {
        $id = $item['id'];
        $post = $GLOBALS['mock_posts'][$id];
        $meta_edit = get_post_meta($id, '_elementor_edit_mode', true);
        $meta_type = get_post_meta($id, '_elementor_template_type', true);
        $meta_data = get_post_meta($id, '_elementor_data', true);
        $meta_slug = get_post_meta($id, '_uas_template_slug', true);

        if ($post->post_type !== 'elementor_library' || $meta_edit !== 'builder' || empty($meta_data)) {
            echo "  ✗ Template ID {$id} has incomplete Elementor metadata!\n";
            exit(1);
        }

        echo "  ✓ Template #{$id} verified: PostType='{$post->post_type}', EditMode='{$meta_edit}', Type='{$meta_type}', Slug='{$meta_slug}'\n";
    }

    // -------------------------------------------------------------------------
    // TEST 3: IDEMPOTENCY TEST (PREVENT DUPLICATES)
    // -------------------------------------------------------------------------
    echo "\n[PART 3] Testing idempotency on secondary import (preventing duplicate templates)...\n";

    $report2 = \UniversalElementorSuite\Template_Importer::import_all_templates();

    echo "  - Second Run Imported: " . $report2['imported'] . " templates\n";
    echo "  - Second Run Skipped:  " . $report2['skipped'] . " templates\n";

    if ($report2['imported'] !== 0 || $report2['skipped'] !== 5) {
        echo "  ✗ Idempotency test failed! Duplicate templates would be generated.\n";
        exit(1);
    }
    echo "  ✓ Idempotency test passed: 0 duplicate templates created.\n";

    // -------------------------------------------------------------------------
    // TEST 4: TOPIC-AGNOSTIC CONTENT CHECK
    // -------------------------------------------------------------------------
    echo "\n[PART 4] Checking that imported templates contain generic, topic-agnostic copy...\n";

    $forbidden_niche_strings = ['وکالت', 'دادسرا', 'سید رضوی', 'SedRazavi', 'پرونده قضایی'];
    foreach ($files as $file) {
        $content = file_get_contents($file);
        foreach ($forbidden_niche_strings as $niche_word) {
            if (strpos($content, $niche_word) !== false) {
                echo "  ✗ Template " . basename($file) . " contains niche-specific word: '{$niche_word}'!\n";
                exit(1);
            }
        }
    }
    echo "  ✓ All 5 templates are 100% topic-agnostic and ready for any business or blog.\n";

    echo "\n========================================================================\n";
    echo ">>> PHASE 3 STATUS: 100% PASSED - TEMPLATES PACKAGED & IMPORTER VERIFIED <<<\n";
    echo "========================================================================\n";
}
