<?php
/**
 * Database Installer for SedRazavi Designer Core
 *
 * Creates dedicated custom tables for inquiries and internal client messaging.
 *
 * @package SedRazavi_Designer_Core
 * @version 1.0.0
 */

namespace SedRazaviDesignerCore;

if (!defined('ABSPATH')) {
    exit;
}

class Database_Installer {
    public static function install() {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();
        $inquiries_table = $wpdb->prefix . 'sedrazavi_inquiries';
        $messages_table  = $wpdb->prefix . 'sedrazavi_messages';

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';

        $sql_inquiries = "CREATE TABLE $inquiries_table (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            tracking_code VARCHAR(32) NOT NULL,
            client_name VARCHAR(128) NOT NULL,
            client_phone VARCHAR(32) NOT NULL,
            client_email VARCHAR(128) DEFAULT '' NOT NULL,
            project_type VARCHAR(64) DEFAULT 'landing' NOT NULL,
            project_desc TEXT NOT NULL,
            status VARCHAR(32) DEFAULT 'received' NOT NULL,
            notes TEXT DEFAULT '',
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            UNIQUE KEY uq_tracking_code (tracking_code),
            KEY idx_phone (client_phone),
            KEY idx_status (status)
        ) $charset_collate;";

        $sql_messages = "CREATE TABLE $messages_table (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            inquiry_id BIGINT(20) UNSIGNED NOT NULL,
            sender_type VARCHAR(20) DEFAULT 'client' NOT NULL,
            message_text TEXT NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            KEY idx_inquiry_id (inquiry_id)
        ) $charset_collate;";

        dbDelta($sql_inquiries);
        dbDelta($sql_messages);

        update_option('sedrazavi_db_version', '1.0.0');
    }
}
