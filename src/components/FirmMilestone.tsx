import React, { useState } from 'react';
import {
  Calendar,
  Award,
  TrendingUp,
  Target,
  Compass,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Scale,
  Sparkles,
} from 'lucide-react';

export interface MilestoneItem {
  id: string;
  year: string;
  title: string;
  category: 'past' | 'current' | 'future';
  categoryLabel: string;
  summary: string;
  details: string;
  achievements: string[];
  metrics: { label: string; value: string };
  iconType: 'founding' | 'expansion' | 'arbitration' | 'digital' | 'supreme' | 'future';
}

const MILESTONES: MilestoneItem[] = [
  {
    id: 'm-2008',
    year: '۱۳۸۷',
    title: 'تأسیس دفتر وکالت و تمرکز بر دعاوی تجاری',
    category: 'past',
    categoryLabel: 'آغاز مسیر حرفه‌ای',
    summary: 'راه‌اندازی نخستین دفتر وکالت در تهران با تمرکز بر پرونده‌های تجاری و شرکت‌های بازرگانی.',
    details: 'در سال ۱۳۸۷ پس از کسب رتبه برتر آزمون کانون وکلای دادگستری مرکز، دفتر وکالت با ماموریت ارائه مشاوره‌های حقوقی پیشگیرانه و دفاع مستند در دادگاه‌های عمومی و انقلاب تاسیس شد.',
    achievements: [
      'کسب رتبه ممتاز در کانون وکلای دادگستری مرکز',
      'وکالت بیش از ۸۰ پرونده قراردادهای تجاری و بازرگانی',
      'تدوین نخستین دستورالعمل‌های حقوقی برای بازرگانان'
    ],
    metrics: { label: 'نرخ پیروزی اولیه', value: '۹۲٪' },
    iconType: 'founding',
  },
  {
    id: 'm-2014',
    year: '۱۳۹۳',
    title: 'گسترش دپارتمان اراضی، املاک و قراردادهای کلان',
    category: 'past',
    categoryLabel: 'توسعه و تخصص‌گرایی',
    summary: 'تشکیل کارگروه تخصصی اراضی، مستحدثات، سرقفلی و قراردادهای سرمایه‌گذاری ملکی.',
    details: 'با پیچیده‌تر شدن قوانین ثبتی و پرونده‌های اراضی شهری، دپارتمان تخصصی دعاوی ملکی با همراهی کارشناسان رسمی دادگستری بنیان نهاده شد.',
    achievements: [
      'احقاق حقوق موکلین در بیش از ۳۲۰ پرونده ملکی سنگین',
      'ابطال اسناد معارض و اثبات مالکیت در اراضی بزرگ‌مقیاس',
      'تنظیم قراردادهای مشارکت در ساخت بیش از ۵۰ مجتمع تجاری'
    ],
    metrics: { label: 'ارزش پرونده‌های حل‌شده', value: '+۸۵۰ میلیارد تومان' },
    iconType: 'expansion',
  },
  {
    id: 'm-2018',
    year: '۱۳۹۷',
    title: 'پیوستن به مراجع بین‌المللی داوری و حل اختلاف تجاری',
    category: 'past',
    categoryLabel: 'بین‌المللی‌سازی',
    summary: 'اخذ گواهینامه‌های رسمی داوری بازرگانی و داوری پرونده‌های صادراتی و ارزی.',
    details: 'گسترش ارتباطات حقوقی با مراکز داوری منطقه‌ای و بین‌المللی، داوری سازمانی و دفاع از بنگاه‌های اقتصادی در محاکم تجاری و کنوانسیون‌های فرامرزی.',
    achievements: [
      'داوری در ۴۵ پرونده منازعات بین‌المللی بازرگانی',
      'ارائه مشاوره تحریم و قراردادهای چندجانبه ارزی',
      'عضویت در کانون‌های داوری معتبر منطقه'
    ],
    metrics: { label: 'حل‌وفصل بدون اطاله دادرسی', value: '۷۸٪' },
    iconType: 'arbitration',
  },
  {
    id: 'm-2022',
    year: '۱۴۰۱',
    title: 'راه‌اندازی زیرساخت دیجیتال و پورتال برخط موکلین',
    category: 'past',
    categoryLabel: 'نوآوری فناورانه',
    summary: 'پیاده‌سازی پورتال جامع شفافیت پرونده، محاسبه‌گر آنلاین هزینه‌های دادرسی و پیام‌رسان امن.',
    details: 'با هدف رعایت اصل شفافیت، دسترسی ۲۴ ساعته موکل به آخرین لوایح، اخطاریه‌های ابلاغی سامانه ثنا و وضعیت دادنامه‌ها در بستری امن فراهم شد.',
    achievements: [
      'سامانه ره‌گیری الکترونیکی نوبت‌ها و پرونده‌ها',
      'محاسبه‌گر هوشمند تمبر مالیاتی و دستمزد کارشناسی',
      'کاهش ۶۰ درصدی مراجعات حضوری غیرضروری'
    ],
    metrics: { label: 'رضایت موکلین در سامانه', value: '۹۸.۴٪' },
    iconType: 'digital',
  },
  {
    id: 'm-2025',
    year: '۱۴۰۴',
    title: 'مرجعیت در پرونده‌های فرجام‌خواهی دیوان عالی کشور',
    category: 'current',
    categoryLabel: 'مرجعیت فعلی',
    summary: 'ثبت بالاترین درصد موفقیت در اعاده دادرسی موضوع ماده ۴۷۴ و نقض آرای ناصواب در شعب دیوان عالی.',
    details: 'امروز دفتر وکالت به عنوان یکی از مراجع پیشرو در قبول پرونده‌های فوق‌العاده دیوان عالی کشور، دعاوی اصل ۴۹ و پرونده‌های سنگین مالیاتی و گمرکی شناخته می‌شود.',
    achievements: [
      'بیش از ۱۲۸۰ پرونده مختومه با خروجی اثربخش',
      'پذیرش بیش از ۶۸ درخواست اعاده دادرسی در شعب تخصصی دیوان',
      'همکاری با شبکه بیش از ۲۰ مشاور و حقوقدان دانشگاهی'
    ],
    metrics: { label: 'کل پرونده‌های ثبت‌شده', value: '+۱۲۸۰' },
    iconType: 'supreme',
  },
  {
    id: 'm-2026-2028',
    year: '۱۴۰۵ - ۱۴۰۷',
    title: 'افق راهبردی: دستیار هوشمند حقوقی و داوری آنلاین فرامرزی',
    category: 'future',
    categoryLabel: 'اهداف راهبردی آینده',
    summary: 'طراحی موتور تطبیق آرای وحدت رویه بر پایه هوش مصنوعی و گسترش مرکز داوری دیجیتال.',
    details: 'برنامه استراتژیک سه‌ساله دفتر شامل بهره‌گیری از مدل‌های پردازش زبان طبیعی فارسی برای مستندسازی لوایح دفاعیه، راه‌اندازی کلینیک حقوقی آنلاین برای کارآفرینان و تاسیس نمایندگی در مراکز مالی بین‌المللی است.',
    achievements: [
      'توسعه پلتفرم ارزیابی ریسک حقوقی قراردادها با هوش مصنوعی',
      'تاسیس میز داوری دیجیتال ویژه استارتاپ‌ها و تجارت الکترونیک',
      'انتشار کتابچه سالانه رویه‌های قضایی پیشرو'
    ],
    metrics: { label: 'پوشش پرونده‌های هدف', value: '+۲۵۰۰' },
    iconType: 'future',
  },
];

export const FirmMilestone: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'past' | 'future'>('all');
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneItem>(MILESTONES[4]); // Default to current 2025 milestone

  const filteredMilestones = MILESTONES.filter((m) => {
    if (activeFilter === 'past') return m.category === 'past';
    if (activeFilter === 'future') return m.category === 'future' || m.category === 'current';
    return true;
  });

  return (
    <div className="w-full mt-16 pt-12 border-t border-gray-100 dark:border-gray-800 text-right">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#AA820A] dark:text-[#D4AF37] font-bold">
            <Compass className="w-4 h-4 text-[#D4AF37]" />
            <span>داستان رشد و افق راهبردی</span>
            <span aria-hidden="true" className="text-gray-300 dark:text-gray-600">·</span>
            <span className="text-gray-500 dark:text-gray-400 font-normal">از تاسیس تا چشم‌انداز ۱۴۰۷</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B132B] dark:text-white mt-1.5">
            نقشه راه تحول، افتخارات و اهداف آینده دفتر وکالت
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">
            مروری بر نزدیک به دو دهه مجاهدت علمی و دفاع قاطع حقوقی، در کنار گام‌های بنیادین برای ارتقای استانداردهای عدالت در سال‌های پیش رو.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl self-start md:self-auto border border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeFilter === 'all'
                ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-[#D4AF37] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            همه مراحل ({MILESTONES.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('past')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeFilter === 'past'
                ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-[#D4AF37] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            مسیر سپری‌شده (۱۳۸۷-۱۴۰۱)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('future')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeFilter === 'future'
                ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-[#D4AF37] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            حال و افق آینده (۱۴۰۴-۱۴۰۷)
          </button>
        </div>
      </div>

      {/* Interactive Horizontal Timeline Ribbon */}
      <div className="relative mb-8 pb-3 overflow-x-auto no-scrollbar">
        {/* Connecting track line */}
        <div className="absolute top-7 left-4 right-4 h-0.5 bg-gray-200 dark:bg-gray-700 -z-0" />

        <div className="flex items-center justify-between min-w-[680px] px-2 relative z-10">
          {filteredMilestones.map((m) => {
            const isSelected = selectedMilestone.id === m.id;
            const isFuture = m.category === 'future';
            const isCurrent = m.category === 'current';

            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMilestone(m)}
                className={`flex flex-col items-center group transition-transform focus:outline-none ${
                  isSelected ? 'scale-105' : 'hover:scale-102'
                }`}
              >
                {/* Milestone Node Circle */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border-2 ${
                    isSelected
                      ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B132B] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 ring-4 ring-[#D4AF37]/20'
                      : isFuture
                      ? 'bg-gradient-to-tr from-sky-50 to-indigo-50 dark:bg-gray-800 text-sky-600 dark:text-sky-400 border-sky-300 dark:border-sky-700'
                      : isCurrent
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-[#D4AF37] border-[#D4AF37]'
                      : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:border-[#D4AF37]'
                  }`}
                >
                  {isFuture ? (
                    <Target className="w-5 h-5" />
                  ) : isCurrent ? (
                    <Sparkles className="w-5 h-5" />
                  ) : (
                    <Briefcase className="w-5 h-5" />
                  )}
                </div>

                {/* Milestone Year and Kicker */}
                <span
                  className={`mt-2 text-xs font-bold font-mono transition-colors ${
                    isSelected
                      ? 'text-[#AA820A] dark:text-[#D4AF37]'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {m.year}
                </span>
                <span className="text-[11px] text-gray-400 max-w-[110px] text-center truncate">
                  {m.categoryLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Milestone Story Card */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900/60 dark:via-[#0B132B] dark:to-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Story Details (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="font-mono font-bold text-base text-[#D4AF37]">
                {selectedMilestone.year}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-[#0B132B] dark:text-gray-200">
                {selectedMilestone.categoryLabel}
              </span>
              {selectedMilestone.category === 'future' && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-sky-600 dark:text-sky-400 font-bold">چشم‌انداز راهبردی</span>
                </>
              )}
            </div>

            <h4 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white leading-tight">
              {selectedMilestone.title}
            </h4>

            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              {selectedMilestone.summary}
            </p>

            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {selectedMilestone.details}
            </p>

            {/* Achievements List */}
            <div className="pt-2">
              <div className="text-xs font-bold text-gray-900 dark:text-white mb-2.5">
                دستاوردها و نتایج کلیدی این مرحله:
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                {selectedMilestone.achievements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Metric & Action Sidebar (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4 border-r-0 lg:border-r border-gray-100 dark:border-gray-800 lg:pr-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/80 shadow-sm text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {selectedMilestone.metrics.label}
              </div>
              <div className="text-3xl font-extrabold font-mono text-[#0B132B] dark:text-[#D4AF37]">
                {selectedMilestone.metrics.value}
              </div>
              <div className="mt-2 text-[11px] text-gray-400">
                ثبت‌شده در مستندات رسمی دفتر وکالت
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 leading-relaxed space-y-1">
              <div className="font-bold text-[#0B132B] dark:text-white flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>تعهد پایداری بر کیفیت</span>
              </div>
              <p>
                تمامی سوابق و شاخص‌های فوق با استناد به پرونده‌های مختومه و احکام قطعی محاکم در بایگانی مؤسسه محفوظ است.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
