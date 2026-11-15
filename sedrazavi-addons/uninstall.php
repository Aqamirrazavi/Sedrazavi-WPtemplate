<?php
/**
 * SedRazavi Addons - Clean Uninstall Routine
 *
 * Respects multisite networks, removes plugin configuration/transients, and preserves
 * legal case/consultation records unless explicit destructive wipe option is enabled.
 *
 * @package SedRazavi_Addons
 */

if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

function sedrazavi_addons_uninstall_single_blog() {
    global $wpdb;

    $delete_all_data = get_option('sedrazavi_addons_delete_data_on_uninstall', 'no') === 'yes';

    $options = [
        'sedrazavi_addons_installed',
        'sedrazavi_addons_version',
        'sedrazavi_auto_portal_page_id',
        'sedrazavi_addons_delete_data_on_uninstall',
        'sedrazavi_addons_settings',
    ];
    foreach ($options as $opt) {
        delete_option($opt);
    }

    $patterns = [
        '_transient_sr_rl_%',
        '_transient_timeout_sr_rl_%',
        '_transient_sedrazavi_addons_%',
        '_transient_timeout_sedrazavi_addons_%',
    ];
    foreach ($patterns as $like) {
        $wpdb->query($wpdb->prepare("DELETE FROM {$wpdb->options} WHERE option_name LIKE %s", $like));
    }

    if (function_exists('wp_clear_scheduled_hook')) {
        wp_clear_scheduled_hook('sedrazavi_addons_daily_cleanup');
    }

    if ($delete_all_data) {
        $table_name = $wpdb->prefix . 'sedrazavi_consultations';
        $wpdb->query("DROP TABLE IF EXISTS {$table_name}");
    }
}

if (function_exists('is_multisite') && is_multisite()) {
    global $wpdb;
    $blog_ids = $wpdb->get_col("SELECT blog_id FROM {$wpdb->blogs} WHERE archived = '0' AND spam = '0' AND deleted = '0'");
    foreach ($blog_ids as $blog_id) {
        switch_to_blog($blog_id);
        sedrazavi_addons_uninstall_single_blog();
        restore_current_blog();
    }
} else {
    sedrazavi_addons_uninstall_single_blog();
}
