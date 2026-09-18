import React, { useState } from 'react';
import {
  AlertOctagon,
  Scale,
  Gavel,
  ShieldAlert,
  Search,
  CheckCircle2,
  Copy,
  Check,
  PhoneCall,
  FileSpreadsheet,
  Clock,
  ArrowRight
} from 'lucide-react';
import { CYBERCRIME_PENALTY_RULES } from '../../data/mockData';
import { CybercrimePenaltyRule } from '../../types/theme';

interface CybercrimeDefenseAdvisorProps {
  onOpenBooking?: () => void;
}

export const CybercrimeDefenseAdvisor: React.FC<CybercrimeDefenseAdvisorProps> = ({ onOpenBooking }) => {
  const [selectedRule, setSelectedRule] = useState<CybercrimePenaltyRule>(CYBERCRIME_PENALTY_RULES[0]);
  const [copiedIndex, setCopiedIndex] = useState<boolean>(false);

  // Financial Loss Calculator in Phishing / Crypto Frauds
  const [lossAmountToman, setLossAmountToman] = useState<number>(150000000); // 150 Million Tomans
  const [delayMonths, setDelayMonths] = useState<number>(6); // 6 Months delay

  // Central Bank Index Rate (roughly 3.5% per month interest/inflation formula in Iranian courts)
  const calculatedCompensation = Math.round(lossAmountToman * (1 + (delayMonths * 0.035)));
  const delayCompensationAmount = calculatedCompensation - lossAmountToman;

  const handleCopyLegalAdvice = () => {
    const text = `لایحه دفاعیه و مشاوره جرم رایانه‌ای:
عنوان: ${selectedRule.crimeTitle}
مستند قانونی: ${selectedRule.articleReference}
مجازات حبس: ${selectedRule.prisonSentence}
جزای نقدی: ${selectedRule.monetaryFine}
رد مال: ${selectedRule.civilCompensation}
راهبرد وکیل مدافع: ${selectedRule.lawyerDefenseAdvice}`;

    navigator.clipboard.writeText(text);
    setCopiedIndex(true);
    setTimeout(() => setCopiedIndex(false), 2000);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#0B132B] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 font-semibold mb-1">
              <AlertOctagon className="w-4 h-4" />
              <span>دادسراهای تخصصی ناحیه ۳۱ (جرایم رایانه‌ای) و پلیس فتا ناجا</span>
            </div>
            <h2 className="text-xl font-bold font-serif text-[#0B132B] dark:text-white">
              مشاور هوشمند مجازات‌ها، لایحه دفاعیه و رد مال جرایم رایانه‌ای
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              تحلیل ارکان قانونی، مادی و معنوی جرایم سایبری، محاسبه خسارت تأخیر تأدیه و اقدامات ضربتی توقیف حساب
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>درخواست اعلام وکالت در دادسرای فتا</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Crime Types Selection (Left 4 Cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-bold text-gray-400 block px-1">عناوین کیفری مصرح در قانون:</span>
          {CYBERCRIME_PENALTY_RULES.map((rule) => {
            const isSelected = selectedRule.id === rule.id;
            return (
              <div
                key={rule.id}
                onClick={() => setSelectedRule(rule)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-right space-y-1.5 ${
                  isSelected
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 shadow-sm'
                    : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0B132B] hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0B132B] dark:text-white">
                    {rule.crimeTitle}
                  </span>
                  <Gavel className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D4AF37]' : 'text-gray-400'}`} />
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">
                  {rule.articleReference}
                </p>
              </div>
            );
          })}

          {/* Calculator Card for Damages / Delayed Payment (خسارت تاخیر تادیه) */}
          <div className="mt-6 bg-white dark:bg-[#0B132B] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[#0B132B] dark:text-white flex items-center gap-1.5 font-serif">
              <FileSpreadsheet className="w-4 h-4 text-[#D4AF37]" />
              محاسبه‌گر رد مال و خسارت تأخیر تأدیه بانکی
            </h4>

            <div>
              <label className="block text-[10px] text-gray-400 mb-1">
                مبلغ اصل مال برده‌شده یا کلاهبرداری (تومان):
              </label>
              <input
                type="number"
                step="1000000"
                value={lossAmountToman}
                onChange={(e) => setLossAmountToman(Number(e.target.value))}
                className="w-full text-xs p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[#0B132B] dark:text-white font-mono text-left outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-gray-400 mb-1">
                مدت زمان سپری‌شده تا صدور حکم قطعی (ماه):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="36"
                  value={delayMonths}
                  onChange={(e) => setDelayMonths(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
                <span className="text-xs font-bold font-mono text-[#D4AF37] w-12 text-center">
                  {delayMonths} ماه
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">اصل مال مورد کلاهبرداری:</span>
                <span className="font-bold font-mono text-[#0B132B] dark:text-white">
                  {lossAmountToman.toLocaleString('fa-IR')} ت
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">خسارت تأخیر بر مبنای شاخص بانک مرکزی:</span>
                <span className="font-bold font-mono text-amber-600 dark:text-amber-400">
                  +{delayCompensationAmount.toLocaleString('fa-IR')} ت
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-amber-200 dark:border-amber-700 font-bold">
                <span className="text-[#0B132B] dark:text-white">مجموع مطالبه در دادخواست رد مال:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">
                  {calculatedCompensation.toLocaleString('fa-IR')} تومان
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Breakdown & Defensive Strategy (Right 8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white dark:bg-[#0B132B] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-5">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                  {selectedRule.crimeTitle}
                </h3>
                <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-1 block">
                  {selectedRule.articleReference}
                </span>
              </div>

              <button
                onClick={handleCopyLegalAdvice}
                className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedIndex ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex ? 'لایحه کپی شد' : 'کپی لایحه دفاعیه'}</span>
              </button>
            </div>

            {/* Statutory Punishments 3-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/50 space-y-1">
                <span className="text-[10px] text-rose-700 dark:text-rose-300 font-bold block">
                  مجازات حبس تعزیری:
                </span>
                <span className="text-xs font-bold text-rose-900 dark:text-rose-200">
                  {selectedRule.prisonSentence}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 space-y-1">
                <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold block">
                  جزای نقدی صندوق دولت:
                </span>
                <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
                  {selectedRule.monetaryFine}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 space-y-1">
                <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold block">
                  رد مال و جبران حقوقی:
                </span>
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  {selectedRule.civilCompensation}
                </span>
              </div>
            </div>

            {/* Immediate Investigative Roadmap */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-[#0B132B] dark:text-white flex items-center gap-1.5 font-serif">
                <ShieldAlert className="w-4 h-4 text-[#D4AF37]" />
                مراحل تحقیقات مقدماتی و اقدامات ضربتی در دادسرا و فتا:
              </h4>

              <div className="space-y-2">
                {selectedRule.investigativeSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 flex items-start gap-2.5 text-xs text-gray-700 dark:text-gray-300"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-mono">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Advice by Attorney */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/40 space-y-2">
              <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold font-serif">
                <Scale className="w-4 h-4" />
                <span>رهنمود کلیدی دکتر سیده مریم رضوی (وکیل متخصص سایبری):</span>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-sans">
                {selectedRule.lawyerDefenseAdvice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
