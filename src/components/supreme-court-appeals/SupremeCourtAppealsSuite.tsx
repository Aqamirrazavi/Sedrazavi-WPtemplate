import React, { useState } from 'react';
import {
  Scale,
  BookOpen,
  FileCheck2,
  AlertOctagon,
  Sparkles,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Download,
  Copy,
  Check,
  Building2,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Sliders,
  TrendingUp,
  Percent,
  Calendar,
  Hash,
  Share2,
  Layers,
  ChevronDown,
  Printer
} from 'lucide-react';

// Precedent Case Interface
export interface SupremeCourtPrecedent {
  id: string;
  verdictNumber: string;
  date: string;
  category: 'حقوقی و مدنی' | 'کیفری و جرایم اقتصادی' | 'ثبتی و اراضی' | 'بانکی و اسناد تجاری';
  title: string;
  courtBranch: string;
  summary: string;
  keyLegalRule: string;
  citedArticles: string[];
  fullText: string;
  isBindingPrecedent: boolean; // رای وحدت رویه لازم‌الاتباع
}

// Judicial Risk Criteria
export interface GroundForCassation {
  id: string;
  code: string;
  article: string;
  title: string;
  description: string;
  weight: number;
  selected: boolean;
}

// Tracked Supreme Court Appeal
export interface CourtAppealTrackingRecord {
  id: string;
  fileNumber: string;
  supremeBranch: string;
  appellantName: string;
  appelleeName: string;
  caseSubject: string;
  filingDate: string;
  stage: 'دبیرخانه دیوان' | 'ارجاع به شعبه' | 'تحت بررسی مستشار' | 'اخذ نظر دادیار دیوان' | 'صدور رای نقض' | 'ابرام دادنامه';
  predictedOutcomeRate: number;
  lastUpdate: string;
}

export const SupremeCourtAppealsSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const [activeTab, setActiveTab] = useState<
    'precedents_codex' | 'risk_probability_engine' | 'pleading_wizard' | 'procedural_audit' | 'appeal_monitor'
  >('precedents_codex');

  // Precedents Data
  const [precedents] = useState<SupremeCourtPrecedent[]>([
    {
      id: 'prec-840',
      verdictNumber: 'رای وحدت رویه شماره ۸۴۰ هیئت عمومی',
      date: '۱۴۰۲/۱۰/۱۲',
      category: 'حقوقی و مدنی',
      title: 'خسارت تاخیر تادیه بر مبنای نرخ تورم اعلامی بانک مرکزی در قراردادهای خصوصی',
      courtBranch: 'هیئت عمومی دیوان عالی کشور',
      summary: 'در تعهدات پولی، چنانچه طرفین وجه التزامی بیش از شاخص تورم توافق نکرده باشند، خسارت تاخیر تادیه بر اساس ماده ۵۲۲ ق.آ.د.م از تاریخ مطالبه محاسبه می‌گردد.',
      keyLegalRule: 'اعمال شاخص تورم نقطه به نقطه بانک مرکزی الزامی بوده و توافق خلاف آن در معاملات ربوی باطل است.',
      citedArticles: ['ماده ۵۲۲ قانون آیین دادرسی مدنی', 'ماده ۲۲۸ قانون مدنی', 'اصل ۴۰ قانون اساسی'],
      fullText: 'نظر به اینکه ماده ۵۲۲ قانون آیین دادرسی دادگاه‌های عمومی و انقلاب در امور مدنی مصوب ۱۳۷۹ با شرایط مقرر در آن، نحوه محاسبه خسارت تأخیر تأدیه را بر اساس تغییر شاخص سالانه تعیین کرده است، آرای شعبی که بر همین مبنا انشا شده منطبق با قانون است.',
      isBindingPrecedent: true
    },
    {
      id: 'prec-835',
      verdictNumber: 'رای وحدت رویه شماره ۸۳۵ هیئت عمومی',
      date: '۱۴۰۲/۰۶/۱۴',
      category: 'بانکی و اسناد تجاری',
      title: 'بطلان شروط مازاد بر سود مصوب شورای پول و اعتبار در قراردادهای تسهیلات بانکی',
      courtBranch: 'هیئت عمومی دیوان عالی کشور',
      summary: 'بانک‌ها و موسسات اعتباری مجاز به دریافت سود یا وجه التزام مازاد بر نرخ‌های اعلامی بانک مرکزی نبوده و اخذ مازاد فاقد مشروعیت قانونی است.',
      keyLegalRule: 'سود مازاد بر مصوبه شورای پول و اعتبار قابل استرداد بوده و تضامین مازاد نیز باطل است.',
      citedArticles: ['ماده ۱۰ قانون مدنی', 'ماده ۹۷۵ قانون مدنی', 'ماده ۱۹۷ ق.آ.د.م'],
      fullText: 'قراردادهای تنظیمی بین بانک‌ها و تسهیلات‌گیرندگان در بخشی که متضمن نرخ‌های سود مازاد بر مصوبات الزام‌آور شورای پول و اعتبار است، به استناد مواد ۱۰ و ۹۷۵ قانون مدنی باطل و بلااثر تلقی می‌شود.',
      isBindingPrecedent: true
    },
    {
      id: 'prec-811',
      verdictNumber: 'رای وحدت رویه شماره ۸۱۱ هیئت عمومی',
      date: '۱۴۰۰/۰۴/۰۱',
      category: 'ثبتی و اراضی',
      title: 'مسئولیت بایع در جبران کاهش ارزش ثمن معامله در صورت مستحق‌للغیر درآمدن مبیع',
      courtBranch: 'هیئت عمومی دیوان عالی کشور',
      summary: 'در صورت بطلان بیع به علت مستحق‌للغیر درآمدن، خریدار جاهل مستحق دریافت ثمن به قیمت روز ملک بر اساس نظر کارشناس رسمی است.',
      keyLegalRule: 'جبران غرامت خریدار با لحاظ کاهش ارزش پول بر اساس بهای روز ملک مشابه صورت می‌پذیرد.',
      citedArticles: ['ماده ۳۹۰ قانون مدنی', 'ماده ۳۹۱ قانون مدنی', 'قاعده لاضرر'],
      fullText: 'در مواردی که مبیع مستحق‌للغیر درآید و بیع باطل شود، خریدار بی‌خبر از فساد بیع، استحقاق دریافت بهای روز مبیع را بر اساس ارزش واقعی بازار دارد تا خسارت وارده کاملاً جبران گردد.',
      isBindingPrecedent: true
    },
    {
      id: 'prec-824',
      verdictNumber: 'رای وحدت رویه شماره ۸۲۴ هیئت عمومی',
      date: '۱۴۰۱/۰۷/۰۵',
      category: 'کیفری و جرایم اقتصادی',
      title: 'صلاحیت دادگاه انقلاب در رسیدگی به قاچاق عمده کالا و ارز سازمان‌یافته',
      courtBranch: 'هیئت عمومی دیوان عالی کشور',
      summary: 'جرایم قاچاق کالا و ارز در صورتی که به صورت حرفه‌ای، باندی و با احراز سازمان‌یافتگی ارتکاب یابد، در صلاحیت انحصاری دادگاه انقلاب است.',
      keyLegalRule: 'تفکیک صلاحیت محاکم کیفری دو و دادگاه انقلاب بر اساس ماهیت باندی و ارزش محموله قاچاق.',
      citedArticles: ['ماده ۴۴ قانون مبارزه با قاچاق کالا و ارز', 'ماده ۳۰۳ قانون آیین دادرسی کیفری'],
      fullText: 'صلاحیت رسیدگی به اتهام قاچاق کالا و ارز در موارد سازمان‌یافته با دادگاه انقلاب اسلامی است و شعب عمومی جزایی فاقد صلاحیت ذاتی هستند.',
      isBindingPrecedent: true
    }
  ]);

  // Precedents search & filter
  const [searchPrecedentQuery, setSearchPrecedentQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedPrecedent, setSelectedPrecedent] = useState<SupremeCourtPrecedent | null>(null);

  // Cassation Grounds Checklist
  const [cassationGrounds, setCassationGrounds] = useState<GroundForCassation[]>([
    {
      id: 'g-1',
      code: 'بند ۱ ماده ۳۷۱ ق.آ.د.م',
      article: 'ماده ۳۷۱ بند ۱',
      title: 'عدم صلاحیت ذاتی دادگاه صادرکننده دادنامه',
      description: 'رسیدگی به پرونده تجاری در صلاحیت داوری یا مرجع اختصاصی بوده اما دادگاه حقوقی بدان رسیدگی نموده است.',
      weight: 30,
      selected: true
    },
    {
      id: 'g-2',
      code: 'بند ۲ ماده ۳۷۱ ق.آ.د.م',
      article: 'ماده ۳۷۱ بند ۲',
      title: 'مخالفت صریح با قوانین موضوعه و اصول مسلم فقهی',
      description: 'استناد دادگاه به ماده قانونی منسوخ یا تفسیر مغایر با مدلول مفاهم قانون مدنی.',
      weight: 25,
      selected: true
    },
    {
      id: 'g-3',
      code: 'بند ۳ ماده ۳۷۱ ق.آ.د.م',
      article: 'ماده ۳۷۱ بند ۳',
      title: 'عدم رعایت اصول دادرسی و تحدید حقوق دفاعی موکل',
      description: 'عدم ابلاغ واقعی اخطاریه جلسه دادرسی یا رد بدون توجیه تقاضای ارجاع به کارشناسی ۳ نفره.',
      weight: 20,
      selected: false
    },
    {
      id: 'g-4',
      code: 'بند ۴ ماده ۳۷۱ ق.آ.د.م',
      article: 'ماده ۳۷۱ بند ۴',
      title: 'تعارض بین اسباب توجیهی و منطوق دادنامه یا احکام متناقض',
      description: 'بین دادنامه معترض‌عنه و دادنامه قطعی سابق‌الصدور در همان موضوع و اصحاب تعارض بیّن وجود دارد.',
      weight: 25,
      selected: false
    },
    {
      id: 'g-5',
      code: 'ماده ۴۷۷ قانون آیین دادرسی کیفری',
      article: 'ماده ۴۷۷ ق.آ.د.ک',
      title: 'ادعای خلاف بیّن شرع بودن رای صادره (تقاضا از ریاست قوه قضاییه)',
      description: 'مخالفت رای صادره با احکام ضروری و قطعی اسلام، فتاوای مشهور فقهای شیعه یا نصوص مسلّم شرعی.',
      weight: 40,
      selected: true
    }
  ]);

  // Risk Probability Score Calculation
  const selectedWeightSum = cassationGrounds
    .filter((g) => g.selected)
    .reduce((acc, curr) => acc + curr.weight, 0);
  const normalizedProbability = Math.min(95, Math.max(35, Math.round(selectedWeightSum * 0.9)));

  // Pleading Wizard State
  const [pleadingType, setPleadingType] = useState<'فرجام‌خواهی' | 'ماده ۴۷۷'>('فرجام‌خواهی');
  const [appellantName, setAppellantName] = useState('شرکت بین‌المللی تجهیزات نیرو سپهر (با وکالت دکتر رضوی)');
  const [appelleeName, setAppelleeName] = useState('سازمان امور اراضی و منابع طبیعی استان');
  const [courtVerdictNumber, setCourtVerdictNumber] = useState('۱۴۰۲۹۱۱۰۰۲۸۳۹۴');
  const [appealedBranch, setAppealedBranch] = useState('شعبه ۳۸ دادگاه تجدیدنظر استان تهران');
  const [pleadingBodyGenerated, setPleadingBodyGenerated] = useState('');
  const [copiedPleading, setCopiedPleading] = useState(false);

  // Procedural Compliance Checklist
  const [filingDateInput, setFilingDateInput] = useState('۱۴۰۳/۰۶/۲۸');
  const [notificationDateInput, setNotificationDateInput] = useState('۱۴۰۳/۰۶/۱۰');
  const [isClientAbroad, setIsClientAbroad] = useState(false);
  const [verdictValueToman, setVerdictValueToman] = useState(1500000000); // 1.5 Billion Toman

  // Calculate Days Passed
  const daysPassed = 18; // Simulated days passed
  const allowedDeadlineDays = isClientAbroad ? 60 : 20;
  const isWithinDeadline = daysPassed <= allowedDeadlineDays;
  const appealFilingFee = Math.round(verdictValueToman * 0.055); // 5.5% court fee in Supreme Court

  // Tracked Appeals List
  const [appealsTracked] = useState<CourtAppealTrackingRecord[]>([
    {
      id: 'track-1',
      fileNumber: '۱۴۰۳-دیوان-۹۴۸۲',
      supremeBranch: 'شعبه ۱۰ دیوان عالی کشور (مدنی)',
      appellantName: 'گروه صنعتی پولاد آروین',
      appelleeName: 'بانک تجارت',
      caseSubject: 'فرجام‌خواهی از بطلان شرط وجه التزام مرکب مازاد بر مصوبه بانک مرکزی',
      filingDate: '۱۴۰۳/۰۴/۱۵',
      stage: 'تحت بررسی مستشار',
      predictedOutcomeRate: 88,
      lastUpdate: '۱۴۰۳/۰۷/۰۱'
    },
    {
      id: 'track-2',
      fileNumber: '۱۴۰۳-دیوان-۹۵۱۰',
      supremeBranch: 'شعبه ۳۲ دیوان عالی کشور (کیفری)',
      appellantName: 'مهندس فرشید کمالی',
      appelleeName: 'دادسرای امور اقتصادی',
      caseSubject: 'اعمال ماده ۴۷۷ نسبت به دادنامه ضبط اموال به اتهام اخلال در بازار ارز',
      filingDate: '۱۴۰۳/۰۵/۰۲',
      stage: 'اخذ نظر دادیار دیوان',
      predictedOutcomeRate: 74,
      lastUpdate: '۱۴۰۳/۰۶/۲۸'
    },
    {
      id: 'track-3',
      fileNumber: '۱۴۰۳-دیوان-۸۹۰۱',
      supremeBranch: 'شعبه ۳ دیوان عالی کشور (ثبتی)',
      appellantName: 'ورثه مرحوم حاج قاسم رضایی',
      appelleeName: 'اداره کل ثبت اسناد و املاک',
      caseSubject: 'فرجام‌خواهی از رد دادخواست ابطال سند معارض و اعمال رای وحدت رویه ۸۱۱',
      filingDate: '۱۴۰۳/۰۲/۱۰',
      stage: 'صدور رای نقض',
      predictedOutcomeRate: 95,
      lastUpdate: '۱۴۰۳/۰۶/۱۵'
    }
  ]);

  // Generate Pleading Handler
  const handleGeneratePleading = () => {
    const selectedGroundsTitles = cassationGrounds
      .filter((g) => g.selected)
      .map((g) => `• ${g.title} (${g.code})`)
      .join('\n');

    const draft = `بسم‌الله الرحمن الرحیم

ریاست و مستشاران محترم ${pleadingType === 'فرجام‌خواهی' ? 'دیوان عالی کشور' : 'معظم حوزه ریاست قوه قضاییه (اعمال ماده ۴۷۷ ق.آ.د.ک)'}

موضوع: ${pleadingType === 'فرجام‌خواهی' ? 'دادخواست و لایحه فرجام‌خواهی نسبت به دادنامه شماره ' + courtVerdictNumber : 'درخواست تجویز اعاده دادرسی به جهت خلاف بیّن شرع نسبت به دادنامه ' + courtVerdictNumber}
مرجع صادرکننده دادنامه معترض‌عنه: ${appealedBranch}

فرجام‌خواه / متقاضی: ${appellantName}
فرجام‌خوانده / طرف دعوی: ${appelleeName}

با سلام و اهدای تحیات وافره قضایی؛
احتراماً به وکالت از موکل، نسبت به دادنامه فوق‌الذکر در موعد قانونی مقرر معترض بوده و مستنداً به مواد ۳۶۸ و ۳۷۱ قانون آیین دادرسی مدنی ${pleadingType === 'ماده ۴۷۷' ? 'و ماده ۴۷۷ قانون آیین دادرسی کیفری' : ''}، به جهات ذیل نقض بلاارجاع دادنامه بدوی/تجدیدنظر را استدعا دارد:

جهات و مستندات قانونی اعتراض:
${selectedGroundsTitles}

شرح دفاعیات ماهوی و انطباق با آراء وحدت رویه:
۱- دادگاه محترم نخستین و تجدیدنظر بدون توجه به مدارک ابرازی و بدون ارجاع موضوع به هیئت کارشناسان رسمی ۵ نفره، در ماهیت مبادرت به صدور رای نموده که این امر نقض بارز بند ۳ ماده ۳۷۱ ق.آ.د.م (تحدید اصول دادرسی و حقوق دفاعی) می‌باشد.
۲- بر اساس رای وحدت رویه شماره ۸۳۵ و ۸۴۰ هیئت عمومی دیوان عالی کشور، هرگونه محاسبه وجه التزام یا سود مازاد بر ضوابط قانونی فاقد اثر و باطل است؛ حال آنکه دادنامه معترض‌عنه بر خلاف نصوص مذکور صادر گردیده است.
۳- به استناد قاعده فقهی لاضرر و اصل چهلم قانون اساسی، استمرار اجرای این دادنامه منتهی به عسر و حرج شدید و تضییع بلاوجه حقوق مکتسبه موکل خواهد شد.

بنا به مراتب مسطوره فوق، صدور قرار توقف اجرای حکم به استناد تبصره ۲ ماده ۴۷۷ / ماده ۳۸۶ ق.آ.د.م و در ماهیت، نقض دادنامه معترض‌عنه و ارجاع به شعبه هم‌عرض مورد استدعاست.

با تجدید احترام
دکتر سیده مریم رضوی - وکیل پایه یک دادگستری
پروانه وکالت: ۹۸۴۲ کانون وکلای مرکز`;

    setPleadingBodyGenerated(draft);
  };

  const handleCopyPleading = () => {
    navigator.clipboard.writeText(pleadingBodyGenerated);
    setCopiedPleading(true);
    setTimeout(() => setCopiedPleading(false), 2000);
  };

  // Filter Precedents
  const filteredPrecedents = precedents.filter((p) => {
    const matchQuery =
      p.title.includes(searchPrecedentQuery) ||
      p.verdictNumber.includes(searchPrecedentQuery) ||
      p.summary.includes(searchPrecedentQuery);
    const matchCat = filterCategory === 'all' || p.category === filterCategory;
    return matchQuery && matchCat;
  });

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 font-sans pb-24 selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]" dir="rtl">
      {/* Top Header & Breadcrumbs */}
      <div className="bg-[#0B152F] border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Scale className="w-5 h-5 text-white font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  فاز ۳۴ تخصصی
                </span>
                <span className="text-xs text-slate-400">دیوان عالی کشور و مراجع عالی قضایی</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white font-serif">
                تحلیل آراء دیوان عالی کشور، تجدیدنظرخواهی، فرجام‌خواهی و ماده ۴۷۷
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>داشبورد وکالت</span>
              </button>
            )}
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2f] text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-[#D4AF37]/10"
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                <span>بازگشت به سایت اصلی</span>
              </button>
            )}
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 py-2 border-t border-slate-800/60 no-scrollbar">
          <button
            onClick={() => setActiveTab('precedents_codex')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'precedents_codex'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>پایگاه آراء وحدت رویه و شعب دیوان</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/40">{precedents.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('risk_probability_engine')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'risk_probability_engine'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>ارزیاب شانس نقض رای در دیوان ({normalizedProbability}٪)</span>
          </button>

          <button
            onClick={() => setActiveTab('pleading_wizard')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'pleading_wizard'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>استودیو تدوین لایحه فرجام‌خواهی و ماده ۴۷۷</span>
          </button>

          <button
            onClick={() => setActiveTab('procedural_audit')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'procedural_audit'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>ممیزی مواعد ۲۰ روزه و شرایط شکلی</span>
          </button>

          <button
            onClick={() => setActiveTab('appeal_monitor')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'appeal_monitor'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>رهگیری پرونده در شعب دیوان</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-500/30 text-purple-200">
              {appealsTracked.length} فعال
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Header Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>آراء وحدت رویه ایندکس شده</span>
              <BookOpen className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-2 font-mono">
              ۸۴۰ <span className="text-xs text-slate-400 font-normal">رای لازم‌الاتباع</span>
            </div>
            <div className="text-[11px] text-purple-400 mt-1">تطبیق هوشمند با آرای شعب تجدیدنظر</div>
          </div>

          <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>نرخ نقض دادنامه‌ها در دیوان</span>
              <Scale className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="text-2xl font-bold text-white mt-2 font-mono">
              ۷۲.۴٪ <span className="text-xs text-slate-400 font-normal">در پرونده‌های دفتر</span>
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">۱۴ فقره نقض بلاارجاع در سال ۱۴۰۳</div>
          </div>

          <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>درخواست‌های ماده ۴۷۷</span>
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-2 font-mono">
              ۹ <span className="text-xs text-slate-400 font-normal">فقره در حال رسیدگی</span>
            </div>
            <div className="text-[11px] text-cyan-400 mt-1">تجویز رسیدگی مجدد در دیوان عالی</div>
          </div>

          <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>میانگین طول رسیدگی در دیوان</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-2 font-mono">
              ۴.۵ <span className="text-xs text-slate-400 font-normal">ماه تقویمی</span>
            </div>
            <div className="text-[11px] text-amber-400 mt-1">سرعت پیگیری با لوایح تکمیلی مستشار</div>
          </div>
        </div>

        {/* TAB 1: Precedents Codex */}
        {activeTab === 'precedents_codex' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchPrecedentQuery}
                    onChange={(e) => setSearchPrecedentQuery(e.target.value)}
                    placeholder="جستجو در متن آراء، کلمات کلیدی، شماره رای..."
                    className="pl-4 pr-9 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] w-64"
                  />
                </div>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="all">همه دسته‌بندی‌های حقوقی</option>
                  <option value="حقوقی و مدنی">حقوقی و مدنی</option>
                  <option value="کیفری و جرایم اقتصادی">کیفری و جرایم اقتصادی</option>
                  <option value="بانکی و اسناد تجاری">بانکی و اسناد تجاری</option>
                  <option value="ثبتی و اراضی">ثبتی و اراضی</option>
                </select>
              </div>

              <span className="text-xs text-slate-400">
                نمایش {filteredPrecedents.length} رای وحدت رویه معتبر دیوان عالی کشور
              </span>
            </div>

            {/* Precedents Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPrecedents.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0B152F] border border-slate-800 hover:border-[#D4AF37]/50 rounded-2xl p-5 space-y-4 shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                          {item.verdictNumber}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">{item.date}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white mt-1.5 font-serif leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
                      لازم‌الاتباع
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                    {item.summary}
                  </p>

                  <div className="p-3 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/20 text-xs text-[#D4AF37]">
                    <span className="font-bold block mb-1">قاعده طلایی رای وحدت رویه:</span>
                    {item.keyLegalRule}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.citedArticles.map((art, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {art}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <span className="text-slate-400 text-[11px]">{item.courtBranch}</span>
                    <button
                      onClick={() => setSelectedPrecedent(item)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#D4AF37] font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>مشاهده متن کامل رای</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for full precedent */}
            {selectedPrecedent && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#0B152F] border border-slate-700 rounded-3xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-white text-sm sm:text-base font-serif">
                      {selectedPrecedent.verdictNumber}
                    </h3>
                    <button
                      onClick={() => setSelectedPrecedent(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-300">
                      <span className="font-bold text-[#D4AF37] block mb-1">عنوان کامل رای:</span>
                      {selectedPrecedent.title}
                    </div>

                    <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-slate-200 font-serif leading-7 text-justify text-sm">
                      <span className="font-bold text-white block mb-2 font-sans text-xs">
                        متن دادنامه هیئت عمومی دیوان عالی کشور:
                      </span>
                      {selectedPrecedent.fullText}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedPrecedent.fullText);
                        alert('متن دادنامه در حافظه کپی شد.');
                      }}
                      className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2f] text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                      <span>کپی متن جهت درج در لایحه فرجام‌خواهی</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Risk Probability & Cassation Grounds Engine */}
        {activeTab === 'risk_probability_engine' && (
          <div className="space-y-6">
            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-6 space-y-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-6">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                    <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                    <span>موتور هوشمند پیش‌بینی احتمال نقض دادنامه در دیوان عالی کشور</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    محاسبه شاخص شانس پیروزی بر اساس انطباق با جهات ماده ۳۷۱ قانون آیین دادرسی مدنی و ماده ۴۷۷ ق.آ.د.ک.
                  </p>
                </div>

                {/* Big Score Meter */}
                <div className="flex items-center gap-4 bg-slate-900/90 px-6 py-4 rounded-2xl border border-slate-800">
                  <div className="text-center">
                    <span className="text-[11px] text-slate-400 block">احتمال نقض دادنامه</span>
                    <div className="text-3xl sm:text-4xl font-mono font-bold text-[#D4AF37] mt-0.5">
                      {normalizedProbability}٪
                    </div>
                  </div>
                  <div className="h-12 w-px bg-slate-800"></div>
                  <div className="text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{normalizedProbability > 75 ? 'شانس بالا (High)' : 'شانس متوسط'}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">مبنا: سوابق شعب دیوان و آراء وحدت رویه</span>
                  </div>
                </div>
              </div>

              {/* Interactive Grounds Checklist */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-300">
                  انتخاب جهات نقض و ایرادات شکلی/ماهوی وارده به دادنامه تجدیدنظر:
                </h4>

                <div className="space-y-3">
                  {cassationGrounds.map((ground) => (
                    <div
                      key={ground.id}
                      onClick={() => {
                        setCassationGrounds((prev) =>
                          prev.map((g) => (g.id === ground.id ? { ...g, selected: !g.selected } : g))
                        );
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                        ground.selected
                          ? 'bg-[#D4AF37]/10 border-[#D4AF37]/60 shadow-md'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border mt-0.5 transition-colors ${
                            ground.selected
                              ? 'bg-[#D4AF37] border-[#D4AF37] text-slate-950 font-bold'
                              : 'border-slate-600 bg-slate-800'
                          }`}
                        >
                          {ground.selected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{ground.title}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-purple-300 font-mono border border-slate-700">
                              {ground.code}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {ground.description}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold text-[#D4AF37] whitespace-nowrap">
                        +{ground.weight} وزن
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setActiveTab('pleading_wizard');
                    handleGeneratePleading();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:from-[#c49f2f] hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>انتقال به ویزارد نگارش لایحه با استناد به جهات انتخابی</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Pleading Wizard */}
        {activeTab === 'pleading_wizard' && (
          <div className="space-y-6">
            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                    <FileText className="w-5 h-5 text-[#D4AF37]" />
                    <span>ویزارد هوشمند نگارش لایحه فرجام‌خواهی و درخواست ماده ۴۷۷</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    تنظیم تخصصی متون اعتراضیه قضایی طبق اصول فرجام‌خواهی با فرمت استاندارد دیوان عالی کشور.
                  </p>
                </div>

                {/* Toggle Pleading Type */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setPleadingType('فرجام‌خواهی')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      pleadingType === 'فرجام‌خواهی'
                        ? 'bg-[#D4AF37] text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    فرجام‌خواهی دیوان (ماده ۳۷۱)
                  </button>
                  <button
                    onClick={() => setPleadingType('ماده ۴۷۷')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      pleadingType === 'ماده ۴۷۷'
                        ? 'bg-purple-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    اعاده دادرسی ماده ۴۷۷ (خلاف بیّن شرع)
                  </button>
                </div>
              </div>

              {/* Form Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">فرجام‌خواه / موکل معترض:</label>
                  <input
                    type="text"
                    value={appellantName}
                    onChange={(e) => setAppellantName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">فرجام‌خوانده / طرف مقابل:</label>
                  <input
                    type="text"
                    value={appelleeName}
                    onChange={(e) => setAppelleeName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">شماره دادنامه معترض‌عنه:</label>
                  <input
                    type="text"
                    value={courtVerdictNumber}
                    onChange={(e) => setCourtVerdictNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">شعبه صادرکننده رای قطعی:</label>
                  <input
                    type="text"
                    value={appealedBranch}
                    onChange={(e) => setAppealedBranch(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleGeneratePleading}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#D4AF37] font-bold text-xs sm:text-sm border border-[#D4AF37]/40 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>تولید و تدوین خودکار لایحه مستدل</span>
                </button>
              </div>

              {/* Generated Text Area */}
              {pleadingBodyGenerated && (
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-bold flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-emerald-400" />
                      پیش‌نمایش لایحه تنظیم‌شده آماده ثبت در دفاتر خدمات الکترونیک قضایی:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyPleading}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedPleading ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">کپی شد</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>کپی متن</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>چاپ لایحه</span>
                      </button>
                    </div>
                  </div>

                  <textarea
                    rows={12}
                    value={pleadingBodyGenerated}
                    onChange={(e) => setPleadingBodyGenerated(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 font-serif leading-7 text-xs sm:text-sm focus:border-[#D4AF37] outline-none selection:bg-[#D4AF37]/20"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: Procedural Audit & Deadlines */}
        {activeTab === 'procedural_audit' && (
          <div className="space-y-6">
            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                  <FileCheck2 className="w-5 h-5 text-[#D4AF37]" />
                  <span>ممیزی شرایط شکلی، محاسبه موعد ۲۰ روزه و هزینه دادرسی دیوان</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  پیشگیری از رد دادخواست به واسطه انقضای موعد تجدیدنظر، نقص در هزینه دادرسی یا عدم تصریح اختیارات در وکالتنامه.
                </p>
              </div>

              {/* Inputs & Audit Engine */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">تاریخ ابلاغ واقعی در سامانه ثنا:</label>
                  <input
                    type="text"
                    value={notificationDateInput}
                    onChange={(e) => setNotificationDateInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">مبلغ محکوم‌به در دادنامه (تومان):</label>
                  <input
                    type="number"
                    value={verdictValueToman}
                    onChange={(e) => setVerdictValueToman(Number(e.target.value))}
                    step={50000000}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none font-mono"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                    <input
                      type="checkbox"
                      checked={isClientAbroad}
                      onChange={(e) => setIsClientAbroad(e.target.checked)}
                      className="rounded bg-slate-900 border-slate-700 text-[#D4AF37] focus:ring-0"
                    />
                    <span>موکل مقیم خارج از کشور است (مهلت ۲ ماهه)</span>
                  </label>
                </div>
              </div>

              {/* Status Alert Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-2xl border ${
                    isWithinDeadline
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">وضعیت موعد قانونی فرجام‌خواهی:</span>
                    <span className="font-mono text-xs font-bold">
                      روز {daysPassed} از {allowedDeadlineDays} روز
                    </span>
                  </div>
                  <div className="text-xs mt-2 leading-relaxed">
                    {isWithinDeadline
                      ? 'دادخواست در فرجه قانونی ۲۰ روزه قرار دارد و خطر رد به جهت انقضای مهلت منتفی است.'
                      : 'هشدار! فرجه قانونی منقضی گردیده است. استناد به عذر موجه یا ماده ۴۷۷ الزامی است.'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">هزینه دادرسی دیوان عالی (۵.۵٪):</span>
                    <span className="font-mono font-bold text-[#D4AF37]">
                      {appealFilingFee.toLocaleString()} تومان
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">تمبر مالیاتی فرجام‌خواهی وکیل:</span>
                    <span className="font-mono font-bold text-slate-300">
                      {Math.round(appealFilingFee * 0.05).toLocaleString()} تومان
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 block pt-1">
                    ابطال تمبر از طریق سامانه خودکاربری وکلا صورت می‌پذیرد.
                  </span>
                </div>
              </div>

              {/* Essential Powers Checklist */}
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-300">
                  چک‌لیست کنترل اختیارات وکالتنامه (ماده ۳۵ قانون آیین دادرسی مدنی):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>وکالت در فرجام‌خواهی و اعاده دادرسی (بند ۴ ماده ۳۵)</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>وکالت در تعیین جاعل و مصدق و ارجاع به کارشناسی (بندهای ۵ و ۶)</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>وکالت در ادعای انکار و تردید نسبت به سند طرف (بند ۳)</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>حق توکیل به غیر ولو کراراً (بند ۲ ماده ۳۵)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Appeal Monitor */}
        {activeTab === 'appeal_monitor' && (
          <div className="space-y-6">
            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>رهگیری آنلاین پرونده‌ها در شعب دیوان عالی کشور</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  رصد مراحل بررسی مستشار، اخذ نظریه دادیار دیوان و پیش‌بینی خروجی نهایی دادرسی.
                </p>
              </div>

              <span className="text-xs px-3 py-1 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/30 font-mono">
                {appealsTracked.length} پرونده تحت نظارت
              </span>
            </div>

            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs sm:text-sm">
                  <thead className="bg-slate-900 text-slate-400 text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">کد پرونده و شعبه دیوان</th>
                      <th className="py-3 px-4">موضوع دعوی</th>
                      <th className="py-3 px-4">اصحاب پرونده</th>
                      <th className="py-3 px-4">مرحله کنونی</th>
                      <th className="py-3 px-4">پیش‌بینی پیروزی</th>
                      <th className="py-3 px-4">آخرین بروزرسانی</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {appealsTracked.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white text-xs">{item.fileNumber}</div>
                          <div className="text-[10px] text-purple-300 mt-0.5">{item.supremeBranch}</div>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs text-xs text-slate-300 leading-snug">
                          {item.caseSubject}
                        </td>
                        <td className="py-3.5 px-4 text-xs">
                          <div className="text-slate-200">معترض: {item.appellantName}</div>
                          <div className="text-[10px] text-slate-400">طرف: {item.appelleeName}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                              item.stage === 'صدور رای نقض'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : item.stage === 'تحت بررسی مستشار'
                                ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30'
                                : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                            }`}
                          >
                            {item.stage}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                          {item.predictedOutcomeRate}٪
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                          {item.lastUpdate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
