import React, { useState } from 'react';
import {
  Gavel,
  Scale,
  FileText,
  Calculator,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Clock,
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  TrendingUp,
  Percent,
  Calendar,
  Building2,
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  ArrowRight,
  Sliders,
  Layers,
  ChevronDown,
  Users
} from 'lucide-react';

export interface ArbitrationCase {
  id: string;
  tribunalNumber: string;
  claimant: string;
  respondent: string;
  arbitratorType: 'داور منفرد مرضی‌الطرفین' | 'هیئت داوری ۳ نفره' | 'مرکز داوری اتاق ایران (ACIC)' | 'داوری کانون وکلا';
  claimAmountToman: number;
  subject: string;
  filingDate: string;
  status: 'تبادل لوایح' | 'جلسه استماع و استماع شهود' | 'ارجاع به کارشناسی' | 'در شرف انشای رای' | 'رای صادر شد';
  deadlineDate: string;
  isEnforceable: boolean;
}

export interface NullityGround {
  id: string;
  code: string;
  title: string;
  description: string;
  article: string;
  riskLevel: 'بحرانی' | 'متوسط' | 'پایین';
  selected: boolean;
}

export const CommercialArbitrationSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const [activeTab, setActiveTab] = useState<
    'calculator' | 'drafting_award' | 'nullity_checker' | 'clause_vault' | 'cases_tracker'
  >('calculator');

  // Tariff Calculator State
  const [claimAmount, setClaimAmount] = useState<number>(3500000000); // 3.5 Billion Toman
  const [isSoleArbitrator, setIsSoleArbitrator] = useState<boolean>(true);
  const [institutionType, setInstitutionType] = useState<'ad_hoc' | 'acic_chamber' | 'bar_arbitration'>('acic_chamber');

  // Calculate Arbitration Fee based on Iranian Judiciary Arbitration Tariff Bylaw (آیین‌نامه حق‌الزحمه داوری)
  const calculateArbitrationFee = (amount: number, isSole: boolean) => {
    let fee = 0;
    if (amount <= 50000000) {
      fee = amount * 0.05; // 5% up to 50 million
    } else if (amount <= 250000000) {
      fee = 2500000 + (amount - 50000000) * 0.03; // 3%
    } else if (amount <= 1000000000) {
      fee = 8500000 + (amount - 250000000) * 0.02; // 2%
    } else if (amount <= 5000000000) {
      fee = 23500000 + (amount - 1000000000) * 0.01; // 1%
    } else {
      fee = 63500000 + (amount - 5000000000) * 0.005; // 0.5%
    }

    // If 3 arbitrators, bylaw specifies +50% total or divided among panel
    const totalPanelFee = isSole ? fee : fee * 1.5;
    const administrativeShare = institutionType === 'acic_chamber' ? totalPanelFee * 0.2 : 0;
    const netPerArbitrator = isSole ? totalPanelFee - administrativeShare : (totalPanelFee - administrativeShare) / 3;

    return {
      baseFee: Math.round(fee),
      totalFee: Math.round(totalPanelFee),
      adminShare: Math.round(administrativeShare),
      perArbitrator: Math.round(netPerArbitrator)
    };
  };

  const calculatedFee = calculateArbitrationFee(claimAmount, isSoleArbitrator);

  // Nullity Grounds Checklist (ماده ۴۸۹ قانون آیین دادرسی مدنی)
  const [nullityGrounds, setNullityGrounds] = useState<NullityGround[]>([
    {
      id: 'n-1',
      code: 'بند ۱ ماده ۴۸۹',
      article: 'ماده ۴۸۹ بند ۱',
      title: 'رای صادره مخالف با قوانین موجد حق باشد',
      description: 'تعارض ماهوی رای با اصول آمره قانون مدنی، قواعد امری حقوق تجارت یا اسناد رسمی غیرقابل انکار.',
      riskLevel: 'بحرانی',
      selected: false
    },
    {
      id: 'n-2',
      code: 'بند ۲ ماده ۴۸۹',
      article: 'ماده ۴۸۹ بند ۲',
      title: 'داور نسبت به مطلبی که موضوع داوری نبوده رای صادر کرده باشد',
      description: 'خروج داور از حدود اختیارات و ورود به دعاوی یا اشخاصی که خارج از موافقت‌نامه داوری بوده‌اند.',
      riskLevel: 'بحرانی',
      selected: false
    },
    {
      id: 'n-3',
      code: 'بند ۳ ماده ۴۸۹',
      article: 'ماده ۴۸۹ بند ۳',
      title: 'داور خارج از حدود اختیارات خود رای صادر نموده باشد',
      description: 'صدور حکم به خسارات یا شروطی که طرفین صراحتاً در قرارداد داوری از اختیارات داور سلب نموده بودند.',
      riskLevel: 'متوسط',
      selected: false
    },
    {
      id: 'n-4',
      code: 'بند ۴ ماده ۴۸۹',
      article: 'ماده ۴۸۹ بند ۴',
      title: 'رای داور پس از انقضای مدت معین داوری صادر و تسلیم شده باشد',
      description: 'عدم تمدید کتبی مهلت ۳ ماهه یا توافقی داوری و صدور رای پس از زوال صلاحیت زمانی داور.',
      riskLevel: 'بحرانی',
      selected: true
    },
    {
      id: 'n-5',
      code: 'بند ۵ ماده ۴۸۹',
      article: 'ماده ۴۸۹ بند ۵',
      title: 'رای داور با آنچه در دفتر املاک یا اسناد رسمی ثبت شده تعارض داشته باشد',
      description: 'مخالفت صریح رای داور با حقوق ثبت‌شده اشخاص ثالث در اداره ثبت اسناد و املاک کشور.',
      riskLevel: 'بحرانی',
      selected: false
    },
    {
      id: 'n-6',
      code: 'بند ۶ ماده ۴۸۹',
      article: 'ماده ۴۸۹ بند ۶',
      title: 'رای به توسط داورانی صادر شده که مجاز به صدور رای نبوده‌اند',
      description: 'حضور داوری که دارای ممنوعیت قانونی بوده (نظیر قضات و کارمندان شاغل در محاکم طبق ماده ۴۷۰ ق.آ.د.م).',
      riskLevel: 'بحرانی',
      selected: false
    },
    {
      id: 'n-7',
      code: 'بند ۷ ماده ۴۸۹',
      article: 'ماده ۴۸۹ بند ۷',
      title: 'قرارداد رجوع به داوری بی‌اعتبار بوده باشد',
      description: 'بطلان قرارداد اصلی که شرط داوری در آن درج گردیده بود، در صورت عدم استقلال شرط داوری.',
      riskLevel: 'متوسط',
      selected: false
    }
  ]);

  // Award Drafting State
  const [awardClaimant, setAwardClaimant] = useState('شرکت مهندسی و بازرگانی پارس آریا (خواهان داوری)');
  const [awardRespondent, setAwardRespondent] = useState('شرکت ساختمانی بتن سازان البرز (خوانده)');
  const [arbitratorName, setArbitratorName] = useState('دکتر سیده مریم رضوی (سرداور مرضی‌الطرفین)');
  const [contractReference, setContractReference] = useState('قرارداد شماره ۱۴۰۲/ب/۷۸ مورخ ۱۴۰۲/۰۳/۱۵');
  const [awardBody, setAwardBody] = useState('');
  const [copiedAward, setCopiedAward] = useState(false);

  // Generate Arbitral Award Handler
  const handleGenerateAward = () => {
    const draft = `بسم‌الله الرحمن الرحیم

«رای نهایی و قطعی هیئت داوری تجاری»
پرونده کلاسه: داوری-۱۴۰۳/۱۰۴
مرجع داوری: هیئت داوران مرضی‌الطرفین مرکز داوری بازرگانی

خواهان داوری: ${awardClaimant}
خوانده داوری: ${awardRespondent}
سرداور / داور منفرد: ${arbitratorName}
مستند ارجاع به داوری: شرط مندرج در ماده ۱۸ ${contractReference}

«گردش‌کار و شرح وقایع دعوی»
به تاریخ ۱۴۰۳/۰۴/۱۰، خواهان با ابراز قرارداد پایه و اعلام بروز اختلاف در زمینه عدم تحویل به‌موقع تجهیزات صنعتی و مطالبه خسارت تاخیر تادیه، تقاضای تشکیل هیئت داوری نمود. 
خوانده علیرغم ابلاغ قانونی اخطاریه و تبادل لوایح کتبی، در دفاعیات خود مدعی وقوع فورس‌ماژور و عدم صلاحیت داور گردید.
هیئت داوری پس از بررسی اوراق، استماع اظهارات وکلای طرفین در جلسه مورخ ۱۴۰۳/۰۵/۲۲ و ارجاع موضوع به کارشناس رسمی دادگستری در رشته تاسیسات و حسابداری، ختم رسیدگی را اعلام و به شرح ذیل مبادرت به انشای رای می‌نماید:

«رای هیئت داوری»
با عنایت به احراز صلاحیت مرجع داوری مستنداً به ماده ۴۵۴ به بعد قانون آیین دادرسی مدنی، و با توجه به نظریه کارشناس رسمی منتخب که مصون از تعرض موثر طرفین باقی مانده است؛
۱- ادعای خواهان در خصوص اصل تخلف قراردادی خوانده محرز تشخیص داده شده و خوانده محکوم است به پرداخت مبلغ اصل خسارت قراردادی به علاوه خسارت تاخیر تادیه بر مبنای نرخ تورم بانک مرکزی.
۲- هزینه داوری و دستمزد کارشناسی رسمی بالمناصفه بین طرفین تقسیم و خوانده ملزم به تودیع سهم مقرر می‌باشد.
۳- این رای وفق مواد ۴۸۸ و ۴۹۰ قانون آیین دادرسی مدنی قطعی، لازم‌الاجرا و پس از ابلاغ توسط دفتر دادگاه عمومی حقوقی صالح، از طریق اجرای احکام مدنی دادگستری قابل وصول است.

سرداور مرضی‌الطرفین: دکتر سیده مریم رضوی
داور اختصاصی خواهان: مهندس فریدون بهرامی
داور اختصاصی خوانده: دکتر ناصر کاظمی`;

    setAwardBody(draft);
  };

  // Standard Arbitration Clauses State
  const [arbitrationClauses] = useState([
    {
      id: 'c-1',
      title: 'شرط استاندارد داوری مرکز داوری اتاق ایران (ACIC)',
      type: 'سازمانی - پیشرفته',
      text: 'کلیه اختلافات، دعاوی و ادعاهای ناشی از این قرارداد یا راجع به آن از جمله انعقاد، اعتبار، فسخ، نقض، تفسیر یا اجرای آن، به مرکز داوری اتاق ایران ارجاع می‌گردد که بر طبق قواعد داوری آن مرکز به صورت قطعی و لازم‌الاجرا توسط یک یا سه داور حل و فصل شود. این شرط داوری به صورت موافقت‌نامه مستقل معتبر خواهد بود.'
    },
    {
      id: 'c-2',
      title: 'شرط داور منفرد مرضی‌الطرفین با سازوکار انتخاب جایگزین',
      type: 'موردی (Ad-Hoc)',
      text: 'در صورت بروز هرگونه اختلاف در تفسیر یا اجرای قرارداد، موضوع به داوری سرکار خانم دکتر سیده مریم رضوی به عنوان داور مرضی‌الطرفین ارجاع خواهد شد. در صورت انصراف، فوت یا امتناع داور، ریاست کانون وکلای دادگستری مرکز به عنوان مقام ناصب نسبت به تعیین داور جایگزین اقدام خواهد نمود و رای صادره قطعی است.'
    },
    {
      id: 'c-3',
      title: 'شرط داوری چندمرحله‌ای (مذاکره، میانجی‌گری و سپس داوری قطعی)',
      type: 'چندمرحله‌ای (Multi-Tiered)',
      text: 'طرفین متعهدند ابتدا هرگونه اختلاف را طی مدت ۳۰ روز از طریق مذاکره حسن‌نیت حل و فصل نمایند. در صورت عدم حصول توافق، اختلاف به میانجی‌گری و در نهایت ظرف ۱۵ روز پس از شکست میانجی‌گری، به هیئت داوری ۳ نفره ارجاع خواهد شد که هر طرف یک داور و سرداور با توافق طرفین یا به قید قرعه انتخاب می‌گردد.'
    }
  ]);

  // Active Cases List
  const [casesList] = useState<ArbitrationCase[]>([
    {
      id: 'case-1',
      tribunalNumber: 'داوری-۱۴۰۳/۲۱۸',
      claimant: 'پتروشیمی خلیج مهر',
      respondent: 'شرکت حمل‌ونقل بین‌المللی کاسپین',
      arbitratorType: 'مرکز داوری اتاق ایران (ACIC)',
      claimAmountToman: 12500000000,
      subject: 'مطالبه خسارت دموراژ و تاخیر در ترخیص کانتینرهای خوراک پتروشیمی',
      filingDate: '۱۴۰۳/۰۴/۰۲',
      status: 'ارجاع به کارشناسی',
      deadlineDate: '۱۴۰۳/۰۷/۱۵',
      isEnforceable: true
    },
    {
      id: 'case-2',
      tribunalNumber: 'داوری-۱۴۰۳/۳۰۴',
      claimant: 'کنسرسیوم مهندسی عمران شهر',
      respondent: 'شهرداری منطقه ۲',
      arbitratorType: 'هیئت داوری ۳ نفره',
      claimAmountToman: 4800000000,
      subject: 'تعدیل آحادبها و خسارات خواب کارگاه در پروژه تقاطع غیرهمسطح',
      filingDate: '۱۴۰۳/۰۵/۱۸',
      status: 'جلسه استماع و استماع شهود',
      deadlineDate: '۱۴۰۳/۰۸/۱۸',
      isEnforceable: true
    },
    {
      id: 'case-3',
      tribunalNumber: 'داوری-۱۴۰۳/۱۹۰',
      claimant: 'سرمایه‌گذاری آتیه سازان',
      respondent: 'شرکت فناوران تجارت هوشمند',
      arbitratorType: 'داور منفرد مرضی‌الطرفین',
      claimAmountToman: 1800000000,
      subject: 'اختلاف در انتقال سهام استارتاپ و عدم ایفای تعهدات موسسین',
      filingDate: '۱۴۰۳/۰۲/۲۵',
      status: 'رای صادر شد',
      deadlineDate: '۱۴۰۳/۰۵/۲۵',
      isEnforceable: true
    }
  ]);

  const nullityRiskScore = nullityGrounds.filter((g) => g.selected).length;

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 font-sans pb-24 selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]" dir="rtl">
      {/* Top Header */}
      <div className="bg-[#0B152F] border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Gavel className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  فاز ۳۵ تخصصی
                </span>
                <span className="text-xs text-slate-400">اتاق بازرگانی و داوری‌های تجاری</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white font-serif">
                سامانه جامع داوری تجاری، انشای رای داور و ابطال آراء (ماده ۴۸۹)
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

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 py-2 border-t border-slate-800/60 no-scrollbar">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'calculator'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>محاسبه حق‌الزحمه طبق آیین‌نامه مصوب</span>
          </button>

          <button
            onClick={() => setActiveTab('drafting_award')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'drafting_award'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>استودیو انشای رای نهایی و قطعی داوری</span>
          </button>

          <button
            onClick={() => setActiveTab('nullity_checker')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'nullity_checker'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>چک‌لیست جهات بطلان رای (ماده ۴۸۹ ق.آ.د.م)</span>
            {nullityRiskScore > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500/30 text-rose-300">
                {nullityRiskScore} ریسک
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('clause_vault')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'clause_vault'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>گاوصندوق شروط داوری استاندارد و مستقل</span>
          </button>

          <button
            onClick={() => setActiveTab('cases_tracker')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'cases_tracker'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>مدیریت پرونده‌های فعال داوری ({casesList.length})</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Header Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>پرونده‌های داوری در جریان</span>
              <Gavel className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="text-2xl font-bold text-white mt-2 font-mono">
              ۱۸ <span className="text-xs text-slate-400 font-normal">کلاسه داوری</span>
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">اتاق ایران، کانون و داور مرضی‌الطرفین</div>
          </div>

          <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>نرخ نفوذ و اجرای آراء</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-2 font-mono">
              ۹۴.۲٪ <span className="text-xs text-slate-400 font-normal">مصون از ابطال</span>
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">رعایت کامل ضوابط مواد ۴۸۲ و ۴۸۹</div>
          </div>

          <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>ارزش کل خواسته داوری‌ها</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-2 font-mono">
              ۳۴ <span className="text-xs text-slate-400 font-normal">میلیارد تومان</span>
            </div>
            <div className="text-[11px] text-amber-400 mt-1">دعاوی تجاری، پیمانکاری و پتروشیمی</div>
          </div>

          <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>میانگین مدت حل اختلاف</span>
              <Clock className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-2 font-mono">
              ۷۴ <span className="text-xs text-slate-400 font-normal">روز کاری</span>
            </div>
            <div className="text-[11px] text-cyan-400 mt-1">بسیار سریع‌تر از دادگاه‌های دولتی</div>
          </div>
        </div>

        {/* TAB 1: Tariff Calculator */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                  <Calculator className="w-5 h-5 text-[#D4AF37]" />
                  <span>محاسبه‌گر رسمی حق‌الزحمه داوری طبق آیین‌نامه مصوب قوه قضاییه (مصوب ۱۳۹۸)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  محاسبه دقیق دستمزد داور منفرد و هیئت ۳ نفره بر اساس نرخ‌های نزولی مصوب و سهم سازمان داوری.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    مبلغ خواسته اختلاف (تومان):
                  </label>
                  <input
                    type="number"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(Number(e.target.value))}
                    step={100000000}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:border-[#D4AF37] outline-none"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {(claimAmount / 1000000000).toFixed(2)} میلیارد تومان
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    ترکیب مرجع داوری:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSoleArbitrator(true)}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                        isSoleArbitrator
                          ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
                          : 'bg-slate-900 border-slate-700 text-slate-300'
                      }`}
                    >
                      داور منفرد (یک نفره)
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSoleArbitrator(false)}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                        !isSoleArbitrator
                          ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
                          : 'bg-slate-900 border-slate-700 text-slate-300'
                      }`}
                    >
                      هیئت داوری (۳ نفره)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    نهاد داوری برگزارکننده:
                  </label>
                  <select
                    value={institutionType}
                    onChange={(e) => setInstitutionType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#D4AF37] outline-none"
                  >
                    <option value="acic_chamber">مرکز داوری اتاق بازرگانی ایران (ACIC)</option>
                    <option value="bar_arbitration">مرکز داوری کانون وکلای دادگستری</option>
                    <option value="ad_hoc">داوری موردی (Ad-Hoc / اشخاص حقیقی)</option>
                  </select>
                </div>
              </div>

              {/* Calculated Outputs Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200">
                  <span className="text-xs text-slate-400 block">کل حق‌الزحمه داوری مصوب:</span>
                  <div className="text-2xl font-mono font-bold text-[#D4AF37] mt-1">
                    {calculatedFee.totalFee.toLocaleString()} تومان
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    بالمناصفه به عهده خواهان و خوانده داوری
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200">
                  <span className="text-xs text-slate-400 block">سهم اداری نهاد داوری (۲۰٪):</span>
                  <div className="text-2xl font-mono font-bold text-cyan-400 mt-1">
                    {calculatedFee.adminShare.toLocaleString()} تومان
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    هزینه ثبت، دبیرخانه و برگزاری جلسات
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200">
                  <span className="text-xs text-slate-400 block">
                    {isSoleArbitrator ? 'سهم خالص داور منفرد:' : 'سهم خالص هر یک از ۳ داور:'}
                  </span>
                  <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">
                    {calculatedFee.perArbitrator.toLocaleString()} تومان
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    پس از کسر مالیات تکلیفی مربوطه
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Award Drafting Studio */}
        {activeTab === 'drafting_award' && (
          <div className="space-y-6">
            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                  <FileText className="w-5 h-5 text-[#D4AF37]" />
                  <span>استودیو تخصصی انشای دادنامه و رای قطعی داوری تجاری</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  تدوین ساختاریافته رای داوری با ذکر گردش‌کار، ارزیابی دلایل، استنادات مواد ۴۵۴ تا ۵۰۱ قانون آیین دادرسی مدنی.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">مشخصات خواهان داوری:</label>
                  <input
                    type="text"
                    value={awardClaimant}
                    onChange={(e) => setAwardClaimant(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">مشخصات خوانده داوری:</label>
                  <input
                    type="text"
                    value={awardRespondent}
                    onChange={(e) => setAwardRespondent(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">سرداور / داور مرضی‌الطرفین:</label>
                  <input
                    type="text"
                    value={arbitratorName}
                    onChange={(e) => setArbitratorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">شماره و تاریخ قرارداد دارای شرط داوری:</label>
                  <input
                    type="text"
                    value={contractReference}
                    onChange={(e) => setContractReference(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleGenerateAward}
                  className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2f] text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-[#D4AF37]/20 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>انشای پیش‌نویس رای قطعی داوری</span>
                </button>
              </div>

              {awardBody && (
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      متن رسمی رای داوری جهت امضا و تسلیم به دفتر دادگاه عمومی حقوقی:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(awardBody);
                          setCopiedAward(true);
                          setTimeout(() => setCopiedAward(false), 2000);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedAward ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">کپی شد</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>کپی رای</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>چاپ دادنامه</span>
                      </button>
                    </div>
                  </div>

                  <textarea
                    rows={14}
                    value={awardBody}
                    onChange={(e) => setAwardBody(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 font-serif leading-7 text-xs sm:text-sm focus:border-[#D4AF37] outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Nullity Grounds Checker (Article 489) */}
        {activeTab === 'nullity_checker' && (
          <div className="space-y-6">
            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                    <span>ممیزی و ارزیابی جهات بطلان رای داور (ماده ۴۸۹ قانون آیین دادرسی مدنی)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    بررسی هفتگانه علل ابطال رای داوری جهت دفاع در محاکم عمومی حقوقی یا مصون‌سازی رای پیش از انشا.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">ریسک ابطال رای</span>
                  <div
                    className={`text-lg font-bold font-mono ${
                      nullityRiskScore > 0 ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {nullityRiskScore > 0 ? `${nullityRiskScore} بند آسیب‌پذیر` : 'فاقد ایراد (Safe)'}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {nullityGrounds.map((ground) => (
                  <div
                    key={ground.id}
                    onClick={() => {
                      setNullityGrounds((prev) =>
                        prev.map((g) => (g.id === ground.id ? { ...g, selected: !g.selected } : g))
                      );
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                      ground.selected
                        ? 'bg-rose-500/10 border-rose-500/50 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border mt-0.5 transition-colors ${
                          ground.selected
                            ? 'bg-rose-500 border-rose-500 text-white font-bold'
                            : 'border-slate-600 bg-slate-800'
                        }`}
                      >
                        {ground.selected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{ground.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-mono border border-slate-700">
                            {ground.code}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {ground.description}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${
                        ground.riskLevel === 'بحرانی'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {ground.riskLevel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Standard Clauses Vault */}
        {activeTab === 'clause_vault' && (
          <div className="space-y-6">
            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                  <BookOpen className="w-5 h-5 text-[#D4AF37]" />
                  <span>مخزن شروط داوری استاندارد، مستقل و چندمرحله‌ای برای قراردادها</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  نمونه بندهای آزموده شده حقوقی جهت درج در قراردادهای مشارکت، فروش، سرمایه‌گذاری و بازرگانی.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {arbitrationClauses.map((clause) => (
                  <div
                    key={clause.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-[#D4AF37]/40 space-y-3 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white font-serif">{clause.title}</h4>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                        {clause.type}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-serif leading-7 bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 text-justify">
                      {clause.text}
                    </p>

                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(clause.text);
                          alert('شرط داوری در حافظه کپی شد.');
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#D4AF37] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>کپی جهت الصاق به قرارداد</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Cases Tracker */}
        {activeTab === 'cases_tracker' && (
          <div className="space-y-6">
            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>پرونده‌های فعال هیئت داوری و داوران منفرد دفتر</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  نظارت بر مواعد صدور رای، تمدید مواعد و اقدامات اجرایی دادگاه.
                </p>
              </div>

              <span className="text-xs px-3 py-1 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono">
                {casesList.length} پرونده جاری
              </span>
            </div>

            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs sm:text-sm">
                  <thead className="bg-slate-900 text-slate-400 text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">کلاسه و موضوع پرونده</th>
                      <th className="py-3 px-4">طرفین اختلاف</th>
                      <th className="py-3 px-4">نوع داوری</th>
                      <th className="py-3 px-4">مبلغ خواسته</th>
                      <th className="py-3 px-4">مرحله کنونی</th>
                      <th className="py-3 px-4">مهلت صدور رای</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {casesList.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white text-xs">{item.tribunalNumber}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                            {item.subject}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-xs">
                          <div className="text-slate-200">خواهان: {item.claimant}</div>
                          <div className="text-[10px] text-slate-400">خوانده: {item.respondent}</div>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-amber-300">
                          {item.arbitratorType}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                          {(item.claimAmountToman / 1000000000).toFixed(2)} میلیارد
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                              item.status === 'رای صادر شد'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                          {item.deadlineDate}
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
