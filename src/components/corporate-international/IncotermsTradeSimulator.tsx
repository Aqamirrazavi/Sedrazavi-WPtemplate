import React, { useState } from 'react';
import {
  Globe,
  Ship,
  Truck,
  Anchor,
  Shield,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  ArrowRightLeft,
  DollarSign,
  PackageCheck,
  FileCheck,
  Sparkles,
  HelpCircle,
  Layers,
  ArrowLeft,
} from 'lucide-react';
import { INCOTERMS_RULES_DATA } from '../../data/mockData';
import { IncotermsRule } from '../../types/theme';

export const IncotermsTradeSimulator: React.FC = () => {
  const [selectedCode, setSelectedCode] = useState<string>('CIP');
  const [filterTransport, setFilterTransport] = useState<'all' | 'any' | 'sea_only'>('all');
  const [copiedClause, setCopiedClause] = useState<boolean>(false);

  // متغیرهای قرارداد نمونه جهت تولید شرط بین‌المللی
  const [namedPlace, setNamedPlace] = useState<string>('بندرعباس / پایانه شهید رجایی');
  const [contractCurrency, setContractCurrency] = useState<string>('EUR');
  const [includeHardshipClause, setIncludeHardshipClause] = useState<boolean>(true);

  const selectedRule: IncotermsRule =
    INCOTERMS_RULES_DATA.find((r) => r.code === selectedCode) || INCOTERMS_RULES_DATA[3];

  const filteredRules = INCOTERMS_RULES_DATA.filter((r) => {
    if (filterTransport === 'all') return true;
    return r.transportType === filterTransport;
  });

  // تولید شرط قراردادی اینکوترمز ۲۰۲۰ به دو زبان
  const generatedClauseFa = `ماده ... - شرایط تحویل کالا و انتقال ضمان معاوضی:
۱. تحویل کلیه محموله‌های موضوع این قرارداد بر اساس قاعده «${selectedRule.code} - ${namedPlace} (Incoterms 2020)» صورت می‌پذیرد.
۲. نقطه انتقال ریسک خسارت یا تلف، پرداخت کرایه حمل، اخذ بیمه‌نامه با پوشش ${selectedRule.insuranceResponsible} و ترخیص صادراتی/وارداتی دقیقاً تابع تفسیر رسمی اتاق بازرگانی بین‌المللی (ICC Publication No. 723) خواهد بود.
۳. کنوانسیون سازمان ملل متحد درباره قراردادهای بیع بین‌المللی کالا (CISG 1980 وین) بر تعهدات طرفین در موارد مسکوت حاکم خواهد بود.${
    includeHardshipClause
      ? '\n۴. در صورت وقوع شرایط فورس‌ماژور یا تغییر فاحش اوضاع و احوال اقتصادی، طرفین ملزم به اجرای شرط تعدیل و بازنگری مندرج در کلوز ۲۰۲۰ فورس‌ماژور و هاردشیپ اتاق بازرگانی بین‌المللی (ICC Force Majeure & Hardship Clause) می‌باشند.'
      : ''
  }`;

  const handleCopyClause = () => {
    navigator.clipboard.writeText(generatedClauseFa);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 2500);
  };

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100">
      {/* هدر بخش اینکوترمز ۲۰۲۰ */}
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800/80 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                <Globe className="w-5 h-5" />
              </span>
              <h3 className="text-lg sm:text-xl font-black font-serif text-slate-900 dark:text-white">
                شبیه‌ساز تخصصی قواعد اینکوترمز ۲۰۲۰ و انتقال ریسک بازرگانی بین‌المللی
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              تحلیل ۱۱ قاعده رسمی اتاق بازرگانی بین‌المللی (ICC 2020)، تفکیک هزینه‌ها و انتقال ضمان معاوضی طبق کنوانسیون بیع وین (CISG 1980).
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => setFilterTransport('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                filterTransport === 'all'
                  ? 'bg-white dark:bg-[#0B132B] text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              همه روش‌ها
            </button>
            <button
              type="button"
              onClick={() => setFilterTransport('any')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                filterTransport === 'any'
                  ? 'bg-white dark:bg-[#0B132B] text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              حمل چندوجهی / زمینی / هوایی
            </button>
            <button
              type="button"
              onClick={() => setFilterTransport('sea_only')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                filterTransport === 'sea_only'
                  ? 'bg-white dark:bg-[#0B132B] text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              <Ship className="w-3.5 h-3.5" />
              صرفاً حمل دریایی
            </button>
          </div>
        </div>

        {/* لیست افقی و انتخاب‌گر ۱۱ قاعده اینکوترمز */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-11 gap-2">
          {filteredRules.map((rule) => {
            const isSelected = rule.code === selectedCode;
            return (
              <button
                key={rule.code}
                onClick={() => setSelectedCode(rule.code)}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-[#0B132B] dark:bg-white text-white dark:text-[#0B132B] border-[#D4AF37] shadow-lg scale-105'
                    : 'bg-slate-50 dark:bg-[#070D1E] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <span className="font-mono text-sm font-black">{rule.code}</span>
                <span className="text-[10px] truncate max-w-full opacity-80">{rule.category}</span>
              </button>
            );
          })}
        </div>

        {/* کارت مشخصات قاعده انتخابی */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] font-mono font-black text-sm">
                  {selectedRule.code} (Incoterms 2020)
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  {selectedRule.transportType === 'sea_only' ? 'صرفاً حمل دریایی' : 'کلیه شیوه‌های حمل (ترکیبی)'}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                {selectedRule.nameFa}
              </h4>
              <span className="text-xs text-slate-400 font-mono block mt-0.5">{selectedRule.nameEn}</span>
            </div>

            {/* نشانگر سطح ریسک خریدار */}
            <div className="p-3 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-700 min-w-[180px] text-right">
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-slate-500">شاخص ریسک خریدار:</span>
                <span
                  className={`font-mono font-black ${
                    selectedRule.riskScore >= 7
                      ? 'text-rose-500'
                      : selectedRule.riskScore >= 4
                      ? 'text-amber-500'
                      : 'text-emerald-500'
                  }`}
                >
                  {selectedRule.riskScore} از ۱۰
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full ${
                    selectedRule.riskScore >= 7
                      ? 'bg-rose-500'
                      : selectedRule.riskScore >= 4
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${selectedRule.riskScore * 10}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                {selectedRule.riskScore <= 3 ? 'ایده‌آل برای واردکننده' : selectedRule.riskScore >= 7 ? 'ریسک سنگین برای خریدار' : 'توازن متعادل ریسک'}
              </span>
            </div>
          </div>

          {/* ماتریس ۷ مرحله‌ای زنجیره تأمین و تقسیم تعهدات فروشنده و خریدار */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-500" />
              ماتریس تقسیم مسئولیت‌ها و هزینه‌ها در قاعده {selectedRule.code}:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {/* ۱. کرایه حمل اصلی */}
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block">کرایه حمل و نقل اصلی:</span>
                <div className="flex items-center gap-1.5 font-bold">
                  <Truck className="w-4 h-4 text-indigo-500" />
                  <span className={selectedRule.freightPayer === 'فروشنده' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-200'}>
                    پرداخت توسط: {selectedRule.freightPayer}
                  </span>
                </div>
              </div>

              {/* ۲. پوشش بیمه باربری */}
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block">بیمه باربری بین‌المللی:</span>
                <div className="flex items-center gap-1.5 font-bold">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span className="text-slate-700 dark:text-slate-200 truncate">
                    {selectedRule.insuranceResponsible}
                  </span>
                </div>
              </div>

              {/* ۳. ترخیص صادراتی (گمرک مبدأ) */}
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block">ترخیص گمرکی صادرات:</span>
                <div className="flex items-center gap-1.5 font-bold">
                  <FileCheck className="w-4 h-4 text-amber-500" />
                  <span className={selectedRule.exportCustoms === 'فروشنده' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}>
                    بر عهده: {selectedRule.exportCustoms}
                  </span>
                </div>
              </div>

              {/* ۴. ترخیص وارداتی (گمرک مقصد) */}
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block">ترخیص گمرکی و عوارض ورود:</span>
                <div className="flex items-center gap-1.5 font-bold">
                  <DollarSign className="w-4 h-4 text-sky-500" />
                  <span className={selectedRule.importCustoms === 'فروشنده' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200'}>
                    بر عهده: {selectedRule.importCustoms}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* نقطه انتقال ضمان معاوضی (ریسک) */}
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-700 dark:text-[#D4AF37] font-bold">
              <ArrowRightLeft className="w-4 h-4" />
              <span>نقطه دقیق انتقال ریسک و ضمان معاوضی (Risk Transfer):</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
              مسئولیت فروشنده تا: <span className="text-indigo-600 dark:text-indigo-400">{selectedRule.sellerRiskUntil}</span>. پس از آن ریسک هرگونه حادثه یا تلف متوجه خریدار خواهد بود.
            </p>
          </div>

          {/* مشاوره راهبردی دکتر رضوی و سازگاری با کنوانسیون وین */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 space-y-1.5">
              <span className="font-bold text-[#AA820A] dark:text-[#D4AF37] flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                تحلیل و توصیه راهبردی دکتر سیده مریم رضوی:
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedRule.practicalAdvice}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 space-y-1.5">
              <span className="font-bold text-indigo-500 flex items-center gap-1">
                <FileCheck className="w-4 h-4" />
                انطباق با کنوانسیون بیع بین‌المللی کالا (CISG 1980 وین):
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedRule.cisgCompatibilityNote}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ژنراتور شرط قراردادی اینکوترمز برای درج در قراردادهای تجاری */}
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="space-y-0.5">
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-[#D4AF37]" />
              تدوین شرط رسمی اینکوترمز ۲۰۲۰ و فورس‌ماژور ICC در قرارداد بازرگانی
            </h4>
            <p className="text-xs text-slate-500">
              پیش‌نویس صریح حقوقی جهت جلوگیری از ابهام در محاکم بین‌المللی و دیوان‌های داوری.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyClause}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            {copiedClause ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" /> کپی شد
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> کپی شرط
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">محل یا بندر نامبرده (Named Place):</label>
            <input
              type="text"
              value={namedPlace}
              onChange={(e) => setNamedPlace(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070D1E] text-xs font-bold"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">ارز قرارداد:</label>
            <select
              value={contractCurrency}
              onChange={(e) => setContractCurrency(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070D1E] text-xs font-bold"
            >
              <option value="EUR">یورو (EUR)</option>
              <option value="USD">دلار آمریکا (USD)</option>
              <option value="AED">درهم امارات (AED)</option>
              <option value="CNY">یوآن چین (CNY)</option>
              <option value="IRR">ریال ایران (IRR)</option>
            </select>
          </div>

          <div className="flex items-center pt-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeHardshipClause}
                onChange={(e) => setIncludeHardshipClause(e.target.checked)}
                className="rounded text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                افزودن شرط تغییر اوضاع و احوال (ICC Hardship Clause 2020)
              </span>
            </label>
          </div>
        </div>

        {/* کادر شرط تولید شده */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 text-xs font-mono leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200 select-all">
          {generatedClauseFa}
        </div>
      </div>
    </div>
  );
};
