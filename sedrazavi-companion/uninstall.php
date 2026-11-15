<?php
/**
 * SedRazavi Companion - Clean Uninstall Routine
 *
 * Removes transient caches, cron events, and companion runtime options across single & multisite installs.
 *
 * @package SedRazavi_Companion
 */

if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

function sedrazavi_companion_uninstall_single_blog() {
    global $wpdb;

    $options = [
        'sedrazavi_companion_activated_time',
        'sedrazavi_companion_version',
        'sedrazavi_companion_license_status',
        'sedrazavi_companion_snapshots_index',
    ];
    foreach ($options as $opt) {
        delete_option($opt);
    }

    $patterns = [
        '_transient_sedrazavi_companion_%',
        '_transient_timeout_sedrazavi_companion_%',
        '_site_transient_sedrazavi_companion_%',
        '_site_transient_timeout_sedrazavi_companion_%',
    ];
    foreach ($patterns as $like) {
        $wpdb->query($wpdb->prepare("DELETE FROM {$wpdb->options} WHERE option_name LIKE %s", $like));
    }

    if (function_exists('wp_clear_scheduled_hook')) {
        wp_clear_scheduled_hook('sedrazavi_companion_health_cron');
    }
}

if (function_exists('is_multisite') && is_multisite()) {
    global $wpdb;
    $blog_ids = $wpdb->get_col("SELECT blog_id FROM {$wpdb->blogs} WHERE archived = '0' AND spam = '0' AND deleted = '0'");
    foreach ($blog_ids as $blog_id) {
        switch_to_blog($blog_id);
        sedrazavi_companion_uninstall_single_blog();
        restore_current_blog();
    }
} else {
    sedrazavi_companion_uninstall_single_blog();
}
