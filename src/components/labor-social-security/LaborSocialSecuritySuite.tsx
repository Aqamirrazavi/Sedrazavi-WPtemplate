import React, { useState } from 'react';
import {
  Briefcase,
  Calculator,
  Shield,
  FileText,
  Clock,
  Coins,
  AlertCircle,
  Users,
  CheckCircle2,
  Scale,
  Printer,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Building,
  HeartPulse,
  Award,
  BookOpen
} from 'lucide-react';

interface LaborCalcState {
  workYears: number;
  workMonths: number;
  baseDailyWageTomans: number; // حداقل ۲۳۸،۸۷۲ تومان در ۱۴۰۳
  hasChildren: number; // تعداد اولاد مشمول حق اولاد
  unusedLeaveDays: number; // روزهای مرخصی ذخیره
  overtimeHoursPerMonth: number; // ساعات اضافه کاری
  isShiftWorker: boolean; // نوبت‌کاری
  shiftType: 'morning_afternoon' | 'morning_night' | 'rotational_all';
  contractType: 'permanent' | 'definite_term' | 'specific_task';
  isHardAndHazardous: boolean; // مشاغل سخت و زیان‌آور
}

export const LaborSocialSecuritySuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'pleading_gen' | 'social_security' | 'settlement_vault' | 'precedents'>('calculator');

  // Calculator Parameters
  const [calc, setCalc] = useState<LaborCalcState>({
    workYears: 3,
    workMonths: 6,
    baseDailyWageTomans: 238872,
    hasChildren: 2,
    unusedLeaveDays: 14,
    overtimeHoursPerMonth: 35,
    isShiftWorker: false,
    shiftType: 'morning_afternoon',
    contractType: 'definite_term',
    isHardAndHazardous: false,
  });

  // Pleading Form State
  const [claimantType, setClaimantType] = useState<'worker' | 'employer'>('worker');
  const [workerName, setWorkerName] = useState('حمیدرضا زمانی‌فر');
  const [employerCompanyName, setEmployerCompanyName] = useState('شرکت مهندسی سازه‌پرداز فردا');
  const [disputeTopic, setDisputeTopic] = useState<'unlawful_dismissal' | 'unpaid_benefits' | 'insurance_records_148' | 'hard_hazardous'>('unlawful_dismissal');

  // Calculations based on Iranian Labor Code 1403
  const monthlyBaseSalary = calc.baseDailyWageTomans * 30; // پایه حقوق ماهانه
  const monthlyHousingAllowance = 900000; // حق مسکن مصوب
  const monthlyFoodAllowance = 1400000; // بن خواروبار
  const childAllowancePerChild = calc.baseDailyWageTomans * 3; // حق اولاد برای هر فرزند = ۳ روز حداقل مزد
  const totalChildAllowance = calc.hasChildren * childAllowancePerChild;
  
  const totalFixedMonthlyEarnings = monthlyBaseSalary + monthlyHousingAllowance + monthlyFoodAllowance + totalChildAllowance;

  // Overtime rate: 1 hour base wage = monthlyBaseSalary / 220 * 1.4
  const hourlyBaseRate = monthlyBaseSalary / 220;
  const hourlyOvertimeRate = hourlyBaseRate * 1.4;
  const monthlyOvertimeEarnings = calc.overtimeHoursPerMonth * hourlyOvertimeRate;

  // Shift work bonus
  let shiftBonusRate = 0;
  if (calc.isShiftWorker) {
    if (calc.shiftType === 'morning_afternoon') shiftBonusRate = 0.10;
    else if (calc.shiftType === 'morning_night') shiftBonusRate = 0.225;
    else shiftBonusRate = 0.15;
  }
  const shiftBonusEarnings = monthlyBaseSalary * shiftBonusRate;

  // Severance Pay (سنوات خدمت): 1 month base salary per year
  const totalWorkInYears = calc.workYears + (calc.workMonths / 12);
  const totalSeverancePay = totalWorkInYears * monthlyBaseSalary;

  // Yearly Bonus (عیدی و پاداش سالیانه): Minimum 60 days base wage, maximum 90 days
  const currentYearBonus = Math.min(monthlyBaseSalary * 2, monthlyBaseSalary * 3);

  // Unused Leave (بازخرید مرخصی‌های استفاده‌نشده): Daily wage * unused days
  const unusedLeavePay = calc.unusedLeaveDays * calc.baseDailyWageTomans;

  // Total Final Settlement sum
  const totalFinalSettlement = totalSeverancePay + currentYearBonus + unusedLeavePay;

  return (
    <div className="min-h-screen bg-[#060B18] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 relative font-sans" dir="rtl">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0B132B]/80 border border-[#D4AF37]/20 p-4 rounded-2xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#D4AF37]/20 text-slate-300 hover:text-[#D4AF37] text-xs transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازگشت به صفحه اصلی</span>
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-[#D4AF37]" />
              سامانه حقوق کار، دعاوی تأمین اجتماعی و هیئت‌های تشخیص (فاز ۲۷)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="px-3 py-1.5 rounded-xl bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold transition-all"
              >
                پنل مدیریت دفتر
              </button>
            )}
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
              چاپ فیش تسویه‌حساب قانونی
            </button>
          </div>
        </div>

        {/* Hero Header Banner */}
        <div className="relative bg-gradient-to-r from-[#0B132B] via-[#0E1A38] to-[#0B132B] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>دپارتمان تخصصی حقوق کار، روابط کارگر و کارفرما و دیوان عدالت اداری</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
              دعاوی کار، سوابق بیمه تأمین اجتماعی و بازنشستگی سخت و زیان‌آور
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              محاسبه دقیق مطالبات پایان‌کار، سنوات خدمت و عیدی طبق مصوبات شورای عالی کار، طرح دعوای مطالبه حق بیمه معوقه (ماده ۱۴۸)، احراز مشاغل سخت و زیان‌آور، دفاع در هیئت‌های تشخیص و حل اختلاف اداره تعاون، کار و رفاه اجتماعی.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          {[
            { id: 'calculator', label: 'محاسبه‌گر جامع حقوق، سنوات و مطالبات ۱۴۰۳', icon: Calculator },
            { id: 'pleading_gen', label: 'تنظیم لایحه هیئت تشخیص و حل اختلاف (ماده ۱۵۷)', icon: FileText },
            { id: 'social_security', label: 'دعاوی سوابق بیمه و مشاغل سخت و زیان‌آور', icon: Shield },
            { id: 'settlement_vault', label: 'چک‌لیست تسویه‌حساب قطعی و پیشگیری از دعاوی', icon: CheckCircle2 },
            { id: 'precedents', label: 'آرای وحدت رویه دیوان عدالت اداری در امور کار', icon: Scale },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#0B132B] shadow-lg shadow-[#D4AF37]/20 font-black'
                    : 'bg-[#0B132B] text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#0B132B]' : 'text-[#D4AF37]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Labor Wage & Severance Calculator */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Controls (7 cols) */}
            <div className="lg:col-span-7 bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Calculator className="w-5 h-5 text-[#D4AF37]" />
                  <span>اطلاعات استخدامی، سابقه کار و حقوق پایه</span>
                </div>
                <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  بخشنامه دستمزد سال ۱۴۰۳ وزارت کار
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">مدت سابقه کار (سال کامل):</label>
                  <input
                    type="number"
                    min={0}
                    max={40}
                    value={calc.workYears}
                    onChange={(e) => setCalc({ ...calc, workYears: Math.max(0, parseInt(e.target.value) || 0) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">ماه‌های مازاد بر سال:</label>
                  <input
                    type="number"
                    min={0}
                    max={11}
                    value={calc.workMonths}
                    onChange={(e) => setCalc({ ...calc, workMonths: Math.max(0, parseInt(e.target.value) || 0) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">مزد روزانه پایه (تومان):</label>
                  <input
                    type="number"
                    min={238872}
                    step={10000}
                    value={calc.baseDailyWageTomans}
                    onChange={(e) => setCalc({ ...calc, baseDailyWageTomans: Math.max(238872, parseInt(e.target.value) || 238872) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">تعداد اولاد تحت تکفل (حق اولاد):</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={calc.hasChildren}
                    onChange={(e) => setCalc({ ...calc, hasChildren: Math.max(0, parseInt(e.target.value) || 0) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">مانده مرخصی استحقاقی ذخیره‌شده (روز):</span>
                    <span className="text-[#D4AF37] font-bold">{calc.unusedLeaveDays} روز</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={30}
                    value={calc.unusedLeaveDays}
                    onChange={(e) => setCalc({ ...calc, unusedLeaveDays: Number(e.target.value) })}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">میانگین اضافه‌کاری در ماه (ساعت):</span>
                    <span className="text-emerald-400 font-bold">{calc.overtimeHoursPerMonth} ساعت</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={120}
                    value={calc.overtimeHoursPerMonth}
                    onChange={(e) => setCalc({ ...calc, overtimeHoursPerMonth: Number(e.target.value) })}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#060B18] border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isShift"
                      checked={calc.isShiftWorker}
                      onChange={(e) => setCalc({ ...calc, isShiftWorker: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#D4AF37] cursor-pointer"
                    />
                    <label htmlFor="isShift" className="text-xs font-semibold text-white cursor-pointer">
                      کارگر نوبت‌کار (شیفتی)
                    </label>
                  </div>
                  {calc.isShiftWorker && (
                    <select
                      value={calc.shiftType}
                      onChange={(e) => setCalc({ ...calc, shiftType: e.target.value as any })}
                      className="w-full mt-2 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-[11px]"
                    >
                      <option value="morning_afternoon">صبح و عصر (فوق‌العاده ۱۰٪)</option>
                      <option value="morning_night">صبح، عصر و شب (فوق‌العاده ۱۵٪)</option>
                      <option value="rotational_all">صبح و شب یا عصر و شب (فوق‌العاده ۲۲.۵٪)</option>
                    </select>
                  )}
                </div>

                <div className="p-3.5 rounded-2xl bg-[#060B18] border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isHard"
                      checked={calc.isHardAndHazardous}
                      onChange={(e) => setCalc({ ...calc, isHardAndHazardous: e.target.checked })}
                      className="w-4 h-4 rounded accent-rose-500 cursor-pointer"
                    />
                    <label htmlFor="isHard" className="text-xs font-semibold text-rose-300 cursor-pointer">
                      شغل سخت و زیان‌آور (گروه ب)
                    </label>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    هر ۱ سال سابقه کاری معادل ۱.۵ سال سابقه بازنشستگی در تأمین اجتماعی محاسبه می‌گردد.
                  </p>
                </div>
              </div>
            </div>

            {/* Calculations Breakdown (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#0B132B] to-[#101D42] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
                <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                  <Coins className="w-4 h-4" />
                  برآورد دقیق حقوق ماهانه و تسویه‌حساب نهایی
                </span>
                <span className="text-[10px] text-slate-400">سال ۱۴۰۳</span>
              </div>

              {/* Monthly Breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="text-[11px] font-bold text-slate-300">اقلام دریافتی مستمر ماهانه:</div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">پایه حقوق ماهانه (۳۰ روز):</span>
                  <span className="font-mono text-slate-200">{monthlyBaseSalary.toLocaleString('fa-IR')} تومان</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">حق مسکن مصوب:</span>
                  <span className="font-mono text-slate-200">{monthlyHousingAllowance.toLocaleString('fa-IR')} تومان</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">بن خواروبار ماهانه:</span>
                  <span className="font-mono text-slate-200">{monthlyFoodAllowance.toLocaleString('fa-IR')} تومان</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">حق اولاد ({calc.hasChildren} فرزند):</span>
                  <span className="font-mono text-slate-200">{totalChildAllowance.toLocaleString('fa-IR')} تومان</span>
                </div>
                {calc.overtimeHoursPerMonth > 0 && (
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-emerald-400">فوق‌العاده اضافه‌کاری ({calc.overtimeHoursPerMonth} ساعت):</span>
                    <span className="font-mono text-emerald-400">+{Math.round(monthlyOvertimeEarnings).toLocaleString('fa-IR')} تومان</span>
                  </div>
                )}
                {calc.isShiftWorker && (
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-indigo-400">حق نوبت‌کاری (شیفت):</span>
                    <span className="font-mono text-indigo-400">+{Math.round(shiftBonusEarnings).toLocaleString('fa-IR')} تومان</span>
                  </div>
                )}
              </div>

              {/* Final Settlement (سنوات و عیدی) */}
              <div className="pt-2 border-t border-slate-700 space-y-2 text-xs">
                <div className="text-[11px] font-bold text-[#D4AF37]">مطالبات پایان خدمت و سنوات:</div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">پاداش پایان خدمت (سنوات - {totalWorkInYears.toFixed(1)} سال):</span>
                  <span className="font-mono text-amber-300 font-bold">{Math.round(totalSeverancePay).toLocaleString('fa-IR')} ت</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">عیدی و پاداش سال جاری:</span>
                  <span className="font-mono text-slate-200">{Math.round(currentYearBonus).toLocaleString('fa-IR')} ت</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">بازخرید مرخصی ذخیره ({calc.unusedLeaveDays} روز):</span>
                  <span className="font-mono text-slate-200">{Math.round(unusedLeavePay).toLocaleString('fa-IR')} ت</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#060B18]/90 border border-[#D4AF37]/30 space-y-1">
                <div className="text-[11px] text-slate-400">مجموع مطالبات قطعی تسویه‌حساب کارگر:</div>
                <div className="text-2xl font-black text-white font-mono flex items-center justify-between">
                  <span>{Math.round(totalFinalSettlement).toLocaleString('fa-IR')}</span>
                  <span className="text-xs font-normal text-[#D4AF37]">تومان</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('pleading_gen')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#0B132B] font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-[#D4AF37]/10 transition-all"
              >
                <span>تنظیم دادخواست رسمی هیئت تشخیص اداره کار</span>
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Pleading Generator for Labor Dispute Boards */}
        {activeTab === 'pleading_gen' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="text-xs font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
                <Scale className="w-4 h-4 text-[#D4AF37]" />
                <span>موضوع دادخواست و طرفین اختلاف</span>
              </div>

              <div className="space-y-2">
                {[
                  {
                    id: 'unlawful_dismissal',
                    title: 'اخراج غیرقانونی و بازگشت به کار',
                    desc: 'مطالبه حقوق ایام تعلیق و بازگشت به کار طبق ماده ۲۰ قانون کار',
                  },
                  {
                    id: 'unpaid_benefits',
                    title: 'مطالبه حقوق معوقه و سنوات خدمت',
                    desc: 'مطالبه عیدی، پاداش، بن و سنوات پرداخت‌نشده پایان‌کار',
                  },
                  {
                    id: 'insurance_records_148',
                    title: 'الزام به واریز بیمه معوقه (ماده ۱۴۸)',
                    desc: 'اثبات رابطه کارگری و الزام کارفرما به پرداخت حق بیمه به سازمان تأمین اجتماعی',
                  },
                  {
                    id: 'hard_hazardous',
                    title: 'تأییدیه مشاغل سخت و زیان‌آور',
                    desc: 'الزام کارفرما به پرداخت ۴٪ حق بیمه مازاد و اصلاح عنوان شغلی',
                  },
                ].map((item) => {
                  const isSelected = disputeTopic === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setDisputeTopic(item.id as any)}
                      className={`w-full text-right p-3.5 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white shadow-md'
                          : 'bg-[#060B18] border-slate-800 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#D4AF37] mb-1">{item.title}</div>
                      <p className="text-[11px] text-slate-400">{item.desc}</p>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">نام و نام خانوادگی کارگر (خواهان):</label>
                  <input
                    type="text"
                    value={workerName}
                    onChange={(e) => setWorkerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">نام کارفرما یا شرکت (خوانده):</label>
                  <input
                    type="text"
                    value={employerCompanyName}
                    onChange={(e) => setEmployerCompanyName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Generated Pleading */}
            <div className="lg:col-span-8 bg-[#0B132B]/90 border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs">
                    <FileText className="w-4 h-4" />
                    <span>دادخواست استاندارد سامانه جامع روابط کار (هیئت تشخیص)</span>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] text-xs border border-[#D4AF37]/30 font-bold"
                  >
                    چاپ لایحه با سربرگ دفتر
                  </button>
                </div>

                <div className="bg-[#060B18] border border-slate-800 rounded-2xl p-6 text-xs text-slate-200 leading-loose font-serif space-y-4 shadow-inner max-h-[500px] overflow-y-auto">
                  <div className="text-center font-bold text-sm text-[#D4AF37] pb-2 border-b border-slate-800">
                    ریاست و اعضای محترم هیئت تشخیص اداره تعاون، کار و رفاه اجتماعی شمال غرب تهران
                  </div>

                  <div className="space-y-1.5 text-slate-300">
                    <p><strong>خواهان:</strong> {workerName} به وکالت دفتر حقوقی دکتر سیده مریم رضوی.</p>
                    <p><strong>خوانده:</strong> {employerCompanyName}.</p>
                    <p><strong>موضوع خواسته:</strong> {disputeTopic === 'unlawful_dismissal' && 'الزام کارفرما به بازگشت به کار و پرداخت کلیه حقوق و مزایای معوقه و سنوات'}</p>
                  </div>

                  <div className="space-y-3 pt-2 text-justify">
                    <p className="indent-4">
                      با سلام و احترام؛ به استحضار اعضای محترم هیئت می‌رساند موکل از تاریخ آغاز همکاری به مدت {calc.workYears} سال و {calc.workMonths} ماه در کارگاه خوانده به عنوان کارشناس ارشد فنی اشتغال داشته است. متأسفانه کارفرما در اقدامی مغایر با مواد ۲۷ و ۲۰ قانون کار، بدون جلب موافقت تشکل کارگری و بدون ادله قانونی موکل را از ورود به کارگاه منع نموده است.
                    </p>

                    <ol className="list-decimal list-inside space-y-2 pr-2">
                      <li>
                        <strong>مستندات احراز رابطه کارگری:</strong> پیرینت واریز منظم حقوق از حساب بانکی شرکت خوانده، پرینت ساعات ورود و خروج دستگاه ساعت‌زنی بیومتریک و پیام‌های کاری موید تداوم خدمت موکل در کارگاه است.
                      </li>
                      <li>
                        <strong>مطالبه مزایای معوقه (سنوات و عیدی):</strong> خوانده از تصفیه سنوات خدمت معادل {Math.round(totalSeverancePay).toLocaleString('fa-IR')} تومان و عیدی سال جاری استنکاف ورزیده است.
                      </li>
                      <li>
                        <strong>الزام به پرداخت حق بیمه (ماده ۱۴۸):</strong> کارفرما در بخشی از دوره همکاری از ارسال لیست بیمه به سازمان تأمین اجتماعی خودداری نموده که مستلزم صدور رای مقتضی جهت احتساب سوابق است.
                      </li>
                    </ol>

                    <p className="pt-2">
                      لذا استناداً به مواد ۱۴۸، ۱۵۷، ۱۶۴ و ۲۰ قانون کار، صدور رای شایسته مبنی بر بازگشت به کار موکل و محکومیت کارفرما به پرداخت کلیه مطالبات و ارسال لیست بیمه معوقه به تأمین اجتماعی مورد تقاضاست.
                    </p>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-slate-800 text-[11px] text-slate-400">
                    <span>پیوست‌ها: قرارداد کار، پرینت حساب بانکی، گزارش بازرسی کارگاه</span>
                    <span>وکیل دادگستری - دکتر سیده مریم رضوی</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Social Security Lawsuits & Hard Jobs */}
        {activeTab === 'social_security' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'احراز مشاغل سخت و زیان‌آور (گروه ب)',
                lawRef: 'آیین‌نامه اجرایی بند ۵ جزء (ب) ماده واحده قانون اصلاح تبصره ۲ الحاقی ماده ۷۶ قانون تأمین اجتماعی',
                benefits: 'بازنشستگی با ۲۰ سال سابقه متوالی یا ۲۵ سال متناوب',
                desc: 'مشاغلی نظیر معادن، جوشکاری در مخازن، کار در ارتفاع، دکل‌بندی و کار با مواد شیمیایی و رادیواکتیو.',
                procedure: 'طرح درخواست در کمیته بدوی و تجدیدنظر استانی و الزام کارفرما به واریز ۴٪ حق بیمه اضافه.',
              },
              {
                title: 'مطالبه سوابق بیمه معوقه (ماده ۱۴۸)',
                lawRef: 'ماده ۱۴۸ قانون کار و ماده ۳۶ قانون تأمین اجتماعی',
                benefits: 'تثبیت سوابق بازنشستگی و درمانی برای سنوات پرداخت‌نشده',
                desc: 'در صورت عدم ارسال لیست توسط کارفرما، با اخذ رای قطعی هیئت تشخیص و تامین اجتماعی سابقه احیا می‌شود.',
                procedure: 'ارائه فیش حقوقی، پرینت بانکی، شهادت همکاران و دفاتر قانونی کارگاه به بازرسان.',
              },
              {
                title: 'برقراری مستمری ازکارافتادگی کلی',
                lawRef: 'ماده ۷۰ و ۷۱ قانون تأمین اجتماعی',
                benefits: 'برقراری مستمری ماهانه کامل در صورت کاهش بیش از ۶۶٪ توان کار',
                desc: 'ارزیابی در کمیسیون‌های پزشکی بدوی و تجدیدنظر سازمان بر اثر بیماری عادی یا حادثه ناشی از کار.',
                procedure: 'اعتراض به آرای کمیسیون پزشکی بدوی ظرف مهلت یک ماه و تجدیدنظرخواهی در دیوان عدالت اداری.',
              },
              {
                title: 'حوادث ناشی از کار و مطالبه دیه',
                lawRef: 'ماده ۶۰ قانون تأمین اجتماعی و ماده ۹۱ قانون کار',
                benefits: 'دریافت غرامت دستمزد، هزینه درمان و دیه کامل از کارفرما',
                desc: 'حادثه‌ای که در حین انجام وظیفه برای کارگر اتفاق افتاده و کارفرما وسایل حفاظت فردی فراهم نکرده باشد.',
                procedure: 'حضور فوری کارشناس رسمی دادگستری در امور حوادث و تنظیم صورتجلسه بازرسی اداره کار.',
              },
              {
                title: 'اعتراض به ضرایب بیمه پیمانکاری (ماده ۳۸)',
                lawRef: 'ماده ۳۸ قانون تأمین اجتماعی و بخشنامه ۱۴ درآمد',
                benefits: 'آزادسازی مفاصاحساب بیمه و وجوه ۵٪ سپرده حسن اجرای کار',
                desc: 'تعدیل ضرایب بیمه مکانیکی و دستی قراردادهای عمرانی و غیرعمرانی با سازمان تأمین اجتماعی.',
                procedure: 'طرح دعوا در هیئت‌های بدوی و تجدیدنظر تشخیص مطالبات سازمان تأمین اجتماعی.',
              },
              {
                title: 'مستمری بازماندگان بیمه‌شده متوفی',
                lawRef: 'ماده ۸۰ الی ۸۴ قانون تأمین اجتماعی',
                benefits: 'انتقال مستمری به همسر دائم، فرزندان دختر مجرد و پسران تحت تحصیل',
                desc: 'حمایت معیشتی قانونی از خانواده کارگر متوفی با رعایت سهم‌بندی مصرح در قانون.',
                procedure: 'صدور گواهی حصر وراثت و ثبت الکترونیکی در درگاه خدمات غیرحضوری eservices.tamin.ir.',
              },
            ].map((card, idx) => (
              <div key={idx} className="bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 space-y-3 hover:border-[#D4AF37]/40 transition-all">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Shield className="w-4 h-4 text-[#D4AF37]" />
                  <span>{card.title}</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-mono">{card.lawRef}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{card.desc}</p>
                <div className="p-3 rounded-xl bg-[#060B18] border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="text-[#D4AF37] font-semibold">مزیت قانونی: {card.benefits}</div>
                  <div><strong>مسیر حقوقی:</strong> {card.procedure}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Settlement Vault & Employer Risk Prevention */}
        {activeTab === 'settlement_vault' && (
          <div className="bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="max-w-2xl space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>چک‌لیست تسویه‌حساب قطعی طبق رأی وحدت رویه ۲۷۲ دیوان عدالت اداری</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                طبق رای وحدت رویه شماره ۲۷۲ دیوان عدالت اداری، برگه تسویه‌حساب دستی فاقد سند واریز بانکی بی‌اعتبار است. کارفرما باید کلیه مبالغ را دقیقاً به حساب بانکی کارگر واریز و عنوان هر واریز را تفکیک کند.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'واریز سنوات خدمت با ذکر عنوان در حواله پایا/ساتنا', status: 'اجباری' },
                { title: 'محاسبه عیدی بر مبنای روزهای کارکرد واقعی سال', status: 'اجباری' },
                { title: 'بازخرید حداکثر ۹ روز مرخصی ذخیره سالانه طبق ماده ۶۹', status: 'قانونی' },
                { title: 'اخذ امضای فیزیکی و اثر انگشت روی برگ اقرارنامه تسویه‌حساب', status: 'ضروری' },
                { title: 'تحویل نسخه اصل قرارداد کار امضاشده به کارگر', status: 'ماده ۱۰' },
                { title: 'دریافت مفاصاحساب و عدم بدهی تجهیزات و اموال تحویلی کارگاه', status: 'داخلی' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[#060B18] border border-slate-800">
                  <div className="flex items-center gap-3 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>{item.title}</span>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 font-semibold">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Precedent Rulings */}
        {activeTab === 'precedents' && (
          <div className="space-y-4">
            {[
              {
                number: 'رأی وحدت رویه شماره ۲۷۲ هیأت عمومی دیوان عدالت اداری',
                subject: 'بی‌اعتباری رسیدهای تسویه‌حساب سفیدامضا یا فاقد اسناد واریز بانکی',
                summary: 'صرف ارائه برگ تسویه‌حساب بدون ارائه اسناد مثبته پرداخت از قبیل فیش واریز به حساب بانکی کارگر، مثبت پرداخت مطالبات مزدی نبوده و کارفرما ملزم به اثبات واریز ریالی وجوه است.',
              },
              {
                number: 'رأی وحدت رویه شماره ۳۳۲۸ دیوان عدالت اداری',
                subject: 'شمول عنوان سنوات خدمت بر کلیه دریافتی‌های مستمر کارگر',
                summary: 'پاداش پایان خدمت (سنوات) باید بر اساس آخرین مزد ثابت کارگر شامل مزد شغل، حق جذب و مزایای مستمر محاسبه گردد و کسر فوق‌العاده‌ها از مبنای سنوات غیرقانونی است.',
              },
              {
                number: 'رأی هیأت تخصصی کار و تأمین اجتماعی شماره ۱۰۸',
                subject: 'تکلیف کارفرما به واریز ۴٪ سهم مشاغل سخت در زمان بازنشستگی کارگر',
                summary: 'کارفرما مکلف است به محض درخواست بازنشستگی کارگر و تایید کمیته استانی، ۴ درصد حق بیمه متعلقه مشاغل سخت را به سازمان تامین اجتماعی پرداخت نماید و تاخیر موجب مسئولیت حقوقی است.',
              },
            ].map((p, idx) => (
              <div key={idx} className="bg-[#0B132B]/80 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#D4AF37]">{p.number}</span>
                  <span className="text-[10px] text-slate-500">مرجع عالی قضایی</span>
                </div>
                <div className="text-xs font-semibold text-white">{p.subject}</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">{p.summary}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
