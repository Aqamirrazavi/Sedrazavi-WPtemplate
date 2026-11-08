<?php
/**
 * Settings & Palette Sync for SedRazavi Designer Core
 *
 * Synchronizes the 66-palette tokens with Elementor Global Kit and Theme Settings.
 *
 * @package SedRazavi_Designer_Core
 * @version 1.0.0
 */

namespace SedRazaviDesignerCore;

if (!defined('ABSPATH')) {
    exit;
}

class Settings_Sync {
    public static function init() {
        add_action('after_switch_theme', [__CLASS__, 'sync_elementor_kit']);
        add_action('elementor/init', [__CLASS__, 'maybe_sync_kit']);
    }

    public static function maybe_sync_kit() {
        if (!get_option('sedrazavi_kit_synced', false)) {
            self::sync_elementor_kit();
            update_option('sedrazavi_kit_synced', true);
        }
    }

    public static function sync_elementor_kit() {
        $active_kit_id = get_option('elementor_active_kit');
        if (!$active_kit_id) {
            return;
        }

        $kit_settings = get_post_meta($active_kit_id, '_elementor_page_settings', true);
        if (!is_array($kit_settings)) {
            $kit_settings = [];
        }

        // Inject Neon Palettes into Elementor System Colors
        $kit_settings['system_colors'] = [
            [
                '_id'   => 'primary',
                'title' => __('نئون اصلی (Primary)', 'sedrazavi-designer-core'),
                'color' => '#00f0ff',
            ],
            [
                '_id'   => 'secondary',
                'title' => __('نئون ثانویه (Secondary)', 'sedrazavi-designer-core'),
                'color' => '#ff007f',
            ],
            [
                '_id'   => 'text',
                'title' => __('متن پویا (Dynamic Text)', 'sedrazavi-designer-core'),
                'color' => '#f1f5f9',
            ],
            [
                '_id'   => 'accent',
                'title' => __('اکسنت های‌لایت (Accent)', 'sedrazavi-designer-core'),
                'color' => '#7928ca',
            ],
        ];

        // Container default padding
        $kit_settings['container_padding'] = [
            'unit'   => 'px',
            'top'    => '0',
            'right'  => '0',
            'bottom' => '0',
            'left'   => '0',
            'isLinked' => true,
        ];

        update_post_meta($active_kit_id, '_elementor_page_settings', $kit_settings);
    }
}

Settings_Sync::init();
