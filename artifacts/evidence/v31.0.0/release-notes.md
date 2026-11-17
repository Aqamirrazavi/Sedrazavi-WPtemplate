# یادداشت‌های انتشار نسخه v31.0.0 — اکوسیستم مستقل و پایدار سیدرضوی (SedRazavi)
## Release Notes — SedRazavi Native Portability & Controlled Banks Suite v31.0.0

**تاریخ بسته‌بندی نهایی:** ۱۷ نوامبر ۲۰۲۶ (2026-11-17)  
**معمار و توسعه‌دهنده:** سید امیر حسین رضوی فردوئی (@sedrazavi)  
**مبنای استاندارد:** Native Portability Spec v31 + Phased Execution Roadmap v3 + Master Plan v31  
**وضعیت راستی‌آزمایی:** تمامی بررسی‌های استاتیک Node AST، JSZip، TypeScript و Vite با موفقیت انجام شد (`STATICALLY_CHECKED` / `TESTED`). تست‌های زنده PHP/WordPress/Docker در این کانتینر بدون باینری PHP اجرا نشده‌اند (`NOT_RUN` / `BLOCKED`) و از طریق `docker compose -f docker-compose.test.yml` آماده اجرا هستند.

---

### خلاصه تغییرات و دستاوردهای ۱۲ فاز (Executive Summary)

1. **فاز ۰ و ۱ — ممیزی بنیادین، تفکیک وضعیت و رفع ریسک‌های P0:**
   - جداسازی دقیق شواهد استاتیک از تست زنده و استقرار `SedRazavi_Case_Data_Service` با وضعیت `private` و کنترل مالکیت شیء (Anti-IDOR).
2. **فاز ۲ — معماری یکپارچه و مانیفست دارایی (`Asset_Manifest`):**
   - بارگذاری تفکیک‌شده در سطوح `frontend`، `editor` و `admin` بدون ثبت‌های تکراری.
3. **فاز ۳ — نصب تمیز وردپرس و انعطاف‌پذیری Free/Pro:**
   - افزودن هوک‌های فعال‌سازی/غیرفعال‌سازی و `uninstall.php` سازگار با Multisite برای هر ۴ افزونه و پل `Theme_Builder_Bridge`.
4. **فاز ۴ — سیستم طراحی و توکن‌های متمرکز (`tokens.json` & `variables.css`):**
   - همگام‌سازی خودکار با Elementor Active Kit، حالت تاریک/روشن و چیدمان منطقی RTL/LTR.
5. **فاز ۵ — ویجت طلایی (`uas_hero`) با تگ‌های داینامیک و ۴ پیش‌تنظیم:**
   - جایگزینی رسانه‌های خارجی با فایل‌های SVG بومی در پوشه `assets/images/placeholders/`.
6. **فاز ۶a و ۶b — لندینگ بومی کانتینری و مهاجرت برگه‌های اصلی (Priority 1–6):**
   - پیاده‌سازی پل Elementor-First بدون شکستگی در نبود المنتور و تفکیک کامل `services`/`portfolio` از `sedrazavi_case`.
7. **فاز ۷ — هم‌ترازی گوتنبرگ و گردش‌کار امن فرم‌ها:**
   - ۳ الگو (`Block Patterns`) در `Gutenberg_Blocks`، تله هرزنامه (`sr_website_trap`) و تایید حریم خصوصی در فرم مشاوره.
8. **فاز ۸ — ۸ پوسته مستقل اصناف (`standalone-themes/`) و آداپتورهای یکپارچه‌سازی:**
   - انتقال کامل ساختار به پوسته‌های مستقل بدون `Template:` والد، پشتیبانی از Contact Form 7، Polylang/WPML و WooCommerce HPOS.
9. **فاز ۹ — پیش‌بررسی (`Preflight /library/preview`)، پاک‌سازی ایمن SVG و Reduced Motion:**
   - بررسی زمان‌ثابت SHA-256 (`hash_equals`)، فهرست سفید تگ‌ها و ویژگی‌های SVG، و انطباق انیمیشن با `prefers-reduced-motion`.
10. **فاز ۱۰ — تکمیل پوشش ویجت‌ها در قالب‌های آماده (۳۱/۳۱ ویجت در ۳۳ قالب):**
    - جایگذاری استاندارد هر ۱۲ ویجت باقی‌مانده در قالب‌ها و پاپ‌آپ‌های موجود (حفظ دقیق ۳۳ فایل JSON)، حذف صددرصدی لینک‌های خارجی `unsplash` و `w3schools` و همگام‌سازی خودکار CSVها.
11. **فاز ۱۱ — کارایی، سئوی فنی، دسترس‌پذیری WCAG و ایمنی پیش از انتشار:**
    - افزودن ویژگی `defer` روی اسکریپت‌های ویجت فرانت‌اند (`defer_frontend_widget_scripts`)، محافظت `noindex, nofollow` و حذف `canonical` در خطای ۴۰۴ و جستجو (`seo-bridge.php`) و ارتقای برچسب‌های ARIA و دکمه‌های کیبوردپذیر.
12. **فاز ۱۲ — اسناد انتشار، راهنمای نصب/ارتقا/بازیابی، SBOM و بسته‌بندی قطعی:**
    - تدوین `release/12-release-evidence.md` و `release/12-install-upgrade-recovery-guide.md`، به‌روزرسانی `sbom.json` (SPDX-2.3) و محاسبه اثر انگشت دیجیتال SHA-256 روی ۲۶ آرشیو ZIP نهایی.
