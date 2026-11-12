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
        $report = self::import_from_directory(UAS_PATH . 'templates/', 'container');
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
            UAS_PATH . 'templates/' => 'container',
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
     * Authoritative map of Elementor widgetType slugs to widget PHP class files
     */
    public static function get_widget_file_map() {
        return [
            'uas_banner_slider'     => 'class-widget-banner-slider.php',
            'uas_before_after'      => 'class-widget-before-after.php',
            'uas_bento_tabs'        => 'class-widget-bento-tabs.php',
            'uas_case_timeline'     => 'class-widget-case-timeline.php',
            'uas_client_portal'     => 'class-widget-client-portal.php',
            'uas_contact_booking'   => 'class-widget-contact-booking.php',
            'uas_cta'               => 'class-widget-cta.php',
            'uas_download_box'      => 'class-widget-download-box.php',
            'uas_dynamic_grid'      => 'class-widget-dynamic-grid.php',
            'uas_email_otp'         => 'class-widget-email-otp.php',
            'uas_faq'               => 'class-widget-faq.php',
            'uas_firm_milestones'   => 'class-widget-firm-milestones.php',
            'uas_floating_cta'      => 'class-widget-floating-cta.php',
            'uas_floating_dock'     => 'class-widget-floating-dock.php',
            'uas_fomo_countdown'    => 'class-widget-fomo-countdown.php',
            'uas_hero'              => 'class-widget-hero.php',
            'uas_hero_split'        => 'class-widget-hero-split.php',
            'uas_news_ticker'       => 'class-widget-news-ticker.php',
            'uas_posts_grid'        => 'class-widget-posts.php',
            'uas_pricing_matrix'    => 'class-widget-pricing-matrix.php',
            'uas_pricing_switcher'  => 'class-widget-pricing-switcher.php',
            'uas_radar_chart'       => 'class-widget-radar-chart.php',
            'uas_services_grid'     => 'class-widget-services-grid.php',
            'uas_spotplayer_course' => 'class-widget-spotplayer-course.php',
            'uas_stat_counter'      => 'class-widget-stat-counter.php',
            'uas_story_bar'         => 'class-widget-story-bar.php',
            'uas_team'              => 'class-widget-team.php',
            'uas_testimonials'      => 'class-widget-testimonials.php',
            'uas_theme_toggle'      => 'class-widget-theme-toggle.php',
            'uas_video'             => 'class-widget-video.php',
            'uas_vip_pricing'       => 'class-widget-vip-pricing.php',
        ];
    }

    /**
     * Recursively extract all widgetType values from an Elementor template content tree
     *
     * @param array $elements
     * @return array
     */
    public static function extract_widget_types(array $elements) {
        $types = [];
        foreach ($elements as $el) {
            if (!is_array($el)) {
                continue;
            }
            if (!empty($el['widgetType'])) {
                $types[] = sanitize_key($el['widgetType']);
            }
            if (!empty($el['elements']) && is_array($el['elements'])) {
                $types = array_merge($types, self::extract_widget_types($el['elements']));
            }
        }
        return array_values(array_unique($types));
    }

    /**
     * Validate that all uas_* widgets required by a template are available before importing
     *
     * @param array $elements
     * @param string|null $widgets_dir
     * @return array [ 'valid' => bool, 'required_widgets' => array, 'missing_widgets' => array ]
     */
    public static function validate_template_widget_dependencies(array $elements, $widgets_dir = null) {
        if (!$widgets_dir) {
            $widgets_dir = UAS_PATH . 'includes/widgets/';
        }
        $file_map = self::get_widget_file_map();
        $used = self::extract_widget_types($elements);
        $required = [];
        $missing = [];

        $registered_widgets = [];
        if (class_exists('\Elementor\Plugin') && isset(\Elementor\Plugin::$instance->widgets_manager)) {
            $registered_widgets = array_keys(\Elementor\Plugin::$instance->widgets_manager->get_widget_types());
        }

        foreach ($used as $w_type) {
            if (strpos($w_type, 'uas_') !== 0) {
                continue;
            }
            $required[] = $w_type;
            $expected_file = $file_map[$w_type] ?? ('class-widget-' . str_replace('uas_', '', str_replace('_', '-', $w_type)) . '.php');
            $has_file = file_exists(trailingslashit($widgets_dir) . $expected_file);
            $is_registered = in_array($w_type, $registered_widgets, true);

            if (!$has_file && !$is_registered) {
                $missing[] = $w_type;
            }
        }

        return [
            'valid'            => empty($missing),
            'required_widgets' => $required,
            'missing_widgets'  => $missing,
        ];
    }

    /**
     * Automated Media Relinker & Zero-CDN Sovereign Asset Fallback
     * Rewrites external CDN or broken source attachment URLs inside Elementor JSON data to bundled local assets.
     *
     * @param array $elements Passed by reference
     * @param string|null $placeholder_base_url
     * @return int Number of media nodes relinked
     */
    public static function relink_template_media(array &$elements, $placeholder_base_url = null) {
        if (!$placeholder_base_url) {
            $placeholder_base_url = defined('UAS_URL') ? UAS_URL . 'assets/images/placeholders/' : '';
        }
        $relinked = 0;

        $pick_placeholder = function($url) use ($placeholder_base_url) {
            $lower = strtolower((string) $url);
            if (strpos($lower, 'avatar') !== false || strpos($lower, 'w=200') !== false || strpos($lower, '1534528741775') !== false || strpos($lower, '1507003211169') !== false) {
                return $placeholder_base_url . 'client-avatar.svg';
            }
            if (strpos($lower, 'product') !== false || strpos($lower, '1523275335684') !== false) {
                return $placeholder_base_url . 'product-studio.svg';
            }
            if (strpos($lower, 'saas') !== false || strpos($lower, '1460925895917') !== false || strpos($lower, 'w=900') !== false) {
                return $placeholder_base_url . 'saas-dashboard.svg';
            }
            return $placeholder_base_url . 'hero-showcase.svg';
        };

        $walk_settings = function(&$node) use (&$walk_settings, &$relinked, $pick_placeholder, $placeholder_base_url) {
            if (!is_array($node)) {
                return;
            }
            // Image object pattern: ['url' => '...', 'id' => 123]
            if (isset($node['url']) && is_string($node['url']) && $placeholder_base_url) {
                $url = $node['url'];
                $is_external_demo = (strpos($url, 'images.unsplash.com') !== false || strpos($url, 'placeholder.com') !== false || strpos($url, 'via.placeholder') !== false);
                $has_orphan_id = !empty($node['id']) && function_exists('get_post_type') && get_post_type((int) $node['id']) !== 'attachment';

                if ($is_external_demo || $has_orphan_id) {
                    $node['url'] = $pick_placeholder($url);
                    $node['id'] = '';
                    $node['source'] = 'sovereign_local';
                    $relinked++;
                }
            }

            foreach ($node as $key => &$child) {
                if (is_array($child)) {
                    $walk_settings($child);
                }
            }
        };

        foreach ($elements as &$el) {
            if (!is_array($el)) {
                continue;
            }
            if (!empty($el['settings']) && is_array($el['settings'])) {
                $walk_settings($el['settings']);
            }
            if (!empty($el['elements']) && is_array($el['elements'])) {
                $relinked += self::relink_template_media($el['elements'], $placeholder_base_url);
            }
        }

        return $relinked;
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

        // Strict Widget Dependency Gating before database insertion
        $dep_check = self::validate_template_widget_dependencies($data['content']);
        if (!$dep_check['valid']) {
            return [
                'success'         => false,
                'missing_widgets' => $dep_check['missing_widgets'],
                'message'         => sprintf('واردکردن قالب مسدود شد: ویجت‌های موردنیاز (%s) در سایت موجود نیستند.', implode(', ', $dep_check['missing_widgets'])),
            ];
        }

        // Automated Media Relinker for clean destination import
        $relinked_media = self::relink_template_media($data['content']);

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
        update_post_meta($post_id, '_uas_required_widgets', $dep_check['required_widgets']);

        if ($type === 'popup' && !empty($data['page_settings'])) {
            update_post_meta($post_id, '_elementor_page_settings', wp_slash(json_encode($data['page_settings'])));
        }

        self::flush_elementor_css_cache();

        return [
            'success'        => true,
            'post_id'        => $post_id,
            'title'          => $data['title'],
            'slug'           => $slug,
            'relinked_media' => $relinked_media,
            'status'         => 'imported',
            'message'        => 'قالب با موفقیت به کتابخانه الگوهای المنتور اضافه شد.'
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
            return ['success' => true, 'imported' => 0, 'skipped' => 0, 'blocked' => 0, 'items' => []];
        }

        $imported = 0;
        $skipped = 0;
        $blocked = 0;
        $results = [];

        foreach ($files as $file) {
            $slug = basename($file, '.json');
            $raw_content = file_get_contents($file);
            $data = json_decode($raw_content, true);

            if (!is_array($data) || empty($data['title']) || empty($data['content'])) {
                continue;
            }

            // Strict Widget Dependency Gate
            $dep_check = self::validate_template_widget_dependencies($data['content']);
            if (!$dep_check['valid']) {
                $blocked++;
                $results[] = [
                    'title'           => $data['title'],
                    'slug'            => $slug,
                    'status'          => 'blocked_missing_dependencies',
                    'missing_widgets' => $dep_check['missing_widgets'],
                ];
                continue;
            }

            // Automated Media Relinker
            self::relink_template_media($data['content']);

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
            update_post_meta($post_id, '_uas_required_widgets', $dep_check['required_widgets']);

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
            'blocked'  => $blocked,
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
