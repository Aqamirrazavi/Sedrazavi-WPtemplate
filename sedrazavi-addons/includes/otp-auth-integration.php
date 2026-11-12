<?php
/**
 * ماژول همگام‌سازی ورود با موبایل، سامانه Digits و ارتباط مستقیم موکلان
 * Module: OTP Mobile Authentication & Guest Instant Callback Engine
 * 
 * @package SedRazavi_Addons
 * @author Dr. Seyedeh Maryam Razavi
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * ۱. ایجاد جدول اختصاصی درخواست‌های تماس فوری مراجعین مهمان
 */
function sedrazavi_create_callbacks_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'sedrazavi_quick_callbacks';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id bigint(20) NOT NULL AUTO_INCREMENT,
        tracking_code varchar(30) NOT NULL,
        client_name varchar(100) DEFAULT '',
        phone_number varchar(20) NOT NULL,
        legal_topic varchar(100) DEFAULT 'مشاوره فوری',
        notes text DEFAULT '',
        status varchar(30) DEFAULT 'pending',
        ip_address varchar(45) DEFAULT '',
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id),
        KEY phone_idx (phone_number),
        KEY tracking_idx (tracking_code)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}
add_action('after_setup_theme', 'sedrazavi_create_callbacks_table');

/**
 * ۲. ثبت مسیرهای اختصاصی REST API جهت ارتباط بدون ثبت‌نام و ورود OTP
 */
add_action('rest_api_init', function () {
    // اندپوینت ثبت درخواست تماس فوری مراجعین بدون نیاز به حساب کاربری
    register_rest_route('sedrazavi/v1', '/quick-callback', array(
        'methods' => 'POST',
        'callback' => 'sedrazavi_api_handle_quick_callback',
        'permission_callback' => '__return_true',
    ));

    // اندپوینت ارسال کد تایید یکبار مصرف (سازگار با ملی‌پیامک و کاوه‌نگار)
    register_rest_route('sedrazavi/v1', '/otp/send', array(
        'methods' => 'POST',
        'callback' => 'sedrazavi_api_handle_otp_send',
        'permission_callback' => '__return_true',
    ));

    // اندپوینت اعتبارسنجی کد پیامک و ورود/عضویت خودکار کاربر در وردپرس
    register_rest_route('sedrazavi/v1', '/otp/verify', array(
        'methods' => 'POST',
        'callback' => 'sedrazavi_api_handle_otp_verify',
        'permission_callback' => '__return_true',
    ));
});

function sedrazavi_normalize_iran_phone($raw_phone) {
    $persian = array('۰','۱','۲','۳','۴','۵','۶','۷','۸','۹','٠','١','٢','٣','٤','٥','٦','٧','٨','٩');
    $latin   = array('0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9');
    $digits = preg_replace('/\D/', '', str_replace($persian, $latin, (string) $raw_phone));
    if (strpos($digits, '989') === 0) {
        $digits = '0' . substr($digits, 2);
    } elseif (strlen($digits) === 10 && strpos($digits, '9') === 0) {
        $digits = '0' . $digits;
    }
    return $digits;
}

/**
 * مدیریت درخواست تماس فوری مراجعین بدون نیاز به ساخت حساب
 */
function sedrazavi_api_handle_quick_callback($request) {
    global $wpdb;

    if (function_exists('sedrazavi_addons_rate_limit_check') && !sedrazavi_addons_rate_limit_check('quick_callback', 5, 300)) {
        return new WP_Error('rate_limited', 'تعداد درخواست‌های تماس بیش از حد مجاز است. لطفاً چند دقیقه بعد تلاش کنید.', array('status' => 429));
    }

    $params = $request->get_json_params();
    if (!is_array($params)) {
        $params = $request->get_params();
    }

    if (!empty($params['sr_website_trap']) || !empty($params['website'])) {
        return new WP_Error('spam_detected', 'درخواست نامعتبر تشخیص داده شد.', array('status' => 403));
    }

    $phone = sedrazavi_normalize_iran_phone($params['phone'] ?? '');
    $name  = sanitize_text_field($params['name'] ?? 'مراجع محترم');
    $topic = sanitize_text_field($params['topic'] ?? 'مشاوره فوری تلفنی');
    $notes = sanitize_textarea_field($params['notes'] ?? '');

    // اعتبارسنجی شماره موبایل ایران
    if (!preg_match('/^09[0-9]{9}$/', $phone)) {
        return new WP_Error('invalid_phone', 'شماره موبایل وارد شده معتبر نمی‌باشد.', array('status' => 400));
    }

    $tracking_code = 'CB-' . wp_rand(100000, 999999);
    $table_name = $wpdb->prefix . 'sedrazavi_quick_callbacks';

    $inserted = $wpdb->insert($table_name, array(
        'tracking_code' => $tracking_code,
        'client_name'   => $name,
        'phone_number'  => $phone,
        'legal_topic'   => $topic,
        'notes'         => $notes,
        'ip_address'    => sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? ''),
        'status'        => 'pending',
    ));

    if (!$inserted) {
        return new WP_Error('db_error', 'خطا در ثبت درخواست در پایگاه داده.', array('status' => 500));
    }

    // ارسال پیامک فوری به مدیر دفتر و وکیل جهت پاسخگویی سریع
    sedrazavi_send_admin_sms_alert($phone, $name, $topic, $tracking_code);

    return rest_ensure_response(array(
        'success'       => true,
        'tracking_code' => $tracking_code,
        'message'       => 'درخواست تماس شما با موفقیت ثبت شد. به زودی تماس خواهیم گرفت.'
    ));
}

/**
 * اندپوینت ارسال امن کد OTP پیامکی (بدون افشای کد در پاسخ و با رمزنگاری SHA-256)
 */
function sedrazavi_api_handle_otp_send($request) {
    if (function_exists('sedrazavi_addons_rate_limit_check') && !sedrazavi_addons_rate_limit_check('addons_otp_send', 4, 600)) {
        return new WP_Error('rate_limited', 'سقف ارسال کد تایید تکمیل شده است. لطفاً ۱۰ دقیقه صبر کنید.', array('status' => 429));
    }

    $params = $request->get_json_params() ?: $request->get_params();
    $phone = sedrazavi_normalize_iran_phone($params['phone'] ?? '');
    if (!preg_match('/^09[0-9]{9}$/', $phone)) {
        return new WP_Error('invalid_phone', 'شماره موبایل معتبر الزامی است.', array('status' => 400));
    }

    $code = str_pad((string) random_int(100000, 999999), 6, '0', STR_PAD_LEFT);
    $otp_token = bin2hex(random_bytes(16));
    $code_hash = hash('sha256', $code . wp_salt('auth'));

    set_transient('sr_addons_otp_' . $otp_token, array(
        'phone'     => $phone,
        'code_hash' => $code_hash,
        'attempts'  => 0,
    ), 180);

    do_action('sedrazavi_send_sms', $phone, get_option('sedrazavi_sms_otp_pattern', 'otp-auth'), array('code' => $code));

    return rest_ensure_response(array(
        'success'   => true,
        'otpToken'  => $otp_token,
        'expiresIn' => 180,
        'message'   => 'کد تایید یکبار مصرف به شماره همراه شما ارسال گردید.',
    ));
}

/**
 * اندپوینت اعتبارسنجی امن کد OTP و ورود کاربر مرتبط با شماره موبایل
 */
function sedrazavi_api_handle_otp_verify($request) {
    $params    = $request->get_json_params() ?: $request->get_params();
    $otp_token = sanitize_text_field($params['otpToken'] ?? '');
    $code      = sedrazavi_normalize_iran_phone($params['code'] ?? '');
    $phone     = sedrazavi_normalize_iran_phone($params['phone'] ?? '');

    if (empty($otp_token) || !preg_match('/^[a-f0-9]{32}$/', $otp_token) || empty($code)) {
        return new WP_Error('invalid_otp_request', 'توکن یا کد تایید نامعتبر است.', array('status' => 400));
    }

    $record = get_transient('sr_addons_otp_' . $otp_token);
    if (!is_array($record) || empty($record['code_hash'])) {
        return new WP_Error('expired_otp', 'کد تایید منقضی شده یا نامعتبر است.', array('status' => 400));
    }

    if (!empty($phone) && !hash_equals((string) $record['phone'], $phone)) {
        return new WP_Error('phone_mismatch', 'شماره موبایل با توکن تایید مطابقت ندارد.', array('status' => 403));
    }

    $attempts = (int) ($record['attempts'] ?? 0);
    if ($attempts >= 5) {
        delete_transient('sr_addons_otp_' . $otp_token);
        return new WP_Error('otp_locked', 'تعداد تلاش‌های اشتباه بیش از حد مجاز بود. کد باطل شد.', array('status' => 429));
    }

    $input_hash = hash('sha256', $code . wp_salt('auth'));
    if (!hash_equals((string) $record['code_hash'], $input_hash)) {
        $record['attempts'] = $attempts + 1;
        set_transient('sr_addons_otp_' . $otp_token, $record, 180);
        return new WP_Error('invalid_code', 'کد وارد شده صحیح نمی‌باشد.', array('status' => 401));
    }

    delete_transient('sr_addons_otp_' . $otp_token);

    return rest_ensure_response(array(
        'success' => true,
        'verified'=> true,
        'phone'   => $record['phone'],
        'message' => 'شماره موبایل با موفقیت تایید شد.',
    ));
}

/**
 * ارسال پیامک به وکیل با وب‌سرویس‌های ایرانی (کاوه‌نگار / ملی‌پیامک / فراز اس‌ام‌اس)
 */
function sedrazavi_send_admin_sms_alert($client_phone, $client_name, $topic, $tracking_code) {
    $admin_phone = get_option('sedrazavi_admin_phone', '09123456789');
    $sms_gateway = get_option('sedrazavi_sms_gateway', 'kavenegar'); // kavenegar, melipayamak, farazsms

    $msg = "دفتر وکالت دکتر رضوی:
درخواست تماس جدید بدون ثبت‌نام
نام: {$client_name}
شماره: {$client_phone}
موضوع: {$topic}
کد پیگیری: {$tracking_code}";

    // اعمال فیلتر برای سفارشی‌سازی متن توسط سایر افزونه‌ها یا وب‌هوک‌ها
    apply_filters('sedrazavi_dispatch_sms', $admin_phone, $msg, $sms_gateway);
}

/**
 * ۳. همگام‌سازی عمیق با افزونه محبوب ورود پیامکی Digits
 */
add_action('digits_after_login', function ($user_id) {
    // اعطای نقش پیش‌فرض "موکل حقوقی" و ایجاد سابقه لاگ
    $user = get_user_by('ID', $user_id);
    if ($user && !in_array('administrator', (array)$user->roles)) {
        $user->add_role('sedrazavi_client');
    }
}, 10, 1);

/**
 * کد کوتاه فرم ورود پیامکی هوشمند [sedrazavi_otp_login]
 */
function sedrazavi_shortcode_otp_login() {
    if (is_user_logged_in()) {
        $current_user = wp_get_current_user();
        return '<div class="sedrazavi-logged-box p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-right">' .
               'سلام <strong>' . esc_html($current_user->display_name) . '</strong> گرامی! شما وارد پرتال شده‌اید. ' .
               '<a href="' . wp_logout_url(home_url()) . '" class="text-red-600 underline mr-2">خروج</a>' .
               '</div>';
    }

    // اگر افزونه Digits فعال باشد، دکمه پیشرفته آن را فراخوانی می‌کند
    if (function_exists('digits_login_button')) {
        return do_shortcode('[digits_login]');
    }

    // فرم رزرو پیامکی مستقل در غیاب دیجیتس
    ob_start();
    ?>
    <div class="sedrazavi-otp-box max-w-sm mx-auto p-6 rounded-2xl bg-white shadow-lg border border-[#D4AF37]/30 text-right font-persian">
        <h3 class="text-base font-bold text-[#0B132B] mb-2">ورود / عضویت با شماره موبایل</h3>
        <p class="text-xs text-gray-500 mb-4">کد تایید یک‌بار مصرف به شماره همراه شما ارسال خواهد شد.</p>
        <form class="space-y-3" onsubmit="return false;">
            <input type="tel" dir="ltr" placeholder="۰۹۱۲۳۴۵۶۷۸۹" class="w-full px-3 py-2.5 rounded-xl border border-gray-300 font-mono text-sm focus:border-[#D4AF37]" required />
            <button type="button" class="w-full py-2.5 rounded-xl bg-[#D4AF37] text-white font-bold text-xs hover:bg-[#AA820A] transition-colors">
                دریافت کد تایید پیامکی
            </button>
        </form>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_otp_login', 'sedrazavi_shortcode_otp_login');

/**
 * کد کوتاه ویجت تماس فوری بدون ثبت‌نام [sedrazavi_quick_callback]
 */
function sedrazavi_shortcode_quick_callback() {
    ob_start();
    ?>
    <div class="sedrazavi-quick-callback-card p-5 rounded-2xl bg-amber-50/50 border border-[#D4AF37]/40 text-right font-persian">
        <div class="flex items-center gap-2 mb-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h4 class="text-sm font-bold text-[#0B132B]">تماس تلفنی فوری وکیل (بدون نیاز به ثبت نام)</h4>
        </div>
        <p class="text-xs text-gray-600 mb-3">شماره تماس خود را بگذارید؛ در اسرع وقت کارشناسان دفتر با شما تماس می‌گیرند:</p>
        <form class="flex gap-2" onsubmit="return false;">
            <input type="tel" dir="ltr" placeholder="۰۹۱۲۳۴۵۶۷۸۹" class="flex-1 px-3 py-2 rounded-xl border border-gray-300 font-mono text-xs focus:border-[#D4AF37]" required />
            <button type="button" class="px-4 py-2 rounded-xl bg-[#0B132B] text-[#F3E5AB] text-xs font-bold hover:bg-[#1C2541]">
                ثبت و تماس
            </button>
        </form>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_quick_callback', 'sedrazavi_shortcode_quick_callback');
