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
        // If Elementor Pro is active, let Elementor Pro handle it
        if (function_exists('elementor_pro_load_plugin')) {
            $modules = \ElementorPro\Plugin::instance()->modules_manager->get_modules('theme-builder');
            if ($modules) {
                return $modules->get_locations_manager()->do_location($location);
            }
        }
        return false;
    }
}
