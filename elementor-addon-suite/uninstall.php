<?php
/**
 * Universal Elementor Addon Suite - Clean Uninstall Routine
 *
 * Executed only when user clicks "Delete" on the plugin in the WordPress Plugins screen.
 */

if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// 1. Check if user configured to delete saved templates
$delete_templates = get_option('uas_delete_templates_on_uninstall', 'no');

if ($delete_templates === 'yes') {
    $templates = get_posts([
        'post_type'      => 'elementor_library',
        'post_status'    => 'any',
        'posts_per_page' => -1,
        'meta_key'       => '_uas_template_slug',
    ]);

    if (!empty($templates)) {
        foreach ($templates as $tmpl) {
            wp_delete_post($tmpl->ID, true);
        }
    }
}

// 2. Clean up all options
delete_option('uas_custom_category_name');
delete_option('uas_custom_category_icon');
delete_option('uas_disabled_widgets');
delete_option('uas_delete_templates_on_uninstall');
delete_option('uas_settings');

// 3. Clean up transients if any
delete_transient('uas_elementor_cache');
