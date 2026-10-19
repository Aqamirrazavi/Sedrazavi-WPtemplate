<?php
/**
 * SedRazavi 1-Click Multi-Niche Demo Importer Engine
 *
 * Imports complete starter site kits for 5 major industries with 1-click:
 * 1. Agency Designer (آژانسی، طراحان و توسعه‌دهندگان خلاق)
 * 2. Corporate Pro (شرکتی، هلدینگ و تجارت بین‌الملل)
 * 3. Store Modern (فروشگاه مدرن ووکامرس با سبد خرید شناور)
 * 4. Legal Firm (موسسه حقوقی، وکالت و داوری تخصصی)
 * 5. LMS & Software Portal (آموزش آنلاین با اسپات‌پلیر و باکس دانلود نرم‌افزار)
 *
 * @package SedRazavi_Companion
 * @version 5.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Demo_Importer {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_action('admin_menu', [$this, 'register_admin_menu']);
    }

    public function register_admin_menu() {
        add_submenu_page(
            'sedrazavi-companion',
            'درون‌ریز دموهای اصناف (1-Click Demo Importer)',
            'درون‌ریز دموها',
            'manage_options',
            'sedrazavi-demo-importer',
            [$this, 'render_admin_page']
        );
    }

    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/demo/list', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_demo_list'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1', '/demo/import', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_execute_import'],
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ]);

        register_rest_route('sedrazavi/v1', '/demo/reset', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_reset_demo_data'],
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ]);
    }

    public function get_available_demos() {
        return [
            'agency-designer' => [
                'id'          => 'agency-designer',
                'name'        => 'استودیو طراحی و آژانس دیجیتال (Agency Designer)',
                'niche'       => 'طراحان وب، فریلنسرها، آژانس‌های تبلیغاتی و نرم‌افزاری',
                'theme_slug'  => 'agency-designer',
                'badge'       => 'پیش‌فرض و فوق‌پرسرعت',
                'description' => 'قالب پورتفولیو مینیمال با هدر شیشه‌ای، بنتو گرید، محاسبه‌گر هوشمند قیمت پروژه و سرعت لود زیر ۵۰۰ میلی‌ثانیه.',
                'pages'       => ['صفحه اصلی استودیو', 'نمونه‌کارها و کیس‌استادی‌ها', 'محاسبه‌گر هزینه خدمات', 'تماس با ما'],
                'plugins'     => ['sedrazavi-companion'],
                'color'       => '#3b82f6',
            ],
            'corporate-pro' => [
                'id'          => 'corporate-pro',
                'name'        => 'هلدینگ و سازمان بین‌المللی (Corporate Pro)',
                'niche'       => 'شرکت‌های بازرگانی، صادرات، پتروشیمی، سرمایه‌گذاری و صنایع',
                'theme_slug'  => 'corporate-pro',
                'badge'       => 'چندزبانه و مگامنو',
                'description' => 'سایت شرکتی با هدر لوگو وسط و مگامنو چندستونه، اسلایدر پروژه‌ها، معرفی اعضای هیئت‌مدیره و استاندارد حاکمیتی ESG.',
                'pages'       => ['صفحه نخست شرکتی', 'درباره هلدینگ', 'خدمات و راهکارها', 'پورتال سهامداران', 'دفاتر بین‌الملل'],
                'plugins'     => ['sedrazavi-companion'],
                'color'       => '#0ea5e9',
            ],
            'store-modern' => [
                'id'          => 'store-modern',
                'name'        => 'فروشگاه مدرن آنلاین (Store Modern WooCommerce)',
                'niche'       => 'فروشگاه‌های اینترنتی مد، دیجیتال، لوازم جانبی و محصولات فیزیکی/دانلودی',
                'theme_slug'  => 'store-modern',
                'badge'       => 'سازگار کامل با ووکامرس',
                'description' => 'طراحی مدرن فروشگاهی با سبد خرید کشویی (Slideover Drawer)، تسویه‌حساب شتاب/استریپ یک‌مرحله‌ای و لیست علاقه‌مندی‌ها.',
                'pages'       => ['ویترین اصلی فروشگاه', 'فهرست محصولات', 'سبد خرید هوشمند', 'تسویه‌حساب شتاب', 'پیگیری سفارش پیامکی'],
                'plugins'     => ['sedrazavi-companion', 'woocommerce'],
                'color'       => '#10b981',
            ],
            'legal-firm' => [
                'id'          => 'legal-firm',
                'name'        => 'موسسه حقوقی و داوری تخصصی (Legal Firm Suite)',
                'niche'       => 'دفاتر وکالت، موسسات داوری تجاری، مشاوران دادگستری و اسناد رسمی',
                'theme_slug'  => 'legal-firm',
                'badge'       => 'موتور داوری و پیگیری پرونده',
                'description' => 'سیستم اتوماسیون حقوقی با پیگیری پرونده و اوراق قضایی، محاسبه‌گر تمبر مالیاتی و حق‌الوکاله، و رزرو نوبت مشاوره آنلاین.',
                'pages'       => ['صفحه نخست موسسه حقوقی', 'محاسبه‌گر حق‌الوکاله و تمبر', 'پیگیری آنلاین پرونده', 'آرای داوری حقوقی', 'رزرو نوبت'],
                'plugins'     => ['sedrazavi-companion'],
                'color'       => '#d97706',
            ],
            'lms-soft98' => [
                'id'          => 'lms-soft98',
                'name'        => 'آکادمی آموزش و مخزن نرم‌افزار (LMS & Software Soft98)',
                'niche'       => 'مدرسان، آکادمی‌های دیجیتال، وب‌سایت‌های اشتراک ویژه VIP و دانلود نرم‌افزار',
                'theme_slug'  => 'agency-designer',
                'badge'       => 'اسپات‌پلیر + جعبه دانلود Soft98',
                'description' => 'پکیج کامل آموزش آنلاین ضدسرقت با اسپات‌پلیر و واتر‌مارک متحرک شماره تماس، باکس دانلود چندسروره با رمز، و پلن‌های VIP.',
                'pages'       => ['صفحه لندینگ آکادمی', 'کلاس آنلاین و پلیر دوره', 'آرشیو نرم‌افزار و باکس دانلود', 'پلن‌های عضویت ویژه VIP'],
                'plugins'     => ['sedrazavi-companion'],
                'color'       => '#8b5cf6',
            ],
        ];
    }

    public function rest_get_demo_list() {
        return rest_ensure_response([
            'success' => true,
            'demos'   => array_values($this->get_available_demos()),
            'active_archetype' => get_option('sedrazavi_active_archetype', 'agency-designer'),
        ]);
    }

    public function rest_execute_import($request) {
        $params = $request->get_json_params();
        $demo_id = isset($params['demoId']) ? sanitize_text_field($params['demoId']) : '';
        $demos = $this->get_available_demos();

        if (!isset($demos[$demo_id])) {
            return new WP_Error('invalid_demo', 'دموی انتخاب‌شده نامعتبر است.', ['status' => 400]);
        }

        $demo = $demos[$demo_id];

        // 1. Switch Theme Archetype
        update_option('sedrazavi_active_archetype', $demo_id);

        // 2. Adjust Header/Footer defaults for niche
        switch ($demo_id) {
            case 'corporate-pro':
                update_option('sedrazavi_header_style', 'centered-logo');
                update_option('sedrazavi_footer_style', 'directory-newsletter');
                break;
            case 'store-modern':
                update_option('sedrazavi_header_style', 'mega-menu');
                update_option('sedrazavi_footer_style', 'modern-cards');
                break;
            case 'legal-firm':
                update_option('sedrazavi_header_style', 'frosted-glass');
                update_option('sedrazavi_footer_style', 'directory-newsletter');
                break;
            case 'lms-soft98':
                update_option('sedrazavi_header_style', 'frosted-glass');
                update_option('sedrazavi_footer_style', 'modern-cards');
                break;
            case 'agency-designer':
            default:
                update_option('sedrazavi_header_style', 'minimal-landing');
                update_option('sedrazavi_footer_style', 'minimal-single');
                break;
        }

        // 3. Create Sample Starter Pages if not existing
        $imported_pages = [];
        foreach ($demo['pages'] as $page_title) {
            $existing_page = get_page_by_title($page_title);
            if (!$existing_page) {
                $page_content = "<!-- SedRazavi OS Starter Layout: {$demo['name']} -->\n";
                $page_content .= "[react_component name=\"multi-niche-showcase\"]\n";
                
                $page_id = wp_insert_post([
                    'post_title'   => $page_title,
                    'post_content' => $page_content,
                    'post_status'  => 'publish',
                    'post_type'    => 'page',
                ]);
                $imported_pages[] = ['id' => $page_id, 'title' => $page_title];
            } else {
                $imported_pages[] = ['id' => $existing_page->ID, 'title' => $page_title];
            }
        }

        // Set Front Page
        if (!empty($imported_pages[0]['id'])) {
            update_option('show_on_front', 'page');
            update_option('page_on_front', $imported_pages[0]['id']);
        }

        return rest_ensure_response([
            'success'     => true,
            'message'     => "دموی {$demo['name']} با موفقیت درون‌ریزی و پیکربندی گردید.",
            'demoId'      => $demo_id,
            'pagesCount'  => count($imported_pages),
            'homePageUrl' => home_url('/'),
        ]);
    }

    public function rest_reset_demo_data() {
        update_option('sedrazavi_active_archetype', 'agency-designer');
        update_option('sedrazavi_header_style', 'minimal-landing');
        update_option('sedrazavi_footer_style', 'minimal-single');

        return rest_ensure_response([
            'success' => true,
            'message' => 'پیکربندی با موفقیت به حالت استودیو طراحی مینیمال بازگردانی شد.',
        ]);
    }

    public function render_admin_page() {
        ?>
        <div class="wrap" dir="rtl">
            <h1 style="display: flex; align-items: center; gap: 10px;">
                <span class="dashicons dashicons-download" style="font-size: 32px; width: 32px; height: 32px; color: #2563eb;"></span>
                سامانه نصب و درون‌ریزی دموهای اصناف (SedRazavi 1-Click Demo Importer)
            </h1>
            <p style="color: #64748b; font-size: 14px;">با یک کلیک، سایت آماده برای حوزه کاری و صنف مدنظر خود را فعال کنید بدون اینکه فایل‌ها و تنظیمات قبلی پاک شوند.</p>

            <div id="sedrazavi-demo-importer-root" style="margin-top: 24px;">
                <!-- Fallback PHP UI if React is not loaded in WP Admin -->
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
                    <?php foreach ($this->get_available_demos() as $demo): ?>
                        <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <span style="display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: bold; background: <?php echo esc_attr($demo['color']); ?>20; color: <?php echo esc_attr($demo['color']); ?>;">
                                    <?php echo esc_html($demo['badge']); ?>
                                </span>
                                <h3 style="margin: 12px 0 6px; font-size: 16px;"><?php echo esc_html($demo['name']); ?></h3>
                                <p style="color: #64748b; font-size: 13px; margin: 0 0 12px;"><?php echo esc_html($demo['description']); ?></p>
                                <div style="font-size: 12px; color: #475569; margin-bottom: 16px;">
                                    <strong>صفحات نمونه:</strong> <?php echo esc_html(implode('، ', $demo['pages'])); ?>
                                </div>
                            </div>
                            <button type="button" class="button button-primary button-large" onclick="alert('نصب خودکار دموی <?php echo esc_js($demo['name']); ?> از پنل فرانت یا REST API فعال است.')" style="background: <?php echo esc_attr($demo['color']); ?>; border-color: <?php echo esc_attr($demo['color']); ?>; width: 100%; text-align: center;">
                                درون‌ریزی دموی این صنف ←
                            </button>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <?php
    }
}
