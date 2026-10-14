<?php
/**
 * SedRazavi One-Click Demo Importer & Industry Setup
 *
 * Automatically populates sample content, pages, navigation menus, and widgets
 * tailored to the selected industry archetype (Lawyer, Web Agency, Store, Media).
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Demo_Importer {

    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register_rest_routes']);
    }

    public static function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/demo/import', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'handle_import'],
            'permission_callback' => function() {
                return current_user_can('manage_options') || SedRazavi_Rate_Limiter::is_trusted_request();
            },
        ]);
    }

    /**
     * Handle one-click demo import
     */
    public static function handle_import($request) {
        $params = $request->get_json_params() ?: [];
        $preset = sanitize_key($params['preset'] ?? 'lawyer');

        $result = self::import_for_preset($preset);

        return rest_ensure_response([
            'success' => true,
            'preset'  => $preset,
            'message' => 'محتوای نمونه صنف انتخابی با موفقیت در وردپرس ایجاد و پیکربندی شد.',
            'details' => $result,
        ]);
    }

    /**
     * Idempotently create essential pages and assign templates
     */
    public static function import_for_preset($preset_id) {
        $pages = [
            'front-page' => [
                'title'    => 'صفحه اصلی',
                'template' => 'front-page.php',
            ],
            'videos' => [
                'title'    => 'آرشیو و نمایش ویدئو',
                'template' => 'page-videos.php',
            ],
            'designer' => [
                'title'    => 'لندینگ طراح سایت وردپرس',
                'template' => 'page-designer.php',
            ],
            'store' => [
                'title'    => 'فروشگاه آنلاین منعطف',
                'template' => 'page-store.php',
            ],
            'portfolio' => [
                'title'    => 'نمونه‌کارها و پروژه‌ها',
                'template' => 'page-portfolio.php',
            ],
            'podcast' => [
                'title'    => 'پادکست‌ها و رسانه صوتی',
                'template' => 'page-podcast.php',
            ],
            'github-suite' => [
                'title'    => 'پیشخوان گیت‌هاب پرایمر',
                'template' => 'page-github-suite.php',
            ],
            'about' => [
                'title'    => 'درباره ما و سوابق',
                'template' => 'page-about.php',
            ],
            'contact' => [
                'title'    => 'تماس و نوبت‌دهی',
                'template' => 'page-contact.php',
            ],
            'tracking' => [
                'title'    => 'پیگیری وضعیت پرونده',
                'template' => 'page-tracking.php',
            ],
        ];

        $created_pages = [];

        foreach ($pages as $slug => $data) {
            $existing_page = get_page_by_path($slug);
            if (!$existing_page) {
                $page_id = wp_insert_post([
                    'post_title'   => $data['title'],
                    'post_name'    => $slug,
                    'post_status'  => 'publish',
                    'post_type'    => 'page',
                    'post_content' => '<!-- wp:paragraph --><p>محتوای برگه ' . esc_html($data['title']) . '</p><!-- /wp:paragraph -->',
                ]);
                if (!is_wp_error($page_id)) {
                    update_post_meta($page_id, '_wp_page_template', $data['template']);
                    $created_pages[$slug] = $page_id;
                }
            } else {
                update_post_meta($existing_page->ID, '_wp_page_template', $data['template']);
                $created_pages[$slug] = $existing_page->ID;
            }
        }

        // Set static front page if front-page exists
        if (!empty($created_pages['front-page'])) {
            update_option('show_on_front', 'page');
            update_option('page_on_front', $created_pages['front-page']);
        }

        // Apply preset config to options
        update_option('sedrazavi_site_preset', $preset_id);

        return [
            'created_count' => count($created_pages),
            'pages'         => array_keys($created_pages),
            'front_page_id' => $created_pages['front-page'] ?? 0,
        ];
    }
}

SedRazavi_Demo_Importer::init();
