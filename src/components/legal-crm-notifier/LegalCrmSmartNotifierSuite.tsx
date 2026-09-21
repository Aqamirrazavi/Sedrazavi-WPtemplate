import React, { useState } from 'react';
import {
  Users,
  Calendar,
  Receipt,
  Bell,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Coins,
  Send,
  Printer,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  FileText,
  Lock,
  Search,
  Sliders,
  Award,
  AlertTriangle
} from 'lucide-react';

interface ClientRecord {
  id: string;
  name: string;
  type: 'corporate' | 'vip_individual' | 'standard';
  nationalId: string;
  phone: string;
  activeCasesCount: number;
  totalFeesBillionTomans: number;
  unpaidFeesMillionTomans: number;
  lastInteraction: string;
  status: 'active' | 'in_progress' | 'settled';
}

interface HearingDeadlineAlert {
  id: string;
  clientName: string;
  caseNumber: string;
  courtBranch: string;
  hearingDateTime: string;
  daysRemaining: number;
  alertChannels: { sms: boolean; email: boolean; app: boolean };
  urgency: 'high' | 'medium' | 'normal';
  hearingTopic: string;
}

export const LegalCrmSmartNotifierSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const [activeTab, setActiveTab] = useState<'clients' | 'invoicing' | 'hearings_notifier' | 'pleading_exchange' | 'analytics'>('clients');

  // Client Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<string>('CLI-101');

  // Invoicing Parameters
  const [billingCaseTitle, setBillingCaseTitle] = useState('پرونده داوری تجاری بین‌المللی و اجرای رأی پاریس');
  const [totalAgreedFeeMillionTomans, setTotalAgreedFeeMillionTomans] = useState<number>(450);
  const [installmentStage, setInstallmentStage] = useState<'initial_retainer' | 'pleading_filing' | 'verdict_success'>('initial_retainer');

  // Clients Data
  const [clients, setClients] = useState<ClientRecord[]>([
    {
      id: 'CLI-101',
      name: 'هلدینگ سرمایه‌گذاری بین‌المللی افق پارس',
      type: 'corporate',
      nationalId: '۱۰۱۰۴۹۸۲۱۴۰',
      phone: '۰۲۱-۸۸۸۸۴۳۲۱',
      activeCasesCount: 4,
      totalFeesBillionTomans: 1.8,
      unpaidFeesMillionTomans: 250,
      lastInteraction: 'امروز، ۱۰:۳۰',
      status: 'active',
    },
    {
      id: 'CLI-102',
      name: 'مهندس بهزاد رادمنش (مالک برج پارسه)',
      type: 'vip_individual',
      nationalId: '۰۰۷۶۵۴۳۲۱۰',
      phone: '۰۹۱۲۱۱۱۴۳۲۱',
      activeCasesCount: 1,
      totalFeesBillionTomans: 0.65,
      unpaidFeesMillionTomans: 0,
      lastInteraction: 'دیروز، ۱۶:۰۰',
      status: 'active',
    },
    {
      id: 'CLI-103',
      name: 'شرکت پترو تجهیز صنعت آریا',
      type: 'corporate',
      nationalId: '۱۰۳۲۰۸۷۴۵۶۱',
      phone: '۰۲۱-۲۲۰۹۸۷۶۵',
      activeCasesCount: 2,
      totalFeesBillionTomans: 0.9,
      unpaidFeesMillionTomans: 120,
      lastInteraction: '۳ روز پیش',
      status: 'in_progress',
    },
  ]);

  // Deadlines & Hearings Data
  const [hearings, setHearings] = useState<HearingDeadlineAlert[]>([
    {
      id: 'HRG-01',
      clientName: 'هلدینگ سرمایه‌گذاری بین‌المللی افق پارس',
      caseNumber: '۱۴۰۲/۳۸۹/ت/ش',
      courtBranch: 'شعبه ۵۴ دادگاه تجدیدنظر استان تهران',
      hearingDateTime: '۱۴۰۳/۰۷/۰۴ - ساعت ۱۰:۳۰ صبح',
      daysRemaining: 3,
      alertChannels: { sms: true, email: true, app: true },
      urgency: 'high',
      hearingTopic: 'رسیدگی ماهوی به ادعای بطلان شرط داوری در قرارداد مشارکت EPC',
    },
    {
      id: 'HRG-02',
      clientName: 'مهندس بهزاد رادمنش',
      caseNumber: '۱۴۰۲/۹۸۲/مدنی',
      courtBranch: 'شعبه ۱۸ دادگاه عمومی حقوقی شهید بهشتی',
      hearingDateTime: '۱۴۰۳/۰۷/۱۲ - ساعت ۰۹:۰۰ صبح',
      daysRemaining: 11,
      alertChannels: { sms: true, email: false, app: true },
      urgency: 'medium',
      hearingTopic: 'اجرای قرار معاینه و تحقیق محلی توسط کارشناس رسمی راه‌وساختمان',
    },
    {
      id: 'HRG-03',
      clientName: 'شرکت پترو تجهیز صنعت آریا',
      caseNumber: '۱۴۰۲/۱۱۰۴/ک',
      courtBranch: 'شعبه ۳ دادگاه کیفری یک استان تهران',
      hearingDateTime: '۱۴۰۳/۰۷/۲۵ - ساعت ۱۱:۰۰ صبح',
      daysRemaining: 24,
      alertChannels: { sms: true, email: true, app: true },
      urgency: 'normal',
      hearingTopic: 'تبادل لوایح دفاعیه و ارائه اسناد حسابرسی جنایی بانکی',
    },
  ]);

  // Billing calculation according to Judiciary Attorney Fee Regulation 1398
  const currentInstallmentAmount = totalAgreedFeeMillionTomans * (
    installmentStage === 'initial_retainer' ? 0.40 : installmentStage === 'pleading_filing' ? 0.30 : 0.30
  );
  const withholdingTax5Percent = currentInstallmentAmount * 0.05; // ۵٪ مالیات علی‌الحساب ماده ۱۰۳ ق.م.م
  const lawyersSupportFund4Percent = currentInstallmentAmount * 0.04; // ۴٪ صندوق حمایت وکلا
  const barAssociationCoop1Percent = currentInstallmentAmount * 0.01; // ۱٪ صندوق تعاون کانون وکلا
  const netLawyerReceipt = currentInstallmentAmount - withholdingTax5Percent - lawyersSupportFund4Percent - barAssociationCoop1Percent;

  return (
    <div className="min-h-screen bg-[#060B18] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 relative font-sans" dir="rtl">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

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
              <Users className="w-4 h-4 text-[#D4AF37]" />
              مرکز مدیریت موکلین CRM، صدور قبوض و آلارم جلسات دادرسی (فاز ۳۰)
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
              چاپ صورتحساب حق‌الوکاله
            </button>
          </div>
        </div>

        {/* Hero Header Banner */}
        <div className="relative bg-gradient-to-r from-[#0B132B] via-[#161233] to-[#0B132B] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>سیستم یکپارچه مدیریت ارتباط با موکلین و اتوماسیون هوشمند دفتر وکالت</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
              مرکز هوشمند CRM حقوقی، صدور فاکتور رسمی و آلارم جلسات دادگاه
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              مدیریت حرفه‌ای پرونده‌ها و قراردادهای الکترونیک وکالت، صدور فاکتور رسمی حق‌الوکاله با محاسبه خودکار کسورات مالیاتی ۵٪ و صندوق حمایت ۴٪، آلارم پیامکی هوشمند مواعد دادگاه به موکلین و وکلای پرونده، و درگاه اختصاصی تبادل و تایید لوایح حقوقی.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          {[
            { id: 'clients', label: 'میز کار مدیریت موکلین (CRM)', icon: Users },
            { id: 'invoicing', label: 'صدور صورتحساب حق‌الوکاله و فاکتور الکترونیک', icon: Receipt },
            { id: 'hearings_notifier', label: 'تقویم هوشمند جلسات و آلارم پیامکی', icon: Bell },
            { id: 'pleading_exchange', label: 'پورتال امن تبادل لایحه با موکل', icon: FileText },
            { id: 'analytics', label: 'داشبورد آماری نرخ پیروزی و عملکرد دفتر', icon: BarChart3 },
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

        {/* Tab 1: Client Management CRM */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">فهرست موکلین و پرونده‌های فعال</h3>
                    <p className="text-xs text-slate-400">ساماندهی ارتباطات، شماره تماس‌ها و وضعیت مطالبات حق‌الوکاله</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="جستجوی نام موکل یا شناسه ملی..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-9 pl-4 py-2 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs outline-none focus:border-[#D4AF37] w-64"
                    />
                  </div>
                  <button
                    onClick={() => alert('فرم افزودن موکل جدید باز شد.')}
                    className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#0B132B] font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-[#D4AF37]/20"
                  >
                    + تشکیل پرونده جدید
                  </button>
                </div>
              </div>

              {/* Clients Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="bg-[#060B18] text-slate-300 border-b border-slate-800">
                      <th className="py-3.5 px-4">نام موکل / سازمان</th>
                      <th className="py-3.5 px-4">نوع موکل</th>
                      <th className="py-3.5 px-4">شماره تماس / پیگیری</th>
                      <th className="py-3.5 px-4 text-center">پرونده‌ها</th>
                      <th className="py-3.5 px-4">حق‌الوکاله کل</th>
                      <th className="py-3.5 px-4">مانده بدهی</th>
                      <th className="py-3.5 px-4">آخرین تعامل</th>
                      <th className="py-3.5 px-4 text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {clients.map((c) => (
                      <tr key={c.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-bold text-white text-sm">{c.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">شناسه: {c.nationalId}</div>
                        </td>
                        <td className="py-4 px-4">
                          {c.type === 'corporate' && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[10px] font-bold">
                              شخص حقوقی / شرکتی
                            </span>
                          )}
                          {c.type === 'vip_individual' && (
                            <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] font-bold">
                              موکل ویژه VIP
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 font-mono text-slate-300">{c.phone}</td>
                        <td className="py-4 px-4 text-center">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-white font-bold font-mono">
                            {c.activeCasesCount}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-mono text-[#D4AF37] font-bold">
                          {c.totalFeesBillionTomans} میلیارد ت
                        </td>
                        <td className="py-4 px-4 font-mono">
                          {c.unpaidFeesMillionTomans > 0 ? (
                            <span className="text-rose-400 font-semibold">{c.unpaidFeesMillionTomans} م.ت</span>
                          ) : (
                            <span className="text-emerald-400">تسویه کامل</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-slate-400 text-[11px]">{c.lastInteraction}</td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => {
                              setSelectedClient(c.id);
                              setActiveTab('invoicing');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] text-slate-300 text-[11px] transition-colors border border-slate-700"
                          >
                            صدور صورتحساب
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Retainer Invoicing */}
        {activeTab === 'invoicing' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Receipt className="w-5 h-5 text-[#D4AF37]" />
                  <span>تنظیم پیش‌فاکتور رسمی حق‌الوکاله</span>
                </div>
                <span className="text-[11px] text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-lg border border-[#D4AF37]/20">
                  تعرفه حق‌الوکاله مصوب قوه قضاییه
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">عنوان پرونده و موضوع وکالت:</label>
                  <input
                    type="text"
                    value={billingCaseTitle}
                    onChange={(e) => setBillingCaseTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">مجموع حق‌الوکاله توافق‌شده قراردادی:</span>
                    <span className="text-[#D4AF37] font-bold">{totalAgreedFeeMillionTomans} میلیون تومان</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={2000}
                    step={10}
                    value={totalAgreedFeeMillionTomans}
                    onChange={(e) => setTotalAgreedFeeMillionTomans(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">مرحله دریافت حق‌الوکاله:</label>
                  <select
                    value={installmentStage}
                    onChange={(e) => setInstallmentStage(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none"
                  >
                    <option value="initial_retainer">پیش‌پرداخت اولیه هنگام انعقاد قرارداد (۴۰٪)</option>
                    <option value="pleading_filing">پس از ثبت دادخواست و تبادل اولین لایحه (۳۰٪)</option>
                    <option value="verdict_success">پس از صدور دادنامه و قطعیت رأی (۳۰٪ پاداش موفقیت)</option>
                  </select>
                </div>
              </div>

              {/* Regulatory Deductions Info */}
              <div className="p-4 rounded-2xl bg-[#060B18] border border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="font-bold text-[#D4AF37] mb-1">تسهیم قانونی کسورات مالیاتی و صنفی:</div>
                <div className="flex justify-between">
                  <span className="text-slate-400">مالیات علی‌الحساب ماده ۱۰۳ ق.م.م (۵٪):</span>
                  <span className="font-mono text-rose-400">{withholdingTax5Percent.toLocaleString('fa-IR')} م.ت</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">سهم صندوق حمایت وکلا و کارگشایان (۴٪):</span>
                  <span className="font-mono text-amber-400">{lawyersSupportFund4Percent.toLocaleString('fa-IR')} م.ت</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">سهم صندوق تعاون کانون وکلای دادگستری (۱٪):</span>
                  <span className="font-mono text-blue-400">{barAssociationCoop1Percent.toLocaleString('fa-IR')} م.ت</span>
                </div>
              </div>
            </div>

            {/* Official Invoice Preview */}
            <div className="lg:col-span-6 bg-gradient-to-b from-[#0B132B] to-[#101D42] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
                  <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                    <Receipt className="w-4 h-4" />
                    صورتحساب رسمی الکترونیک حق‌الوکاله
                  </span>
                  <span className="text-[10px] text-slate-400">شناسه مالیاتی معتبر</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#060B18]/90 border border-slate-800 space-y-3 text-xs">
                  <div className="text-center font-bold text-white text-sm pb-2 border-b border-slate-800">
                    دفتر وکالت و مشاوره حقوقی دکتر سیده مریم رضوی
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>موضوع: {billingCaseTitle}</span>
                    <span className="font-mono text-[#D4AF37]">INV-1403-908</span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400">مبلغ قسط متعلقه حق‌الوکاله:</span>
                      <span className="font-bold text-white font-mono">{currentInstallmentAmount.toLocaleString('fa-IR')} میلیون تومان</span>
                    </div>
                    <div className="flex justify-between text-rose-400">
                      <span>کسر ۵٪ مالیات بر درآمد علی‌الحساب:</span>
                      <span className="font-mono">-{withholdingTax5Percent.toLocaleString('fa-IR')} م.ت</span>
                    </div>
                    <div className="flex justify-between text-amber-400">
                      <span>کسر ۴٪ صندوق حمایت و ۱٪ تعاون:</span>
                      <span className="font-mono">-{(lawyersSupportFund4Percent + barAssociationCoop1Percent).toLocaleString('fa-IR')} م.ت</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm font-bold text-emerald-400">
                    <span>خالص دریافتی وکیل پس از تمبر مالیاتی:</span>
                    <span className="text-lg font-mono text-[#D4AF37]">{netLawyerReceipt.toLocaleString('fa-IR')} م.ت</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  onClick={() => alert('شناسه صورتحساب الکترونیکی با موفقیت به سامانه مودیان و کارپوشه ارسال شد.')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#0B132B] font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-[#D4AF37]/10 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>ارسال پیامک لینک پرداخت و شناسه صورتحساب به موکل</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Hearings Notifier & Auto SMS Alerts */}
        {activeTab === 'hearings_notifier' && (
          <div className="space-y-6">
            <div className="bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Bell className="w-5 h-5 text-[#D4AF37]" />
                    <span>آلارم خودکار مواعد دادرسی، تبادل لوایح و جلسات دادگاه</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    سامانه هوشمند هشدار چندکاناله (پیامک، تماس صوتی و پوش نوتیفیکیشن) ۷۲ ساعت، ۲۴ ساعت و ۳ ساعت پیش از جلسه
                  </p>
                </div>
                <button
                  onClick={() => alert('تنظیمات درگاه پیامکی ثنا و کاوه‌نگار با موفقیت بروزرسانی شد.')}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] text-slate-300 text-xs border border-slate-700"
                >
                  پیکربندی درگاه پیامک
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hearings.map((h) => (
                  <div key={h.id} className="bg-[#060B18] border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-[#D4AF37]/50 transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] text-[#D4AF37] font-mono">{h.caseNumber}</span>
                        <div className="font-bold text-white text-xs mt-0.5">{h.clientName}</div>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        h.urgency === 'high' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                      }`}>
                        {h.daysRemaining} روز مانده
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 font-semibold">{h.courtBranch}</div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                      <div><strong>زمان دادگاه:</strong> {h.hearingDateTime}</div>
                      <div className="text-slate-300 pt-1">{h.hearingTopic}</div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> پیامک ارسال شد
                      </span>
                      <button
                        onClick={() => alert(`پیامک یادآوری جلسه دادگاه برای موکل ${h.clientName} با موفقیت مجدداً ارسال گردید.`)}
                        className="text-[#D4AF37] hover:underline"
                      >
                        ارسال مجدد آلارم
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Pleading Secure Exchange */}
        {activeTab === 'pleading_exchange' && (
          <div className="bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="max-w-2xl space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#D4AF37]" />
                <span>پورتال امن تبادل پیش‌نویس لوایح و اخذ تاییدیه الکترونیک موکل</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                پیش از بارگذاری لایحه در خودکاربری سامانه عدل‌ایران، موکل متن لایحه دفاعیه را مطالعه و با ارسال کد رمز یکبارمصرف (OTP)، موافقت کتبی خود با خط‌مشی دفاعی وکیل را اعلام می‌دارد.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-[#060B18] border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>تأییدیه الکترونیک با احراز هویت پیامکی</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ثبت تاریخچه دقیق (Audit Log) زمان مشاهده، دانلود و تایید پیش‌نویس لایحه توسط موکل به همراه آدرس IP و امضای هش رمزنگاری‌شده.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#060B18] border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-[#D4AF37] flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>پیشگیری از ادعاهای ناهماهنگی در دادرسی</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  تضمین انطباق کامل اقاریر و ادعاهای مطروحه با واقعیت تجاری پرونده و پیشگیری از دعاوی مسئولیت حرفه‌ای و انتظامی علیه دفتر وکالت.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Analytics Dashboard */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'نرخ کل موفقیت و برائت در پرونده‌ها', value: '۸۹.۴٪', change: '+۳.۲٪ نسبت به سال گذشته', color: 'text-emerald-400' },
                { title: 'تعداد پرونده‌های در جریان', value: '۴۲ پرونده', change: '۲۸ پرونده تجاری، ۱۴ کیفری', color: 'text-[#D4AF37]' },
                { title: 'میانگین زمان حل و فصل دعاوی', value: '۷.۲ ماه', change: '۴۰٪ سریع‌تر از میانگین محاکم', color: 'text-blue-400' },
                { title: 'شاخص رضایت‌مندی موکلین (NPS)', value: '۹۶ / ۱۰۰', change: 'بر مبنای بازخورد ۵۴ موکل شرکتی', color: 'text-purple-400' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#0B132B]/80 border border-slate-800 rounded-2xl p-5 space-y-2">
                  <div className="text-xs text-slate-400">{stat.title}</div>
                  <div className={`text-2xl font-black font-mono ${stat.color}`}>{stat.value}</div>
                  <div className="text-[10px] text-slate-500">{stat.change}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
