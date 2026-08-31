import { ServiceItem, CaseItem, TestimonialItem, ArticleItem, StoryItem, FaqItem, ElementorBlockDef } from '../types/theme';

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
  }
];
