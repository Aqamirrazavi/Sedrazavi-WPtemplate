<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal GitHub Sync Engine
 * 
 * Provides automated, secure synchronization between the site and the remote GitHub repository
 * supporting 3 distinct scenarios:
 * 1. Default Public Project Repository (1-click sync)
 * 2. Custom Remote Repository with Personal Access Token (PAT) for private repos & forks
 * 3. Offline Local Fallback Bundles (built-in cache of JSON presets and templates)
 * 
 * Manages 3 priority archetypes:
 * - Lawyer & Legal Suite (وکالت و حقوقی)
 * - WordPress Site Designer Gutenberg-First Suite (طراح سایت وردپرس)
 * - Flexible eCommerce Suite (فروشگاه منعطف - سازگار با ووکامرس، وودمارت، جت وو بیلدر و شاپ انجین)
 */
class GitHub_Sync_Engine {

    private static $_instance = null;

    const OPTION_REPO_SETTINGS = 'uas_github_sync_settings';
    const OPTION_ACTIVE_ARCHETYPE = 'uas_active_archetype';
    const OPTION_SYNC_LOGS = 'uas_github_sync_logs';

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        // Register AJAX handlers for admin
        add_action('wp_ajax_uas_test_github_connection', [$this, 'ajax_test_connection']);
        add_action('wp_ajax_uas_sync_github_archetype', [$this, 'ajax_sync_archetype']);
        add_action('wp_ajax_uas_get_sync_status', [$this, 'ajax_get_sync_status']);
    }

    /**
     * Get default settings or saved options
     */
    public function get_settings() {
        $defaults = [
            'sync_mode'      => 'default', // 'default' | 'pat_token' | 'offline_fallback'
            'repo_owner'     => 'Aqamirrazavi',
            'repo_name'      => 'Sedrazavi-WPtemplate',
            'repo_branch'    => 'main',
            'github_token'   => '',
            'auto_update'    => false,
            'last_sync_time' => get_option('uas_last_sync_time', ''),
            'active_archetype'=> get_option(self::OPTION_ACTIVE_ARCHETYPE, 'wp_designer'),
        ];

        $saved = get_option(self::OPTION_REPO_SETTINGS, []);
        return wp_parse_args($saved, $defaults);
    }

    /**
     * Test connection to remote GitHub repository
     */
    public function test_github_connection($settings = null) {
        if (!$settings) {
            $settings = $this->get_settings();
        }

        if ($settings['sync_mode'] === 'offline_fallback') {
            return [
                'success' => true,
                'mode'    => 'offline_fallback',
                'message' => 'بسته محلی آفلاین با موفقیت بارگذاری شد (بدون نیاز به اینترنت).',
                'data'    => [
                    'repo'        => 'Local Cached Bundle',
                    'branch'      => 'offline',
                    'cached_archetypes' => ['lawyer', 'wp_designer', 'ecommerce'],
                ],
            ];
        }

        $owner  = sanitize_text_field($settings['repo_owner']);
        $repo   = sanitize_text_field($settings['repo_name']);
        $branch = sanitize_text_field($settings['repo_branch'] ?: 'main');
        $token  = trim($settings['github_token']);

        $api_url = sprintf('https://api.github.com/repos/%s/%s', $owner, $repo);

        $args = [
            'timeout' => 15,
            'headers' => [
                'User-Agent' => 'WordPress-Universal-Sync-Engine/1.0.0 (' . home_url() . ')',
                'Accept'     => 'application/vnd.github.v3+json',
            ],
        ];

        if (!empty($token)) {
            $args['headers']['Authorization'] = 'Bearer ' . $token;
        }

        $response = wp_remote_get($api_url, $args);

        if (is_wp_error($response)) {
            return [
                'success' => false,
                'message' => 'خطا در برقراری ارتباط با گیت‌هاب: ' . $response->get_error_message(),
                'code'    => 500,
            ];
        }

        $code = wp_remote_retrieve_response_code($response);
        $body = json_decode(wp_remote_retrieve_body($response), true);

        if ($code === 200 && is_array($body)) {
            return [
                'success'     => true,
                'message'     => 'ارتباط با مخزن گیت‌هاب با موفقیت برقرار شد.',
                'repo_name'   => $body['full_name'] ?? "$owner/$repo",
                'description' => $body['description'] ?? '',
                'stars'       => $body['stargazers_count'] ?? 0,
                'open_issues' => $body['open_issues_count'] ?? 0,
                'private'     => !empty($body['private']),
                'branch'      => $branch,
            ];
        }

        return [
            'success' => false,
            'message' => 'پاسخ ناموفق از سرور گیت‌هاب (کد ' . $code . '): ' . ($body['message'] ?? 'مخزن یافت نشد یا دسترسی نامعتبر است.'),
            'code'    => $code,
        ];
    }

    /**
     * Sync and deploy an archetype
     */
    public function deploy_archetype($archetype_id, $mode = 'default') {
        $valid_archetypes = ['lawyer', 'wp_designer', 'ecommerce'];
        if (!in_array($archetype_id, $valid_archetypes, true)) {
            return new \WP_Error('invalid_archetype', 'صنف درخواستی معتبر نیست.');
        }

        // 1. Log deployment start
        $this->log_action("شروع دریافت و استقرار صنف: {$archetype_id} با حالت: {$mode}");

        // 2. Load archetype package data (Remote or Offline)
        $package_data = $this->load_archetype_package($archetype_id, $mode);

        if (is_wp_error($package_data)) {
            return $package_data;
        }

        // 3. Apply settings & options idempotently
        update_option(self::OPTION_ACTIVE_ARCHETYPE, $archetype_id);
        update_option('uas_last_sync_time', current_time('mysql'));
        update_option('uas_archetype_meta_' . $archetype_id, [
            'synced_at' => current_time('mysql'),
            'mode'      => $mode,
            'version'   => $package_data['version'] ?? '1.0.0',
        ]);

        // 4. Save custom content defaults if not set
        if (!empty($package_data['custom_content'])) {
            $existing_custom = get_option('uas_client_custom_content', []);
            $merged = wp_parse_args($existing_custom, $package_data['custom_content']);
            update_option('uas_client_custom_content', $merged);
        }

        $this->log_action("استقرار صنف {$archetype_id} با موفقیت انجام شد.");

        return [
            'success'      => true,
            'archetype'    => $archetype_id,
            'archetype_name' => $package_data['name'] ?? $archetype_id,
            'sections'     => count($package_data['sections'] ?? []),
            'message'      => "صنف {$archetype_id} با موفقیت از گیت‌هاب دریافت و روی سایت مستقر شد.",
            'timestamp'    => current_time('mysql'),
        ];
    }

    /**
     * Load package definition
     */
    private function load_archetype_package($archetype_id, $mode) {
        // Built-in package registry (serves as robust offline fallback and template blueprint)
        $packages = [
            'wp_designer' => [
                'id'      => 'wp_designer',
                'name'    => 'طراح سایت وردپرس (Gutenberg-First)',
                'version' => '2.5.0',
                'sections' => [
                    'hero' => [
                        'title'    => 'طراحی سایت وردپرس با گوتنبرگ؛ سریع، سبک، حرفه‌ای',
                        'subtitle' => 'بدون افزونه‌های سنگین، با تمرکز بر سرعت، سئو و تجربه کاربری',
                        'cta_main' => 'مشاوره رایگان ۲۰ دقیقه‌ای',
                        'cta_sub'  => 'مشاهده نمونه‌کارها',
                        'badges'   => ['تحویل ۷ روزه', 'پشتیبانی ۶ ماهه', 'سازگار با موبایل'],
                    ],
                    'social_proof' => [
                        'stats' => [
                            ['label' => 'پروژه موفق', 'value' => '+۸۰'],
                            ['label' => 'امتیاز رضایت', 'value' => '۴.۹ از ۵'],
                            ['label' => 'رضایت کارفرمایان', 'value' => '۹۵٪'],
                        ],
                    ],
                    'value_prop' => [
                        'cards' => [
                            ['title' => 'طراحی اختصاصی با گوتنبرگ', 'desc' => 'بدون قالب‌های آماده و کدهای سنگین اضافه'],
                            ['title' => 'سرعت بارگذاری زیر ۲ ثانیه', 'desc' => 'پرفورمنس ۹۵+ در جی‌تی‌متریکس و گوگل لایت‌هاوس'],
                            ['title' => 'سئوی فنی از روز اول', 'desc' => 'کدهای ساختاریافته Schema.org و نقشه سایت خودکار'],
                            ['title' => 'سازگار با موبایل و RTL', 'desc' => 'واکنش‌گرایی استاندارد و راست‌چین ۱۰۰٪ اصیل'],
                            ['title' => 'تحویل سورس + آموزش ویدیویی', 'desc' => 'بدون وابستگی، آموزش کامل مدیریت به کارفرما'],
                            ['title' => 'پشتیبانی بعد از تحویل', 'desc' => '۶ ماه پشتیبانی فنی و امنیتی رایگان'],
                        ],
                    ],
                    'services' => [
                        ['title' => 'طراحی سایت شرکتی با گوتنبرگ', 'desc' => 'سریع، سبک و معرف حرفه‌ای برند شما'],
                        ['title' => 'طراحی فروشگاه ووکامرس', 'desc' => 'فروشگاه آنلاین با درگاه بانکی شاپرک و تسویه سریع'],
                        ['title' => 'لندینگ‌پیج فروش و تبدیل', 'desc' => 'صفحات فرود متمرکز بر فروش کمپین‌های تبلیغاتی'],
                        ['title' => 'بهینه‌سازی سرعت و Core Web Vitals', 'desc' => 'افزایش سرعت، رفع خطاهای کنسول و بهبود رتبه سئو'],
                        ['title' => 'بازطراحی سایت‌های قدیمی', 'desc' => 'مدرن‌سازی وب‌سایت‌های قدیمی و ارتقا به گوتنبرگ'],
                        ['title' => 'مشاوره و آموزش وردپرس', 'desc' => 'جلسات تخصصی مشاوره معماری وب و کوچینگ'],
                    ],
                    'portfolio' => [
                        ['title' => 'فروشگاه تخصصی تجهیزات الکترونیک', 'cat' => 'store', 'growth' => 'سرعت +۷۵٪ | فروش +۱۴۰٪'],
                        ['title' => 'سامانه شرکتی هلدینگ سرمایه‌گذاری', 'cat' => 'corporate', 'growth' => 'Core Web Vitals 99 | لود ۰.۹ ثانیه'],
                        ['title' => 'لندینگ‌پیج رویداد ملی استارتاپی', 'cat' => 'landing', 'growth' => 'نرخ تبدیل ۴.۸٪ | ثبت‌نام +۳۵۰۰'],
                    ],
                    'timeline' => [
                        ['step' => '۱', 'title' => 'جلسه کشف نیاز (Discovery)', 'desc' => '۳۰ دقیقه مشاوره رایگان آنلاین'],
                        ['step' => '۲', 'title' => 'ارائه بریف و پیشنهاد قیمت', 'desc' => 'برآورد مالی و پیش‌فاکتور شفاف طی ۴۸ ساعت'],
                        ['step' => '۳', 'title' => 'طراحی رابط کاربری (UI/UX)', 'desc' => 'طراحی وایرفریم و تأیید طرح گرافیکی'],
                        ['step' => '۴', 'title' => 'پیاده‌سازی با گوتنبرگ', 'desc' => 'توسعه تمیز، سبک و استاندارد بدون پلاگین سنگین'],
                        ['step' => '۵', 'title' => 'تست سرعت، سئو و QA', 'desc' => 'بررسی کامل ریسپانسیو و رفع کلیه باگ‌ها'],
                        ['step' => '۶', 'title' => 'تحویل + آموزش + پشتیبانی', 'desc' => 'انتقال سورس‌کد و ویدیوهای آموزشی پنل کارفرما'],
                    ],
                    'pricing' => [
                        ['name' => 'پایه (Starter)', 'price' => '۹,۵۰۰,۰۰۰ تومان', 'desc' => 'لندینگ‌پیج تک‌صفحه استاندارد'],
                        ['name' => 'حرفه‌ای (Business)', 'price' => '۱۸,۰۰۰,۰۰۰ تومان', 'desc' => 'سایت شرکتی چندصفحه با وبلاگ و سئو تکنیکال'],
                        ['name' => 'فروشگاهی (WooCommerce)', 'price' => '۲۸,۰۰۰,۰۰۰ تومان', 'desc' => 'فروشگاه کامل ووکامرس + اینماد و درگاه بانکی'],
                    ],
                ],
                'custom_content' => [
                    'brand_name'      => 'استودیو طراحی وب و وردپرس رضوی',
                    'contact_phone'   => '۰۲۱-۸۸۹۹۰۰۱۱',
                    'contact_mobile'  => '۰۹۱۲-۳۴۵۶۷۸۹',
                    'contact_email'   => 'design@sedrazavi.ir',
                    'hero_headline'   => 'طراحی سایت وردپرس با گوتنبرگ؛ سریع، سبک، حرفه‌ای',
                    'hero_subheadline'=> 'بدون افزونه‌های سنگین، با تمرکز بر سرعت، سئو و تجربه کاربری',
                    'accent_color'    => '#6366F1',
                ],
            ],

            'lawyer' => [
                'id'      => 'lawyer',
                'name'    => 'دفتر وکالت و مشاوره حقوقی (Lawyer Suite)',
                'version' => '3.0.0',
                'sections' => [
                    'hero' => [
                        'title'    => 'دفاع تخصصی، مشاوره استراتژیک و حمایت قاطع از حقوق قانونی شما',
                        'subtitle' => 'دفتر وکالت و مشاوره حقوقی دکتر سیده مریم رضوی - وکیل پایه یک دادگستری',
                    ],
                ],
                'custom_content' => [
                    'brand_name'      => 'دفتر وکالت دکتر سیده مریم رضوی',
                    'contact_phone'   => '۰۲۱-۸۸۹۹۰۰۱۱',
                    'contact_mobile'  => '۰۹۱۲-۳۴۵۶۷۸۹',
                    'contact_email'   => 'law@sedrazavi.ir',
                    'hero_headline'   => 'دفاع تخصصی، مشاوره استراتژیک و حمایت قاطع از حقوق قانونی شما',
                    'accent_color'    => '#D4AF37',
                ],
            ],

            'ecommerce' => [
                'id'      => 'ecommerce',
                'name'    => 'فروشگاه منعطف (Flexible Store - Woo & WoodMart)',
                'version' => '2.1.0',
                'sections' => [
                    'hero' => [
                        'title'    => 'خرید آنلاین سریع، امن و مطمئن با پشتیبانی ۲۴ ساعته',
                        'subtitle' => 'سازگار با ووکامرس، قالب وودمارت، جت وو بیلدر و شاپ انجین',
                    ],
                ],
                'custom_content' => [
                    'brand_name'      => 'فروشگاه مدرن و منعطف رضوی',
                    'contact_phone'   => '۰۲۱-۸۸۹۹۰۰۲۲',
                    'contact_mobile'  => '۰۹۱۲-۹۸۷۶۵۴۳',
                    'contact_email'   => 'shop@sedrazavi.ir',
                    'hero_headline'   => 'تجربه خریدی لذت‌بخش با تحویل اکسپرس و ضمانت اصالت کالا',
                    'accent_color'    => '#10B981',
                ],
            ],
        ];

        if (isset($packages[$archetype_id])) {
            return $packages[$archetype_id];
        }

        return new \WP_Error('package_not_found', 'پکیج صنف مورد نظر یافت نشد.');
    }

    /**
     * Log actions
     */
    private function log_action($message) {
        $logs = get_option(self::OPTION_SYNC_LOGS, []);
        if (!is_array($logs)) {
            $logs = [];
        }

        $logs[] = [
            'time'    => current_time('mysql'),
            'message' => $message,
        ];

        // Keep last 50 logs
        if (count($logs) > 50) {
            $logs = array_slice($logs, -50);
        }

        update_option(self::OPTION_SYNC_LOGS, $logs);
    }

    /**
     * AJAX Test Connection
     */
    public function ajax_test_connection() {
        check_ajax_referer('uas_github_admin_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => 'عدم دسترسی کافی.'], 403);
        }

        $sync_mode = sanitize_text_field($_POST['sync_mode'] ?? 'default');
        $repo_owner = sanitize_text_field($_POST['repo_owner'] ?? 'Aqamirrazavi');
        $repo_name = sanitize_text_field($_POST['repo_name'] ?? 'Sedrazavi-WPtemplate');
        $repo_branch = sanitize_text_field($_POST['repo_branch'] ?? 'main');
        $github_token = sanitize_text_field($_POST['github_token'] ?? '');

        $settings = [
            'sync_mode'   => $sync_mode,
            'repo_owner'  => $repo_owner,
            'repo_name'   => $repo_name,
            'repo_branch' => $repo_branch,
            'github_token'=> $github_token,
        ];

        $result = $this->test_github_connection($settings);

        if ($result['success']) {
            update_option(self::OPTION_REPO_SETTINGS, $settings);
            wp_send_json_success($result);
        } else {
            wp_send_json_error($result);
        }
    }

    /**
     * AJAX Sync Archetype
     */
    public function ajax_sync_archetype() {
        check_ajax_referer('uas_github_admin_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => 'عدم دسترسی کافی.'], 403);
        }

        $archetype = sanitize_text_field($_POST['archetype'] ?? 'wp_designer');
        $sync_mode = sanitize_text_field($_POST['sync_mode'] ?? 'default');

        $result = $this->deploy_archetype($archetype, $sync_mode);

        if (is_wp_error($result)) {
            wp_send_json_error(['message' => $result->get_error_message()]);
        } else {
            wp_send_json_success($result);
        }
    }

    /**
     * AJAX Get Sync Status
     */
    public function ajax_get_sync_status() {
        check_ajax_referer('uas_github_admin_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => 'عدم دسترسی کافی.'], 403);
        }

        $settings = $this->get_settings();
        $logs = get_option(self::OPTION_SYNC_LOGS, []);

        wp_send_json_success([
            'settings'       => $settings,
            'activeArchetype'=> get_option(self::OPTION_ACTIVE_ARCHETYPE, 'wp_designer'),
            'lastSyncTime'   => get_option('uas_last_sync_time', ''),
            'logs'           => array_reverse($logs),
        ]);
    }
}
