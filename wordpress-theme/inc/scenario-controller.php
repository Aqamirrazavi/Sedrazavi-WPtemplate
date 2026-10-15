<?php
/**
 * Universal Scenario Controller & Layout Archetypes
 *
 * Provides backend support for 3 layout archetypes inspired by modern enterprise dashboards:
 * 1. Bento-Grid HUD Hub (Modular tiles, audio scrub player, telemetry gauge)
 * 2. 3-Column Dense Data Matrix (Tree directory, tabular figures, action slip)
 * 3. Hybrid Executive Contrast (Crisp light canvas with obsidian focal radar card)
 *
 * @package SedRazavi
 * @version 2.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Scenario_Controller {

    private static $instance = null;
    const OPTION_KEY = 'sedrazavi_active_scenario';
    const DEFAULT_SCENARIO = 'bento-hud';

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('init', array($this, 'register_scenario_settings'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scenario_assets'));
        add_action('wp_ajax_sedrazavi_switch_scenario', array($this, 'ajax_switch_scenario'));
        add_action('wp_ajax_nopriv_sedrazavi_switch_scenario', array($this, 'ajax_switch_scenario'));
        add_shortcode('sedrazavi_bento_hub', array($this, 'render_bento_hub_shortcode'));
        add_shortcode('sedrazavi_dense_matrix', array($this, 'render_dense_matrix_shortcode'));
        add_shortcode('sedrazavi_hybrid_executive', array($this, 'render_hybrid_executive_shortcode'));
    }

    public function register_scenario_settings() {
        register_setting('sedrazavi_theme_options', self::OPTION_KEY, array(
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => self::DEFAULT_SCENARIO,
        ));
    }

    public function get_active_scenario() {
        if (isset($_GET['scenario']) && in_array($_GET['scenario'], array('bento-hud', 'dense-matrix', 'hybrid-executive', 'lawyer', 'web-designer'), true)) {
            return sanitize_text_field($_GET['scenario']);
        }
        return get_option(self::OPTION_KEY, self::DEFAULT_SCENARIO);
    }

    public function get_available_scenarios() {
        return array(
            'bento-hud' => array(
                'id'          => 'bento-hud',
                'title'       => __('بنتوگرید HUD و مرکز مدیا (Bento-Grid HUD)', 'sedrazavi'),
                'description' => __('کاشی‌های ماژولار هوشمند، پلیر اسکراب صوتی، گیج دایره‌ای وضعیت و دسترسی‌های سریع', 'sedrazavi'),
                'theme'       => 'dark-obsidian',
                'icon'        => 'grid',
            ),
            'dense-matrix' => array(
                'id'          => 'dense-matrix',
                'title'       => __('ماتریس داده‌های متراکم ۳ ستونه (3-Column Dense Matrix)', 'sedrazavi'),
                'description' => __('سایدبار درختی شاخه‌ها، جدول داده‌های متراکم با ارقام تبولار و دراور تعاملی اقدام', 'sedrazavi'),
                'theme'       => 'dark-slate',
                'icon'        => 'table',
            ),
            'hybrid-executive' => array(
                'id'          => 'hybrid-executive',
                'title'       => __('هایبرید تشریفاتی مدرن (Hybrid Executive Contrast)', 'sedrazavi'),
                'description' => __('پس‌زمینه تمیز با کارت کانونی مشکی، رادار توزیع ریسک و صف تایید اقدامات', 'sedrazavi'),
                'theme'       => 'hybrid-contrast',
                'icon'        => 'shield',
            ),
        );
    }

    public function enqueue_scenario_assets() {
        $scenario = $this->get_active_scenario();
        wp_localize_script('sedrazavi-main-js', 'sedRazaviScenarioData', array(
            'activeScenario'     => $scenario,
            'availableScenarios' => $this->get_available_scenarios(),
            'ajaxUrl'            => admin_url('admin-ajax.php'),
            'nonce'              => wp_create_nonce('sedrazavi_scenario_nonce'),
        ));
    }

    public function ajax_switch_scenario() {
        check_ajax_referer('sedrazavi_scenario_nonce', 'nonce');
        $scenario = isset($_POST['scenario']) ? sanitize_text_field($_POST['scenario']) : '';
        $valid = array('bento-hud', 'dense-matrix', 'hybrid-executive');

        if (in_array($scenario, $valid, true)) {
            update_option(self::OPTION_KEY, $scenario);
            wp_send_json_success(array(
                'scenario' => $scenario,
                'message'  => __('سناریوی اینترفیس با موفقیت تغییر کرد.', 'sedrazavi'),
            ));
        } else {
            wp_send_json_error(array('message' => __('شناسه سناریو نامعتبر است.', 'sedrazavi')));
        }
    }

    public function render_bento_hub_shortcode($atts) {
        ob_start();
        ?>
        <div class="uas-scenario-bento-hub" data-scenario="bento-hud">
            <?php get_template_part('template-parts/scenarios/bento-hud'); ?>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_dense_matrix_shortcode($atts) {
        ob_start();
        ?>
        <div class="uas-scenario-dense-matrix" data-scenario="dense-matrix">
            <?php get_template_part('template-parts/scenarios/dense-matrix'); ?>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_hybrid_executive_shortcode($atts) {
        ob_start();
        ?>
        <div class="uas-scenario-hybrid-executive" data-scenario="hybrid-executive">
            <?php get_template_part('template-parts/scenarios/hybrid-executive'); ?>
        </div>
        <?php
        return ob_get_clean();
    }
}

// Global helper function
function sedrazavi_scenario() {
    return SedRazavi_Scenario_Controller::get_instance();
}

sedrazavi_scenario();
