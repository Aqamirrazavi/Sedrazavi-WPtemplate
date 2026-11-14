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
    // 1. Managing Lawyer / Counsel Role (explicit legal capabilities, no blind Contributor/Author overlap)
    add_role('sedrazavi_lawyer', esc_html__('وکیل دادگستری و مشاور حقوقی (Lawyer)', 'sedrazavi'), array(
        'read'                     => true,
        'upload_files'             => true,
        'sedrazavi_manage_cases'   => true,
        'sedrazavi_view_cases'     => true,
        'sedrazavi_view_all_cases' => true,
        'sedrazavi_create_cases'   => true,
    ));

    // 2. Client Role
    add_role('sedrazavi_client', esc_html__('موکل حقوقی (Client)', 'sedrazavi'), array(
        'read'                     => true,
        'view_own_cases'           => true,
        'sedrazavi_view_own_cases' => true,
        'book_consultations'       => true,
        'upload_case_documents'    => true,
    ));

    // 3. Legal Secretary Role
    add_role('sedrazavi_secretary', esc_html__('منشی دفتر وکالت (Secretary)', 'sedrazavi'), array(
        'read'                  => true,
        'edit_posts'            => false,
        'manage_appointments'   => true,
        'view_client_inbox'     => true,
        'moderate_comments'     => true,
    ));

    // 4. Legal Intern Role
    add_role('sedrazavi_intern', esc_html__('کارآموز وکالت (Legal Intern)', 'sedrazavi'), array(
        'read'                  => true,
        'view_cases_readonly'   => true,
        'research_library'      => true,
    ));

    if (class_exists('SedRazavi_Case_Data_Service')) {
        SedRazavi_Case_Data_Service::register_legal_capabilities();
    }
}
add_action('after_switch_theme', 'sedrazavi_register_custom_roles');
add_action('init', function() {
    if (class_exists('SedRazavi_Case_Data_Service')) {
        SedRazavi_Case_Data_Service::register_legal_capabilities();
    }
}, 5);
}
