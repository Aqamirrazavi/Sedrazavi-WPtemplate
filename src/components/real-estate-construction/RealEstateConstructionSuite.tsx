import React, { useState, useMemo } from 'react';
import {
  Building2,
  HardHat,
  Home,
  FileSpreadsheet,
  Calculator,
  Scale,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Landmark,
  Layers,
  ChevronLeft,
  CheckCircle2,
  HelpCircle,
  Clock,
  Printer,
  Copy,
  Sparkles,
  Download,
  Info,
} from 'lucide-react';
import { ATTORNEY_INFO } from '../../data/mockData';

// Types for Real Estate & Construction Suite
export interface PartnershipShareInput {
  landArea: number; // متراژ زمین به متر مربع
  landValuePerMeter: number; // ارزش هر متر مربع زمین (تومان)
  builtAreaTotal: number; // کل متراژ مفید احداثی (متر مربع)
  costPerMeterBuild: number; // هزینه ساخت هر متر مربع بنای مفید و مشاعات (تومان)
  gratuitousAmount: number; // مبلغ بلاعوض پرداختی سازنده به مالک (تومان)
}

export interface GoodwillAssessmentInput {
  lawVersion: '1356' | '1376';
  evictionReason: 'change_job' | 'dilapidation' | 'transfer_to_other' | 'non_payment' | 'rebuilding' | 'personal_need';
  marketRentRate: number; // اجاره روز برآورد شده
  locationTier: 'prime_commercial' | 'standard_commercial' | 'fringe_commercial';
  tenancyYears: number; // سابقه تصرف مستأجر
}

export const RealEstateConstructionSuite: React.FC<{
  onOpenBooking?: () => void;
  onBackToHome?: () => void;
}> = ({ onOpenBooking, onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<
    'partnership_calc' | 'goodwill_audit' | 'municipal_commissions' | 'petition_generator'
  >('partnership_calc');

  // 1. Partnership in Construction Calculator state
  const [calcInput, setCalcInput] = useState<PartnershipShareInput>({
    landArea: 350,
    landValuePerMeter: 120000000, // ۱۲۰ میلیون تومان
    builtAreaTotal: 1400,
    costPerMeterBuild: 30000000, // ۳۰ میلیون تومان
    gratuitousAmount: 2000000000, // ۲ میلیارد تومان بلاعوض
  });

  const partnershipResult = useMemo(() => {
    const totalLandValue = calcInput.landArea * calcInput.landValuePerMeter;
    const totalBuildCost = calcInput.builtAreaTotal * calcInput.costPerMeterBuild;
    
    // Net contribution: Owner brings Land minus gratuitous received; Builder brings Build Cost plus gratuitous paid
    const ownerNetContribution = totalLandValue - calcInput.gratuitousAmount;
    const builderNetContribution = totalBuildCost + calcInput.gratuitousAmount;
    const totalProjectInvestment = ownerNetContribution + builderNetContribution;

    const ownerPercentage = totalProjectInvestment > 0 ? (ownerNetContribution / totalProjectInvestment) * 100 : 50;
    const builderPercentage = totalProjectInvestment > 0 ? (builderNetContribution / totalProjectInvestment) * 100 : 50;

    const ownerMeters = (calcInput.builtAreaTotal * ownerPercentage) / 100;
    const builderMeters = (calcInput.builtAreaTotal * builderPercentage) / 100;

    return {
      totalLandValue,
      totalBuildCost,
      ownerNetContribution,
      builderNetContribution,
      totalProjectInvestment,
      ownerPercentage: Number(ownerPercentage.toFixed(1)),
      builderPercentage: Number(builderPercentage.toFixed(1)),
      ownerMeters: Number(ownerMeters.toFixed(1)),
      builderMeters: Number(builderMeters.toFixed(1)),
    };
  }, [calcInput]);

  // 2. Goodwill (سرقفلی و حق کسب و پیشه) assessment state
  const [goodwillInput, setGoodwillInput] = useState<GoodwillAssessmentInput>({
    lawVersion: '1356',
    evictionReason: 'transfer_to_other',
    marketRentRate: 40000000,
    locationTier: 'prime_commercial',
    tenancyYears: 25,
  });

  const goodwillRuling = useMemo(() => {
    if (goodwillInput.lawVersion === '1356') {
      // قانون روابط موجر و مستأجر سال ۱۳۵۶ (حق کسب و پیشه و تجارت)
      switch (goodwillInput.evictionReason) {
        case 'transfer_to_other':
          return {
            compensation: 'نصف حق کسب و پیشه و تجارت (۵۰٪)',
            description: 'در صورت انتقال مورد اجاره به غیر بدون اذن مالک یا عدم وجود حق انتقال در سند، دادگاه حکم به تخلیه در قبال پرداخت ۵۰ درصد حق کسب و پیشه صادر می‌نماید.',
            severity: 'warning',
            legalBasis: 'ماده ۱۹ قانون روابط موجر و مستأجر سال ۱۳۵۶',
          };
        case 'change_job':
          return {
            compensation: 'صفر (سقوط کامل حق کسب و پیشه بدون دریافت ریالی وجه)',
            description: 'تغییر شغل بدون اذن صریح موجر از موارد فسخ و تخلیه فوری بدون استحقاق مستأجر برای دریافت حق کسب و پیشه می‌باشد.',
            severity: 'danger',
            legalBasis: 'بند ۷ ماده ۱۴ قانون ۱۳۵۶',
          };
        case 'dilapidation':
          return {
            compensation: 'صفر (سقوط کامل حق کسب و پیشه به علت تعدی یا تفریط)',
            description: 'ایجاد تغییرات اساسی در اسکلت یا تخریب بخش‌هایی از عین مستأجره که تعدی یا تفریط شناخته شود موجب تخلیه بلاعوض است.',
            severity: 'danger',
            legalBasis: 'بند ۸ ماده ۱۴ قانون ۱۳۵۶',
          };
        case 'non_payment':
          return {
            compensation: 'صفر (تخلیه بدون پرداخت حق کسب و پیشه پس از ارسال اظهارنامه)',
            description: 'عدم پرداخت مال‌الاجاره ظرف ۱۰ روز پس از ابلاغ اخطاریه یا اظهارنامه رسمی، موجب تخلیه بدون حق کسب و پیشه است.',
            severity: 'danger',
            legalBasis: 'بند ۹ ماده ۱۴ قانون ۱۳۵۶',
          };
        case 'rebuilding':
        case 'personal_need':
          return {
            compensation: '۱۰۰٪ حق کسب و پیشه و تجارت به نرخ عادلانه روز با ارجاع به کارشناس رسمی',
            description: 'تخلیه به جهت نوسازی و احداث بنای جدید (با ارائه پروانه ساختمانی) یا نیاز شخصی موجر برای کسب و کار، مشروط به تودیع تمام حق کسب و پیشه در صندوق دادگستری است.',
            severity: 'success',
            legalBasis: 'ماده ۱۵ قانون روابط موجر و مستأجر ۱۳۵۶',
          };
      }
    } else {
      // قانون روابط موجر و مستأجر سال ۱۳۷۶ (سرقفلی)
      return {
        compensation: 'سرقفلی به قیمت عادله روز (در صورت اثبات پرداخت وجه سرقفلی در ابتدای اجاره یا شرط ضمن عقد)',
        description: 'در شمول قانون ۱۳۷۶، اصل بر عدم استحقاق حق کسب و پیشه است مگر اینکه مستأجر در بدو قرارداد مبلغی را تحت عنوان سرقفلی به موجر پرداخته باشد یا شرایط ماده ۶ تا ۱۰ قانون ۷۶ احراز گردد.',
        severity: 'info',
        legalBasis: 'مواد ۶ الی ۱۰ قانون روابط موجر و مستأجر سال ۱۳۷۶',
      };
    }
  }, [goodwillInput]);

  // 3. Municipal Commission & Land Disputes (کمیسیون ماده ۱۰۰ و ۹۹ شهرداری)
  const municipalRules = [
    {
      title: 'کمیسیون ماده ۱۰۰ (تخلفات ساختمانی درون‌شهری)',
      sub: 'بررسی آرای قلع و قمع و جریمه‌های تراکم مازاد',
      icon: '🏢',
      clauses: [
        'تخلف احداث بنای مازاد بر پروانه (تراکم اضافی): جریمه از یک دوم تا سه برابر ارزش معاملاتی زمین برای هر متر مربع بنای اضافی.',
        'کسری یا حذف پارکینگ: در صورت عدم امکان فنی احداث پارکینگ، جریمه از یک برابر تا دو برابر ارزش معاملاتی ساختمان.',
        'تبدیل کاربری مسکونی به تجاری یا خدماتی: حکم به تعطیل محل و در صورت عدم اعاده، ارجاع به کمیسیون تجدیدنظر یا قلع بنا.',
        'مهلت اعتراض: ۱۰ روز از تاریخ ابلاغ رأی بدوی جهت تجدیدنظرخواهی، و ۳ ماه جهت فرجام‌خواهی در دیوان عدالت اداری.',
      ],
    },
    {
      title: 'کمیسیون ماده ۹۹ (ساخت‌وساز خارج از محدوده و حریم شهرها)',
      sub: 'اراضی کشاورزی، باغ‌ها و حریم روستاها',
      icon: '🌾',
      clauses: [
        'قانون حفظ کاربری اراضی زراعی و باغ‌ها (مصوب ۱۳۷۴ و اصلاحی ۱۳۸۵): قلع و قمع مستحدثات غیرمجاز و جزای نقدی تا سه برابر بهای اراضی.',
        'تبصره ۲ ماده ۱۰: اختیار جهاد کشاورزی و دادستان در تخریب فوری دیوارکشی‌ها و فنس‌کشی‌های غیرمجاز بدون نیاز به حکم قطعی.',
        'استثنائات قانونی: احداث گلخانه، دامداری، مرغداری، استخر پرورش ماهی و صنایع تبدیلی تبدیلی با اخذ مجوز کمیسیون تبصره ۱ ماده ۱.',
      ],
    },
    {
      title: 'دعاوی ثبتی و املاک مشاع (افراز و دستور فروش)',
      sub: 'تحدید حدود، اخذ سند تفکیکی و خلع ید مشاعی',
      icon: '📜',
      clauses: [
        'گواهی عدم افراز اداره ثبت اسناد و املاک: پیش‌شرط الزامی طرح دادخواست دستور فروش ملک مشاع در دادگاه عمومی حقوقی.',
        'دعوای الزام به تنظیم سند رسمی: مستلزم طرف دعوا قراردادن تمامی ایادی قبلی تا مالک رسمی ثبت‌شده در دفتر املاک.',
        'دستور موقت و تأمین خواسته: توقیف پلاک ثبتی در اداره ثبت اسناد برای جلوگیری از انتقال به شخص ثالث در حین دادرسی.',
      ],
    },
  ];

  // 4. Pleading generator state
  const [selectedPleading, setSelectedPleading] = useState<'deed_transfer' | 'article_100_appeal' | 'presale_penalty'>('deed_transfer');
  const [copiedPleading, setCopiedPleading] = useState(false);

  const pleadingsTemplates = {
    deed_transfer: {
      title: 'دادخواست الزام به تنظیم سند رسمی، پایان‌کار و صورت‌مجلس تفکیکی',
      court: 'دادگاه عمومی حقوقی محل وقوع ملک',
      content: `بسمه تعالی
ریاست محترم دادگاه عمومی حقوقی
موضوع: دادخواست الزام به ایفای تعهدات قراردادی، اخذ پایان‌کار، صورت‌مجلس تفکیکی و تنظیم سند رسمی انتقال

خواهان: [مشخصات خریدار / وکیل ایشان سرکار خانم دکتر سیده مریم رضوی]
خوانده: [مشخصات فروشنده / مالک رسمی پلاک ثبتی]
خواسته:
۱. صدور حکم به الزام خوانده به اخذ گواهی پایان‌کار ساختمانی و صورت‌مجلس تفکیکی از شهرداری و اداره ثبت اسناد و املاک.
۲. الزام خوانده به حضور در دفترخانه اسناد رسمی شماره [...] و انتقال قطعی شش‌دانگ یک دستگاه آپارتمان مسکونی به پلاک ثبتی [...] فرعی از [...] اصلی.
۳. محکومیت خوانده به پرداخت خسارت تأخیر در اجرای تعهد (وجه التزام قراردادی) از تاریخ مقرر در مبایعه‌نامه لغایت اجرای دادنامه قطعی، روزانه به مبلغ [...] ریال مستند به ماده ۲۳۰ قانون مدنی.
۴. پرداخت کلیه خسارات دادرسی شامل هزینه دادرسی، حق‌الوکاله وکیل طبق تعرفه قانونی.

شرح دادخواست:
احتراماً به استحضار عالی می‌رساند موکل به موجب مبایعه‌نامه عادی شماره [...] مورخ [...] شش‌دانگ آپارتمان مذکور را از خوانده خریداری نموده و ثمن معامله را در مواعد مقرر پرداخت کرده است. خوانده متعهد بوده تا تاریخ [...] نسبت به اخذ پایان‌کار و انتقال سند رسمی اقدام نماید لکن علی‌رغم وصول گواهی عدم حضور دفترخانه، از ایفای تعهد استنکاف ورزیده است. علی‌هذا استدعای صدور حکم شایسته بر وفق خواسته را دارد.`,
    },
    article_100_appeal: {
      title: 'لایحه اعتراضیه به رأی کمیسیون بدوی ماده ۱۰۰ شهرداری (در دیوان عدالت اداری)',
      court: 'شعب بدوی دیوان عدالت اداری',
      content: `بسمه تعالی
ریاست و مستشاران محترم دیوان عدالت اداری
موضوع: دادخواست نقض رأی شماره [...] مورخ [...] صادره از کمیسیون بدوی ماده ۱۰۰ قانون شهرداری

شاکی: [مشخصات مالک پلاک ثبتی]
طرف شکایت: شهرداری منطقه [...]
موضوع خواسته: نقض رأی کمیسیون مبنی بر قلع و قمع بنا و صدور دستور موقت بر توقف اجرای حکم مستند به ماده ۳۴ قانون دیوان عدالت اداری.

دلایل و جهات بطلان رأی:
۱. عدم رعایت اصول فنی، بهداشتی و شهرسازی: بنای احداثی وفق نظریه کارشناس رسمی دادگستری در رشته سازه و معماری، فاقد هرگونه خطر ریزش و کاملاً مطابق مقررات ملی ساختمان (مبحث نهم و دهم) احداث شده و صدور حکم تخریب با اصل تناسب تخلف و مجازات مغایر است.
۲. تخلف از وحدت رویه شماره ۲۱۵ هیأت عمومی دیوان عدالت اداری: در مواردی که امکان اخذ جریمه متناسب با ارزش معاملاتی وجود دارد، اولویت قانون‌گذار بر بقای مستحدثات و وصول جریمه قانونی است و تخریب بنا موجب اتلاف اموال مشروع شهروندان می‌گردد.
۳. استدعای صدور دستور موقت عاجل جهت جلوگیری از تخریب بنا پیش از رسیدگی ماهوی.`,
    },
    presale_penalty: {
      title: 'دادخواست مطالبه خسارت تأخیر تحویل مبیع در قرارداد پیش‌فروش ساختمان',
      court: 'دادگاه عمومی حقوقی',
      content: `بسمه تعالی
ریاست محترم دادگاه عمومی حقوقی
موضوع: مطالبه وجه التزام و خسارات تأخیر در تحویل واحدهای پیش‌فروش شده مستند به قانون پیش‌فروش ساختمان مصوب ۱۳۸۹

خواهان: [پیش‌خریدار]
خوانده: [پیش‌فروشنده / انبوه‌ساز]
خواسته:
محکومیت خوانده به پرداخت جریمه دیرکرد تحویل واحد مسکونی بر مبنای ماده ۶ قانون پیش‌فروش ساختمان (معادل اجاره‌بهای ماهانه طبق نظر کارشناس رسمی یا روزانه توافق‌شده در قرارداد) از تاریخ [...] لغایت تحویل فیزیکی با احتساب کلیه خسارات دادرسی.

مستندات قانونی:
به موجب ماده ۶ قانون پیش‌فروش ساختمان، چنانچه پیش‌فروشنده در تاریخ مقرر نتواند ساختمان را تحویل دهد، مکلف است به ازای هر ماه تأخیر خسارت مقرر قانونی را پرداخت نماید و اسقاط این حق در قراردادهای عادی نیز بلااثر و خلاف نظم عمومی آمره است.`,
    },
  };

  const handleCopyPleading = () => {
    navigator.clipboard.writeText(pleadingsTemplates[selectedPleading].content);
    setCopiedPleading(true);
    setTimeout(() => setCopiedPleading(false), 2500);
  };

  return (
    <div className="space-y-8 text-right pb-16 font-persian" id="real-estate-suite">
      
      {/* 1. Header Banner */}
      <header className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B132B] via-[#14213d] to-[#0B132B] p-6 sm:p-10 text-white shadow-2xl border border-[#D4AF37]/30">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
            <Building2 className="w-4 h-4" />
            <span>سامانه تخصصی فاز ۱۲: دعاوی ملکی، سرقفلی و قراردادهای ساخت‌وساز</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
            میز تخصصی حقوق اراضی، ساخت‌وساز و سرقفلی
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            محاسبه‌گر پیشرفته قدرالسهم قراردادهای مشارکت در ساخت، غربالگری حقوقی سرقفلی و حق کسب و پیشه (قوانین ۱۳۵۶ و ۱۳۷۶)، آراء کمیسیون ماده ۱۰۰ شهرداری، و مخزن دادخواست‌های تخصصی الزام به تنظیم سند.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B132B] text-xs font-bold shadow-lg hover:bg-[#c49f30] transition-all flex items-center gap-1.5"
            >
              <Scale className="w-4 h-4" />
              <span>مشاوره تخصصی با وکیل دعاوی ملکی</span>
            </button>

            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-gray-200 transition-colors border border-white/10"
              >
                بازگشت به صفحه اصلی
              </button>
            )}
          </div>
        </div>

        <div className="absolute left-8 bottom-4 opacity-10 pointer-events-none hidden lg:block">
          <Building2 className="w-48 h-48 text-[#D4AF37]" />
        </div>
      </header>

      {/* 2. Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm">
        <button
          onClick={() => setActiveTab('partnership_calc')}
          className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'partnership_calc'
              ? 'bg-[#D4AF37] text-[#0B132B] shadow-md font-black'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <HardHat className="w-4 h-4" />
          <span>محاسبه‌گر قدرالسهم مشارکت در ساخت</span>
        </button>

        <button
          onClick={() => setActiveTab('goodwill_audit')}
          className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'goodwill_audit'
              ? 'bg-[#D4AF37] text-[#0B132B] shadow-md font-black'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>ممیزی سرقفلی و حق کسب و پیشه</span>
        </button>

        <button
          onClick={() => setActiveTab('municipal_commissions')}
          className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'municipal_commissions'
              ? 'bg-[#D4AF37] text-[#0B132B] shadow-md font-black'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>کمیسیون ماده ۱۰۰ و دعاوی اراضی</span>
        </button>

        <button
          onClick={() => setActiveTab('petition_generator')}
          className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'petition_generator'
              ? 'bg-[#D4AF37] text-[#0B132B] shadow-md font-black'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>تنظیم لایحه و دادخواست ملکی</span>
        </button>
      </div>

      {/* TAB 1: Partnership in Construction Calculator */}
      {activeTab === 'partnership_calc' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#D4AF37] flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                  فرمول استاندارد قدرالسهم طرفین و ارزش بلاعوض
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  بر مبنای ارزش معاملاتی زمین در منطقه و برآورد فنی هزینه ساخت هر متر مربع بنای مفید.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300">
                  متراژ کل زمین (متر مربع):
                </label>
                <input
                  type="number"
                  min="50"
                  max="10000"
                  value={calcInput.landArea}
                  onChange={(e) => setCalcInput({ ...calcInput, landArea: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300">
                  ارزش هر متر مربع زمین (تومان):
                </label>
                <input
                  type="number"
                  step="5000000"
                  value={calcInput.landValuePerMeter}
                  onChange={(e) => setCalcInput({ ...calcInput, landValuePerMeter: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#D4AF37]"
                />
                <span className="text-[10px] text-gray-400">
                  {(calcInput.landValuePerMeter / 1000000).toLocaleString('fa-IR')} میلیون تومان
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300">
                  کل متراژ مفید احداثی (متر مربع):
                </label>
                <input
                  type="number"
                  min="100"
                  max="20000"
                  value={calcInput.builtAreaTotal}
                  onChange={(e) => setCalcInput({ ...calcInput, builtAreaTotal: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300">
                  هزینه ساخت هر متر مربع بنای مفید (تومان):
                </label>
                <input
                  type="number"
                  step="2000000"
                  value={calcInput.costPerMeterBuild}
                  onChange={(e) => setCalcInput({ ...calcInput, costPerMeterBuild: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#D4AF37]"
                />
                <span className="text-[10px] text-gray-400">
                  {(calcInput.costPerMeterBuild / 1000000).toLocaleString('fa-IR')} میلیون تومان
                </span>
              </div>

              <div className="sm:col-span-2 space-y-1.5 pt-2 border-t border-gray-100 dark:border-gray-800">
                <label className="font-bold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                  <span>مبلغ بلاعوض پرداختی سازنده به مالک (تومان):</span>
                  <span className="text-[#D4AF37] font-bold">
                    {(calcInput.gratuitousAmount / 1000000000).toFixed(2)} میلیارد تومان
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="20000000000"
                  step="500000000"
                  value={calcInput.gratuitousAmount}
                  onChange={(e) => setCalcInput({ ...calcInput, gratuitousAmount: Number(e.target.value) })}
                  className="w-full accent-[#D4AF37]"
                />
                <p className="text-[11px] text-gray-400">
                  بلاعوض مبلغی است که سازنده برای تعدیل درصد مشارکت یا جبران اجاره‌نشینی در طول مدت تخریب و احداث به مالک پرداخت می‌کند.
                </p>
              </div>

            </div>

            {/* Legal Advisory Note */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>شروط طلایی در قرارداد مشارکت در ساخت:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
                <li>اعطای وکالت کاری فقط محدود به اخذ پروانه ساخت و عدم امکان فروش یا رهن پلاک ثبتی.</li>
                <li>انتقال سهم سازنده به صورت مرحله‌ای و متناسب با پیشرفت فیزیکی پروژه (اسکلت، سفت‌کاری، نازک‌کاری).</li>
                <li>تعیین داور مرضی‌الطرفین حقوقی دارای پروانه وکالت به جای ارجاع به بنگاه‌های املاک.</li>
              </ul>
            </div>
          </div>

          {/* Results Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B132B] to-[#1C2541] rounded-3xl p-6 sm:p-8 text-white border border-[#D4AF37]/30 shadow-xl space-y-6">
            <h3 className="text-base font-bold font-serif text-[#D4AF37] flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              ترازنامه مشارکت و درصد توافق عادلانه
            </h3>

            {/* Progress Bars */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span>سهم مالک زمین:</span>
                  <span className="font-bold text-[#D4AF37]">{partnershipResult.ownerPercentage}٪</span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-[#D4AF37] rounded-full transition-all duration-500"
                    style={{ width: `${partnershipResult.ownerPercentage}%` }}
                  ></div>
                </div>
                <span className="text-[11px] text-gray-300 block">
                  معادل {partnershipResult.ownerMeters.toLocaleString('fa-IR')} متر مربع مفید
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span>سهم سازنده (مجری ساخت):</span>
                  <span className="font-bold text-sky-400">{partnershipResult.builderPercentage}٪</span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-sky-400 rounded-full transition-all duration-500"
                    style={{ width: `${partnershipResult.builderPercentage}%` }}
                  ></div>
                </div>
                <span className="text-[11px] text-gray-300 block">
                  معادل {partnershipResult.builderMeters.toLocaleString('fa-IR')} متر مربع مفید
                </span>
              </div>
            </div>

            {/* Breakdown table */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-300">ارزش کل آورده زمین:</span>
                <span className="font-bold">
                  {(partnershipResult.totalLandValue / 1000000000).toFixed(2)} میلیارد تومان
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">کل هزینه پیش‌بینی‌شده ساخت:</span>
                <span className="font-bold">
                  {(partnershipResult.totalBuildCost / 1000000000).toFixed(2)} میلیارد تومان
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10 text-[#D4AF37]">
                <span>کل ارزش سرمایه‌گذاری پروژه:</span>
                <span className="font-extrabold">
                  {(partnershipResult.totalProjectInvestment / 1000000000).toFixed(2)} میلیارد تومان
                </span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c49f30] text-[#0B132B] font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>تنظیم قرارداد سفارشی مشارکت توسط دکتر رضوی</span>
            </button>
          </div>

        </div>
      )}

      {/* TAB 2: Goodwill & Key-Money Audit */}
      {activeTab === 'goodwill_audit' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                  ارزیاب قانونی حق کسب و پیشه (قانون ۱۳۵۶) و سرقفلی (قانون ۱۳۷۶)
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  تشخیص مبانی فسخ، نحوه تعلق یا سقوط حق کسب و پیشه با مستندات آراء وحدت رویه.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Form Controls */}
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-2">
                    قانون حاکم بر قرارداد اجاره تجاری:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setGoodwillInput({ ...goodwillInput, lawVersion: '1356' })}
                      className={`p-3 rounded-xl border text-right transition-all ${
                        goodwillInput.lawVersion === '1356'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] font-bold'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <span className="block font-bold">قانون سال ۱۳۵۶</span>
                      <span className="text-[10px] text-gray-400">قراردادهای قبل از ۱ مهر ۱۳۷۶ (حق کسب و پیشه)</span>
                    </button>

                    <button
                      onClick={() => setGoodwillInput({ ...goodwillInput, lawVersion: '1376' })}
                      className={`p-3 rounded-xl border text-right transition-all ${
                        goodwillInput.lawVersion === '1376'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] font-bold'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <span className="block font-bold">قانون سال ۱۳۷۶</span>
                      <span className="text-[10px] text-gray-400">قراردادهای بعد از ۱۳۷۶ (سرقفلی قراردادی)</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1.5">
                    جهت و علت طرح دعوای تخلیه عین مستأجره:
                  </label>
                  <select
                    value={goodwillInput.evictionReason}
                    onChange={(e) => setGoodwillInput({ ...goodwillInput, evictionReason: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="transfer_to_other">انتقال به غیر بدون اذن موجر (ماده ۱۹ قانون ۵۶)</option>
                    <option value="change_job">تغییر شغل بدون اذن صریح موجر</option>
                    <option value="dilapidation">تعدی و تفریط در عین مستأجره</option>
                    <option value="non_payment">عدم پرداخت اجاره‌بها پس از ابلاغ اظهارنامه</option>
                    <option value="rebuilding">تخلیه جهت نوسازی و احداث بنای جدید (با پروانه ساختمانی)</option>
                    <option value="personal_need">نیاز شخصی موجر یا فرزندان جهت اشتغال</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1.5">
                    مدت سابقه تصرف مستأجر (سال):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={goodwillInput.tenancyYears}
                    onChange={(e) => setGoodwillInput({ ...goodwillInput, tenancyYears: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Legal Ruling Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/30 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#D4AF37] font-bold">میزان استحقاق مستأجر:</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white">
                      مستند: {goodwillRuling.legalBasis}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold font-serif text-white">
                    {goodwillRuling.compensation}
                  </h4>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {goodwillRuling.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-gray-400">مشاوره حضوری در دفتر ونک</span>
                  <button
                    onClick={onOpenBooking}
                    className="text-[#D4AF37] hover:underline font-bold flex items-center gap-1"
                  >
                    <span>رزرو وقت بررسی اسناد</span>
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Municipal Commissions & Land Law */}
      {activeTab === 'municipal_commissions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {municipalRules.map((rule, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-2xl flex items-center justify-center">
                    {rule.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                      {rule.title}
                    </h4>
                    <span className="text-[11px] text-[#D4AF37] font-semibold">
                      {rule.sub}
                    </span>
                  </div>
                  <ul className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300">
                    {rule.clauses.map((clause, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-1.5 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{clause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-[#D4AF37]/15 hover:text-[#D4AF37] text-xs font-bold transition-colors text-center"
                >
                  درخواست تنظیم دادخواست تخصصی دیوان
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Petition & Pleading Generator */}
      {activeTab === 'petition_generator' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                    مخزن دادخواست‌ها و لوایح استاندارد ملکی
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    قالب‌های حقوقی معتبر با استناد به مواد قانونی و آراء دیوان عدالت اداری.
                  </p>
                </div>
              </div>

              {/* Template selector buttons */}
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setSelectedPleading('deed_transfer')}
                  className={`px-3 py-1.5 rounded-xl transition-all font-bold ${
                    selectedPleading === 'deed_transfer'
                      ? 'bg-[#D4AF37] text-[#0B132B]'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  الزام به تنظیم سند رسمی
                </button>
                <button
                  onClick={() => setSelectedPleading('article_100_appeal')}
                  className={`px-3 py-1.5 rounded-xl transition-all font-bold ${
                    selectedPleading === 'article_100_appeal'
                      ? 'bg-[#D4AF37] text-[#0B132B]'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  اعتراض به رأی ماده ۱۰۰
                </button>
                <button
                  onClick={() => setSelectedPleading('presale_penalty')}
                  className={`px-3 py-1.5 rounded-xl transition-all font-bold ${
                    selectedPleading === 'presale_penalty'
                      ? 'bg-[#D4AF37] text-[#0B132B]'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  خسارت تأخیر پیش‌فروش
                </button>
              </div>
            </div>

            {/* Content Box */}
            <div className="relative rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800 text-xs">
                <div>
                  <span className="font-bold text-[#0B132B] dark:text-white">
                    {pleadingsTemplates[selectedPleading].title}
                  </span>
                  <span className="text-gray-400 block text-[11px] mt-0.5">
                    مرجع صالح رسیدگی: {pleadingsTemplates[selectedPleading].court}
                  </span>
                </div>

                <button
                  onClick={handleCopyPleading}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs font-bold hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  {copiedPleading ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">کپی شد!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>کپی متن دادخواست</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-persian whitespace-pre-wrap select-all">
                {pleadingsTemplates[selectedPleading].content}
              </pre>
            </div>

          </div>
        </div>
      )}

      {/* 5. Bottom Consultation CTA */}
      <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#0B132B] via-[#14213d] to-[#0B132B] text-white border border-[#D4AF37]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            دپارتمان تخصصی دعاوی ملکی و قراردادهای ساخت دفتر وکالت SedRazavi
          </span>
          <h3 className="text-2xl font-bold font-serif text-white">
            نیاز به ارزیابی اسناد ملکی، پروانه ساختمانی یا دادخواست اختصاصی دارید؟
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
            برای بررسی پرونده‌های الزام به سند، سرقفلی، دستور فروش ملک مشاع و دفاع در کمیسیون‌های شهرداری با سرکار خانم دکتر سیده مریم رضوی مشاوره نمایید.
          </p>
        </div>

        <button
          onClick={onOpenBooking}
          className="px-6 py-3 rounded-2xl bg-[#D4AF37] text-[#0B132B] font-bold text-xs shadow-xl hover:bg-[#c49f30] hover:scale-105 transition-all shrink-0 flex items-center gap-2"
        >
          <span>رزرو وقت مشاوره ملکی</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
