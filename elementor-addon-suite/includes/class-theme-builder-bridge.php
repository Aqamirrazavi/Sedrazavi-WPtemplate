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

    /**
     * Active template ID resolved during template_include fallback
     *
     * @var int
     */
    private static $active_canvas_template_id = 0;

    public static function instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        // 1. Elementor Pro Location Registration
        add_action('elementor/theme/register_locations', [$this, 'register_locations']);

        // 2. Elementor Free Dynamic Fallback Shortcodes (used when Pro widgets are adapted for Free)
        add_action('init', [$this, 'register_free_fallback_shortcodes']);

        // 3. Elementor Free Fallback Hooks
        if (!defined('ELEMENTOR_PRO_VERSION')) {
            add_action('wp_head', [$this, 'inject_header_fallback_css'], 99);
            add_filter('template_include', [$this, 'filter_template_include'], 99);
        }

        // 4. Admin assignment hooks
        add_action('wp_ajax_uas_assign_theme_template', [$this, 'ajax_assign_theme_template']);
    }

    /**
     * Register accessible Elementor Free fallback shortcodes for Pro Theme Builder widgets
     */
    public function register_free_fallback_shortcodes() {
        if (!shortcode_exists('uas_nav_menu')) {
            add_shortcode('uas_nav_menu', [$this, 'shortcode_nav_menu']);
        }
        if (!shortcode_exists('uas_dynamic_post_field')) {
            add_shortcode('uas_dynamic_post_field', [$this, 'shortcode_dynamic_post_field']);
        }
        if (!shortcode_exists('uas_dynamic_archive_title')) {
            add_shortcode('uas_dynamic_archive_title', [$this, 'shortcode_dynamic_archive_title']);
        }
    }

    /**
     * Fallback shortcode for Pro `nav-menu` widget
     */
    public function shortcode_nav_menu($atts) {
        $atts = shortcode_atts([
            'location' => 'primary',
            'class'    => 'uas-free-nav-menu',
        ], $atts, 'uas_nav_menu');

        $location = sanitize_key($atts['location']);
        if (!has_nav_menu($location)) {
            $locations = get_nav_menu_locations();
            if (!empty($locations)) {
                $keys = array_keys($locations);
                $location = $keys[0];
            }
        }

        ob_start();
        echo '<nav class="uas-free-nav-wrapper" aria-label="' . esc_attr__('ناوبری اصلی', 'universal-elementor-suite') . '">';
        if ($location && has_nav_menu($location)) {
            wp_nav_menu([
                'theme_location' => $location,
                'container'      => false,
                'menu_class'     => sanitize_html_class($atts['class']),
                'fallback_cb'    => false,
            ]);
        } else {
            wp_page_menu([
                'menu_class' => sanitize_html_class($atts['class']),
                'show_home'  => true,
            ]);
        }
        echo '</nav>';
        return ob_get_clean();
    }

    /**
     * Fallback shortcode for Pro Single Post widgets (title, meta, thumbnail, content, author, comments)
     */
    public function shortcode_dynamic_post_field($atts) {
        $atts = shortcode_atts(['field' => 'title'], $atts, 'uas_dynamic_post_field');
        $field = sanitize_key($atts['field']);
        $post_id = get_queried_object_id();
        if (!$post_id && get_the_ID()) {
            $post_id = get_the_ID();
        }
        if (!$post_id) {
            return '';
        }

        switch ($field) {
            case 'title':
                return '<h1 class="uas-free-post-title">' . esc_html(get_the_title($post_id)) . '</h1>';
            case 'meta':
                $author_id = (int) get_post_field('post_author', $post_id);
                $author = $author_id ? get_the_author_meta('display_name', $author_id) : '';
                $date = get_the_date('', $post_id);
                return '<div class="uas-free-post-meta">' . esc_html(trim($author . ($author && $date ? ' • ' : '') . $date)) . '</div>';
            case 'thumbnail':
                if (has_post_thumbnail($post_id)) {
                    return '<div class="uas-free-post-thumb">' . get_the_post_thumbnail($post_id, 'large') . '</div>';
                }
                return '';
            case 'content':
                $content = get_post_field('post_content', $post_id);
                return '<div class="uas-free-post-content">' . apply_filters('the_content', $content) . '</div>';
            case 'author':
                $author_id = (int) get_post_field('post_author', $post_id);
                if (!$author_id) {
                    return '';
                }
                $name = get_the_author_meta('display_name', $author_id);
                $bio  = get_the_author_meta('description', $author_id);
                return '<div class="uas-free-author-box"><strong>' . esc_html($name) . '</strong>' . ($bio ? '<p>' . esc_html($bio) . '</p>' : '') . '</div>';
            case 'comments':
                if (comments_open($post_id) || get_comments_number($post_id)) {
                    ob_start();
                    comments_template();
                    return ob_get_clean();
                }
                return '';
            default:
                return '';
        }
    }

    /**
     * Fallback shortcode for Pro `theme-archive-title` widget
     */
    public function shortcode_dynamic_archive_title() {
        $title = function_exists('get_the_archive_title') ? get_the_archive_title() : get_bloginfo('name');
        return '<h1 class="uas-free-archive-title">' . wp_kses_post($title) . '</h1>';
    }

    /**
     * Register Theme Builder locations for Elementor Pro
     *
     * @param \ElementorPro\Modules\ThemeBuilder\Classes\Locations_Manager $location_manager
     */
    public function register_locations($location_manager) {
        if (is_object($location_manager) && method_exists($location_manager, 'register_all_core_location')) {
            $location_manager->register_all_core_location();
        }
    }

    /**
     * Filter template_include for 404, Archive, and Single templates in Elementor Free mode
     *
     * @param string $template
     * @return string
     */
    public function filter_template_include($template) {
        if (!$this->is_elementor_ready()) {
            return $template;
        }

        // Respect explicit Elementor Canvas / blank templates on singular content
        if (is_404()) {
            $tpl_404_id = $this->get_assigned_template_id('404');
            if ($tpl_404_id) {
                return $this->get_canvas_template_path($tpl_404_id);
            }
        }

        if (is_singular('post')) {
            $tpl_single_id = $this->get_assigned_template_id('single-post') ?: $this->get_assigned_template_id('single');
            if ($tpl_single_id) {
                return $this->get_canvas_template_path($tpl_single_id);
            }
        }

        if (is_archive() || is_home()) {
            $tpl_archive_id = $this->get_assigned_template_id('archive');
            if ($tpl_archive_id) {
                return $this->get_canvas_template_path($tpl_archive_id);
            }
        }

        return $template;
    }

    /**
     * Check whether Elementor core frontend engine is loaded and usable
     *
     * @return bool
     */
    private function is_elementor_ready() {
        return class_exists('\Elementor\Plugin')
            && isset(\Elementor\Plugin::$instance->frontend)
            && method_exists(\Elementor\Plugin::$instance->frontend, 'get_builder_content_for_display');
    }

    /**
     * Render assigned header template
     */
    public function render_header() {
        $header_id = $this->get_assigned_template_id('header');
        if ($header_id && $this->is_elementor_ready()) {
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
        if ($footer_id && $this->is_elementor_ready()) {
            echo '<footer class="uas-theme-builder-footer" role="contentinfo">';
            echo \Elementor\Plugin::$instance->frontend->get_builder_content_for_display($footer_id);
            echo '</footer>';
            return true;
        }
        return false;
    }

    /**
     * Universal do_location dispatcher for Theme Builder locations
     *
     * Safely detects whether get_header() has already executed to avoid duplicate header/footer output.
     *
     * @param string $location
     * @return bool
     */
    public function do_location($location) {
        if (!$this->is_elementor_ready()) {
            return false;
        }

        switch ($location) {
            case 'header':
                return $this->render_header();
            case 'footer':
                return $this->render_footer();
            case 'single':
                return $this->render_single();
            case 'archive':
                return $this->render_archive();
            case '404':
                $tpl_404 = $this->get_assigned_template_id('404');
                if ($tpl_404) {
                    $header_already_rendered = did_action('get_header') > 0;
                    if (!$header_already_rendered) {
                        get_header();
                    }
                    echo '<main id="content" class="site-main uas-canvas-main uas-theme-builder-404">';
                    echo \Elementor\Plugin::$instance->frontend->get_builder_content_for_display($tpl_404);
                    echo '</main>';
                    if (!$header_already_rendered) {
                        get_footer();
                    }
                    return true;
                }
                return false;
            default:
                return false;
        }
    }

    /**
     * Render assigned single template (guarding against double get_header/get_footer)
     *
     * @return bool
     */
    public function render_single() {
        if (!$this->is_elementor_ready()) {
            return false;
        }

        $single_id = $this->get_assigned_template_id('single');
        if (!$single_id) {
            $single_id = $this->get_assigned_template_id('single-post');
        }

        if ($single_id) {
            $header_already_rendered = did_action('get_header') > 0;
            if (!$header_already_rendered) {
                get_header();
            }
            echo '<main id="content" class="site-main uas-canvas-main uas-theme-builder-single">';
            echo \Elementor\Plugin::$instance->frontend->get_builder_content_for_display($single_id);
            echo '</main>';
            if (!$header_already_rendered) {
                get_footer();
            }
            return true;
        }

        return false;
    }

    /**
     * Render assigned archive template (guarding against double get_header/get_footer)
     *
     * @return bool
     */
    public function render_archive() {
        if (!$this->is_elementor_ready()) {
            return false;
        }

        $archive_id = $this->get_assigned_template_id('archive');

        if ($archive_id) {
            $header_already_rendered = did_action('get_header') > 0;
            if (!$header_already_rendered) {
                get_header();
            }
            echo '<main id="content" class="site-main uas-canvas-main uas-theme-builder-archive">';
            echo \Elementor\Plugin::$instance->frontend->get_builder_content_for_display($archive_id);
            echo '</main>';
            if (!$header_already_rendered) {
                get_footer();
            }
            return true;
        }

        return false;
    }

    /**
     * Helper to get assigned template ID by location with strict builder validation
     */
    public function get_assigned_template_id($location) {
        if (!$this->is_elementor_ready()) {
            return 0;
        }

        $assigned = intval(get_option('uas_theme_builder_' . sanitize_key($location) . '_template_id', 0));
        if ($assigned && get_post_status($assigned) === 'publish') {
            $has_data = get_post_meta($assigned, '_elementor_data', true);
            if (!empty($has_data)) {
                return $assigned;
            }
        }

        // Automatic fallback: find first imported template of this type with valid builder data
        $posts = get_posts([
            'post_type'      => 'elementor_library',
            'posts_per_page' => 1,
            'meta_key'       => '_uas_template_type',
            'meta_value'     => sanitize_key($location),
            'post_status'    => 'publish',
        ]);

        if (!empty($posts)) {
            $candidate_id = intval($posts[0]->ID);
            $has_data = get_post_meta($candidate_id, '_elementor_data', true);
            if (!empty($has_data)) {
                return $candidate_id;
            }
        }

        return 0;
    }

    /**
     * Resolve static canvas wrapper path safely (zero writable-uploads PHP generation)
     */
    private function get_canvas_template_path($template_id) {
        self::$active_canvas_template_id = intval($template_id);
        $static_wrapper = UAS_PATH . 'includes/templates/canvas-wrapper.php';
        if (file_exists($static_wrapper)) {
            return $static_wrapper;
        }
        return '';
    }

    /**
     * Get the currently resolved canvas template ID
     *
     * @return int
     */
    public static function get_active_canvas_template_id() {
        return self::$active_canvas_template_id;
    }

    /**
     * Render active canvas template content cleanly
     *
     * @return string
     */
    public static function render_active_canvas_template() {
        $tid = self::$active_canvas_template_id;
        if ($tid > 0 && class_exists('\Elementor\Plugin') && isset(\Elementor\Plugin::$instance->frontend)) {
            return \Elementor\Plugin::$instance->frontend->get_builder_content_for_display($tid);
        }
        return '';
    }

    /**
     * CSS injection for smooth header/footer integration and Free fallback styling
     */
    public function inject_header_fallback_css() {
        echo '<style id="uas-theme-builder-bridge-css">
            .uas-theme-builder-header { width: 100%; position: relative; z-index: 100; }
            .uas-theme-builder-footer { width: 100%; position: relative; z-index: 50; }
            .uas-canvas-main { width: 100%; min-height: 50vh; }
            .uas-free-nav-wrapper ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; }
            .uas-free-nav-wrapper a { text-decoration: none; color: inherit; }
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

// Global polyfill for elementor_theme_do_location when Elementor Pro is not installed
if (!function_exists('elementor_theme_do_location')) {
    /**
     * Global polyfill for elementor_theme_do_location
     *
     * @param string $location
     * @return bool
     */
    function elementor_theme_do_location($location) {
        if (class_exists('\UniversalElementorSuite\Theme_Builder_Bridge')) {
            return \UniversalElementorSuite\Theme_Builder_Bridge::instance()->do_location($location);
        }
        return false;
    }
}
