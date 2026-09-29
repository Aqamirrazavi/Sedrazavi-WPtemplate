<?php
/**
 * SedRazavi Law Firm - GitHub Auto-Updater
 * Automatically checks and pulls new releases from GitHub repository
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Theme_GitHub_Updater {
    private $theme_slug = 'sedrazavi-law-theme';
    private $github_username = 'sedrazavi-studio';
    private $github_repo = 'sedrazavi-law-theme';
    private $github_response = null;

    public function __construct() {
        add_filter('site_transient_update_themes', array($this, 'check_for_theme_update'));
        add_filter('themes_api', array($this, 'theme_popup_information'), 10, 3);
        add_filter('upgrader_post_install', array($this, 'post_install_cleanup'), 10, 3);
    }

    public function check_for_theme_update($transient) {
        if (empty($transient->checked)) {
            return $transient;
        }

        $remote_data = $this->get_github_release_info();
        if ($remote_data && isset($remote_data->tag_name)) {
            $current_theme = wp_get_theme($this->theme_slug);
            $current_version = $current_theme->get('Version');
            $remote_version = ltrim($remote_data->tag_name, 'v');

            if (version_compare($current_version, $remote_version, '<')) {
                $download_link = $remote_data->assets[0]->browser_download_url ?? $remote_data->zipball_url;
                
                $transient->response[$this->theme_slug] = array(
                    'theme'       => $this->theme_slug,
                    'new_version' => $remote_version,
                    'url'         => $remote_data->html_url,
                    'package'     => $download_link,
                );
            }
        }

        return $transient;
    }

    private function get_github_release_info() {
        if ($this->github_response !== null) {
            return $this->github_response;
        }

        $api_url = sprintf('https://api.github.com/repos/%s/%s/releases/latest', $this->github_username, $this->github_repo);
        $response = wp_remote_get($api_url, array(
            'headers' => array(
                'User-Agent' => 'WordPress/' . get_bloginfo('version') . '; ' . home_url(),
                'Accept'     => 'application/vnd.github.v3+json',
            ),
            'timeout' => 10,
        ));

        if (is_wp_error($response) || 200 !== wp_remote_retrieve_response_code($response)) {
            return false;
        }

        $this->github_response = json_decode(wp_remote_retrieve_body($response));
        return $this->github_response;
    }

    public function post_install_cleanup($response, $hook_extra, $result) {
        // Ensure proper theme directory naming after GitHub zip extraction
        global $wp_filesystem;
        $proper_destination = WP_CONTENT_DIR . '/themes/' . $this->theme_slug;
        $wp_filesystem->move($result['destination'], $proper_destination);
        $result['destination'] = $proper_destination;
        return $result;
    }
}

new SedRazavi_Theme_GitHub_Updater();
