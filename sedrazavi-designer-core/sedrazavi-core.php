<?php
/**
 * Plugin Name: SedRazavi Designer Core
 * Plugin URI: https://sedrazavi.ir/
 * Description: Dedicated standalone core engine for the WordPress No-Code Designer & Architect. Provides 66-palette Elementor synchronization, custom tables, auto-provisioning of 12 pages, lead management with SR-XXXXX tracking, client portal auth guard, and 4 dedicated interactive Elementor widgets.
 * Version: 1.0.0
 * Author: SedRazavi Studio
 * Author URI: https://sedrazavi.ir/
 * Text Domain: sedrazavi-designer-core
 * Domain Path: /languages
 * Requires at least: 6.2
 * Requires PHP: 8.2
 *
 * @package SedRazavi_Designer_Core
 */

if (!defined('ABSPATH')) {
    exit;
}

define('SEDRAZAVI_CORE_VERSION', '1.0.0');
define('SEDRAZAVI_CORE_FILE', __FILE__);
define('SEDRAZAVI_CORE_DIR', plugin_dir_path(__FILE__));
define('SEDRAZAVI_CORE_URI', plugin_dir_url(__FILE__));

/**
 * Autoload Core Modules
 */
require_once SEDRAZAVI_CORE_DIR . 'inc/database-installer.php';
require_once SEDRAZAVI_CORE_DIR . 'inc/auto-provisioning.php';
require_once SEDRAZAVI_CORE_DIR . 'inc/custom-post-types.php';
require_once SEDRAZAVI_CORE_DIR . 'inc/lead-manager.php';
require_once SEDRAZAVI_CORE_DIR . 'inc/auth-guard.php';
require_once SEDRAZAVI_CORE_DIR . 'inc/settings-sync.php';
require_once SEDRAZAVI_CORE_DIR . 'inc/theme-builder-bridge.php';
require_once SEDRAZAVI_CORE_DIR . 'inc/local-font-loader.php';

/**
 * Activation Hook
 */
function sedrazavi_core_activate() {
    \SedRazaviDesignerCore\Database_Installer::install();
    \SedRazaviDesignerCore\Auth_Guard::register_role();
    \SedRazaviDesignerCore\Auto_Provisioning::provision_pages_and_menus();
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'sedrazavi_core_activate');

/**
 * Deactivation Hook
 */
function sedrazavi_core_deactivate() {
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'sedrazavi_core_deactivate');

/**
 * Register Elementor Widgets Category & Widgets
 */
function sedrazavi_core_register_elementor_category($elements_manager) {
    $elements_manager->add_category(
        'sedrazavi-designer',
        [
            'title' => esc_html__('سیدرضوی استودیو (ویجت‌های اختصاصی)', 'sedrazavi-designer-core'),
            'icon'  => 'fa fa-bolt',
        ]
    );
}
add_action('elementor/elements/categories_registered', 'sedrazavi_core_register_elementor_category');

function sedrazavi_core_register_elementor_widgets($widgets_manager) {
    require_once SEDRAZAVI_CORE_DIR . 'widgets/widget-chrono-clock.php';
    require_once SEDRAZAVI_CORE_DIR . 'widgets/widget-cyber-dino.php';
    require_once SEDRAZAVI_CORE_DIR . 'widgets/widget-music-player.php';
    require_once SEDRAZAVI_CORE_DIR . 'widgets/widget-world-globe.php';

    $widgets_manager->register(new \SedRazaviDesignerCore\Widgets\Widget_Chrono_Clock());
    $widgets_manager->register(new \SedRazaviDesignerCore\Widgets\Widget_Cyber_Dino());
    $widgets_manager->register(new \SedRazaviDesignerCore\Widgets\Widget_Music_Player());
    $widgets_manager->register(new \SedRazaviDesignerCore\Widgets\Widget_World_Globe());
}
add_action('elementor/widgets/register', 'sedrazavi_core_register_elementor_widgets');

/**
 * Enqueue Core Plugin Assets
 */
function sedrazavi_core_enqueue_assets() {
    wp_enqueue_style(
        'sedrazavi-core-widgets',
        SEDRAZAVI_CORE_URI . 'assets/css/widgets.css',
        [],
        SEDRAZAVI_CORE_VERSION
    );

    wp_enqueue_script(
        'sedrazavi-core-widgets-js',
        SEDRAZAVI_CORE_URI . 'assets/js/widgets.js',
        [],
        SEDRAZAVI_CORE_VERSION,
        true
    );
}
add_action('wp_enqueue_scripts', 'sedrazavi_core_enqueue_assets');
