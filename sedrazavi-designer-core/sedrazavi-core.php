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
 * Requires PHP: 7.4
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
$sedrazavi_core_modules = [
    'inc/database-installer.php',
    'inc/auto-provisioning.php',
    'inc/custom-post-types.php',
    'inc/lead-manager.php',
    'inc/auth-guard.php',
    'inc/settings-sync.php',
    'inc/theme-builder-bridge.php',
    'inc/local-font-loader.php',
];

foreach ($sedrazavi_core_modules as $core_rel) {
    $core_file = SEDRAZAVI_CORE_DIR . $core_rel;
    if (file_exists($core_file)) {
        try {
            require_once $core_file;
        } catch (\Throwable $e) {
            error_log('[SedRazavi Designer Core] Module load error (' . $core_rel . '): ' . $e->getMessage());
        }
    }
}

/**
 * Single Site Activation Routine
 */
function sedrazavi_core_activate_single_site() {
    if (class_exists('\SedRazaviDesignerCore\Database_Installer')) {
        \SedRazaviDesignerCore\Database_Installer::install();
    }
    if (class_exists('\SedRazaviDesignerCore\Auth_Guard')) {
        \SedRazaviDesignerCore\Auth_Guard::register_role();
    }
    if (class_exists('\SedRazaviDesignerCore\Auto_Provisioning')) {
        \SedRazaviDesignerCore\Auto_Provisioning::provision_pages_and_menus();
    }
    update_option('sedrazavi_core_version', SEDRAZAVI_CORE_VERSION);
    flush_rewrite_rules(false);
}

/**
 * Activation Hook (Multisite-Aware)
 */
function sedrazavi_core_activate($network_wide = false) {
    if (function_exists('is_multisite') && is_multisite() && $network_wide) {
        global $wpdb;
        $blog_ids = $wpdb->get_col("SELECT blog_id FROM {$wpdb->blogs} WHERE archived = '0' AND spam = '0' AND deleted = '0'");
        foreach ($blog_ids as $blog_id) {
            switch_to_blog($blog_id);
            sedrazavi_core_activate_single_site();
            restore_current_blog();
        }
    } else {
        sedrazavi_core_activate_single_site();
    }
}
register_activation_hook(__FILE__, 'sedrazavi_core_activate');

/**
 * Deactivation Hook (Multisite-Aware)
 */
function sedrazavi_core_deactivate($network_wide = false) {
    if (function_exists('is_multisite') && is_multisite() && $network_wide) {
        global $wpdb;
        $blog_ids = $wpdb->get_col("SELECT blog_id FROM {$wpdb->blogs} WHERE archived = '0' AND spam = '0' AND deleted = '0'");
        foreach ($blog_ids as $blog_id) {
            switch_to_blog($blog_id);
            flush_rewrite_rules(false);
            restore_current_blog();
        }
    } else {
        flush_rewrite_rules(false);
    }
}
register_deactivation_hook(__FILE__, 'sedrazavi_core_deactivate');

/**
 * Register Elementor Widgets Category & Widgets
 */
function sedrazavi_core_register_elementor_category($elements_manager) {
    if (!is_object($elements_manager) || !method_exists($elements_manager, 'add_category')) {
        return;
    }
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
    if (!class_exists('\Elementor\Widget_Base') || !is_object($widgets_manager) || !method_exists($widgets_manager, 'register')) {
        return;
    }

    $widget_map = [
        'widgets/widget-chrono-clock.php' => '\SedRazaviDesignerCore\Widgets\Widget_Chrono_Clock',
        'widgets/widget-cyber-dino.php'   => '\SedRazaviDesignerCore\Widgets\Widget_Cyber_Dino',
        'widgets/widget-music-player.php' => '\SedRazaviDesignerCore\Widgets\Widget_Music_Player',
        'widgets/widget-world-globe.php'  => '\SedRazaviDesignerCore\Widgets\Widget_World_Globe',
    ];

    foreach ($widget_map as $rel => $cls) {
        $path = SEDRAZAVI_CORE_DIR . $rel;
        if (file_exists($path)) {
            require_once $path;
            if (class_exists($cls)) {
                $widgets_manager->register(new $cls());
            }
        }
    }
}
add_action('elementor/widgets/register', 'sedrazavi_core_register_elementor_widgets');

/**
 * Enqueue Core Plugin Assets (only when files exist)
 */
function sedrazavi_core_enqueue_assets() {
    if (file_exists(SEDRAZAVI_CORE_DIR . 'assets/css/widgets.css')) {
        wp_enqueue_style(
            'sedrazavi-core-widgets',
            SEDRAZAVI_CORE_URI . 'assets/css/widgets.css',
            [],
            SEDRAZAVI_CORE_VERSION
        );
    }

    if (file_exists(SEDRAZAVI_CORE_DIR . 'assets/js/widgets.js')) {
        wp_enqueue_script(
            'sedrazavi-core-widgets-js',
            SEDRAZAVI_CORE_URI . 'assets/js/widgets.js',
            [],
            SEDRAZAVI_CORE_VERSION,
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'sedrazavi_core_enqueue_assets');
