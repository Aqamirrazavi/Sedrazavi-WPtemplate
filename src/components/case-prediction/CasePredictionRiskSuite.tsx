import React, { useState } from 'react';
import {
  Scale,
  TrendingUp,
  AlertTriangle,
  FileCheck,
  Award,
  Clock,
  Coins,
  ShieldCheck,
  ChevronRight,
  Printer,
  Download,
  Share2,
  HelpCircle,
  BarChart3,
  Flame,
  ArrowRight,
  Info,
  CheckCircle2,
  XCircle,
  FileText,
  Sliders,
  Sparkles,
  Layers,
  Building
} from 'lucide-react';

interface CaseEvaluationInput {
  caseTitle: string;
  clientRole: 'plaintiff' | 'defendant'; // خواهان یا خوانده
  caseCategory: 'real_estate' | 'commercial' | 'criminal' | 'family' | 'administrative' | 'goodwill';
  courtLevel: 'peace_council' | 'preliminary' | 'appeal' | 'supreme_court' | 'article_477';
  claimValueTomans: number;
  evidenceStrength: number; // 1 to 5
  evidenceTypes: {
    officialDeed: boolean;
    expertReport: boolean;
    writtenConfession: boolean;
    witnessTestimony: boolean;
    digitalEvidence: boolean;
    ordinaryDocument: boolean;
  };
  hasPrecedent: 'strong_favorable' | 'moderate' | 'contradictory' | 'unfavorable' | 'none';
  statuteOfLimitationsMet: boolean;
  jurisdictionCity: string;
}

export const CasePredictionRiskSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'risk_matrix' | 'case_passport' | 'methodology'>('calculator');

  // Case Input State
  const [input, setInput] = useState<CaseEvaluationInput>({
    caseTitle: 'دعوای الزام به تنظیم سند رسمی و تحویل مبیع با وجه التزام',
    clientRole: 'plaintiff',
    caseCategory: 'real_estate',
    courtLevel: 'preliminary',
    claimValueTomans: 4500000000, // ۴.۵ میلیارد تومان
    evidenceStrength: 4,
    evidenceTypes: {
      officialDeed: true,
      expertReport: true,
      writtenConfession: false,
      witnessTestimony: true,
      digitalEvidence: true,
      ordinaryDocument: true,
    },
    hasPrecedent: 'strong_favorable',
    statuteOfLimitationsMet: true,
    jurisdictionCity: 'تهران - مجتمع قضایی شهید بهشتی',
  });

  const [passportGenerated, setPassportGenerated] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Algorithm to calculate probability of winning
  const calculateWinProbability = () => {
    let score = 40; // Base score

    // Evidence contribution
    if (input.evidenceTypes.officialDeed) score += 20;
    if (input.evidenceTypes.writtenConfession) score += 18;
    if (input.evidenceTypes.expertReport) score += 12;
    if (input.evidenceTypes.digitalEvidence) score += 6;
    if (input.evidenceTypes.witnessTestimony) score += 5;
    if (input.evidenceTypes.ordinaryDocument && !input.evidenceTypes.officialDeed) score += 8;

    // Precedent alignment
    if (input.hasPrecedent === 'strong_favorable') score += 15;
    else if (input.hasPrecedent === 'moderate') score += 7;
    else if (input.hasPrecedent === 'contradictory') score -= 12;
    else if (input.hasPrecedent === 'unfavorable') score -= 25;

    // Statute of limitations
    if (!input.statuteOfLimitationsMet) score -= 35;

    // Court level adjustments
    if (input.courtLevel === 'supreme_court') score -= 10; // High rigor
    if (input.courtLevel === 'article_477') score -= 25; // Exceptional scrutiny

    // Client role bonus/penalty
    if (input.clientRole === 'plaintiff' && !input.evidenceTypes.officialDeed && !input.evidenceTypes.writtenConfession) {
      score -= 8; // Burden of proof on plaintiff
    }

    // Clamp between 8% and 94% (legal certainty is never 100% or 0%)
    return Math.min(94, Math.max(8, score));
  };

  const winProbability = calculateWinProbability();

  // Court fee estimate (هزینه دادرسی)
  const calculateCourtFee = () => {
    const val = input.claimValueTomans;
    if (input.courtLevel === 'peace_council') return Math.round(val * 0.035);
    if (input.courtLevel === 'preliminary') {
      if (val <= 20000000) return Math.round(val * 0.025);
      return Math.round(500000 + (val - 20000000) * 0.035);
    }
    if (input.courtLevel === 'appeal') return Math.round(val * 0.045);
    return Math.round(val * 0.055); // دیوان عالی
  };

  const courtFee = calculateCourtFee();
  const estimatedExpertFee = Math.min(65000000, Math.max(8000000, Math.round(input.claimValueTomans * 0.003)));
  const estimatedDurationMonths = input.courtLevel === 'preliminary' ? 8 : input.courtLevel === 'appeal' ? 6 : 14;
  const executionFee = Math.round(input.claimValueTomans * 0.05); // نیم‌عشر اجرایی ۵٪

  // Expected Value Calculation
  const expectedValue = Math.round((winProbability / 100) * input.claimValueTomans - courtFee - estimatedExpertFee);

  const getRiskLevelBadge = (prob: number) => {
    if (prob >= 75) {
      return {
        label: 'ریسک پایین - احتمال موفقیت ممتاز',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        badge: '🟢 پیروزی محتمل',
      };
    }
    if (prob >= 50) {
      return {
        label: 'ریسک متوسط - نیازمند تقویت ادله و لوایح تخصصی',
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        badge: '🟡 نیازمند دفاع راهبردی',
      };
    }
    return {
      label: 'ریسک بالا و بحرانی - احتمال شکست در دادرسی',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      badge: '🔴 هشدار ریسک قضایی',
    };
  };

  const riskBadge = getRiskLevelBadge(winProbability);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#070B19] text-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-l from-[#0B132B] via-[#0F1B3E] to-[#0B132B] border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -left-20 -top-20 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>فاز ۲۱: سامانه هوشمند ارزیابی شانس پیروزی و تحلیل ریسک دادرسی (AI Case Prediction)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight">
              محاسبه‌گر پیش‌بینی احتمال برد، ریسک مالی و هزینه‌فایده پرونده‌های دادگستری
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              محاسبه پیشرفته احتمال پیروزی بر اساس الگوریتم چندعاملی حقوقی، وضعیت مدارک اثباتی، آراء وحدت رویه، مراجع صالح قضایی و شبیه‌سازی مالی خسارات و هزینه‌های دادرسی دفتر وکالت دکتر سیده مریم رضوی.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-4 py-2.5 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-xs font-bold text-gray-200 transition-colors border border-gray-700"
              >
                بازگشت به سایت
              </button>
            )}
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#b5952f] text-[#070B19] text-xs font-black transition-colors shadow-lg shadow-[#D4AF37]/20"
              >
                پیشخوان وکیل
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'bg-[#D4AF37] text-[#070B19] shadow-lg shadow-[#D4AF37]/25'
                : 'bg-[#0B132B]/60 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>محاسبه‌گر احتمال پیروزی (AI Probability Engine)</span>
          </button>

          <button
            onClick={() => setActiveTab('risk_matrix')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'risk_matrix'
                ? 'bg-[#D4AF37] text-[#070B19] shadow-lg shadow-[#D4AF37]/25'
                : 'bg-[#0B132B]/60 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>ماتریس مالی، هزینه دادرسی و اطاله رسیدگی</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('case_passport');
              setPassportGenerated(true);
            }}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'case_passport'
                ? 'bg-[#D4AF37] text-[#070B19] shadow-lg shadow-[#D4AF37]/25'
                : 'bg-[#0B132B]/60 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>شناسنامه حقوقی ریسک پرونده (Case Risk Passport)</span>
          </button>

          <button
            onClick={() => setActiveTab('methodology')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'methodology'
                ? 'bg-[#D4AF37] text-[#070B19] shadow-lg shadow-[#D4AF37]/25'
                : 'bg-[#0B132B]/60 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>مبانی علمی و مواد قانونی ارزیابی ریسک</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left/Main Form: Inputs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#0B132B]/80 rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-[#D4AF37]" />
                    <span>مشخصات پرونده و ادله اثبات دعوی</span>
                  </h2>
                  <span className="text-xs text-gray-400">مبتنی بر قانون آیین دادرسی مدنی و کیفری</span>
                </div>

                {/* Case Title */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-2">عنوان خواسته یا اتهام دعوی:</label>
                  <input
                    type="text"
                    value={input.caseTitle}
                    onChange={(e) => setInput({ ...input, caseTitle: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#070B19] border border-gray-700 text-white text-xs focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>

                {/* Category & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">موضوع و شاخه تخصصی:</label>
                    <select
                      value={input.caseCategory}
                      onChange={(e) => setInput({ ...input, caseCategory: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-xl bg-[#070B19] border border-gray-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="real_estate">دعاوی ملکی، ثبتی و سرقفلی</option>
                      <option value="commercial">دعاوی بازرگانی، شرکت‌ها و اسناد تجاری</option>
                      <option value="criminal">جرایم اقتصادی، کلاهبرداری و سایبری</option>
                      <option value="family">خانواده، ارث، وصیت و تقسیم ترکه</option>
                      <option value="administrative">دیوان عدالت اداری و کمیسیون‌های شهرداری</option>
                      <option value="goodwill">روابط موجر و مستاجر، کسب و پیشه</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">جایگاه موکل در دادرسی:</label>
                    <select
                      value={input.clientRole}
                      onChange={(e) => setInput({ ...input, clientRole: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-xl bg-[#070B19] border border-gray-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="plaintiff">خواهان / شاکی (بار اثبات دعوی)</option>
                      <option value="defendant">خوانده / مشتکی‌عنه (دفاع و ایرادات شکلی)</option>
                    </select>
                  </div>
                </div>

                {/* Court Level & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">مرحله و مرجع دادرسی فعلی:</label>
                    <select
                      value={input.courtLevel}
                      onChange={(e) => setInput({ ...input, courtLevel: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-xl bg-[#070B19] border border-gray-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="peace_council">شورای حل اختلاف (تا ۱۰۰ میلیون تومان)</option>
                      <option value="preliminary">دادگاه عمومی حقوقی / کیفری ۲ (مرحله بدوی)</option>
                      <option value="appeal">دادگاه تجدیدنظر استان (مرحله قطعیت)</option>
                      <option value="supreme_court">دیوان عالی کشور (فرجام‌خواهی)</option>
                      <option value="article_477">اعاده دادرسی فوق‌العاده (ماده ۴۷۷ ق.آ.د.ک)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">ارزش خواسته / بهای دعوی (تومان):</label>
                    <input
                      type="number"
                      value={input.claimValueTomans}
                      onChange={(e) => setInput({ ...input, claimValueTomans: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-[#070B19] border border-gray-700 text-white text-xs font-mono focus:outline-none focus:border-[#D4AF37]"
                    />
                    <div className="text-[10px] text-gray-400 mt-1">
                      معادل: {(input.claimValueTomans / 10000000).toLocaleString('fa-IR')} میلیون تومان
                    </div>
                  </div>
                </div>

                {/* Evidence Checklist */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-bold text-gray-200">
                    ادله و مستندات موجود اثبات دعوی (ماده ۱۲۵۷ قانون مدنی به بعد):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-[#070B19] border border-gray-800 hover:border-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={input.evidenceTypes.officialDeed}
                        onChange={(e) =>
                          setInput({
                            ...input,
                            evidenceTypes: { ...input.evidenceTypes, officialDeed: e.target.checked },
                          })
                        }
                        className="rounded text-[#D4AF37] focus:ring-0"
                      />
                      <span className="text-xs text-gray-200">سند رسمی تک‌برگ / بنچاق معتبر</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-[#070B19] border border-gray-800 hover:border-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={input.evidenceTypes.writtenConfession}
                        onChange={(e) =>
                          setInput({
                            ...input,
                            evidenceTypes: { ...input.evidenceTypes, writtenConfession: e.target.checked },
                          })
                        }
                        className="rounded text-[#D4AF37] focus:ring-0"
                      />
                      <span className="text-xs text-gray-200">اقرار کتبی طرف دعوی / پاسخ به اظهارنامه</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-[#070B19] border border-gray-800 hover:border-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={input.evidenceTypes.expertReport}
                        onChange={(e) =>
                          setInput({
                            ...input,
                            evidenceTypes: { ...input.evidenceTypes, expertReport: e.target.checked },
                          })
                        }
                        className="rounded text-[#D4AF37] focus:ring-0"
                      />
                      <span className="text-xs text-gray-200">نظریه کارشناس رسمی دادگستری (تامین دلیل)</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-[#070B19] border border-gray-800 hover:border-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={input.evidenceTypes.digitalEvidence}
                        onChange={(e) =>
                          setInput({
                            ...input,
                            evidenceTypes: { ...input.evidenceTypes, digitalEvidence: e.target.checked },
                          })
                        }
                        className="rounded text-[#D4AF37] focus:ring-0"
                      />
                      <span className="text-xs text-gray-200">ادله الکترونیک معتبر (پیامک ثنا، لاگ بانکی)</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-[#070B19] border border-gray-800 hover:border-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={input.evidenceTypes.witnessTestimony}
                        onChange={(e) =>
                          setInput({
                            ...input,
                            evidenceTypes: { ...input.evidenceTypes, witnessTestimony: e.target.checked },
                          })
                        }
                        className="rounded text-[#D4AF37] focus:ring-0"
                      />
                      <span className="text-xs text-gray-200">شهادت شهود واجد شرایط شرعی و قانونی</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-[#070B19] border border-gray-800 hover:border-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={input.evidenceTypes.ordinaryDocument}
                        onChange={(e) =>
                          setInput({
                            ...input,
                            evidenceTypes: { ...input.evidenceTypes, ordinaryDocument: e.target.checked },
                          })
                        }
                        className="rounded text-[#D4AF37] focus:ring-0"
                      />
                      <span className="text-xs text-gray-200">مبایعه‌نامه عادی / فاکتور و رسید دستی</span>
                    </label>
                  </div>
                </div>

                {/* Precedents & Limitations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">رویه قضایی و آراء وحدت رویه:</label>
                    <select
                      value={input.hasPrecedent}
                      onChange={(e) => setInput({ ...input, hasPrecedent: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-xl bg-[#070B19] border border-gray-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="strong_favorable">رای وحدت رویه صریح به نفع موکل وجود دارد</option>
                      <option value="moderate">رویه غالب شعب تجدیدنظر همسو است</option>
                      <option value="contradictory">اختلاف شدید در آراء شعب وجود دارد</option>
                      <option value="unfavorable">رای وحدت رویه مخالف و قاطع صادر شده است</option>
                      <option value="none">رویه خاصی ثبت نشده است (موضوع نوظهور)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">مواعد قانونی و مرور زمان:</label>
                    <div className="flex items-center gap-4 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-200">
                        <input
                          type="radio"
                          name="limitations"
                          checked={input.statuteOfLimitationsMet}
                          onChange={() => setInput({ ...input, statuteOfLimitationsMet: true })}
                          className="text-[#D4AF37] focus:ring-0"
                        />
                        <span>مهلت کاملاً رعایت شده است</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-rose-300">
                        <input
                          type="radio"
                          name="limitations"
                          checked={!input.statuteOfLimitationsMet}
                          onChange={() => setInput({ ...input, statuteOfLimitationsMet: false })}
                          className="text-rose-500 focus:ring-0"
                        />
                        <span>مشمول انقضای مهلت / مرور زمان</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Real-time Analytics Gauge */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gradient-to-b from-[#0B132B] to-[#070B19] rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/30 shadow-2xl space-y-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#070B19] border border-gray-700 text-xs font-bold text-gray-300">
                  <BarChart3 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>برآورد شاخص برد در دادرسی (Predictive Score)</span>
                </div>

                {/* Big Circular Metric */}
                <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="#1C2541"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke={winProbability >= 70 ? '#10B981' : winProbability >= 45 ? '#D4AF37' : '#F43F5E'}
                      strokeWidth="8"
                      strokeDasharray={264}
                      strokeDashoffset={264 - (264 * winProbability) / 100}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-4xl sm:text-5xl font-black font-mono text-white">
                      {winProbability}٪
                    </span>
                    <span className="text-[11px] text-gray-400 font-bold mt-1">احتمال صدور رای له موکل</span>
                  </div>
                </div>

                {/* Risk Level Badge */}
                <div className={`p-4 rounded-2xl border text-xs font-bold ${riskBadge.color} space-y-1`}>
                  <div className="text-sm font-black">{riskBadge.badge}</div>
                  <div className="text-[11px] opacity-90">{riskBadge.label}</div>
                </div>

                {/* Key KPIs */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-right">
                  <div className="p-3.5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-1">
                    <span className="text-[10px] text-gray-400 block">هزینه دادرسی تمبر دادگاه:</span>
                    <span className="text-xs font-bold text-white font-mono">
                      {(courtFee / 1000000).toFixed(1)} میلیون تومان
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-1">
                    <span className="text-[10px] text-gray-400 block">تخمین اطاله دادرسی:</span>
                    <span className="text-xs font-bold text-[#D4AF37] font-mono">
                      {estimatedDurationMonths} ماه رسیدگی
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-1">
                    <span className="text-[10px] text-gray-400 block">هزینه کارشناسی ۳ نفره:</span>
                    <span className="text-xs font-bold text-gray-300 font-mono">
                      {(estimatedExpertFee / 1000000).toFixed(1)} میلیون تومان
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-1">
                    <span className="text-[10px] text-gray-400 block">ارزش عایدی تعدیل‌شده (EMV):</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono">
                      {(expectedValue / 10000000).toFixed(1)} م.ت
                    </span>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => {
                    setActiveTab('case_passport');
                    setPassportGenerated(true);
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#070B19] font-black text-xs shadow-lg shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/40 transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>صدور شناسنامه ارزیابی ریسک (Case Passport)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risk_matrix' && (
          <div className="space-y-6">
            <div className="bg-[#0B132B]/80 rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                    <span>ماتریس مالی، هزینه دادرسی و توجیه اقتصادی طرح دعوی</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    تحلیل نسبت ریسک به پاداش (Risk-Reward Ratio) و خسارات دادرسی طبق مواد ۵۱۹ به بعد ق.آ.د.م
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    خسارات قابل مطالبه در صورت پیروزی
                  </span>
                </div>
              </div>

              {/* Financial Matrix Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400">
                      <th className="pb-3 pr-4 font-bold">سرفصل مالی دادرسی</th>
                      <th className="pb-3 px-4 font-bold">فرمول و ماخذ قانونی</th>
                      <th className="pb-3 px-4 font-bold">مبلغ تخمینی (تومان)</th>
                      <th className="pb-3 px-4 font-bold">مسئول پرداخت اولیه</th>
                      <th className="pb-3 pl-4 font-bold">قابلیت استرداد از محکوم‌علیه</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 text-gray-200">
                    <tr>
                      <td className="py-4 pr-4 font-bold text-white flex items-center gap-2">
                        <Coins className="w-4 h-4 text-[#D4AF37]" />
                        <span>هزینه دادرسی و تمبر دادخواست</span>
                      </td>
                      <td className="py-4 px-4 text-gray-400">۳.۵٪ بهای خواسته در مرحله نخستین (بند ۱۲ ماده ۳ ق.و.م.د.د)</td>
                      <td className="py-4 px-4 font-mono font-bold text-[#D4AF37]">{courtFee.toLocaleString('fa-IR')}</td>
                      <td className="py-4 px-4">خواهان (موکل)</td>
                      <td className="py-4 pl-4 text-emerald-400 font-bold">بله (ماده ۵۱۹ ق.آ.د.م)</td>
                    </tr>

                    <tr>
                      <td className="py-4 pr-4 font-bold text-white flex items-center gap-2">
                        <Scale className="w-4 h-4 text-blue-400" />
                        <span>دستمزد کارشناس رسمی (۳ نفره)</span>
                      </td>
                      <td className="py-4 px-4 text-gray-400">تعرفه رسمی کانون کارشناسان رسمی دادگستری ۱۴۰۳</td>
                      <td className="py-4 px-4 font-mono font-bold">{estimatedExpertFee.toLocaleString('fa-IR')}</td>
                      <td className="py-4 px-4">متقاضی کارشناسی</td>
                      <td className="py-4 pl-4 text-emerald-400 font-bold">بله (طبق نظر دادگاه)</td>
                    </tr>

                    <tr>
                      <td className="py-4 pr-4 font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>خسارت احتمالی تامین خواسته / دستور موقت</span>
                      </td>
                      <td className="py-4 px-4 text-gray-400">۱۰٪ الی ۲۰٪ ارزش خواسته (ماده ۱۰۸ ق.آ.د.م)</td>
                      <td className="py-4 px-4 font-mono font-bold">{(input.claimValueTomans * 0.15).toLocaleString('fa-IR')}</td>
                      <td className="py-4 px-4">تودیع در صندوق دادگستری</td>
                      <td className="py-4 pl-4 text-amber-400 font-bold">پس از صدور حکم قطعی مسترد می‌شود</td>
                    </tr>

                    <tr>
                      <td className="py-4 pr-4 font-bold text-white flex items-center gap-2">
                        <Building className="w-4 h-4 text-purple-400" />
                        <span>نیم‌عشر اجرایی اجرای احکام مدنی</span>
                      </td>
                      <td className="py-4 px-4 text-gray-400">۵٪ مبلغ محکوم‌به (قانون اجرای احکام مدنی)</td>
                      <td className="py-4 px-4 font-mono font-bold text-purple-300">{executionFee.toLocaleString('fa-IR')}</td>
                      <td className="py-4 px-4">محکوم‌علیه (طرف بازنده)</td>
                      <td className="py-4 pl-4 text-gray-400">توسط دادورز از خوانده وصول می‌شود</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Strategic Insights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-2">
                  <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                    <Flame className="w-4 h-4" />
                    <span>توصیه اول: تامین خواسته فوری</span>
                  </span>
                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    با توجه به بالا بودن ارزش خواسته، توقیف اموال خوانده قبل از ابلاغ دادخواست (ماده ۱۱۷ ق.آ.د.م) جهت پیشگیری از انتقال مال به قصد فرار از دین قویاً توصیه می‌گردد.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-2">
                  <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>پیش‌بینی اطاله دادرسی</span>
                  </span>
                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    در صورت ارجاع به کارشناسی ۳ نفره و اعتراض طرف مقابل، حداقل ۴ ماه به مدت زمان فرآیند دادرسی اضافه خواهد شد.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>پیشنهاد صلح و سازش مشروط</span>
                  </span>
                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    در صورتی که خوانده حاضر به پرداخت ۸۵٪ از خواسته به صورت نقد در بازه ۳۰ روزه باشد، با احتساب تورم و زمان دادرسی، سازش دارای توجیه اقتصادی برتر است.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'case_passport' && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#0B132B]/80 border border-gray-800">
              <span className="text-xs text-gray-300 font-bold">
                شناسنامه الکترونیک ارزیابی ریسک پرونده با امضای دیجیتال و مهر وکیل
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyShare}
                  className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-200 transition-colors flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'کپی شد!' : 'اشتراک‌گذاری'}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="px-4 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#b5952f] text-[#070B19] text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-[#D4AF37]/20"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>چاپ شناسنامه رسمی</span>
                </button>
              </div>
            </div>

            {/* Official Legal Passport Container */}
            <div
              id="printable-case-passport"
              className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0B132B] via-[#0D1836] to-[#0B132B] border-2 border-[#D4AF37]/40 shadow-2xl text-white space-y-8 relative overflow-hidden"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

              {/* Passport Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-[#D4AF37]/30 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#D4AF37]/25">
                    ⚖️
                  </div>
                  <div>
                    <h3 className="text-xl font-black font-serif text-white">
                      دفتر وکالت و مشاوره حقوقی دکتر سیده مریم رضوی
                    </h3>
                    <span className="text-xs text-[#D4AF37] font-bold block">
                      وکیل پایه یک دادگستری و کانون وکلای مرکز (پروانه ۱۸۴۵۲)
                    </span>
                  </div>
                </div>

                <div className="text-left font-mono text-xs text-gray-300 space-y-1">
                  <div>شماره شناسنامه: SR-RISK-1403-984</div>
                  <div>تاریخ صدور: {new Date().toLocaleDateString('fa-IR')}</div>
                  <div className="text-[#D4AF37] font-bold">سطح محرمانگی: طبقه‌بندی شده وکیل و موکل</div>
                </div>
              </div>

              {/* Title Section */}
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
                  گزارش سنجش اعتبار، ریسک دادرسی و توجیه اقامه دعوی (Legal Feasibility Passport)
                </span>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-white pt-1">
                  {input.caseTitle}
                </h2>
              </div>

              {/* Grid Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#070B19]/80 border border-gray-800 text-xs">
                <div>
                  <span className="text-gray-400 block mb-1">نقش موکل:</span>
                  <span className="font-bold text-white">
                    {input.clientRole === 'plaintiff' ? 'خواهان (شاکی)' : 'خوانده (مشتکی‌عنه)'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">مرجع صالح:</span>
                  <span className="font-bold text-[#D4AF37]">
                    {input.courtLevel === 'preliminary'
                      ? 'دادگاه عمومی حقوقی بدوی'
                      : input.courtLevel === 'appeal'
                      ? 'دادگاه تجدیدنظر استان'
                      : 'دیوان عالی کشور'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">بهای خواسته:</span>
                  <span className="font-bold text-emerald-400 font-mono">
                    {(input.claimValueTomans / 10000000).toLocaleString('fa-IR')} میلیون تومان
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">شاخص پیش‌بینی برد:</span>
                  <span className="font-bold text-xl text-white font-mono">{winProbability}٪</span>
                </div>
              </div>

              {/* Analysis Matrix Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="p-5 rounded-2xl bg-[#070B19]/60 border border-gray-800 space-y-3">
                  <h4 className="font-bold text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>نقاط قوت مستندات و ادله اثباتی</span>
                  </h4>
                  <ul className="space-y-2 text-gray-300 list-disc pr-4">
                    {input.evidenceTypes.officialDeed && (
                      <li>دارای سند رسمی لازم‌الاجرا منطبق با مواد ۲۲، ۴۶ و ۷۳ قانون ثبت اسناد و املاک.</li>
                    )}
                    {input.evidenceTypes.expertReport && (
                      <li>تامین دلیل کارشناسی قبل از اقامه دعوی انجام پذیرفته و وضعیت مبیع مستند شده است.</li>
                    )}
                    {input.hasPrecedent === 'strong_favorable' && (
                      <li>آرای متعدد هیات عمومی دیوان عالی کشور در موارد مشابه به نفع متقاضی است.</li>
                    )}
                    <li>مواعد قانونی ماده ۳۳۶ و مرور زمان دعاوی به دقت محاسبه و لحاظ گردیده است.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#070B19]/60 border border-gray-800 space-y-3">
                  <h4 className="font-bold text-rose-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>مخاطرات احتمالی و دفاعیات طرف مقابل</span>
                  </h4>
                  <ul className="space-y-2 text-gray-300 list-disc pr-4">
                    <li>احتمال ادعای جعل، انکار یا تردید نسبت به مستندات عادی توسط خوانده.</li>
                    <li>احتمال اطاله دادرسی ناشی از عدم حضور شهود یا لزوم صدور قرار اناطه حقوقی.</li>
                    <li>ضرورت تودیع خسارت احتمالی در صورت تقاضای دستور موقت بر اساس ماده ۳۱۸ ق.آ.د.م.</li>
                  </ul>
                </div>
              </div>

              {/* Lawyer Digital Stamp Footer */}
              <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="text-gray-400 space-y-1 text-center sm:text-right">
                  <div>تاییدیه حقوقی دکتر سیده مریم رضوی - شناسه اعتبارسنجی: 0x9B84E3A2</div>
                  <div className="text-[10px]">
                    این شناسنامه بر اساس مفروضات و اسناد ارائه‌شده تدوین گردیده و متضمن تعهد به نتیجه نمی‌باشد.
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#070B19] border border-[#D4AF37]/30">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold">
                    🔏
                  </div>
                  <div>
                    <span className="block font-bold text-white text-[11px]">مهر دیجیتال دفتر وکالت</span>
                    <span className="block text-[10px] text-emerald-400">امضا و تایید رسمی شد</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'methodology' && (
          <div className="bg-[#0B132B]/80 rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#D4AF37]" />
              <span>اصول علمی، فقهی و قانونی ارزیابی ریسک در دادرسی</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-300 leading-relaxed">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#070B19] border border-gray-800 space-y-2">
                  <h3 className="font-bold text-[#D4AF37]">۱. اصل سلسله‌مراتب ارزش اثباتی ادله (Hierarchy of Proof)</h3>
                  <p>
                    طبق ماده ۱۲۵۸ قانون مدنی، دلایل اثبات دعوی به ترتیب اولویت شامل اقرار، اسناد کتبی رسمی، شهادت، امارات قضایی و قسم است. هر اندازه وزن ادله به سمت سند رسمی و اقرار تمایل پیدا کند، ضریب قطعیت دادرسی افزایش می‌یابد.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#070B19] border border-gray-800 space-y-2">
                  <h3 className="font-bold text-[#D4AF37]">۲. قاعده البینة علی المدعی و الیمین علی من انکر</h3>
                  <p>
                    بار اثبات دعوی (Burden of Proof) در دعاوی مدنی بر دوش خواهان قرار دارد. بنابراین خوانده با اتکا به اصل برائت (ماده ۱۹۷ ق.آ.د.م) و طرح ایرادات شکلی ماده ۸۴ می‌تواند ریسک شکست خواهان را تا ۴۰٪ افزایش دهد.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#070B19] border border-gray-800 space-y-2">
                  <h3 className="font-bold text-[#D4AF37]">۳. شاخص‌های وحدت رویه و ثبات آراء قضایی</h3>
                  <p>
                    طبق اصل ۱۶۱ قانون اساسی و ماده ۴۷۱ قانون آیین دادرسی کیفری، آراء وحدت رویه هیات عمومی دیوان عالی کشور برای کلیه شعب دادگاه‌ها لازم‌الاتباع است. در صورت وجود رای وحدت رویه مخالف، شانس موفقیت عملاً زیر ۱۰٪ نزول می‌کند.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#070B19] border border-gray-800 space-y-2">
                  <h3 className="font-bold text-[#D4AF37]">۴. ارزش پولی مورد انتظار (EMV - Expected Monetary Value)</h3>
                  <p>
                    در مدیریت مالی حقوقی، طرح دعوی تنها در صورتی توجیه‌پذیر است که حاصل‌ضرب احتمال پیروزی در مبلغ خواسته منهای کل هزینه‌های دادرسی، کارشناسی و حق‌الوکاله عددی مثبت و بالاتر از نرخ تورم و سود سپرده بانکی باشد.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
