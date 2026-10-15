<?php
/**
 * Child Theme Functions & Definitions
 *
 * @package SedRazavi_Lawyer_Child
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style('sedrazavi-parent-style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style('sedrazavi-child-style', get_stylesheet_directory_uri() . '/style.css', array('sedrazavi-parent-style'), wp_get_theme()->get('Version'));
});
