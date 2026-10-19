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
 * @version 6.0.0
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
            'sedrazavi-companion-hub',
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
                'description' => 'ویترین ووکامرس مدرن با سبد خرید دراور اسلایدری بدون رفرش، درگاه مستقیم شتاب و بومی‌سازی ۳۱ استان ایران.',
                'pages'       => ['ویترین اصلی فروشگاه', 'سبد خرید هوشمند', 'تسویه حساب فوری', 'پیگیری سفارش'],
                'plugins'     => ['sedrazavi-companion', 'woocommerce'],
                'color'       => '#10b981',
            ],
            'legal-firm' => [
                'id'          => 'legal-firm',
                'name'        => 'دفتر وکالت و داوری حقوقی (Legal Firm Pro)',
                'niche'       => 'وکلا، مشاوران حقوقی، دفاتر اسناد رسمی و مراجع داوری تجاری',
                'theme_slug'  => 'legal-firm',
                'badge'       => 'سامانه پرونده و داوری',
                'description' => 'سیستم جامع وکالت با استعلام برخط وضعیت پرونده با کدملی، محاسبه‌گر هزینه دادرسی و دیه، و تالار داوری بین‌المللی.',
                'pages'       => ['سامانه دفتر وکالت', 'استعلام پرونده موکلین', 'محاسبه‌گر هزینه دادرسی', 'رزرو آنلاین نوبت مشاوره'],
                'plugins'     => ['sedrazavi-companion'],
                'color'       => '#f59e0b',
            ],
            'lms-soft98' => [
                'id'          => 'lms-soft98',
                'name'        => 'آکادمی دوره آنلاین و مرکز دانلود (LMS & Software)',
                'niche'       => 'مدرسان، فروشندگان دوره‌های ویدیویی، سایت‌های دانلود نرم‌افزار و مجلات فناوری',
                'theme_slug'  => 'agency-designer',
                'badge'       => 'اسپات‌پلیر + جعبه دانلود Soft98',
                'description' => 'پخش‌کننده دوره‌های دارای واترمارک ضد ضبط، لایسنسینگ خودکار اسپات‌پلیر، جعبه دانلود چندسروره و اشتراک VIP منقضی‌شونده.',
                'pages'       => ['صفحه آکادمی و دوره‌ها', 'پلیر تحت وب لایسنس‌دار', 'جعبه‌های دانلود نرم‌افزار', 'پلن‌های عضویت ویژه VIP'],
                'plugins'     => ['sedrazavi-companion'],
                'color'       => '#8b5cf6',
            ],
        ];
    }

    public function rest_get_demo_list() {
        return rest_ensure_response([
            'success' => true,
            'demos'   => array_values($this->get_available_demos()),
            'current' => get_option('sedrazavi_active_archetype', 'agency-designer'),
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

        // 4. Setup Primary Navigation Menu if needed
        $menu_name = 'منوی اصلی - ' . $demo['name'];
        $menu_exists = wp_get_nav_menu_object($menu_name);
        if (!$menu_exists) {
            $menu_id = wp_create_nav_menu($menu_name);
            if (!is_wp_error($menu_id)) {
                // Add home page link
                wp_update_nav_menu_item($menu_id, 0, [
                    'menu-item-title'   => 'صفحه اصلی',
                    'menu-item-url'     => home_url('/'),
                    'menu-item-status'  => 'publish',
                ]);
                // Add sample pages to menu
                foreach ($imported_pages as $p) {
                    wp_update_nav_menu_item($menu_id, 0, [
                        'menu-item-title'     => $p['title'],
                        'menu-item-object'    => 'page',
                        'menu-item-object-id' => $p['id'],
                        'menu-item-type'      => 'post_type',
                        'menu-item-status'    => 'publish',
                    ]);
                }
                // Assign to primary location
                $locations = get_theme_mod('nav_menu_locations');
                if (!is_array($locations)) {
                    $locations = [];
                }
                $locations['primary'] = $menu_id;
                set_theme_mod('nav_menu_locations', $locations);
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
        $nonce = wp_create_nonce('wp_rest');
        $current_archetype = get_option('sedrazavi_active_archetype', 'agency-designer');
        ?>
        <div class="wrap" dir="rtl" style="font-family: inherit; max-width: 1200px;">
            <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #fff; padding: 24px; border-radius: 16px; margin-bottom: 24px; border: 1px solid #334155;">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
                    <div>
                        <div style="display: inline-block; padding: 4px 10px; background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); border-radius: 20px; font-size: 11px; font-weight: bold; color: #60a5fa; margin-bottom: 8px;">
                            🚀 موتور درون‌ریزی ۱-کلیک اصناف (SedRazavi OS v6.0)
                        </div>
                        <h1 style="color: #fff; margin: 0 0 8px; font-size: 24px;">سامانه نصب و درون‌ریزی دموهای آماده</h1>
                        <p style="color: #94a3b8; font-size: 13px; margin: 0;">با ۱ کلیک دموی صنف دلخواه خود را فعال کنید. صفحات نمونه، ساختار منو، ویجت‌ها و تنظیمات اختصاصی خودکار پیکربندی می‌شوند.</p>
                    </div>
                    <div style="text-align: left;">
                        <span style="font-size: 12px; color: #94a3b8;">صنف فعال فعلی:</span>
                        <div style="font-size: 14px; font-weight: bold; color: #38bdf8; margin-top: 4px;">
                            <?php echo esc_html($current_archetype); ?>
                        </div>
                    </div>
                </div>

                <!-- وضعیت زنده درون‌ریزی -->
                <div id="sr-import-status-box" style="display: none; margin-top: 20px; padding: 16px; background: rgba(15,23,42,0.8); border: 1px solid #3b82f6; border-radius: 12px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span class="spinner is-active" style="float: none; margin: 0;"></span>
                        <span id="sr-import-status-msg" style="font-size: 13px; font-weight: bold; color: #60a5fa;">در حال ایجاد صفحات، تنظیم هدر و فوتر و پیکربندی صنف...</span>
                    </div>
                    <div style="width: 100%; background: #334155; height: 6px; border-radius: 3px; margin-top: 10px; overflow: hidden;">
                        <div id="sr-import-progress-bar" style="width: 35%; background: #3b82f6; height: 100%; transition: width 0.4s ease;"></div>
                    </div>
                </div>

                <!-- پیام موفقیت -->
                <div id="sr-import-success-box" style="display: none; margin-top: 20px; padding: 16px; background: rgba(16,185,129,0.15); border: 1px solid #10b981; border-radius: 12px; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 10px; color: #10b981; font-weight: bold; font-size: 13px;">
                        <span>✅</span>
                        <span id="sr-import-success-text">دمو با موفقیت درون‌ریزی شد!</span>
                    </div>
                    <a href="<?php echo esc_url(home_url('/')); ?>" target="_blank" style="padding: 6px 16px; background: #10b981; color: #fff; text-decoration: none; border-radius: 8px; font-size: 12px; font-weight: bold;">
                        مشاهده سایت ←
                    </a>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
                <?php foreach ($this->get_available_demos() as $demo): 
                    $is_active = ($current_archetype === $demo['id']);
                ?>
                    <div style="background: #fff; border: 1px solid <?php echo $is_active ? esc_attr($demo['color']) : '#e2e8f0'; ?>; border-radius: 16px; padding: 22px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between; position: relative;">
                        <?php if ($is_active): ?>
                        <div style="position: absolute; top: 12px; left: 12px; padding: 2px 8px; background: <?php echo esc_attr($demo['color']); ?>; color: #fff; border-radius: 6px; font-size: 10px; font-weight: bold;">
                            فعال در سایت
                        </div>
                        <?php endif; ?>

                        <div>
                            <span style="display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: bold; background: <?php echo esc_attr($demo['color']); ?>20; color: <?php echo esc_attr($demo['color']); ?>;">
                                <?php echo esc_html($demo['badge']); ?>
                            </span>
                            <h3 style="margin: 14px 0 6px; font-size: 16px; color: #0f172a; font-weight: 800;"><?php echo esc_html($demo['name']); ?></h3>
                            <p style="color: #64748b; font-size: 12.5px; line-height: 1.6; margin: 0 0 14px;"><?php echo esc_html($demo['description']); ?></p>
                            
                            <div style="background: #f8fafc; padding: 12px; border-radius: 10px; border: 1px solid #f1f5f9; font-size: 12px; color: #475569; margin-bottom: 16px;">
                                <strong style="color: #0f172a;">صفحات استارتر:</strong><br/>
                                <span style="color: #64748b;"><?php echo esc_html(implode(' • ', $demo['pages'])); ?></span>
                            </div>
                        </div>

                        <div>
                            <button type="button" 
                                class="button button-large sr-import-btn" 
                                data-demo-id="<?php echo esc_attr($demo['id']); ?>"
                                data-demo-name="<?php echo esc_attr($demo['name']); ?>"
                                style="background: <?php echo esc_attr($demo['color']); ?>; border-color: <?php echo esc_attr($demo['color']); ?>; color: #fff; width: 100%; text-align: center; border-radius: 10px; height: 42px; font-weight: bold; cursor: pointer; transition: all 0.2s ease;">
                                درون‌ریزی دموی <?php echo esc_html($demo['name']); ?> ←
                            </button>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <script>
        document.addEventListener('DOMContentLoaded', function() {
            var restNonce = '<?php echo esc_js($nonce); ?>';
            var importEndpoint = '<?php echo esc_url_raw(rest_url('sedrazavi/v1/demo/import')); ?>';
            var statusBox = document.getElementById('sr-import-status-box');
            var statusMsg = document.getElementById('sr-import-status-msg');
            var progressBar = document.getElementById('sr-import-progress-bar');
            var successBox = document.getElementById('sr-import-success-box');
            var successText = document.getElementById('sr-import-success-text');

            var buttons = document.querySelectorAll('.sr-import-btn');
            buttons.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var demoId = this.getAttribute('data-demo-id');
                    var demoName = this.getAttribute('data-demo-name');

                    if (!confirm('آیا از درون‌ریزی دموی «' + demoName + '» اطمینان دارید؟')) {
                        return;
                    }

                    // Disable buttons and show status
                    buttons.forEach(function(b) { b.disabled = true; b.style.opacity = '0.6'; });
                    successBox.style.display = 'none';
                    statusBox.style.display = 'block';
                    statusMsg.innerText = 'در حال ایجاد صفحات، تنظیم هدر و فوتر و پیکربندی صنف...';
                    progressBar.style.width = '30%';

                    setTimeout(function() {
                        progressBar.style.width = '65%';
                    }, 500);

                    fetch(importEndpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-WP-Nonce': restNonce
                        },
                        body: JSON.stringify({ demoId: demoId })
                    })
                    .then(function(res) {
                        return res.json();
                    })
                    .then(function(data) {
                        progressBar.style.width = '100%';
                        setTimeout(function() {
                            statusBox.style.display = 'none';
                            buttons.forEach(function(b) { b.disabled = false; b.style.opacity = '1'; });

                            if (data.success) {
                                successText.innerText = data.message || 'دمو با موفقیت درون‌ریزی گردید.';
                                successBox.style.display = 'flex';
                            } else {
                                alert('خطا: ' + (data.message || 'درون‌ریزی دمو ناموفق بود.'));
                            }
                        }, 600);
                    })
                    .catch(function(err) {
                        statusBox.style.display = 'none';
                        buttons.forEach(function(b) { b.disabled = false; b.style.opacity = '1'; });
                        alert('خطا در برقراری ارتباط با سرور.');
                    });
                });
            });
        });
        </script>
        <?php
    }
}
