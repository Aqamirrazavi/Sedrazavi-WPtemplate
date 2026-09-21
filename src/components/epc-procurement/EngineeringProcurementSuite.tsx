import React, { useState } from 'react';
import {
  HardHat,
  FileSpreadsheet,
  Clock,
  ShieldAlert,
  Coins,
  Calculator,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Building2,
  Sparkles,
  ChevronRight,
  Download,
  Printer,
  Scale,
  RefreshCw,
  FolderGit2,
  HelpCircle,
  FileCheck
} from 'lucide-react';

export const EngineeringProcurementSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const [activeTab, setActiveTab] = useState<'eot_calculator' | 'contract_types' | 'termination_shield' | 'circulars'>('eot_calculator');

  // EOT (Extension of Time) Calculator Inputs based on Circular 5090
  const [contractAmountBillion, setContractAmountBillion] = useState(120); // ۱۲۰ میلیارد تومان
  const [contractDurationDays, setContractDurationDays] = useState(720); // ۲۴ ماه
  const [overduePaymentDays, setOverduePaymentDays] = useState(45); // ۴۵ روز تاخیر کارفرما
  const [delayedPaymentMillion, setDelayedPaymentMillion] = useState(8500); // ۸.۵ میلیارد تومان صورت وضعیت
  const [siteDeliveryDelayDays, setSiteDeliveryDelayDays] = useState(30); // ۳۰ روز تاخیر تحویل زمین

  // Circular 5090 formula: T = (M * D) / P
  // T = تاخیر مجاز ناشی از دیرکرد پرداخت
  const calculateFinancialDelayDays = () => {
    if (contractAmountBillion <= 0) return 0;
    const contractTotalMillion = contractAmountBillion * 1000;
    const allowedDays = Math.round((delayedPaymentMillion * overduePaymentDays) / (contractTotalMillion / (contractDurationDays / 30)));
    return Math.max(0, allowedDays);
  };

  const financialDelayDays = calculateFinancialDelayDays();
  const totalPermittedExtensionDays = financialDelayDays + siteDeliveryDelayDays;

  // Overhead costs claim estimation (هزینه بالاسری دوران تمدید)
  const estimatedDailyOverheadToman = Math.round((contractAmountBillion * 1000000000 * 0.0003));
  const totalOverheadClaimToman = estimatedDailyOverheadToman * totalPermittedExtensionDays;

  return (
    <div className="min-h-screen bg-[#070B19] text-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-l from-[#0B132B] via-[#0F1B3E] to-[#0B132B] border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -left-20 -top-20 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
              <HardHat className="w-3.5 h-3.5" />
              <span>فاز ۲۲: سامانه تخصصی دعاوی پیمانکاری، EPC، نشریه ۴۳۱۱ و فیدیک (FIDIC Legal Suite)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight">
              مدیریت حقوقی پیمان‌ها، کلیم و تعدیل، تاخیرات مجاز (بخشنامه ۵۰۹۰) و منع ضبط ضمانت‌نامه
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              تحلیل و دادرسی دعاوی ناشی از شرایط عمومی پیمان (نشریه ۴۳۱۱ سازمان برنامه و بودجه)، قراردادهای فیدیک (FIDIC Red/Yellow/Silver)، فسخ ماده ۴۶، خاتمه ماده ۴۸ و ارجاع به شورای عالی فنی.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-4 py-2.5 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-xs font-bold text-gray-200 transition-colors border border-gray-700"
              >
                صفحه نخست
              </button>
            )}
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#b5952f] text-[#070B19] text-xs font-black transition-colors shadow-lg shadow-[#D4AF37]/20"
              >
                پیشخوان وکیل
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('eot_calculator')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'eot_calculator'
                ? 'bg-[#D4AF37] text-[#070B19] shadow-lg shadow-[#D4AF37]/25'
                : 'bg-[#0B132B]/60 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>محاسبه‌گر تاخیرات مجاز و کلیم (بخشنامه ۵۰۹۰ و ۱۷۳۰۷۲)</span>
          </button>

          <button
            onClick={() => setActiveTab('contract_types')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'contract_types'
                ? 'bg-[#D4AF37] text-[#070B19] shadow-lg shadow-[#D4AF37]/25'
                : 'bg-[#0B132B]/60 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>تطبیق قراردادهای EPC، فیدیک (FIDIC) و شرایط عمومی</span>
          </button>

          <button
            onClick={() => setActiveTab('termination_shield')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'termination_shield'
                ? 'bg-[#D4AF37] text-[#070B19] shadow-lg shadow-[#D4AF37]/25'
                : 'bg-[#0B132B]/60 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>پروتکل مقابله با فسخ ماده ۴۶ و ممانعت از ضبط ضمانت‌نامه</span>
          </button>

          <button
            onClick={() => setActiveTab('circulars')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'circulars'
                ? 'bg-[#D4AF37] text-[#070B19] shadow-lg shadow-[#D4AF37]/25'
                : 'bg-[#0B132B]/60 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>شاخص‌های تعدیل سه ماهه و آرای شورای عالی فنی</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'eot_calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Inputs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#0B132B]/80 rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#D4AF37]" />
                    <span>پارامترهای پروژه، صورت‌وضعیت‌ها و تاخیرات کارفرما</span>
                  </h2>
                  <span className="text-xs text-[#D4AF37] font-mono font-bold">بخشنامه ۵۰۹۰/۵۴-۱۱۰۴/۱۰۲</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">مبلغ اولیه پیمان (میلیارد تومان):</label>
                    <input
                      type="number"
                      value={contractAmountBillion}
                      onChange={(e) => setContractAmountBillion(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-[#070B19] border border-gray-700 text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">مدت اولیه پیمان طبق قرارداد (روز):</label>
                    <input
                      type="number"
                      value={contractDurationDays}
                      onChange={(e) => setContractDurationDays(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-[#070B19] border border-gray-700 text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">مبلغ صورت‌وضعیت معوق (میلیون تومان):</label>
                    <input
                      type="number"
                      value={delayedPaymentMillion}
                      onChange={(e) => setDelayedPaymentMillion(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-[#070B19] border border-gray-700 text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">تعداد روز تاخیر در پرداخت صورت‌وضعیت:</label>
                    <input
                      type="number"
                      value={overduePaymentDays}
                      onChange={(e) => setOverduePaymentDays(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-[#070B19] border border-gray-700 text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-2">تاخیر کارفرما در تحویل زمین / صدور مجوزها (روز):</label>
                  <input
                    type="number"
                    value={siteDeliveryDelayDays}
                    onChange={(e) => setSiteDeliveryDelayDays(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-[#070B19] border border-gray-700 text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    ماده ۲۸ شرایط عمومی پیمان: تاخیر در تحویل زمین بیش از ۳۰ روز به پیمانکار حق مطالبه تمدید یا خاتمه می‌دهد.
                  </span>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gradient-to-b from-[#0B132B] to-[#070B19] rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/30 shadow-2xl space-y-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#070B19] border border-gray-700 text-xs font-bold text-gray-300">
                  <Calculator className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>نتایج رسمی تمدید مدت پیمان (EOT Report)</span>
                </div>

                <div className="p-6 rounded-2xl bg-[#070B19] border border-gray-800 space-y-2">
                  <span className="text-xs text-gray-400 block font-bold">کل مدت مجاز تمدید پیمان (بدون جریمه):</span>
                  <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-400">
                    {totalPermittedExtensionDays} روز
                  </div>
                  <span className="text-xs text-gray-300 block font-bold">
                    معادل {(totalPermittedExtensionDays / 30).toFixed(1)} ماه تمدید قطعی
                  </span>
                </div>

                <div className="space-y-3 text-right text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#070B19] border border-gray-800">
                    <span className="text-gray-400">تاخیر مجاز مالی (بخشنامه ۵۰۹۰):</span>
                    <span className="font-bold text-white font-mono">{financialDelayDays} روز</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#070B19] border border-gray-800">
                    <span className="text-gray-400">تاخیر تحویل زمین و معارضات:</span>
                    <span className="font-bold text-white font-mono">{siteDeliveryDelayDays} روز</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#070B19] border border-gray-800">
                    <span className="text-gray-400">کلیم هزینه بالاسری دوران تمدید:</span>
                    <span className="font-bold text-[#D4AF37] font-mono">
                      {(totalOverheadClaimToman / 1000000000).toFixed(2)} میلیارد تومان
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-right text-xs text-emerald-300 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>سپر امنیتی در برابر ضبط ضمانت‌نامه:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-emerald-200/90">
                    با اثبات {totalPermittedExtensionDays} روز تاخیر مجاز، کارفرما از اعمال جریمه تاخیرات ماده ۵۰ و ضبط ضمانت‌نامه حسن انجام تعهدات منع قانونی دارد.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contract_types' && (
          <div className="space-y-6">
            <div className="bg-[#0B132B]/80 rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-xl space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 pb-4 border-b border-gray-800">
                <Building2 className="w-5 h-5 text-[#D4AF37]" />
                <span>مقایسه ساختاری قراردادهای فیدیک (FIDIC) و شرایط عمومی پیمان ایران (نشریه ۴۳۱۱)</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-red-500/20 text-red-400 text-xs font-bold">
                      FIDIC Red Book
                    </span>
                    <span className="text-xs text-gray-400">مهندسی سنتی</span>
                  </div>
                  <h3 className="font-bold text-white text-sm">پیمان‌های احداث و ساخت سنتی</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    طراحی توسط کارفرما انجام می‌شود و پیمانکار مسئولیت ساخت بر اساس نقشه‌ها را دارد. پرداخت بر اساس فهرست بها و اندازه‌گیری کار انجام‌شده (Measurement).
                  </p>
                  <div className="text-[11px] text-[#D4AF37] font-bold">
                    نزدیک‌ترین مدل به نشریه ۴۳۱۱ ایران
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-yellow-500/20 text-yellow-400 text-xs font-bold">
                      FIDIC Yellow Book
                    </span>
                    <span className="text-xs text-gray-400">طرح و ساخت (Design-Build)</span>
                  </div>
                  <h3 className="font-bold text-white text-sm">قراردادهای طراحی و اجرا</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    مسئولیت طراحی تفصیلی و ساخت به‌طور یکپارچه بر عهده پیمانکار است. کارفرما صرفاً نیازمندی‌های کارفرمایی (Employer's Requirements) را ارائه می‌دهد.
                  </p>
                  <div className="text-[11px] text-[#D4AF37] font-bold">
                    کاهش ادعاهای تداخل طراحی و اجرا
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-500/20 text-slate-300 text-xs font-bold">
                      FIDIC Silver Book
                    </span>
                    <span className="text-xs text-gray-400">EPC / کلیددردست</span>
                  </div>
                  <h3 className="font-bold text-white text-sm">پروژه‌های مهندسی، تامین و ساخت (EPC)</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    ریسک حداکثری به پیمانکار منتقل می‌شود. قیمت مقطوع (Lump Sum) و تاریخ اتمام پروژه کاملاً تضمین‌شده است. مناسب پروژه‌های نفت، گاز، نیروگاه و پتروشیمی.
                  </p>
                  <div className="text-[11px] text-[#D4AF37] font-bold">
                    بالاترین ریسک مالی و حقوقی برای پیمانکار
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'termination_shield' && (
          <div className="space-y-6">
            <div className="bg-[#0B132B]/80 rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-500" />
                  <span>راهبرد دفاع حقوقی در برابر فسخ ماده ۴۶ و توقف دستور ضبط ضمانت‌نامه</span>
                </h2>
                <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold border border-rose-500/30">
                  اقدام فوری و اضطراری
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-300 leading-relaxed">
                <div className="p-5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-3">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <span className="text-[#D4AF37]">۱.</span>
                    <span>اخذ دستور موقت توقف پرداخت ضمانت‌نامه بانکی</span>
                  </h3>
                  <p>
                    ضمانت‌نامه‌های بانکی عندالمطالبه (On-Demand) هستند، اما در صورت اثبات سوءاستفاده از حق یا تقلب اسنادی (Fraud Rule)، وکیل می‌تواند با استناد به ماده ۳۱۰ قانون آیین دادرسی مدنی، دستور موقت منع پرداخت به نفع کارفرما را از دادگاه عمومی حقوقی اخذ کند.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-3">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <span className="text-[#D4AF37]">۲.</span>
                    <span>تبدیل فسخ ماده ۴۶ به خاتمه ماده ۴۸</span>
                  </h3>
                  <p>
                    در صورت اثبات تقصیر کارفرما در پرداخت‌ها یا تاخیرات اساسی در تحویل زمین، فسخ پیمان غیرقانونی بوده و وضعیت پیمان به «خاتمه پیمان بر اساس ماده ۴۸» تغییر می‌یابد که مانع ضبط ضمانت‌نامه شده و کارفرما را مکلف به آزادسازی مطالبات و خرید مصالح پای کار می‌کند.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-3">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <span className="text-[#D4AF37]">۳.</span>
                    <span>ارجاع اختلاف به شورای عالی فنی (ماده ۵۳ شرایط عمومی)</span>
                  </h3>
                  <p>
                    پیمانکاران پروژه‌های طرح‌های تملک دارایی‌های سرمایه‌ای می‌توانند جهت حل اختلاف به شورای عالی فنی سازمان برنامه و بودجه مراجعه نمایند که تصمیمات آن برای دستگاه‌های اجرایی دولتی لازم‌الاجرا می‌باشد.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-3">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <span className="text-[#D4AF37]">۴.</span>
                    <span>تامین دلیل کارشناسی قبل از تحویل کارگاه</span>
                  </h3>
                  <p>
                    قبل از اینکه کارفرما اقدام به تصرف کارگاه و تحویل کار به پیمانکار بعدی کند، تقاضای فوری تامین دلیل با جلب نظر هیات کارشناسان رسمی جهت صورت‌برداری از کلیه ماشین‌آلات، مصالح پای‌کار و احجام واقعی عملیات انجام‌شده ضروری است.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'circulars' && (
          <div className="bg-[#0B132B]/80 rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 pb-4 border-b border-gray-800">
              <FileText className="w-5 h-5 text-[#D4AF37]" />
              <span>فهرست بخشنامه‌های کلیدی سازمان برنامه و بودجه کشور در دعاوی پیمانکاری</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#070B19] border border-gray-800 space-y-2">
                <span className="font-bold text-[#D4AF37] block">بخشنامه ۵۰۹۰ (تعیین تاخیرات ناشی از تاخیر در پرداخت‌ها)</span>
                <p className="text-gray-300">
                  فرمول محاسبه روزهای تاخیر مجاز ناشی از دیرکرد کارفرما در پرداخت صورت‌وضعیت‌ها و پیش‌پرداخت.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#070B19] border border-gray-800 space-y-2">
                <span className="font-bold text-[#D4AF37] block">دستورالعمل نحوه جبران آثار ناشی از افزایش قیمت ارز</span>
                <p className="text-gray-300">
                  فرمول‌های جبران خسارت نوسانات ارزی برای قراردادهای فاقد تعدیل آحاد بها و پیمان‌های ارزی/ریالی.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#070B19] border border-gray-800 space-y-2">
                <span className="font-bold text-[#D4AF37] block">آیین‌نامه تضمین معاملات دولتی (تصویب‌نامه ۱۲۳۴۰۲/ت۵۰۶۵۹هـ)</span>
                <p className="text-gray-300">
                  قوانین حاکم بر انواع ضمانت‌نامه‌های پیش‌پرداخت، شرکت در فرآیند ارجاع کار، انجام تعهدات و استرداد آنها.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#070B19] border border-gray-800 space-y-2">
                <span className="font-bold text-[#D4AF37] block">نشریه ۴۳۱۱ (موافقت‌نامه، شرایط عمومی و شرایط خصوصی پیمان)</span>
                <p className="text-gray-300">
                  متن مادر و مرجع حاکم بر ۵۴ ماده روابط کارفرما، مهندس مشاور و پیمانکار در جمهوری اسلامی ایران.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
