<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Unified CSS & JS Asset Manifest Manager
 *
 * Serves as Single Source of Truth for frontend, Elementor Editor,
 * and WP Admin asset handles, eliminating duplicate registrations and
 * preventing unscoped asset bloat.
 *
 * @package Universal_Elementor_Suite
 */
class Asset_Manifest {

    private static $_instance = null;

    /**
     * Cached decoded manifest
     *
     * @var array|null
     */
    private $manifest = null;

    /**
     * Track registered scopes per request to guarantee idempotency
     *
     * @var array
     */
    private $registered_scopes = [];

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Load manifest from canonical assets/asset-manifest.json
     *
     * @return array
     */
    public function get_manifest() {
        if ($this->manifest !== null) {
            return $this->manifest;
        }

        $manifest_path = UAS_PATH . 'assets/asset-manifest.json';
        if (!file_exists($manifest_path)) {
            $this->manifest = ['scopes' => []];
            return $this->manifest;
        }

        $decoded = json_decode((string) file_get_contents($manifest_path), true);
        $this->manifest = is_array($decoded) ? $decoded : ['scopes' => []];
        return $this->manifest;
    }

    /**
     * Retrieve entries for a given scope ('frontend', 'editor', 'admin')
     *
     * @param string $scope
     * @return array
     */
    public function get_scope_assets($scope) {
        $manifest = $this->get_manifest();
        return isset($manifest['scopes'][$scope]) && is_array($manifest['scopes'][$scope])
            ? $manifest['scopes'][$scope]
            : ['styles' => [], 'scripts' => []];
    }

    /**
     * Register all styles or scripts belonging to a specific scope cleanly once.
     *
     * @param string $scope 'frontend' | 'editor' | 'admin'
     * @param string $kind  'all' | 'styles' | 'scripts'
     */
    public function register_scope($scope, $kind = 'all') {
        $scope_assets = $this->get_scope_assets($scope);

        if (($kind === 'all' || $kind === 'styles') && empty($this->registered_scopes[$scope . ':styles'])) {
            foreach (($scope_assets['styles'] ?? []) as $entry) {
                $handle = $entry['handle'] ?? '';
                $rel    = $entry['path'] ?? '';
                if (!$handle || !$rel) {
                    continue;
                }
                $abs = UAS_PATH . ltrim($rel, '/');
                if (!file_exists($abs)) {
                    continue;
                }
                if (!wp_style_is($handle, 'registered')) {
                    wp_register_style(
                        $handle,
                        UAS_URL . ltrim($rel, '/'),
                        $entry['deps'] ?? [],
                        defined('UAS_VERSION') ? UAS_VERSION : '1.0.0'
                    );
                }
            }
            $this->registered_scopes[$scope . ':styles'] = true;
        }

        if (($kind === 'all' || $kind === 'scripts') && empty($this->registered_scopes[$scope . ':scripts'])) {
            foreach (($scope_assets['scripts'] ?? []) as $entry) {
                $handle = $entry['handle'] ?? '';
                $rel    = $entry['path'] ?? '';
                if (!$handle || !$rel) {
                    continue;
                }
                $abs = UAS_PATH . ltrim($rel, '/');
                if (!file_exists($abs)) {
                    continue;
                }
                if (!wp_script_is($handle, 'registered')) {
                    wp_register_script(
                        $handle,
                        UAS_URL . ltrim($rel, '/'),
                        $entry['deps'] ?? [],
                        defined('UAS_VERSION') ? UAS_VERSION : '1.0.0',
                        !empty($entry['in_footer'])
                    );
                }
                if (!empty($entry['localize'])) {
                    $this->maybe_localize($handle, $entry['localize']);
                }
            }
            $this->registered_scopes[$scope . ':scripts'] = true;
        }
    }

    /**
     * Enqueue non-conditional assets for a scope (or a specific handle)
     *
     * @param string $scope
     * @param array|null $handles Optional explicit subset of handles to enqueue
     */
    public function enqueue_scope($scope, $handles = null) {
        $this->register_scope($scope, 'all');
        $scope_assets = $this->get_scope_assets($scope);

        foreach (($scope_assets['styles'] ?? []) as $entry) {
            $handle = $entry['handle'] ?? '';
            if (!$handle) {
                continue;
            }
            if ($handles !== null && !in_array($handle, $handles, true)) {
                continue;
            }
            if ($handles === null && !empty($entry['conditional'])) {
                continue;
            }
            if (wp_style_is($handle, 'registered')) {
                wp_enqueue_style($handle);
            }
        }

        foreach (($scope_assets['scripts'] ?? []) as $entry) {
            $handle = $entry['handle'] ?? '';
            if (!$handle) {
                continue;
            }
            if ($handles !== null && !in_array($handle, $handles, true)) {
                continue;
            }
            if ($handles === null && !empty($entry['conditional'])) {
                continue;
            }
            if (wp_script_is($handle, 'registered')) {
                wp_enqueue_script($handle);
            }
        }
    }

    /**
     * Single point localization payload generator (deduplicated per handle)
     */
    private function maybe_localize($handle, $object_name) {
        static $localized = [];
        $key = $handle . ':' . $object_name;
        if (!empty($localized[$key])) {
            return;
        }
        $localized[$key] = true;

        if ($object_name === 'uasFrontendConfig') {
            wp_localize_script($handle, 'uasFrontendConfig', [
                'restUrl'   => function_exists('rest_url') ? esc_url_raw(rest_url('sedrazavi/v1/')) : '/wp-json/sedrazavi/v1/',
                'restNonce' => function_exists('wp_create_nonce') ? wp_create_nonce('wp_rest') : '',
                'ajaxUrl'   => admin_url('admin-ajax.php'),
                'ajaxNonce' => function_exists('wp_create_nonce') ? wp_create_nonce('uas_industry_nonce') : '',
            ]);
        } elseif ($object_name === 'uasIndustryConfig') {
            wp_localize_script($handle, 'uasIndustryConfig', [
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'nonce'   => function_exists('wp_create_nonce') ? wp_create_nonce('uas_industry_nonce') : '',
            ]);
        } elseif ($object_name === 'uasAdminVars') {
            wp_localize_script($handle, 'uasAdminVars', [
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'nonce'   => function_exists('wp_create_nonce') ? wp_create_nonce('uas_admin_nonce') : '',
            ]);
        }
    }
}
