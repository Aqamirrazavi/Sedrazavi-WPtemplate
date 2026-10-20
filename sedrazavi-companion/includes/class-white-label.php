<?php
/**
 * SedRazavi Agency White-Label & Client Handover Mode
 *
 * Allows agency designers to rebrand the system, customize the login screen,
 * and enable Client Handover Safe Mode to protect critical settings.
 *
 * @package SedRazavi_Companion
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_White_Label {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_filter('admin_footer_text', [$this, 'filter_admin_footer']);
        add_filter('login_headertext', [$this, 'filter_login_headertext']);
        add_filter('login_headerurl', [$this, 'filter_login_headerurl']);
        add_action('admin_menu', [$this, 'apply_client_safe_mode'], 999);
    }

    public function get_brand_name() {
        return get_option('sedrazavi_agency_brand_name', 'SedRazavi OS');
    }

    public function filter_admin_footer($text) {
        $custom_footer = get_option('sedrazavi_agency_footer_text', '');
        if (!empty($custom_footer)) {
            return esc_html($custom_footer);
        }
        return sprintf(
            'طراحی و توسعه با <a href="%s" target="_blank">%s</a>',
            esc_url(home_url('/')),
            esc_html($this->get_brand_name())
        );
    }

    public function filter_login_headertext($text) {
        return esc_html($this->get_brand_name());
    }

    public function filter_login_headerurl($url) {
        return home_url('/');
    }

    public function apply_client_safe_mode() {
        $is_handover_mode = get_option('sedrazavi_client_handover_mode', 'no') === 'yes';

        // Only apply restrictions if handover mode is ON and current user is not user ID 1 or super admin
        if ($is_handover_mode && get_current_user_id() !== 1 && !is_super_admin()) {
            // Remove code file editors to prevent client breaking site
            remove_submenu_page('themes.php', 'theme-editor.php');
            remove_submenu_page('plugins.php', 'plugin-editor.php');
            // Remove raw duplicator or advanced system update menus if present
            remove_menu_page('tools.php');
        }
    }
}
