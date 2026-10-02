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
     * Registered Widget Classes Registry
     *
     * @var array
     */
    private $registered_widgets = [];

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
        // Legacy compatibility for Elementor < 3.5.0
        add_action('elementor/widgets/widgets_registered', [$this, 'register_widgets']);

        // Register Global Frontend & Editor Assets
        add_action('elementor/frontend/after_register_styles', [$this, 'register_frontend_styles']);
        add_action('elementor/frontend/after_register_scripts', [$this, 'register_frontend_scripts']);
        add_action('elementor/editor/after_enqueue_styles', [$this, 'enqueue_editor_styles']);
    }

    /**
     * Register Dedicated Category in Elementor Elements Panel
     *
     * @param \Elementor\Elements_Manager $elements_manager
     */
    public function register_category($elements_manager) {
        $elements_manager->add_category(
            self::CATEGORY_SLUG,
            [
                'title' => esc_html__('المان‌های پیشرفته (Universal Suite)', 'universal-elementor-suite'),
                'icon'  => 'eicon-apps',
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
        // Core Widget Base Class
        require_once UAS_PATH . 'includes/class-widget-base.php';

        /**
         * Widget classes will be ported in Phase 2 one by one.
         * The list of active widgets is dynamically filterable.
         */
        $widget_classes = apply_filters('uas_elementor_registered_widgets', $this->registered_widgets);

        foreach ($widget_classes as $widget_class) {
            if (class_exists($widget_class)) {
                if (method_exists($widgets_manager, 'register')) {
                    $widgets_manager->register(new $widget_class());
                } elseif (method_exists($widgets_manager, 'register_widget_type')) {
                    $widgets_manager->register_widget_type(new $widget_class());
                }
            }
        }
    }

    /**
     * Register Frontend CSS
     */
    public function register_frontend_styles() {
        wp_register_style(
            'uas-widgets-core',
            UAS_URL . 'assets/css/widgets-core.css',
            [],
            UAS_VERSION
        );
    }

    /**
     * Register Frontend JS
     */
    public function register_frontend_scripts() {
        wp_register_script(
            'uas-widgets-core',
            UAS_URL . 'assets/js/widgets-core.js',
            ['jquery'],
            UAS_VERSION,
            true
        );
    }

    /**
     * Enqueue Editor Styles
     */
    public function enqueue_editor_styles() {
        wp_enqueue_style(
            'uas-editor-styles',
            UAS_URL . 'assets/css/editor.css',
            [],
            UAS_VERSION
        );
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
