import React, { useState } from 'react';
import {
  Calculator,
  Scale,
  FileText,
  DollarSign,
  TrendingUp,
  Percent,
  CheckCircle2,
  AlertCircle,
  Copy,
  Printer,
  Download,
  Info,
  Calendar,
  Layers,
  ChevronLeft,
} from 'lucide-react';

export const CourtFeeCalculator: React.FC = () => {
  const [calcType, setCalcType] = useState<'court_fee' | 'attorney_tariff' | 'delay_damages' | 'diyeh'>('court_fee');

  // Court fee state
  const [claimAmount, setClaimAmount] = useState<number>(500000000); // 500 million Rials
  const [courtStage, setCourtStage] = useState<'first_instance' | 'appeal' | 'supreme'>('first_instance');
  const [courtType, setCourtType] = useState<'general' | 'council'>('general');

  // Attorney tariff state
  const [attorneyStage, setAttorneyStage] = useState<'first' | 'appeal' | 'arbitration'>('first');
  const [disputeType, setDisputeType] = useState<'financial' | 'non_financial'>('financial');

  // Delay damages state
  const [debtAmount, setDebtAmount] = useState<number>(200000000);
  const [dueYear, setDueYear] = useState<number>(1400);
  const [currentYear] = useState<number>(1403);

  // Diyeh state
  const [diyehPercentage, setDiyehPercentage] = useState<number>(100);
  const [isSacredMonth, setIsSacredMonth] = useState<boolean>(false);
  const BASE_DIYEH_1403 = 12000000000; // 1.2 billion Tomans = 12 billion Rials in normal months

  // Calculation results
  const calculateCourtFee = () => {
    if (courtType === 'council') {
      // شوراهای حل اختلاف
      return Math.round(claimAmount * 0.05); // 5%
    }
    if (courtStage === 'first_instance') {
      if (claimAmount <= 200000000) {
        return Math.round(claimAmount * 0.025); // تا ۲۰ میلیون تومان: ۲.۵٪
      } else {
        return Math.round(5000000 + (claimAmount - 200000000) * 0.035); // مازاد بر ۲۰ میلیون: ۳.۵٪
      }
    } else if (courtStage === 'appeal') {
      return Math.round(claimAmount * 0.045); // تجدیدنظر: ۴.۵٪
    } else {
      return Math.round(claimAmount * 0.055); // فرجام‌خواهی: ۵.۵٪
    }
  };

  const calculateAttorneyTariff = () => {
    // طبق آیین‌نامه تعرفه حق‌الوکاله مصوب ۱۳۹۸ قوه قضاییه
    let baseTariff = 0;
    if (disputeType === 'non_financial') {
      return {
        tariff: 40000000, // ۴ میلیون تومان میانگین غیرمالی
        taxStamp: 2000000,
        supportFund: 1600000,
      };
    }

    if (claimAmount <= 500000000) {
      baseTariff = claimAmount * 0.08; // تا ۵۰ میلیون تومان ۸٪
    } else if (claimAmount <= 2000000000) {
      baseTariff = 40000000 + (claimAmount - 500000000) * 0.07; // تا ۲۰۰ میلیون ۷٪
    } else if (claimAmount <= 10000000000) {
      baseTariff = 145000000 + (claimAmount - 2000000000) * 0.05; // تا ۱ میلیارد ۵٪
    } else {
      baseTariff = 545000000 + (claimAmount - 10000000000) * 0.04; // مازاد بر ۱ میلیارد ۴٪
    }

    let stageFactor = 1;
    if (attorneyStage === 'first') stageFactor = 0.6; // ۶۰٪ مرحله بدوی
    if (attorneyStage === 'appeal') stageFactor = 0.4; // ۴۰٪ مرحله تجدیدنظر
    if (attorneyStage === 'arbitration') stageFactor = 0.5;

    const finalTariff = Math.round(baseTariff * stageFactor);
    const taxStamp = Math.round(finalTariff * 0.05); // ۵٪ تمبر مالیاتی
    const supportFund = Math.round(finalTariff * 0.04); // ۴٪ سهم صندوق حمایت و کانون

    return {
      tariff: finalTariff,
      taxStamp,
      supportFund,
    };
  };

  const calculateDelayDamages = () => {
    // شبیه‌سازی فرمول تورم بانک مرکزی
    const inflationMultipliers: Record<number, number> = {
      1398: 4.8,
      1399: 3.6,
      1400: 2.7,
      1401: 1.9,
      1402: 1.45,
      1403: 1.0,
    };
    const multiplier = inflationMultipliers[dueYear] || 2.0;
    const adjustedDebt = Math.round(debtAmount * multiplier);
    const damageAmount = adjustedDebt - debtAmount;
    return {
      adjustedDebt,
      damageAmount,
      multiplier,
    };
  };

  const calculateDiyeh = () => {
    const base = BASE_DIYEH_1403 * (diyehPercentage / 100);
    const total = isSacredMonth ? base * 1.3333333333 : base;
    return {
      baseAmount: Math.round(base),
      totalAmount: Math.round(total),
      sacredBonus: isSacredMonth ? Math.round(base * 0.3333333333) : 0,
    };
  };

  const formatRials = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' ریال';
  };

  const formatTomans = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(Math.round(amount / 10)) + ' تومان';
  };

  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const handleCopySummary = () => {
    let summary = '';
    if (calcType === 'court_fee') {
      const fee = calculateCourtFee();
      summary = `گزارش محاسبه هزینه دادرسی دادگستری:\nبهای خواسته: ${formatTomans(claimAmount)}\nمرجع: ${courtType === 'council' ? 'شورای حل اختلاف' : 'دادگاه عمومی'}\nمرحله: ${courtStage}\nهزینه دادرسی قابل پرداخت: ${formatTomans(fee)} (${formatRials(fee)})`;
    } else if (calcType === 'attorney_tariff') {
      const t = calculateAttorneyTariff();
      summary = `گزارش محاسبه تعرفه قانونی حق‌الوکاله و تمبر مالیاتی:\nبهای خواسته: ${formatTomans(claimAmount)}\nحق‌الوکاله قانونی: ${formatTomans(t.tariff)}\nتمبر مالیاتی (۵٪): ${formatTomans(t.taxStamp)}\nسهم کانون و صندوق حمایت: ${formatTomans(t.supportFund)}`;
    }
    navigator.clipboard.writeText(summary);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] text-white flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
              سامانه محاسبات قانونی، تمبر مالیاتی و هزینه‌های دادرسی
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              محاسبه آنی بر اساس آیین‌نامه‌های رسمی قوه قضاییه، تعرفه حق‌الوکاله و بخشنامه‌های بانک مرکزی
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            {copiedSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copiedSuccess ? 'کپی شد!' : 'کپی صورت‌حساب'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="btn-gold px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>چاپ رسمی لایحه</span>
          </button>
        </div>
      </div>

      {/* Calculator Type Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setCalcType('court_fee')}
          className={`py-3 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            calcType === 'court_fee'
              ? 'bg-[#0B132B] text-[#D4AF37] dark:bg-white dark:text-[#0B132B] shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>۱. هزینه دادرسی</span>
        </button>

        <button
          onClick={() => setCalcType('attorney_tariff')}
          className={`py-3 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            calcType === 'attorney_tariff'
              ? 'bg-[#0B132B] text-[#D4AF37] dark:bg-white dark:text-[#0B132B] shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>۲. تعرفه و تمبر وکیل</span>
        </button>

        <button
          onClick={() => setCalcType('delay_damages')}
          className={`py-3 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            calcType === 'delay_damages'
              ? 'bg-[#0B132B] text-[#D4AF37] dark:bg-white dark:text-[#0B132B] shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>۳. تاخیر تادیه (تورم)</span>
        </button>

        <button
          onClick={() => setCalcType('diyeh')}
          className={`py-3 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            calcType === 'diyeh'
              ? 'bg-[#0B132B] text-[#D4AF37] dark:bg-white dark:text-[#0B132B] shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
          }`}
        >
          <Percent className="w-4 h-4" />
          <span>۴. دیه و ارش ۱۴۰۳</span>
        </button>
      </div>

      {/* Active Form & Output Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {calcType === 'court_fee' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                  بهای خواسته یا مبلغ مورد مطالبه در دادخواست (ریال)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-mono text-left focus:outline-none focus:border-[#D4AF37]"
                    dir="ltr"
                    step="10000000"
                  />
                  <span className="absolute left-3 top-3.5 text-xs text-gray-400">ریال</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-[#AA820A] dark:text-[#D4AF37] font-semibold">
                  <span>معادل:</span>
                  <span>{formatTomans(claimAmount)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                    مرجع رسیدگی قضایی
                  </label>
                  <select
                    value={courtType}
                    onChange={(e: any) => setCourtType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs font-bold focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="general">دادگاه عمومی حقوقی</option>
                    <option value="council">شورای حل اختلاف (تا ۲۰ میلیون تومان یا توافقی)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                    مرحله دادرسی
                  </label>
                  <select
                    value={courtStage}
                    onChange={(e: any) => setCourtStage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs font-bold focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="first_instance">مرحله بدوی (نخستین)</option>
                    <option value="appeal">مرحله تجدیدنظر استان (۴.۵٪)</option>
                    <option value="supreme">دیوان عالی کشور / فرجام‌خواهی (۵.۵٪)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200 text-xs leading-relaxed flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>
                  طبق بند ۱۲ ماده ۳ قانون وصول برخی از درآمدهای دولت، هزینه دادرسی در مرحله بدوی تا ۲۰ میلیون تومان معادل ۲.۵٪ و مازاد بر آن ۳.۵٪ است.
                </span>
              </div>
            </div>
          )}

          {calcType === 'attorney_tariff' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                  ارزش خواسته موضوع وکالت (ریال)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-mono text-left focus:outline-none focus:border-[#D4AF37]"
                    dir="ltr"
                  />
                  <span className="absolute left-3 top-3.5 text-xs text-gray-400">ریال</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-[#AA820A] dark:text-[#D4AF37] font-semibold">
                  <span>معادل:</span>
                  <span>{formatTomans(claimAmount)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                    نوع دعوا
                  </label>
                  <select
                    value={disputeType}
                    onChange={(e: any) => setDisputeType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs font-bold focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="financial">دعاوی مالی (مطالبه وجه، ملک، قرارداد)</option>
                    <option value="non_financial">دعاوی غیرمالی (طلاق، تمکین، اثبات نسب و...)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                    مرحله قرارداد وکالت
                  </label>
                  <select
                    value={attorneyStage}
                    onChange={(e: any) => setAttorneyStage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs font-bold focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="first">مرحله بدوی (۶۰٪ کل تعرفه)</option>
                    <option value="appeal">مرحله تجدیدنظر (۴۰٪ کل تعرفه)</option>
                    <option value="arbitration">داوری و مصالحه (۵۰٪ کل تعرفه)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {calcType === 'delay_damages' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                  مبلغ اصل بدهی یا چک (ریال)
                </label>
                <input
                  type="number"
                  value={debtAmount}
                  onChange={(e) => setDebtAmount(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-mono text-left focus:outline-none focus:border-[#D4AF37]"
                  dir="ltr"
                />
                <div className="mt-1 flex items-center justify-between text-xs text-[#AA820A] dark:text-[#D4AF37] font-semibold">
                  <span>معادل:</span>
                  <span>{formatTomans(debtAmount)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                    سال سررسید یا تاریخ برگشت چک
                  </label>
                  <select
                    value={dueYear}
                    onChange={(e) => setDueYear(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs font-bold focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value={1398}>سال ۱۳۹۸</option>
                    <option value={1399}>سال ۱۳۹۹</option>
                    <option value={1400}>سال ۱۴۰۰</option>
                    <option value={1401}>سال ۱۴۰۱</option>
                    <option value={1402}>سال ۱۴۰۲</option>
                    <option value={1403}>سال ۱۴۰۳</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                    سال محاسبه و اجرای حکم
                  </label>
                  <input
                    type="text"
                    disabled
                    value="سال جاری (۱۴۰۳)"
                    className="w-full px-4 py-3 rounded-xl bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-500 cursor-not-allowed"
                  >
                  </input>
                </div>
              </div>
            </div>
          )}

          {calcType === 'diyeh' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                  درصد دیه یا ارش معین‌شده در نظریه پزشکی قانونی ({diyehPercentage}٪)
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="100"
                  step="0.5"
                  value={diyehPercentage}
                  onChange={(e) => setDiyehPercentage(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>۰.۵٪ (حارصه)</span>
                  <span>۵۰٪ (یک پا یا دست)</span>
                  <span>۱۰۰٪ (دیه کامل نفس)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">
                    تغلیظ دیه (وقوع تصادف یا جنایت در ماه‌های حرام)
                  </span>
                  <span className="text-[11px] text-gray-500">
                    رجب، ذی‌القعده، ذی‌الحجه و محرم (افزایش یک‌سوم به دیه کامل نفس)
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isSacredMonth}
                  onChange={(e) => setIsSacredMonth(e.target.checked)}
                  className="w-5 h-5 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Output Box (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0B132B] to-[#1C2541] rounded-3xl p-6 sm:p-7 border border-[#D4AF37]/30 text-white shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
              <Scale className="w-4 h-4" />
              نتیجه برآورد مالی و قضایی
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              رسمی ۱۴۰۳
            </span>
          </div>

          {calcType === 'court_fee' && (
            <div className="space-y-4">
              <div>
                <span className="text-xs text-gray-400 block mb-1">هزینه دادرسی تمبر دادگستری:</span>
                <p className="text-2xl sm:text-3xl font-bold font-serif text-[#D4AF37]">
                  {formatTomans(calculateCourtFee())}
                </p>
                <p className="text-xs font-mono text-gray-400 mt-0.5">
                  {formatRials(calculateCourtFee())}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>ارزش کل خواسته:</span>
                  <span className="font-bold">{formatTomans(claimAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>مرجع دادرسی:</span>
                  <span>{courtType === 'council' ? 'شورای حل اختلاف' : 'دادگاه حقوقی'}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>مرحله دادگاه:</span>
                  <span>{courtStage === 'first_instance' ? 'بدوی' : courtStage === 'appeal' ? 'تجدیدنظر' : 'دیوان عالی'}</span>
                </div>
              </div>
            </div>
          )}

          {calcType === 'attorney_tariff' && (() => {
            const tariff = calculateAttorneyTariff();
            return (
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-gray-400 block mb-1">تعرفه قانونی حق‌الوکاله:</span>
                  <p className="text-2xl sm:text-3xl font-bold font-serif text-[#D4AF37]">
                    {formatTomans(tariff.tariff)}
                  </p>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs">
                  <div className="flex justify-between text-gray-300">
                    <span>تمبر مالیاتی وکالت (۵٪):</span>
                    <span className="font-bold text-amber-300">{formatTomans(tariff.taxStamp)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>سهم صندوق حمایت و کانون (۴٪):</span>
                    <span className="font-bold text-sky-300">{formatTomans(tariff.supportFund)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300 pt-2 border-t border-white/10">
                    <span>مجموع پرداختی‌های قانونی:</span>
                    <span className="font-bold text-emerald-400">
                      {formatTomans(tariff.taxStamp + tariff.supportFund)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}

          {calcType === 'delay_damages' && (() => {
            const delay = calculateDelayDamages();
            return (
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-gray-400 block mb-1">مبلغ نهایی قابل مطالبه با تورم:</span>
                  <p className="text-2xl sm:text-3xl font-bold font-serif text-emerald-400">
                    {formatTomans(delay.adjustedDebt)}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                  <div className="flex justify-between text-gray-300">
                    <span>اصل مبلغ دین:</span>
                    <span>{formatTomans(debtAmount)}</span>
                  </div>
                  <div className="flex justify-between text-amber-300">
                    <span>خسارت ناشی از کاهش ارزش پول:</span>
                    <span className="font-bold">+{formatTomans(delay.damageAmount)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>ضریب تورمی شاخص بهای کالا:</span>
                    <span className="font-mono font-bold">{delay.multiplier} برابر</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {calcType === 'diyeh' && (() => {
            const d = calculateDiyeh();
            return (
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-gray-400 block mb-1">میزان دیه قابل پرداخت:</span>
                  <p className="text-2xl sm:text-3xl font-bold font-serif text-[#D4AF37]">
                    {formatTomans(d.totalAmount)}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                  <div className="flex justify-between text-gray-300">
                    <span>درصد دیه مصوب:</span>
                    <span className="font-bold">{diyehPercentage}٪</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>دیه ماه عادی:</span>
                    <span>{formatTomans(d.baseAmount)}</span>
                  </div>
                  {isSacredMonth && (
                    <div className="flex justify-between text-red-300 font-bold">
                      <span>تغلیظ ماه حرام (یک‌سوم اضافه):</span>
                      <span>+{formatTomans(d.sacredBonus)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-400 text-[11px] pt-1">
                    <span>مبنای دیه کامل سال ۱۴۰۳:</span>
                    <span>۱ میلیارد و ۲۰۰ میلیون تومان</span>
                  </div>
                </div>
              </div>
            );
          })()}

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-gray-300 leading-relaxed">
            💡 این برآورد به عنوان مستند پیوست دادخواست و لایحه دفاعیه قابل ارائه به شعبه دادگاه است.
          </div>
        </div>
      </div>
    </div>
  );
};
