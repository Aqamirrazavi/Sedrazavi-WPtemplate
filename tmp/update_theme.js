const fs = require('fs');

let content = fs.readFileSync('src/data/wordPressThemeFiles.ts', 'utf8');

// 1. Update header navigation link
content = content.replace(
    '<li><a href="#cases" class="hover:text-[#D4AF37] transition-colors"><?php esc_html_e(\'پیگیری پرونده\', \'sedrazavi\'); ?></a></li>',
    '<li><a href="#tracking" class="hover:text-[#D4AF37] transition-colors"><?php esc_html_e(\'پیگیری پرونده\', \'sedrazavi\'); ?></a></li>'
);

// 2. Update hero section button link
content = content.replace(
    '<a href="#cases" class="btn-outline">',
    '<a href="#tracking" class="btn-outline">'
);

// 3. Add Online Case Tracker Section after #cases
const endOfCases = `            </div>
        </div>
    </div>
</section>

<!-- ۶. نظرات موکلین (Testimonials) -->`;

const trackerSection = `            </div>
        </div>
    </div>
</section>

<!-- ۵.۵ سامانه هوشمند استعلام و پیگیری لحظه‌ای پرونده موکلین (Online Client Case Tracker) -->
<section id="tracking" class="py-20 bg-gradient-to-b from-[#060B18] via-[#0B132B] to-[#060B18] border-b border-slate-800 relative overflow-hidden">
    <!-- پس‌زمینه درخشان طلایی -->
    <div class="absolute -top-24 right-1/3 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <div class="bg-[#0B132B]/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/30 shadow-2xl space-y-6">
            
            <div class="text-center max-w-2xl mx-auto space-y-3">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    <span><?php esc_html_e('سامانه جامع موکلین دفتر وکالت دکتر سیده مریم رضوی', 'sedrazavi'); ?></span>
                </div>
                <h2 class="text-2xl sm:text-3xl font-bold font-serif text-white">
                    <?php esc_html_e('پیگیری آنلاین و لحظه‌ای وضعیت پرونده', 'sedrazavi'); ?>
                </h2>
                <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    <?php esc_html_e('موکلین محترم می‌توانند با درج شماره پرونده (قضایی یا داخلی دفتر) و شماره همراه، آخرین وضعیت دادرسی، موعد جلسات دادگاه و لوایح تنظیمی را استعلام فرمایند.', 'sedrazavi'); ?>
                </p>
            </div>

            <!-- فرم استعلام پرونده -->
            <form id="sedrazavi-case-tracker-form" class="space-y-4 max-w-2xl mx-auto pt-2">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-2">
                            <?php esc_html_e('شماره پرونده یا کدرهگیری *', 'sedrazavi'); ?>
                        </label>
                        <input type="text" name="case_number" required placeholder="مثال: SR-1402-9842 یا ۹۸/۱۴" class="form-input text-right w-full px-4 py-3 rounded-xl bg-[#060B18] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-all text-sm" dir="auto">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-2">
                            <?php esc_html_e('شماره همراه موکل (جهت تایید هویت)', 'sedrazavi'); ?>
                        </label>
                        <input type="tel" name="client_phone" placeholder="0912xxxxxxx" class="form-input text-right w-full px-4 py-3 rounded-xl bg-[#060B18] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-all text-sm" dir="ltr">
                    </div>
                </div>

                <button type="submit" class="btn-gold w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 rounded-xl shadow-lg hover:shadow-[#D4AF37]/20 transition-all cursor-pointer">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span><?php esc_html_e('استعلام وضعیت پرونده در دیتابیس وکالت', 'sedrazavi'); ?></span>
                </button>
            </form>

            <!-- محفظه نمایش نتایج ایجکس پرونده -->
            <div id="case-tracker-result" class="mt-6 hidden transition-all duration-300"></div>

            <div class="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                <span class="flex items-center gap-1">
                    <span class="text-emerald-400 font-bold">●</span>
                    <?php esc_html_e('متصل به پایگاه داده و پرونده‌های فعال دفتر وکالت', 'sedrazavi'); ?>
                </span>
                <span>
                    <?php esc_html_e('پشتیبانی حقوقی موکلین: ۰۲۱-۸۸۹۹۰۰۱۱', 'sedrazavi'); ?>
                </span>
            </div>

        </div>
    </div>
</section>

<!-- ۶. نظرات موکلین (Testimonials) -->`;

if (content.includes(endOfCases)) {
    content = content.replace(endOfCases, trackerSection);
    fs.writeFileSync('src/data/wordPressThemeFiles.ts', content);
    console.log('front-page.php updated with Case Tracker section successfully!');
} else {
    console.log('Could not find endOfCases pattern!');
}
