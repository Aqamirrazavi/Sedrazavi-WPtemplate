<?php
/**
 * Universal Elementor Addon Suite - Clean Uninstall Routine
 *
 * Executed only when user clicks "Delete" on the plugin in the WordPress Plugins screen.
 * Strictly adheres to WordPress core uninstallation standards and respects multisite networks.
 *
 * @package Universal_Elementor_Suite
 */

if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

/**
 * Clean data for a single WordPress blog
 */
function uas_uninstall_single_blog() {
    global $wpdb;

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

    // 2. Clean up all registered plugin options
    $options_to_delete = [
        'uas_version',
        'uas_custom_category_name',
        'uas_custom_category_icon',
        'uas_disabled_widgets',
        'uas_delete_templates_on_uninstall',
        'uas_settings',
        'uas_github_settings',
        'uas_captured_leads_vault',
        'uas_security_audit_logs',
        'uas_plugin_activated_time',
        'uas_theme_builder_header_template_id',
        'uas_theme_builder_footer_template_id',
        'uas_theme_builder_404_template_id',
        'uas_theme_builder_single_template_id',
        'uas_theme_builder_single-post_template_id',
        'uas_theme_builder_archive_template_id',
    ];

    foreach ($options_to_delete as $opt) {
        delete_option($opt);
    }

    // 3. Clean up dynamic package options & all plugin transients cleanly using $wpdb->prepare
    $dynamic_prefixes = [
        'uas_bundle_integrity_%',
        'uas_bundle_integrity_error_%',
        'uas_pkg_rollback_snapshot_%',
        'uas_skipped_templates_%',
        '_transient_uas_%',
        '_transient_timeout_uas_%',
        '_site_transient_uas_%',
        '_site_transient_timeout_uas_%',
    ];
    foreach ($dynamic_prefixes as $like_pattern) {
        $wpdb->query($wpdb->prepare("DELETE FROM {$wpdb->options} WHERE option_name LIKE %s", $like_pattern));
    }

    // 4. Clear any scheduled plugin cron events
    if (function_exists('wp_clear_scheduled_hook')) {
        wp_clear_scheduled_hook('uas_daily_maintenance');
        wp_clear_scheduled_hook('uas_github_sync_cron');
    }
}

/**
 * Recursively remove plugin directories inside wp-content/uploads/
 */
function uas_uninstall_rmdir_recursive($dir) {
    if (!is_dir($dir)) {
        return;
    }
    $items = scandir($dir);
    if (!is_array($items)) {
        return;
    }
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') {
            continue;
        }
        $path = rtrim($dir, '/\\') . DIRECTORY_SEPARATOR . $item;
        if (is_dir($path)) {
            uas_uninstall_rmdir_recursive($path);
        } else {
            @unlink($path);
        }
    }
    @rmdir($dir);
}

// Handle Multisite vs Single Site
if (function_exists('is_multisite') && is_multisite()) {
    global $wpdb;
    $blog_ids = $wpdb->get_col("SELECT blog_id FROM {$wpdb->blogs} WHERE archived = '0' AND spam = '0' AND deleted = '0'");
    foreach ($blog_ids as $blog_id) {
        switch_to_blog($blog_id);
        uas_uninstall_single_blog();
        restore_current_blog();
    }
} else {
    uas_uninstall_single_blog();
}

// 5. Remove generated standalone packages and template cache directories recursively
$upload_dir = wp_upload_dir();
if (is_array($upload_dir) && empty($upload_dir['error']) && !empty($upload_dir['basedir'])) {
    $cache_dirs = [
        trailingslashit($upload_dir['basedir']) . 'uas-standalone-packages',
        trailingslashit($upload_dir['basedir']) . 'uas-cache',
    ];
    foreach ($cache_dirs as $dir) {
        uas_uninstall_rmdir_recursive($dir);
    }
}
