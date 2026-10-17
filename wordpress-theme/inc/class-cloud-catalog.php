<?php
/**
 * SedRazavi Cloud Preset Catalog & Child-Theme Factory
 *
 * Provides backend endpoints to fetch cloud presets, download bespoke child themes,
 * and activate industry configurations directly inside WordPress.
 *
 * @package SedRazavi
 * @version 3.2.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Cloud_Catalog {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('wp_ajax_sedrazavi_fetch_catalog', array($this, 'ajax_fetch_catalog'));
        add_action('wp_ajax_nopriv_sedrazavi_fetch_catalog', array($this, 'ajax_fetch_catalog'));
        add_action('wp_ajax_sedrazavi_generate_child_theme', array($this, 'ajax_generate_child_theme'));
    }

    public function get_catalog_items() {
        return array(
            'law-core' => array(
                'id'            => 'law-core',
                'title'         => __('دفتر وکالت و دعاوی حقوقی (SedRazavi Legal Core)', 'sedrazavi'),
                'category'      => 'legal',
                'categoryLabel' => __('حقوقی و وکالت', 'sedrazavi'),
                'description'   => __('تمپلیت‌های تخصصی دادگاه، محاسبه‌گر تمبر مالیاتی، رادار ریسک پرونده و پرونده الکترونیک موکلین.', 'sedrazavi'),
                'version'       => '3.4.0',
                'author'        => 'SedRazavi Group',
                'accentColor'   => '#D97706',
                'presetId'      => 'lawyer',
                'cptCount'      => 6,
                'shortcodes'    => 14,
            ),
            'ecommerce-shop' => array(
                'id'            => 'ecommerce-shop',
                'title'         => __('فروشگاه تخصصی و فایل‌های دیجیتال (SedRazavi Commerce)', 'sedrazavi'),
                'category'      => 'ecommerce',
                'categoryLabel' => __('فروشگاه و تجارت', 'sedrazavi'),
                'description'   => __('سبد خرید شناور ایجکس، درگاه بانکی شاپرک، فیلتر محصولات پیشرفته، صدور فاکتور و دانلود امن فایل‌ها.', 'sedrazavi'),
                'version'       => '2.8.2',
                'author'        => 'Commerce Team',
                'accentColor'   => '#10B981',
                'presetId'      => 'corporate',
                'cptCount'      => 4,
                'shortcodes'    => 11,
            ),
            'medical-health' => array(
                'id'            => 'medical-health',
                'title'         => __('کلینیک و سلامت هوشمند (SedRazavi Clinic & Med)', 'sedrazavi'),
                'category'      => 'medical',
                'categoryLabel' => __('پزشکی و سلامت', 'sedrazavi'),
                'description'   => __('سیستم پیشرفته نوبت‌دهی آنلاین، پرونده الکترونیک بیمار، تریاژ علائم بیماری و مشاوره تصویری پزشک.', 'sedrazavi'),
                'version'       => '1.9.0',
                'author'        => 'Health Network',
                'accentColor'   => '#06B6D4',
                'presetId'      => 'doctor',
                'cptCount'      => 5,
                'shortcodes'    => 9,
            ),
            'corporate-enterprise' => array(
                'id'            => 'corporate-enterprise',
                'title'         => __('شرکت مهندسی و بازرگانی بین‌الملل (SedRazavi Enterprise)', 'sedrazavi'),
                'category'      => 'corporate',
                'categoryLabel' => __('مهندسی و شرکتی', 'sedrazavi'),
                'description'   => __('شبیه‌ساز قراردادهای اینکوترمز، پورتال مناقصات و ضمانت‌نامه‌ها، نمودار ماتریس تحلیل ریسک و رزومه شرکتی.', 'sedrazavi'),
                'version'       => '2.3.1',
                'author'        => 'Enterprise Group',
                'accentColor'   => '#6366F1',
                'presetId'      => 'corporate',
                'cptCount'      => 7,
                'shortcodes'    => 12,
            ),
            'media-podcast-hub' => array(
                'id'            => 'media-podcast-hub',
                'title'         => __('استودیو چندرسانه‌ای، پادکست و ویدئو (SedRazavi Media)', 'sedrazavi'),
                'category'      => 'media',
                'categoryLabel' => __('رسانه و پادکست', 'sedrazavi'),
                'description'   => __('پخش‌کننده استریم صوتی پیشرفته، آرشیو ویدئوهای HD، فیلتر موضوعی و قابلیت دانلود در کیفیت‌های مختلف.', 'sedrazavi'),
                'version'       => '2.6.0',
                'author'        => 'Media Studio',
                'accentColor'   => '#EC4899',
                'presetId'      => 'video_media',
                'cptCount'      => 3,
                'shortcodes'    => 8,
            ),
            'creative-agency' => array(
                'id'            => 'creative-agency',
                'title'         => __('پورتفولیو و آژانس خلاق دیجیتال (SedRazavi Creative Studio)', 'sedrazavi'),
                'category'      => 'creative',
                'categoryLabel' => __('طراحی و دیزاین', 'sedrazavi'),
                'description'   => __('طراحی مینیمال و نئومورفیک، بنتوگرید نمونه‌کارها، شوکیس انیمیشن‌دار پروژه‌ها و پنل ثبت سفارش هوشمند.', 'sedrazavi'),
                'version'       => '1.8.5',
                'author'        => 'Design Studio',
                'accentColor'   => '#F59E0B',
                'presetId'      => 'web_agency',
                'cptCount'      => 4,
                'shortcodes'    => 10,
            ),
        );
    }

    public function ajax_fetch_catalog() {
        wp_send_json_success(array(
            'items' => $this->get_catalog_items(),
            'total' => count($this->get_catalog_items()),
        ));
    }

    /**
     * Create or download a ready-to-use child theme directory
     */
    public function ajax_generate_child_theme() {
        if (!current_user_can('install_themes')) {
            wp_send_json_error(array('message' => __('دسترسی نصب پوسته مورد نیاز است.', 'sedrazavi')));
        }

        $preset_key = isset($_POST['preset_key']) ? sanitize_key($_POST['preset_key']) : 'law-core';
        $catalog    = $this->get_catalog_items();

        if (!isset($catalog[$preset_key])) {
            wp_send_json_error(array('message' => __('صنف مورد نظر یافت نشد.', 'sedrazavi')));
        }

        $item      = $catalog[$preset_key];
        $slug      = 'sedrazavi-' . sanitize_title($item['id']) . '-child';
        $theme_dir = get_theme_root() . '/' . $slug;

        if (!file_exists($theme_dir)) {
            wp_mkdir_p($theme_dir);
        }

        // Generate style.css
        $style_content = "/*\n"
            . "Theme Name: " . esc_html($item['title']) . "\n"
            . "Theme URI: https://sedrazavi.ir\n"
            . "Description: " . esc_html($item['description']) . "\n"
            . "Author: " . esc_html($item['author']) . "\n"
            . "Template: sedrazavi-theme\n"
            . "Version: " . esc_html($item['version']) . "\n"
            . "Text Domain: " . esc_attr($slug) . "\n"
            . "*/\n\n"
            . "@import url(\"../sedrazavi-theme/style.css\");\n\n"
            . ":root {\n"
            . "  --primary-hue: " . esc_attr($item['accentColor']) . ";\n"
            . "}\n";

        file_put_contents($theme_dir . '/style.css', $style_content);

        // Generate functions.php
        $functions_content = "<?php\n"
            . "/**\n"
            . " * Child theme bootstrap for " . esc_html($item['title']) . "\n"
            . " */\n"
            . "add_action('wp_enqueue_scripts', function() {\n"
            . "    wp_enqueue_style('" . esc_attr($slug) . "-style', get_stylesheet_uri(), array('sedrazavi-theme-style'));\n"
            . "});\n\n"
            . "// Auto-configure active preset on theme activation\n"
            . "update_option('sedrazavi_site_preset', '" . esc_attr($item['presetId']) . "');\n";

        file_put_contents($theme_dir . '/functions.php', $functions_content);

        wp_send_json_success(array(
            'message'    => sprintf(__('چایلدتم «%s» با موفقیت در پوشه پوسته‌های وردپرس ایجاد شد.', 'sedrazavi'), $item['title']),
            'folder'     => $slug,
            'preset'     => $item['presetId'],
            'theme_path' => $theme_dir,
        ));
    }
}

function sedrazavi_cloud_catalog() {
    return SedRazavi_Cloud_Catalog::get_instance();
}

sedrazavi_cloud_catalog();
