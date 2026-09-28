import { ATTORNEY_INFO, SERVICES_DATA, TESTIMONIALS_DATA, ARTICLES_DATA, FAQ_DATA } from './mockData';

export interface ShortcodeAttributeDef {
  name: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'select';
  defaultValue: string | number | boolean;
  options?: string[];
  description: string;
}

export interface ReactComponentShortcodeDef {
  id: string;
  componentName: string;
  shortcodeTag: string;
  title: string;
  category: 'کارتابل و پرونده‌ها' | 'مالی و محاسبات' | 'رزرو و نوبت‌دهی' | 'بخش‌های اصلی و محتوا' | 'اعتبار و هویت';
  description: string;
  badge: string;
  attributes: ShortcodeAttributeDef[];
  sampleAttributes: Record<string, string | number | boolean>;
  phpDocDescription: string;
  elementorCategory: string;
}

export const REACT_SHORTCODE_DEFINITIONS: ReactComponentShortcodeDef[] = [
  {
    id: 'case-progress-tracker',
    componentName: 'CaseProgressTracker',
    shortcodeTag: 'react_case_tracker',
    title: 'استپر و رهگیری هوشمند پرونده‌های قضایی',
    category: 'کارتابل و پرونده‌ها',
    description: 'نمایش خط زمانی چندمرحله‌ای دادرسی (دادخواست، لوایح، دادرسی، تجدیدنظر، اجرای حکم) با استعلام برخط و هشدار جلسه بعدی.',
    badge: 'کارتابل موکل',
    phpDocDescription: 'شورت‌کد اختصاصی رهگیری مرحله‌به‌مرحله پرونده موکل با اتصال به دیتابیس یا ورودی دستی',
    elementorCategory: 'سید رضوی - پورتال موکلین',
    attributes: [
      { name: 'case_number', label: 'شماره پرونده', type: 'text', defaultValue: '۱۴۰۳-۲۸۴', description: 'شماره بایگانی پرونده در شعبه یا سامانه' },
      { name: 'status_code', label: 'کد وضعیت قضایی', type: 'select', defaultValue: 'HEARING_PENDING', options: ['ACTIVE', 'HEARING_PENDING', 'DECIDED', 'ENFORCEMENT'], description: 'وضعیت کلی پرونده' },
      { name: 'status_text', label: 'متن وضعیت جاری', type: 'text', defaultValue: 'در حال تبادل لوایح و بررسی نظر کارشناس رسمی', description: 'توضیحات کوتاه وضعیت' },
      { name: 'hearing_date', label: 'تاریخ جلسه بعدی دادگاه', type: 'text', defaultValue: '۱۴۰۳/۰۹/۱۸', description: 'تاریخ شمسی جلسه رسیدگی' },
      { name: 'days_remaining', label: 'روزهای باقیمانده تا جلسه', type: 'number', defaultValue: 12, description: 'شمارش معکوس به روز' },
      { name: 'show_timeline', label: 'نمایش خط زمان کامل', type: 'boolean', defaultValue: true, description: 'فعال‌سازی نمایش تمام مراحل ۵ گانه' },
    ],
    sampleAttributes: {
      case_number: '۱۴۰۳-۲۸۴',
      status_code: 'HEARING_PENDING',
      status_text: 'در حال تبادل لوایح و بررسی نظر کارشناس رسمی',
      hearing_date: '۱۴۰۳/۰۹/۱۸',
      days_remaining: 12,
      show_timeline: true,
    },
  },
  {
    id: 'court-fee-calculator',
    componentName: 'CourtFeeCalculator',
    shortcodeTag: 'react_court_calculator',
    title: 'میز جامع محاسبات قضایی، دیه و خسارت تأخیر',
    category: 'مالی و محاسبات',
    description: 'محاسبه‌گر هزینه دادرسی مراحل بدوی و تجدیدنظر، تعرفه حق‌الوکاله کانون، خسارت تأخیر تأدیه بانک مرکزی، مهریه و دیه ماه حرام.',
    badge: 'ابزار مالی',
    phpDocDescription: 'ماشین‌حساب تخصصی دعاوی مالی و کیفری بر اساس آخرین تعرفه‌های قوه قضاییه و شاخص بانک مرکزی',
    elementorCategory: 'سید رضوی - ابزارهای محاسباتی',
    attributes: [
      { name: 'default_tab', label: 'تب پیش‌فرض فعال', type: 'select', defaultValue: 'court_fee', options: ['court_fee', 'attorney_tariff', 'delay_damages', 'diyeh', 'mehrieh'], description: 'بخش فعال در زمان بارگذاری' },
      { name: 'default_claim', label: 'مبلغ پیش‌فرض خواسته (ریال)', type: 'number', defaultValue: 500000000, description: 'مبلغ اولیه در فیلد ورودی' },
      { name: 'show_tariff_guide', label: 'راهنمای فرمول محاسبات', type: 'boolean', defaultValue: true, description: 'نمایش کادرهای تشریحی قوانین زیر فرمول' },
      { name: 'enable_print', label: 'کلید چاپ رسمی فاکتور', type: 'boolean', defaultValue: true, description: 'امکان چاپ و دریافت نسخه PDF برآورد' },
    ],
    sampleAttributes: {
      default_tab: 'court_fee',
      default_claim: 500000000,
      show_tariff_guide: true,
      enable_print: true,
    },
  },
  {
    id: 'client-portal-widget',
    componentName: 'ClientPortalQuickAccessWidget',
    shortcodeTag: 'react_client_portal_widget',
    title: 'ابزارک دسترسی سریع به کارتابل و جلسات موکل',
    category: 'کارتابل و پرونده‌ها',
    description: 'خلاصه وضعیت پرونده‌های فعال موکل، تاریخ جلسات پیش‌رو، اسناد دریافتی و تسویه‌حساب‌های مالی.',
    badge: 'کارتابل موکل',
    phpDocDescription: 'ویجت داشبورد اختصاصی موکلین برای صفحات کاربری، سایدبارها یا فوتر برگه موکل',
    elementorCategory: 'سید رضوی - پورتال موکلین',
    attributes: [
      { name: 'show_financials', label: 'نمایش اطلاعات مالی', type: 'boolean', defaultValue: true, description: 'نمایش وضعیت حق‌الوکاله و اقساط' },
      { name: 'show_documents', label: 'نمایش شمارنده مدارک', type: 'boolean', defaultValue: true, description: 'آمار لوایح و مستندات بارگذاری شده' },
      { name: 'max_cases', label: 'حداکثر پرونده‌های قابل نمایش', type: 'number', defaultValue: 3, description: 'تعداد پرونده در لیست کشویی' },
    ],
    sampleAttributes: {
      show_financials: true,
      show_documents: true,
      max_cases: 3,
    },
  },
  {
    id: 'booking-section',
    componentName: 'ContactAndBookingSection',
    shortcodeTag: 'react_booking_modal',
    title: 'سامانه تقویم هوشمند نوبت‌دهی و رزرو مشاوره',
    category: 'رزرو و نوبت‌دهی',
    description: 'تقویم رزرو وقت مشاوره حضوری یا آنلاین با انتخاب شعبه، تاریخ شمسی، موضوع حقوقی و پرداخت بیعانه.',
    badge: 'نوبت‌دهی',
    phpDocDescription: 'فرم تعاملی رزرواسیون جلسه حضوری یا تلفنی با قابلیت اتصال به درگاه بانکی یا پیامک',
    elementorCategory: 'سید رضوی - تماس و رزرو',
    attributes: [
      { name: 'default_service', label: 'حوزه مشاوره پیش‌فرض', type: 'select', defaultValue: 'commercial', options: ['commercial', 'criminal', 'family', 'real-estate'], description: 'سرویس انتخابی اولیه' },
      { name: 'title', label: 'عنوان فرم رزرو', type: 'text', defaultValue: 'رزرو نوبت مشاوره با وکیل پایه یک', description: 'تیتر بالای بخش رزرو' },
      { name: 'allow_online_payment', label: 'امکان واریز پیش‌پرداخت', type: 'boolean', defaultValue: true, description: 'فعال‌سازی پرداخت بیعانه جهت تثبیت وقت' },
      { name: 'button_text', label: 'متن دکمه ثبت نوبت', type: 'text', defaultValue: 'ثبت و تایید جلسه مشاوره', description: 'متن دکمه اقدام' },
    ],
    sampleAttributes: {
      default_service: 'commercial',
      title: 'رزرو نوبت مشاوره با وکیل پایه یک',
      allow_online_payment: true,
      button_text: 'ثبت و تایید جلسه مشاوره',
    },
  },
  {
    id: 'hero-slider',
    componentName: 'LawyerHeroSlider',
    shortcodeTag: 'react_hero_slider',
    title: 'اسلایدر هیرو پرمیوم با آمار و افتخارات وکیل',
    category: 'بخش‌های اصلی و محتوا',
    description: 'اسلایدر مجلل صفحه اصلی با تصاویر باکیفیت دفتر، نشان رسمی کانون وکلا، سوابق موفقیت و کلیدهای رزرو سریع.',
    badge: 'هیرو و صفحه اصلی',
    phpDocDescription: 'بخش هدر و پرزنتیشن دفتر وکالت با انیمیشن‌های طلایی و بارگذاری بهینه شده',
    elementorCategory: 'سید رضوی - صفحات اصلی',
    attributes: [
      { name: 'autoplay', label: 'اسلاید خودکار', type: 'boolean', defaultValue: true, description: 'حرکت خودکار اسلایدها' },
      { name: 'interval', label: 'فاصله زمانی اسلاید (میلی‌ثانیه)', type: 'number', defaultValue: 5000, description: 'مدت مکث روی هر اسلاید' },
      { name: 'show_badges', label: 'نمایش نشان‌های اعتبار', type: 'boolean', defaultValue: true, description: 'مدال‌های ۲۰ سال سابقه و رتبه کانون' },
    ],
    sampleAttributes: {
      autoplay: true,
      interval: 5000,
      show_badges: true,
    },
  },
  {
    id: 'services-section',
    componentName: 'ServicesSection',
    shortcodeTag: 'react_services_grid',
    title: 'شبکه هوشمند کارت‌های خدمات حقوقی تخصصی',
    category: 'بخش‌های اصلی و محتوا',
    description: 'کارت‌های خدمات تجاری، بین‌المللی، ملکی و کیفری همراه با آیکون، هزینه تخمینی، دکمه جزئیات و استعلام.',
    badge: 'خدمات حقوقی',
    phpDocDescription: 'نمایش شبکه خدمات تخصصی با فیلتر دسته‌بندی و مودال بازشونده معرفی سرویس',
    elementorCategory: 'سید رضوی - صفحات اصلی',
    attributes: [
      { name: 'category', label: 'دسته‌بندی خدمات', type: 'select', defaultValue: 'all', options: ['all', 'commercial', 'criminal', 'family', 'real-estate'], description: 'فیلتر بر اساس حوزه تخصصی' },
      { name: 'count', label: 'تعداد خدمات', type: 'number', defaultValue: 6, description: 'حداکثر کارت‌های قابل نمایش' },
      { name: 'columns', label: 'تعداد ستون‌ها در دسکتاپ', type: 'select', defaultValue: '3', options: ['2', '3', '4'], description: 'چیدمان گرید کارت‌ها' },
      { name: 'show_fee', label: 'نمایش برآورد هزینه', type: 'boolean', defaultValue: true, description: 'نمایش تعرفه پایه در کارت' },
    ],
    sampleAttributes: {
      category: 'all',
      count: 6,
      columns: '3',
      show_fee: true,
    },
  },
  {
    id: 'testimonials-slider',
    componentName: 'TestimonialsSlider',
    shortcodeTag: 'react_testimonials_slider',
    title: 'اسلایدر تجربیات و رضایت‌نامه‌های موکلان',
    category: 'اعتبار و هویت',
    description: 'نمایش نظرات ثبت‌شده با امتیاز ستاره‌ای، مهر رسمی تایید کانون، حوزه پرونده و نتیجه دادرسی.',
    badge: 'اعتبار و رضایت',
    phpDocDescription: 'اسلایدر شیک نظرات تایید شده موکلین حقوقی و حقیقی با فونت دیپلماتیک',
    elementorCategory: 'سید رضوی - صفحات اصلی',
    attributes: [
      { name: 'count', label: 'تعداد نظرات', type: 'number', defaultValue: 4, description: 'تعداد بازخوردهای نمایشی' },
      { name: 'autoplay', label: 'چرخش اتوماتیک', type: 'boolean', defaultValue: true, description: 'انتقال اسلاید هر ۴ ثانیه' },
      { name: 'show_ratings', label: 'نمایش ستاره‌های کیفیت', type: 'boolean', defaultValue: true, description: 'نمایش امتیاز ۵ ستاره' },
    ],
    sampleAttributes: {
      count: 4,
      autoplay: true,
      show_ratings: true,
    },
  },
  {
    id: 'articles-section',
    componentName: 'ArticlesSection',
    shortcodeTag: 'react_articles_grid',
    title: 'بانک مقالات تخصصی و تحلیل آراء وحدت رویه',
    category: 'بخش‌های اصلی و محتوا',
    description: 'آخرین مقالات و یادداشت‌های حقوقی با زمان تقریبی مطالعه، دسته‌بندی موضوعی و قابلیت اشتراک‌گذاری.',
    badge: 'مقالات و آموزش',
    phpDocDescription: 'نمایش آخرین یادداشت‌ها و مقالات علمی وکیل با اتصال به پست‌های وبلاگ وردپرس',
    elementorCategory: 'سید رضوی - صفحات اصلی',
    attributes: [
      { name: 'count', label: 'تعداد مقالات', type: 'number', defaultValue: 3, description: 'تعداد آخرین مطالب' },
      { name: 'category', label: 'دسته‌بندی مقاله', type: 'select', defaultValue: 'all', options: ['all', 'commercial', 'criminal', 'civil'], description: 'فیلتر بر اساس تخصص' },
      { name: 'show_read_time', label: 'نمایش زمان مطالعه', type: 'boolean', defaultValue: true, description: 'نشان مدت زمان تخمینی خواندن' },
    ],
    sampleAttributes: {
      count: 3,
      category: 'all',
      show_read_time: true,
    },
  },
  {
    id: 'faq-section',
    componentName: 'FaqSection',
    shortcodeTag: 'react_faq_accordion',
    title: 'آکاردئون هوشمند پرسش و پاسخ‌های حقوقی',
    category: 'بخش‌های اصلی و محتوا',
    description: 'سوالات پرتکرار موکلین درباره حق‌الوکاله، ضمانت پرونده، مدت زمان دادگاه و مراحل وکالت.',
    badge: 'سوالات متداول',
    phpDocDescription: 'آکاردئون ریسپانسیو با داده‌های ساختاریافته Schema.org FAQPage جهت سئو گوگل',
    elementorCategory: 'سید رضوی - صفحات اصلی',
    attributes: [
      { name: 'count', label: 'تعداد پرسش‌ها', type: 'number', defaultValue: 5, description: 'تعداد موارد قابل مشاهده' },
      { name: 'open_first', label: 'باز بودن آیتم اول', type: 'boolean', defaultValue: true, description: 'باز بودن پیش‌فرض سوال اول' },
      { name: 'searchable', label: 'نوار جستجوی زنده در سوالات', type: 'boolean', defaultValue: true, description: 'امکان جستجوی واژگان حقوقی' },
    ],
    sampleAttributes: {
      count: 5,
      open_first: true,
      searchable: true,
    },
  },
  {
    id: 'trust-badges',
    componentName: 'TrustBadges',
    shortcodeTag: 'react_trust_badges',
    title: 'نشان‌های رسمی کانون وکلا و گواهینامه‌های ملی',
    category: 'اعتبار و هویت',
    description: 'نمایش نشان کانون وکلای دادگستری، شماره پروانه، نشان اعتماد قوه قضاییه و نماد تجارت الکترونیکی.',
    badge: 'اعتبار رسمی',
    phpDocDescription: 'بلوک مهرها و مجوزهای رسمی پروانه وکالت با قابلیت کلیک جهت اعتبارسنجی',
    elementorCategory: 'سید رضوی - صفحات اصلی',
    attributes: [
      { name: 'style', label: 'سبک چیدمان', type: 'select', defaultValue: 'grid', options: ['grid', 'compact_row', 'cards'], description: 'قالب بصری باکس‌ها' },
      { name: 'show_license', label: 'نمایش شماره پروانه وکالت', type: 'boolean', defaultValue: true, description: 'درج شماره ۱۸۴۵۲ / ک.و.م' },
      { name: 'animated', label: 'انیمیشن شناور طلایی', type: 'boolean', defaultValue: true, description: 'جلوه حرکت ملایم کارت‌ها' },
    ],
    sampleAttributes: {
      style: 'grid',
      show_license: true,
      animated: true,
    },
  },
  {
    id: 'otp-portal',
    componentName: 'OtpAuthModal',
    shortcodeTag: 'react_otp_portal',
    title: 'پرتال امن ورود موکل با سامانه پیامکی و ثنا',
    category: 'کارتابل و پرونده‌ها',
    description: 'سیستم ورود دوعاملی با ارسال کد OTP پیامکی، استعلام کد ملی و ارجاع به پنل اختصاصی موکل.',
    badge: 'امنیت و ورود',
    phpDocDescription: 'دروازه احراز هویت پیامکی بدون نیاز به رمز عبور سنتی سازگار با پیامک‌های کاوه‌نگار/فرازاس‌ام‌اس',
    elementorCategory: 'سید رضوی - پورتال موکلین',
    attributes: [
      { name: 'enable_sana_notice', label: 'پیام انطباق با ثنا', type: 'boolean', defaultValue: true, description: 'تذکر تایید هویت ثنا برای پیگیری پرونده' },
      { name: 'redirect_url', label: 'آدرس انتقال بعد از ورود', type: 'text', defaultValue: '/client-portal', description: 'مسیر ریدایرکت خودکار' },
      { name: 'button_label', label: 'متن دکمه ورود', type: 'text', defaultValue: 'ورود به سامانه جامع موکلین', description: 'عنوان دکمه بازکننده' },
    ],
    sampleAttributes: {
      enable_sana_notice: true,
      redirect_url: '/client-portal',
      button_label: 'ورود به سامانه جامع موکلین',
    },
  },
  {
    id: 'live-consultation',
    componentName: 'LiveConsultationDrawer',
    shortcodeTag: 'react_live_consultation',
    title: 'کنسول مشاوره فوری آنلاین و چت حقوقی',
    category: 'رزرو و نوبت‌دهی',
    description: 'دراور بازشونده گفتگوی حقوقی با وکیل، ارسال مستندات پرونده، پیام‌های صوتی و پاسخگویی آنلاین.',
    badge: 'مشاوره آنلاین',
    phpDocDescription: 'دراور پیام‌رسانی و مشاوره فوری با تیم حقوقی دفتر با رمزنگاری داده‌ها',
    elementorCategory: 'سید رضوی - تماس و رزرو',
    attributes: [
      { name: 'department', label: 'دپارتمان پیش‌فرض', type: 'select', defaultValue: 'corporate', options: ['corporate', 'financial', 'criminal', 'family'], description: 'بخش حقوقی پاسخ‌دهنده' },
      { name: 'button_title', label: 'عنوان دکمه شناور', type: 'text', defaultValue: 'مشاوره آنلاین با وکیل', description: 'متن دکمه اکشن' },
      { name: 'show_online_badge', label: 'نمایش نشان برخط سبز', type: 'boolean', defaultValue: true, description: 'وضعیت آنلاین بودن دفتر' },
    ],
    sampleAttributes: {
      department: 'corporate',
      button_title: 'مشاوره آنلاین با وکیل',
      show_online_badge: true,
    },
  },
  {
    id: 'story-bar',
    componentName: 'StoryBar',
    shortcodeTag: 'react_story_bar',
    title: 'استوری‌بار آموزش و اخبار فوری حقوقی',
    category: 'بخش‌های اصلی و محتوا',
    description: 'نوار استوری شبیه اینستاگرام برای انتشار ویدیوهای کوتاه نکات طلایی حقوقی و آرای جدید دادگاه‌ها.',
    badge: 'آموزش چندرسانه‌ای',
    phpDocDescription: 'نوار مدرن استوری‌های حقوقی با شمارنده بازدید و قابلیت نمایش ویدیوهای عمودی',
    elementorCategory: 'سید رضوی - صفحات اصلی',
    attributes: [
      { name: 'count', label: 'تعداد استوری‌ها', type: 'number', defaultValue: 6, description: 'حداکثر آیتم‌های نوار' },
      { name: 'enable_ring', label: 'حلقه گرادینت متحرک', type: 'boolean', defaultValue: true, description: 'حلقه طلایی دور استوری‌های دیده نشده' },
    ],
    sampleAttributes: {
      count: 6,
      enable_ring: true,
    },
  },
  {
    id: 'text-ticker',
    componentName: 'TextBannerSlider',
    shortcodeTag: 'react_text_ticker',
    title: 'نوار متحرک اعلانات قضایی و ساعات پذیرش',
    category: 'بخش‌های اصلی و محتوا',
    description: 'تیکر خبری روان بالای سایت جهت اعلام آخرین اخبار دیوان عالی، اطلاعیه‌های دادگاه و ساعات مشاوره.',
    badge: 'اعلانات فوری',
    phpDocDescription: 'نوار پیمایش خودکار اخبار و اطلاعیه‌های کانون وکلا در هدر یا بالای برگه‌ها',
    elementorCategory: 'سید رضوی - صفحات اصلی',
    attributes: [
      { name: 'speed', label: 'سرعت حرکت', type: 'select', defaultValue: 'normal', options: ['slow', 'normal', 'fast'], description: 'سرعت انیمیشن متن' },
      { name: 'show_bulletin', label: 'نمایش آیکون بلندگو', type: 'boolean', defaultValue: true, description: 'آیکون زنگوله و اعلان' },
    ],
    sampleAttributes: {
      speed: 'normal',
      show_bulletin: true,
    },
  },
  {
    id: 'comments-moderation',
    componentName: 'FrontendCommentsModeration',
    shortcodeTag: 'react_legal_comments',
    title: 'بخش پرسش و پاسخ و نظرات حقوقی موکلان',
    category: 'اعتبار و هویت',
    description: 'سیستم ثبت سوالات حقوقی کاربران با تفکیک پاسخ رسمی وکیل و اعتبارسنجی شماره تماس.',
    badge: 'دیدگاه‌ها',
    phpDocDescription: 'بخش دیدگاه‌های تعاملی با نشان‌های رسمی تاییدیه وکیل و تفکیک پاسخ‌های حقوقی',
    elementorCategory: 'سید رضوی - صفحات اصلی',
    attributes: [
      { name: 'max_display', label: 'تعداد دیدگاه اولیه', type: 'number', defaultValue: 5, description: 'تعداد کامنت‌های اولیه' },
      { name: 'allow_new_comments', label: 'امکان ارسال نظر جدید', type: 'boolean', defaultValue: true, description: 'فعال‌سازی فرم ثبت دیدگاه' },
    ],
    sampleAttributes: {
      max_display: 5,
      allow_new_comments: true,
    },
  },
];
