/**
 * Multi-Industry Preset Definitions and State Store for SedRazavi
 *
 * Supports 6 distinct business & professional presets:
 * 1. lawyer (وکیل و امور حقوقی)
 * 2. web_agency (طراح وب‌سایت و آژانس وردپرس)
 * 3. engineering (دفتر مهندسی و معماری)
 * 4. corporate (شرکتی و بازرگانی بین‌الملل)
 * 5. doctor (پزشک و کلینیک سلامت)
 * 6. project_saas (معرفی پروژه / محصول و SaaS)
 */

export interface IndustryService {
  id: string;
  title: string;
  desc: string;
  tag: string;
  iconName?: string;
}

export interface IndustryStat {
  label: string;
  value: string;
}

export interface IndustryTerms {
  client: string;
  clients: string;
  case: string;
  cases: string;
  inquiry: string;
  booking: string;
  booking_btn: string;
  fee: string;
  expert: string;
}

export interface IndustryPreset {
  id: 'lawyer' | 'web_agency' | 'engineering' | 'corporate' | 'doctor' | 'project_saas';
  name: string;
  english_name: string;
  badge: string;
  icon: string;
  site_title: string;
  site_tagline: string;
  hero_kicker: string;
  hero_title: string;
  hero_desc: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  accent_color: string;
  accent_hover: string;
  terms: IndustryTerms;
  services: IndustryService[];
  stats: IndustryStat[];
}

export const INDUSTRY_PRESETS: Record<string, IndustryPreset> = {
  lawyer: {
    id: 'lawyer',
    name: 'دفتر وکالت و امور حقوقی',
    english_name: 'Lawyer & Legal Services',
    badge: 'حقوقی و داوری تخصصی',
    icon: 'Scale',
    site_title: 'دفتر وکالت و مشاوره حقوقی دکتر سیده مریم رضوی',
    site_tagline: 'دفاع تخصصی در مراجع قضایی، داوری تجاری و دعاوی املاک',
    hero_kicker: 'وکیل پایه یک دادگستری و مشاور حقوقی',
    hero_title: 'دفاع تخصصی، مشاوره استراتژیک و حمایت قاطع از حقوق قانونی شما',
    hero_desc: 'پیگیری تخصصی پرونده‌های ملکی، داوری تجاری، دیوان عدالت اداری و دعاوی اقتصادی با رویکرد تحلیلی و مستندسازی دقیق.',
    hero_cta_primary: 'رزرو وقت مشاوره حضوری و آنلاین',
    hero_cta_secondary: 'استعلام آنلاین وضعیت پرونده',
    accent_color: '#D4AF37',
    accent_hover: '#B8972E',
    terms: {
      client: 'موکل',
      clients: 'موکلین',
      case: 'پرونده',
      cases: 'پرونده‌ها',
      inquiry: 'استعلام و پیگیری پرونده قضایی',
      booking: 'رزرو وقت مشاوره حقوقی',
      booking_btn: 'ثبت نوبت مشاوره ←',
      fee: 'حق‌الوکاله و تمبر مالیاتی',
      expert: 'وکیل پایه یک دادگستری',
    },
    services: [
      {
        id: 'serv-1',
        title: 'دعاوی ملکی، سرقفلی و اراضی',
        desc: 'دفاع تخصصی در پرونده‌های الزام به تنظیم سند، خلع ید، تصرف عدوانی و دعاوی شهرداری.',
        tag: 'حقوقی و ملکی',
        iconName: 'Building',
      },
      {
        id: 'serv-2',
        title: 'داوری و دعاوی تجاری شرکت‌ها',
        desc: 'حل‌وفصل اختلافات قراردادی، داوری داخلی و بین‌المللی و دعاوی شرکت‌های تجاری.',
        tag: 'تجاری و بازرگانی',
        iconName: 'Briefcase',
      },
      {
        id: 'serv-3',
        title: 'دعاوی دیوان عدالت اداری',
        desc: 'ابطال مصوبات غیرقانونی، دعاوی مالیاتی، کمیسیون ماده ۱۰۰ و دعاوی استخدامی.',
        tag: 'دیوان و اداری',
        iconName: 'FileText',
      },
      {
        id: 'serv-4',
        title: 'جرایم اقتصادی و سایبری',
        desc: 'دفاع فنی در اتهامات کلاهبرداری رایانه‌ای، پولشویی، خیانت در امانت و جرایم مالی.',
        tag: 'کیفری و اقتصادی',
        iconName: 'ShieldAlert',
      },
    ],
    stats: [
      { label: 'درصد موفقیت آراء', value: '۹۴.۸٪' },
      { label: 'پرونده‌های مختومه', value: '+۱,۲۵۰' },
      { label: 'سال سابقه وکالت حرفه‌ای', value: '۱۸ سال' },
    ],
  },

  web_agency: {
    id: 'web_agency',
    name: 'طراح وب‌سایت و آژانس وردپرس',
    english_name: 'Web Designer & WP Agency',
    badge: 'توسعه تخصصی وب و وردپرس',
    icon: 'Layout',
    site_title: 'استودیو طراحی وب و راه‌کارهای وردپرس',
    site_tagline: 'طراحی پوسته‌های سفارشی، سئو فنی و توسعه وب‌سایت‌های مقیاس‌پذیر',
    hero_kicker: 'استودیو طراحی و مهندسی فرانت‌اند',
    hero_title: 'طراحی وب‌سایت‌های متمایز، سریع و تبدیل‌گرا برای کسب‌وکارهای پیشرو',
    hero_desc: 'طراحی رابط کاربری اختصاصی (UI/UX)، پیاده‌سازی سریع با Tailwind و وردپرس با رعایت بالاترین استانداردهای پرفورمنس و سئو.',
    hero_cta_primary: 'ثبت سفارش و برآورد هزینه پروژه',
    hero_cta_secondary: 'مشاهده نمونه‌کارها و پروژه‌ها',
    accent_color: '#6366F1',
    accent_hover: '#4F46E5',
    terms: {
      client: 'کارفرما',
      clients: 'کارفرمایان',
      case: 'سفارش و پروژه',
      cases: 'پروژه‌ها',
      inquiry: 'پیگیری وضعیت مراحل پروژه و تیکت‌ها',
      booking: 'رزرو جلسه بریف و ارزیابی پروژه',
      booking_btn: 'ثبت درخواست سفارش ←',
      fee: 'برآورد مالی و پیش‌فاکتور',
      expert: 'معمار وب و طراح ارشد',
    },
    services: [
      {
        id: 'serv-1',
        title: 'طراحی اختصاصی قالب وردپرس',
        desc: 'کدنویسی استاندارد، بدون وابستگی‌های حجیم، بهینه‌شده برای المنتور و بلوک‌های گوتنبرگ.',
        tag: 'توسعه اختصاصی',
        iconName: 'Code',
      },
      {
        id: 'serv-2',
        title: 'بهینه‌سازی سرعت و Core Web Vitals',
        desc: 'کسب نمره ۹۵+ در PageSpeed Insights با بهینه‌سازی لود دارایی‌ها و کش هوشمند.',
        tag: 'پرفورمنس و سئو',
        iconName: 'Zap',
      },
      {
        id: 'serv-3',
        title: 'طراحی رابط و تجربه کاربری (UI/UX)',
        desc: 'طراحی سیستم طراحی (Design System) مدرن در فیگما با پروتوتایپ تست‌شده با کاربر.',
        tag: 'طراحی محصول',
        iconName: 'PenTool',
      },
      {
        id: 'serv-4',
        title: 'توسعه افزونه و یکپارچه‌سازی API',
        desc: 'پیاده‌سازی درگاه‌های پرداخت، وب‌سرویس‌های پیامکی و اتصال به سامانه‌های CRM و انبارداری.',
        tag: 'فول‌استک وب',
        iconName: 'Cpu',
      },
    ],
    stats: [
      { label: 'پروژه‌های موفق وب', value: '+۳۲۰' },
      { label: 'میانگین سرعت لود', value: '۰.۸ ثانیه' },
      { label: 'رضایت کارفرمایان', value: '۹۹.۲٪' },
    ],
  },

  engineering: {
    id: 'engineering',
    name: 'دفتر مهندسی و معماری',
    english_name: 'Engineering & Architecture',
    badge: 'طراحی سازه، نظارت و مدیریت پیمان',
    icon: 'Compass',
    site_title: 'گروه مهندسین مشاور و طراحی سازه',
    site_tagline: 'محاسبات دقیق سازه، طراحی معماری پایدار و مدیریت اجرای پروژه‌های عمرانی',
    hero_kicker: 'مهندسین مشاور پایه یک نظام مهندسی',
    hero_title: 'مهندسی دقیق، معماری خلاقانه و اجرای بی‌نقص سازه‌های ماندگار',
    hero_desc: 'ارائه خدمات جامع مهندسی شامل محاسبات سازه، طراحی پلان و نما، نظارت عالیه کارگاهی و مدیریت پیمان با کنترل دقیق هزینه‌ها.',
    hero_cta_primary: 'درخواست مشاوره فنی و بازدید محل',
    hero_cta_secondary: 'پیگیری مستندات و نقشه‌های مهندسی',
    accent_color: '#F59E0B',
    accent_hover: '#D97706',
    terms: {
      client: 'کارفرما',
      clients: 'کارفرمایان',
      case: 'پروژه عمرانی',
      cases: 'پروژه‌ها و کارگاه‌ها',
      inquiry: 'استعلام کد نظارت و گزارش‌های کارگاهی',
      booking: 'هماهنگی جلسه کارشناسی و بازدید زمین',
      booking_btn: 'ثبت درخواست بازدید فنی ←',
      fee: 'برآورد متره و برآورد اجرایی',
      expert: 'مهندس محاسب و ناظر ارشد',
    },
    services: [
      {
        id: 'serv-1',
        title: 'محاسبات و طراحی سازه (ETABS/SAFE)',
        desc: 'طراحی بهینه سازه‌های بتنی و فولادی مقاوم در برابر زلزله با حداقل پرت مصالح.',
        tag: 'محاسبات سازه',
        iconName: 'Layers',
      },
      {
        id: 'serv-2',
        title: 'طراحی معماری فاز ۱ و فاز ۲',
        desc: 'طراحی پلان‌های کاربردی، دیاگرام حرکتی و نقشه‌های اجرایی منطبق بر مقررات ملی ساختمان.',
        tag: 'معماری و نما',
        iconName: 'Home',
      },
      {
        id: 'serv-3',
        title: 'نظارت عالیه و بازرسی کارگاهی',
        desc: 'کنترل انطباق اجرا با نقشه‌ها، آزمون‌های بتن و فولاد و ثبت گزارش‌های مرحله‌ای شهرداری.',
        tag: 'نظارت و ژئوتکنیک',
        iconName: 'CheckCircle',
      },
      {
        id: 'serv-4',
        title: 'مدیریت پیمان و کنترل پروژه (MSP)',
        desc: 'برنامه‌ریزی زمان‌بندی، متره و برآورد، مدیریت مالی و انتخاب پیمانکاران جزء با شفافیت کامل.',
        tag: 'مدیریت پیمان',
        iconName: 'Clock',
      },
    ],
    stats: [
      { label: 'مترمربع سازه اجراشده', value: '+۴۵۰,۰۰۰' },
      { label: 'پروژه‌های نظارتی موفق', value: '+۱۸۰' },
      { label: 'دقت در کنترل بودجه', value: '۹۷.۴٪' },
    ],
  },

  corporate: {
    id: 'corporate',
    name: 'شرکتی و بازرگانی بین‌الملل',
    english_name: 'Corporate & Enterprise B2B',
    badge: 'توسعه بازار و خدمات بازرگانی',
    icon: 'Globe',
    site_title: 'هلدینگ تجارت بین‌الملل و خدمات سرمایه‌گذاری',
    site_tagline: 'تسهیل زنجیره تامین، ترخیص کالا و مشاوره استراتژیک تجارت فرامرزی',
    hero_kicker: 'هلدینگ بازرگانی و سرمایه‌گذاری B2B',
    hero_title: 'گسترش بازارهای صادراتی و مدیریت هوشمند زنجیره تأمین بین‌المللی',
    hero_desc: 'همراهی شرکت‌های تجاری و تولیدی در مبادلات ارزی، ترخیص گمرکی، ثبت سفارشات خارجی و انعقاد قراردادهای بین‌المللی با ریسک صفر.',
    hero_cta_primary: 'درخواست جلسه مذاکره B2B',
    hero_cta_secondary: 'استعلام وضعیت محموله و پیش‌فاکتور',
    accent_color: '#2563EB',
    accent_hover: '#1D4ED8',
    terms: {
      client: 'شریک تجاری',
      clients: 'شرکای تجاری و مشتریان سازمانی',
      case: 'قرارداد بازرگانی',
      cases: 'قراردادها و محموله‌ها',
      inquiry: 'پیگیری وضعیت سفارش و اسناد حمل',
      booking: 'هماهنگی جلسه تجاری و مشاوره صادرات',
      booking_btn: 'درخواست همکاری سازمانی ←',
      fee: 'ارزش گمرکی و پیش‌فاکتور ارزی',
      expert: 'مشاور ارشد تجارت بین‌الملل',
    },
    services: [
      {
        id: 'serv-1',
        title: 'تامین کالا و سورسینگ بین‌المللی',
        desc: 'شناسایی و اعتبارسنجی تولیدکنندگان معتبر جهانی در آسیا، اروپا و خاورمیانه.',
        tag: 'سورسینگ و بازرگانی',
        iconName: 'ShoppingBag',
      },
      {
        id: 'serv-2',
        title: 'خدمات ترخیص کالا و امور گمرکی',
        desc: 'ترخیص سریع و قانونی کالا از گمرکات کشور با حداقل هزینه‌های انبارداری و دموراژ.',
        tag: 'گمرک و ترخیص',
        iconName: 'Truck',
      },
      {
        id: 'serv-3',
        title: 'حمل‌ونقل بین‌المللی چندوجهی',
        desc: 'پوشش خطوط دریایی، هوایی و زمینی با ارائه بیمه‌نامه‌های معتبر بین‌المللی.',
        tag: 'لجستیک و ترانزیت',
        iconName: 'Anchor',
      },
      {
        id: 'serv-4',
        title: 'مشاوره قراردادها و پرداخت‌های ارزی',
        desc: 'انعقاد قراردادهای تجاری منطبق بر اینکوترمز ۲۰۲۰ و مدیریت پرداخت‌های امن بین‌المللی.',
        tag: 'مالی و بین‌الملل',
        iconName: 'CreditCard',
      },
    ],
    stats: [
      { label: 'حجم مراودات بازرگانی', value: '+$۱۲۰M' },
      { label: 'کشورهای تحت پوشش', value: '۲۴ کشور' },
      { label: 'زمان میانگین ترخیص', value: '۴ روز کاری' },
    ],
  },

  doctor: {
    id: 'doctor',
    name: 'پزشک و کلینیک سلامت',
    english_name: 'Doctor & Healthcare Clinic',
    badge: 'مراقبت‌های تخصصی سلامت و درمان',
    icon: 'Activity',
    site_title: 'مرکز تخصصی درمان و خدمات پزشکی سلامت',
    site_tagline: 'ارائه پیشرفته‌ترین خدمات تشخیصی، درمانی و مشاوره‌های تخصصی سلامت',
    hero_kicker: 'متخصص و جراح با بورد تخصصی',
    hero_title: 'رویکردی نوین در تشخیص، درمان و مراقبت همه‌جانبه از سلامت شما',
    hero_desc: 'بهره‌گیری از تجهیزات پیشرفته تشخیصی، کادر مجرب درمانی و سیستم جامع ویزیت حضوری و آنلاین با رعایت پروتکل‌های استاندارد پزشکی.',
    hero_cta_primary: 'رزرو آنلاین نوبت ویزیت و معاینه',
    hero_cta_secondary: 'پیگیری نتایج آزمایش و پرونده سلامت',
    accent_color: '#0D9488',
    accent_hover: '#0F766E',
    terms: {
      client: 'بیمار / مراجع',
      clients: 'بیماران و مراجعین',
      case: 'پرونده پزشکی',
      cases: 'پرونده‌های سلامت',
      inquiry: 'استعلام و مشاهده پرونده سلامت',
      booking: 'رزرو وقت معاینه و ویزیت',
      booking_btn: 'دریافت نوبت ویزیت ←',
      fee: 'تعرفه مصوب نظام پزشکی',
      expert: 'پزشک متخصص',
    },
    services: [
      {
        id: 'serv-1',
        title: 'معاینات دوره‌ای و ویزیت تخصصی',
        desc: 'بررسی همه‌جانبه شرح حال، معاینات بالینی و طراحی نقشه درمان اختصاصی هر بیمار.',
        tag: 'ویزیت بالینی',
        iconName: 'HeartPulse',
      },
      {
        id: 'serv-2',
        title: 'مشاوره آنلاین و تله‌مدیسین',
        desc: 'امکان ارسال نتایج آزمایش، تصویربرداری و دریافت دستورات دارویی از راه دور.',
        tag: 'مشاوره آنلاین',
        iconName: 'Video',
      },
      {
        id: 'serv-3',
        title: 'خدمات پاراکلینیک و تشخیصی',
        desc: 'انجام آزمایش‌های سریع، نوار قلب، سونوگرافی و ارزیابی‌های اولیه با دقت بالا.',
        tag: 'تشخیص و آزمایش',
        iconName: 'Stethoscope',
      },
      {
        id: 'serv-4',
        title: 'مراقبت‌های پیشگیرانه و رژیم سلامت',
        desc: 'برنامه‌ریزی سبک زندگی سالم، غربالگری دوره‌ای و پایش مداوم بیماری‌های مزمن.',
        tag: 'پیشگیری و سلامت',
        iconName: 'ShieldCheck',
      },
    ],
    stats: [
      { label: 'مراجعین بهبودیافته', value: '+۱۴,۰۰۰' },
      { label: 'رضایت مراجعین', value: '۹۹.۶٪' },
      { label: 'سال سابقه طبابت', value: '۱۵ سال' },
    ],
  },

  project_saas: {
    id: 'project_saas',
    name: 'معرفی پروژه / محصول و SaaS',
    english_name: 'Project Showcase & SaaS Launch',
    badge: 'پلتفرم ابری نسل جدید',
    icon: 'Box',
    site_title: 'سامانه ابری و پلتفرم نسل جدید تحلیلی',
    site_tagline: 'پلتفرم یکپارچه هوش مصنوعی، اتوماسیون سازمانی و تحلیل داده‌ها',
    hero_kicker: 'انتشار نسخه ابری ۳.۰ (Cloud Platform)',
    hero_title: 'اتوماسیون هوشمند، تحلیل بی‌درنگ و مقیاس‌پذیری نامحدود برای تیم‌ها',
    hero_desc: 'با پلتفرم ابری ما داده‌های سازمانی خود را متمرکز کنید، گردش‌کارهای تکراری را خودکار سازید و در لحظه گزارش‌های تحلیلی دریافت کنید.',
    hero_cta_primary: 'شروع دوره آزمایشی رایگان ۱۴ روزه',
    hero_cta_secondary: 'مشاهده مستندات فنی و API',
    accent_color: '#10B981',
    accent_hover: '#059669',
    terms: {
      client: 'کاربر',
      clients: 'کاربران و اعضای سازمان',
      case: 'سرویس و اشتراک',
      cases: 'اشتراک‌ها و تیکت‌ها',
      inquiry: 'پیگیری وضعیت سفارش و کلیدهای API',
      booking: 'درخواست جلسه دمو اختصاصی',
      booking_btn: 'ثبت نام و شروع رایگان ←',
      fee: 'طرح‌های اشتراک ماهانه و سالانه',
      expert: 'مشاور فنی و راهبر محصول',
    },
    services: [
      {
        id: 'serv-1',
        title: 'موتور پردازش داده در لحظه (Realtime)',
        desc: 'تحلیل میلیون‌ها رویداد در ثانیه با معماری توزیع‌شده بدون قطعی و با تاخیر میلی‌ثانیه‌ای.',
        tag: 'زیرساخت ابری',
        iconName: 'Server',
      },
      {
        id: 'serv-2',
        title: 'اتصال‌دهنده‌ها و API جامع',
        desc: 'بیش از ۵۰ کانکتور آماده برای اتصال به دیتابیس‌ها، وب‌هوک‌ها و ابزارهای ارتباطی محبوب.',
        tag: 'اتوماسیون و API',
        iconName: 'Share2',
      },
      {
        id: 'serv-3',
        title: 'امنیت اطلاعات و استاندارد SOC 2',
        desc: 'رمزنگاری کامل داده‌ها در مبدا و مقصد، پشتیبان‌گیری منظم و احراز هویت چندعاملی سازمانی.',
        tag: 'امنیت سازمانی',
        iconName: 'Lock',
      },
      {
        id: 'serv-4',
        title: 'داشبوردهای تحلیلی تعاملی',
        desc: 'تصویرسازی بصری KPIها، فیلترهای پیشرفته و قابلیت برون‌بری گزارش‌ها در فرمت‌های اکسل و PDF.',
        tag: 'گزارش و تحلیل',
        iconName: 'BarChart2',
      },
    ],
    stats: [
      { label: 'نرخ پایداری سرویس (SLA)', value: '۹۹.۹۹٪' },
      { label: 'سازمان‌های فعال', value: '+۸۵۰' },
      { label: 'درخواست پردازش‌شده روزانه', value: '+۵M' },
    ],
  },
};

const STORAGE_KEY_ACTIVE_PRESET = 'sedrazavi_active_preset_id';
const STORAGE_KEY_CUSTOM_OVERRIDES = 'sedrazavi_preset_custom_overrides';
const STORAGE_KEY_MODULAR_DASHBOARD = 'sedrazavi_modular_dashboard_settings';

/**
 * Get current active preset
 */
export function getActivePreset(): IndustryPreset {
  if (typeof window === 'undefined') {
    return INDUSTRY_PRESETS.lawyer;
  }
  const savedId = localStorage.getItem(STORAGE_KEY_ACTIVE_PRESET) || 'lawyer';
  const base = INDUSTRY_PRESETS[savedId] || INDUSTRY_PRESETS.lawyer;
  
  // Apply any custom overrides
  try {
    const rawOverrides = localStorage.getItem(STORAGE_KEY_CUSTOM_OVERRIDES);
    if (rawOverrides) {
      const overrides = JSON.parse(rawOverrides);
      if (overrides[base.id]) {
        return {
          ...base,
          ...overrides[base.id],
          terms: { ...base.terms, ...(overrides[base.id].terms || {}) },
        };
      }
    }
  } catch {
    // Ignore JSON parse errors
  }

  return base;
}

/**
 * Set active preset by ID and update root CSS tokens
 */
export function setActivePreset(presetId: string): IndustryPreset {
  const target = INDUSTRY_PRESETS[presetId] || INDUSTRY_PRESETS.lawyer;
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_ACTIVE_PRESET, target.id);
    document.documentElement.style.setProperty('--sr-gold-accent', target.accent_color);
    document.documentElement.style.setProperty('--sr-accent-hover', target.accent_hover);
    document.documentElement.style.setProperty('--sr-preset-accent', target.accent_color);
    window.dispatchEvent(new CustomEvent('sedrazavi_preset_changed', { detail: target }));
  }
  return target;
}

/**
 * Save custom overrides for a preset
 */
export function savePresetCustomOverrides(presetId: string, partial: Partial<IndustryPreset>): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_CUSTOM_OVERRIDES) || '{}');
    existing[presetId] = {
      ...(existing[presetId] || {}),
      ...partial,
    };
    localStorage.setItem(STORAGE_KEY_CUSTOM_OVERRIDES, JSON.stringify(existing));
    window.dispatchEvent(new CustomEvent('sedrazavi_preset_changed', { detail: getActivePreset() }));
  } catch (err) {
    console.error('Failed to save preset overrides:', err);
  }
}

/**
 * Default Modular Dashboard Settings
 */
export interface ModularDashboardSettings {
  showOverviewStats: boolean;
  showPracticeRadar: boolean;
  showRecentInquiries: boolean;
  showQuickActions: boolean;
  showMilestones: boolean;
  showSystemLogs: boolean;
}

export const DEFAULT_MODULAR_SETTINGS: ModularDashboardSettings = {
  showOverviewStats: true,
  showPracticeRadar: true,
  showRecentInquiries: true,
  showQuickActions: true,
  showMilestones: false,
  showSystemLogs: false,
};

export function getModularDashboardSettings(): ModularDashboardSettings {
  if (typeof window === 'undefined') return DEFAULT_MODULAR_SETTINGS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_MODULAR_DASHBOARD);
    if (saved) {
      return { ...DEFAULT_MODULAR_SETTINGS, ...JSON.parse(saved) };
    }
  } catch {
    // fallback
  }
  return DEFAULT_MODULAR_SETTINGS;
}

export function saveModularDashboardSettings(settings: Partial<ModularDashboardSettings>): ModularDashboardSettings {
  const current = getModularDashboardSettings();
  const updated = { ...current, ...settings };
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_MODULAR_DASHBOARD, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sedrazavi_modular_settings_changed', { detail: updated }));
  }
  return updated;
}
