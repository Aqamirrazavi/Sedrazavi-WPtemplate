import React, { useState } from 'react';
import {
  Building2,
  Users,
  CheckCircle2,
  AlertTriangle,
  Scale,
  FileText,
  Printer,
  Copy,
  Check,
  Sparkles,
  HelpCircle,
  Clock,
  ShieldAlert,
  ShieldCheck,
  ChevronDown,
  Info,
  Layers,
} from 'lucide-react';
import { CORPORATE_DECISIONS_DATA } from '../../data/mockData';
import { CompanyType, CorporateDecisionQuorum } from '../../types/theme';

export const CorporateGovernanceManager: React.FC = () => {
  const [companyType, setCompanyType] = useState<CompanyType>('سهامی خاص');
  const [selectedDecisionId, setSelectedDecisionId] = useState<string>('corp-financial-statements');
  const [meetingCall, setMeetingCall] = useState<'first' | 'second'>('first');

  // داده‌های سهامداران و حد نصاب
  const [totalShares, setTotalShares] = useState<number>(100000);
  const [presentShares, setPresentShares] = useState<number>(65000);
  const [inFavorShares, setInFavorShares] = useState<number>(55000);

  // مشخصات شرکت جهت صدور صورتجلسه
  const [companyName, setCompanyName] = useState<string>('فناوران بین‌الملل خاورمیانه');
  const [companyRegNumber, setCompanyRegNumber] = useState<string>('۵۸۹۲۴۱');
  const [meetingDate, setMeetingDate] = useState<string>('۱۴۰۳/۰۷/۱۵');
  const [copiedMinutes, setCopiedMinutes] = useState<boolean>(false);

  const selectedDecision: CorporateDecisionQuorum =
    CORPORATE_DECISIONS_DATA.find((d) => d.id === selectedDecisionId) ||
    CORPORATE_DECISIONS_DATA[0];

  // محاسبه درصد حضور
  const presencePercentage = Math.min(100, Math.round((presentShares / Math.max(1, totalShares)) * 100));
  const votePercentageOfPresent = Math.min(100, Math.round((inFavorShares / Math.max(1, presentShares)) * 100));

  // بررسی رسمیت جلسه بر اساس قانون تجارت
  const isAssemblyOrdinary =
    selectedDecision.assemblyType === 'مجمع عمومی عادی' ||
    selectedDecision.assemblyType === 'مجمع عمومی عادی به‌طور فوق‌العاده';

  let isQuorumReached = false;
  let quorumRequirementText = '';

  if (isAssemblyOrdinary) {
    if (meetingCall === 'first') {
      isQuorumReached = presencePercentage > 50; // بیش از ۵۰٪
      quorumRequirementText = 'نصاب نوبت اول: حضور بیش از ۵۰٪ دارندگان سهام دارای حق رأی (ماده ۸۴ ق.ت)';
    } else {
      isQuorumReached = presentShares > 0; // هر عده
      quorumRequirementText = 'نصاب نوبت دوم: حضور هر عده از صاحبان سهام با قید نتیجه نوبت اول در آگهی (ماده ۸۵ ق.ت)';
    }
  } else {
    // مجمع فوق‌العاده
    if (meetingCall === 'first') {
      isQuorumReached = presencePercentage > 50;
      quorumRequirementText = 'نصاب نوبت اول: حضور بیش از ۵۰٪ دارندگان سهام دارای حق رأی (ماده ۸۴ ق.ت)';
    } else {
      isQuorumReached = presencePercentage > 33.33; // بیش از یک‌سوم
      quorumRequirementText = 'نصاب نوبت دوم: حضور بیش از یک‌سوم سهام دارای حق رأی (ماده ۸۴ ق.ت)';
    }
  }

  // بررسی تصویب مصوبه
  let isDecisionApproved = false;
  let approvalRequirementText = '';

  if (isAssemblyOrdinary) {
    isDecisionApproved = isQuorumReached && votePercentageOfPresent > 50; // نصف به علاوه یک
    approvalRequirementText = 'اکثریت لازم: نصف به علاوه یک آراء حاضر در جلسه (ماده ۸۸ ق.ت)';
  } else {
    // مجمع فوق‌العاده: دو سوم آراء حاضر
    isDecisionApproved = isQuorumReached && votePercentageOfPresent >= 66.67;
    approvalRequirementText = 'اکثریت لازم: حداقل دو‌سوم آراء حاضر در جلسه (ماده ۸۴ ق.ت)';
  }

  // متن استاندارد صورتجلسه
  const generatedMinutesText = `بسمه‌تعالی
صورتجلسه ${selectedDecision.assemblyType}
شرکت ${companyName} (${companyType})
شماره ثبت: ${companyRegNumber} - شناسه ملی: ۱۰۱۰${companyRegNumber}۰۲۳

جلسه ${selectedDecision.assemblyType} شرکت ${companyName} (${companyType}) در تاریخ ${meetingDate} ساعت ۱۰:۰۰ صبح در محل قانونی شرکت با حضور دارندگان ${presentShares.toLocaleString(
    'fa-IR'
  )} سهم از مجموع ${totalShares.toLocaleString(
    'fa-IR'
  )} سهم با حق رأی (معادل ${presencePercentage}٪ کل سهام) به عنوان نوبت ${meetingCall === 'first' ? 'اول' : 'دوم'} رسمیت یافت.

هیئت‌رئیسه مجمع به شرح زیر به اتفاق آراء انتخاب شدند:
۱. رئیس مجمع: آقای/خانم دکتر احسان رادمنش
۲. ناظر اول مجمع: آقای/خانم مهندس سارا کریمی
۳. ناظر دوم مجمع: آقای/خانم علی فرهمند
۴. منشی مجمع: آقای/خانم نیما صبوری

دستور جلسه:
${selectedDecision.title}

مصوبات مجمع:
پس از قرائت گزارش هیئت‌مدیره و استماع گزارش بازرس قانونی، مجمع با ${inFavorShares.toLocaleString(
    'fa-IR'
  )} رأی موافق (معادل ${votePercentageOfPresent}٪ آراء حاضرین)، موضوع «${selectedDecision.title}» را مستند به ${
    selectedDecision.statutoryArticle
  } به تصویب رساند.

وکالت با حق توکیل به غیر:
به سرکار خانم دکتر سیده مریم رضوی (وکیل پایه یک دادگستری با شماره پروانه ۱۸۴۵۲) وکالت داده شد تا با مراجعه به اداره ثبت شرکت‌ها و مؤسسات غیرتجاری نسبت به ثبت این صورتجلسه و امضای ذیل دفاتر و پرداخت حقوق دولتی اقدام نماید.

محل امضای هیئت‌رئیسه مجمع:
رئیس مجمع: ................... ناظر اول: ................... ناظر دوم: ................... منشی: ...................`;

  const handleCopyMinutes = () => {
    navigator.clipboard.writeText(generatedMinutesText);
    setCopiedMinutes(true);
    setTimeout(() => setCopiedMinutes(false), 2500);
  };

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100">
      {/* هدر بخش حاکمیت شرکتی */}
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800/80 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                <Building2 className="w-5 h-5" />
              </span>
              <h3 className="text-lg sm:text-xl font-black font-serif text-slate-900 dark:text-white">
                سامانه هوشمند حاکمیت شرکتی، حد نصاب مجامع و صورتجلسات ثبتی
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              محاسبه مکانیزه نصاب رسمیت جلسه و اکثریت آراء طبق مواد ۷۲ الی ۱۰۶ لایحه اصلاحی قانون تجارت و پیشگیری از ابطال تصمیمات طبق ماده ۲۷۰.
            </p>
          </div>

          {/* نشان وضعیت رسمیت و تصویب */}
          <div
            className={`p-4 rounded-2xl border text-right space-y-1 min-w-[260px] ${
              isDecisionApproved
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : !isQuorumReached
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span>وضعیت حقوقی مجمع:</span>
              <span className="font-mono text-sm font-black">
                {isDecisionApproved
                  ? 'مصوب و قابل ثبت'
                  : !isQuorumReached
                  ? 'فاقد حد نصاب رسمیت'
                  : 'فاقد اکثریت آراء'}
              </span>
            </div>
            <span className="text-[11px] block font-semibold">
              {isDecisionApproved
                ? 'جلسه رسمی بوده و آراء به حد نصاب قانونی ماده مربوطه رسیده است.'
                : !isQuorumReached
                ? 'جلسه تشکیل نمی‌گردد؛ الزام به انتشار آگهی نوبت دوم با ذکر علت.'
                : 'جلسه رسمیت یافت اما پیشنهاد رأی نیاورد.'}
            </span>
          </div>
        </div>

        {/* فیلترهای پایه شرکت و نوع دستور جلسه */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
              ۱. نوع شخصیت حقوقی:
            </label>
            <select
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value as CompanyType)}
              className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070D1E] text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
            >
              <option value="سهامی خاص">شرکت سهامی خاص (بیشترین کاربرد)</option>
              <option value="با مسئولیت محدود">شرکت با مسئولیت محدود</option>
              <option value="سهامی عام">شرکت سهامی عام (بورسی / فرابورسی)</option>
              <option value="دانش‌بنیان / استارتاپ">شرکت دانش‌بنیان / استارتاپ</option>
              <option value="تضامنی">شرکت تضامنی و صرافی</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
              ۲. نوع دستور جلسه و تصمیم مدنظر:
            </label>
            <select
              value={selectedDecisionId}
              onChange={(e) => setSelectedDecisionId(e.target.value)}
              className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070D1E] text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
            >
              {CORPORATE_DECISIONS_DATA.map((dec) => (
                <option key={dec.id} value={dec.id}>
                  {dec.title} ({dec.assemblyType})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
              ۳. نوبت دعوت مجمع:
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMeetingCall('first')}
                className={`flex-1 py-3 rounded-2xl text-xs font-bold border transition-all ${
                  meetingCall === 'first'
                    ? 'bg-[#0B132B] dark:bg-white text-white dark:text-[#0B132B] border-[#D4AF37]'
                    : 'bg-slate-50 dark:bg-[#070D1E] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                نوبت اول (اصلی)
              </button>
              <button
                type="button"
                onClick={() => setMeetingCall('second')}
                className={`flex-1 py-3 rounded-2xl text-xs font-bold border transition-all ${
                  meetingCall === 'second'
                    ? 'bg-[#0B132B] dark:bg-white text-white dark:text-[#0B132B] border-[#D4AF37]'
                    : 'bg-slate-50 dark:bg-[#070D1E] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                نوبت دوم (تجدیدی)
              </button>
            </div>
          </div>
        </div>

        {/* شبیه‌ساز تعداد سهام و محاسبه درصدها */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 block">
                تعداد کل سهام با حق رأی شرکت:
              </label>
              <input
                type="number"
                min="100"
                value={totalShares}
                onChange={(e) => setTotalShares(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-xs sm:text-sm font-bold font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500">سهام حاضر در جلسه:</span>
                <span className="text-indigo-500 font-mono">{presencePercentage}٪ کل سهام</span>
              </div>
              <input
                type="number"
                min="0"
                max={totalShares}
                value={presentShares}
                onChange={(e) => {
                  const val = Math.min(totalShares, parseInt(e.target.value) || 0);
                  setPresentShares(val);
                  if (inFavorShares > val) setInFavorShares(val);
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-xs sm:text-sm font-bold font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500">سهام موافق با مصوبه:</span>
                <span className="text-emerald-500 font-mono">{votePercentageOfPresent}٪ حاضرین</span>
              </div>
              <input
                type="number"
                min="0"
                max={presentShares}
                value={inFavorShares}
                onChange={(e) => setInFavorShares(Math.min(presentShares, parseInt(e.target.value) || 0))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-xs sm:text-sm font-bold font-mono"
              />
            </div>
          </div>

          {/* نوارهای پیشرفت وضعیت رسمیت و رأی */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-500">نصاب رسمیت جلسه:</span>
                <span className={isQuorumReached ? 'text-emerald-500' : 'text-rose-500'}>
                  {presencePercentage}٪ {isQuorumReached ? '(حد نصاب احراز شد)' : '(فاقد حد نصاب)'}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isQuorumReached ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${presencePercentage}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 block">{quorumRequirementText}</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-500">اکثریت آراء موافق:</span>
                <span className={isDecisionApproved ? 'text-emerald-500' : 'text-amber-500'}>
                  {votePercentageOfPresent}٪ {isDecisionApproved ? '(تصویب شد)' : '(رد شد)'}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isDecisionApproved ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${votePercentageOfPresent}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 block">{approvalRequirementText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* دو ستون: مستندات قانونی و الزامات ثبتی + پیش‌نویس صورتجلسه آماده ارسال */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ستون راست: احکام و مواد قانونی */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Scale className="w-5 h-5 text-[#D4AF37]" />
              مستندات قانونی و قواعد آمره حاکم
            </h4>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
              <span className="font-bold text-indigo-500 block">مستند قانونی لایحه تجارت:</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {selectedDecision.statutoryArticle}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1 text-xs">
              <span className="font-bold text-amber-700 dark:text-[#D4AF37] block">
                توصیه راهبردی سرکار خانم دکتر سیده مریم رضوی:
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedDecision.lawyerTips}
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-600 dark:text-slate-400 block">
                مدارک و ضمایم الزامی جهت بارگذاری در سامانه ثبت شرکت‌ها:
              </span>
              <ul className="space-y-1.5 pr-2">
                {selectedDecision.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/20 flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">مهلت قانونی ثبت نزد مرجع ثبت:</span>
              <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400">
                حداکثر {selectedDecision.registrationDeadlineDays} روز
              </span>
            </div>
          </div>
        </div>

        {/* ستون چپ: تولید مکانیزه صورتجلسه مجمع */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-500" />
                پیش‌نویس استاندارد صورتجلسه مجمع
              </h4>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyMinutes}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {copiedMinutes ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" /> کپی شد
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> کپی متن
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="چاپ صورتجلسه"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* فیلدهای سفارشی‌سازی نام شرکت */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">نام شرکت:</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070D1E] text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">شماره ثبت:</label>
                <input
                  type="text"
                  value={companyRegNumber}
                  onChange={(e) => setCompanyRegNumber(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070D1E] text-xs font-bold font-mono"
                />
              </div>
            </div>

            {/* بدنه صورتجلسه */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 text-xs font-mono leading-relaxed max-h-72 overflow-y-auto whitespace-pre-line text-slate-800 dark:text-slate-200 select-all">
              {generatedMinutesText}
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2 font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>
                صورتجلسه دارای بند وکالت رسمی به سرکار خانم دکتر سیده مریم رضوی جهت ثبت فوری در اداره ثبت شرکت‌ها می‌باشد.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
