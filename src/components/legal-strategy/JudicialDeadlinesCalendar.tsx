import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  AlertOctagon,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileText,
  Printer,
  Sparkles,
  Info,
  CalendarCheck2,
  CalendarClock,
  ArrowLeft,
  ChevronDown,
} from 'lucide-react';
import { JUDICIAL_DEADLINE_RULES_DATA } from '../../data/mockData';
import { JudicialDeadlineRule } from '../../types/theme';

export const JudicialDeadlinesCalendar: React.FC = () => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>('dl-appeal-civil');
  const [residenceStatus, setResidenceStatus] = useState<'iran' | 'foreign'>('iran');
  const [deliveryType, setDeliveryType] = useState<'actual' | 'legal'>('actual');

  // تاریخ فرضی ابلاغ به صورت روزهای گذشته (مثلاً ۳ روز پیش ابلاغ شده)
  const [elapsedDays, setElapsedDays] = useState<number>(4);

  const selectedRule =
    JUDICIAL_DEADLINE_RULES_DATA.find((r) => r.id === selectedRuleId) ||
    JUDICIAL_DEADLINE_RULES_DATA[0];

  const totalDurationDays =
    residenceStatus === 'foreign'
      ? selectedRule.durationForeignDays
      : selectedRule.durationDays;

  // محاسبه طبق ماده ۴۴۵ ق.آ.د.م (عدم احتساب روز ابلاغ و روز اقدام):
  // روز ابلاغ (روز ۰) محاسبه نمی‌شود.
  // مهلت موثر = totalDurationDays + 1 روز اضافه قانونی
  const remainingDays = Math.max(0, totalDurationDays - elapsedDays);

  const getUrgencyLevel = (days: number) => {
    if (days <= 0) {
      return {
        level: 'expired',
        label: 'مهلت قانونی منقضی شده است!',
        badgeClass: 'bg-rose-500/20 text-rose-500 border-rose-500/40',
        alertText: 'هشدار حیاتی: با انقضای موعد، حق اعتراض طبق قانون ساقط و دادنامه بدوی قطعی تلقی می‌گردد مگر جهات عذر موجه موضوع ماده ۳۰۶ ق.آ.د.م اثبات شود.',
      };
    }
    if (days <= 3) {
      return {
        level: 'critical',
        label: `فوری و بحرانی: تنها ${days} روز باقی‌مانده`,
        badgeClass: 'bg-rose-500/20 text-rose-500 border-rose-500/40 animate-pulse',
        alertText: 'وضعیت اضطراری: دادخواست/لایحه باید حداکثر ظرف ۴۸ ساعت در دفاتر خدمات الکترونیک قضایی ثبت قطعی شود.',
      };
    }
    if (days <= 7) {
      return {
        level: 'warning',
        label: `هشدار: ${days} روز باقی‌مانده`,
        badgeClass: 'bg-amber-500/20 text-amber-500 border-amber-500/40',
        alertText: 'توصیه وکیل: پیش‌نویس لایحه دفاعیه ظرف ۳ روز آینده نهایی و به تایید وکیل برسد.',
      };
    }
    return {
      level: 'normal',
      label: `مهلت کافی: ${days} روز باقی‌مانده`,
      badgeClass: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/40',
      alertText: 'زمان مناسب جهت گردآوری اسناد، استعلامات و استخراج آرای وحدت رویه مشابه وجود دارد.',
    };
  };

  const urgency = getUrgencyLevel(remainingDays);

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100">
      {/* هدر بخش تقویم مواعد */}
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800/80 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500 dark:text-[#D4AF37]">
                <CalendarClock className="w-5 h-5" />
              </span>
              <h3 className="text-lg sm:text-xl font-black font-serif text-slate-900 dark:text-white">
                سامانه هوشمند پایش مواعد دادرسی و تقویم فرجه‌های قضایی
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              محاسبه مکانیزه مواعد تجدیدنظر، فرجام‌خواهی، واخواهی و مهلت کارشناسی مستند به مواد ۴۴۲ الی ۴۵۳ ق.آ.د.م با احتساب تعطیلات رسمی.
            </p>
          </div>

          {/* روزشمار معکوس وضعیت فرجه */}
          <div className={`p-4 rounded-2xl border text-right space-y-1 ${urgency.badgeClass} min-w-[260px]`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold opacity-80">فرجه قانونی باقی‌مانده:</span>
              <span className="text-2xl font-black font-mono">{remainingDays} روز</span>
            </div>
            <span className="block text-xs font-bold">{urgency.label}</span>
          </div>
        </div>

        {/* جعبه انتخاب نوع فرجه قانونی */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
              ۱. انتخاب نوع فرجه قضایی (اعتراض به رأی / دستور / کارشناسی):
            </label>
            <select
              value={selectedRuleId}
              onChange={(e) => setSelectedRuleId(e.target.value)}
              className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070D1E] text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
            >
              {JUDICIAL_DEADLINE_RULES_DATA.map((rule) => (
                <option key={rule.id} value={rule.id}>
                  {rule.title} ({rule.durationDays} روزه)
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
              ۲. اقامتگاه موکل:
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setResidenceStatus('iran')}
                className={`flex-1 py-3 rounded-2xl text-xs font-bold transition-all border ${
                  residenceStatus === 'iran'
                    ? 'bg-[#0B132B] dark:bg-white text-white dark:text-[#0B132B] border-[#D4AF37]'
                    : 'bg-slate-50 dark:bg-[#070D1E] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                مقیم ایران (۲۰ روز)
              </button>
              <button
                onClick={() => setResidenceStatus('foreign')}
                className={`flex-1 py-3 rounded-2xl text-xs font-bold transition-all border ${
                  residenceStatus === 'foreign'
                    ? 'bg-[#0B132B] dark:bg-white text-white dark:text-[#0B132B] border-[#D4AF37]'
                    : 'bg-slate-50 dark:bg-[#070D1E] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                مقیم خارج (۲ ماه)
              </button>
            </div>
          </div>
        </div>

        {/* شبیه‌ساز تاریخ ابلاغ سامانه ثنا */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-[#070D1E]/70 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                ۳. مدت زمان سپری‌شده از تاریخ درج در حساب کاربری ثنا:
              </span>
              <span className="text-[11px] text-slate-400">
                مبنای شروع مهلت: تاریخ رویت در سامانه ابلاغ الکترونیک قضایی
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold font-mono text-indigo-500 dark:text-indigo-400">
                {elapsedDays} روز گذشته
              </span>
              <input
                type="range"
                min="0"
                max={totalDurationDays + 4}
                value={elapsedDays}
                onChange={(e) => setElapsedDays(parseInt(e.target.value))}
                className="w-40 sm:w-56 accent-[#D4AF37] cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs pt-2 border-t border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-500">نوع ابلاغ ثنا:</span>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="delivery"
                checked={deliveryType === 'actual'}
                onChange={() => setDeliveryType('actual')}
                className="accent-indigo-600"
              />
              <span className="text-slate-700 dark:text-slate-300">
                ابلاغ واقعی (مشاهده توسط موکل با پیامک تایید)
              </span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="delivery"
                checked={deliveryType === 'legal'}
                onChange={() => setDeliveryType('legal')}
                className="accent-indigo-600"
              />
              <span className="text-slate-700 dark:text-slate-300">
                ابلاغ قانونی (صرف ارسال به حساب کاربری بدون مشاهده)
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* جزئیات حقوقی ماده قانونی و قواعد حاکم */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* کارت شرح مستند قانونی */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <CalendarCheck2 className="w-5 h-5 text-emerald-500" />
            قواعد آمره محاسبه موعد قضایی
          </h4>

          <div className="space-y-3 text-xs leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-indigo-500 dark:text-indigo-400 block">
                مستند قانونی حاکم:
              </span>
              <p className="text-slate-700 dark:text-slate-300 font-semibold">
                {selectedRule.statutoryArticle}
              </p>
              <p className="text-slate-500 text-[11px] pt-1">
                {selectedRule.description}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1">
              <span className="font-bold text-amber-700 dark:text-amber-400 block">
                قاعده طلایی عدم احتساب روز ابلاغ و اقدام (ماده ۴۴۵ ق.آ.د.م):
              </span>
              <p className="text-slate-700 dark:text-slate-200">
                «موعدی که ابتدای آن تاریخ ابلاغ است، روز ابلاغ و همچنین روز اقدام جزء مدت محسوب نمی‌شود.» بنابراین موکل عملاً ۱ روز علاوه بر عدد اسمی مهلت دارد.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-500/5 border border-indigo-500/20 space-y-1">
              <span className="font-bold text-indigo-700 dark:text-indigo-400 block">
                قاعده مصادف شدن روز آخر با تعطیلات رسمی (ماده ۴۴۴ ق.آ.د.م):
              </span>
              <p className="text-slate-700 dark:text-slate-200">
                چنانچه روز بیستم با جمعه یا تعطیل رسمی تصادف کند، آن روز به حساب نیامده و پایان موعد تا انتهای وقت اداری اولین روز کاری بعد از تعطیلی تمدید قانونی می‌گردد.
              </p>
            </div>
          </div>
        </div>

        {/* کارت اقدامات ضروری وکیل */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <AlertOctagon className="w-5 h-5 text-rose-500" />
            دستورالعمل اقدامات اضطراری وکیل
          </h4>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>گام اول:</strong> استخراج فایل PDF دادنامه با شناسه رمز تصدیق از درگاه عدل‌ایران.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>گام دوم:</strong> تطبیق جهات تجدیدنظرخواهی با بندهای پنج‌گانه ماده ۳۴۸ قانون آیین دادرسی مدنی.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>گام سوم:</strong> محاسبه دقیق هزینه دادرسی تجدیدنظر (۴.۵٪ بهای خواسته در دعاوی مالی) جهت جلوگیری از اخطار رفع نقص.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>گام چهارم:</strong> اخذ تاییدیه نهایی از سرکار خانم دکتر سیده مریم رضوی و ارسال لایحه الکترونیک.
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/5 text-xs text-rose-700 dark:text-rose-300 leading-relaxed font-semibold">
            {urgency.alertText}
          </div>
        </div>
      </div>

      {/* پاورقی خروجی تقویم و چاپ */}
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="space-y-0.5 text-center sm:text-right">
          <span className="font-bold text-slate-900 dark:text-white block">
            تقویم مواعد دادرسی دفتر وکالت دکتر سیده مریم رضوی
          </span>
          <span className="text-slate-400">
            سازگار با تقویم رسمی قوه قضاییه و سیستم اتوماسیون دفاتر خدمات الکترونیک قضایی.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              alert('یادآور موعد دادرسی در تقویم سیستم با موفقیت تنظیم گردید.');
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all text-xs active:scale-95"
          >
            <Calendar className="w-4 h-4" /> افزودن به تقویم شخصی
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 transition-all text-xs active:scale-95"
          >
            <Printer className="w-4 h-4" /> چاپ تقویم موعد
          </button>
        </div>
      </div>
    </div>
  );
};
