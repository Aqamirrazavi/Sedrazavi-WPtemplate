<?php
/**
 * ==============================================================================
 * پکیج اتصال یکپارچه شورت‌کدهای React در وردپرس (WordPress React Shortcode Bridge)
 * ==============================================================================
 * 
 * نسخه: 2.5.0
 * توسعه‌دهنده: دفتر حقوقی و وکالت SedRazavi (سیده مریم رضوی و سید امیر حسین رضوی فردویی)
 * وب‌سایت: https://t.me/sedrazavi
 * مجوز: GPL v2 or later
 * 
 * توضیحات فنی:
 * این فایل شامل رجیستری هوشمند شورت‌کدهای وردپرس برای مانت خودکار مؤلفه‌های مدرن React
 * همراه با سازوکار بهینه Enqueue تاخیری (Lazy Enqueuing) جهت بارگذاری فایل‌های JS/CSS
 * صرفاً در برگه‌های نیازمند شورت‌کد و ارسال متغیرهای سرور با wp_localize_script می‌باشد.
 * ==============================================================================
 */

// جلوگیری از دسترسی مستقیم به فایل
if (!defined('ABSPATH')) {
    exit;
}

// ۱. تعریف ثابت‌های بنیادین ماژول
if (!defined('SEDRAZAVI_REACT_BRIDGE_VERSION')) {
    define('SEDRAZAVI_REACT_BRIDGE_VERSION', '2.5.0');
}
if (!defined('SEDRAZAVI_REACT_PREFIX')) {
    define('SEDRAZAVI_REACT_PREFIX', 'sedrazavi_react_');
}

/**
 * ۲. ثبت اسکریپت‌ها و استایل‌های اصلی React در وردپرس (Asset Registration)
 * اسکریپت‌ها در این مرحله فقط REGISTER می‌شوند و تا زمان فراخوانی شورت‌کد، در حافظه لود نمی‌شوند.
 */
function sedrazavi_register_react_assets() {
    $version = SEDRAZAVI_REACT_BRIDGE_VERSION;
    $theme_dir_uri = get_template_directory_uri();
    $theme_dir_path = get_template_directory();

    // مسیرهای محتمل فایل‌های کامپایل‌شده Vite
    $js_bundle  = '';
    $css_bundle = '';

    if (file_exists($theme_dir_path . '/public/app-dist/index.js')) {
        $js_bundle  = $theme_dir_uri . '/public/app-dist/index.js';
        $css_bundle = $theme_dir_uri . '/public/app-dist/index.css';
    } elseif (file_exists($theme_dir_path . '/dist/assets/index.js')) {
        $js_bundle  = $theme_dir_uri . '/dist/assets/index.js';
        $css_bundle = $theme_dir_uri . '/dist/assets/index.css';
    } else {
        // جستجوی داینامیک نام فایل دارای هش در dist/assets/
        $dist_files = glob($theme_dir_path . '/dist/assets/index-*.js');
        if (!empty($dist_files)) {
            $js_bundle = $theme_dir_uri . '/dist/assets/' . basename($dist_files[0]);
        }
        $css_files = glob($theme_dir_path . '/dist/assets/index-*.css');
        if (!empty($css_files)) {
            $css_bundle = $theme_dir_uri . '/dist/assets/' . basename($css_files[0]);
        }
    }

    // در صورت عدم وجود بیلد، به عنوان فال‌بک از آدرس محلی استفاده می‌شود
    if (empty($js_bundle)) {
        $js_bundle  = $theme_dir_uri . '/public/app-dist/index.js';
    }
    if (empty($css_bundle)) {
        $css_bundle = $theme_dir_uri . '/public/app-dist/index.css';
    }

    // ثبت استایل اصلی مؤلفه‌های React (شامل Tailwind CSS کامپایل‌شده)
    wp_register_style(
        'sedrazavi_react_styles',
        $css_bundle,
        array(),
        $version
    );

    // ثبت اسکریپت اجرایی React و رجیستری مؤلفه‌ها
    wp_register_script(
        'sedrazavi_react_bundle',
        $js_bundle,
        array(),
        $version,
        true // لود در فوتر صفحه جهت بهینه‌سازی سرعت و امتیاز Core Web Vitals
    );
}
add_action('wp_enqueue_scripts', 'sedrazavi_register_react_assets', 10);

/**
 * ۳. تزریق هوشمند اسکریپت‌ها و متغیرهای سرور (Smart Lazy Enqueue & wp_localize_script)
 * این تابع تنها هنگامی که حداقل یک شورت‌کد در صفحه اجرا شود صدا زده می‌شود تا از لود بیهوده جلوگیری گردد.
 */
function sedrazavi_enqueue_react_runtime() {
    static $already_enqueued = false;
    if ($already_enqueued) {
        return;
    }
    $already_enqueued = true;

    // ۱. انکیو کردن استایل و اسکریپت ثبت‌شده
    wp_enqueue_style('sedrazavi_react_styles');
    wp_enqueue_script('sedrazavi_react_bundle');

    // ۲. آماده‌سازی داده‌های سرور جهت ارسال با wp_localize_script
    $localized_data = array(
        'siteUrl'        => home_url(),
        'siteName'       => get_bloginfo('name'),
        'isRtl'          => is_rtl(),
        'shortcodePrefix'=> 'sedrazavi_react_',
        'version'        => SEDRAZAVI_REACT_BRIDGE_VERSION,
        'locale'         => get_locale(),
        // مشخصات REST API جهت ارتباط ایجکس و واکشی داده‌های لحظه‌ای
        'rest' => array(
            'root'      => esc_url_raw(rest_url()),
            'endpoint'  => esc_url_raw(rest_url('sedrazavi/v1/')),
            'nonce'     => wp_create_nonce('wp_rest'),
        ),
        // اطلاعات امنیتی Admin Ajax سنتی وردپرس
        'ajax' => array(
            'url'   => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('sedrazavi_react_ajax_security_nonce'),
        ),
        // مشخصات کاربر جاری در صورت لاگین بودن
        'currentUser' => array(
            'isLoggedIn'   => is_user_logged_in(),
            'id'           => get_current_user_id(),
            'displayName'  => is_user_logged_in() ? wp_get_current_user()->display_name : '',
            'email'        => is_user_logged_in() ? wp_get_current_user()->user_email : '',
            'roles'        => is_user_logged_in() ? wp_get_current_user()->roles : array(),
        ),
        // اطلاعات پایه هویت و پروانه وکیل از تنظیمات پوسته یا پیش‌فرض
        'lawyerProfile' => array(
            'name'           => get_option('sedrazavi_lawyer_name', 'سرکار خانم دکتر سیده مریم رضوی'),
            'title'          => get_option('sedrazavi_lawyer_title', 'وکیل پایه یک دادگستری و مشاور ارشد حقوقی'),
            'licenseNumber'  => get_option('sedrazavi_lawyer_license', '۱۸۴۵۲ / ک.و.م'),
            'phone'          => get_option('sedrazavi_lawyer_phone', '۰۲۱-۸۸۹۹۰۰۱۱'),
            'mobile'         => get_option('sedrazavi_lawyer_mobile', '۰۹۱۲-۳۴۵۶۷۸۹'),
            'address'        => get_option('sedrazavi_lawyer_address', 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج حقوقی SedRazavi'),
            'onlineBooking'  => true,
        ),
        'translations' => array(
            'loading'        => __('در حال بارگذاری مؤلفه حقوقی...', 'sedrazavi'),
            'error'          => __('خطا در برقراری ارتباط با سامانه حقوقی.', 'sedrazavi'),
            'retry'          => __('تلاش مجدد', 'sedrazavi'),
            'courtFeeTitle'  => __('محاسبه‌گر تخصصی قوه قضاییه', 'sedrazavi'),
            'caseTrackerTitle'=> __('سامانه برخط رهگیری پرونده‌های موکلین', 'sedrazavi'),
        ),
    );

    // فیلتر وردپرس برای شخصی‌سازی یا افزودن داده‌های بیشتر توسط افزونه‌ها
    $localized_data = apply_filters('sedrazavi_react_localized_data', $localized_data);

    // ارسال متغیر امن جاوااسکریپت به پنجره مرورگر
    wp_localize_script('sedrazavi_react_bundle', 'SedRazaviReactConfig', $localized_data);
}

/**
 * ۴. تابع کمکی رندر اسکلت پیش‌بارگذار (Skeleton Preloader Renderer)
 */
function sedrazavi_render_react_skeleton($component_name, $custom_title = '') {
    ob_start();
    ?>
    <div class="sedrazavi-skeleton-container" style="min-height: 180px; background: linear-gradient(135deg, rgba(11,19,43,0.04) 0%, rgba(212,175,55,0.06) 100%); border: 1px dashed rgba(212,175,55,0.35); border-radius: 1.25rem; padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; font-family: inherit; direction: rtl; margin: 0.75rem 0;">
        <div style="width: 40px; height: 40px; border: 3px solid rgba(212,175,55,0.25); border-top-color: #D4AF37; border-radius: 50%; animation: sedrazaviSpin 1.1s cubic-bezier(0.5, 0, 0.5, 1) infinite; margin-bottom: 0.75rem;"></div>
        <p style="font-size: 0.875rem; font-weight: 700; color: #D4AF37; margin: 0 0 0.25rem 0;">
            <?php echo esc_html(!empty($custom_title) ? $custom_title : 'سامانه حقوقی هوشمند SedRazavi'); ?>
        </p>
        <span style="font-size: 0.75rem; color: #94A3B8;">
            در حال بارگذاری مؤلفه <?php echo esc_html($component_name); ?>...
        </span>
        <style>
            @keyframes sedrazaviSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * ==============================================================================
 * ۵. تعریف شورت‌کدهای اختصاصی برای مؤلفه‌های React (Shortcode Wrappers)
 * ==============================================================================
 */

// ۱. رهگیری هوشمند پرونده‌های قضایی
function sedrazavi_shortcode_case_tracker($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $a = shortcode_atts(array(
        'case_number'    => '۱۴۰۳-۲۸۴',
        'status_code'    => 'HEARING_PENDING',
        'status_text'    => 'در حال تبادل لوایح و بررسی نظر کارشناس رسمی',
        'hearing_date'   => '۱۴۰۳/۰۹/۱۸',
        'days_remaining' => 12,
        'show_timeline'  => 'true',
        'class'          => '',
        'id'             => '',
    ), $atts, 'sedrazavi_react_case_tracker');

    $props = array(
        'case_number'    => sanitize_text_field($a['case_number']),
        'status_code'    => sanitize_text_field($a['status_code']),
        'status_text'    => sanitize_text_field($a['status_text']),
        'hearing_date'   => sanitize_text_field($a['hearing_date']),
        'days_remaining' => intval($a['days_remaining']),
        'show_timeline'  => filter_var($a['show_timeline'], FILTER_VALIDATE_BOOLEAN),
    );

    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="CaseProgressTracker" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('CaseProgressTracker', 'استپر و رهگیری هوشمند پرونده‌های قضایی'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_case_tracker', 'sedrazavi_shortcode_case_tracker');

// ۲. محاسبه‌گر جامع هزینه‌های دادرسی و دیه
function sedrazavi_shortcode_court_calculator($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $a = shortcode_atts(array(
        'default_tab'        => 'court_fee',
        'default_claim'      => 500000000,
        'show_tariff_guide'  => 'true',
        'enable_print'       => 'true',
        'class'              => '',
        'id'                 => '',
    ), $atts, 'sedrazavi_react_court_calculator');

    $props = array(
        'default_tab'        => sanitize_text_field($a['default_tab']),
        'default_claim'      => intval($a['default_claim']),
        'show_tariff_guide'  => filter_var($a['show_tariff_guide'], FILTER_VALIDATE_BOOLEAN),
        'enable_print'       => filter_var($a['enable_print'], FILTER_VALIDATE_BOOLEAN),
    );

    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="CourtFeeCalculator" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('CourtFeeCalculator', 'میز جامع محاسبات قضایی و دیه'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_court_calculator', 'sedrazavi_shortcode_court_calculator');

// ۳. ابزارک دسترسی سریع کارتابل موکلین
function sedrazavi_shortcode_client_portal_widget($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $a = shortcode_atts(array(
        'show_financials' => 'true',
        'show_documents'  => 'true',
        'max_cases'       => 3,
        'class'           => '',
        'id'              => '',
    ), $atts, 'sedrazavi_react_client_portal_widget');

    $props = array(
        'show_financials' => filter_var($a['show_financials'], FILTER_VALIDATE_BOOLEAN),
        'show_documents'  => filter_var($a['show_documents'], FILTER_VALIDATE_BOOLEAN),
        'max_cases'       => intval($a['max_cases']),
    );

    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="ClientPortalQuickAccessWidget" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('ClientPortalQuickAccessWidget', 'کارتابل مراجعین و موکلان'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_client_portal_widget', 'sedrazavi_shortcode_client_portal_widget');

// ۴. فرم تقویم و رزرواسیون نوبت مشاوره حقوقی
function sedrazavi_shortcode_booking_modal($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $a = shortcode_atts(array(
        'default_service'      => 'commercial',
        'title'                => 'رزرو نوبت مشاوره با وکیل پایه یک',
        'allow_online_payment' => 'true',
        'button_text'          => 'ثبت و تایید جلسه مشاوره',
        'class'                => '',
        'id'                   => '',
    ), $atts, 'sedrazavi_react_booking_modal');

    $props = array(
        'default_service'      => sanitize_text_field($a['default_service']),
        'title'                => sanitize_text_field($a['title']),
        'allow_online_payment' => filter_var($a['allow_online_payment'], FILTER_VALIDATE_BOOLEAN),
        'button_text'          => sanitize_text_field($a['button_text']),
    );

    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="ContactAndBookingSection" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('ContactAndBookingSection', 'سامانه نوبت‌دهی آنلاین'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_booking_modal', 'sedrazavi_shortcode_booking_modal');

// ۵. کارت‌های خدمات تخصصی وکالت
function sedrazavi_shortcode_services_grid($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $a = shortcode_atts(array(
        'category' => 'all',
        'count'    => 6,
        'columns'  => '3',
        'show_fee' => 'true',
        'class'    => '',
        'id'       => '',
    ), $atts, 'sedrazavi_react_services_grid');

    $props = array(
        'category' => sanitize_text_field($a['category']),
        'count'    => intval($a['count']),
        'columns'  => sanitize_text_field($a['columns']),
        'show_fee' => filter_var($a['show_fee'], FILTER_VALIDATE_BOOLEAN),
    );

    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="ServicesSection" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('ServicesSection', 'شبکه خدمات تخصصی حقوقی'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_services_grid', 'sedrazavi_shortcode_services_grid');

// ۶. اسلایدر تجربیات و رضایت موکلان
function sedrazavi_shortcode_testimonials_slider($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $a = shortcode_atts(array(
        'count'        => 4,
        'autoplay'     => 'true',
        'show_ratings' => 'true',
        'class'        => '',
        'id'           => '',
    ), $atts, 'sedrazavi_react_testimonials_slider');

    $props = array(
        'count'        => intval($a['count']),
        'autoplay'     => filter_var($a['autoplay'], FILTER_VALIDATE_BOOLEAN),
        'show_ratings' => filter_var($a['show_ratings'], FILTER_VALIDATE_BOOLEAN),
    );

    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="TestimonialsSlider" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('TestimonialsSlider', 'اسلایدر رضایت‌نامه موکلان'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_testimonials_slider', 'sedrazavi_shortcode_testimonials_slider');

// ۷. پرسش و پاسخ‌های متداول (FAQ)
function sedrazavi_shortcode_faq_accordion($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $a = shortcode_atts(array(
        'count'      => 5,
        'open_first' => 'true',
        'searchable' => 'true',
        'class'      => '',
        'id'         => '',
    ), $atts, 'sedrazavi_react_faq_accordion');

    $props = array(
        'count'      => intval($a['count']),
        'open_first' => filter_var($a['open_first'], FILTER_VALIDATE_BOOLEAN),
        'searchable' => filter_var($a['searchable'], FILTER_VALIDATE_BOOLEAN),
    );

    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="FaqSection" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('FaqSection', 'پرسش‌های حقوقی پرتکرار'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_faq_accordion', 'sedrazavi_shortcode_faq_accordion');

// ۸. نشان‌های اعتبار و پروانه وکالت کانون
function sedrazavi_shortcode_trust_badges($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $a = shortcode_atts(array(
        'style'        => 'grid',
        'show_license' => 'true',
        'animated'     => 'true',
        'class'        => '',
        'id'           => '',
    ), $atts, 'sedrazavi_react_trust_badges');

    $props = array(
        'style'        => sanitize_text_field($a['style']),
        'show_license' => filter_var($a['show_license'], FILTER_VALIDATE_BOOLEAN),
        'animated'     => filter_var($a['animated'], FILTER_VALIDATE_BOOLEAN),
    );

    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="TrustBadges" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('TrustBadges', 'نشان‌های رسمی و پروانه وکالت'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_trust_badges', 'sedrazavi_shortcode_trust_badges');

/**
 * ==============================================================================
 * ۶. اسکریپت خودکار مانت کلاینت در فوتر (Auto Mount Loader in wp_footer)
 * شناسایی تمام کانتینرهای .sedrazavi-react-root و مانت مؤلفه‌ها با React
 * ==============================================================================
 */
function sedrazavi_render_react_mount_bootstrap() {
    ?>
    <script type="text/javascript" id="sedrazavi-react-mount-bootstrap">
    (function() {
        function mountAllSedRazaviComponents() {
            var roots = document.querySelectorAll('.sedrazavi-react-root:not([data-mounted="true"])');
            if (!roots || roots.length === 0) return;

            var registry = window.SedRazaviReactComponents || {};
            var React = window.React || (window.wp && window.wp.element);
            var ReactDOM = window.ReactDOM || (window.wp && window.wp.element);

            roots.forEach(function(container) {
                var compName = container.getAttribute('data-component');
                var rawProps = container.getAttribute('data-props');
                var props = {};
                try {
                    props = rawProps ? JSON.parse(rawProps) : {};
                } catch(e) {
                    console.error('SedRazavi React Props Parse Error:', e, rawProps);
                }

                var ComponentClass = registry[compName];
                if (ComponentClass && ReactDOM && React) {
                    try {
                        container.setAttribute('data-mounted', 'true');
                        var skeleton = container.querySelector('.sedrazavi-skeleton-container');
                        if (skeleton) skeleton.remove();

                        if (ReactDOM.createRoot) {
                            var root = ReactDOM.createRoot(container);
                            root.render(React.createElement(ComponentClass, props));
                        } else if (ReactDOM.render) {
                            ReactDOM.render(React.createElement(ComponentClass, props), container);
                        }
                    } catch (err) {
                        console.error('Error mounting SedRazavi React component ' + compName + ':', err);
                    }
                }
            });
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', mountAllSedRazaviComponents);
        } else {
            mountAllSedRazaviComponents();
        }

        // پشتیبانی از ویرایشگر المنتور در حالت پیش‌نمایش
        if (window.elementorFrontend) {
            window.elementorFrontend.hooks.addAction('frontend/element_ready/global', function() {
                setTimeout(mountAllSedRazaviComponents, 100);
            });
        }
    })();
    </script>
    <?php
}
add_action('wp_footer', 'sedrazavi_render_react_mount_bootstrap', 99);
