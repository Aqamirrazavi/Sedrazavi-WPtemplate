import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Building2,
  Coins,
  Globe2,
  UserCheck,
  Scale,
  FileText,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Lock,
  ArrowRight,
  TrendingUp,
  Landmark,
  Eye,
  Briefcase
} from 'lucide-react';
import {
  AML_SANCTIONS_DATA,
  SUSPICIOUS_ACTIVITY_RULES,
  PEP_DILIGENCE_DATA,
  ATTORNEY_INFO,
} from '../../data/mockData';
import { AMLSanctionListEntity, SuspiciousActivityRule, PEPDueDiligenceCheck } from '../../types/theme';

interface ComplianceSuiteProps {
  onBackToHome?: () => void;
  onOpenConsultationModal?: () => void;
}

export const FinancialComplianceSuite: React.FC<ComplianceSuiteProps> = ({
  onBackToHome,
  onOpenConsultationModal,
}) => {
  const [activeTab, setActiveTab] = useState<'sanctions' | 'str_detector' | 'pep_edd' | 'kyt_screener'>('sanctions');

  // Search & Filter in Sanctions
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSource, setFilterSource] = useState<string>('همه');

  // STR Interactive Simulator
  const [selectedSTR, setSelectedSTR] = useState<SuspiciousActivityRule>(SUSPICIOUS_ACTIVITY_RULES[0]);
  const [transactionAmountToman, setTransactionAmountToman] = useState<number>(450000000);
  const [transactionType, setTransactionType] = useState<'crypto' | 'banking' | 'property' | 'customs'>('banking');
  const [partyRiskProfile, setPartyRiskProfile] = useState<'unknown' | 'verified_business' | 'foreign_offshore'>('unknown');
  const [copiedDraft, setCopiedDraft] = useState(false);

  // KYT Crypto Screener
  const [walletAddressInput, setWalletAddressInput] = useState('0x71C85648A1B619279427b03bFb6e9A3EcD6cf8f9');
  const [analyzingWallet, setAnalyzingWallet] = useState(false);
  const [walletAnalysisResult, setWalletAnalysisResult] = useState<{
    riskScore: number; // 0-100
    riskCategory: string;
    fiuFlag: boolean;
    mixerExposure: boolean;
    recommendedAction: string;
  } | null>(null);

  // Filtered sanctions
  const filteredSanctions = AML_SANCTIONS_DATA.filter((item) => {
    const matchesSearch =
      item.nameFa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.complianceDirective.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = filterSource === 'همه' || item.sanctionSource === filterSource;
    return matchesSearch && matchesSource;
  });

  // Crypto KYT Analysis Simulator
  const handleAnalyzeWallet = () => {
    setAnalyzingWallet(true);
    setWalletAnalysisResult(null);
    setTimeout(() => {
      setAnalyzingWallet(false);
      const isMixerRelated = walletAddressInput.toLowerCase().includes('71c') || walletAddressInput.toLowerCase().includes('0x');
      setWalletAnalysisResult({
        riskScore: isMixerRelated ? 88 : 22,
        riskCategory: isMixerRelated ? 'پرخطر (Critical Risk - سابقه تعامل با میکسرها و صرافی‌های فاقد KYC)' : 'کم‌خطر (Low Risk - دارایی با منشأ مشخص)',
        fiuFlag: isMixerRelated,
        mixerExposure: isMixerRelated,
        recommendedAction: isMixerRelated
          ? 'توقف بلادرنگ تسویه ریالی، ارسال گزارش معاملات مشکوک (STR) ظرف ۲ ساعت و استعلام منشأ دارایی (Proof of Funds).'
          : 'تأیید پذیرش واریز با ثبت کد ملی و تأییدیه هویت کاربر در سامانه داخلی.'
      });
    }, 1200);
  };

  const handleCopyDefenseDraft = () => {
    const draftText = `ریاست محترم دادسرای عمومی و انقلاب تهران (ناحیه ۳۲ - جرایم اقتصادی)
موضوع: لایحه تبیین منشأ مشروع تراکنش‌های مالی و رفع انسداد حساب‌های بانکی
احتراماً، اینجانب وکیل مدافع موکل در پرونده کلاسه مرتبط با تراکنش‌های اعلامی به عنوان معاملات مشکوک (موضوع ${selectedSTR.legalArticle}) به استحضار عالی می‌رساند:
۱- کلیه واریزهای صورت‌پذیرفته در تاریخ‌های موصوف ناشی از مبادلات تجاری ثبت‌شده در سامانه مودیان و دارای فاکتورهای رسمی الکترونیک با شناسه یکتا می‌باشد.
۲- بر مبنای اصل اصالت صحت معاملات و عدم انطباق عملیات مالی موکل با شاخص‌های سوءنیت ماده ۲ قانون مبارزه با پولشویی، تقاضای استعلام گردش مالی از بانک عامل و رفع انسداد فوری از حساب‌های تجاری کارآفرینی موکل مورد استدعاست.
با احترام - دفتر وکالت و داوری تخصصی دکتر سیده مریم رضوی`;
    navigator.clipboard.writeText(draftText);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  return (
    <div className="w-full bg-[#070D1F] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-10 min-h-screen" dir="rtl">
      {/* Top Banner & Header */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-700/30 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-lg shadow-amber-900/20">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37]/15 text-[#F3E5AB] border border-[#D4AF37]/30">
                  فاز ۱۱ جامع
                </span>
                <span className="text-xs text-slate-400 font-mono">AML & Financial Compliance Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-serif text-white mt-1">
                سامانه مبارزه با پولشویی (AML)، تطبیق قوانین بانکی و ارزیابی ریسک تحریم‌ها
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                بازگشت به پرتال اصلی
              </button>
            )}
            <button
              onClick={onOpenConsultationModal}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#070D1F] hover:brightness-110 shadow-lg shadow-amber-900/30 transition-all"
            >
              مشاوره تخصصی جرایم اقتصادی با دکتر رضوی
            </button>
          </div>
        </div>

        {/* Supervision & Statutory Box */}
        <div className="rounded-2xl p-5 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Scale className="w-4 h-4 text-[#D4AF37]" />
              پشتوانه تقنینی و استانداردهای حاکم بر سامانه:
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              قانون مبارزه با پولشویی مصوب ۱۳۸۶ و اصلاحات ۱۳۹۷، آیین‌نامه اجرایی ماده ۱۴، کنوانسیون پالرمو و مریدا، دستورالعمل‌های مرکز اطلاعات مالی ایران (FIU)، توصیه‌های ۴۰ گانه FATF و ضوابط احراز هویت مضاعف (EDD) اشخاص با موقعیت سیاسی (PEP).
            </p>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-[#D4AF37]/30 text-right min-w-[240px]">
            <div className="text-[11px] text-slate-400">سرپرست علمی دپارتمان اقتصادی:</div>
            <div className="text-xs font-bold text-white mt-0.5">{ATTORNEY_INFO.name}</div>
            <div className="text-[10px] text-[#D4AF37]">وکیل پایه یک دادگستری و متخصص دعاوی بانکی و بین‌الملل</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 no-scrollbar">
          {[
            { id: 'sanctions', label: 'غربالگری تحریم‌ها و لیست‌های سیاه (Sanctions Screening)', icon: Globe2 },
            { id: 'str_detector', label: 'آشکارساز معاملات مشکوک (STR) و تنظیم لایحه رفع مسدودی', icon: AlertTriangle },
            { id: 'pep_edd', label: 'احراز هویت مضاعف اشخاص سیاسی (PEP & Due Diligence)', icon: UserCheck },
            { id: 'kyt_screener', label: 'پایش تراکنش‌های کریپتو و والت‌های پرخطر (KYT Engine)', icon: Coins },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#070D1F] shadow-lg shadow-amber-900/30'
                    : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto">
        {/* TAB 1: Sanctions & Blacklist Screening */}
        {activeTab === 'sanctions' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="جستجوی شخص، شرکت، نهاد یا والت مشکوک..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-9 pl-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                <span className="text-xs text-slate-400 whitespace-nowrap">مرجع لیست سیاه:</span>
                {['همه', 'مرکز اطلاعات مالی ایران (FIU)', 'OFAC SDN', 'شورای امنیت سازمان ملل (UNSC)', 'FATF High-Risk Jurisdictions'].map((source) => (
                  <button
                    key={source}
                    onClick={() => setFilterSource(source)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      filterSource === source
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700/50'
                    }`}
                  >
                    {source}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSanctions.map((entity) => (
                <div
                  key={entity.id}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all space-y-3.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-mono text-slate-400">{entity.nameEn}</div>
                      <h3 className="text-base font-bold text-white mt-0.5">{entity.nameFa}</h3>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black shrink-0 ${
                        entity.riskLevel.includes('Blacklisted')
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : entity.riskLevel.includes('High')
                          ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {entity.riskLevel}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-800/80">
                    <div>
                      <span className="text-slate-400">ماهیت نهاد: </span>
                      <span className="text-slate-200 font-bold">{entity.entityType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">مرجع تحریم: </span>
                      <span className="text-amber-400 font-bold">{entity.sanctionSource}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1.5">
                    <div className="text-amber-400 font-bold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      دستورالعمل الزام‌آور قانونی انطباق (Compliance Directive):
                    </div>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{entity.complianceDirective}</p>
                    <div className="text-[10px] text-slate-500 font-mono pt-1">
                      مستند قانونی: {entity.statutoryBasis}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Suspicious Transaction Report (STR) & Defense Draft Generator */}
        {activeTab === 'str_detector' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
            {/* Left Controls & Scenarios */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                شاخص‌های هوشمند گزارش معاملات مشکوک (STR Indicators):
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                الگوهای رفتار مالی متقلبانه، اسمارفینگ و تراکنش‌های پرخطر که منجر به مسدودی کد ملی و حساب‌های بانکی در دادسرای جرایم اقتصادی می‌گردند:
              </p>

              <div className="space-y-3">
                {SUSPICIOUS_ACTIVITY_RULES.map((rule) => {
                  const isSelected = selectedSTR.id === rule.id;
                  return (
                    <div
                      key={rule.id}
                      onClick={() => setSelectedSTR(rule)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                        isSelected
                          ? 'bg-amber-500/10 border-[#D4AF37] shadow-lg shadow-amber-900/20'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-bold">
                          {rule.category}
                        </span>
                        <span className="text-[10px] text-amber-400 font-mono">{rule.legalArticle}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white">{rule.indicatorTitleFa}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{rule.thresholdCriteria}</p>
                    </div>
                  );
                })}
              </div>

              {/* Transaction Simulator Parameters */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  شبیه‌ساز ارزیابی خطر تراکنش:
                </h4>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">
                    مبلغ تجمیعی تراکنش: {(transactionAmountToman / 1000000).toLocaleString('fa-IR')} میلیون تومان
                  </label>
                  <input
                    type="range"
                    min={50000000}
                    max={5000000000}
                    step={50000000}
                    value={transactionAmountToman}
                    onChange={(e) => setTransactionAmountToman(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">پروفایل ریسک طرف معامله:</label>
                    <select
                      value={partyRiskProfile}
                      onChange={(e) => setPartyRiskProfile(e.target.value as any)}
                      className="w-full p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                    >
                      <option value="unknown">شخص ناشناس / حساب اجاره‌ای</option>
                      <option value="verified_business">شرکت دارای اینماد و شناسه ملی</option>
                      <option value="foreign_offshore">حساب خارجی / بدون کد رهگیری</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">الزام قانونی بانک:</label>
                    <div className="p-1.5 rounded-lg bg-slate-950 text-[10px] text-amber-300 font-mono">
                      {transactionAmountToman > 2000000000 ? 'مسدودی حساب + احضار قاضی' : 'گزارش خودکار به سامانه نهاب'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Defense Strategy & Pleading Draft */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <div className="text-[11px] text-[#D4AF37] font-bold">استراتژی دفاعی در دادسرای جرایم اقتصادی</div>
                    <h3 className="text-base font-black text-white">{selectedSTR.indicatorTitleFa}</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    ضوابط کشف و رفع اتهام
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                    <span className="text-slate-400 font-bold block">معیار آستانه وقوع تخلف:</span>
                    <span className="text-slate-200">{selectedSTR.thresholdCriteria}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                    <span className="text-slate-400 font-bold block">تکلیف واحد انطباق (Reporting):</span>
                    <span className="text-amber-300 font-mono">{selectedSTR.reportingRequirement}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/30 to-slate-950 border border-[#D4AF37]/30 text-xs space-y-1.5">
                  <div className="text-[#D4AF37] font-bold flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5" />
                    مشاوره تخصصی وکیل دادگستری (دفتر وکالت دکتر رضوی):
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">{selectedSTR.lawyerAdvisory}</p>
                </div>

                {/* Defense Pleading Form Draft */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      پیش‌نویس خودکار لایحه دفاعیه جهت ارائه به بازپرس شعبه:
                    </span>
                    <button
                      onClick={handleCopyDefenseDraft}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors"
                    >
                      {copiedDraft ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedDraft ? 'کپی شد!' : 'کپی لایحه دفاعیه'}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-serif leading-loose text-justify max-h-60 overflow-y-auto space-y-2">
                    <p className="font-bold text-white">
                      ریاست محترم دادسرای عمومی و انقلاب تهران (ناحیه ۳۲ - جرایم اقتصادی)
                    </p>
                    <p>
                      <strong>موضوع:</strong> لایحه تبیین منشأ مشروع تراکنش‌های مالی و درخواست رفع مسدودی از حساب‌های بانکی موکل
                    </p>
                    <p>
                      با سلام و دعای خیر؛ احتراماً به وکالت از موکل پیرامون گزارش ارسالی بانک عامل مبنی بر سوءظن به عملیات پولشویی موضوع {selectedSTR.legalArticle}، به استحضار می‌رساند:
                    </p>
                    <p>
                      ۱- گردش مالی معادل {(transactionAmountToman / 1000000).toLocaleString('fa-IR')} میلیون تومان مربوط به مراودات ثبت‌شده در سامانه جامع تجارت و دفاتر قانونی شرکت موکل بوده و هرگونه فرضیه پولشویی از طریق ساختارشکنی (Structuring) به واسطه فاکتورهای رسمی موجود در پرونده سالبه به انتفاء موضوع است.
                    </p>
                    <p>
                      ۲- نظر به اینکه به موجب ماده ۲ قانون مبارزه با پولشویی، تحقق بزه موکول به وجود جرم منشأ می‌باشد و در مانحن‌فیه هیچ‌گونه تحصیل نامشروعی رخ نداده، صدور دستور مقتضی جهت رفع انسداد حساب موکل مورد استدعاست.
                    </p>
                    <p className="text-left font-bold text-amber-400 mt-2">
                      با تجدید احترام - دکتر سیده مریم رضوی / وکیل پایه یک دادگستری
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PEP & Enhanced Due Diligence (EDD) */}
        {activeTab === 'pep_edd' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/90 border border-slate-800 space-y-2">
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#D4AF37]" />
                ماتریس شناسایی مضاعف اشخاص با موقعیت سیاسی (Politically Exposed Persons - PEP)
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
                بر اساس دستورالعمل بانک مرکزی و ضوابط بین‌المللی مبارزه با فساد (کنوانسیون مریدا)، افتتاح حساب، ارائه خدمات اعتباری و نقل‌وانتقال اموال مقامات عالی‌رتبه کشوری، لشکری و بستگان درجه یک آن‌ها مستلزم اجرای پروتکل‌های پایش تشدیدیافته (EDD) و راستی‌آزمایی دارایی‌ها است.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PEP_DILIGENCE_DATA.map((pep) => (
                <div
                  key={pep.id}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {pep.dueDiligenceLevel}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">دوره پایش: {pep.monitoringFrequency}</span>
                    </div>

                    <h3 className="text-base font-bold text-white">{pep.roleCategory}</h3>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                      <span className="text-slate-400 font-bold block text-[11px]">احراز منشأ وجوه (Source of Funds):</span>
                      <span className="text-slate-200 text-[11px] leading-relaxed">{pep.sourceOfFundsVerification}</span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                        <FileCheck className="w-3.5 h-3.5" />
                        چک‌لیست الزامات انطباق (Compliance Checklist):
                      </span>
                      <ul className="space-y-1 text-[11px] text-slate-300">
                        {pep.complianceChecklist.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono text-center">
                    مطابق ماده ۵ آیین‌نامه مبارزه با فساد اقتصادی
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Crypto KYT Engine (Know Your Transaction) */}
        {activeTab === 'kyt_screener' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Coins className="w-4 h-4 text-amber-400" />
                    موتور ارزیابی خطر و اعتبارسنجی والت‌های بلاک‌چین (KYT Analyzer):
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    بررسی اتصال آدرس‌های اتریوم، ترون یا بیت‌کوین به پلتفرم‌های میکسر (نظیر Tornado Cash)، صرافی‌های نامعتبر روسی یا بازارهای دارک‌وب:
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    آدرس عمومی کیف‌پول رمزارزی (Wallet Address / TXID):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={walletAddressInput}
                      onChange={(e) => setWalletAddressInput(e.target.value)}
                      placeholder="0x... یا T..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-amber-300 focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      onClick={handleAnalyzeWallet}
                      disabled={analyzingWallet || !walletAddressInput}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-[#D4AF37] hover:bg-amber-400 text-[#070D1F] transition-all shrink-0 disabled:opacity-50"
                    >
                      {analyzingWallet ? 'در حال پایش...' : 'شروع آنالیز'}
                    </button>
                  </div>
                </div>

                {/* Preset Sample Wallets for testing */}
                <div className="space-y-1.5">
                  <span className="text-[11px] text-slate-400 block">نمونه والت‌های آماده جهت تست امنیت:</span>
                  <div className="flex flex-wrap gap-2 text-[10px]">
                    <button
                      onClick={() => setWalletAddressInput('0x71C85648A1B619279427b03bFb6e9A3EcD6cf8f9')}
                      className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 font-mono"
                    >
                      والت آلوده به میکسر تورنادو کش (High Risk)
                    </button>
                    <button
                      onClick={() => setWalletAddressInput('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 font-mono"
                    >
                      والت عمومی شفاف بنیاد اتریوم (Clean)
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
                  <span className="text-amber-400 font-bold block">مسئولیت صرافی‌های داخلی:</span>
                  کلیه سکوهای مبادله رمزارز موظفند قبل از تسویه ریالی، با ابزارهای KYT پاک بودن دارایی را احراز نموده و در صورت شناسایی منشأ آلوده، مراتب را سریعاً به پلیس فتا و مرکز اطلاعات مالی گزارش نمایند.
                </div>
              </div>
            </div>

            {/* Analysis Result Box */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 min-h-[320px] flex flex-col justify-center">
                {!walletAnalysisResult && !analyzingWallet && (
                  <div className="text-center py-10 text-slate-500 space-y-2">
                    <Eye className="w-8 h-8 mx-auto text-slate-600" />
                    <p className="text-xs">جهت مشاهده گزارش ریسک و تحلیل زنجیره‌ای، روی دکمه «شروع آنالیز» کلیک نمایید.</p>
                  </div>
                )}

                {analyzingWallet && (
                  <div className="text-center py-12 space-y-3">
                    <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs text-amber-300 font-mono">استعلام از گره‌های بلاک‌چین و پایگاه داده تحریم‌های رمزارزی...</p>
                  </div>
                )}

                {walletAnalysisResult && !analyzingWallet && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <span className="text-[11px] text-slate-400">نتیجه سنجش ریسک دارایی:</span>
                        <h3 className="text-base font-bold text-white mt-0.5">{walletAnalysisResult.riskCategory}</h3>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-black font-mono text-amber-400">{walletAnalysisResult.riskScore}/۱۰۰</div>
                        <div className="text-[10px] text-slate-500">شاخص تهدید (Risk Score)</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="text-slate-400 block text-[10px]">اتصال به میکسرها و تمیزکننده‌ها:</span>
                        <span className={`font-bold ${walletAnalysisResult.mixerExposure ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {walletAnalysisResult.mixerExposure ? 'شناسایی شد (Yes - مثبت)' : 'فاقد سابقه میکسر (Clean)'}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="text-slate-400 block text-[10px]">پرچم هشدار مرکز اطلاعات مالی (FIU):</span>
                        <span className={`font-bold ${walletAnalysisResult.fiuFlag ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {walletAnalysisResult.fiuFlag ? 'پرچم قرمز - هشدار فعال' : 'عادی'}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
                      <div className="text-amber-300 font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        دستورالعمل حقوقی و دفاعی وکیل:
                      </div>
                      <p className="text-slate-200 leading-relaxed text-[11px]">
                        {walletAnalysisResult.recommendedAction}
                      </p>
                    </div>

                    <button
                      onClick={onOpenConsultationModal}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:brightness-110 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Briefcase className="w-4 h-4" />
                      درخواست دفاع در کمیسیون رسیدگی به تخلفات رمزارزی
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
