import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  FileText,
  Printer,
  Sparkles,
  ExternalLink,
  Info,
  Check,
  XCircle,
} from 'lucide-react';
import { PROPERTY_DUE_DILIGENCE_CHECKLIST } from '../../data/mockData';

export const PropertyDueDiligenceChecker: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, 'passed' | 'warning' | 'failed' | 'pending'>>({
    'chk-1': 'passed',
    'chk-2': 'warning',
    'chk-3': 'passed',
    'chk-4': 'pending',
    'chk-5': 'passed',
  });

  const [expandedCheckId, setExpandedCheckId] = useState<string | null>('chk-2');

  const setStatus = (id: string, status: 'passed' | 'warning' | 'failed' | 'pending') => {
    setCheckedItems((prev) => ({ ...prev, [id]: status }));
  };

  // محاسبه شاخص امنیت معامله
  const calculateSafetyIndex = () => {
    let totalWeight = 0;
    let earnedScore = 0;

    PROPERTY_DUE_DILIGENCE_CHECKLIST.forEach((chk) => {
      totalWeight += chk.riskWeight;
      const status = checkedItems[chk.id] || 'pending';
      if (status === 'passed') earnedScore += chk.riskWeight;
      else if (status === 'warning') earnedScore += chk.riskWeight * 0.4;
      else if (status === 'pending') earnedScore += chk.riskWeight * 0.2;
      // failed gives 0
    });

    return Math.round((earnedScore / totalWeight) * 100);
  };

  const safetyIndex = calculateSafetyIndex();

  const getSafetyBadge = (score: number) => {
    if (score >= 80) {
      return {
        label: 'معامله با ریسک پایین و قابل قبول',
        color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
        advice: 'مدارک و استعلامات در شرایط مناسب قرار دارند؛ با رعایت شرایط پرداخت مرحله‌ای قرارداد منعقد گردد.',
      };
    }
    if (score >= 50) {
      return {
        label: 'ریسک متوسط - نیاز به استعلامات تکمیلی',
        color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
        advice: 'موارد مشکوک نیازمند گواهی رسمی از دفاتر اسناد رسمی، شهرداری یا بانک مرتهن پیش از پرداخت ثمن است.',
      };
    }
    return {
      label: 'خطرناک و با ریسک فوق‌العاده بالا',
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
      advice: 'هشدار قطعی: احتمال وقوع کلاهبرداری یا معامله فضولی وجود دارد. به هیچ وجه بیعانه پرداخت ننمایید.',
    };
  };

  const badgeInfo = getSafetyBadge(safetyIndex);

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100">
      {/* هدر بخش ممیزی اسناد ملکی */}
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800/80 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
                <Building2 className="w-5 h-5" />
              </span>
              <h3 className="text-lg sm:text-xl font-black font-serif text-slate-900 dark:text-white">
                سامانه هوشمند ممیزی سلامت اسناد ملکی و کاداستر (Due Diligence)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              چک‌لیست تخصصی بررسی موانع نقل‌وانتقال، بازداشت‌های ثبتی، رهن بانکی، اوقاف و سلامت وکالت‌نامه‌ها پیش از امضای مبایعه‌نامه.
            </p>
          </div>

          {/* شاخص سلامت معامله ملکی */}
          <div className={`p-4 rounded-2xl border text-right space-y-1 ${badgeInfo.color} min-w-[240px]`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold opacity-80">شاخص امنیت معامله:</span>
              <span className="text-2xl font-black font-mono">{safetyIndex}٪</span>
            </div>
            <span className="block text-xs font-bold">{badgeInfo.label}</span>
          </div>
        </div>

        {/* پیام مشاوره وکیل */}
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-800 dark:text-amber-300 block mb-0.5">
              توصیه راهبردی سرکار خانم دکتر سیده مریم رضوی:
            </span>
            {badgeInfo.advice}
          </div>
        </div>
      </div>

      {/* چک‌لیست تعاملی بررسی اسناد */}
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
          موارد ۵ گانه غربالگری پیش از امضای مبایعه‌نامه ملکی
        </h4>

        <div className="space-y-4">
          {PROPERTY_DUE_DILIGENCE_CHECKLIST.map((chk, index) => {
            const status = checkedItems[chk.id] || 'pending';
            const isExpanded = expandedCheckId === chk.id;

            return (
              <div
                key={chk.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-[#070D1E]/60 overflow-hidden shadow-sm transition-all"
              >
                {/* هدر آیتم */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div
                    onClick={() => setExpandedCheckId(isExpanded ? null : chk.id)}
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-bold flex items-center justify-center font-mono">
                      {index + 1}
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                        {chk.title}
                      </h5>
                      <span className="text-[11px] text-slate-400">{chk.category} • ضریب اهمیت: {chk.riskWeight} از ۱۰</span>
                    </div>
                  </div>

                  {/* کنترل وضعیت تعاملی */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                    <button
                      onClick={() => setStatus(chk.id, 'passed')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        status === 'passed'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                      }`}
                    >
                      <Check className="w-3 h-3" /> تأیید شد
                    </button>
                    <button
                      onClick={() => setStatus(chk.id, 'warning')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        status === 'warning'
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                      }`}
                    >
                      <AlertTriangle className="w-3 h-3" /> ابهام / مشکوک
                    </button>
                    <button
                      onClick={() => setStatus(chk.id, 'failed')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        status === 'failed'
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                      }`}
                    >
                      <XCircle className="w-3 h-3" /> رد شده
                    </button>
                  </div>
                </div>

                {/* توضیحات و راهنمای استعلام */}
                {isExpanded && (
                  <div className="p-5 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs sm:text-sm bg-white dark:bg-[#0B132B]">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-700 dark:text-slate-300 block">شرح و نحوه بررسی:</span>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{chk.description}</p>
                      <span className="block text-indigo-500 dark:text-indigo-400 font-semibold pt-1">
                        روش استعلام: {chk.howToCheck}
                      </span>
                    </div>

                    {/* نشانه‌های هشدار دهنده کلاهبرداری */}
                    <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-1.5">
                      <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> زنگ خطرهای معامله (Red Flags):
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 text-xs">
                        {chk.warningSigns.map((w, wIdx) => (
                          <li key={wIdx}>{w}</li>
                        ))}
                      </ul>
                    </div>

                    {/* رهنمود تخصصی وکیل */}
                    <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-semibold">
                      <span className="text-emerald-600 dark:text-emerald-400 block mb-0.5">رهنمود امنیتی وکیل:</span>
                      {chk.lawyerAdvice}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* دکمه چاپ کارنامه ممیزی ملکی */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span>
            📄 گزارش مستند به استانداردهای کانون وکلای دادگستری مرکز و ثبت اسناد و املاک.
          </span>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-md hover:bg-slate-800 transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" /> چاپ کارنامه Due Diligence ملک
          </button>
        </div>
      </div>
    </div>
  );
};
