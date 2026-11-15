<?php
/**
 * SedRazavi Designer Core - Clean Uninstall Routine
 *
 * Removes runtime options, transients, and (when opted in) custom tables across single & multisite installs.
 *
 * @package SedRazavi_Designer_Core
 */

if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

function sedrazavi_core_uninstall_single_blog() {
    global $wpdb;

    $delete_all = get_option('sedrazavi_core_delete_data_on_uninstall', 'no') === 'yes';

    $options = [
        'sedrazavi_core_version',
        'sedrazavi_db_version',
        'sedrazavi_kit_synced',
        'sedrazavi_core_delete_data_on_uninstall',
    ];
    foreach ($options as $opt) {
        delete_option($opt);
    }

    $patterns = [
        '_transient_sedrazavi_core_%',
        '_transient_timeout_sedrazavi_core_%',
    ];
    foreach ($patterns as $like) {
        $wpdb->query($wpdb->prepare("DELETE FROM {$wpdb->options} WHERE option_name LIKE %s", $like));
    }

    if ($delete_all) {
        $inquiries_table = $wpdb->prefix . 'sedrazavi_inquiries';
        $messages_table  = $wpdb->prefix . 'sedrazavi_messages';
        $wpdb->query("DROP TABLE IF EXISTS {$messages_table}");
        $wpdb->query("DROP TABLE IF EXISTS {$inquiries_table}");
        if (function_exists('remove_role')) {
            remove_role('sedrazavi_client');
        }
    }
}

if (function_exists('is_multisite') && is_multisite()) {
    global $wpdb;
    $blog_ids = $wpdb->get_col("SELECT blog_id FROM {$wpdb->blogs} WHERE archived = '0' AND spam = '0' AND deleted = '0'");
    foreach ($blog_ids as $blog_id) {
        switch_to_blog($blog_id);
        sedrazavi_core_uninstall_single_blog();
        restore_current_blog();
    }
} else {
    sedrazavi_core_uninstall_single_blog();
}
