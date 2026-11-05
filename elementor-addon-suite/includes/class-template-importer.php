<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Elementor Template & Popup Importer
 *
 * Reads packaged JSON section templates and popups and imports them idempotently
 * into Elementor's Saved Templates library (elementor_library).
 */
class Template_Importer {

    /**
     * Run import on plugin activation
     */
    public static function run_activation_import() {
        self::import_all_templates();
        self::import_all_popups();
    }

    /**
     * Import all JSON section templates from templates directory
     *
     * @return array Status report
     */
    public static function import_all_templates() {
        $report = self::import_from_directory(UAS_PATH . 'templates/', 'section');
        self::flush_elementor_css_cache();
        return $report;
    }

    /**
     * Import all JSON popup templates from templates/popups directory
     *
     * @return array Status report
     */
    public static function import_all_popups() {
        $report = self::import_from_directory(UAS_PATH . 'templates/popups/', 'popup');
        self::flush_elementor_css_cache();
        return $report;
    }

    /**
     * Flush Elementor compiled CSS files cache for instant styling parity
     */
    public static function flush_elementor_css_cache() {
        if (class_exists('\Elementor\Plugin') && isset(\Elementor\Plugin::$instance->files_manager)) {
            \Elementor\Plugin::$instance->files_manager->clear_cache();
        }
    }

    /**
     * Get list of all packaged templates and their import status
     *
     * @return array
     */
    public static function get_templates_manifest() {
        $manifest = [];
        $sources = [
            UAS_PATH . 'templates/' => 'section',
            UAS_PATH . 'templates/popups/' => 'popup',
        ];

        foreach ($sources as $dir => $default_type) {
            if (!is_dir($dir)) continue;
            $files = glob($dir . '*.json');
            foreach ($files as $file) {
                $slug = basename($file, '.json');
                $raw = @file_get_contents($file);
                $data = @json_decode($raw, true);
                if (!is_array($data) || empty($data['title'])) continue;

                $existing = get_posts([
                    'post_type'      => 'elementor_library',
                    'post_status'    => 'any',
                    'posts_per_page' => 1,
                    'meta_key'       => '_uas_template_slug',
                    'meta_value'     => $slug,
                ]);

                $manifest[] = [
                    'slug'        => $slug,
                    'title'       => $data['title'],
                    'type'        => $data['type'] ?? $default_type,
                    'is_imported' => !empty($existing),
                    'post_id'     => !empty($existing) ? $existing[0]->ID : 0,
                    'file'        => $file,
                ];
            }
        }
        return $manifest;
    }

    /**
     * Import a single template by its slug
     *
     * @param string $slug
     * @return array
     */
    public static function import_single_template($slug) {
        $slug = sanitize_key($slug);
        $file = UAS_PATH . 'templates/' . $slug . '.json';
        $type = 'section';

        if (!file_exists($file)) {
            $file = UAS_PATH . 'templates/popups/' . $slug . '.json';
            $type = 'popup';
        }

        if (!file_exists($file)) {
            return ['success' => false, 'message' => "قالب با شناسه {$slug} یافت نشد."];
        }

        $raw_content = file_get_contents($file);
        $data = json_decode($raw_content, true);

        if (!is_array($data) || empty($data['title']) || empty($data['content'])) {
            return ['success' => false, 'message' => 'فرمت فایل قالب نامعتبر است.'];
        }

        $type = $data['type'] ?? $type;

        // Check if exists
        $existing = get_posts([
            'post_type'      => 'elementor_library',
            'post_status'    => 'any',
            'posts_per_page' => 1,
            'meta_key'       => '_uas_template_slug',
            'meta_value'     => $slug,
        ]);

        if (!empty($existing)) {
            return [
                'success' => true,
                'post_id' => $existing[0]->ID,
                'title'   => $data['title'],
                'slug'    => $slug,
                'status'  => 'already_exists',
                'message' => 'این قالب از قبل در کتابخانه الگوهای المنتور موجود است.'
            ];
        }

        $post_id = wp_insert_post([
            'post_title'   => sanitize_text_field($data['title']),
            'post_type'    => 'elementor_library',
            'post_status'  => 'publish',
            'post_content' => '',
        ]);

        if (is_wp_error($post_id) || !$post_id) {
            return ['success' => false, 'message' => 'خطا در ثبت پست قالب در دیتابیس.'];
        }

        if (taxonomy_exists('elementor_library_type')) {
            wp_set_object_terms($post_id, $type, 'elementor_library_type');
        }

        update_post_meta($post_id, '_elementor_edit_mode', 'builder');
        update_post_meta($post_id, '_elementor_template_type', $type);
        update_post_meta($post_id, '_elementor_data', wp_slash(json_encode($data['content'])));
        update_post_meta($post_id, '_elementor_version', defined('ELEMENTOR_VERSION') ? ELEMENTOR_VERSION : '3.24.0');
        update_post_meta($post_id, '_uas_template_slug', $slug);

        if ($type === 'popup' && !empty($data['page_settings'])) {
            update_post_meta($post_id, '_elementor_page_settings', wp_slash(json_encode($data['page_settings'])));
        }

        self::flush_elementor_css_cache();

        return [
            'success' => true,
            'post_id' => $post_id,
            'title'   => $data['title'],
            'slug'    => $slug,
            'status'  => 'imported',
            'message' => 'قالب با موفقیت به کتابخانه الگوهای المنتور اضافه شد.'
        ];
    }

    /**
     * General directory importer
     *
     * @param string $dir Directory path
     * @param string $default_type 'section' or 'popup'
     * @return array
     */
    private static function import_from_directory($dir, $default_type = 'section') {
        if (!is_dir($dir)) {
            return ['success' => false, 'message' => "Directory {$dir} not found."];
        }

        $files = glob($dir . '*.json');
        if (empty($files)) {
            return ['success' => true, 'imported' => 0, 'skipped' => 0, 'items' => []];
        }

        $imported = 0;
        $skipped = 0;
        $results = [];

        foreach ($files as $file) {
            $slug = basename($file, '.json');
            $raw_content = file_get_contents($file);
            $data = json_decode($raw_content, true);

            if (!is_array($data) || empty($data['title']) || empty($data['content'])) {
                continue;
            }

            // Idempotency check: see if already imported by slug
            $existing = get_posts([
                'post_type'      => 'elementor_library',
                'post_status'    => 'any',
                'posts_per_page' => 1,
                'meta_key'       => '_uas_template_slug',
                'meta_value'     => $slug,
            ]);

            if (!empty($existing)) {
                $skipped++;
                $results[] = [
                    'id'     => $existing[0]->ID,
                    'title'  => $data['title'],
                    'slug'   => $slug,
                    'type'   => $default_type,
                    'status' => 'already_exists',
                ];
                continue;
            }

            // Create new Elementor Saved Template / Popup post
            $type = $data['type'] ?? $default_type;
            $post_id = wp_insert_post([
                'post_title'   => sanitize_text_field($data['title']),
                'post_type'    => 'elementor_library',
                'post_status'  => 'publish',
                'post_content' => '',
            ]);

            if (is_wp_error($post_id) || !$post_id) {
                continue;
            }

            // Set Elementor taxonomies
            if (taxonomy_exists('elementor_library_type')) {
                wp_set_object_terms($post_id, $type, 'elementor_library_type');
            }

            // Set Elementor meta keys
            update_post_meta($post_id, '_elementor_edit_mode', 'builder');
            update_post_meta($post_id, '_elementor_template_type', $type);
            update_post_meta($post_id, '_elementor_data', wp_slash(json_encode($data['content'])));
            update_post_meta($post_id, '_elementor_version', defined('ELEMENTOR_VERSION') ? ELEMENTOR_VERSION : '3.24.0');
            update_post_meta($post_id, '_uas_template_slug', $slug);

            // If Popup, store page_settings (dimensions, animation, overlay, close button)
            if ($type === 'popup' && !empty($data['page_settings'])) {
                update_post_meta($post_id, '_elementor_page_settings', wp_slash(json_encode($data['page_settings'])));
            }

            $imported++;
            $results[] = [
                'id'     => $post_id,
                'title'  => $data['title'],
                'slug'   => $slug,
                'type'   => $type,
                'status' => 'imported',
            ];
        }

        return [
            'success'  => true,
            'imported' => $imported,
            'skipped'  => $skipped,
            'total'    => count($files),
            'items'    => $results,
        ];
    }

    /**
     * Rollback atomic import batch
     * Removes specified post IDs and their meta in case of error or user undo request
     *
     * @param array $post_ids
     * @return array
     */
    public static function rollback_imported_batch(array $post_ids) {
        $deleted = 0;
        foreach ($post_ids as $id) {
            $post = get_post($id);
            if ($post && $post->post_type === 'elementor_library') {
                if (wp_delete_post($id, true)) {
                    $deleted++;
                }
            }
        }
        return [
            'success' => true,
            'deleted' => $deleted,
            'message' => sprintf('%d قالب با موفقیت از کتابخانه حذف و رول‌بک گردید.', $deleted),
        ];
    }
}
