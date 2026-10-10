<?php
/**
 * The front page template file for SedRazavi Law Firm
 * 100% Complete Interface matching Google AI Studio Preview
 *
 * @package SedRazavi
 * @version 2.6.0
 */

// بررسی سازگاری کامل با المنتور (Elementor Compatibility)
if (have_posts()) {
    while (have_posts()) {
        the_post();
        $elementor_data = get_post_meta(get_the_ID(), '_elementor_data', true);
        if (!empty($elementor_data)) {
            get_header();
            the_content();
            get_footer();
            exit;
        }
    }
    rewind_posts();
}

// بارگذاری سربرگ استاندارد وردپرس (هدر، منوها و متادیتا)
get_header();
?>

<!-- نقطه‌ی مانت اپلیکیشن React و کانتینر اصلی محتوای رندرشده سمت سرور -->
<div id="root" class="sedrazavi-app-mount">


<!-- بخش ۱: نکات حقوقی روز و آرای وحدت رویه دیوان عالی کشور (Legal Insights Bar) -->
<section class="legal-insights-bar-section">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="legal-insights-header">
            <div class="legal-insights-title">
                <svg class="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                    <path d="M7 21h10"/>
                    <path d="M12 3v18"/>
                </svg>
                <span>نکات حقوقی روز، قوانین موضوعه جدید و آرای وحدت رویه دیوان عالی کشور</span>
            </div>
            <span class="legal-insights-badge">استناد رسمی محاکم</span>
        </div>

        <div class="legal-insights-grid">
            <!-- کارت ۱ -->
            <a href="#articles" class="legal-insight-card">
                <div>
                    <div class="legal-insight-cat-row">
                        <span class="legal-insight-tag">بانکی و اسناد تجاری</span>
                        <span class="legal-insight-num">رأی ۸۵۲</span>
                    </div>
                    <h4 class="legal-insight-title-text">ضوابط اعتبار چک‌های تضمینی و صیادی</h4>
                </div>
                <p class="legal-insight-desc-text">رویه قطعی اجرای مستقیم ماده ۲۳ قانون صدور چک در محاکم</p>
            </a>

            <!-- کارت ۲ -->
            <a href="#articles" class="legal-insight-card">
                <div>
                    <div class="legal-insight-cat-row">
                        <span class="legal-insight-tag">املاک و اراضی</span>
                        <span class="legal-insight-num">قانون جدید</span>
                    </div>
                    <h4 class="legal-insight-title-text">الزام به ثبت رسمی معاملات اموال غیرمنقول</h4>
                </div>
                <p class="legal-insight-desc-text">سلب اعتبار از اسناد عادی و قولنامه‌های معارض در دادگستری</p>
            </a>

            <!-- کارت ۳ -->
            <a href="#articles" class="legal-insight-card">
                <div>
                    <div class="legal-insight-cat-row">
                        <span class="legal-insight-tag">حقوق خانواده</span>
                        <span class="legal-insight-num">تعدیل اقساط</span>
                    </div>
                    <h4 class="legal-insight-title-text">تعدیل اقساط مهریه و اثبات عدم استطاعت</h4>
                </div>
                <p class="legal-insight-desc-text">رویه شعب دادگاه تجدیدنظر پیرامون تورم و نوسان سکه</p>
            </a>

            <!-- کارت ۴ -->
            <a href="#articles" class="legal-insight-card">
                <div>
                    <div class="legal-insight-cat-row">
                        <span class="legal-insight-tag">داوری بین‌المللی</span>
                        <span class="legal-insight-num">اتاق پاریس ICC</span>
                    </div>
                    <h4 class="legal-insight-title-text">اعتبار شرط داوری و اجرای احکام خارجی</h4>
                </div>
                <p class="legal-insight-desc-text">مصونیت آرای داوری تجاری بین‌المللی از ابطال در محاکم داخلی</p>
            </a>
        </div>
    </div>
</section>

<!-- بخش ۲: بخش هیرو سرنوشت‌ساز و پرتره وکیل (Hero Section) -->
<section class="hero-section" id="hero">
    <div class="hero-ambient-glow-right"></div>
    <div class="hero-ambient-glow-left"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="hero-grid-layout">
            <!-- ستون راست: تیتر اصلی، نشان تجربه، چک‌لیست و دکمه‌ها -->
            <div class="hero-content-col">
                <div class="hero-badge-pill">
                    <svg class="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                    </svg>
                    <span>دکترای تخصصی حقوق خصوصی از دانشگاه تهران • بیش از ۲۰ سال سابقه وکالت</span>
                </div>

                <h1 class="hero-main-title">
                    عدالت با دقت، <span class="hero-gold-gradient">حرفه‌ای‌گری با تعهد</span>
                </h1>

                <p class="hero-slogan-text">
                    دفاعی هوشمندانه برای آینده‌ای امن؛ پاسدار حقوق و منافع شما در مراجع قضایی و بین‌المللی
                </p>

                <!-- چک‌لیست ۴ گانه -->
                <div class="hero-value-props-grid">
                    <div class="hero-value-item">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>تنظیم تخصصی لوایح و دفاع مستدل در محاکم</span>
                    </div>
                    <div class="hero-value-item">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>حفظ اسرار تجاری و ۱۰۰٪ محرمانگی اسناد</span>
                    </div>
                    <div class="hero-value-item">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>امکان تقسیط حق‌الوکاله متناسب با مراحل دادرسی</span>
                    </div>
                    <div class="hero-value-item">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>سامانه هوشمند گزارش لحظه‌ای وضعیت پرونده</span>
                    </div>
                </div>

                <!-- دکمه‌های اقدام اصلی (CTAs) -->
                <div class="hero-cta-buttons">
                    <a href="#booking" class="btn-gold-hero">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>رزرو وقت مشاوره تخصصی با وکیل</span>
                    </a>

                    <a href="#tracking" class="btn-navy-hero">
                        <svg class="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <span>استعلام برخط پرونده قضایی</span>
                    </a>
                </div>

                <!-- نوار اعتبار رسمی -->
                <div class="hero-trust-row">
                    <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-[#2A9D8F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            <path d="m9 12 2 2 4-4"/>
                        </svg>
                        <span>پروانه رسمی کانون وکلای دادگستری مرکز</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>پاسخگویی مستقیم: ۰۲۱-۸۸۹۹۰۰۱۱</span>
                    </div>
                </div>
            </div>

            <!-- ستون چپ: کارت طلایی و پرتره لوکس وکیل -->
            <div class="hero-portrait-col">
                <div class="hero-portrait-wrap">
                    <div class="hero-portrait-glow"></div>

                    <div class="hero-portrait-card">
                        <?php
                        $lawyer_hero_portrait = get_theme_mod('sedrazavi_lawyer_portrait', '');
                        if (empty($lawyer_hero_portrait)) {
                            $lawyer_hero_portrait = get_template_directory_uri() . '/screenshot.png';
                        }
                        ?>
                        <img 
                            src="<?php echo esc_url($lawyer_hero_portrait); ?>" 
                            alt="سرکار خانم دکتر سیده مریم رضوی" 
                            class="hero-portrait-image object-cover"
                        />

                        <div class="hero-floating-badge-top">
                            <span class="pulse-emerald-dot"></span>
                            <span>نوبت‌های این هفته در دسترس</span>
                        </div>

                        <div class="hero-floating-card-bottom">
                            <div>
                                <h4 class="hero-lawyer-name">سرکار خانم دکتر سیده مریم رضوی (SedRazavi)</h4>
                                <p class="hero-lawyer-title">وکیل پایه یک دادگستری و مشاور ارشد حقوقی و داوری بین‌المللی</p>
                            </div>
                            <div class="hero-exp-box">
                                ۲۰+
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۳: آمارهای کلیدی و نشان‌های اعتماد (TrustBadges) -->
<section class="trust-badges-section py-12 bg-sr-bg border-y border-sr-border relative">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div class="stat-card p-6 rounded-2xl bg-sr-surface border border-sr-border-subtle hover:border-[#D4AF37]/50 transition-all">
                <div class="text-3xl sm:text-4xl font-black font-serif text-[#D4AF37] mb-2" id="stat-cases">۱۲۸۰+</div>
                <div class="text-sm font-bold text-sr-primary mb-1">پرونده موفق دادگستری</div>
                <div class="text-xs text-sr-muted">آرای قطعی در دیوان عالی و تجدیدنظر</div>
            </div>
            <div class="stat-card p-6 rounded-2xl bg-sr-surface border border-sr-border-subtle hover:border-[#D4AF37]/50 transition-all">
                <div class="text-3xl sm:text-4xl font-black font-serif text-[#D4AF37] mb-2" id="stat-satisfaction">۹۸٪</div>
                <div class="text-sm font-bold text-sr-primary mb-1">رضایت کامل موکلین</div>
                <div class="text-xs text-sr-muted">بر اساس نظرسنجی مکتوب انتهای پرونده</div>
            </div>
            <div class="stat-card p-6 rounded-2xl bg-sr-surface border border-sr-border-subtle hover:border-[#D4AF37]/50 transition-all">
                <div class="text-3xl sm:text-4xl font-black font-serif text-[#D4AF37] mb-2" id="stat-experience">۲۰+</div>
                <div class="text-sm font-bold text-sr-primary mb-1">سال سابقه درخشان وکالت</div>
                <div class="text-xs text-sr-muted">عضو کانون وکلای دادگستری مرکز</div>
            </div>
            <div class="stat-card p-6 rounded-2xl bg-sr-surface border border-sr-border-subtle hover:border-[#D4AF37]/50 transition-all">
                <div class="text-3xl sm:text-4xl font-black font-serif text-[#D4AF37] mb-2" id="stat-contracts">۴۵۰+</div>
                <div class="text-sm font-bold text-sr-primary mb-1">قرارداد بازرگانی و داوری</div>
                <div class="text-xs text-sr-muted">تدوین و نظارت بر قراردادهای کلان</div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۴: حوزه‌های تخصصی وکالت و داوری (ServicesSection) -->
<section id="services" class="py-20 bg-sr-bg-alt relative">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>حوزه‌های تخصصی وکالت و داوری</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold font-serif text-sr-primary">
                خدمات حقوقی با استانداردهای بین‌المللی
            </h2>
            <p class="text-sm sm:text-base text-sr-muted">
                تمرکز بر تسلط علمی، تنظیم قراردادهای بازدارنده و دفاع قاطعانه از حقوق شما در محاکم دادگستری و مراجع داوری.
            </p>

            <!-- فیلترهای خدمات -->
            <div class="flex flex-wrap items-center justify-center gap-2 pt-4">
                <button class="service-filter-btn active" data-filter="all">همه خدمات</button>
                <button class="service-filter-btn" data-filter="commercial">دعاوی تجاری و شرکت‌ها</button>
                <button class="service-filter-btn" data-filter="family">خانواده و ارث</button>
                <button class="service-filter-btn" data-filter="criminal">کیفری و ملکی</button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-grid">
            <!-- خدمت ۱ -->
            <div class="service-card bg-sr-surface border border-sr-border-subtle" data-category="criminal">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4">
                    <svg class="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                        <path d="M9 22v-4h6v4"/>
                        <path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/>
                        <path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M12 10h.01"/>
                        <path d="M8 14h.01"/><path d="M16 14h.01"/><path d="M12 14h.01"/>
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-sr-primary mb-2">دعاوی ملکی، اراضی و سرقفلی</h3>
                <p class="text-xs text-sr-muted leading-relaxed mb-4">
                    الزام به تنظیم سند رسمی، خلع ید، تصرف عدوانی، پیش‌فروش ساختمان، دعاوی سرقفلی و حق کسب و پیشه در مراجع قضایی و ثبتی.
                </p>
                <div class="pt-3 border-t border-sr-border-subtle flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">کمیسیون تخصصی املاک</span>
                    <a href="#booking" class="text-xs text-sr-primary hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۲ -->
            <div class="service-card bg-sr-surface border border-sr-border-subtle" data-category="commercial">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4">
                    <svg class="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-sr-primary mb-2">دعاوی تجاری و قراردادهای بازرگانی</h3>
                <p class="text-xs text-sr-muted leading-relaxed mb-4">
                    تنظیم و بازبینی قراردادهای بین‌المللی، حل‌وفصل اختلافات شرکتی، داوری تجاری و دعاوی ورشکستگی با تضمین محرمانگی اسناد.
                </p>
                <div class="pt-3 border-t border-sr-border-subtle flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">پشتیبانی حقوقی شرکتی</span>
                    <a href="#booking" class="text-xs text-sr-primary hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۳ -->
            <div class="service-card bg-sr-surface border border-sr-border-subtle" data-category="criminal">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4">
                    <svg class="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                        <path d="M7 21h10"/>
                        <path d="M12 3v18"/>
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-sr-primary mb-2">دعاوی کیفری و جرایم اقتصادی</h3>
                <p class="text-xs text-sr-muted leading-relaxed mb-4">
                    دفاع تخصصی در پرونده‌های اختلاس، کلاهبرداری، خیانت در امانت، پولشویی و دفاع راهبردی در دادگاه‌های انقلاب و تجدیدنظر.
                </p>
                <div class="pt-3 border-t border-sr-border-subtle flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">دفاع فوری و راهبردی</span>
                    <a href="#booking" class="text-xs text-sr-primary hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۴ -->
            <div class="service-card bg-sr-surface border border-sr-border-subtle" data-category="family">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4">
                    <svg class="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-sr-primary mb-2">حقوق خانواده و انحصار وراثت</h3>
                <p class="text-xs text-sr-muted leading-relaxed mb-4">
                    رسیدگی به پرونده‌های مهریه، طلاق توافقی، حضانت فرزندان، تقسیم ترکه، تحریر ترکه و وصیت‌نامه با حداکثر سرعت و رازداری تام.
                </p>
                <div class="pt-3 border-t border-sr-border-subtle flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">طلاق توافقی در ۱۰ روز</span>
                    <a href="#booking" class="text-xs text-sr-primary hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۵ -->
            <div class="service-card bg-sr-surface border border-sr-border-subtle" data-category="commercial">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4">
                    <svg class="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="2" y1="12" x2="22" y2="12"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-sr-primary mb-2">داوری بین‌المللی و سرمایه‌گذاری</h3>
                <p class="text-xs text-sr-muted leading-relaxed mb-4">
                    داوری در قراردادهای تجاری خارجی، صادرات و واردات، ترخیص گمرکی و حل اختلافات بازرگانان در اتاق بازرگانی بین‌المللی (ICC).
                </p>
                <div class="pt-3 border-t border-sr-border-subtle flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">داوری قطعی و لازم‌الاجرا</span>
                    <a href="#booking" class="text-xs text-sr-primary hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۶ -->
            <div class="service-card bg-sr-surface border border-sr-border-subtle" data-category="commercial">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4">
                    <svg class="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-sr-primary mb-2">دیوان عدالت اداری و شهرداری‌ها</h3>
                <p class="text-xs text-sr-muted leading-relaxed mb-4">
                    اعتراض به آرای کمیسیون‌های ماده ۱۰۰ و ۹۹ شهرداری، دعاوی ابطال مصوبات غیرقانونی دولتی و اختلافات اداره کار و تامین اجتماعی.
                </p>
                <div class="pt-3 border-t border-sr-border-subtle flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">ابطال قطعی آرای معارض</span>
                    <a href="#booking" class="text-xs text-sr-primary hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>
        </div>
    </div>
<!-- بخش ۴.۵: سامانه هوشمند ممیزی قراردادها و خزانه‌گاه اسناد تجاری (Contract Audit & Drafting Suite) -->
<section id="contract-auditor-section" class="py-16 bg-sr-bg relative border-t border-sr-border-subtle">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                <span>سامانه هوشمند ممیزی قراردادها و شرط داوری</span>
            </div>
            <h2 class="text-2xl sm:text-4xl font-bold font-serif text-sr-primary">
                ممیزی حقوقی شروط قرارداد پیش از امضا
            </h2>
            <p class="text-xs sm:text-sm text-sr-muted">
                شروط خسارت، تعهدات مالی، سلب مسئولیت و شرط داوری قرارداد خود را با هوش مصنوعی وکلای پایه یک ارزیابی و اصلاح کنید.
            </p>
        </div>

        <div class="max-w-5xl mx-auto">
            <?php echo do_shortcode('[sedrazavi_contract_auditor]'); ?>
        </div>

        <div class="mt-8 text-center flex flex-wrap justify-center gap-4">
            <a href="<?php echo esc_url(home_url('/contract-audit/')); ?>" class="btn-gold py-2.5 px-6 rounded-xl text-xs font-bold shadow-lg">
                <span>ورود به پرتال کامل ممیزی قراردادها</span>
            </a>
            <a href="<?php echo esc_url(home_url('/drafting-vault/')); ?>" class="py-2.5 px-6 rounded-xl text-xs font-bold text-sr-primary border border-sr-border-subtle hover:border-[#D4AF37] bg-sr-surface-hover transition-colors">
                <span>دانلود نمونه قراردادهای استاندارد دوزبانه</span>
            </a>
        </div>
    </div>
</section>

<!-- بخش ۵: درباره وکیل و منشور اخلاق حرفه‌ای (AboutSection) -->
<section id="about" class="py-20 bg-sr-surface relative overflow-hidden border-t border-sr-border-subtle">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <!-- ستون تصویر و گواهینامه‌ها -->
            <div class="lg:col-span-5 relative">
                <div class="relative mx-auto max-w-md">
                    <div class="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#D4AF37]/30 to-[#0B132B]/10 blur-xl transform rotate-2"></div>
                    <div class="relative rounded-2xl overflow-hidden border-2 border-sr-border shadow-2xl bg-sr-surface-card">
                        <img src="<?php echo esc_url($lawyer_hero_portrait); ?>" alt="دکتر سیده مریم رضوی" class="w-full h-[500px] object-cover object-top" />
                        
                        <div class="absolute bottom-6 right-6 left-6 p-4 rounded-xl bg-sr-surface/95 backdrop-blur-md border border-sr-border shadow-xl space-y-2">
                            <div class="flex items-center gap-2 text-sr-gold font-bold text-xs">
                                <svg class="w-4 h-4 shrink-0 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                                </svg>
                                <span>رتبه برتر آزمون وکالت کانون وکلای مرکز</span>
                            </div>
                            <p class="text-xs text-sr-secondary">
                                عضو رسمی کانون وکلای دادگستری مرکز و مدرس دوره‌های تخصصی تنظیم قرارداد
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ستون متن، منشور اخلاق و سوگند وکالت -->
            <div class="lg:col-span-7 space-y-6 text-right">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                    <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                    </svg>
                    درباره وکیل دکتر سیده مریم رضوی (SedRazavi)
                </div>

                <h2 class="text-3xl sm:text-4xl font-bold font-serif text-sr-primary leading-tight">
                    دو دهه پاسداری متعهدانه از حقوق و منافع مشروع موکلین
                </h2>

                <p class="text-sm sm:text-base text-sr-secondary leading-relaxed">
                    سرکار خانم دکتر سیده مریم رضوی پس از فراغت از تحصیل در مقطع دکترای حقوق بین‌الملل و خصوصی از دانشگاه تهران و گذراندن دوره‌های تخصصی داوری بین‌المللی، دفتر وکالت خود را با نام مؤسسه حقوقی SedRazavi بنا نهاد. ایشان تاکنون وکالت بیش از ۱۲۸۰ پرونده سنگین حقوقی، ملکی، تجاری و داوری را با بالاترین درصد موفقیت بر عهده داشته است.
                </p>

                <div class="space-y-3 pt-2">
                    <h3 class="text-sm font-bold text-sr-primary">منشور اخلاق حرفه‌ای و تعهدات بنیادین:</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-sr-secondary">
                        <div class="flex items-start gap-2.5 p-3 rounded-xl bg-sr-surface-card border border-sr-border-subtle">
                            <span class="text-[#2A9D8F] font-bold">✓</span>
                            <span>بررسی واقع‌بینانه شانس پیروزی دعوا بدون امید واهی</span>
                        </div>
                        <div class="flex items-start gap-2.5 p-3 rounded-xl bg-sr-surface-card border border-sr-border-subtle">
                            <span class="text-[#2A9D8F] font-bold">✓</span>
                            <span>شفافیت کامل در قرارداد مالی و نحوه وصول حق‌الوکاله</span>
                        </div>
                        <div class="flex items-start gap-2.5 p-3 rounded-xl bg-sr-surface-card border border-sr-border-subtle">
                            <span class="text-[#2A9D8F] font-bold">✓</span>
                            <span>گزارش‌دهی مستمر و دسترسی آنلاین موکل به لوایح پرونده</span>
                        </div>
                        <div class="flex items-start gap-2.5 p-3 rounded-xl bg-sr-surface-card border border-sr-border-subtle">
                            <span class="text-[#2A9D8F] font-bold">✓</span>
                            <span>حفظ کامل اسرار شغلی، اسناد تجاری و حریم خانوادگی</span>
                        </div>
                    </div>
                </div>

                <div class="p-4 rounded-xl bg-sr-bg-alt border border-sr-border flex items-center gap-3">
                    <span class="text-2xl text-[#D4AF37]">❝</span>
                    <p class="text-xs text-sr-secondary italic">
                        «وکالت، تنها دفاع در محکمه نیست؛ معماری امن روابط تجاری و احقاق شجاعانه حق بر پایه تسلط بر موازین قانونی است.»
                    </p>
                </div>
            </div>
        </div>

        <!-- نقاط عطف و روند رشد مؤسسه حقوقی (Firm Milestones Timeline) -->
        <div class="mt-16 pt-12 border-t border-sr-border-subtle">
            <?php echo do_shortcode('[sedrazavi_react_firm_milestones]'); ?>
        </div>
    </div>
</section>

<!-- بخش ۶: رضایت موکلین و روایت تجربیات (TestimonialsSlider) -->
<section class="py-20 bg-sr-bg-alt relative overflow-hidden border-t border-sr-border-subtle">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>اعتماد و رضایت موکلین</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold font-serif text-sr-primary">
                روایت تجربه همراهی با دفتر وکالت دکتر رضوی
            </h2>
            <p class="text-sm sm:text-base text-sr-muted">
                دیدگاه موکلین گرامی پیرامون دقت نظر، پیگیری پرونده و حصول نتایج درخشان حقوقی.
            </p>
        </div>

        <div class="max-w-4xl mx-auto">
            <div class="relative bg-sr-surface rounded-3xl p-8 sm:p-12 border border-sr-border-subtle shadow-2xl">
                <div class="flex items-center justify-between mb-6">
                    <div class="flex text-[#D4AF37] gap-1 text-lg">★★★★★</div>
                    <span class="px-3 py-1 rounded-full bg-[#2A9D8F]/15 text-[#2A9D8F] text-xs font-bold border border-[#2A9D8F]/30" id="testimonial-service">
                        دعاوی ملکی و تجاری
                    </span>
                </div>

                <blockquote class="text-base sm:text-lg text-sr-secondary leading-relaxed mb-8 italic" id="testimonial-quote">
                    «تسلط علمی سرکار خانم دکتر رضوی بر قوانین ثبتی و املاک موجب شد ملکی به ارزش بیش از ۴۰۰ میلیارد ریال که با معارض جعلی مواجه شده بود، در دیوان عالی کشور کاملاً احقاق حق و سند معارض باطل گردد. رازداری و نظم بی‌نظیر ایشان ستودنی است.»
                </blockquote>

                <div class="flex items-center justify-between border-t border-sr-border-subtle pt-6">
                    <div>
                        <h4 class="font-bold text-sr-primary text-base" id="testimonial-author">مهندس علیرضا سلیمانی</h4>
                        <p class="text-xs text-sr-muted" id="testimonial-role">مدیرعامل گروه سرمایه‌گذاری پارس نوین</p>
                    </div>

                    <div class="flex items-center gap-2">
                        <button onclick="prevTestimonial()" class="p-2.5 rounded-xl bg-sr-surface-card hover:bg-[#D4AF37] hover:text-[#0B132B] text-sr-primary border border-sr-border-subtle transition-all cursor-pointer">
                            &rarr;
                        </button>
                        <button onclick="nextTestimonial()" class="p-2.5 rounded-xl bg-sr-surface-card hover:bg-[#D4AF37] hover:text-[#0B132B] text-sr-primary border border-sr-border-subtle transition-all cursor-pointer">
                            &larr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۷: جدیدترین مقالات حقوقی (ArticlesSection) -->
<section id="articles" class="py-20 bg-sr-surface relative border-t border-sr-border-subtle">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>دانش حقوقی و تحلیل آراء</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold font-serif text-sr-primary">
                جدیدترین مقالات و یادداشت‌های تخصصی
            </h2>
            <p class="text-sm sm:text-base text-sr-muted">
                بررسی جدیدترین قوانین موضوعه، رویه‌های قضایی وحدت رویه و نکات پیشگیرانه در تنظیم قراردادها.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- مقاله ۱ -->
            <article class="bg-sr-bg-alt rounded-2xl overflow-hidden border border-sr-border-subtle hover:border-[#D4AF37]/50 shadow-xl transition-all">
                <div class="relative h-48 overflow-hidden bg-sr-surface-card">
                    <img src="<?php echo esc_url(get_template_directory_uri() . '/screenshot.png'); ?>" alt="نکات کلیدی قرارداد مشارکت در ساخت" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-sr-surface/90 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">دعاوی ملکی</span>
                </div>
                <div class="p-6 space-y-3 text-right">
                    <div class="text-xs text-sr-muted flex items-center justify-between">
                        <span>۱۴۰۳/۰۵/۲۰</span>
                        <span>⏱ مطالعه: ۶ دقیقه</span>
                    </div>
                    <h3 class="text-base font-bold text-sr-primary leading-snug hover:text-[#D4AF37] transition-colors">
                        ۱۰ شرط حیاتی و غیرقابل چشم‌پوشی در قراردادهای مشارکت در ساخت
                    </h3>
                    <p class="text-xs text-sr-muted leading-relaxed">
                        تحلیل ضمانت‌اجراهای تاخیر در ساخت، حق حبس، تعیین قدرالسهم و سازوکار حل اختلاف از طریق داوری تخصصی.
                    </p>
                    <div class="pt-3 border-t border-sr-border-subtle">
                        <a href="#articles" class="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">مطالعه یادداشت کامل &larr;</a>
                    </div>
                </div>
            </article>

            <!-- مقاله ۲ -->
            <article class="bg-sr-bg-alt rounded-2xl overflow-hidden border border-sr-border-subtle hover:border-[#D4AF37]/50 shadow-xl transition-all">
                <div class="relative h-48 overflow-hidden bg-sr-surface-card">
                    <img src="<?php echo esc_url(get_template_directory_uri() . '/screenshot.png'); ?>" alt="قوانین چک صیادی" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-sr-surface/90 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">اسناد تجاری</span>
                </div>
                <div class="p-6 space-y-3 text-right">
                    <div class="text-xs text-sr-muted flex items-center justify-between">
                        <span>۱۴۰۳/۰۵/۱۵</span>
                        <span>⏱ مطالعه: ۸ دقیقه</span>
                    </div>
                    <h3 class="text-base font-bold text-sr-primary leading-snug hover:text-[#D4AF37] transition-colors">
                        راهنمای کاربردی صدور اجراییه مستقیم چک صیادی بدون دادخواست
                    </h3>
                    <p class="text-xs text-sr-muted leading-relaxed">
                        چگونه می‌توان طبق ماده ۲۳ قانون اصلاح قانون صدور چک، در کمتر از ۱۰ روز اموال صادرکننده را توقیف نمود؟
                    </p>
                    <div class="pt-3 border-t border-sr-border-subtle">
                        <a href="#articles" class="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">مطالعه یادداشت کامل &larr;</a>
                    </div>
                </div>
            </article>

            <!-- مقاله ۳ -->
            <article class="bg-sr-bg-alt rounded-2xl overflow-hidden border border-sr-border-subtle hover:border-[#D4AF37]/50 shadow-xl transition-all">
                <div class="relative h-48 overflow-hidden bg-sr-surface-card">
                    <img src="<?php echo esc_url(get_template_directory_uri() . '/screenshot.png'); ?>" alt="داوری تجاری بین‌المللی" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-sr-surface/90 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">داوری بین‌المللی</span>
                </div>
                <div class="p-6 space-y-3 text-right">
                    <div class="text-xs text-sr-muted flex items-center justify-between">
                        <span>۱۴۰۳/۰۵/۱۰</span>
                        <span>⏱ مطالعه: ۵ دقیقه</span>
                    </div>
                    <h3 class="text-base font-bold text-sr-primary leading-snug hover:text-[#D4AF37] transition-colors">
                        مزایای شرط داوری اتاق بازرگانی بین‌المللی در قراردادهای تجاری خارجی
                    </h3>
                    <p class="text-xs text-sr-muted leading-relaxed">
                        بررسی سرعت رسیدگی، اعتبار بین‌المللی رای داوری و عدم امکان ابطال آن در مراجع قضایی داخلی.
                    </p>
                    <div class="pt-3 border-t border-sr-border-subtle">
                        <a href="#articles" class="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">مطالعه یادداشت کامل &larr;</a>
                    </div>
                </div>
            </article>
        </div>
    </div>
</section>

<!-- بخش ۸: پرسش‌های متداول موکلین (FaqSection) -->
<section id="faq" class="py-20 bg-sr-bg-alt relative border-t border-sr-border-subtle">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div class="text-center space-y-4 mb-14">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>پاسخ به ابهامات رایج موکلین</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold font-serif text-sr-primary">
                پرسش‌های متداول حقوقی و وکالتی
            </h2>
            <p class="text-sm sm:text-base text-sr-muted">
                پاسخ‌های شفاف و کاربردی به متداول‌ترین سوالات موکلین در بدو ورود به پرونده.
            </p>
        </div>

        <div class="space-y-4">
            <!-- پرسش ۱ -->
            <div class="faq-item rounded-2xl bg-sr-surface border border-sr-border-subtle overflow-hidden">
                <button class="faq-question w-full p-5 text-right flex items-center justify-between font-bold text-sm text-sr-primary cursor-pointer hover:text-[#D4AF37]">
                    <span>۱. نحوه تعیین حق‌الوکاله در دفتر وکالت دکتر رضوی چگونه است؟ آیا امکان تقسیط وجود دارد؟</span>
                    <span class="faq-icon text-[#D4AF37] text-lg">+</span>
                </button>
                <div class="faq-answer hidden p-5 pt-0 text-xs text-sr-secondary leading-relaxed border-t border-sr-border-subtle">
                    حق‌الوکاله بر اساس پیچیدگی پرونده، مرحله رسیدگی (بدوی، تجدیدنظر یا فرجام‌خواهی) و مطابق آیین‌نامه تعرفه کانون وکلا تعیین می‌شود. در ۹۰٪ پرونده‌ها امکان تقسیط حق‌الوکاله متناسب با پیشرفت مراحل دادرسی فراهم می‌باشد و کلیه توافقات در قرارداد الکترونیک سامانه عدل‌ایران ثبت می‌گردد.
                </div>
            </div>

            <!-- پرسش ۲ -->
            <div class="faq-item rounded-2xl bg-sr-surface border border-sr-border-subtle overflow-hidden">
                <button class="faq-question w-full p-5 text-right flex items-center justify-between font-bold text-sm text-sr-primary cursor-pointer hover:text-[#D4AF37]">
                    <span>۲. آیا برای مشاوره اولیه حضور فیزیکی در دفتر تهران الزامی است؟</span>
                    <span class="faq-icon text-[#D4AF37] text-lg">+</span>
                </button>
                <div class="faq-answer hidden p-5 pt-0 text-xs text-sr-secondary leading-relaxed border-t border-sr-border-subtle">
                    خیر؛ موکلین مقیم شهرستان‌ها یا خارج از کشور می‌توانند پس از رزرو نوبت از طریق سامانه، جلسه مشاوره تصویری امن (از طریق گوگل‌میت یا واتساپ) یا مشاوره تلفنی داشته باشند. عقد وکالتنامه نیز از طریق سامانه میخک وزارت خارجه یا ثنای قوه قضاییه به سادگی انجام می‌شود.
                </div>
            </div>

            <!-- پرسش ۳ -->
            <div class="faq-item rounded-2xl bg-sr-surface border border-sr-border-subtle overflow-hidden">
                <button class="faq-question w-full p-5 text-right flex items-center justify-between font-bold text-sm text-sr-primary cursor-pointer hover:text-[#D4AF37]">
                    <span>۳. محرمانگی اسناد تجاری و اطلاعات پرونده چگونه تضمین می‌گردد؟</span>
                    <span class="faq-icon text-[#D4AF37] text-lg">+</span>
                </button>
                <div class="faq-answer hidden p-5 pt-0 text-xs text-sr-secondary leading-relaxed border-t border-sr-border-subtle">
                    تمامی اطلاعات پرونده‌ها و اسناد موکلین تحت نظارت مستقیم وکیل سرپرست در سرورهای محرمانه نگهداری شده و طبق سوگندنامه کانون وکلای دادگستری و قوانین رازداری حرفه‌ای، ۱۰۰٪ محرمانه و غیرقابل افشا نزد اشخاص ثالث خواهد بود.
                </div>
            </div>

            <!-- پرسش ۴ -->
            <div class="faq-item rounded-2xl bg-sr-surface border border-sr-border-subtle overflow-hidden">
                <button class="faq-question w-full p-5 text-right flex items-center justify-between font-bold text-sm text-sr-primary cursor-pointer hover:text-[#D4AF37]">
                    <span>۴. روند پیگیری لحظه‌ای پرونده برای موکل چگونه طراحی شده است؟</span>
                    <span class="faq-icon text-[#D4AF37] text-lg">+</span>
                </button>
                <div class="faq-answer hidden p-5 pt-0 text-xs text-sr-secondary leading-relaxed border-t border-sr-border-subtle">
                    پس از انعقاد قرارداد، یک کد پیگیری محرمانه به موکل اختصاص می‌یابد. موکل در هر ساعت از شبانه‌روز با درج این کد در همین وبسایت می‌تواند آخرین اقدامات دفاعی، ابلاغیه‌ها و لوایح تنظیمی را به صورت زنده رصد نماید.
                </div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۹: رزرو نوبت، استعلام پرونده و اطلاعات تماس (ContactAndBookingSection) -->
<section id="contact" class="py-20 bg-sr-surface relative border-t border-sr-border-subtle">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- استعلام پرونده (Case Tracker Card) -->
        <div id="tracking" class="mb-16 max-w-4xl mx-auto rounded-3xl p-8 bg-sr-surface-card border border-sr-border shadow-2xl">
            <div class="text-center space-y-2 mb-6">
                <span class="text-xs font-bold text-sr-gold">سامانه محرمانه موکلین</span>
                <h3 class="text-2xl font-bold font-serif text-sr-primary">پیگیری آنلاین و لحظه‌ای پرونده قضایی</h3>
                <p class="text-xs text-sr-muted">کد پرونده (مانند SR-1403-882) یا شماره همراه ثبت‌شده را وارد فرمایید:</p>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
                <input type="text" id="case-search-input" placeholder="نمونه: SR-1403-882 یا شماره همراه موکل" class="flex-1 px-4 py-3 rounded-xl bg-sr-bg border border-sr-border text-sr-primary text-sm focus:outline-none focus:border-[#D4AF37]" />
                <button onclick="searchCaseStatus()" class="btn-gold px-8 py-3 rounded-xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <span>استعلام آخرین وضعیت</span>
                </button>
            </div>

            <div id="case-result-display" class="hidden mt-6 p-5 rounded-xl bg-sr-bg border border-sr-border space-y-3">
                <div class="flex items-center justify-between border-b border-sr-border-subtle pb-2">
                    <span id="res-case-title" class="font-bold text-sr-primary text-sm"></span>
                    <span id="res-case-status" class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"></span>
                </div>
                <p id="res-case-desc" class="text-xs text-sr-secondary leading-relaxed"></p>
                <div class="flex items-center justify-between text-xs text-sr-muted pt-2">
                    <span id="res-case-branch"></span>
                    <span id="res-case-date" class="font-mono"></span>
                </div>
            </div>
        </div>

        <!-- دو ستونه: فرم رزرو نوبت + اطلاعات تماس دفتر -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <!-- ستون فرم رزرو نوبت (۷ ستون) -->
            <div id="booking" class="lg:col-span-7 bg-sr-surface-card p-8 rounded-3xl border border-sr-border-subtle shadow-xl">
                <div class="space-y-2 mb-6">
                    <span class="text-xs font-bold text-sr-gold">درخواست رسمی وقت مشاوره</span>
                    <h3 class="text-2xl font-bold font-serif text-sr-primary">ثبت نوبت مشاوره حضوری یا آنلاین</h3>
                </div>

                <form id="booking-form-main" onsubmit="handleBookingSubmit(event)" class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-sr-secondary mb-1.5">نام و نام خانوادگی موکل *</label>
                            <input type="text" required id="book-name" class="w-full px-4 py-2.5 rounded-xl bg-sr-bg border border-sr-border text-sr-primary text-sm focus:border-[#D4AF37] focus:outline-none" />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-sr-secondary mb-1.5">شماره همراه معتبر (جهت پیامک نوبت) *</label>
                            <input type="tel" required id="book-phone" placeholder="۰۹۱۲۳۴۵۶۷۸۹" class="w-full px-4 py-2.5 rounded-xl bg-sr-bg border border-sr-border text-sr-primary text-sm text-left font-mono focus:border-[#D4AF37] focus:outline-none" />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-sr-secondary mb-1.5">موضوع دعوی یا قرارداد</label>
                            <select id="book-service" class="w-full px-4 py-2.5 rounded-xl bg-sr-bg border border-sr-border text-sr-primary text-sm focus:border-[#D4AF37] focus:outline-none">
                                <option>دعاوی ملکی، اراضی و سرقفلی</option>
                                <option>دعاوی تجاری و قراردادها</option>
                                <option>دعاوی کیفری و جرایم اقتصادی</option>
                                <option>حقوق خانواده و ارث</option>
                                <option>داوری بین‌المللی</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-sr-secondary mb-1.5">نحوه برگزاری جلسه مشاوره</label>
                            <select id="book-mode" class="w-full px-4 py-2.5 rounded-xl bg-sr-bg border border-sr-border text-sr-primary text-sm focus:border-[#D4AF37] focus:outline-none">
                                <option value="in_person">جلسه حضوری در دفتر تهران (میدان ونک)</option>
                                <option value="online">مشاوره تصویری آنلاین (گوگل‌میت / واتساپ)</option>
                                <option value="phone">مشاوره تلفنی مستقیم با وکیل</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-sr-secondary mb-1.5">شرح مختصر خواسته یا روند پرونده</label>
                        <textarea id="book-notes" rows="3" placeholder="موضوع دعوی، شماره پرونده یا شعبه رسیدگی‌کننده..." class="w-full px-4 py-2.5 rounded-xl bg-sr-bg border border-sr-border text-sr-primary text-sm focus:border-[#D4AF37] focus:outline-none"></textarea>
                    </div>

                    <button type="submit" class="btn-gold w-full py-3.5 rounded-xl font-bold text-sm cursor-pointer shadow-lg">
                        ثبت و نهایی‌سازی درخواست مشاوره با وکیل
                    </button>
                </form>
            </div>

            <!-- ستون اطلاعات تماس دفتر و ساعات کاری (۵ ستون) -->
            <div class="lg:col-span-5 bg-sr-surface-card p-8 rounded-3xl border border-sr-border-subtle shadow-xl space-y-6">
                <div>
                    <span class="text-xs font-bold text-sr-gold">راه‌های ارتباط مستقیم</span>
                    <h3 class="text-2xl font-bold font-serif text-sr-primary mt-1">دفتر وکالت SedRazavi</h3>
                </div>

                <div class="space-y-4 text-xs sm:text-sm text-sr-secondary">
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-lg bg-sr-surface flex items-center justify-center text-sr-gold border border-sr-border-subtle shrink-0 mt-0.5">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                        </div>
                        <div>
                            <strong class="block text-sr-primary mb-1">نشانی دفتر مرکزی:</strong>
                            <span>تهران، میدان ونک، خیابان ملاصدرا، پلاک ۱۱۸، برج حقوقی سدید، طبقه پنجم، واحد ۱۵</span>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-sr-surface flex items-center justify-center text-sr-gold border border-sr-border-subtle shrink-0">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                        </div>
                        <div>
                            <strong class="block text-sr-primary mb-0.5">تلفن‌های دفتر:</strong>
                            <a href="tel:02188990011" class="font-mono text-sr-gold hover:underline">۰۲۱-۸۸۹۹۰۰۱۱</a> | <a href="tel:02188990012" class="font-mono text-sr-gold hover:underline">۰۲۱-۸۸۹۹۰۰۱۲</a>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-sr-surface flex items-center justify-center text-sr-gold border border-sr-border-subtle shrink-0">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                        </div>
                        <div>
                            <strong class="block text-sr-primary mb-0.5">پست الکترونیک رسمی:</strong>
                            <span class="font-mono">legal@sedrazavi.com</span>
                        </div>
                    </div>

                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-lg bg-sr-surface flex items-center justify-center text-sr-gold border border-sr-border-subtle shrink-0 mt-0.5">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                        <div>
                            <strong class="block text-sr-primary mb-1">ساعات کاری و پذیرش:</strong>
                            <p>شنبه تا چهارشنبه: ۹:۰۰ الی ۱۹:۰۰</p>
                            <p>پنج‌شنبه: ۹:۰۰ الی ۱۳:۰۰ (با تعیین وقت قبلی)</p>
                        </div>
                    </div>
                </div>

                <div class="p-4 rounded-2xl bg-sr-bg border border-sr-border-subtle text-xs text-sr-muted flex items-start gap-2.5">
                    <svg class="w-4 h-4 text-sr-gold shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span><strong class="text-sr-primary">تضمین محرمانگی:</strong> کلیه تماس‌ها، اسناد و مشاوره‌ها مطابق منشور اخلاقی کانون وکلا کاملاً محرمانه تلقی می‌گردد.</span>
                </div>
            </div>

        </div>

    </div>
</section>

<!-- پنجره‌های مودال تعاملی (Modals) -->

<!-- مودال ۱: نظرسنجی خدمات -->
<div id="survey-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/75 backdrop-blur-sm p-4">
    <div class="bg-sr-surface rounded-2xl p-6 max-w-md w-full border border-sr-border text-right space-y-4 shadow-2xl">
        <div class="flex items-center justify-between border-b border-sr-border-subtle pb-3">
            <h4 class="font-bold text-sr-primary text-sm">نظرسنجی کیفیت خدمات و رضایت موکل</h4>
            <button onclick="closeSurveyModal()" class="text-sr-muted hover:text-sr-primary cursor-pointer">&times;</button>
        </div>
        <p class="text-xs text-sr-secondary">دیدگاه ارزشمند شما ما را در ارتقای سطح استانداردهای دادرسی و پاسخگویی یاری می‌نماید.</p>
        <div class="flex items-center justify-center gap-2 text-2xl text-sr-gold py-2 cursor-pointer">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <textarea rows="3" placeholder="دیدگاه یا پیشنهاد خود را مرقوم بفرمایید..." class="w-full p-3 rounded-xl bg-sr-bg border border-sr-border text-sr-primary text-xs focus:border-[#D4AF37] focus:outline-none"></textarea>
        <button onclick="submitSurvey()" class="btn-gold w-full py-2.5 rounded-xl font-bold text-xs cursor-pointer">
            ثبت و ارسال بازخورد
        </button>
    </div>
</div>

<!-- مودال ۲: راهنمای تعاملی سایت -->
<div id="tour-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/75 backdrop-blur-sm p-4">
    <div class="bg-sr-surface rounded-2xl p-6 max-w-md w-full border border-sr-border text-right space-y-4 shadow-2xl">
        <div class="flex items-center justify-between border-b border-sr-border-subtle pb-3">
            <h4 class="font-bold text-sr-primary text-sm">راهنمای تعاملی سامانه وکالت</h4>
            <button onclick="closeTourModal()" class="text-sr-muted hover:text-sr-primary cursor-pointer">&times;</button>
        </div>
        <div class="space-y-3 text-xs text-sr-secondary">
            <div class="p-3 rounded-xl bg-sr-bg border border-sr-border-subtle">
                <strong class="text-sr-gold block mb-1">۱. نوار تحلیل‌های شاخص و آرای قضایی:</strong>
                آخرین تحلیل‌های حقوقی، قوانین ملکی و چک، و آرای وحدت رویه را مطالعه نمایید.
            </div>
            <div class="p-3 rounded-xl bg-sr-bg border border-sr-border-subtle">
                <strong class="text-sr-gold block mb-1">۲. استعلام برخط پرونده:</strong>
                با کد اختصاصی پرونده، روند لوایح و تصمیمات قضایی را به صورت ۲۴ ساعته دنبال کنید.
            </div>
            <div class="p-3 rounded-xl bg-sr-bg border border-sr-border-subtle">
                <strong class="text-sr-gold block mb-1">۳. رزرو آنلاین نوبت مشاوره:</strong>
                مشاوره حضوری در دفتر ونک، تلفنی یا تصویری خود را تنها در ۱ دقیقه رزرو فرمایید.
            </div>
        </div>
        <button onclick="closeTourModal()" class="btn-gold w-full py-2.5 rounded-xl font-bold text-xs cursor-pointer">
            متوجه شدم، ورود به سامانه
        </button>
    </div>
</div>

<!-- مودال ۳: آکادمی و مستندات -->
<div id="academy-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/75 backdrop-blur-sm p-4">
    <div class="bg-sr-surface rounded-2xl p-6 max-w-lg w-full border border-sr-border text-right space-y-4 shadow-2xl">
        <div class="flex items-center justify-between border-b border-sr-border-subtle pb-3">
            <h4 class="font-bold text-sr-primary text-sm">آکادمی و مستندات دفتر وکالت SedRazavi</h4>
            <button onclick="closeAcademyModal()" class="text-sr-muted hover:text-sr-primary cursor-pointer">&times;</button>
        </div>
        <p class="text-xs text-sr-secondary">دسترسی به فرم‌های دادخواست نمونه، قوانین موضوعه جدید و شیوه‌نامه تنظیم قراردادهای تجاری.</p>
        <div class="grid grid-cols-2 gap-3 text-xs">
            <a href="#articles" onclick="closeAcademyModal()" class="p-3 rounded-xl bg-sr-bg border border-sr-border-subtle hover:border-[#D4AF37] block">
                <div class="flex items-center gap-1.5 text-sr-gold font-bold mb-1">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                    <span>آرشیو قوانین</span>
                </div>
                <span class="text-sr-muted">قوانین چک، سرقفلی و اراضی</span>
            </a>
            <a href="#articles" onclick="closeAcademyModal()" class="p-3 rounded-xl bg-sr-bg border border-sr-border-subtle hover:border-[#D4AF37] block">
                <div class="flex items-center gap-1.5 text-sr-gold font-bold mb-1">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                        <path d="M7 21h10"/>
                        <path d="M12 3v18"/>
                    </svg>
                    <span>آرای وحدت رویه</span>
                </div>
                <span class="text-sr-muted">جدیدترین آرای دیوان عالی</span>
            </a>
        </div>
        <button onclick="closeAcademyModal()" class="w-full py-2 rounded-xl bg-sr-surface-hover text-sr-primary border border-sr-border-subtle text-xs cursor-pointer">
            بستن
        </button>
    </div>
</div>

<!-- بنر کوکی و حریم خصوصی در پایین صفحه -->
<div id="cookie-banner" class="fixed bottom-4 right-4 left-4 sm:right-auto sm:left-6 sm:max-w-md z-40 p-4 rounded-2xl bg-sr-surface/95 backdrop-blur-md border border-sr-border shadow-2xl text-right space-y-3">
    <div class="flex items-center gap-2 text-sr-gold font-bold text-xs">
        <svg class="w-4 h-4 text-sr-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <span>امنیت و محرمانگی اطلاعات موکلین</span>
    </div>
    <p class="text-[11px] text-sr-secondary leading-relaxed">
        این پایگاه حقوقی جهت ارائه خدمات مطلوب و حفاظت از اسناد، از کوکی‌های رمزنگاری‌شده بهره می‌برد.
    </p>
    <div class="flex items-center gap-2">
        <button onclick="acceptCookies()" class="btn-gold text-[11px] py-1.5 px-4 font-bold cursor-pointer">پذیرش و تایید</button>
        <button onclick="dismissCookies()" class="text-sr-muted hover:text-sr-primary text-[11px] py-1.5 px-2 cursor-pointer">انصراف</button>
    </div>
</div><!-- #root -->

<?php
get_footer();
