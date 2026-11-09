<?php
/**
 * Front-End Font Studio & Dynamic Font Uploader (Addenda 20.0, 26.0 & 27.0)
 *
 * Provides front-end font switching and custom WOFF2 font uploading directly
 * from the Designer Cockpit without visiting /wp-admin/.
 *
 * @package SedRazavi_Designer_Theme
 * @version 2.0.0
 */

namespace SedRazaviDesigner;

if (!defined('ABSPATH')) {
    exit;
}

class Font_Studio {
    private static $instance = null;

    public static function instance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        add_action('wp_head', [$this, 'inject_active_font_css'], 5);
        add_action('wp_ajax_sr_update_active_font', [$this, 'ajax_update_active_font']);
        add_action('wp_ajax_sr_upload_custom_font', [$this, 'ajax_upload_custom_font']);
    }

    /**
     * Get registered font families
     */
    public static function get_available_fonts() {
        return [
            'vazirmatn' => [
                'name_fa'     => 'وزیرمتن (Vazirmatn) - آزاد و پیش‌فرض سیستم',
                'font_family' => "'Vazirmatn', -apple-system, sans-serif",
                'is_local'    => true,
            ],
            'dana' => [
                'name_fa'     => 'دانا (Dana) - مدرن ژورنالیستی',
                'font_family' => "'Dana', 'Vazirmatn', -apple-system, sans-serif",
                'is_local'    => false,
            ],
            'yekan-bakh' => [
                'name_fa'     => 'یکان‌بخ (Yekan Bakh) - سبک زومیت و پرچمدار',
                'font_family' => "'Yekan Bakh', 'Vazirmatn', -apple-system, sans-serif",
                'is_local'    => false,
            ],
            'iran-yekan' => [
                'name_fa'     => 'ایران‌یکان (IRANYekanX) - استاندارد پلتفرم‌ها',
                'font_family' => "'IRANYekanX', 'Vazirmatn', -apple-system, sans-serif",
                'is_local'    => false,
            ],
            'custom' => [
                'name_fa'     => 'فونت سفارشی آپلودشده در پورتال',
                'font_family' => "'SedRazaviCustomFont', 'Vazirmatn', -apple-system, sans-serif",
                'is_local'    => false,
            ],
        ];
    }

    /**
     * Get currently active font key
     */
    public static function get_active_font_key() {
        return get_option('sedrazavi_active_font', 'vazirmatn');
    }

    /**
     * Inject active font CSS into <head>
     */
    public function inject_active_font_css() {
        $active_key = self::get_active_font_key();
        $fonts = self::get_available_fonts();
        $font_family = isset($fonts[$active_key]) ? $fonts[$active_key]['font_family'] : $fonts['vazirmatn']['font_family'];

        $custom_font_url = get_option('sedrazavi_custom_font_url', '');
        ?>
        <style id="sr-active-font-styles">
            <?php if ('custom' === $active_key && !empty($custom_font_url)) : ?>
            @font-face {
                font-family: 'SedRazaviCustomFont';
                src: url('<?php echo esc_url($custom_font_url); ?>') format('woff2');
                font-weight: 400 900;
                font-style: normal;
                font-display: swap;
            }
            <?php endif; ?>

            :root {
                --sr-font-body: <?php echo $font_family; ?>;
                --sr-font-heading: <?php echo $font_family; ?>;
            }

            body, button, input, select, textarea, .elementor-widget {
                font-family: var(--sr-font-body);
            }

            h1, h2, h3, h4, h5, h6, .sr-heading {
                font-family: var(--sr-font-heading);
            }
        </style>
        <?php
    }

    /**
     * AJAX handler to switch font
     */
    public function ajax_update_active_font() {
        check_ajax_referer('sr_font_studio_nonce', 'security');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => 'شما دسترسی مدیریت ندارید.']);
        }

        $font_key = isset($_POST['font_key']) ? sanitize_text_field($_POST['font_key']) : 'vazirmatn';
        $fonts = self::get_available_fonts();

        if (!isset($fonts[$font_key])) {
            wp_send_json_error(['message' => 'فونت نامعتبر است.']);
        }

        update_option('sedrazavi_active_font', $font_key);
        wp_send_json_success(['message' => 'فونت با موفقیت تنظیم شد.', 'font_key' => $font_key]);
    }

    /**
     * AJAX handler to upload custom WOFF2 font file
     */
    public function ajax_upload_custom_font() {
        check_ajax_referer('sr_font_studio_nonce', 'security');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => 'دسترسی غیرمجاز.']);
        }

        if (empty($_FILES['font_file'])) {
            wp_send_json_error(['message' => 'فایلی انتخاب نشده است.']);
        }

        $file = $_FILES['font_file'];
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

        if (!in_array($ext, ['woff2', 'woff', 'ttf'], true)) {
            wp_send_json_error(['message' => 'تنها فایل‌های فونت WOFF2, WOFF و TTF مجاز هستند.']);
        }

        require_once ABSPATH . 'wp-admin/includes/file.php';
        $upload_overrides = ['test_form' => false, 'mimes' => [
            'woff2' => 'font/woff2',
            'woff'  => 'font/woff',
            'ttf'   => 'font/ttf',
        ]];

        $movefile = wp_handle_upload($file, $upload_overrides);

        if ($movefile && !isset($movefile['error'])) {
            update_option('sedrazavi_custom_font_url', $movefile['url']);
            update_option('sedrazavi_active_font', 'custom');
            wp_send_json_success([
                'message'  => 'فونت اختصاصی با موفقیت بارگذاری و فعال گردید.',
                'font_url' => $movefile['url'],
            ]);
        } else {
            wp_send_json_error(['message' => $movefile['error'] ?: 'خطا در بارگذاری فایل.']);
        }
    }
}

Font_Studio::instance();
