import React, { useState } from 'react';
import {
  PieChart,
  Clock,
  ShieldCheck,
  TrendingUp,
  FileSignature,
  Users,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  Info,
  Calendar,
  Lock
} from 'lucide-react';
import { MOCK_STARTUP_VESTING_DATA } from '../../data/mockData';
import { StartupVestingSchedule } from '../../types/theme';

export const StartupVestingSimulator: React.FC = () => {
  const [vestingData, setVestingData] = useState<StartupVestingSchedule>(MOCK_STARTUP_VESTING_DATA);
  const [passedMonths, setPassedMonths] = useState<number>(18); // ۱۸ ماه گذشته
  const [valuationUsd, setValuationUsd] = useState<number>(1500000); // ارزش‌گذاری ۱.۵ میلیون دلار

  // محاسبه سهام وست‌شده (آزاد شده)
  const totalMonths = vestingData.vestingPeriodYears * 12;
  const cliffMonths = vestingData.cliffPeriodMonths;

  let vestedPercentage = 0;
  if (passedMonths < cliffMonths) {
    vestedPercentage = 0; // قبل از کلیف هیچی تعلق نمی‌گیرد
  } else {
    // بعد از کلیف، ماه کلیف یکباره آزاد می‌شود و بقیه ماهانه
    vestedPercentage = (passedMonths / totalMonths) * vestingData.equityPercentage;
    if (vestedPercentage > vestingData.equityPercentage) {
      vestedPercentage = vestingData.equityPercentage;
    }
  }

  const unvestedPercentage = vestingData.equityPercentage - vestedPercentage;
  const vestedSharesCount = Math.round((vestedPercentage / vestingData.equityPercentage) * vestingData.totalShares);
  const unvestedSharesCount = vestingData.totalShares - vestedSharesCount;

  // برآورد ارزش مالی سهام آزادشده
  const estimatedVestedValue = Math.round((vestedPercentage / 100) * valuationUsd);

  return (
    <div className="space-y-8 animate-in fade-in duration-300" dir="rtl">
      {/* هدر بخش وستینگ و حقوق استارتاپ‌ها */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#D4AF37] px-3 py-1 rounded-full bg-[#D4AF37]/10 inline-flex items-center gap-1.5 border border-[#D4AF37]/20">
              <Sparkles className="w-3.5 h-3.5" /> چارچوب حقوقی تملک تدریجی سهام بنیان‌گذاران و واگذاری مالکیت فکری (IP Assignment)
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-serif text-slate-900 dark:text-white">
              شبیه‌ساز تخصصی تخصیص تدریجی سهام (Vesting & Cliff) و قراردادهای سهامداری استارتاپ (SHA)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl">
              سازوکار حیاتی برای حفظ ثبات تیم هم‌بنیان‌گذاران، جلوگیری از فرار زودهنگام سرمایه انسانی و الزام قانونی واگذاری کامل مالکیت فکری کدها و فناوری‌ها به شخص حقوقی شرکت نوپا.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs">
            <span className="font-bold block">استاندارد بین‌المللی دره سیلیکون:</span>
            «وستینگ ۴ ساله با کلیف ۱ ساله (4-Year Vesting with 1-Year Cliff) مدل برنده جذب سرمایه‌گذاران خطرپذیر (VC) است.»
          </div>
        </div>

        {/* اسلایدر زمان سپری شده از شروع همکاری */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              مدت زمان سپری شده از زمان امضای قرارداد همکاری بنیان‌گذاران:
            </label>
            <span className="text-sm font-black text-[#D4AF37] font-mono px-3 py-0.5 rounded-lg bg-[#D4AF37]/10">
              {passedMonths} ماه از مجموع {totalMonths} ماه
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="48"
            step="1"
            value={passedMonths}
            onChange={(e) => setPassedMonths(Number(e.target.value))}
            className="w-full accent-[#D4AF37] cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-mono">
            <span>ماه صفر (آغاز)</span>
            <span className="text-amber-500 font-bold">پایان کلیف (ماه ۱۲)</span>
            <span>سال دوم (ماه ۲۴)</span>
            <span>سال سوم (ماه ۳۶)</span>
            <span className="text-emerald-500 font-bold">وست کامل (ماه ۴۸)</span>
          </div>
        </div>
      </div>

      {/* نتایج زنده محاسبات سهام */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-md space-y-2">
          <span className="text-xs text-slate-500">درصد سهام آزادشده (Vested):</span>
          <div className="text-2xl font-black text-emerald-500 font-mono">
            {vestedPercentage.toFixed(1)}%
          </div>
          <span className="text-[11px] text-slate-400 block font-mono">
            معادل {vestedSharesCount.toLocaleString('fa-IR')} سهم قطعی
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-md space-y-2">
          <span className="text-xs text-slate-500">سهام حبس‌شده (Unvested):</span>
          <div className="text-2xl font-black text-amber-500 font-mono">
            {unvestedPercentage.toFixed(1)}%
          </div>
          <span className="text-[11px] text-slate-400 block font-mono">
            معادل {unvestedSharesCount.toLocaleString('fa-IR')} سهم مشروط
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-md space-y-2">
          <span className="text-xs text-slate-500">وضعیت دوره پرتگاه (Cliff):</span>
          <div className="text-base font-bold font-serif">
            {passedMonths < cliffMonths ? (
              <span className="text-rose-500 flex items-center gap-1">
                <AlertOctagon className="w-4 h-4" /> قبل از کلیف (عدم تعلق سهم)
              </span>
            ) : (
              <span className="text-emerald-500 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> دوره کلیف سپری شد
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400 block">
            {passedMonths < cliffMonths
              ? `اگر همکار اکنون خارج شود، صفر سهم دریافت می‌کند.`
              : `سهم ماه ۱۲ به بعد تثبیت شده است.`}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-md space-y-2">
          <span className="text-xs text-slate-500">ارزش تقریبی سهام آزادشده:</span>
          <div className="text-2xl font-black text-[#D4AF37] font-mono">
            ${estimatedVestedValue.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 block">
            بر مبنای ارزش‌گذاری ${valuationUsd.toLocaleString()}
          </span>
        </div>
      </div>

      {/* جزئیات حقوقی و شروط کلیدی سهامداری و انتقال مالکیت فکری */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* پنل شروط تسریع و عدم رقابت */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base font-serif border-b border-slate-100 dark:border-slate-800 pb-3">
            <Lock className="w-5 h-5 text-[#D4AF37]" />
            شروط کلیدی قرارداد سهامداری و تضمین منافع شرکت
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">
                  شرط تسریع در تخصیص سهام (Acceleration Clause):
                </span>
                <span className="px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] font-bold text-[10px]">
                  {vestingData.accelerationClause}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                در حالت دبل تریگر (Double Trigger)، اگر شرکت توسط کمپانی بزرگتری تصاحب (Acquisition) شود و همزمان بنیان‌گذار بدون قصور اخراج گردد، ۱۰۰٪ سهام باقیمانده بلافاصله آزاد و نقدپذیر می‌شود.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">
                  انتقال قطعی مالکیت فکری (IP Assignment Agreement):
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> امضا شده و معتبر
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                کلیه کدها، پتنت‌ها، طراحی‌های UI و پایگاه‌های داده خلق‌شده در طول همکاری، قانوناً متعلق به شرکت است و خروج بنیان‌گذار هیچ حقی بر مالکیت فناوری ایجاد نمی‌کند.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">
                  دوره منع رقابت و عدم جذب همکاران (Non-Compete & Non-Solicitation):
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500 font-bold text-[10px] font-mono">
                  {vestingData.nonCompetePeriodMonths} ماه پس از قطع همکاری
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                ممنوعیت راه‌اندازی کسب‌وکار مشابه در همان بازار هدف یا استخدام پرسنل کلیدی استارتاپ تا ۲ سال پس از جدایی.
              </p>
            </div>
          </div>
        </div>

        {/* پنل سمت چپ: بند حقوقی استاندارد وستینگ در قراردادهای مشارکت */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base font-serif border-b border-slate-100 dark:border-slate-800 pb-3">
              <FileSignature className="w-5 h-5 text-[#D4AF37]" />
              بند نمونه استاندارد وستینگ جهت درج در توافق‌نامه مؤسسان (Founders Agreement)
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              این متن توسط سرکار خانم دکتر سیده مریم رضوی جهت حفظ جامعیت حقوقی در برابر ادعاهای احتمالی در محاکم دادگستری تنظیم شده است:
            </p>

            <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-72 border border-slate-800">
{`«ماده تخصیص تدریجی سهام (Vesting):
۱. کلیه سهام تخصیص‌یافته به طرف دوم (${vestingData.equityPercentage} درصد کل سهام) به مدت ۴۸ ماه شمسی مشمول قید تحدید تملک و تخصیص تدریجی خواهد بود.
۲. در صورت قطع همکاری یا استعفای نامبرده پیش از سپری شدن دوره یک‌ساله موسوم به کلیف (Cliff Period)، هیچ‌گونه سهم یا وجهی به وی تعلق نگرفته و سهام مزبور بلاعوض به حساب شرکت یا سایر مؤسسین عودت می‌یابد.
۳. پس از سپری شدن ماه دوازدهم، معادل ۲۵٪ از سهام یادشده به‌صورت قطعی آزاد گردیده و مابقی سهام به نسبت ۱/۳۶ در انتهای هر ماه تقویمی بعدی تا اتمام ماه چهل و هشتم تملیک خواهد شد.
۴. طرف دوم اقرار می‌نماید کلیه حقوق مادی و معنوی دستاوردهای فناورانه طبق سند مجزای IP Assignment به نحو غیرقابل رجوع به شخصیت حقوقی شرکت واگذار گردیده است.»`}
            </pre>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>تنظیم دقیق این سند از شکست بیش از ۷۰٪ استارتاپ‌ها در مراحل رشد و جذب سرمایه جلوگیری می‌کند.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
