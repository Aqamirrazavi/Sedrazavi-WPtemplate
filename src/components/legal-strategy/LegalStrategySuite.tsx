import React, { useState } from 'react';
import {
  Compass,
  CalendarClock,
  FolderLock,
  Sparkles,
  Shield,
  ArrowRight,
  Scale,
  Award,
  Lock,
  FileCheck,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { CaseOutcomePredictor } from './CaseOutcomePredictor';
import { JudicialDeadlinesCalendar } from './JudicialDeadlinesCalendar';
import { EncryptedLegalVault } from './EncryptedLegalVault';

interface LegalStrategySuiteProps {
  onBackToHome?: () => void;
}

export const LegalStrategySuite: React.FC<LegalStrategySuiteProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'outcome' | 'deadlines' | 'vault'>('outcome');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060B18] py-8 sm:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* نوار ناوبری بالا و بازگشت */}
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
              <span className="text-[#D4AF37]">سامانه استراتژی دادرسی و گاوصندوق امن (فاز ۷)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] self-start sm:self-auto">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>فاز ۷: موتور استراتژی قضایی، مواعد دادرسی و زنجیره اعتبار اسناد</span>
          </div>
        </div>

        {/* هدر باشکوه با گرادیان سرمه‌ای-طلایی */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#060B18] via-[#0D1B3E] to-[#060B18] border-2 border-[#D4AF37]/40 shadow-2xl p-6 sm:p-10 text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <Shield className="w-3.5 h-3.5" />
                سامانه اختصاصی هوشمند حقوقی و امنیت اسناد قضایی موکلین
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-white tracking-tight">
                پرتال جامع استراتژی دادرسی، مواعد قانونی و گاوصندوق دیجیتال اسناد
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                تحت نظارت و راهبری مستقیم سرکار خانم دکتر سیده مریم رضوی (وکیل پایه یک دادگستری و پژوهشگر ارشد حقوق بین‌الملل). تلفیق دانش راهبردی دعاوی با هوش محاسباتی، پایش خودکار فرجه‌های قانونی و فناوری حفاظت از ادله اثبات دعوا (Chain of Custody).
              </p>
            </div>

            {/* کارت هویت و نظارت وکیل */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3 min-w-[280px]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
                    alt="دکتر سیده مریم رضوی"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">دکتر سیده مریم رضوی</h4>
                  <span className="text-[11px] text-[#D4AF37] block">ناظر عالی حقوقی و وکیل پایه یک</span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                <span>پروانه وکالت: ۱۸۴۵۲ / ک.و.م</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> اصالت تاییدشده
                </span>
              </div>
            </div>
          </div>

          {/* تب‌های سه‌گانه سامانه فاز ۷ */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('outcome')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'outcome'
                  ? 'bg-[#D4AF37] text-slate-950 shadow-lg scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
              }`}
            >
              <Compass className="w-4 h-4" />
              ۱. شبیه‌ساز استراتژی دادرسی و پیش‌بینی شانس موفقیت
            </button>

            <button
              onClick={() => setActiveTab('deadlines')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'deadlines'
                  ? 'bg-[#D4AF37] text-slate-950 shadow-lg scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
              }`}
            >
              <CalendarClock className="w-4 h-4" />
              ۲. پایش هوشمند مواعد قانونی و تقویم فرجه‌های قضایی
            </button>

            <button
              onClick={() => setActiveTab('vault')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'vault'
                  ? 'bg-[#D4AF37] text-slate-950 shadow-lg scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
              }`}
            >
              <FolderLock className="w-4 h-4" />
              ۳. گاوصندوق رمزنگاری‌شده اسناد و اوراق قضایی (SHA-256)
            </button>
          </div>
        </div>

        {/* محتوای تب فعال */}
        <div className="transition-all duration-300">
          {activeTab === 'outcome' && <CaseOutcomePredictor />}
          {activeTab === 'deadlines' && <JudicialDeadlinesCalendar />}
          {activeTab === 'vault' && <EncryptedLegalVault />}
        </div>
      </div>
    </div>
  );
};
