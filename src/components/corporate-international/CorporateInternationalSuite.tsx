import React, { useState } from 'react';
import {
  Briefcase,
  Building2,
  Globe2,
  Gavel,
  ShieldCheck,
  Scale,
  Award,
  Download,
  Share2,
  Sparkles,
  PhoneCall,
  Calendar,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { CorporateGovernanceManager } from './CorporateGovernanceManager';
import { IncotermsTradeSimulator } from './IncotermsTradeSimulator';
import { InternationalArbitrationClinic } from './InternationalArbitrationClinic';

interface CorporateInternationalSuiteProps {
  onBackToHome?: () => void;
  onOpenBooking?: () => void;
}

export const CorporateInternationalSuite: React.FC<CorporateInternationalSuiteProps> = ({
  onBackToHome,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'corporate' | 'incoterms' | 'arbitration'>('corporate');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060B18] py-8 sm:py-12" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8">
        {/* نوار ناوبری بالا و بازگشت */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            {onBackToHome && (
              <button
                type="button"
                onClick={onBackToHome}
                className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
              >
                <span>صفحه اصلی</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-slate-900 dark:text-white font-bold">
              پرتال جامع حقوق تجارت بین‌الملل، شرکت‌ها و داوری بازرگانی
            </span>
          </div>

          <div className="flex items-center gap-3">
            {onOpenBooking && (
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#060B18] font-bold text-xs shadow-lg hover:brightness-110 transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>درخواست مشاوره اختصاصی شرکتی</span>
              </button>
            )}
          </div>
        </div>

        {/* بنر سربرگ سلطنتی فاز ۸ */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] border border-[#D4AF37]/30 p-6 sm:p-10 text-white shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F3E5AB] text-xs font-bold">
                <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                <span>دفتر وکالت و داوری بین‌المللی سرکار خانم دکتر سیده مریم رضوی - سامانه فاز ۸</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-white tracking-tight leading-snug">
                پرتال امور شرکت‌ها، بازرگانی بین‌المللی و داوری تجاری (ICC / ACIC)
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                مدیریت مکانیزه حد نصاب مجامع شرکتی طبق لایحه اصلاحی قانون تجارت، شبیه‌ساز ۱۱ قاعده اینکوترمز ۲۰۲۰، تدوین شروط بین‌المللی بیع کالا (CISG) و کلینیک داوری اتاق بازرگانی بین‌المللی با تضمین اجرای کنوانسیون ۱۹۵۸ نیویورک.
              </p>
            </div>

            {/* کارت اعتبار دکتری حقوق بین‌الملل وکیل */}
            <div className="p-5 rounded-2xl bg-white/5 border border-[#D4AF37]/40 backdrop-blur-md space-y-3 min-w-[280px]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-[#060B18] font-black font-serif text-lg shadow-md">
                  MR
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">دکتر سیده مریم رضوی</h4>
                  <span className="text-[11px] text-[#D4AF37] block font-semibold">
                    دکتری حقوق بین‌الملل عمومی و خصوصی
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    وکیل پایه یک کانون وکلای دادگستری مرکز
                  </span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-2.5 flex items-center justify-between text-[11px] text-slate-300">
                <span>تخصص ویژه:</span>
                <span className="font-bold text-[#F3E5AB]">قراردادهای فرامرزی و داوری ICC</span>
              </div>
            </div>
          </div>
        </div>

        {/* تب‌های سه‌گانه سامانه */}
        <div className="flex flex-wrap gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('corporate')}
            className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all ${
              activeTab === 'corporate'
                ? 'bg-[#0B132B] dark:bg-white text-white dark:text-[#0B132B] shadow-lg scale-105 border-2 border-[#D4AF37]'
                : 'bg-white dark:bg-[#0B132B] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#D4AF37]" />
            <span>۱. حاکمیت شرکتی و نصاب مجامع</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('incoterms')}
            className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all ${
              activeTab === 'incoterms'
                ? 'bg-[#0B132B] dark:bg-white text-white dark:text-[#0B132B] shadow-lg scale-105 border-2 border-[#D4AF37]'
                : 'bg-white dark:bg-[#0B132B] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <Globe2 className="w-4 h-4 text-amber-500" />
            <span>۲. شبیه‌ساز اینکوترمز ۲۰۲۰ و CISG</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('arbitration')}
            className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all ${
              activeTab === 'arbitration'
                ? 'bg-[#0B132B] dark:bg-white text-white dark:text-[#0B132B] shadow-lg scale-105 border-2 border-[#D4AF37]'
                : 'bg-white dark:bg-[#0B132B] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <Gavel className="w-4 h-4 text-purple-500" />
            <span>۳. داوری بین‌المللی و نیویورک ۱۹۵۸</span>
          </button>
        </div>

        {/* محتوای تب فعال */}
        <div className="pt-2 animate-in fade-in duration-300">
          {activeTab === 'corporate' && <CorporateGovernanceManager />}
          {activeTab === 'incoterms' && <IncotermsTradeSimulator />}
          {activeTab === 'arbitration' && <InternationalArbitrationClinic />}
        </div>
      </div>
    </div>
  );
};
