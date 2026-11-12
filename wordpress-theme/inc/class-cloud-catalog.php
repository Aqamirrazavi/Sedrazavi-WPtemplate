<?php
/**
 * SedRazavi Cloud Preset Catalog & Autonomous Theme Factory
 *
 * Provides backend endpoints to fetch cloud presets, generate standalone vertical themes,
 * and activate industry configurations directly inside WordPress.
 *
 * @package SedRazavi
 * @version 6.0.0
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
        add_action('wp_ajax_sedrazavi_generate_standalone_theme', array($this, 'ajax_generate_standalone_theme'));
        add_action('wp_ajax_sedrazavi_generate_child_theme', array($this, 'ajax_generate_standalone_theme'));
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
     * Create a 100% standalone theme directory (zero parent Template dependency)
     */
    public function ajax_generate_standalone_theme() {
        check_ajax_referer('sedrazavi_security_nonce', 'nonce');

        if (!current_user_can('install_themes')) {
            wp_send_json_error(array('message' => __('دسترسی نصب پوسته مورد نیاز است.', 'sedrazavi')), 403);
        }

        $preset_key = isset($_POST['preset_key']) ? sanitize_key($_POST['preset_key']) : 'law-core';
        $catalog    = $this->get_catalog_items();

        if (!isset($catalog[$preset_key])) {
            wp_send_json_error(array('message' => __('صنف مورد نظر یافت نشد.', 'sedrazavi')), 404);
        }

        $item      = $catalog[$preset_key];
        $slug      = 'sedrazavi-' . sanitize_title($item['id']) . '-theme';
        $theme_dir = get_theme_root() . '/' . $slug;

        if (!file_exists($theme_dir)) {
            wp_mkdir_p($theme_dir);
        }

        // Generate standalone style.css (NO Template: declaration)
        $style_content = "/*\n"
            . "Theme Name: " . esc_html($item['title']) . " (Standalone)\n"
            . "Theme URI: https://sedrazavi.ir\n"
            . "Description: " . esc_html($item['description']) . "\n"
            . "Author: " . esc_html($item['author']) . "\n"
            . "Version: " . esc_html($item['version']) . "\n"
            . "Text Domain: " . esc_attr($slug) . "\n"
            . "*/\n\n"
            . ":root {\n"
            . "  --primary-hue: " . esc_attr($item['accentColor']) . ";\n"
            . "}\n"
            . "body { margin: 0; font-family: 'Vazirmatn', system-ui, sans-serif; background: #0B132B; color: #F8FAFC; }\n";

        file_put_contents($theme_dir . '/style.css', $style_content);

        // Generate standalone header.php, footer.php, index.php
        $header_php = "<!DOCTYPE html>\n<html <?php language_attributes(); ?> dir=\"<?php echo is_rtl() ? 'rtl' : 'ltr'; ?>\">\n<head>\n<meta charset=\"<?php bloginfo('charset'); ?>\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<?php wp_head(); ?>\n</head>\n<body <?php body_class('sr-standalone-theme'); ?>>\n<?php wp_body_open(); ?>\n";
        $footer_php = "<?php wp_footer(); ?>\n</body>\n</html>\n";
        $index_php  = "<?php get_header(); ?>\n<main id=\"primary\" class=\"site-main\">\n<?php if (have_posts()) : while (have_posts()) : the_post(); the_content(); endwhile; endif; ?>\n</main>\n<?php get_footer(); ?>\n";

        file_put_contents($theme_dir . '/header.php', $header_php);
        file_put_contents($theme_dir . '/footer.php', $footer_php);
        file_put_contents($theme_dir . '/index.php', $index_php);

        // Generate standalone functions.php
        $functions_content = "<?php\n"
            . "/**\n"
            . " * Autonomous standalone theme bootstrap for " . esc_html($item['title']) . "\n"
            . " */\n"
            . "if (!defined('ABSPATH')) { exit; }\n\n"
            . "add_action('after_setup_theme', function() {\n"
            . "    add_theme_support('title-tag');\n"
            . "    add_theme_support('post-thumbnails');\n"
            . "    add_theme_support('html5', array('search-form', 'comment-form', 'gallery', 'caption', 'style', 'script'));\n"
            . "});\n\n"
            . "add_action('wp_enqueue_scripts', function() {\n"
            . "    wp_enqueue_style('" . esc_attr($slug) . "-style', get_stylesheet_uri(), array(), '" . esc_attr($item['version']) . "');\n"
            . "});\n\n"
            . "add_action('after_switch_theme', function() {\n"
            . "    update_option('sedrazavi_site_preset', '" . esc_attr($item['presetId']) . "');\n"
            . "});\n";

        file_put_contents($theme_dir . '/functions.php', $functions_content);

        wp_send_json_success(array(
            'message'    => sprintf(__('پوسته مستقل «%s» با موفقیت در پوشه پوسته‌های وردپرس ایجاد شد.', 'sedrazavi'), $item['title']),
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
