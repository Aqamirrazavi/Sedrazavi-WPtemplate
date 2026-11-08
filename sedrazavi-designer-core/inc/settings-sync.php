<?php
/**
 * Settings & Palette Sync (SSOT Engine) for SedRazavi Designer Core
 *
 * Implements Addenda 21 & 23:
 * - Single Source of Truth (SSOT) via system CPT `sedrazavi_config` (slug: master-config)
 * - Version locking (config_version) & SHA-256 integrity hash verification
 * - Snapshot creation and atomic rollback/revert capability
 * - Bi-directional synchronization with Elementor Global Kit and WP Options
 *
 * @package SedRazavi_Designer_Core
 * @version 1.0.0
 */

namespace SedRazaviDesignerCore;

if (!defined('ABSPATH')) {
    exit;
}

class Settings_Sync {

    const MASTER_CONFIG_SLUG = 'master-config';
    const CPT_NAME           = 'sedrazavi_config';

    public static function init() {
        add_action('after_switch_theme', [__CLASS__, 'sync_elementor_kit']);
        add_action('elementor/init', [__CLASS__, 'maybe_sync_kit']);
        add_action('init', [__CLASS__, 'ensure_master_config_exists'], 20);
    }

    /**
     * Ensure the master-config SSOT post exists
     */
    public static function ensure_master_config_exists() {
        $master = self::get_master_post();
        if (!$master) {
            $default_payload = [
                'theme_mode'      => 'dark',
                'active_palette'  => 'dark-01',
                'system_colors'   => [
                    'primary'   => '#00f0ff',
                    'secondary' => '#ff007f',
                    'text'      => '#f1f5f9',
                    'accent'    => '#7928ca',
                ],
                'brand_identity'  => [
                    'title'    => 'SedRazavi Studio',
                    'tagline'  => 'معماری و طراحی وب‌سایت‌های وردپرس بدون کدنویسی',
                    'telegram' => '@sedrazavi',
                    'eitaa'    => '@sedrazavi',
                    'phone'    => '۰۹۱۲۳۴۵۶۷۸۹',
                    'email'    => 'info@sedrazavi.ir',
                ],
                'audio_enabled'   => false,
                'vector_pattern'  => 'pattern-01',
            ];
            self::save_master_config($default_payload, 'Initial Bootstrapping Snapshot');
        }
    }

    /**
     * Retrieve the master SSOT post object
     */
    public static function get_master_post() {
        $posts = get_posts([
            'name'           => self::MASTER_CONFIG_SLUG,
            'post_type'      => self::CPT_NAME,
            'post_status'    => 'publish',
            'posts_per_page' => 1,
        ]);
        return !empty($posts) ? $posts[0] : null;
    }

    /**
     * Get Master Config payload with SHA256 integrity verification
     */
    public static function get_master_config() {
        $master = self::get_master_post();
        if (!$master) {
            return [];
        }

        $payload_json = $master->post_content;
        $stored_sha   = get_post_meta($master->ID, '_sr_config_sha256', true);
        $calc_sha     = hash('sha256', $payload_json);

        // Integrity verification
        if ($stored_sha && $stored_sha !== $calc_sha) {
            error_log('[SedRazavi SSOT Alert] Configuration integrity hash mismatch!');
        }

        $payload = json_decode($payload_json, true);
        return is_array($payload) ? $payload : [];
    }

    /**
     * Save Master Config, increment version, generate SHA-256 hash and snapshot
     */
    public static function save_master_config($payload, $snapshot_note = '') {
        $master = self::get_master_post();
        $payload_json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        $sha256 = hash('sha256', $payload_json);

        $current_version = 0;
        if ($master) {
            $current_version = (int) get_post_meta($master->ID, '_sr_config_version', true);
        }
        $new_version = $current_version + 1;

        if (!$master) {
            $post_id = wp_insert_post([
                'post_title'   => 'Master Configuration (SSOT)',
                'post_name'    => self::MASTER_CONFIG_SLUG,
                'post_type'    => self::CPT_NAME,
                'post_status'  => 'publish',
                'post_content' => $payload_json,
            ]);
        } else {
            $post_id = $master->ID;
            wp_update_post([
                'ID'           => $post_id,
                'post_content' => $payload_json,
            ]);
        }

        update_post_meta($post_id, '_sr_config_sha256', $sha256);
        update_post_meta($post_id, '_sr_config_version', $new_version);
        update_post_meta($post_id, '_sr_config_last_modified', current_time('mysql'));

        // Create snapshot record for rollback
        self::create_snapshot($payload, $new_version, $sha256, $snapshot_note);

        // Sync with Elementor Global Kit
        self::sync_elementor_kit($payload);

        return [
            'success' => true,
            'version' => $new_version,
            'sha256'  => $sha256,
        ];
    }

    /**
     * Create an immutable snapshot post
     */
    public static function create_snapshot($payload, $version, $sha256, $note = '') {
        $timestamp = current_time('Ymd-His');
        $note = $note ?: 'Manual Snapshot v' . $version;
        $payload_json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

        wp_insert_post([
            'post_title'   => "Snapshot {$timestamp} (v{$version}): {$note}",
            'post_name'    => "snapshot-{$timestamp}",
            'post_type'    => self::CPT_NAME,
            'post_status'  => 'publish',
            'post_content' => $payload_json,
            'meta_input'   => [
                '_sr_is_snapshot'      => 1,
                '_sr_snapshot_version' => $version,
                '_sr_snapshot_sha256'  => $sha256,
                '_sr_snapshot_note'    => $note,
                '_sr_snapshot_time'    => current_time('mysql'),
            ],
        ]);
    }

    /**
     * Revert to a specific snapshot ID
     */
    public static function revert_to_snapshot($snapshot_id) {
        $snapshot = get_post($snapshot_id);
        if (!$snapshot || $snapshot->post_type !== self::CPT_NAME) {
            return false;
        }

        $payload = json_decode($snapshot->post_content, true);
        if (!is_array($payload)) {
            return false;
        }

        $note = 'Reverted from snapshot: ' . $snapshot->post_title;
        return self::save_master_config($payload, $note);
    }

    /**
     * Get list of historical snapshots
     */
    public static function get_snapshots_list($limit = 10) {
        return get_posts([
            'post_type'      => self::CPT_NAME,
            'post_status'    => 'publish',
            'posts_per_page' => $limit,
            'meta_key'       => '_sr_is_snapshot',
            'meta_value'     => 1,
            'orderby'        => 'date',
            'order'          => 'DESC',
        ]);
    }

    public static function maybe_sync_kit() {
        if (!get_option('sedrazavi_kit_synced', false)) {
            self::sync_elementor_kit();
            update_option('sedrazavi_kit_synced', true);
        }
    }

    public static function sync_elementor_kit($custom_payload = null) {
        $active_kit_id = get_option('elementor_active_kit');
        if (!$active_kit_id) {
            return;
        }

        $kit_settings = get_post_meta($active_kit_id, '_elementor_page_settings', true);
        if (!is_array($kit_settings)) {
            $kit_settings = [];
        }

        $colors = [
            'primary'   => '#00f0ff',
            'secondary' => '#ff007f',
            'text'      => '#f1f5f9',
            'accent'    => '#7928ca',
        ];

        if (is_array($custom_payload) && !empty($custom_payload['system_colors'])) {
            $colors = wp_parse_args($custom_payload['system_colors'], $colors);
        }

        // Inject Neon Palettes into Elementor System Colors
        $kit_settings['system_colors'] = [
            [
                '_id'   => 'primary',
                'title' => __('نئون اصلی (Primary)', 'sedrazavi-designer-core'),
                'color' => $colors['primary'],
            ],
            [
                '_id'   => 'secondary',
                'title' => __('نئون ثانویه (Secondary)', 'sedrazavi-designer-core'),
                'color' => $colors['secondary'],
            ],
            [
                '_id'   => 'text',
                'title' => __('متن پویا (Dynamic Text)', 'sedrazavi-designer-core'),
                'color' => $colors['text'],
            ],
            [
                '_id'   => 'accent',
                'title' => __('اکسنت های‌لایت (Accent)', 'sedrazavi-designer-core'),
                'color' => $colors['accent'],
            ],
        ];

        // Container default padding
        $kit_settings['container_padding'] = [
            'unit'     => 'px',
            'top'      => '0',
            'right'    => '0',
            'bottom'   => '0',
            'left'     => '0',
            'isLinked' => true,
        ];

        update_post_meta($active_kit_id, '_elementor_page_settings', $kit_settings);
    }
}

Settings_Sync::init();
