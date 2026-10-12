<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Standalone Shortcodes Engine
 * Enables all blocks, widgets, sections, calculators, timelines, and dashboards
 * to render seamlessly on ANY WordPress theme without requiring Elementor.
 */
class Standalone_Shortcodes {

    /**
     * Singleton instance
     */
    private static $_instance = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_standalone_assets']);
        $this->register_shortcodes();
    }

    /**
     * Enqueue independent CSS & JS for standalone blocks
     */
    public function enqueue_standalone_assets() {
        wp_register_style(
            'uas-standalone-blocks',
            UAS_URL . 'assets/css/standalone-blocks.css',
            [],
            UAS_VERSION
        );
        wp_register_script(
            'uas-standalone-blocks-js',
            UAS_URL . 'assets/js/standalone-blocks.js',
            ['jquery'],
            UAS_VERSION,
            true
        );

        // Auto enqueue if on singular post or page
        wp_enqueue_style('uas-standalone-blocks');
        wp_enqueue_script('uas-standalone-blocks-js');
    }

    /**
     * Register all shortcodes
     */
    private function register_shortcodes() {
        $shortcodes = [
            'sedrazavi_hero'             => 'render_hero',
            'sedrazavi_timeline'         => 'render_timeline',
            'sedrazavi_case_timeline'    => 'render_timeline',
            'sedrazavi_calculator'       => 'render_calculator',
            'sedrazavi_services'         => 'render_services',
            'sedrazavi_team'             => 'render_team',
            'sedrazavi_testimonials'     => 'render_testimonials',
            'sedrazavi_contact_booking'  => 'render_contact_booking',
            'sedrazavi_transactions'     => 'render_transactions',
            'sedrazavi_activity_heatmap' => 'render_heatmap',
            'sedrazavi_radar_chart'      => 'render_radar_chart',
            'sedrazavi_milestones'       => 'render_milestones',
            'sedrazavi_faq'              => 'render_faq',
            'sedrazavi_docs_hub'         => 'render_docs_hub',
        ];

        foreach ($shortcodes as $tag => $callback) {
            add_shortcode($tag, [$this, $callback]);
        }
    }

    /**
     * Helper: Get industry preset data
     */
    public static function get_preset($industry = 'lawyer') {
        $presets = [
            'lawyer' => [
                'name' => 'وکالت و داوری حقوقی',
                'title' => 'مدافع قاطع منافع و حقوق تجاری شما',
                'subtitle' => 'ارائه خدمات تخصصی حقوق بین‌الملل، ورشکستگی و دعاوی دیوان عالی کشور',
                'badge' => 'وکیل پایه یک دادگستری | کانون وکلا',
                'accent' => '#D4AF37',
                'metric_label' => 'نرخ پیروزی پرونده‌ها',
                'metric_val' => '۹۸.۴٪',
                'services' => [
                    ['title' => 'داوری بازرگانی و قراردادها', 'desc' => 'حل‌وفصل سریع دعاوی تجاری بدون مراجعه به دادگاه با احکام قطعی لازمالاجرا.'],
                    ['title' => 'جرایم اقتصادی و سایبری', 'desc' => 'دفاع تخصصی در پرونده‌های کلان مالی، ارز دیجیتال و اخلال در نظام اقتصادی.'],
                    ['title' => 'دعاوی مالیاتی و گمرکی', 'desc' => 'اعتراض به برگ تشخیص، ترخیص و دفاع در هیئت‌های حل اختلاف مالیاتی.'],
                ]
            ],
            'dentist' => [
                'name' => 'پزشکی و کلینیک دندان‌پزشکی',
                'title' => 'لبخندی ماندگار با پیشرفته‌ترین متدهای دندان‌پزشکی دیجیتال',
                'subtitle' => 'ایمپلنت فوری، ارتودنسی نامرئی و طراحی خط لبخند با ضمانت مادام‌العمر',
                'badge' => 'کلینیک تخصصی و فوق‌تخصصی VIP',
                'accent' => '#06B6D4',
                'metric_label' => 'رضایت مراجعین',
                'metric_val' => '۹۹.۲٪',
                'services' => [
                    ['title' => 'ایمپلنت دیجیتال تک‌روزه', 'desc' => 'کاشت دندان بدون جراحی و برش لثه با اسکن سه‌بعدی و کدکم.'],
                    ['title' => 'ارتودنسی نامرئی و الاینر', 'desc' => 'اصلاح ساختار فک و دندان بدون سیم و براکت‌های فلزی قابل رویت.'],
                    ['title' => 'لمینت و کامپوزیت زیبایی', 'desc' => 'طراحی مهندسی لبخند متناسب با ارگونومی چهره با ماندگاری بالا.'],
                ]
            ],
            'engineering' => [
                'name' => 'مهندسی، ساخت‌وساز و پیمانکاری',
                'title' => 'مهندسی نوآورانه سازه‌های پایدار و پروژه‌های EPC',
                'subtitle' => 'طراحی، محاسبات سازه، نظارت عالیه و اجرای ابنیه بلندمرتبه و تأسیسات',
                'badge' => 'پروانه پایه یک نظام مهندسی کشور',
                'accent' => '#F59E0B',
                'metric_label' => 'متراژ پروژه‌های اجرا شده',
                'metric_val' => '+۳۵۰,۰۰۰ m²',
                'services' => [
                    ['title' => 'طراحی سازه‌های خاص و ژئوتکنیک', 'desc' => 'محاسبات مقاوم‌سازی لرزه‌ای، نیلینگ و گودبرداری‌های عمیق شهری.'],
                    ['title' => 'مدیریت پیمان و پروژه‌های EPC', 'desc' => 'تأمین مصالح، زمان‌بندی دقیق CPM و کاهش هزینه‌های ساخت.'],
                    ['title' => 'نظارت هوشمند و BIM سه‌بعدی', 'desc' => 'مدل‌سازی اطلاعات ساختمان برای پیشگیری از تداخلات اجرایی.'],
                ]
            ],
            'agency' => [
                'name' => 'آژانس دیجیتال مارکتینگ و طراحی',
                'title' => 'رشد مقیاس‌پذیر و انفجار فروش آنلاین با کمپین‌های داده‌محور',
                'subtitle' => 'توسعه وب پرسرعت، برندینگ هوشمند و سئو با استراتژی‌های مدرن تبدیل',
                'badge' => 'آژانس خلاقیت و رشد مقیاس ۳۶۰ درجه',
                'accent' => '#8B5CF6',
                'metric_label' => 'میانگین بازگشت سرمایه (ROI)',
                'metric_val' => '+۴۲۰٪',
                'services' => [
                    ['title' => 'سئو فنی و صدرنشینی گوگل', 'desc' => 'بهینه‌سازی عمیق کدهای فرانت‌اند و فتح کلمات کلیدی درآمدزا.'],
                    ['title' => 'طراحی رابط کاربری UI/UX', 'desc' => 'خلق تجربه‌های کاربری اعتیادآور و نرخ تبدیل فراتر از استاندارد.'],
                    ['title' => 'تولید ویدیو و تبلیغات کلیکی', 'desc' => 'کمپین‌های گوگل ادز و شبکه‌های اجتماعی با کمترین هزینه به ازای لید.'],
                ]
            ],
            'saas' => [
                'name' => 'استارتاپ و نرم‌افزار ابری (SaaS)',
                'title' => 'پلتفرم ابری نسل جدید مدیریت و اتوماسیون سازمانی',
                'subtitle' => 'همگام‌سازی بلادرنگ، امنیت سازمانی و APIهای پیشرفته برای کسب‌وکارهای مدرن',
                'badge' => '۹۹.۹۹٪ آپتایم سرورهای ابری',
                'accent' => '#10B981',
                'metric_label' => 'سرعت پاسخگویی API',
                'metric_val' => '۱۴ms',
                'services' => [
                    ['title' => 'پایپ‌لاین داده و هوش تحلیلی', 'desc' => 'یکپارچه‌سازی خودکار داده‌های فروش و گزارش‌گیری Real-Time.'],
                    ['title' => 'معماری چندکاربره (Multi-Tenant)', 'desc' => 'جداسازی داده‌ها، رمزنگاری End-to-End و احراز هویت دومرحله‌ای.'],
                    ['title' => 'اتوماسیون وب‌هوک و زپیر', 'desc' => 'اتصال بدون کد به هزاران ابزار و نرم‌افزار مالی و ارتباطی.'],
                ]
            ],
            'corporate' => [
                'name' => 'هلدینگ تجاری و بازرگانی بین‌الملل',
                'title' => 'صادرات، واردات و زنجیره تأمین بدون مرز در بازارهای جهانی',
                'subtitle' => 'تسهیل ترخیص گمرکی، اعتبارات اسنادی LC و انتقال ارز با تضمین‌های بین‌المللی',
                'badge' => 'عضو اتاق بازرگانی بین‌المللی ICC',
                'accent' => '#3B82F6',
                'metric_label' => 'حجم گردش سالانه کالا',
                'metric_val' => '$۴۵M+',
                'services' => [
                    ['title' => 'حمل‌ونقل بین‌المللی و ترانزیت', 'desc' => 'مسیرهای چندوجهی دریایی، ریلی و هوایی با رهگیری لحظه‌ای کانتینر.'],
                    ['title' => 'اعتبارات اسنادی و امور صرافی', 'desc' => 'تسویه ارزی از طریق کارگزاری‌های معتبر بدون ریسک بلوکه شدن.'],
                    ['title' => 'بازاریابی صادراتی B2B', 'desc' => 'تحلیل بازارهای هدف اوراسیا و حاشیه خلیج فارس با جذب خریدار معتبر.'],
                ]
            ]
        ];

        return isset($presets[$industry]) ? $presets[$industry] : $presets['lawyer'];
    }

    /**
     * Shortcode: [sedrazavi_hero]
     */
    public function render_hero($atts) {
        $a = shortcode_atts([
            'industry' => 'lawyer',
            'style'    => 'dark',
            'cta_text' => 'دریافت مشاوره فوری',
            'cta_url'  => '#booking',
        ], $atts, 'sedrazavi_hero');

        $p = self::get_preset($a['industry']);

        ob_start();
        ?>
        <div class="uas-block-hero uas-theme-<?php echo esc_attr($a['style']); ?>" dir="rtl">
            <div class="uas-hero-overlay"></div>
            <div class="uas-hero-container">
                <div class="uas-hero-content">
                    <span class="uas-hero-badge" style="border-color: <?php echo esc_attr($p['accent']); ?>; color: <?php echo esc_attr($p['accent']); ?>;">
                        <?php echo esc_html($p['badge']); ?>
                    </span>
                    <h1 class="uas-hero-title"><?php echo esc_html($p['title']); ?></h1>
                    <p class="uas-hero-desc"><?php echo esc_html($p['subtitle']); ?></p>
                    <div class="uas-hero-actions">
                        <a href="<?php echo esc_url($a['cta_url']); ?>" class="uas-btn-primary" style="background: <?php echo esc_attr($p['accent']); ?>;">
                            <?php echo esc_html($a['cta_text']); ?>
                        </a>
                        <a href="#services" class="uas-btn-outline">مشاهده تخصص‌ها</a>
                    </div>
                    <div class="uas-hero-stats">
                        <div class="uas-stat-item">
                            <span class="uas-stat-num" style="color: <?php echo esc_attr($p['accent']); ?>;"><?php echo esc_html($p['metric_val']); ?></span>
                            <span class="uas-stat-label"><?php echo esc_html($p['metric_label']); ?></span>
                        </div>
                        <div class="uas-stat-item">
                            <span class="uas-stat-num">+۱,۲۰۰</span>
                            <span class="uas-stat-label">پرونده و پروژه موفق</span>
                        </div>
                        <div class="uas-stat-item">
                            <span class="uas-stat-num">۱۵ سال</span>
                            <span class="uas-stat-label">سابقه ارشد در مراجع عالی</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_timeline]
     */
    public function render_timeline($atts) {
        $a = shortcode_atts([
            'case_id' => 'CAS-9482-TEH',
            'title'   => 'رهگیری و تایم‌لاین زنده پرونده',
        ], $atts, 'sedrazavi_timeline');

        $steps = [
            ['title' => 'ثبت شکواییه و دادخواست اولیه در سامانه ثنا', 'date' => '۱۴۰۳/۰۸/۱۰', 'status' => 'completed', 'desc' => 'تنظیم مستندات حقوقی، الصاق ادله اثبات دعوا و ارجاع پرونده به شعبه اول.'],
            ['title' => 'ابلاغیه الکترونیکی و وقت رسیدگی دادگاه', 'date' => '۱۴۰۳/۰۸/۲۲', 'status' => 'completed', 'desc' => 'حضور در جلسه رسیدگی و ارائه لایحه دفاعیه جامع در برابر ادعای طرف مقابل.'],
            ['title' => 'ارجاع به کارشناسی رسمی دادگستری و استعلامات', 'date' => '۱۴۰۳/۰۹/۱۵', 'status' => 'in_progress', 'desc' => 'واریز دستمزد کارشناس و پیگیری اعلام نظر نهایی کارشناس سه نفره حسابرسی.'],
            ['title' => 'صدور دادنامه بدوی و ثبت اعتراض تجدیدنظر', 'date' => 'در انتظار', 'status' => 'pending', 'desc' => 'دریافت رای له موکل و آمادگی لایحه پاسخ به تجدیدنظرخواهی.'],
        ];

        ob_start();
        ?>
        <div class="uas-block-timeline" dir="rtl">
            <div class="uas-timeline-header">
                <h3><?php echo esc_html($a['title']); ?></h3>
                <span class="uas-case-tag">شناسه پیگیری: <code><?php echo esc_html($a['case_id']); ?></code></span>
            </div>
            <div class="uas-timeline-flow">
                <?php foreach ($steps as $index => $s) : ?>
                    <div class="uas-timeline-step uas-step-<?php echo esc_attr($s['status']); ?>">
                        <div class="uas-step-marker">
                            <span class="uas-step-dot"></span>
                        </div>
                        <div class="uas-step-box">
                            <div class="uas-step-head">
                                <h4 class="uas-step-title"><?php echo esc_html($s['title']); ?></h4>
                                <span class="uas-step-date"><?php echo esc_html($s['date']); ?></span>
                            </div>
                            <p class="uas-step-desc"><?php echo esc_html($s['desc']); ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_calculator]
     */
    public function render_calculator($atts) {
        $a = shortcode_atts([
            'industry' => 'lawyer',
        ], $atts, 'sedrazavi_calculator');

        $p = self::get_preset($a['industry']);

        ob_start();
        ?>
        <div class="uas-block-calculator" dir="rtl" data-industry="<?php echo esc_attr($a['industry']); ?>">
            <div class="uas-calc-head">
                <h3>محاسبه‌گر آنلاین برآورد هزینه و حق‌الوکاله (صنف: <?php echo esc_html($p['name']); ?>)</h3>
                <p>برآورد شفاف مطابق آخرین تعرفه رسمی و فرمول‌های قانونی کشور</p>
            </div>
            <div class="uas-calc-grid">
                <div class="uas-calc-field">
                    <label>بهای خواسته یا مبلغ مورد مناقشه (تومان):</label>
                    <input type="number" id="uas-calc-amount" value="500000000" min="10000000" step="50000000" class="uas-input" />
                </div>
                <div class="uas-calc-field">
                    <label>مرحله رسیدگی:</label>
                    <select id="uas-calc-stage" class="uas-select">
                        <option value="1">بدوی (دادگاه عمومی/کیفری)</option>
                        <option value="1.5">تجدیدنظر استان</option>
                        <option value="2">دیوان عالی کشور / داوری بین‌الملل</option>
                    </select>
                </div>
                <div class="uas-calc-field">
                    <label>پیچیدگی فنی و استعلامات:</label>
                    <select id="uas-calc-complexity" class="uas-select">
                        <option value="1">عادی و متداول</option>
                        <option value="1.3">پیچیده با کارشناسی سه‌نفره</option>
                        <option value="1.7">کلان اقتصادی / فرامرزی</option>
                    </select>
                </div>
            </div>
            <div class="uas-calc-result-box">
                <div class="uas-calc-total">
                    <span>برآورد تقریبی حق‌الوکاله قانونی:</span>
                    <strong id="uas-calc-output">۳۵,۰۰۰,۰۰۰ تومان</strong>
                </div>
                <button type="button" class="uas-btn-primary" onclick="alert('جهت نهایی‌سازی قرارداد و جلسه حضوری با دفتر هماهنگ فرمایید.')">
                    رزرو نوبت بررسی پرونده با این برآورد
                </button>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_services]
     */
    public function render_services($atts) {
        $a = shortcode_atts([
            'industry' => 'lawyer',
            'cols'     => '3',
        ], $atts, 'sedrazavi_services');

        $p = self::get_preset($a['industry']);

        ob_start();
        ?>
        <div class="uas-block-services uas-cols-<?php echo esc_attr($a['cols']); ?>" dir="rtl">
            <div class="uas-section-heading">
                <h2>حوزه‌های تخصصی و خدمات کلیدی</h2>
                <p>پوشش جامع نیازهای حقوقی، تجاری و دفاعی موکلین محترم</p>
            </div>
            <div class="uas-services-grid">
                <?php foreach ($p['services'] as $idx => $srv) : ?>
                    <div class="uas-service-card">
                        <div class="uas-service-icon" style="background: <?php echo esc_attr($p['accent']); ?>20; color: <?php echo esc_attr($p['accent']); ?>;">
                            <span>#0<?php echo $idx + 1; ?></span>
                        </div>
                        <h3><?php echo esc_html($srv['title']); ?></h3>
                        <p><?php echo esc_html($srv['desc']); ?></p>
                        <a href="#booking" class="uas-service-link" style="color: <?php echo esc_attr($p['accent']); ?>;">استعلام شرایط پذیرش &larr;</a>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_team]
     */
    public function render_team($atts) {
        ob_start();
        ?>
        <div class="uas-block-team" dir="rtl">
            <div class="uas-section-heading">
                <h2>تیم حقوقی و کادر وکلای همکار</h2>
                <p>متشکل از برترین وکلای پایه یک، قضات سابق و اساتید حقوق دانشگاه تهران</p>
            </div>
            <div class="uas-team-grid">
                <div class="uas-team-card">
                    <div class="uas-team-avatar">
                        <div class="uas-avatar-placeholder">س.ر</div>
                    </div>
                    <h3>سید امیر حسین رضوی فردویی</h3>
                    <span class="uas-team-role">وکیل پایه یک دادگستری و داور ارشد تجاری</span>
                    <p>۱۵ سال تجربه در دعاوی بانکی، گمرکی، ورشکستگی و بین‌الملل</p>
                </div>
                <div class="uas-team-card">
                    <div class="uas-team-avatar">
                        <div class="uas-avatar-placeholder">م.ک</div>
                    </div>
                    <h3>دکتر مریم کاظمی</h3>
                    <span class="uas-team-role">متخصص حقوق بین‌الملل و قراردادهای تجاری</span>
                    <p>پژوهشگر ارشد معاهدات داوری و دعاوی اتاق بازرگانی بین‌المللی ICC</p>
                </div>
                <div class="uas-team-card">
                    <div class="uas-team-avatar">
                        <div class="uas-avatar-placeholder">ع.م</div>
                    </div>
                    <h3>مهندس علی مرادی</h3>
                    <span class="uas-team-role">مشاور ارشد جرایم سایبری و فارنزیک دیجیتال</span>
                    <p>متخصص تحلیل داده‌های رمزارز، پرونده‌های فیشینگ و ادله دیجیتال</p>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_testimonials]
     */
    public function render_testimonials($atts) {
        ob_start();
        ?>
        <div class="uas-block-testimonials" dir="rtl">
            <div class="uas-section-heading">
                <h2>دیدگاه موکلین و مدیران عامل</h2>
                <p>رضایت‌مندی سازمان‌ها از نتایج اخذ شده در مراجع قضایی</p>
            </div>
            <div class="uas-testimonials-grid">
                <div class="uas-testimonial-card">
                    <p class="uas-testi-quote">«پرونده پیچیده ارزی هلدینگ ما که به مدت ۲ سال در دادگاه مسدود مانده بود، با درایت و تسلط فوق‌العاده آقای رضوی در کمتر از ۳ ماه به رای قطعی تبرئه رسید.»</p>
                    <div class="uas-testi-author">
                        <strong>مهندس بهنام صراف‌پور</strong>
                        <span>مدیرعامل هلدینگ توسعه صادرات پارس</span>
                    </div>
                </div>
                <div class="uas-testimonial-card">
                    <p class="uas-testi-quote">«سیستم شفاف رهگیری آنلاین پرونده و گزارش‌دهی مرحله‌به‌مرحله به ما آرامش خاطر داد. تعهد اخلاقی و تسلط قانونی ایشان کم‌نظیر است.»</p>
                    <div class="uas-testi-author">
                        <strong>دکتر نیما فرهادی</strong>
                        <span>عضو هیئت‌مدیره شرکت دارویی زیست‌فناور</span>
                    </div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_contact_booking]
     */
    public function render_contact_booking($atts) {
        ob_start();
        ?>
        <div class="uas-block-booking" id="booking" dir="rtl">
            <div class="uas-booking-box">
                <div class="uas-booking-text">
                    <h2>درخواست وقت مشاوره حقوقی تخصصی</h2>
                    <p>فرم زیر را تکمیل فرمایید تا کارشناسان دفتر حقوقی جهت هماهنگی جلسه حضوری یا آنلاین با شما تماس حاصل نمایند.</p>
                    <ul class="uas-booking-perks">
                        <li>بررسی محرمانه مدارک و دادخواست</li>
                        <li>امکان مشاوره فوری تلفنی یا ویدیو کنفرانس</li>
                        <li>برآورد واقع‌بینانه درصد موفقیت پرونده</li>
                    </ul>
                </div>
                <form class="uas-booking-form" onsubmit="event.preventDefault(); alert('درخواست مشاوره شما با موفقیت ثبت شد. شناسه پیگیری به شماره موبایل ارسال گردید.');">
                    <div class="uas-form-row">
                        <label>نام و نام خانوادگی:</label>
                        <input type="text" required placeholder="مثال: علی احمدی" class="uas-input" />
                    </div>
                    <div class="uas-form-row">
                        <label>شماره موبایل (جهت دریافت کد پیگیری):</label>
                        <input type="tel" required placeholder="09123456789" class="uas-input" pattern="09[0-9]{9}" />
                    </div>
                    <div class="uas-form-row">
                        <label>موضوع پرونده / خدمت مورد نیاز:</label>
                        <select class="uas-select">
                            <option>داوری بازرگانی و قراردادها</option>
                            <option>دعاوی ملکی و سرقفلی</option>
                            <option>جرایم اقتصادی و رایانه‌ای</option>
                            <option>دعاوی دیوان عدالت اداری</option>
                            <option>ارث، انحصار وراثت و امور حسبی</option>
                        </select>
                    </div>
                    <div class="uas-form-row">
                        <label>شرح مختصر پرونده:</label>
                        <textarea rows="3" placeholder="مختصری از موضوع و اقدامات انجام شده..." class="uas-textarea"></textarea>
                    </div>
                    <button type="submit" class="uas-btn-submit">ثبت نهایی درخواست و تخصیص شناسه پرونده</button>
                </form>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_transactions]
     */
    public function render_transactions($atts) {
        $items = [
            ['hash' => 'tx-9f82d1c', 'date' => '۱۴۰۳/۰۹/۱۲', 'title' => 'پرداخت بیعانه حق‌الوکاله بدوی', 'amount' => '۲۵,۰۰۰,۰۰۰ تومان', 'gateway' => 'زرین‌پال VIP', 'status' => 'موفق'],
            ['hash' => 'tx-84e112b', 'date' => '۱۴۰۳/۰۸/۲۵', 'title' => 'هزینه دادرسی و تمبر مالیاتی', 'amount' => '۳,۸۵۰,۰۰۰ تومان', 'gateway' => 'سامانه عدل‌ایران', 'status' => 'موفق'],
            ['hash' => 'tx-6b2a09f', 'date' => '۱۴۰۳/۰۸/۱۴', 'title' => 'دستمزد کارشناسی رسمی سه نفره', 'amount' => '۱۲,۰۰۰,۰۰۰ تومان', 'gateway' => 'سپرده دادگستری', 'status' => 'موفق'],
            ['hash' => 'tx-4c919a3', 'date' => '۱۴۰۳/۰۷/۲۸', 'title' => 'مشاوره اولیه تخصصی و تنظیم دادخواست', 'amount' => '۲,۵۰۰,۰۰۰ تومان', 'gateway' => 'کارتخوان دفتر', 'status' => 'موفق'],
        ];

        ob_start();
        ?>
        <div class="uas-block-transactions" dir="rtl">
            <div class="uas-trans-head">
                <h3>ریز تراکنش‌ها و اسناد مالی شفاف (Transaction Ledger)</h3>
                <span class="uas-badge-verified">تأیید شده با امضای دیجیتال</span>
            </div>
            <div class="uas-trans-table-wrap">
                <table class="uas-trans-table">
                    <thead>
                        <tr>
                            <th>شناسه هش (Hash)</th>
                            <th>تاریخ ثبت</th>
                            <th>شرح صورتحساب</th>
                            <th>مبلغ پرداختی</th>
                            <th>درگاه / شیوه</th>
                            <th>وضعیت</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($items as $it) : ?>
                            <tr>
                                <td><code><?php echo esc_html($it['hash']); ?></code></td>
                                <td><?php echo esc_html($it['date']); ?></td>
                                <td><strong><?php echo esc_html($it['title']); ?></strong></td>
                                <td class="uas-amount"><?php echo esc_html($it['amount']); ?></td>
                                <td><?php echo esc_html($it['gateway']); ?></td>
                                <td><span class="uas-status-pill"><?php echo esc_html($it['status']); ?></span></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_activity_heatmap]
     */
    public function render_heatmap($atts) {
        ob_start();
        ?>
        <div class="uas-block-heatmap" dir="rtl">
            <div class="uas-heatmap-head">
                <h3>ماتریس تعامل و مشارکت سالانه (Activity Contribution Heatmap)</h3>
                <span>۳۴۸ رویداد، لایحه و تراکنش ثبت شده در سال جاری</span>
            </div>
            <div class="uas-heatmap-grid">
                <?php for ($w = 0; $w < 35; $w++) : ?>
                    <div class="uas-heatmap-col">
                        <?php for ($d = 0; $d < 7; $d++) : 
                            $lvl = ($w * 7 + $d) % 5;
                            if ($lvl === 3 && $w % 3 !== 0) $lvl = 1;
                        ?>
                            <div class="uas-heat-cell uas-lvl-<?php echo $lvl; ?>" title="هفته <?php echo $w + 1; ?>: <?php echo $lvl * 3; ?> اقدام"></div>
                        <?php endfor; ?>
                    </div>
                <?php endfor; ?>
            </div>
            <div class="uas-heatmap-legend">
                <span>کمتر</span>
                <span class="uas-heat-cell uas-lvl-0"></span>
                <span class="uas-heat-cell uas-lvl-1"></span>
                <span class="uas-heat-cell uas-lvl-2"></span>
                <span class="uas-heat-cell uas-lvl-3"></span>
                <span class="uas-heat-cell uas-lvl-4"></span>
                <span>بیشتر</span>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_radar_chart]
     */
    public function render_radar_chart($atts) {
        ob_start();
        ?>
        <div class="uas-block-radar" dir="rtl">
            <div class="uas-section-heading">
                <h2>نمودار راداری حوزه‌های تخصصی دفتر</h2>
                <p>توزیع مهارت‌ها و فراوانی پیروزی پرونده‌ها بر اساس گرایش‌های حقوقی</p>
            </div>
            <div class="uas-radar-content">
                <div class="uas-radar-bars">
                    <div class="uas-radar-row">
                        <span>داوری و تجارت بین‌الملل</span>
                        <div class="uas-progress-bar"><div class="uas-bar-fill" style="width: 95%;">95%</div></div>
                    </div>
                    <div class="uas-radar-row">
                        <span>جرایم اقتصادی، بانکی و ارز دیجیتال</span>
                        <div class="uas-progress-bar"><div class="uas-bar-fill" style="width: 92%;">92%</div></div>
                    </div>
                    <div class="uas-radar-row">
                        <span>امور گمرکی و حل اختلاف مالیاتی</span>
                        <div class="uas-progress-bar"><div class="uas-bar-fill" style="width: 88%;">88%</div></div>
                    </div>
                    <div class="uas-radar-row">
                        <span>دعاوی دیوان عدالت اداری</span>
                        <div class="uas-progress-bar"><div class="uas-bar-fill" style="width: 90%;">90%</div></div>
                    </div>
                    <div class="uas-radar-row">
                        <span>دعاوی ملکی کلان، سرقفلی و اراضی</span>
                        <div class="uas-progress-bar"><div class="uas-bar-fill" style="width: 96%;">96%</div></div>
                    </div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_milestones]
     */
    public function render_milestones($atts) {
        ob_start();
        ?>
        <div class="uas-block-milestones" dir="rtl">
            <div class="uas-section-heading">
                <h2>مسیر تعالی و نقاط عطف راهبردی</h2>
                <p>مرور دستاوردهای کلیدی از تاسیس تا توسعه اکوسیستم خدمات حقوقی دیجیتال</p>
            </div>
            <div class="uas-milestones-list">
                <div class="uas-milestone-item">
                    <div class="uas-ms-year">۱۳۸۸</div>
                    <div class="uas-ms-body">
                        <h4>آغاز فعالیت حرفه‌ای و اخذ پروانه وکالت</h4>
                        <p>تاسیس دفتر وکالت متمرکز بر دعاوی کیفری و تجاری در استان تهران.</p>
                    </div>
                </div>
                <div class="uas-milestone-item">
                    <div class="uas-ms-year">۱۳۹۴</div>
                    <div class="uas-ms-body">
                        <h4>توسعه دپارتمان داوری بازرگانی بین‌الملل</h4>
                        <p>حضور در داوری‌های فرامرزی و پرونده‌های اتاق بازرگانی بین‌المللی ICC پاریس.</p>
                    </div>
                </div>
                <div class="uas-milestone-item">
                    <div class="uas-ms-year">۱۴۰۱</div>
                    <div class="uas-ms-body">
                        <h4>راه‌اندازی سامانه دیجیتال پرونده و ردیابی بلادرنگ</h4>
                        <p>اتصال به سامانه‌های ثنا و ایجاد داشبورد اختصاصی موکلین با امضای الکترونیک.</p>
                    </div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_faq]
     */
    public function render_faq($atts) {
        ob_start();
        ?>
        <div class="uas-block-faq" dir="rtl">
            <div class="uas-section-heading">
                <h2>پرسش‌های متداول موکلین</h2>
                <p>پاسخ شفاف به پرتکرارترین ابهامات حقوقی و قراردادی</p>
            </div>
            <div class="uas-faq-list">
                <details class="uas-faq-item">
                    <summary>فرآیند اعطای وکالت و ثبت قرارداد الکترونیک چگونه است؟</summary>
                    <p>تمام قراردادها در سامانه جامع خودکاربری وکلای قوه قضاییه (ثنا) به‌صورت کاملاً الکترونیکی و با رمز یکبار مصرف پیامکی شما ثبت و تایید می‌گردد و نیازی به حضور فیزیکی نیست.</p>
                </details>
                <details class="uas-faq-item">
                    <summary>نحوه پرداخت حق‌الوکاله و اقساط آن به چه صورت است؟</summary>
                    <p>حق‌الوکاله مطابق تعرفه رسمی و توافق طرفین، در قالب بیعانه اولیه و اقساط متناسب با پیشرفت مراحل رسیدگی (بدوی، تجدیدنظر و اجرای احکام) دریافت می‌شود.</p>
                </details>
                <details class="uas-faq-item">
                    <summary>آیا موکل می‌تواند در هر لحظه وضعیت پرونده را رصد کند؟</summary>
                    <p>بله، با ورود به سامانه پیگیری پرونده و وارد کردن شماره موبایل یا شناسه پرونده، کلیه ابلاغیه‌ها، لوایح ارسالی و آرای صادره در دسترس شما قرار دارد.</p>
                </details>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_docs_hub]
     * Interactive Documentation Hub in front-end or admin
     */
    public function render_docs_hub($atts) {
        $docs = [
            [
                'tag' => '[sedrazavi_hero industry="lawyer" style="dark"]',
                'title' => 'هیرو بنر سینمایی اختصاصی',
                'desc' => 'نمایش ویترین باشکوه با تیتر، آمار دستاوردها، بج تخصصی و دکمه‌های اقدام.',
                'params' => 'industry: lawyer | dentist | engineering | agency | saas | corporate, style: dark | light'
            ],
            [
                'tag' => '[sedrazavi_timeline case_id="CAS-9482-TEH"]',
                'title' => 'تایم‌لاین زنده مراحل پرونده',
                'desc' => 'رهگیری مرحله به مرحله پرونده یا پروژه با نشانگرهای تکمیل، در جریان و در انتظار.',
                'params' => 'case_id: شناسه اختصاصی پرونده موکل'
            ],
            [
                'tag' => '[sedrazavi_calculator industry="lawyer"]',
                'title' => 'محاسبه‌گر آنلاین برآورد هزینه',
                'desc' => 'محاسبه‌گر داینامیک حق‌الوکاله یا هزینه‌های خدمات متناسب با بهای خواسته و مرحله.',
                'params' => 'industry: صنف مورد نظر'
            ],
            [
                'tag' => '[sedrazavi_services industry="lawyer" cols="3"]',
                'title' => 'شبکه خدمات و تخصص‌ها',
                'desc' => 'نمایش کارت‌های خدمات با آیکون، عنوان، توضیحات و لینک مستقیم استعلام.',
                'params' => 'industry, cols: 2 | 3 | 4'
            ],
            [
                'tag' => '[sedrazavi_transactions]',
                'title' => 'دفتر کل تراکنش‌های مالی (Ledger)',
                'desc' => 'جدول حرفه‌ای ریز اسناد مالی با شناسه هش، درگاه پرداخت و مبالغ اعتبارسنجی شده.',
                'params' => 'user_id (اختیاری)'
            ],
            [
                'tag' => '[sedrazavi_activity_heatmap]',
                'title' => 'ماتریس فعالیت و مشارکت (Heatmap)',
                'desc' => 'نمایش مشارکت‌های سالانه مشابه ماتریس سبز رنگ فعالیت‌های گیت‌هاب.',
                'params' => 'سال و شناسه کاربر'
            ],
            [
                'tag' => '[sedrazavi_contact_booking]',
                'title' => 'فرم هوشمند درخواست وقت و مشاوره',
                'desc' => 'فرم امن با ولیدیشن موبایل ایران و اعتبارسنجی درخواست.',
                'params' => 'بدون نیاز به پارامتر'
            ],
            [
                'tag' => '[sedrazavi_radar_chart]',
                'title' => 'نمودار تسلط و راداری حوزه‌ها',
                'desc' => 'میله‌های پیشرفت و درصد موفقیت در گرایش‌های تخصصی.',
                'params' => 'بدون نیاز به پارامتر'
            ],
            [
                'tag' => '[sedrazavi_milestones]',
                'title' => 'نقاط عطف و مسیر رشد',
                'desc' => 'تایم‌لاین تاریخی سال‌های افتخار و رویدادهای کلیدی.',
                'params' => 'بدون نیاز به پارامتر'
            ],
            [
                'tag' => '[sedrazavi_faq]',
                'title' => 'آکاردئون پرسش‌های متداول',
                'desc' => 'آکاردئون سریع پاسخ به ابهامات موکلین با اسکیما ارگانیک.',
                'params' => 'بدون نیاز به پارامتر'
            ],
            [
                'tag' => '[uas_legal_court_calculator]',
                'title' => 'محاسبه‌گر تخصصی تعرفه دادرسی و وکالت',
                'desc' => 'برآورد تمبر مالیاتی و حق‌الوکاله مطابق آخرین آیین‌نامه تعرفه قوه قضاییه.',
                'params' => 'accent="#D4AF37" title="..."'
            ],
            [
                'tag' => '[uas_dental_treatment_cards]',
                'title' => 'کارت‌های تعرفه و ضمانت دندان‌پزشکی',
                'desc' => 'نمایش قیمت، ویژگی‌ها و کارت ضمانت کتبی درمان‌های دندان‌پزشکی دیجیتال.',
                'params' => 'accent="#06B6D4" title="..."'
            ],
            [
                'tag' => '[uas_dental_appointment_modal]',
                'title' => 'نوبت‌دهی سریع کلینیک پزشکی و دندان‌پزشکی',
                'desc' => 'فرم هوشمند دریافت نوبت معاینه حضوری با انتخاب شیفت و پزشک.',
                'params' => 'بدون نیاز به پارامتر'
            ],
            [
                'tag' => '[uas_engineering_structural_calc]',
                'title' => 'محاسبه‌گر سازه، آرماتور و بتن',
                'desc' => 'برآورد سرانگشتی وزن میلگرد، حجم بتن و زمان اجرای پروژه‌های عمرانی.',
                'params' => 'accent="#F59E0B" title="..."'
            ],
            [
                'tag' => '[uas_engineering_bim_showcase]',
                'title' => 'شناسنامه فنی و مدل‌سازی اطلاعات BIM',
                'desc' => 'معرفی سطح دقت LOD 350 و گزارش‌های کنترل تداخلات تأسیساتی.',
                'params' => 'بدون نیاز به پارامتر'
            ],
            [
                'tag' => '[uas_agency_tech_stack]',
                'title' => 'شبکه استک فناوری و توسعه آژانس',
                'desc' => 'معرفی ابزارها، فریم‌ورک‌ها و استانداردهای طراحی وردپرس و فرانت‌اند.',
                'params' => 'بدون نیاز به پارامتر'
            ],
            [
                'tag' => '[uas_corporate_incoterms_matrix]',
                'title' => 'ماتریس شرایط بازرگانی اینکوترمز ۲۰۲۰',
                'desc' => 'جدول مقایسه قواعد تجاری بین‌المللی (FOB, CIF, CFR, DDP) با خطرات و تعهدات.',
                'params' => 'بدون نیاز به پارامتر'
            ],
            [
                'tag' => '[uas_saas_pricing_matrix]',
                'title' => 'ماتریس پلن‌های اشتراک ابری (SaaS)',
                'desc' => 'جدول قیمت‌گذاری مقیاس‌پذیر با پلن‌های ماهانه، سالانه و شرکتی Enterprise.',
                'params' => 'accent="#10B981" title="..."'
            ],
            [
                'tag' => '[uas_service_pricing_table columns="3"]',
                'title' => 'جدول پکیج‌های ووکامرس و وودمارت',
                'desc' => 'سازگار ۱۰۰٪ با خرید آنلاین ووکامرس، وودمارت، جت وو بیلدر و شاپ انجین.',
                'params' => 'category="consultation" columns="3"'
            ],
            [
                'tag' => '[uas_quick_checkout_box]',
                'title' => 'فرم تسویه حساب سریع تک‌مرحله‌ای',
                'desc' => 'اتصال بدون واسطه به درگاه‌های بانکی شاپرک با ثبت شماره همراه و مبلغ دلخواه.',
                'params' => 'بدون نیاز به پارامتر'
            ]
        ];

        ob_start();
        ?>
        <div class="uas-block-docs" dir="rtl">
            <div class="uas-docs-header">
                <h2>📚 راهنمای جامع شورت‌کدهای مستقل (بدون نیاز به پوسته)</h2>
                <p>شما می‌توانید هر یک از شورت‌کدهای زیر را در هر صفحه، نوشته، ابزارک یا قالب دیگر کپی و درج نمایید:</p>
            </div>
            <div class="uas-docs-list">
                <?php foreach ($docs as $d) : ?>
                    <div class="uas-doc-card">
                        <div class="uas-doc-info">
                            <h3><?php echo esc_html($d['title']); ?></h3>
                            <p><?php echo esc_html($d['desc']); ?></p>
                            <span class="uas-doc-params">پارامترها: <code><?php echo esc_html($d['params']); ?></code></span>
                        </div>
                        <div class="uas-doc-action">
                            <input type="text" readonly value="<?php echo esc_attr($d['tag']); ?>" class="uas-copy-field" id="doc-<?php echo md5($d['tag']); ?>" />
                            <button type="button" class="uas-btn-copy" onclick="navigator.clipboard.writeText('<?php echo esc_attr($d['tag']); ?>'); alert('شورت‌کد در کلیپ‌بورد کپی شد: <?php echo esc_attr($d['tag']); ?>');">
                                کپی شورت‌کد
                            </button>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}
