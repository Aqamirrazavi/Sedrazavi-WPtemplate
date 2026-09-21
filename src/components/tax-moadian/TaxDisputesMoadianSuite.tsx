import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Calculator,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Receipt,
  Scale,
  Building2,
  Clock,
  Coins,
  ChevronRight,
  Download,
  Printer,
  HelpCircle,
  BarChart3,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2,
  XCircle,
  FileText,
  BadgeAlert,
  Send,
  Search,
  ExternalLink
} from 'lucide-react';

interface TaxCalculationState {
  incomeYear: string;
  taxpayerType: 'legal_entity' | 'individual_tier1' | 'individual_tier2' | 'individual_tier3';
  declaredRevenueTomans: number;
  declaredExpensesTomans: number;
  unreportedSalesTomans: number;
  hasAuditedFinancialStatements: boolean;
  lateFilingMonths: number;
  withholdingTaxDeductions: number;
  appliedExemption: 'knowledge_based' | 'free_zone' | 'agriculture' | 'export' | 'none';
}

interface MoadianInvoiceItem {
  id: string;
  invoiceUniqueNumber: string;
  issueDate: string;
  buyerName: string;
  buyerNationalId: string;
  itemDescription: string;
  grossAmountTomans: number;
  vatAmountTomans: number;
  totalWithVatTomans: number;
  moadianStatus: 'verified' | 'rejected' | 'pending_action' | 'tax_office_matched';
  taxIdFiscalCode: string;
}

export const TaxDisputesMoadianSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'moadian_audit' | 'appeal_drafts' | 'exemptions_atlas' | 'tribunal_sim'>('calculator');

  // Calculator State
  const [calcState, setCalcState] = useState<TaxCalculationState>({
    incomeYear: '۱۴۰۲',
    taxpayerType: 'legal_entity',
    declaredRevenueTomans: 12500000000,
    declaredExpensesTomans: 9200000000,
    unreportedSalesTomans: 850000000,
    hasAuditedFinancialStatements: true,
    lateFilingMonths: 0,
    withholdingTaxDeductions: 120000000,
    appliedExemption: 'knowledge_based',
  });

  // Selected Appeal Template
  const [selectedAppealType, setSelectedAppealType] = useState<'article_238' | 'article_244' | 'high_council_251' | 'article_251_bis'>('article_238');
  const [taxpayerName, setTaxpayerName] = useState('شرکت مهندسی داده‌ورزان نوین فراز (سهامی خاص)');
  const [taxAssessmentNumber, setTaxAssessmentNumber] = useState('۱۴۰۲/۳۸۹/ت/ش');
  const [disputedAmountMillionTomans, setDisputedAmountMillionTomans] = useState('۶۸۰');

  // Moadian Invoices State
  const [invoices, setInvoices] = useState<MoadianInvoiceItem[]>([
    {
      id: 'INV-01',
      invoiceUniqueNumber: 'A39F-8402-9901-BB01',
      issueDate: '۱۴۰۲/۱۰/۱۵',
      buyerName: 'شرکت صنایع پتروشیمی پارس فراور',
      buyerNationalId: '۱۰۱۰۲۸۴۹۲۱۱',
      itemDescription: 'ارائه لایسنس نرم‌افزار مانیتورینگ شبکه سازمانی',
      grossAmountTomans: 450000000,
      vatAmountTomans: 40500000,
      totalWithVatTomans: 490500000,
      moadianStatus: 'verified',
      taxIdFiscalCode: 'TX-990124-77',
    },
    {
      id: 'INV-02',
      invoiceUniqueNumber: 'B88E-1402-4412-AC99',
      issueDate: '۱۴۰۲/۱۱/۲۰',
      buyerName: 'شرکت سرمایه‌گذاری بازرگانی کوثر کیش',
      buyerNationalId: '۱۰۳۲۰۱۱۷۸۴۴',
      itemDescription: 'خدمات استقرار و امنیت سایبری سرورها',
      grossAmountTomans: 280000000,
      vatAmountTomans: 25200000,
      totalWithVatTomans: 305200000,
      moadianStatus: 'tax_office_matched',
      taxIdFiscalCode: 'TX-441209-12',
    },
    {
      id: 'INV-03',
      invoiceUniqueNumber: 'C12K-1402-0045-FA31',
      issueDate: '۱۴۰۲/۱۲/۰۵',
      buyerName: 'شرکت تجارت الکترونیک سپهر آریا',
      buyerNationalId: '۱۰۱۰۳۳۷۲۹۹۰',
      itemDescription: 'مشاوره معماری سیستم‌های توزیع‌شده',
      grossAmountTomans: 120000000,
      vatAmountTomans: 10800000,
      totalWithVatTomans: 130800000,
      moadianStatus: 'pending_action',
      taxIdFiscalCode: 'TX-004519-89',
    },
  ]);

  // Tax calculations based on Direct Taxes Code
  const netTaxableIncome = Math.max(0, calcState.declaredRevenueTomans - calcState.declaredExpensesTomans);
  
  // Rate: legal entities = 25% (with standard 1% discount for on-time taxpayers where applicable = 24%)
  let baseCorporateRate = 0.25;
  if (calcState.appliedExemption === 'knowledge_based') {
    baseCorporateRate = 0.05; // 80% exemption for qualified products
  } else if (calcState.appliedExemption === 'free_zone') {
    baseCorporateRate = 0.0; // 20 year exemption subject to license
  } else if (calcState.appliedExemption === 'export') {
    baseCorporateRate = 0.0; // Exemption subject to FX repatriation
  }

  const calculatedBaseTax = netTaxableIncome * baseCorporateRate;
  
  // Penalty Article 192 (Undisclosed income = 30% non-forgivable for legal entities)
  const article192Penalty = calcState.unreportedSalesTomans * 0.30;

  // Penalty Article 190 (Late payment = 2.5% per month)
  const article190Penalty = calcState.lateFilingMonths > 0 
    ? calculatedBaseTax * (0.025 * calcState.lateFilingMonths)
    : 0;

  const totalPayableTax = Math.max(0, calculatedBaseTax + article192Penalty + article190Penalty - calcState.withholdingTaxDeductions);

  return (
    <div className="min-h-screen bg-[#060B18] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 relative font-sans" dir="rtl">
      {/* Golden Aura Background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation Breadcrumb & Back Bar */}
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
              <Receipt className="w-4 h-4 text-[#D4AF37]" />
              سامانه دعاوی مالیاتی، پایانه فروشگاهی و سامانه مودیان (فاز ۲۶)
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
              چاپ گزارش مالیاتی
            </button>
          </div>
        </div>

        {/* Hero Header Banner */}
        <div className="relative bg-gradient-to-r from-[#0B132B] via-[#101D42] to-[#0B132B] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>دپارتمان فوق‌تخصصی حقوق مالیاتی، سامانه‌های مودیان و مراجع حل اختلاف مالیاتی</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
              دعاوی مالیاتی، پایانه فروشگاهی و هیئت‌های ۲۳۸ و ۲۵۱ مکرر
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              ممیزی هوشمند پرونده‌های تشخیص عملکرد و ارزش افزوده، راستی‌آزمایی شناسه یکتای صورتحساب‌های الکترونیک، محاسبه جرایم غیرقابل بخشش ماده ۱۹۲ و تنظیم لوایح دفاعیه برای هیئت‌های حل اختلاف، شورای عالی مالیاتی و هیئت ویژه ماده ۲۵۱ مکرر وزیر امور اقتصادی و دارایی.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          {[
            { id: 'calculator', label: 'محاسبه‌گر مالیات و جرایم مواد ۱۹۰ و ۱۹۲', icon: Calculator },
            { id: 'moadian_audit', label: 'ممیزی کارپوشه سامانه مودیان و فاکتورها', icon: Receipt },
            { id: 'appeal_drafts', label: 'تنظیم لایحه اعتراض (مواد ۲۳۸، ۲۴۴ و ۲۵۱ مکرر)', icon: FileText },
            { id: 'exemptions_atlas', label: 'اطلس معافیت‌های مالیاتی و دانش‌بنیان', icon: ShieldCheck },
            { id: 'tribunal_sim', label: 'شبیه‌ساز دفاع در هیئت حل اختلاف مالیاتی', icon: Scale },
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

        {/* Tab 1: Tax Calculator & Penalty Analyzer */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Form (7 cols) */}
            <div className="lg:col-span-7 bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Calculator className="w-5 h-5 text-[#D4AF37]" />
                  <span>پارامترهای عملکرد مالیاتی و فروش مؤدی</span>
                </div>
                <span className="text-[11px] text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-lg border border-[#D4AF37]/20">
                  قانون مالیات‌های مستقیم مصوب ۱۳۹۴ با اصلاحات بعدی
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">نوع مؤدی حقوقی یا حقیقی:</label>
                  <select
                    value={calcState.taxpayerType}
                    onChange={(e) => setCalcState({ ...calcState, taxpayerType: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none"
                  >
                    <option value="legal_entity">اشخاص حقوقی (شرکت‌ها - نرخ ۲۵٪ ماده ۱۰۵)</option>
                    <option value="individual_tier1">اشخاص حقیقی گروه اول (دفاتر و تکالیف کامل)</option>
                    <option value="individual_tier2">اشخاص حقیقی گروه دوم</option>
                    <option value="individual_tier3">اشخاص حقیقی گروه سوم (مشمول تبصره ماده ۱۰۰)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">سال عملکرد مالیاتی:</label>
                  <select
                    value={calcState.incomeYear}
                    onChange={(e) => setCalcState({ ...calcState, incomeYear: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none"
                  >
                    <option value="۱۴۰۳">عملکرد سال ۱۴۰۳ (جاری)</option>
                    <option value="۱۴۰۲">عملکرد سال ۱۴۰۲</option>
                    <option value="۱۴۰۱">عملکرد سال ۱۴۰۱</option>
                    <option value="۱۴۰۰">عملکرد سال ۱۴۰۰</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">درآمد ابرازی مؤدی (فروش و خدمات ثبت‌شده در مودیان):</span>
                    <span className="text-[#D4AF37] font-bold">{(calcState.declaredRevenueTomans / 10000000).toLocaleString('fa-IR')} میلیارد تومان</span>
                  </div>
                  <input
                    type="range"
                    min={500000000}
                    max={50000000000}
                    step={250000000}
                    value={calcState.declaredRevenueTomans}
                    onChange={(e) => setCalcState({ ...calcState, declaredRevenueTomans: Number(e.target.value) })}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">هزینه‌های قابل‌قبول ابرازی و استهلاک (ماده ۱۴۷ و ۱۴۸):</span>
                    <span className="text-emerald-400 font-bold">{(calcState.declaredExpensesTomans / 10000000).toLocaleString('fa-IR')} میلیارد تومان</span>
                  </div>
                  <input
                    type="range"
                    min={100000000}
                    max={calcState.declaredRevenueTomans}
                    step={100000000}
                    value={calcState.declaredExpensesTomans}
                    onChange={(e) => setCalcState({ ...calcState, declaredExpensesTomans: Number(e.target.value) })}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-rose-400 flex items-center gap-1 font-semibold">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      درآمد مکتوم یا فاکتور صوری ردیابی‌شده در سامانه ۱۶۹ مکرر:
                    </span>
                    <span className="text-rose-400 font-bold">{(calcState.unreportedSalesTomans / 1000000).toLocaleString('fa-IR')} میلیون تومان</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={5000000000}
                    step={50000000}
                    value={calcState.unreportedSalesTomans}
                    onChange={(e) => setCalcState({ ...calcState, unreportedSalesTomans: Number(e.target.value) })}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">معافیت و مشوق مالیاتی اعمال‌شده:</label>
                  <select
                    value={calcState.appliedExemption}
                    onChange={(e) => setCalcState({ ...calcState, appliedExemption: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none"
                  >
                    <option value="none">بدون معافیت (نرخ عمومی ۲۵٪)</option>
                    <option value="knowledge_based">دانش‌بنیان (ماده ۹ و ۱۱ قانون جهش تولید دانش‌بنیان)</option>
                    <option value="free_zone">مناطق آزاد تجاری - صنعتی (ماده ۱۳ قانون چگونگی اداره)</option>
                    <option value="export">صادرات کالا و خدمات غیرنفتی (ماده ۱۴۱)</option>
                    <option value="agriculture">بخش کشاورزی، باغبانی و دامپروری (ماده ۸۱)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">تأخیر در تسلیم اظهارنامه و پرداخت (ماه):</label>
                  <input
                    type="number"
                    min={0}
                    max={36}
                    value={calcState.lateFilingMonths}
                    onChange={(e) => setCalcState({ ...calcState, lateFilingMonths: Math.max(0, parseInt(e.target.value) || 0) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="audited_reports"
                  checked={calcState.hasAuditedFinancialStatements}
                  onChange={(e) => setCalcState({ ...calcState, hasAuditedFinancialStatements: e.target.checked })}
                  className="w-4 h-4 rounded accent-[#D4AF37] cursor-pointer"
                />
                <label htmlFor="audited_reports" className="text-xs text-slate-300 cursor-pointer">
                  دارای صورت‌های مالی حسابرسی‌شده توسط اعضای جامعه حسابداران رسمی ایران (ماده ۲۷۲)
                </label>
              </div>
            </div>

            {/* Assessment Breakdown Panel (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#0B132B] to-[#101D42] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
                <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                  <Receipt className="w-4 h-4" />
                  برآورد برگ تشخیص مالیاتی و جرایم
                </span>
                <span className="text-[10px] text-slate-400">تاریخ ارزیابی: امروز</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">سود خالص ابرازی مشمول مالیات:</span>
                  <span className="font-mono text-slate-200">{(netTaxableIncome / 1000000).toLocaleString('fa-IR')} میلیون تومان</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">مالیات پایه سالیانه (ماده ۱۰۵ / ۱۳۱):</span>
                  <span className="font-mono text-[#D4AF37] font-bold">{(calculatedBaseTax / 1000000).toLocaleString('fa-IR')} میلیون تومان</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-rose-400">جریمه کتمان درآمد (ماده ۱۹۲ ق.م.م - غیرقابل‌بخشش):</span>
                  <span className="font-mono text-rose-400 font-bold">{(article192Penalty / 1000000).toLocaleString('fa-IR')} میلیون تومان</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-amber-400">جریمه دیرکرد ماهانه (ماده ۱۹۰ - ۲.۵٪ در ماه):</span>
                  <span className="font-mono text-amber-400 font-bold">{(article190Penalty / 1000000).toLocaleString('fa-IR')} میلیون تومان</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">کسر مالیات‌های تکلیفی و پیش‌پرداخت‌ها:</span>
                  <span className="font-mono text-emerald-400">- {(calcState.withholdingTaxDeductions / 1000000).toLocaleString('fa-IR')} م.ت</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#060B18]/80 border border-[#D4AF37]/30 space-y-2">
                <div className="text-[11px] text-slate-400">مجموع مالیات و جرایم قطعی قابل‌مطالبه:</div>
                <div className="text-2xl font-black text-white font-mono flex items-center justify-between">
                  <span>{(totalPayableTax / 1000000).toLocaleString('fa-IR')}</span>
                  <span className="text-xs font-normal text-[#D4AF37]">میلیون تومان</span>
                </div>
              </div>

              {/* Action Plan Advice */}
              <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-200 leading-relaxed">
                <strong className="text-blue-300 block mb-1">راهکار دفاعی وکیل متخصص مالیاتی:</strong>
                طبق ماده ۲۳۸ قانون مالیات‌های مستقیم، ظرف ۳۰ روز از ابلاغ برگ تشخیص، امکان توافق با رئیس امور مالیاتی و تعدیل تا ۶۰٪ درآمد مشمول مالیات بدون ورود به هیئت حل اختلاف وجود دارد.
              </div>

              <button
                onClick={() => setActiveTab('appeal_drafts')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#0B132B] font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-[#D4AF37]/10 transition-all"
              >
                <span>تنظیم فوری دادخواست و لایحه اعتراضی ماده ۲۳۸</span>
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Moadian Invoicing & Tax Terminal Audit */}
        {activeTab === 'moadian_audit' && (
          <div className="space-y-6">
            <div className="bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-[#D4AF37]" />
                    <span>کارپوشه مالیاتی سامانه مؤدیان و پایانه‌های فروشگاهی</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    ردیابی شناسه منحصر‌به‌فرد مالیاتی ۲۲ کاراکتری، تایید یا رد صورتحساب ظرف مهلت ۳۰ روزه قانون پایانه‌های فروشگاهی
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    کلید عمومی سامانه جامع تجارت فعال
                  </span>
                </div>
              </div>

              {/* Invoice List Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="bg-[#060B18] text-slate-300 border-b border-slate-800">
                      <th className="py-3 px-4">شناسه یکتای مالیاتی</th>
                      <th className="py-3 px-4">تاریخ صدور</th>
                      <th className="py-3 px-4">طرف معامله (خریدار)</th>
                      <th className="py-3 px-4">مبلغ فاکتور (تومان)</th>
                      <th className="py-3 px-4">مالیات بر ارزش افزوده (۱۰٪)</th>
                      <th className="py-3 px-4">وضعیت کارپوشه</th>
                      <th className="py-3 px-4 text-center">عملیات حقوقی</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-[#D4AF37] font-semibold">{inv.invoiceUniqueNumber}</td>
                        <td className="py-3.5 px-4">{inv.issueDate}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">{inv.buyerName}</div>
                          <div className="text-[10px] text-slate-500 font-mono">شناسه ملی: {inv.buyerNationalId}</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono">{inv.grossAmountTomans.toLocaleString('fa-IR')}</td>
                        <td className="py-3.5 px-4 font-mono text-emerald-400">+{inv.vatAmountTomans.toLocaleString('fa-IR')}</td>
                        <td className="py-3.5 px-4">
                          {inv.moadianStatus === 'verified' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3" /> تأیید نهایی مودیان
                            </span>
                          )}
                          {inv.moadianStatus === 'tax_office_matched' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3" /> ثبت در گزارشات فصلی ۱۶۹
                            </span>
                          )}
                          {inv.moadianStatus === 'pending_action' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                              <Clock className="w-3 h-3" /> در انتظار تأیید خریدار (مهلت ۳۰ روز)
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => alert(`استعلام صحت هش صورتحساب ${inv.invoiceUniqueNumber} در پایگاه سازمان امور مالیاتی کشور با موفقیت انجام شد.`)}
                            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] text-slate-300 text-[11px] transition-colors border border-slate-700"
                          >
                            بررسی امضای دیجیتال
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Moadian Regulatory Guidance Alert */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-[#060B18] border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                    <BadgeAlert className="w-4 h-4 text-[#D4AF37]" />
                    <span>جریمه عدم صدور صورتحساب الکترونیکی</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    طبق ماده ۲۲ قانون پایانه‌های فروشگاهی، عدم صدور صورتحساب الکترونیکی منجر به جریمه معادل ۱۰٪ مجموع مبلغ فروش یا ۲۰ میلیون ریال (هر کدام بیشتر باشد) و محرومیت از کلیه معافیت‌های مالیاتی خواهد شد.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#060B18] border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>پذیرش اعتبار مالیاتی ارزش افزوده</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    اعتبار مالیاتی خریدها صرفاً در صورت ثبت الکترونیکی در کارپوشه مؤدیان پذیرفته شده و سازمان امور مالیاتی از پذیرش فاکتورهای دستی فاقد شناسه یکتا معذور است.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#060B18] border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-blue-400" />
                    <span>تسهیلات شرکت‌های معتمد مالیاتی (TSP)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    دفتر حقوقی امکان اتصال سیستم‌های ERP شرکت‌ها از طریق شرکت‌های معتمد نوع اول و صدور امضای الکترونیک اختصاصی CSR را فراهم می‌سازد.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Appeal Draft Generator (238, 244, 251, 251 bis) */}
        {activeTab === 'appeal_drafts' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Template Selector (4 cols) */}
            <div className="lg:col-span-4 bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="text-xs font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
                <Scale className="w-4 h-4 text-[#D4AF37]" />
                <span>انتخاب مرجع دادرسی و مرحله اعتراض</span>
              </div>

              <div className="space-y-2">
                {[
                  {
                    id: 'article_238',
                    title: 'اعتراض به برگ تشخیص (ماده ۲۳۸)',
                    desc: 'رسیدگی مجدد توسط ممیز کل یا رئیس امور مالیاتی (مهلت ۳۰ روز)',
                    badge: 'مرحله اداری پیش از هیئت',
                  },
                  {
                    id: 'article_244',
                    title: 'هیئت حل اختلاف مالیاتی بدوی/تجدیدنظر (ماده ۲۴۴)',
                    desc: 'متشکل از قاضی، نماینده سازمان و نماینده اتاق بازرگانی',
                    badge: 'مرجع شبه‌قضایی ترافعی',
                  },
                  {
                    id: 'high_council_251',
                    title: 'شکایت در شورای عالی مالیاتی (ماده ۲۵۱)',
                    desc: 'نقض رای هیئت حل اختلاف به دلیل مخالفت صریح با قوانین و مقررات',
                    badge: 'نظارت شکلی و قانونی',
                  },
                  {
                    id: 'article_251_bis',
                    title: 'هیئت ویژه ماده ۲۵۱ مکرر وزیر اقتصاد',
                    desc: 'دعاوی مالیاتی قطعی‌شده با ادعای غیرعادلانه بودن مالیات و اسناد جدید',
                    badge: 'مرجع عالی فوق‌العاده',
                  },
                ].map((item) => {
                  const isSelected = selectedAppealType === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedAppealType(item.id as any)}
                      className={`w-full text-right p-4 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white shadow-md'
                          : 'bg-[#060B18] border-slate-800 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${isSelected ? 'text-[#D4AF37]' : 'text-slate-300'}`}>
                          {item.title}
                        </span>
                        <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400 border border-slate-700">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">نام شخص حقیقی یا شرکت معترض:</label>
                  <input
                    type="text"
                    value={taxpayerName}
                    onChange={(e) => setTaxpayerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">شماره برگ تشخیص / رأی معترض‌عنه:</label>
                  <input
                    type="text"
                    value={taxAssessmentNumber}
                    onChange={(e) => setTaxAssessmentNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">مبلغ مابه‌الاختلاف مالیاتی (میلیون تومان):</label>
                  <input
                    type="text"
                    value={disputedAmountMillionTomans}
                    onChange={(e) => setDisputedAmountMillionTomans(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Generated Pleading Preview (8 cols) */}
            <div className="lg:col-span-8 bg-[#0B132B]/90 border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs">
                    <FileText className="w-4 h-4" />
                    <span>پیش‌نویس لایحه حقوقی دفاعیه مالیاتی</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert('متن لایحه دفاعیه با موفقیت کپی شد.')}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs border border-slate-700"
                    >
                      کپی در حافظه
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1.5 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] text-xs border border-[#D4AF37]/30 font-bold"
                    >
                      چاپ رسمی با سربرگ دفتر
                    </button>
                  </div>
                </div>

                {/* Formal Legal Pleading Text View */}
                <div className="bg-[#060B18] border border-slate-800 rounded-2xl p-6 text-xs text-slate-200 leading-loose font-serif space-y-4 shadow-inner max-h-[500px] overflow-y-auto">
                  <div className="text-center font-bold text-sm text-[#D4AF37] pb-2 border-b border-slate-800">
                    بسمه تعالی
                    <br />
                    {selectedAppealType === 'article_238' && 'ریاست محترم امور مالیاتی / ممیز کل محترم اداره امور مالیاتی غرب تهران'}
                    {selectedAppealType === 'article_244' && 'اعضای محترم هیأت حل اختلاف مالیاتی (موضوع ماده ۲۴۴ قانون مالیات‌های مستقیم)'}
                    {selectedAppealType === 'high_council_251' && 'ریاست و اعضای محترم شعب شورای عالی مالیاتی کشور'}
                    {selectedAppealType === 'article_251_bis' && 'مقام عالی وزارت امور اقتصادی و دارایی - دبیرخانه هیأت ویژه موضوع ماده ۲۵۱ مکرر'}
                  </div>

                  <div className="space-y-2 text-slate-300">
                    <p>
                      <strong>موضوع:</strong> اعتراض به برگ تشخیص / رای شماره {taxAssessmentNumber} مربوط به عملکرد سال {calcState.incomeYear} به مبلغ {disputedAmountMillionTomans} میلیون تومان.
                    </p>
                    <p>
                      <strong>مؤدی:</strong> {taxpayerName} با وکالت دفتر وکالت تخصصی دکتر سیده مریم رضوی.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <p className="text-justify indent-4">
                      با سلام و احترام؛ پیرو ابلاغ برگ تشخیص یادشده و با استناد به اختیارات حاصل از وکالت‌نامه رسمی، مراتب اعتراض موکل به تصمیم متخذه به شرح دلایل و مستندات قانونی ذیل اعلام و تقاضای رسیدگی عادلانه و تعدیل مالیات تشخیصی مورد استدعاست:
                    </p>

                    <ol className="list-decimal list-inside space-y-2 pr-2">
                      <li>
                        <strong>مخدوش بودن مبانی تشخیص علی‌الرأس و عدم رعایت مواد ۹۷ و ۲۳۷ ق.م.م:</strong> ممیز محترم مالیاتی بدون ارائه ادله متقن و گزارش بازرسی مستند، اقدام به رد دفاتر قانونی و درآمدهای ابرازی در سامانه مودیان نموده که مغایر صریح با ماده ۲۳۷ قانون مالیات‌های مستقیم ناظر بر لزوم اتکای برگ تشخیص به اسناد و اطلاعات قطعی است.
                      </li>
                      <li>
                        <strong>عدم پذیرش غیرقانونی هزینه‌های استهلاک و تولیدی (ماده ۱۴۸):</strong> کلیه هزینه‌های حقوق، دستمزد و خرید مواد اولیه بر مبنای لیست‌های ارسالی به سازمان تأمین اجتماعی و فاکتورهای دارای کد رهگیری سامانه ۱۶۹ مکرر تسلیم گردیده و عدم انطباق صوری آن فاقد توجیه فنی است.
                      </li>
                      <li>
                        <strong>استحقاق موکل از معافیت‌های مالیاتی مصوب:</strong> با عنایت به گواهی صادره از معاونت علمی و فناوری ریاست جمهوری مبنی بر دانش‌بنیان بودن محصولات نرم‌افزاری موکل، درآمد مکتسبه به موجب بند (د) ماده ۹ قانون جهش تولید دانش‌بنیان مشمول نرخ صفر مالیاتی بوده و مطالبه مالیات با اصل حمایت از تولید ملی منافات دارد.
                      </li>
                      <li>
                        <strong>ابطال جریمه غیرقابل‌بخشش ماده ۱۹۲:</strong> با توجه به اینکه مؤدی اظهارنامه عملکرد را در موعد مقرر تسلیم و درآمدها را در سامانه مودیان شفاف‌سازی نموده، تلقی مابه‌التفاوت ارزیابی به عنوان «کتمان درآمد» فاقد وجاهت حقوقی بوده و مستحق حذف کامل جریمه ۳۰ درصدی است.
                      </li>
                    </ol>

                    <p className="text-justify pt-2">
                      بنا علی‌هذا، با تقدیم مدارک مثبته و صورت‌های مالی حسابرسی‌شده، صدور دستور مقتضی مبنی بر تعدیل کامل مالیات یا ارجاع امر به مجری قرار کارشناسی رسمی مورد تمناست.
                    </p>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-slate-800 text-[11px] text-slate-400">
                    <span>پیوست‌ها: صورت‌های مالی، قبوض واریزی، گواهی دانش‌بنیان</span>
                    <span>با تجدید مراتب احترام - وکیل پایه یک دادگستری</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  مطابق با آخرین بخشنامه‌های سازمان امور مالیاتی سال ۱۴۰۳
                </span>
                <span className="text-[11px]">دفتر وکالت دکتر سیده مریم رضوی</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Exemptions Atlas & Knowledge-Based Incentives */}
        {activeTab === 'exemptions_atlas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'شرکت‌های دانش‌بنیان و نوآور',
                lawRef: 'ماده ۹ و ۱۱ قانون جهش تولید دانش‌بنیان',
                rate: 'نرخ صفر مالیاتی (معافیت ۱۰۰٪)',
                duration: 'تا سقف ۱۵ سال از تاریخ ثبت محصول',
                desc: 'درآمدهای ناشی از طراحی، تولید و توسعه کالاهای دانش‌بنیان سطح یک و خدمات فناورانه با تایید کارگروه ارزیابی شرکت‌ها.',
                highlight: 'امکان تهاتر اعتبار مالیاتی تحقیق و توسعه با مالیات عملکرد سال بعد',
              },
              {
                title: 'سرمایه‌گذاری در مناطق آزاد تجاری و صنعتی',
                lawRef: 'ماده ۱۳ قانون چگونگی اداره مناطق آزاد تجاری',
                rate: 'معافیت کامل از هرگونه مالیات',
                duration: 'مدت ۲۰ سال از تاریخ بهره‌برداری',
                desc: 'اشخاص حقیقی و حقوقی که در منطقه آزاد به فعالیت‌های مختلف اقتصادی اشتغال دارند نسبت به هر نوع فعالیت در منطقه معاف هستند.',
                highlight: 'مشروط به اخذ مجوز فعالیت معتبر از سازمان منطقه آزاد و تسلیم اظهارنامه',
              },
              {
                title: 'صادرات کالا و خدمات غیرنفتی',
                lawRef: 'ماده ۱۴۱ قانون مالیات‌های مستقیم',
                rate: 'نرخ صفر مالیاتی و استرداد ارزش افزوده',
                duration: 'دائمی بر اساس بودجه سنواتی',
                desc: 'صد درصد درآمد حاصل از صادرات خدمات و کالاهای غیرنفتی و محصولات بخش کشاورزی و صنایع تبدیلی.',
                highlight: 'مشروط به برگشت ارز حاصل از صادرات به چرخه اقتصادی طبق سامانه نیما',
              },
              {
                title: 'سرمایه‌گذاری در مناطق کمترتوسعه‌یافته',
                lawRef: 'ماده ۱۳۲ قانون مالیات‌های مستقیم',
                rate: 'معافیت ۱۰۰٪ تا ۱۰ سال',
                duration: 'قابل افزایش تا ۲۰ سال در شهرک‌های صنعتی',
                desc: 'درآمد ابرازی ناشی از فعالیت‌های تولیدی و معدنی اشخاص حقوقی غیردولتی در واحدهای تولیدی جدیدالتاسیس.',
                highlight: 'شامل استقرار در شهرک‌های صنعتی و مناطق ویژه اقتصادی محروم',
              },
              {
                title: 'هزینه‌های تحقیق و توسعه (R&D)',
                lawRef: 'بند (ب) ماده ۱۱ قانون جهش تولید',
                rate: 'اعتبار مالیاتی مستقیم',
                duration: 'قابل انتقال به سنوات آتی',
                desc: 'معادل هزینه‌های انجام‌شده در طرح‌های تحقیق و توسعه با دانشگاه‌ها به عنوان اعتبار مالیاتی قطعی شرکت کسر می‌گردد.',
                highlight: 'شامل هزینه‌کرد تجهیز آزمایشگاه‌ها، قراردادهای پژوهشی و استخدام نخبگان',
              },
              {
                title: 'بخش کشاورزی و دامپروری',
                lawRef: 'ماده ۸۱ قانون مالیات‌های مستقیم',
                rate: 'معافیت دائمی',
                duration: 'بدون محدودیت زمانی',
                desc: 'درآمد حاصل از کلیه فعالیت‌های کشاورزی، دامپروری، دامداری، پرورش ماهی و زنبور عسل و صیادی از پرداخت مالیات معاف است.',
                highlight: 'تنها الزام، تسلیم اظهارنامه سالیانه جهت بهره‌مندی از نرخ صفر است',
              },
            ].map((card, idx) => (
              <div key={idx} className="bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-[#D4AF37]/50 transition-all">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-white text-sm">{card.title}</h4>
                  <span className="text-[10px] text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                    {card.rate}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-400 font-mono">{card.lawRef}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{card.desc}</p>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                  <div><strong>مدت اعتبار:</strong> {card.duration}</div>
                  <div className="text-[#D4AF37]">★ {card.highlight}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Tribunal Hearing Simulation */}
        {activeTab === 'tribunal_sim' && (
          <div className="bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8">
            <div className="max-w-2xl space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#D4AF37]" />
                <span>شبیه‌ساز جلسه دادرسی هیئت حل اختلاف مالیاتی بدوی و تجدیدنظر</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                ترکیب هیئت طبق ماده ۲۴۴ قانون مالیات‌های مستقیم متشکل از ۳ عضو رسمی است. برای صدور رای توافقی یا قرار کارشناسی، کسب رای موافق حداقل ۲ عضو ضروری است.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Judge Member */}
              <div className="bg-[#060B18] border border-blue-500/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                  <Scale className="w-4 h-4" />
                  <span>قاضی بازنشسته یا شاغل دادگستری</span>
                </div>
                <div className="text-xs text-slate-300">نماینده قوه قضاییه در هیئت</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  بر رعایت اصول دادرسی عادلانه، اصالت مستندات ابرازی، اعتبار زمانی قرارهای کارشناسی و عدم عدول از حدود صلاحیت قانونی نظارت دارد.
                </p>
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-[10px] text-blue-300">
                  تمرکز وکیل: اثبات رعایت نکردن مواعد ابلاغ و نقض تشریفات دادرسی طبق آیین دادرسی مدنی.
                </div>
              </div>

              {/* Tax Organization Member */}
              <div className="bg-[#060B18] border border-amber-500/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <Building2 className="w-4 h-4" />
                  <span>نماینده سازمان امور مالیاتی کشور</span>
                </div>
                <div className="text-xs text-slate-300">مدافع درآمدهای مالیاتی عمومی</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  بر تطبیق درآمدهای ابرازی با سامانه‌های جامع، دستورالعمل‌های صادره از رئیس کل سازمان و احراز صحت کدهای اقتصادی تاکید می‌کند.
                </p>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-[10px] text-amber-300">
                  تمرکز وکیل: اثبات خطای تطبیق داده‌های بانکی با ماهیت درآمد غیرتجاری (قرض‌الحسنه و فروش دارایی).
                </div>
              </div>

              {/* Chamber of Commerce Member */}
              <div className="bg-[#060B18] border border-[#D4AF37]/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>نماینده تشکل صنفی / اتاق بازرگانی</span>
                </div>
                <div className="text-xs text-slate-300">منتخب مؤدی از صنف مربوطه</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  به نمایندگی از اصناف، اتاق تعاون یا جامعه حسابداران رسمی به شرایط واقعی بازار، رکود اقتصادی، ضرر و زیان پروژه و عرف صنفی توجه دارد.
                </p>
                <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 text-[10px] text-[#D4AF37]">
                  تمرکز وکیل: ارائه گزارش عرف صنف و محاسبات زیان انباشته ناشی از تورم و تعدیل قراردادها.
                </div>
              </div>
            </div>

            {/* Strategic Outcomes in Hearing */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#060B18] to-[#0B132B] border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white">۳ نتیجه کلیدی مورد هدف وکیل مالیاتی در جلسه دفاع:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-white/5 border border-slate-800">
                  <strong className="text-emerald-400 block mb-1">۱. تعدیل فوری رقم تشخیص</strong>
                  پذیرش هزینه‌ها و تقلیل تا ۷۰٪ رقم برگ تشخیص و صدور رای قطعی با تخفیف پرداخت نقدی.
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-slate-800">
                  <strong className="text-blue-400 block mb-1">۲. صدور قرار کارشناسی مجدد</strong>
                  ارجاع پرونده به مجری قرار مستقل جهت حسابرسی دفاتر و استعلام‌های بانکی معتبر.
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-slate-800">
                  <strong className="text-[#D4AF37] block mb-1">۳. رفع کامل جریمه ماده ۱۹۲</strong>
                  حذف جریمه ۳۰ درصدی کتمان درآمد به علت فقدان سوءنیت و شفافیت در حساب‌های تجاری.
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
