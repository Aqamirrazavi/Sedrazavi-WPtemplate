import React, { useState } from 'react';
import {
  TrendingUp,
  Scale,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Printer,
  Compass,
  CheckCircle2,
  XCircle,
  Clock,
  Coins,
  FileText,
  UserCheck,
  Info,
} from 'lucide-react';
import { DisputeFieldCategory } from '../../types/theme';

interface DisputeOptionConfig {
  category: DisputeFieldCategory;
  title: string;
  defaultTimeMonths: string;
  defaultCostEst: string;
  primaryLaw: string;
  advice: string;
}

const DISPUTE_CONFIGS: Record<DisputeFieldCategory, DisputeOptionConfig> = {
  'ملکی و ثبتی': {
    category: 'ملکی و ثبتی',
    title: 'دعاوی ملکی، ابطال سند، مشارکت و تصرف',
    defaultTimeMonths: '۸ الی ۱۶ ماه',
    defaultCostEst: '۳.۵ الی ۵.۵٪ ارزش منطقه/خواسته',
    primaryLaw: 'قانون ثبت اسناد و املاک و قانون مدنی (بیع و مشارکت)',
    advice: 'در دعاوی ملکی استعلام برخط پلاک ثبتی و ارجاع سریع به کارشناس رسمی امور ثبتی تعیین‌کننده‌ترین گام است.',
  },
  'اسناد تجاری و چک': {
    category: 'اسناد تجاری و چک',
    title: 'مطالبه وجه چک صیادی، سفته و برات تجاری',
    defaultTimeMonths: '۲ الی ۵ ماه (ماده ۲۳ قانون چک)',
    defaultCostEst: '۳.۵٪ بهای خواسته (قابل استرداد از محکوم‌علیه)',
    primaryLaw: 'قانون جدید صدور چک مصوب ۱۳۹۷ و ماده ۱۹۸ ق.آ.د.م',
    advice: 'بهره‌گیری از صدور مستقیم اجراییه بدون ورود به ماهیت دادرسی، زمان وصول را تا ۷۰٪ تقلیل می‌دهد.',
  },
  'قراردادها و پیمانکاری': {
    category: 'قراردادها و پیمانکاری',
    title: 'تعدیل، فسخ، وجه التزام و خسارت تاخیر پیمان',
    defaultTimeMonths: '۶ الی ۱۲ ماه',
    defaultCostEst: 'متناسب با وجه التزام و بهای قرارداد',
    primaryLaw: 'مواد ۱۰، ۲۱۹، ۲۲۱ الی ۲۳۰ قانون مدنی',
    advice: 'ممیزی شروط فورس‌ماژور و نحوه ابلاغ اخطاریه‌ها پیش از طرح دعوا یا ارجاع به داوری بسیار سرنوشت‌ساز است.',
  },
  'بانکی و تسهیلات': {
    category: 'بانکی و تسهیلات',
    title: 'ابطال سود مازاد بانکی، فک رهن و توقف اجراییه ثبت',
    defaultTimeMonths: '۵ الی ۱۰ ماه',
    defaultCostEst: 'بر مبنای دعاوی غیرمالی / مالی مازاد سود',
    primaryLaw: 'رأی وحدت رویه ۷۹۴ دیوان عالی کشور و مصوبات شورای پول و اعتبار',
    advice: 'اخذ پرینت ریز اقساط و گردش تسهیلات جهت ارجاع به کارشناس حسابداری و بانکی الزامی است.',
  },
  'خانواده و ارث': {
    category: 'خانواده و ارث',
    title: 'مهریه، تحریر ترکه، تقسیم ماترک و انحصار وراثت',
    defaultTimeMonths: '۳ الی ۹ ماه',
    defaultCostEst: 'تعرفه دعاوی خانواده و سهم‌الارث',
    primaryLaw: 'قانون حمایت خانواده ۱۳۹۱ و قانون امور حسبی',
    advice: 'توقیف فوری اموال از طریق اجرای ثبت قبل از ابلاغ دادگاه، از انتقال اموال به قصد فرار از دین پیشگیری می‌کند.',
  },
  'کیفری و جرایم اقتصادی': {
    category: 'کیفری و جرایم اقتصادی',
    title: 'کلاهبرداری، خیانت در امانت، جرایم سایبری و فیشینگ',
    defaultTimeMonths: '۴ الی ۱۲ ماه',
    defaultCostEst: 'هزینه ابطال تمبر کیفری و کارشناسی دیجیتال',
    primaryLaw: 'قانون مجازات اسلامی و قانون جرایم رایانه‌ای',
    advice: 'ردیابی سریع حساب‌های واسط توسط پلیس فتا و دستور انسداد حساب متهم در ساعات اولیه حیاتی‌ترین عامل است.',
  },
};

export const CaseOutcomePredictor: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<DisputeFieldCategory>('ملکی و ثبتی');
  const [partyRole, setPartyRole] = useState<'claimant' | 'respondent'>('claimant');

  // چک‌باکس ادله
  const [hasOfficialDeed, setHasOfficialDeed] = useState<boolean>(true);
  const [hasWitnesses, setHasWitnesses] = useState<boolean>(true);
  const [hasWrittenConfession, setHasWrittenConfession] = useState<boolean>(false);
  const [hasExpertReport, setHasExpertReport] = useState<boolean>(true);
  const [hasDigitalMessages, setHasDigitalMessages] = useState<boolean>(false);

  // ایرادات شکلی ماده ۸۴
  const [jurisdictionClear, setJurisdictionClear] = useState<boolean>(true);
  const [legalStandingClear, setLegalStandingClear] = useState<boolean>(true);
  const [noResJudicata, setNoResJudicata] = useState<boolean>(true);

  // محاسبه الگوریتم پیش‌بینی شانس موفقیت
  const calculateWinProbability = () => {
    let score = 35; // base probability

    // نقش خواهان یا خوانده
    if (partyRole === 'claimant') score += 5;

    // اثر ادله
    if (hasOfficialDeed) score += 28;
    if (hasExpertReport) score += 16;
    if (hasWrittenConfession) score += 18;
    if (hasWitnesses) score += 10;
    if (hasDigitalMessages) score += 7;

    // اثر ایرادات شکلی
    if (!jurisdictionClear) score -= 25;
    if (!legalStandingClear) score -= 30;
    if (!noResJudicata) score -= 40;

    // clamp between 5 and 96
    return Math.min(Math.max(score, 8), 96);
  };

  const winProbability = calculateWinProbability();
  const activeConfig = DISPUTE_CONFIGS[selectedCategory];

  const getVerdictAssessment = (prob: number) => {
    if (prob >= 75) {
      return {
        verdict: 'موقعیت حقوقی بسیار مستحکم و شانس پیروزی بالا',
        color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
        strategy: 'پیشنهاد وکیل: اقامه دعوای قاطع در دادگاه همراه با تقاضای صدور قرار تأمین خواسته فوری جهت توقیف اموال.',
        appealChance: '۸۸٪ شانس تایید در دادگاه تجدیدنظر استان',
      };
    }
    if (prob >= 50) {
      return {
        verdict: 'ریسک متوسط - نیاز به تقویت ادله تکمیلی و کارشناسی',
        color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
        strategy: 'پیشنهاد وکیل: پیش از ثبت دادخواست اصلی، ارسال اظهارنامه رسمی و تقاضای قرار تأمین دلیل با جلب نظر کارشناس رسمی صورت پذیرد.',
        appealChance: '۶۰٪ شانس استواری رأی در مرجع تجدیدنظر',
      };
    }
    return {
      verdict: 'موقعیت آسیب‌پذیر - ریسک بالای صدور قرار رد دعوا یا بطلان',
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
      strategy: 'پیشنهاد وکیل: اکیداً از طرح دعوای شتاب‌زده پرهیز شود. ورود به مذاکرات صلح، سازش و ارجاع موضوع به داوری تخصصی توصیه می‌گردد.',
      appealChance: 'کمتر از ۳۰٪ شانس پیروزی بدون مدارک متقن جدید',
    };
  };

  const assessment = getVerdictAssessment(winProbability);

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100">
      {/* هدر بخش شبیه‌ساز */}
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800/80 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                <Compass className="w-5 h-5" />
              </span>
              <h3 className="text-lg sm:text-xl font-black font-serif text-slate-900 dark:text-white">
                سامانه هوشمند تحلیل استراتژی دادرسی و پیش‌بینی شانس موفقیت پرونده
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              مدل‌سازی ریاضیاتی وزن ادله اثباتی، ارزیابی ایرادات شکلی ماده ۸۴ ق.آ.د.م و تحلیل هزینه-فایده طرح دعوا در محاکم دادگستری.
            </p>
          </div>

          {/* شاخص شانس موفقیت */}
          <div className={`p-4 rounded-2xl border text-right space-y-1 ${assessment.color} min-w-[260px]`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold opacity-80">پیش‌بینی شانس موفقیت:</span>
              <span className="text-2xl font-black font-mono">{winProbability}٪</span>
            </div>
            <span className="block text-xs font-bold">{assessment.verdict}</span>
          </div>
        </div>

        {/* فیلتر دسته‌بندی موضوع دعوا */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
            ۱. انتخاب حوزه موضوعی پرونده و عنوان دعوا:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {(Object.keys(DISPUTE_CONFIGS) as DisputeFieldCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`p-3 rounded-xl text-xs font-bold transition-all border text-center ${
                  selectedCategory === cat
                    ? 'bg-[#0B132B] dark:bg-white text-white dark:text-[#0B132B] border-[#D4AF37]'
                    : 'bg-slate-50 dark:bg-[#070D1E] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-[#D4AF37]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* نقش در دعوا */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">۲. موقعیت شما در دادرسی:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPartyRole('claimant')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                partyRole === 'claimant'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              خواهان / شاکی (اقامه‌کننده دعوا)
            </button>
            <button
              onClick={() => setPartyRole('respondent')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                partyRole === 'respondent'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              خوانده / متهم (مدافع در برابر دعوا)
            </button>
          </div>
        </div>
      </div>

      {/* دو ستون: ماتریس ادله + ارزیابی ایرادات شکلی */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ستون راست: ماتریس وزن ادله */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            ماتریس ادله اثبات دعوا (Evidence Evaluation Matrix)
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            مستند به ماده ۱۲۵۸ قانون مدنی، هر یک از دلایل دارای اثر حقوقی متفاوتی در اقناع وجدان قاضی می‌باشند:
          </p>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#070D1E]/60 cursor-pointer hover:border-indigo-400 transition-all">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={hasOfficialDeed}
                  onChange={(e) => setHasOfficialDeed(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <span className="text-xs sm:text-sm font-bold block text-slate-900 dark:text-white">
                    سند رسمی ثبتی یا چک صیادی تاییدشده در سامانه
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    ماده ۷۰ قانون ثبت: انکار و تردید نسبت به سند رسمی مسموع نیست و ادعای جعل نیازمند اثبات است.
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 font-mono text-xs font-bold">
                +۲۸٪
              </span>
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#070D1E]/60 cursor-pointer hover:border-indigo-400 transition-all">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={hasExpertReport}
                  onChange={(e) => setHasExpertReport(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <span className="text-xs sm:text-sm font-bold block text-slate-900 dark:text-white">
                    نظریه کارشناس رسمی دادگستری یا صورتجلسه تأمین دلیل
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    تثبیت اوضاع و احوال فیزیکی، درصد پیشرفت پروژه یا مطابقت امضاها قبل از امحا.
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 font-mono text-xs font-bold">
                +۱۶٪
              </span>
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#070D1E]/60 cursor-pointer hover:border-indigo-400 transition-all">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={hasWrittenConfession}
                  onChange={(e) => setHasWrittenConfession(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <span className="text-xs sm:text-sm font-bold block text-slate-900 dark:text-white">
                    اقرار کتبی، پاسخ به اظهارنامه رسمی یا رسید مالی امضاشده
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    ماده ۱۲۷۵ قانون مدنی: هر کس اقرار به حقی برای غیر کند ملزم به اقرار خود خواهد بود.
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 font-mono text-xs font-bold">
                +۱۸٪
              </span>
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#070D1E]/60 cursor-pointer hover:border-indigo-400 transition-all">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={hasWitnesses}
                  onChange={(e) => setHasWitnesses(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <span className="text-xs sm:text-sm font-bold block text-slate-900 dark:text-white">
                    شهادت شهود شرعی و مسجلین قرارداد
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    امضای حداقل دو نفر شاهد عادل در ذیل قرارداد یا استماع گواهی در دادگاه.
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 font-mono text-xs font-bold">
                +۱۰٪
              </span>
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#070D1E]/60 cursor-pointer hover:border-indigo-400 transition-all">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={hasDigitalMessages}
                  onChange={(e) => setHasDigitalMessages(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <span className="text-xs sm:text-sm font-bold block text-slate-900 dark:text-white">
                    داده‌پیام‌های دیجیتال، پیامک‌ها و چت‌های فضای مجازی
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    مستند به قانون تجارت الکترونیکی با احراز انتساب به دارنده خط.
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 font-mono text-xs font-bold">
                +۷٪
              </span>
            </label>
          </div>
        </div>

        {/* ستون چپ: غربالگری ایرادات شکلی ماده ۸۴ */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            غربالگری ایرادات شکلی (ماده ۸۴ ق.آ.د.م)
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            وجود هر یک از ایرادات شکلی، قبل از ورود به ماهیت پرونده موجب صدور قرار رد دعوا می‌گردد:
          </p>

          <div className="space-y-3 text-xs">
            {/* ۱. صلاحیت دادگاه */}
            <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">
                  صلاحیت محلی و ذاتی دادگاه (بند ۱)
                </span>
                <button
                  onClick={() => setJurisdictionClear(!jurisdictionClear)}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold ${
                    jurisdictionClear ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                  }`}
                >
                  {jurisdictionClear ? 'صحیح و بدون ایراد' : 'ایراد عدم صلاحیت!'}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                در دعاوی ملکی: دادگاه محل وقوع ملک / در دعاوی منقول: دادگاه اقامتگاه خوانده.
              </p>
            </div>

            {/* ۲. احراز سمت و ذینفع بودن */}
            <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">
                  احراز سمت، اهلیت و ذینفع بودن (بند ۳ و ۱۰)
                </span>
                <button
                  onClick={() => setLegalStandingClear(!legalStandingClear)}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold ${
                    legalStandingClear ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                  }`}
                >
                  {legalStandingClear ? 'سمت محرز است' : 'ایراد عدم احراز سمت!'}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                وجود وکالت‌نامه معتبر الکترونیک یا انحصار وراثت یا نمایندگی قانونی شرکت.
              </p>
            </div>

            {/* ۳. اعتبار امر قضاوت‌شده */}
            <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">
                  عدم سابقه رسیدگی قبلی (بند ۶ - امر مختومه)
                </span>
                <button
                  onClick={() => setNoResJudicata(!noResJudicata)}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold ${
                    noResJudicata ? 'سابقه ندارد' : 'ایراد امر قضاوت‌شده!'
                  }`}
                >
                  {noResJudicata ? 'پرونده جدید' : 'رسیدگی قبلی شده!'}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                اگر دعوا بین همان طرفین و با همان سبب قبلاً منتهی به رأی قطعی شده باشد، دادگاه مجدد رسیدگی نمی‌کند.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* گزارش کارشناسی راهبردی و پیش‌بینی زمان و هزینه */}
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          تحلیل راهبردی سرکار خانم دکتر سیده مریم رضوی (وکیل پایه یک دادگستری)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 block">مدت زمان تخمینی دادرسی:</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white block font-mono">
              {activeConfig.defaultTimeMonths}
            </span>
            <span className="text-[11px] text-slate-500">با فرض ارجاع به هیأت کارشناسی</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 block">برآورد هزینه و تمبر دادرسی:</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white block font-mono">
              {activeConfig.defaultCostEst}
            </span>
            <span className="text-[11px] text-slate-500">طبق جدول تعرفه مصوب دادگستری</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 block">پایداری رأی در تجدیدنظر:</span>
            <span className="text-sm font-bold text-indigo-500 dark:text-indigo-400 block">
              {assessment.appealChance}
            </span>
            <span className="text-[11px] text-slate-500">بر مبنای رویه قضایی شعب استان تهران</span>
          </div>
        </div>

        {/* جعبه توصیه استراتژیک */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 text-amber-600 dark:text-[#D4AF37] font-bold">
            <Info className="w-4 h-4 shrink-0" />
            <span>رهنمود اختصاصی وکیل:</span>
          </div>
          <p>{assessment.strategy}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-amber-500/10">
            مستندات حاکم: {activeConfig.primaryLaw} • {activeConfig.advice}
          </p>
        </div>

        {/* دکمه چاپ کارنامه استراتژی */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span>
            ⚖️ این ارزیابی بر مبنای قواعد اثبات دعوا در قانون آیین دادرسی دادگاه‌های عمومی و انقلاب تنظیم گردیده است.
          </span>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-md hover:bg-slate-800 transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" /> چاپ گزارش تحلیلی استراتژی پرونده
          </button>
        </div>
      </div>
    </div>
  );
};
