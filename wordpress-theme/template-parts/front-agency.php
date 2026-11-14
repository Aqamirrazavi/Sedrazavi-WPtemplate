<?php
/**
 * Template part for Agency Designer & Digital Studio Niche Front-Page
 *
 * @package SedRazavi
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
<div class="sr-agency-frontpage space-y-24 py-8" dir="rtl">

    <!-- ۱. هیرو استودیو طراحی وب و توسعه خلاق (Agency Hero) -->
    <section class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative rounded-3xl p-8 sm:p-14 overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 shadow-2xl">
            <!-- Background glow -->
            <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/15 blur-3xl pointer-events-none"></div>
            <div class="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none"></div>

            <div class="relative z-10 max-w-3xl space-y-6">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
                    <span class="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                    <span>استودیو طراحی خلاق و توسعه نرم‌افزار SedRazavi OS</span>
                </div>

                <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                    معماری وب مدرن، تجربه‌های تعاملی و <span class="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">فروش بدون مرز</span>
                </h1>

                <p class="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                    طراحی و پیاده‌سازی سریع وب‌سایت‌های آژانسی، شرکتی و فروشگاهی با بالاترین استاندارد طراحی تعاملی، تایپوگرافی چشم‌نواز فارسی و بهینه‌سازی سرعت زیر ۱ ثانیه.
                </p>

                <div class="flex flex-wrap items-center gap-4 pt-4">
                    <a href="#brief-form" class="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/25 transition-all flex items-center gap-2">
                        <span>درخواست مشاوره و استعلام هزینه پروژه</span>
                        <span>←</span>
                    </a>
                    <a href="#portfolio" class="px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all">
                        مشاهده نمونه‌کارهای اخیر
                    </a>
                </div>

                <!-- Stats Metric Strip -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80 text-right">
                    <div>
                        <div class="text-2xl font-bold font-mono text-white">۱۴۰+</div>
                        <div class="text-xs text-slate-400 mt-0.5">پروژه موفق وب</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold font-mono text-blue-400">۹۹.۸٪</div>
                        <div class="text-xs text-slate-400 mt-0.5">رضایت مشتریان</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold font-mono text-indigo-400">A+</div>
                        <div class="text-xs text-slate-400 mt-0.5">شاخص سرعت PageSpeed</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold font-mono text-emerald-400">۲۴/۷</div>
                        <div class="text-xs text-slate-400 mt-0.5">پشتیبانی و مانیتورینگ</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ۲. بنتو گرید خدمات طراحی و توسعه (Bento Grid Services) -->
    <section class="container mx-auto px-4 sm:px-6 lg:px-8" id="services">
        <div class="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white">راهکارهای تخصصی استودیو دیجیتال</h2>
            <p class="text-xs sm:text-sm text-slate-400">تمام نیازمندی‌های کسب‌وکار شما از طراحی هویت بصری تا زیرساخت‌های سرور ابری</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- کارت ۱: طراحی رابط و تجربه کاربری (UI/UX) -->
            <div class="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 transition-all space-y-4">
                <div class="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                    🎨
                </div>
                <h3 class="text-lg font-bold text-white">طراحی اختصاصی UI/UX و دیزاین سیستم</h3>
                <p class="text-xs text-slate-400 leading-relaxed">
                    طراحی پروتوتایپ‌های تعاملی در فیگما با رعایت دیزاین‌توکن‌های مقیاس‌پذیر، کنتراست استاندارد WCAG و ساختار منحصربه‌فرد برند.
                </p>
                <div class="text-[11px] text-blue-400 font-semibold pt-2">فیگما • دیزاین سیستم • میکروانیمیشن</div>
            </div>

            <!-- کارت ۲: توسعه وردپرس و توسعه فرانت‌اند -->
            <div class="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-4">
                <div class="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
                    ⚡
                </div>
                <h3 class="text-lg font-bold text-white">توسعه هسته وردپرس و کدهای مدرن</h3>
                <p class="text-xs text-slate-400 leading-relaxed">
                    پیاده‌سازی پوسته‌های فوق‌سریع بدون ابزارهای سنگین متفرقه، سازگار با ویرایشگر گوتنبرگ و المنتور پرو با بالاترین نرخ تبدیل.
                </p>
                <div class="text-[11px] text-indigo-400 font-semibold pt-2">پوسته‌های سفارشی • افزونه‌های الحاقی • API</div>
            </div>

            <!-- کارت ۳: سئو، پرفورمنس و امنیت سرور -->
            <div class="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4">
                <div class="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
                    🚀
                </div>
                <h3 class="text-lg font-bold text-white">سئو تکنیکال و امنیت بدون وقفه</h3>
                <p class="text-xs text-slate-400 leading-relaxed">
                    بهینه‌سازی لود دارایی‌ها، استریم باینری، اسکیماهای ساختاریافته گوگل و دیواره آتش لایه ۷ جهت جلوگیری از هرگونه نفوذ و اسپم.
                </p>
                <div class="text-[11px] text-emerald-400 font-semibold pt-2">Core Web Vitals • Schema.org • کش ابری</div>
            </div>
        </div>
    </section>

    <!-- ۳. فرم تعاملی سفارش پروژه و برآورد هزینه (Project Brief Form) -->
    <section class="container mx-auto px-4 sm:px-6 lg:px-8" id="brief-form">
        <div class="rounded-3xl p-8 sm:p-12 border border-slate-800 bg-slate-900/80 shadow-2xl max-w-4xl mx-auto space-y-8">
            <div class="space-y-2">
                <h3 class="text-xl sm:text-2xl font-bold text-white">محاسبه و استعلام سریع هزینه پروژه</h3>
                <p class="text-xs text-slate-400">مشخصات اولیه سایت مدنظرتان را ارسال کنید تا کارشناسان ما ظرف ۲ ساعت کاری با شما تماس بگیرند.</p>
            </div>

            <div id="sr-agency-brief-feedback" role="status" aria-live="polite" class="hidden p-3 rounded-xl text-xs font-semibold"></div>
            <form id="sr-agency-brief-form" class="space-y-6 text-right" method="post" action="<?php echo esc_url(rest_url('sedrazavi/v1/inquiry/submit')); ?>">
                <input type="text" name="website_hp" value="" tabindex="-1" autocomplete="off" style="display:none !important;" aria-hidden="true" />
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-1.5">نام و نام‌خانوادگی</label>
                        <input type="text" name="name" required placeholder="مثال: علی رضایی" class="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-1.5">شماره تماس همراه</label>
                        <input type="tel" name="contact" required placeholder="0912*******" dir="ltr" class="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none text-right" />
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1.5">صنف و نوع پروژه مدنظر</label>
                    <select name="project_type" class="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none">
                        <option value="agency">سایت پورتفولیو و آژانس دیجیتال</option>
                        <option value="store">فروشگاه آنلاین ووکامرس</option>
                        <option value="corporate">پورتال شرکتی و سازمانی</option>
                        <option value="lms">آکادمی آموزش آنلاین و اسپات‌پلیر</option>
                        <option value="download">مرکز دانلود نرم‌افزار و اشتراک ویژه VIP</option>
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1.5">توضیحات و نیازمندی‌های خاص</label>
                    <textarea name="details" rows="3" placeholder="امکانات، تعداد صفحات و زمان‌بندی مدنظر خود را بنویسید..." class="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none"></textarea>
                </div>

                <button type="submit" class="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer">
                    ارسال استعلام و دریافت کد پیگیری ←
                </button>
            </form>
            <script>
            (function() {
                var briefForm = document.getElementById('sr-agency-brief-form');
                if (!briefForm) return;
                briefForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    var fb = document.getElementById('sr-agency-brief-feedback');
                    var btn = briefForm.querySelector('button[type="submit"]');
                    var cfg = window.SedRazaviThemeConfig || {};
                    var endpoint = (cfg.restUrl ? cfg.restUrl + 'inquiry/submit' : briefForm.getAttribute('action'));
                    var fd = new FormData(briefForm);
                    if (btn) btn.disabled = true;
                    if (fb) {
                        fb.className = 'p-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold';
                        fb.textContent = 'در حال ثبت اطلاعات در سامانه...';
                    }
                    fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-WP-Nonce': cfg.restNonce || ''
                        },
                        body: JSON.stringify({
                            name: fd.get('name') || '',
                            contact: fd.get('contact') || '',
                            project_type: fd.get('project_type') || 'agency',
                            details: fd.get('details') || '',
                            website_hp: fd.get('website_hp') || ''
                        })
                    })
                    .then(function(r) { return r.json().then(function(d) { return { ok: r.ok, data: d }; }); })
                    .then(function(res) {
                        if (btn) btn.disabled = false;
                        if (res.ok && res.data && res.data.success) {
                            if (fb) {
                                fb.className = 'p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold';
                                fb.textContent = res.data.message || 'درخواست شما با موفقیت در سیستم ثبت شد.';
                            }
                            briefForm.reset();
                        } else {
                            if (fb) {
                                fb.className = 'p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-semibold';
                                fb.textContent = (res.data && res.data.message) ? res.data.message : 'خطا در ثبت اطلاعات. لطفاً مجدداً تلاش کنید.';
                            }
                        }
                    })
                    .catch(function() {
                        if (btn) btn.disabled = false;
                        if (fb) {
                            fb.className = 'p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-semibold';
                            fb.textContent = 'عدم برقراری ارتباط با سرور. لطفاً اتصال اینترنت را بررسی فرمایید.';
                        }
                    });
                });
            })();
            </script>
        </div>
    </section>

</div>
