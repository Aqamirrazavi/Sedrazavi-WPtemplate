import React, { useState } from 'react';
import {
  Gavel,
  Globe2,
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Calculator,
  BookOpen,
  Sparkles,
  HelpCircle,
  FileText,
  DollarSign,
  ChevronDown,
} from 'lucide-react';
import { ARBITRATION_INSTITUTIONS_DATA } from '../../data/mockData';
import { ArbitrationInstitution } from '../../types/theme';

export const InternationalArbitrationClinic: React.FC = () => {
  const [selectedInstId, setSelectedInstId] = useState<string>('icc-paris');
  const [arbitratorsCount, setArbitratorsCount] = useState<'1' | '3'>('3');
  const [seatOfArbitration, setSeatOfArbitration] = useState<string>('ژنو، سوئیس (Geneva, Switzerland)');
  const [governingLaw, setGoverningLaw] = useState<string>('حقوق بازرگانی بین‌المللی و قانون سوئیس');
  const [arbitrationLanguage, setArbitrationLanguage] = useState<string>('انگلیسی');
  const [claimAmountUSD, setClaimAmountUSD] = useState<number>(500000); // ۵۰۰ هزار دلار
  const [copiedClauseEn, setCopiedClauseEn] = useState<boolean>(false);
  const [copiedClauseFa, setCopiedClauseFa] = useState<boolean>(false);

  const selectedInst: ArbitrationInstitution =
    ARBITRATION_INSTITUTIONS_DATA.find((i) => i.id === selectedInstId) ||
    ARBITRATION_INSTITUTIONS_DATA[0];

  // محاسبه تقریبی هزینه‌های داوری بر اساس ارزش خواسته (به دلار)
  // فرمول استاندارد تقریب پلکانی ICC vs ACIC
  const isACIC = selectedInst.id === 'acic-tehran';
  const adminFeeUSD = isACIC
    ? Math.max(1500, Math.round(claimAmountUSD * 0.015)) // ۱.۵ درصد با کف ۱۵۰۰ دلار
    : Math.max(5000, Math.round(claimAmountUSD * 0.035)); // ۳.۵ درصد ICC با کف ۵۰۰۰ دلار

  const arbitratorBaseFee = isACIC
    ? Math.max(3000, Math.round(claimAmountUSD * 0.04))
    : Math.max(12000, Math.round(claimAmountUSD * 0.08));

  const totalArbitratorsFee = arbitratorsCount === '3' ? arbitratorBaseFee * 2.5 : arbitratorBaseFee;
  const totalEstimatedCostUSD = adminFeeUSD + totalArbitratorsFee;

  // شروط داوری سفارشی دوزبانه
  const customizedClauseEn = `All disputes, controversies or claims arising out of or in connection with this contract, including its formation, validity, breach or termination, shall be finally settled under the Rules of ${
    selectedInst.nameEn
  } by ${
    arbitratorsCount === '3' ? 'three arbitrators' : 'a sole arbitrator'
  } appointed in accordance with the said Rules.
- The Seat of Arbitration shall be: ${seatOfArbitration}.
- The Governing Substantive Law of the Contract shall be: ${governingLaw}.
- The Language of the Arbitration proceedings shall be: ${arbitrationLanguage}.
The arbitral award shall be final, binding and enforceable under the 1958 New York Convention.`;

  const customizedClauseFa = `کلیه اختلافات، مناقشات یا ادعاهای ناشی از این قرارداد یا در ارتباط با آن، از جمله انعقاد، اعتبار، نقض، فسخ یا بطلان آن، بر اساس قواعد داوری ${
    selectedInst.nameFa
  } توسط ${
    arbitratorsCount === '3' ? 'هیئت داوری سه‌نفره' : 'داور منفرد'
  } منصوب طبق قواعد مذکور به‌طور قطعی حل‌وفصل خواهد شد.
- مقر داوری (Seat): ${seatOfArbitration} خواهد بود.
- قانون حاکم ماهوی بر قرارداد: ${governingLaw} خواهد بود.
- زبان دادرسی داوری: ${arbitrationLanguage} خواهد بود.
رأی داوری قطعی، لازم‌الاجرا و مشمول شناسایی و اجرا طبق کنوانسیون ۱۹۵۸ نیویورک می‌باشد.`;

  const handleCopy = (text: string, type: 'en' | 'fa') => {
    navigator.clipboard.writeText(text);
    if (type === 'en') {
      setCopiedClauseEn(true);
      setTimeout(() => setCopiedClauseEn(false), 2500);
    } else {
      setCopiedClauseFa(true);
      setTimeout(() => setCopiedClauseFa(false), 2500);
    }
  };

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100">
      {/* هدر بخش داوری بین‌المللی */}
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800/80 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                <Gavel className="w-5 h-5" />
              </span>
              <h3 className="text-lg sm:text-xl font-black font-serif text-slate-900 dark:text-white">
                کلینیک داوری تجاری بین‌المللی و اجرای آراء خارجی (نیویورک ۱۹۵۸)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              طراحی شروط داوری آسیب‌ناپذیر تحت نظارت مستقیم دکتر سیده مریم رضوی (دکتری حقوق بین‌الملل) و پایش معیارهای ابطال‌ناپذیری آراء داوری.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-2xl text-emerald-600 dark:text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>انطباق کامل با کنوانسیون ۱۹۵۸ نیویورک در بیش از ۱۷۰ کشور</span>
          </div>
        </div>

        {/* فیلتر انتخاب دیوان داوری */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ARBITRATION_INSTITUTIONS_DATA.map((inst) => {
            const isSelected = inst.id === selectedInstId;
            return (
              <button
                key={inst.id}
                type="button"
                onClick={() => setSelectedInstId(inst.id)}
                className={`p-5 rounded-2xl border text-right transition-all flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#0B132B] dark:bg-white text-white dark:text-[#0B132B] border-[#D4AF37] shadow-lg scale-[1.02]'
                    : 'bg-slate-50 dark:bg-[#070D1E] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <span className="font-mono text-xs font-black block opacity-80">{inst.headquarters}</span>
                  <h4 className="font-bold text-sm leading-snug">{inst.nameFa}</h4>
                  <span className="text-[11px] font-mono opacity-70 block">{inst.nameEn}</span>
                </div>
                <div className="text-[11px] font-bold flex items-center justify-between border-t border-current/10 pt-2">
                  <span>میانگین زمان صدور رأی:</span>
                  <span className="font-mono">{inst.avgDurationMonths} ماه</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* سفارشی‌سازی ارکان شرط داوری */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 space-y-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-[#D4AF37]" />
            پیکربندی ارکان شرط داوری بین‌المللی (Arbitration Clause Builder)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-500 block">تعداد داوران:</label>
              <select
                value={arbitratorsCount}
                onChange={(e) => setArbitratorsCount(e.target.value as '1' | '3')}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-bold"
              >
                <option value="3">هیئت داوری سه‌نفره (مناسب دعاوی تجاری عمده)</option>
                <option value="1">داور منفرد (کاهش هزینه‌ها و تسریع رسیدگی)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-500 block">مقر داوری (Seat of Arbitration):</label>
              <select
                value={seatOfArbitration}
                onChange={(e) => setSeatOfArbitration(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-bold"
              >
                <option value="ژنو، سوئیس (Geneva, Switzerland)">ژنو، سوئیس (بی‌طرف‌ترین مقر جهان)</option>
                <option value="پاریس، فرانسه (Paris, France)">پاریس، فرانسه (مقر دیوان ICC)</option>
                <option value="لندن، انگلستان (London, UK)">لندن، انگلستان (نظام کامن‌لا)</option>
                <option value="تهران، ایران (Tehran, Iran)">تهران، ایران (مرکز داوری اتاق ACIC)</option>
                <option value="مسقط، عمان (Muscat, Oman)">مسقط، عمان (منطقه خاورمیانه)</option>
                <option value="دبی، امارات (Dubai - DIAC)">دبی، امارات (مرکز مالی DIFC)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-500 block">قانون حاکم ماهوی (Governing Law):</label>
              <select
                value={governingLaw}
                onChange={(e) => setGoverningLaw(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-bold"
              >
                <option value="حقوق بازرگانی بین‌المللی و قانون سوئیس">حقوق بازرگانی بین‌المللی و سوئیس</option>
                <option value="قانون مدنی و تجارت جمهوری اسلامی ایران">قانون تجارت و مدنی ایران</option>
                <option value="قوانین انگلستان و ولز (English Law)">حقوق انگلستان (English Law)</option>
                <option value="اصول قراردادهای بازرگانی بین‌المللی یونیدروآ (UNIDROIT)">اصول یونیدروآ (UNIDROIT)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-500 block">زبان رسمی دادرسی داوری:</label>
              <select
                value={arbitrationLanguage}
                onChange={(e) => setArbitrationLanguage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-bold"
              >
                <option value="انگلیسی">انگلیسی (English)</option>
                <option value="فارسی">فارسی (Persian)</option>
                <option value="فرانسوی">فرانسوی (French)</option>
                <option value="فارسی و انگلیسی (دوزبانه)">دوزبانه (فارسی و انگلیسی)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* دو بخش: ژنراتور شرط دوزبانه + ماشین حساب مالی داوری */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ستون متن شرط دوزبانه */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <FileText className="w-5 h-5 text-indigo-500" />
              شرط استاندارد داوری آماده درج در قرارداد (دوزبانه)
            </h4>

            {/* نسخه انگلیسی */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-slate-500">English Standard Clause:</span>
                <button
                  type="button"
                  onClick={() => handleCopy(customizedClauseEn, 'en')}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {copiedClauseEn ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy English Clause
                    </>
                  )}
                </button>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 text-xs font-mono leading-relaxed text-slate-700 dark:text-slate-200 select-all" dir="ltr">
                {customizedClauseEn}
              </div>
            </div>

            {/* نسخه فارسی */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-500">متن فارسی شرط داوری:</span>
                <button
                  type="button"
                  onClick={() => handleCopy(customizedClauseFa, 'fa')}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {copiedClauseFa ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" /> کپی شد
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> کپی متن فارسی
                    </>
                  )}
                </button>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 text-xs font-mono leading-relaxed text-slate-700 dark:text-slate-200 select-all whitespace-pre-line">
                {customizedClauseFa}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-[#D4AF37] space-y-1">
              <span className="font-bold block flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                توصیه تجربی دکتر سیده مریم رضوی:
              </span>
              <p className="leading-relaxed">
                {selectedInst.expertTips}
              </p>
            </div>
          </div>
        </div>

        {/* ستون ماشین حساب هزینه‌های دیوان داوری */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Calculator className="w-5 h-5 text-emerald-500" />
              تخمین هزینه‌های دیوان داوری (Arbitration Costs)
            </h4>

            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-500 block">ارزش خواسته دعوا (دلار آمریکا):</label>
              <input
                type="number"
                min="10000"
                step="50000"
                value={claimAmountUSD}
                onChange={(e) => setClaimAmountUSD(Math.max(5000, parseInt(e.target.value) || 0))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070D1E] font-mono font-bold text-sm"
              />
              <span className="text-[10px] text-slate-400 block">
                معادل تقریبی: {(claimAmountUSD * 60000).toLocaleString('fa-IR')} تومان (نرخ تقریبی ارز)
              </span>
            </div>

            {/* تفکیک هزینه‌ها */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">هزینه‌های ثبت و اداره دیوان:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  ${adminFeeUSD.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">
                  حق‌الزحمه هیئت داوری ({arbitratorsCount === '3' ? '۳ داور' : 'داور منفرد'}):
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  ${totalArbitratorsFee.toLocaleString()}
                </span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex items-center justify-between font-bold text-sm">
                <span className="text-indigo-600 dark:text-indigo-400">مجموع برآورد هزینه رسیدگی:</span>
                <span className="font-mono text-emerald-500 font-black">
                  ${totalEstimatedCostUSD.toLocaleString()}
                </span>
              </div>
            </div>

            {/* چک‌لیست شرایط اجرای رأی خارجی طبق کنوانسیون ۱۹۵۸ نیویورک */}
            <div className="space-y-2 pt-2 text-xs">
              <span className="font-bold text-slate-600 dark:text-slate-300 block">
                ارزیابی قابلیت اجرای بین‌المللی رأی:
              </span>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>اعتبار موافقت‌نامه کتبی داوری با امضای صاحبان امضای مجاز</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>عدم مغایرت مفاد رأی با نظم عمومی و اخلاق حسنه کشور محل اجرا (ماده ۵ کنوانسیون)</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>رعایت اصل تناظر و اعطای فرصت کامل دفاع به طرفین در طول دادرسی</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
