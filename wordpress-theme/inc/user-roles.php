<?php
/**
 * SedRazavi Custom Legal Roles & Capabilities
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_register_custom_roles')) {
function sedrazavi_register_custom_roles() {
    // 1. Client Role
    add_role('sedrazavi_client', esc_html__('موکل حقوقی (Client)', 'sedrazavi'), array(
        'read'                  => true,
        'view_own_cases'        => true,
        'book_consultations'    => true,
        'upload_case_documents' => true,
    ));

    // 2. Legal Secretary Role
    add_role('sedrazavi_secretary', esc_html__('منشی دفتر وکالت (Secretary)', 'sedrazavi'), array(
        'read'                  => true,
        'edit_posts'            => false,
        'manage_appointments'   => true,
        'view_client_inbox'     => true,
        'moderate_comments'     => true,
    ));

    // 3. Legal Intern Role
    add_role('sedrazavi_intern', esc_html__('کارآموز وکالت (Legal Intern)', 'sedrazavi'), array(
        'read'                  => true,
        'view_cases_readonly'   => true,
        'research_library'      => true,
    ));
}
add_action('after_switch_theme', 'sedrazavi_register_custom_roles');
}
