const m=[{id:"case-progress-tracker",componentName:"CaseProgressTracker",shortcodeTag:"react_case_tracker",title:"استپر و رهگیری هوشمند پرونده‌های قضایی",category:"کارتابل و پرونده‌ها",description:"نمایش خط زمانی چندمرحله‌ای دادرسی (دادخواست، لوایح، دادرسی، تجدیدنظر، اجرای حکم) با استعلام برخط و هشدار جلسه بعدی.",badge:"کارتابل موکل",phpDocDescription:"شورت‌کد اختصاصی رهگیری مرحله‌به‌مرحله پرونده موکل با اتصال به دیتابیس یا ورودی دستی",elementorCategory:"سید رضوی - پورتال موکلین",attributes:[{name:"case_number",label:"شماره پرونده",type:"text",defaultValue:"۱۴۰۳-۲۸۴",description:"شماره بایگانی پرونده در شعبه یا سامانه"},{name:"status_code",label:"کد وضعیت قضایی",type:"select",defaultValue:"HEARING_PENDING",options:["ACTIVE","HEARING_PENDING","DECIDED","ENFORCEMENT"],description:"وضعیت کلی پرونده"},{name:"status_text",label:"متن وضعیت جاری",type:"text",defaultValue:"در حال تبادل لوایح و بررسی نظر کارشناس رسمی",description:"توضیحات کوتاه وضعیت"},{name:"hearing_date",label:"تاریخ جلسه بعدی دادگاه",type:"text",defaultValue:"۱۴۰۳/۰۹/۱۸",description:"تاریخ شمسی جلسه رسیدگی"},{name:"days_remaining",label:"روزهای باقیمانده تا جلسه",type:"number",defaultValue:12,description:"شمارش معکوس به روز"},{name:"show_timeline",label:"نمایش خط زمان کامل",type:"boolean",defaultValue:!0,description:"فعال‌سازی نمایش تمام مراحل ۵ گانه"}],sampleAttributes:{case_number:"۱۴۰۳-۲۸۴",status_code:"HEARING_PENDING",status_text:"در حال تبادل لوایح و بررسی نظر کارشناس رسمی",hearing_date:"۱۴۰۳/۰۹/۱۸",days_remaining:12,show_timeline:!0}},{id:"court-fee-calculator",componentName:"CourtFeeCalculator",shortcodeTag:"react_court_calculator",title:"میز جامع محاسبات قضایی، دیه و خسارت تأخیر",category:"مالی و محاسبات",description:"محاسبه‌گر هزینه دادرسی مراحل بدوی و تجدیدنظر، تعرفه حق‌الوکاله کانون، خسارت تأخیر تأدیه بانک مرکزی، مهریه و دیه ماه حرام.",badge:"ابزار مالی",phpDocDescription:"ماشین‌حساب تخصصی دعاوی مالی و کیفری بر اساس آخرین تعرفه‌های قوه قضاییه و شاخص بانک مرکزی",elementorCategory:"سید رضوی - ابزارهای محاسباتی",attributes:[{name:"default_tab",label:"تب پیش‌فرض فعال",type:"select",defaultValue:"court_fee",options:["court_fee","attorney_tariff","delay_damages","diyeh","mehrieh"],description:"بخش فعال در زمان بارگذاری"},{name:"default_claim",label:"مبلغ پیش‌فرض خواسته (ریال)",type:"number",defaultValue:5e8,description:"مبلغ اولیه در فیلد ورودی"},{name:"show_tariff_guide",label:"راهنمای فرمول محاسبات",type:"boolean",defaultValue:!0,description:"نمایش کادرهای تشریحی قوانین زیر فرمول"},{name:"enable_print",label:"کلید چاپ رسمی فاکتور",type:"boolean",defaultValue:!0,description:"امکان چاپ و دریافت نسخه PDF برآورد"}],sampleAttributes:{default_tab:"court_fee",default_claim:5e8,show_tariff_guide:!0,enable_print:!0}},{id:"client-portal-widget",componentName:"ClientPortalQuickAccessWidget",shortcodeTag:"react_client_portal_widget",title:"ابزارک دسترسی سریع به کارتابل و جلسات موکل",category:"کارتابل و پرونده‌ها",description:"خلاصه وضعیت پرونده‌های فعال موکل، تاریخ جلسات پیش‌رو، اسناد دریافتی و تسویه‌حساب‌های مالی.",badge:"کارتابل موکل",phpDocDescription:"ویجت داشبورد اختصاصی موکلین برای صفحات کاربری، سایدبارها یا فوتر برگه موکل",elementorCategory:"سید رضوی - پورتال موکلین",attributes:[{name:"show_financials",label:"نمایش اطلاعات مالی",type:"boolean",defaultValue:!0,description:"نمایش وضعیت حق‌الوکاله و اقساط"},{name:"show_documents",label:"نمایش شمارنده مدارک",type:"boolean",defaultValue:!0,description:"آمار لوایح و مستندات بارگذاری شده"},{name:"max_cases",label:"حداکثر پرونده‌های قابل نمایش",type:"number",defaultValue:3,description:"تعداد پرونده در لیست کشویی"}],sampleAttributes:{show_financials:!0,show_documents:!0,max_cases:3}},{id:"booking-section",componentName:"ContactAndBookingSection",shortcodeTag:"react_booking_modal",title:"سامانه تقویم هوشمند نوبت‌دهی و رزرو مشاوره",category:"رزرو و نوبت‌دهی",description:"تقویم رزرو وقت مشاوره حضوری یا آنلاین با انتخاب شعبه، تاریخ شمسی، موضوع حقوقی و پرداخت بیعانه.",badge:"نوبت‌دهی",phpDocDescription:"فرم تعاملی رزرواسیون جلسه حضوری یا تلفنی با قابلیت اتصال به درگاه بانکی یا پیامک",elementorCategory:"سید رضوی - تماس و رزرو",attributes:[{name:"default_service",label:"حوزه مشاوره پیش‌فرض",type:"select",defaultValue:"commercial",options:["commercial","criminal","family","real-estate"],description:"سرویس انتخابی اولیه"},{name:"title",label:"عنوان فرم رزرو",type:"text",defaultValue:"رزرو نوبت مشاوره با وکیل پایه یک",description:"تیتر بالای بخش رزرو"},{name:"allow_online_payment",label:"امکان واریز پیش‌پرداخت",type:"boolean",defaultValue:!0,description:"فعال‌سازی پرداخت بیعانه جهت تثبیت وقت"},{name:"button_text",label:"متن دکمه ثبت نوبت",type:"text",defaultValue:"ثبت و تایید جلسه مشاوره",description:"متن دکمه اقدام"}],sampleAttributes:{default_service:"commercial",title:"رزرو نوبت مشاوره با وکیل پایه یک",allow_online_payment:!0,button_text:"ثبت و تایید جلسه مشاوره"}},{id:"hero-slider",componentName:"LawyerHeroSlider",shortcodeTag:"react_hero_slider",title:"اسلایدر هیرو پرمیوم با آمار و افتخارات وکیل",category:"بخش‌های اصلی و محتوا",description:"اسلایدر مجلل صفحه اصلی با تصاویر باکیفیت دفتر، نشان رسمی کانون وکلا، سوابق موفقیت و کلیدهای رزرو سریع.",badge:"هیرو و صفحه اصلی",phpDocDescription:"بخش هدر و پرزنتیشن دفتر وکالت با انیمیشن‌های طلایی و بارگذاری بهینه شده",elementorCategory:"سید رضوی - صفحات اصلی",attributes:[{name:"autoplay",label:"اسلاید خودکار",type:"boolean",defaultValue:!0,description:"حرکت خودکار اسلایدها"},{name:"interval",label:"فاصله زمانی اسلاید (میلی‌ثانیه)",type:"number",defaultValue:5e3,description:"مدت مکث روی هر اسلاید"},{name:"show_badges",label:"نمایش نشان‌های اعتبار",type:"boolean",defaultValue:!0,description:"مدال‌های ۲۰ سال سابقه و رتبه کانون"}],sampleAttributes:{autoplay:!0,interval:5e3,show_badges:!0}},{id:"services-section",componentName:"ServicesSection",shortcodeTag:"react_services_grid",title:"شبکه هوشمند کارت‌های خدمات حقوقی تخصصی",category:"بخش‌های اصلی و محتوا",description:"کارت‌های خدمات تجاری، بین‌المللی، ملکی و کیفری همراه با آیکون، هزینه تخمینی، دکمه جزئیات و استعلام.",badge:"خدمات حقوقی",phpDocDescription:"نمایش شبکه خدمات تخصصی با فیلتر دسته‌بندی و مودال بازشونده معرفی سرویس",elementorCategory:"سید رضوی - صفحات اصلی",attributes:[{name:"category",label:"دسته‌بندی خدمات",type:"select",defaultValue:"all",options:["all","commercial","criminal","family","real-estate"],description:"فیلتر بر اساس حوزه تخصصی"},{name:"count",label:"تعداد خدمات",type:"number",defaultValue:6,description:"حداکثر کارت‌های قابل نمایش"},{name:"columns",label:"تعداد ستون‌ها در دسکتاپ",type:"select",defaultValue:"3",options:["2","3","4"],description:"چیدمان گرید کارت‌ها"},{name:"show_fee",label:"نمایش برآورد هزینه",type:"boolean",defaultValue:!0,description:"نمایش تعرفه پایه در کارت"}],sampleAttributes:{category:"all",count:6,columns:"3",show_fee:!0}},{id:"testimonials-slider",componentName:"TestimonialsSlider",shortcodeTag:"react_testimonials_slider",title:"اسلایدر تجربیات و رضایت‌نامه‌های موکلان",category:"اعتبار و هویت",description:"نمایش نظرات ثبت‌شده با امتیاز ستاره‌ای، مهر رسمی تایید کانون، حوزه پرونده و نتیجه دادرسی.",badge:"اعتبار و رضایت",phpDocDescription:"اسلایدر شیک نظرات تایید شده موکلین حقوقی و حقیقی با فونت دیپلماتیک",elementorCategory:"سید رضوی - صفحات اصلی",attributes:[{name:"count",label:"تعداد نظرات",type:"number",defaultValue:4,description:"تعداد بازخوردهای نمایشی"},{name:"autoplay",label:"چرخش اتوماتیک",type:"boolean",defaultValue:!0,description:"انتقال اسلاید هر ۴ ثانیه"},{name:"show_ratings",label:"نمایش ستاره‌های کیفیت",type:"boolean",defaultValue:!0,description:"نمایش امتیاز ۵ ستاره"}],sampleAttributes:{count:4,autoplay:!0,show_ratings:!0}},{id:"articles-section",componentName:"ArticlesSection",shortcodeTag:"react_articles_grid",title:"بانک مقالات تخصصی و تحلیل آراء وحدت رویه",category:"بخش‌های اصلی و محتوا",description:"آخرین مقالات و یادداشت‌های حقوقی با زمان تقریبی مطالعه، دسته‌بندی موضوعی و قابلیت اشتراک‌گذاری.",badge:"مقالات و آموزش",phpDocDescription:"نمایش آخرین یادداشت‌ها و مقالات علمی وکیل با اتصال به پست‌های وبلاگ وردپرس",elementorCategory:"سید رضوی - صفحات اصلی",attributes:[{name:"count",label:"تعداد مقالات",type:"number",defaultValue:3,description:"تعداد آخرین مطالب"},{name:"category",label:"دسته‌بندی مقاله",type:"select",defaultValue:"all",options:["all","commercial","criminal","civil"],description:"فیلتر بر اساس تخصص"},{name:"show_read_time",label:"نمایش زمان مطالعه",type:"boolean",defaultValue:!0,description:"نشان مدت زمان تخمینی خواندن"}],sampleAttributes:{count:3,category:"all",show_read_time:!0}},{id:"faq-section",componentName:"FaqSection",shortcodeTag:"react_faq_accordion",title:"آکاردئون هوشمند پرسش و پاسخ‌های حقوقی",category:"بخش‌های اصلی و محتوا",description:"سوالات پرتکرار موکلین درباره حق‌الوکاله، ضمانت پرونده، مدت زمان دادگاه و مراحل وکالت.",badge:"سوالات متداول",phpDocDescription:"آکاردئون ریسپانسیو با داده‌های ساختاریافته Schema.org FAQPage جهت سئو گوگل",elementorCategory:"سید رضوی - صفحات اصلی",attributes:[{name:"count",label:"تعداد پرسش‌ها",type:"number",defaultValue:5,description:"تعداد موارد قابل مشاهده"},{name:"open_first",label:"باز بودن آیتم اول",type:"boolean",defaultValue:!0,description:"باز بودن پیش‌فرض سوال اول"},{name:"searchable",label:"نوار جستجوی زنده در سوالات",type:"boolean",defaultValue:!0,description:"امکان جستجوی واژگان حقوقی"}],sampleAttributes:{count:5,open_first:!0,searchable:!0}},{id:"trust-badges",componentName:"TrustBadges",shortcodeTag:"react_trust_badges",title:"نشان‌های رسمی کانون وکلا و گواهینامه‌های ملی",category:"اعتبار و هویت",description:"نمایش نشان کانون وکلای دادگستری، شماره پروانه، نشان اعتماد قوه قضاییه و نماد تجارت الکترونیکی.",badge:"اعتبار رسمی",phpDocDescription:"بلوک مهرها و مجوزهای رسمی پروانه وکالت با قابلیت کلیک جهت اعتبارسنجی",elementorCategory:"سید رضوی - صفحات اصلی",attributes:[{name:"style",label:"سبک چیدمان",type:"select",defaultValue:"grid",options:["grid","compact_row","cards"],description:"قالب بصری باکس‌ها"},{name:"show_license",label:"نمایش شماره پروانه وکالت",type:"boolean",defaultValue:!0,description:"درج شماره ۱۸۴۵۲ / ک.و.م"},{name:"animated",label:"انیمیشن شناور طلایی",type:"boolean",defaultValue:!0,description:"جلوه حرکت ملایم کارت‌ها"}],sampleAttributes:{style:"grid",show_license:!0,animated:!0}},{id:"otp-portal",componentName:"OtpAuthModal",shortcodeTag:"react_otp_portal",title:"پرتال امن ورود موکل با سامانه پیامکی و ثنا",category:"کارتابل و پرونده‌ها",description:"سیستم ورود دوعاملی با ارسال کد OTP پیامکی، استعلام کد ملی و ارجاع به پنل اختصاصی موکل.",badge:"امنیت و ورود",phpDocDescription:"دروازه احراز هویت پیامکی بدون نیاز به رمز عبور سنتی سازگار با پیامک‌های کاوه‌نگار/فرازاس‌ام‌اس",elementorCategory:"سید رضوی - پورتال موکلین",attributes:[{name:"enable_sana_notice",label:"پیام انطباق با ثنا",type:"boolean",defaultValue:!0,description:"تذکر تایید هویت ثنا برای پیگیری پرونده"},{name:"redirect_url",label:"آدرس انتقال بعد از ورود",type:"text",defaultValue:"/client-portal",description:"مسیر ریدایرکت خودکار"},{name:"button_label",label:"متن دکمه ورود",type:"text",defaultValue:"ورود به سامانه جامع موکلین",description:"عنوان دکمه بازکننده"}],sampleAttributes:{enable_sana_notice:!0,redirect_url:"/client-portal",button_label:"ورود به سامانه جامع موکلین"}},{id:"live-consultation",componentName:"LiveConsultationDrawer",shortcodeTag:"react_live_consultation",title:"کنسول مشاوره فوری آنلاین و چت حقوقی",category:"رزرو و نوبت‌دهی",description:"دراور بازشونده گفتگوی حقوقی با وکیل، ارسال مستندات پرونده، پیام‌های صوتی و پاسخگویی آنلاین.",badge:"مشاوره آنلاین",phpDocDescription:"دراور پیام‌رسانی و مشاوره فوری با تیم حقوقی دفتر با رمزنگاری داده‌ها",elementorCategory:"سید رضوی - تماس و رزرو",attributes:[{name:"department",label:"دپارتمان پیش‌فرض",type:"select",defaultValue:"corporate",options:["corporate","financial","criminal","family"],description:"بخش حقوقی پاسخ‌دهنده"},{name:"button_title",label:"عنوان دکمه شناور",type:"text",defaultValue:"مشاوره آنلاین با وکیل",description:"متن دکمه اکشن"},{name:"show_online_badge",label:"نمایش نشان برخط سبز",type:"boolean",defaultValue:!0,description:"وضعیت آنلاین بودن دفتر"}],sampleAttributes:{department:"corporate",button_title:"مشاوره آنلاین با وکیل",show_online_badge:!0}},{id:"story-bar",componentName:"StoryBar",shortcodeTag:"react_story_bar",title:"استوری‌بار آموزش و اخبار فوری حقوقی",category:"بخش‌های اصلی و محتوا",description:"نوار استوری شبیه اینستاگرام برای انتشار ویدیوهای کوتاه نکات طلایی حقوقی و آرای جدید دادگاه‌ها.",badge:"آموزش چندرسانه‌ای",phpDocDescription:"نوار مدرن استوری‌های حقوقی با شمارنده بازدید و قابلیت نمایش ویدیوهای عمودی",elementorCategory:"سید رضوی - صفحات اصلی",attributes:[{name:"count",label:"تعداد استوری‌ها",type:"number",defaultValue:6,description:"حداکثر آیتم‌های نوار"},{name:"enable_ring",label:"حلقه گرادینت متحرک",type:"boolean",defaultValue:!0,description:"حلقه طلایی دور استوری‌های دیده نشده"}],sampleAttributes:{count:6,enable_ring:!0}},{id:"text-ticker",componentName:"TextBannerSlider",shortcodeTag:"react_text_ticker",title:"نوار متحرک اعلانات قضایی و ساعات پذیرش",category:"بخش‌های اصلی و محتوا",description:"تیکر خبری روان بالای سایت جهت اعلام آخرین اخبار دیوان عالی، اطلاعیه‌های دادگاه و ساعات مشاوره.",badge:"اعلانات فوری",phpDocDescription:"نوار پیمایش خودکار اخبار و اطلاعیه‌های کانون وکلا در هدر یا بالای برگه‌ها",elementorCategory:"سید رضوی - صفحات اصلی",attributes:[{name:"speed",label:"سرعت حرکت",type:"select",defaultValue:"normal",options:["slow","normal","fast"],description:"سرعت انیمیشن متن"},{name:"show_bulletin",label:"نمایش آیکون بلندگو",type:"boolean",defaultValue:!0,description:"آیکون زنگوله و اعلان"}],sampleAttributes:{speed:"normal",show_bulletin:!0}},{id:"comments-moderation",componentName:"FrontendCommentsModeration",shortcodeTag:"react_legal_comments",title:"بخش پرسش و پاسخ و نظرات حقوقی موکلان",category:"اعتبار و هویت",description:"سیستم ثبت سوالات حقوقی کاربران با تفکیک پاسخ رسمی وکیل و اعتبارسنجی شماره تماس.",badge:"دیدگاه‌ها",phpDocDescription:"بخش دیدگاه‌های تعاملی با نشان‌های رسمی تاییدیه وکیل و تفکیک پاسخ‌های حقوقی",elementorCategory:"سید رضوی - صفحات اصلی",attributes:[{name:"max_display",label:"تعداد دیدگاه اولیه",type:"number",defaultValue:5,description:"تعداد کامنت‌های اولیه"},{name:"allow_new_comments",label:"امکان ارسال نظر جدید",type:"boolean",defaultValue:!0,description:"فعال‌سازی فرم ثبت دیدگاه"}],sampleAttributes:{max_display:5,allow_new_comments:!0}}],S={selectedComponentIds:m.map(s=>s.id),targetType:"theme",shortcodePrefix:"sedrazavi_react_",functionPrefix:"sedrazavi_",engine:"vite-bundle",includeRestApi:!0,includeCurrentUser:!0,includeLawyerProfile:!0,includeAdminAjax:!0,includeSkeleton:!0,elementorSupport:!0,customContainerClass:"sedrazavi-ui-wrapper",autoMountScript:!0};function E(s){const{selectedComponentIds:l,targetType:c,shortcodePrefix:p,functionPrefix:r,engine:n,includeRestApi:_,includeCurrentUser:b,includeLawyerProfile:w,includeAdminAjax:y,includeSkeleton:h,elementorSupport:R,customContainerClass:$,autoMountScript:v}=s,g=m.filter(o=>l.includes(o.id)),C=new Date().toLocaleDateString("fa-IR"),i=p.replace(/[^a-zA-Z0-9_]/g,"_"),t=r.replace(/[^a-zA-Z0-9_]/g,"_");let e=`<?php
/**
 * ==============================================================================
 * پکیج اتصال یکپارچه شورت‌کدهای React در وردپرس (WordPress React Shortcode Bridge)
 * ==============================================================================
 * 
 * نسخه: 2.5.0
 * تاریخ تولید: ${C}
 * توسعه‌دهنده: دفتر حقوقی و وکالت SedRazavi (سید امیر حسین رضوی فردویی)
 * وب‌سایت: https://t.me/sedrazavi
 * مجوز: GPL v2 or later
 * 
 * توضیحات فنی:
 * این فایل شامل رجیستری هوشمند شورت‌کدهای وردپرس برای مانت خودکار مؤلفه‌های مدرن React
 * همراه با سازوکار بهینه Enqueue تاخیری (Lazy Enqueuing) جهت بارگذاری فایل‌های JS/CSS
 * صرفاً در برگه‌های نیازمند شورت‌کد و ارسال متغیرهای سرور با wp_localize_script می‌باشد.
 * 
 * تعداد مؤلفه‌های فعال‌شده: ${g.length} از ${m.length}
 * نحوه استقرار: ${c==="theme"?"پوسته وردپرس (Theme Include)":"افزونه مستقل وردپرس (Must-Use Plugin / Addon)"}
 * موتور اجرا: ${n==="vite-bundle"?"باندل کامپایل‌شده Vite (React 19 / 18)":n==="wp-element"?"موتور داخلی هسته گوتنبرگ (wp-element)":"CDN خارجی React"}
 * ==============================================================================
 */

// جلوگیری از دسترسی مستقیم به فایل
if (!defined('ABSPATH')) {
    exit;
}

// ۱. تعریف ثابت‌های بنیادین ماژول
if (!defined('${t.toUpperCase()}REACT_BRIDGE_VERSION')) {
    define('${t.toUpperCase()}REACT_BRIDGE_VERSION', '2.5.0');
}
if (!defined('${t.toUpperCase()}REACT_PREFIX')) {
    define('${t.toUpperCase()}REACT_PREFIX', '${i}');
}

/**
 * ۲. ثبت اسکریپت‌ها و استایل‌های اصلی React در وردپرس (Asset Registration)
 * اسکریپت‌ها در این مرحله فقط REGISTER می‌شوند و تا زمان فراخوانی شورت‌کد، در حافظه لود نمی‌شوند.
 */
function ${t}register_react_assets() {
    $version = ${t.toUpperCase()}REACT_BRIDGE_VERSION;
`;return c==="theme"?e+=`    $assets_url = get_template_directory_uri() . '/assets/';
    $dist_url   = get_template_directory_uri() . '/dist/';
    $dist_path  = get_template_directory() . '/dist/';
`:e+=`    $assets_url = plugin_dir_url(__FILE__) . 'assets/';
    $dist_url   = plugin_dir_url(__FILE__) . 'dist/';
    $dist_path  = plugin_dir_path(__FILE__) . 'dist/';
`,e+=`
    // بررسی وجود فایل‌های کامپایل شده یا استفاده از آدرس پیش‌فرض
    $js_bundle  = file_exists($dist_path . 'index.js')  ? $dist_url . 'index.js'  : $assets_url . 'js/react-app.min.js';
    $css_bundle = file_exists($dist_path . 'index.css') ? $dist_url . 'index.css' : $assets_url . 'css/react-app.min.css';

`,n==="wp-element"?e+=`    // وابستگی به موتور React داخلی گوتنبرگ وردپرس
    $dependencies = array('wp-element', 'wp-i18n', 'wp-api-fetch');
`:e+=`    // وابستگی به اسکریپت‌های مستقل یا بدون پیش‌نیاز
    $dependencies = array();
`,e+=`
    // ثبت استایل اصلی مؤلفه‌های React (شامل Tailwind CSS کامپایل‌شده)
    wp_register_style(
        '${i}styles',
        $css_bundle,
        array(),
        $version
    );

    // ثبت اسکریپت اجرایی React و رجیستری مؤلفه‌ها
    wp_register_script(
        '${i}bundle',
        $js_bundle,
        $dependencies,
        $version,
        true // لود در فوتر صفحه جهت بهینه‌سازی سرعت و امتیاز Core Web Vitals
    );
}
add_action('wp_enqueue_scripts', '${t}register_react_assets', 10);

/**
 * ۳. تزریق هوشمند اسکریپت‌ها و متغیرهای سرور (Smart Lazy Enqueue & wp_localize_script)
 * این تابع تنها هنگامی که حداقل یک شورت‌کد در صفحه اجرا شود صدا زده می‌شود تا از لود بیهوده جلوگیری گردد.
 */
function ${t}enqueue_react_runtime() {
    static $already_enqueued = false;
    if ($already_enqueued) {
        return;
    }
    $already_enqueued = true;

    // ۱. انکیو کردن استایل و اسکریپت ثبت‌شده
    wp_enqueue_style('${i}styles');
    wp_enqueue_script('${i}bundle');

    // ۲. آماده‌سازی داده‌های سرور جهت ارسال با wp_localize_script
    $localized_data = array(
        'siteUrl'        => home_url(),
        'siteName'       => get_bloginfo('name'),
        'isRtl'          => is_rtl(),
        'shortcodePrefix'=> '${i}',
        'version'        => ${t.toUpperCase()}REACT_BRIDGE_VERSION,
        'locale'         => get_locale(),
`,_&&(e+=`        // مشخصات REST API جهت ارتباط ایجکس و واکشی داده‌های لحظه‌ای
        'rest' => array(
            'root'      => esc_url_raw(rest_url()),
            'endpoint'  => esc_url_raw(rest_url('sedrazavi/v1/')),
            'nonce'     => wp_create_nonce('wp_rest'),
        ),
`),y&&(e+=`        // اطلاعات امنیتی Admin Ajax سنتی وردپرس
        'ajax' => array(
            'url'   => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('${i}ajax_security_nonce'),
        ),
`),b&&(e+=`        // مشخصات کاربر جاری در صورت لاگین بودن
        'currentUser' => array(
            'isLoggedIn'   => is_user_logged_in(),
            'id'           => get_current_user_id(),
            'displayName'  => is_user_logged_in() ? wp_get_current_user()->display_name : '',
            'email'        => is_user_logged_in() ? wp_get_current_user()->user_email : '',
            'roles'        => is_user_logged_in() ? wp_get_current_user()->roles : array(),
        ),
`),w&&(e+=`        // اطلاعات پایه هویت و پروانه وکیل از تنظیمات پوسته یا پیش‌فرض
        'lawyerProfile' => array(
            'name'           => get_option('sedrazavi_lawyer_name', 'سرکار خانم دکتر سیده مریم رضوی'),
            'title'          => get_option('sedrazavi_lawyer_title', 'وکیل پایه یک دادگستری و مشاور ارشد حقوقی'),
            'licenseNumber'  => get_option('sedrazavi_lawyer_license', '۱۸۴۵۲ / ک.و.م'),
            'phone'          => get_option('sedrazavi_lawyer_phone', '۰۲۱-۸۸۹۹۰۰۱۱'),
            'mobile'         => get_option('sedrazavi_lawyer_mobile', '۰۹۱۲-۳۴۵۶۷۸۹'),
            'address'        => get_option('sedrazavi_lawyer_address', 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج حقوقی SedRazavi'),
            'onlineBooking'  => true,
        ),
`),e+=`        'translations' => array(
            'loading'        => __('در حال بارگذاری مؤلفه حقوقی...', 'sedrazavi-react'),
            'error'          => __('خطا در برقراری ارتباط با سامانه حقوقی.', 'sedrazavi-react'),
            'retry'          => __('تلاش مجدد', 'sedrazavi-react'),
            'courtFeeTitle'  => __('محاسبه‌گر تخصصی قوه قضاییه', 'sedrazavi-react'),
            'caseTrackerTitle'=> __('سامانه برخط رهگیری پرونده‌های موکلین', 'sedrazavi-react'),
        ),
    );

    // فیلتر وردپرس برای شخصی‌سازی یا افزودن داده‌های بیشتر توسط افزونه‌ها
    $localized_data = apply_filters('${t}react_localized_data', $localized_data);

    // ارسال متغیر امن جاوااسکریپت به پنجره مرورگر
    wp_localize_script('${i}bundle', 'SedRazaviReactConfig', $localized_data);
}

/**
 * ۴. تابع کمکی رندر اسکلت پیش‌بارگذار (Skeleton Preloader Renderer)
 * پیشگیری از پرش محتوا (CLS) و ارتقای سئو قبل از هیدراته شدن کامل جاوااسکریپت
 */
function ${t}render_react_skeleton($component_name, $custom_title = '') {
`,h?e+=`    ob_start();
    ?>
    <div class="sedrazavi-skeleton-container" style="min-height: 220px; background: linear-gradient(135deg, rgba(11,19,43,0.04) 0%, rgba(212,175,55,0.06) 100%); border: 1px dashed rgba(212,175,55,0.35); border-radius: 1.25rem; padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; font-family: inherit; direction: rtl; margin: 0.75rem 0;">
        <div style="width: 44px; height: 44px; border: 3px solid rgba(212,175,55,0.25); border-top-color: #D4AF37; border-radius: 50%; animation: sedrazaviSpin 1.1s cubic-bezier(0.5, 0, 0.5, 1) infinite; margin-bottom: 0.75rem;"></div>
        <p style="font-size: 0.875rem; font-weight: 700; color: #0B132B; margin: 0 0 0.25rem 0;">
            <?php echo esc_html(!empty($custom_title) ? $custom_title : 'سامانه حقوقی هوشمند SedRazavi'); ?>
        </p>
        <span style="font-size: 0.75rem; color: #718096;">
            در حال بارگذاری مؤلفه <?php echo esc_html($component_name); ?>...
        </span>
        <style>
            @keyframes sedrazaviSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
    </div>
    <?php
    return ob_get_clean();
`:e+=`    return '<div class="sedrazavi-react-loading" style="padding:10px;text-align:center;color:#888;">در حال بارگذاری...</div>';
`,e+=`}

/**
 * ==============================================================================
 * ۵. تعریف شورت‌کدهای اختصاصی برای مؤلفه‌های React (Shortcode Wrappers)
 * ==============================================================================
 */
`,g.forEach((o,z)=>{const d=`${i}${o.shortcodeTag.replace(/^react_/,"")}`,f=`${t}shortcode_${o.id.replace(/-/g,"_")}`;e+=`
/**
 * [${d}]
 * ${o.title}
 * مؤلفه ری‌اکت: <${o.componentName} />
 * ${o.phpDocDescription}
 */
function ${f}($atts, $content = null) {
    // ۱. فراخوانی تابع Enqueue تاخیری
    ${t}enqueue_react_runtime();

    // ۲. استخراج و اعتبارسنجی اتریبیوت‌های ورودی شورت‌کد
    $default_atts = array(
`,o.attributes.forEach(a=>{let u="";typeof a.defaultValue=="boolean"?u=a.defaultValue?"'true'":"'false'":typeof a.defaultValue=="number"?u=a.defaultValue.toString():u=`'${a.defaultValue}'`,e+=`        '${a.name}' => ${u},
`}),e+=`        'class' => '',
        'id'    => '',
    );

    $a = shortcode_atts($default_atts, $atts, '${d}');

    // ۳. تمیزکاری و تایپ‌کست مقادیر به صورت امن
    $props = array();
`,o.attributes.forEach(a=>{a.type==="number"?e+=`    $props['${a.name}'] = intval($a['${a.name}']);
`:a.type==="boolean"?e+=`    $props['${a.name}'] = filter_var($a['${a.name}'], FILTER_VALIDATE_BOOLEAN);
`:e+=`    $props['${a.name}'] = sanitize_text_field($a['${a.name}']);
`}),e+=`
    // اگر محتوای متنی داخل شورت‌کد قرار داده شده باشد
    if (!empty($content)) {
        $props['innerContent'] = do_shortcode($content);
    }

    // ۴. اعمال فیلتر هوک برای توسعه‌پذیری
    $props = apply_filters('${d}_props', $props, $a);

    // ۵. ایجاد شناسه یکتا برای کانتینر مانت
    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-' . wp_unique_id();
    $css_class = trim('${$} ' . sanitize_text_field($a['class']));

    // ۶. رندر خروجی کانتینر DOM با متادیتا و اسکلت
    ob_start();
    ?>
    <div 
        id="<?php echo esc_attr($unique_id); ?>" 
        class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>"
        data-component="<?php echo esc_attr('${o.componentName}'); ?>"
        data-shortcode="<?php echo esc_attr('${d}'); ?>"
        data-props="<?php echo esc_attr(wp_json_encode($props)); ?>"
        dir="rtl"
    >
        <?php echo ${t}render_react_skeleton('${o.componentName}', '${o.title}'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('${d}', '${f}');
`}),v&&(e+=`
/**
 * ==============================================================================
 * ۶. اسکریپت خودکار مانت کلاینت در فوتر (Auto Mount Loader in wp_footer)
 * شناسایی تمام کانتینرهای .sedrazavi-react-root و مانت مؤلفه‌ها با ReactDOM.createRoot
 * ==============================================================================
 */
function ${t}render_react_mount_bootstrap() {
    ?>
    <script type="text/javascript" id="${i}mount-bootstrap">
    (function() {
        function mountAllSedRazaviComponents() {
            var roots = document.querySelectorAll('.sedrazavi-react-root:not([data-mounted="true"])');
            if (!roots || roots.length === 0) return;

            // بررسی دسترسی به آبجکت و کتابخانه React
            var registry = window.SedRazaviReactComponents || {};
            var React = window.React || (window.wp && window.wp.element);
            var ReactDOM = window.ReactDOM || (window.wp && window.wp.element);

            roots.forEach(function(container) {
                var compName = container.getAttribute('data-component');
                var rawProps = container.getAttribute('data-props');
                var props = {};
                try {
                    props = rawProps ? JSON.parse(rawProps) : {};
                } catch(e) {
                    console.error('SedRazavi React Props Parse Error:', e, rawProps);
                }

                var ComponentClass = registry[compName];
                if (ComponentClass && ReactDOM && React) {
                    try {
                        container.setAttribute('data-mounted', 'true');
                        // پاکسازی اسکلت لودینگ
                        container.innerHTML = '';
                        if (ReactDOM.createRoot) {
                            var root = ReactDOM.createRoot(container);
                            root.render(React.createElement(ComponentClass, props));
                        } else if (ReactDOM.render) {
                            ReactDOM.render(React.createElement(ComponentClass, props), container);
                        }
                    } catch(mountErr) {
                        console.error('Error mounting React component: ' + compName, mountErr);
                    }
                }
            });
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', mountAllSedRazaviComponents);
        } else {
            mountAllSedRazaviComponents();
        }

        // هماهنگی با بارگذاری ایجکس و ویجت‌های المنتور
        window.addEventListener('load', mountAllSedRazaviComponents);
        document.addEventListener('sedrazavi:refresh-react-roots', mountAllSedRazaviComponents);

        ${R?`
        // اتصال به رویدادهای زنده المنتور (Elementor Frontend Hook)
        window.addEventListener('elementor/frontend/init', function() {
            if (window.elementorFrontend && window.elementorFrontend.hooks) {
                window.elementorFrontend.hooks.addAction('frontend/element_ready/global', function() {
                    mountAllSedRazaviComponents();
                });
            }
        });
        `:""}
    })();
    <\/script>
    <?php
}
add_action('wp_footer', '${t}render_react_mount_bootstrap', 99);
`),e+=`
/**
 * ==============================================================================
 * ۷. راهنمای استفاده و مستندات داخل پیشخوان وردپرس
 * ==============================================================================
 */
function ${t}react_shortcodes_admin_notice() {
    $screen = get_current_screen();
    if ($screen && $screen->id === 'dashboard') {
        ?>
        <div class="notice notice-info is-dismissible" style="border-right-color: #D4AF37;">
            <p>
                <strong>🏛️ ماژول شورت‌کدهای React دفتر وکالت SedRazavi فعال است:</strong>
                تعداد ${g.length} شورت‌کد اختصاصی آماده استفاده در برگه، نوشته و ویجت کد کوتاه المنتور می‌باشند.
            </p>
        </div>
        <?php
    }
}
add_action('admin_notices', '${t}react_shortcodes_admin_notice');
`,e}function D(s){const{shortcodePrefix:l,elementorSupport:c}=s;return`/**
 * ==============================================================================
 * موتور مانت خودکار مؤلفه‌های React در وردپرس (WordPress React Component Mount Engine)
 * ==============================================================================
 * 
 * این اسکریپت تمام نودهای DOM دارای کلاس '.sedrazavi-react-root' را اسکن کرده،
 * اطلاعات کامپوننت و data-props را استخراج نموده و با ReactDOM.createRoot مانت می‌نماید.
 */

(function(window, document) {
    'use strict';

    // رجیستری مرکزی مؤلفه‌ها
    window.SedRazaviReactComponents = window.SedRazaviReactComponents || {};

    /**
     * ثبت مؤلفه جدید در رجیستری
     * @param {string} name نام مؤلفه
     * @param {React.ComponentType} componentClass کلاس مؤلفه
     */
    window.registerSedRazaviComponent = function(name, componentClass) {
        window.SedRazaviReactComponents[name] = componentClass;
    };

    /**
     * متد اصلی مانت کردن همه ریشه‌های React در صفحه
     */
    window.SedRazaviMountReactComponents = function() {
        var targets = document.querySelectorAll('.sedrazavi-react-root:not([data-mounted="true"])');
        if (!targets || targets.length === 0) return;

        var React = window.React || (window.wp && window.wp.element);
        var ReactDOM = window.ReactDOM || (window.wp && window.wp.element);

        if (!React || !ReactDOM) {
            console.warn('SedRazavi React Mount: React or ReactDOM is not loaded yet. Waiting...');
            return;
        }

        targets.forEach(function(node) {
            var componentName = node.getAttribute('data-component');
            var rawProps = node.getAttribute('data-props');
            var props = {};

            try {
                if (rawProps) {
                    props = JSON.parse(rawProps);
                }
            } catch (err) {
                console.error('Failed to parse data-props for component ' + componentName, err, rawProps);
            }

            // ادغام با تنظیمات سرور از SedRazaviReactConfig
            if (window.SedRazaviReactConfig) {
                props.serverConfig = window.SedRazaviReactConfig;
                props.siteUrl = window.SedRazaviReactConfig.siteUrl;
                props.isRtl = window.SedRazaviReactConfig.isRtl;
                props.currentUser = window.SedRazaviReactConfig.currentUser;
                props.lawyerProfile = window.SedRazaviReactConfig.lawyerProfile;
            }

            var Component = window.SedRazaviReactComponents[componentName];
            if (Component) {
                try {
                    node.setAttribute('data-mounted', 'true');
                    node.innerHTML = ''; // حذف اسکلت لودینگ پیش‌فرض

                    if (ReactDOM.createRoot) {
                        var root = ReactDOM.createRoot(node);
                        root.render(React.createElement(Component, props));
                    } else if (ReactDOM.render) {
                        ReactDOM.render(React.createElement(Component, props), node);
                    }
                } catch (mountError) {
                    console.error('Error mounting React component: ' + componentName, mountError);
                }
            } else {
                console.info('Component [' + componentName + '] is queued, waiting for bundle registry.');
            }
        });
    };

    // اجرای اولیه پس از آماده شدن صفحه
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.SedRazaviMountReactComponents);
    } else {
        window.SedRazaviMountReactComponents();
    }

    // لیسنر برای بارگذاری تصاویر و استایل‌ها
    window.addEventListener('load', window.SedRazaviMountReactComponents);

    // هماهنگی با ایونت سفارشی جهت فراخوانی دستی بعد از تراکنش‌های Ajax
    document.addEventListener('sedrazavi:refresh-roots', window.SedRazaviMountReactComponents);

    ${c?`
    // اتصال هوشمند به پیش‌نمایش زنده ویرایشگر Elementor
    window.addEventListener('elementor/frontend/init', function() {
        if (window.elementorFrontend && window.elementorFrontend.hooks) {
            window.elementorFrontend.hooks.addAction('frontend/element_ready/global', function() {
                window.SedRazaviMountReactComponents();
            });
        }
    });
    `:""}

})(window, document);
`}function A(s){const{targetType:l,functionPrefix:c}=s;return l==="theme"?`// ==============================================================================
// اتصال پل شورت‌کدهای React دفتر وکالت SedRazavi
// این خط کد را در انتهای فایل functions.php پوسته خود قرار دهید:
// ==============================================================================
if (file_exists(get_template_directory() . '/inc/sedrazavi-react-shortcodes.php')) {
    require_once get_template_directory() . '/inc/sedrazavi-react-shortcodes.php';
}`:`// ==============================================================================
// استفاده به صورت افزونه مستقل وردپرس (Plugin)
// فایل را در مسیر wp-content/plugins/sedrazavi-react-shortcodes/sedrazavi-react-shortcodes.php
// قرار داده و از منوی «افزونه‌ها > افزونه‌های نصب‌شده» در پیشخوان وردپرس آن را فعال نمایید.
// ==============================================================================`}function V(s){const{shortcodePrefix:l,selectedComponentIds:c}=s,p=m.filter(r=>c.includes(r.id));return`# راهنمای جامع اتصال و مانت مؤلفه‌های React در وردپرس (SedRazavi React Shortcodes)

این بسته نرم‌افزاری به شما اجازه می‌دهد تمام مؤلفه‌های غنی، مدرن و تعاملی React این داشبورد (نظیر استپر رهگیری پرونده، ماشین‌حساب قضایی، پورتال موکل و...) را به راحتی از طریق **شورت‌کدهای استاندارد وردپرس** در هر برگه، نوشته، ابزارک یا المان المنتور قرار دهید.

---

## ⚡ مراحل نصب سریع (در ۲ دقیقه)

### روش اول: قرار دادن در پوسته (Theme)
1. فایل \`sedrazavi-react-shortcodes.php\` تولیدشده را داخل پوشه \`inc/\` پوسته فعال وردپرس قرار دهید:
   \`\`\`
   /wp-content/themes/sedrazavi-theme/inc/sedrazavi-react-shortcodes.php
   \`\`\`
2. خط زیر را به انتهای فایل \`functions.php\` پوسته خود بیفزایید:
   \`\`\`php
   require_once get_template_directory() . '/inc/sedrazavi-react-shortcodes.php';
   \`\`\`

### روش دوم: استفاده به عنوان افزونه اختصاصی (Plugin)
پوشه‌ای با نام \`sedrazavi-react-shortcodes\` در مسیر \`wp-content/plugins/\` بسازید و فایل تولیدشده را در آن کپی کرده و از بخش افزونه‌های وردپرس فعال کنید.

---

## 🛠️ عملکرد wp_enqueue_script و wp_localize_script

- **لود تاخیری (Lazy Enqueue):** کدهای جاوااسکریپت و استایل‌های Tailwind صرفاً در صفحاتی انکیو می‌شوند که شورت‌کد مربوطه در محتوای آن‌ها درج شده باشد.
- **تزریق امن متغیرها با wp_localize_script:**
  آبجکت سراسری \`window.SedRazaviReactConfig\` متغیرهای کلیدی زیر را از سرور به کلاینت منتقل می‌کند:
  - \`rest.endpoint\`: آدرس پایه REST API
  - \`rest.nonce\`: کلید امنیتی Nonce برای اعتبارسنجی درخواست‌های Ajax
  - \`currentUser\`: اطلاعات کاربر جاری در صورت لاگین بودن
  - \`lawyerProfile\`: اطلاعات پروانه، نام و شماره تلفن وکیل از دیتابیس وردپرس

---

## 📋 فهرست کدهای کوتاه فعال‌شده (${p.length} مؤلفه)

${p.map(r=>`### ۱. ${r.title}
- **تگ شورت‌کد:** \`[${l}${r.shortcodeTag.replace(/^react_/,"")}]\`
- **مؤلفه React:** \`<${r.componentName} />\`
- **توضیحات:** ${r.description}
- **نمونه استفاده در المنتور یا گوتنبرگ:**
\`\`\`text
[${l}${r.shortcodeTag.replace(/^react_/,"")} ${Object.entries(r.sampleAttributes).map(([n,_])=>`${n}="${_}"`).join(" ")}]
\`\`\`
- **اتریبیوت‌ها:**
${r.attributes.map(n=>`  - \`${n.name}\` (${n.label} - پیش‌فرض: \`${n.defaultValue}\`): ${n.description}`).join(`
`)}
`).join(`
---
`)}

---

## 🎨 نحوه استفاده در ویرایشگر المنتور (Elementor)
1. برگه مورد نظر را با المنتور ویرایش کنید.
2. از منوی ابزارک‌های سمت راست، ابزارک **«کد کوتاه» (Shortcode)** را به صفحه بکشید.
3. کد کوتاه دلخواه خود را در کادر پیست نمایید (برای مثال \`[${l}case_tracker case_number="۱۴۰۳-۹۵۴"]\`).
4. دکمه انتشار را بزنید. مؤلفه React همراه با استایل‌ها و داده‌های زنده به صورت آنی بارگذاری می‌شود!
`}export{S as D,m as R,D as a,A as b,V as c,E as g};
