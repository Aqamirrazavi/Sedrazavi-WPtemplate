import React, { useState } from 'react';
import {
  Globe,
  Gavel,
  ShieldCheck,
  FileCheck,
  Building,
  Coins,
  Scale,
  Sparkles,
  AlertTriangle,
  ChevronRight,
  Download,
  Printer,
  Layers,
  HelpCircle,
  FileText,
  Clock,
  Compass,
  CheckCircle2,
  XCircle,
  Award
} from 'lucide-react';

export const InternationalArbitrationSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const [activeTab, setActiveTab] = useState<'arbitration_centers' | 'enforcement_checklist' | 'fee_calculator' | 'annulment_grounds'>('arbitration_centers');

  // Arbitration Fee Calculator Inputs
  const [disputeAmountUSD, setDisputeAmountUSD] = useState(500000); // ۵۰۰ هزار دلار
  const [arbitrationInstitution, setArbitrationInstitution] = useState<'icc' | 'acic' | 'uncitral'>('icc');
  const [tribunalSize, setTribunalSize] = useState<1 | 3>(3);

  // Fee calculation estimation
  const calculateFees = () => {
    let adminFee = 0;
    let arbitratorFeePerPerson = 0;

    if (arbitrationInstitution === 'icc') {
      adminFee = Math.round(5000 + disputeAmountUSD * 0.012);
      arbitratorFeePerPerson = Math.round(15000 + disputeAmountUSD * 0.03);
    } else if (arbitrationInstitution === 'acic') {
      adminFee = Math.round(2000 + disputeAmountUSD * 0.006);
      arbitratorFeePerPerson = Math.round(6000 + disputeAmountUSD * 0.015);
    } else {
      // UNCITRAL ad-hoc
      adminFee = 1500;
      arbitratorFeePerPerson = Math.round(10000 + disputeAmountUSD * 0.02);
    }

    const totalArbitratorsFee = arbitratorFeePerPerson * tribunalSize;
    return {
      adminFee,
      arbitratorFeePerPerson,
      totalArbitratorsFee,
      totalEstimatedCost: adminFee + totalArbitratorsFee,
    };
  };

  const fees = calculateFees();

  return (
    <div className="min-h-screen bg-[#070B19] text-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-l from-[#0B132B] via-[#0F1B3E] to-[#0B132B] border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -left-20 -top-20 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
              <Globe className="w-3.5 h-3.5" />
              <span>فاز ۲۳: پرتال داوری تجاری بین‌المللی و اجرای احکام خارجی (International Arbitration & Enforcement)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight">
              سامانه داوری اتاق بازرگانی بین‌المللی (ICC)، آنسیترال و کنوانسیون نیویورک ۱۹۵۸
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              خدمات تخصصی وکالت در داوری‌های سازمانی و موردی، شناسایی و اجرای احکام دادگاه‌های خارجی و آرای داوری در محاکم دادگستری ایران تحت نظارت دکتر سیده مریم رضوی.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-4 py-2.5 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-xs font-bold text-gray-200 transition-colors border border-gray-700"
              >
                صفحه نخست
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

        {/* Tab Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('arbitration_centers')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'arbitration_centers'
                ? 'bg-[#D4AF37] text-[#070B19] shadow-lg shadow-[#D4AF37]/25'
                : 'bg-[#0B132B]/60 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>نهادهای معتبر داوری (ICC, ACIC, LCIA, UNCITRAL)</span>
          </button>

          <button
            onClick={() => setActiveTab('enforcement_checklist')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'enforcement_checklist'
                ? 'bg-[#D4AF37] text-[#070B19] shadow-lg shadow-[#D4AF37]/25'
                : 'bg-[#0B132B]/60 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>اجرای احکام در ایران (کنوانسیون نیویورک ۱۹۵۸)</span>
          </button>

          <button
            onClick={() => setActiveTab('fee_calculator')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'fee_calculator'
                ? 'bg-[#D4AF37] text-[#070B19] shadow-lg shadow-[#D4AF37]/25'
                : 'bg-[#0B132B]/60 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>شبیه‌ساز هزینه‌ها و تعرفه داوری بین‌المللی</span>
          </button>

          <button
            onClick={() => setActiveTab('annulment_grounds')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'annulment_grounds'
                ? 'bg-[#D4AF37] text-[#070B19] shadow-lg shadow-[#D4AF37]/25'
                : 'bg-[#0B132B]/60 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>ابطال رأی داور و اصل ۱۳۹ قانون اساسی</span>
          </button>
        </div>
      </div>

      {/* Main Tab Area */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'arbitration_centers' && (
          <div className="space-y-6">
            <div className="bg-[#0B132B]/80 rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-xl space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 pb-4 border-b border-gray-800">
                <Globe className="w-5 h-5 text-[#D4AF37]" />
                <span>نهادهای شاخص داوری تجاری و قواعد رسیدگی به اختلافات بازرگانی بین‌الملل</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-bold">
                      ICC (پاریس)
                    </span>
                    <span className="text-xs text-gray-400">اتاق بازرگانی بین‌المللی</span>
                  </div>
                  <h3 className="font-bold text-white text-sm">دیوان داوری بین‌المللی ICC</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    معتبرترین و پرکاربردترین نهاد داوری تجاری جهان. دارای سیستم نظارت بر پیش‌نویس رای (Scrutiny of Awards) توسط دیوان قبل از امضای نهایی که ریسک ابطال را به حداقل می‌رساند.
                  </p>
                  <div className="text-[11px] text-[#D4AF37] font-bold">
                    مقر اصلی: پاریس، فرانسه
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                      ACIC (تهران)
                    </span>
                    <span className="text-xs text-gray-400">مرکز داوری اتاق ایران</span>
                  </div>
                  <h3 className="font-bold text-white text-sm">مرکز داوری اتاق بازرگانی ایران</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    تاسیس شده بر اساس قانون مصوب ۱۳۸۰ مجلس. مناسب قراردادهای بین‌المللی شرکت‌های ایرانی با طرف‌های خارجی با هزینه‌های ارزی/ریالی بسیار متعادل‌تر نسبت به مراکز اروپایی.
                  </p>
                  <div className="text-[11px] text-emerald-400 font-bold">
                    مقر اصلی: تهران، خیابان طالقانی
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-400 text-xs font-bold">
                      UNCITRAL Rules
                    </span>
                    <span className="text-xs text-gray-400">سازمان ملل متحد</span>
                  </div>
                  <h3 className="font-bold text-white text-sm">قواعد داوری موردی آنسیترال</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    قواعد داوری موردی (Ad-Hoc) بدون نیاز به پرداخت هزینه‌های ثبت نهادی. انعطاف‌پذیری فوق‌العاده در انتخاب داوران، زبان، محل و قانون حاکم بر ماهیت دعوی.
                  </p>
                  <div className="text-[11px] text-purple-300 font-bold">
                    استاندارد جهانی کمیسیون حقوق تجارت بین‌الملل سازمان ملل
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'enforcement_checklist' && (
          <div className="space-y-6">
            <div className="bg-[#0B132B]/80 rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#D4AF37]" />
                  <span>چک‌لیست حقوقی شناسایی و اجرای آرای داوری خارجی در ایران (کنوانسیون نیویورک ۱۹۵۸)</span>
                </h2>
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold">
                  الحاق ایران در سال ۱۳۸۰
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-300 leading-relaxed">
                <div className="p-5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-3">
                  <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>مدارک لازم جهت ارائه به دادگاه عمومی حقوقی تهران</span>
                  </h3>
                  <ul className="space-y-2 list-disc pr-4">
                    <li>اصل رای داوری یا رونوشت مصدق آن که به تایید کنسولگری ایران در کشور مبدا رسیده باشد.</li>
                    <li>اصل موافقت‌نامه داوری (Arbitration Agreement) یا قرارداد متضمن شرط داوری.</li>
                    <li>ترجمه رسمی رای داوری به زبان فارسی توسط مترجم رسمی دادگستری.</li>
                    <li>گواهی قطعیت و لازم‌الاجرا بودن رای داوری از مرجع صالح صادرکننده یا نهاد داوری.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-3">
                  <h3 className="font-bold text-rose-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>موارد رد شناسایی و عدم اجرای رای (ماده ۵ کنوانسیون)</span>
                  </h3>
                  <ul className="space-y-2 list-disc pr-4">
                    <li>عدم اهلیت یکی از طرفین موافقت‌نامه داوری طبق قانون حاکم بر اهلیت آنان.</li>
                    <li>عدم ابلاغ صحیح و به‌موقع تعیین داور یا جریان رسیدگی به طرف محکوم‌علیه.</li>
                    <li>رای داور خارج از حدود موضوعات ارجاع‌شده به داوری صادر شده باشد (Ultra Vires).</li>
                    <li>
                      مخالفت اجرای رای داوری با نظم عمومی (Public Policy) یا اخلاق حسنه در قلمرو جمهوری اسلامی ایران.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fee_calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#0B132B]/80 rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-xl space-y-6">
                <h2 className="text-lg font-bold text-white flex items-center gap-2 pb-4 border-b border-gray-800">
                  <Coins className="w-5 h-5 text-[#D4AF37]" />
                  <span>محاسبه‌گر هزینه‌های اداری و دستمزد داوران بین‌المللی</span>
                </h2>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-2">مبلغ مورد اختلاف (دلار آمریکا):</label>
                  <input
                    type="number"
                    value={disputeAmountUSD}
                    onChange={(e) => setDisputeAmountUSD(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-[#070B19] border border-gray-700 text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">مرجع یا قواعد داوری:</label>
                    <select
                      value={arbitrationInstitution}
                      onChange={(e) => setArbitrationInstitution(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-xl bg-[#070B19] border border-gray-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="icc">ICC دیوان بین‌المللی پاریس</option>
                      <option value="acic">ACIC مرکز داوری اتاق ایران</option>
                      <option value="uncitral">UNCITRAL قواعد موردی آنسیترال</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">ترکیب دیوان داوری:</label>
                    <select
                      value={tribunalSize}
                      onChange={(e) => setTribunalSize(Number(e.target.value) as any)}
                      className="w-full px-4 py-3 rounded-xl bg-[#070B19] border border-gray-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value={1}>داور منفرد (Sole Arbitrator - کم‌هزینه‌تر)</option>
                      <option value={3}>دیوان ۳ نفره (۲ داور اختصاصی + ۱ سرداور Umpire)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gradient-to-b from-[#0B132B] to-[#070B19] rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/30 shadow-2xl space-y-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#070B19] border border-gray-700 text-xs font-bold text-gray-300">
                  <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>برآورد مخارج داوری</span>
                </div>

                <div className="p-6 rounded-2xl bg-[#070B19] border border-gray-800 space-y-2">
                  <span className="text-xs text-gray-400 block font-bold">مجموع هزینه تخمینی داوری:</span>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-[#D4AF37]">
                    ${fees.totalEstimatedCost.toLocaleString('en-US')}
                  </div>
                  <span className="text-xs text-gray-400 block font-bold">
                    معادل حدود {(fees.totalEstimatedCost * 95000 / 1000000000).toFixed(2)} میلیارد تومان
                  </span>
                </div>

                <div className="space-y-3 text-right text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#070B19] border border-gray-800">
                    <span className="text-gray-400">هزینه اداری و ثبت نهاد (Admin Fee):</span>
                    <span className="font-bold text-white font-mono">${fees.adminFee.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#070B19] border border-gray-800">
                    <span className="text-gray-400">دستمزد هر داور:</span>
                    <span className="font-bold text-white font-mono">${fees.arbitratorFeePerPerson.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#070B19] border border-gray-800">
                    <span className="text-gray-400">مجموع حق‌الزحمه دیوان ({tribunalSize} نفره):</span>
                    <span className="font-bold text-emerald-400 font-mono">${fees.totalArbitratorsFee.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'annulment_grounds' && (
          <div className="bg-[#0B132B]/80 rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 pb-4 border-b border-gray-800">
              <Scale className="w-5 h-5 text-rose-400" />
              <span>جهات ابطال رأی داور در قانون داوری تجاری بین‌المللی ایران (ماده ۳۳ LICA) و اصل ۱۳۹</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-300 leading-relaxed">
              <div className="p-5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-3">
                <h3 className="font-bold text-white">ماده ۳۳ قانون داوری تجاری بین‌المللی ایران (۱۳۷۶)</h3>
                <p>
                  رای داور در موارد ذیل با دادخواست یکی از طرفین به دادگاه عمومی تهران قابل ابطال است:
                </p>
                <ul className="space-y-1.5 list-disc pr-4 text-gray-400">
                  <li>بطلان موافقت‌نامه داوری به موجب قانونی که طرفین بر آن حاکم دانسته‌اند.</li>
                  <li>رعایت نشدن مقررات مربوط به ابلاغ اخطاریه‌های داوری یا عدم امکان دفاع موثر.</li>
                  <li>تجاوز داور از حدود اختیارات تفویض‌شده در موافقت‌نامه داوری.</li>
                  <li>مغایرت ترکیب دیوان داوری یا آیین دادرسی با توافق طرفین یا قانون داوری.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#070B19] border border-gray-800 space-y-3">
                <h3 className="font-bold text-[#D4AF37]">محدودیت‌های قانون اساسی: اصل ۱۳۹</h3>
                <p className="text-amber-200/90 font-bold">
                  «صلح دعاوی راجع به اموال عمومی و دولتی یا ارجاع آن به داوری در هر مورد، موکول به تصویب هیئت وزیران است و باید به اطلاع مجلس برسد. در مواردی که طرف دعوی خارجی باشد... باید به تصویب مجلس نیز برسد.»
                </p>
                <p>
                  در صورتی که یکی از طرفین قرارداد شرکت یا سازمان دولتی ایرانی باشد و مصوبه هیات وزیران یا مجلس اخذ نشده باشد، شرط داوری به دلیل مخالفت با نظم عمومی باطل تلقی شده و رای داوری قابلیت اجرا نخواهد داشت.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
