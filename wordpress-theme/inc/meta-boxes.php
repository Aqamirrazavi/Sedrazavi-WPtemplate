<?php
/**
 * SedRazavi Native Content Meta Boxes
 *
 * Provides native admin meta boxes for editing page content fields
 * without ACF or external plugin dependencies.
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Native_Meta_Boxes {

    public static function init() {
        add_action('add_meta_boxes', array(__CLASS__, 'register_meta_boxes'));
        add_action('save_post', array(__CLASS__, 'save_meta_boxes'), 10, 2);
    }

    public static function register_meta_boxes() {
        add_meta_box(
            'sedrazavi_page_fields_box',
            esc_html__('فیلدهای اختصاصی و هوشمند محتوا (SedRazavi Native Content)', 'sedrazavi'),
            array(__CLASS__, 'render_meta_box'),
            'page',
            'normal',
            'high'
        );
    }

    public static function render_meta_box($post) {
        wp_nonce_field('sedrazavi_meta_box_nonce_action', 'sedrazavi_meta_box_nonce');

        $slug = get_post_meta($post->ID, '_sedrazavi_manifest_slug', true);
        if (!$slug) {
            $slug = $post->post_name;
        }

        $manifest = SedRazavi_Manifest_Bridge::get_manifest();
        $fields = array();

        if ($manifest && !empty($manifest['routes'])) {
            foreach ($manifest['routes'] as $route) {
                if ($route['slug'] === $slug || $route['template'] === get_post_meta($post->ID, '_wp_page_template', true)) {
                    $fields = isset($route['fields']) ? $route['fields'] : array();
                    break;
                }
            }
        }

        // If no specific fields found, offer general lawyer brand fields
        if (empty($fields)) {
            $fields = array(
                'page_custom_badge' => 'نشان بالای برگه',
                'page_lead_text'    => 'متن لید و چکیده معرفی',
                'emergency_notice'  => 'پیام اطلاع‌رسانی ویژه موکلین',
            );
        }

        echo '<div class="sedrazavi-meta-box-wrapper" style="direction: rtl; text-align: right; font-family: Tahoma, sans-serif; padding: 10px;">';
        echo '<p style="color: #64748b; font-size: 13px; margin-bottom: 15px;">این فیلدها مستقیماً در قالب فرانت‌اند و APIهای پوسته SedRazavi بدون نیاز به ACF تزریق می‌شوند:</p>';

        foreach ($fields as $key => $default_or_label) {
            $meta_key = '_sedrazavi_field_' . sanitize_key($key);
            $current_val = get_post_meta($post->ID, $meta_key, true);
            if ($current_val === '') {
                $current_val = $default_or_label;
            }

            $label = ucwords(str_replace('_', ' ', $key));

            echo '<div style="margin-bottom: 16px;">';
            echo '<label style="display: block; font-weight: bold; margin-bottom: 6px; color: #0B132B;" for="' . esc_attr($meta_key) . '">' . esc_html($label) . ':</label>';

            if (strlen($current_val) > 80 || in_array($key, array('bio', 'academic_records', 'specialties', 'services_subheadline', 'notes'))) {
                echo '<textarea style="width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px; font-size: 13px;" rows="3" id="' . esc_attr($meta_key) . '" name="' . esc_attr($meta_key) . '">' . esc_textarea($current_val) . '</textarea>';
            } else {
                echo '<input style="width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px; font-size: 13px;" type="text" id="' . esc_attr($meta_key) . '" name="' . esc_attr($meta_key) . '" value="' . esc_attr($current_val) . '" />';
            }
            echo '</div>';
        }

        echo '</div>';
    }

    public static function save_meta_boxes($post_id, $post) {
        if (!isset($_POST['sedrazavi_meta_box_nonce']) || !wp_verify_nonce($_POST['sedrazavi_meta_box_nonce'], 'sedrazavi_meta_box_nonce_action')) {
            return;
        }

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        if (!current_user_can('edit_page', $post_id)) {
            return;
        }

        foreach ($_POST as $key => $val) {
            if (strpos($key, '_sedrazavi_field_') === 0) {
                $meta_key = sanitize_key($key);
                if (is_array($val)) {
                    continue;
                }
                $clean_val = sanitize_textarea_field(wp_unslash($val));
                update_post_meta($post_id, $meta_key, $clean_val);
            }
        }
    }
}

SedRazavi_Native_Meta_Boxes::init();
