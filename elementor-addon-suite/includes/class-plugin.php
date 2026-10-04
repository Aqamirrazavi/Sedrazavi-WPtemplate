<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Core Plugin Manager Class
 */
class Plugin {

    /**
     * Singleton Instance
     *
     * @var Plugin|null
     */
    private static $_instance = null;

    /**
     * Dedicated Category Slug
     */
    const CATEGORY_SLUG = 'universal-addon-suite';

    /**
     * Get instance
     *
     * @return Plugin
     */
    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Constructor
     */
    public function __construct() {
        if (is_admin()) {
            require_once UAS_PATH . 'includes/class-admin-settings.php';
            Admin_Settings::instance();
        }
        $this->register_hooks();
    }

    /**
     * Register Elementor Hooks
     */
    private function register_hooks() {
        // Register Custom Elementor Category
        add_action('elementor/elements/categories_registered', [$this, 'register_category']);

        // Register Custom Elementor Widgets
        add_action('elementor/widgets/register', [$this, 'register_widgets']);
        add_action('elementor/widgets/widgets_registered', [$this, 'register_widgets']);

        // Register Global Frontend & Editor Assets
        add_action('elementor/frontend/after_register_styles', [$this, 'register_frontend_styles']);
        add_action('elementor/frontend/after_register_scripts', [$this, 'register_frontend_scripts']);
        add_action('elementor/editor/after_enqueue_styles', [$this, 'enqueue_editor_styles']);

        // AJAX Action for Manual Template Import
        add_action('wp_ajax_uas_import_templates', [$this, 'ajax_import_templates']);
    }

    /**
     * AJAX Handler for Manual Template Import
     */
    public function ajax_import_templates() {
        check_ajax_referer('uas_admin_nonce', 'nonce');

        if (!current_user_can('edit_posts')) {
            wp_send_json_error(['message' => 'سطح دسترسی ناکافی است.']);
        }

        require_once UAS_PATH . 'includes/class-template-importer.php';
        $report = Template_Importer::import_all_templates();
        wp_send_json_success($report);
    }

    /**
     * Register Dedicated Category in Elementor Elements Panel
     *
     * @param \Elementor\Elements_Manager $elements_manager
     */
    public function register_category($elements_manager) {
        $custom_title = get_option('uas_custom_category_name', esc_html__('المان‌های پیشرفته (Universal Suite)', 'universal-elementor-suite'));
        $custom_icon  = get_option('uas_custom_category_icon', 'eicon-apps');

        $elements_manager->add_category(
            self::CATEGORY_SLUG,
            [
                'title'  => !empty($custom_title) ? $custom_title : esc_html__('المان‌های پیشرفته (Universal Suite)', 'universal-elementor-suite'),
                'icon'   => !empty($custom_icon) ? $custom_icon : 'eicon-apps',
                'active' => true,
            ]
        );
    }

    /**
     * Register Widgets in Elementor
     *
     * @param \Elementor\Widgets_Manager $widgets_manager
     */
    public function register_widgets($widgets_manager) {
        // 1. Core Widget Base Class
        require_once UAS_PATH . 'includes/class-widget-base.php';

        $disabled_widgets = (array) get_option('uas_disabled_widgets', []);

        // 2. Load 13 Topic-Agnostic Widgets
        $widgets_map = [
            'uas_hero'            => ['file' => 'class-widget-hero.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Hero_Widget'],
            'uas_services_grid'   => ['file' => 'class-widget-services-grid.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Services_Grid_Widget'],
            'uas_testimonials'    => ['file' => 'class-widget-testimonials.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Testimonials_Widget'],
            'uas_posts_grid'      => ['file' => 'class-widget-posts.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Posts_Widget'],
            'uas_video'           => ['file' => 'class-widget-video.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Video_Widget'],
            'uas_story_bar'       => ['file' => 'class-widget-story-bar.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Story_Bar_Widget'],
            'uas_team'            => ['file' => 'class-widget-team.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Team_Widget'],
            'uas_faq'             => ['file' => 'class-widget-faq.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Faq_Widget'],
            'uas_contact_booking' => ['file' => 'class-widget-contact-booking.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Contact_Booking_Widget'],
            'uas_cta'             => ['file' => 'class-widget-cta.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_CTA_Widget'],
            'uas_banner_slider'   => ['file' => 'class-widget-banner-slider.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Banner_Slider_Widget'],
            'uas_floating_dock'   => ['file' => 'class-widget-floating-dock.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Floating_Dock_Widget'],
            'uas_theme_toggle'    => ['file' => 'class-widget-theme-toggle.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Theme_Toggle_Widget'],
            'uas_firm_milestones' => ['file' => 'class-widget-firm-milestones.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Firm_Milestones_Widget'],
            'uas_case_timeline'   => ['file' => 'class-widget-case-timeline.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Case_Timeline_Widget'],
            'uas_email_otp'       => ['file' => 'class-widget-email-otp.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Email_OTP_Widget'],
            'uas_radar_chart'     => ['file' => 'class-widget-radar-chart.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Radar_Chart_Widget'],
        ];

        foreach ($widgets_map as $widget_id => $data) {
            // Check if widget is disabled in admin settings
            if (in_array($widget_id, $disabled_widgets, true)) {
                continue; // Skip loading and registration to save memory and improve performance
            }

            $filepath = UAS_PATH . 'includes/widgets/' . $data['file'];
            if (file_exists($filepath)) {
                require_once $filepath;
                $class_name = $data['class'];
                if (class_exists($class_name)) {
                    if (method_exists($widgets_manager, 'register')) {
                        $widgets_manager->register(new $class_name());
                    } elseif (method_exists($widgets_manager, 'register_widget_type')) {
                        $widgets_manager->register_widget_type(new $class_name());
                    }
                }
            }
        }
    }

    /**
     * Register Frontend CSS
     */
    public function register_frontend_styles() {
        wp_register_style('uas-widgets-core', UAS_URL . 'assets/css/widgets-core.css', [], UAS_VERSION);
        wp_register_style('uas-hero-css', UAS_URL . 'assets/css/widgets/hero.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-services-grid-css', UAS_URL . 'assets/css/widgets/services-grid.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-testimonials-css', UAS_URL . 'assets/css/widgets/testimonials.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-posts-css', UAS_URL . 'assets/css/widgets/posts.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-video-css', UAS_URL . 'assets/css/widgets/video.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-story-bar-css', UAS_URL . 'assets/css/widgets/story-bar.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-team-css', UAS_URL . 'assets/css/widgets/team.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-faq-css', UAS_URL . 'assets/css/widgets/faq.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-contact-booking-css', UAS_URL . 'assets/css/widgets/contact-booking.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-cta-css', UAS_URL . 'assets/css/widgets/cta.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-banner-slider-css', UAS_URL . 'assets/css/widgets/banner-slider.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-floating-dock-css', UAS_URL . 'assets/css/widgets/floating-dock.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-theme-toggle-css', UAS_URL . 'assets/css/widgets/theme-toggle.css', ['uas-widgets-core'], UAS_VERSION);
    }

    /**
     * Register Frontend JS
     */
    public function register_frontend_scripts() {
        wp_register_script('uas-widgets-core', UAS_URL . 'assets/js/widgets-core.js', ['jquery'], UAS_VERSION, true);
        wp_register_script('uas-story-bar-js', UAS_URL . 'assets/js/widgets/story-bar.js', ['jquery', 'uas-widgets-core'], UAS_VERSION, true);
        wp_register_script('uas-faq-js', UAS_URL . 'assets/js/widgets/faq.js', ['jquery', 'uas-widgets-core'], UAS_VERSION, true);
        wp_register_script('uas-floating-dock-js', UAS_URL . 'assets/js/widgets/floating-dock.js', ['jquery', 'uas-widgets-core'], UAS_VERSION, true);
        wp_register_script('uas-theme-toggle-js', UAS_URL . 'assets/js/widgets/theme-toggle.js', ['jquery', 'uas-widgets-core'], UAS_VERSION, true);
    }

    /**
     * Enqueue Editor Styles
     */
    public function enqueue_editor_styles() {
        wp_enqueue_style('uas-editor-styles', UAS_URL . 'assets/css/editor.css', [], UAS_VERSION);
    }

    /**
     * Get Category Slug
     *
     * @return string
     */
    public static function get_category_slug() {
        return self::CATEGORY_SLUG;
    }
}
