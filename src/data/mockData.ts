import {
  ServiceItem,
  CaseItem,
  TestimonialItem,
  ArticleItem,
  StoryItem,
  FaqItem,
  ElementorBlockDef,
  PracticeArea,
  VideoItem,
  CommentItem,
  ArbitrationCase,
  PetitionTemplate,
  VirtualHearingSession,
  NiceClassificationClass,
  IPAssetEvaluation,
  StartupVestingSchedule,
  SoftwareLicenseModel,
  DigitalEvidenceItem,
  CybercrimePenaltyRule,
  SmartContractAuditRule,
  AMLSanctionListEntity,
  SuspiciousActivityRule,
  PEPDueDiligenceCheck,
} from '../types/theme';

export const ATTORNEY_INFO = {
  name: 'سرکار خانم دکتر سیده مریم رضوی (SedRazavi)',
  title: 'وکیل پایه یک دادگستری و مشاور ارشد حقوقی و داوری بین‌المللی',
  degree: 'دکترای تخصصی حقوق خصوصی از دانشگاه تهران',
  experienceYears: 20,
  licenseNumber: '۱۸۴۵۲ / ک.و.م',
  slogan: 'عدالت با دقت، حرفه‌ای‌گری با تعهد',
  subSlogan: 'دفاعی هوشمندانه برای آینده‌ای امن؛ پاسدار حقوق و منافع شما در مراجع قضایی و بین‌المللی',
  phone: '۰۲۱-۸۸۹۹۰۰۱۱',
  mobile: '۰۹۱۲-۳۴۵۶۷۸۹',
  email: 'info@sedrazavi.law',
  officeAddress: 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج حقوقی SedRazavi، طبقه ۸، واحد ۳۲',
  workingHours: 'شنبه تا چهارشنبه: ۹:۰۰ الی ۱۹:۰۰ | پنج‌شنبه: ۹:۰۰ الی ۱۳:۰۰',
  portraitImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
  heroBannerImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1600',
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'دعاوی تجاری و قراردادهای بازرگانی',
    slug: 'commercial-law',
    iconName: 'handshake',
    iconEmoji: '🤝',
    summary: 'تنظیم و بازبینی قراردادهای بین‌المللی، حل‌وفصل اختلافات شرکتی، داوری تجاری و دعاوی ورشکستگی.',
    fullDescription: 'ارائه کلیه خدمات حقوقی تخصصی به شرکت‌ها و بازرگانان شامل تدوین قراردادهای سرمایه‌گذاری، کنسرسیوم، فرانچایز، حل اختلافات میان سهامداران، دعاوی چک و سفته‌های کلان تجاری و ثبت و حمایت از علائم تجاری و اختراعات در مراجع داخلی و بین‌المللی.',
    duration: '۵ الی ۱۰ روز کاری جهت تنظیم قرارداد / متغیر در دعاوی قضایی',
    estimatedFee: 'از ۱۵,۰۰۰,۰۰۰ تومان',
    requiredDocs: [
      'اساسنامه و آگهی آخرین تغییرات شرکت',
      'نسخه اصلی قراردادها و مکاتبات فی‌مابین',
      'اسناد مالی، پیش‌فاکتورها و چک‌های مبادله‌شده',
      'مدارک هویتی مدیران و صاحبان امضای مجاز'
    ],
    isFeatured: true,
    order: 1,
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'srv-2',
    title: 'دعاوی کیفری و جرایم اقتصادی',
    slug: 'criminal-defense',
    iconName: 'shield',
    iconEmoji: '🛡️',
    summary: 'دفاع تخصصی در پرونده‌های اختلاس، کلاهبرداری، خیانت در امانت، پولشویی و دادگاه‌های انقلاب و تجدیدنظر.',
    fullDescription: 'دفاع راهبردی و مستدل از متهمین و شاکیان در مراجع قضایی دادسرا، دادگاه‌های کیفری یک و دو، دادگاه انقلاب و دیوان عالی کشور با رعایت کامل اصل محرمانگی اسناد و شواهد قانونی.',
    duration: 'بر اساس تشریفات آیین دادرسی کیفری',
    estimatedFee: 'توافقی و بر اساس تعرفه کانون وکلا',
    requiredDocs: [
      'شکواییه یا اخطاریه و ابلاغیه سامانه ثنا',
      'گزارش‌های ضابطین قضایی و کارشناسی',
      'اسناد بانکی، رسیدها و مدارک احراز هویت',
      'شهادت شهود و مستندات صوتی و تصویری مجاز'
    ],
    isFeatured: true,
    order: 2,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'srv-3',
    title: 'حقوق خانواده و انحصار وراثت',
    slug: 'family-inheritance',
    iconName: 'home',
    iconEmoji: '🏠',
    summary: 'رسیدگی به پرونده‌های مهریه، طلاق توافقی، حضانت فرزندان، تقسیم ترکه، تحریر ترکه و وصیت‌نامه.',
    fullDescription: 'ارائه مشاوره‌های مشفقانه و راهکارهای حقوقی در محیطی کاملاً محرمانه با اولویت حفظ حریم خصوصی خانواده، تعیین تکلیف سریع حقوق مالی زوجین و تسریع روند صدور گواهی حصر وراثت و افراز ماترک.',
    duration: 'طلاق توافقی: ۱۰ تا ۲۰ روز کاری / انحصار وراثت: ۳۰ روز کاری',
    estimatedFee: 'از ۱۲,۰۰۰,۰۰۰ تومان',
    requiredDocs: [
      'سند رسمی ازدواج یا طلاق‌نامه',
      'شناسنامه و کارت ملی طرفین و فرزندان',
      'گواهی فوت و استشهادیه انحصار وراثت (در امور ماترک)',
      'سیاهه اموال و اسناد مالکیت دارایی‌های متوفی'
    ],
    isFeatured: true,
    order: 3,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'srv-4',
    title: 'دعاوی ملکی، اراضی و سرقفلی',
    slug: 'real-estate-law',
    iconName: 'building',
    iconEmoji: '🏢',
    summary: 'الزام به تنظیم سند رسمی، خلع ید، تصرف عدوانی، پیش‌فروش ساختمان، دعاوی سرقفلی و حق کسب و پیشه.',
    fullDescription: 'حل و فصل اختلافات تخصصی پیرامون اراضی شهری و زراعی، املاک اوقافی، قراردادهای مشارکت در ساخت، ابطال اسناد معارض و اخذ پایان کار و صورت‌مجلس تفکیکی با پیگیری حضوری مستمر در کمیسیون‌های شهرداری و ادارات ثبت اسناد.',
    duration: 'متغیر بسته به ارجاع به کارشناسی رسمی دادگستری',
    estimatedFee: 'از ۲۰,۰۰۰,۰۰۰ تومان',
    requiredDocs: [
      'سند مالکیت تک‌برگ یا دفترچه‌ای',
      'مبایعه‌نامه، صلح‌نامه یا قرارداد مشارکت',
      'صورت‌جلسات تحویل و چک‌های ثمن معامله',
      'استعلام‌های ثبتی و پاسخ‌های شهرداری'
    ],
    isFeatured: false,
    order: 4,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'srv-5',
    title: 'داوری تخصصی و حل اختلاف خارج از دادگاه',
    slug: 'arbitration-mediation',
    iconName: 'gavel',
    iconEmoji: '🔨',
    summary: 'صدور آراء داوری لازم‌الاجرا در کمترین زمان، میانجی‌گری در اختلافات قراردادی با حفظ اسرار تجاری.',
    fullDescription: 'داوری داخلی و بین‌المللی به عنوان شیوه نوین، سریع و کم‌هزینه نسبت به مراجع قضایی سنتی، با استناد به موازین قانونی تجارت و مرکز داوری اتاق بازرگانی ایران.',
    duration: 'حداکثر ۱ الی ۳ ماه کاری',
    estimatedFee: 'مطابق آیین‌نامه داوری و ارزش موضوع خواسته',
    requiredDocs: [
      'موافقت‌نامه یا شرط داوری در قرارداد',
      'لایحه درخواست داوری و اسناد ادعایی',
      'اسناد و مکاتبات ابلاغ شده به طرف مقابل'
    ],
    isFeatured: false,
    order: 5,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'srv-6',
    title: 'دعاوی کار، تأمین اجتماعی و بازنشستگی',
    slug: 'labor-insurance-law',
    iconName: 'scroll',
    iconEmoji: '📜',
    summary: 'مطالبه حقوق معوقه، سنوات، بازگشت به کار، سختی کار، سوابق بیمه تأمین اجتماعی و حوادث ناشی از کار.',
    fullDescription: 'وکالت در هیئت‌های تشخیص و حل اختلاف اداره تعاون، کار و رفاه اجتماعی و کمیسیون‌های ماده ۶۶ و ۹۱ سازمان تأمین اجتماعی و دیوان عدالت اداری.',
    duration: '۱ الی ۳ ماه کاری',
    estimatedFee: 'از ۸,۰۰۰,۰۰۰ تومان',
    requiredDocs: [
      'قرارداد کار یا فیش‌های حقوقی',
      'پرینت گردش حساب واریز دستمزد',
      'دفترچه یا سوابق بیمه‌ای سامانه تأمین اجتماعی',
      'گزارش بازرسی اداره کار'
    ],
    isFeatured: false,
    order: 6,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
  }
];

export const STORIES_DATA: StoryItem[] = [
  {
    id: 'st-1',
    author: 'دفتر حقوقی SedRazavi',
    title: 'نکات چک صیادی',
    category: 'نکات کاربردی',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=200',
    isUnseen: true,
    slides: [
      {
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
        title: 'قوانین طلایی چک‌های جدید صیادی بنفش',
        text: 'آیا می‌دانستید بدون ثبت چک در سامانه صیاد بانک مرکزی، دارنده چک هیچ‌گونه حق پیگیری ثبتی یا کیفری نخواهد داشت؟ حتماً تایید دریافت را قبل از تحویل کالا ثبت کنید.',
        caption: 'نکته حقوقی ۱ از ۲',
        ctaText: 'مشاوره چک برگشتی',
        ctaLink: '#booking'
      },
      {
        image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
        title: 'نحوه صدور فوری اجراییه چک',
        text: 'طبق ماده ۲۳ قانون صدور چک، نیازی به طی کردن مراحل طولانی دادرسی نیست و مستقیماً می‌توان از دادگاه تقاضای صدور اجراییه علیه صادرکننده را نمود.',
        caption: 'نکته حقوقی ۲ از ۲'
      }
    ]
  },
  {
    id: 'st-2',
    author: 'وکیل دکتر سیده مریم رضوی',
    title: 'پیروزی در پرونده ملکی',
    category: 'موفقیت‌های اخیر',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200',
    isUnseen: true,
    slides: [
      {
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
        title: 'ابطال سند معارض در برج مسکونی الهیه',
        text: 'با احراز تقلب در واگذاری ثانویه و پیگیری در شعبه ۱۲ دادگاه تجدیدنظر استان تهران، حکم بر ابطال سند غیرقانونی به ارزش ۲۴۰ میلیارد ریال به نفع موکل محترم صادر گردید.',
        caption: 'پرونده شماره ۱۴۰۳-۰۸۹',
        ctaText: 'مشاهده جزئیات پرونده',
        ctaLink: '#cases'
      }
    ]
  },
  {
    id: 'st-3',
    author: 'بخش خانواده SedRazavi',
    title: 'طلاق و مهریه',
    category: 'حقوق خانواده',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=200',
    isUnseen: false,
    slides: [
      {
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
        title: 'مراحل طلاق توافقی در سال ۱۴۰۳',
        text: 'ثبت در سامانه تصمیم، انجام جلسات مشاوره بهزیستی و در نهایت اخذ گواهی عدم امکان سازش و اجرای صیغه طلاق در دفترخانه در کمتر از ۱۵ روز کاری با وکالت سرکار خانم دکتر رضوی.',
        caption: 'حقوق خانواده'
      }
    ]
  },
  {
    id: 'st-4',
    author: 'پاسخ به سوالات',
    title: 'سهم‌الارث مادر',
    category: 'انحصار وراثت',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=200',
    isUnseen: true,
    slides: [
      {
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
        title: 'محاسبه سهم‌الارث زوجه از عرصه و اعیان',
        text: 'بر اساس اصلاحیه قانون مدنی، زن از کلیه اموال غیرمنقول (هم زمین و هم ساختمان) ارث می‌برد و حق دریافت قیمت ریالی عادلانه آن را از سایر وراث دارد.',
        caption: 'دانستنی‌های ارث'
      }
    ]
  },
  {
    id: 'st-5',
    author: 'اتاق داوری',
    title: 'قرارداد مشارکت',
    category: 'تجاری',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=200',
    isUnseen: false,
    slides: [
      {
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
        title: '۵ شرط حیاتی در قرارداد مشارکت در ساخت',
        text: '۱. تعیین خسارت دیرکرد روزانه دقیق ۲. شرط داوری معتبر ۳. سقف تعهدات سازنده ۴. برنامه زمان‌بندی مرحله‌ای با حق فسخ ۵. ارائه ضمانت‌نامه بانکی حسن انجام تعهدات.',
        caption: 'راهنمای مالکین و سازندگان'
      }
    ]
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't-1',
    clientName: 'مهندس کامران رستمی',
    role: 'مدیرعامل شرکت بین‌المللی پارس فن‌آور',
    rating: 5,
    serviceUsed: 'دعاوی تجاری و داوری بین‌المللی',
    text: 'تسلط بی‌نظیر خانم دکتر رضوی بر قوانین تجارت و فن بیان قوی ایشان در جلسه داوری اتاق بازرگانی، منجر به نجات شرکت ما از یک خسارت ۵۰ میلیاردی شد. تعهد، اخلاق و دقت حرفه‌ای برند SedRazavi ستودنی است.',
    date: 'مرداد ۱۴۰۳',
    isApproved: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 't-2',
    clientName: 'سرکار خانم دکتر نسترن افشار',
    role: 'پزشک متخصص و عضو هیئت علمی دانشگاه',
    rating: 5,
    serviceUsed: 'دعاوی ملکی و خلع ید',
    text: 'پرونده پیچیده ملکی خانوادگی ما که بیش از ۳ سال در دادگاه‌های بدوی راکد مانده بود، با درایت، لوایح مستند و پیگیری دلسوزانه تیم حقوقی SedRazavi در دادگاه تجدیدنظر با پیروزی قاطع به سرانجام رسید.',
    date: 'تیر ۱۴۰۳',
    isApproved: true,
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 't-3',
    clientName: 'حاج علیرضا مقدسی',
    role: 'فعال صنعت نساجی و بازار بزرگ تهران',
    rating: 5,
    serviceUsed: 'پرونده جرایم اقتصادی و چک',
    text: 'صداقت، شفافیت در هزینه‌ها و گزارش‌دهی لحظه‌به‌لحظه از وضعیت پرونده از طریق سامانه SedRazavi، ویژگی برجسته‌ای است که در کمتر دفتری دیده‌ام. آرامش خاطر موکل بزرگترین هدیه این تیم حقوقی است.',
    date: 'خرداد ۱۴۰۳',
    isApproved: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 't-4',
    clientName: 'زهره حسینی‌کیا',
    role: 'کارآفرین و موکل امور خانواده',
    rating: 5,
    serviceUsed: 'حقوق خانواده و حضانت',
    text: 'برخورد بسیار محترمانه، آرامش‌بخش و رعایت تمام موازین شرعی و اخلاقی در جریان حل و فصل مسالمت‌آمیز اختلافات مالی و حضانت فرزندم در دفتر SedRazavi باعث شد بدون کوچکترین تنش به حق قانونی خود برسم.',
    date: 'اردیبهشت ۱۴۰۳',
    isApproved: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  }
];

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'راهنمای جامع اثبات ادعای کلاهبرداری اینترنتی و فیشینگ در مراجع قضایی',
    slug: 'cybercrime-fraud-guide',
    summary: 'بررسی ادله الکترونیکی، روند شکایت در پلیس فتا و دادسرای جرایم رایانه‌ای به همراه نمونه شکواییه تخصصی.',
    content: `جرایم سایبری و فیشینگ بانکی در سال‌های اخیر رشد چشمگیری داشته است. بر اساس ماده ۱۳ قانون جرایم رایانه‌ای، هرکس به طور غیرمجاز از سامانه‌های رایانه‌ای یا مخابراتی با ارتکاب اعمالی از قبیل وارد کردن، تغییر، محو، ایجاد یا متوقف کردن داده‌ها یا مختل کردن سامانه، وجه یا مال یا منفعت یا خدمات یا امتیازات مالی برای خود یا دیگری تحصیل کند علاوه بر رد مال به صاحب آن، به حبس از یک تا پنج سال یا جزای نقدی محکوم خواهد شد.

مراحل اقدام حقوقی:
۱. مسدودسازی فوری حساب و کارت‌های بانکی مقصد از طریق تماس با سامانه فوریت‌های پلیس فتا (۰۹۶۳۸۰).
۲. اخذ پرینت گردش حساب رسمی ممهور به مهر شعبه بانک عامل.
۳. ثبت شکواییه در دفاتر خدمات الکترونیک قضایی تحت عنوان "کلاهبرداری رایانه‌ای از طریق فیشینگ".
۴. درخواست دستور قضایی جهت ردیابی IP و توقیف حساب‌های واسط بانکی.`,
    category: 'حقوق کیفری',
    tags: ['کلاهبرداری اینترنتی', 'پلیس فتا', 'جرایم رایانه‌ای', 'اثبات دعوا'],
    readTime: '۶ دقیقه مطالعه',
    date: '۵ مرداد ۱۴۰۳',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    views: 1420
  },
  {
    id: 'art-2',
    title: 'تفاوت‌های حقوقی بنیادین میان عقد بیع، صلح‌نامه و مبایعه‌نامه عادی',
    slug: 'difference-between-deed-contract',
    summary: 'چرا صلح‌نامه در محاکم قضایی از قدرت اجرایی بالاتری برخوردار است و خطرات قراردادهای دستی چیست؟',
    content: `بسیاری از دعاوی مطروحه در محاکم دادگستری ناشی از عدم شناخت دقیق ماهیت عقود است. در حقوق مدنی ایران، عقد صلح به عنوان "سید الاحکام" شناخته می‌شود که می‌تواند جایگزین تمامی معاملات از جمله بیع، اجاره و هبه گردد.

مزایای کلیدی تنظیم صلح‌نامه رسمی:
- عدم امکان فسخ به بهانه‌های خیارات رایج مگر در صورت درج شرط صریح فسخ.
- مصونیت بالاتر در برابر ادعاهای صوری بودن معامله.
- قابلیت اجرای مستقیم مفاد از طریق دوایر اجرای ثبت اسناد رسمی کشور.`,
    category: 'دعاوی ملکی',
    tags: ['عقد بیع', 'صلح‌نامه', 'اسناد رسمی', 'حقوق قراردادها'],
    readTime: '۸ دقیقه مطالعه',
    date: '۲۸ تیر ۱۴۰۳',
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
    views: 2180
  },
  {
    id: 'art-3',
    title: 'راهکارهای حقوقی و فرآیند قانونی مطالبه اجرت‌المثل ایام زوجیت',
    slug: 'ojrat-al-mesl-family-rights',
    summary: 'شرایط تعلق، نحوه ارجاع به کارشناسی رسمی و مدارک مورد نیاز برای مطالبه حقوق قانونی زوجه در منزل مشترک.',
    content: `مطابق تبصره ماده ۳۳۶ قانون مدنی، چنانچه زوجه کارهایی را که شرعاً به عهده وی نبوده و عرفاً برای آن کار اجرت باشد، به دستور زوج و با عدم قصد تبرع انجام داده باشد و برای دادگاه نیز ثابت شود، دادگاه اجرت‌المثل کارهای انجام گرفته را محاسبه و به پرداخت آن حکم می‌نماید.

شرایط تحقق مطالبه:
۱. عدم قصد تبرع (مجانی بودن) از سوی زن در انجام امور خانه‌داری.
۲. دستور یا تقاضای زوج به انجام امور.
۳. استمرار زندگی مشترک یا هنگام تقاضای طلاق از سوی مرد.
ارزیابی مبلغ بر اساس سال‌های زندگی مشترک، تعداد فرزندان، وضعیت اجتماعی و شأن طرفین توسط کارشناس رسمی دادگستری تعیین می‌گردد.`,
    category: 'حقوق خانواده',
    tags: ['اجرت‌المثل', 'حقوق زوجه', 'دادگاه خانواده', 'کارشناسی'],
    readTime: '۵ دقیقه مطالعه',
    date: '۱۵ تیر ۱۴۰۳',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    views: 3410
  },
  {
    id: 'art-4',
    title: 'نحوه ابطال رأی داور در دادگاه‌های عمومی حقوقی؛ جهات بطلان و مواعد قانونی',
    slug: 'annulment-arbitral-award-iran',
    summary: 'بررسی ماده ۴۸۹ قانون آیین دادرسی مدنی و مواردی که منجر به بطلان رأی داور و توقف اجرای آن می‌شود.',
    content: `داوری به عنوان یکی از کارآمدترین شیوه‌های حل و فصل اختلافات قراردادی، گاه با چالش عدم رعایت اصول دادرسی عادلانه یا مخالفت با قوانین موجد حق مواجه می‌شود. در چنین شرایطی، متضرر می‌تواند ظرف ۲۰ روز از تاریخ ابلاغ رأی داور (برای اشخاص مقیم خارج ۲ ماه) دادخواست ابطال رأی داور را به دادگاهی که صلاحیت رسیدگی به اصل دعوا را دارد تقدیم کند.

جهات هفت‌گانه بطلان رأی داور:
۱. رأی صادره مخالف با قوانین موجد حق باشد.
۲. داور نسبت به مطلبی که موضوع داوری نبوده رأی صادر کرده باشد.
۳. داور خارج از حدود اختیارات خود مبادرت به صدور رأی نموده باشد.
۴. رأی داور پس از انقضای مدت داوری صادر و تسلیم شده باشد.
۵. رأی داور با اسناد رسمی یا مندرجات دفتر املاک در تضاد باشد.
۶. رأی به غیر از طرفین دعوا یا به ضرر شخص ثالث بدون حضور وی صادر شده باشد.
۷. قرارداد داوری بی‌اعتبار یا باطل بوده باشد.`,
    category: 'داوری بین‌المللی',
    tags: ['ابطال رأی داور', 'داوری تجاری', 'آیین دادرسی مدنی', 'دادگاه تجدیدنظر'],
    readTime: '۷ دقیقه مطالعه',
    date: '۵ تیر ۱۴۰۳',
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
    views: 1890
  },
  {
    id: 'art-5',
    title: 'مسئولیت کیفری و مدنی مدیران شرکت‌های تجاری در برابر سهامداران و اشخاص ثالث',
    slug: 'directors-liability-commercial-companies',
    summary: 'بررسی مواد ۱۴۲ و ۱۴۳ لایحه قانونی اصلاح قسمتی از قانون تجارت و تبیین مسئولیت تضامنی هیئت مدیره.',
    content: `مدیران شرکت‌های سهامی، امین شرکت محسوب می‌شوند و در صورت تخطی از اساسنامه، تصمیمات مجامع عمومی یا مقررات قانونی، نه تنها در برابر شرکت بلکه در برابر تک‌تک سهامداران و بستانکاران دارای مسئولیت انفرادی یا مشترک هستند.

مصادیق بارز مسئولیت مدیران:
- تقسیم منافع موهوم یا غیرواقعی بدون ترازنامه مصوب.
- سوءاستفاده از اموال و اعتبارات شرکت به نفع شخصی (خیانت در امانت).
- انجام معاملات رقیب با شرکت بدون اخذ مجوز ماده ۱۲۹ قانون تجارت.
- عدم ارائه به موقع صورت‌های مالی و دعوت از مجامع سالیانه.`,
    category: 'دعاوی تجاری',
    tags: ['شرکت‌های تجاری', 'مسئولیت مدیران', 'قانون تجارت', 'دعاوی سهامداران'],
    readTime: '۹ دقیقه مطالعه',
    date: '۲۰ خرداد ۱۴۰۳',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    views: 2750
  },
  {
    id: 'art-6',
    title: 'اصول تنظیم قراردادهای عدم افشای اطلاعات محرمانه (NDA) در شرکت‌های دانش‌بنیان',
    slug: 'nda-contract-guidelines-startups',
    summary: 'چگونه از فرمول‌ها، کدهای برنامه‌نویسی و استراتژی‌های تجاری در جریان مذاکرات سرمایه‌گذاری صیانت کنیم؟',
    content: `در دنیای فناوری اطلاعات و شرکت‌های استارتاپی، اطلاعات محرمانه ارزشمندترین دارایی نامشهود هستند. یک قرارداد NDA یک‌جانبه یا دوجانبه اصولی، ریسک افشای کدهای منبع یا داده‌های مشتریان را به حداقل می‌رساند.

بخش‌های کلیدی یک قرارداد NDA استاندارد:
۱. تعریف جامع و دقیق اطلاعات محرمانه با ذکر مصادیق و استثنائات (مانند اطلاعات موجود در قلمرو عمومی).
۲. تعیین طول مدت محرمانگی (معمولاً ۲ تا ۵ سال پس از خاتمه مذاکرات).
۳. تعیین وجه التزام و خسارت تخلف از عدم افشا به صورت مقطوع.
۴. تعیین مرجع داوری تخصصی در حوزه فناوری اطلاعات جهت حل فوری اختلافات.`,
    category: 'استارتاپ‌ها و قراردادها',
    tags: ['قرارداد NDA', 'مالکیت فکری', 'استارتاپ', 'اسرار تجاری'],
    readTime: '۴ دقیقه مطالعه',
    date: '۲ خرداد ۱۴۰۳',
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
    views: 4120
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'چگونه می‌توانم با سرکار خانم دکتر رضوی نوبت مشاوره حقوقی حضوری یا آنلاین رزرو کنم؟',
    answer: 'شما می‌توانید از طریق فرم رزرو هوشمند در همین صفحه یا تماس مستقیم با شماره ۰۲۱-۸۸۹۹۰۰۱۱، تاریخ و ساعت مورد نظر خود را انتخاب فرمایید. پس از ثبت نوبت، پیامک تأیید و لوکیشن دفتر برای شما ارسال می‌گردد.',
    category: 'مشاوره'
  },
  {
    id: 'faq-2',
    question: 'حق‌الوکاله پرونده‌ها چگونه محاسبه شده و آیا امکان پرداخت اقساطی وجود دارد؟',
    answer: 'حق‌الوکاله بر مبنای پیچیدگی دعوا، ارزش خواسته و آیین‌نامه تعرفه مصوب قوه قضاییه تعیین می‌گردد. در مؤسسه حقوقی SedRazavi جهت رفاه حال موکلین، امکان تقسیط مبالغ متناسب با مراحل دادرسی (بدوی، تجدیدنظر و اجرا) فراهم شده است.',
    category: 'حق‌الوکاله'
  },
  {
    id: 'faq-3',
    question: 'آیا برای پیگیری پرونده حضور موکل در تمامی جلسات دادگاه ضروری است؟',
    answer: 'خیر؛ پس از امضای وکالت‌نامه رسمی الکترونیک در سامانه ثنا، وکیل دادگستری تمام اقدامات دادرسی اعم از حضور در جلسات، دفاعیات، لوایح و اعتراض به آراء را رأساً به عهده می‌گیرد مگر در مواردی که قاضی حضور شخص را صراحتاً الزام کند.',
    category: 'روند دادرسی'
  },
  {
    id: 'faq-4',
    question: 'مدت زمان رسیدگی به پرونده‌های ملکی و دعاوی تجاری چقدر است؟',
    answer: 'مدت زمان دقیق به تراکم شعب قضایی، ارجاع به کارشناسی رسمی و اعتراض طرفین بستگی دارد؛ با این حال تیم ما با لوایح جامع و پیگیری مستمر، پرونده‌ها را در سریع‌ترین بازه قانونی ممکن به نتیجه می‌رساند.',
    category: 'روند دادرسی'
  },
  {
    id: 'faq-5',
    question: 'برای جلسه اول مشاوره چه مدارک و اسنادی را باید همراه داشته باشم؟',
    answer: 'اصل کارت ملی، تمامی نسخه‌های قرارداد یا مبایعه‌نامه، فیش‌ها و چک‌های مبادله‌شده، دادخواست‌ها یا آرای صادره قبلی و هرگونه مدرک دال بر اثبات ادعا را همراه داشته باشید.',
    category: 'اسناد و مدارک'
  },
  {
    id: 'faq-6',
    question: 'آیا امکان ارائه خدمات و مشاوره حقوقی برای ایرانیان خارج از کشور وجود دارد؟',
    answer: 'بله؛ ایرانیان مقیم خارج از کشور می‌توانند با ثبت وکالت‌نامه در سامانه تاک (وزارت امور خارجه) یا میخک و تأیید سفارت، کلیه امور ملکی، انحصار وراثت و حقوقی خود در ایران را بدون نیاز به حضور فیزیکی به این دفتر بسپارند.',
    category: 'مشاوره'
  }
];

export const CASES_INITIAL_DATA: CaseItem[] = [
  {
    id: 'case-1',
    caseNumber: '۱۴۰۳-۰۰۱',
    clientName: 'شرکت سرمایه‌گذاری کیمیا پارس',
    clientPhone: '۰۹۱۲۱۱۱۱۱۱۱',
    caseType: 'تجاری',
    registrationDate: '۱۴۰۳/۰۱/۱۵',
    status: 'به رأی نهایی رسیده',
    nextCourtSession: 'پرونده مختومه شد (پیروزی کامل)',
    documentsCount: 14,
    notes: 'وصول مطالبات ارزی و جلب رضایت سهامداران با رأی قطعی شعبه ۱۸ دادگاه تجدیدنظر'
  },
  {
    id: 'case-2',
    caseNumber: '۱۴۰۳-۰۰۲',
    clientName: 'مهندس سعید میرباقری',
    clientPhone: '۰۹۱۲۲۲۲۲۲۲۲',
    caseType: 'ملکی',
    registrationDate: '۱۴۰۳/۰۲/۱۰',
    status: 'در جریان',
    nextCourtSession: '۱۴۰۳/۰۶/۱۸ - ساعت ۱۰:۳۰ (شعبه ۴ دادگاه عمومی حقوقی)',
    documentsCount: 8,
    notes: 'پرونده الزام به تنظیم سند رسمی پلاک ثبتی ۶۷۸/۴۵ ولنجک - نظریه کارشناس دریافت شد'
  },
  {
    id: 'case-3',
    caseNumber: '۱۴۰۳-۰۰۳',
    clientName: 'خانم بهاره کاظمیان',
    clientPhone: '۰۹۱۲۳۳۳۳۳۳۳',
    caseType: 'خانواده',
    registrationDate: '۱۴۰۳/۰۳/۰۲',
    status: 'در جریان',
    nextCourtSession: '۱۴۰۳/۰۶/۲۲ - ساعت ۱۱:۰۰ (شعبه ۲۶۵ دادگاه خانواده ونک)',
    documentsCount: 6,
    notes: 'مطالبه مهریه و توقیف اموال منقول و غیرمنقول از طریق اداره ثبت اسناد'
  },
  {
    id: 'case-4',
    caseNumber: '۱۴۰۳-۰۰۴',
    clientName: 'دکتر هادی فرهمند',
    clientPhone: '۰۹۱۲۴۴۴۴۴۴۴',
    caseType: 'کیفری',
    registrationDate: '۱۴۰۳/۰۴/۱۸',
    status: 'در حال بررسی',
    nextCourtSession: '۱۴۰۳/۰۶/۲۹ - ساعت ۰۹:۰۰ (شعبه ۲ بازپرسی دادسرای جرایم اقتصادی)',
    documentsCount: 12,
    notes: 'شکایت خیانت در امانت و جعل سند رسمی در شراکت تجاری'
  },
  {
    id: 'case-5',
    caseNumber: '۱۴۰۳-۰۰۵',
    clientName: 'وراث مرحوم شمس‌الدین رضایی',
    clientPhone: '۰۹۱۲۵۵۵۵۵۵۵',
    caseType: 'ارث',
    registrationDate: '۱۴۰۳/۰۵/۰۱',
    status: 'در حال بررسی',
    nextCourtSession: '۱۴۰۳/۰۷/۰۵ - شعبه شورای حل اختلاف منطقه ۲',
    documentsCount: 9,
    notes: 'اخذ گواهی حصر وراثت نامحدود و تقاضای تحریر و تقسیم ترکه'
  },
  {
    id: 'case-6',
    caseNumber: '۱۴۰۳-۰۰۶',
    clientName: 'کارخانه صنایع فولاد البرز',
    clientPhone: '۰۹۱۲۶۶۶۶۶۶۶',
    caseType: 'کار و بیمه',
    registrationDate: '۱۴۰۳/۰۵/۱۲',
    status: 'بسته شده',
    nextCourtSession: 'سازش حاصل گردید',
    documentsCount: 5,
    notes: 'حل و فصل توافقی دعاوی ۵۰ نفر از پرسنل و بازبینی آیین‌نامه انضباط کار'
  }
];

export const ELEMENTOR_BLOCKS_DATA: ElementorBlockDef[] = [
  {
    id: 'el-1',
    code: 'sedrazavi_hero_classic',
    title: 'هیرو کلاسیک وکالت SedRazavi',
    titleEn: 'Hero Classic',
    category: 'هیرو و معرفی',
    description: 'بلاک دو ستونی لوکس با گرادیان طلایی، نشان سابقه درخشان، تایپوگرافی سریف و تصویر با پس‌زمینه ذرات متحرک.',
    icon: 'Sparkles',
    options: [
      { name: 'عنوان اصلی هیرو', type: 'text', defaultValue: 'دفاع هوشمندانه و قاطع از حقوق قانونی شما' },
      { name: 'متن برچسب تجربه', type: 'text', defaultValue: 'بیش از ۲۰ سال سابقه درخشان وکالت' },
      { name: 'نمایش دکمه رزرو نوبت', type: 'boolean', defaultValue: true }
    ]
  },
  {
    id: 'el-2',
    code: 'sedrazavi_hero_video',
    title: 'هیرو تمام صفحه ویدیویی',
    titleEn: 'Hero Video Background',
    category: 'هیرو و معرفی',
    description: 'پس‌زمینه ویدیویی با لایه تیره شیشه‌ای (Glassmorphism) و دکمه‌های کنترل پخش به همراه تیتر محوری.',
    icon: 'Video',
    options: [
      { name: 'آدرس ویدیو پس‌زمینه', type: 'text', defaultValue: 'https://assets.mixkit.co/videos/preview/mixkit-justice-scales-close-up-in-a-law-office-42171-large.mp4' },
      { name: 'شدت محوشدگی شیشه‌ای (Blur)', type: 'select', defaultValue: 'متوسط', options: ['کم', 'متوسط', 'زیاد'] },
      { name: 'دکمه پخش / توقف', type: 'boolean', defaultValue: true }
    ]
  },
  {
    id: 'el-3',
    code: 'sedrazavi_hero_form',
    title: 'هیرو با فرم درخواست مشاوره',
    titleEn: 'Hero with Consultation Form',
    category: 'هیرو و معرفی',
    description: 'دو ستونی با فرم دریافت اطلاعات لید، اعتبارسنجی در لحظه و ارسال فوری به واتساپ و پیامک وکیل.',
    icon: 'FileText',
    options: [
      { name: 'عنوان فرم', type: 'text', defaultValue: 'درخواست مشاوره فوری با خانم دکتر رضوی' },
      { name: 'فیلد انتخاب موضوع دعوا', type: 'boolean', defaultValue: true },
      { name: 'متن دکمه ارسال', type: 'text', defaultValue: 'ثبت و ارسال پیام' }
    ]
  },
  {
    id: 'el-4',
    code: 'sedrazavi_story_bar',
    title: 'نوار استوری‌های حقوقی',
    titleEn: 'Legal Stories Carousel',
    category: 'هیرو و معرفی',
    description: 'کاروسل استوری‌های تصویری و آموزشی اینستاگرامی با حلقه طلایی وضعیت خوانده نشده و اسلایدشو.',
    icon: 'Camera',
    options: [
      { name: 'تعداد استوری‌های نمایشی', type: 'select', defaultValue: '۶ استوری', options: ['۴ استوری', '۶ استوری', '۸ استوری'] },
      { name: 'چرخش خودکار اسلایدها', type: 'boolean', defaultValue: true }
    ]
  },
  {
    id: 'el-5',
    code: 'sedrazavi_services_3col',
    title: 'خدمات حقوقی ۳ کارته',
    titleEn: 'Services 3-Cards Grid',
    category: 'خدمات و پرونده‌ها',
    description: 'شبکه ۳ ستونه از خدمات اصلی با آیکون‌های وکتور طلایی، افکت هاور بزرگنمایی و خلاصه متن.',
    icon: 'Layers',
    options: [
      { name: 'رنگ حاشیه کارتها', type: 'select', defaultValue: 'طلایی متالیک', options: ['طلایی متالیک', 'سرمه‌ای تیره', 'نامرئی'] },
      { name: 'نمایش دکمه جزئیات خدمت', type: 'boolean', defaultValue: true }
    ]
  },
  {
    id: 'el-6',
    code: 'sedrazavi_services_4col',
    title: 'خدمات حقوقی ۴ کارته فشرده',
    titleEn: 'Services 4-Cards Grid',
    category: 'خدمات و پرونده‌ها',
    description: 'چهار کارت متقارن ویژه صفحات داخلی خدمات با آیکون و نشان خدمت ویژه.',
    icon: 'Grid',
    options: [
      { name: 'چینش واکنش‌گرا', type: 'boolean', defaultValue: true }
    ]
  },
  {
    id: 'el-7',
    code: 'sedrazavi_services_slider',
    title: 'اسلایدر متحرک خدمات',
    titleEn: 'Services Swiper Slider',
    category: 'خدمات و پرونده‌ها',
    description: 'اسلایدر لمسی با قابلیت کشیدن (Touch Drag) و دکمه‌های ناوبری دایره‌ای طلایی.',
    icon: 'Sliders',
    options: [
      { name: 'سرعت تعویض اسلاید', type: 'select', defaultValue: '۴ ثانیه', options: ['۳ ثانیه', '۴ ثانیه', '۶ ثانیه'] }
    ]
  },
  {
    id: 'el-8',
    code: 'sedrazavi_trust_counter',
    title: 'شمارنده آمار و افتخارات',
    titleEn: 'Trust Badges Counter',
    category: 'اعتبار و نظرات',
    description: 'چهار شاخص بزرگ با انیمیشن شمارش روان از صفر با فونت کلاسیک Playfair Display.',
    icon: 'Award',
    options: [
      { name: 'عدد پرونده‌های موفق', type: 'text', defaultValue: '۱۲۸۰+' },
      { name: 'درصد رضایت موکلین', type: 'text', defaultValue: '۹۸٪' },
      { name: 'سابقه کارشناسانه', type: 'text', defaultValue: '۲۰ سال' }
    ]
  },
  {
    id: 'el-9',
    code: 'sedrazavi_about_attorney',
    title: 'بخش درباره وکیل و منشور اخلاقی',
    titleEn: 'About Attorney & Bio',
    category: 'هیرو و معرفی',
    description: 'ترکیب عکس پرتره با کادر طلایی، نقل‌قول ویژه، مدارک دانشگاهی و چک‌لیست ارزش‌های بنیادین.',
    icon: 'UserCheck',
    options: [
      { name: 'نام وکیل', type: 'text', defaultValue: 'دکتر سیده مریم رضوی' },
      { name: 'متن نقل‌قول طلایی', type: 'text', defaultValue: 'سوگند یاد کرده‌ام مدافع سرسخت حق و عدالت باشم.' }
    ]
  },
  {
    id: 'el-10',
    code: 'sedrazavi_testimonials_slider',
    title: 'اسلایدر نظرات موکلین',
    titleEn: 'Client Testimonials Slider',
    category: 'اعتبار و نظرات',
    description: 'اسلایدر نظرات با ۵ ستاره طلایی، نقل‌قول گیومه بزرگ، سمت موکل و فیلتر بر اساس نوع خدمت.',
    icon: 'Star',
    options: [
      { name: 'نمایش آواتار موکلین', type: 'boolean', defaultValue: true },
      { name: 'تعداد نظرات در هر اسلاید', type: 'select', defaultValue: '۱ نظر', options: ['۱ نظر', '۲ نظر'] }
    ]
  },
  {
    id: 'el-11',
    code: 'sedrazavi_articles_grid',
    title: 'جدیدترین مقالات و یادداشت‌ها',
    titleEn: 'Legal Articles Grid',
    category: 'خدمات و پرونده‌ها',
    description: 'سه مقاله آخر وبلاگ با تصویر شاخص، دسته‌بندی، تاریخ شمسی، زمان مطالعه و دکمه ادامه مطلب.',
    icon: 'BookOpen',
    options: [
      { name: 'نمایش تعداد بازدیدها', type: 'boolean', defaultValue: true },
      { name: 'تعداد ستون‌ها', type: 'select', defaultValue: '۳ ستون', options: ['۲ ستون', '۳ ستون', '۴ ستون'] }
    ]
  },
  {
    id: 'el-12',
    code: 'sedrazavi_faq_accordion',
    title: 'آکاردئون پرسش‌های متداول',
    titleEn: 'FAQ Accordion Block',
    category: 'اعتبار و نظرات',
    description: 'پرسش و پاسخ‌های طبقه‌بندی شده با آیکون باز/بسته متحرک، انیمیشن ارتفاع روان و تب‌بندی موضوعی.',
    icon: 'HelpCircle',
    options: [
      { name: 'باز بودن پیش‌فرض اولین سوال', type: 'boolean', defaultValue: true },
      { name: 'فیلتر دسته‌بندی بالای سوالات', type: 'boolean', defaultValue: true }
    ]
  },
  {
    id: 'el-13',
    code: 'sedrazavi_booking_calendar',
    title: 'تقویم رزرو هوشمند نوبت',
    titleEn: 'Smart Booking Calendar',
    category: 'فرم و رزرو',
    description: 'سیستم رزرو مرحله‌ای وقت مشاوره با محاسبه هزینه آنلاین، انتخاب ساعت و پیامک خودکار.',
    icon: 'Calendar',
    options: [
      { name: 'هزینه مشاوره تلفنی (تومان)', type: 'text', defaultValue: '۱,۵۰۰,۰۰۰' },
      { name: 'هزینه مشاوره حضوری (تومان)', type: 'text', defaultValue: '۳,۰۰۰,۰۰۰' }
    ]
  },
  {
    id: 'el-14',
    code: 'sedrazavi_case_tracker',
    title: 'پیگیری آنلاین وضعیت پرونده',
    titleEn: 'Case Status Tracker Widget',
    category: 'خدمات و پرونده‌ها',
    description: 'ویجت استعلام وضعیت دادرسی برای موکلین با وارد کردن شماره پرونده و کد ملی.',
    icon: 'Search',
    options: [
      { name: 'نمایش تاریخ جلسه بعد', type: 'boolean', defaultValue: true }
    ]
  },
  {
    id: 'el-15',
    code: 'sedrazavi_contact_map',
    title: 'فرم تماس به همراه نقشه تعاملی',
    titleEn: 'Contact Form & Location Map',
    category: 'فرم و رزرو',
    description: 'دو ستونی شامل اطلاعات تماس، آدرس دفتر روی نقشه گوگل/نشان و فرم ارتباط مستقیم.',
    icon: 'MapPin',
    options: [
      { name: 'عرض جغرافیایی دفتر (Lat/Lng)', type: 'text', defaultValue: '35.7583, 51.4116' }
    ]
  },
  {
    id: 'el-16',
    code: 'sedrazavi_court_experience',
    title: 'تایم‌لاین دادگاه‌ها و شعب',
    titleEn: 'Court Experience Timeline',
    category: 'اعتبار و نظرات',
    description: 'نمودار زمانی شعب تخصصی دیوان عالی کشور، تجدیدنظر و داوری‌های بین‌المللی.',
    icon: 'GitCommit',
    options: [
      { name: 'جهت نمایش', type: 'select', defaultValue: 'عمودی راست به چپ', options: ['عمودی راست به چپ', 'افقی'] }
    ]
  },
  {
    id: 'el-17',
    code: 'sedrazavi_pricing_table',
    title: 'جدول شفاف تعرفه و خدمات',
    titleEn: 'Legal Pricing Tables',
    category: 'خدمات و پرونده‌ها',
    description: 'پلن‌های مشاوره حقوقی ماهانه شرکت‌ها با تیک‌های طلایی و دکمه پرداخت آنلاین.',
    icon: 'DollarSign',
    options: [
      { name: 'پلن پیشنهادی ویژه', type: 'select', defaultValue: 'اشتراک سالانه شرکت‌ها', options: ['مشاوره موردی', 'اشتراک سالانه شرکت‌ها'] }
    ]
  },
  {
    id: 'el-18',
    code: 'sedrazavi_footer_rich',
    title: 'فوتر جامع ۴ ستونه',
    titleEn: 'Rich 4-Column Footer',
    category: 'فوتر و هدر',
    description: 'شامل نمادهای اعتبار الکترونیک، خبرنامه، لینک‌های حقوقی سریع و تماس ۲۴ ساعته.',
    icon: 'Layout',
    options: [
      { name: 'نمایش نماد کانون وکلا', type: 'boolean', defaultValue: true },
      { name: 'متن کپی‌رایت', type: 'text', defaultValue: 'تمامی حقوق برای دفتر وکالت SedRazavi محفوظ است.' }
    ]
  },
  {
    id: 'el-19',
    code: 'sedrazavi_banner_slider',
    title: 'بنر اسلایدر متنی احادیث و اشعار',
    titleEn: 'Text Banner Slider Widget',
    category: 'هیرو و معرفی',
    description: 'بنر افقی لوکس بالای صفحه با ۵ محتوای پیش‌فرض از آیات قرآن، احادیث معصومین، اشعار سعدی و پیمان وکیل با چرخش خودکار.',
    icon: 'Quote',
    options: [
      { name: 'مدت زمان چرخش خودکار', type: 'select', defaultValue: '۵ ثانیه', options: ['۳ ثانیه', '۵ ثانیه', '۸ ثانیه'] },
      { name: 'توقف در زمان هاور ماوس', type: 'boolean', defaultValue: true },
      { name: 'دکمه کپی متن اسلاید', type: 'boolean', defaultValue: true }
    ]
  },
  {
    id: 'el-20',
    code: 'sedrazavi_floating_scrollbar',
    title: 'اسکرول‌بار شناور و منوی ۷ آیکون',
    titleEn: 'Floating Icon Scrollbar',
    category: 'فوتر و هدر',
    description: 'دکمه دایره‌ای ۵۰×۵۰ با گرادیان طلایی در گوشه صفحه که با کلیک، منوی عمودی ۷ آیکونی دسترسی سریع و بازگشت نرم به بالا را باز می‌کند.',
    icon: 'Compass',
    options: [
      { name: 'موقعیت دکمه در صفحه', type: 'select', defaultValue: 'راست پایین (RTL)', options: ['راست پایین (RTL)', 'چپ پایین'] },
      { name: 'انیمیشن پالس دکمه', type: 'boolean', defaultValue: true },
      { name: 'نمایش درصد اسکرول', type: 'boolean', defaultValue: true }
    ]
  },
  {
    id: 'el-21',
    code: 'sedrazavi_theme_toggle',
    title: 'سوییچ لوکس حالت شب و روز',
    titleEn: 'Dark/Light Luxury Theme Toggle',
    category: 'فوتر و هدر',
    description: 'دکمه تغییر تم با آیکون خورشید و ماه، ذخیره‌سازی ماندگار انتخاب موکل در حافظه مرورگر و تغییر یکدست استایل‌های المنتور.',
    icon: 'Sun',
    options: [
      { name: 'استایل دکمه', type: 'select', defaultValue: 'طلایی متالیک با ترنزیشن نرم', options: ['طلایی متالیک با ترنزیشن نرم', 'مینیمال خاکستری'] },
      { name: 'تم پیش‌فرض برای اولین بازدید', type: 'select', defaultValue: 'سیستم کاربر (Auto)', options: ['سیستم کاربر (Auto)', 'روشن (Light)', 'تاریک (Dark)'] }
    ]
  }
];

export const PRACTICE_AREAS_DATA: PracticeArea[] = [
  {
    id: 'pa-1',
    title: 'دعاوی ملکی، ثبتی و سرقفلی',
    slug: 'real-estate',
    icon: 'Building2',
    description: 'الزام به تنظیم سند، خلع ید، افراز و دستور فروش، پیش‌فروش و سرقفلی',
    caseCount: 420,
    badge: 'بیشترین تقاضا'
  },
  {
    id: 'pa-2',
    title: 'دعاوی تجاری، شرکت‌ها و ورشکستگی',
    slug: 'corporate-law',
    icon: 'Briefcase',
    description: 'تنظیم قراردادهای سهامداری، وصول مطالبات، چک، اسناد تجاری و انحلال',
    caseCount: 310,
    badge: 'تخصصی'
  },
  {
    id: 'pa-3',
    title: 'دعاوی کیفری، کلاهبرداری و اقتصادی',
    slug: 'criminal-defense',
    icon: 'ShieldAlert',
    description: 'جرایم اقتصادی، اختلاس، خیانت در امانت، کلاهبرداری اینترنتی و تعزیرات',
    caseCount: 285
  },
  {
    id: 'pa-4',
    title: 'حقوق خانواده، مهریه و ارث',
    slug: 'family-inheritance',
    icon: 'Users',
    description: 'طلاق توافقی، حضانت، تقسیم ترکه، وصیت، تحریر ماترک و نفقه‌',
    caseCount: 390
  },
  {
    id: 'pa-5',
    title: 'داوری بین‌المللی و بازرگانی',
    slug: 'international-arbitration',
    icon: 'Globe2',
    description: 'حل اختلافات قراردادهای صادرات/واردات، اینکوترمز و داوری اتاق بازرگانی',
    caseCount: 95,
    badge: 'بین‌المللی'
  },
  {
    id: 'pa-6',
    title: 'استارتاپ‌ها، مالکیت فکری و NDA',
    slug: 'startups-ip',
    icon: 'FileCode2',
    description: 'قراردادهای هم‌بنیان‌گذاران، جذب سرمایه، علائم تجاری و کپی‌رایت',
    caseCount: 140
  },
  {
    id: 'pa-7',
    title: 'دعاوی کار، تأمین اجتماعی و دیوان',
    slug: 'labor-administrative',
    icon: 'Scale',
    description: 'اختلافات کارگری/کارفرمایی، بیمه، سنوات و ابطال مصوبات در دیوان عدالت',
    caseCount: 180
  },
  {
    id: 'pa-8',
    title: 'تنظیم، بازبینی و نظارت بر قراردادها',
    slug: 'contract-drafting',
    icon: 'FileSignature',
    description: 'تنظیم جامع انواع قراردادهای مدنی، بانکی، پیمانکاری و بین‌المللی',
    caseCount: 520,
    badge: 'خدمت فوری'
  }
];

export const VIDEOS_DATA: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'وبینار تخصصی: راهنمای گام‌به‌گام پیگیری و صدور اجراییه چک صیادی در دادگاه',
    slug: 'sayad-check-legal-webinar',
    summary: 'بررسی جامع ماده ۲۳ قانون صدور چک، نحوه درخواست صدور اجراییه مستقیم و ترفندهای توقیف فوری حساب‌های بانکی.',
    category: 'دعاوی تجاری',
    duration: '۲۴:۱۵',
    date: '۱۲ مرداد ۱۴۰۳',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    views: 4890,
    tags: ['چک صیادی', 'اجراییه دادگاه', 'توقیف حساب', 'دعاوی تجاری'],
    presenter: 'دکتر سیده مریم رضوی',
    presenterRole: 'وکیل پایه یک دادگستری و مدرس دانشگاه',
    description: 'در این کارگاه آموزشی ویدئویی، سرکار خانم دکتر سیده مریم رضوی به تحلیل موشکافانه مقررات جدید چک صیادی پرداخته و مسیرهای میان‌بر قانونی جهت وصول مطالبات تجاری بدون نیاز به دادرسی طولانی را آموزش می‌دهند.',
    chapters: [
      { time: '۰۰:۰۰', seconds: 0, title: 'مقدمه و تغییرات بنیادین قانون جدید صدور چک' },
      { time: '۰۴:۲۰', seconds: 260, title: 'شرایط صدور گواهی عدم پرداخت با کد رهگیری' },
      { time: '۰۹:۱۵', seconds: 555, title: 'نحوه ثبت دادخواست صدور اجراییه در دفاتر خدمات قضایی' },
      { time: '۱۵:۳۰', seconds: 930, title: 'استعلام همزمان اموال و توقیف دارایی‌ها در سامانه سهام و حساب‌ها' },
      { time: '۲۱:۰۰', seconds: 1260, title: 'پاسخ به سوالات متداول شرکت‌کنندگان' }
    ],
    transcript: 'بسم الله الرحمن الرحیم. با سلام خدمت همراهان گرامی مؤسسه حقوقی SedRazavi. در این جلسه ویدئویی، پیرامون مهم‌ترین ابزار مالی بازرگانان یعنی چک صیادی صحبت می‌کنیم. طبق اصلاحات جدید قانون چک، اگر چک در سامانه صیاد ثبت نشده باشد، سند عادی تلقی شده و از امتیازات اسناد تجاری محروم است...'
  },
  {
    id: 'vid-2',
    title: 'کارگاه آموزشی: نکات طلایی قراردادهای مشارکت در ساخت و پیش‌فروش آپارتمان',
    slug: 'construction-partnership-guide',
    summary: 'تحلیل ریسک‌های حقوقی مالکین زمین و سازندگان، تعیین خسارت دیرکرد، تضمین‌های بانکی و شرایط فسخ قرارداد.',
    category: 'دعاوی ملکی',
    duration: '۳۱:۴۰',
    date: '۲ مرداد ۱۴۰۳',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    views: 6120,
    tags: ['مشارکت در ساخت', 'پیش‌فروش', 'الزام به سند', 'حقوق املاک'],
    presenter: 'دکتر سیده مریم رضوی',
    presenterRole: 'وکیل پایه یک دادگستری',
    description: 'قراردادهای مشارکت در ساخت همواره آبستن بیشترین دعاوی ملکی هستند. در این ویدیوی آموزشی، ۵ شرط حیاتی که مانع از مصادره یا بن‌بست پروژه‌های ساختمانی می‌شود مورد بررسی قرار گرفته است.',
    chapters: [
      { time: '۰۰:۰۰', seconds: 0, title: 'مقدمه و اهمیت پیش‌نویس اصولی قرارداد مشارکت' },
      { time: '۰۶:۱۵', seconds: 375, title: 'فرمول تعیین قدرالسهم و تقسیم طبقات' },
      { time: '۱۴:۴۰', seconds: 880, title: 'شرط داوری تخصصی در قرارداد مشارکت' },
      { time: '۲۳:۱۰', seconds: 1390, title: 'نحوه انتقال سند به نام سازنده به نسبت پیشرفت فیزیکی' }
    ],
    transcript: 'سلام بر همه مخاطبان گرامی. مشارکت در ساخت یکی از پرسودترین و در عین حال پرریسک‌ترین عقود نامعین است. اولین نکته‌ای که مالکین محترم باید مدنظر داشته باشند، عدم تفویض وکالت بلاعزل فروش به سازنده قبل از رسیدن پروژه به مرحله سفت‌کاری است...'
  },
  {
    id: 'vid-3',
    title: 'جلسه تخصصی: نحوه اثبات کلاهبرداری رایانه‌ای و دفاع در دادسرای جرایم اقتصادی',
    slug: 'cybercrime-defense-strategies',
    summary: 'بررسی ردپای دیجیتال، مستندسازی تراکنش‌های مالی مشکوک، استعلام IP و اخذ دستور توقیف در پلیس فتا.',
    category: 'حقوق کیفری',
    duration: '۱۹:۱۰',
    date: '۲۰ تیر ۱۴۰۳',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    views: 3290,
    tags: ['جرایم رایانه‌ای', 'پلیس فتا', 'دادسرا', 'دفاع کیفری'],
    presenter: 'دکتر سیده مریم رضوی',
    presenterRole: 'وکیل دعاوی کیفری و اقتصادی',
    description: 'تحلیل راهکارهای اثبات ادعا و تنظیم شکواییه تأثیرگذار در پرونده‌های جرایم سایبری، پولشویی و فیشینگ بانکی.',
    chapters: [
      { time: '۰۰:۰۰', seconds: 0, title: 'ماهیت ادله الکترونیکی در قانون مجازات اسلامی' },
      { time: '۰۵:۳۰', seconds: 330, title: 'اقدامات ۲۴ ساعت نخست پس از وقوع فیشینگ' },
      { time: '۱۲:۴۵', seconds: 765, title: 'شناسایی و احضار متهمین در شعب ویژه دادسرا' }
    ]
  },
  {
    id: 'vid-4',
    title: 'داوری تجاری بین‌المللی: مزایا، شروط داوری و نحوه اجرای آراء در ایران',
    slug: 'international-commercial-arbitration-guide',
    summary: 'چرا تجار و شرکت‌های خارجی داوری را به دادگاه ترجیح می‌دهند؟ بررسی کنوانسیون نیویورک و اتاق بازرگانی.',
    category: 'داوری بین‌المللی',
    duration: '۲۷:۵۰',
    date: '۲۸ خرداد ۱۴۰۳',
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1000',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    views: 2450,
    tags: ['داوری بین‌المللی', 'اتاق بازرگانی', 'کنوانسیون نیویورک', 'قرارداد تجاری'],
    presenter: 'دکتر سیده مریم رضوی',
    presenterRole: 'داور ارشد مرکز داوری اتاق بازرگانی',
    description: 'بررسی تخصصی سازوکار حل اختلاف در قراردادهای بین‌المللی و نحوه نگارش شرط داوری صحیح (Arbitration Clause).'
  },
  {
    id: 'vid-5',
    title: 'حقوق خانواده: نحوه محاسبه و مطالبه نحله، اجرت‌المثل و تنصیف دارایی',
    slug: 'family-rights-assets-division',
    summary: 'بررسی حقوق مالی زوجه در زمان طلاق، شروط ضمن عقد نکاح و نحوه تعیین ارزش دارایی‌های زوج.',
    category: 'حقوق خانواده',
    duration: '۲۱:۱۵',
    date: '۱۵ خرداد ۱۴۰۳',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    views: 5310,
    tags: ['حقوق خانواده', 'اجرت‌المثل', 'تنصیف دارایی', 'مهریه'],
    presenter: 'دکتر سیده مریم رضوی',
    presenterRole: 'وکیل پایه یک دادگستری',
    description: 'آموزش شرایط قانونی تنصیف دارایی‌های حاصل از زندگی مشترک و رویه قضایی دادگاه‌های تجدیدنظر استان تهران.'
  },
  {
    id: 'vid-6',
    title: 'حقوق استارتاپ‌ها: تنظیم قراردادهای سهامداری (SHA) و اعطای اختیار سهام (Vesting)',
    slug: 'startup-sha-vesting-agreements',
    summary: 'چگونه از خروج زودهنگام هم‌بنیان‌گذاران و تضییع سهام شرکت نوپا با قرارداد وستینگ جلوگیری کنیم؟',
    category: 'استارتاپ‌ها و قراردادها',
    duration: '۲۵:۰۰',
    date: '۱ خرداد ۱۴۰۳',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    views: 3880,
    tags: ['استارتاپ', 'قرارداد سهامداری', 'Vesting', 'قرارداد سرمایه‌گذاری'],
    presenter: 'دکتر سیده مریم رضوی',
    presenterRole: 'مشاور حقوقی شرکت‌های دانش‌بنیان',
    description: 'راهنمای حقوقی کارآفرینان و مدیران استارتاپ‌ها جهت محافظت از دارایی‌های نامشهود و سهام شرکت.'
  }
];

export const COMMENTS_INITIAL_DATA: CommentItem[] = [
  {
    id: 'comm-1',
    author: 'دکتر مسعود انصاری',
    authorEmail: 'ansari.law@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    content: 'ضمن تشکر از تحلیل بسیار دقیق سرکار خانم دکتر رضوی درباره ماده ۲۳ قانون صدور چک، سوالی داشتم: آیا در صورت فوت صادرکننده چک قبل از صدور اجراییه، امکان صدور مستقیم اجراییه علیه وراث در دایره اجرای احکام مدنی دادگاه وجود دارد یا باید حتماً دادخواست مطالبه وجه به طرفیت وراث اقامه شود؟',
    date: '۱۴۰۳/۰۵/۱۴ - ساعت ۱۱:۳۰',
    postTitle: 'راهنمای گام‌به‌گام پیگیری و صدور اجراییه چک صیادی در دادگاه',
    postType: 'video',
    postId: 'vid-1',
    status: 'approved',
    rating: 5,
    likes: 18,
    replies: [
      {
        id: 'comm-1-rep',
        author: 'دکتر سیده مریم رضوی (پاسخ وکیل)',
        authorEmail: 'info@sedrazavi.law',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
        content: 'درود بر شما جناب دکتر انصاری گرامی. با توجه به رأی وحدت رویه و ماهیت قائم‌مقامی عام وراث، در صورتی که گواهی حصر وراثت اخذ شده باشد، اجراییه مستقیماً علیه ماترک متوفی در ید وراث صادر می‌شود و نیازی به اقامه دعوای ماهوی مجدد نیست؛ مشروط بر اینکه وراث ترکه را رد نکرده باشند.',
        date: '۱۴۰۳/۰۵/۱۴ - ساعت ۱۴:۱۵',
        postTitle: 'راهنمای گام‌به‌گام پیگیری و صدور اجراییه چک صیادی در دادگاه',
        postType: 'video',
        postId: 'vid-1',
        status: 'approved',
        likes: 12,
        parentCommentId: 'comm-1'
      }
    ]
  },
  {
    id: 'comm-2',
    author: 'مهندس سهراب پناهی',
    authorEmail: 's.panahi.eng@yahoo.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    content: 'در قرارداد مشارکت در ساخت ما، سازنده پس از ۶ ماه از تاریخ مقرر هنوز پروانه ساختمانی را اخذ نکرده است. آیا بدون ارسال اظهارنامه رسمی می‌توانیم از حق فسخ مندرج در قرارداد استفاده کنیم؟',
    date: '۱۴۰۳/۰۵/۱۲ - ساعت ۰۹:۴۵',
    postTitle: 'تفاوت‌های حقوقی بنیادین میان عقد بیع، صلح‌نامه و مبایعه‌نامه عادی',
    postType: 'article',
    postId: 'art-2',
    status: 'approved',
    rating: 5,
    likes: 8
  },
  {
    id: 'comm-3',
    author: 'خانم مهسا کمالی',
    authorEmail: 'mahsa.kamali98@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    content: 'آیا برای مطالبه اجرت‌المثل ایام زوجیت در صورتی که زوج فوت کرده باشد، می‌توان علیه سایر ورثه از محل ترکه دادخواست داد؟ ممنون از وب‌سایت غنی و کاربردی شما.',
    date: '۱۴۰۳/۰۵/۱۰ - ساعت ۱۶:۲۰',
    postTitle: 'راهکارهای حقوقی و فرآیند قانونی مطالبه اجرت‌المثل ایام زوجیت',
    postType: 'article',
    postId: 'art-3',
    status: 'pending',
    rating: 4,
    likes: 3
  },
  {
    id: 'comm-4',
    author: 'علی نوری‌پور (صاحب کسب‌وکار)',
    authorEmail: 'nooripour.trading@gmail.com',
    content: 'جهت رزرو وقت مشاوره حضوری در رابطه با پرونده مالیاتی شرکت در کمیسیون ماده ۲۱۶، آیا مدارک را قبل از جلسه باید ایمیل کنیم یا در جلسه اول تحویل دهیم؟',
    date: '۱۴۰۳/۰۵/۰۸ - ساعت ۱۹:۱۰',
    postTitle: 'دعاوی تجاری و قراردادهای بازرگانی',
    postType: 'service',
    postId: 'srv-1',
    status: 'approved',
    rating: 5,
    likes: 6
  },
  {
    id: 'comm-5',
    author: 'ربات تبلیغاتی ارز دیجیتال',
    authorEmail: 'crypto_pump_2024@spammail.com',
    content: 'Buy crypto fast! Best bitcoin signals and pump channels at cheap prices. Visit http://cryptospam.xyz for 500% profit daily!',
    date: '۱۴۰۳/۰۵/۰۵ - ساعت ۰۳:۱۵',
    postTitle: 'راهنمای جامع اثبات ادعای کلاهبرداری اینترنتی',
    postType: 'article',
    postId: 'art-1',
    status: 'spam',
    likes: 0
  },
  {
    id: 'comm-6',
    author: 'پیام تست حذف شده',
    authorEmail: 'test.user@dummy.com',
    content: 'این یک کامنت تستی است که به سطل زباله منتقل شده است.',
    date: '۱۴۰۳/۰۵/۰۱ - ساعت ۱۰:۰۰',
    postTitle: 'وبینار چک صیادی',
    postType: 'video',
    postId: 'vid-1',
    status: 'trash',
    likes: 0
  }
];

// ============================================================================
// Phase 5 Data: Online Dispute Resolution (ODR), Virtual Hearings & Petitions
// ============================================================================

export const ARBITRATION_CASES_DATA: ArbitrationCase[] = [
  {
    id: 'arb-101',
    caseNumber: 'ARB-1403-0842',
    arbitrationCode: 'ODR-SR-9921',
    disputeTitle: 'اختلاف قراردادی در پروژه نرم‌افزاری و تاخیر در تحویل سورس‌کد',
    claimantName: 'شرکت تجارت الکترونیک آرمان داده',
    claimantNationalId: '۱۰۱۰۲۸۳۷۴۶۱',
    claimantLawyer: 'دکتر سیده مریم رضوی (وکیل پایه یک)',
    respondentName: 'شرکت فناوری‌های پیشرفته نوآوران وب',
    respondentNationalId: '۱۰۳۸۴۷۲۶۱۹۰',
    respondentLawyer: 'دکتر مسعود خلیلی (وکیل پایه یک)',
    arbitratorName: 'دکتر سیده مریم رضوی (داور مرضی‌الطرفین کانون وکلا)',
    arbitratorLicense: '۱۸۴۵۲ / ک.و.م',
    claimAmountToman: 450000000,
    arbitrationClauseType: 'ماده داوری قرارداد',
    registrationDate: '۱۴۰۳/۰۵/۱۰',
    hearingDate: '۱۴۰۳/۰۶/۲۵ - ساعت ۱۶:۰۰ (جلسه آنلاین)',
    status: 'جلسه استماع آنلاین',
    pleadings: [
      {
        id: 'pld-1',
        sender: 'claimant',
        senderName: 'خواهان (آرمان داده)',
        title: 'دادخواست داوری و مطالبه خسارت وجه التزام قراردادی',
        date: '۱۴۰۳/۰۵/۱۵',
        content: 'احتراماً به استناد ماده ۱۲ قرارداد پیمانکاری شماره ۴۰۲/۹۸، خوانده متعهد بوده ظرف مدت ۶ ماه سامانه را تحویل نهایی نماید ولیکن با گذشت ۹ ماه، کماکان تحویل ناقص مانده است. تقاضای محکومیت خوانده به پرداخت وجه التزام روزانه ۵ میلیون ریال به همراه اصل خسارت وارده را داریم.',
        attachments: ['قرارداد_شماره_۴۰۲.pdf', 'صورتجلسه_تحویل_فاز۲.pdf'],
        trackingCode: 'PLD-SR-40301'
      },
      {
        id: 'pld-2',
        sender: 'respondent',
        senderName: 'خوانده (نوآوران وب)',
        title: 'لایحه دفاعیه و تقاضای رد دعوا به دلیل فورس ماژور',
        date: '۱۴۰۳/۰۵/۲۸',
        content: 'در پاسخ به دادخواست داوری خواهان، اشعار می‌دارد که عدم تحویل به موقع ناشی از قطعی مکرر اینترنت بین‌الملل و عدم تایید API بانکی توسط خود کارفرما بوده که مشمول بند فورس‌ماژور قرارداد است.',
        attachments: ['مکاتبات_ایمیلی_با_بانک.pdf'],
        trackingCode: 'PLD-SR-40302'
      },
      {
        id: 'pld-3',
        sender: 'arbitrator',
        senderName: 'داور مرضی‌الطرفین (دکتر رضوی)',
        title: 'دستور وقت رسیدگی و تعیین جلسه استماع حضوری/مجازی',
        date: '۱۴۰۳/۰۶/۰۵',
        content: 'با توجه به وصول لایحه دفاعیه و عدم حصول سازش مقدماتی، جلسه استماع اظهارات و بررسی ادله فنی به تاریخ ۲۵ شهریور ساعت ۱۶ در تالار داوری آنلاین تشکیل می‌گردد.',
        trackingCode: 'ORD-SR-40303'
      }
    ]
  },
  {
    id: 'arb-102',
    caseNumber: 'ARB-1403-0519',
    arbitrationCode: 'ODR-SR-8412',
    disputeTitle: 'مطالبه ثمن معامله و وجه التزام تاخیر در تخلیه ملک تجاری سعادت‌آباد',
    claimantName: 'حاج محمود کمالی فرد',
    claimantNationalId: '۰۰۴۸۱۷۲۹۳۱',
    claimantLawyer: 'دکتر سیده مریم رضوی',
    respondentName: 'مهندس فرشید سعادتی',
    respondentNationalId: '۰۴۵۱۸۲۹۳۰۱',
    respondentLawyer: 'وکیل معرفی نشده (اصالتاً)',
    arbitratorName: 'دکتر سیده مریم رضوی',
    arbitratorLicense: '۱۸۴۵۲ / ک.و.م',
    claimAmountToman: 1800000000,
    arbitrationClauseType: 'موافقت‌نامه داوری مستقل',
    registrationDate: '۱۴۰۳/۰۴/۰۲',
    hearingDate: '۱۴۰۳/۰۵/۱۸',
    status: 'رأی داوری صادر شد',
    awardSummary: 'محکومیت خوانده به پرداخت مبلغ ۱ میلیارد و ۵۰۰ میلیون تومان اصل طلب و ۸۰ میلیون تومان وجه التزام تاخیر تادیه و پرداخت هزینه داوری',
    awardFullText: 'بسمه تعالی - رأی داوری: با توجه به مبایعه‌نامه شماره ۱۷۲۸۴ و بررسی اظهارنامه رسمی ابلاغ‌شده و عدم اقامه دلیل موجه از سوی خوانده دال بر پرداخت مابقی ثمن، به استناد مواد ۴۸۲ و ۴۸۵ قانون آیین دادرسی مدنی، خوانده محکوم به پرداخت اصل خواسته و خسارات قانونی گردید. این رأی ظرف ۲۰ روز از تاریخ ابلاغ قابل اعتراض در دادگاه عمومی حقوقی تهران است.',
    awardDate: '۱۴۰۳/۰۵/۲۵',
    enforcementBranch: 'شعبه ۳ اجرای احکام مدنی مجتمع قضایی شهید بهشتی',
    pleadings: []
  },
  {
    id: 'arb-103',
    caseNumber: 'ARB-1403-0914',
    arbitrationCode: 'ODR-SR-9988',
    disputeTitle: 'اختلاف در نحوه تقسیم سود و انحلال شرکت تضامنی بازرگانی سپهر',
    claimantName: 'دکتر بیژن افشار',
    claimantNationalId: '۰۰۵۹۱۸۲۷۳۱',
    claimantLawyer: 'دفتر وکالت دکتر رضوی',
    respondentName: 'آقای کامران معتمدی',
    respondentNationalId: '۰۰۶۲۷۱۸۲۹۱',
    arbitratorName: 'هیات داوری کانون وکلا (سرداور: دکتر رضوی)',
    arbitratorLicense: '۱۸۴۵۲ / ک.و.م',
    claimAmountToman: 6200000000,
    arbitrationClauseType: 'ماده داوری قرارداد',
    registrationDate: '۱۴۰۳/۰۶/۰۱',
    hearingDate: '۱۴۰۳/۰۶/۲۹',
    status: 'در حال تبادل لوایح',
    pleadings: []
  }
];

export const PETITION_TEMPLATES_DATA: PetitionTemplate[] = [
  {
    id: 'pet-check',
    title: 'دادخواست مطالبه وجه چک صیادی و خسارت تاخیر تادیه',
    category: 'اسناد تجاری و تعهدات',
    subjectTitle: 'مطالبه وجه چک صیادی به انضمام خسارت تاخیر تادیه بر مبنای نرخ تورم بانک مرکزی و کلیه خسارات دادرسی',
    targetCourt: 'دادگاه عمومی حقوقی',
    legalArticles: [
      'ماده ۲ و تبصره الحاقی به ماده ۲ قانون صدور چک مصوب ۱۳۸۲',
      'ماده ۱۹۸ و ۵۲۲ قانون آیین دادرسی مدنی',
      'ماده ۳۱۰ الی ۳۱۵ قانون تجارت'
    ],
    requiredDocuments: [
      'تصویر مصدق گواهی عدم پرداخت صادره از بانک محال‌علیه',
      'تصویر روی و پشت چک صیادی با بارکد ۱۶ رقمی',
      'کارت ملی خواهان و گواهی ثبت‌نام در سامانه ثنا',
      'وکالت‌نامه رسمی الکترونیک وکیل'
    ],
    defaultText: `ریاست محترم دادگاه عمومی حقوقی،
احتراماً به وکالت از خواهان معروض می‌دارد:
خوانده محترم به موجب یک فقره چک صیادی به شماره شناسه [شناسه_چک] عهده بانک [نام_بانک] شعبه [شعبه] به مبلغ [مبلغ_ریال] ریال در سررسید [تاریخ_سررسید] متعهد به پرداخت وجه بوده است.
متأسفانه با مراجعه موکل به بانک محال‌علیه در مواعد قانونی، به علت کسر موجودی منتهی به صدور گواهی عدم پرداخت شماره [شماره_گواهی] گردیده است.
علی‌هذا مستنداً به قانون صدور چک و مواد ۱۹۸ و ۵۲۲ قانون آیین دادرسی مدنی، صدور حکم بر محکومیت خوانده به پرداخت اصل وجه چک به مبلغ فوق‌الذکر، به انضمام خسارت تأخیر تأدیه از تاریخ سررسید چک تا یوم‌الاداء و کلیه خسارات دادرسی و حق‌الوکاله وکیل مورد استدعاست.`
  },
  {
    id: 'pet-property-deed',
    title: 'دادخواست الزام به تنظیم سند رسمی انتقال ملک و تحویل مبیع',
    category: 'دعاوی ملکی',
    subjectTitle: 'الزام خوانده به حضور در دفتر اسناد رسمی و انتقال قطعی سند مالکیت پلاک ثبتی و تسلیم مبیع',
    targetCourt: 'دادگاه عمومی حقوقی',
    legalArticles: [
      'مواد ۱۰، ۲۱۹، ۲۲۰ و ۲۲۱ قانون مدنی',
      'ماده ۴۶ و ۴۸ قانون ثبت اسناد و املاک کشور',
      'ماده ۵۱۵ و ۵۱۹ قانون آیین دادرسی دادگاه‌های عمومی و انقلاب در امور مدنی'
    ],
    requiredDocuments: [
      'تصویر مصدق مبایعه‌نامه رسمی با کد رهگیری املاک',
      'گواهی عدم حضور صادره از دفترخانه اسناد رسمی',
      'استعلام ثبتی پلاک ثبتی ملک از اداره ثبت اسناد محل',
      'قبوض واریز ثمن معامله توسط خریدار'
    ],
    defaultText: `ریاست محترم دادگاه عمومی حقوقی،
احتراماً به استحضار عالی می‌رساند:
به موجب قرارداد بیع (مبایعه‌نامه) شماره [شماره_قرارداد] مورخ [تاریخ_قرارداد]، موکل شش‌دانگ یک باب آپارتمان/ملک با مشخصات ثبتی پلاک [پلاک_ثبتی] واقع در [آدرس_ملک] را از خوانده محترم ابتیاع نموده و بخش عمده ثمن معامله را پرداخت کرده است.
مقرر بوده طرفین در تاریخ [تاریخ_حضور] در دفترخانه اسناد رسمی شماره [شماره_دفترخانه] جهت انتقال رسمی سند حاضر شوند لیکن خوانده به تعهد خود عمل ننموده و گواهی عدم حضور صادر گردیده است.
لذا مستنداً به مواد ۱۰، ۲۱۹ و ۲۲۰ قانون مدنی، تقاضای صدور حکم به الزام خوانده به اخذ پایانکار، صورت‌مجلس تفکیکی و حضور در دفترخانه جهت تنظیم سند رسمی انتقال و تحویل مبیع به انضمام خسارات دادرسی را دارد.`
  },
  {
    id: 'pet-eviction',
    title: 'دستور تخلیه فوری عین مستاجره مسکونی/تجاری',
    category: 'دعاوی ملکی',
    subjectTitle: 'تقاضای صدور دستور فوری تخلیه عین مستاجره به لحاظ انقضای مدت عقد اجاره مستنداً به قانون روابط موجر و مستاجر سال ۱۳۷۶',
    targetCourt: 'شورای حل اختلاف',
    legalArticles: [
      'ماده ۲، ۳ و ۴ قانون روابط موجر و مستاجر مصوب سال ۱۳۷۶',
      'آیین‌نامه اجرایی قانون روابط موجر و مستاجر ۱۳۷۸'
    ],
    requiredDocuments: [
      'قرارداد اجاره تنظیمی در دو نسخه با امضای دو شاهد',
      'سند مالکیت موجر',
      'گواهی تودیع مبلغ قرض‌الحسنه (ودیعه) به صندوق دادگستری'
    ],
    defaultText: `ریاست محترم شورای حل اختلاف،
احتراماً خاطرنشان می‌سازد:
موکل به موجب اجاره‌نامه عادی مورخ [تاریخ_اجاره] که به امضای دو نفر شاهد رسیده است، شش‌دانگ یک دستگاه آپارتمان مسکونی پلاک ثبتی [پلاک_ثبتی] را به مدت یک سال به خوانده محترم اجاره داده است.
مدت اجاره در تاریخ [تاریخ_انقضا] منقضی گردیده ولیکن مستاجر علیرغم مراجعات و ممانعت از تمدید، از تخلیه و تحویل مورد اجاره امتناع می‌ورزد.
با عنایت به تودیع کامل مبلغ ودیعه به حساب سپرده دادگستری، مستنداً به ماده ۳ قانون روابط موجر و مستاجر سال ۱۳۷۶، صدور فوری دستور تخلیه عین مستاجره مورد استدعاست.`
  },
  {
    id: 'pet-appeal',
    title: 'لایحه تجدیدنظرخواهی حقوقی (مستند به ماده ۳۴۸ ق.آ.د.م)',
    category: 'لوایح دادرسی',
    subjectTitle: 'تجدیدنظرخواهی نسبت به دادنامه شماره [شماره_دادنامه] صادره از شعبه [شماره_شعبه] دادگاه عمومی حقوقی',
    targetCourt: 'دادگاه تجدیدنظر استان',
    legalArticles: [
      'ماده ۳۴۸ (بندهای ج، هـ) قانون آیین دادرسی مدنی',
      'اصل ۳۴ و ۱۵۶ قانون اساسی جمهوری اسلامی ایران'
    ],
    requiredDocuments: [
      'تصویر مصدق دادنامه تجدیدنظرخواسته',
      'گواهی ابلاغ دادنامه از سامانه ثنا',
      'مدارک جدیدالتحصیل اثبات‌کننده ادعا'
    ],
    defaultText: `قضات دانشمند و شریف دادگاه تجدیدنظر استان،
با سلام و ادای احترام،
نسبت به دادنامه شماره [شماره_دادنامه] موضوع پرونده کلاسه [کلاسه_پرونده] صادره از شعبه محترم دادگاه بدوی که در تاریخ [تاریخ_ابلاغ] ابلاغ گردیده، در فرجه قانونی تجدیدنظرخواهی نموده و در مقام تبیین جهات تجدیدنظرخواهی به استحضار می‌رساند:
رأی معترض‌عنه به جهات ذیل مخدوش و فاقد وجاهت قانونی است:
۱. عدم توجه دادگاه بدوی به دلایل و منضمات ارائه‌شده (موضوع بند هـ ماده ۳۴۸ ق.آ.د.م).
۲. صدور رأی بر خلاف موازین شرعی و مقررات آمره قانونی.
لذا نقض دادنامه بدوی و صدور رأی شایسته بر حقانیت موکل استدعا دارد.`
  },
  {
    id: 'pet-fraud',
    title: 'شکواییه کلاهبرداری اینترنتی و خیانت در امانت',
    category: 'دعاوی کیفری',
    subjectTitle: 'شکایت کلاهبرداری رایانه‌ای از طریق درگاه جعلی (فیشینگ) و تصاحب غیرقانونی وجوه',
    targetCourt: 'دادسرا و دادگاه کیفری دو',
    legalArticles: [
      'ماده ۱۳ قانون جرایم رایانه‌ای (ماده ۷۴۱ قانون مجازات اسلامی بخش تعزیرات)',
      'ماده ۶۷۴ قانون مجازات اسلامی (خیانت در امانت)'
    ],
    requiredDocuments: [
      'پرینت تراکنش‌های بانکی ممهور به مهر شعبه بانک',
      'شات پیامک‌های فیشینگ و آدرس درگاه جعلی',
      'استعلام اولیه پلیس فضای تولید و تبادل اطلاعات (فتا)'
    ],
    defaultText: `دادستان محترم عمومی و انقلاب،
با عرض ادب و تحیات،
احتراماً به استحضار عالی می‌رساند:
مشتکی‌عنه با ایجاد صفحات تقلبی در بستر شبکه اجتماعی و ارسال پیام جعلی مبنی بر دریافت سود سهام عدالت/پست قضایی، موکل را به درگاه پرداخت غیرمعتبر هدایت نموده و متعاقباً مبلغ [مبلغ_ریال] ریال به صورت غیرمجاز از حساب موکل به شماره کارت [شماره_کارت] برداشت و به حساب‌های واسط منتقل گردیده است.
مستنداً به ماده ۱۳ قانون جرایم رایانه‌ای، تقاضای ردیابی حساب مقصد توسط پلیس فتا، انسداد حساب مشتکی‌عنه و تعقیب کیفری و مجازات نامبرده و رد مال را داریم.`
  }
];

export const VIRTUAL_HEARING_SCHEDULE_DATA: VirtualHearingSession[] = [
  {
    id: 'vhs-01',
    sessionCode: 'ROOM-SR-7821',
    title: 'رسیدگی داوری بین‌المللی پرونده آرمان داده علیه نوآوران وب',
    caseNumber: 'ARB-1403-0842',
    branchName: 'اتاق داوری مجازی SedRazavi (مرکز داوری)',
    scheduledDateTime: 'امروز - ساعت ۱۶:۰۰ الی ۱۷:۳۰',
    durationMinutes: 90,
    judgeOrArbitrator: 'دکتر سیده مریم رضوی (سرداور مرضی‌الطرفین)',
    claimantName: 'شرکت تجارت الکترونیک آرمان داده',
    claimantLawyer: 'دکتر سیده مریم رضوی',
    respondentName: 'شرکت فناوری‌های پیشرفته نوآوران وب',
    respondentLawyer: 'دکتر مسعود خلیلی',
    status: 'در حال برگزاری',
    isEncrypted: true,
    recordingAvailable: true,
    agenda: [
      'احراز هویت برخط طرفین و بررسی اصالت امضاهای الکترونیک',
      'استماع اظهارات شفاهی مدیرعامل شرکت آرمان داده',
      'پاسخ‌های تیم فنی نوآوران وب در خصوص بندهای فورس‌ماژور',
      'بررسی گزارش کارشناس رسمی دادگستری در رشته کامپیوتر',
      'تنظیم صورتجلسه الکترونیک و درج امضای دیجیتال'
    ]
  },
  {
    id: 'vhs-02',
    sessionCode: 'ROOM-SR-9104',
    title: 'جلسه حل اختلاف و سازش دعاوی ملکی سعادت‌آباد',
    caseNumber: 'CASE-1403-4412',
    branchName: 'اتاق صلح و سازش دفتر وکالت ونک',
    scheduledDateTime: 'فردا - ساعت ۱۰:۰۰ الی ۱۱:۱۵',
    durationMinutes: 75,
    judgeOrArbitrator: 'مشاور حقوقی ارشد دفتر',
    claimantName: 'حاج محمود کمالی فرد',
    claimantLawyer: 'دکتر رضوی',
    respondentName: 'مهندس فرشید سعادتی',
    respondentLawyer: 'اصالتاً',
    status: 'در انتظار تشکیل',
    isEncrypted: true,
    recordingAvailable: true,
    agenda: [
      'بررسی پیشنهادات تعدیل ثمن معامله',
      'تنظیم متمم قرارداد توافقی در صورت حصول سازش'
    ]
  },
  {
    id: 'vhs-03',
    sessionCode: 'ROOM-SR-5519',
    title: 'مشاوره تصویری تخصصی قراردادهای هوش مصنوعی و مالکیت فکری',
    caseNumber: 'CONS-1403-1029',
    branchName: 'اتاق مشاوره تصویری وکیل',
    scheduledDateTime: 'پنج‌شنبه - ساعت ۱۷:۰۰ الی ۱۸:۰۰',
    durationMinutes: 60,
    judgeOrArbitrator: 'دکتر سیده مریم رضوی',
    claimantName: 'دکتر فرزاد شایگان',
    claimantLawyer: '-',
    respondentName: '-',
    respondentLawyer: '-',
    status: 'در انتظار تشکیل',
    isEncrypted: true,
    recordingAvailable: false,
    agenda: [
      'بررسی پیش‌نویس لایسنس بین‌المللی مدل هوش مصنوعی',
      'حقوق مالکیت فکری و محرمانگی داده‌ها طبق کنوانسیون برن'
    ]
  }
];

// ==========================================
// Phase 7 Data: Legal Strategy, Deadlines & Client Vault
// ==========================================

export const JUDICIAL_DEADLINE_RULES_DATA: import('../types/theme').JudicialDeadlineRule[] = [
  {
    id: 'dl-appeal-civil',
    title: 'مهلت تجدیدنظرخواهی از احکام و قرارهای دادگاه‌های عمومی حقوقی',
    category: 'اعتراض به آراء',
    durationDays: 20,
    durationForeignDays: 60,
    statutoryArticle: 'ماده ۳۳۶ قانون آیین دادرسی دادگاه‌های عمومی و انقلاب در امور مدنی',
    description: 'مهلت تجدیدنظرخواهی برای اشخاص مقیم ایران ۲۰ روز و برای اشخاص مقیم خارج از کشور ۲ ماه از تاریخ ابلاغ یا انقضای مهلت واخواهی است.',
    ruleExplanation: 'روز ابلاغ و روز اقدام جزء مدت محسوب نمی‌شود (ماده ۴۴۵ ق.آ.د.م). چنانچه روز آخر موعد با تعطیل رسمی مصادف شود، آن روز به حساب نیامده و اولین روز بعد از تعطیلی، آخرین روز مهلت خواهد بود (ماده ۴۴۴ ق.آ.د.م).',
    appliesTo: 'هر دو نوع ابلاغ'
  },
  {
    id: 'dl-appeal-criminal',
    title: 'مهلت تجدیدنظرخواهی از آرای دادگاه‌های کیفری دو و دادگاه انقلاب',
    category: 'دعاوی کیفری و دادسرا',
    durationDays: 20,
    durationForeignDays: 60,
    statutoryArticle: 'ماده ۴۳۱ قانون آیین دادرسی کیفری مصوب ۱۳۹۲',
    description: 'مهلت درخواست تجدیدنظر یا فرجام برای اشخاص مقیم ایران بیست روز و برای افراد مقیم خارج دو ماه از تاریخ ابلاغ رأی یا انقضای مهلت واخواهی است.',
    ruleExplanation: 'اعتراض توسط محکوم‌علیه، شاکی یا وکلای آنان از طریق دفاتر خدمات الکترونیک قضایی ثبت و به دادگاه تجدیدنظر استان ارسال می‌گردد.',
    appliesTo: 'هر دو نوع ابلاغ'
  },
  {
    id: 'dl-supreme-court',
    title: 'مهلت فرجام‌خواهی در دیوان عالی کشور',
    category: 'اعتراض به آراء',
    durationDays: 20,
    durationForeignDays: 60,
    statutoryArticle: 'ماده ۳۹۷ قانون آیین دادرسی مدنی',
    description: 'مهلت درخواست فرجام برای اشخاص ساکن ایران ۲۰ روز و برای ساکنان خارج از کشور دو ماه از تاریخ ابلاغ رأی دادگاه تجدیدنظر یا انقضای مهلت تجدیدنظر بدوی است.',
    ruleExplanation: 'رسیدگی شکلی در دیوان عالی کشور جهت انطباق رأی صادره با شرع انور و موازین قانونی صورت می‌پذیرد.',
    appliesTo: 'هر دو نوع ابلاغ'
  },
  {
    id: 'dl-expert-objection',
    title: 'مهلت اعتراض به نظریه کارشناس رسمی دادگستری',
    category: 'مواهد کارشناسی و ابلاغ',
    durationDays: 7,
    durationForeignDays: 7,
    statutoryArticle: 'ماده ۲۶۰ قانون آیین دادرسی مدنی',
    description: 'طرفین دعوا می‌توانند ظرف یک هفته از تاریخ ابلاغ نظر کارشناسی، به آن اعتراض کرده و تقاضای ارجاع به هیأت کارشناسی بالاتر (۳ نفره، ۵ نفره و...) نمایند.',
    ruleExplanation: 'مهلت یک هفته معادل ۷ روز تقویمی پس از روز ابلاغ است. در صورت انقضای ۷ روز، نظریه کارشناسی ملاک صدور رأی قاضی قرار خواهد گرفت مگر اینکه با اوضاع و احوال محقق مطابقت نداشته باشد.',
    appliesTo: 'هر دو نوع ابلاغ'
  },
  {
    id: 'dl-default-judgment',
    title: 'مهلت واخواهی از دادنامه غیابی (محکوم‌علیه غایب)',
    category: 'اعتراض به آراء',
    durationDays: 20,
    durationForeignDays: 60,
    statutoryArticle: 'ماده ۳۰۶ قانون آیین دادرسی مدنی و ماده ۴۰۶ ق.آ.ک',
    description: 'حکم دادگاه غیابی است اگر خوانده یا وکیل وی در هیچ‌یک از جلسات حاضر نبوده و لایحه دفاعیه نفرستاده باشند؛ مهلت واخواهی ۲۰ روز است.',
    ruleExplanation: 'واخواهی اثر تعلیقی بر اجرای حکم دارد و دادگاه صادرکننده حکم بدوی مکلف به رسیدگی مجدد ماهوی به دفاعیات محکوم‌علیه غایب است.',
    appliesTo: 'هر دو نوع ابلاغ'
  },
  {
    id: 'dl-rectify-petition',
    title: 'مهلت رفع نقص دادخواست پس از اخطار دفتر دادگاه',
    category: 'دستورات و قرارهای دادرسی',
    durationDays: 10,
    durationForeignDays: 10,
    statutoryArticle: 'مواد ۵۳ و ۵۴ قانون آیین دادرسی مدنی',
    description: 'مدیر دفتر دادگاه مواردی مانند کسر تمبر مالیاتی، نقص پیوست‌ها یا عدم پرداخت هزینه دادرسی را ابلاغ کرده و خواهان مکلف است ظرف ۱۰ روز رفع نقص کند.',
    ruleExplanation: 'عدم رفع نقص در مهلت ۱۰ روزه منتهی به صدور قرار رد دادخواست توسط مدیر دفتر دادگاه خواهد شد که ظرف ۱۰ روز قابل شکایت نزد همان دادگاه است.',
    appliesTo: 'ابلاغ واقعی'
  },
  {
    id: 'dl-prosecutor-order',
    title: 'مهلت اعتراض به قرار منع تعقیب یا موقوفی تعقیب دادسرا',
    category: 'دعاوی کیفری و دادسرا',
    durationDays: 10,
    durationForeignDays: 30,
    statutoryArticle: 'ماده ۲۷۰ و ۲۷۱ قانون آیین دادرسی کیفری',
    description: 'شاکی می‌تواند ظرف ۱۰ روز از تاریخ ابلاغ قرار منع تعقیب یا موقوفی تعقیب بازپرس یا دادیار، نسبت به آن در دادگاه کیفری ذی‌صلاح اعتراض کند.',
    ruleExplanation: 'دادگاه کیفری در صورت وارد دانستن اعتراض، قرار جلب به دادرسی صادر نموده و دادسرا مکلف به صدور کیفرخواست خواهد بود.',
    appliesTo: 'هر دو نوع ابلاغ'
  }
];

export const CLIENT_VAULT_DOCUMENTS_DATA: import('../types/theme').ClientVaultDocument[] = [
  {
    id: 'doc-v-01',
    title: 'سند تک‌برگ کاداستری شش‌دانگ ملک زعفرانیه (پلاک ثبتی ۱۲۴/۱۸)',
    category: 'اسناد مالکیت',
    fileType: 'pdf',
    fileSize: '۴.۲ مگابایت',
    uploadDate: '۱۴۰۳/۰۶/۱۰',
    sha256Hash: '9e7b4a2f8d31a5c60e1f7c8b4a2d9e3f1c5b7a9d0e2f4a6c8b1d3e5f7a9b0c2e',
    confidentialityLevel: 'فوق‌سری دادگاه',
    caseTrackingCode: 'CASE-1403-8819',
    lawyerCertified: true,
    notes: 'استعلام سیستمی ثبت من اخذ شده؛ شناسه جام ۱۸ رقمی تایید و بدون بازداشت ثبتی می‌باشد.'
  },
  {
    id: 'doc-v-02',
    title: 'تصویر ۲ فقره چک صیادی بنفش به انضمام گواهی عدم پرداخت بانک ملت',
    category: 'اسناد تجاری و چک',
    fileType: 'image',
    fileSize: '۲.۸ مگابایت',
    uploadDate: '۱۴۰۳/۰۶/۱۲',
    sha256Hash: '4f2e8c1b9a7d3f0e5a6c8b1d2e4f7a9b3c5e0d2f1a4c6b8d0e2f4a7b9c1d3e5a',
    confidentialityLevel: 'محرمانه موکل',
    caseTrackingCode: 'CASE-1403-9104',
    lawyerCertified: true,
    notes: 'کد ۱۶ رقمی صیاد در سامانه پیچک چک تایید شده؛ دادخواست صدور اجراییه ماده ۲۳ ثبت گردید.'
  },
  {
    id: 'doc-v-03',
    title: 'قرارداد مشارکت در ساخت پروژه ۱۰ واحدی الهیه (نسخه امضا شده با کد رهگیری)',
    category: 'قراردادها',
    fileType: 'contract',
    fileSize: '۸.۵ مگابایت',
    uploadDate: '۱۴۰۳/۰۵/۲۲',
    sha256Hash: '7c9a1d3f5e0b2a4c6e8f0a2b4c6d8e1f3a5b7c9d0e2f4a6b8c0d2e4f6a8b0c2d',
    confidentialityLevel: 'امتیاز محرمانگی دفاع',
    caseTrackingCode: 'ARB-1403-0842',
    lawyerCertified: true,
    notes: 'حاوی بند داوری سرکار خانم دکتر رضوی؛ شروط وجه التزام روزانه ممیزی و تایید گردیده است.'
  },
  {
    id: 'doc-v-04',
    title: 'فایل صوتی استراق اقرار متهم به دریافت وجوه امانی در حضور دو شاهد',
    category: 'ادله صوتی و دیجیتال',
    fileType: 'audio',
    fileSize: '۱۴.۱ مگابایت',
    uploadDate: '۱۴۰۳/۰۶/۰۱',
    sha256Hash: '1a3c5e7f9b0d2f4a6c8b0e2d4f6a8c0e2f4a6b8d0c2e4f6a8b0d2f4a6c8e0b2d',
    confidentialityLevel: 'فوق‌سری دادگاه',
    caseTrackingCode: 'CASE-1403-7741',
    lawyerCertified: true,
    notes: 'تحت استانداردهای زنجیره حفاظت از ادله (Chain of Custody) استخراج شده؛ آماده ارائه به کارشناسی صدا.'
  },
  {
    id: 'doc-v-05',
    title: 'دادنامه قطعی شعبه ۵۴ دادگاه تجدیدنظر استان تهران مبنی بر فسخ مبایعه‌نامه',
    category: 'آراء و اوراق قضایی',
    fileType: 'pdf',
    fileSize: '۱.۹ مگابایت',
    uploadDate: '۱۴۰۳/۰۴/۱۸',
    sha256Hash: '5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f',
    confidentialityLevel: 'عادی',
    caseTrackingCode: 'CASE-1402-3320',
    lawyerCertified: true,
    notes: 'به نفع موکل صادر شد؛ پرونده به شعبه اجرای احکام ارسال گردیده است.'
  }
];

export const CONTRACT_AUDIT_SAMPLES: import('../types/theme').ContractAuditSample[] = [
  {
    id: 'audit-construction',
    title: 'قرارداد مشارکت در ساخت و احداث بنا (پروژه ۵ طبقه نیاوران)',
    category: 'مشارکت در ساخت',
    description: 'تحلیل ریسک بندهای تعهدآور سازنده، انتقال سهم‌العرصه، پیش‌فروش و شرایط فورس‌ماژور تورمی',
    overallSafetyScore: 42,
    sampleRawText: `ماده ۴ - تعهدات سازنده:
سازنده متعهد است ظرف مدت ۲۴ ماه پروژه را به اتمام رسانده و تحویل نماید. هرگونه افزایش قیمت مصالح ساختمانی، تورم یا نوسانات ارز جزء فورس‌ماژور محسوب شده و موجب تمدید خودکار مدت قرارداد به همان میزان خواهد بود.
ماده ۷ - انتقال سهم‌العرصه:
مالک متعهد می‌گردد همزمان با اتمام سفت‌کاری، نسبت به انتقال رسمی ۳ دانگ از سند زمین به نام سازنده در دفترخانه اقدام نماید. سازنده حق پیش‌فروش واحدهای سهمی خود را از زمان شروع گودبرداری دارا می‌باشد.
ماده ۱۰ - اسقاط خیارات:
طرفین کافه خیارات ولو خیار غبن فاحش یا افحش را از خود سلب و ساقط نمودند.`,
    clauses: [
      {
        clauseId: 'c1',
        title: 'بند فورس‌ماژور و تورم مصالح (ماده ۴)',
        originalText: 'هرگونه افزایش قیمت مصالح ساختمانی، تورم یا نوسانات ارز جزء فورس‌ماژور محسوب شده و موجب تمدید خودکار مدت قرارداد به همان میزان خواهد بود.',
        riskLevel: 'critical',
        issueDescription: 'شناسایی تورم اقتصادی به عنوان قوه قاهره (فورس‌ماژور) به سازنده امکان می‌دهد هر تاخیری را بدون جریمه توجیه کند.',
        legalDanger: 'طبق موازین حقوقی ایران، نوسان قیمت ریسک تجاری است و نه فورس‌ماژور؛ این بند حق فسخ و خسارت تاخیر مالک را به طور کامل فلج می‌کند.',
        recommendedRevision: 'نوسانات قیمت مصالح ساختمانی و تورم به هیچ وجه فورس‌ماژور تلقی نمی‌گردد و سازنده با علم به شرایط بازار اقدام نموده است. فقط حوادث غیرمترقبه طبیعی قهری مصداق فورس‌ماژور خواهند بود.',
        relevantLegalArticle: 'ماده ۲۲۷ و ۲۲۹ قانون مدنی (اوصاف قوه قاهره)'
      },
      {
        clauseId: 'c2',
        title: 'انتقال سند قبل از نازک‌کاری و پیش‌فروش بی قید و شرط (ماده ۷)',
        originalText: 'مالک متعهد می‌گردد همزمان با اتمام سفت‌کاری نسبت به انتقال رسمی ۳ دانگ به سازنده اقدام نماید. سازنده حق پیش‌فروش واحدهای سهمی خود را از زمان گودبرداری دارا می‌باشد.',
        riskLevel: 'critical',
        issueDescription: 'انتقال عرصه قبل از اتمام نازک‌کاری و صدور پایان‌کار، مالک را در معرض رهن گذاشتن ملک توسط سازنده یا فرار سازنده با سند قرار می‌دهد.',
        legalDanger: 'سازنده ممکن است پس از اخذ ۳ دانگ، پروژه را متوقف نماید یا بدون نظارت مالک پیش‌فروش نموده و تعهدات معارض ایجاد نماید.',
        recommendedRevision: 'انتقال سند متناسب با پیشرفت فیزیکی و با اخذ تضمین بانکی حسن انجام کار انجام پذیرد؛ حق پیش‌فروش منوط به اجازه کتبی و قبلی مالک و تعیین قطعی واحدها خواهد بود.',
        relevantLegalArticle: 'قانون پیش‌فروش ساختمان مصوب ۱۳۸۹ و ماده ۲۳۴ قانون مدنی'
      },
      {
        clauseId: 'c3',
        title: 'اسقاط کافه خیارات به ویژه غبن افحش (ماده ۱۰)',
        originalText: 'طرفین کافه خیارات ولو خیار غبن فاحش یا افحش را از خود سلب و ساقط نمودند.',
        riskLevel: 'high',
        issueDescription: 'سلب خیار غبن افحش به این معناست که حتی در صورت تفاوت قیمت میلیاردی در محاسبات قدرالسهم، راه ابطال یا فسخ بسته است.',
        legalDanger: 'اگر متراژ یا تراکم پیش‌بینی شده طبق ضوابط شهرداری محقق نشود، مالک نمی‌تواند قرارداد را به علت ضرر هنگفت فسخ نماید.',
        recommendedRevision: 'کافه خیارات به جز خیار تدلیس، تخلف از شرط صفت و خیار تعذر تسلیم از طرفین سلب می‌گردد، لکن حق فسخ ناشی از تخلف تعهدات به قوت خود باقی است.',
        relevantLegalArticle: 'ماده ۴۴۸ و ۴۱۶ قانون مدنی'
      }
    ]
  },
  {
    id: 'audit-property-sale',
    title: 'مبایعه‌نامه خرید آپارتمان مسکونی (سند در رهن بانک مسکن)',
    category: 'مبایعه‌نامه املاک',
    description: 'ارزیابی ریسک فک رهن، خسارت تاخیر روزانه (وجه التزام) و ضمانت درک مبیع و مستحق‌للغیر درآمدن',
    overallSafetyScore: 58,
    sampleRawText: `ماده ۵ - ثمن معامله و نحوه پرداخت:
خریدار ۵۰ درصد مبلغ را نقد پرداخت نموده و مابقی را در تاریخ تنظیم سند رسمی در دفترخانه پرداخت خواهد نمود.
ماده ۶ - فک رهن:
فروشنده متعهد است تا روز محضر ملک را از رهن بانک خارج نماید؛ در غیر اینصورت روزانه ۲۰۰ هزار تومان خسارت پرداخت خواهد کرد.`,
    clauses: [
      {
        clauseId: 'c4',
        title: 'وجه التزام ناچیز در برابر تورم ملکی (ماده ۶)',
        originalText: 'در غیر اینصورت روزانه ۲۰۰ هزار تومان خسارت پرداخت خواهد کرد.',
        riskLevel: 'critical',
        issueDescription: 'تعیین خسارت روزانه ۲۰۰ هزار تومان برای ملکی چند میلیاردی عملاً برای فروشنده انگیزه تاخیر ایجاد می‌کند تا از تورم سود ببرد.',
        legalDanger: 'دادگاه نمی‌تواند وجه التزام مقطوع تعیین‌شده را به استناد تورم افزایش دهد (ماده ۲۳۰ ق.م)؛ لذا خریدار متضرر اصلی تعلل فروشنده خواهد شد.',
        recommendedRevision: 'وجه التزام روزانه معادل ۱ در هزار کل ثمن معامله (روزانه ۵۰ میلیون ریال) تعیین می‌گردد به همراه جبران کلیه خسارات کاهش ارزش پول مستند به شاخص تورم بانک مرکزی.',
        relevantLegalArticle: 'ماده ۲۳۰ قانون مدنی و رای وحدت رویه شماره ۸۰۵ دیوان عالی کشور'
      },
      {
        clauseId: 'c5',
        title: 'عدم پیش‌بینی تضمین در صورت مستحق‌للغیر درآمدن مبیع',
        originalText: 'فروشنده ضمانت انتقال سند را بر عهده دارد.',
        riskLevel: 'high',
        issueDescription: 'اگر ملک متعلق به دیگری باشد (معامله فضولی) یا سند معارض داشته باشد، استرداد ثمن تنها به نرخ روز معامله صورت می‌گیرد مگر شرط خلاف شود.',
        legalDanger: 'بدون شرط غرامت به قیمت روز، خریدار تنها اصل پول واریزی سال‌ها قبل را بازپس می‌گیرد در حالی که قدرت خرید ملک از دست رفته است.',
        recommendedRevision: 'در صورت کشف فساد یا مستحق‌للغیر درآمدن کل یا بخشی از مبیع، فروشنده ملزم است علاوه بر رد اصل ثمن، غرامت خریدار را بر اساس قیمت روز ملک (طبق نظر کارشناس رسمی دادگستری) فوراً پرداخت نماید.',
        relevantLegalArticle: 'رأی وحدت رویه شماره ۸۱۱ هیات عمومی دیوان عالی کشور و ماده ۳۹۱ قانون مدنی'
      }
    ]
  },
  {
    id: 'audit-startup-nda',
    title: 'قرارداد هم‌بنیان‌گذاران و وستینگ سهام استارتاپ (Co-Founders & Vesting)',
    category: 'واگذاری سهام و استارتاپ',
    description: 'ممیزی مالکیت کدهای سورس‌کد، شروط عدم رقابت (Non-Compete) و خروج زودهنگام سهامدار کلیدی',
    overallSafetyScore: 71,
    sampleRawText: `ماده ۳ - سهام و تخصیص:
سهام شرکت بالمناصفه (۵۰-۵۰) بین طرفین تقسیم می‌گردد و از روز اول قطعی است.
ماده ۸ - شرط عدم رقابت:
هیچ‌یک از طرفین حق فعالیت در حوزه فناوری اطلاعات در کل کشور به مدت ۵ سال پس از خروج را ندارد.`,
    clauses: [
      {
        clauseId: 'c6',
        title: 'تخصیص قطعی بدون جدول وستینگ زمانی (ماده ۳)',
        originalText: 'سهام شرکت بالمناصفه (۵۰-۵۰) بین طرفین تقسیم می‌گردد و از روز اول قطعی است.',
        riskLevel: 'high',
        issueDescription: 'اگر یکی از بنیان‌گذاران پس از یک ماه کار را ترک کند، ۵۰ درصد سهام شرکت را برای همیشه برده و ادامه جذب سرمایه غیرممکن می‌شود.',
        legalDanger: 'قفل شدن ساختار سرمایه (Deadlock) و از دست رفتن کنترل استارتاپ.',
        recommendedRevision: 'سهام طی دوره وستینگ ۴ ساله با Cliff یک‌ساله آزاد گردد (۲۵٪ پس از سال اول و مابقی ماهانه). در صورت خروج زودتر، سهام وست‌نشده به ارزش اسمی بازخرید شود.',
        relevantLegalArticle: 'ماده ۱۰ قانون مدنی و مواد قانون تجارت در خصوص واگذاری سهام'
      },
      {
        clauseId: 'c7',
        title: 'شرط عدم رقابت نامحدود و غیرقابل اجرا (ماده ۸)',
        originalText: 'حق فعالیت در حوزه فناوری اطلاعات در کل کشور به مدت ۵ سال پس از خروج را ندارد.',
        riskLevel: 'medium',
        issueDescription: 'شرط عدم رقابت بسیار فراگیر در کل حوزه IT و به مدت طولانی عموماً توسط محاکم به دلیل تحدید نامشروع آزادی کار باطل اعلام می‌شود.',
        legalDanger: 'ابطال کل شرط یا رد دادخواست الزام به رعایت آن در دادگاه.',
        recommendedRevision: 'محدودیت صرفاً به کسب‌وکارهای رقیب مستقیم در همان نیچ بازار به مدت حداکثر ۱ سال و با پرداخت مابه‌ازای ماهانه تحدید رقابت تعدیل شود.',
        relevantLegalArticle: 'اصل ۲۸ قانون اساسی و مواد ۹۵۹ و ۹۶۰ قانون مدنی'
      }
    ]
  }
];

export const SUPREME_COURT_PRECEDENTS_DATA: import('../types/theme').SupremeCourtPrecedent[] = [
  {
    id: 'prec-811',
    number: 'رأی وحدت رویه شماره ۸۱۱',
    date: '۱۴۰۰/۰۴/۰۱',
    category: 'ملکی و ثبتی',
    title: 'جبران خسارت و غرامت خریدار با محاسبه بهای روز مبیع در صورت مستحق‌للغیر درآمدن',
    shortSummary: 'در صورت بطلان بیع به دلیل مستحق‌للغیر درآمدن مبیع، فروشنده مقصر ملزم به پرداخت غرامت معادل بهای روز مال (قیمت کارشناسی تورمی روز) به خریدار است.',
    fullRuling: `مستفاد از مواد ۳۹۰ و ۳۹۱ قانون مدنی، در موارد مستحق‌للغیر درآمدن مبیع و جهل خریدار به وجود فساد، فروشنده باید علاوه بر رد ثمن دریافتی، غرامات وارده به خریدار را جبران کند. چنانچه بهای مبیع بر اثر تورم افزایش یافته باشد، بایع ملزم به جبران کاهش قدرت خرید ثمن بر مبنای نرخ تورم اعلامی یا بهای روز ملک با نظر کارشناس رسمی دادگستری خواهد بود. این رأی طبق ماده ۴۷۱ قانون آیین دادرسی کیفری برای تمام دادگاه‌ها لازم‌الاتباع است.`,
    keyTakeaway: 'برای دعاوی بطلان معامله ملکی و فضولی، خریدار مغبون دیگر زیان تورمی نمی‌بیند و قیمت کارشناسی روز ملک را دریافت می‌دارد.',
    legalCitations: ['ماده ۳۹۰ و ۳۹۱ قانون مدنی', 'ماده ۴۷۱ قانون آیین دادرسی کیفری'],
    citationTemplate: 'مستنداً به رأی وحدت رویه شماره ۸۱۱ مورخ ۱۴۰۰/۰۴/۰۱ هیات عمومی دیوان عالی کشور، خوانده مکلف است علاوه بر رد اصل ثمن، بهای روز مبیع مستحق‌للغیر را طبق نظر هیأت کارشناسان رسمی تدارک فرماید.',
    isBinding: true
  },
  {
    id: 'prec-805',
    number: 'رأی وحدت رویه شماره ۸۰۵',
    date: '۱۳۹۹/۱۰/۱۶',
    category: 'حقوق بانکی و خسارت تاخیر',
    title: 'اعتبار توافق بر وجه التزام قراردادی بیش از نرخ تورم بانک مرکزی در تعهدات پولی',
    shortSummary: 'در صورتی که طرفین وجه التزامی مشخص برای تاخیر پرداخت پول تعیین کرده باشند، آن توافق ولو بیش از شاخص تورم سالانه باشد معتبر و نافذ است.',
    fullRuling: `تعیین وجه التزام قراردادی به منظور جبران خسارت تاخیر تادیه در تعهدات پولی، مشمول اطلاق ماده ۲۳۰ قانون مدنی بوده و دادگاه نمی‌تواند خوانده را به بیشتر یا کمتر از آن محکوم کند. محدودیت ماده ۵۲۲ قانون آیین دادرسی مدنی مربوط به مواردی است که وجه التزامی معین نشده باشد، لذا توافق بر وجه التزام قراردادی معتبر است.`,
    keyTakeaway: 'تعیین جریمه تاخیر روزانه در قراردادها (مثلا ۱٪ در ماه یا مبالغ مقطوع) قانونی است و ادعای ربوی بودن آن در تعهدات مدنی غیربانکی مسموع نیست.',
    legalCitations: ['ماده ۲۳۰ قانون مدنی', 'ماده ۵۲۲ قانون آیین دادرسی مدنی'],
    citationTemplate: 'وفق رأی وحدت رویه شماره ۸۰۵ مورخ ۱۳۹۹/۱۰/۱۶ دیوان عالی کشور و اطلاق ماده ۲۳۰ ق.م، توافق طرفین بر وجه التزام روزانه قطعی و غیرقابل تعدیل توسط دادگاه محترم می‌باشد.',
    isBinding: true
  },
  {
    id: 'prec-794',
    number: 'رأی وحدت رویه شماره ۷۹۴',
    date: '۱۳۹۹/۰۵/۲۱',
    category: 'حقوق بانکی و خسارت تاخیر',
    title: 'بطلان سود و جرایم بانکی مازاد بر نرخ مصوب شورای پول و اعتبار',
    shortSummary: 'بانک‌ها و موسسات مالی حق ندارند در قراردادهای تسهیلات، سودی بیش از سقف مصوب شورای پول و اعتبار درج و وصول نمایند؛ مبالغ مازاد باطل و قابل استرداد است.',
    fullRuling: `مقررات بانک مرکزی پیرامون حداقل و حداکثر سود تسهیلات جنبه آمره دارد و توافق برخلاف آن به استناد ماده ۱۰ قانون مدنی باطل است. بانک‌ها حق وصول مبالغی فراتر از نرخ‌های مصوب شورای پول و اعتبار را ندارند و دادگاه‌ها مکلف به ابطال شروط و تعدیل مبالغ اضافه می‌باشند.`,
    keyTakeaway: 'تسهیلات‌گیرندگان می‌توانند دادخواست ابطال سود مازاد بانکی و استرداد وجوه اضافی یا فک رهن وثایق ارائه دهند.',
    legalCitations: ['ماده ۱۰ قانون مدنی', 'بند ۴ ماده ۱۴ قانون پولی و بانکی کشور'],
    citationTemplate: 'به دلالت صریح رأی وحدت رویه شماره ۷۹۴ هیات عمومی دیوان عالی کشور، شرط دریافت سود بانکی فراتر از نرخ مصوب شورای پول و اعتبار باطل و کان‌لم‌یکن بوده و تعدیل دیون مورد استدعاست.',
    isBinding: true
  },
  {
    id: 'prec-823',
    number: 'رأی وحدت رویه شماره ۸۲۳',
    date: '۱۴۰۱/۰۴/۲۸',
    category: 'ملکی و ثبتی',
    title: 'بطلان معاملات معارض بعدی در صورت احراز انتقال مقدم با سند عادی دارای اعتبار',
    shortSummary: 'چنانچه ملکی با سند عادی معتبر به خریدار اول منتقل شده و سپس مالک رسمی آن را به دیگری انتقال دهد، معامله دوم فضولی و باطل است.',
    fullRuling: `با اثبات صحت وقوع عقد بیع مقدم با سند عادی و احراز مالکیت شرعی خریدار اول، فروشنده دیگر مالکیتی بر مبیع نداشته و هرگونه معامله بعدی وی راجع به همان ملک انتقال مال غیر محسوب شده و باطل خواهد بود.`,
    keyTakeaway: 'حمایت قضایی مستحکم از خریداران اولیه املاک در برابر مالکان سودجویی که ملک را چندباره می‌فروشند.',
    legalCitations: ['مواد ۳۶۲ و ۲۴۷ قانون مدنی', 'ماده ۱ قانون تشدید مجازات مرتکبین ارتشا و اختلاس و کلاهبرداری'],
    citationTemplate: 'مستنداً به رأی وحدت رویه ۸۲۳ دیوان عالی کشور، وقوع بیع شرعی مقدم محرز بوده و هرگونه معامله رسمی یا عادی مؤخر به لحاظ انتفای مالکیت بایع، محکوم به بطلان است.',
    isBinding: true
  }
];

export const PROPERTY_DUE_DILIGENCE_CHECKLIST: import('../types/theme').PropertyDueDiligenceCheck[] = [
  {
    id: 'chk-1',
    title: 'استعلام اصالت سند تک‌برگ کاداستری و هولوگرام امنیتی',
    category: 'اسناد مالکیت',
    description: 'بررسی شناسه یکتای ۱۸ رقمی کاداستر (جام) در سامانه ثبت من و بررسی صحت بارکد دوبعدی QR هولوگرام سند.',
    riskWeight: 10,
    howToCheck: 'مراجعه به سامانه my.ssaa.ir یا استعلام برخط از طریق دفاتر اسناد رسمی قبل از هرگونه تبادل وجه.',
    warningSigns: [
      'سند دست‌نویس منگوله‌دار قدیمی بدون تبدیل به تک‌برگ',
      'مغایرت کد پستی ملک در سند با نشانی و پلاک ثبتی شهرداری',
      'خط‌خوردگی در متن سند یا نامالوف بودن فونت در اسناد جدید'
    ],
    lawyerAdvice: 'به هیچ وجه قبل از دریافت تاییدیه سیستمی اصالت سند و تطابق شناسه جام، حتی ریالی به عنوان بیعانه پرداخت ننمایید.'
  },
  {
    id: 'chk-2',
    title: 'بررسی وضعیت بازداشت قضایی، توقیف ثبتی یا رهن بانک',
    category: 'محدودیت‌های ثبتی و بازداشت',
    description: 'اطمینان از اینکه پلاک ثبتی مورد معامله در توقیف محاکم دادگستری، مهریه، بدهی بانکی یا قرار تامین خواسته نباشد.',
    riskWeight: 10,
    howToCheck: 'اخذ گواهی سلامت پلاک ثبتی (نامه استعلام ثبتی) از دفترخانه اسناد رسمی.',
    warningSigns: [
      'فروشنده ادعا می‌کند سند در رهن است ولی تا فردا فک رهن می‌شود',
      'فروشنده از ارائه تصویر صفحه آخر سند (محل درج انتقالات و بازداشت‌ها) طفره می‌رود'
    ],
    lawyerAdvice: 'معامله ملک بازداشت‌شده باطل و در پاره‌ای موارد مصداق معامله به قصد فرار از دین و جرم است.'
  },
  {
    id: 'chk-3',
    title: 'بررسی صلاحیت و اهلیت فروشنده (وکالت‌نامه و انحصار وراثت)',
    category: 'طرفین معامله و اهلیت',
    description: 'در معاملات وکالتی: احراز بقای حیات موکل، بلاعزل بودن وکالت و صراحت متن وکالت‌نامه در حق فروش و اخذ ثمن.',
    riskWeight: 9,
    howToCheck: 'استعلام اصالت و اعتبار وکالت‌نامه از سامانه ثبت الکترونیک اسناد با استفاده از رمز تصدیق و شناسه سند.',
    warningSigns: [
      'وکالت‌نامه‌های قدیمی با تاریخ بیش از یک سال قبل',
      'عدم تصریح حق اخذ ثمن در وکالت‌نامه (فروشنده وکالتی پول را می‌گیرد اما موکل سند نمی‌زند)',
      'فروش ملک موروثی توسط یک وارث بدون برگه انحصار وراثت و امضای همه وراث'
    ],
    lawyerAdvice: 'در معاملات وکالتی حتماً با موکل اصلی تماس تصویری حاصل فرمایید یا ثمن را به حساب شخص اصیل واریز کنید.'
  },
  {
    id: 'chk-4',
    title: 'استعلام بدهی شهرداری، عوارض نوسازی و جریمه‌های کمیسیون ماده ۱۰۰',
    category: 'تعهدات شهرداری و اوقاف',
    description: 'بررسی وجود تخلفات ساختمانی مانند اضافه بنا، حذف پارکینگ، تبدیل پیلوت یا پرونده مفتوح در کمیسیون ماده ۱۰۰ شهرداری.',
    riskWeight: 8,
    howToCheck: 'مراجعه به دفاتر خدمات الکترونیک شهر و استعلام پایان‌کار با کد شناسایی ملک (شهرسازی).',
    warningSigns: [
      'ملک فاقد پایان‌کار معتبر بوده و پایان‌کار تفکیکی دریافت نکرده است',
      'پارکینگ مورد ادعا در سند رسمی نیامده و در عمل مزاحم است',
      'بنا دارای رای تخریب و قلع در کمیسیون ماده صد شهرداری است'
    ],
    lawyerAdvice: 'بدون پایان‌کار قطعی، انتقال رسمی سند غیرممکن بوده و خریدار تا سال‌ها درگیر راهروهای شهرداری خواهد شد.'
  },
  {
    id: 'chk-5',
    title: 'استعلام اوقافی بودن، اراضی ملی (ماده ۵۶) و کمیسیون ماده ۱۲',
    category: 'تعهدات شهرداری و اوقاف',
    description: 'بررسی اینکه آیا عرصه ملک متعلق به اوقاف است (پرداخت اجاره‌بها و اخذ موافقت اداره اوقاف) یا در حریم منابع طبیعی واقع شده است.',
    riskWeight: 8,
    howToCheck: 'بررسی نوع مالکیت در سند (شخصی / وقفی / بنیادی) و استعلام از سازمان اوقاف یا منابع طبیعی.',
    warningSigns: [
      'قیمت ملک به طرز مشکوکی ۳۰٪ زیر قیمت عرف منطقه است',
      'فروشنده تنها سند اعیان را داراست و از سرنوشت عرصه طفره می‌رود'
    ],
    lawyerAdvice: 'خرید املاک وقفی بدون اذن اداره اوقاف فاقد وجاهت بوده و انتقال سند منوط به پرداخت پذیره سنگین خواهد بود.'
  }
];

// ==========================================
// Phase 8 Data: Corporate Governance, Incoterms 2020 & International Arbitration
// ==========================================

export const CORPORATE_DECISIONS_DATA: import('../types/theme').CorporateDecisionQuorum[] = [
  {
    id: 'corp-financial-statements',
    title: 'تصویب ترازنامه و حساب سود و زیان سال مالی و تقسیم سود',
    assemblyType: 'مجمع عمومی عادی',
    firstCallQuorum: 'حضور دارندگان بیش از ۵۰٪ سهام دارای حق رأی (ماده ۸۴ ق.ت)',
    secondCallQuorum: 'حضور هر عده از صاحبان سهام دارای حق رأی (ماده ۸۵ ق.ت)',
    decisionMajority: 'اکثریت نصف به علاوه یک آراء حاضر در جلسه رسمی (ماده ۸۸ ق.ت)',
    statutoryArticle: 'مواد ۸۴، ۸۵، ۸۸ و ۸۹ لایحه اصلاحی قانون تجارت مصوب ۱۳۴۷',
    requiredDocuments: [
      'گزارش مکتوب هیئت‌مدیره به مجمع',
      'گزارش بازرس قانونی و حسابرس رسمی',
      'ترازنامه مالی و صورت‌های مالی حسابرسی‌شده',
      'برگه آگهی دعوت منتشره در روزنامه کثیرالانتشار شرکت'
    ],
    registrationDeadlineDays: 120, // ظرف ۴ ماه پس از پایان سال مالی
    lawyerTips: 'تقسیم سود بدون تصویب صورت‌های مالی و بدون کسر اندوخته قانونی (یک‌بیستم تا رسیدن به یک‌دهم سرمایه) باطل و در حکم منافع موهوم مشمول مسئولیت کیفری ماده ۲۵۸ است.'
  },
  {
    id: 'corp-elect-directors-inspectors',
    title: 'انتخاب اعضای هیئت‌مدیره، بازرس اصلی و بازرس علی‌البدل',
    assemblyType: 'مجمع عمومی عادی',
    firstCallQuorum: 'دارندگان بیش از نصف سهام دارای حق رأی (ماده ۸۴ ق.ت)',
    secondCallQuorum: 'هر تعداد از صاحبان سهام دارای حق رأی (ماده ۸۵ ق.ت)',
    decisionMajority: 'اکثریت نسبی آراء با رعایت روش رأی‌گیری جمعی (ماده ۸۸ ق.ت)',
    statutoryArticle: 'مواد ۸۸، ۱۰۷ الی ۱۱۵ و ماده ۱۴۴ لایحه اصلاحی قانون تجارت',
    requiredDocuments: [
      'قبولی کتبی سمت توسط کلیه مدیران و بازرسان منتخب',
      'گواهی عدم سوءپیشینه کیفری اعضای هیئت‌مدیره و مدیرعامل',
      'اقرارنامه عدم مشمولیت اصل ۱۴۱ قانون اساسی و قانون ممنوعیت تصدی بیش از یک شغل'
    ],
    registrationDeadlineDays: 30,
    lawyerTips: 'مدت تصدی مدیران حداکثر ۲ سال و بازرسان ۱ سال است. در صورت انقضای مدت، تا زمان انتخاب و ثبت مدیران جدید، مدیران قبلی مسئولیت قانونی اداره شرکت را دارند.'
  },
  {
    id: 'corp-capital-increase-decrease',
    title: 'افزایش یا کاهش اختیاری/اجباری سرمایه شرکت (ماده ۱۴۱)',
    assemblyType: 'مجمع عمومی فوق‌العاده',
    firstCallQuorum: 'دارندگان بیش از نصف سهام دارای حق رأی (ماده ۸۴ ق.ت)',
    secondCallQuorum: 'دارندگان بیش از یک‌سوم سهام دارای حق رأی (ماده ۸۴ ق.ت)',
    decisionMajority: 'اکثریت دو‌سوم آراء حاضر در جلسه رسمی (ماده ۸۴ ق.ت)',
    statutoryArticle: 'مواد ۸۳، ۸۴، ۱۵۷ الی ۱۸۸ و ماده ۱۴۱ لایحه اصلاحی قانون تجارت',
    requiredDocuments: [
      'گزارش هیئت‌مدیره متضمن لزوم و توجیه افزایش یا کاهش سرمایه',
      'گزارش ویژه بازرس قانونی شرکت درباره محاسبات افزایش سرمایه',
      'صورتجلسه مجمع و گواهی بانکی واریز نقدی یا گزارش کارشناس رسمی دادگستری برای مطالبات حال‌شده'
    ],
    registrationDeadlineDays: 30,
    lawyerTips: 'در صورت زیان انباشته فراتر از نصف سرمایه (ماده ۱۴۱)، هیئت‌مدیره مکلف است بلافاصله مجمع فوق‌العاده تشکیل دهد؛ در غیر این صورت هر ذینفع می‌تواند انحلال شرکت را از دادگاه بخواهد.'
  },
  {
    id: 'corp-articles-amendment',
    title: 'تغییر در مواد اساسنامه، نام، موضوع فعالیت یا مرکز اصلی شرکت',
    assemblyType: 'مجمع عمومی فوق‌العاده',
    firstCallQuorum: 'دارندگان بیش از نصف سهام دارای حق رأی (ماده ۸۴ ق.ت)',
    secondCallQuorum: 'دارندگان بیش از یک‌سوم سهام دارای حق رأی (ماده ۸۴ ق.ت)',
    decisionMajority: 'اکثریت دو‌سوم آراء حاضر در جلسه رسمی (ماده ۸۴ ق.ت)',
    statutoryArticle: 'مواد ۸۳ و ۸۴ لایحه اصلاحی قانون تجارت',
    requiredDocuments: [
      'اساسنامه فعلی و ماده اصلاحی پیشنهادی',
      'مجوز از مراجع ذی‌صلاح در صورت لزوم (مجوزهای صنفی، بورس یا حاکمیتی)',
      'صورتجلسه امضاشده توسط هیئت‌رئیسه مجمع'
    ],
    registrationDeadlineDays: 15,
    lawyerTips: 'تغییر تابعیت شرکت یا تحمیل هرگونه تعهد اضافی بر سهامداران در صلاحیت هیچ مجمعی حتی با رأی اکثریت نبوده و نیازمند رضایت ۱۰۰٪ کل سهامداران است (ماده ۹۴).'
  },
  {
    id: 'corp-dissolution-liquidation',
    title: 'انحلال اختیاری شرکت و تعیین مدیر یا مدیران تصفیه',
    assemblyType: 'مجمع عمومی فوق‌العاده',
    firstCallQuorum: 'دارندگان بیش از نصف سهام دارای حق رأی (ماده ۸۴ ق.ت)',
    secondCallQuorum: 'دارندگان بیش از یک‌سوم سهام دارای حق رأی (ماده ۸۴ ق.ت)',
    decisionMajority: 'اکثریت دو‌سوم آراء حاضر در جلسه رسمی (ماده ۸۴ ق.ت)',
    statutoryArticle: 'مواد ۸۳، ۱۹۹ الی ۲۲۹ لایحه اصلاحی قانون تجارت',
    requiredDocuments: [
      'صورتجلسه اعلام انحلال و انتخاب مدیران تصفیه و نشانی محل تصفیه',
      'قبولی کتبی سمت توسط مدیران تصفیه و ناظر تصفیه',
      'انتشار آگهی در روزنامه رسمی و کثیرالانتشار طی ۳ نوبت'
    ],
    registrationDeadlineDays: 5,
    lawyerTips: 'به محض انحلال، شخصیت حقوقی شرکت صرفاً جهت امر تصفیه و وصول مطالبات و تأدیه دیون تا زمان ختم قطعی تصفیه باقی می‌ماند و کلمه «در حال تصفیه» باید قید گردد.'
  }
];

export const INCOTERMS_RULES_DATA: import('../types/theme').IncotermsRule[] = [
  {
    code: 'EXW',
    nameEn: 'Ex Works (insert named place of delivery)',
    nameFa: 'تحویل در محل کارخانه فروشنده',
    transportType: 'any',
    category: 'E-Term',
    sellerRiskUntil: 'قراردادن کالا در کارخانه یا انبار فروشنده در اختیار خریدار (بدون بارگیری روی وسیله نقلیه)',
    buyerRiskFrom: 'از لحظه در اختیار قرار گرفتن کالا در انبار فروشنده تا مقصد نهایی',
    freightPayer: 'خریدار',
    insuranceResponsible: 'خریدار',
    exportCustoms: 'خریدار',
    importCustoms: 'خریدار',
    riskScore: 10,
    practicalAdvice: 'بیشترین ریسک و تعهد بر دوش خریدار است. برای خریداران خارجی که مجوز صادرات در کشور مبدأ ندارند یا امکان بارگیری ایمن ندارند به‌هیچ‌وجه توصیه نمی‌شود.',
    cisgCompatibilityNote: 'منطبق بر بند الف ماده ۳۱ کنوانسیون وین ۱۹۸۰ (تحویل در محل کار فروشنده).'
  },
  {
    code: 'FCA',
    nameEn: 'Free Carrier (insert named place of delivery)',
    nameFa: 'تحویل به حمل‌کننده در مبدأ معین',
    transportType: 'any',
    category: 'F-Term',
    sellerRiskUntil: 'بارگیری کالا روی وسیله نقلیه خریدار یا تحویل در پایانه مورد توافق با ترخیص صادراتی',
    buyerRiskFrom: 'از لحظه تحویل به متصدی حمل معرفی‌شده توسط خریدار',
    freightPayer: 'خریدار',
    insuranceResponsible: 'خریدار',
    exportCustoms: 'فروشنده',
    importCustoms: 'خریدار',
    riskScore: 7,
    practicalAdvice: 'انعطاف‌پذیرترین و مدرن‌ترین قاعده برای حمل کانتینری و ترکیبی. فروشنده موظف به ترخیص صادراتی است و امکان صدور بارنامه دریایی با درج کلمه On Board فراهم است.',
    cisgCompatibilityNote: 'تطابق کامل با تعهد تسلیم به اولین حمل‌کننده موضوع ماده ۳۱ کنوانسیون بیع بین‌المللی.'
  },
  {
    code: 'CPT',
    nameEn: 'Carriage Paid To (insert named place of destination)',
    nameFa: 'کرایه حمل پرداخت‌شده تا مقصد معین',
    transportType: 'any',
    category: 'C-Term',
    sellerRiskUntil: 'تحویل کالا به نخستین متصدی حمل در کشور مبدأ (انتقال ریسک زودتر از انتقال هزینه)',
    buyerRiskFrom: 'از زمان تحویل کالا به اولین شرکت حمل‌ونقل',
    freightPayer: 'فروشنده',
    insuranceResponsible: 'اختیاری طرفین',
    exportCustoms: 'فروشنده',
    importCustoms: 'خریدار',
    riskScore: 6,
    practicalAdvice: 'توجه مهم به دوگانگی نقطه ریسک و نقطه هزینه: هزینه حمل تا مقصد با فروشنده است اما ریسک خسارت یا تلف کالا در حین راه کاملاً با خریدار است.',
    cisgCompatibilityNote: 'نیازمند تفکیک صریح نقطه تفویض کالا به متصدی مطابق ماده ۶۷ کنوانسیون وین.'
  },
  {
    code: 'CIP',
    nameEn: 'Carriage and Insurance Paid To',
    nameFa: 'کرایه حمل و بیمه پرداخت‌شده تا مقصد معین',
    transportType: 'any',
    category: 'C-Term',
    sellerRiskUntil: 'تحویل به متصدی حمل در مبدأ؛ ولی فروشنده ملزم به خرید بیمه حداکثری کلوز A است',
    buyerRiskFrom: 'از لحظه تحویل کالا به اولین حامل',
    freightPayer: 'فروشنده',
    insuranceResponsible: 'فروشنده (پوشش حداکثری A)',
    exportCustoms: 'فروشنده',
    importCustoms: 'خریدار',
    riskScore: 4,
    practicalAdvice: 'در اینکوترمز ۲۰۲۰، فروشنده در قاعده CIP ملزم به تهیه بیمه کلینیک انستیتو لندن با کلوز A (جامع‌ترین پوشش All Risks حداقل ۱۱۰٪ بهای قرارداد) می‌باشد.',
    cisgCompatibilityNote: 'مطابق استانداردهای حقوق بین‌الملل بازرگانی جهت انتقال منافع بیمه‌نامه به خریدار.'
  },
  {
    code: 'DAP',
    nameEn: 'Delivered at Place (insert named place of destination)',
    nameFa: 'تحویل در محل مقصد معین (آماده تخلیه)',
    transportType: 'any',
    category: 'D-Term',
    sellerRiskUntil: 'رسیدن کالا در محل مقصد روی وسیله نقلیه ورودی و آماده برای تخلیه بدون ترخیص وارداتی',
    buyerRiskFrom: 'هنگام آمادگی کالا برای تخلیه در مقصد مشخص‌شده',
    freightPayer: 'فروشنده',
    insuranceResponsible: 'اختیاری طرفین',
    exportCustoms: 'فروشنده',
    importCustoms: 'خریدار',
    riskScore: 2,
    practicalAdvice: 'بسیار ایده‌آل برای خریدار. فروشنده ریسک حمل تا مقصد نهایی را تقبل می‌کند ولی ترخیص گمرکی واردات و پرداخت حقوق و عوارض گمرکی با خریدار است.',
    cisgCompatibilityNote: 'تحویل کامل کالا در مقصد مشمول ضمانت سلامت کالا تا زمان تسلیم نهایی.'
  },
  {
    code: 'DPU',
    nameEn: 'Delivered at Place Unloaded',
    nameFa: 'تحویل در محل مقصد پس از تخلیه کامل بار',
    transportType: 'any',
    category: 'D-Term',
    sellerRiskUntil: 'تخلیه کامل فیزیکی کالا از وسیله حمل در پایانه یا انبار مقصد',
    buyerRiskFrom: 'پس از اتمام تخلیه کامل کالا در مقصد',
    freightPayer: 'فروشنده',
    insuranceResponsible: 'اختیاری طرفین',
    exportCustoms: 'فروشنده',
    importCustoms: 'خریدار',
    riskScore: 2,
    practicalAdvice: 'تنها قاعده‌ای از اینکوترمز که فروشنده را قانوناً ملزم به تقبل عملیات و هزینه‌های تخلیه فیزیکی بار در مقصد می‌کند (جایگزین قاعده سابق DAT در ۲۰۱۰).',
    cisgCompatibilityNote: 'مسئولیت فروشنده تا پایان فرآیند مکانیکی تخلیه کالا ادامه دارد.'
  },
  {
    code: 'DDP',
    nameEn: 'Delivered Duty Paid (insert named place of destination)',
    nameFa: 'تحویل در مقصد با پرداخت حقوق و عوارض گمرکی',
    transportType: 'any',
    category: 'D-Term',
    sellerRiskUntil: 'تحویل کالا در مقصد پس از ترخیص کامل گمرکی واردات و پرداخت تمام حقوق و عوارض',
    buyerRiskFrom: 'پس از آماده شدن کالا برای تخلیه در مقصد ترخیص‌شده',
    freightPayer: 'فروشنده',
    insuranceResponsible: 'فروشنده',
    exportCustoms: 'فروشنده',
    importCustoms: 'فروشنده',
    riskScore: 1,
    practicalAdvice: 'حداکثر تعهد برای فروشنده و حداقل ریسک برای خریدار. فروشنده باید بتواند در کشور خریدار پروانه ورود گمرکی، ثبت سفارش و پرداخت مالیات بر ارزش افزوده را انجام دهد.',
    cisgCompatibilityNote: 'شامل کلیه تکالیف قراردادی تسلیم مبیع پاک از هرگونه حقوق گمرکی و بازداشتی.'
  },
  {
    code: 'FOB',
    nameEn: 'Free on Board (insert named port of shipment)',
    nameFa: 'تحویل روی عرشه کشتی در بندر بارگیری',
    transportType: 'sea_only',
    category: 'F-Term',
    sellerRiskUntil: 'قرار گرفتن کالا روی عرشه کشتی معرفی‌شده توسط خریدار در بندر مبدأ',
    buyerRiskFrom: 'از لحظه استقرار کامل کالا روی عرشه کشتی',
    freightPayer: 'خریدار',
    insuranceResponsible: 'خریدار',
    exportCustoms: 'فروشنده',
    importCustoms: 'خریدار',
    riskScore: 6,
    practicalAdvice: 'صرفاً برای حمل دریایی سنتی و فله (Bulk). در صورت حمل کانتینری مدرن، اتاق بازرگانی توصیه اکید به جایگزینی با FCA دارد زیرا فروشنده کنترلی بر زمان بارگیری روی عرشه ندارد.',
    cisgCompatibilityNote: 'انتقال ریسک مطابق رویه کلاسیک تجارت دریایی هنگام عبور کالا از نرده/عرشه کشتی.'
  },
  {
    code: 'CIF',
    nameEn: 'Cost, Insurance and Freight (insert named port of destination)',
    nameFa: 'بهای کالا، بیمه و کرایه حمل تا بندر مقصد',
    transportType: 'sea_only',
    category: 'C-Term',
    sellerRiskUntil: 'روی عرشه کشتی در بندر مبدأ؛ اما فروشنده بیمه حداقلی کلوز C و کرایه دریایی را می‌پردازد',
    buyerRiskFrom: 'از زمان قرار گرفتن روی عرشه کشتی در بندر مبدأ',
    freightPayer: 'فروشنده',
    insuranceResponsible: 'فروشنده (پوشش حداقلی C)',
    exportCustoms: 'فروشنده',
    importCustoms: 'خریدار',
    riskScore: 4,
    practicalAdvice: 'رایج‌ترین قاعده در بیع دریایی نفت، غلات و مواد معدنی. فروشنده موظف به تهیه بیمه با پوشش حداقل کلوز C است مگر طرفین توافق دیگری در قرارداد نمایند.',
    cisgCompatibilityNote: 'اصل معامله اسنادی؛ خریدار بر اساس اسناد حمل تمیز (Clean B/L) وجه را کارسازی می‌نماید.'
  },
  {
    code: 'CFR',
    nameEn: 'Cost and Freight (insert named port of destination)',
    nameFa: 'بهای کالا و کرایه حمل دریایی تا بندر مقصد',
    transportType: 'sea_only',
    category: 'C-Term',
    sellerRiskUntil: 'روی عرشه کشتی در بندر مبدأ بارگیری (بدون تعهد بیمه)',
    buyerRiskFrom: 'از لحظه بارگیری روی عرشه کشتی در بندر مبدأ',
    freightPayer: 'فروشنده',
    insuranceResponsible: 'خریدار',
    exportCustoms: 'فروشنده',
    importCustoms: 'خریدار',
    riskScore: 5,
    practicalAdvice: 'فروشنده کرایه حمل دریایی را تا بندر مقصد می‌پردازد اما هیچ تکلیفی نسبت به انعقاد بیمه‌نامه ندارد. خریدار باید فوراً بر اساس مشخصات ارسالی فروشنده، بیمه دریایی اتخاذ کند.',
    cisgCompatibilityNote: 'الزام فروشنده به اطلاع‌رسانی فوری مشخصات کشتی به خریدار جهت بیمه (ماده ۳۲ CISG).'
  }
];

export const ARBITRATION_INSTITUTIONS_DATA: import('../types/theme').ArbitrationInstitution[] = [
  {
    id: 'icc-paris',
    nameFa: 'دیوان بین‌المللی داوری اتاق بازرگانی بین‌المللی (ICC)',
    nameEn: 'International Court of Arbitration (ICC - Paris)',
    headquarters: 'پاریس، فرانسه',
    governingRules: 'مقررات داوری ICC مصوب ۲۰۲۱ (شامل دادرسی فوری و داوری اضطراری)',
    applicableLawRecommendation: 'قوانین بازرگانی فراملی (Lex Mercatoria) یا قانون سوئیس / انگلستان',
    languageRecommendation: 'انگلیسی یا فرانسوی',
    standardClauseEn: 'All disputes arising out of or in connection with the present contract shall be finally settled under the Rules of Arbitration of the International Chamber of Commerce by one or more arbitrators appointed in accordance with the said Rules.',
    standardClauseFa: 'کلیه اختلافات ناشی از این قرارداد یا مرتبط با آن طبق مقررات داوری اتاق بازرگانی بین‌المللی (ICC) توسط یک یا چند داور منتخب بر اساس مقررات مذکور به‌طور قطعی حل‌وفصل خواهد شد.',
    avgDurationMonths: 14,
    newYorkConventionEnforceable: true,
    adminFeeFormulaDescription: 'بر اساس جدول پلکانی هزینه‌های اداری ICC و تعداد داوران متناسب با مبلغ خواسته',
    expertTips: 'بررسی پیش‌نویس رأی (Scrutiny of Draft Award) توسط دیوان ICC قبل از امضا، احتمال نقض و ابطال رأی در دادگاه‌های ملی را به نزدیک صفر می‌رساند.'
  },
  {
    id: 'acic-tehran',
    nameFa: 'مرکز داوری اتاق بازرگانی، صنایع، معادن و کشاورزی ایران (ACIC)',
    nameEn: 'Arbitration Center of Iran Chamber (ACIC)',
    headquarters: 'تهران، ایران',
    governingRules: 'قانون اساسنامه مرکز داوری اتاق ایران مصوب ۱۳۸۰ و آیین داوری داخلی و بین‌المللی',
    applicableLawRecommendation: 'قانون تجارت و قانون مدنی ایران یا اصول یونیدروآ (UNIDROIT)',
    languageRecommendation: 'فارسی یا انگلیسی',
    standardClauseEn: 'Any dispute, controversy or claim arising out of or relating to this contract shall be referred to and finally resolved by the Arbitration Center of the Iran Chamber (ACIC) in accordance with its Rules of Arbitration.',
    standardClauseFa: 'کلیه اختلافات و دعاوی ناشی از این قرارداد یا راجع به آن از جمله انعقاد، اعتبار، فسخ، نقض یا تفسیر آن به مرکز داوری اتاق بازرگانی ایران ارجاع و طبق آیین داوری آن قطعی و لازم‌الاجرا خواهد بود.',
    avgDurationMonths: 8,
    newYorkConventionEnforceable: true,
    adminFeeFormulaDescription: 'تعرفه مصوب هیئت‌مدیره مرکز داوری اتاق ایران (بسیار مقرون‌به‌صرفه نسبت به مراجع خارجی)',
    expertTips: 'بهترین و امن‌ترین گزینه برای شرکت‌های ایرانی در معاملات با طرف‌های خارجی در منطقه خاورمیانه، چین، روسیه و ترکیه بدون ریسک تحریمی انتقال ارز.'
  },
  {
    id: 'uncitral-adhoc',
    nameFa: 'داوری موردی (Ad-Hoc) تحت قواعد آنسیترال (UNCITRAL)',
    nameEn: 'UNCITRAL Arbitration Rules (2021 Revision)',
    headquarters: 'توافقی بین طرفین (مثلاً لاهه، ژنو یا مسقط)',
    governingRules: 'قواعد داوری کمیسیون حقوق تجارت بین‌الملل سازمان ملل متحد',
    applicableLawRecommendation: 'قانون مدنی ایران (برای طرف ایرانی) یا قانون بی‌طرف',
    languageRecommendation: 'انگلیسی',
    standardClauseEn: 'Any dispute, controversy or claim arising out of or relating to this contract, or the breach, termination or invalidity thereof, shall be settled by arbitration in accordance with the UNCITRAL Arbitration Rules.',
    standardClauseFa: 'هرگونه اختلاف، مناقشه یا ادعای ناشی از این قرارداد یا نقض، فسخ یا بطلان آن، بر اساس قواعد داوری آنسیترال از طریق داوری حل‌وفصل خواهد شد.',
    avgDurationMonths: 18,
    newYorkConventionEnforceable: true,
    adminFeeFormulaDescription: 'فاقد هزینه ثبت به دیوان؛ صرفاً پرداخت حق‌الزحمه ساعت‌محور به هیئت داوران سه‌نفره',
    expertTips: 'تعیین صریح «مقام ناصب» (Appointing Authority) نظیر دبیرکل دیوان دائمی داوری لاهه (PCA) برای جلوگیری از بن‌بست در انتخاب سرداور حیاتی است.'
  }
];

// ==========================================
// Phase 9 Mock Data: IP Registry, Startups & Software Licensing
// ==========================================

export const NICE_CLASSIFICATION_DATA: NiceClassificationClass[] = [
  {
    classNumber: 9,
    titleFa: 'طبقه ۹: نرم‌افزارها، اپلیکیشن‌ها و تجهیزات هوش مصنوعی',
    titleEn: 'Class 9: Software, Mobile Apps & AI Systems',
    category: 'goods',
    description: 'نرم‌افزارهای رایانه‌ای ضبط‌شده یا قابل دانلود، پلتفرم‌های ابری، تجهیزات پردازش داده و توکن‌های دیجیتال.',
    popularKeywords: ['نرم‌افزار موبایل', 'هوش مصنوعی', 'بلاکچین', 'الگوریتم', 'پایگاه داده'],
    riskFactor: 'پرتقاضا و پرتعارض'
  },
  {
    classNumber: 35,
    titleFa: 'طبقه ۳۵: تبلیغات، مدیریت کسب‌وکار و مارکتینگ دیجیتال',
    titleEn: 'Class 35: Advertising, Business Management & E-Commerce',
    category: 'services',
    description: 'خدمات بازاریابی آنلاین، مدیریت استارتاپ‌ها، صادرات و واردات و سامانه‌های خرده‌فروشی آنلاین.',
    popularKeywords: ['فروشگاه اینترنتی', 'دیجیتال مارکتینگ', 'مشاوره تجاری', 'مدیریت زنجیره تامین'],
    riskFactor: 'پرتقاضا و پرتعارض'
  },
  {
    classNumber: 42,
    titleFa: 'طبقه ۴۲: خدمات علمی، فناوری، طراحی نرم‌افزار و رایانش ابری (SaaS)',
    titleEn: 'Class 42: Scientific & Tech Services, Software Dev & SaaS',
    category: 'services',
    description: 'طراحی، توسعه و پشتیبانی نرم‌افزار، میزبانی ابری وب، مشاوره امنیت سایبری و هوش مصنوعی.',
    popularKeywords: ['توسعه SaaS', 'امنیت داده', 'معماری کلود', 'تست نفوذ', 'طراحی UI/UX'],
    riskFactor: 'پرتقاضا و پرتعارض'
  },
  {
    classNumber: 36,
    titleFa: 'طبقه ۳۶: خدمات مالی، فین‌تک، رمزارزها و امور بیمه',
    titleEn: 'Class 36: Financial Services, FinTech & Insurance',
    category: 'services',
    description: 'خدمات پرداخت آنلاین، صرافی‌های دیجیتال، سبدگردانی، شتاب‌دهنده‌های سرمایه‌گذاری و رمزارزها.',
    popularKeywords: ['درگاه پرداخت', 'کیف پول دیجیتال', 'صرافی کریپتو', 'تامین مالی جمعی'],
    riskFactor: 'نیازمند مجوز خاص'
  },
  {
    classNumber: 38,
    titleFa: 'طبقه ۳۸: مخابرات، پیام‌رسان‌ها و ارتباطات شبکه',
    titleEn: 'Class 38: Telecommunications & Streaming Platforms',
    category: 'services',
    description: 'ارائه دسترسی به شبکه‌های مخابراتی، پیام‌رسان‌های متنی و صوتی، پلتفرم‌های استریم و انتقال صوت و تصویر.',
    popularKeywords: ['پیام‌رسان', 'ویدیو کنفرانس', 'پخش زنده', 'ارتباط ماهواره‌ای'],
    riskFactor: 'نیازمند مجوز خاص'
  },
  {
    classNumber: 5,
    titleFa: 'طبقه ۵: فرآورده‌های دارویی، پزشکی و مکمل‌های زیستی',
    titleEn: 'Class 5: Pharmaceuticals & Medical Preparations',
    category: 'goods',
    description: 'داروها، فرآورده‌های بیوتکنولوژی، واکسن‌ها و مکمل‌های غذایی دارویی تحت نظارت سازمان غذا و دارو.',
    popularKeywords: ['دارو', 'نانودارو', 'مکمل دارویی', 'کیت تشخیص'],
    riskFactor: 'نیازمند مجوز خاص'
  }
];

export const MOCK_IP_ASSETS_DATA: IPAssetEvaluation[] = [
  {
    id: 'ip-1',
    title: 'برند و لوگوی تجاری سامانه هوشمند دادمان',
    assetType: 'علامت تجاری (برند)',
    registrationTerritory: 'ایران (اداره مالکیت صنعتی)',
    niceClasses: [9, 35, 42],
    status: 'ثبت قطعی و صدور تصدیق ۱۰ ساله',
    expirationDate: '۱۴۱۱/۰۴/۱۵',
    infringementRiskScore: 18,
    defenseStrategy: 'پایش دوره‌ای روزنامه‌های رسمی جهت ثبت اعتراض ۳۰ روزه به علائم مشابه و اخطار عدم نقض (Cease & Desist).'
  },
  {
    id: 'ip-2',
    title: 'موتور استنتاج هوش مصنوعی تطبیق دادخواست‌ها با آرای وحدت رویه',
    assetType: 'حق مؤلف و نرم‌افزار (Copyright)',
    registrationTerritory: 'ایران (اداره مالکیت صنعتی)',
    niceClasses: [9, 42],
    status: 'ثبت قطعی و صدور تصدیق ۱۰ ساله',
    expirationDate: '۱۴۳۲/۰۸/۲۰',
    infringementRiskScore: 32,
    defenseStrategy: 'ثبت گواهی تاییدیه فنی در سازمان نظام صنفی رایانه‌ای و تودیع سورس‌کد در بنیاد ملی بازی‌ها و رسانه‌های دیجیتال.'
  },
  {
    id: 'ip-3',
    title: 'علامت تجاری بین‌المللی SedRazavi Legal Hub',
    assetType: 'علامت تجاری (برند)',
    registrationTerritory: 'بین‌المللی (سیستم مادرید WIPO)',
    niceClasses: [35, 42],
    status: 'دوران اعتراض ۳۰ روزه',
    expirationDate: '۲۰۳۴/۱۲/۱۰',
    infringementRiskScore: 24,
    defenseStrategy: 'پیگیری از طریق دفتر بین‌المللی ژنو (WIPO) و ثبت همزمان در حوزه کشورهای شورای همکاری خلیج فارس (GCC).'
  }
];

export const MOCK_STARTUP_VESTING_DATA: StartupVestingSchedule = {
  founderName: 'دکتر محمدرضا کیانی / مهندس علیرضا راد',
  role: 'هم‌بنیان‌گذار ارشد و مدیر ارشد فناوری (CTO)',
  equityPercentage: 35.0,
  totalShares: 350000,
  vestingPeriodYears: 4,
  cliffPeriodMonths: 12,
  accelerationClause: 'دو‌مرحله‌ای (Double Trigger)',
  ipAssignmentSigned: true,
  nonCompetePeriodMonths: 24
};

export const SOFTWARE_LICENSING_MODELS: SoftwareLicenseModel[] = [
  {
    id: 'saas-cloud',
    nameFa: 'قرارداد خدمات ابری و نرم‌افزار به‌مثابه خدمت (SaaS Agreement)',
    nameEn: 'Software-as-a-Service (SaaS) Subscription Agreement',
    category: 'SaaS Cloud',
    slaUptimeGuarantee: 'تضمین پایداری ۹۹.۹٪ (Tier-3 Datacenter) به همراه جریمه Service Credits در صورت قطعی',
    dataSovereignty: 'مالکیت ۱۰۰٪ انحصاری داده‌های مشتری به همراه رمزنگاری کلید خصوصی AES-256 و ذخیره‌سازی ابری محلی',
    ipWarrantyAndIndemnification: 'تضمین مصونیت قضایی مشتری در برابر هرگونه ادعای نقض پتنت یا کپی‌رایت طرف ثالث توسط توسعه‌دهنده',
    auditRights: 'ارائه گزارش‌های دوره‌ای سالانه انطباق ISO/IEC 27001 و SOC-2 بدون دسترسی مستقیم به سورس‌کد',
    terminationExitStrategy: 'مهلت ۳۰ روزه انتقال بک‌آپ کامل پایگاه‌داده با فرمت استاندارد JSON/SQL و امحای امن نسخه‌ها'
  },
  {
    id: 'enterprise-onprem',
    nameFa: 'لایسنس نرم‌افزار درون‌سازمانی با امانت‌گذاری سورس‌کد (Software Escrow)',
    nameEn: 'Enterprise On-Premise License with Source Code Escrow',
    category: 'On-Premise Enterprise',
    slaUptimeGuarantee: 'پشتیبانی فنی سطح ۲ و ۳ با زمان پاسخگویی حداکثر ۴ ساعته برای خطاهای بحرانی (Sev-1)',
    dataSovereignty: 'میزبانی کامل روی سرورهای فیزیکی کارفرما بدون هیچ‌گونه خروج ترافیک یا تلمتری به خارج سازمان',
    ipWarrantyAndIndemnification: 'جبران کامل خسارات دادرسی و وکلای مدافع در صورت اثبات نقض حقوق معنوی',
    auditRights: 'امکان بازرسی فیزیکی سالانه نرم‌افزار جهت راستی‌آزمایی تعداد مجاز صندلی‌های فعال (User Seats)',
    terminationExitStrategy: 'آزادسازی سورس‌کد تودیع‌شده در امانت‌داری (Escrow Agent) صرفاً در صورت ورشکستگی یا انحلال تامین‌کننده'
  },
  {
    id: 'white-label-oem',
    nameFa: 'قرارداد بازتوزیع نشان سفید و ادغام در محصول (White-Label OEM)',
    nameEn: 'White-Label OEM Reseller & Custom Integration Agreement',
    category: 'White-Label OEM',
    slaUptimeGuarantee: 'تضمین عملکرد API با حداکثر تأخیر ۱۰۰ میلی‌ثانیه و محدودیت متوازن Rate Limiting',
    dataSovereignty: 'تفکیک منطقی چندمستأجره (Multi-Tenant Isolation) و محافظت از اطلاعات محرمانه کاربران نهایی',
    ipWarrantyAndIndemnification: 'حفظ برند و هویت بصری توزیع‌کننده با حفظ حقوق معنوی ساختار زیرین برای پدیدآورنده اصلی',
    auditRights: 'گزارش‌گیری ماهانه شمارش لایسنس‌های صادره جهت محاسبه خودکار حق‌الامتیاز (Royalty)',
    terminationExitStrategy: 'دوره گذار ۶ ماهه برای حفظ تداوم خدمت‌رسانی به مشترکین فعال جذب‌شده قبل از فسخ'
  }
];

export const DIGITAL_EVIDENCE_MOCK_DATA: DigitalEvidenceItem[] = [
  {
    id: 'ev-01',
    title: 'اسکرین‌شات و استخراج گفتگوهای تلگرام و واتس‌اپ فیشینگ',
    evidenceType: 'چت و اسکرین‌شات پیام‌رسان‌ها',
    custodyStatus: 'گواهی تأمین دلیل کارشناس رسمی',
    sha256Checksum: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    extractionTimestamp: '۱۴۰۳/۰۹/۱۴ - ۱۰:۴۵',
    collectorName: 'مهندس حسینی - کارشناس رسمی دادگستری در امور جرایم رایانه‌ای',
    cyberPoliceFataRegistered: true,
    legalAdmissibilityScore: 95,
    statutoryBasis: 'مواد ۵۰ و ۵۴ قانون جرایم رایانه‌ای و ماده ۶۵۵ قانون آیین دادرسی کیفری (اعتبار داده‌پیام)',
    chainOfCustodyNotes: 'استخراج فیزیکی با دستگاه Cellebrite UFED، تصویربرداری بیت‌به‌بیت و تطبیق هش SHA-256 قبل و بعد از استخراج بدون امکان دستکاری.'
  },
  {
    id: 'ev-02',
    title: 'لاگ‌های نفوذ غیرمجاز به سرور و آدرس IP متهاجم (Access Logs)',
    evidenceType: 'لاگ سرور و آدرس IP',
    custodyStatus: 'پلمب دیجیتال و هش‌گذاری',
    sha256Checksum: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    extractionTimestamp: '۱۴۰۳/۰۹/۲۰ - ۲۳:۱۵',
    collectorName: 'تیم واکنش سریع امنیت اطلاعات (CSIRT) و وکیل سایبری',
    cyberPoliceFataRegistered: true,
    legalAdmissibilityScore: 90,
    statutoryBasis: 'ماده ۳۲ قانون جرایم رایانه‌ای (تکلیف ارائه‌دهندگان خدمات دسترسی به نگهداری داده‌های ترافیکی)',
    chainOfCustodyNotes: 'حفظ فایل Syslog با امضای زمانی معتبر Timestamping و گواهی SSL مرجع معتبر، ارسال رسمی به پلیس فتا برای اخذ ردیابی از مخابرات.'
  },
  {
    id: 'ev-03',
    title: 'ردیابی تراکنش‌های مشکوک تتر (USDT) روی شبکه ترون و اتریوم',
    evidenceType: 'تراکنش بلاک‌چین (TXID)',
    custodyStatus: 'مورد استناد در دادسرا و فتا',
    sha256Checksum: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
    extractionTimestamp: '۱۴۰۳/۱۰/۰۲ - ۱۴:۱۰',
    collectorName: 'دکتر سیده مریم رضوی و تحلیل‌گر ارشد بلاک‌چین Chainalysis',
    cyberPoliceFataRegistered: true,
    legalAdmissibilityScore: 98,
    statutoryBasis: 'ماده ۹ قانون مبارزه با پولشویی و مواد ۱ و ۱۳ قانون جرایم رایانه‌ای',
    chainOfCustodyNotes: 'ثبت هش غیرقابل تغییر روی کاوشگر بلاک‌چین، ترسیم نمودار جریان وجوه به آدرس کیف‌پول‌های صرافی‌های متمرکز داخلی جهت توقیف و انسداد حساب.'
  },
  {
    id: 'ev-04',
    title: 'هدر کامل ایمیل‌های فیشینگ و تغییر شماره شبای بانکی (BEC Fraud)',
    evidenceType: 'ایمیل و هدر پروتکل SMTP',
    custodyStatus: 'تأیید اصالت اولیه',
    sha256Checksum: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
    extractionTimestamp: '۱۴۰۳/۱۰/۱۰ - ۰۹:۳۰',
    collectorName: 'مدیر فناوری شرکت شاکی با نظارت مشاور حقوقی',
    cyberPoliceFataRegistered: false,
    legalAdmissibilityScore: 78,
    statutoryBasis: 'ماده ۱۲ تا ۱۵ قانون تجارت الکترونیک (دلایل الکترونیکی مطمئن)',
    chainOfCustodyNotes: 'بررسی رکوردهای SPF, DKIM, DMARC جهت اثبات جعل هویت دامنه تجاری شرکت صادرکننده پیش‌فاکتور ارزی.'
  }
];

export const CYBERCRIME_PENALTY_RULES: CybercrimePenaltyRule[] = [
  {
    id: 'pen-01',
    crimeTitle: 'کلاهبرداری مرتبط با رایانه و درگاه‌های پرداخت جعلی (فیشینگ)',
    articleReference: 'ماده ۱۳ قانون جرایم رایانه‌ای (ماده ۷۴۱ قانون مجازات اسلامی - تعزیرات)',
    prisonSentence: '۱ تا ۵ سال حبس تعزیری',
    monetaryFine: 'جزای نقدی معادل مال برده‌شده یا ۲۰ تا ۱۰۰ میلیون ریال تعدیل‌شده',
    civilCompensation: 'رد فوری عین مال یا مثل و قیمت آن به شاکی خصوصی به انضمام خسارت تأخیر تأدیه',
    investigativeSteps: [
      'ارسال فوری درخواست مسدودی حساب‌های مقصد به دادسرای ناحیه ۳۱ (جرایم رایانه‌ای)',
      'استعلام هویت صاحب حساب از شاپرک و شرکت‌های پرداخت‌یار (PSP)',
      'بررسی آدرس‌های IP ورود به درگاه با همکاری پلیس فتا',
      'توقیف حساب‌های متصل در تمامی بانک‌های عامل کشور'
    ],
    lawyerDefenseAdvice: 'در صورت فیشینگ سریعاً دستور مسدودی شبا اخذ شود، چراکه تأخیر بیش از ۲ ساعت منجر به تبدیل وجوه ریالی به تتر و انتقال به خارج از کشور می‌گردد.'
  },
  {
    id: 'pen-02',
    crimeTitle: 'دسترسی غیرمجاز به سامانه‌های رایانه‌ای و داده‌های محرمانه (هک)',
    articleReference: 'ماده ۱ قانون جرایم رایانه‌ای (ماده ۷۲۹ قانون مجازات اسلامی)',
    prisonSentence: '۹۱ روز تا ۱ سال حبس تعزیری',
    monetaryFine: '۵ تا ۲۰ میلیون ریال (قابل تبدیل و تشدید تا ۵۰ میلیون تومان)',
    civilCompensation: 'جبران کلیه هزینه‌های رفع آلودگی، بازیابی داده و خسارات ناشی از توقف کسب‌وکار',
    investigativeSteps: [
      'تأمین دلیل لاگ‌های فایروال و سیستم تشخیص نفوذ (IDS/IPS)',
      'استعلام مشخصات صاحب خط اینترنت یا سرور میانی (VPN/Proxy)',
      'تحلیل متادیتاهای دسترسی با ابزارهای جرم‌یابی دیجیتال',
      'ارجاع پرونده به کارشناس رسمی فناوری اطلاعات دادگستری'
    ],
    lawyerDefenseAdvice: 'دسترسی حتی بدون تغییر یا سرقت داده، صرفاً با نقض تدابیر امنیتی جرم مستقل و غیرقابل گذشت تلقی می‌شود.'
  },
  {
    id: 'pen-03',
    crimeTitle: 'سرقت داده‌ها و افشای اسرار تجاری و کدهای منبع نرم‌افزار',
    articleReference: 'ماده ۴ قانون جرایم رایانه‌ای و ماده ۶۴ قانون تجارت الکترونیک',
    prisonSentence: '۹۱ روز تا ۱ سال حبس تعزیری یا ۶ ماه تا ۲.۵ سال در صورت افشای اسرار دولتی',
    monetaryFine: 'جزای نقدی روزآمد متناسب با حجم داده یا ارزش اقتصادی اسرار تجاری',
    civilCompensation: 'محکومیت قطعی به پرداخت خسارت عدم‌النفع و ضرر و زیان مادی معنوی',
    investigativeSteps: [
      'بررسی تاریخچه رپوزیتوری‌های گیت (Git Commit History) و دسترسی‌های کلید SSH',
      'استعلام لاگ‌های خروج اطلاعات روی حافظه‌های فلش یا درایوهای ابری کارمندان',
      'تطبیق امضای هش سورس‌کد با نسخه منتشرشده توسط رقیب تجاری',
      'ثبت شکایت در دادسرای فرهنگ و رسانه یا دادسرای جرایم رایانه‌ای'
    ],
    lawyerDefenseAdvice: 'وجود قرارداد عدم افشای اطلاعات (NDA) محکم با ضمانت اجرای وجه‌التزام مالی، مسیر اثبات سوءنیت و مطالبه غرامت سنگین را در دادگاه هموار می‌سازد.'
  },
  {
    id: 'pen-04',
    crimeTitle: 'هتک حیثیت رایانه‌ای، دیپ‌فیک و انتشار صوت و تصاویر خصوصی',
    articleReference: 'ماده ۱۶ و ۱۷ قانون جرایم رایانه‌ای (ماده ۷۴۴ و ۷۴۵ قانون مجازات اسلامی)',
    prisonSentence: '۹۱ روز تا ۲ سال حبس تعزیری',
    monetaryFine: '۵ تا ۴۰ میلیون ریال یا هر دو مجازات به تشخیص قاضی',
    civilCompensation: 'اعاده حیثیت و حذف فوری محتوای مجرمانه از فضای مجازی به دستور دادستان',
    investigativeSteps: [
      'ضبط ادله با حضور کارشناس رسمی و گواهی محضری محتوا قبل از امحای پیام',
      'استعلام اکانت‌های ادمین کانال‌ها از پلتفرم‌های داخلی یا پلیس بین‌الملل اینترپل',
      'آزمایش اصالت فایل و رد جعل هوش مصنوعی (Deepfake Detection Analysis)',
      'صدور دستور فیلترینگ و مسدودی فوری درگاه انتشار توسط کارگروه تعیین مصادیق'
    ],
    lawyerDefenseAdvice: 'تغییر یا تحریف عکس و صوت دیگران و انتشار آن مشمول مجازات حبس درجه ۶ است و در صورت وجود جنبه اشاعه فحشا، تشدید مجازات اعمال خواهد شد.'
  }
];

export const SMART_CONTRACT_AUDIT_RULES: SmartContractAuditRule[] = [
  {
    id: 'audit-01',
    protocolName: 'پروتکل استخر نقدینگی و صرافی غیرمتمرکز (DEX Liquidity Pool)',
    network: 'Ethereum',
    vulnerabilityType: 'Reentrancy',
    financialRiskLevel: 'بحرانی (Critical)',
    legalLiabilityHolder: 'توسعه‌دهنده قرارداد هوشمند',
    mitigationAction: 'اجرای الگوی Checks-Effects-Interactions و استفاده الزامی از گارد OpenZeppelin ReentrancyGuard.'
  },
  {
    id: 'audit-02',
    protocolName: 'قرارداد توزیع پاداش استیکینگ و فارمینگ (Staking Rewards Vault)',
    network: 'BNB Chain',
    vulnerabilityType: 'Integer Overflow / Oracle Manipulation',
    financialRiskLevel: 'بالا (High)',
    legalLiabilityHolder: 'پلتفرم صرافی / بریج',
    mitigationAction: 'یکپارچه‌سازی با اوراکل‌های غیرمتمرکز غیرقابل دستکاری نظیر Chainlink و اعمال تایم‌لاک ۲۴ ساعته بر تراکنش‌های برداشت سنگین.'
  },
  {
    id: 'audit-03',
    protocolName: 'قرارداد خزانه‌داری چندامضایی حاکمیتی (DAO Multi-Sig Treasury)',
    network: 'Polygon',
    vulnerabilityType: 'Access Control Bypass',
    financialRiskLevel: 'بحرانی (Critical)',
    legalLiabilityHolder: 'صاحبان کلید خصوصی چندامضایی',
    mitigationAction: 'تفکیک نقش‌های دسترسی (Role-Based Access Control) و اعمال حدنصاب حداقل ۳ از ۵ امضا برای انتقال دارایی‌های امانی کاربران.'
  }
];

// ==========================================
// Phase 11 Mock Data: AML, Sanctions Screening, KYC & Suspicious Activity Indicators
// ==========================================

export const AML_SANCTIONS_DATA: AMLSanctionListEntity[] = [
  {
    id: 'aml-01',
    nameFa: 'پلتفرم میکس توکن‌های تورنادو کش و آدرس‌های هم‌پوشان',
    nameEn: 'Tornado Cash Smart Contracts & Relayer Nodes',
    entityType: 'آدرس‌های والت رمزارزی',
    sanctionSource: 'OFAC SDN',
    riskLevel: 'غیرمجاز / لیست سیاه (Blacklisted)',
    statutoryBasis: 'ماده ۲ و ۹ قانون مبارزه با پولشویی ایران و کنوانسیون پالرمو',
    complianceDirective: 'انسداد بلادرنگ حساب‌های متصل، گزارش‌دهی فوری STR به مرکز اطلاعات مالی (FIU) و عدم ارائه هرگونه خدمات مشاوره پرداخت.'
  },
  {
    id: 'aml-02',
    nameFa: 'شرکت خدمات ارزی و بازرگانی صوری اطلس خاورمیانه',
    nameEn: 'Atlas Middle East Shell Trading FZE',
    entityType: 'نهادها و شرکت‌ها (Corporate)',
    sanctionSource: 'شورای امنیت سازمان ملل (UNSC)',
    riskLevel: 'غیرمجاز / لیست سیاه (Blacklisted)',
    statutoryBasis: 'قطعنامه‌های تحریمی شورای امنیت و فهرست اشخاص مظنون قوه قضائیه',
    complianceDirective: 'توقیف کلیه مراودات تجاری، رد تراکنش‌های حوالجات سوئیفت/ارزی و ثبت اخطار در سامانه جامع تجارت.'
  },
  {
    id: 'aml-03',
    nameFa: 'صرافی رمزارزی متمرکز فاقد مجوز ثبت با ریسک بالای کاستودی',
    nameEn: 'Bitzlato Shadow Exchange Network',
    entityType: 'موسسات مالی / صرافی',
    sanctionSource: 'مرکز اطلاعات مالی ایران (FIU)',
    riskLevel: 'پرخطر (High Risk)',
    statutoryBasis: 'دستورالعمل‌های الزامی بانک مرکزی در خصوص فعالیت درگاه‌های پرداخت ارز دیجیتال',
    complianceDirective: 'الزام به اجرای پروتکل غربالگری مضاعف (Enhanced Due Diligence) و اعتبارسنجی منبع دارایی و اثبات درآمد.'
  },
  {
    id: 'aml-04',
    nameFa: 'هلدینگ تجاری سرمایه‌گذاری بین‌المللی چندملیتی با شعب آفشور',
    nameEn: 'Nexus Global Maritime & Energy Holding',
    entityType: 'نهادها و شرکت‌ها (Corporate)',
    sanctionSource: 'FATF High-Risk Jurisdictions',
    riskLevel: 'ریسک متوسط (Medium Risk)',
    statutoryBasis: 'توصیه‌های ۴۰ گانه گروه ویژه اقدام مالی (FATF Recommendations 10 & 24)',
    complianceDirective: 'شناسایی ذینفع نهایی واقعی (Ultimate Beneficial Owner - UBO) با سهم مالکیت بیش از ۲۵ درصد.'
  }
];

export const SUSPICIOUS_ACTIVITY_RULES: SuspiciousActivityRule[] = [
  {
    id: 'str-01',
    indicatorTitleFa: 'خرد کردن مبالغ تراکنش‌ها جهت دور زدن سقف گزارش‌دهی (Smurfing / Structuring)',
    category: 'تراکنش‌های بانکی شتابی / پایا',
    thresholdCriteria: 'واریز مبالغ پی‌درپی زیر ۲۰۰ میلیون تومان ظرف ۴۸ ساعت توسط اشخاص متعدد به حساب فردی فاقد پرونده مالیاتی',
    legalArticle: 'ماده ۴ آیین‌نامه اجرایی قانون مبارزه با پولشویی',
    reportingRequirement: 'ثبت خودکار گزارش معاملات مشکوک (STR) ظرف کمتر از ۲ ساعت به واحد مبارزه با پولشویی بانک مرکزی',
    lawyerAdvisory: 'در دادگاه اثبات حسن‌نیت منوط به ارائه فاکتور رسمی معتبر سامانه مودیان و احراز ماهیت بدهی یا بیع واقعی است.'
  },
  {
    id: 'str-02',
    indicatorTitleFa: 'ورود رمزارز از والت‌های پرخطر یا میکسرها و تبدیل فوری به ریال در صرافی',
    category: 'تراکنش‌های کریپتو و میکسرها',
    thresholdCriteria: 'انتقال رمزارز به ارزش بیش از ۱۰,۰۰۰ تتر که در ۲ هاپ گذشته از سرویس‌های ناشناس‌ساز عبور کرده است',
    legalArticle: 'ماده ۹ قانون مبارزه با پولشویی مصوب ۱۳۸۶ با اصلاحات ۱۳۹۷',
    reportingRequirement: 'استعلام فوری هش تراکنش (TXID) از ابزارهای KYT بین‌المللی و مسدودی موقت تا اثبات منشأ پاک توکن‌ها',
    lawyerAdvisory: 'مصادره اصل مال به همراه عواید ناشی از جرم طبق ماده ۹ قانون مبارزه با پولشویی الزامی است.'
  },
  {
    id: 'str-03',
    indicatorTitleFa: 'خرید و فروش مکرر املاک با قیمت‌های فاحش غیرمتعارف و پرداخت نقدی مبهم',
    category: 'معاملات املاک و مستغلات',
    thresholdCriteria: 'معامله ملک به ارزش بیش از ۲۰ میلیارد تومان با ثمن معامله به صورت چک تضمینی اشخاص ثالث ناشناس',
    legalArticle: 'ماده ۷ قانون مبارزه با پولشویی و ضوابط مشاغل غیرمالی تعریف‌شده (DNFBPs)',
    reportingRequirement: 'تکلیف دفاتر اسناد رسمی و بنگاه‌ها به استعلام کد یکتای رهگیری و تطبیق حساب واریزکننده با خریدار',
    lawyerAdvisory: 'مسئولیت تضامنی واسطه‌های ملکی در صورت اثبات علم و اطلاع از عواید مجرمانه کلاهبرداری یا ارتشاء.'
  },
  {
    id: 'str-04',
    indicatorTitleFa: 'صادرات کالا با ارزش‌گذاری بیش از واقع و عدم بازگشت ارز حاصل از صادرات',
    category: 'صادرات، واردات و صرافی‌ها',
    thresholdCriteria: 'ثبت کوتاژ صادراتی با پیش‌فاکتور ۳ برابر مظنه بازار جهانی بدون تسویه تعهد ارزی در سامانه نیما',
    legalArticle: 'قانون مبارزه با قاچاق کالا و ارز و مصوبات کارگروه بازگشت ارز بانک مرکزی',
    reportingRequirement: 'گزارش گمرک به دادسرای جرایم اقتصادی و مسدودی کارت بازرگانی متخلف',
    lawyerAdvisory: 'دفاع حقوقی مستلزم ارائه اسناد حمل معتبر، بارنامه کشتیرانی رسمی و آنالیز بهای تمام‌شده آزمایشگاهی است.'
  }
];

export const PEP_DILIGENCE_DATA: PEPDueDiligenceCheck[] = [
  {
    id: 'pep-01',
    roleCategory: 'مقامات ارشد دولتی',
    dueDiligenceLevel: 'شناسایی مضاعف تشدیدیافته (EDD)',
    sourceOfFundsVerification: 'الزام به دریافت اظهارنامه رسمی دارایی و ثبت در سامانه ثبت اموال مسئولان قوه قضائیه',
    monitoringFrequency: 'پایش مستمر ماهانه و بازبینی حساب‌های تراکنشی اعضای خانواده درجه یک',
    complianceChecklist: [
      'تطبیق کامل شناسنامه و کد ملی با پایگاه داده ثبت احوال',
      'بررسی ارتباط سهامداری در شرکت‌های پیمانکار دولتی (قانون منع مداخله کارکنان دولت)',
      'استعلام گردش حساب‌های بیش از ۱ میلیارد تومان از دبیرخانه مبارزه با مفاسد اقتصادی',
      'اخذ تأییدیه رسمی کتبی از مقام ارشد انطباق (Compliance Officer) پیش از آغاز همکاری'
    ]
  },
  {
    id: 'pep-02',
    roleCategory: 'مدیران شرکت‌های دولتی و خصولتی',
    dueDiligenceLevel: 'شناسایی مضاعف تشدیدیافته (EDD)',
    sourceOfFundsVerification: 'بررسی مصوبات هیأت مدیره در خصوص حق امضا و تفویض اختیارات مالی پروژه‌ها',
    monitoringFrequency: 'پایش فصلی کلیه قراردادها و مناقصات منعقدشده',
    complianceChecklist: [
      'بررسی تضارب منافع (Conflict of Interest) با اعضای خانواده',
      'ردیابی تسهیلات کلان بانکی بدون وثیقه کافی',
      'تطبیق فاکتورهای خریدهای ارزی با پروفرمای گمرکی'
    ]
  },
  {
    id: 'pep-03',
    roleCategory: 'بستگان درجه یک و وابستگان نزدیک (RCA)',
    dueDiligenceLevel: 'شناسایی مضاعف تشدیدیافته (EDD)',
    sourceOfFundsVerification: 'احراز منشأ ثروت موروثی یا درآمدهای شخصی مستقل از نفوذ شخص سیاسی',
    monitoringFrequency: 'پایش ۶ ماهه گردش حساب‌ها و مسافرت‌های خارجی با خروج ارز بالا',
    complianceChecklist: [
      'بررسی افتتاح حساب‌های وکالتی یا تجاری به نام اشخاص وابسته',
      'سنجش تناسب گردش مالی با شغل و سن دارنده حساب',
      'غربالگری لیست سیاه مفسدان اقتصادی اعلامی دادستانی کل کشور'
    ]
  }
];



