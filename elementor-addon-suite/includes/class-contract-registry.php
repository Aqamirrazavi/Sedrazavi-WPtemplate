<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * API Contract & Schema Registry
 *
 * Formal contract register documenting and validating REST and AJAX contracts,
 * parameters, capability gates, and response schemas.
 *
 * @package Universal_Elementor_Suite
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */
class Contract_Registry {

    private static $_instance = null;

    private $contracts = [];

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        add_action('init', [$this, 'register_core_contracts'], 10);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
    }

    /**
     * Register Core Contracts
     */
    public function register_core_contracts() {
        // Contract: Capabilities
        $this->register_contract('get_capabilities', [
            'type'        => 'REST',
            'endpoint'    => '/sedrazavi/v1/capabilities',
            'method'      => 'GET',
            'capability'  => 'manage_options',
            'description' => 'دریافت فهرست تمام قابلیت‌ها و افزونه‌های فعال در معماری ماژولار.',
            'response'    => [
                'success'      => 'boolean',
                'total'        => 'integer',
                'capabilities' => 'array',
            ],
        ]);

        // Contract: Packages
        $this->register_contract('get_packages', [
            'type'        => 'REST',
            'endpoint'    => '/sedrazavi/v1/packages',
            'method'      => 'GET',
            'capability'  => 'manage_options',
            'description' => 'فهرست بسته‌های مستقل و پورتابل قابل نصب و استخراج.',
            'response'    => [
                'success'  => 'boolean',
                'total'    => 'integer',
                'packages' => 'array',
            ],
        ]);

        // Contract: Health Diagnostics
        $this->register_contract('get_health_diagnostics', [
            'type'        => 'REST',
            'endpoint'    => '/sedrazavi/v1/health-diagnostics',
            'method'      => 'GET',
            'capability'  => 'manage_options',
            'description' => 'گزارش تست سلامت محیط سرور، وردپرس، المنتور و وضعیت ماژول‌ها.',
            'response'    => [
                'success'     => 'boolean',
                'environment' => 'object',
            ],
        ]);

        // Contract: AJAX Single Template Import
        $this->register_contract('ajax_import_single_template', [
            'type'        => 'AJAX',
            'action'      => 'uas_import_single_template',
            'capability'  => 'manage_options',
            'nonce_check' => 'uas_import_nonce',
            'parameters'  => [
                'template_slug' => 'string (required)',
            ],
            'description' => 'درون‌ریزی ایمن و ایدم‌پوتنت یک قالب کانتینری المنتور به کتابخانه کاربری.',
            'response'    => [
                'success' => 'boolean',
                'data'    => 'object (post_id, title, message)',
            ],
        ]);

        // Contract: Package Lifecycle Endpoints
        $this->register_contract('packages_export', [
            'type'        => 'REST',
            'endpoint'    => '/sedrazavi/v1/packages/export',
            'method'      => 'POST',
            'capability'  => 'manage_options',
            'parameters'  => ['package_id' => 'string (required)'],
            'description' => 'تولید فایل زیپ افزونه مستقل همراه با جدول چک‌سام SHA-256 فایل‌ها در مانیفست.',
            'response'    => ['success' => 'boolean', 'zip_url' => 'string', 'sha256' => 'string'],
        ]);

        $this->register_contract('packages_build_custom_bundle', [
            'type'        => 'REST',
            'endpoint'    => '/sedrazavi/v1/packages/build-custom-bundle',
            'method'      => 'POST',
            'capability'  => 'manage_options',
            'parameters'  => [
                'project_name'       => 'string',
                'project_slug'       => 'string',
                'selected_widgets'   => 'array',
                'selected_templates' => 'array',
                'selected_blocks'    => 'array (Gutenberg sovereign-* slugs)',
                'selected_cpts'      => 'array (portfolio, services, case_study)',
                'design_tokens'      => 'object (optional)',
            ],
            'description' => 'کامپایل بسته اختصاصی با اسکن AST قالب‌ها، بلوک‌های گوتنبرگ، اسکیمای CPT و تعبیه چک‌سام SHA-256 برای تک‌تک فایل‌ها.',
            'response'    => ['success' => 'boolean', 'zip_url' => 'string', 'sha256' => 'string', 'checksums_count' => 'integer', 'blocks_count' => 'integer', 'cpts_count' => 'integer'],
        ]);

        $this->register_contract('packages_preflight', [
            'type'        => 'REST',
            'endpoint'    => '/sedrazavi/v1/packages/preflight',
            'method'      => 'POST',
            'capability'  => 'manage_options',
            'parameters'  => ['package_id' => 'string', 'manifest' => 'object'],
            'description' => 'بررسی سازگاری نسخه PHP، وردپرس، المنتور و تشخیص چرخه وابستگی یا تداخل.',
            'response'    => ['pass' => 'boolean', 'dependencies' => 'array', 'errors' => 'array'],
        ]);

        $this->register_contract('packages_import', [
            'type'        => 'REST',
            'endpoint'    => '/sedrazavi/v1/packages/import',
            'method'      => 'POST',
            'capability'  => 'manage_options',
            'parameters'  => ['zip_path' => 'string (required)', 'dry_run' => 'boolean'],
            'description' => 'بازبینی امنیتی آرشیو (Zip Slip، پسوند، Zip Bomb، تطبیق SHA-256) و نصب اتمیک یا Dry-Run.',
            'response'    => ['success' => 'boolean', 'sha256' => 'string', 'checksum_verified_count' => 'integer'],
        ]);

        $this->register_contract('packages_rollback', [
            'type'        => 'REST',
            'endpoint'    => '/sedrazavi/v1/packages/rollback',
            'method'      => 'POST',
            'capability'  => 'manage_options',
            'parameters'  => ['package_id' => 'string (required)'],
            'description' => 'غیرفعال‌سازی افزونه و پاک‌سازی کامل فایل‌ها و تمپلیت‌های ثبت‌شده در دیتابیس.',
            'response'    => ['success' => 'boolean', 'deleted_files' => 'integer', 'deleted_posts' => 'integer'],
        ]);

        // Contract: Public Read-Only Widgets & Assets Catalog
        $this->register_contract('get_widgets_bank', [
            'type'        => 'REST',
            'endpoint'    => '/sedrazavi/v1/widgets-bank',
            'method'      => 'GET',
            'capability'  => 'public_read_only',
            'description' => 'کاتالوگ خواندنی عمومی ویجت‌های بومی المنتور (۳۱ کلاس) و پریست‌های طراحی.',
            'response'    => ['success' => 'boolean', 'elementor_widgets_count' => 'integer', 'shortcode_presets_count' => 'integer'],
        ]);

        // Contract: Authenticated Client Portal Summary
        $this->register_contract('get_portal_summary', [
            'type'        => 'REST',
            'endpoint'    => '/sedrazavi/v1/portal/summary',
            'method'      => 'GET',
            'capability'  => 'read (authenticated user)',
            'description' => 'خلاصه اشتراک VIP و لایسنس‌های کاربر احراز هویت‌شده.',
            'response'    => ['isLoggedIn' => 'boolean', 'vip' => 'object', 'licenses' => 'array'],
        ]);
    }

    /**
     * Register a contract
     */
    public function register_contract($id, array $schema) {
        $this->contracts[$id] = $schema;
    }

    /**
     * Get all registered contracts
     */
    public function get_contracts() {
        return $this->contracts;
    }

    /**
     * Register REST API routes
     */
    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/contracts', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_contracts'],
            'permission_callback' => [$this, 'check_admin_permission'],
        ]);
    }

    public function check_admin_permission() {
        return current_user_can('manage_options');
    }

    public function rest_get_contracts($request) {
        return rest_ensure_response([
            'success'   => true,
            'total'     => count($this->contracts),
            'contracts' => $this->contracts,
        ]);
    }
}
