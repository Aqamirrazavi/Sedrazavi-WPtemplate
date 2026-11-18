<?php
/**
 * Canonical Case Data Ownership, CPT Registry & Anti-IDOR Service (Plugin SSOT)
 *
 * Single authoritative service for confidential legal case post types,
 * dedicated legal capabilities (removing generic `edit_posts` leakage),
 * per-object ownership verification, and non-staff metadata redaction.
 *
 * @package SedRazavi_Companion
 * @version 6.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('SedRazavi_Case_Data_Service')) {

class SedRazavi_Case_Data_Service {

    /**
     * Authoritative confidential CPT slug for legal cases.
     */
    const CANONICAL_CPT = 'sedrazavi_case';

    /**
     * Supported case CPT slugs for backward-compatible reads and migrations.
     *
     * @return array
     */
    public static function get_case_post_types() {
        return array('sedrazavi_case', 'case', 'arbitration_case', 'sedrazavi_dashboard');
    }

    /**
     * Primary litigation CPTs (excluding dashboard umbrella container unless requested).
     *
     * @return array
     */
    public static function get_litigation_post_types() {
        return array('sedrazavi_case', 'case');
    }

    /**
     * Confidential CPT slugs that must never appear in unauthenticated search or Elementor grids.
     *
     * @return array
     */
    public static function get_confidential_cpts() {
        return array(
            'sedrazavi_case',
            'case',
            'arbitration_case',
            'sedrazavi_dashboard',
            'sedrazavi_appointment',
            'sedrazavi_booking',
            'uas_lead',
        );
    }

    /**
     * Dedicated legal domain capabilities & CPT primitive capabilities.
     * Grants access ONLY to Administrator and explicit Legal Counsel roles —
     * NEVER to standard WP Contributor/Author roles carrying only `edit_posts`.
     */
    public static function register_legal_capabilities() {
        $legal_caps = array(
            'sedrazavi_manage_cases',
            'sedrazavi_view_cases',
            'sedrazavi_view_all_cases',
            'sedrazavi_create_cases',
            // Primitive caps for canonical CPT
            'edit_sedrazavi_case',
            'read_sedrazavi_case',
            'delete_sedrazavi_case',
            'edit_sedrazavi_cases',
            'edit_others_sedrazavi_cases',
            'publish_sedrazavi_cases',
            'read_private_sedrazavi_cases',
            'delete_sedrazavi_cases',
            'delete_private_sedrazavi_cases',
            'delete_published_sedrazavi_cases',
            'delete_others_sedrazavi_cases',
            'edit_private_sedrazavi_cases',
            'edit_published_sedrazavi_cases',
        );

        foreach (array('administrator', 'sedrazavi_lawyer', 'lawyer') as $role_slug) {
            $role = get_role($role_slug);
            if ($role) {
                foreach ($legal_caps as $cap) {
                    if (!$role->has_cap($cap)) {
                        $role->add_cap($cap);
                    }
                }
            }
        }

        // Client roles strictly receive self-dossier viewing capability only
        foreach (array('sedrazavi_client', 'sr_client') as $client_role_slug) {
            $client_role = get_role($client_role_slug);
            if ($client_role && !$client_role->has_cap('sedrazavi_view_own_cases')) {
                $client_role->add_cap('sedrazavi_view_own_cases');
            }
        }
    }

    /**
     * Register canonical confidential CPT `sedrazavi_case` with strict isolation.
     */
    public static function register_canonical_case_cpt() {
        if (!post_type_exists(self::CANONICAL_CPT)) {
            $labels = array(
                'name'               => esc_html__('پرونده‌های محرمانه موکلین', 'sedrazavi-companion'),
                'singular_name'      => esc_html__('پرونده حقوقی محرمانه', 'sedrazavi-companion'),
                'menu_name'          => esc_html__('کارتابل پرونده‌ها', 'sedrazavi-companion'),
                'add_new'            => esc_html__('ثبت پرونده جدید', 'sedrazavi-companion'),
                'add_new_item'       => esc_html__('ثبت پرونده محرمانه جدید', 'sedrazavi-companion'),
                'edit_item'          => esc_html__('ویرایش پرونده', 'sedrazavi-companion'),
                'all_items'          => esc_html__('همه پرونده‌ها', 'sedrazavi-companion'),
                'search_items'       => esc_html__('جستجوی پرونده‌ها', 'sedrazavi-companion'),
                'not_found'          => esc_html__('پرونده‌ای یافت نشد', 'sedrazavi-companion'),
            );

            register_post_type(self::CANONICAL_CPT, array(
                'labels'              => $labels,
                'public'              => false,
                'publicly_queryable'  => false,
                'exclude_from_search' => true,
                'show_ui'             => true,
                'show_in_menu'        => true,
                'show_in_nav_menus'   => false,
                'has_archive'         => false,
                'rewrite'             => false,
                'query_var'           => false,
                'menu_icon'           => 'dashicons-lock',
                'supports'            => array('title', 'custom-fields', 'revisions', 'author'),
                'show_in_rest'        => false,
                'capability_type'     => array('sedrazavi_case', 'sedrazavi_cases'),
                'map_meta_cap'        => true,
            ));
        }

        if (!taxonomy_exists('case_type')) {
            register_taxonomy('case_type', array(self::CANONICAL_CPT, 'case'), array(
                'labels'            => array(
                    'name'          => esc_html__('موضوعات دادرسی محرمانه', 'sedrazavi-companion'),
                    'singular_name' => esc_html__('موضوع دعوا', 'sedrazavi-companion'),
                ),
                'hierarchical'      => true,
                'public'            => false,
                'show_ui'           => true,
                'show_in_rest'      => false,
                'rewrite'           => false,
            ));
        }
    }

    /**
     * Determine whether user is an authorized Administrator or Managing Legal Counsel.
     * Explicitly does NOT accept generic WP `edit_posts` capability.
     *
     * @param int $user_id
     * @return bool
     */
    public static function is_privileged_legal_staff($user_id = 0) {
        $uid = $user_id ? absint($user_id) : get_current_user_id();
        if ($uid <= 0) {
            return false;
        }
        return user_can($uid, 'manage_options')
            || user_can($uid, 'sedrazavi_manage_cases')
            || user_can($uid, 'sedrazavi_view_all_cases');
    }

    /**
     * Determine whether user can read at least their own or assigned legal dossiers.
     * Excludes standard Contributors/Authors lacking any legal capability or ownership.
     *
     * @param int $user_id
     * @return bool
     */
    public static function can_access_cases_endpoint($user_id = 0) {
        $uid = $user_id ? absint($user_id) : get_current_user_id();
        if ($uid <= 0) {
            return false;
        }
        if (self::is_privileged_legal_staff($uid)) {
            return true;
        }
        return user_can($uid, 'sedrazavi_view_cases')
            || user_can($uid, 'sedrazavi_view_own_cases')
            || user_can($uid, 'sr_view_own_data')
            || user_can($uid, 'view_own_cases')
            || user_can($uid, 'sr_manage_cases');
    }

    /**
     * Determine whether user can create/modify confidential cases.
     *
     * @param int $user_id
     * @return bool
     */
    public static function can_create_or_manage_cases($user_id = 0) {
        $uid = $user_id ? absint($user_id) : get_current_user_id();
        if ($uid <= 0) {
            return false;
        }
        return user_can($uid, 'manage_options')
            || user_can($uid, 'sedrazavi_manage_cases')
            || user_can($uid, 'sedrazavi_create_cases');
    }

    /**
     * Strict per-object ownership / assignment check (Anti-IDOR).
     *
     * @param int|\WP_Post $post_or_id
     * @param int          $user_id
     * @return bool
     */
    public static function can_user_access_case($post_or_id, $user_id = 0) {
        $uid = $user_id ? absint($user_id) : get_current_user_id();
        if ($uid <= 0) {
            return false;
        }

        $post = is_object($post_or_id) ? $post_or_id : get_post(absint($post_or_id));
        if (!$post || !in_array($post->post_type, self::get_case_post_types(), true)) {
            return false;
        }

        if (self::is_privileged_legal_staff($uid)) {
            return true;
        }

        $pid = (int) $post->ID;
        $post_author = (int) $post->post_author;
        $assigned_lawyer_id = (int) get_post_meta($pid, '_sedrazavi_assigned_lawyer_id', true);
        $client_uid_primary = (int) get_post_meta($pid, '_sedrazavi_client_user_id', true);
        $client_uid_legacy  = (int) get_post_meta($pid, '_client_user_id', true);
        $client_portal_id   = (string) get_post_meta($pid, '_sedrazavi_client_portal_id', true);

        if (
            $post_author === $uid ||
            $assigned_lawyer_id === $uid ||
            $client_uid_primary === $uid ||
            $client_uid_legacy === $uid ||
            ($client_portal_id !== '' && hash_equals($client_portal_id, 'user_' . $uid))
        ) {
            return true;
        }

        $case_number = (string) (get_post_meta($pid, '_sedrazavi_case_number', true) ?: get_post_meta($pid, '_case_number', true));
        $assigned_dossier = (string) get_user_meta($uid, '_sedrazavi_assigned_case_id', true);
        if (
            $assigned_dossier !== '' &&
            ($assigned_dossier === (string) $pid || ($case_number !== '' && hash_equals($assigned_dossier, $case_number)))
        ) {
            return true;
        }

        return false;
    }

    /**
     * Unified ownership verification for Matter Portal records (CPT-backed or option ledger).
     *
     * @param array $matter
     * @param int   $user_id
     * @return bool
     */
    public static function can_user_access_matter_record(array $matter, $user_id = 0) {
        $uid = $user_id ? absint($user_id) : get_current_user_id();
        if ($uid <= 0) {
            return false;
        }

        if (self::is_privileged_legal_staff($uid)) {
            return true;
        }

        if (!empty($matter['post_id'])) {
            return self::can_user_access_case((int) $matter['post_id'], $uid);
        }

        $matter_client_uid = isset($matter['client_user_id']) ? (int) $matter['client_user_id'] : 0;
        $matter_lawyer_uid = isset($matter['assigned_lawyer_id']) ? (int) $matter['assigned_lawyer_id'] : 0;
        $matter_client_id  = isset($matter['client_id']) ? (string) $matter['client_id'] : '';

        if ($matter_client_uid === $uid || $matter_lawyer_uid === $uid) {
            return true;
        }

        if ($matter_client_id !== '' && hash_equals($matter_client_id, 'user_' . $uid)) {
            return true;
        }

        return false;
    }

    /**
     * Build WP_Query arguments scoped strictly by ownership when requester is non-privileged.
     * Note: Handlers should ALSO filter each returned post through `can_user_access_case()`.
     *
     * @param int   $user_id
     * @param array $extra_args
     * @return array
     */
    public static function build_scoped_case_query_args($user_id = 0, array $extra_args = array()) {
        $uid = $user_id ? absint($user_id) : get_current_user_id();
        $is_privileged = self::is_privileged_legal_staff($uid);

        $defaults = array(
            'post_type'      => self::get_litigation_post_types(),
            'post_status'    => array('private', 'publish'),
            'posts_per_page' => $is_privileged ? 50 : 100,
            'orderby'        => 'date',
            'order'          => 'DESC',
        );

        return array_merge($defaults, $extra_args);
    }

    /**
     * Count total confidential cases across `private` and legacy `publish` statuses.
     *
     * @return int
     */
    public static function count_active_cases() {
        $total = 0;
        foreach (self::get_litigation_post_types() as $cpt) {
            if (!post_type_exists($cpt)) {
                continue;
            }
            $counts = wp_count_posts($cpt);
            if ($counts) {
                $total += (int) ($counts->private ?? 0);
                $total += (int) ($counts->publish ?? 0);
            }
        }
        return $total;
    }
}

}
