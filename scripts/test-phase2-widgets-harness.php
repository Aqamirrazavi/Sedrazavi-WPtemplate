<?php
/**
 * Phase 2 Validation Harness: Full Widgets Verification & Dynamic Control Testing
 */

namespace Elementor {
    class Plugin {
        public static $instance = null;
        public static function instance() {
            if (!self::$instance) self::$instance = new self();
            return self::$instance;
        }
    }

    class Controls_Manager {
        const TAB_CONTENT = 'content';
        const TAB_STYLE = 'style';
        const TAB_ADVANCED = 'advanced';
        const TEXT = 'text';
        const TEXTAREA = 'textarea';
        const NUMBER = 'number';
        const SELECT = 'select';
        const SWITCHER = 'switcher';
        const COLOR = 'color';
        const URL = 'url';
        const MEDIA = 'media';
        const ICONS = 'icons';
        const REPEATER = 'repeater';
    }

    class Group_Control_Typography {
        public static function get_type() { return 'typography'; }
    }
    class Group_Control_Border {
        public static function get_type() { return 'border'; }
    }
    class Group_Control_Box_Shadow {
        public static function get_type() { return 'box_shadow'; }
    }

    class Repeater {
        private $controls = [];
        public function add_control($id, $args = []) {
            $this->controls[$id] = $args;
        }
        public function get_controls() {
            return $this->controls;
        }
    }

    class Elements_Manager {
        public $categories = [];
        public function add_category($id, $args) {
            $this->categories[$id] = $args;
        }
        public function get_categories() {
            return $this->categories;
        }
    }

    class Widgets_Manager {
        public $widgets = [];
        public function register($widget) {
            $this->widgets[$widget->get_name()] = $widget;
        }
    }

    abstract class Widget_Base {
        protected $controls = [];
        protected $custom_settings = [];

        abstract public function get_name();
        abstract public function get_title();
        abstract public function get_icon();
        abstract public function get_categories();

        public function start_controls_section($id, $args = []) {}
        public function end_controls_section() {}
        public function add_control($id, $args = []) {
            $this->controls[$id] = $args;
        }
        public function add_group_control($type, $args = []) {}

        public function set_custom_settings($settings) {
            $this->custom_settings = $settings;
        }

        public function get_settings_for_display() {
            $display_settings = [];
            foreach ($this->controls as $id => $ctrl) {
                if (isset($this->custom_settings[$id])) {
                    $display_settings[$id] = $this->custom_settings[$id];
                } elseif (isset($ctrl['default'])) {
                    $display_settings[$id] = $ctrl['default'];
                } else {
                    $display_settings[$id] = '';
                }
            }
            return array_merge($display_settings, $this->custom_settings);
        }

        public function test_render() {
            ob_start();
            $this->render();
            return ob_get_clean();
        }

        abstract protected function render();
    }
}

namespace {
    define('ABSPATH', __DIR__ . '/../');
    define('ELEMENTOR_VERSION', '3.24.0');

    echo "========================================================================\n";
    echo "   UNIVERSAL ELEMENTOR ADDON SUITE - PHASE 2 WIDGETS HARNESS            \n";
    echo "========================================================================\n\n";

    $GLOBALS['mock_actions'] = [];
    $GLOBALS['mock_filters'] = [];

    function add_action($hook, $callback, $priority = 10, $accepted_args = 1) {
        $GLOBALS['mock_actions'][$hook][] = ['callback' => $callback, 'priority' => $priority, 'args' => $accepted_args];
    }
    function do_action($hook, ...$args) {
        if (isset($GLOBALS['mock_actions'][$hook])) {
            foreach ($GLOBALS['mock_actions'][$hook] as $item) {
                call_user_func_array($item['callback'], $args);
            }
        }
    }
    function add_filter($hook, $callback, $priority = 10, $accepted_args = 1) {
        $GLOBALS['mock_filters'][$hook][] = ['callback' => $callback, 'priority' => $priority, 'args' => $accepted_args];
    }
    function apply_filters($hook, $value, ...$args) {
        if (isset($GLOBALS['mock_filters'][$hook])) {
            foreach ($GLOBALS['mock_filters'][$hook] as $item) {
                $value = call_user_func_array($item['callback'], array_merge([$value], $args));
            }
        }
        return $value;
    }
    function did_action($hook) { return 1; }
    function plugin_dir_path($f) { return dirname($f) . '/'; }
    function plugin_dir_url($f) { return 'http://example.com/wp-content/plugins/' . basename(dirname($f)) . '/'; }
    function plugin_basename($f) { return basename(dirname($f)) . '/' . basename($f); }
    function load_plugin_textdomain($d, $deprecated = false, $path = false) { return true; }
    function current_user_can($cap) { return true; }
    function get_current_screen() { return (object)['parent_file' => 'plugins.php', 'id' => 'plugins']; }
    function wp_nonce_url($u) { return $u; }
    function self_admin_url($p = '') { return $p; }
    function esc_html__($s) { return $s; }
    function esc_html($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
    function esc_attr($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
    function esc_url($s) { return (string)$s; }
    function wp_register_style($h, $src, $deps = [], $ver = false) { $GLOBALS['registered_styles'][$h] = $src; }
    function wp_register_script($h, $src, $deps = [], $ver = false, $in_footer = false) { $GLOBALS['registered_scripts'][$h] = $src; }
    function wp_enqueue_style($h, $src = '', $deps = [], $ver = false) { $GLOBALS['enqueued_styles'][$h] = true; }
    function wp_trim_words($text, $num_words = 55, $more = null) { return mb_substr(strip_tags($text), 0, 100) . '...'; }

    class WP_Query {
        public $posts = [];
        public function __construct($args = []) {}
        public function have_posts() { return false; }
        public function the_post() {}
    }
    function wp_reset_postdata() {}

    // 1. Initialize plugin
    require_once __DIR__ . '/../elementor-addon-suite/elementor-addon-suite.php';
    \Universal_Elementor_Addon_Suite::instance()->init();

    // 2. Register Category & Widgets
    $elements_manager = new \Elementor\Elements_Manager();
    $widgets_manager = new \Elementor\Widgets_Manager();

    do_action('elementor/elements/categories_registered', $elements_manager);
    do_action('elementor/widgets/register', $widgets_manager);

    $registered_widgets = $widgets_manager->widgets;
    echo "[PART 1] Auditing Registered Widgets Count...\n";
    echo "  - Total widgets successfully registered: " . count($registered_widgets) . " widgets\n";

    if (count($registered_widgets) !== 13) {
        echo "  ✗ Expected 13 widgets, found " . count($registered_widgets) . "\n";
        exit(1);
    }
    echo "  ✓ 100% of 13 widgets ported and registered in Elementor.\n\n";

    // 3. Test each widget individually
    echo "[PART 2] Testing individual widget rendering & control responsiveness...\n";
    $widget_results = [];

    $test_cases = [
        'uas_hero' => [
            'class' => '\UniversalElementorSuite\Widgets\Universal_Hero_Widget',
            'custom' => ['hero_title' => 'عنوان آزمایشی تست کنترل هیرو'],
            'assert_needle' => 'عنوان آزمایشی تست کنترل هیرو',
        ],
        'uas_services_grid' => [
            'class' => '\UniversalElementorSuite\Widgets\Universal_Services_Grid_Widget',
            'custom' => ['title' => 'شبکه خدمات تست شده'],
            'assert_needle' => 'شبکه خدمات تست شده',
        ],
        'uas_testimonials' => [
            'class' => '\UniversalElementorSuite\Widgets\Universal_Testimonials_Widget',
            'custom' => ['testimonials_list' => [
                ['author_name' => 'تست کننده کیفیت', 'author_role' => 'مهندس آزمون', 'review_text' => 'بازخورد تست کنترل دینامیک', 'rating' => '5']
            ]],
            'assert_needle' => 'تست کننده کیفیت',
        ],
        'uas_posts_grid' => [
            'class' => '\UniversalElementorSuite\Widgets\Universal_Posts_Widget',
            'custom' => ['read_more_text' => 'مشاهده مقاله تست'],
            'assert_needle' => 'مشاهده مقاله تست',
        ],
        'uas_video' => [
            'class' => '\UniversalElementorSuite\Widgets\Universal_Video_Widget',
            'custom' => ['video_title' => 'عنوان ویدیوی تست شده'],
            'assert_needle' => 'عنوان ویدیوی تست شده',
        ],
        'uas_story_bar' => [
            'class' => '\UniversalElementorSuite\Widgets\Universal_Story_Bar_Widget',
            'custom' => ['bar_title' => 'نوار استوری آزمایشی'],
            'assert_needle' => 'نوار استوری آزمایشی',
        ],
        'uas_team' => [
            'class' => '\UniversalElementorSuite\Widgets\Universal_Team_Widget',
            'custom' => ['team_list' => [
                ['name' => 'دکتر امید شایان', 'role' => 'راهبر طراحی', 'bio' => 'معرفی تست']
            ]],
            'assert_needle' => 'دکتر امید شایان',
        ],
        'uas_faq' => [
            'class' => '\UniversalElementorSuite\Widgets\Universal_Faq_Widget',
            'custom' => ['faqs_list' => [
                ['question' => 'پرسش آزمون کنترل المنتور؟', 'answer' => 'پاسخ معتبر تست']
            ]],
            'assert_needle' => 'پرسش آزمون کنترل المنتور؟',
        ],
        'uas_contact_booking' => [
            'class' => '\UniversalElementorSuite\Widgets\Universal_Contact_Booking_Widget',
            'custom' => ['form_title' => 'فرم آزمایشی رزرو اختصاصی'],
            'assert_needle' => 'فرم آزمایشی رزرو اختصاصی',
        ],
        'uas_cta' => [
            'class' => '\UniversalElementorSuite\Widgets\Universal_CTA_Widget',
            'custom' => ['title' => 'فراخوان تست با دکمه سفارشی'],
            'assert_needle' => 'فراخوان تست با دکمه سفارشی',
        ],
        'uas_banner_slider' => [
            'class' => '\UniversalElementorSuite\Widgets\Universal_Banner_Slider_Widget',
            'custom' => ['text' => 'شعار تیکر تست شده'],
            'assert_needle' => 'شعار تیکر تست شده',
        ],
        'uas_floating_dock' => [
            'class' => '\UniversalElementorSuite\Widgets\Universal_Floating_Dock_Widget',
            'custom' => ['enable_scroll_top' => 'yes'],
            'assert_needle' => 'uas-scroll-top-btn',
        ],
        'uas_theme_toggle' => [
            'class' => '\UniversalElementorSuite\Widgets\Universal_Theme_Toggle_Widget',
            'custom' => ['label' => 'حالت تم تست شده'],
            'assert_needle' => 'حالت تم تست شده',
        ],
    ];

    foreach ($test_cases as $slug => $info) {
        if (!isset($registered_widgets[$slug])) {
            echo "  ✗ Widget {$slug} was not found in registered widgets!\n";
            exit(1);
        }

        $widget = $registered_widgets[$slug];
        // Test reflection method to register controls
        $reflection = new \ReflectionClass($widget);
        $method = $reflection->getMethod('register_controls');
        $method->setAccessible(true);
        $method->invoke($widget);

        // 1. Default render
        $default_html = $widget->test_render();
        if (empty($default_html)) {
            echo "  ✗ Widget {$slug} rendered empty output with defaults!\n";
            exit(1);
        }

        // 2. Custom settings render
        $widget->set_custom_settings($info['custom']);
        $custom_html = $widget->test_render();

        if (strpos($custom_html, $info['assert_needle']) === false) {
            echo "  ✗ Widget {$slug} failed dynamic control assertion! Expected needle '{$info['assert_needle']}' not found.\n";
            exit(1);
        }

        // 3. Category verification
        $cats = $widget->get_categories();
        if (!in_array('universal-addon-suite', $cats)) {
            echo "  ✗ Widget {$slug} is not categorized under 'universal-addon-suite'!\n";
            exit(1);
        }

        echo "  ✓ [{$slug}] " . $widget->get_title() . " -> PASSED (Rendered " . strlen($custom_html) . " bytes, Control test verified)\n";
    }

    echo "\n========================================================================\n";
    echo ">>> PHASE 2 STATUS: 100% PASSED - ALL 13 WIDGETS VERIFIED & WORKING <<<\n";
    echo "========================================================================\n";
}
