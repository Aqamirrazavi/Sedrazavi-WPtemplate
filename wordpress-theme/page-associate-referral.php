<?php
/**
 * Template Name: شبکه همکاری و ارجاع وکلای دادگستری (Associate Referral Suite)
 * Description: Legal associate referral network, fee sharing calculator, and co-counsel ledger template.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-referral-suite-wrapper" dir="rtl" style="background-color: var(--sr-bg-body, #070D1E); color: #F8FAFC; min-height: 100vh; padding: 50px 16px;">
    <div class="container" style="max-width: 1000px; margin: 0 auto;">
        
        <div class="sedrazavi-referral-header" style="text-align: center; margin-bottom: 36px;">
            <span style="display: inline-block; padding: 4px 14px; background: rgba(16, 185, 129, 0.15); color: #34D399; border-radius: 9999px; font-size: 13px; font-weight: bold; border: 1px solid rgba(16, 185, 129, 0.3); margin-bottom: 12px;">
                🤝 پارت ۳۳ · شبکه همکاری وکلای همکار
            </span>
            <h1 style="font-size: 30px; font-weight: 800; color: #FFFFFF; margin: 0 0 12px;">
                <?php esc_html_e('شبکه ارجاع متقابل پرونده، وکالت توکیلی و تسهیم شفاف حق‌الوکاله', 'sedrazavi'); ?>
            </h1>
            <p style="color: #94A3B8; font-size: 14px; max-width: 650px; margin: 0 auto;">
                <?php esc_html_e('قراردادهای شراکت هوشمند، پیگیری لحظه‌ای اوقات دادرسی وکلای معاضدتی و تسویه حساب الکترونیک', 'sedrazavi'); ?>
            </p>
        </div>

        <div class="sedrazavi-referral-ledger-card" style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 20px; padding: 28px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="font-size: 16px; font-weight: bold; color: #FFFFFF; margin: 0;">دفتر کل ارجاعات فعال (Active Co-Counsel Ledger)</h3>
                <span style="font-size: 12px; color: #10B981; font-weight: bold;">تاییدیه کانون وکلا ✓</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
                <div style="background: rgba(15, 23, 42, 0.6); padding: 14px 18px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: bold; color: #FFFFFF;">پرونده دعاوی تجاری کیش · شعبه تجدیدنظر هرمزگان</div>
                        <div style="font-size: 11px; color: #94A3B8; margin-top: 2px;">وکیل همکار: دکتر احسان شریفی · سهم تسهیم: ۴۰٪</div>
                    </div>
                    <span style="font-size: 12px; color: #34D399; font-weight: bold;">در حال رسیدگی</span>
                </div>

                <div style="background: rgba(15, 23, 42, 0.6); padding: 14px 18px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: bold; color: #FFFFFF;">دعاوی گمرکی بندرعباس · تعزیرات حکومتی</div>
                        <div style="font-size: 11px; color: #94A3B8; margin-top: 2px;">وکیل همکار: مهندس کامران طاهری · سهم تسهیم: ۳۵٪</div>
                    </div>
                    <span style="font-size: 12px; color: #D4AF37; font-weight: bold;">تسویه نهایی</span>
                </div>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
