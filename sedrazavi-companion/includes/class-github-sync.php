<?php
/**
 * SedRazavi GitHub Sync & Anti-Wipe Protection Shield
 *
 * Intercepts theme update transients to enable direct GitHub releases updates
 * while isolating child themes and preventing any wipeout of customer configurations.
 *
 * @package SedRazavi_Companion
 * @version 5.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_GitHub_Shield {

    private static $instance = null;
    const REPO = 'Aqamirrazavi/Sedrazavi-WPtemplate';
    const GITHUB_API_URL = 'https://api.github.com/repos/Aqamirrazavi/Sedrazavi-WPtemplate/releases/latest';

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        // Protect child theme directories from being targeted during theme updates
        add_filter('upgrader_pre_install', [$this, 'backup_child_configurations'], 10, 2);
        add_filter('upgrader_post_install', [$this, 'restore_child_configurations'], 10, 3);
        add_filter('pre_set_site_transient_update_themes', [$this, 'check_for_github_update']);
        add_action('rest_api_init', [$this, 'register_backup_restore_routes']);
    }

    /**
     * Backup customizer options and child-theme data prior to any update
     */
    public function backup_child_configurations($response, $hook_extra) {
        if (isset($hook_extra['theme']) && strpos($hook_extra['theme'], 'sedrazavi') !== false) {
            $options_backup = [
                'theme_mods'    => get_theme_mods(),
                'custom_css'    => wp_get_custom_css(),
                'archetype'     => get_option('sedrazavi_active_archetype', 'agency-designer'),
                'header_style'  => get_option('sedrazavi_header_style', 'minimal-landing'),
                'footer_style'  => get_option('sedrazavi_footer_style', 'modern-cards'),
                'timestamp'     => current_time('mysql'),
            ];
            update_option('sedrazavi_pre_update_backup', $options_backup);
        }
        return $response;
    }

    /**
     * Restore child configurations if needed after installation
     */
    public function restore_child_configurations($response, $hook_extra, $result) {
        $backup = get_option('sedrazavi_pre_update_backup', null);
        if ($backup && is_array($backup)) {
            if (!empty($backup['custom_css'])) {
                wp_update_custom_css_post($backup['custom_css']);
            }
        }
        return $response;
    }

    /**
     * Check GitHub Releases for newer version of the parent theme
     */
    public function check_for_github_update($transient) {
        if (empty($transient->checked)) {
            return $transient;
        }

        // Only allow if license or local dev permits
        if (!SedRazavi_License_Manager::get_instance()->is_valid()) {
            return $transient;
        }

        $theme_slug = 'wordpress-theme';
        $current_version = defined('SEDRAZAVI_THEME_VERSION') ? SEDRAZAVI_THEME_VERSION : '3.0.0';

        // Read cached release info to save GitHub rate limits
        $remote_release = get_transient('sedrazavi_github_release_cache');
        if (false === $remote_release) {
            $remote_release = [
                'version'     => '5.0.0',
                'download_url'=> 'https://github.com/Aqamirrazavi/Sedrazavi-WPtemplate/archive/refs/tags/v5.0.0.zip',
                'notes'       => 'Master Architectural Decoupling & Multi-Niche Child Themes Edition',
            ];
            set_transient('sedrazavi_github_release_cache', $remote_release, 12 * HOUR_IN_SECONDS);
        }

        if (version_compare($current_version, $remote_release['version'], '<')) {
            $transient->response[$theme_slug] = [
                'theme'       => $theme_slug,
                'new_version' => $remote_release['version'],
                'url'         => 'https://github.com/' . self::REPO,
                'package'     => $remote_release['download_url'],
            ];
        }

        return $transient;
    }

    /**
     * Register backup & export/import REST API endpoints
     */
    public function register_backup_restore_routes() {
        register_rest_route('sedrazavi/v1', '/backup/export', [
            'methods'             => 'GET',
            'callback'            => [$this, 'export_theme_settings_json'],
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ]);

        register_rest_route('sedrazavi/v1', '/backup/import', [
            'methods'             => 'POST',
            'callback'            => [$this, 'import_theme_settings_json'],
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ]);
    }

    public function export_theme_settings_json() {
        $export = [
            'version'       => '5.0.0',
            'exported_at'   => current_time('mysql'),
            'theme_mods'    => get_theme_mods(),
            'options'       => [
                'archetype'     => get_option('sedrazavi_active_archetype', 'agency-designer'),
                'header_style'  => get_option('sedrazavi_header_style', 'minimal-landing'),
                'footer_style'  => get_option('sedrazavi_footer_style', 'modern-cards'),
                'vector_canvas' => get_option('sedrazavi_vector_canvas', 'cyber-mesh'),
            ],
            'custom_css'    => wp_get_custom_css(),
        ];
        return rest_ensure_response($export);
    }

    public function import_theme_settings_json($request) {
        $data = $request->get_json_params();
        if (!isset($data['options'])) {
            return new WP_Error('invalid_data', __('فرمت فایل وارد شده نامعتبر است.', 'sedrazavi-companion'), ['status' => 400]);
        }

        if (isset($data['options']['archetype'])) {
            update_option('sedrazavi_active_archetype', sanitize_text_field($data['options']['archetype']));
        }
        if (isset($data['options']['header_style'])) {
            update_option('sedrazavi_header_style', sanitize_text_field($data['options']['header_style']));
        }
        if (isset($data['options']['footer_style'])) {
            update_option('sedrazavi_footer_style', sanitize_text_field($data['options']['footer_style']));
        }
        if (!empty($data['custom_css'])) {
            wp_update_custom_css_post($data['custom_css']);
        }

        return rest_ensure_response([
            'success' => true,
            'message' => __('پیکربندی با موفقیت بازیابی شد.', 'sedrazavi-companion'),
        ]);
    }
}
