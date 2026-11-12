<?php
namespace UniversalElementorSuite;

use UniversalElementorSuite\Packaging\Archive_Security_Validator;
use UniversalElementorSuite\Packaging\Dependency_Resolver;
use UniversalElementorSuite\Packaging\Package_Exporter;
use UniversalElementorSuite\Packaging\Package_Installer;
use UniversalElementorSuite\Packaging\Package_Manifest_Validator;
use UniversalElementorSuite\Packaging\Package_Registry;

if (!defined('ABSPATH')) {
    exit;
}

require_once __DIR__ . '/packaging/class-package-registry.php';
require_once __DIR__ . '/packaging/class-package-manifest-validator.php';
require_once __DIR__ . '/packaging/class-dependency-resolver.php';
require_once __DIR__ . '/packaging/class-archive-security-validator.php';
require_once __DIR__ . '/packaging/class-package-exporter.php';
require_once __DIR__ . '/packaging/class-package-installer.php';

/**
 * Modular Capability Package Manager & Standalone ZIP Exporter (Facade / Orchestrator)
 *
 * Delegates package registry, manifest & SHA-256 checksum validation, dependency graph resolution,
 * archive security auditing, standalone bundle building, and atomic installation/rollback
 * to single-responsibility modules under includes/packaging/.
 *
 * @package Universal_Elementor_Suite
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */
class Package_Manager {

    private static $_instance = null;

    /** @var Package_Registry */
    private $registry;

    /** @var Package_Manifest_Validator */
    private $manifest_validator;

    /** @var Dependency_Resolver */
    private $dependency_resolver;

    /** @var Archive_Security_Validator */
    private $security_validator;

    /** @var Package_Exporter */
    private $exporter;

    /** @var Package_Installer */
    private $installer;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        $this->registry            = new Package_Registry();
        $this->manifest_validator  = new Package_Manifest_Validator();
        $this->dependency_resolver = new Dependency_Resolver();
        $this->security_validator  = new Archive_Security_Validator();
        $this->exporter            = new Package_Exporter();
        $this->installer           = new Package_Installer();

        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_action('admin_post_uas_download_package', [$this, 'handle_package_download']);
        add_action('admin_post_uas_download_custom_bundle', [$this, 'handle_custom_bundle_download']);
        add_action('wp_ajax_uas_export_package', [$this, 'ajax_export_package']);
        add_action('wp_ajax_uas_build_custom_bundle', [$this, 'ajax_build_custom_bundle']);
    }

    /**
     * Register REST API routes for package management
     */
    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/packages', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_packages'],
            'permission_callback' => [$this, 'check_admin_permission'],
        ]);

        register_rest_route('sedrazavi/v1', '/packages/export', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_export_package'],
            'permission_callback' => [$this, 'check_admin_permission'],
        ]);

        register_rest_route('sedrazavi/v1', '/packages/build-custom-bundle', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_build_custom_bundle'],
            'permission_callback' => [$this, 'check_admin_permission'],
        ]);

        register_rest_route('sedrazavi/v1', '/packages/preflight', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_preflight_check'],
            'permission_callback' => [$this, 'check_admin_permission'],
        ]);

        register_rest_route('sedrazavi/v1', '/packages/import', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_import_package'],
            'permission_callback' => [$this, 'check_admin_permission'],
        ]);

        register_rest_route('sedrazavi/v1', '/packages/rollback', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_rollback_package'],
            'permission_callback' => [$this, 'check_admin_permission'],
        ]);
    }

    public function check_admin_permission() {
        return current_user_can('manage_options');
    }

    public function get_portable_packages() {
        return $this->registry->get_portable_packages();
    }

    public function validate_manifest(array $manifest) {
        return $this->manifest_validator->validate_manifest($manifest);
    }

    public function export_standalone_package($package_id) {
        return $this->exporter->export_standalone_package(
            $package_id,
            $this->get_portable_packages(),
            $this->manifest_validator
        );
    }

    public function resolve_package_dependencies($package_id, array &$resolved = [], array &$unresolved = []) {
        return $this->dependency_resolver->resolve_package_dependencies(
            $package_id,
            $this->get_portable_packages(),
            $resolved,
            $unresolved
        );
    }

    public function check_package_conflicts($package_id) {
        return $this->dependency_resolver->check_package_conflicts(
            $package_id,
            $this->get_portable_packages()
        );
    }

    public function build_custom_project_bundle(array $params) {
        return $this->exporter->build_custom_project_bundle(
            $params,
            $this->registry->get_widget_catalog(),
            $this->dependency_resolver,
            $this->manifest_validator,
            $this->registry
        );
    }

    public function get_gutenberg_blocks_catalog() {
        return $this->registry->get_gutenberg_blocks_catalog();
    }

    public function get_cpt_schemas_catalog() {
        return $this->registry->get_cpt_schemas_catalog();
    }

    public function verify_archive_security($zip_filepath) {
        return $this->security_validator->verify_archive_security(
            $zip_filepath,
            $this->manifest_validator
        );
    }

    public function preflight_check($target) {
        return $this->installer->preflight_check(
            $target,
            $this->registry,
            $this->manifest_validator,
            $this->dependency_resolver
        );
    }

    public function import_package_archive($zip_filepath, $dry_run = false, $target_dir = null, $overwrite = false) {
        return $this->installer->import_package_archive(
            $zip_filepath,
            $dry_run,
            $target_dir,
            $this->security_validator,
            $this->manifest_validator,
            [$this, 'preflight_check'],
            $overwrite
        );
    }

    public function rollback_package_installation($package_id) {
        return $this->installer->rollback_package_installation($package_id);
    }

    /**
     * Handle direct admin download of a standalone capability package
     */
    public function handle_package_download() {
        if (!current_user_can('manage_options')) {
            wp_die(esc_html__('شما مجوز دسترسی به این بخش را ندارید.', 'universal-elementor-suite'));
        }

        check_admin_referer('uas_download_package_nonce');

        $package_id = isset($_GET['package_id']) ? sanitize_key($_GET['package_id']) : '';
        if (empty($package_id)) {
            wp_die(esc_html__('شناسه بسته مشخص نشده است.', 'universal-elementor-suite'));
        }

        $res = $this->export_standalone_package($package_id);
        if (!$res['success'] || !file_exists($res['zip_path'])) {
            wp_die(esc_html__('خطا در تولید بسته مستقل ZIP.', 'universal-elementor-suite'));
        }

        header('Content-Type: application/zip');
        header('Content-Disposition: attachment; filename="' . esc_attr($res['filename']) . '"');
        header('Content-Length: ' . filesize($res['zip_path']));
        header('Pragma: no-cache');
        readfile($res['zip_path']);
        exit;
    }

    /**
     * AJAX handler for exporting a standalone package
     */
    public function ajax_export_package() {
        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => 'سطح دسترسی ناکافی است.']);
        }

        check_ajax_referer('uas_admin_nonce', 'nonce');

        $package_id = isset($_POST['package_id']) ? sanitize_key($_POST['package_id']) : '';
        $res = $this->export_standalone_package($package_id);

        if ($res['success']) {
            wp_send_json_success($res);
        } else {
            wp_send_json_error(['message' => $res['error'] ?? 'خطا در خروجی بسته.']);
        }
    }

    /**
     * REST endpoint: Export a package
     */
    public function rest_export_package($request) {
        $package_id = sanitize_key($request->get_param('package_id'));
        $res = $this->export_standalone_package($package_id);
        return rest_ensure_response($res);
    }

    /**
     * AJAX handler to build custom project bundle from user selections
     */
    public function ajax_build_custom_bundle() {
        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => 'سطح دسترسی ناکافی است.']);
        }

        check_ajax_referer('uas_admin_nonce', 'nonce');

        $params = [
            'project_name'         => isset($_POST['project_name']) ? sanitize_text_field($_POST['project_name']) : 'پروژه سفارشی',
            'project_slug'         => isset($_POST['project_slug']) ? sanitize_title($_POST['project_slug']) : 'custom-project-kit',
            'selected_widgets'     => isset($_POST['widgets']) && is_array($_POST['widgets']) ? array_map('sanitize_key', $_POST['widgets']) : [],
            'selected_templates'   => isset($_POST['templates']) && is_array($_POST['templates']) ? array_map('sanitize_key', $_POST['templates']) : [],
            'selected_blocks'      => isset($_POST['blocks']) && is_array($_POST['blocks']) ? array_map('sanitize_text_field', $_POST['blocks']) : [],
            'selected_cpts'        => isset($_POST['cpts']) && is_array($_POST['cpts']) ? array_map('sanitize_key', $_POST['cpts']) : [],
            'design_tokens'        => isset($_POST['design_tokens']) && is_array($_POST['design_tokens']) ? array_map('sanitize_text_field', $_POST['design_tokens']) : [],
            'niche'                => isset($_POST['niche']) ? sanitize_key($_POST['niche']) : 'general',
            'include_theme_bridge' => !empty($_POST['include_theme_bridge']),
            'include_query_engine' => !empty($_POST['include_query_engine']),
        ];

        $res = $this->build_custom_project_bundle($params);

        if ($res['success']) {
            wp_send_json_success($res);
        } else {
            wp_send_json_error(['message' => $res['error'] ?? 'خطا در کامپایل بسته سفارشی.']);
        }
    }

    /**
     * Handle direct admin download of custom compiled bundle
     */
    public function handle_custom_bundle_download() {
        if (!current_user_can('manage_options')) {
            wp_die(esc_html__('شما مجوز دسترسی به این بخش را ندارید.', 'universal-elementor-suite'));
        }

        check_admin_referer('uas_download_custom_bundle_nonce');

        $slug = isset($_GET['slug']) ? sanitize_title($_GET['slug']) : 'custom-project-kit';
        $upload_dir = wp_upload_dir();
        $zip_filepath = trailingslashit($upload_dir['basedir']) . 'uas-standalone-packages/' . $slug . '-standalone-kit.zip';

        if (!file_exists($zip_filepath)) {
            wp_die(esc_html__('فایل پکیج سفارشی مورد نظر در سرور یافت نشد.', 'universal-elementor-suite'));
        }

        header('Content-Type: application/zip');
        header('Content-Disposition: attachment; filename="' . esc_attr(basename($zip_filepath)) . '"');
        header('Content-Length: ' . filesize($zip_filepath));
        header('Pragma: no-cache');
        readfile($zip_filepath);
        exit;
    }

    /**
     * REST endpoint to build custom bundle
     */
    public function rest_build_custom_bundle($request) {
        $params = $request->get_json_params() ?: $request->get_params();
        $res = $this->build_custom_project_bundle($params);
        return rest_ensure_response($res);
    }

    /**
     * REST endpoint: Get packages index
     */
    public function rest_get_packages($request) {
        $packages = $this->get_portable_packages();
        return rest_ensure_response([
            'success'  => true,
            'total'    => count($packages),
            'packages' => $packages,
        ]);
    }

    /**
     * REST endpoint: Run Preflight Check
     */
    public function rest_preflight_check($request) {
        $params = $request->get_json_params() ?: $request->get_params();
        $target = $params['package_id'] ?? ($params['manifest'] ?? '');
        $res = $this->preflight_check($target);
        return rest_ensure_response($res);
    }

    /**
     * REST endpoint: Import package archive
     */
    public function rest_import_package($request) {
        $params    = $request->get_json_params() ?: $request->get_params();
        $zip_path  = sanitize_text_field($params['zip_path'] ?? '');
        $dry_run   = !empty($params['dry_run']);
        $overwrite = !empty($params['overwrite']);
        $res = $this->import_package_archive($zip_path, $dry_run, null, $overwrite);
        return rest_ensure_response($res);
    }

    /**
     * REST endpoint: Rollback package
     */
    public function rest_rollback_package($request) {
        $params = $request->get_json_params() ?: $request->get_params();
        $package_id = sanitize_key($params['package_id'] ?? '');
        $res = $this->rollback_package_installation($package_id);
        return rest_ensure_response($res);
    }
}
