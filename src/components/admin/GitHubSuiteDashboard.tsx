import React, { useState } from 'react';
import { 
  GitBranch, GitCommit, GitPullRequest, AlertCircle, CheckCircle2, 
  Copy, Check, Search, ShieldCheck, Terminal, BookOpen, Layers, 
  ExternalLink, Sparkles, RefreshCw, Download
} from 'lucide-react';

interface GitHubSuiteDashboardProps {
  onBackToAdmin?: () => void;
}

export const GitHubSuiteDashboard: React.FC<GitHubSuiteDashboardProps> = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'issues' | 'commits' | 'ledger' | 'docs'>('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [issueFilter, setIssueFilter] = useState<'all' | 'open' | 'closed'>('open');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<'main' | 'themes' | 'plugin-suite'>('main');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusMessage, setSyncStatusMessage] = useState<string | null>(null);
  const [importingArchetype, setImportingArchetype] = useState<string | null>(null);
  const [importSuccessMessage, setImportSuccessMessage] = useState<string | null>(null);

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setSyncStatusMessage(null);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatusMessage(`مخزن Aqamirrazavi/Sedrazavi-WPtemplate روی شاخه ${selectedBranch} با موفقیت همگام‌سازی شد.`);
      setTimeout(() => setSyncStatusMessage(null), 5000);
    }, 1200);
  };

  const handleImportDemo = (archetype: string, label: string) => {
    setImportingArchetype(archetype);
    setImportSuccessMessage(null);
    setTimeout(() => {
      setImportingArchetype(null);
      setImportSuccessMessage(`محتوای نمونه صنف «${label}» (برگه‌ها، منوها و ویجت‌ها) در دیتابیس وردپرس بارگذاری و تنظیم شد.`);
      setTimeout(() => setImportSuccessMessage(null), 6000);
    }, 1500);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const sampleIssues = [
    { id: 142, tag: 'CAS-9482-TEH', title: 'پرونده داوری قرارداد تجاری هلدینگ صادرات فولاد', author: 'سید امیر حسین رضوی', time: '۲ ساعت پیش', status: 'open', labels: [{ name: 'داوری بین‌الملل', color: '#1f6feb' }, { name: 'اولویت بالا', color: '#da3633' }], comments: 6 },
    { id: 141, tag: 'CAS-9120-SHZ', title: 'اعتراض به برگ تشخیص و دفاع در هیئت حل اختلاف مالیاتی', author: 'دکتر مریم کاظمی', time: 'دیروز', status: 'open', labels: [{ name: 'مالیات و گمرک', color: '#8957e5' }], comments: 4 },
    { id: 140, tag: 'CAS-8994-ISF', title: 'دادخواست اعاده دادرسی در دیوان عالی کشور (شعبه ۳۹)', author: 'سید امیر حسین رضوی', time: '۳ روز پیش', status: 'closed', labels: [{ name: 'دیوان عالی', color: '#238636' }, { name: 'مختومه موفق', color: '#238636' }], comments: 12 },
    { id: 139, tag: 'CAS-8812-TEH', title: 'توقیف و خلع ید اراضی تجاری فرشته و الزام به تنظیم سند رسمی', author: 'مهندس علی مرادی', time: 'هفته گذشته', status: 'closed', labels: [{ name: 'ملکی و سرقفلی', color: '#d29922' }], comments: 8 },
  ];

  const sampleCommits = [
    { hash: 'e7b8a1c', msg: 'ثبت لایحه دفاعیه پاسخ به استعلامات کارشناسی سه‌نفره حسابرسی', author: 'سید امیر حسین رضوی', time: 'امروز ۱۰:۱۴', verified: true },
    { hash: 'd2f440a', msg: 'ابلاغیه الکترونیکی وقت رسیدگی شعبه دوم بازپرسی دادسرای اقتصادی', author: 'سامانه خودکار ثنا', time: 'دیروز ۱۶:۴۰', verified: true },
    { hash: 'c8a911e', msg: 'واریز بیعانه حق‌الوکاله مرحله بدوی از طریق درگاه زرین‌پال VIP', author: 'درگاه پرداخت آنلاین', time: '۳ روز پیش', verified: true },
    { hash: 'a1b730f', msg: 'تنظیم شکواییه و الصاق مستندات دیجیتال با امضای الکترونیک وکیل', author: 'دکتر مریم کاظمی', time: '۵ روز پیش', verified: true },
  ];

  const sampleTransactions = [
    { id: 'tx-9f82d1c', client: 'هلدینگ صادرات فولاد پارس', amount: '۴۵,۰۰۰,۰۰۰ تومان', type: 'حق‌الوکاله داوری تجاری', gateway: 'زرین‌پال VIP', date: '۱۴۰۳/۰۹/۱۲', status: 'تسویه شد' },
    { id: 'tx-84e112b', client: 'شرکت دارویی زیست‌فناور', amount: '۱۲,۰۰۰,۰۰۰ تومان', type: 'دستمزد کارشناسی رسمی دادگستری', gateway: 'سپرده دادگستری', date: '۱۴۰۳/۰۹/۰۸', status: 'تسویه شد' },
    { id: 'tx-6b2a09f', client: 'مهندس بهنام صراف‌پور', amount: '۳,۵۰۰,۰۰۰ تومان', type: 'مشاوره حضوری و تنظیم لایحه', gateway: 'کارتخوان دفتر', date: '۱۴۰۳/۰۹/۰۱', status: 'تسویه شد' },
    { id: 'tx-4c919a3', client: 'بازرگانی بین‌المللی افق', amount: '۸۰,۰۰۰,۰۰۰ تومان', type: 'پیش‌پرداخت اعاده دادرسی دیوان عالی', gateway: 'حواله ساتنا بانکی', date: '۱۴۰۳/۰۸/۲۴', status: 'تسویه شد' },
  ];

  const shortcodesList = [
    { tag: '[sedrazavi_hero industry="lawyer" style="dark"]', name: 'هیرو بنر سینمایی اختصاصی', desc: 'نمایش ویترین باشکوه با آمار دستاوردها، بج تخصصی و دکمه اقدام.', params: 'industry: lawyer | dentist | engineering | agency | saas | corporate' },
    { tag: '[sedrazavi_timeline case_id="CAS-9482-TEH"]', name: 'تایم‌لاین زنده مراحل پرونده', desc: 'رهگیری مرحله‌به‌مرحله پرونده یا پروژه با نشانگرهای سبز و آبی.', params: 'case_id: شناسه اختصاصی پرونده' },
    { tag: '[sedrazavi_calculator industry="lawyer"]', name: 'محاسبه‌گر آنلاین برآورد هزینه', desc: 'محاسبه‌گر داینامیک تعرفه قانونی متناسب با بهای خواسته و مرحله رسیدگی.', params: 'industry: صنف مورد نظر' },
    { tag: '[sedrazavi_services industry="lawyer" cols="3"]', name: 'شبکه خدمات و تخصص‌ها', desc: 'کارت‌های مدرن خدمات با آیکون، عنوان و لینک مستقیم استعلام.', params: 'industry, cols: 2 | 3 | 4' },
    { tag: '[sedrazavi_transactions]', name: 'دفتر کل تراکنش‌های مالی (Ledger)', desc: 'جدول اسناد مالی با شناسه هش، درگاه پرداخت و مبالغ اعتبارسنجی شده.', params: 'user_id (اختیاری)' },
    { tag: '[sedrazavi_activity_heatmap]', name: 'ماتریس فعالیت و مشارکت (Heatmap)', desc: 'ماتریس سبز رنگ فعالیت سالانه مشابه پروفایل گیت‌هاب.', params: 'سال و شناسه کاربر' },
    { tag: '[sedrazavi_contact_booking]', name: 'فرم هوشمند درخواست مشاوره', desc: 'فرم امن با ولیدیشن موبایل ایران و اعتبارسنجی درخواست.', params: 'بدون پارامتر' },
    { tag: '[sedrazavi_radar_chart]', name: 'نمودار تسلط و راداری حوزه‌ها', desc: 'میله‌های پیشرفت و درصد موفقیت در گرایش‌های تخصصی.', params: 'بدون پارامتر' },
    { tag: '[sedrazavi_docs_hub]', name: 'مرکز تعاملی مستندات درون‌سایت', desc: 'نمایش راهنمای کامل شورت‌کدها در فرانت‌اند با دکمه کپی کد.', params: 'بدون پارامتر' },
    { tag: '[uas_legal_court_calculator]', name: 'محاسبه‌گر تخصصی دادرسی و دادگستری (وکالت)', desc: 'برآورد تمبر مالیاتی و حق‌الوکاله مطابق آخرین آیین‌نامه تعرفه قوه قضاییه.', params: 'accent="#D4AF37" title="..."' },
    { tag: '[uas_dental_treatment_cards]', name: 'کارت‌های ضمانت و تعرفه درمان (دندان‌پزشکی)', desc: 'نمایش قیمت، ویژگی‌ها و کارت ضمانت کتبی درمان‌های دندان‌پزشکی دیجیتال.', params: 'accent="#06B6D4" title="..."' },
    { tag: '[uas_dental_appointment_modal]', name: 'نوبت‌دهی سریع کلینیک درمان (پزشکی)', desc: 'فرم هوشمند دریافت نوبت معاینه حضوری با انتخاب شیفت و پزشک.', params: 'بدون پارامتر' },
    { tag: '[uas_engineering_structural_calc]', name: 'محاسبه‌گر سازه، آرماتور و بتن (مهندسی)', desc: 'برآورد سرانگشتی وزن میلگرد، حجم بتن و زمان اجرای ابنیه عمرانی.', params: 'accent="#F59E0B" title="..."' },
    { tag: '[uas_engineering_bim_showcase]', name: 'شناسنامه فنی و مدل‌سازی اطلاعات BIM (مهندسی)', desc: 'معرفی سطح دقت LOD 350 و گزارش‌های کنترل تداخلات تأسیساتی.', params: 'بدون پارامتر' },
    { tag: '[uas_agency_tech_stack]', name: 'شبکه استک فناوری و توسعه (آژانس دیجیتال)', desc: 'معرفی ابزارها، فریم‌ورک‌ها و استانداردهای طراحی وردپرس و فرانت‌اند.', params: 'بدون پارامتر' },
    { tag: '[uas_corporate_incoterms_matrix]', name: 'ماتریس شرایط بازرگانی اینکوترمز ۲۰۲۰ (شرکتی)', desc: 'جدول مقایسه قواعد تجاری بین‌المللی (FOB, CIF, CFR, DDP) با خطرات و تعهدات.', params: 'بدون پارامتر' },
    { tag: '[uas_saas_pricing_matrix]', name: 'ماتریس پلن‌های اشتراک ابری (SaaS)', desc: 'جدول قیمت‌گذاری مقیاس‌پذیر با پلن‌های ماهانه، سالانه و شرکتی Enterprise.', params: 'accent="#10B981" title="..."' },
    { tag: '[uas_service_pricing_table columns="3"]', name: 'جدول پکیج‌های ووکامرس و وودمارت', desc: 'سازگار ۱۰۰٪ با خرید آنلاین ووکامرس، وودمارت، جت وو بیلدر و شاپ انجین.', params: 'category="consultation" columns="3"' },
    { tag: '[uas_quick_checkout_box]', name: 'فرم تسویه حساب سریع تک‌مرحله‌ای شاپرک', desc: 'اتصال بدون واسطه به درگاه‌های بانکی شاپرک با ثبت شماره همراه و مبلغ دلخواه.', params: 'بدون پارامتر' },
  ];

  const filteredIssues = sampleIssues.filter(i => {
    if (issueFilter !== 'all' && i.status !== issueFilter) return false;
    if (searchQuery && !i.title.includes(searchQuery) && !i.tag.includes(searchQuery)) return false;
    return true;
  });

  return (
    <div className="bg-[#0D1117] text-[#F0F6FC] rounded-2xl border border-[#30363D] overflow-hidden shadow-2xl font-sans" dir="rtl">
      {/* Top GitHub Repo Navigation Bar */}
      <div className="bg-[#161B22] border-b border-[#30363D] px-6 pt-5 pb-0">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm sm:text-base flex-wrap">
            <span className="text-[#8B949E]">📁</span>
            <span className="text-[#58A6FF] font-medium hover:underline cursor-pointer">sedrazavi</span>
            <span className="text-[#8B949E]">/</span>
            <span className="text-[#58A6FF] font-bold hover:underline cursor-pointer">elementor-addon-suite</span>
            <span className="text-xs px-2 py-0.5 rounded-full border border-[#30363D] text-[#8B949E]">Public</span>
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#21262D] border border-[#30363D] text-[#C9D1D9] flex items-center gap-1.5 font-mono">
              <GitBranch className="w-3 h-3 text-[#58A6FF]" /> main
            </span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-[#388bfd26] text-[#58A6FF] border border-[#388bfd66] font-mono">
              v2.5.0-autonomous
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#3FB950] bg-[#23863626] border border-[#23863666] px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> ۱۰۰٪ مستقل بدون نیاز به تم
            </span>
          </div>
        </div>

        {/* GitHub Tabs Bar */}
        <div className="flex gap-2 overflow-x-auto border-t border-[#30363D]/60 pt-2 text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3 py-2.5 font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'text-[#F0F6FC] border-[#F78166]'
                : 'text-[#8B949E] border-transparent hover:text-[#C9D1D9] hover:border-[#8B949E]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#58A6FF]" />
            <span>پیشخوان و هیت‌مپ (Overview)</span>
          </button>

          <button
            onClick={() => setActiveTab('issues')}
            className={`flex items-center gap-2 px-3 py-2.5 font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'issues'
                ? 'text-[#F0F6FC] border-[#F78166]'
                : 'text-[#8B949E] border-transparent hover:text-[#C9D1D9] hover:border-[#8B949E]'
            }`}
          >
            <AlertCircle className="w-4 h-4 text-[#3FB950]" />
            <span>پرونده‌ها و تیکت‌ها (Issues)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#30363D] text-[10px] text-[#F0F6FC]">14</span>
          </button>

          <button
            onClick={() => setActiveTab('commits')}
            className={`flex items-center gap-2 px-3 py-2.5 font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'commits'
                ? 'text-[#F0F6FC] border-[#F78166]'
                : 'text-[#8B949E] border-transparent hover:text-[#C9D1D9] hover:border-[#8B949E]'
            }`}
          >
            <GitCommit className="w-4 h-4 text-[#8957E5]" />
            <span>تایم‌لاین رخدادها (Commits)</span>
          </button>

          <button
            onClick={() => setActiveTab('ledger')}
            className={`flex items-center gap-2 px-3 py-2.5 font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'ledger'
                ? 'text-[#F0F6FC] border-[#F78166]'
                : 'text-[#8B949E] border-transparent hover:text-[#C9D1D9] hover:border-[#8B949E]'
            }`}
          >
            <Layers className="w-4 h-4 text-[#D29922]" />
            <span>دفتر کل مالی (Transactions Ledger)</span>
          </button>

          <button
            onClick={() => setActiveTab('docs')}
            className={`flex items-center gap-2 px-3 py-2.5 font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'docs'
                ? 'text-[#F0F6FC] border-[#F78166]'
                : 'text-[#8B949E] border-transparent hover:text-[#C9D1D9] hover:border-[#8B949E]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#58A6FF]" />
            <span>مرکز مستندات و شورت‌کدها (Docs)</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 space-y-6">

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Live GitHub Sync & Webhook Control Panel */}
            <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#30363D] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <h3 className="text-sm font-bold text-[#F0F6FC] font-mono">
                      Aqamirrazavi/Sedrazavi-WPtemplate
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#21262D] text-[#58A6FF] border border-[#30363D]">
                      مخزن رسمی متصل
                    </span>
                  </div>
                  <p className="text-xs text-[#8B949E]">
                    مدیریت یکپارچگی گیت‌هاب، سوییچ بین شاخه‌ها و استقرار بدون واسطه بر روی دیتابیس وردپرس
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Branch selector */}
                  <div className="flex items-center gap-1 bg-[#0D1117] p-1 rounded-lg border border-[#30363D] text-xs font-mono">
                    {(['main', 'themes', 'plugin-suite'] as const).map((b) => (
                      <button
                        key={b}
                        onClick={() => setSelectedBranch(b)}
                        className={`px-2 py-1 rounded transition-colors ${
                          selectedBranch === b ? 'bg-[#238636] text-white font-bold' : 'text-[#8B949E] hover:text-[#C9D1D9]'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleTriggerSync}
                    disabled={isSyncing}
                    className="px-3.5 py-1.5 rounded-lg bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] text-[#F0F6FC] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-[#58A6FF] ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'در حال همگام‌سازی...' : 'همگام‌سازی زنده گیت‌هاب'}</span>
                  </button>
                </div>
              </div>

              {/* Status messages */}
              {syncStatusMessage && (
                <div className="p-3 rounded-lg bg-[#23863626] border border-[#23863666] text-[#3FB950] text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{syncStatusMessage}</span>
                </div>
              )}

              {/* Demo Content Importer Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <span className="text-xs text-[#C9D1D9] font-bold">
                  ⚡ درون‌ریزی خودکار محتوای نمونه صنف در وردپرس:
                </span>
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <button
                    onClick={() => handleImportDemo('lawyer', 'وکالت')}
                    disabled={Boolean(importingArchetype)}
                    className="px-2.5 py-1 rounded-md bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#F3E5AB] border border-[#D4AF37]/40 cursor-pointer"
                  >
                    {importingArchetype === 'lawyer' ? 'در حال بارگذاری...' : '⚖️ وکالت'}
                  </button>
                  <button
                    onClick={() => handleImportDemo('web_agency', 'طراح سایت')}
                    disabled={Boolean(importingArchetype)}
                    className="px-2.5 py-1 rounded-md bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 cursor-pointer"
                  >
                    {importingArchetype === 'web_agency' ? 'در حال بارگذاری...' : '💻 طراح سایت'}
                  </button>
                  <button
                    onClick={() => handleImportDemo('ecommerce', 'فروشگاه')}
                    disabled={Boolean(importingArchetype)}
                    className="px-2.5 py-1 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 cursor-pointer"
                  >
                    {importingArchetype === 'ecommerce' ? 'در حال بارگذاری...' : '🛍️ فروشگاه'}
                  </button>
                  <button
                    onClick={() => handleImportDemo('video_media', 'مدیا سنتر')}
                    disabled={Boolean(importingArchetype)}
                    className="px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 cursor-pointer"
                  >
                    {importingArchetype === 'video_media' ? 'در حال بارگذاری...' : '🎬 مدیا سنتر'}
                  </button>
                </div>
              </div>

              {importSuccessMessage && (
                <div className="p-3 rounded-lg bg-[#388bfd26] border border-[#388bfd66] text-[#58A6FF] text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{importSuccessMessage}</span>
                </div>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4">
                <span className="text-xs text-[#8B949E] block mb-1">کل پرونده‌های ثبت‌شده</span>
                <span className="text-2xl font-bold text-[#F0F6FC] block">۱,۴۲۰</span>
                <span className="text-[11px] text-[#3FB950] font-medium">+۱۲ پرونده جدید در ماه جاری</span>
              </div>
              <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4">
                <span className="text-xs text-[#8B949E] block mb-1">نرخ پیروزی پرونده‌ها</span>
                <span className="text-2xl font-bold text-[#F0F6FC] block">۹۸.۴٪</span>
                <span className="text-[11px] text-[#3FB950] font-medium">بالاتر از میانگین کانون وکلا</span>
              </div>
              <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4">
                <span className="text-xs text-[#8B949E] block mb-1">تراکنش‌های تاییدشده</span>
                <span className="text-2xl font-bold text-[#F0F6FC] block font-mono">۲,۸۴۰M <small className="text-xs text-[#8B949E]">تومان</small></span>
                <span className="text-[11px] text-[#8B949E]">۱۰۰٪ با شناسه ارجاع بانکی</span>
              </div>
              <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4">
                <span className="text-xs text-[#8B949E] block mb-1">استقلال فنی افزونه</span>
                <span className="text-2xl font-bold text-[#3FB950] block">خودکفا ۱۰۰٪</span>
                <span className="text-[11px] text-[#3FB950]">سازگار با تمامی پوسته‌های جهان</span>
              </div>
            </div>

            {/* GitHub Activity Heatmap */}
            <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#30363D] pb-3">
                <div>
                  <h3 className="text-sm font-bold text-[#F0F6FC]">
                    ماتریس تعامل و مشارکت سالانه (Activity Contribution Heatmap)
                  </h3>
                  <p className="text-xs text-[#8B949E] mt-0.5">
                    ۳۴۸ لایحه، ابلاغیه، جلسه دادرسی و تراکنش مالی ثبت شده در ۳۶۵ روز گذشته
                  </p>
                </div>
                <span className="text-xs font-mono text-[#58A6FF] bg-[#21262D] px-2.5 py-1 rounded-md border border-[#30363D]">
                  348 contributions in 2024
                </span>
              </div>

              {/* Heatmap Grid */}
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-[3px] min-w-[700px]">
                  {Array.from({ length: 48 }).map((_, w) => (
                    <div key={w} className="flex flex-col gap-[3px]">
                      {Array.from({ length: 7 }).map((_, d) => {
                        const score = (w * 7 + d) % 5;
                        const levelColors = [
                          'bg-[#21262D]', // 0
                          'bg-[#0E4429]', // 1
                          'bg-[#006D32]', // 2
                          'bg-[#26A641]', // 3
                          'bg-[#39D353]', // 4
                        ];
                        return (
                          <div
                            key={d}
                            className={`w-[11px] h-[11px] rounded-[2px] ${levelColors[score]} hover:ring-2 hover:ring-[#58A6FF] transition-all cursor-pointer`}
                            title={`هفته ${w + 1} • روز ${d + 1}: ${score * 2} اقدام ثبت شده`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Heatmap Legend */}
              <div className="flex items-center justify-between text-xs text-[#8B949E] pt-2 border-t border-[#30363D]/60">
                <span>نمایش بر اساس تقویم فعالیت سالانه</span>
                <div className="flex items-center gap-1.5">
                  <span>کمتر</span>
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#21262D]"></span>
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#0E4429]"></span>
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#006D32]"></span>
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#26A641]"></span>
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#39D353]"></span>
                  <span>بیشتر</span>
                </div>
              </div>
            </div>

            {/* Readme Banner: GitHub Direct Usage */}
            <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#F0F6FC]">
                <Terminal className="w-4 h-4 text-[#58A6FF]" />
                <span>README.md • استقرار مستقیم از مخزن گیت‌هاب بدون نیاز به فایل زیپ واسط</span>
              </div>
              <div className="text-xs text-[#C9D1D9] leading-relaxed space-y-2 bg-[#0D1117] p-4 rounded-lg border border-[#30363D] font-mono">
                <p className="text-[#3FB950] font-bold"># دستورالعمل استقرار مستقیم روی وردپرس:</p>
                <p>۱. پوشه <code className="text-[#79C0FF] bg-[#21262D] px-1.5 py-0.5 rounded">elementor-addon-suite/</code>: افزونه کامل و مستقل وردپرس است. با فشرده‌سازی این پوشه یا کپی مستقیم آن در <code className="text-[#79C0FF]">wp-content/plugins/</code> افزونه بلافاصله فعال می‌شود.</p>
                <p>۲. پوشه <code className="text-[#79C0FF] bg-[#21262D] px-1.5 py-0.5 rounded">wordpress-theme/</code>: پوسته استاندارد وردپرس است و در <code className="text-[#79C0FF]">wp-content/themes/</code> قرار می‌گیرد.</p>
                <p>۳. افزونه نیازی به قالب ما ندارد؛ تمام ویجت‌ها و شورت‌کدها با استایل اختصاصی Enqueue شده روی هر قالبی (Hello, Astra, Woodmart) بدون نقص رندر می‌شوند.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ISSUES & CASES */}
        {activeTab === 'issues' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#161B22] p-3 rounded-xl border border-[#30363D]">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#8B949E]" />
                <input
                  type="text"
                  placeholder="جستجو در پرونده‌ها: is:open label:داوری..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg px-3 py-1.5 text-xs text-[#F0F6FC] outline-none focus:border-[#58A6FF]"
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <button
                  onClick={() => setIssueFilter('open')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    issueFilter === 'open' ? 'bg-[#21262D] text-[#F0F6FC] font-bold' : 'text-[#8B949E] hover:text-[#C9D1D9]'
                  }`}
                >
                  🟢 جاری (Open)
                </button>
                <button
                  onClick={() => setIssueFilter('closed')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    issueFilter === 'closed' ? 'bg-[#21262D] text-[#F0F6FC] font-bold' : 'text-[#8B949E] hover:text-[#C9D1D9]'
                  }`}
                >
                  🟣 مختومه (Closed)
                </button>
                <button
                  onClick={() => setIssueFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    issueFilter === 'all' ? 'bg-[#21262D] text-[#F0F6FC] font-bold' : 'text-[#8B949E] hover:text-[#C9D1D9]'
                  }`}
                >
                  همه
                </button>
              </div>
            </div>

            {/* Issues List */}
            <div className="bg-[#161B22] border border-[#30363D] rounded-xl overflow-hidden divide-y divide-[#21262D]">
              {filteredIssues.map((issue) => (
                <div key={issue.id} className="p-4 hover:bg-[#1C2128] transition-colors flex items-start gap-3">
                  <span className="text-base mt-0.5">
                    {issue.status === 'open' ? '🟢' : '🟣'}
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-bold text-[#F0F6FC] hover:text-[#58A6FF] cursor-pointer">
                        {issue.title}
                      </h4>
                      {issue.labels.map((lbl, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-full border"
                          style={{
                            backgroundColor: `${lbl.color}22`,
                            borderColor: lbl.color,
                            color: lbl.color,
                          }}
                        >
                          {lbl.name}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-[#8B949E] font-mono">
                      #{issue.tag} • ثبت شده توسط {issue.author} در {issue.time}
                    </p>
                  </div>
                  <div className="text-xs text-[#8B949E] flex items-center gap-1 shrink-0">
                    <span>💬 {issue.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: AUDIT & COMMITS */}
        {activeTab === 'commits' && (
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-[#F0F6FC] border-b border-[#30363D] pb-3">
              لاگ خطی رخدادها و تغییرات پرونده‌ها (Commit Trail)
            </h3>
            <div className="space-y-4">
              {sampleCommits.map((c, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-3 h-3 rounded-full bg-[#30363D] border-2 border-[#58A6FF] shrink-0" />
                  <div className="flex-1 bg-[#0D1117] border border-[#30363D] rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 group-hover:border-[#58A6FF]/60 transition-all">
                    <div>
                      <p className="text-xs font-bold text-[#F0F6FC] mb-1">{c.msg}</p>
                      <div className="flex items-center gap-2 text-[11px] text-[#8B949E]">
                        <span>{c.author}</span>
                        <span>•</span>
                        <span>{c.time}</span>
                        {c.verified && (
                          <span className="text-[10px] text-[#3FB950] border border-[#238636] bg-[#23863622] px-1.5 py-0.2 rounded font-mono">
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs text-[#58A6FF] font-mono bg-[#161B22] px-2 py-1 rounded border border-[#30363D]">
                        {c.hash}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: FINANCIAL LEDGER */}
        {activeTab === 'ledger' && (
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#30363D] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#F0F6FC]">دفتر کل تراکنش‌های مالی (Financial Ledger)</h3>
                <p className="text-xs text-[#8B949E] mt-0.5">تراکنش‌های تایید شده با شماره فاکتور و شناسه هش</p>
              </div>
              <span className="text-xs text-[#3FB950] bg-[#23863622] border border-[#238636] px-2.5 py-1 rounded-full font-mono">
                Real-Time Audited
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-[#1C2128] text-[#8B949E] border-b border-[#30363D]">
                    <th className="p-3">شناسه هش</th>
                    <th className="p-3">طرف قرارداد / موکل</th>
                    <th className="p-3">موضوع سند</th>
                    <th className="p-3">مبلغ پرداختی</th>
                    <th className="p-3">درگاه / شیوه</th>
                    <th className="p-3">تاریخ</th>
                    <th className="p-3">وضعیت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#21262D]">
                  {sampleTransactions.map((tx, idx) => (
                    <tr key={idx} className="hover:bg-[#1C2128]/60 transition-colors">
                      <td className="p-3"><code className="text-[#58A6FF] bg-[#0D1117] px-2 py-0.5 rounded font-mono border border-[#30363D]">{tx.id}</code></td>
                      <td className="p-3 font-bold text-[#F0F6FC]">{tx.client}</td>
                      <td className="p-3 text-[#C9D1D9]">{tx.type}</td>
                      <td className="p-3 font-bold text-[#F0F6FC] font-mono">{tx.amount}</td>
                      <td className="p-3 text-[#8B949E]">{tx.gateway}</td>
                      <td className="p-3 text-[#8B949E]">{tx.date}</td>
                      <td className="p-3"><span className="text-[11px] text-[#3FB950] bg-[#23863622] border border-[#238636] px-2 py-0.5 rounded-full">{tx.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: DOCUMENTATION & SHORTCODES */}
        {activeTab === 'docs' && (
          <div className="space-y-4">
            <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4">
              <h3 className="text-sm font-bold text-[#F0F6FC] mb-1">
                📚 راهنمای جامع شورت‌کدها (Zero-Theme Dependency)
              </h3>
              <p className="text-xs text-[#8B949E] leading-relaxed">
                هر یک از شورت‌کدهای زیر به صورت کاملاً خودکفا طراحی شده‌اند. با کلیک بر روی دکمه «کپی شورت‌کد»، آن را مستقیماً در هر برگه وردپرس یا ویرایشگر گوتنبرگ/المنتور قرار دهید:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {shortcodesList.map((sc, i) => (
                <div key={i} className="bg-[#161B22] border border-[#30363D] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#58A6FF]/60 transition-all">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[#58A6FF] flex items-center gap-2">
                      <span>{sc.name}</span>
                    </h4>
                    <p className="text-xs text-[#C9D1D9]">{sc.desc}</p>
                    <p className="text-[11px] text-[#8B949E] font-mono">
                      پارامترها: <code className="bg-[#0D1117] px-1.5 py-0.5 rounded text-[#79C0FF] border border-[#30363D]">{sc.params}</code>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <input
                      type="text"
                      readOnly
                      value={sc.tag}
                      className="bg-[#0D1117] border border-[#30363D] rounded-lg px-3 py-1.5 text-xs text-[#79C0FF] font-mono direction-ltr text-left w-56 sm:w-64"
                    />
                    <button
                      onClick={() => copyToClipboard(sc.tag, sc.tag)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        copiedCode === sc.tag
                          ? 'bg-[#238636] text-white'
                          : 'bg-[#21262D] hover:bg-[#30363D] text-[#C9D1D9] border border-[#30363D]'
                      }`}
                    >
                      {copiedCode === sc.tag ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>کپی شد!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>کپی شورت‌کد</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
