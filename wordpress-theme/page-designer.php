<?php
/**
 * Template Name: لندینگ طراح سایت وردپرس گوتنبرگ (WordPress Designer Landing)
 * Description: Dedicated Gutenberg-First WordPress Web Designer landing page template with 13 comprehensive sections.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-designer-landing-wrapper" dir="rtl" style="background-color: var(--sr-bg-body, #0B101E); color: #F8FAFC; min-height: 100vh;">
    
    <!-- 1. Hero Section -->
    <section class="sedrazavi-designer-hero" style="padding: 70px 16px 50px; text-align: center; background: radial-gradient(circle at top, rgba(99, 102, 241, 0.15) 0%, transparent 70%);">
        <div class="container" style="max-width: 1100px; margin: 0 auto;">
            <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 9999px; font-size: 13px; color: #818CF8; font-weight: bold; margin-bottom: 20px;">
                <span>⚡</span>
                <span><?php esc_html_e('توسعه اختصاصی وردپرس با ویرایشگر بومی گوتنبرگ', 'sedrazavi'); ?></span>
            </div>
            
            <h1 style="font-size: clamp(26px, 4vw, 44px); font-weight: 900; line-height: 1.3; margin: 0 0 18px; color: #FFFFFF;">
                <?php esc_html_e('طراحی سایت وردپرس با گوتنبرگ؛ سریع، سبک و حرفه‌ای', 'sedrazavi'); ?>
            </h1>
            
            <p style="font-size: clamp(14px, 1.8vw, 18px); color: #94A3B8; max-width: 780px; margin: 0 auto 32px; line-height: 1.8;">
                <?php esc_html_e('بدون افزونه‌های سنگین و صفحه‌سازهای کند، با تمرکز ۱۰۰٪ بر سرعت بارگذاری زیر ۲ ثانیه، سئوی فنی دقیق و تجربه کاربری بی‌نقص.', 'sedrazavi'); ?>
            </p>
            
            <div style="display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap; margin-bottom: 36px;">
                <a href="#brief-form" class="sedrazavi-btn-primary" style="display: inline-flex; align-items: center; gap: 8px; background: #6366F1; color: #FFFFFF; padding: 14px 28px; border-radius: 14px; font-weight: 800; text-decoration: none; box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);">
                    <span><?php esc_html_e('مشاوره رایگان ۲۰ دقیقه‌ای', 'sedrazavi'); ?></span>
                    <span>←</span>
                </a>
                <a href="#portfolio" class="sedrazavi-btn-secondary" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.06); color: #F1F5F9; border: 1px solid rgba(255, 255, 255, 0.15); padding: 14px 28px; border-radius: 14px; font-weight: 700; text-decoration: none;">
                    <span><?php esc_html_e('مشاهده نمونه‌کارها', 'sedrazavi'); ?></span>
                </a>
            </div>
            
            <!-- Badges -->
            <div style="display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap; font-size: 13px; color: #94A3B8;">
                <span style="display: inline-flex; align-items: center; gap: 6px;">
                    <span style="color: #10B981;">✓</span> <?php esc_html_e('تحویل ۷ روزه لندینگ', 'sedrazavi'); ?>
                </span>
                <span style="display: inline-flex; align-items: center; gap: 6px;">
                    <span style="color: #10B981;">✓</span> <?php esc_html_e('پشتیبانی فنی ۶ ماهه رایگان', 'sedrazavi'); ?>
                </span>
                <span style="display: inline-flex; align-items: center; gap: 6px;">
                    <span style="color: #10B981;">✓</span> <?php esc_html_e('سازگاری کامل موبایل و RTL', 'sedrazavi'); ?>
                </span>
            </div>
        </div>
    </section>

    <!-- 2. Social Proof Bar -->
    <section class="sedrazavi-designer-proof" style="background: rgba(15, 23, 42, 0.7); border-top: 1px solid rgba(255, 255, 255, 0.06); border-bottom: 1px solid rgba(255, 255, 255, 0.06); padding: 24px 16px;">
        <div class="container" style="max-width: 1000px; margin: 0 auto; display: flex; align-items: center; justify-content: space-around; flex-wrap: wrap; gap: 20px; text-align: center;">
            <div>
                <div style="font-size: 28px; font-weight: 900; color: #6366F1;">+۸۰</div>
                <div style="font-size: 13px; color: #94A3B8;"><?php esc_html_e('پروژه موفق وب', 'sedrazavi'); ?></div>
            </div>
            <div>
                <div style="font-size: 28px; font-weight: 900; color: #D4AF37;">۴.۹ / ۵</div>
                <div style="font-size: 13px; color: #94A3B8;"><?php esc_html_e('میانگین رضایت کارفرمایان', 'sedrazavi'); ?></div>
            </div>
            <div>
                <div style="font-size: 28px; font-weight: 900; color: #10B981;">۹۵٪</div>
                <div style="font-size: 13px; color: #94A3B8;"><?php esc_html_e('تحویل طبق موعد و تقویم', 'sedrazavi'); ?></div>
            </div>
            <div>
                <div style="font-size: 28px; font-weight: 900; color: #38BDF8;">A+</div>
                <div style="font-size: 13px; color: #94A3B8;"><?php esc_html_e('امتیاز سرعت Google PageSpeed', 'sedrazavi'); ?></div>
            </div>
        </div>
    </section>

    <!-- 3. Value Proposition (چرا من؟) -->
    <section class="sedrazavi-designer-values" style="padding: 60px 16px;">
        <div class="container" style="max-width: 1100px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="font-size: 26px; font-weight: 800; color: #FFFFFF; margin-bottom: 10px;">
                    <?php esc_html_e('چرا همکاری با یک متخصص گوتنبرگ متفاوت است؟', 'sedrazavi'); ?>
                </h2>
                <p style="color: #94A3B8; font-size: 14px; max-width: 600px; margin: 0 auto;">
                    <?php esc_html_e('ما به جای استفاده از قالب‌های آماده کند و کرک‌شده، از معماری بومی وردپرس و بلوک‌های سبک استفاده می‌کنیم.', 'sedrazavi'); ?>
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 24px;">
                    <div style="font-size: 24px; margin-bottom: 12px;">🚀</div>
                    <h3 style="font-size: 16px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;"><?php esc_html_e('سرعت بارگذاری زیر ۲ ثانیه', 'sedrazavi'); ?></h3>
                    <p style="font-size: 13px; color: #94A3B8; line-height: 1.7; margin: 0;"><?php esc_html_e('بهینه‌سازی کدهای CSS و جاوااسکریپت برای رسیدن به بالاترین امتیاز در ابزارهای GTmetrix و PageSpeed.', 'sedrazavi'); ?></p>
                </div>
                <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 24px;">
                    <div style="font-size: 24px; margin-bottom: 12px;">🎨</div>
                    <h3 style="font-size: 16px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;"><?php esc_html_e('طراحی ۱۰۰٪ اختصاصی و مدرن', 'sedrazavi'); ?></h3>
                    <p style="font-size: 13px; color: #94A3B8; line-height: 1.7; margin: 0;"><?php esc_html_e('طراحی اختصاصی متناسب با هویت برند، پالت رنگ سازمانی و بدون شباهت به قالب‌های کپی‌شده بازار.', 'sedrazavi'); ?></p>
                </div>
                <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 24px;">
                    <div style="font-size: 24px; margin-bottom: 12px;">🔍</div>
                    <h3 style="font-size: 16px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;"><?php esc_html_e('سئوی فنی و ساختار اصولی', 'sedrazavi'); ?></h3>
                    <p style="font-size: 13px; color: #94A3B8; line-height: 1.7; margin: 0;"><?php esc_html_e('تزریق اسکیماهای استاندارد Schema.org، ساختار صحیح هدینگ‌ها و ایندکس سریع در موتورهای جستجو.', 'sedrazavi'); ?></p>
                </div>
                <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 24px;">
                    <div style="font-size: 24px; margin-bottom: 12px;">📱</div>
                    <h3 style="font-size: 16px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;"><?php esc_html_e('موبایل فرست و کاملاً واکنش‌گرا', 'sedrazavi'); ?></h3>
                    <p style="font-size: 13px; color: #94A3B8; line-height: 1.7; margin: 0;"><?php esc_html_e('نمایش شیک در تمامی نمایشگرهای موبایل، تبلت و لپ‌تاپ با تایپوگرافی فارسی استاندارد.', 'sedrazavi'); ?></p>
                </div>
                <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 24px;">
                    <div style="font-size: 24px; margin-bottom: 12px;">📦</div>
                    <h3 style="font-size: 16px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;"><?php esc_html_e('تحویل سورس + ویدئو آموزشی', 'sedrazavi'); ?></h3>
                    <p style="font-size: 13px; color: #94A3B8; line-height: 1.7; margin: 0;"><?php esc_html_e('تحویل کامل سورس اختصاصی همراه با فیلم آموزشی قدم‌به‌قدم برای کارفرمایان بدون دانش فنی.', 'sedrazavi'); ?></p>
                </div>
                <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 24px;">
                    <div style="font-size: 24px; margin-bottom: 12px;">🛡️</div>
                    <h3 style="font-size: 16px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;"><?php esc_html_e('امنیت بالا و عدم وابستگی', 'sedrazavi'); ?></h3>
                    <p style="font-size: 13px; color: #94A3B8; line-height: 1.7; margin: 0;"><?php esc_html_e('کاهش شدید باگ‌های امنیتی با به حداقل رساندن افزونه‌های جانبی متفرقه و ناامن.', 'sedrazavi'); ?></p>
                </div>
            </div>
        </div>
    </section>

    <!-- 4. Services Grid -->
    <section id="services" class="sedrazavi-designer-services" style="padding: 60px 16px; background: rgba(15, 23, 42, 0.4);">
        <div class="container" style="max-width: 1100px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="font-size: 26px; font-weight: 800; color: #FFFFFF; margin-bottom: 10px;">
                    <?php esc_html_e('خدمات تخصصی طراحی و توسعه وردپرس', 'sedrazavi'); ?>
                </h2>
                <p style="color: #94A3B8; font-size: 14px;">
                    <?php esc_html_e('راهکارهای جامع متناسب با نیازهای استارتاپ‌ها، کسب‌وکارهای نوپا و شرکت‌های معتبر', 'sedrazavi'); ?>
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
                <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 20px; padding: 28px;">
                    <div style="color: #6366F1; font-size: 20px; font-weight: 800; margin-bottom: 8px;">۱. طراحی سایت شرکتی با گوتنبرگ</div>
                    <p style="color: #94A3B8; font-size: 13px; line-height: 1.7; margin-bottom: 18px;">
                        <?php esc_html_e('معرفی هویت سازمانی، خدمات، کاتالوگ و فرم‌های استعلام قیمت با معماری سبک گوتنبرگ.', 'sedrazavi'); ?>
                    </p>
                    <a href="#brief-form" style="color: #818CF8; font-size: 13px; font-weight: bold; text-decoration: none;">ثبت درخواست ←</a>
                </div>

                <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 20px; padding: 28px;">
                    <div style="color: #10B981; font-size: 20px; font-weight: 800; margin-bottom: 8px;">۲. طراحی فروشگاه آنلاین ووکامرس</div>
                    <p style="color: #94A3B8; font-size: 13px; line-height: 1.7; margin-bottom: 18px;">
                        <?php esc_html_e('سبد خرید سریع، تسویه‌حساب تک‌مرحله‌ای، اتصال درگاه بانکی مستقیم و مدیریت آسان موجودی.', 'sedrazavi'); ?>
                    </p>
                    <a href="#brief-form" style="color: #34D399; font-size: 13px; font-weight: bold; text-decoration: none;">ثبت درخواست ←</a>
                </div>

                <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 20px; padding: 28px;">
                    <div style="color: #D4AF37; font-size: 20px; font-weight: 800; margin-bottom: 8px;">۳. لندینگ‌پیج فروش و کمپین تبلیغاتی</div>
                    <p style="color: #94A3B8; font-size: 13px; line-height: 1.7; margin-bottom: 18px;">
                        <?php esc_html_e('صفحات فرود متمرکز بر نرخ تبدیل (CRO) با کپی‌رایتینگ ترغیب‌کننده و سازگار با گوگل ادز.', 'sedrazavi'); ?>
                    </p>
                    <a href="#brief-form" style="color: #FBBF24; font-size: 13px; font-weight: bold; text-decoration: none;">ثبت درخواست ←</a>
                </div>

                <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 20px; padding: 28px;">
                    <div style="color: #38BDF8; font-size: 20px; font-weight: 800; margin-bottom: 8px;">۴. بهینه‌سازی سرعت و Core Web Vitals</div>
                    <p style="color: #94A3B8; font-size: 13px; line-height: 1.7; margin-bottom: 18px;">
                        <?php esc_html_e('کاهش حجم صفحات، بهینه‌سازی دیتابیس، کش لبه CDN و رفع خطاهای کندی سرور.', 'sedrazavi'); ?>
                    </p>
                    <a href="#brief-form" style="color: #7DD3FC; font-size: 13px; font-weight: bold; text-decoration: none;">ثبت درخواست ←</a>
                </div>

                <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(244, 63, 94, 0.2); border-radius: 20px; padding: 28px;">
                    <div style="color: #F43F5E; font-size: 20px; font-weight: 800; margin-bottom: 8px;">۵. بازطراحی و رفع باگ سایت‌های قدیمی</div>
                    <p style="color: #94A3B8; font-size: 13px; line-height: 1.7; margin-bottom: 18px;">
                        <?php esc_html_e('مهاجرت از صفحه‌سازهای سنگین به گوتنبرگ بدون از دست رفتن رتبه‌های گوگل و اطلاعات پیشین.', 'sedrazavi'); ?>
                    </p>
                    <a href="#brief-form" style="color: #FB7185; font-size: 13px; font-weight: bold; text-decoration: none;">ثبت درخواست ←</a>
                </div>

                <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 20px; padding: 28px;">
                    <div style="color: #A855F7; font-size: 20px; font-weight: 800; margin-bottom: 8px;">۶. مشاوره و بریف‌نویسی پروژه وب</div>
                    <p style="color: #94A3B8; font-size: 13px; line-height: 1.7; margin-bottom: 18px;">
                        <?php esc_html_e('تحلیل فیچرهای موردنیاز، انتخاب هاست مناسب و برآورد دقیق بودجه و زمان‌بندی واقع‌بینانه.', 'sedrazavi'); ?>
                    </p>
                    <a href="#brief-form" style="color: #C084FC; font-size: 13px; font-weight: bold; text-decoration: none;">ثبت درخواست ←</a>
                </div>
            </div>
        </div>
    </section>

    <!-- 5. Portfolio Section -->
    <section id="portfolio" class="sedrazavi-designer-portfolio" style="padding: 60px 16px;">
        <div class="container" style="max-width: 1100px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="font-size: 26px; font-weight: 800; color: #FFFFFF; margin-bottom: 10px;">
                    <?php esc_html_e('گزیده نمونه‌کارهای اخیر', 'sedrazavi'); ?>
                </h2>
                <p style="color: #94A3B8; font-size: 14px;">
                    <?php esc_html_e('پروژه‌های طراحی‌شده با بالاترین کیفیت اجرایی و بالاترین نرخ رضایت کارفرما', 'sedrazavi'); ?>
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
                <!-- Portfolio Card 1 -->
                <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; overflow: hidden;">
                    <div style="height: 180px; background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%); display: flex; align-items: center; justify-content: center; font-size: 40px;">
                        💻
                    </div>
                    <div style="padding: 24px;">
                        <span style="font-size: 11px; font-weight: bold; color: #6366F1; background: rgba(99, 102, 241, 0.15); padding: 4px 10px; border-radius: 9999px;">گوتنبرگ بومی</span>
                        <h3 style="font-size: 17px; font-weight: 800; color: #FFFFFF; margin: 12px 0 8px;">سایت شرکتی هلدینگ توسعه فناوری</h3>
                        <p style="font-size: 13px; color: #94A3B8; line-height: 1.6; margin-bottom: 16px;">
                            طراحی اختصاصی با گوتنبرگ، سرعت بارگذاری ۱.۲ ثانیه، کسب رتبه اول در کلمات کلیدی سازمانی.
                        </p>
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #10B981; font-weight: bold;">
                            <span>رشد بازدید: +۱۸۰٪</span>
                            <span style="color: #818CF8;">مشاهده کیس‌استادی ←</span>
                        </div>
                    </div>
                </div>

                <!-- Portfolio Card 2 -->
                <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; overflow: hidden;">
                    <div style="height: 180px; background: linear-gradient(135deg, #064E3B 0%, #065F46 100%); display: flex; align-items: center; justify-content: center; font-size: 40px;">
                        🛍️
                    </div>
                    <div style="padding: 24px;">
                        <span style="font-size: 11px; font-weight: bold; color: #10B981; background: rgba(16, 185, 129, 0.15); padding: 4px 10px; border-radius: 9999px;">ووکامرس سریع</span>
                        <h3 style="font-size: 17px; font-weight: 800; color: #FFFFFF; margin: 12px 0 8px;">فروشگاه آنلاین محصولات چرمی و اکسسوری</h3>
                        <p style="font-size: 13px; color: #94A3B8; line-height: 1.6; margin-bottom: 16px;">
                            تسویه‌حساب تک‌مرحله‌ای، سبد خرید ایجکس و افزایش ۴۰ درصدی نرخ تکمیل خرید کاربران.
                        </p>
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #10B981; font-weight: bold;">
                            <span>فروش ماه اول: +۳۵۰ میلیون</span>
                            <span style="color: #34D399;">مشاهده کیس‌استادی ←</span>
                        </div>
                    </div>
                </div>

                <!-- Portfolio Card 3 -->
                <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; overflow: hidden;">
                    <div style="height: 180px; background: linear-gradient(135deg, #3B0764 0%, #581C87 100%); display: flex; align-items: center; justify-content: center; font-size: 40px;">
                        🚀
                    </div>
                    <div style="padding: 24px;">
                        <span style="font-size: 11px; font-weight: bold; color: #A855F7; background: rgba(168, 85, 247, 0.15); padding: 4px 10px; border-radius: 9999px;">لندینگ فروش</span>
                        <h3 style="font-size: 17px; font-weight: 800; color: #FFFFFF; margin: 12px 0 8px;">لندینگ کمپین تبلیغاتی استارتاپ هوش مصنوعی</h3>
                        <p style="font-size: 13px; color: #94A3B8; line-height: 1.6; margin-bottom: 16px;">
                            تحویل ۴ روزه، بهینه‌شده برای کمپین‌های گوگل ادز با نرخ تبدیل خیره‌کننده ۱۲ درصدی لیدها.
                        </p>
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #10B981; font-weight: bold;">
                            <span>جذب ۲,۱۰۰ کاربر در هفته اول</span>
                            <span style="color: #C084FC;">مشاهده کیس‌استادی ←</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 6. Process Timeline -->
    <section class="sedrazavi-designer-process" style="padding: 60px 16px; background: rgba(15, 23, 42, 0.4);">
        <div class="container" style="max-width: 900px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="font-size: 26px; font-weight: 800; color: #FFFFFF; margin-bottom: 10px;">
                    <?php esc_html_e('فرآیند گام‌به‌گام همکاری شفاف', 'sedrazavi'); ?>
                </h2>
                <p style="color: #94A3B8; font-size: 14px;">
                    <?php esc_html_e('از ثبت بریف اولیه تا تحویل و آموزش نهایی بدون ابهام و تاخیر', 'sedrazavi'); ?>
                </p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; gap: 18px; align-items: flex-start; background: rgba(30, 41, 59, 0.4); padding: 20px; border-radius: 16px; border-right: 4px solid #6366F1;">
                    <span style="font-size: 20px; font-weight: 900; color: #6366F1; min-width: 28px;">۱.</span>
                    <div>
                        <h4 style="font-size: 15px; font-weight: 800; color: #FFFFFF; margin: 0 0 6px;">دریافت بریف و مشاوره اولیه</h4>
                        <p style="font-size: 13px; color: #94A3B8; margin: 0; line-height: 1.6;">بررسی دقیق اهداف کسب‌وکار، پرسونای مخاطب، رقبا و پیشنهاد استراتژی ساختار سایت.</p>
                    </div>
                </div>
                <div style="display: flex; gap: 18px; align-items: flex-start; background: rgba(30, 41, 59, 0.4); padding: 20px; border-radius: 16px; border-right: 4px solid #10B981;">
                    <span style="font-size: 20px; font-weight: 900; color: #10B981; min-width: 28px;">۲.</span>
                    <div>
                        <h4 style="font-size: 15px; font-weight: 800; color: #FFFFFF; margin: 0 0 6px;">طراحی ساختار و چیدمان وایرفریم</h4>
                        <p style="font-size: 13px; color: #94A3B8; margin: 0; line-height: 1.6;">چیدمان بلوک‌ها، سلسله‌مراتب بصری، مسیر کاربر و تاییدیه کارفرما قبل از کدنویسی نهایی.</p>
                    </div>
                </div>
                <div style="display: flex; gap: 18px; align-items: flex-start; background: rgba(30, 41, 59, 0.4); padding: 20px; border-radius: 16px; border-right: 4px solid #D4AF37;">
                    <span style="font-size: 20px; font-weight: 900; color: #D4AF37; min-width: 28px;">۳.</span>
                    <div>
                        <h4 style="font-size: 15px; font-weight: 800; color: #FFFFFF; margin: 0 0 6px;">توسعه تمیز با بلوک‌های گوتنبرگ</h4>
                        <p style="font-size: 13px; color: #94A3B8; margin: 0; line-height: 1.6;">کدنویسی بدون پلاگین‌های اضافی، پیاده‌سازی افکت‌های ملایم و سازگاری کامل با استانداردهای وردپرس.</p>
                    </div>
                </div>
                <div style="display: flex; gap: 18px; align-items: flex-start; background: rgba(30, 41, 59, 0.4); padding: 20px; border-radius: 16px; border-right: 4px solid #38BDF8;">
                    <span style="font-size: 20px; font-weight: 900; color: #38BDF8; min-width: 28px;">۴.</span>
                    <div>
                        <h4 style="font-size: 15px; font-weight: 800; color: #FFFFFF; margin: 0 0 6px;">بهینه‌سازی سرعت و تست در تمام دستگاه‌ها</h4>
                        <p style="font-size: 13px; color: #94A3B8; margin: 0; line-height: 1.6;">تست روی آیفون، اندروید، مک و ویندوز و بهینه‌سازی دقیق Core Web Vitals برای بارگذاری آنی.</p>
                    </div>
                </div>
                <div style="display: flex; gap: 18px; align-items: flex-start; background: rgba(30, 41, 59, 0.4); padding: 20px; border-radius: 16px; border-right: 4px solid #A855F7;">
                    <span style="font-size: 20px; font-weight: 900; color: #A855F7; min-width: 28px;">۵.</span>
                    <div>
                        <h4 style="font-size: 15px; font-weight: 800; color: #FFFFFF; margin: 0 0 6px;">تحویل نهایی، ویدیو آموزشی و آموزش پنل</h4>
                        <p style="font-size: 13px; color: #94A3B8; margin: 0; line-height: 1.6;">ضبط فیلم آموزشی نحوه تغییر متون و تصاویر، تحویل دسترسی‌ها و شروع دوره پشتیبانی فنی رایگان.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 7. Pricing Packages -->
    <section class="sedrazavi-designer-pricing" style="padding: 60px 16px;">
        <div class="container" style="max-width: 1000px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="font-size: 26px; font-weight: 800; color: #FFFFFF; margin-bottom: 10px;">
                    <?php esc_html_e('پلن‌های تعرفه شفاف و بدون هزینه پنهان', 'sedrazavi'); ?>
                </h2>
                <p style="color: #94A3B8; font-size: 14px;">
                    <?php esc_html_e('انتخاب متناسب با مرحله رشد و بودجه کسب‌وکار شما', 'sedrazavi'); ?>
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
                <!-- Plan 1 -->
                <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 28px;">
                    <h3 style="font-size: 18px; font-weight: 800; color: #FFFFFF; margin-bottom: 6px;">لندینگ‌پیج سریع</h3>
                    <p style="font-size: 12px; color: #94A3B8; margin-bottom: 18px;">مناسب کمپین‌ها و معرفی محصول</p>
                    <div style="font-size: 24px; font-weight: 900; color: #6366F1; margin-bottom: 20px;">۱۲,۵۰۰,۰۰۰ <span style="font-size: 13px; color: #94A3B8;">تومان</span></div>
                    <ul style="list-style: none; padding: 0; margin: 0 0 24px; font-size: 13px; color: #CBD5E1; line-height: 2;">
                        <li>✓ طراحی با گوتنبرگ سبک</li>
                        <li>✓ تحویل ۷ روز کاری</li>
                        <li>✓ ۳ ماه پشتیبانی رایگان</li>
                        <li>✓ فیلم آموزشی مدیریت محتوا</li>
                    </ul>
                    <a href="#brief-form" style="display: block; text-align: center; background: rgba(99, 102, 241, 0.15); color: #818CF8; border: 1px solid rgba(99, 102, 241, 0.3); padding: 12px; border-radius: 12px; font-weight: bold; text-decoration: none;">انتخاب این پلن</a>
                </div>

                <!-- Plan 2 (Featured) -->
                <div style="background: rgba(30, 41, 59, 0.7); border: 2px solid #6366F1; border-radius: 20px; padding: 28px; position: relative; box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.3);">
                    <span style="position: absolute; top: -12px; right: 24px; background: #6366F1; color: #FFFFFF; font-size: 11px; font-weight: bold; padding: 3px 12px; border-radius: 9999px;">پیشنهاد ویژه</span>
                    <h3 style="font-size: 18px; font-weight: 800; color: #FFFFFF; margin-bottom: 6px;">سایت شرکتی کامل</h3>
                    <p style="font-size: 12px; color: #94A3B8; margin-bottom: 18px;">معرفی خدمات و اعتبار برند</p>
                    <div style="font-size: 24px; font-weight: 900; color: #10B981; margin-bottom: 20px;">۲۴,۰۰۰,۰۰۰ <span style="font-size: 13px; color: #94A3B8;">تومان</span></div>
                    <ul style="list-style: none; padding: 0; margin: 0 0 24px; font-size: 13px; color: #CBD5E1; line-height: 2;">
                        <li>✓ ۵ تا ۸ برگه اختصاصی</li>
                        <li>✓ سئوی تکنیکال اولیه کامل</li>
                        <li>✓ امتیاز بالای ۹۰ در PageSpeed</li>
                        <li>✓ ۶ ماه پشتیبانی فنی مستقیم</li>
                    </ul>
                    <a href="#brief-form" style="display: block; text-align: center; background: #6366F1; color: #FFFFFF; padding: 12px; border-radius: 12px; font-weight: bold; text-decoration: none;">انتخاب پلن شرکتی</a>
                </div>

                <!-- Plan 3 -->
                <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 28px;">
                    <h3 style="font-size: 18px; font-weight: 800; color: #FFFFFF; margin-bottom: 6px;">فروشگاه آنلاین ووکامرس</h3>
                    <p style="font-size: 12px; color: #94A3B8; margin-bottom: 18px;">فروش نامحدود محصولات فیزیکی/دیجیتال</p>
                    <div style="font-size: 24px; font-weight: 900; color: #D4AF37; margin-bottom: 20px;">۳۸,۰۰۰,۰۰۰ <span style="font-size: 13px; color: #94A3B8;">تومان</span></div>
                    <ul style="list-style: none; padding: 0; margin: 0 0 24px; font-size: 13px; color: #CBD5E1; line-height: 2;">
                        <li>✓ اتصال درگاه‌های بانکی و پستی</li>
                        <li>✓ پنل پیامکی خودکار وضعیت سفارش</li>
                        <li>✓ سبد خرید سریع و واکنش‌گرا</li>
                        <li>✓ پشتیبانی و نگهداری ۱ ساله</li>
                    </ul>
                    <a href="#brief-form" style="display: block; text-align: center; background: rgba(212, 175, 55, 0.15); color: #D4AF37; border: 1px solid rgba(212, 175, 55, 0.3); padding: 12px; border-radius: 12px; font-weight: bold; text-decoration: none;">سفارش فروشگاه آنلاین</a>
                </div>
            </div>
        </div>
    </section>

    <!-- 8. Interactive Brief Form Section -->
    <section id="brief-form" class="sedrazavi-designer-brief" style="padding: 60px 16px; background: rgba(15, 23, 42, 0.5);">
        <div class="container" style="max-width: 760px; margin: 0 auto; background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 36px 24px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="font-size: 24px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;">
                    <?php esc_html_e('ثبت سریع بریف و درخواست مشاوره رایگان', 'sedrazavi'); ?>
                </h2>
                <p style="color: #94A3B8; font-size: 13px;">
                    <?php esc_html_e('اطلاعات کلی پروژه خود را ارسال کنید تا در کمتر از ۲ ساعت کاری جهت تحلیل اولیه با شما تماس بگیریم.', 'sedrazavi'); ?>
                </p>
            </div>

            <form method="post" action="" style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div>
                        <label style="display: block; font-size: 13px; font-weight: bold; margin-bottom: 6px; color: #CBD5E1;">نام و نام خانوادگی *</label>
                        <input type="text" placeholder="مثال: علی رضایی" style="width: 100%; padding: 12px 14px; border-radius: 12px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); color: #FFFFFF; font-size: 13px;" required />
                    </div>
                    <div>
                        <label style="display: block; font-size: 13px; font-weight: bold; margin-bottom: 6px; color: #CBD5E1;">شماره موبایل جهت هماهنگی *</label>
                        <input type="tel" placeholder="۰۹۱۲۳۴۵۶۷۸۹" style="width: 100%; padding: 12px 14px; border-radius: 12px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); color: #FFFFFF; font-size: 13px;" required />
                    </div>
                </div>

                <div>
                    <label style="display: block; font-size: 13px; font-weight: bold; margin-bottom: 6px; color: #CBD5E1;">نوع پروژه درخواستی</label>
                    <select style="width: 100%; padding: 12px 14px; border-radius: 12px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); color: #FFFFFF; font-size: 13px;">
                        <option>طراحی سایت شرکتی با گوتنبرگ</option>
                        <option>طراحی فروشگاه آنلاین ووکامرس</option>
                        <option>لندینگ‌پیج فروش و کمپین تبلیغاتی</option>
                        <option>بهینه‌سازی سرعت و بازطراحی سایت فعلی</option>
                        <option>مشاوره تخصصی و تحلیل بریف</option>
                    </select>
                </div>

                <div>
                    <label style="display: block; font-size: 13px; font-weight: bold; margin-bottom: 6px; color: #CBD5E1;">توضیحات کوتاه درباره امکانات و اهداف پروژه</label>
                    <textarea rows="4" placeholder="آدرس سایت فعلی، امکانات خاص مدنظر، یا نمونه‌سایت‌هایی که مدنظرتان است..." style="width: 100%; padding: 12px 14px; border-radius: 12px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); color: #FFFFFF; font-size: 13px; resize: vertical;"></textarea>
                </div>

                <button type="submit" class="sedrazavi-btn-submit" style="background: #6366F1; color: #FFFFFF; border: none; padding: 14px; border-radius: 14px; font-weight: 800; font-size: 15px; cursor: pointer; margin-top: 8px;">
                    <?php esc_html_e('ارسال بریف و دریافت مشاوره فوری', 'sedrazavi'); ?>
                </button>
            </form>
        </div>
    </section>

</div>

<?php
get_footer();
