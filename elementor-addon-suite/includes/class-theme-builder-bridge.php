<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Theme Builder Bridge
 *
 * Provides bidirectional compatibility:
 * 1. Elementor Pro Theme Builder integration when Elementor Pro is active.
 * 2. Native zero-dependency fallback engine when Elementor Free is active,
 *    allowing custom Elementor Header, Footer, 404, and Single Post templates
 *    to be assigned and rendered across any theme without requiring Elementor Pro.
 *
 * @package UniversalElementorSuite
 * @since 6.1.0
 */
class Theme_Builder_Bridge {

    private static $instance = null;

    public static function instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        // 1. Elementor Pro Location Registration
        add_action('elementor/theme/register_locations', [$this, 'register_locations']);

        // 2. Elementor Free Fallback Hooks
        if (!defined('ELEMENTOR_PRO_VERSION')) {
            add_action('wp_head', [$this, 'inject_header_fallback_css'], 99);
            add_filter('template_include', [$this, 'filter_template_include'], 99);
        }

        // 3. Admin assignment hooks
        add_action('wp_ajax_uas_assign_theme_template', [$this, 'ajax_assign_theme_template']);
    }

    /**
     * Register Theme Builder locations for Elementor Pro
     *
     * @param \ElementorPro\Modules\ThemeBuilder\Classes\Locations_Manager $location_manager
     */
    public function register_locations($location_manager) {
        $location_manager->register_all_core_location();
    }

    /**
     * Filter template_include for 404 and Single templates in Elementor Free mode
     *
     * @param string $template
     * @return string
     */
    public function filter_template_include($template) {
        if (!class_exists('\Elementor\Plugin')) {
            return $template;
        }

        // 404 Fallback Template
        if (is_404()) {
            $tpl_404_id = $this->get_assigned_template_id('404');
            if ($tpl_404_id) {
                return $this->get_canvas_template_path($tpl_404_id);
            }
        }

        // Single Post Fallback Template
        if (is_singular('post')) {
            $tpl_single_id = $this->get_assigned_template_id('single-post');
            if ($tpl_single_id) {
                return $this->get_canvas_template_path($tpl_single_id);
            }
        }

        return $template;
    }

    /**
     * Render assigned header template
     */
    public function render_header() {
        $header_id = $this->get_assigned_template_id('header');
        if ($header_id && class_exists('\Elementor\Plugin')) {
            echo '<header class="uas-theme-builder-header" role="banner">';
            echo \Elementor\Plugin::$instance->frontend->get_builder_content_for_display($header_id);
            echo '</header>';
            return true;
        }
        return false;
    }

    /**
     * Render assigned footer template
     */
    public function render_footer() {
        $footer_id = $this->get_assigned_template_id('footer');
        if ($footer_id && class_exists('\Elementor\Plugin')) {
            echo '<footer class="uas-theme-builder-footer" role="contentinfo">';
            echo \Elementor\Plugin::$instance->frontend->get_builder_content_for_display($footer_id);
            echo '</footer>';
            return true;
        }
        return false;
    }

    /**
     * Helper to get assigned template ID by location
     */
    public function get_assigned_template_id($location) {
        $assigned = get_option('uas_theme_builder_' . $location . '_template_id', 0);
        if ($assigned && get_post_status($assigned) === 'publish') {
            return intval($assigned);
        }

        // Automatic fallback: find first imported template of this type
        $posts = get_posts([
            'post_type'      => 'elementor_library',
            'posts_per_page' => 1,
            'meta_key'       => '_uas_template_type',
            'meta_value'     => $location,
            'post_status'    => 'publish',
        ]);

        if (!empty($posts)) {
            return intval($posts[0]->ID);
        }

        return 0;
    }

    /**
     * Get path to canvas wrapper or generate dynamically
     */
    private function get_canvas_template_path($template_id) {
        $upload_dir = wp_upload_dir();
        $wrapper_dir = trailingslashit($upload_dir['basedir']) . 'uas-cache/';
        wp_mkdir_p($wrapper_dir);
        $wrapper_file = $wrapper_dir . 'template-canvas-' . $template_id . '.php';

        if (!file_exists($wrapper_file)) {
            $content = "<?php\n/**\n * Auto-generated Elementor Free Theme Builder Template Wrapper\n */\nget_header();\necho '<main id=\"content\" class=\"site-main uas-canvas-main\">';\necho \\Elementor\\Plugin::\$instance->frontend->get_builder_content_for_display({$template_id});\necho '</main>';\nget_footer();\n";
            @file_put_contents($wrapper_file, $content);
        }

        return $wrapper_file;
    }

    /**
     * CSS injection for smooth header/footer integration
     */
    public function inject_header_fallback_css() {
        echo '<style id="uas-theme-builder-bridge-css">
            .uas-theme-builder-header { width: 100%; position: relative; z-index: 100; }
            .uas-theme-builder-footer { width: 100%; position: relative; z-index: 50; }
            .uas-canvas-main { width: 100%; min-height: 50vh; }
        </style>';
    }

    /**
     * AJAX handler to assign template to Theme Builder location
     */
    public function ajax_assign_theme_template() {
        check_ajax_referer('uas_admin_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => 'سطح دسترسی ناکافی است.']);
        }

        $location    = isset($_POST['location']) ? sanitize_key($_POST['location']) : '';
        $template_id = isset($_POST['template_id']) ? intval($_POST['template_id']) : 0;

        if (empty($location)) {
            wp_send_json_error(['message' => 'موقعیت تم‌بیلدر نامعتبر است.']);
        }

        update_option('uas_theme_builder_' . $location . '_template_id', $template_id);
        wp_send_json_success(['message' => 'قالب تم‌بیلدر با موفقیت به موقعیت مورد نظر متصل گردید.']);
    }
}
