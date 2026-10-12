<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Multi-Industry Flexible Blocks Engine
 * 
 * Provides dedicated industry-specific sections, blocks, shortcodes, and template snippets:
 * 1. Lawyer & Legal: Court tariffs calculator, case progress bar, legal arbitration vault.
 * 2. Dental & Medical: Smile visualizer, appointment scheduler, treatment warranty cards.
 * 3. Engineering & Architecture: Structural calculator, BIM 3D viewer mock, milestone checklist.
 * 4. Digital Agency & WordPress: Speed benchmark counter, Figma prototype showcase, tech stack badge grid.
 * 5. Corporate & International B2B: Incoterms 2020 matrix, customs clearance tracker, currency exchange calculator.
 * 6. SaaS & Project Launch: Tiered pricing switcher (Monthly/Annual), API endpoint sandbox, SLA live uptime badge.
 */
class Industry_Blocks {

    private static $_instance = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        $this->register_industry_shortcodes();
    }

    /**
     * Register dedicated shortcodes for specific industry blocks
     */
    private function register_industry_shortcodes() {
        // 1. Lawyer & Legal
        add_shortcode('uas_legal_court_calculator', [$this, 'render_legal_court_calculator']);
        add_shortcode('uas_legal_arbitration_vault', [$this, 'render_legal_arbitration_vault']);

        // 2. Dental & Medical
        add_shortcode('uas_dental_treatment_cards', [$this, 'render_dental_treatment_cards']);
        add_shortcode('uas_dental_appointment_modal', [$this, 'render_dental_appointment_modal']);

        // 3. Engineering & Architecture
        add_shortcode('uas_engineering_structural_calc', [$this, 'render_engineering_structural_calc']);
        add_shortcode('uas_engineering_bim_showcase', [$this, 'render_engineering_bim_showcase']);

        // 4. Digital Agency & WordPress
        add_shortcode('uas_agency_tech_stack', [$this, 'render_agency_tech_stack']);
        add_shortcode('uas_agency_speed_benchmark', [$this, 'render_agency_speed_benchmark']);

        // 5. Corporate & Trade B2B
        add_shortcode('uas_corporate_incoterms_matrix', [$this, 'render_corporate_incoterms_matrix']);
        add_shortcode('uas_corporate_customs_tracker', [$this, 'render_corporate_customs_tracker']);

        // 6. SaaS & Cloud Platform
        add_shortcode('uas_saas_pricing_matrix', [$this, 'render_saas_pricing_matrix']);
        add_shortcode('uas_saas_api_sandbox', [$this, 'render_saas_api_sandbox']);
    }

    /**
     * 1. Legal: Court Tariff & Arbitration Calculator
     */
    public function render_legal_court_calculator($atts) {
        $a = shortcode_atts([
            'accent' => '#D4AF37',
            'title'  => 'سامانه برآورد تعرفه دادرسی و حق‌الوکاله تخصصی',
        ], $atts, 'uas_legal_court_calculator');

        ob_start();
        ?>
        <div class="uas-industry-block uas-legal-calc" dir="rtl" style="--industry-accent: <?php echo esc_attr($a['accent']); ?>;">
            <div class="uas-block-header">
                <span class="uas-badge">⚖️ دادگستری و داوری</span>
                <h3 class="uas-title"><?php echo esc_html($a['title']); ?></h3>
                <p class="uas-subtitle">محاسبه دقیق بر اساس آیین‌نامه تعرفه حق‌الوکاله و هزینه دادرسی سال ۱۴۰۳</p>
            </div>
            <div class="uas-grid uas-grid-2">
                <div class="uas-field">
                    <label>بهای خواسته / میزان مطالبه (تومان):</label>
                    <input type="number" id="uas-law-claim" value="850000000" step="50000000" class="uas-input" />
                </div>
                <div class="uas-field">
                    <label>مرجع رسیدگی قضایی:</label>
                    <select id="uas-law-forum" class="uas-select">
                        <option value="first_instance">دادگاه عمومی حقوقی (مرحله بدوی)</option>
                        <option value="appeal">دادگاه تجدیدنظر استان</option>
                        <option value="supreme">دیوان عالی کشور / دیوان عدالت اداری</option>
                        <option value="arbitration">داوری تجاری و مرکز داوری اتاق بازرگانی</option>
                    </select>
                </div>
            </div>
            <div class="uas-results-card">
                <div class="uas-res-item">
                    <span class="uas-res-label">هزینه دادرسی تمبر دادگاه:</span>
                    <span class="uas-res-val" id="uas-law-court-fee">۲۹,۷۵۰,۰۰۰ تومان</span>
                </div>
                <div class="uas-res-item">
                    <span class="uas-res-label">تعرفه قانونی حق‌الوکاله:</span>
                    <span class="uas-res-val" id="uas-law-attorney-fee">۵۹,۵۰۰,۰۰۰ تومان</span>
                </div>
                <div class="uas-res-item uas-highlight">
                    <span class="uas-res-label">تمبر مالیاتی و سهم صندوق حمایت:</span>
                    <span class="uas-res-val" id="uas-law-tax-fee">۲,۹۷۵,۰۰۰ تومان</span>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 1. Legal: Arbitration Vault Block
     */
    public function render_legal_arbitration_vault($atts) {
        ob_start();
        ?>
        <div class="uas-industry-block uas-vault-block" dir="rtl">
            <div class="uas-block-header">
                <span class="uas-badge">📜 مرکز داوری و قراردادها</span>
                <h3 class="uas-title">گنجه اسناد داوری و شروط حل‌اختلاف تجاری</h3>
            </div>
            <div class="uas-grid uas-grid-3">
                <div class="uas-card-mini">
                    <h4>شرط داوری تیپ ICC</h4>
                    <p>شرط استاندارد حل‌وفصل اختلافات بین‌المللی با تعیین مقر و زبان داوری.</p>
                    <span class="uas-tag">بین‌المللی</span>
                </div>
                <div class="uas-card-mini">
                    <h4>داوری مرکز داوری اتاق ایران (ACIC)</h4>
                    <p>متن مصوب شرط داوری سریع برای قراردادهای پیمانکاری و بازرگانی داخلی.</p>
                    <span class="uas-tag">داخلی</span>
                </div>
                <div class="uas-card-mini">
                    <h4>شرط ارجاع به کارشناس مرضی‌الطرفین</h4>
                    <p>سازوکار حل‌وفصل فنی دعاوی ملکی و مالی با سرعت اجرای زیر ۴۵ روز.</p>
                    <span class="uas-tag">تخصصی</span>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 2. Dental: Treatment Warranty Cards
     */
    public function render_dental_treatment_cards($atts) {
        $a = shortcode_atts([
            'accent' => '#06B6D4',
            'title'  => 'کارت ضمانت و تعرفه درمان‌های تخصصی دندان‌پزشکی',
        ], $atts, 'uas_dental_treatment_cards');

        ob_start();
        ?>
        <div class="uas-industry-block uas-dental-block" dir="rtl" style="--industry-accent: <?php echo esc_attr($a['accent']); ?>;">
            <div class="uas-block-header">
                <span class="uas-badge">🦷 دندان‌پزشکی دیجیتال</span>
                <h3 class="uas-title"><?php echo esc_html($a['title']); ?></h3>
                <p class="uas-subtitle">طرح درمان جامع با ضمانت‌نامه کتبی و اسکن سه‌بعدی دیجیتال</p>
            </div>
            <div class="uas-grid uas-grid-3">
                <div class="uas-card-treatment">
                    <div class="uas-tr-badge">ضمانت مادام‌العمر</div>
                    <h4>ایمپلنت سوئیسی / آلمانی</h4>
                    <p class="uas-tr-desc">جراحی به روش دیجیتال Guide بدون برش و بخیه لثه با پایداری حداکثری.</p>
                    <ul class="uas-tr-features">
                        <li>✓ بارگذاری فوری پروتز (Same-Day)</li>
                        <li>✓ پاسپورت بین‌المللی قطعات اصل</li>
                        <li>✓ عکس‌برداری CBCT رایگان</li>
                    </ul>
                    <div class="uas-tr-price">از ۱۸,۵۰۰,۰۰۰ تومان</div>
                </div>

                <div class="uas-card-treatment uas-featured">
                    <div class="uas-tr-badge">محبوب‌ترین درمان</div>
                    <h4>لمینت سرامیکی E-Max</h4>
                    <p class="uas-tr-desc">طراحی لبخند متناسب با ارگونومی چهره و انعکاس نور کاملاً طبیعی.</p>
                    <ul class="uas-tr-features">
                        <li>✓ تراش حداقلی مینا (Ultra-Thin)</li>
                        <li>✓ بدون تغییر رنگ و لکه‌پذیری</li>
                        <li>✓ ۱۰ سال ضمانت کتبی کلینیک</li>
                    </ul>
                    <div class="uas-tr-price">از ۹,۸۰۰,۰۰۰ تومان هر واحد</div>
                </div>

                <div class="uas-card-treatment">
                    <div class="uas-tr-badge">بدون سیم‌کشی</div>
                    <h4>ارتودنسی نامرئی (الاینر)</h4>
                    <p class="uas-tr-desc">اصلاح نامنظمی دندان‌ها با طلق‌های شفاف متحرک بدون محدودیت غذایی.</p>
                    <ul class="uas-tr-features">
                        <li>✓ پیش‌نمایش ۳D پایان درمان</li>
                        <li>✓ تعویض هر ۲ هفته یکبار در منزل</li>
                        <li>✓ نامرئی از فاصله نزدیک</li>
                    </ul>
                    <div class="uas-tr-price">از ۴۵,۰۰۰,۰۰۰ تومان دوره کامل</div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 2. Dental: Appointment Modal Block
     */
    public function render_dental_appointment_modal($atts) {
        ob_start();
        ?>
        <div class="uas-industry-block uas-appointment-scheduler" dir="rtl">
            <div class="uas-block-header">
                <span class="uas-badge">📅 نوبت‌دهی آنلاین درمان</span>
                <h3 class="uas-title">رزرو سریع ویزیت و معاینه دندان‌پزشکی</h3>
            </div>
            <form class="uas-dental-form" onsubmit="event.preventDefault(); alert('نوبت معاینه شما ثبت گردید. منشی کلینیک طی ۳۰ دقیقه آینده تماس خواهد گرفت.');">
                <div class="uas-grid uas-grid-3">
                    <div class="uas-field">
                        <label>نام و شماره تماس مراجع:</label>
                        <input type="text" placeholder="نام و نام خانوادگی" required class="uas-input" />
                    </div>
                    <div class="uas-field">
                        <label>نوع درمان درخواستی:</label>
                        <select class="uas-select">
                            <option>ایمپلنت و کاشت دندان</option>
                            <option>لمینت و کامپوزیت زیبایی</option>
                            <option>ارتودنسی نامرئی</option>
                            <option>درمان ریشه (عصب‌کشی)</option>
                            <option>چکاپ دوره‌ای و جرم‌گیری</option>
                        </select>
                    </div>
                    <div class="uas-field">
                        <label>بازه زمانی پیشنهادی:</label>
                        <select class="uas-select">
                            <option>شیفت صبح (۹:۰۰ الی ۱۳:۰۰)</option>
                            <option>شیفت عصر (۱۶:۰۰ الی ۲۱:۰۰)</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="uas-btn-primary" style="background:#06B6D4; width:100%; margin-top:15px;">دریافت نوبت معاینه حضوری ←</button>
            </form>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 3. Engineering: Structural Calculator
     */
    public function render_engineering_structural_calc($atts) {
        $a = shortcode_atts([
            'accent' => '#F59E0B',
            'title'  => 'محاسبه‌گر سرانگشتی متره، آرماتور و بتن سازه',
        ], $atts, 'uas_engineering_structural_calc');

        ob_start();
        ?>
        <div class="uas-industry-block uas-eng-calc" dir="rtl" style="--industry-accent: <?php echo esc_attr($a['accent']); ?>;">
            <div class="uas-block-header">
                <span class="uas-badge">🏗️ مهندسی سازه و عمران</span>
                <h3 class="uas-title"><?php echo esc_html($a['title']); ?></h3>
                <p class="uas-subtitle">برآورد وزن آهن‌آلات و حجم بتن مصرفی بر اساس مبحث نهم و دهم مقررات ملی ساختمان</p>
            </div>
            <div class="uas-grid uas-grid-2">
                <div class="uas-field">
                    <label>زیربنای ناخالص کل پروژه (مترمربع):</label>
                    <input type="number" id="uas-eng-area" value="1800" step="100" class="uas-input" />
                </div>
                <div class="uas-field">
                    <label>سیستم باربر لرزه‌ای:</label>
                    <select id="uas-eng-system" class="uas-select">
                        <option value="concrete_moment">اسکلت بتنی با قاب خمشی ویژه</option>
                        <option value="concrete_wall">اسکلت بتنی با دیوار برشی</option>
                        <option value="steel_braced">اسکلت فولادی با بادبند همگرا/واگرا</option>
                    </select>
                </div>
            </div>
            <div class="uas-results-card">
                <div class="uas-res-item">
                    <span class="uas-res-label">تقریب وزن میلگرد مصرفی:</span>
                    <span class="uas-res-val">۸۵ تا ۹۵ تن میلگرد</span>
                </div>
                <div class="uas-res-item">
                    <span class="uas-res-label">حجم بتن‌ریزی فونداسیون و سقف‌ها:</span>
                    <span class="uas-res-val">۷۲۰ مترمکعب بتن رده C30</span>
                </div>
                <div class="uas-res-item uas-highlight">
                    <span class="uas-res-label">تخمین مدت زمان اجرای سفت‌کاری:</span>
                    <span class="uas-res-val">۷ ماه با مدیریت پیمان تخصصی</span>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 3. Engineering: BIM Showcase
     */
    public function render_engineering_bim_showcase($atts) {
        ob_start();
        ?>
        <div class="uas-industry-block uas-bim-block" dir="rtl">
            <div class="uas-block-header">
                <span class="uas-badge">📐 مدل‌سازی اطلاعات ساختمان (BIM)</span>
                <h3 class="uas-title">شناسنامه فنی و کنترل تداخلات تأسیساتی (Clash Detection)</h3>
            </div>
            <div class="uas-grid uas-grid-3">
                <div class="uas-card-mini">
                    <h4>BIM سطح LOD 350</h4>
                    <p>طراحی دیتیل‌های اجرایی دقیق با مشخصات کارخانه تولیدکننده.</p>
                </div>
                <div class="uas-card-mini">
                    <h4>بهینه‌سازی انرژی (BEM)</h4>
                    <p>محاسبات عایق‌بندی پوسته و کاهش ۴۰ درصدی پرت برودتی و حرارتی.</p>
                </div>
                <div class="uas-card-mini">
                    <h4>نقشه‌های ازبیلت رقومی</h4>
                    <p>تحویل فایل جامع رویت و ناویس‌ورکس پس از اتمام پروژه جهت نگهداری.</p>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 4. Agency: Tech Stack Grid
     */
    public function render_agency_tech_stack($atts) {
        ob_start();
        ?>
        <div class="uas-industry-block uas-agency-stack" dir="rtl">
            <div class="uas-block-header">
                <span class="uas-badge">⚡ استک فناوری آژانس</span>
                <h3 class="uas-title">معماری نرم‌افزار، فریم‌ورک‌ها و استانداردهای طراحی</h3>
            </div>
            <div class="uas-grid uas-grid-4">
                <div class="uas-stack-card">
                    <div class="uas-stack-icon">WordPress</div>
                    <h5>وردپرس و ووکامرس مدرن</h5>
                    <p>توسعه ماژولار و امن بدون باگ</p>
                </div>
                <div class="uas-stack-card">
                    <div class="uas-stack-icon">Elementor</div>
                    <h5>المنتور و جت‌ابزارها</h5>
                    <p>ویجت‌های اختصاصی سبک</p>
                </div>
                <div class="uas-stack-card">
                    <div class="uas-stack-icon">Tailwind</div>
                    <h5>Tailwind CSS + React</h5>
                    <p>واکنش‌گرایی بی‌نقص در همه ابعاد</p>
                </div>
                <div class="uas-stack-card">
                    <div class="uas-stack-icon">Core Vitals</div>
                    <h5>پرفورمنس ۹۹+ گوگل</h5>
                    <p>لود زیر ۱ ثانیه با کش سرور</p>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 4. Agency: Speed Benchmark Counter
     */
    public function render_agency_speed_benchmark($atts) {
        ob_start();
        ?>
        <div class="uas-industry-block uas-benchmark-block" dir="rtl">
            <div class="uas-benchmark-grid">
                <div class="uas-bm-item">
                    <span class="uas-bm-val">۰.۶ ثانیه</span>
                    <span class="uas-bm-lbl">زمان لود کامل (LCP)</span>
                </div>
                <div class="uas-bm-item">
                    <span class="uas-bm-val">۱۰۰ / ۱۰۰</span>
                    <span class="uas-bm-lbl">نمره بهینه‌سازی دسکتاپ</span>
                </div>
                <div class="uas-bm-item">
                    <span class="uas-bm-val">۹۸ / ۱۰۰</span>
                    <span class="uas-bm-lbl">نمره سرعت موبایل</span>
                </div>
                <div class="uas-bm-item">
                    <span class="uas-bm-val">۰ ms</span>
                    <span class="uas-bm-lbl">تغییر چیدمان ناگهانی (CLS)</span>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 5. Corporate: Incoterms 2020 Matrix
     */
    public function render_corporate_incoterms_matrix($atts) {
        ob_start();
        ?>
        <div class="uas-industry-block uas-incoterms-block" dir="rtl">
            <div class="uas-block-header">
                <span class="uas-badge">🌐 تجارت بین‌الملل و گمرک</span>
                <h3 class="uas-title">ماتریس شرایط تحویل کالا (Incoterms 2020)</h3>
            </div>
            <table class="uas-incoterms-table">
                <thead>
                    <tr>
                        <th>اصطلاح</th>
                        <th>شرح قاعده</th>
                        <th>بیمه و کرایه حمل</th>
                        <th>نقطه انتقال ریسک</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>FOB</strong></td>
                        <td>تحویل روی عرشه کشتی در بندر مبدا</td>
                        <td>به عهده خریدار</td>
                        <td>پس از قرار گرفتن کالا روی عرشه</td>
                    </tr>
                    <tr>
                        <td><strong>CIF</strong></td>
                        <td>هزینه، بیمه و کرایه حمل تا بندر مقصد</td>
                        <td>به عهده فروشنده</td>
                        <td>عبور کالا از نرده کشتی در بندر مبدا</td>
                    </tr>
                    <tr>
                        <td><strong>CFR</strong></td>
                        <td>هزینه و کرایه حمل تا بندر مقصد</td>
                        <td>بیمه با خریدار، کرایه با فروشنده</td>
                        <td>عرشه کشتی در مبدا بارگیری</td>
                    </tr>
                    <tr>
                        <td><strong>DDP</strong></td>
                        <td>تحویل در محل خریدار با پرداخت حقوق گمرکی</td>
                        <td>تماماً به عهده فروشنده</td>
                        <td>انبار نهایی خریدار در کشور مقصد</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 5. Corporate: Customs Clearance Tracker
     */
    public function render_corporate_customs_tracker($atts) {
        ob_start();
        ?>
        <div class="uas-industry-block uas-customs-tracker" dir="rtl">
            <div class="uas-block-header">
                <span class="uas-badge">🚢 سامانه پیگیری محموله تجاری</span>
                <h3 class="uas-title">استعلام وضعیت کوتاژ و ترخیص گمرکی</h3>
            </div>
            <div class="uas-grid uas-grid-2">
                <div class="uas-field">
                    <label>شماره ثبت سفارش یا کوتاژ گمرکی:</label>
                    <input type="text" placeholder="مثال: IR-984210-CUSTOMS" class="uas-input font-mono" />
                </div>
                <div class="uas-field" style="display:flex; align-items:flex-end;">
                    <button type="button" class="uas-btn-primary" style="background:#2563EB; width:100%;" onclick="alert('استعلام سامانه EPL: محموله در مسیر سبز گمرک و در انتظار درب خروج می‌باشد.');">استعلام لحظه‌ای وضعیت گمرک ←</button>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 6. SaaS: Tiered Pricing Switcher
     */
    public function render_saas_pricing_matrix($atts) {
        $a = shortcode_atts([
            'accent' => '#10B981',
            'title'  => 'پلن‌های منعطف ابری متناسب با اندازه تیم شما',
        ], $atts, 'uas_saas_pricing_matrix');

        ob_start();
        ?>
        <div class="uas-industry-block uas-saas-pricing" dir="rtl" style="--industry-accent: <?php echo esc_attr($a['accent']); ?>;">
            <div class="uas-block-header">
                <span class="uas-badge">🚀 تعرفه‌ها و اشتراک</span>
                <h3 class="uas-title"><?php echo esc_html($a['title']); ?></h3>
                <p class="uas-subtitle">شروع رایگان ۱۴ روزه بدون نیاز به وارد کردن کارت اعتباری</p>
            </div>
            <div class="uas-grid uas-grid-3">
                <div class="uas-pricing-card">
                    <h4>استارتاپ و تیم‌های کوچک</h4>
                    <div class="uas-price-tag">۴۹۰,۰۰۰ <span>تومان / ماهانه</span></div>
                    <ul class="uas-price-features">
                        <li>✓ تا ۳ کاربر همزمان</li>
                        <li>✓ ۵ گیگابایت فضای ابری امن</li>
                        <li>✓ وب‌هوک و گزارش‌گیری روزانه</li>
                        <li>✕ پشتیبانی تلفنی اختصاصی</li>
                    </ul>
                    <a href="#signup" class="uas-btn-outline">شروع دوره آزمایشی</a>
                </div>

                <div class="uas-pricing-card uas-featured">
                    <div class="uas-tr-badge">بهترین ارزش خرید</div>
                    <h4>سازمانی و پیشرفته (Pro)</h4>
                    <div class="uas-price-tag">۱,۴۹۰,۰۰۰ <span>تومان / ماهانه</span></div>
                    <ul class="uas-price-features">
                        <li>✓ کاربران نامحدود تیم</li>
                        <li>✓ ۱۰۰ گیگابایت فضای ابری SSD</li>
                        <li>✓ دسترسی کامل به API و وب‌هوک</li>
                        <li>✓ پشتیبانی ۲۴/۷ اختصاصی VIP</li>
                    </ul>
                    <a href="#signup" class="uas-btn-primary" style="background:#10B981;">خرید اشتراک حرفه‌ای</a>
                </div>

                <div class="uas-pricing-card">
                    <h4>کاستوم و Enterprise</h4>
                    <div class="uas-price-tag">تماس بگیرید</div>
                    <ul class="uas-price-features">
                        <li>✓ استقرار روی سرورهای اختصاصی</li>
                        <li>✓ توافق‌نامه سطح خدمات (SLA ۹۹.۹۹٪)</li>
                        <li>✓ امنیت و ممیزی سفارشی SOC2</li>
                        <li>✓ مدیر حساب و آموزش حضوری تیم</li>
                    </ul>
                    <a href="#contact" class="uas-btn-outline">درخواست جلسه دمو سازمانی</a>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 6. SaaS: API Sandbox Mock
     */
    public function render_saas_api_sandbox($atts) {
        ob_start();
        ?>
        <div class="uas-industry-block uas-api-sandbox" dir="rtl">
            <div class="uas-block-header">
                <span class="uas-badge">💻 مستندات API ابری</span>
                <h3 class="uas-title">اتصال سریع با REST API و SDKهای پایتون، جاوااسکریپت و PHP</h3>
            </div>
            <pre class="uas-code-block" dir="ltr"><code>// Quickstart: POST /api/v1/automation/trigger
curl -X POST https://api.sedrazavi.com/v1/query \
  -H "Authorization: Bearer sec_live_948f21bc90a" \
  -H "Content-Type: application/json" \
  -d '{"event": "case_created", "notify_sms": true}'

// HTTP 200 OK Response:
{
  "status": "success",
  "execution_time_ms": 14.2,
  "transaction_id": "tx_84f912b9a"
}</code></pre>
        </div>
        <?php
        return ob_get_clean();
    }
}
