<?php
/**
 * SedRazavi Multi-Industry Preset Engine
 *
 * Enables 1-click transformation of the site between 6 distinct industries:
 * 1. Lawyer & Legal Services (وکیل و خدمات حقوقی)
 * 2. Web Designer & WordPress Agency (طراح وب‌سایت و آژانس وردپرس)
 * 3. Engineer, Architecture & Industrial (مهندس، معماری و محاسبات فنی)
 * 4. Corporate & Enterprise B2B (شرکتی، بازرگانی و سرمایه‌گذاری)
 * 5. Doctor & Healthcare Clinic (پزشک، کلینیک و سلامت)
 * 6. Project Showcase & SaaS Launch (معرفی پروژه / محصول و SaaS)
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Preset_Engine {

    const OPTION_KEY = 'sedrazavi_site_preset';
    const CUSTOM_DATA_OPTION_KEY = 'sedrazavi_preset_custom_overrides';

    /**
     * Get list of all 6 available industry presets with rich defaults
     */
    public static function get_all_presets() {
        return array(
            'lawyer' => array(
                'id'                 => 'lawyer',
                'name'               => 'دفتر وکالت و امور حقوقی',
                'english_name'       => 'Lawyer & Legal Services',
                'badge'              => 'حقوقی و داوری تخصصی',
                'site_title'         => 'دفتر وکالت و مشاوره حقوقی دکتر سیده مریم رضوی',
                'site_tagline'       => 'دفاع تخصصی در مراجع قضایی، داوری تجاری و دعاوی املاک',
                'hero_kicker'        => 'وکیل پایه یک دادگستری و مشاور حقوقی',
                'hero_title'         => 'دفاع تخصصی، مشاوره استراتژیک و حمایت قاطع از حقوق قانونی شما',
                'hero_desc'          => 'پیگیری تخصصی پرونده‌های ملکی، داوری تجاری، دیوان عدالت اداری و دعاوی اقتصادی با رویکرد تحلیلی و مستندسازی دقیق.',
                'hero_cta_primary'   => 'رزرو وقت مشاوره حضوری و آنلاین',
                'hero_cta_secondary' => 'استعلام آنلاین وضعیت پرونده',
                'accent_color'       => '#D4AF37',
                'accent_hover'       => '#B8972E',
                'terms'              => array(
                    'client'         => 'موکل',
                    'clients'        => 'موکلین',
                    'case'           => 'پرونده',
                    'cases'          => 'پرونده‌ها',
                    'inquiry'        => 'استعلام و پیگیری پرونده قضایی',
                    'booking'        => 'رزرو وقت مشاوره حقوقی',
                    'booking_btn'    => 'ثبت نوبت مشاوره ←',
                    'fee'            => 'حق‌الوکاله و تمبر مالیاتی',
                    'expert'         => 'وکیل پایه یک دادگستری',
                ),
                'services'           => array(
                    array(
                        'id'    => 'serv-1',
                        'title' => 'دعاوی ملکی، سرقفلی و اراضی',
                        'desc'  => 'دفاع تخصصی در پرونده‌های الزام به تنظیم سند، خلع ید، تصرف عدوانی و دعاوی شهرداری.',
                        'tag'   => 'حقوقی و ملکی',
                    ),
                    array(
                        'id'    => 'serv-2',
                        'title' => 'داوری و دعاوی تجاری شرکت‌ها',
                        'desc'  => 'حل‌وفصل اختلافات قراردادی، داوری داخلی و بین‌المللی و دعاوی شرکت‌های تجاری.',
                        'tag'   => 'تجاری و بازرگانی',
                    ),
                    array(
                        'id'    => 'serv-3',
                        'title' => 'دعاوی دیوان عدالت اداری',
                        'desc'  => 'ابطال مصوبات غیرقانونی، دعاوی مالیاتی، کمیسیون ماده ۱۰۰ و دعاوی استخدامی.',
                        'tag'   => 'دیوان و اداری',
                    ),
                    array(
                        'id'    => 'serv-4',
                        'title' => 'جرایم اقتصادی و سایبری',
                        'desc'  => 'دفاع فنی در اتهامات کلاهبرداری رایانه‌ای، پولشویی، خیانت در امانت و جرایم مالی.',
                        'tag'   => 'کیفری و اقتصادی',
                    ),
                ),
                'stats'              => array(
                    array('label' => 'درصد موفقیت آراء', 'value' => '۹۴.۸٪'),
                    array('label' => 'پرونده‌های مختومه', 'value' => '+۱,۲۵۰'),
                    array('label' => 'سال سابقه وکالت حرفه‌ای', 'value' => '۱۸ سال'),
                ),
            ),

            'web_agency' => array(
                'id'                 => 'web_agency',
                'name'               => 'طراح وب‌سایت و آژانس وردپرس',
                'english_name'       => 'Web Designer & WP Agency',
                'badge'              => 'توسعه تخصصی وب و وردپرس',
                'site_title'         => 'استودیو طراحی وب و راه‌کارهای وردپرس',
                'site_tagline'       => 'طراحی پوسته‌های سفارشی، سئو فنی و توسعه وب‌سایت‌های مقیاس‌پذیر',
                'hero_kicker'        => 'استودیو طراحی و مهندسی فرانت‌اند',
                'hero_title'         => 'طراحی وب‌سایت‌های متمایز، سریع و تبدیل‌گرا برای کسب‌وکارهای پیشرو',
                'hero_desc'          => 'طراحی رابط کاربری اختصاصی (UI/UX)، پیاده‌سازی سریع با Tailwind و وردپرس با رعایت بالاترین استانداردهای پرفورمنس و سئو.',
                'hero_cta_primary'   => 'ثبت سفارش و برآورد هزینه پروژه',
                'hero_cta_secondary' => 'مشاهده نمونه‌کارها و پروژه‌ها',
                'accent_color'       => '#6366F1',
                'accent_hover'       => '#4F46E5',
                'terms'              => array(
                    'client'         => 'کارفرما',
                    'clients'        => 'کارفرمایان',
                    'case'           => 'سفارش و پروژه',
                    'cases'          => 'پروژه‌ها',
                    'inquiry'        => 'پیگیری وضعیت مراحل پروژه و تیکت‌ها',
                    'booking'        => 'رزرو جلسه بریف و ارزیابی پروژه',
                    'booking_btn'    => 'ثبت درخواست سفارش ←',
                    'fee'            => 'برآورد مالی و پیش‌فاکتور',
                    'expert'         => 'معمار وب و طراح ارشد',
                ),
                'services'           => array(
                    array(
                        'id'    => 'serv-1',
                        'title' => 'طراحی اختصاصی قالب وردپرس',
                        'desc'  => 'کدنویسی استاندارد، بدون وابستگی‌های حجیم، بهینه‌شده برای المنتور و بلوک‌های گوتنبرگ.',
                        'tag'   => 'توسعه اختصاصی',
                    ),
                    array(
                        'id'    => 'serv-2',
                        'title' => 'بهینه‌سازی سرعت و Core Web Vitals',
                        'desc'  => 'کسب نمره ۹۵+ در PageSpeed Insights با بهینه‌سازی لود دارایی‌ها و کش هوشمند.',
                        'tag'   => 'پرفورمنس و سئو',
                    ),
                    array(
                        'id'    => 'serv-3',
                        'title' => 'طراحی رابط و تجربه کاربری (UI/UX)',
                        'desc'  => 'طراحی سیستم طراحی (Design System) مدرن در فیگما با پروتوتایپ تست‌شده با کاربر.',
                        'tag'   => 'طراحی محصول',
                    ),
                    array(
                        'id'    => 'serv-4',
                        'title' => 'توسعه افزونه و یکپارچه‌سازی API',
                        'desc'  => 'پیاده‌سازی درگاه‌های پرداخت، وب‌سرویس‌های پیامکی و اتصال به سامانه‌های CRM و انبارداری.',
                        'tag'   => 'فول‌استک وب',
                    ),
                ),
                'stats'              => array(
                    array('label' => 'پروژه‌های موفق وب', 'value' => '+۳۲۰'),
                    array('label' => 'میانگین سرعت لود', 'value' => '۰.۸ ثانیه'),
                    array('label' => 'رضایت کارفرمایان', 'value' => '۹۹.۲٪'),
                ),
            ),

            'engineering' => array(
                'id'                 => 'engineering',
                'name'               => 'دفتر مهندسی و معماری',
                'english_name'       => 'Engineering & Architecture',
                'badge'              => 'طراحی سازه، نظارت و مدیریت پیمان',
                'site_title'         => 'گروه مهندسین مشاور و طراحی سازه',
                'site_tagline'       => 'محاسبات دقیق سازه، طراحی معماری پایدار و مدیریت اجرای پروژه‌های عمرانی',
                'hero_kicker'        => 'مهندسین مشاور پایه یک نظام مهندسی',
                'hero_title'         => 'مهندسی دقیق، معماری خلاقانه و اجرای بی‌نقص سازه‌های ماندگار',
                'hero_desc'          => 'ارائه خدمات جامع مهندسی شامل محاسبات سازه، طراحی پلان و نما، نظارت عالیه کارگاهی و مدیریت پیمان با کنترل دقیق هزینه‌ها.',
                'hero_cta_primary'   => 'درخواست مشاوره فنی و بازدید محل',
                'hero_cta_secondary' => 'پیگیری مستندات و نقشه‌های مهندسی',
                'accent_color'       => '#F59E0B',
                'accent_hover'       => '#D97706',
                'terms'              => array(
                    'client'         => 'کارفرما',
                    'clients'        => 'کارفرمایان',
                    'case'           => 'پروژه عمرانی',
                    'cases'          => 'پروژه‌ها و کارگاه‌ها',
                    'inquiry'        => 'استعلام کد نظارت و گزارش‌های کارگاهی',
                    'booking'        => 'هماهنگی جلسه کارشناسی و بازدید زمین',
                    'booking_btn'    => 'ثبت درخواست بازدید فنی ←',
                    'fee'            => 'برآورد متره و برآورد اجرایی',
                    'expert'         => 'مهندس محاسب و ناظر ارشد',
                ),
                'services'           => array(
                    array(
                        'id'    => 'serv-1',
                        'title' => 'محاسبات و طراحی سازه (ETABS/SAFE)',
                        'desc'  => 'طراحی بهینه سازه‌های بتنی و فولادی مقاوم در برابر زلزله با حداقل پرت مصالح.',
                        'tag'   => 'محاسبات سازه',
                    ),
                    array(
                        'id'    => 'serv-2',
                        'title' => 'طراحی معماری فاز ۱ و فاز ۲',
                        'desc'  => 'طراحی پلان‌های کاربردی، دیاگرام حرکتی و نقشه‌های اجرایی منطبق بر مقررات ملی ساختمان.',
                        'tag'   => 'معماری و نما',
                    ),
                    array(
                        'id'    => 'serv-3',
                        'title' => 'نظارت عالیه و بازرسی کارگاهی',
                        'desc'  => 'کنترل انطباق اجرا با نقشه‌ها، آزمون‌های بتن و فولاد و ثبت گزارش‌های مرحله‌ای شهرداری.',
                        'tag'   => 'نظارت و ژئوتکنیک',
                    ),
                    array(
                        'id'    => 'serv-4',
                        'title' => 'مدیریت پیمان و کنترل پروژه (MSP)',
                        'desc'  => 'برنامه‌ریزی زمان‌بندی، متره و برآورد، مدیریت مالی و انتخاب پیمانکاران جزء با شفافیت کامل.',
                        'tag'   => 'مدیریت پیمان',
                    ),
                ),
                'stats'              => array(
                    array('label' => 'مترمربع سازه اجراشده', 'value' => '+۴۵۰,۰۰۰'),
                    array('label' => 'پروژه‌های نظارتی موفق', 'value' => '+۱۸۰'),
                    array('label' => 'دقت در کنترل بودجه', 'value' => '۹۷.۴٪'),
                ),
            ),

            'corporate' => array(
                'id'                 => 'corporate',
                'name'               => 'شرکتی و بازرگانی بین‌الملل',
                'english_name'       => 'Corporate & Enterprise B2B',
                'badge'              => 'توسعه بازار و خدمات بازرگانی',
                'site_title'         => 'هلدینگ تجارت بین‌الملل و خدمات سرمایه‌گذاری',
                'site_tagline'       => 'تسهیل زنجیره تامین، ترخیص کالا و مشاوره استراتژیک تجارت فرامرزی',
                'hero_kicker'        => 'هلدینگ بازرگانی و سرمایه‌گذاری B2B',
                'hero_title'         => 'گسترش بازارهای صادراتی و مدیریت هوشمند زنجیره تأمین بین‌المللی',
                'hero_desc'          => 'همراهی شرکت‌های تجاری و تولیدی در مبادلات ارزی، ترخیص گمرکی، ثبت سفارشات خارجی و انعقاد قراردادهای بین‌المللی با ریسک صفر.',
                'hero_cta_primary'   => 'درخواست جلسه مذاکره B2B',
                'hero_cta_secondary' => 'استعلام وضعیت محموله و پیش‌فاکتور',
                'accent_color'       => '#2563EB',
                'accent_hover'       => '#1D4ED8',
                'terms'              => array(
                    'client'         => 'شریک تجاری',
                    'clients'        => 'شرکای تجاری و مشتریان سازمانی',
                    'case'           => 'قرارداد بازرگانی',
                    'cases'          => 'قراردادها و محموله‌ها',
                    'inquiry'        => 'پیگیری وضعیت سفارش و اسناد حمل',
                    'booking'        => 'هماهنگی جلسه تجاری و مشاوره صادرات',
                    'booking_btn'    => 'درخواست همکاری سازمانی ←',
                    'fee'            => 'ارزش گمرکی و پیش‌فاکتور ارزی',
                    'expert'         => 'مشاور ارشد تجارت بین‌الملل',
                ),
                'services'           => array(
                    array(
                        'id'    => 'serv-1',
                        'title' => 'تامین کالا و سورسینگ بین‌المللی',
                        'desc'  => 'شناسایی و اعتبارسنجی تولیدکنندگان معتبر جهانی در آسیا، اروپا و خاورمیانه.',
                        'tag'   => 'سورسینگ و بازرگانی',
                    ),
                    array(
                        'id'    => 'serv-2',
                        'title' => 'خدمات ترخیص کالا و امور گمرکی',
                        'desc'  => 'ترخیص سریع و قانونی کالا از گمرکات کشور با حداقل هزینه‌های انبارداری و دموراژ.',
                        'tag'   => 'گمرک و ترخیص',
                    ),
                    array(
                        'id'    => 'serv-3',
                        'title' => 'حمل‌ونقل بین‌المللی چندوجهی',
                        'desc'  => 'پوشش خطوط دریایی، هوایی و زمینی با ارائه بیمه‌نامه‌های معتبر بین‌المللی.',
                        'tag'   => 'لجستیک و ترانزیت',
                    ),
                    array(
                        'id'    => 'serv-4',
                        'title' => 'مشاوره قراردادها و پرداخت‌های ارزی',
                        'desc'  => 'انعقاد قراردادهای تجاری منطبق بر اینکوترمز ۲۰۲۰ و مدیریت پرداخت‌های امن بین‌المللی.',
                        'tag'   => 'مالی و بین‌الملل',
                    ),
                ),
                'stats'              => array(
                    array('label' => 'حجم مراودات بازرگانی', 'value' => '+$۱۲۰M'),
                    array('label' => 'کشورهای تحت پوشش', 'value' => '۲۴ کشور'),
                    array('label' => 'زمان میانگین ترخیص', 'value' => '۴ روز کاری'),
                ),
            ),

            'doctor' => array(
                'id'                 => 'doctor',
                'name'               => 'پزشک و کلینیک سلامت',
                'english_name'       => 'Doctor & Healthcare Clinic',
                'badge'              => 'مراقبت‌های تخصصی سلامت و درمان',
                'site_title'         => 'مرکز تخصصی درمان و خدمات پزشکی سلامت',
                'site_tagline'       => 'ارائه پیشرفته‌ترین خدمات تشخیصی، درمانی و مشاوره‌های تخصصی سلامت',
                'hero_kicker'        => 'متخصص و جراح با بورد تخصصی',
                'hero_title'         => 'رویکردی نوین در تشخیص، درمان و مراقبت همه‌جانبه از سلامت شما',
                'hero_desc'          => 'بهره‌گیری از تجهیزات پیشرفته تشخیصی، کادر مجرب درمانی و سیستم جامع ویزیت حضوری و آنلاین با رعایت پروتکل‌های استاندارد پزشکی.',
                'hero_cta_primary'   => 'رزرو آنلاین نوبت ویزیت و معاینه',
                'hero_cta_secondary' => 'پیگیری نتایج آزمایش و پرونده سلامت',
                'accent_color'       => '#0D9488',
                'accent_hover'       => '#0F766E',
                'terms'              => array(
                    'client'         => 'بیمار / مراجع',
                    'clients'        => 'بیماران و مراجعین',
                    'case'           => 'پرونده پزشکی',
                    'cases'          => 'پرونده‌های سلامت',
                    'inquiry'        => 'استعلام و مشاهده پرونده سلامت',
                    'booking'        => 'رزرو وقت معاینه و ویزیت',
                    'booking_btn'    => 'دریافت نوبت ویزیت ←',
                    'fee'            => 'تعرفه مصوب نظام پزشکی',
                    'expert'         => 'پزشک متخصص',
                ),
                'services'           => array(
                    array(
                        'id'    => 'serv-1',
                        'title' => 'معاینات دوره‌ای و ویزیت تخصصی',
                        'desc'  => 'بررسی همه‌جانبه شرح حال، معاینات بالینی و طراحی نقشه درمان اختصاصی هر بیمار.',
                        'tag'   => 'ویزیت بالینی',
                    ),
                    array(
                        'id'    => 'serv-2',
                        'title' => 'مشاوره آنلاین و تله‌مدیسین',
                        'desc'  => 'امکان ارسال نتایج آزمایش، تصویربرداری و دریافت دستورات دارویی از راه دور.',
                        'tag'   => 'مشاوره آنلاین',
                    ),
                    array(
                        'id'    => 'serv-3',
                        'title' => 'خدمات پاراکلینیک و تشخیصی',
                        'desc'  => 'انجام آزمایش‌های سریع، نوار قلب، سونوگرافی و ارزیابی‌های اولیه با دقت بالا.',
                        'tag'   => 'تشخیص و آزمایش',
                    ),
                    array(
                        'id'    => 'serv-4',
                        'title' => 'مراقبت‌های پیشگیرانه و رژیم سلامت',
                        'desc'  => 'برنامه‌ریزی سبک زندگی سالم، غربالگری دوره‌ای و پایش مداوم بیماری‌های مزمن.',
                        'tag'   => 'پیشگیری و سلامت',
                    ),
                ),
                'stats'              => array(
                    array('label' => 'مراجعین بهبودیافته', 'value' => '+۱۴,۰۰۰'),
                    array('label' => 'رضایت مراجعین', 'value' => '۹۹.۶٪'),
                    array('label' => 'سال سابقه طبابت', 'value' => '۱۵ سال'),
                ),
            ),

            'project_saas' => array(
                'id'                 => 'project_saas',
                'name'               => 'معرفی پروژه / محصول و SaaS',
                'english_name'       => 'Project Showcase & SaaS Launch',
                'badge'              => 'پلتفرم ابری نسل جدید',
                'site_title'         => 'سامانه ابری و پلتفرم نسل جدید تحلیلی',
                'site_tagline'       => 'پلتفرم یکپارچه هوش مصنوعی، اتوماسیون سازمانی و تحلیل داده‌ها',
                'hero_kicker'        => 'انتشار نسخه ابری ۳.۰ (Cloud Platform)',
                'hero_title'         => 'اتوماسیون هوشمند، تحلیل بی‌درنگ و مقیاس‌پذیری نامحدود برای تیم‌ها',
                'hero_desc'          => 'با پلتفرم ابری ما داده‌های سازمانی خود را متمرکز کنید، گردش‌کارهای تکراری را خودکار سازید و در لحظه گزارش‌های تحلیلی دریافت کنید.',
                'hero_cta_primary'   => 'شروع دوره آزمایشی رایگان ۱۴ روزه',
                'hero_cta_secondary' => 'مشاهده مستندات فنی و API',
                'accent_color'       => '#10B981',
                'accent_hover'       => '#059669',
                'terms'              => array(
                    'client'         => 'کاربر',
                    'clients'        => 'کاربران و اعضای سازمان',
                    'case'           => 'سرویس و اشتراک',
                    'cases'          => 'اشتراک‌ها و تیکت‌ها',
                    'inquiry'        => 'پیگیری وضعیت سفارش و کلیدهای API',
                    'booking'        => 'درخواست جلسه دمو اختصاصی',
                    'booking_btn'    => 'ثبت نام و شروع رایگان ←',
                    'fee'            => 'طرح‌های اشتراک ماهانه و سالانه',
                    'expert'         => 'مشاور فنی و راهبر محصول',
                ),
                'services'           => array(
                    array(
                        'id'    => 'serv-1',
                        'title' => 'موتور پردازش داده در لحظه (Realtime)',
                        'desc'  => 'تحلیل میلیون‌ها رویداد در ثانیه با معماری توزیع‌شده بدون قطعی و با تاخیر میلی‌ثانیه‌ای.',
                        'tag'   => 'زیرساخت ابری',
                    ),
                    array(
                        'id'    => 'serv-2',
                        'title' => 'اتصال‌دهنده‌ها و API جامع',
                        'desc'  => 'بیش از ۵۰ کانکتور آماده برای اتصال به دیتابیس‌ها، وب‌هوک‌ها و ابزارهای ارتباطی محبوب.',
                        'tag'   => 'اتوماسیون و API',
                    ),
                    array(
                        'id'    => 'serv-3',
                        'title' => 'امنیت اطلاعات و استاندارد SOC 2',
                        'desc'  => 'رمزنگاری کامل داده‌ها در مبدا و مقصد، پشتیبان‌گیری منظم و احراز هویت چندعاملی سازمانی.',
                        'tag'   => 'امنیت سازمانی',
                    ),
                    array(
                        'id'    => 'serv-4',
                        'title' => 'داشبوردهای تحلیلی تعاملی',
                        'desc'  => 'تصویرسازی بصری KPIها، فیلترهای پیشرفته و قابلیت برون‌بری گزارش‌ها در فرمت‌های اکسل و PDF.',
                        'tag'   => 'گزارش و تحلیل',
                    ),
                ),
                'stats'              => array(
                    array('label' => 'نرخ پایداری سرویس (SLA)', 'value' => '۹۹.۹۹٪'),
                    array('label' => 'سازمان‌های فعال', 'value' => '+۸۵۰'),
                    array('label' => 'درخواست پردازش‌شده روزانه', 'value' => '+۵M'),
                ),
            ),
        );
    }

    /**
     * Get active preset ID
     *
     * @return string
     */
    public static function get_active_preset_id() {
        $preset_id = get_option(self::OPTION_KEY, 'lawyer');
        $presets = self::get_all_presets();
        if (!isset($presets[$preset_id])) {
            return 'lawyer';
        }
        return $preset_id;
    }

    /**
     * Set active preset ID
     *
     * @param string $preset_id
     * @return bool
     */
    public static function set_active_preset($preset_id) {
        $presets = self::get_all_presets();
        if (!isset($presets[$preset_id])) {
            return false;
        }
        return update_option(self::OPTION_KEY, sanitize_key($preset_id));
    }

    /**
     * Get full active preset configuration including any granular custom overrides
     *
     * @return array
     */
    public static function get_active_preset() {
        $preset_id = self::get_active_preset_id();
        $presets   = self::get_all_presets();
        $preset    = $presets[$preset_id];

        // Apply custom overrides if stored
        $overrides = get_option(self::CUSTOM_DATA_OPTION_KEY, array());
        if (!empty($overrides) && is_array($overrides) && isset($overrides[$preset_id])) {
            $preset = array_replace_recursive($preset, $overrides[$preset_id]);
        }

        return $preset;
    }

    /**
     * Get specific terminology string for the active preset
     *
     * @param string $term_key
     * @param string $default
     * @return string
     */
    public static function get_term($term_key, $default = '') {
        $preset = self::get_active_preset();
        if (isset($preset['terms'][$term_key])) {
            return $preset['terms'][$term_key];
        }
        return $default;
    }

    /**
     * Render dynamic CSS accent variables matching active preset
     */
    public static function render_preset_css_variables() {
        $preset = self::get_active_preset();
        $accent = !empty($preset['accent_color']) ? esc_attr($preset['accent_color']) : '#D4AF37';
        $hover  = !empty($preset['accent_hover']) ? esc_attr($preset['accent_hover']) : '#B8972E';

        echo "<style id=\"sedrazavi-preset-theme-tokens\">\n";
        echo "  :root {\n";
        echo "    --sr-gold-accent: {$accent};\n";
        echo "    --sr-accent-hover: {$hover};\n";
        echo "    --sr-preset-accent: {$accent};\n";
        echo "  }\n";
        echo "</style>\n";
    }

    /**
     * Seed sample posts and inquiries for demo content import
     *
     * @param string $preset_id
     * @return array Report of seeded items
     */
    public static function seed_demo_content($preset_id) {
        $presets = self::get_all_presets();
        if (!isset($presets[$preset_id])) {
            return array('success' => false, 'message' => 'پریست انتخابی نامعتبر است.');
        }

        $preset = $presets[$preset_id];
        $seeded_services = 0;

        foreach ($preset['services'] as $svc) {
            $post_title = $svc['title'];
            $existing = get_page_by_title($post_title, OBJECT, 'lawyer_service');
            if (!$existing) {
                $pid = wp_insert_post(array(
                    'post_title'   => sanitize_text_field($post_title),
                    'post_content' => sanitize_textarea_field($svc['desc']),
                    'post_type'    => 'lawyer_service',
                    'post_status'  => 'publish',
                ));
                if ($pid && !is_wp_error($pid)) {
                    update_post_meta($pid, '_sedrazavi_service_category', $svc['tag']);
                    $seeded_services++;
                }
            }
        }

        return array(
            'success'         => true,
            'preset'          => $preset_id,
            'preset_name'     => $preset['name'],
            'seeded_services' => $seeded_services,
            'message'         => sprintf('محتوای دموی صنف «%s» با موفقیت درون‌ریزی و فعال گردید.', $preset['name']),
        );
    }
}

// Hook dynamic CSS into wp_head
add_action('wp_head', array('SedRazavi_Preset_Engine', 'render_preset_css_variables'), 2);

/**
 * Global helper: Get all presets
 */
function sedrazavi_get_all_presets() {
    return SedRazavi_Preset_Engine::get_all_presets();
}

/**
 * Global helper: Get active preset data
 */
function sedrazavi_get_preset($preset_id = null) {
    return SedRazavi_Preset_Engine::get_preset($preset_id);
}

/**
 * Global helper: Get dynamic term for active preset
 */
function sedrazavi_get_term($key, $default = '') {
    return SedRazavi_Preset_Engine::get_term($key, $default);
}
