export interface LightPaletteColors {
  bg: string;
  text: string;
  goldPrimary: string;
  goldSecondary: string;
  border: string;
}

export interface DarkPaletteColors {
  bg: string;
  cardBg: string;
  text: string;
  goldPrimary: string;
  goldGlow: string;
}

export interface ThemePalettePreset {
  id: string;
  title: string;
  badge: string;
  category: 'classic' | 'corporate' | 'criminal' | 'real-estate' | 'arbitration' | 'tech' | 'luxury' | 'specialized' | 'original' | 'new-scenario' | string;
  desc: string;
  recommendedPractice?: string;
  specialtyTag?: string;
  lightColors: LightPaletteColors;
  darkColors: DarkPaletteColors;
}

export const THEME_PALETTES: ThemePalettePreset[] = [
  // ─────────────────────────────────────────────────────────────
  // گروه ۱: پالت‌های کلاسیک، اصیل و قضایی (Classic & High Court)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'classic-sedrazavi',
    title: '۱. کلاسیک SedRazavi (پیش‌فرض فاخر)',
    badge: 'اصلی',
    category: 'classic',
    desc: 'سرمه‌ای تیره دادگستری + طلایی زرین ۲۴ عیار',
    recommendedPractice: 'دعاوی عمومی، حقوق خصوصی، پرونده‌های کلان و دفاعیه',
    lightColors: {
      bg: '#F4F6F9',
      text: '#1C2541',
      goldPrimary: '#D4AF37',
      goldSecondary: '#B8960F',
      border: '#E0E4EC',
    },
    darkColors: {
      bg: '#0B132B',
      cardBg: '#1A2A4A',
      text: '#E8ECF1',
      goldPrimary: '#D4AF37',
      goldGlow: 'rgba(212, 175, 55, 0.4)',
    },
  },
  {
    id: 'french-palais',
    title: '۲. سرمه‌ای فرانسوی و کاخ دادگستری',
    badge: 'قضایی',
    category: 'classic',
    desc: 'سرمه‌ای فاخر دادگاه‌های لاهه و پاریس + کرم استخوانی',
    recommendedPractice: 'دیوان عالی کشور، پژوهش‌های دکترین حقوقی و وکالت فرجام‌خواهی',
    lightColors: {
      bg: '#F8F9FC',
      text: '#0D1B2A',
      goldPrimary: '#C5A059',
      goldSecondary: '#9E7D3B',
      border: '#DCE1EB',
    },
    darkColors: {
      bg: '#0D1B2A',
      cardBg: '#1B263B',
      text: '#E0E1DD',
      goldPrimary: '#E0A96D',
      goldGlow: 'rgba(224, 169, 109, 0.35)',
    },
  },
  {
    id: 'lapis-supreme',
    title: '۳. لاجوردی دیوان عالی و قضات ارشد',
    badge: 'دیوان عالی',
    category: 'classic',
    desc: 'آبی لاجوردی اصیل پارسی + طلای گرم خورشیدی',
    recommendedPractice: 'فرجام‌خواهی، اعاده دادرسی و دعاوی مرجع تجدیدنظر',
    lightColors: {
      bg: '#F0F4FA',
      text: '#102A43',
      goldPrimary: '#D97706',
      goldSecondary: '#B45309',
      border: '#BAC7D5',
    },
    darkColors: {
      bg: '#0A192F',
      cardBg: '#172A45',
      text: '#CCD6F6',
      goldPrimary: '#F59E0B',
      goldGlow: 'rgba(245, 158, 11, 0.4)',
    },
  },
  {
    id: 'matte-onyx',
    title: '۴. اونیکس و طلای مات کاخ لاهه',
    badge: 'بین‌الملل',
    category: 'classic',
    desc: 'سیاه اونیکس مخملی + طلای مات اشرافی',
    recommendedPractice: 'دادگاه‌های بین‌المللی، دیوان داوری لاهه و دعاوی حاکمیتی',
    lightColors: {
      bg: '#F5F5F7',
      text: '#1D1D1F',
      goldPrimary: '#B38B4D',
      goldSecondary: '#8C6B32',
      border: '#D2D2D7',
    },
    darkColors: {
      bg: '#141416',
      cardBg: '#232326',
      text: '#F5F5F7',
      goldPrimary: '#D4AF37',
      goldGlow: 'rgba(212, 175, 55, 0.35)',
    },
  },

  // ─────────────────────────────────────────────────────────────
  // گروه ۲: پالت‌های شرکتی، تجاری و سرمایه‌گذاری (Corporate & Finance)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'modern-navy',
    title: '۵. مدرن شرکتی و هلدینگ‌ها',
    badge: 'شرکتی',
    category: 'corporate',
    desc: 'آبی نفتی شرکتی + سفید برفی + آبی فیروزه‌ای',
    recommendedPractice: 'حقوق شرکت‌ها، قراردادهای بازرگانی و ادغام هلدینگ‌ها',
    lightColors: {
      bg: '#FFFFFF',
      text: '#1E293B',
      goldPrimary: '#0284C7',
      goldSecondary: '#0369A1',
      border: '#E2E8F0',
    },
    darkColors: {
      bg: '#0F172A',
      cardBg: '#1E293B',
      text: '#F8FAFC',
      goldPrimary: '#38BDF8',
      goldGlow: 'rgba(56, 189, 248, 0.4)',
    },
  },
  {
    id: 'olive-banking',
    title: '۶. زیتونی و برنجی امور بانکی و ارزی',
    badge: 'بانکی و ارزی',
    category: 'corporate',
    desc: 'سبز زیتونی متین + برنج آبکاری شده قضایی',
    recommendedPractice: 'تسهیلات بانکی، ضمانت‌نامه‌ها، اعتبارات اسنادی (LC) و چک',
    lightColors: {
      bg: '#F4F5F0',
      text: '#283618',
      goldPrimary: '#DDA15E',
      goldSecondary: '#BC6C25',
      border: '#CCD5AE',
    },
    darkColors: {
      bg: '#1B2117',
      cardBg: '#283618',
      text: '#FEFAE0',
      goldPrimary: '#DDA15E',
      goldGlow: 'rgba(221, 161, 94, 0.35)',
    },
  },
  {
    id: 'granite-epc',
    title: '۷. گرانیت و فولاد قراردادهای EPC و نفت',
    badge: 'پیمانکاری',
    category: 'corporate',
    desc: 'خاکستری گرانیتی سنگین + طلای متالیک صنعتی',
    recommendedPractice: 'قراردادهای فیدیک (FIDIC)، پیمانکاری نفت، گاز و صنایع فولاد',
    lightColors: {
      bg: '#F1F5F9',
      text: '#334155',
      goldPrimary: '#EAB308',
      goldSecondary: '#CA8A04',
      border: '#CBD5E1',
    },
    darkColors: {
      bg: '#181C24',
      cardBg: '#232936',
      text: '#E2E8F0',
      goldPrimary: '#FACC15',
      goldGlow: 'rgba(250, 204, 21, 0.35)',
    },
  },
  {
    id: 'nordic-tax',
    title: '۸. نوردیک و آبی نیمه‌شب مودیان مالیاتی',
    badge: 'مالیاتی',
    category: 'corporate',
    desc: 'آبی کریستالی اسکاندیناوی + کنتراست دقیق ارقام مالیاتی',
    recommendedPractice: 'سامانه مودیان، دادرسی مالیاتی، هیئت‌های حل اختلاف ۲۵۱ مکرر',
    lightColors: {
      bg: '#F8FAFC',
      text: '#0F172A',
      goldPrimary: '#0D9488',
      goldSecondary: '#0F766E',
      border: '#CCFBF1',
    },
    darkColors: {
      bg: '#0B1522',
      cardBg: '#132338',
      text: '#E2E8F0',
      goldPrimary: '#14B8A6',
      goldGlow: 'rgba(20, 184, 166, 0.35)',
    },
  },

  // ─────────────────────────────────────────────────────────────
  // گروه ۳: ملکی، ثبتی و اراضی (Real Estate & Property)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'warm-leather',
    title: '۹. چرم و چوب گرم دفتر ثبت و اسناد',
    badge: 'ثبتی و ملکی',
    category: 'real-estate',
    desc: 'قهوه‌ای چرمی لوکس + برنز باستانی + کرم کهن',
    recommendedPractice: 'الزام به تنظیم سند، خلع ید، افراز و دستور فروش املاک مشاع',
    lightColors: {
      bg: '#FDF8F3',
      text: '#4A2810',
      goldPrimary: '#C88D34',
      goldSecondary: '#9A6318',
      border: '#E8D5C4',
    },
    darkColors: {
      bg: '#24140A',
      cardBg: '#382012',
      text: '#F7EBDC',
      goldPrimary: '#E0A96D',
      goldGlow: 'rgba(224, 169, 109, 0.4)',
    },
  },
  {
    id: 'amber-property',
    title: '۱۰. کهربایی و برنز سرقفلی و اراضی',
    badge: 'سرقفلی',
    category: 'real-estate',
    desc: 'کهربای معدنی درخشان + برنز ساختمانی + خاکستری شن',
    recommendedPractice: 'حق کسب و پیشه، سرقفلی، مشارکت در ساخت و اراضی ملی',
    lightColors: {
      bg: '#FFFBEB',
      text: '#78350F',
      goldPrimary: '#D97706',
      goldSecondary: '#B45309',
      border: '#FDE68A',
    },
    darkColors: {
      bg: '#1C1204',
      cardBg: '#2E1F08',
      text: '#FEF3C7',
      goldPrimary: '#F59E0B',
      goldGlow: 'rgba(245, 158, 11, 0.4)',
    },
  },
  {
    id: 'desert-energy',
    title: '۱۱. شنی و مرمر کویر معادن و انرژی',
    badge: 'معادن و انرژی',
    category: 'real-estate',
    desc: 'ماسه طلایی کویر + مرمر امپراتور + مس صیقلی',
    recommendedPractice: 'حقوق معادن، اراضی منابع طبیعی، انرژی‌های نو و چاه‌های کشاورزی',
    lightColors: {
      bg: '#FAF7F2',
      text: '#3D312A',
      goldPrimary: '#B45309',
      goldSecondary: '#92400E',
      border: '#E5DACB',
    },
    darkColors: {
      bg: '#1C1612',
      cardBg: '#2B221C',
      text: '#EDE5DC',
      goldPrimary: '#D97706',
      goldGlow: 'rgba(217, 119, 6, 0.35)',
    },
  },

  // ─────────────────────────────────────────────────────────────
  // گروه ۴: کیفری، جرایم اقتصادی و امنیت (Criminal & Cyber Defense)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'ruby-criminal',
    title: '۱۲. یاقوتی جرایم اقتصادی و دادگاه کیفری یک',
    badge: 'کیفری سنگین',
    category: 'criminal',
    desc: 'یاقوت کبود تیره دادستانی + طلای خطی جسورانه',
    recommendedPractice: 'اختلاس، کلاهبرداری شبکه‌ای، جرایم پولی و قتل عمد',
    lightColors: {
      bg: '#FFF5F5',
      text: '#742A2A',
      goldPrimary: '#E53E3E',
      goldSecondary: '#C53030',
      border: '#FED7D7',
    },
    darkColors: {
      bg: '#1A0606',
      cardBg: '#2D0D0D',
      text: '#FFF5F5',
      goldPrimary: '#FC8181',
      goldGlow: 'rgba(252, 129, 129, 0.45)',
    },
  },
  {
    id: 'cyber-neon',
    title: '۱۳. سایبری و ادله دیجیتال نئون',
    badge: 'جرایم سایبری',
    category: 'tech',
    desc: 'کربن فضاپیمایی + سبز فسفری ادله دیجیتال و بلاک‌چین',
    recommendedPractice: 'سرقت رمز ارز، نفوذ به سامانه‌ها، فیشینگ و ادله دیجیتال',
    lightColors: {
      bg: '#F0FDF4',
      text: '#14532D',
      goldPrimary: '#16A34A',
      goldSecondary: '#15803D',
      border: '#BBF7D0',
    },
    darkColors: {
      bg: '#05130A',
      cardBg: '#0A2514',
      text: '#DCFCE7',
      goldPrimary: '#22C55E',
      goldGlow: 'rgba(34, 197, 94, 0.5)',
    },
  },
  {
    id: 'carbon-transit',
    title: '۱۴. ذغالی و کربن گمرک، ترانزیت و قاچاق',
    badge: 'گمرک و ترانزیت',
    category: 'criminal',
    desc: 'کربن مات فرودگاهی + زرد هشداردهنده استاندارد',
    recommendedPractice: 'قاچاق کالا و ارز، دادرسی تعزیرات حکومتی و بارنامه‌های CMR',
    lightColors: {
      bg: '#F8F9FA',
      text: '#212529',
      goldPrimary: '#F59E0B',
      goldSecondary: '#D97706',
      border: '#DEE2E6',
    },
    darkColors: {
      bg: '#111215',
      cardBg: '#1B1C22',
      text: '#F8F9FA',
      goldPrimary: '#FBBF24',
      goldGlow: 'rgba(251, 191, 36, 0.4)',
    },
  },

  // ─────────────────────────────────────────────────────────────
  // گروه ۵: داوری، تجارت بین‌الملل و دیپلماسی (Arbitration & Global)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'baltic-arbitration',
    title: '۱۵. کهربای بالتیک و داوری اتاق پاریس (ICC)',
    badge: 'داوری ICC',
    category: 'arbitration',
    desc: 'عسلی متالیک استکهلم + آبی تیره بین‌المللی',
    recommendedPractice: 'داوری‌های تجاری بین‌المللی، آنسیترال و اجرای آرای داوری خارجی',
    lightColors: {
      bg: '#FDFBF7',
      text: '#1E293B',
      goldPrimary: '#D97706',
      goldSecondary: '#92400E',
      border: '#E2E8F0',
    },
    darkColors: {
      bg: '#0E1726',
      cardBg: '#182436',
      text: '#F1F5F9',
      goldPrimary: '#F59E0B',
      goldGlow: 'rgba(245, 158, 11, 0.4)',
    },
  },
  {
    id: 'turquoise-global',
    title: '۱۶. طلایی فیروزه‌ای جاده ابریشم و اینکوترمز',
    badge: 'تجارت آزاد',
    category: 'arbitration',
    desc: 'فیروزه درباری پارس + طلای اعلا + آبی اقیانوسی',
    recommendedPractice: 'اینکوترمز ۲۰۲۰، قراردادهای سوآپ ارزی و حمل و نقل دریایی',
    lightColors: {
      bg: '#F0FDFA',
      text: '#134E4A',
      goldPrimary: '#0D9488',
      goldSecondary: '#0F766E',
      border: '#99F6E4',
    },
    darkColors: {
      bg: '#042F2E',
      cardBg: '#115E59',
      text: '#CCFBF1',
      goldPrimary: '#2DD4BF',
      goldGlow: 'rgba(45, 212, 191, 0.4)',
    },
  },
  {
    id: 'steel-maritime',
    title: '۱۷. تیتانیوم و آبی فولادی هوانوردی و کشتیرانی',
    badge: 'کشتیرانی',
    category: 'arbitration',
    desc: 'آبی عمیق اقیانوس اطلس + استیل براق و طلای کروم',
    recommendedPractice: 'خسارت مشترک دریایی، بیمه‌های P&I و سوانح هوایی ایکائو',
    lightColors: {
      bg: '#F1F5F9',
      text: '#0F172A',
      goldPrimary: '#0284C7',
      goldSecondary: '#0369A1',
      border: '#CBD5E1',
    },
    darkColors: {
      bg: '#0B1320',
      cardBg: '#142033',
      text: '#F8FAFC',
      goldPrimary: '#38BDF8',
      goldGlow: 'rgba(56, 189, 248, 0.35)',
    },
  },
  {
    id: 'bordeaux-diplomatic',
    title: '۱۸. شرابی دیپلماتیک و سفارتخانه‌ها',
    badge: 'دیپلماتیک',
    category: 'arbitration',
    desc: 'عنابی اشرافی ژنو + برنز سفارتخانه‌ها',
    recommendedPractice: 'امور اتباع خارجی، استرداد مجرمین و مصونیت‌های کنسولی',
    lightColors: {
      bg: '#FAF5F5',
      text: '#4A1D24',
      goldPrimary: '#B91C1C',
      goldSecondary: '#991B1B',
      border: '#FECACA',
    },
    darkColors: {
      bg: '#200A0E',
      cardBg: '#331218',
      text: '#FEE2E2',
      goldPrimary: '#F87171',
      goldGlow: 'rgba(248, 113, 113, 0.4)',
    },
  },

  // ─────────────────────────────────────────────────────────────
  // گروه ۶: فناوری، استارتاپ‌ها و مالکیت فکری (Tech & Intellectual Property)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'silver-agate-ip',
    title: '۱۹. عقیق نقره‌ای و پلاتین اختراعات (WIPO)',
    badge: 'ثبت اختراع',
    category: 'tech',
    desc: 'نقره‌ای هولوگرافیک + آبی پلاتینیوم فناوری',
    recommendedPractice: 'ثبت برند و علائم، پتنت، حق کپی‌رایت و نقض محرمانگی NDA',
    lightColors: {
      bg: '#F8FAFC',
      text: '#334155',
      goldPrimary: '#64748B',
      goldSecondary: '#475569',
      border: '#E2E8F0',
    },
    darkColors: {
      bg: '#0F172A',
      cardBg: '#1E293B',
      text: '#F8FAFC',
      goldPrimary: '#94A3B8',
      goldGlow: 'rgba(148, 163, 184, 0.4)',
    },
  },
  {
    id: 'pistachio-startup',
    title: '۲۰. ترنج و پسته قراردادهای Venture Capital',
    badge: 'استارتاپ و VC',
    category: 'tech',
    desc: 'سبز نعنایی شاداب + طلای آفتابی مدرن',
    recommendedPractice: 'جذب سرمایه راند بذری (Seed)، سهام تشویقی (ESOP) و قرارداد موسسین',
    lightColors: {
      bg: '#F0FDF4',
      text: '#14532D',
      goldPrimary: '#84CC16',
      goldSecondary: '#65A30D',
      border: '#DCFCE7',
    },
    darkColors: {
      bg: '#0A1E11',
      cardBg: '#13351F',
      text: '#F0FDF4',
      goldPrimary: '#A3E635',
      goldGlow: 'rgba(163, 230, 53, 0.4)',
    },
  },
  {
    id: 'quantum-tech',
    title: '۲۱. نیلی عمیق و طلای پالادیوم هوش مصنوعی',
    badge: 'هوش مصنوعی',
    category: 'tech',
    desc: 'بنفش نیلی فضایی + خطوط درخشان نئونی پالادیوم',
    recommendedPractice: 'حاکمیت داده، الگوریتم‌های هوش مصنوعی و قراردادهای کلاود',
    lightColors: {
      bg: '#EEF2FF',
      text: '#312E81',
      goldPrimary: '#6366F1',
      goldSecondary: '#4F46E5',
      border: '#C7D2FE',
    },
    darkColors: {
      bg: '#0C0A26',
      cardBg: '#171447',
      text: '#E0E7FF',
      goldPrimary: '#818CF8',
      goldGlow: 'rgba(129, 140, 248, 0.45)',
    },
  },

  // ─────────────────────────────────────────────────────────────
  // گروه ۷: تخصصی دیوان عدالت، اداری و سلامت (Public, Health & Special)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'emerald-justice',
    title: '۲۲. زمرد عدالت و دیوان عدالت اداری',
    badge: 'دیوان اداری',
    category: 'specialized',
    desc: 'سبز یشمی فاخر قضایی + طلای ملایم ارگانیک',
    recommendedPractice: 'ابطال مصوبات شهرداری، ماده ۱۰۰، گزینش و امور استخدامی',
    lightColors: {
      bg: '#F0FDF4',
      text: '#064E3B',
      goldPrimary: '#059669',
      goldSecondary: '#047857',
      border: '#A7F3D0',
    },
    darkColors: {
      bg: '#032016',
      cardBg: '#083B2B',
      text: '#ECFDF5',
      goldPrimary: '#10B981',
      goldGlow: 'rgba(16, 185, 129, 0.4)',
    },
  },
  {
    id: 'pearl-medical',
    title: '۲۳. مرواریدی و نقره‌ای حقوق پزشکی و نظام‌پزشکی',
    badge: 'خطای پزشکی',
    category: 'specialized',
    desc: 'سفید مرواریدی استریل + آبی دریایی بالینی + نقره‌ای',
    recommendedPractice: 'قصور و خطاهای جراحی، دادسرای نظام‌پزشکی و پزشکی قانونی',
    lightColors: {
      bg: '#F8FAFC',
      text: '#1E293B',
      goldPrimary: '#0EA5E9',
      goldSecondary: '#0284C7',
      border: '#E2E8F0',
    },
    darkColors: {
      bg: '#0A141E',
      cardBg: '#132334',
      text: '#F0F9FF',
      goldPrimary: '#38BDF8',
      goldGlow: 'rgba(56, 189, 248, 0.4)',
    },
  },
  {
    id: 'orchid-family',
    title: '۲۴. بنفش ارکیده و پلاتین حقوق خانواده و مهریه',
    badge: 'خانواده و ارث',
    category: 'specialized',
    desc: 'ارکیده‌ای موقر + پلاتین آرامش‌بخش + کرم نرم',
    recommendedPractice: 'مهریه، طلاق توافقی، حضانت فرزندان و سلب ولایت قهری',
    lightColors: {
      bg: '#FDF4FF',
      text: '#701A75',
      goldPrimary: '#C026D3',
      goldSecondary: '#A21CAF',
      border: '#F5D0FE',
    },
    darkColors: {
      bg: '#1A061E',
      cardBg: '#2D0A34',
      text: '#FAE8FF',
      goldPrimary: '#E879F9',
      goldGlow: 'rgba(232, 121, 249, 0.4)',
    },
  },
  {
    id: 'neyshabur-waqf',
    title: '۲۵. فیروزه نیشابور و طلاکوب موقوفات و خیریه‌ها',
    badge: 'اوقاف و ثلث',
    category: 'specialized',
    desc: 'فیروزه‌ای اسلیمی ایرانی + طلای مرصع گنبد',
    recommendedPractice: 'تولیت موقوفات، وصیت‌نامه شرعی، حبس عین و موسسات خیریه عام‌المنفعه',
    lightColors: {
      bg: '#F0FDFA',
      text: '#115E59',
      goldPrimary: '#D4AF37',
      goldSecondary: '#B45309',
      border: '#CCFBF1',
    },
    darkColors: {
      bg: '#042422',
      cardBg: '#093B38',
      text: '#E6FFFA',
      goldPrimary: '#F6E05E',
      goldGlow: 'rgba(246, 224, 94, 0.4)',
    },
  },
  {
    id: 'sports-cas',
    title: '۲۶. کاکائویی سلطنتی و کرم عاج دادگاه ورزش (CAS)',
    badge: 'حقوق ورزشی',
    category: 'specialized',
    desc: 'شکلاتی سویسی + عاج آفریقایی + طلای المپیک',
    recommendedPractice: 'قراردادهای بازیکنان حرفه‌ای، دوپینگ و فرجام‌خواهی در دادگاه CAS لوزان',
    lightColors: {
      bg: '#FAF6F0',
      text: '#442C1D',
      goldPrimary: '#D97706',
      goldSecondary: '#B45309',
      border: '#E8DEC8',
    },
    darkColors: {
      bg: '#1B110B',
      cardBg: '#2C1B12',
      text: '#FDF8F0',
      goldPrimary: '#F59E0B',
      goldGlow: 'rgba(245, 158, 11, 0.4)',
    },
  },
  {
    id: 'tibet-agri',
    title: '۲۷. یشمی تبتی و نقره‌ای کشت و صنعت و آب',
    badge: 'آب و کشاورزی',
    category: 'specialized',
    desc: 'سبز خزه جنگل‌های باستانی + نقره‌ای رودخانه‌ای',
    recommendedPractice: 'حقابه‌ها، کمیسیون ماده واحده اراضی کشاورزی و صنایع غذایی',
    lightColors: {
      bg: '#F2F8F5',
      text: '#1B3B2B',
      goldPrimary: '#2D6A4F',
      goldSecondary: '#1B4332',
      border: '#D8F3DC',
    },
    darkColors: {
      bg: '#091A12',
      cardBg: '#112B1F',
      text: '#D8F3DC',
      goldPrimary: '#52B788',
      goldGlow: 'rgba(82, 183, 136, 0.35)',
    },
  },

  // ─────────────────────────────────────────────────────────────
  // گروه ۸: پریمیوم لوکس و هنری (Luxury & High Entertainment)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'royal-purple',
    title: '۲۸. ارغوانی سلطنتی و تاج و تخت',
    badge: 'پریمیوم',
    category: 'luxury',
    desc: 'بنفش درباری عمیق + طلای ۲۴ عیار براق شمش',
    recommendedPractice: 'دفاتر وکالت شخصی VIP، موکلین سفارشی و قراردادهای شاخص',
    lightColors: {
      bg: '#FAF5FF',
      text: '#581C87',
      goldPrimary: '#FFD700',
      goldSecondary: '#EAB308',
      border: '#F3E8FF',
    },
    darkColors: {
      bg: '#160824',
      cardBg: '#270F3E',
      text: '#FAF5FF',
      goldPrimary: '#FFD700',
      goldGlow: 'rgba(255, 215, 0, 0.45)',
    },
  },
  {
    id: 'cinema-magenta',
    title: '۲۹. سرخابی سینمایی و مدیا آرت',
    badge: 'هنر و رسانه',
    category: 'luxury',
    desc: 'زرشکی ارغوانی مدرن + طلای شامپاینی',
    recommendedPractice: 'تهیه‌کنندگان سینما، حق مولف هنرمندان، سلبریتی‌ها و تبلیغات',
    lightColors: {
      bg: '#FFF1F2',
      text: '#881337',
      goldPrimary: '#BE123C',
      goldSecondary: '#9F1239',
      border: '#FFE4E6',
    },
    darkColors: {
      bg: '#1E050C',
      cardBg: '#320B16',
      text: '#FFF1F2',
      goldPrimary: '#FB7185',
      goldGlow: 'rgba(251, 113, 133, 0.4)',
    },
  },
  {
    id: 'minimal-dark',
    title: '۳۰. مونوکروم مینیمال اسکاندیناوی',
    badge: 'ساده‌گرا',
    category: 'luxury',
    desc: 'مشکی عمیق خالص + کنتراست سفید کریستالی بدون حاشیه',
    recommendedPractice: 'اساتید دانشگاه، کانون بین‌المللی وکلا (IBA) و دکترین حقوقی',
    lightColors: {
      bg: '#FAFAFA',
      text: '#171717',
      goldPrimary: '#262626',
      goldSecondary: '#404040',
      border: '#E5E5E5',
    },
    darkColors: {
      bg: '#0A0A0A',
      cardBg: '#171717',
      text: '#F5F5F5',
      goldPrimary: '#FFFFFF',
      goldGlow: 'rgba(255, 255, 255, 0.3)',
    },
  },
];
