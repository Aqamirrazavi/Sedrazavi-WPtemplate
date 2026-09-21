import React, { useState } from 'react';
import {
  Building2,
  ShieldAlert,
  FileCheck2,
  FileText,
  Calculator,
  Clock,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Percent,
  Calendar,
  Lock,
  DollarSign,
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  ArrowRight,
  Sliders,
  Layers,
  Scale,
  ShieldCheck,
  AlertOctagon
} from 'lucide-react';

export interface BankGuaranteeRecord {
  id: string;
  guaranteeNumber: string;
  bankName: string;
  contractorName: string;
  beneficiaryName: string; // کارفرما / سازمان دولتی
  type: 'شرکت در مناقصه' | 'حسن انجام تعهدات' | 'پیش‌پرداخت' | 'استرداد کسور وجه‌الضمان';
  amountToman: number;
  issueDate: string;
  expiryDate: string;
  daysToExpiry: number;
  status: 'فعال و معتبر' | 'در خطر ضبط (Call)' | 'تعلیق با دستور موقت دادگاه' | 'ابطال و مسترد شده';
}

export interface TenderStageItem {
  id: string;
  code: string;
  title: string;
  description: string;
  legalDeadline: string;
  isCompleted: boolean;
}

export const GovernmentTendersGuaranteesSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const [activeTab, setActiveTab] = useState<
    'guarantees_vault' | 'stop_calling_studio' | 'tenders_compliance' | 'price_evaluator' | 'public_contracts'
  >('guarantees_vault');

  // Bank Guarantees Data
  const [guarantees] = useState<BankGuaranteeRecord[]>([
    {
      id: 'bg-1',
      guaranteeNumber: 'ض-۱۴۰۳/۸۹۲۳۴',
      bankName: 'بانک ملت - شعبه مرکزی',
      contractorName: 'شرکت مهندسی سازه‌های دریایی خلیج',
      beneficiaryName: 'شرکت ملی نفت ایران',
      type: 'حسن انجام تعهدات',
      amountToman: 8500000000,
      issueDate: '۱۴۰۲/۰۷/۱۰',
      expiryDate: '۱۴۰۳/۰۷/۱۰',
      daysToExpiry: 12,
      status: 'در خطر ضبط (Call)'
    },
    {
      id: 'bg-2',
      guaranteeNumber: 'ض-۱۴۰۳/۷۷۱۲۹',
      bankName: 'بانک تجارت - شعبه اسکان',
      contractorName: 'توسعه زیرساخت انرژی آریا',
      beneficiaryName: 'شرکت توانیر',
      type: 'پیش‌پرداخت',
      amountToman: 14000000000,
      issueDate: '۱۴۰۳/۰۱/۱۵',
      expiryDate: '۱۴۰۳/۱۰/۱۵',
      daysToExpiry: 105,
      status: 'فعال و معتبر'
    },
    {
      id: 'bg-3',
      guaranteeNumber: 'ض-۱۴۰۲/۴۴۹۱۸',
      bankName: 'بانک ملی ایران - شعبه فردوسی',
      contractorName: 'راهسازی و پل‌سازی سپهر',
      beneficiaryName: 'اداره کل راهداری و حمل و نقل جاده‌ای',
      type: 'حسن انجام تعهدات',
      amountToman: 4200000000,
      issueDate: '۱۴۰۱/۰۹/۲۰',
      expiryDate: '۱۴۰۳/۰۶/۲۰',
      daysToExpiry: 0,
      status: 'تعلیق با دستور موقت دادگاه'
    },
    {
      id: 'bg-4',
      guaranteeNumber: 'ض-۱۴۰۳/۹۹۱۸۲',
      bankName: 'بانک پارسیان - شعبه میرداماد',
      contractorName: 'فن‌آوری اطلاعات تدبیر هوشمند',
      beneficiaryName: 'سازمان ثبت اسناد و املاک کشور',
      type: 'شرکت در مناقصه',
      amountToman: 1200000000,
      issueDate: '۱۴۰۳/۰۵/۰۱',
      expiryDate: '۱۴۰۳/۰۸/۰۱',
      daysToExpiry: 40,
      status: 'فعال و معتبر'
    }
  ]);

  // Stop-Calling Pleading State
  const [contractorClient, setContractorClient] = useState('شرکت بین‌المللی سازه‌های صنعتی فجر (با وکالت دکتر رضوی)');
  const [employerEntity, setEmployerEntity] = useState('شرکت مادر تخصصی ساخت و توسعه زیربناهای حمل و نقل کشور');
  const [issuingBank, setIssuingBank] = useState('بانک ملت - مدیریت شعب منطقه');
  const [guaranteeCode, setGuaranteeCode] = useState('ض-۱۴۰۳/۸۹۲۳۴');
  const [guaranteeAmount, setGuaranteeAmount] = useState(8500000000);
  const [stopCallingDraft, setStopCallingDraft] = useState('');
  const [copiedDraft, setCopiedDraft] = useState(false);

  // Generate Injunction Pleading
  const handleGenerateInjunction = () => {
    const draft = `بسم‌الله الرحمن الرحیم

ریاست محترم مجتمع قضایی شهید بهشتی تهران (دادگاه عمومی حقوقی)
موضوع: دادخواست صدور دستور موقت فوری دایر بر منع بانک از پرداخت وجه ضمانت‌نامه بانکی (ماده ۳۱۰ به بعد قانون آیین دادرسی مدنی)

خواهان (پیمانکار): ${contractorClient}
خوانده ردیف اول (کارفرما): ${employerEntity}
خوانده ردیف دوم (بانک صادرکننده): ${issuingBank}

موضوع خواسته:
صدور دستور موقت فوری و بدوی مبنی بر منع خوانده ردیف دوم از کارسازی و پرداخت وجه ضمانت‌نامه بانکی شماره ${guaranteeCode} به مبلغ ${(guaranteeAmount).toLocaleString()} تومان و منع خوانده ردیف اول از وصول آن تا تعیین تکلیف نهایی در ماهیت دعوی، با تودیع خسارت احتمالی.

دلایل و جهات استحقاق دستور موقت:
۱- فوریت امر: خوانده ردیف اول برخلاف حسن‌نیت قراردادی و بدون لحاظ تاخیرات مجاز تاییدشده، اخطار غیرقانونی ضبط ضمانت‌نامه (Call) را به بانک ارسال داشته است. با توجه به ماهیت غیرقابل برگشت پرداخت وجه توسط بانک، عدم صدور دستور موقت فوراً سبب ورود خسارت غیرقابل جبران و سلب صلاحیت مالی موکل در رتبه‌بندی سازمان برنامه و بودجه خواهد گردید.
۲- عدم تحقق تخلف پیمانکار: تاخیرات پروژه ناشی از عدم پرداخت ۵ فقره صورت‌وضعیت متوالی کارکرد و عدم واگذاری به‌موقع زمین توسط کارفرما بوده که طبق بخشنامه ۵۰۹۰ سازمان برنامه و بودجه از مصادیق صریح تاخیرات مجاز محسوب می‌شود.
۳- قاعده لاضرر و سوءاستفاده از حق: اقدام خوانده ردیف اول منطبق با سوءاستفاده از حق مندرج در اصل چهلم قانون اساسی و فاقد وجاهت شرعی و قانونی است.

بنا به مراتب معروضه، مستنداً به مواد ۳۱۰، ۳۱۶ و ۳۲۵ قانون آیین دادرسی مدنی، استدعای رسیدگی فوری خارج از نوبت، صدور دستور موقت و ابلاغ آن از طریق پیام‌رسان قضایی به بانک خوانده را دارد.

با احترام
دکتر سیده مریم رضوی - وکیل پیمانکار`;

    setStopCallingDraft(draft);
  };

  // Tender Stages Checklist (طبق قانون برگزاری مناقصات)
  const [tenderStages, setTenderStages] = useState<TenderStageItem[]>([
    {
      id: 'st-1',
      code: 'ماده ۱۳ قانون',
      title: 'انتشار فراخوان مناقصه در روزنامه کثیرالانتشار و سامانه ستاد',
      description: 'انتشار ۲ تا ۳ نوبت آگهی در روزنامه‌های کثیرالانتشار و بارگذاری کامل اسناد در سامانه تدارکات الکترونیکی دولت (ستاد).',
      legalDeadline: 'حداقل ۱۰ روز کاری تا گشایش',
      isCompleted: true
    },
    {
      id: 'st-2',
      code: 'ماده ۱۲ قانون',
      title: 'ارزیابی کیفی مناقصه‌گران (RFQ) در مناقصات دو‌مرحله‌ای',
      description: 'بررسی توانمندی فنی، مالی، حسن سابقه و ماشین‌آلات مناقصه‌گران و اعلام لیست کوتاه واجدین صلاحیت.',
      legalDeadline: 'ظرف ۲۱ روز از پایان مهلت ارسال',
      isCompleted: true
    },
    {
      id: 'st-3',
      code: 'ماده ۱۹ و ۲۰',
      title: 'گشایش پاکت‌های (الف)، (ب) و (ج) در کمیسیون مناقصه',
      description: 'بررسی تضمین شرکت در مناقصه (پاکت الف)، پیشنهاد فنی (پاکت ب) و پیشنهاد قیمت نهایی (پاکت ج).',
      legalDeadline: 'در زمان و مکان مقرر در آگهی',
      isCompleted: true
    },
    {
      id: 'st-4',
      code: 'ماده ۲۲ و ۲۴',
      title: 'تعیین برنده اول و دوم مناقصه و انعقاد قرارداد',
      description: 'ابلاغ رسمی به برنده اول جهت تودیع ضمانت‌نامه حسن انجام تعهدات و امضای قرارداد ظرف ۷ روز کاری.',
      legalDeadline: 'حداکثر ۷ روز کاری مهلت تودیع',
      isCompleted: false
    },
    {
      id: 'st-5',
      code: 'ماده ۷ و ۸',
      title: 'رسیدگی به اعتراضات در هیئت رسیدگی به شکایات مناقصات',
      description: 'ثبت شکایت مناقصه‌گر معترض به تصمیم کمیسیون و توقف فرآیند ارجاع کار تا صدور رای هیئت استان.',
      legalDeadline: 'ظرف ۷ روز پس از اعلام نتایج',
      isCompleted: false
    }
  ]);

  // Price & Quality Evaluation Simulator (بند الف ماده ۲۶)
  const [estimatePrice, setEstimatePrice] = useState<number>(20000000000); // 20 Billion Toman
  const [offeredPrice, setOfferedPrice] = useState<number>(18500000000); // 18.5 Billion Toman
  const [qualityScore, setQualityScore] = useState<number>(85); // 85 out of 100

  // Calculate Price Deviation & Evaluation Coefficient
  const priceRatio = (offeredPrice / estimatePrice) * 100;
  const deviationPercent = ((offeredPrice - estimatePrice) / estimatePrice) * 100;
  const balancedScore = Math.round(qualityScore * 0.4 + (100 - Math.abs(deviationPercent)) * 0.6);

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 font-sans pb-24 selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]" dir="rtl">
      {/* Top Header */}
      <div className="bg-[#0B152F] border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Building2 className="w-5 h-5 text-white font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  فاز ۳۶ تخصصی
                </span>
                <span className="text-xs text-slate-400">حقوق عمومی و قراردادهای دولتی</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white font-serif">
                مناقصات دولتی، سامانه ستاد، ضمانت‌نامه‌های بانکی و دستور موقت
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

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 py-2 border-t border-slate-800/60 no-scrollbar">
          <button
            onClick={() => setActiveTab('guarantees_vault')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'guarantees_vault'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>گاوصندوق ضمانت‌نامه‌های بانکی ({guarantees.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('stop_calling_studio')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'stop_calling_studio'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>استودیو دستور موقت توقف ضبط ضمانت‌نامه</span>
          </button>

          <button
            onClick={() => setActiveTab('tenders_compliance')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'tenders_compliance'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>ممیزی مراحل مناقصه و هیئت شکایات</span>
          </button>

          <button
            onClick={() => setActiveTab('price_evaluator')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'price_evaluator'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>فرمول تراز قیمت و ارزیابی کیفی پیمانکاران</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Header Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>ارزش ضمانت‌نامه‌های تحت پوشش</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-2 font-mono">
              ۲۷.۹ <span className="text-xs text-slate-400 font-normal">میلیارد تومان</span>
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">تضمین‌های ارزی و ریالی پیمانکاران</div>
          </div>

          <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>دستورهای موقت اخذ شده</span>
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="text-2xl font-bold text-white mt-2 font-mono">
              ۱۱ <span className="text-xs text-slate-400 font-normal">دستور موقت قطعی</span>
            </div>
            <div className="text-[11px] text-[#D4AF37] mt-1">توقف موفق عملیات وصول بانکی</div>
          </div>

          <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>اعتراضات در هیئت شکایات</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-2 font-mono">
              ۸ <span className="text-xs text-slate-400 font-normal">پرونده استانی</span>
            </div>
            <div className="text-[11px] text-amber-400 mt-1">ابطال فراخوان‌های غیرقانونی</div>
          </div>

          <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>ضمانت‌نامه‌های در آستانه سررسید</span>
              <Clock className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-bold text-rose-400 mt-2 font-mono">
              ۱ <span className="text-xs text-slate-400 font-normal">فقره بحرانی (۱۲ روز)</span>
            </div>
            <div className="text-[11px] text-rose-400 mt-1">هشدار اقدام فوری تمدید یا دستور موقت</div>
          </div>
        </div>

        {/* TAB 1: Guarantees Vault */}
        {activeTab === 'guarantees_vault' && (
          <div className="space-y-6">
            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                  <Lock className="w-4 h-4 text-[#D4AF37]" />
                  <span>پایگاه نظارت و رصد سررسید ضمانت‌نامه‌های بانکی پیمانکاران</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  مدیریت سررسید، جلوگیری از وصول ناگهانی (Call)، و اخطارهای خودکار ۱۰ روز قبل از انقضا.
                </p>
              </div>

              <span className="text-xs px-3 py-1 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono">
                {guarantees.length} ضمانت‌نامه فعال
              </span>
            </div>

            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs sm:text-sm">
                  <thead className="bg-slate-900 text-slate-400 text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">شماره ضمانت و بانک صادرکننده</th>
                      <th className="py-3 px-4">پیمانکار / کارفرمای ذینفع</th>
                      <th className="py-3 px-4">نوع ضمانت</th>
                      <th className="py-3 px-4">مبلغ ضمانت (تومان)</th>
                      <th className="py-3 px-4">تاریخ انقضا</th>
                      <th className="py-3 px-4">وضعیت حقوقی</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {guarantees.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white text-xs">{item.guaranteeNumber}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{item.bankName}</div>
                        </td>
                        <td className="py-3.5 px-4 text-xs">
                          <div className="text-slate-200">پیمانکار: {item.contractorName}</div>
                          <div className="text-[10px] text-[#D4AF37]">کارفرما: {item.beneficiaryName}</div>
                        </td>
                        <td className="py-3.5 px-4 text-xs font-medium text-cyan-300">
                          {item.type}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                          {(item.amountToman / 1000000000).toFixed(2)} میلیارد
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-mono text-xs text-slate-300">{item.expiryDate}</div>
                          <span
                            className={`text-[10px] font-bold ${
                              item.daysToExpiry <= 15 ? 'text-rose-400' : 'text-slate-400'
                            }`}
                          >
                            {item.daysToExpiry > 0 ? `${item.daysToExpiry} روز مانده` : 'منقضی شده'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                              item.status === 'فعال و معتبر'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : item.status === 'در خطر ضبط (Call)'
                                ? 'bg-rose-500/10 text-rose-300 border-rose-500/30 animate-pulse'
                                : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Injunction & Stop-Calling Studio */}
        {activeTab === 'stop_calling_studio' && (
          <div className="space-y-6">
            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                  <span>استودیو تنظیم دادخواست دستور موقت توقف ضبط ضمانت‌نامه بانکی</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  اخذ فوری دستور موقت دایر بر منع بانک از پرداخت وجه ضمانت‌نامه به استناد تاخیرات مجاز، عدم تعدیل آحادبها و سوءاستفاده از حق.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">نام شرکت پیمانکار (موکل):</label>
                  <input
                    type="text"
                    value={contractorClient}
                    onChange={(e) => setContractorClient(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">سازمان کارفرمای دولتی (ذینفع):</label>
                  <input
                    type="text"
                    value={employerEntity}
                    onChange={(e) => setEmployerEntity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">بانک صادرکننده ضمانت‌نامه:</label>
                  <input
                    type="text"
                    value={issuingBank}
                    onChange={(e) => setIssuingBank(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">شماره ضمانت‌نامه بانکی:</label>
                  <input
                    type="text"
                    value={guaranteeCode}
                    onChange={(e) => setGuaranteeCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#D4AF37] outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleGenerateInjunction}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>تولید دادخواست دستور موقت فوری</span>
                </button>
              </div>

              {stopCallingDraft && (
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      پیش‌نمایش لایحه و دادخواست دستور موقت آماده تقدیم به دادگاه عمومی حقوقی:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(stopCallingDraft);
                          setCopiedDraft(true);
                          setTimeout(() => setCopiedDraft(false), 2000);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedDraft ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">کپی شد</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>کپی دادخواست</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>چاپ دادخواست</span>
                      </button>
                    </div>
                  </div>

                  <textarea
                    rows={14}
                    value={stopCallingDraft}
                    onChange={(e) => setStopCallingDraft(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 font-serif leading-7 text-xs sm:text-sm focus:border-[#D4AF37] outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Tenders Compliance & Disputes Board */}
        {activeTab === 'tenders_compliance' && (
          <div className="space-y-6">
            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                  <FileCheck2 className="w-5 h-5 text-[#D4AF37]" />
                  <span>ممیزی فرآیند مناقصه طبق قانون برگزاری مناقصات و آیین‌نامه‌های اجرایی</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  کنترل مواعد قانونی اسناد، گشایش پاکت‌ها و ثبت اعتراض در هیئت رسیدگی به شکایات موضوع ماده ۷ قانون.
                </p>
              </div>

              <div className="space-y-3">
                {tenderStages.map((stage) => (
                  <div
                    key={stage.id}
                    onClick={() => {
                      setTenderStages((prev) =>
                        prev.map((s) => (s.id === stage.id ? { ...s, isCompleted: !s.isCompleted } : s))
                      );
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                      stage.isCompleted
                        ? 'bg-emerald-500/10 border-emerald-500/40 shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border mt-0.5 transition-colors ${
                          stage.isCompleted
                            ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-bold'
                            : 'border-slate-600 bg-slate-800'
                        }`}
                      >
                        {stage.isCompleted && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{stage.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-[#D4AF37] font-mono border border-slate-700">
                            {stage.code}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {stage.description}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono font-bold text-slate-300 whitespace-nowrap bg-slate-800 px-2.5 py-1 rounded-lg">
                      {stage.legalDeadline}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Price & Quality Evaluation Simulator */}
        {activeTab === 'price_evaluator' && (
          <div className="space-y-6">
            <div className="bg-[#0B152F] border border-slate-800/80 rounded-2xl p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                  <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                  <span>فرمول محاسباتی قیمت متناسب و تراز شده ارزیابی کیفی (بند الف ماده ۲۶)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  شبیه‌سازی امتیاز مالی و فنی برنده مناقصه جهت تشخیص دامپینگ، قیمت نامتعارف و طرح ایراد در کمیسیون.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">
                    برآورد اولیه کارفرما (تومان):
                  </label>
                  <input
                    type="number"
                    value={estimatePrice}
                    onChange={(e) => setEstimatePrice(Number(e.target.value))}
                    step={1000000000}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:border-[#D4AF37] outline-none"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {(estimatePrice / 1000000000).toFixed(1)} میلیارد تومان
                  </span>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">
                    قیمت پیشنهادی پیمانکار (تومان):
                  </label>
                  <input
                    type="number"
                    value={offeredPrice}
                    onChange={(e) => setOfferedPrice(Number(e.target.value))}
                    step={1000000000}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:border-[#D4AF37] outline-none"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {(offeredPrice / 1000000000).toFixed(1)} میلیارد تومان
                  </span>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">
                    امتیاز ارزیابی کیفی پیمانکار (از ۱۰۰):
                  </label>
                  <input
                    type="number"
                    min={50}
                    max={100}
                    value={qualityScore}
                    onChange={(e) => setQualityScore(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:border-[#D4AF37] outline-none"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    حداقل نصاب قبولی: ۶۵ امتیاز
                  </span>
                </div>
              </div>

              {/* Simulation Result Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200">
                  <span className="text-xs text-slate-400 block">درصد انحراف از برآورد:</span>
                  <div
                    className={`text-2xl font-mono font-bold mt-1 ${
                      deviationPercent < -20 ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {deviationPercent > 0 ? `+${deviationPercent.toFixed(1)}` : deviationPercent.toFixed(1)}٪
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    {deviationPercent < -15 ? 'احتمال بالای بررسی آنالیز بها (شکست قیمت)' : 'در محدوده متعارف قانونی'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200">
                  <span className="text-xs text-slate-400 block">امتیاز تراز شده نهایی (L):</span>
                  <div className="text-2xl font-mono font-bold text-[#D4AF37] mt-1">
                    {balancedScore} <span className="text-xs text-slate-400">از ۱۰۰</span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    محاسبه بر اساس ترکیب ۴۰٪ کیفی و ۶۰٪ مالی
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200">
                  <span className="text-xs text-slate-400 block">وضعیت شانس برنده شدن:</span>
                  <div className="text-2xl font-mono font-bold text-cyan-400 mt-1">
                    {balancedScore >= 80 ? 'بسیار بالا (اول)' : 'متوسط'}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    واجد شرایط پیشنهاد قیمت متناسب
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
