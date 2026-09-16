import React, { useState } from 'react';
import {
  FileSearch,
  Scale,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  BookOpen,
  Award,
  Layers,
} from 'lucide-react';
import { ContractAuditAnalyzer } from './ContractAuditAnalyzer';
import { SupremeCourtPrecedentsHub } from './SupremeCourtPrecedentsHub';
import { PropertyDueDiligenceChecker } from './PropertyDueDiligenceChecker';

interface LegalIntelligenceSuiteProps {
  onBackToHome?: () => void;
  defaultTab?: 'audit' | 'precedents' | 'diligence';
}

export const LegalIntelligenceSuite: React.FC<LegalIntelligenceSuiteProps> = ({
  onBackToHome,
  defaultTab = 'audit',
}) => {
  const [activeTab, setActiveTab] = useState<'audit' | 'precedents' | 'diligence'>(defaultTab);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060B18] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* نوار ناوبری بالا */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-700 dark:text-slate-200 text-xs font-bold hover:border-[#D4AF37] transition-all"
              >
                <ArrowRight className="w-4 h-4" /> بازگشت به پورتال اصلی
              </button>
            )}
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              SedRazavi Legal AI Intelligence Suite • v6.0
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> فاز ۶: سامانه هوش حقوقی و ممیزی قراردادها
            </span>
          </div>
        </div>

        {/* هدر باشکوه معرفی فاز ۶ */}
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-[#060B18] via-[#0D1B3E] to-[#060B18] border-2 border-[#D4AF37]/50 shadow-2xl text-white relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500/20 text-[#D4AF37] border border-[#D4AF37]/40">
                  <Sparkles className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold text-amber-300 tracking-wider">
                  هوش مصنوعی قضایی و ممیزی قراردادها
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-white leading-tight">
                پرتال جامع هوش حقوقی، ممیزی قراردادها و تنقیح آراء دیوان عالی کشور
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                موتور هوشمند غربالگری شروط پرخطر قراردادی، تحلیل خیار غبن فاحش، فورس‌ماژور و وجه التزام، پایگاه تخصصی آراء وحدت رویه لازم‌الاتباع و ممیزی سلامت اسناد ملکی و کاداستر.
              </p>
            </div>

            {/* کارت ناظر علمی */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shrink-0 space-y-1.5 text-right w-full md:w-auto">
              <span className="block text-[11px] text-slate-400">ناظر عالی حقوقی:</span>
              <span className="text-sm font-bold text-[#D4AF37] block">دکتر سیده مریم رضوی</span>
              <span className="block text-[11px] text-slate-300">وکیل پایه یک دادگستری و پژوهشگر ارشد</span>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-4 text-[10px] text-emerald-400 font-mono">
                <span>تطبیق آرای قضایی: ۱,۲۸۰+</span>
                <span>دقت مستندات: ۹۹.۴٪</span>
              </div>
            </div>
          </div>
        </div>

        {/* نوار تب‌های تعاملی ۳ ماژول */}
        <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-[#0B132B] p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
          <button
            onClick={() => setActiveTab('audit')}
            className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'audit'
                ? 'bg-[#0B132B] dark:bg-white text-white dark:text-[#0B132B] shadow-md border border-[#D4AF37]/50'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileSearch className="w-4 h-4 text-amber-500" />
            <span>ممیزی و غربالگری قراردادها</span>
          </button>

          <button
            onClick={() => setActiveTab('precedents')}
            className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'precedents'
                ? 'bg-[#0B132B] dark:bg-white text-white dark:text-[#0B132B] shadow-md border border-[#D4AF37]/50'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Scale className="w-4 h-4 text-indigo-400" />
            <span>بانک آراء وحدت رویه دیوان عالی</span>
          </button>

          <button
            onClick={() => setActiveTab('diligence')}
            className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'diligence'
                ? 'bg-[#0B132B] dark:bg-white text-white dark:text-[#0B132B] shadow-md border border-[#D4AF37]/50'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>ممیزی سلامت اسناد ملکی و کاداستر</span>
          </button>
        </div>

        {/* نمایش ماژول انتخابی */}
        <div className="transition-all duration-300">
          {activeTab === 'audit' && <ContractAuditAnalyzer />}
          {activeTab === 'precedents' && <SupremeCourtPrecedentsHub />}
          {activeTab === 'diligence' && <PropertyDueDiligenceChecker />}
        </div>
      </div>
    </div>
  );
};
