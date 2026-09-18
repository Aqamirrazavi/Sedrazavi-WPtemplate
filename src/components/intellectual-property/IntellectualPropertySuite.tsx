import React, { useState } from 'react';
import {
  Sparkles,
  ShieldAlert,
  PieChart,
  Code2,
  ArrowRight,
  Award,
  Lock,
  Layers,
  FileCheck2,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { TrademarkNiceClassifier } from './TrademarkNiceClassifier';
import { StartupVestingSimulator } from './StartupVestingSimulator';
import { SoftwareLicensingEscrow } from './SoftwareLicensingEscrow';

interface IntellectualPropertySuiteProps {
  onBackToHome?: () => void;
  onOpenBooking?: () => void;
}

export const IntellectualPropertySuite: React.FC<IntellectualPropertySuiteProps> = ({
  onBackToHome,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'trademark' | 'vesting' | 'licensing'>('trademark');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060B18] py-8 sm:py-12 transition-colors duration-300" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* نوار ناوبری و بازگشت */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-[#D4AF37] transition-all shadow-sm group"
              >
                <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#D4AF37]" />
                بازگشت به صفحه اصلی
              </button>
            )}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>دفتر وکالت دکتر سیده مریم رضوی</span>
              <span>/</span>
              <span className="text-[#D4AF37]">مرکز مالکیت فکری، استارتاپ‌ها و فناوری (فاز ۹)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] self-start sm:self-auto">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>فاز ۹: ممیزی برند، شبیه‌ساز وستینگ استارتاپ‌ها و لایسنس نرم‌افزار</span>
          </div>
        </div>

        {/* هدر ارائه‌دهنده فاز ۹ */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#060B18] via-[#0D1B3E] to-[#060B18] border-2 border-[#D4AF37]/40 shadow-2xl p-6 sm:p-10 text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F3E5AB] text-xs font-bold">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                پرتال تخصصی حقوق فناوری اطلاعات، مالکیت فکری و شتاب‌دهی استارتاپ‌ها
              </div>

              <h1 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight leading-snug">
                صیانت از دارایی‌های نامشهود، برند و حقوق مؤسسان فناوری
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                موتور هوشمند انطباق طبقات ۴۵‌گانه نیس (Nice Classification)، تحلیل ریسک ثبت علامت تجاری در سازمان مالکیت صنعتی و WIPO، شبیه‌ساز محاسباتی تملک تدریجی سهام (Vesting) و سازنده قراردادهای بین‌المللی لایسنس نرم‌افزار (SaaS / Escrow).
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full lg:w-auto min-w-[240px]">
              <div className="p-4 rounded-2xl bg-white/5 border border-[#D4AF37]/30 backdrop-blur-md space-y-1.5 text-right">
                <span className="text-[11px] font-bold text-[#F3E5AB] block">سرپرستی پرونده‌های فناورانه:</span>
                <span className="text-sm font-black text-white block">دکتر سیده مریم رضوی</span>
                <span className="text-xs text-[#D4AF37] block">دکتری حقوق بین‌الملل و داوری دعاوی تجاری</span>
              </div>

              {onOpenBooking && (
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-slate-950 font-bold text-xs hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  رزرو مشاوره ثبت برند و لایسنس فناوری
                </button>
              )}
            </div>
          </div>
        </div>

        {/* زبانه‌های ناوبری ۳ گانه */}
        <div className="flex rounded-2xl bg-white dark:bg-[#0B132B] p-1.5 border border-slate-200 dark:border-slate-800 shadow-sm gap-2">
          <button
            onClick={() => setActiveTab('trademark')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'trademark'
                ? 'bg-[#D4AF37] text-slate-900 shadow-md font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            ۱. ممیزی برند و استعلام طبقات نیس (Nice Classes)
          </button>

          <button
            onClick={() => setActiveTab('vesting')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'vesting'
                ? 'bg-[#D4AF37] text-slate-900 shadow-md font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <PieChart className="w-4 h-4" />
            ۲. شبیه‌ساز وستینگ سهام و قرارداد سهامداری (SHA)
          </button>

          <button
            onClick={() => setActiveTab('licensing')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'licensing'
                ? 'bg-[#D4AF37] text-slate-900 shadow-md font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            ۳. لایسنس نرم‌افزار، SaaS و امانت سورس‌کد (Escrow)
          </button>
        </div>

        {/* محتوای فعال تب‌ها */}
        {activeTab === 'trademark' && <TrademarkNiceClassifier />}
        {activeTab === 'vesting' && <StartupVestingSimulator />}
        {activeTab === 'licensing' && <SoftwareLicensingEscrow />}
      </div>
    </div>
  );
};
