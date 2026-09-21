import React, { useState } from 'react';
import {
  ShieldAlert,
  Scale,
  Building,
  TrendingDown,
  Lock,
  FileText,
  AlertTriangle,
  Coins,
  Search,
  CheckCircle2,
  XCircle,
  Printer,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Eye,
  BadgeAlert,
  Network,
  Cpu,
  BarChart2
} from 'lucide-react';

interface BailAssessmentInput {
  allegedDamageBillionTomans: number;
  crimeCategory: 'disruption_economic_system' | 'insider_trading' | 'money_laundering' | 'grand_fraud' | 'embezzlement';
  custodyStatus: 'detained' | 'released_on_bail' | 'summons_served';
  hasMultipleDefendants: boolean;
  defendantRole: 'primary_organizer' | 'board_member' | 'accountant_agent' | 'third_party_beneficiary';
  hasFullFinancialCooperation: boolean;
  fundsRedeposited: boolean;
}

export const EconomicCrimesDefenseSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const [activeTab, setActiveTab] = useState<'encyclopedia' | 'bourse_securities' | 'bail_evaluator' | 'defense_pleading' | 'fund_tracing'>('encyclopedia');

  // Bail Evaluation State
  const [bailInput, setBailInput] = useState<BailAssessmentInput>({
    allegedDamageBillionTomans: 25,
    crimeCategory: 'disruption_economic_system',
    custodyStatus: 'detained',
    hasMultipleDefendants: true,
    defendantRole: 'board_member',
    hasFullFinancialCooperation: true,
    fundsRedeposited: false,
  });

  // Pleading Form
  const [clientName, setClientName] = useState('مهندس کامران فکورنیا');
  const [courtBranch, setCourtBranch] = useState('شعبه دوم دادگاه انقلاب اسلامی ویژه رسیدگی به جرایم اقتصادی تهران');
  const [indictmentNumber, setIndictmentNumber] = useState('۱۴۰۲/۹۰۲/ک/ویژه');

  // Risk & Bail Calculations
  let estimatedBailBillionTomans = bailInput.allegedDamageBillionTomans * 1.5;
  let detentionRiskPercent = 40;

  if (bailInput.crimeCategory === 'disruption_economic_system') {
    detentionRiskPercent += 35;
    estimatedBailBillionTomans = bailInput.allegedDamageBillionTomans * 2.0;
  } else if (bailInput.crimeCategory === 'embezzlement') {
    detentionRiskPercent += 25;
  }

  if (bailInput.defendantRole === 'primary_organizer') detentionRiskPercent += 20;
  if (bailInput.fundsRedeposited) {
    detentionRiskPercent -= 35;
    estimatedBailBillionTomans *= 0.7;
  }
  if (bailInput.hasFullFinancialCooperation) detentionRiskPercent -= 15;

  detentionRiskPercent = Math.min(95, Math.max(15, detentionRiskPercent));

  return (
    <div className="min-h-screen bg-[#060B18] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 relative font-sans" dir="rtl">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-rose-600/5 rounded-full blur-3xl pointer-events-none" />

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
              <ShieldAlert className="w-4 h-4 text-[#D4AF37]" />
              مرکز تخصصی دفاع در جرایم اقتصادی، بورس و پولشویی (فاز ۲۸)
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
              چاپ چک‌لیست تودیع وثیقه
            </button>
          </div>
        </div>

        {/* Hero Header Banner */}
        <div className="relative bg-gradient-to-r from-[#0B132B] via-[#1A0B1A] to-[#0B132B] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>شعب ویژه دادگاه‌های جرایم اقتصادی و دادسرای عمومی و انقلاب ناحیه ۳۲ تهران</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
              دفاع در پرونده‌های کلان جرایم اقتصادی، بورس و پولشویی
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              استراتژی‌های دفاعی در دادگاه‌های ویژه اقتصادی (استجازه)، اتهامات اخلال عمده و کلان در نظام پولی و ارزی، تخلفات ماده ۴۶ قانون بازار اوراق بهادار، دفاع در برابر قرارهای بازداشت موقت، تبدیل وثیقه ملکی و رفع توقیف از حساب‌ها و شرکت‌ها.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          {[
            { id: 'encyclopedia', label: 'دایره‌المعارف و عناوین مجرمانه اقتصادی', icon: Scale },
            { id: 'bourse_securities', label: 'حقوق بورس و دستکاری بازار سرمایه (ماده ۴۶)', icon: BarChart2 },
            { id: 'bail_evaluator', label: 'ارزیاب قرار تأمین کیفری و تبدیل قرار بازداشت', icon: Lock },
            { id: 'defense_pleading', label: 'ژنراتور لایحه دفاعیه دادگاه ویژه اقتصادی', icon: FileText },
            { id: 'fund_tracing', label: 'ردیابی جریان وجوه (Trace of Funds) و حسابرسی جنایی', icon: Network },
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

        {/* Tab 1: Encyclopedia of White-Collar Crimes */}
        {activeTab === 'encyclopedia' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'اخلال در نظام اقتصادی کشور (بندهای الف تا و)',
                lawRef: 'قانون مجازات اخلالگران در نظام اقتصادی کشور مصوب ۱۳۶۹',
                severity: 'حبس از ۵ تا ۲۰ سال یا افساد فی‌الارض در صورت قصد ضربه به نظام',
                elements: 'اخلال در نظام پولی یا ارزی از طریق قاچاق عمده، گران‌نمایی ارز دولتی یا تبانی در واردات.',
                defenseTactic: 'اثبات عدم قصد مقابله با نظام، تفکیک اخلال جزئی از عمده و ارائه گزارش رسمی بانک مرکزی.',
              },
              {
                title: 'جرایم پولشویی و عواید حاصل از جرم',
                lawRef: 'قانون مبارزه با پولشویی مصوب ۱۳۸۶ با اصلاحات ۱۳۹۷',
                severity: 'ضبط کامل اموال و درآمدها + جزای نقدی معادل یک‌چهارم عواید',
                elements: 'تحصیل، تملک یا استفاده از عواید حاصل از ارتکاب جرایم اولیه نظیر قاچاق، رشوه یا کلاهبرداری.',
                defenseTactic: 'اثبات منشأ مشروع دارایی‌ها (Source of Wealth)، تفکیک حساب‌های شخصی از تجاری و حسن‌نیت.',
              },
              {
                title: 'کلاهبرداری شبکه‌ای و پانزی (ماده ۴)',
                lawRef: 'قانون تشدید مجازات مرتکبین ارتشاء، اختلاس و کلاهبرداری',
                severity: 'حبس از ۲ تا ۱۰ سال + انفصال دائم از خدمات دولتی + رد مال',
                elements: 'تشکیل شبکه یا هدایت گروه چند نفره برای بردن مال اشخاص از طریق پروژه‌های موهوم سرمایه‌گذاری.',
                defenseTactic: 'اثبات جنبه صرفاً حقوقی عدم انجام تعهد (مدنی)، فقدان مانور متقلبانه و رد مطالبات شکات.',
              },
              {
                title: 'ارتشاء و اختلاس در بخش عمومی و خصولتی',
                lawRef: 'مواد ۳ و ۵ قانون تشدید مجازات مرتکبین ارتشاء و اختلاس',
                severity: 'حبس تا ۱۰ سال + شلاق + رد مال و جزای نقدی معادل ۲ برابر مال',
                elements: 'برداشت یا تصاحب وجوه دولتی توسط کارمند، یا دریافت وجه/مال توسط مامور دولت در قبال انجام وظیفه.',
                defenseTactic: 'تحدید قلمرو عنوان «کارمند دولت»، اثبات عدم واریز به حساب شخصی و تودیع فوری قبل از کیفرخواست.',
              },
              {
                title: 'فرار مالیاتی کلان سازمان‌یافته (ماده ۲۷۴)',
                lawRef: 'ماده ۲۷۴ قانون مالیات‌های مستقیم اصلاحی ۱۳۹۴',
                severity: 'حبس تعزیری درجه شش + محرومیت از حقوق اجتماعی + جریمه سنگین',
                elements: 'استفاده از کارت بازرگانی اشخاص بی‌بضاعت، صدور فاکتورهای صوری و پنهان‌سازی فعالیت اقتصادی.',
                defenseTactic: 'طرح ایراد فقدان شکایت شاکی خصوصی (سازمان امور مالیاتی) و تسویه اصل و جرایم مالیاتی.',
              },
              {
                title: 'تحصیل مال از طریق نامشروع (ماده ۲)',
                lawRef: 'ماده ۲ قانون تشدید مجازات مرتکبین ارتشاء و اختلاس',
                severity: 'حبس از ۳ ماه تا ۲ سال + رد اصل مال',
                elements: 'سوءاستفاده از امتیازات، پروانه‌های صادراتی و موافقت‌های اصولی برخلاف ضوابط قانونی مقرره.',
                defenseTactic: 'اثبات قانونی بودن فرآیند اخذ تسهیلات و ارائه طرح‌های توجیهی مصوب بانک‌های عامل.',
              },
            ].map((crime, idx) => (
              <div key={idx} className="bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 space-y-3 hover:border-rose-500/40 transition-all">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-white text-sm">{crime.title}</h4>
                  <span className="text-[10px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    جرم اقتصادی کلان
                  </span>
                </div>
                <div className="text-[11px] text-[#D4AF37] font-mono">{crime.lawRef}</div>
                <div className="text-[11px] text-rose-300 font-semibold">{crime.severity}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{crime.elements}</p>
                <div className="p-3 rounded-xl bg-[#060B18] border border-slate-800 text-[11px] text-slate-400">
                  <strong className="text-emerald-400 block mb-0.5">محور دفاعی وکیل:</strong>
                  {crime.defenseTactic}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Bourse & Securities Offenses (Article 46) */}
        {activeTab === 'bourse_securities' && (
          <div className="space-y-6">
            <div className="bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-[#D4AF37]" />
                    <span>جرایم و تخلفات بازار سرمایه و بورس اوراق بهادار (ماده ۴۶ قانون بازار)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    دفاع در برابر گزارش‌های سازمان بورس و اوراق بهادار در دادسرا و دادگاه تجدیدنظر استان تهران
                  </p>
                </div>
                <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/30 text-xs font-semibold">
                  صلاحیت اختصاصی شعبه ۱۰۵ دادگاه کیفری ۲ تهران
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#060B18] border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="text-xs font-bold text-rose-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>دستکاری قیمت نماد (Market Manipulation)</span>
                  </div>
                  <div className="text-[11px] text-[#D4AF37]">بند ۳ ماده ۴۶ قانون بازار</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    انجام هرگونه معامله‌ای که منجر به ایجاد ظاهری گمراه‌کننده از روند معاملات اوراق بهادار یا ایجاد قیمت‌های کاذب و اغوای اشخاص به انجام معامله شود.
                  </p>
                  <div className="p-2.5 rounded-xl bg-white/5 text-[11px] text-slate-400">
                    <strong>راهکار دفاعی:</strong> اثبات وجود دلایل بنیادی (P/E، گزارش کدال و ارزش دفتری) برای خرید سهم و رد تبانی بین کدهای سهامداری.
                  </div>
                </div>

                <div className="bg-[#060B18] border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>معاملات متکی بر اطلاعات نهانی (Insider Trading)</span>
                  </div>
                  <div className="text-[11px] text-[#D4AF37]">بند ۱ ماده ۴۶ قانون بازار</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    استفاده از اطلاعات نهانی قبل از انتشار عمومی در سامانه کدال توسط مدیران، حسابرسان، سهامداران عمده یا وابستگان درجه یک آن‌ها جهت کسب سود یا پیشگیری از زیان.
                  </p>
                  <div className="p-2.5 rounded-xl bg-white/5 text-[11px] text-slate-400">
                    <strong>راهکار دفاعی:</strong> اثبات تاریخ قطعی تصمیم هیئت مدیره پس از تاریخ معامله و عدم دسترسی متهم به مستندات سری.
                  </div>
                </div>

                <div className="bg-[#060B18] border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    <span>حل اختلافات در هیئت داوری بورس (ماده ۳۶)</span>
                  </div>
                  <div className="text-[11px] text-[#D4AF37]">رسیدگی شبه‌قضایی ترافعی</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    رسیدگی به کلیه اختلافات بین کارگزاران، بازارگردانان، ناشران و سرمایه‌گذاران ناشی از فعالیت حرفه‌ای توسط قاضی منصوب قوه قضاییه و دو کارشناس خبره.
                  </p>
                  <div className="p-2.5 rounded-xl bg-white/5 text-[11px] text-slate-400">
                    <strong>راهکار دفاعی:</strong> آرای هیئت داوری قطعی و لازم‌الاجرا بوده و از طریق اجرای احکام دادگاه حقوقی قابل وصول است.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Bail Evaluation & Custody Conversion */}
        {activeTab === 'bail_evaluator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Lock className="w-5 h-5 text-[#D4AF37]" />
                  <span>متغیرهای ارزیابی قرار تامین کیفری (ماده ۲۱۷ ق.آ.ک)</span>
                </div>
                <span className="text-[11px] text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
                  قانون آیین دادرسی کیفری ۱۳۹۲
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">عنوان اتهامی انتسابی در دادسرا:</label>
                <select
                  value={bailInput.crimeCategory}
                  onChange={(e) => setBailInput({ ...bailInput, crimeCategory: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none"
                >
                  <option value="disruption_economic_system">اخلال عمده در نظام اقتصادی (قانون اخلالگران ۱۳۶۹)</option>
                  <option value="money_laundering">پولشویی سازمان‌یافته (قانون مبارزه با پولشویی)</option>
                  <option value="grand_fraud">کلاهبرداری شبکه‌ای و جمع‌آوری وجوه عمومی</option>
                  <option value="insider_trading">دستکاری بازار سهام و افشای اطلاعات نهانی (ماده ۴۶)</option>
                  <option value="embezzlement">اختلاس و تصرف غیرقانونی در اموال دولتی</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">میزان خسارت یا مال مورد ادعای شاکی/کیفرخواست:</span>
                  <span className="text-[#D4AF37] font-bold">{bailInput.allegedDamageBillionTomans} میلیارد تومان</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={200}
                  step={1}
                  value={bailInput.allegedDamageBillionTomans}
                  onChange={(e) => setBailInput({ ...bailInput, allegedDamageBillionTomans: Number(e.target.value) })}
                  className="w-full accent-[#D4AF37] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">سمت متهم در پرونده:</label>
                  <select
                    value={bailInput.defendantRole}
                    onChange={(e) => setBailInput({ ...bailInput, defendantRole: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none"
                  >
                    <option value="primary_organizer">عضو اصلی و سازمان‌دهنده</option>
                    <option value="board_member">عضو هیئت مدیره بدون حق امضای مالی</option>
                    <option value="accountant_agent">حسابدار یا مجری دستورات اداری</option>
                    <option value="third_party_beneficiary">شخص ثالث ذی‌نفع یا دارنده حساب</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">وضعیت فعلی قرار:</label>
                  <select
                    value={bailInput.custodyStatus}
                    onChange={(e) => setBailInput({ ...bailInput, custodyStatus: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none"
                  >
                    <option value="detained">بازداشت موقت در ندامتگاه</option>
                    <option value="released_on_bail">آزاد با قرار وثیقه سنگین</option>
                    <option value="summons_served">احضار در مرحله تحقیقات مقدماتی بازپرسی</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="redeposit"
                    checked={bailInput.fundsRedeposited}
                    onChange={(e) => setBailInput({ ...bailInput, fundsRedeposited: e.target.checked })}
                    className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="redeposit" className="text-xs text-emerald-300 cursor-pointer">
                    رد کامل مال یا تودیع وجه مورد ادعا به حساب سپرده دادگستری (موجب تبدیل بازداشت)
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="cooperation"
                    checked={bailInput.hasFullFinancialCooperation}
                    onChange={(e) => setBailInput({ ...bailInput, hasFullFinancialCooperation: e.target.checked })}
                    className="w-4 h-4 rounded accent-[#D4AF37] cursor-pointer"
                  />
                  <label htmlFor="cooperation" className="text-xs text-slate-300 cursor-pointer">
                    همکاری کامل موکل در معرفی اموال و تسلیم دفاتر مالیاتی و پرینت حساب‌ها
                  </label>
                </div>
              </div>
            </div>

            {/* Assessment Result (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#0B132B] to-[#101D42] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
                <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                  <Scale className="w-4 h-4" />
                  برآورد ریسک بازداشت و رقم قرار وثیقه
                </span>
                <span className="text-[10px] text-slate-400">ماده ۲۲۶ ق.آ.ک</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">احتمال تداوم قرار بازداشت موقت بازپرس:</span>
                    <span className={`font-bold ${detentionRiskPercent > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {detentionRiskPercent}٪
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        detentionRiskPercent > 60 ? 'bg-rose-500' : detentionRiskPercent > 35 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${detentionRiskPercent}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#060B18]/90 border border-[#D4AF37]/30 space-y-1">
                  <div className="text-[11px] text-slate-400">برآورد مبلغ قرار وثیقه ملکی مقتضی:</div>
                  <div className="text-2xl font-black text-[#D4AF37] font-mono flex items-center justify-between">
                    <span>{estimatedBailBillionTomans.toFixed(1)}</span>
                    <span className="text-xs font-normal text-slate-300">میلیارد تومان</span>
                  </div>
                  <div className="text-[10px] text-slate-500 pt-1">
                    مستلزم ارزیابی توسط کارشناس رسمی دادگستری در رشته راه‌وساختمان و تودیع سند تک‌برگ آزاد.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 leading-relaxed">
                  <strong className="text-amber-300 block mb-1">اقدام فوری وکلای پرونده:</strong>
                  طبق ماده ۲۴۲ قانون آیین دادرسی کیفری، مدت بازداشت موقت در جرایم اقتصادی نباید از حداقل مجازات حبس مقرر قانونی تجاوز نماید و بازپرس مکلف به فک یا تخفیف قرار در موعد ماهانه است.
                </div>
              </div>

              <button
                onClick={() => setActiveTab('defense_pleading')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#0B132B] font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-[#D4AF37]/10 transition-all"
              >
                <span>تنظیم لایحه اعتراض به قرار بازداشت موقت و تبدیل به وثیقه</span>
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Defense Pleading Generator */}
        {activeTab === 'defense_pleading' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="text-xs font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                <span>اطلاعات پرونده و شعبه دادگاه ویژه</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">نام متهم (موکل):</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">شعبه دادگاه یا دادسرا:</label>
                  <input
                    type="text"
                    value={courtBranch}
                    onChange={(e) => setCourtBranch(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">شماره پرونده / کیفرخواست:</label>
                  <input
                    type="text"
                    value={indictmentNumber}
                    onChange={(e) => setIndictmentNumber(e.target.value)}
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
                    <span>لایحه دفاعیه جامع در دادگاه ویژه رسیدگی به جرایم اقتصادی</span>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] text-xs border border-[#D4AF37]/30 font-bold"
                  >
                    چاپ رسمی با سربرگ دفتر
                  </button>
                </div>

                <div className="bg-[#060B18] border border-slate-800 rounded-2xl p-6 text-xs text-slate-200 leading-loose font-serif space-y-4 shadow-inner max-h-[500px] overflow-y-auto">
                  <div className="text-center font-bold text-sm text-[#D4AF37] pb-2 border-b border-slate-800">
                    ریاست و مستشاران محترم {courtBranch}
                  </div>

                  <div className="space-y-1.5 text-slate-300">
                    <p><strong>پرونده کلاسه:</strong> {indictmentNumber}</p>
                    <p><strong>متهم:</strong> {clientName} با وکالت دکتر سیده مریم رضوی.</p>
                    <p><strong>موضوع:</strong> دفاع در قبال اتهام انتسابی اخلال در نظام اقتصادی و تقاضای فک قرار بازداشت و صدور حکم برائت.</p>
                  </div>

                  <div className="space-y-3 pt-2 text-justify">
                    <p className="indent-4">
                      با سلام و ادای احترام؛ در مقام دفاع از موکل در برابر کیفرخواست صادره از دادسرای ناحیه ۳۲ جرایم اقتصادی، مراتب ذیل را به استحضار عالی‌جنابان می‌رساند:
                    </p>

                    <ol className="list-decimal list-inside space-y-2 pr-2">
                      <li>
                        <strong>فقدان رکن روانی و سوءنیت خاص (قصد مقابله با نظام):</strong> طبق ماده ۱ قانون مجازات اخلالگران مصوب ۱۳۶۹ و آراء وحدت رویه دیوان عالی کشور، تحقق جرم منوط به احراز قصد ضربه زدن به نظام یا علم به موثر بودن اقدام در مقابله با نظام است. موکل صرفاً یک فعال تجاری در بخش خصوصی بوده و فاقد هرگونه انگیزه مجرمانه سیاسی یا ضدامنیتی بوده است.
                      </li>
                      <li>
                        <strong>عدم تحقق رکن مادی اخلال در حد «عمده و کلان»:</strong> حجم معاملات ارزی یا بازرگانی موکل در مقایسه با گردش مالی بازار پولی کشور طبق استعلام ضمیمه‌شده از اداره بررسی‌های اقتصادی بانک مرکزی، در حد «کلان» ارزیابی نمی‌گردد و اطلاق عنوان مجرمانه اخلال به آن فاقد وجاهت فنی و آماری است.
                      </li>
                      <li>
                        <strong>رد ادعای پولشویی با اثبات منشأ تجاری وجوه:</strong> کلیه تراکنش‌های بانکی ناشی از فروش کالا، فاکتورهای رسمی در سامانه مودیان و گواهی‌های ترخیص گمرکی (پروانه سبز) است و هیچ‌گونه عایدی نامشروعی در گردش حساب‌های ایشان وجود ندارد.
                      </li>
                    </ol>

                    <p className="pt-2">
                      لذا استناداً به اصل برائت (اصل ۳۷ قانون اساسی) و ماده ۴ قانون آیین دادرسی کیفری، صدور حکم برائت موکل و در وهله نخست تبدیل قرار بازداشت موقت به قرار وثیقه ملکی متناسب مورد استدعاست.
                    </p>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-slate-800 text-[11px] text-slate-400">
                    <span>پیوست‌ها: گزارش حسابرسی، استعلام گمرک و بانک مرکزی</span>
                    <span>وکیل مدافع - دکتر سیده مریم رضوی</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Forensic Accounting & Fund Tracing */}
        {activeTab === 'fund_tracing' && (
          <div className="bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="max-w-2xl space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-[#D4AF37]" />
                <span>ردیابی جریان وجوه مالی (Trace of Funds) و حسابرسی جنایی دادگستری</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                تیم وکلای ما با همکاری کارشناسان رسمی امور بانکی و حسابرسی جنایی، زنجیره انتقال وجوه، هویت دارندگان نهایی حساب‌های واسط و تفکیک اموال ناشی از تجارت قانونی از اتهامات کیفرخواست را مستندسازی می‌نمایند.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-[#060B18] border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>اثبات منشأ مشروع دارایی (Source of Wealth)</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  تطبیق واریزی‌ها با قراردادهای تجاری، اظهارنامه‌های مالیاتی عملکرد و پروانه‌های صادراتی جهت ابطال فرضیه تحصیل مال از طریق نامشروع.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#060B18] border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-blue-400 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>تحلیل تراکنش‌های زنجیره بلوکی و رمزارز</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  ارائه گزارش آن‌چین (On-chain) برای اثبات عدم ارتباط کیف پول‌های موکل با صرافی‌های غیرمجاز یا آدرس‌های تحت تحریم بین‌المللی OFAC.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#060B18] border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-[#D4AF37] flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span>رفع مسدودی حساب‌های شرکتی و تداوم تولید</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  اخذ دستور قضایی مبنی بر تفکیک حساب پرداخت حقوق پرسنل و خط تولید کارخانه از حساب‌های موضوع قرار بازداشت تامین کیفری.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
