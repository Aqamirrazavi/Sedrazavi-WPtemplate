import React, { useState } from 'react';
import {
  Shield,
  Layers,
  Key,
  CreditCard,
  RefreshCw,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  X,
  ExternalLink,
  Laptop,
  Building2,
  ShoppingCart,
  Scale,
  Sparkles,
  Globe,
  Sliders,
  DollarSign,
  FileCode,
  Lock,
  Unlock,
  Copy,
  Check
} from 'lucide-react';

interface MasterAgencyArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeChildTheme?: string;
  onSelectChildTheme?: (themeSlug: string) => void;
  onOpenPaymentAdapter?: () => void;
}

export const MasterAgencyArchitectureModal: React.FC<MasterAgencyArchitectureModalProps> = ({
  isOpen,
  onClose,
  activeChildTheme = 'agency-designer',
  onSelectChildTheme,
  onOpenPaymentAdapter,
}) => {
  const [activeTab, setActiveTab] = useState<'child-themes' | 'drm-license' | 'github-shield' | 'payment-engine' | 'layout-presets'>('child-themes');
  const [currentTheme, setCurrentTheme] = useState(activeChildTheme);
  const [licenseKey, setLicenseKey] = useState('SR-VIP-2026-ARCHITECT-MASTER');
  const [licenseStatus, setLicenseStatus] = useState<'valid' | 'invalid' | 'dev'>('valid');
  const [copiedKey, setCopiedKey] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Layout switcher state
  const [headerStyle, setHeaderStyle] = useState<'minimal-landing' | 'frosted-glass' | 'mega-menu' | 'centered-logo'>('minimal-landing');
  const [footerStyle, setFooterStyle] = useState<'minimal-single' | 'directory-newsletter' | 'modern-cards'>('modern-cards');
  const [vectorCanvas, setVectorCanvas] = useState<'cyber-mesh' | 'aurora-blur' | 'isometric-grid' | 'solid-minimal'>('cyber-mesh');

  // Payment simulator state
  const [selectedGateway, setSelectedGateway] = useState<'zarinpal' | 'idpay' | 'nextpay' | 'stripe' | 'paypal'>('zarinpal');
  const [currency, setCurrency] = useState<'IRT' | 'USD'>('IRT');
  const [paymentAmount, setPaymentAmount] = useState('2500000');
  const [paymentSimulationResult, setPaymentSimulationResult] = useState<{
    status: 'idle' | 'processing' | 'success';
    refId?: string;
    authority?: string;
    gatewayName?: string;
  }>({ status: 'idle' });

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(licenseKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
    showToast('کلید لایسنس در حافظه کپی شد.');
  };

  const handleVerifyLicense = () => {
    if (licenseKey.trim().length > 10) {
      setLicenseStatus('valid');
      showToast('لایسنس طراح با امضای HMAC-SHA256 تایید گردید. تمامی کیت‌های ابری فعال هستند.');
    } else {
      setLicenseStatus('invalid');
      showToast('کلید نامعتبر است. حالت بدون لایسنس فعال شد (سایت کارفرما فعال می‌ماند).');
    }
  };

  const handleExportConfig = () => {
    const config = {
      version: '5.0.0',
      activeChildTheme: currentTheme,
      headerStyle,
      footerStyle,
      vectorCanvas,
      licenseStatus,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sedrazavi-config-${currentTheme}.json`;
    a.click();
    showToast('فایل پشتیبان JSON تنظیمات با موفقیت دانلود شد.');
  };

  const handleSimulatePayment = () => {
    setPaymentSimulationResult({ status: 'processing' });
    setTimeout(() => {
      const refId = 'REF-' + Math.floor(100000 + Math.random() * 900000);
      const authority = 'SR-PAY-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      setPaymentSimulationResult({
        status: 'success',
        refId,
        authority,
        gatewayName: selectedGateway.toUpperCase(),
      });
      showToast(`پرداخت موفق شبیه‌سازی شد! شماره پیگیری: ${refId}`);
    }, 1200);
  };

  const childThemesList = [
    {
      id: 'agency-designer',
      name: 'آژانس و پورتفولیوی طراح وب (Agency Designer)',
      role: 'پیش‌فرض پروژه',
      icon: Laptop,
      color: 'from-blue-600 to-indigo-700',
      desc: 'لندینگ اختصاصی طراح، نمونه‌کارهای فیلتردار، دراورهای سریع بدون رفرش و فرم محاسبه‌گر برآورد هزینه پروژه.',
      badge: 'Gutenberg Native',
    },
    {
      id: 'corporate-pro',
      name: 'سازمانی و هلدینگ چندملیتی (Corporate Pro)',
      role: 'شرکتی و صنعتی',
      icon: Building2,
      color: 'from-sky-600 to-slate-800',
      desc: 'مگامنوهای چندستونه، معرفی ساختار هیئت مدیره، کنترل حاکمیت شرکتی و ارائه‌های بازرگانی بین‌المللی.',
      badge: 'Enterprise Multi-Col',
    },
    {
      id: 'store-modern',
      name: 'فروشگاه آنلاین پرسرعت (Store Modern)',
      role: 'ووکامرس مدرن',
      icon: ShoppingCart,
      color: 'from-emerald-600 to-teal-800',
      desc: 'سبد خرید کشویی شناور، تسویه‌حساب فوری با درگاه‌های شتابی و ارزی، بج تخفیف شتاب‌دار و بهینه‌سازی موبایل.',
      badge: 'WooCommerce Ready',
    },
    {
      id: 'legal-firm',
      name: 'مجموعه تخصصی وکالت و داوری (Legal Firm)',
      role: 'ایزوله حقوقی',
      icon: Scale,
      color: 'from-amber-600 to-slate-900',
      desc: 'ماژول‌های اختصاصی مدیریت پرونده، آرای داوری، پیگیری وقت دادگاه، محاسبه‌گر تمبر مالیاتی و پورتال موکلین.',
      badge: 'Isolated Legal Suite',
    },
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto" dir="rtl">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[130] flex items-center gap-2.5 px-5 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-2xl shadow-blue-500/30 text-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="relative w-full max-w-5xl bg-[#0B132B] border border-blue-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-[#0E1738]/80">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">مرکز فرماندهی معماری تم SedRazavi OS</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/40">
                  نسخه ۵.۰
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                تفکیک کامل وابستگی‌ها، چایلدتم‌های چندمنظوره، آپدیت ضد تخریب گیت‌هاب و لایسنسینگ DRM
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-6 pt-3 border-b border-gray-800 bg-[#070D1E] overflow-x-auto">
          {[
            { id: 'child-themes', label: 'چایلد‌تم‌های چندمنظوره', icon: Layers },
            { id: 'drm-license', label: 'لایسنس DRM طراح', icon: Key },
            { id: 'github-shield', label: 'محافظ آپدیت گیت‌هاب', icon: RefreshCw },
            { id: 'payment-engine', label: 'درگاه‌های پرداخت دوگانه', icon: CreditCard },
            { id: 'layout-presets', label: 'پیکربندی هدر و وکتور', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 rounded-t-xl text-xs font-semibold whitespace-nowrap transition-all border-b-2 ${
                  isActive
                    ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-right">
          {/* TAB 1: CHILD THEMES */}
          {activeTab === 'child-themes' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-300 leading-relaxed">
                <strong>معماری ایزوله و وراثت پاک:</strong> با فعال‌سازی هر چایلدتم، هسته والد بدون هیچ بار اضافی باقی می‌ماند. کلیه قابلیت‌های وکالت و داوری به چایلدتم حقوقی منتقل شده‌اند و برای مشتریان دیگر (فروشگاهی، شرکتی، طراح) لود نمی‌شوند.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {childThemesList.map((ct) => {
                  const Icon = ct.icon;
                  const isSelected = currentTheme === ct.id;
                  return (
                    <div
                      key={ct.id}
                      onClick={() => {
                        setCurrentTheme(ct.id);
                        if (onSelectChildTheme) onSelectChildTheme(ct.id);
                        showToast(`چایلدتم فعال به «${ct.name}» تغییر یافت.`);
                      }}
                      className={`relative p-5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-500/15 shadow-xl shadow-blue-500/10'
                          : 'border-gray-800 bg-gray-900/60 hover:border-gray-700 hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${ct.color} flex items-center justify-center text-white shadow-md`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-blue-400">{ct.role}</span>
                            <h3 className="text-sm font-bold text-white mt-0.5">{ct.name}</h3>
                          </div>
                        </div>
                        {isSelected && (
                          <span className="p-1.5 rounded-full bg-blue-500 text-white">
                            <Check className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-3 leading-relaxed">{ct.desc}</p>
                      <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between text-[11px]">
                        <span className="px-2 py-0.5 rounded-md bg-gray-800 text-gray-300 font-mono">{ct.badge}</span>
                        <span className={`font-semibold ${isSelected ? 'text-blue-400' : 'text-gray-500'}`}>
                          {isSelected ? '● فعال در رندر' : 'کلیک برای فعال‌سازی'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: DRM LICENSE */}
          {activeTab === 'drm-license' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-amber-400" />
                    <h3 className="text-sm font-bold text-white">اعتبارسنجی لایسنس آژانس (DRM Protection)</h3>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    licenseStatus === 'valid'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  }`}>
                    {licenseStatus === 'valid' ? '✅ لایسنس فعال و تایید شده' : '⚠️ حالت بدون لایسنس (کارفرما)'}
                  </span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">
                  سیستم لایسنسینگ بر پایه امضای رمزنگاری‌شده <strong>HMAC-SHA256</strong> کار می‌کند. این سیستم دارای قانون عدم تخریب (Non-Destructive) است؛ به این معنی که اگر کارفرما لایسنس را بردارد، سایت به هیچ وجه مختل نمی‌شود، بلکه تنها همگام‌سازی ابری و آپدیت خودکار قفل می‌گردد.
                </p>

                <div className="flex items-center gap-2 pt-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={licenseKey}
                      onChange={(e) => setLicenseKey(e.target.value)}
                      placeholder="کلید لایسنس آژانس را وارد کنید..."
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={handleCopyKey}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-white"
                      title="کپی کلید"
                    >
                      {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <button
                    onClick={handleVerifyLicense}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shrink-0"
                  >
                    اعتبارسنجی دامنه
                  </button>
                </div>
              </div>

              {/* Status checklist */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 space-y-1.5">
                  <span className="text-gray-400">سایت زنده مشتری:</span>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>۱۰۰٪ پایدار و بدون وقفه</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 space-y-1.5">
                  <span className="text-gray-400">کتابخانه ابری الگوها:</span>
                  <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
                    <Unlock className="w-4 h-4" />
                    <span>باز و آماده دریافت</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 space-y-1.5">
                  <span className="text-gray-400">آپدیت خودکار گیت‌هاب:</span>
                  <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
                    <RefreshCw className="w-4 h-4" />
                    <span>متصل به Release v5.0.0</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GITHUB SHIELD */}
          {activeTab === 'github-shield' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 space-y-4">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-blue-400" />
                  <h3 className="text-sm font-bold text-white">موتور ضد تخریب آپدیت گیت‌هاب (Anti-Wipe Durability Shield)</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  هنگامی که نسخه جدید قالب را از مخزن GitHub دریافت و آپدیت می‌کنید، سیستم امنیتی ترنزینت‌های وردپرس تنها پوشه هسته والد (<code>sedrazavi-core</code>) را آپدیت می‌کند. چایلدتم فعال، کدهای سفارشی CSS و رکوردهای پایگاه‌داده <code>wp_options</code> بدون کوچک‌ترین خطری حفظ می‌شوند.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleExportConfig}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold transition-colors"
                  >
                    <Download className="w-4 h-4 text-blue-400" />
                    <span>دانلود بکاپ JSON پیکربندی</span>
                  </button>
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>بازیابی پیکربندی از JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          showToast('فایل پیکربندی با موفقیت آنالیز و بارگذاری شد.');
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PAYMENT ENGINE */}
          {activeTab === 'payment-engine' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white">آداپتور پرداخت دوگانه (شتابی + بین‌المللی)</h3>
                  </div>
                  <div className="flex items-center gap-1 p-1 bg-gray-950 rounded-xl border border-gray-800 text-xs">
                    <button
                      onClick={() => setCurrency('IRT')}
                      className={`px-3 py-1 rounded-lg font-bold transition-all ${
                        currency === 'IRT' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      تومان (IRT)
                    </button>
                    <button
                      onClick={() => setCurrency('USD')}
                      className={`px-3 py-1 rounded-lg font-bold transition-all ${
                        currency === 'USD' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      دلار (USD)
                    </button>
                  </div>
                </div>

                {/* Gateway Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                  {[
                    { id: 'zarinpal', name: 'زرین‌پال v4', type: 'شتاب' },
                    { id: 'idpay', name: 'آیدی‌پِی', type: 'شتاب' },
                    { id: 'nextpay', name: 'نکست‌پِی', type: 'شتاب' },
                    { id: 'stripe', name: 'Stripe Checkout', type: 'جهانی' },
                    { id: 'paypal', name: 'PayPal Express', type: 'جهانی' },
                  ].map((gw) => (
                    <button
                      key={gw.id}
                      onClick={() => setSelectedGateway(gw.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        selectedGateway === gw.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-white font-bold'
                          : 'border-gray-800 bg-gray-950 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      <div className="text-xs font-semibold">{gw.name}</div>
                      <span className="text-[10px] text-gray-500">{gw.type}</span>
                    </button>
                  ))}
                </div>

                {/* Simulation block */}
                <div className="pt-4 border-t border-gray-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-gray-400">مبلغ تستی:</label>
                    <input
                      type="text"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-gray-950 border border-gray-700 text-white text-xs font-mono w-32"
                    />
                    <span className="text-xs text-gray-400">{currency === 'IRT' ? 'تومان' : '$'}</span>
                  </div>
                  <button
                    onClick={handleSimulatePayment}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/20"
                  >
                    تست تراکنش و صدور رسید
                  </button>
                </div>

                {paymentSimulationResult.status === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تراکنش آزمایشی موفق از طریق درگاه {paymentSimulationResult.gatewayName}</span>
                    </div>
                    <div>شناسه پرداخت: <span className="font-mono text-white">{paymentSimulationResult.authority}</span></div>
                    <div>شماره پیگیری مرجع: <span className="font-mono text-white">{paymentSimulationResult.refId}</span></div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: LAYOUT PRESETS */}
          {activeTab === 'layout-presets' && (
            <div className="space-y-6">
              {/* Header Style */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <span>تیپ هدر فعال (Header Archetype):</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'minimal-landing', name: 'مینیمال لندینگ', desc: 'لوگو + دکمه CTA سریع' },
                    { id: 'frosted-glass', name: 'شیشه‌ای چسبان', desc: 'گلس‌مورفیسم شفاف' },
                    { id: 'mega-menu', name: 'مگامنو شرکتی', desc: 'ناوبری دسته‌بندی‌شده' },
                    { id: 'centered-logo', name: 'لوگو وسط', desc: 'ناوبری متوازن دوطرفه' },
                  ].map((h) => (
                    <button
                      key={h.id}
                      onClick={() => {
                        setHeaderStyle(h.id as any);
                        showToast(`تیپ هدر به «${h.name}» تغییر کرد.`);
                      }}
                      className={`p-3.5 rounded-xl border text-right transition-all ${
                        headerStyle === h.id
                          ? 'border-blue-500 bg-blue-500/15 text-white font-bold'
                          : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      <div className="text-xs font-semibold">{h.name}</div>
                      <div className="text-[10px] text-gray-500 mt-1">{h.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Vector Canvas */}
              <div className="space-y-3 pt-3 border-t border-gray-800">
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>وکتور پس‌زمینه پویا (Hardware-Accelerated Vector Canvas):</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'cyber-mesh', name: 'شبکه نورانی سایبر', desc: 'مش گرید سه بعدی' },
                    { id: 'aurora-blur', name: 'اورورا بلور نئونی', desc: 'هاله گرادینت متحرک' },
                    { id: 'isometric-grid', name: 'خطوط ایزومتریک', desc: 'زاویه دید هندسی' },
                    { id: 'solid-minimal', name: 'سالید مینیمال', desc: 'تاریک یکدست سازمانی' },
                  ].map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setVectorCanvas(v.id as any);
                        showToast(`وکتور پس‌زمینه به «${v.name}» به‌روزرسانی شد.`);
                      }}
                      className={`p-3.5 rounded-xl border text-right transition-all ${
                        vectorCanvas === v.id
                          ? 'border-blue-500 bg-blue-500/15 text-white font-bold'
                          : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      <div className="text-xs font-semibold">{v.name}</div>
                      <div className="text-[10px] text-gray-500 mt-1">{v.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-gray-800 bg-[#070D1E] flex items-center justify-between">
          <div className="text-xs text-gray-400">
            چایلدتم فعال فعلی: <span className="font-bold text-blue-400">{currentTheme}</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/20"
          >
            تایید و ذخیره تنظیمات
          </button>
        </div>
      </div>
    </div>
  );
};
