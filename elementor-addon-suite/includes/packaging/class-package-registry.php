<?php
namespace UniversalElementorSuite\Packaging;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Authoritative Portable Package & Widget Catalog Registry
 *
 * Centralizes portable package definitions and the 31+ widget asset dependency graph
 * aligned with \UniversalElementorSuite\Plugin::get_widgets_map().
 *
 * @package Universal_Elementor_Suite
 */
class Package_Registry {

    /**
     * Authoritative widget-to-asset dependency map covering all 31 native Elementor widgets.
     *
     * @return array
     */
    public function get_widget_catalog() {
        return [
            'banner_slider'     => ['slug' => 'uas_banner_slider',     'file' => 'class-widget-banner-slider.php',     'js' => 'banner-slider.js',     'css' => 'banner-slider.css'],
            'before_after'      => ['slug' => 'uas_before_after',      'file' => 'class-widget-before-after.php',      'js' => 'before-after.js',      'css' => 'before-after.css'],
            'bento_tabs'        => ['slug' => 'uas_bento_tabs',        'file' => 'class-widget-bento-tabs.php',        'js' => 'bento-tabs.js',        'css' => 'bento-tabs.css'],
            'case_timeline'     => ['slug' => 'uas_case_timeline',     'file' => 'class-widget-case-timeline.php',     'js' => 'case-timeline.js',     'css' => 'case-timeline.css'],
            'client_portal'     => ['slug' => 'uas_client_portal',     'file' => 'class-widget-client-portal.php',     'js' => 'client-portal.js',     'css' => 'client-portal.css'],
            'contact_booking'   => ['slug' => 'uas_contact_booking',   'file' => 'class-widget-contact-booking.php',   'js' => 'contact-booking.js',   'css' => 'contact-booking.css'],
            'cta'               => ['slug' => 'uas_cta',               'file' => 'class-widget-cta.php',               'js' => 'cta.js',               'css' => 'cta.css'],
            'download_box'      => ['slug' => 'uas_download_box',      'file' => 'class-widget-download-box.php',      'js' => 'download-box.js',      'css' => 'download-box.css'],
            'dynamic_grid'      => ['slug' => 'uas_dynamic_grid',      'file' => 'class-widget-dynamic-grid.php',      'js' => 'dynamic-grid.js',      'css' => 'dynamic-grid.css', 'needs_query' => true],
            'email_otp'         => ['slug' => 'uas_email_otp',         'file' => 'class-widget-email-otp.php',         'js' => 'email-otp.js',         'css' => 'email-otp.css'],
            'faq'               => ['slug' => 'uas_faq',               'file' => 'class-widget-faq.php',               'js' => 'faq.js',               'css' => 'faq.css'],
            'firm_milestones'   => ['slug' => 'uas_firm_milestones',   'file' => 'class-widget-firm-milestones.php',   'js' => 'firm-milestones.js',   'css' => 'firm-milestones.css'],
            'floating_cta'      => ['slug' => 'uas_floating_cta',      'file' => 'class-widget-floating-cta.php',      'js' => 'floating-cta.js',      'css' => 'floating-cta.css'],
            'floating_dock'     => ['slug' => 'uas_floating_dock',     'file' => 'class-widget-floating-dock.php',     'js' => 'floating-dock.js',     'css' => 'floating-dock.css'],
            'fomo_countdown'    => ['slug' => 'uas_fomo_countdown',    'file' => 'class-widget-fomo-countdown.php',    'js' => 'fomo-countdown.js',    'css' => 'fomo-countdown.css'],
            'hero'              => ['slug' => 'uas_hero',              'file' => 'class-widget-hero.php',              'js' => 'hero.js',              'css' => 'hero.css'],
            'hero_split'        => ['slug' => 'uas_hero_split',        'file' => 'class-widget-hero-split.php',        'js' => 'hero-split.js',        'css' => 'hero-split.css'],
            'news_ticker'       => ['slug' => 'uas_news_ticker',       'file' => 'class-widget-news-ticker.php',       'js' => 'news-ticker.js',       'css' => 'news-ticker.css'],
            'posts'             => ['slug' => 'uas_posts_grid',        'file' => 'class-widget-posts.php',             'js' => 'posts.js',             'css' => 'posts.css', 'needs_query' => true],
            'posts_grid'        => ['slug' => 'uas_posts_grid',        'file' => 'class-widget-posts.php',             'js' => 'posts.js',             'css' => 'posts.css', 'needs_query' => true],
            'pricing_matrix'    => ['slug' => 'uas_pricing_matrix',    'file' => 'class-widget-pricing-matrix.php',    'js' => 'pricing-matrix.js',    'css' => 'pricing-matrix.css'],
            'pricing_switcher'  => ['slug' => 'uas_pricing_switcher',  'file' => 'class-widget-pricing-switcher.php',  'js' => 'pricing-switcher.js',  'css' => 'pricing-switcher.css'],
            'radar_chart'       => ['slug' => 'uas_radar_chart',       'file' => 'class-widget-radar-chart.php',       'js' => 'radar-chart.js',       'css' => 'radar-chart.css'],
            'services_grid'     => ['slug' => 'uas_services_grid',     'file' => 'class-widget-services-grid.php',     'js' => 'services-grid.js',     'css' => 'services-grid.css', 'needs_query' => true],
            'spotplayer_course' => ['slug' => 'uas_spotplayer_course', 'file' => 'class-widget-spotplayer-course.php', 'js' => 'spotplayer-course.js', 'css' => 'spotplayer-course.css'],
            'stat_counter'      => ['slug' => 'uas_stat_counter',      'file' => 'class-widget-stat-counter.php',      'js' => 'stat-counter.js',      'css' => 'stat-counter.css'],
            'story_bar'         => ['slug' => 'uas_story_bar',         'file' => 'class-widget-story-bar.php',         'js' => 'story-bar.js',         'css' => 'story-bar.css'],
            'team'              => ['slug' => 'uas_team',              'file' => 'class-widget-team.php',              'js' => 'team.js',              'css' => 'team.css'],
            'testimonials'      => ['slug' => 'uas_testimonials',      'file' => 'class-widget-testimonials.php',      'js' => 'testimonials.js',      'css' => 'testimonials.css'],
            'theme_toggle'      => ['slug' => 'uas_theme_toggle',      'file' => 'class-widget-theme-toggle.php',      'js' => 'theme-toggle.js',      'css' => 'theme-toggle.css'],
            'video'             => ['slug' => 'uas_video',             'file' => 'class-widget-video.php',             'js' => 'video.js',             'css' => 'video.css'],
            'vip_pricing'       => ['slug' => 'uas_vip_pricing',       'file' => 'class-widget-vip-pricing.php',       'js' => 'vip-pricing.js',       'css' => 'vip-pricing.css'],
        ];
    }

    /**
     * Get all portable capability packages with verified asset counts.
     *
     * @return array
     */
    public function get_portable_packages() {
        return [
            [
                'id'           => 'package-pricing-switcher',
                'name'         => 'بسته مستقل جدول قیمت‌گذاری و پلن سوییچر',
                'package_type' => 'ui',
                'version'      => '6.0.0',
                'description'  => 'جدول نرخ‌گذاری مدرن با سوییچ ماهانه/سالانه قابل نصب بر روی هر سایت وردپرسی.',
                'components'   => [
                    'widget'     => 'uas_pricing_switcher',
                    'block'      => 'sedrazavi/pricing-switcher',
                    'javascript' => 'pricing-switcher.js',
                ],
                'requirements' => [
                    'php'       => '>=7.4',
                    'wordpress' => '>=6.0',
                    'elementor' => '>=3.10',
                ],
                'portable'     => true,
                'status'       => 'installed_active',
            ],
            [
                'id'           => 'package-fomo-countdown',
                'name'         => 'بسته مستقل شمارنده فوریت و نرخ تبدیل (FOMO)',
                'package_type' => 'ui',
                'version'      => '6.0.0',
                'description'  => 'شمارش معکوس تخفیف و پیشنهاد با ذخیره در localStorage کاربر.',
                'components'   => [
                    'widget'     => 'uas_fomo_countdown',
                    'block'      => 'sedrazavi/fomo-countdown',
                    'javascript' => 'fomo-countdown.js',
                ],
                'requirements' => [
                    'php'       => '>=7.4',
                    'wordpress' => '>=6.0',
                    'elementor' => '>=3.10',
                ],
                'portable'     => true,
                'status'       => 'installed_active',
            ],
            [
                'id'           => 'package-before-after',
                'name'         => 'بسته مستقل اسلایدر مقایسه‌ای قبل و بعد',
                'package_type' => 'ui',
                'version'      => '6.0.0',
                'description'  => 'اسلایدر لمسی دوطرفه تصاویر قبل و بعد با کدهای کامپکت بدون جی‌کوئری.',
                'components'   => [
                    'widget'     => 'uas_before_after',
                    'block'      => 'sedrazavi/before-after',
                    'javascript' => 'before-after.js',
                ],
                'requirements' => [
                    'php'       => '>=7.4',
                    'wordpress' => '>=6.0',
                    'elementor' => '>=3.10',
                ],
                'portable'     => true,
                'status'       => 'installed_active',
            ],
            [
                'id'           => 'package-stat-counter',
                'name'         => 'بسته مستقل پیشخوان آمار و ارقام انیمیشنی',
                'package_type' => 'ui',
                'version'      => '6.0.0',
                'description'  => 'شمارنده روان ارقام و دستاوردها بر پایه IntersectionObserver و استایل ۳ تبه.',
                'components'   => [
                    'widget'     => 'uas_stat_counter',
                    'block'      => 'sedrazavi/stat-counter',
                    'javascript' => 'stat-counter.js',
                ],
                'requirements' => [
                    'php'       => '>=7.4',
                    'wordpress' => '>=6.0',
                    'elementor' => '>=3.10',
                ],
                'portable'     => true,
                'status'       => 'installed_active',
            ],
            [
                'id'           => 'package-floating-cta',
                'name'         => 'بسته مستقل نوار شناور و استیکی تبدیل (Floating CTA)',
                'package_type' => 'ui',
                'version'      => '6.0.0',
                'description'  => 'داک چسبان بالای/پایین صفحه با کلید تماس، واتساپ و مشاوره با ترنسپرنسی شیشه‌ای.',
                'components'   => [
                    'widget'     => 'uas_floating_cta',
                    'block'      => 'sedrazavi/floating-cta',
                    'javascript' => 'floating-cta.js',
                ],
                'requirements' => [
                    'php'       => '>=7.4',
                    'wordpress' => '>=6.0',
                    'elementor' => '>=3.10',
                ],
                'portable'     => true,
                'status'       => 'installed_active',
            ],
            [
                'id'           => 'package-pricing-matrix',
                'name'         => 'بسته مستقل ماتریس مقایسه ویژگی‌ها و قیمت‌ها',
                'package_type' => 'ui',
                'version'      => '6.0.0',
                'description'  => 'جدول مقایسه جامع چندستونه با ردیف‌های سرفصل، علائم تیک و ضربدر، و پاپ‌آپ‌های توضیحی.',
                'components'   => [
                    'widget'     => 'uas_pricing_matrix',
                    'block'      => 'sedrazavi/pricing-matrix',
                    'javascript' => 'pricing-matrix.js',
                ],
                'requirements' => [
                    'php'       => '>=7.4',
                    'wordpress' => '>=6.0',
                    'elementor' => '>=3.10',
                ],
                'portable'     => true,
                'status'       => 'installed_active',
            ],
            [
                'id'           => 'package-hero-split',
                'name'         => 'بسته مستقل هیرو بنر اسپلیت و جذب لید',
                'package_type' => 'ui',
                'version'      => '6.0.0',
                'description'  => 'هیرو بنر دوطرفه با باکس دریافت شماره تماس، تیک‌های ارزش پیشنهادی و استایل شیشه‌ای.',
                'components'   => [
                    'widget'     => 'uas_hero_split',
                    'block'      => 'sedrazavi/hero-split',
                    'javascript' => 'hero-split.js',
                ],
                'requirements' => [
                    'php'       => '>=7.4',
                    'wordpress' => '>=6.0',
                    'elementor' => '>=3.10',
                ],
                'portable'     => true,
                'status'       => 'installed_active',
            ],
            [
                'id'           => 'package-bento-tabs',
                'name'         => 'بسته مستقل گرید بنتو با تب‌های دسته‌بندی',
                'package_type' => 'ui',
                'version'      => '6.0.0',
                'description'  => 'کارت‌های بنتو باکس مدرن با فیلتر آنی دسته‌بندی و انیمیشن انتقال آرام.',
                'components'   => [
                    'widget'     => 'uas_bento_tabs',
                    'block'      => 'sedrazavi/bento-tabs',
                    'javascript' => 'bento-tabs.js',
                ],
                'requirements' => [
                    'php'       => '>=7.4',
                    'wordpress' => '>=6.0',
                    'elementor' => '>=3.10',
                ],
                'portable'     => true,
                'status'       => 'installed_active',
            ],
            [
                'id'           => 'package-sovereign-assets',
                'name'         => 'بسته مستقل دارایی‌های ۶۶گانه طراحی و آیکون‌ها (Zero-CDN)',
                'package_type' => 'full_feature',
                'version'      => '6.0.0',
                'description'  => 'بانک دارایی‌های طراحی شامل ۶۶ وکتور بک‌گراند، ۶۶ دیوایدر، ۶۶ آیکون SVG، ۶۶ نشان اعتبار، ۶۶ موشن، ۷۲ شورت‌کد پریست و ۷ بلوک گوتنبرگ.',
                'components'   => [
                    'elementor_widgets'  => 31,
                    'gutenberg_blocks'   => 7,
                    'vector_backgrounds' => 66,
                    'shortcode_presets'  => 72,
                    'shape_dividers'     => 66,
                    'trust_badges'       => 66,
                    'motion_presets'     => 66,
                    'icons'              => 66,
                ],
                'requirements' => [
                    'php'       => '>=7.4',
                    'wordpress' => '>=6.0',
                ],
                'portable'     => true,
                'status'       => 'installed_active',
            ],
            [
                'id'           => 'package-dynamic-grid',
                'name'         => 'بسته مستقل گرید هوشمند کوئری داینامیک و کشینگ',
                'package_type' => 'ui',
                'version'      => '6.0.0',
                'description'  => 'گرید داینامیک پست‌ها و محتوا با سیستم کش ترنزینت قطعی، پشتیبانی ۳ تبه المنتور و Zero-Leakage.',
                'components'   => [
                    'widget'     => 'uas_dynamic_grid',
                    'block'      => 'sedrazavi/dynamic-grid',
                    'css'        => 'dynamic-grid.css',
                    'query_core' => 'Dynamic_Query_Engine',
                ],
                'requirements' => [
                    'php'       => '>=7.4',
                    'wordpress' => '>=6.0',
                    'elementor' => '>=3.10',
                ],
                'portable'     => true,
                'status'       => 'installed_active',
            ],
            [
                'id'           => 'package-template-vault',
                'name'         => 'بسته الگوهای کانتینری ۳۳گانه المنتور و تم‌بیلدر',
                'package_type' => 'service',
                'version'      => '6.0.0',
                'description'  => 'کتابخانه ۳۳ قالب واقعی JSON شامل ۳۰ قالب کانتینری/تم‌بیلدر و ۳ پاپ‌آپ با اسکن خودکار وابستگی ویجت‌ها.',
                'components'   => [
                    'templates_count' => 33,
                    'importer_engine' => 'Template_Importer',
                ],
                'requirements' => [
                    'php'       => '>=7.4',
                    'wordpress' => '>=6.0',
                    'elementor' => '>=3.10',
                ],
                'portable'     => true,
                'status'       => 'installed_active',
            ],
        ];
    }

    /**
     * Authoritative catalog of all 7 native Sovereign Gutenberg Blocks.
     *
     * @return array
     */
    public function get_gutenberg_blocks_catalog() {
        return [
            'sovereign-vector-bg' => [
                'slug'        => 'sovereign-vector-bg',
                'name'        => 'sedrazavi/sovereign-vector-bg',
                'title'       => 'بک‌گراند وکتور مستقل (۶۶ مدل ریاضی)',
                'description' => 'بک‌گراند وکتور متحرک و ثابت ریاضی با کنترل شفافیت، بلور و سرعت انیمیشن.',
                'category'    => 'بک‌گراند و جلوه‌ها',
                'badge'       => '66 SVG Vectors',
            ],
            'sovereign-widget' => [
                'slug'        => 'sovereign-widget',
                'name'        => 'sedrazavi/sovereign-widget',
                'title'       => 'ابزارک بومی مستقل (پریست‌های تخصصی)',
                'description' => 'درج المان‌های مستقل حقوقی، مهندسی، پزشکی، بازرگانی و امنیتی با رندر بومی.',
                'category'    => 'ابزارک‌های صنفی',
                'badge'       => 'Sovereign Widget',
            ],
            'sovereign-divider' => [
                'slug'        => 'sovereign-divider',
                'name'        => 'sedrazavi/sovereign-divider',
                'title'       => 'جداکننده سکشن وکتور (۶۶ مدل SVG)',
                'description' => 'جداکننده‌های گرافیکی مقعر، محدب، ارگانیک و هندسی بین سکشن‌ها.',
                'category'    => 'چیدمان و ساختار',
                'badge'       => '66 Dividers',
            ],
            'sovereign-badge' => [
                'slug'        => 'sovereign-badge',
                'name'        => 'sedrazavi/sovereign-badge',
                'title'       => 'نشان اعتبار و مهر امنیتی (۶۶ نشان)',
                'description' => 'نشان‌های اعتماد حقوقی، اصالت کد، SSL، گواهی داوری و استانداردهای وب.',
                'category'    => 'اعتماد و نشان‌ها',
                'badge'       => '66 Badges',
            ],
            'sovereign-section' => [
                'slug'        => 'sovereign-section',
                'name'        => 'sedrazavi/sovereign-section',
                'title'       => 'بلوک سکشن آماده (۶۶ سناریوی کامل)',
                'description' => 'سکشن‌های بهینه‌سازی‌شده برای هیرو، تعرفه‌ها، تیم، نظرات و فوتر.',
                'category'    => 'سکشن‌های آماده',
                'badge'       => '66 Sections',
            ],
            'sovereign-motion' => [
                'slug'        => 'sovereign-motion',
                'name'        => 'sedrazavi/sovereign-motion',
                'title'       => 'لفاف انیمیشن ۶۰ فریم (۶۶ الگوی حرکتی)',
                'description' => 'اعمال انیمیشن‌های سخت‌افزاری شناور، نبض نوری، چرخش هولوگرافیک و ماتریس.',
                'category'    => 'حرکت و موشن',
                'badge'       => '66 Motions',
            ],
            'sovereign-icon' => [
                'slug'        => 'sovereign-icon',
                'name'        => 'sedrazavi/sovereign-icon',
                'title'       => 'آیکون برداری بدون CDN (۶۶ آیکون)',
                'description' => 'آیکون‌های فوق‌سبک برداری بدون هیچ‌گونه بارگذاری فونت خارجی.',
                'category'    => 'آیکون وکتور',
                'badge'       => '66 Icons',
            ],
        ];
    }

    /**
     * Authoritative catalog of portable public Custom Post Type schemas bundleable in Site Kits.
     * Confidential internal CPTs (e.g. client legal case records) stay isolated with public=>false, show_in_rest=>false.
     *
     * @return array
     */
    public function get_cpt_schemas_catalog() {
        return [
            'portfolio' => [
                'slug'         => 'portfolio',
                'title'        => 'نمونه‌کارها و پروژه‌ها (Portfolio)',
                'description'  => 'پست‌تایپ عمومی نمونه‌کارها با دسته‌بندی portfolio_category و متاباکس کارفرما/نتایج.',
                'rewrite_slug' => 'portfolio',
                'taxonomy'     => 'portfolio_category',
                'tax_title'    => 'دسته‌بندی نمونه‌کارها',
                'menu_icon'    => 'dashicons-portfolio',
                'public'       => true,
                'show_in_rest' => true,
            ],
            'services' => [
                'slug'         => 'services',
                'title'        => 'خدمات و سرویس‌ها (Services)',
                'description'  => 'پست‌تایپ عمومی خدمات تخصصی با متاباکس تعرفه و زمان تحویل.',
                'rewrite_slug' => 'services',
                'taxonomy'     => 'service_category',
                'tax_title'    => 'دسته‌بندی خدمات',
                'menu_icon'    => 'dashicons-hammer',
                'public'       => true,
                'show_in_rest' => true,
            ],
            'case_study' => [
                'slug'         => 'case_study',
                'title'        => 'دعاوی موفق و مطالعات موردی (Case Studies)',
                'description'  => 'آرشیو عمومی پرونده‌های ناشناس‌شده جهت نمایش دستاوردها با تاکسونومی case_study_topic.',
                'rewrite_slug' => 'case-studies',
                'taxonomy'     => 'case_study_topic',
                'tax_title'    => 'حوزه‌های مطالعات موردی',
                'menu_icon'    => 'dashicons-awards',
                'public'       => true,
                'show_in_rest' => true,
            ],
        ];
    }

    /**
     * Find a portable package definition by ID.
     *
     * @param string $package_id
     * @return array|null
     */
    public function get_package($package_id) {
        foreach ($this->get_portable_packages() as $pkg) {
            if ($pkg['id'] === $package_id) {
                return $pkg;
            }
        }
        return null;
    }
}
