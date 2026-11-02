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
