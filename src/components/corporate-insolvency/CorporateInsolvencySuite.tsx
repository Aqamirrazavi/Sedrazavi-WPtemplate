import React, { useState } from 'react';
import {
  Building2,
  Scale,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Calculator,
  Calendar,
  Clock,
  Briefcase,
  TrendingDown,
  CheckCircle2,
  DollarSign,
  PieChart as PieChartIcon,
  Download,
  Copy,
  Check,
  ArrowRight,
  BookOpen,
  Sparkles,
  Users,
  Search,
  Filter,
  FileSpreadsheet,
  Gavel,
  ShieldAlert,
  Info,
} from 'lucide-react';

interface InsolvencySimulationResult {
  liquidityRatio: number;
  insolvencyRiskScore: number;
  riskLevel: 'بسیار پرخطر (توقف محتمل)' | 'هشدار جدی (نیاز به بازسازی ساختار)' | 'پایدار و قابل تادیه';
  suspectPeriodExposure: string;
  recommendedAction: string;
  ceaseInterestApplicable: boolean;
  legalBasis: string[];
}

export const CorporateInsolvencySuite: React.FC<{ onBackToHome?: () => void; onOpenBooking?: () => void }> = ({
  onBackToHome,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'audit_calculator' | 'composition_contract' | 'suspect_period' | 'pleadings_vault' | 'precedents'>('audit_calculator');

  // Audit Form State
  const [currentAssets, setCurrentAssets] = useState<number>(12000000000); // 12 Billion Tomans
  const [currentLiabilities, setCurrentLiabilities] = useState<number>(18000000000); // 18 Billion Tomans
  const [delayedChecksCount, setDelayedChecksCount] = useState<number>(8);
  const [bankOverdueDebts, setBankOverdueDebts] = useState<number>(6500000000); // 6.5 Billion Tomans
  const [companyType, setCompanyType] = useState<'سهامی خاص' | 'با مسئولیت محدود' | 'سهامی عام' | 'تضامنی'>('سهامی خاص');
  const [hasForeignCurrencyDebt, setHasForeignCurrencyDebt] = useState<boolean>(true);

  // Copy state
  const [copiedPleading, setCopiedPleading] = useState<string | null>(null);

  // Compute Insolvency Assessment
  const calculateInsolvency = (): InsolvencySimulationResult => {
    const ratio = currentAssets / Math.max(1, currentLiabilities);
    const score = Math.min(100, Math.round((currentLiabilities / Math.max(1, currentAssets)) * 45 + delayedChecksCount * 4));

    let riskLevel: InsolvencySimulationResult['riskLevel'] = 'پایدار و قابل تادیه';
    if (score >= 75 || ratio < 0.75) {
      riskLevel = 'بسیار پرخطر (توقف محتمل)';
    } else if (score >= 50 || ratio < 1.0) {
      riskLevel = 'هشدار جدی (نیاز به بازسازی ساختار)';
    }

    const ceaseInterestApplicable = score >= 60;
    const suspectPeriodExposure = 'معاملات بلاعوض، صلح غیرمعوض و پرداخت دیون حال‌نشده در بازه ۶ ماه پیش از تاریخ توقف، بر اساس ماده ۴۲۳ قانون تجارت باطل و بلااثر تلقی می‌گردد.';

    const recommendedAction =
      riskLevel === 'بسیار پرخطر (توقف محتمل)'
        ? 'تقدیم فوری دادخواست اعلان توقف موضوع ماده ۴۱۳ قانون تجارت جهت بهره‌مندی از توقف خسارت تاخیر تادیه (رأی وحدت رویه ۱۵۵) و جلوگیری از بازداشت مدیران.'
        : 'تشکیل مجمع عمومی فوق‌العاده جهت تدوین پیش‌نویس قرارداد ارفاقی (ماده ۵۱۵ ق.ت)، استمهال دیون بانکی و تعدیل بدهی‌ها با بستانکاران عمده.';

    return {
      liquidityRatio: Number(ratio.toFixed(2)),
      insolvencyRiskScore: score,
      riskLevel,
      suspectPeriodExposure,
      recommendedAction,
      ceaseInterestApplicable,
      legalBasis: [
        'ماده ۴۱۲ قانون تجارت (تعریف توقف از تادیه دیون تجاری)',
        'ماده ۴۱۳ قانون تجارت (تکلیف تاجر یا مدیران به اعلام توقف ظرف ۳ روز)',
        'ماده ۴۲۳ قانون تجارت (بطلان معاملات دوره مشکوک)',
        'ماده ۵۱۵ قانون تجارت (شروط انعقاد قرارداد ارفاقی با بستانکاران)',
        'رأی وحدت رویه شماره ۱۵۵ دیوان عالی کشور (توقف محاسبه خسارت تاخیر تادیه پس از تاریخ توقف)',
        'ماده ۱۴۳ لایحه قانونی اصلاح قسمتی از قانون تجارت (مسئولیت تضامنی مدیران شرکت سهامی)',
      ],
    };
  };

  const result = calculateInsolvency();

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPleading(id);
    setTimeout(() => setCopiedPleading(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] dark:bg-[#070D1E] py-10 text-right font-persian" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="cursor-pointer hover:text-[#D4AF37]" onClick={onBackToHome}>صفحه اصلی</span>
            <span>/</span>
            <span className="text-[#D4AF37] font-bold">سامانه‌های تخصصی حقوقی (فاز ۳۷)</span>
            <span>/</span>
            <span className="text-gray-800 dark:text-gray-200">ورشکستگی، تصفیه دیون تجاری و قرارداد ارفاقی</span>
          </div>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="px-4 py-2 rounded-xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 text-xs font-bold hover:border-[#D4AF37] transition-colors flex items-center gap-1.5"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>بازگشت به پیش‌نمایش سایت</span>
            </button>
          )}
        </div>

        {/* Hero Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B132B] via-[#16213E] to-[#0B132B] text-white border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#0B132B] text-xs font-black shadow-md flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>سوئیت تخصصی فاز ۳۷</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[#F3E5AB] text-xs font-mono">
                  Corporate Insolvency & Liquidation
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-white leading-tight">
                سامانه حقوقی ورشکستگی، تصفیه دیون و بازسازی ساختار شرکت‌ها
              </h1>

              <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
                ارزیابی حقوقی توقف از تادیه دیون، تعیین تاریخ توقف و آثار دوره مشکوک، اعمال رأی وحدت رویه شماره ۱۵۵ جهت توقف خسارت تاخیر تادیه، تدوین قرارداد ارفاقی با بستانکاران و دفاع از مسئولیت تضامنی مدیران شرکت‌ها.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {onOpenBooking && (
                <button
                  onClick={onOpenBooking}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#DFBF58] to-[#AA820A] text-[#0B132B] font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>مشاوره ویژه بحران مالی شرکت</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-center">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="block text-[11px] text-gray-400">ماده قانونی بنیادین</span>
              <span className="font-bold text-xs sm:text-sm text-[#F3E5AB]">ماده ۴۱۲ تا ۵۷۵ ق.ت</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="block text-[11px] text-gray-400">توقف خسارت دیرکرد</span>
              <span className="font-bold text-xs sm:text-sm text-emerald-400">رأی وحدت رویه ۱۵۵</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="block text-[11px] text-gray-400">حدنصاب قرارداد ارفاقی</span>
              <span className="font-bold text-xs sm:text-sm text-amber-300">اکثریت نفرات + ۳/۴ دیون</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="block text-[11px] text-gray-400">مسئولیت مدیران</span>
              <span className="font-bold text-xs sm:text-sm text-rose-300">ماده ۱۴۳ لایحه اصلاحی</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('audit_calculator')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'audit_calculator'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#D4AF37]'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>ممیزی ریسک توقف و نسبت نقدینگی</span>
          </button>

          <button
            onClick={() => setActiveTab('composition_contract')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'composition_contract'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#D4AF37]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>قرارداد ارفاقی و استمهال بانکی (ماده ۵۱۵)</span>
          </button>

          <button
            onClick={() => setActiveTab('suspect_period')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'suspect_period'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#D4AF37]'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>دوره مشکوک و ابطال معاملات (ماده ۴۲۳)</span>
          </button>

          <button
            onClick={() => setActiveTab('pleadings_vault')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'pleadings_vault'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#D4AF37]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>گنجینه لوایح و دادخواست‌های ورشکستگی</span>
          </button>

          <button
            onClick={() => setActiveTab('precedents')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'precedents'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#D4AF37]'
            }`}
          >
            <Gavel className="w-4 h-4" />
            <span>آراء وحدت رویه و دکترین قضایی</span>
          </button>
        </div>

        {/* Tab 1: Audit Calculator */}
        {activeTab === 'audit_calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Form Inputs (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
                <Calculator className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  محاسبه‌گر نقدینگی، بدهی‌ها و ضریب ریسک توقف تجاری
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    نوع شرکت تجاری:
                  </label>
                  <select
                    value={companyType}
                    onChange={(e) => setCompanyType(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
                  >
                    <option value="سهامی خاص">شرکت سهامی خاص (مسئولیت محدود به سهام)</option>
                    <option value="با مسئولیت محدود">شرکت با مسئولیت محدود</option>
                    <option value="سهامی عام">شرکت سهامی عام (بورسی / فرابورسی)</option>
                    <option value="تضامنی">شرکت تضامنی (مسئولیت شخصی شرکا)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    تعداد چک‌های برگشتی جاری:
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={delayedChecksCount}
                    onChange={(e) => setDelayedChecksCount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    کل دارایی‌های جاری قابل نقد (تومان):
                  </label>
                  <input
                    type="number"
                    step="100000000"
                    value={currentAssets}
                    onChange={(e) => setCurrentAssets(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white"
                  />
                  <span className="text-[11px] text-gray-400">
                    {(currentAssets / 10000000).toLocaleString('fa-IR')} میلیون تومان
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    کل بدهی‌های سررسید شده و حال (تومان):
                  </label>
                  <input
                    type="number"
                    step="100000000"
                    value={currentLiabilities}
                    onChange={(e) => setCurrentLiabilities(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white"
                  />
                  <span className="text-[11px] text-gray-400">
                    {(currentLiabilities / 10000000).toLocaleString('fa-IR')} میلیون تومان
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    تسهیلات و مطالبات معوق بانکی (تومان):
                  </label>
                  <input
                    type="number"
                    step="100000000"
                    value={bankOverdueDebts}
                    onChange={(e) => setBankOverdueDebts(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    تعهدات و حواله‌های ارزی باز:
                  </label>
                  <div className="flex items-center gap-3 pt-2">
                    <label className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="radio"
                        checked={hasForeignCurrencyDebt}
                        onChange={() => setHasForeignCurrencyDebt(true)}
                        className="text-[#D4AF37]"
                      />
                      <span>دارای تعهد ارزی معوق</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="radio"
                        checked={!hasForeignCurrencyDebt}
                        onChange={() => setHasForeignCurrencyDebt(false)}
                        className="text-[#D4AF37]"
                      />
                      <span>صرفاً بدهی ریالی</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-[#F3E5AB] flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0 text-[#D4AF37]" />
                <span>
                  نکته راهبردی: طبق ماده ۴۱۳ قانون تجارت، تاجر یا هیئت مدیره شرکت مکلف است ظرف ۳ روز از تاریخ وقفه در پرداخت، توقف خود را به دفتر دادگاه عمومی اعلام نماید.
                </span>
              </div>
            </div>

            {/* Assessment Report (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400">نتیجه ممیزی و شاخص ریسک</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                    result.insolvencyRiskScore >= 75
                      ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                      : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                  }`}>
                    {result.riskLevel}
                  </span>
                </div>

                {/* Score gauge */}
                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-center space-y-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">ضریب ریسک توقف تجاری:</span>
                  <div className="font-mono text-4xl font-black text-[#D4AF37]">
                    {result.insolvencyRiskScore} <span className="text-sm">از ۱۰۰</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        result.insolvencyRiskScore >= 75
                          ? 'bg-gradient-to-r from-amber-500 to-rose-600'
                          : 'bg-gradient-to-r from-emerald-500 to-amber-500'
                      }`}
                      style={{ width: `${result.insolvencyRiskScore}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-gray-400 block pt-1">
                    نسبت جاری نقدینگی به بدهی‌ها: <strong className="font-mono text-gray-800 dark:text-gray-200">{result.liquidityRatio}</strong>
                  </span>
                </div>

                {/* Legal Action Required */}
                <div className="p-4 rounded-2xl bg-[#0B132B] dark:bg-gray-900 border border-[#D4AF37]/40 text-white space-y-2">
                  <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    راهکار حقوقی اولویت‌دار مؤسسه رضوی:
                  </span>
                  <p className="text-xs leading-relaxed text-gray-300">
                    {result.recommendedAction}
                  </p>
                </div>

                {/* Stop Interest Benefit */}
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                  <span>امکان توقف خسارت دیرکرد بانکی:</span>
                  <span className="font-bold">مشمول رأی وحدت رویه ۱۵۵</span>
                </div>
              </div>

              {onOpenBooking && (
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 rounded-xl bg-[#D4AF37] hover:bg-[#C4981C] text-[#0B132B] font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>تنظیم دادخواست اعلان توقف یا قرارداد ارفاقی</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Composition Contract (ماده ۵۱۵) */}
        {activeTab === 'composition_contract' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
                <Building2 className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  فرآیند و الزامات انعقاد قرارداد ارفاقی (ماده ۵۱۵ به بعد قانون تجارت)
                </h3>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                قرارداد ارفاقی معاهده‌ای است قانونی میان تاجر یا شرکت ورشکسته و بستانکاران جهت استمهال بدهی‌ها، بخشودگی بخشی از خسارات دیرکرد و تداوم تولید بدون تصفیه و حراج کارخانه.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-2">
                  <span className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold text-xs">
                    ۱
                  </span>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                    عدم محکومیت به ورشکستگی به تقلب
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    طبق ماده ۵۱۵، تنها تاجری می‌تواند پیشنهاد قرارداد ارفاقی دهد که به عنوان ورشکسته به تقلب محکوم نشده باشد.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-2">
                  <span className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold text-xs">
                    ۲
                  </span>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                    نصاب قانونی آراء بستانکاران
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    موافقت اکثریت عددی بستانکاران حاضر که حداقل سه چهارم (۷۵٪) از کل مطالبات تصدیق‌شده را دارا باشند (ماده ۵۱۷ ق.ت).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-2">
                  <span className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold text-xs">
                    ۳
                  </span>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                    تصدیق و تایید دادگاه حقوقی
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    عقد قرارداد ارفاقی باید توسط دادگاه صادرکننده حکم ورشکستگی تصدیق شود تا نسبت به کلیه طلبکاران لازم‌الاتباع گردد.
                  </p>
                </div>
              </div>

              {/* Sample Terms of Composition */}
              <div className="p-5 rounded-2xl bg-[#0B132B] text-white border border-[#D4AF37]/40 space-y-3 mt-4">
                <span className="text-xs font-bold text-[#D4AF37] block">
                  نمونه بندهای استاندارد حقوقی قرارداد ارفاقی تدوین‌شده توسط دکتر سیده مریم رضوی:
                </span>
                <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside leading-relaxed">
                  <li>استمهال ۳۶ ماهه اصل تسهیلات بانکی با تنفس اولیه ۶ ماهه جهت احیای خط تولید.</li>
                  <li>بخشودگی جرایم ۶ درصدی مازاد بر سود قطعی مستند به آراء دیوان عالی کشور و بخشنامه‌های بانک مرکزی.</li>
                  <li>واگذاری سهام وثیقه یا اموال غیرمنقول مازاد جهت تسویه مرحله‌ای مطالبات قطعی بستانکاران تجاری.</li>
                  <li>ابقای نظارت هیئت ۳ نفره معتمد از طلبکاران و اداره تصفیه امور ورشکستگی تا اجرای کامل تعهدات.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Suspect Period (ماده ۴۲۳) */}
        {activeTab === 'suspect_period' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                دوره مشکوک (Suspect Period) و بطلان قانونی معاملات تاجر متوقف
              </h3>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              فاصله زمانی میان «تاریخ واقعی توقف» (که دادگاه در دادنامه تعیین می‌کند) تا «تاریخ صدور حکم ورشکستگی» را دوره مشکوک می‌نامند. کلیه معاملاتی که به زیان هیئت بستانکاران باشد در این بازه در معرض بطلان قرار دارد.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-2">
                <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400">
                  معاملات بلاعوض و صلح صوری
                </h4>
                <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
                  هر صلح محاباتی، هبه یا انتقال اموال به بستگان درجه یک در دوره مشکوک باطل و اموال به نفع بستانکاران اعاده می‌شود (بند ۱ ماده ۴۲۳ ق.ت).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-2">
                <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400">
                  پرداخت دیون قبل از سررسید
                </h4>
                <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
                  تادیه هر بدهی که موعد آن بعد از تاریخ توقف باشد، خواه به صورت وجه نقد یا واگذاری کالا، محکوم به بطلان است (بند ۲ ماده ۴۲۳ ق.ت).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-2">
                <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400">
                  رهن‌گذاری به نفع طلبکار خاص
                </h4>
                <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
                  هر رهن یا وثیقه‌ای که تاجر متوقف بر روی اموال خود به نفع یک طلبکار خاص ایجاد کند باطل بوده و اصل تساوی بستانکاران احیا می‌گردد.
                </p>
              </div>
            </div>

            {/* Strategic defense note */}
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-900 dark:text-blue-200 space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                استراتژی دفاعی وکیل در تثبیت یا تعدیل تاریخ توقف:
              </span>
              <p className="leading-relaxed">
                تاریخ توقف تعیین‌شده توسط کارشناس دادگستری نقش سرنوشت‌ساز در معتبر ماندن یا بطلان قراردادهای واگذاری دارد. تیم حقوقی دکتر سیده مریم رضوی با اعتراض فنی به گزارش کارشناسی و استناد به ترازنامه‌ها، مانع از تسری تاریخ توقف به معاملات صحیح شرکت می‌گردد.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Pleadings Vault */}
        {activeTab === 'pleadings_vault' && (
          <div className="space-y-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    پیش‌نویس دادخواست‌ها و لوایح تخصصی دعاوی ورشکستگی
                  </h3>
                </div>
                <span className="text-xs text-gray-400">آماده کپی و ثبت در دفاتر خدمات الکترونیک قضایی</span>
              </div>

              {/* Pleading 1: Company Declaration of Insolvency */}
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#F3E5AB] text-[11px] font-bold">
                      دادخواست بدوی
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                      دادخواست تاجر / شرکت به خواسته صدور حکم ورشکستگی و تعیین تاریخ توقف
                    </h4>
                  </div>
                  <button
                    onClick={() =>
                      handleCopy(
                        'p-1',
                        `خواهان: شرکت ... به شماره ثبت ... و شناسه ملی ...\nخواندگان: عموم بستانکاران و دادستان محترم عمومی و انقلاب تهران\nخواسته: صدور حکم ورشکستگی خواهان و تعیین تاریخ توقف به تاریخ ... به انضمام تعیین مدیر تصفیه\nدلایل و منضمات: ۱- دفاتر قانونی پلمب‌شده تجاری ۲- صورت دارایی و دیون ۳- گواهی‌های عدم پرداخت چک\nشرح دادخواست: با سلام، احتراما به استحضار عالی می‌رساند شرکت خواهان به دلیل نوسانات شدید ارزی و تحریم‌های ظالمانه از تاریخ ... در پرداخت دیون تجاری خود متوقف گردیده است. مستند به مواد ۴۱۲، ۴۱۳ و ۴۱۵ قانون تجارت، تقاضای صدور دادنامه مبنی بر اعلان ورشکستگی و تعیین تاریخ توقف مورد استدعاست.`
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-700 hover:bg-[#D4AF37] text-gray-700 hover:text-[#0B132B] dark:text-gray-200 font-bold text-xs flex items-center gap-1.5 border border-gray-200 dark:border-gray-600 transition-colors cursor-pointer"
                  >
                    {copiedPleading === 'p-1' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPleading === 'p-1' ? 'کپی شد' : 'کپی متن دادخواست'}</span>
                  </button>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-mono text-[11px] bg-white dark:bg-gray-900 p-3 rounded-xl border border-gray-200 dark:border-gray-800">
                  خواسته: صدور حکم ورشکستگی خواهان و تعیین تاریخ توقف مستند به مواد ۴۱۲ و ۴۱۳ قانون تجارت و توقف فوری محاسبه خسارت تاخیر تادیه بانکی بر مبنای رأی وحدت رویه شماره ۱۵۵ هیئت عمومی دیوان عالی کشور...
                </p>
              </div>

              {/* Pleading 2: Defense of Directors liability (Article 143) */}
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 text-[11px] font-bold">
                      لایحه دفاعیه
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                      لایحه دفاعیه مدیرعامل در رد دعوای مسئولیت تضامنی موضوع ماده ۱۴۳ لایحه اصلاحی
                    </h4>
                  </div>
                  <button
                    onClick={() =>
                      handleCopy(
                        'p-2',
                        `ریاست محترم دادگاه حقوقی\nدر خصوص پرونده شماره ... پیرامون ادعای مسئولیت تضامنی موکل (مدیرعامل وقت)، به استحضار می‌رساند:\n۱- ورشکستگی شرکت ناشی از فورس‌ماژور و جهش نرخ ارز رسمی بوده و هیچ‌گونه تخلف یا تعدی و تفریط از اساسنامه متوجه موکل نیست.\n۲- مطابق ماده ۱۴۳ لایحه اصلاحی قانون تجارت، مسئولیت مدیران مشروط به احراز رابطه سببیت میان تخلف انتسابی و کمبود دارایی است که در ما نحن فیه دلایل کارشناسی رسمی دلالت بر صحت عملکرد هیئت مدیره دارد.\nلذا صدور حکم بر بی‌حقی خواهان مورد استدعاست.`
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-700 hover:bg-[#D4AF37] text-gray-700 hover:text-[#0B132B] dark:text-gray-200 font-bold text-xs flex items-center gap-1.5 border border-gray-200 dark:border-gray-600 transition-colors cursor-pointer"
                  >
                    {copiedPleading === 'p-2' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPleading === 'p-2' ? 'کپی شد' : 'کپی لایحه دفاعیه'}</span>
                  </button>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-mono text-[11px] bg-white dark:bg-gray-900 p-3 rounded-xl border border-gray-200 dark:border-gray-800">
                  دفاعیه حقوقی: اثبات عدم رابطه سببیت بین تقصیر مدیر و کسری دارایی شرکت و استناد به علل قهری و شرایط تحریمی جهت سلب مسئولیت مدنی مدیران...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Precedents & Legal Doctrine */}
        {activeTab === 'precedents' && (
          <div className="space-y-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
                <Gavel className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  آراء وحدت رویه کلیدی دیوان عالی کشور در دعاوی ورشکستگی
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#D4AF37]">رأی وحدت رویه شماره ۱۵۵ - مورخ ۱۳۴۷/۱۲/۱۴</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 text-[10px] font-bold">لازم‌الاتباع</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                    توقف مطالبه خسارت تاخیر تادیه پس از تاریخ توقف تاجر
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    «از تاریخ توقف، دعوای مطالبه خسارت تاخیر تادیه بر علیه تاجر یا شرکت ورشکسته مسموع نیست؛ چه طلبکاران عادی باشند و چه بانک‌ها یا موسسات اعتباری دولتی یا خصوصی.»
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#D4AF37]">رأی وحدت رویه شماره ۷۹۰ - مورخ ۱۳۹۹/۰۴/۱۰</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 text-[10px] font-bold">لازم‌الاتباع</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                    پذیرش اعتراض ثالث بستانکاران به تاریخ توقف دادنامه ورشکستگی
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    «طلبکارانی که در دعوای ورشکستگی طرف دعوا نبوده‌اند، حق اعتراض ثالث نسبت به تاریخ توقف معین‌شده در حکم ورشکستگی را طبق ماده ۴۱۸ قانون آیین دادرسی مدنی دارا می‌باشند.»
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
