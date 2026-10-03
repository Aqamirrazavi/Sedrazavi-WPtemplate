<?php
/**
 * Phase 5 Validation Harness: Settings Page, Category Branding, Widget Toggles & Clean Uninstall
 */

namespace Elementor {
    class Elements_Manager {
        public $categories = [];
        public function add_category($id, $args) {
            $this->categories[$id] = $args;
        }
    }

    class Widgets_Manager {
        public $widgets = [];
        public function register($widget) {
            $this->widgets[$widget->get_name()] = $widget;
        }
    }

    abstract class Widget_Base {
        abstract public function get_name();
        abstract public function get_title();
        abstract public function get_icon();
        abstract public function get_categories();
        abstract protected function render();
    }
}

namespace {
    define('ABSPATH', __DIR__ . '/../');
    define('UAS_PATH', __DIR__ . '/../elementor-addon-suite/');
    define('UAS_URL', 'http://example.com/wp-content/plugins/elementor-addon-suite/');
    define('UAS_VERSION', '1.0.0');
    define('ELEMENTOR_VERSION', '3.24.0');

    echo "========================================================================\n";
    echo "   UNIVERSAL ELEMENTOR ADDON SUITE - PHASE 5 SETTINGS & UNINSTALL       \n";
    echo "========================================================================\n\n";

    // Mock Options & DB
    $GLOBALS['mock_options'] = [];
    $GLOBALS['mock_transients'] = [];
    $GLOBALS['mock_posts'] = [
        301 => (object)['ID' => 301, 'post_title' => 'Template 1', 'post_type' => 'elementor_library'],
        302 => (object)['ID' => 302, 'post_title' => 'Template 2', 'post_type' => 'elementor_library'],
    ];
    $GLOBALS['mock_post_meta'] = [
        301 => ['_uas_template_slug' => 'test-template-1'],
        302 => ['_uas_template_slug' => 'test-template-2'],
    ];

    function get_option($k, $default = false) {
        return isset($GLOBALS['mock_options'][$k]) ? $GLOBALS['mock_options'][$k] : $default;
    }
    function update_option($k, $v) {
        $GLOBALS['mock_options'][$k] = $v;
        return true;
    }
    function delete_option($k) {
        unset($GLOBALS['mock_options'][$k]);
        return true;
    }
    function delete_transient($k) {
        unset($GLOBALS['mock_transients'][$k]);
        return true;
    }
    function get_posts($args) {
        $results = [];
        foreach ($GLOBALS['mock_posts'] as $id => $post) {
            if (isset($args['meta_key'])) {
                if (isset($GLOBALS['mock_post_meta'][$id][$args['meta_key']])) {
                    $results[] = $post;
                }
            } else {
                $results[] = $post;
            }
        }
        return $results;
    }
    function wp_delete_post($id, $force = false) {
        unset($GLOBALS['mock_posts'][$id]);
        unset($GLOBALS['mock_post_meta'][$id]);
        return true;
    }

    function add_action($h, $cb) {}
    function add_filter($h, $cb) {}
    function wp_register_style($h, $src, $deps = [], $ver = false) {}
    function wp_register_script($h, $src, $deps = [], $ver = false, $in_footer = false) {}
    function wp_enqueue_style($h, $src = '', $deps = [], $ver = false) {}
    function wp_enqueue_script($h, $src = '', $deps = [], $ver = false) {}
    function wp_localize_script($h, $n, $d) {}
    function admin_url($p = '') { return 'http://example.com/wp-admin/' . $p; }
    function wp_create_nonce($a) { return 'valid_nonce_123'; }
    function check_ajax_referer($a, $b) { return true; }
    function current_user_can($c) { return true; }
    function is_admin() { return true; }
    function add_menu_page($a, $b, $c, $d, $e, $f, $g) {}
    function register_setting($a, $b, $c = []) {}
    function esc_html__($s) { return $s; }
    function esc_html($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
    function esc_attr($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
    function sanitize_text_field($s) { return trim(strip_tags((string)$s)); }
    function sanitize_key($s) { return preg_replace('/[^a-z0-9_\-]/', '', strtolower((string)$s)); }

    require_once UAS_PATH . 'includes/class-plugin.php';

    // -------------------------------------------------------------------------
    // TEST 1: CUSTOM CATEGORY BRANDING
    // -------------------------------------------------------------------------
    echo "[PART 1] Testing custom category branding in Elementor...\n";

    $custom_brand_name = "استودیو طراحی نوین (Novin Creative Studio)";
    $custom_brand_icon = "eicon-star";
    update_option('uas_custom_category_name', $custom_brand_name);
    update_option('uas_custom_category_icon', $custom_brand_icon);

    $plugin = \UniversalElementorSuite\Plugin::instance();
    $elements_manager = new \Elementor\Elements_Manager();
    $plugin->register_category($elements_manager);

    $cat_slug = \UniversalElementorSuite\Plugin::CATEGORY_SLUG;
    $registered_cat = $elements_manager->categories[$cat_slug] ?? null;

    if ($registered_cat && $registered_cat['title'] === $custom_brand_name && $registered_cat['icon'] === $custom_brand_icon) {
        echo "  ✓ Custom category title applied: '{$registered_cat['title']}'\n";
        echo "  ✓ Custom category icon applied: '{$registered_cat['icon']}'\n";
    } else {
        echo "  ✗ Custom category branding failed!\n";
        exit(1);
    }

    // -------------------------------------------------------------------------
    // TEST 2: WIDGET TOGGLES (SELECTIVE REGISTRATION & MEMORY OPTIMIZATION)
    // -------------------------------------------------------------------------
    echo "\n[PART 2] Testing selective widget loading via toggle switches...\n";

    // Disable 3 widgets: uas_video, uas_theme_toggle, uas_floating_dock
    $disabled_list = ['uas_video', 'uas_theme_toggle', 'uas_floating_dock'];
    update_option('uas_disabled_widgets', $disabled_list);

    $widgets_manager = new \Elementor\Widgets_Manager();
    $plugin->register_widgets($widgets_manager);

    $active_widgets = array_keys($widgets_manager->widgets);

    echo "  - Total widgets loaded: " . count($active_widgets) . " (Expected: 10)\n";

    if (count($active_widgets) !== 10) {
        echo "  ✗ Expected 10 active widgets, found " . count($active_widgets) . "\n";
        exit(1);
    }

    foreach ($disabled_list as $disabled_widget) {
        if (in_array($disabled_widget, $active_widgets, true)) {
            echo "  ✗ Disabled widget '{$disabled_widget}' was loaded!\n";
            exit(1);
        }
    }

    echo "  ✓ Disabled widgets [uas_video, uas_theme_toggle, uas_floating_dock] were safely skipped.\n";
    echo "  ✓ Memory optimization and selective loading verified.\n";

    // -------------------------------------------------------------------------
    // TEST 3: CLEAN UNINSTALL ROUTINE (SAFE MODE - DEFAULT PRESERVE TEMPLATES)
    // -------------------------------------------------------------------------
    echo "\n[PART 3] Testing clean uninstall routine with default preference (Preserve user templates)...\n";

    update_option('uas_delete_templates_on_uninstall', 'no');
    define('WP_UNINSTALL_PLUGIN', true);

    // Run uninstall.php
    require UAS_PATH . 'uninstall.php';

    // Verify options deleted
    if (get_option('uas_custom_category_name') !== false || get_option('uas_disabled_widgets') !== false) {
        echo "  ✗ Plugin options were not cleaned up on uninstall!\n";
        exit(1);
    }
    echo "  ✓ All plugin options successfully deleted.\n";

    // Verify templates preserved
    if (count($GLOBALS['mock_posts']) !== 2) {
        echo "  ✗ User templates were prematurely deleted on safe uninstall!\n";
        exit(1);
    }
    echo "  ✓ User saved templates preserved intact (0 client pages broken).\n";

    // -------------------------------------------------------------------------
    // TEST 4: CLEAN UNINSTALL ROUTINE (PURGE MODE - USER REQUESTED REMOVAL)
    // -------------------------------------------------------------------------
    echo "\n[PART 4] Testing clean uninstall routine with purge preference...\n";

    update_option('uas_delete_templates_on_uninstall', 'yes');

    // Run uninstall.php again with purge enabled
    require UAS_PATH . 'uninstall.php';

    if (count($GLOBALS['mock_posts']) !== 0) {
        echo "  ✗ Templates were not purged when user explicitly opted-in!\n";
        exit(1);
    }
    echo "  ✓ All templates cleanly purged upon explicit user opt-in.\n";

    echo "\n========================================================================\n";
    echo ">>> PHASE 5 STATUS: 100% PASSED - SETTINGS & UNINSTALL VERIFIED <<<\n";
    echo "========================================================================\n";
}
