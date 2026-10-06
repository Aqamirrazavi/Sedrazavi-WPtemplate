<?php
/**
 * SedRazavi Interactive Onboarding & Educational Hub
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_enqueue_admin_tours')) {
function sedrazavi_enqueue_admin_tours($hook) {
    if (strpos($hook, 'sedrazavi') !== false) {
        wp_enqueue_style('shepherd-css', 'https://cdn.jsdelivr.net/npm/shepherd.js@10.0.1/dist/css/shepherd.css');
        wp_enqueue_script('shepherd-js', 'https://cdn.jsdelivr.net/npm/shepherd.js@10.0.1/dist/js/shepherd.min.js', array(), '10.0.1', true);
    }
}
add_action('admin_enqueue_scripts', 'sedrazavi_enqueue_admin_tours');
}
