# SedRazavi Final Markdown Pack — v31 Native Implementation & Portability Edition

تاریخ: 2026-11-10  
این نسخه، v30 را حفظ می‌کند و قراردادهای اجرایی سخت‌گیرانه‌تری برای ساخت بومی Elementor/Gutenberg، تمپلیت‌های قابل‌ویرایش و انتقال بین دو سایت اضافه می‌کند.

## ترتیب استفاده در Google AI Studio
1. `SedRazavi_Designer_Toolkit_Master_Prompt_v5_Native_Portability.md` — قرارداد اصلی؛ همیشه همراه با سند مادر.
2. `SedRazavi_Designer_Toolkit_Phase2_Master_Spec_v30_Final.md` — مرجع دامنه محصول؛ در صورت تعارض، الحاقیه v31 و قراردادهای v5 اولویت دارند.
3. `SedRazavi_Native_Elementor_Gutenberg_Portability_Spec_v31.md` — قرارداد فنی الزام‌آور برای ویجت، تمپلیت، بلوک و انتقال.
4. `SedRazavi_Designer_Toolkit_Phased_Execution_Roadmap_v3.md` — ترتیب اجرا و دروازه‌های پذیرش.
5. `SedRazavi_Designer_Toolkit_Phase_Prompts_v3.md` — فقط prompt فاز تأییدشده را اجرا کنید.
6. `SedRazavi_Latest_Repository_Audit_2026-11-10.md` — وضعیت و تناقض‌های قابل مشاهده در مخزن.
7. `SedRazavi_Code_Level_Remediation_Plan_v1.md` — برنامه اصلاحات قبلی؛ وضعیت موارد باید دوباره روی commit جاری راستی‌آزمایی شود.

## نقطه شروع الزامی
فقط Prompt 00 را اجرا کنید: ممیزی read-only روی commit جاری، ثبت SHA کامل، branch، working tree، فایل‌ها و شواهد. هیچ کدی را تا دریافت تأیید صریح تغییر ندهید.

## قرارداد غیرقابل مذاکره
- Elementor ویرایشگر بصری اصلی است؛ هر ویجت باید یک کلاس واقعی `Elementor\Widget_Base` و ثبت رسمی داشته باشد.
- قالب‌های Elementor باید دادهٔ بومی Elementor باشند و در خود Elementor باز و قابل‌ویرایش بمانند.
- PHP Theme Templates لایهٔ fallback/ساختار وردپرس هستند؛ PHP template به‌خودی‌خود Elementor-editable نیست.
- بلوک‌های Gutenberg باید با `block.json` و API رسمی WordPress ثبت شوند؛ در صورت امکان رندر با PHP.
- Converter برای محتوایی که از ابتدا بومی تولید شده لازم نیست. مهاجرت محتوای قدیمی مسئله‌ای جداست.
- بسته قابل‌حمل باید افزونهٔ لازم، widget IDs، templates، assets، tokens، dependencies، versions، checksums و دستور نصب/ارتقا/rollback را همراه داشته باشد.
- هر قابلیت و هر آزمون باید یکی از وضعیت‌های `PLANNED`, `IMPLEMENTED`, `TESTED`, `VERIFIED`, `NOT_RUN`, `FAILED` را با مدرک داشته باشد.
- اگر محیط واقعی WordPress/Elementor در دسترس نیست، تست نصب/ویرایش/انتقال `NOT_RUN` است؛ هرگز PASS گزارش نشود.

## خروجی این بسته چیست؟
این ZIP فقط اسناد، قراردادها و promptهاست؛ کد مخزن GitHub را تغییر نداده و اثبات‌کنندهٔ پیاده‌سازی نیست.
