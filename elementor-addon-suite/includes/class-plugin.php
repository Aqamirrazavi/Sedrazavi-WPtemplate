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

        // Register Custom Elementor Widgets (Single canonical hook for Elementor >= 3.5)
        add_action('elementor/widgets/register', [$this, 'register_widgets']);

        // Register & Enqueue Scoped Frontend, Preview, and Editor Assets via Asset_Manifest
        add_action('elementor/frontend/after_register_styles', [$this, 'register_frontend_styles']);
        add_action('elementor/frontend/after_register_scripts', [$this, 'register_frontend_scripts']);
        add_action('elementor/preview/enqueue_styles', [$this, 'enqueue_preview_styles']);
        add_action('elementor/editor/after_enqueue_styles', [$this, 'enqueue_editor_styles']);

        // AJAX Action for Manual Template Import
        add_action('wp_ajax_uas_import_templates', [$this, 'ajax_import_templates']);
        add_action('wp_ajax_uas_import_single_template', [$this, 'ajax_import_single_template']);
    }

    /**
     * AJAX Handler for Manual Template Import
     */
    public function ajax_import_templates() {
        check_ajax_referer('uas_admin_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => 'سطح دسترسی ناکافی است. تنها مدیر کل سیستم مجاز به درون‌ریزی قالب‌ها می‌باشد.']);
        }

        require_once UAS_PATH . 'includes/class-template-importer.php';
        $report = Template_Importer::import_all_templates();
        wp_send_json_success($report);
    }

    /**
     * AJAX Handler for Single Template Import
     */
    public function ajax_import_single_template() {
        check_ajax_referer('uas_admin_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => 'سطح دسترسی ناکافی است. تنها مدیر کل سیستم مجاز به درون‌ریزی قالب‌ها می‌باشد.']);
        }

        $slug = isset($_POST['slug']) ? sanitize_key($_POST['slug']) : '';
        if (empty($slug)) {
            wp_send_json_error(['message' => 'شناسه قالب مشخص نشده است.']);
        }

        require_once UAS_PATH . 'includes/class-template-importer.php';
        $result = Template_Importer::import_single_template($slug);
        if (!empty($result['success'])) {
            wp_send_json_success($result);
        } else {
            wp_send_json_error($result);
        }
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

        $elements_manager->add_category(
            'sedrazavi-elements',
            [
                'title'  => esc_html__('المان‌های اصناف SedRazavi OS', 'universal-elementor-suite'),
                'icon'   => 'eicon-flash',
                'active' => true,
            ]
        );
    }

    /**
     * Single Source of Truth: 31 Production-Ready Native Visual Elementor Widgets
     *
     * @return array
     */
    public static function get_widgets_map() {
        return [
            'uas_hero'              => ['file' => 'class-widget-hero.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Hero_Widget'],
            'uas_services_grid'     => ['file' => 'class-widget-services-grid.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Services_Grid_Widget'],
            'uas_testimonials'      => ['file' => 'class-widget-testimonials.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Testimonials_Widget'],
            'uas_posts_grid'        => ['file' => 'class-widget-posts.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Posts_Widget'],
            'uas_video'             => ['file' => 'class-widget-video.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Video_Widget'],
            'uas_story_bar'         => ['file' => 'class-widget-story-bar.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Story_Bar_Widget'],
            'uas_team'              => ['file' => 'class-widget-team.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Team_Widget'],
            'uas_faq'               => ['file' => 'class-widget-faq.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Faq_Widget'],
            'uas_contact_booking'   => ['file' => 'class-widget-contact-booking.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Contact_Booking_Widget'],
            'uas_cta'               => ['file' => 'class-widget-cta.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_CTA_Widget'],
            'uas_banner_slider'     => ['file' => 'class-widget-banner-slider.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Banner_Slider_Widget'],
            'uas_floating_dock'     => ['file' => 'class-widget-floating-dock.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Floating_Dock_Widget'],
            'uas_theme_toggle'      => ['file' => 'class-widget-theme-toggle.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Theme_Toggle_Widget'],
            'uas_firm_milestones'   => ['file' => 'class-widget-firm-milestones.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Firm_Milestones_Widget'],
            'uas_case_timeline'     => ['file' => 'class-widget-case-timeline.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Case_Timeline_Widget'],
            'uas_email_otp'         => ['file' => 'class-widget-email-otp.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Email_OTP_Widget'],
            'uas_radar_chart'       => ['file' => 'class-widget-radar-chart.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Radar_Chart_Widget'],
            // Multi-Niche Specialized Industry Widgets
            'uas_spotplayer_course' => ['file' => 'class-widget-spotplayer-course.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_SpotPlayer_Course_Widget'],
            'uas_download_box'      => ['file' => 'class-widget-download-box.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Download_Box_Widget'],
            'uas_vip_pricing'       => ['file' => 'class-widget-vip-pricing.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_VIP_Pricing_Widget'],
            'uas_pricing_switcher'  => ['file' => 'class-widget-pricing-switcher.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Pricing_Switcher_Widget'],
            'uas_fomo_countdown'    => ['file' => 'class-widget-fomo-countdown.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_FOMO_Countdown_Widget'],
            'uas_before_after'      => ['file' => 'class-widget-before-after.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Before_After_Widget'],
            'uas_stat_counter'      => ['file' => 'class-widget-stat-counter.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Stat_Counter_Widget'],
            'uas_floating_cta'      => ['file' => 'class-widget-floating-cta.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Floating_CTA_Widget'],
            'uas_pricing_matrix'    => ['file' => 'class-widget-pricing-matrix.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Pricing_Comparison_Matrix_Widget'],
            'uas_hero_split'        => ['file' => 'class-widget-hero-split.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Hero_Split_Conversion_Widget'],
            'uas_bento_tabs'        => ['file' => 'class-widget-bento-tabs.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Interactive_Tabs_Bento_Widget'],
            'uas_news_ticker'       => ['file' => 'class-widget-news-ticker.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_News_Ticker_Widget'],
            'uas_client_portal'     => ['file' => 'class-widget-client-portal.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Client_Portal_Widget'],
            'uas_dynamic_grid'      => ['file' => 'class-widget-dynamic-grid.php', 'class' => '\UniversalElementorSuite\Widgets\Universal_Dynamic_Grid_Widget'],
        ];
    }

    /**
     * Register Widgets in Elementor
     *
     * @param \Elementor\Widgets_Manager $widgets_manager
     */
    public function register_widgets($widgets_manager) {
        static $already_registered = false;
        if ($already_registered) {
            return;
        }
        $already_registered = true;

        // 1. Core Widget Base Class
        require_once UAS_PATH . 'includes/class-widget-base.php';

        $disabled_widgets = (array) get_option('uas_disabled_widgets', []);

        // 2. Load 31 Production-Ready Native Visual Elementor Widgets (Topic-Agnostic & Specialized Industry)
        $widgets_map = self::get_widgets_map();

        foreach ($widgets_map as $widget_id => $data) {
            if (in_array($widget_id, $disabled_widgets, true)) {
                continue;
            }

            $filepath = UAS_PATH . 'includes/widgets/' . $data['file'];
            if (file_exists($filepath)) {
                require_once $filepath;
                $class_name = $data['class'];
                if (class_exists($class_name) && method_exists($widgets_manager, 'register')) {
                    $widgets_manager->register(new $class_name());
                }
            }
        }
    }

    /**
     * Register Frontend CSS via Unified Asset_Manifest
     */
    public function register_frontend_styles() {
        if (class_exists('\UniversalElementorSuite\Asset_Manifest')) {
            Asset_Manifest::instance()->register_scope('frontend', 'styles');
        }
    }

    /**
     * Register Frontend JS via Unified Asset_Manifest
     */
    public function register_frontend_scripts() {
        if (class_exists('\UniversalElementorSuite\Asset_Manifest')) {
            Asset_Manifest::instance()->register_scope('frontend', 'scripts');
        }
    }

    /**
     * Enqueue Preview Core CSS cleanly inside Elementor Canvas/Preview iframe only
     */
    public function enqueue_preview_styles() {
        if (class_exists('\UniversalElementorSuite\Asset_Manifest')) {
            Asset_Manifest::instance()->enqueue_scope('frontend', ['uas-widgets-core']);
        }
    }

    /**
     * Enqueue Editor Styles strictly in Elementor Editor panel
     */
    public function enqueue_editor_styles() {
        if (class_exists('\UniversalElementorSuite\Asset_Manifest')) {
            Asset_Manifest::instance()->enqueue_scope('editor');
        }
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
