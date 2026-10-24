import React, { useState } from 'react';
import {
  Calculator,
  Zap,
  ShieldCheck,
  Printer,
  Sparkles,
  TrendingUp,
  Globe2,
  Database,
  Layers,
  Clock,
  CheckCircle2,
  X,
  FileText,
  DollarSign,
  ArrowRight,
  ExternalLink,
  Cpu,
  BarChart3,
  Flame
} from 'lucide-react';

interface TacticalScopeConfiguratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry?: (specData?: string) => void;
}

export const TacticalScopeConfiguratorModal: React.FC<TacticalScopeConfiguratorModalProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'configurator' | 'roi_simulator' | 'printable_sheet'>('configurator');

  // Configurator options state
  const [siteType, setSiteType] = useState<'enterprise' | 'portal' | 'crypto' | 'ecommerce'>('enterprise');
  const [features, setFeatures] = useState<{
    jetengine: boolean;
    subSecondPerf: boolean;
    bilingualServer: boolean;
    clientPortal: boolean;
    offlineQueue: boolean;
    commandPalette: boolean;
    automatedAudit: boolean;
  }>({
    jetengine: true,
    subSecondPerf: true,
    bilingualServer: true,
    clientPortal: false,
    offlineQueue: true,
    commandPalette: true,
    automatedAudit: false,
  });

  // ROI Simulator inputs
  const [currentLoadTimeSec, setCurrentLoadTimeSec] = useState<number>(3.8);
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(15000);
  const [averageOrderValueToman, setAverageOrderValueToman] = useState<number>(1800000);

  // Pricing calculations
  const siteTypeBasePrice: Record<string, { price: number; days: number; title: string }> = {
    enterprise: { price: 34000000, days: 16, title: 'پلتفرم شرکتی و سازمانی پیشرفته' },
    portal: { price: 48000000, days: 24, title: 'پرتال جامع خدمات، مشتریان و پرونده‌ها' },
    crypto: { price: 42000000, days: 20, title: 'لندینگ وب۳، ترمینال مالی و نمونه‌کار سایبر' },
    ecommerce: { price: 38000000, days: 18, title: 'فروشگاه تخصصی محصولات دیجیتال و لایسنس' },
  };

  const featureAddons: Record<string, { price: number; days: number; title: string }> = {
    jetengine: { price: 6500000, days: 3, title: 'ساختار پیشرفته روابط CPT و کانتینرهای فلکس‌باکس بدون کد' },
    subSecondPerf: { price: 5000000, days: 2, title: 'بهینه‌سازی سرعت مافوق‌صوت LCP زیر ۱ ثانیه و CLS صفر' },
    bilingualServer: { price: 7500000, days: 4, title: 'سیستم دوزبانه سروری (/en/) با هدرهای استاندارد hreflang' },
    clientPortal: { price: 8000000, days: 4, title: 'پرتال امن موکل با توکن‌های ضدجعل HMAC و گاوصندوق اسناد' },
    offlineQueue: { price: 3000000, days: 1, title: 'صف آفلاین پایدار جهت دریافت استعلام‌ها در قطعی اینترنت' },
    commandPalette: { price: 2500000, days: 1, title: 'پالت فرمان و جستجوی آنی CMD+K سبک' },
    automatedAudit: { price: 3500000, days: 2, title: 'دفتر وقایع امنیتی غیرقابل تغییر و ممیزی رویدادها' },
  };

  const currentBase = siteTypeBasePrice[siteType];
  let calculatedTotalPrice = currentBase.price;
  let calculatedTotalDays = currentBase.days;

  Object.entries(features).forEach(([key, enabled]) => {
    if (enabled && featureAddons[key]) {
      calculatedTotalPrice += featureAddons[key].price;
      calculatedTotalDays += featureAddons[key].days;
    }
  });

  // ROI Simulator calculations
  // Google research: Every 1s improvement in load time increases conversions by ~17% and reduces bounce rate
  const speedGain = Math.max(0, currentLoadTimeSec - 0.9);
  const conversionBoostPercent = Math.min(68, Math.round(speedGain * 18));
  const bounceRateReductionPercent = Math.min(42, Math.round(speedGain * 11));
  const currentEstConversions = Math.round(monthlyVisitors * 0.015);
  const newEstConversions = Math.round(currentEstConversions * (1 + conversionBoostPercent / 100));
  const additionalOrdersMonthly = newEstConversions - currentEstConversions;
  const additionalMonthlyRevenue = additionalOrdersMonthly * averageOrderValueToman;

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrintSpec = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 md:p-6 overflow-y-auto"
      dir="rtl"
    >
      <div className="relative w-full max-w-5xl bg-[#080d1e]/95 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-gradient-to-r from-amber-950/70 via-[#0b132b] to-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Calculator className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">
                  کانفیگوراتور ماژولار مشخصات پروژه و شبیه‌ساز سودآوری
                </h2>
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  نسخه مرجع ۱۵.۰
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>معمار ارشد: مهندس سید امیر حسین رضوی فردویی</span>
                <span className="text-amber-400">•</span>
                <span className="font-mono text-slate-300">برند تجاری: SedRazavi (@sedrazavi)</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 py-2.5 bg-black/40 border-b border-amber-500/20 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('configurator')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'configurator'
                ? 'bg-amber-600 text-black font-black shadow-lg shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>برآوردگر پارامتریک دامنه و ارزش پروژه</span>
          </button>

          <button
            onClick={() => setActiveTab('roi_simulator')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'roi_simulator'
                ? 'bg-amber-600 text-black font-black shadow-lg shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>شبیه‌ساز سودآوری و سرعت (Performance ROI)</span>
          </button>

          <button
            onClick={() => setActiveTab('printable_sheet')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'printable_sheet'
                ? 'bg-amber-600 text-black font-black shadow-lg shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>سند مشخصات فنی و پیش‌فاکتور چاپی (A4)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* TAB 1: CONFIGURATOR */}
          {activeTab === 'configurator' && (
            <div className="space-y-6">
              {/* Site Type Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2.5">
                  ۱. نوع پلتفرم و معماری پایه وب‌سایت:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(siteTypeBasePrice).map(([key, data]) => (
                    <div
                      key={key}
                      onClick={() => setSiteType(key as any)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        siteType === key
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-md shadow-amber-500/20'
                          : 'bg-black/30 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white mb-1">{data.title}</div>
                      <div className="text-[11px] font-mono text-amber-400 font-bold">
                        {data.price.toLocaleString('fa-IR')} تومان
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1 font-mono">
                        مدت پایه: {data.days} روز کاری
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Addons */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2.5">
                  ۲. انتخاب ماژول‌های فنی، پرفورمنس و امنیتی بدون کد:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(featureAddons).map(([key, data]) => {
                    const isEnabled = (features as any)[key];
                    return (
                      <div
                        key={key}
                        onClick={() => toggleFeature(key as any)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isEnabled
                            ? 'bg-emerald-950/20 border-emerald-500/50 text-white'
                            : 'bg-black/25 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center border ${
                              isEnabled
                                ? 'bg-emerald-500 border-emerald-400 text-black'
                                : 'border-slate-700 bg-slate-900'
                            }`}
                          >
                            {isEnabled && <CheckCircle2 className="w-3.5 h-3.5 text-black stroke-[3]" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{data.title}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              زمان تقریبی اجرا: +{data.days} روز
                            </div>
                          </div>
                        </div>

                        <div className="font-mono text-xs font-bold text-emerald-400 shrink-0">
                          +{data.price.toLocaleString('fa-IR')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Calculated Summary Bar */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-black to-slate-900/60 border border-amber-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-slate-400">جمع کل سرمایه‌گذاری برآوردشده معماری:</div>
                  <div className="text-2xl font-black text-amber-400 font-mono">
                    {calculatedTotalPrice.toLocaleString('fa-IR')}{' '}
                    <span className="text-xs font-normal text-slate-300">تومان</span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      مدت‌زمان تحویل پروژه: <strong className="text-white font-mono">{calculatedTotalDays} روز کاری</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setActiveTab('printable_sheet')}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all border border-slate-700"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>مشاهده پیش‌فاکتور چاپی</span>
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      if (onOpenInquiry) {
                        onOpenInquiry(`پروژه: ${currentBase.title} - مبلغ برآورد: ${calculatedTotalPrice.toLocaleString('fa-IR')} تومان`);
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-amber-500/30"
                  >
                    <span>ثبت نهایی استعلام پروژه</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ROI SIMULATOR */}
          {activeTab === 'roi_simulator' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>محاسبه‌گر ارزش اقتصادی و بازگشت سرمایه بر اساس داده‌های رسمی Google Web Vitals</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  طبق آمار رسمی گوگل، هر ۱ ثانیه تاخیر در لود وب‌سایت موجب افت ۱۷٪ در نرخ تبدیل سفارشات و افزایش ۲۸٪ نرخ پرش بازدیدکنندگان می‌شود. معماری بدون کد بهینه‌شده سید امیر حسین رضوی فردویی با تحویل سرعت زیر ۱ ثانیه، مستقیماً درآمد شما را متحول می‌سازد.
                </p>
              </div>

              {/* Input Sliders */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-black/30 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
                    <span>زمان لود فعلی سایت:</span>
                    <span className="font-mono text-rose-400 font-bold">{currentLoadTimeSec} ثانیه</span>
                  </div>
                  <input
                    type="range"
                    min="1.2"
                    max="6.0"
                    step="0.1"
                    value={currentLoadTimeSec}
                    onChange={(e) => setCurrentLoadTimeSec(parseFloat(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                  <div className="text-[10px] text-slate-500">میانگین سایت‌های وردپرسی معمولی: ۳.۵ تا ۵ ثانیه</div>
                </div>

                <div className="p-4 rounded-xl bg-black/30 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
                    <span>تعداد بازدید ماهانه:</span>
                    <span className="font-mono text-cyan-400 font-bold">
                      {monthlyVisitors.toLocaleString('fa-IR')} کاربر
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="100000"
                    step="1000"
                    value={monthlyVisitors}
                    onChange={(e) => setMonthlyVisitors(parseInt(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                  <div className="text-[10px] text-slate-500">ترافیک ماهانه وب‌سایت شما</div>
                </div>

                <div className="p-4 rounded-xl bg-black/30 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
                    <span>میانگین ارزش هر سفارش/قرارداد:</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {(averageOrderValueToman / 1000).toLocaleString('fa-IR')} هزار تومان
                    </span>
                  </div>
                  <input
                    type="range"
                    min="200000"
                    max="10000000"
                    step="200000"
                    value={averageOrderValueToman}
                    onChange={(e) => setAverageOrderValueToman(parseInt(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <div className="text-[10px] text-slate-500">ارزش میانگین خرید یا حق مشاوره</div>
                </div>
              </div>

              {/* Simulation Result Gauges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-1">
                  <div className="text-xs text-emerald-300">افزایش نرخ تبدیل سفارشات:</div>
                  <div className="text-3xl font-black text-emerald-400 font-mono">
                    +{conversionBoostPercent}٪
                  </div>
                  <div className="text-[11px] text-slate-400">تعداد سفارشات جدید ماهانه: +{additionalOrdersMonthly}</div>
                </div>

                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-center space-y-1">
                  <div className="text-xs text-cyan-300">کاهش نرخ پرش (Bounce Rate):</div>
                  <div className="text-3xl font-black text-cyan-400 font-mono">
                    -{bounceRateReductionPercent}٪
                  </div>
                  <div className="text-[11px] text-slate-400">ماندگاری بالاتر کاربران در صفحات لندینگ</div>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-center space-y-1">
                  <div className="text-xs text-amber-300">سود ناخالص بالقوه افزوده ماهانه:</div>
                  <div className="text-2xl font-black text-amber-400 font-mono">
                    +{additionalMonthlyRevenue.toLocaleString('fa-IR')}{' '}
                    <span className="text-xs font-normal">تومان</span>
                  </div>
                  <div className="text-[11px] text-slate-400">بازگشت کامل سرمایه‌گذاری ظرف کمتر از ۱ ماه</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRINTABLE TACTICAL SPEC SHEET */}
          {activeTab === 'printable_sheet' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-300">
                  این سند پیش‌فاکتور چاپی جهت ارائه در جلسات تصمیم‌گیری هیات مدیره یا قراردادهای رسمی طراحی شده است.
                </span>
                <button
                  onClick={handlePrintSpec}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>چاپ رسمی سند (Print A4)</span>
                </button>
              </div>

              {/* Printable Document Sheet Container */}
              <div
                id="printable-spec-sheet"
                className="bg-white text-slate-900 p-8 rounded-xl shadow-xl space-y-6 max-w-4xl mx-auto border border-slate-200"
              >
                {/* Formal Letterhead */}
                <div className="flex items-start justify-between border-b pb-4 border-slate-200">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">سند مشخصات فنی و پیش‌فاکتور اجرایی وب‌سایت</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      معمار سامانه: مهندس سید امیر حسین رضوی فردویی (برند رسمی: SedRazavi)
                    </p>
                    <p className="text-[11px] font-mono text-slate-500">
                      هندل رسمی در ایتا و تلگرام: @sedrazavi | تماس: ۰۹۱۲۳۴۵۶۷۸۹
                    </p>
                  </div>
                  <div className="text-left font-mono text-xs text-slate-600 space-y-1">
                    <div>
                      شماره استعلام: <strong className="text-slate-900">SR-SPEC-{Date.now().toString().slice(-6)}</strong>
                    </div>
                    <div>تاریخ صدور: {new Date().toLocaleDateString('fa-IR')}</div>
                    <div>اعتبار برآورد: ۱۵ روز کاری</div>
                  </div>
                </div>

                {/* Scope Itemized Table */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-2">شرح اقلام و ماژول‌های معماری بدون کد:</h4>
                  <table className="w-full text-xs text-right border-collapse border border-slate-200">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-bold">
                        <th className="p-2.5 border border-slate-200">ردیف</th>
                        <th className="p-2.5 border border-slate-200">عنوان مؤلفه و ماژول فنی</th>
                        <th className="p-2.5 border border-slate-200">مدت اجرا</th>
                        <th className="p-2.5 border border-slate-200">مبلغ برآورد (تومان)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2.5 border border-slate-200 font-mono">۰۱</td>
                        <td className="p-2.5 border border-slate-200 font-medium">
                          معماری پایه: {currentBase.title}
                        </td>
                        <td className="p-2.5 border border-slate-200 font-mono">{currentBase.days} روز</td>
                        <td className="p-2.5 border border-slate-200 font-mono">
                          {currentBase.price.toLocaleString('fa-IR')}
                        </td>
                      </tr>
                      {Object.entries(features)
                        .filter(([_, enabled]) => enabled)
                        .map(([key, _], idx) => {
                          const addon = featureAddons[key];
                          return (
                            <tr key={key} className={idx % 2 === 0 ? 'bg-slate-50/60' : ''}>
                              <td className="p-2.5 border border-slate-200 font-mono">
                                {(idx + 2).toString().padStart(2, '0')}
                              </td>
                              <td className="p-2.5 border border-slate-200">{addon.title}</td>
                              <td className="p-2.5 border border-slate-200 font-mono">+{addon.days} روز</td>
                              <td className="p-2.5 border border-slate-200 font-mono">
                                +{addon.price.toLocaleString('fa-IR')}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                    <tfoot>
                      <tr className="bg-amber-50/80 font-black text-slate-900">
                        <td colSpan={2} className="p-3 border border-slate-200 text-left">
                          جمع کل سرمایه‌گذاری و مدت اجرا:
                        </td>
                        <td className="p-3 border border-slate-200 font-mono text-amber-900">
                          {calculatedTotalDays} روز کاری
                        </td>
                        <td className="p-3 border border-slate-200 font-mono text-amber-900">
                          {calculatedTotalPrice.toLocaleString('fa-IR')} تومان
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Professional Guarantees */}
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-700 space-y-1.5">
                  <div className="font-bold text-slate-900">تعهدات کیفیت و استانداردهای معماری SedRazavi:</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li>تضمین عدم استفاده از صفحه‌سازهای سنگین و بدون ران‌تایم اضافی React در فرانت عمومی.</li>
                    <li>تضمین تحویل سرعت لود زیر ۱ ثانیه (LCP &lt; 1.0s) و سازگاری ۱۰۰٪ با آزمون‌های Google Core Web Vitals.</li>
                    <li>مالکیت کامل ۱۰۰٪ سورس‌کد و دیتابیس بدون هیچ‌گونه قفل نرم‌افزاری یا اتکای اجباری به سرورهای خارجی.</li>
                  </ul>
                </div>

                {/* Signatures */}
                <div className="pt-4 flex items-center justify-between text-xs text-slate-600 border-t border-slate-200">
                  <div>مهر و امضای معمار سامانه: سید امیر حسین رضوی فردویی</div>
                  <div>امضای تأیید کارفرما / مدیر پروژه: __________________</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-amber-500/20 bg-black/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>پلتفرم معماری بدون کد SedRazavi OS — دارای گواهی تطبیق با استانداردهای نسخه مرجع ۱۵.۰</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
