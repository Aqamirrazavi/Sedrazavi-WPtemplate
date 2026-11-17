<?php
/**
 * Theme Builder Bridge for SedRazavi Designer Core
 *
 * Provides bidirectional compatibility with Elementor Pro Theme Builder locations.
 *
 * @package SedRazavi_Designer_Core
 * @version 1.0.0
 */

namespace SedRazaviDesignerCore;

if (!defined('ABSPATH')) {
    exit;
}

class Theme_Builder_Bridge {
    private static $instance = null;

    public static function instance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function do_location($location) {
        // 1. If Elementor Pro is active, let Elementor Pro handle it cleanly
        if (function_exists('elementor_pro_load_plugin') && class_exists('\ElementorPro\Plugin')) {
            $pro_instance = \ElementorPro\Plugin::instance();
            if ($pro_instance && isset($pro_instance->modules_manager) && method_exists($pro_instance->modules_manager, 'get_modules')) {
                $modules = $pro_instance->modules_manager->get_modules('theme-builder');
                if ($modules && method_exists($modules, 'get_locations_manager')) {
                    return $modules->get_locations_manager()->do_location($location);
                }
            }
        }

        // 2. Delegate to canonical Elementor Free Theme Builder Bridge when active
        if (class_exists('\UniversalElementorSuite\Theme_Builder_Bridge')) {
            return \UniversalElementorSuite\Theme_Builder_Bridge::instance()->do_location($location);
        }

        // 3. Direct Elementor Free fallback if UAS is not installed
        if (class_exists('\Elementor\Plugin') && isset(\Elementor\Plugin::$instance->frontend)) {
            $loc_key = sanitize_key($location);
            $template_id = intval(get_option('uas_theme_builder_' . $loc_key . '_template_id', 0));
            if ($template_id > 0 && get_post_status($template_id) === 'publish') {
                echo \Elementor\Plugin::$instance->frontend->get_builder_content_for_display($template_id);
                return true;
            }
        }

        return false;
    }
}
