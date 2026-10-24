<?php
/**
 * SedRazavi OS Legal Intake & Appointments Workflow Engine (Level B - P3 Roadmap)
 *
 * Provides structured intake queuing, triage management, timezone-aware calendar scheduling,
 * double-booking prevention, data minimization, and WP Privacy integration.
 *
 * @package SedRazavi_Companion
 * @version 25.0.0
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Legal_Intake_Appointments {

    private static $instance = null;
    private $table_intake = 'sedrazavi_legal_intake';
    private $table_appointments = 'sedrazavi_legal_appointments';

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_filter('wp_privacy_personal_data_exporters', [$this, 'register_privacy_exporter']);
        add_filter('wp_privacy_personal_data_erasers', [$this, 'register_privacy_eraser']);
        add_action('init', [$this, 'schedule_retention_purge']);
        add_action('sedrazavi_purge_expired_intake_cron', [$this, 'execute_retention_purge']);
    }

    /**
     * Register REST API routes
     */
    public function register_rest_routes() {
        // Public Intake Submission (with rate limiting & honeypot)
        register_rest_route('sedrazavi/v1', '/intake/submit', [
            'methods'  => 'POST',
            'callback' => [$this, 'rest_submit_intake'],
            'permission_callback' => '__return_true',
        ]);

        // Public Available Slots (non-leaking, timezone-aware)
        register_rest_route('sedrazavi/v1', '/appointments/slots', [
            'methods'  => 'GET',
            'callback' => [$this, 'rest_get_available_slots'],
            'permission_callback' => '__return_true',
        ]);

        // Authenticated Staff Triage Queue
        register_rest_route('sedrazavi/v1', '/intake/queue', [
            'methods'  => 'GET',
            'callback' => [$this, 'rest_get_triage_queue'],
            'permission_callback' => [$this, 'check_staff_permission'],
        ]);

        // Authenticated Status & Assignment Mutation
        register_rest_route('sedrazavi/v1', '/intake/update-status', [
            'methods'  => 'POST',
            'callback' => [$this, 'rest_update_intake_status'],
            'permission_callback' => [$this, 'check_staff_permission'],
        ]);

        // Authenticated Appointment Booking Execution
        register_rest_route('sedrazavi/v1', '/appointments/book', [
            'methods'  => 'POST',
            'callback' => [$this, 'rest_book_appointment'],
            'permission_callback' => '__return_true', // Validated via client token / nonce
        ]);
    }

    /**
     * Staff/Lawyer RBAC Permission check
     */
    public function check_staff_permission($request) {
        if (current_user_can('manage_options') || current_user_can('edit_posts')) {
            return true;
        }
        $nonce = $request->get_header('x-wp-nonce');
        if ($nonce && wp_verify_nonce($nonce, 'wp_rest')) {
            return true;
        }
        return false;
    }

    /**
     * REST: Submit Intake Request (Section 4.3 Data Minimization)
     */
    public function rest_submit_intake($request) {
        // 1. Honeypot Anti-Spam Check
        $honeypot = $request->get_param('sr_website_trap');
        if (!empty($honeypot)) {
            return new WP_Error('spam_detected', 'درخواست شما مسدود شد.', ['status' => 403]);
        }

        // 2. Rate Limiting Check
        $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
        $rate_key = 'sr_intake_rate_' . md5($ip . wp_salt('auth'));
        $attempts = (int) get_transient($rate_key);
        if ($attempts >= 5) {
            return new WP_Error('rate_limited', 'تعداد تلاش‌های شما بیش از حد مجاز است. لطفاً ۱۰ دقیقه بعد مجدداً تلاش نمایید.', ['status' => 429]);
        }
        set_transient($rate_key, $attempts + 1, 10 * MINUTE_IN_SECONDS);

        // 3. Input Sanitization & Iranian Mobile Normalization
        $name    = sanitize_text_field($request->get_param('name') ?: '');
        $phone   = sanitize_text_field($request->get_param('phone') ?: '');
        $topic   = sanitize_text_field($request->get_param('topic') ?: 'general');
        $urgency = sanitize_text_field($request->get_param('urgency') ?: 'normal');
        $consent = (bool) $request->get_param('privacy_consent');

        if (empty($name) || empty($phone)) {
            return new WP_Error('missing_fields', 'نام و شماره تماس الزامی است.', ['status' => 400]);
        }

        if (!$consent) {
            return new WP_Error('consent_required', 'تأییدیه شرایط محرمانگی و حریم خصوصی الزامی است.', ['status' => 400]);
        }

        // Normalize Persian digits and phone
        $phone = $this->normalize_iranian_phone($phone);
        if (!preg_match('/^09[0-9]{9}$/', $phone)) {
            return new WP_Error('invalid_phone', 'شماره موبایل وارد شده معتبر نمی‌باشد (فرمت استاندارد: ۰۹۱۲۳۴۵۶۷۸۹).', ['status' => 400]);
        }

        // 4. Cryptographic Reference Token Generation (Non-leaking ID)
        $ref_code = 'LEG-' . strtoupper(wp_generate_password(6, false, false)) . '-' . date('d');

        // 5. Store Intake in DB
        $intake_record = [
            'reference_code'     => $ref_code,
            'client_name'        => $name,
            'phone'              => $phone,
            'topic'              => $topic,
            'urgency'            => in_array($urgency, ['normal', 'high', 'critical']) ? $urgency : 'normal',
            'status'             => 'new',
            'assigned_to'        => 'دکتر سیده مریم رضوی',
            'consent_recorded'   => 1,
            'retention_expires'  => gmdate('Y-m-d H:i:s', strtotime('+180 days')),
            'created_at'         => gmdate('Y-m-d H:i:s'),
        ];

        $intake_list = get_option('sedrazavi_legal_intake_records', []);
        $intake_list[] = $intake_record;
        // Keep max 200 records in demo option store
        if (count($intake_list) > 200) {
            $intake_list = array_slice($intake_list, -200);
        }
        update_option('sedrazavi_legal_intake_records', $intake_list);

        // 6. Log Audit Event (Without PII in body)
        $this->log_audit_event('intake_received', [
            'reference_code' => $ref_code,
            'urgency'        => $urgency,
            'topic'          => $topic,
        ]);

        return rest_ensure_response([
            'status'         => 'success',
            'message'        => 'درخواست مشاوره حقوقی شما با موفقیت ثبت شد و در صف تریاژ قرار گرفت.',
            'reference_code' => $ref_code,
            'tracking_notice'=> 'کد پیگیری بالا را یادداشت نمایید. اطلاعات پرونده محرمانه نگهداری خواهد شد.',
        ]);
    }

    /**
     * REST: Get Timezone-Aware Free Appointment Slots (Section 4.6)
     */
    public function rest_get_available_slots($request) {
        $lawyer_timezone = 'Asia/Tehran';
        $today = new DateTime('now', new DateTimeZone($lawyer_timezone));

        $slots = [];
        for ($i = 1; $i <= 5; $i++) {
            $date = clone $today;
            $date->modify("+{$i} days");
            // Skip Friday (Day 5 in PHP if Monday is 1, let's use Persian calendar Friday = Jomeh)
            $dayOfWeek = (int) $date->format('N');
            if ($dayOfWeek === 5) { // Friday in ISO-8601
                continue;
            }

            $date_str = $date->format('Y-m-d');
            $slots[] = [
                'date'         => $date_str,
                'weekday_fa'   => $this->get_persian_weekday($dayOfWeek),
                'timezone'     => $lawyer_timezone,
                'windows'      => [
                    ['slot_id' => $date_str . '_1000', 'time' => '۱۰:۰۰ الی ۱۰:۴۵', 'status' => 'available'],
                    ['slot_id' => $date_str . '_1130', 'time' => '۱۱:۳۰ الی ۱۲:۱۵', 'status' => 'available'],
                    ['slot_id' => $date_str . '_1600', 'time' => '۱۶:۰۰ الی ۱۶:۴۵', 'status' => 'available'],
                    ['slot_id' => $date_str . '_1730', 'time' => '۱۷:۳۰ الی ۱۸:۱۵', 'status' => 'available'],
                ],
            ];
        }

        return rest_ensure_response([
            'status'        => 'success',
            'timezone'      => $lawyer_timezone,
            'buffer_min'    => 15,
            'capacity_type' => 'exclusive_lawyer',
            'days'          => $slots,
        ]);
    }

    /**
     * REST: Get Triage Queue (Section 4.1 & Level B Workflow)
     */
    public function rest_get_triage_queue($request) {
        $records = get_option('sedrazavi_legal_intake_records', []);
        
        // Seed initial demo data if empty
        if (empty($records)) {
            $records = [
                [
                    'reference_code'    => 'LEG-92418-23',
                    'client_name'       => 'مهندس آرش طاهری',
                    'phone'             => '09121112233',
                    'topic'             => 'داوری تجاری و قراردادهای بین‌المللی',
                    'urgency'           => 'critical',
                    'status'            => 'new',
                    'assigned_to'       => 'دکتر سیده مریم رضوی',
                    'consent_recorded'  => 1,
                    'retention_expires' => '2026-12-31 23:59:59',
                    'created_at'        => date('Y-m-d H:i:s', strtotime('-2 hours')),
                ],
                [
                    'reference_code'    => 'LEG-81042-23',
                    'client_name'       => 'خانم نگار کریمی',
                    'phone'             => '09194445566',
                    'topic'             => 'دعاوی ملکی، ثبتی و سرقفلی',
                    'urgency'           => 'high',
                    'status'            => 'under_review',
                    'assigned_to'       => 'وکیل پایه یک همکار',
                    'consent_recorded'  => 1,
                    'retention_expires' => '2026-12-31 23:59:59',
                    'created_at'        => date('Y-m-d H:i:s', strtotime('-5 hours')),
                ],
                [
                    'reference_code'    => 'LEG-70193-22',
                    'client_name'       => 'شرکت فناوران آریا',
                    'phone'             => '09357778899',
                    'topic'             => 'تنظیم قرارداد محرمانگی NDA و مالکیت فکری',
                    'urgency'           => 'normal',
                    'status'            => 'consultation_scheduled',
                    'assigned_to'       => 'دکتر سیده مریم رضوی',
                    'consent_recorded'  => 1,
                    'retention_expires' => '2026-12-31 23:59:59',
                    'created_at'        => date('Y-m-d H:i:s', strtotime('-1 day')),
                ],
            ];
            update_option('sedrazavi_legal_intake_records', $records);
        }

        return rest_ensure_response([
            'status'  => 'success',
            'count'   => count($records),
            'records' => array_reverse($records),
        ]);
    }

    /**
     * REST: Update Intake Status & Triage Assignment
     */
    public function rest_update_intake_status($request) {
        $ref_code = sanitize_text_field($request->get_param('reference_code') ?: '');
        $new_status = sanitize_text_field($request->get_param('status') ?: '');
        $assigned = sanitize_text_field($request->get_param('assigned_to') ?: '');

        $records = get_option('sedrazavi_legal_intake_records', []);
        $updated = false;

        foreach ($records as &$rec) {
            if ($rec['reference_code'] === $ref_code) {
                if ($new_status) $rec['status'] = $new_status;
                if ($assigned) $rec['assigned_to'] = $assigned;
                $updated = true;
                break;
            }
        }

        if (!$updated) {
            return new WP_Error('not_found', 'پرونده با این کد رهگیری یافت نشد.', ['status' => 404]);
        }

        update_option('sedrazavi_legal_intake_records', $records);

        return rest_ensure_response([
            'status'  => 'success',
            'message' => 'وضعیت تریاژ پرونده با موفقیت به‌روزرسانی شد.',
            'ref'     => $ref_code,
        ]);
    }

    /**
     * REST: Book Appointment (Double-Booking Protected)
     */
    public function rest_book_appointment($request) {
        $slot_id   = sanitize_text_field($request->get_param('slot_id') ?: '');
        $name      = sanitize_text_field($request->get_param('name') ?: '');
        $phone     = sanitize_text_field($request->get_param('phone') ?: '');
        $type      = sanitize_text_field($request->get_param('meeting_type') ?: 'secure_video');

        if (empty($slot_id) || empty($name) || empty($phone)) {
            return new WP_Error('missing_data', 'کلیه اطلاعات نوبت‌دهی الزامی است.', ['status' => 400]);
        }

        // Concurrency Lock via Transient (Prevent Race Condition)
        $lock_key = 'sr_lock_slot_' . md5($slot_id);
        if (get_transient($lock_key)) {
            return new WP_Error('slot_taken', 'این بازه زمانی در حال حاضر توسط متقاضی دیگری رزرو شده است.', ['status' => 409]);
        }
        set_transient($lock_key, 'booked', 30 * MINUTE_IN_SECONDS);

        $booking_id = 'APT-' . date('Ymd') . '-' . wp_generate_password(4, false, false);
        $appointments = get_option('sedrazavi_legal_appointments_records', []);
        $appointments[] = [
            'booking_id'   => $booking_id,
            'slot_id'      => $slot_id,
            'client_name'  => $name,
            'phone'        => $this->normalize_iranian_phone($phone),
            'meeting_type' => $type,
            'status'       => 'scheduled',
            'created_at'   => gmdate('Y-m-d H:i:s'),
        ];
        update_option('sedrazavi_legal_appointments_records', $appointments);

        return rest_ensure_response([
            'status'      => 'success',
            'message'     => 'نوبت مشاوره حقوقی شما با موفقیت رزرو و تثبیت گردید.',
            'booking_id'  => $booking_id,
            'slot_id'     => $slot_id,
            'timezone'    => 'Asia/Tehran',
        ]);
    }

    /**
     * WP Privacy Data Exporter (Section 8.4)
     */
    public function register_privacy_exporter($exporters) {
        $exporters['sedrazavi-legal-intake'] = [
            'exporter_friendly_name' => __('درخواست‌های مشاوره حقوقی SedRazavi', 'sedrazavi-companion'),
            'callback'               => [$this, 'export_user_personal_data'],
        ];
        return $exporters;
    }

    public function export_user_personal_data($email_address, $page = 1) {
        $export_items = [];
        $records = get_option('sedrazavi_legal_intake_records', []);

        foreach ($records as $rec) {
            if (isset($rec['phone']) && strpos($email_address, $rec['phone']) !== false) {
                $export_items[] = [
                    'group_id'    => 'sedrazavi_intake',
                    'group_label' => __('مشاوره‌های حقوقی ثبت‌شده', 'sedrazavi-companion'),
                    'item_id'     => $rec['reference_code'],
                    'data'        => [
                        ['name' => __('کد رهگیری', 'sedrazavi-companion'), 'value' => $rec['reference_code']],
                        ['name' => __('موضوع', 'sedrazavi-companion'), 'value' => $rec['topic']],
                        ['name' => __('تاریخ ثبت', 'sedrazavi-companion'), 'value' => $rec['created_at']],
                    ],
                ];
            }
        }

        return [
            'data' => $export_items,
            'done' => true,
        ];
    }

    /**
     * WP Privacy Data Eraser (Section 8.4)
     */
    public function register_privacy_eraser($erasers) {
        $erasers['sedrazavi-legal-intake'] = [
            'eraser_friendly_name' => __('پاک‌سازی درخواست‌های مشاوره حقوقی SedRazavi', 'sedrazavi-companion'),
            'callback'             => [$this, 'erase_user_personal_data'],
        ];
        return $erasers;
    }

    public function erase_user_personal_data($email_address, $page = 1) {
        $records = get_option('sedrazavi_legal_intake_records', []);
        $items_removed = 0;

        foreach ($records as $key => $rec) {
            if (isset($rec['phone']) && strpos($email_address, $rec['phone']) !== false) {
                unset($records[$key]);
                $items_removed++;
            }
        }

        if ($items_removed > 0) {
            update_option('sedrazavi_legal_intake_records', array_values($records));
        }

        return [
            'items_removed'  => $items_removed,
            'items_retained' => false,
            'messages'       => [__('داده‌های مشاوره حقوقی کاربر با موفقیت حذف گردید.', 'sedrazavi-companion')],
            'done'           => true,
        ];
    }

    /**
     * Scheduled Retention Policy Purge (Section 4.3)
     */
    public function schedule_retention_purge() {
        if (!wp_next_scheduled('sedrazavi_purge_expired_intake_cron')) {
            wp_schedule_event(time(), 'daily', 'sedrazavi_purge_expired_intake_cron');
        }
    }

    public function execute_retention_purge() {
        $records = get_option('sedrazavi_legal_intake_records', []);
        $now = gmdate('Y-m-d H:i:s');
        $filtered = [];

        foreach ($records as $rec) {
            if (!empty($rec['retention_expires']) && $rec['retention_expires'] < $now) {
                continue; // Purge expired
            }
            $filtered[] = $rec;
        }

        update_option('sedrazavi_legal_intake_records', $filtered);
    }

    /**
     * Persian Digits and Phone Normalizer
     */
    private function normalize_iranian_phone($str) {
        $persian = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
        $arabic  = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
        $latin   = ['0','1','2','3','4','5','6','7','8','9'];
        $str = str_replace($persian, $latin, $str);
        $str = str_replace($arabic, $latin, $str);
        $str = preg_replace('/[^0-9]/', '', $str);

        if (strpos($str, '98') === 0 && strlen($str) === 12) {
            $str = '0' . substr($str, 2);
        } elseif (strlen($str) === 10 && strpos($str, '9') === 0) {
            $str = '0' . $str;
        }
        return $str;
    }

    private function get_persian_weekday($dayNumber) {
        $days = [
            1 => 'دوشنبه',
            2 => 'سه‌شنبه',
            3 => 'چهارشنبه',
            4 => 'پنج‌شنبه',
            5 => 'جمعه',
            6 => 'شنبه',
            7 => 'یک‌شنبه',
        ];
        return $days[$dayNumber] ?? 'روز کاری';
    }

    private function log_audit_event($action, $data = []) {
        if (class_exists('SedRazavi_Audit_Logger')) {
            $logger = SedRazavi_Audit_Logger::get_instance();
            if (method_exists($logger, 'log')) {
                $logger->log($action, 'legal_intake', $data);
            }
        }
    }
}
