<?php
/**
 * Dedicated Designer Theme Frontend Cockpit Loader
 *
 * @package SedRazavi_Designer_Theme
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (file_exists(get_template_directory() . '/inc/frontend-cockpit-engine.php')) {
    require_once get_template_directory() . '/inc/frontend-cockpit-engine.php';
}
