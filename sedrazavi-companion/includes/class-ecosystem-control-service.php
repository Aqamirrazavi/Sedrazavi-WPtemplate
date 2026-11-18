<?php
/**
 * Unified Ecosystem Control, Role Separation & Package Installer Service (Plugin SSOT)
 *
 * Bridges Backend WP-Admin (`SedRazavi_Admin_Dashboard`), Frontend Management Cockpit
 * (`\SedRazavi\Frontend_Cockpit_Engine`), Legal Domain Service (`SedRazavi_Case_Data_Service`),
 * and Package Manager (`UniversalElementorSuite\Package_Manager`).
 *
 * @package SedRazavi_Companion
 * @version 6.2.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('SedRazavi_Ecosystem_Control_Service')) {

class SedRazavi_Ecosystem_Control_Service {

    private static $instance = null;

    /**
     * Allowlisted ecosystem plugins managed by Hub/Admin.
     */
    const ALLOWED_ECOSYSTEM_PLUGINS = [
        'sedrazavi-designer-core',
        'elementor-addon-suite',
        'sedrazavi-addons',
        'sedrazavi-companion',
    ];

    /**
     * Allowlisted remote GitHub hosts for verified ecosystem release packages.
     */
    const ALLOWED_REMOTE_HOSTS = [
        'github.com',
        'codeload.github.com',
        'raw.githubusercontent.com',
        'objects.githubusercontent.com',
    ];

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('wp_ajax_sr_admin_queue_cloud_template', [$this, 'ajax_queue_cloud_template']);
        add_action('wp_ajax_sr_admin_plugin_action', [$this, 'ajax_admin_plugin_action']);
    }

    /**
     * Ensure WP plugin administration helpers are loaded before checking or toggling plugins.
     */
    public static function ensure_wp_plugin_admin_loaded() {
        if (!function_exists('is_plugin_active') || !function_exists('activate_plugin') || !function_exists('deactivate_plugins') || !function_exists('get_plugin_data')) {
            if (defined('ABSPATH') && file_exists(ABSPATH . 'wp-admin/includes/plugin.php')) {
                require_once ABSPATH . 'wp-admin/includes/plugin.php';
            }
        }
        return function_exists('is_plugin_active');
    }

    /**
     * Canonical UI & Capability Role Tier classification.
     *
     * @param int $user_id
     * @return string admin|legal_staff|client|editor|subscriber
     */
    public static function get_user_role_tier($user_id = 0) {
        $uid = $user_id ? absint($user_id) : get_current_user_id();
        if ($uid <= 0) {
            return 'guest';
        }

        if (user_can($uid, 'manage_options')) {
            return 'admin';
        }

        if (class_exists('SedRazavi_Case_Data_Service') && \SedRazavi_Case_Data_Service::is_privileged_legal_staff($uid)) {
            return 'legal_staff';
        }

        $user = get_userdata($uid);
        $roles = $user ? (array) $user->roles : [];
        $has_client_role = (bool) array_intersect(['sedrazavi_client', 'sr_client', 'client'], $roles);
        $has_client_cap  = user_can($uid, 'sedrazavi_view_own_cases') || user_can($uid, 'sr_view_own_data') || user_can($uid, 'view_own_cases');

        if (($has_client_role || $has_client_cap) && !user_can($uid, 'edit_posts')) {
            return 'client';
        }

        if (user_can($uid, 'edit_posts')) {
            return 'editor';
        }

        if ($has_client_role || $has_client_cap) {
            return 'client';
        }

        return 'subscriber';
    }

    /**
     * Discover registered ecosystem & core roles with localized labels.
     *
     * @param bool $filter_assignable Filter out administrator/privileged roles when requester lacks manage_options.
     * @return array
     */
    public static function get_ecosystem_role_catalog($filter_assignable = true) {
        $labels = [
            'sedrazavi_lawyer'    => __('وکیل دادگستری و مشاور حقوقی (sedrazavi_lawyer)', 'sedrazavi-companion'),
            'sedrazavi_client'    => __('موکل حقوقی (sedrazavi_client)', 'sedrazavi-companion'),
            'sr_client'           => __('کاربر ویژه / موکل (sr_client)', 'sedrazavi-companion'),
            'sedrazavi_secretary' => __('منشی دفتر وکالت (sedrazavi_secretary)', 'sedrazavi-companion'),
            'sedrazavi_intern'    => __('کارآموز وکالت (sedrazavi_intern)', 'sedrazavi-companion'),
            'sr_staff'            => __('کادر تخصصی و همکاران (sr_staff)', 'sedrazavi-companion'),
            'sr_business_owner'   => __('مدیر ارشد کسب‌وکار (sr_business_owner)', 'sedrazavi-companion'),
            'editor'              => __('ویرایشگر ارشد محتوا (Editor)', 'sedrazavi-companion'),
            'author'              => __('نویسنده / محتواگذار (Author)', 'sedrazavi-companion'),
            'subscriber'          => __('مشترک / کاربر عادی (Subscriber)', 'sedrazavi-companion'),
            'administrator'       => __('مدیر کل سیستم (Administrator)', 'sedrazavi-companion'),
        ];

        $catalog = [];
        if (function_exists('wp_roles') && wp_roles()) {
            $all_roles = wp_roles()->roles;
            foreach ($all_roles as $slug => $role_data) {
                $caps = isset($role_data['capabilities']) && is_array($role_data['capabilities']) ? $role_data['capabilities'] : [];
                $is_privileged = !empty($caps['manage_options']) || !empty($caps['edit_users']) || !empty($caps['promote_users']);
                if ($filter_assignable && $is_privileged && !current_user_can('manage_options')) {
                    continue;
                }
                $catalog[$slug] = [
                    'slug'          => $slug,
                    'label'         => $labels[$slug] ?? ($role_data['name'] ?? $slug),
                    'privileged'    => $is_privileged,
                    'legal_manage'  => !empty($caps['sedrazavi_manage_cases']) || !empty($caps['manage_options']),
                    'legal_own'     => !empty($caps['sedrazavi_view_own_cases']) || !empty($caps['sr_view_own_data']) || !empty($caps['view_own_cases']),
                    'content_edit'  => !empty($caps['edit_posts']),
                ];
            }
        }

        if (empty($catalog)) {
            foreach ($labels as $slug => $label) {
                $catalog[$slug] = [
                    'slug'          => $slug,
                    'label'         => $label,
                    'privileged'    => $slug === 'administrator',
                    'legal_manage'  => in_array($slug, ['administrator', 'sedrazavi_lawyer'], true),
                    'legal_own'     => in_array($slug, ['sedrazavi_client', 'sr_client'], true),
                    'content_edit'  => in_array($slug, ['administrator', 'editor', 'author', 'sr_business_owner', 'sr_staff'], true),
                ];
            }
        }

        return $catalog;
    }

    /**
     * Authoritative Role Capability Separation Matrix for Admin Inspection.
     *
     * @return array
     */
    public static function get_role_capability_matrix() {
        return [
            [
                'role'          => 'administrator',
                'title'         => __('مدیر کل سیستم', 'sedrazavi-companion'),
                'legal_cases'   => __('مدیریت کامل پرونده‌ها (sedrazavi_manage_cases)', 'sedrazavi-companion'),
                'public_cpt'    => __('کامل (edit_posts / edit_others_posts)', 'sedrazavi-companion'),
                'system_hub'    => __('کامل (manage_options / نصب افزونه و کیت)', 'sedrazavi-companion'),
            ],
            [
                'role'          => 'sedrazavi_lawyer',
                'title'         => __('وکیل دادگستری و مشاور حقوقی', 'sedrazavi-companion'),
                'legal_cases'   => __('مدیریت و دادرسی پرونده‌ها (sedrazavi_manage_cases)', 'sedrazavi-companion'),
                'public_cpt'    => __('مجزا از محتوای عمومی (تمرکز حقوقی)', 'sedrazavi-companion'),
                'system_hub'    => __('محدود — بدون دسترسی تنظیمات کل و نصب افزونه', 'sedrazavi-companion'),
            ],
            [
                'role'          => 'sedrazavi_client / sr_client',
                'title'         => __('موکل حقوقی تاییدشده', 'sedrazavi-companion'),
                'legal_cases'   => __('فقط پرونده‌های متعلق به خود موکل (Anti-IDOR)', 'sedrazavi-companion'),
                'public_cpt'    => __('بدون دسترسی ویرایش', 'sedrazavi-companion'),
                'system_hub'    => __('مسدود (ورود فقط به کارتابل شخصی فرانت‌اند)', 'sedrazavi-companion'),
            ],
            [
                'role'          => 'author / editor',
                'title'         => __('نویسنده / ویرایشگر محتوا', 'sedrazavi-companion'),
                'legal_cases'   => __('مسدود — فاقد قابلیت اختصاصی پرونده‌ها (Zero edit_posts leakage)', 'sedrazavi-companion'),
                'public_cpt'    => __('پست‌ها، نمونه‌کار، خدمات و مطالعات موردی عمومی', 'sedrazavi-companion'),
                'system_hub'    => __('مسدود', 'sedrazavi-companion'),
            ],
        ];
    }

    /**
     * Fetch role-scoped ecosystem overview counts for Admin & Frontend Cockpit.
     *
     * @param int $user_id
     * @return array
     */
    public static function get_overview_snapshot($user_id = 0) {
        $uid       = $user_id ? absint($user_id) : get_current_user_id();
        $tier      = self::get_user_role_tier($uid);
        $is_admin  = ($tier === 'admin');
        $can_legal = class_exists('SedRazavi_Case_Data_Service') && \SedRazavi_Case_Data_Service::can_access_cases_endpoint($uid);
        $is_priv_legal = class_exists('SedRazavi_Case_Data_Service') && \SedRazavi_Case_Data_Service::is_privileged_legal_staff($uid);

        $snapshot = [
            'role_tier'            => $tier,
            'portfolio_count'      => 0,
            'services_count'       => 0,
            'posts_count'          => 0,
            'users_count'          => 0,
            'active_cases_count'   => 0,
            'own_cases_count'      => 0,
            'pending_intake_count' => 0,
            'appointments_count'   => 0,
            'deployed_kits_count'  => 0,
            'active_plugins_count' => 0,
            'queued_cloud_count'   => count(self::get_queued_cloud_templates()),
            'environment'          => [],
        ];

        if ($is_admin || $tier === 'editor') {
            $snapshot['portfolio_count'] = function_exists('wp_count_posts') ? (int) (wp_count_posts('portfolio')->publish ?? 0) : 0;
            $snapshot['services_count']  = function_exists('wp_count_posts') ? (int) (wp_count_posts('services')->publish ?? 0) : 0;
            $snapshot['posts_count']     = function_exists('wp_count_posts') ? (int) (wp_count_posts('post')->publish ?? 0) : 0;
        }

        if ($can_legal) {
            $accessible = self::get_accessible_legal_cases($uid, 50);
            $snapshot['own_cases_count'] = count($accessible);
            if ($is_priv_legal) {
                $snapshot['active_cases_count'] = class_exists('SedRazavi_Case_Data_Service')
                    ? \SedRazavi_Case_Data_Service::count_active_cases()
                    : count($accessible);

                $intake_records = get_option('sedrazavi_legal_intake_records', []);
                $appt_records   = get_option('sedrazavi_legal_appointments_records', []);
                $pending_intakes = 0;
                if (is_array($intake_records)) {
                    foreach ($intake_records as $rec) {
                        if (($rec['status'] ?? 'pending') === 'pending') {
                            $pending_intakes++;
                        }
                    }
                }
                $snapshot['pending_intake_count'] = $pending_intakes;
                $snapshot['appointments_count']   = is_array($appt_records) ? count($appt_records) : 0;
            }
        }

        if ($is_admin) {
            $users_summary = function_exists('count_users') ? count_users() : ['total_users' => 1];
            $snapshot['users_count'] = (int) ($users_summary['total_users'] ?? 1);

            $kits = get_option('sr_cockpit_deployed_kits', []);
            $snapshot['deployed_kits_count'] = is_array($kits) ? count($kits) : 0;

            $plugins = self::get_plugins_inventory();
            $active_cnt = 0;
            foreach ($plugins as $p) {
                if (!empty($p['active'])) {
                    $active_cnt++;
                }
            }
            $snapshot['active_plugins_count'] = $active_cnt;
            $snapshot['environment'] = [
                'php_version'       => PHP_VERSION,
                'wp_version'        => function_exists('get_bloginfo') ? get_bloginfo('version') : '',
                'memory_limit'      => ini_get('memory_limit') ?: '',
                'upload_max'        => ini_get('upload_max_filesize') ?: '',
                'elementor_active'  => defined('ELEMENTOR_VERSION') || did_action('elementor/loaded'),
                'elementor_version' => defined('ELEMENTOR_VERSION') ? ELEMENTOR_VERSION : null,
            ];
        }

        return $snapshot;
    }

    /**
     * Query confidential legal cases strictly scoped by Anti-IDOR ownership.
     *
     * @param int $user_id
     * @param int $limit
     * @return array
     */
    public static function get_accessible_legal_cases($user_id = 0, $limit = 30) {
        $uid = $user_id ? absint($user_id) : get_current_user_id();
        if ($uid <= 0 || !class_exists('SedRazavi_Case_Data_Service') || !\SedRazavi_Case_Data_Service::can_access_cases_endpoint($uid)) {
            return [];
        }

        $is_privileged = \SedRazavi_Case_Data_Service::is_privileged_legal_staff($uid);
        $args = \SedRazavi_Case_Data_Service::build_scoped_case_query_args($uid, [
            'posts_per_page' => max(1, min(100, (int) $limit)),
        ]);

        $posts = function_exists('get_posts') ? get_posts($args) : [];
        $items = [];

        foreach ($posts as $p) {
            if (!\SedRazavi_Case_Data_Service::can_user_access_case($p, $uid)) {
                continue;
            }
            $pid = (int) $p->ID;
            $case_number = (string) (get_post_meta($pid, '_sedrazavi_case_number', true) ?: get_post_meta($pid, '_case_number', true) ?: ('SR-' . $pid));
            $stage       = (string) (get_post_meta($pid, '_sedrazavi_case_stage', true) ?: __('در حال بررسی', 'sedrazavi-companion'));
            $branch      = (string) get_post_meta($pid, '_sedrazavi_court_branch', true);
            $next_date   = (string) (get_post_meta($pid, '_sedrazavi_next_session', true) ?: get_post_meta($pid, '_sedrazavi_next_hearing', true));
            $client_uid  = (int) (get_post_meta($pid, '_sedrazavi_client_user_id', true) ?: get_post_meta($pid, '_client_user_id', true));

            $row = [
                'id'           => $pid,
                'case_number'  => $case_number,
                'title'        => $p->post_title,
                'status'       => $p->post_status,
                'stage'        => $stage,
                'court_branch' => $branch,
                'next_hearing' => $next_date,
                'updated_at'   => $p->post_modified,
            ];

            if ($is_privileged) {
                $row['client_user_id']     = $client_uid;
                $row['assigned_lawyer_id'] = (int) get_post_meta($pid, '_sedrazavi_assigned_lawyer_id', true);
                $row['notes']              = $p->post_content;
            }

            $items[] = $row;
        }

        return $items;
    }

    /**
     * Read unified brand, gateway, SMS, and scenario settings from wp_options.
     *
     * @return array
     */
    public static function get_unified_settings() {
        $merchant = (string) get_option('sedrazavi_shetab_merchant_id', '');
        if ($merchant === '') {
            $merchant = (string) get_option('sedrazavi_zarinpal_merchant', '');
        }

        return [
            'sedrazavi_office_phone'      => (string) get_option('sedrazavi_office_phone', '۰۲۱-۸۸۹۹۰۰۱۱'),
            'sedrazavi_office_email'      => (string) get_option('sedrazavi_office_email', 'info@sedrazavi-law.ir'),
            'sedrazavi_office_address'    => (string) get_option('sedrazavi_office_address', ''),
            'sedrazavi_working_hours'     => (string) get_option('sedrazavi_working_hours', 'شنبه تا چهارشنبه ۹ الی ۱۸'),
            'sedrazavi_primary_gold'      => (string) get_option('sedrazavi_primary_gold', '#D4AF37'),
            'sedrazavi_secondary_navy'    => (string) get_option('sedrazavi_secondary_navy', '#0B132B'),
            'sedrazavi_font_family'       => (string) get_option('sedrazavi_font_family', 'Vazirmatn'),
            'sedrazavi_default_mode'      => (string) get_option('sedrazavi_default_mode', 'dark'),
            'sedrazavi_active_scenario'   => (string) get_option('sedrazavi_active_scenario', 'bento-hud'),
            'sedrazavi_active_archetype'  => (string) get_option('sedrazavi_active_archetype', 'agency-designer'),
            'sedrazavi_active_palette'    => (string) get_option('sedrazavi_active_palette', 'default'),
            'sedrazavi_sms_provider'      => (string) get_option('sedrazavi_sms_provider', 'ippanel'),
            'sedrazavi_sms_api_key'       => (string) get_option('sedrazavi_sms_api_key', ''),
            'sedrazavi_sms_otp_pattern'   => (string) get_option('sedrazavi_sms_otp_pattern', 'otp-auth'),
            'sedrazavi_sms_originator'    => (string) get_option('sedrazavi_sms_originator', ''),
            'sedrazavi_shetab_gateway'    => (string) get_option('sedrazavi_shetab_gateway', 'zarinpal'),
            'sedrazavi_shetab_merchant_id'=> $merchant,
            'sedrazavi_shetab_sandbox'    => (string) get_option('sedrazavi_shetab_sandbox', 'no'),
        ];
    }

    /**
     * Reconciled Design Tokens snapshot bridging Companion, Theme & Elementor Active Kit.
     *
     * @return array
     */
    public static function get_design_tokens_bridge() {
        $unified = self::get_unified_settings();
        $is_rtl  = function_exists('is_rtl') ? (bool) is_rtl() : true;
        $mode    = in_array($unified['sedrazavi_default_mode'], ['light', 'dark'], true) ? $unified['sedrazavi_default_mode'] : 'dark';
        $gold    = sanitize_hex_color($unified['sedrazavi_primary_gold']) ?: '#D4AF37';
        $navy    = sanitize_hex_color($unified['sedrazavi_secondary_navy']) ?: '#0B132B';
        $font    = sanitize_text_field($unified['sedrazavi_font_family']) ?: 'Vazirmatn';

        return [
            'mode'           => $mode,
            'dir'            => $is_rtl ? 'rtl' : 'ltr',
            'is_rtl'         => $is_rtl,
            'accent_gold'    => $gold,
            'secondary_navy' => $navy,
            'font_family'    => $font,
            'css_vars'       => [
                '--uas-accent-color'    => $gold,
                '--uas-secondary-color' => $navy,
                '--uas-font-family'     => "'{$font}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Tahoma, Arial, sans-serif",
                '--sr-primary-accent'   => $gold,
                '--sr-gold-accent'      => $gold,
                '--sr-navy-900'         => $navy,
                '--sr-font-family'      => "'{$font}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Tahoma, Arial, sans-serif",
            ],
        ];
    }

    /**
     * Save unified settings consistently from WP-Admin or Frontend Cockpit.
     *
     * @param array $raw_input
     * @return array Sanitized persisted settings subset.
     */
    public static function save_unified_settings(array $raw_input) {
        $saved = [];

        if (isset($raw_input['sedrazavi_office_phone'])) {
            $val = sanitize_text_field((string) $raw_input['sedrazavi_office_phone']);
            update_option('sedrazavi_office_phone', $val);
            if (function_exists('set_theme_mod')) {
                set_theme_mod('sedrazavi_office_phone', $val);
            }
            $saved['sedrazavi_office_phone'] = $val;
        }

        if (isset($raw_input['sedrazavi_office_email'])) {
            $val = sanitize_email((string) $raw_input['sedrazavi_office_email']);
            update_option('sedrazavi_office_email', $val);
            if (function_exists('set_theme_mod')) {
                set_theme_mod('sedrazavi_office_email', $val);
            }
            $saved['sedrazavi_office_email'] = $val;
        }

        if (isset($raw_input['sedrazavi_office_address'])) {
            $val = sanitize_text_field((string) $raw_input['sedrazavi_office_address']);
            update_option('sedrazavi_office_address', $val);
            if (function_exists('set_theme_mod')) {
                set_theme_mod('sedrazavi_office_address', $val);
            }
            $saved['sedrazavi_office_address'] = $val;
        }

        if (isset($raw_input['sedrazavi_working_hours'])) {
            $val = sanitize_text_field((string) $raw_input['sedrazavi_working_hours']);
            update_option('sedrazavi_working_hours', $val);
            $saved['sedrazavi_working_hours'] = $val;
        }

        if (isset($raw_input['sedrazavi_primary_gold'])) {
            $val = sanitize_hex_color((string) $raw_input['sedrazavi_primary_gold']) ?: '#D4AF37';
            update_option('sedrazavi_primary_gold', $val);
            update_option('sedrazavi_gold_color', $val);
            $saved['sedrazavi_primary_gold'] = $val;
        }

        if (isset($raw_input['sedrazavi_secondary_navy'])) {
            $val = sanitize_hex_color((string) $raw_input['sedrazavi_secondary_navy']) ?: '#0B132B';
            update_option('sedrazavi_secondary_navy', $val);
            update_option('sedrazavi_navy_color', $val);
            update_option('sedrazavi_primary_color', $val);
            $saved['sedrazavi_secondary_navy'] = $val;
        }

        if (isset($raw_input['sedrazavi_font_family'])) {
            $val = sanitize_text_field((string) $raw_input['sedrazavi_font_family']) ?: 'Vazirmatn';
            update_option('sedrazavi_font_family', $val);
            $saved['sedrazavi_font_family'] = $val;
        }

        if (isset($raw_input['sedrazavi_default_mode'])) {
            $raw_mode = sanitize_key((string) $raw_input['sedrazavi_default_mode']);
            $val      = in_array($raw_mode, ['light', 'dark'], true) ? $raw_mode : 'dark';
            update_option('sedrazavi_default_mode', $val);
            $saved['sedrazavi_default_mode'] = $val;
        }

        if (isset($saved['sedrazavi_primary_gold']) || isset($saved['sedrazavi_secondary_navy']) || isset($saved['sedrazavi_font_family']) || isset($saved['sedrazavi_default_mode'])) {
            $uas_tokens = get_option('uas_design_tokens', []);
            if (!is_array($uas_tokens)) {
                $uas_tokens = [];
            }
            if (isset($saved['sedrazavi_primary_gold'])) {
                $uas_tokens['accent_color'] = $saved['sedrazavi_primary_gold'];
            }
            if (isset($saved['sedrazavi_secondary_navy'])) {
                $uas_tokens['secondary_color'] = $saved['sedrazavi_secondary_navy'];
            }
            if (isset($saved['sedrazavi_font_family'])) {
                $uas_tokens['font_family'] = $saved['sedrazavi_font_family'];
                $uas_tokens['font_stack']  = "'{$saved['sedrazavi_font_family']}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Tahoma, Arial, sans-serif";
            }
            if (isset($saved['sedrazavi_default_mode'])) {
                $uas_tokens['default_mode'] = $saved['sedrazavi_default_mode'];
            }
            update_option('uas_design_tokens', $uas_tokens);

            $theme_tokens = get_option('sedrazavi_global_design_tokens', []);
            if (!is_array($theme_tokens)) {
                $theme_tokens = [];
            }
            if (isset($saved['sedrazavi_primary_gold'])) {
                $theme_tokens['brand.color_gold'] = $saved['sedrazavi_primary_gold'];
            }
            if (isset($saved['sedrazavi_secondary_navy'])) {
                $theme_tokens['brand.color_navy'] = $saved['sedrazavi_secondary_navy'];
            }
            update_option('sedrazavi_global_design_tokens', $theme_tokens);

            if (class_exists('\\UniversalElementorSuite\\Design_Tokens')) {
                \UniversalElementorSuite\Design_Tokens::instance()->sync_to_elementor_kit(true);
            }
        }

        if (isset($raw_input['sedrazavi_active_scenario'])) {
            $raw_sc = sanitize_key((string) $raw_input['sedrazavi_active_scenario']);
            $val = in_array($raw_sc, ['bento-hud', 'dense-matrix', 'hybrid-executive'], true) ? $raw_sc : 'bento-hud';
            update_option('sedrazavi_active_scenario', $val);
            $saved['sedrazavi_active_scenario'] = $val;
        }

        if (isset($raw_input['sedrazavi_active_archetype'])) {
            $raw_arch = sanitize_key((string) $raw_input['sedrazavi_active_archetype']);
            $allowed_arch = ['agency-designer', 'store-modern', 'corporate-pro', 'legal-firm'];
            $val = in_array($raw_arch, $allowed_arch, true) ? $raw_arch : 'agency-designer';
            update_option('sedrazavi_active_archetype', $val);
            $saved['sedrazavi_active_archetype'] = $val;
        }

        if (isset($raw_input['sedrazavi_active_palette'])) {
            $raw_pal = sanitize_key((string) $raw_input['sedrazavi_active_palette']);
            $allowed_pal = ['default', 'cyber-blue', 'emerald-store', 'corporate-sky', 'purple-lms'];
            $val = in_array($raw_pal, $allowed_pal, true) ? $raw_pal : 'default';
            update_option('sedrazavi_active_palette', $val);
            $saved['sedrazavi_active_palette'] = $val;
        }

        if (isset($raw_input['sedrazavi_sms_provider'])) {
            $provider = sanitize_key((string) $raw_input['sedrazavi_sms_provider']);
            update_option('sedrazavi_sms_provider', in_array($provider, ['ippanel', 'kavenegar', 'ghasedak'], true) ? $provider : 'ippanel');
            update_option('sedrazavi_sms_api_key', sanitize_text_field((string) ($raw_input['sedrazavi_sms_api_key'] ?? '')));
            update_option('sedrazavi_sms_otp_pattern', sanitize_text_field((string) ($raw_input['sedrazavi_sms_otp_pattern'] ?? 'otp-auth')));
            update_option('sedrazavi_sms_originator', sanitize_text_field((string) ($raw_input['sedrazavi_sms_originator'] ?? '')));
        }

        if (isset($raw_input['sedrazavi_shetab_gateway'])) {
            $gw = sanitize_key((string) $raw_input['sedrazavi_shetab_gateway']);
            $gw = in_array($gw, ['zarinpal', 'idpay', 'nextpay'], true) ? $gw : 'zarinpal';
            $merchant = sanitize_text_field((string) ($raw_input['sedrazavi_shetab_merchant_id'] ?? ''));
            $sandbox  = !empty($raw_input['sedrazavi_shetab_sandbox']) && $raw_input['sedrazavi_shetab_sandbox'] !== 'no' ? 'yes' : 'no';

            update_option('sedrazavi_shetab_gateway', $gw);
            update_option('sedrazavi_shetab_merchant_id', $merchant);
            update_option('sedrazavi_shetab_sandbox', $sandbox);
            if ($gw === 'zarinpal') {
                update_option('sedrazavi_zarinpal_merchant', $merchant);
            }
        }

        return $saved;
    }

    /**
     * Ecosystem Plugins Catalog + live status from WP_PLUGIN_DIR.
     *
     * @return array
     */
    public static function get_plugins_inventory() {
        self::ensure_wp_plugin_admin_loaded();

        $catalog = [
            'sedrazavi-companion' => [
                'slug' => 'sedrazavi-companion',
                'name' => __('هسته معماری و پیشخوان یکپارچه (SedRazavi Companion)', 'sedrazavi-companion'),
                'desc' => __('پیشخوان فرانت‌اند، تفکیک نقش‌ها، پورتال موکلین، پذیرش پرونده، لایسنس و درگاه‌های پرداخت.', 'sedrazavi-companion'),
            ],
            'sedrazavi-designer-core' => [
                'slug' => 'sedrazavi-designer-core',
                'name' => __('افزونه هسته اختصاصی طراح (Designer Core)', 'sedrazavi-companion'),
                'desc' => __('ویجت‌های تعاملی ساعت سه‌گانه، بازی دایناسور، موزیک‌پلیر و بریج تم‌بیلدر.', 'sedrazavi-companion'),
            ],
            'elementor-addon-suite' => [
                'slug' => 'elementor-addon-suite',
                'name' => __('سوئیت ویجت‌ها و قالب‌های المنتور (Addon Suite)', 'sedrazavi-companion'),
                'desc' => __('۳۱ ویجت بومی المنتور، ۳۳ قالب کانتینری آماده، ۷ بلوک گوتنبرگ و موتور بسته‌بندی مستقل.', 'sedrazavi-companion'),
            ],
            'sedrazavi-addons' => [
                'slug' => 'sedrazavi-addons',
                'name' => __('افزونه تخصصی خدمات، وکالت و داوری (Vertical Addons)', 'sedrazavi-companion'),
                'desc' => __('ماژول تالار داوری ODR، رهگیری پرونده، احراز هویت OTP و پکیج اصناف.', 'sedrazavi-companion'),
            ],
        ];

        $plugin_root = defined('WP_PLUGIN_DIR') ? WP_PLUGIN_DIR : (defined('ABSPATH') ? ABSPATH . 'wp-content/plugins' : '');
        $ledger      = get_option('sr_installed_ecosystem_plugins', []);
        $items       = [];

        foreach ($catalog as $slug => $meta) {
            $rel_file     = $slug . '/' . $slug . '.php';
            $full_file    = $plugin_root !== '' ? trailingslashit($plugin_root) . $rel_file : '';
            $is_installed = $full_file !== '' && file_exists($full_file);
            $is_active    = function_exists('is_plugin_active') && is_plugin_active($rel_file);
            $version      = '';

            if ($is_installed && function_exists('get_plugin_data')) {
                $pdata   = get_plugin_data($full_file, false, false);
                $version = (string) ($pdata['Version'] ?? '');
            }

            $snapshot = get_option('sr_plugin_rollback_snapshot_' . $slug, []);
            $has_backup = is_array($snapshot) && !empty($snapshot['backup_path']) && is_dir($snapshot['backup_path']);
            $ledger_entry = is_array($ledger) && isset($ledger[$slug]) ? $ledger[$slug] : [];

            $items[] = [
                'slug'          => $slug,
                'name'          => $meta['name'],
                'desc'          => $meta['desc'],
                'installed'     => $is_installed,
                'active'        => $is_active,
                'version'       => $version,
                'has_backup'    => $has_backup || (!empty($snapshot['installed_path']) && is_dir($snapshot['installed_path'])),
                'sha256'        => (string) ($ledger_entry['sha256'] ?? ''),
                'installed_at'  => (string) ($ledger_entry['installed_at'] ?? ''),
            ];
        }

        return $items;
    }

    /**
     * Validate HTTPS remote ZIP package URL against allowlisted Aqamirrazavi repository sources.
     *
     * @param string $url
     * @return array ['valid' => bool, 'url' => string, 'error' => string]
     */
    public static function verify_remote_package_url($url) {
        $raw = esc_url_raw(trim((string) $url), ['https']);
        if ($raw === '') {
            return ['valid' => false, 'url' => '', 'error' => __('آدرس بسته باید با پروتکل امن HTTPS شروع شود.', 'sedrazavi-companion')];
        }

        $parsed = wp_parse_url($raw);
        if (!is_array($parsed) || empty($parsed['scheme']) || strtolower($parsed['scheme']) !== 'https' || empty($parsed['host'])) {
            return ['valid' => false, 'url' => '', 'error' => __('آدرس ریموت بسته معتبر نیست.', 'sedrazavi-companion')];
        }

        $host = strtolower($parsed['host']);
        if (!in_array($host, self::ALLOWED_REMOTE_HOSTS, true)) {
            return ['valid' => false, 'url' => '', 'error' => __('دامنه سرور مبدأ در فهرست منابع مجاز اکوسیستم نیست.', 'sedrazavi-companion')];
        }

        $path = (string) ($parsed['path'] ?? '');
        if ($host !== 'objects.githubusercontent.com' && strpos($path, '/Aqamirrazavi/Sedrazavi-WPtemplate/') !== 0) {
            return ['valid' => false, 'url' => '', 'error' => __('مسیر مخزن گیت‌هاب خارج از ریپازیتوری رسمی Sedrazavi-WPtemplate است.', 'sedrazavi-companion')];
        }

        if (strtolower(substr($path, -4)) !== '.zip') {
            return ['valid' => false, 'url' => '', 'error' => __('تنها فایل‌های بسته استاندارد با پسوند .zip مجاز به دانلود و نصب هستند.', 'sedrazavi-companion')];
        }

        return ['valid' => true, 'url' => $raw, 'error' => ''];
    }

    /**
     * Recursive directory copy for pre-overwrite backup snapshots.
     */
    private static function copy_directory_recursive($src, $dst) {
        if (!is_dir($src) || !wp_mkdir_p($dst)) {
            return false;
        }
        $it = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($src, \RecursiveDirectoryIterator::SKIP_DOTS),
            \RecursiveIteratorIterator::SELF_FIRST
        );
        foreach ($it as $item) {
            $rel    = substr($item->getPathname(), strlen(rtrim($src, '/\\')) + 1);
            $target = rtrim($dst, '/\\') . '/' . $rel;
            if ($item->isDir()) {
                if (!is_dir($target) && !wp_mkdir_p($target)) {
                    return false;
                }
            } else {
                if (!@copy($item->getPathname(), $target)) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Recursive directory purge helper.
     */
    private static function purge_directory_recursive($dir_path) {
        $count = 0;
        if (!is_dir($dir_path)) {
            return 0;
        }
        $it    = new \RecursiveDirectoryIterator($dir_path, \RecursiveDirectoryIterator::SKIP_DOTS);
        $files = new \RecursiveIteratorIterator($it, \RecursiveIteratorIterator::CHILD_FIRST);
        foreach ($files as $file) {
            if ($file->isDir()) {
                @rmdir($file->getRealPath());
            } elseif (@unlink($file->getRealPath())) {
                $count++;
            }
        }
        @rmdir($dir_path);
        return $count;
    }

    /**
     * Hardened Plugin Installer with Pre-Extraction Audit, Optional SHA-256 Digest Gate,
     * Pre-Overwrite Backup Snapshot, Activation Verification & Automatic Rollback.
     *
     * @param string $plugin_slug
     * @param array  $options ['remote_url' => '', 'expected_sha256' => '', 'overwrite' => true]
     * @return array
     */
    public static function install_ecosystem_plugin($plugin_slug, array $options = []) {
        $slug = sanitize_key($plugin_slug);
        if (!in_array($slug, self::ALLOWED_ECOSYSTEM_PLUGINS, true)) {
            return ['success' => false, 'code' => 403, 'error' => __('شناسه افزونه انتخاب‌شده در فهرست مجاز اکوسیستم نیست.', 'sedrazavi-companion')];
        }

        if (!class_exists('\ZipArchive')) {
            return ['success' => false, 'code' => 500, 'error' => __('ماژول ZipArchive در سرور PHP فعال نیست.', 'sedrazavi-companion')];
        }

        $zip_file      = '';
        $downloaded_tmp = '';
        $remote_url    = isset($options['remote_url']) ? trim((string) $options['remote_url']) : '';
        $expected_hash = isset($options['expected_sha256']) ? strtolower(trim((string) $options['expected_sha256'])) : '';

        if ($expected_hash !== '' && !preg_match('/^[a-f0-9]{64}$/', $expected_hash)) {
            return ['success' => false, 'code' => 400, 'error' => __('فرمت امضای SHA-256 واردشده نامعتبر است (باید ۶۴ کاراکتر هگز باشد).', 'sedrazavi-companion')];
        }

        if ($remote_url !== '') {
            $url_check = self::verify_remote_package_url($remote_url);
            if (!$url_check['valid']) {
                return ['success' => false, 'code' => 403, 'error' => $url_check['error']];
            }
            if (!function_exists('download_url') && defined('ABSPATH') && file_exists(ABSPATH . 'wp-admin/includes/file.php')) {
                require_once ABSPATH . 'wp-admin/includes/file.php';
            }
            if (!function_exists('download_url')) {
                return ['success' => false, 'code' => 500, 'error' => __('API دانلود امن وردپرس در دسترس نیست.', 'sedrazavi-companion')];
            }
            $tmp_path = download_url($url_check['url'], 60);
            if (is_wp_error($tmp_path)) {
                return ['success' => false, 'code' => 502, 'error' => $tmp_path->get_error_message()];
            }
            $zip_file       = $tmp_path;
            $downloaded_tmp = $tmp_path;
        } else {
            $companion_dir = defined('SEDRAZAVI_COMPANION_DIR') ? SEDRAZAVI_COMPANION_DIR : plugin_dir_path(__DIR__);
            $upload_dir    = wp_upload_dir();
            $candidates    = [
                $companion_dir . 'packages/' . $slug . '.zip',
                trailingslashit($upload_dir['basedir']) . 'sedrazavi-packages/' . $slug . '.zip',
                ABSPATH . 'wp-content/uploads/sedrazavi-packages/' . $slug . '.zip',
                ABSPATH . 'wp-content/plugins/' . $slug . '.zip',
                (function_exists('get_template_directory') ? get_template_directory() . '/inc/plugins/' . $slug . '.zip' : ''),
            ];
            foreach ($candidates as $c) {
                if (!empty($c) && file_exists($c)) {
                    $zip_file = $c;
                    break;
                }
            }
        }

        if ($zip_file === '' || !file_exists($zip_file)) {
            return ['success' => false, 'code' => 404, 'error' => sprintf(__('بسته زیپ افزونه «%s» در سرور یافت نشد.', 'sedrazavi-companion'), $slug)];
        }

        // Optional Fail-Closed SHA-256 verification
        $actual_sha256 = hash_file('sha256', $zip_file);
        if ($expected_hash !== '' && (!is_string($actual_sha256) || !hash_equals($expected_hash, strtolower($actual_sha256)))) {
            if ($downloaded_tmp !== '' && file_exists($downloaded_tmp)) {
                @unlink($downloaded_tmp);
            }
            return ['success' => false, 'code' => 400, 'error' => __('عدم تطابق امضای SHA-256 بسته افزونه؛ نصب متوقف شد.', 'sedrazavi-companion')];
        }

        // Pre-extraction security & ZIP Slip / Zip Bomb inspection
        $zip_check = new \ZipArchive();
        if ($zip_check->open($zip_file) !== true) {
            if ($downloaded_tmp !== '' && file_exists($downloaded_tmp)) {
                @unlink($downloaded_tmp);
            }
            return ['success' => false, 'code' => 400, 'error' => __('فایل فشرده افزونه معتبر نیست یا آسیب دیده است.', 'sedrazavi-companion')];
        }

        $allowed_exts = ['php', 'json', 'css', 'js', 'png', 'jpg', 'jpeg', 'svg', 'webp', 'woff', 'woff2', 'ttf', 'eot', 'txt', 'md', 'pot', 'po', 'mo', 'html', 'xml', 'map'];
        $max_entries  = 1500;
        $max_bytes    = 50 * 1024 * 1024;
        $total_bytes  = 0;
        $has_manifest = false;

        if ($zip_check->numFiles <= 0 || $zip_check->numFiles > $max_entries) {
            $zip_check->close();
            if ($downloaded_tmp !== '' && file_exists($downloaded_tmp)) {
                @unlink($downloaded_tmp);
            }
            return ['success' => false, 'code' => 400, 'error' => __('تعداد فایل‌های درون بسته افزونه غیرمجاز است.', 'sedrazavi-companion')];
        }

        for ($i = 0; $i < $zip_check->numFiles; $i++) {
            $stat = $zip_check->statIndex($i);
            if (!$stat) {
                continue;
            }
            $entry_name   = (string) $stat['name'];
            $total_bytes += (int) $stat['size'];
            if ($total_bytes > $max_bytes) {
                $zip_check->close();
                if ($downloaded_tmp !== '' && file_exists($downloaded_tmp)) {
                    @unlink($downloaded_tmp);
                }
                return ['success' => false, 'code' => 400, 'error' => __('حجم استخراج‌شده بسته از سقف مجاز ۵۰ مگابایت فراتر رفته است.', 'sedrazavi-companion')];
            }
            if (
                strpos($entry_name, '../') !== false ||
                strpos($entry_name, '..\\') !== false ||
                strpos($entry_name, '/..') !== false ||
                strpos($entry_name, '\\..') !== false ||
                strpos($entry_name, ':/') !== false ||
                strpos($entry_name, ':\\') !== false ||
                strpos($entry_name, '/') === 0 ||
                strpos($entry_name, '\\') === 0
            ) {
                $zip_check->close();
                if ($downloaded_tmp !== '' && file_exists($downloaded_tmp)) {
                    @unlink($downloaded_tmp);
                }
                return ['success' => false, 'code' => 400, 'error' => __('نقض امنیتی Zip Slip Traversal در بسته شناسایی شد و نصب متوقف گردید.', 'sedrazavi-companion')];
            }
            if (substr($entry_name, -1) === '/' || substr($entry_name, -1) === '\\') {
                continue;
            }
            if (basename($entry_name) === 'manifest.json') {
                $has_manifest = true;
            }
            $ext = strtolower(pathinfo($entry_name, PATHINFO_EXTENSION));
            if ($ext === '' || !in_array($ext, $allowed_exts, true)) {
                $zip_check->close();
                if ($downloaded_tmp !== '' && file_exists($downloaded_tmp)) {
                    @unlink($downloaded_tmp);
                }
                return ['success' => false, 'code' => 400, 'error' => sprintf(__('پسوند فایل غیرمجاز در بسته افزونه شناسایی شد: %s', 'sedrazavi-companion'), sanitize_text_field($entry_name))];
            }
        }
        $zip_check->close();

        // If the ZIP carries a standard Package_Manager manifest.json, validate per-file SHA-256 checksums via Archive_Security_Validator
        if ($has_manifest && class_exists('\\UniversalElementorSuite\\Packaging\\Archive_Security_Validator')) {
            $sec_val = new \UniversalElementorSuite\Packaging\Archive_Security_Validator();
            $sec_res = $sec_val->verify_archive_security($zip_file);
            if (empty($sec_res['safe'])) {
                if ($downloaded_tmp !== '' && file_exists($downloaded_tmp)) {
                    @unlink($downloaded_tmp);
                }
                return ['success' => false, 'code' => 400, 'error' => (string) ($sec_res['error'] ?? __('اعتبارسنجی امنیتی مانیفست بسته ناموفق بود.', 'sedrazavi-companion'))];
            }
        }

        self::ensure_wp_plugin_admin_loaded();
        require_once ABSPATH . 'wp-admin/includes/file.php';
        \WP_Filesystem();

        $plugin_root      = defined('WP_PLUGIN_DIR') ? WP_PLUGIN_DIR : (ABSPATH . 'wp-content/plugins');
        $target_dir       = trailingslashit($plugin_root) . $slug . '/';
        $main_file        = $slug . '/' . $slug . '.php';
        $was_active       = function_exists('is_plugin_active') && is_plugin_active($main_file);
        $pre_existing_dir = is_dir($target_dir);
        $upload_dir       = wp_upload_dir();
        $backup_dir       = '';

        if ($pre_existing_dir) {
            if (isset($options['overwrite']) && !$options['overwrite']) {
                if ($downloaded_tmp !== '' && file_exists($downloaded_tmp)) {
                    @unlink($downloaded_tmp);
                }
                return ['success' => false, 'code' => 409, 'error' => sprintf(__('پوشه افزونه «%s» از قبل وجود دارد.', 'sedrazavi-companion'), $slug)];
            }
            $backup_dir = trailingslashit($upload_dir['basedir']) . 'uas-standalone-packages/backups/' . $slug . '-plugin-' . gmdate('YmdHis') . '/';
            if (!self::copy_directory_recursive($target_dir, $backup_dir)) {
                if ($downloaded_tmp !== '' && file_exists($downloaded_tmp)) {
                    @unlink($downloaded_tmp);
                }
                return ['success' => false, 'code' => 500, 'error' => __('تهیه نسخه پشتیبان پیش از به‌روزرسانی افزونه ناموفق بود؛ عملیات متوقف شد.', 'sedrazavi-companion')];
            }
        }

        $unzip_res = unzip_file($zip_file, $plugin_root);
        if ($downloaded_tmp !== '' && file_exists($downloaded_tmp)) {
            @unlink($downloaded_tmp);
        }

        if (is_wp_error($unzip_res)) {
            if ($backup_dir !== '' && is_dir($backup_dir)) {
                self::purge_directory_recursive($target_dir);
                self::copy_directory_recursive($backup_dir, $target_dir);
            }
            return ['success' => false, 'code' => 500, 'error' => $unzip_res->get_error_message()];
        }

        // Verify expected entry file exists and attempt safe activation with fail-closed rollback
        if (!file_exists(trailingslashit($plugin_root) . $main_file)) {
            self::purge_directory_recursive($target_dir);
            if ($backup_dir !== '' && is_dir($backup_dir)) {
                self::copy_directory_recursive($backup_dir, $target_dir);
            }
            return ['success' => false, 'code' => 400, 'error' => sprintf(__('فایل اصلی افزونه (%s) در بسته یافت نشد و رول‌بک انجام شد.', 'sedrazavi-companion'), $main_file)];
        }

        if (function_exists('is_plugin_active') && !is_plugin_active($main_file)) {
            $act_res = function_exists('activate_plugin') ? activate_plugin($main_file) : new \WP_Error('missing_plugin_api', 'Plugin API unavailable');
            if (is_wp_error($act_res)) {
                if (function_exists('deactivate_plugins') && function_exists('is_plugin_active') && is_plugin_active($main_file)) {
                    deactivate_plugins($main_file, true);
                }
                self::purge_directory_recursive($target_dir);
                if ($backup_dir !== '' && is_dir($backup_dir)) {
                    self::copy_directory_recursive($backup_dir, $target_dir);
                    if ($was_active && function_exists('activate_plugin')) {
                        activate_plugin($main_file);
                    }
                }
                return ['success' => false, 'code' => 500, 'error' => $act_res->get_error_message()];
            }
        }

        update_option('sr_plugin_rollback_snapshot_' . $slug, [
            'slug'              => $slug,
            'installed_path'    => $target_dir,
            'backup_path'       => $backup_dir,
            'main_file'         => $main_file,
            'pre_existing_dir'  => $pre_existing_dir,
            'was_active_before' => $was_active,
            'sha256'            => (string) $actual_sha256,
            'timestamp'         => time(),
        ]);

        $ledger = get_option('sr_installed_ecosystem_plugins', []);
        if (!is_array($ledger)) {
            $ledger = [];
        }
        $ledger[$slug] = [
            'slug'         => $slug,
            'sha256'       => (string) $actual_sha256,
            'source'       => $remote_url !== '' ? 'remote_https' : 'local_bundle',
            'installed_at' => gmdate('Y-m-d H:i:s'),
        ];
        update_option('sr_installed_ecosystem_plugins', $ledger);

        return [
            'success' => true,
            'slug'    => $slug,
            'status'  => 'active',
            'sha256'  => (string) $actual_sha256,
            'message' => sprintf(__('افزونه «%s» با تأیید امنیتی و بکاپ خودکار نصب و فعال گردید.', 'sedrazavi-companion'), $slug),
        ];
    }

    /**
     * Toggle activation status safely for allowlisted ecosystem plugins.
     *
     * @param string $plugin_slug
     * @return array
     */
    public static function toggle_ecosystem_plugin($plugin_slug) {
        $slug = sanitize_key($plugin_slug);
        if (!in_array($slug, ['sedrazavi-designer-core', 'elementor-addon-suite', 'sedrazavi-addons'], true)) {
            return ['success' => false, 'code' => 403, 'error' => __('تغییر وضعیت برای این شناسه مجاز نیست.', 'sedrazavi-companion')];
        }

        $plugin_root = defined('WP_PLUGIN_DIR') ? WP_PLUGIN_DIR : (ABSPATH . 'wp-content/plugins');
        $main_file   = $slug . '/' . $slug . '.php';
        if (!file_exists(trailingslashit($plugin_root) . $main_file)) {
            return ['success' => false, 'code' => 404, 'error' => __('افزونه روی سرور نصب نیست.', 'sedrazavi-companion')];
        }

        self::ensure_wp_plugin_admin_loaded();

        if (function_exists('is_plugin_active') && is_plugin_active($main_file)) {
            if (function_exists('deactivate_plugins')) {
                deactivate_plugins($main_file);
            }
            return ['success' => true, 'status' => 'inactive', 'message' => __('افزونه غیرفعال شد.', 'sedrazavi-companion')];
        }

        $act = function_exists('activate_plugin') ? activate_plugin($main_file) : new \WP_Error('missing_plugin_api', 'Plugin API unavailable');
        if (is_wp_error($act)) {
            return ['success' => false, 'code' => 500, 'error' => $act->get_error_message()];
        }

        return ['success' => true, 'status' => 'active', 'message' => __('افزونه فعال شد.', 'sedrazavi-companion')];
    }

    /**
     * Rollback a previously installed/updated ecosystem plugin to its pre-install snapshot (or purge fresh install).
     *
     * @param string $plugin_slug
     * @return array
     */
    public static function rollback_ecosystem_plugin($plugin_slug) {
        $slug = sanitize_key($plugin_slug);
        if (!in_array($slug, ['sedrazavi-designer-core', 'elementor-addon-suite', 'sedrazavi-addons'], true)) {
            return ['success' => false, 'code' => 403, 'error' => __('رول‌بک برای این شناسه افزونه مجاز نیست.', 'sedrazavi-companion')];
        }

        self::ensure_wp_plugin_admin_loaded();
        $snapshot    = get_option('sr_plugin_rollback_snapshot_' . $slug, []);
        $plugin_root = defined('WP_PLUGIN_DIR') ? WP_PLUGIN_DIR : (ABSPATH . 'wp-content/plugins');
        $main_file   = $snapshot['main_file'] ?? ($slug . '/' . $slug . '.php');
        $target_dir  = $snapshot['installed_path'] ?? (trailingslashit($plugin_root) . $slug . '/');

        if (function_exists('is_plugin_active') && is_plugin_active($main_file) && function_exists('deactivate_plugins')) {
            deactivate_plugins($main_file, true);
        }

        $restored_backup = false;
        self::purge_directory_recursive($target_dir);

        if (!empty($snapshot['backup_path']) && is_dir($snapshot['backup_path'])) {
            if (self::copy_directory_recursive($snapshot['backup_path'], $target_dir)) {
                $restored_backup = true;
                self::purge_directory_recursive($snapshot['backup_path']);
                if (!empty($snapshot['was_active_before']) && function_exists('activate_plugin')) {
                    activate_plugin($main_file);
                }
            }
        }

        delete_option('sr_plugin_rollback_snapshot_' . $slug);
        $ledger = get_option('sr_installed_ecosystem_plugins', []);
        if (is_array($ledger) && isset($ledger[$slug])) {
            unset($ledger[$slug]);
            update_option('sr_installed_ecosystem_plugins', $ledger);
        }

        return [
            'success'              => true,
            'slug'                 => $slug,
            'restored_from_backup' => $restored_backup,
            'message'              => $restored_backup
                ? sprintf(__('افزونه «%s» با موفقیت به نسخه قبلی خود برگردانده (Rollback) شد.', 'sedrazavi-companion'), $slug)
                : sprintf(__('نصب افزونه «%s» با موفقیت لغو و فایل‌های آن پاک‌سازی گردید.', 'sedrazavi-companion'), $slug),
        ];
    }

    /**
     * Persist cloud template queue selection in wp_options instead of fake JS button feedback.
     *
     * @param string $template_id
     * @param string $title
     * @return array
     */
    public static function queue_cloud_template($template_id, $title = '') {
        $clean_id = sanitize_key($template_id);
        if ($clean_id === '') {
            return ['success' => false, 'error' => __('شناسه الگو نامعتبر است.', 'sedrazavi-companion')];
        }

        $queued = get_option('sr_cloud_queued_templates', []);
        if (!is_array($queued)) {
            $queued = [];
        }

        $queued[$clean_id] = [
            'id'        => $clean_id,
            'title'     => sanitize_text_field($title ?: $clean_id),
            'queued_by' => get_current_user_id(),
            'queued_at' => gmdate('Y-m-d H:i:s'),
            'status'    => 'queued',
        ];
        update_option('sr_cloud_queued_templates', $queued);

        return [
            'success' => true,
            'item'    => $queued[$clean_id],
            'total'   => count($queued),
            'message' => sprintf(__('الگوی «%s» در صف استقرار کتابخانه (wp_options) ثبت شد.', 'sedrazavi-companion'), $queued[$clean_id]['title']),
        ];
    }

    public static function get_queued_cloud_templates() {
        $queued = get_option('sr_cloud_queued_templates', []);
        return is_array($queued) ? $queued : [];
    }

    /**
     * AJAX handler for Backend Admin Dashboard cloud template queuing.
     */
    public function ajax_queue_cloud_template() {
        check_ajax_referer('sr_admin_dashboard_nonce', 'nonce');
        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('مجوز دسترسی مدیریت ندارید.', 'sedrazavi-companion')], 403);
        }

        $template_id = sanitize_key($_POST['template_id'] ?? '');
        $title       = sanitize_text_field(wp_unslash($_POST['title'] ?? ''));
        $res         = self::queue_cloud_template($template_id, $title);

        if (!empty($res['success'])) {
            wp_send_json_success($res);
        } else {
            wp_send_json_error(['message' => $res['error'] ?? __('خطا در ثبت الگوی ابری.', 'sedrazavi-companion')], 400);
        }
    }

    /**
     * AJAX handler for Backend Admin Dashboard plugin toggle & rollback actions.
     */
    public function ajax_admin_plugin_action() {
        check_ajax_referer('sr_admin_dashboard_nonce', 'nonce');
        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('مجوز مدیریت افزونه‌ها ندارید.', 'sedrazavi-companion')], 403);
        }

        $action_type = sanitize_key($_POST['plugin_action'] ?? 'toggle');
        $slug        = sanitize_key($_POST['plugin_slug'] ?? '');

        if ($action_type === 'rollback') {
            $res = self::rollback_ecosystem_plugin($slug);
        } elseif ($action_type === 'install') {
            $res = self::install_ecosystem_plugin($slug, [
                'remote_url'      => sanitize_text_field(wp_unslash($_POST['remote_url'] ?? '')),
                'expected_sha256' => sanitize_text_field(wp_unslash($_POST['expected_sha256'] ?? '')),
                'overwrite'       => true,
            ]);
        } else {
            $res = self::toggle_ecosystem_plugin($slug);
        }

        if (!empty($res['success'])) {
            wp_send_json_success($res);
        } else {
            wp_send_json_error(['message' => $res['error'] ?? __('خطا در اجرای عملیات افزونه.', 'sedrazavi-companion')], (int) ($res['code'] ?? 400));
        }
    }
}

}
