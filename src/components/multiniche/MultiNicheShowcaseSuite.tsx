import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Crown,
  Download,
  Newspaper,
  UserCheck,
  Play,
  Shield,
  Copy,
  Check,
  AlertTriangle,
  Clock,
  Sparkles,
  ExternalLink,
  Lock,
  Unlock,
  Key,
  FileCheck,
  Layers,
  ArrowRight,
  RefreshCw,
  Eye,
  CheckCircle2
} from 'lucide-react';

interface MultiNicheShowcaseSuiteProps {
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}

export const MultiNicheShowcaseSuite: React.FC<MultiNicheShowcaseSuiteProps> = ({
  onBackToHome,
  onOpenDashboard,
}) => {
  const [activeModule, setActiveModule] = useState<'lms' | 'vip' | 'soft98' | 'magazine' | 'portal'>('lms');
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [copiedLicense, setCopiedLicense] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // LMS State
  const [watermarkPos, setWatermarkPos] = useState({ top: '35%', left: '45%' });
  const [simulatedLicenses, setSimulatedLicenses] = useState<Array<{
    orderId: string;
    courseTitle: string;
    licenseKey: string;
    createdAt: string;
  }>>([
    {
      orderId: 'ORD-1094',
      courseTitle: 'دوره جامع مهندسی وردپرس مدرن و اکوسیستم Bun',
      licenseKey: 'SP-98FA-41B0-82E7',
      createdAt: '۱۴۰۳/۰۷/۲۶',
    },
    {
      orderId: 'ORD-1082',
      courseTitle: 'معماری چایلدتم‌ها و سیستم‌های ضد تخریب گیت‌هاب',
      licenseKey: 'SP-73C2-19EA-55D4',
      createdAt: '۱۴۰۳/۰۷/۲۰',
    },
  ]);

  // VIP Paywall State
  const [isVipSimulated, setIsVipSimulated] = useState(false);
  const [vipDaysRemaining, setVipDaysRemaining] = useState(45);
  const [generatedDlToken, setGeneratedDlToken] = useState<string | null>(null);

  // Floating Watermark Timer for Screen-Recording Protection
  useEffect(() => {
    const interval = setInterval(() => {
      const top = Math.floor(Math.random() * 65) + 15 + '%';
      const left = Math.floor(Math.random() * 65) + 15 + '%';
      setWatermarkPos({ top, left });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSimulateWebhook = () => {
    const randKey = 'SP-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    const newRecord = {
      orderId: 'ORD-' + Math.floor(1100 + Math.random() * 500),
      courseTitle: 'کارگاه طراحی پیشرفته با بلوک‌های گوتنبرگ و دراور',
      licenseKey: randKey,
      createdAt: 'لحظاتی پیش',
    };
    setSimulatedLicenses([newRecord, ...simulatedLicenses]);
    showToast(`وبهوک اسپات‌پلیر فعال شد! لایسنس جدید صادر شد: ${randKey}`);
  };

  const handleCopyPassword = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
    showToast('رمز فایل فشرده کپی شد.');
  };

  const handleCopyLicense = (lic: string) => {
    navigator.clipboard.writeText(lic);
    setCopiedLicense(lic);
    setTimeout(() => setCopiedLicense(null), 2000);
    showToast('لایسنس اسپات‌پلیر در کلیپ‌بورد کپی شد.');
  };

  const handleGenerateExpiringToken = () => {
    const token = 'DL-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-EXP2H';
    setGeneratedDlToken(token);
    showToast('توکن موقت دانلود ۲ ساعته با موفقیت تولید شد.');
  };

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 font-sans p-4 sm:p-8" dir="rtl">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[200] flex items-center gap-2.5 px-5 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-2xl shadow-blue-500/30 text-xs animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">اکوسیستم اصناف چندمنظوره (SedRazavi OS)</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/40">
                  فاز ۶.۰
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                تست و بررسی زنده ۵ ماژول تخصصی آموزشی، اشتراک ویژه VIP، جعبه دانلود سافت ۹۸، و تحریریه خبری
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                بازگشت به صفحه اصلی
              </button>
            )}
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20"
              >
                پیشخوان مدیریت
              </button>
            )}
          </div>
        </div>

        {/* Module Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: 'lms', label: 'دوره و اسپات‌پلیر', icon: GraduationCap, badge: 'SpotPlayer' },
            { id: 'vip', label: 'اشتراک ویژه VIP', icon: Crown, badge: 'Paywall' },
            { id: 'soft98', label: 'باکس دانلود Soft98', icon: Download, badge: 'Vault' },
            { id: 'magazine', label: 'تحریریه و اخبار', icon: Newspaper, badge: 'Editorial' },
            { id: 'portal', label: 'پورتال کاربری هوشمند', icon: UserCheck, badge: 'Adaptive' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeModule === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveModule(tab.id as any)}
                className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between h-24 ${
                  isActive
                    ? 'border-blue-500 bg-blue-500/15 text-white shadow-lg shadow-blue-500/10'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${isActive ? 'bg-blue-500/30 text-blue-300' : 'bg-slate-800 text-slate-500'}`}>
                    {tab.badge}
                  </span>
                </div>
                <div className="text-xs font-bold mt-2">{tab.label}</div>
              </button>
            );
          })}
        </div>

        {/* MODULE 1: LMS & SPOTPLAYER */}
        {activeModule === 'lms' && (
          <div className="space-y-6">
            {/* Spotlight Banner */}
            <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-blue-300">سیستم آموزش آنلاین و یکپارچه‌سازی وب‌هوک اسپات‌پلیر (SpotPlayer)</h3>
                <p className="text-xs text-slate-400">
                  پس از ثبت سفارش در ووکامرس، لایسنس اسپات‌پلیر بی‌درنگ تولید و در متای کاربر ذخیره می‌شود. پلیر اختصاصی دارای واترمارک متحرک شماره موبایل جهت جلوگیری از فیلم‌برداری از صفحه است.
                </p>
              </div>
              <button
                onClick={handleSimulateWebhook}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 shrink-0"
              >
                تست وب‌هوک و صدور لایسنس جدید
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Interactive Video Player with Floating Watermark */}
              <div className="lg:col-span-2 space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
                  {/* Player Top Bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4 text-blue-400 fill-blue-400" />
                      <span className="font-bold text-white">جلسه ۳: پیاده‌سازی هوک‌های پیشرفته ووکامرس و اسپات‌پلیر</span>
                    </div>
                    <span className="text-slate-400 font-mono">۴۸ دقیقه</span>
                  </div>

                  {/* Video Area */}
                  <div className="relative w-full aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80"
                      alt="Lesson Preview"
                      className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl shadow-blue-600/40 cursor-pointer hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 ml-1 fill-white" />
                      </div>
                    </div>

                    {/* Anti-Piracy Floating Mobile Watermark (Moves randomly) */}
                    <div
                      className="absolute pointer-events-none select-none text-[11px] font-mono text-white/40 bg-black/50 px-2.5 py-1 rounded-md backdrop-blur-xs transition-all duration-1000 border border-white/10"
                      style={{ top: watermarkPos.top, left: watermarkPos.left }}
                    >
                      <span className="flex items-center gap-1.5">
                        <Shield className="w-3 h-3 text-blue-400" />
                        <span>دانشجو: ۰۹۱۲۳۴۵۶۷۸۹</span>
                      </span>
                    </div>
                  </div>

                  {/* Controls preview */}
                  <div className="p-3 bg-slate-900 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-2 text-emerald-400 font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>واترمارک داینامیک ضدسرقت فعال است</span>
                    </span>
                    <span>کیفیت پخش: 1080p Full HD</span>
                  </div>
                </div>
              </div>

              {/* SpotPlayer Licenses List */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4 text-amber-400" />
                      <h4 className="text-xs font-bold text-white">کلیدهای صادر شده اسپات‌پلیر</h4>
                    </div>
                    <span className="text-[11px] text-blue-400 font-mono">{simulatedLicenses.length} کلید</span>
                  </div>

                  <div className="space-y-2.5">
                    {simulatedLicenses.map((lic, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                        <div className="font-semibold text-slate-200 line-clamp-1">{lic.courseTitle}</div>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                          <span className="font-mono text-emerald-400 font-bold select-all">{lic.licenseKey}</span>
                          <button
                            onClick={() => handleCopyLicense(lic.licenseKey)}
                            className="p-1 rounded text-slate-400 hover:text-white"
                            title="کپی لایسنس"
                          >
                            {copiedLicense === lic.licenseKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 2: VIP PAYWALL */}
        {activeModule === 'vip' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-amber-300">پی‌وال اشتراک طلایی و لینک‌های دانلودی موقت (Expiring Token URLs)</h3>
                <p className="text-xs text-slate-400">
                  محتوای اختصاصی تنها برای کاربران دارای پلن اشتراکی فعال رندر می‌شود. لینک‌های دانلود مستقیم فیلم و سریال با توکن موقت ۲ ساعته تولید می‌شوند تا لینک مستقیم سرور افشا نشود.
                </p>
              </div>

              {/* VIP status toggle simulator */}
              <button
                onClick={() => {
                  setIsVipSimulated(!isVipSimulated);
                  showToast(isVipSimulated ? 'وضعیت به کاربر عادی تغییر یافت.' : 'اشتراک ویژه VIP فعال شد!');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                  isVipSimulated
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                }`}
              >
                {isVipSimulated ? 'تغییر به کاربر عادی (قفل کردن محتوا)' : 'شبیه‌سازی اشتراک VIP (باز کردن محتوا)'}
              </button>
            </div>

            {/* Content Lock Simulator */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white">پیش‌نمایش شورتکد [sedrazavi_vip_guard]:</h4>

              {isVipSimulated ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-right space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Unlock className="w-5 h-5" />
                    <span>محتوای اختصاصی باز شد (وضعیت VIP فعال است)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    این متن و جعبه دانلود کیفیت 4K و صوت دوبله فارسی به دلیل فعال بودن اشتراک ویژه برای شما بدون سانسور و با نهایت پهنای باند سرور رندر شده است.
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={handleGenerateExpiringToken}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all"
                    >
                      تولید لینک موقت ۲ ساعته
                    </button>
                    {generatedDlToken && (
                      <span className="text-xs font-mono text-emerald-300">
                        لینک رمزگذاری شده: /sedrazavi/v1/download/{generatedDlToken}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-slate-950 to-slate-900 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-amber-300">این محتوا و لینک‌های دانلود مختص مشترکین ویژه VIP است</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    برای دسترسی نامحدود به سرورهای نیم‌بها، فایل‌های بدون تبلیغ و صوت‌های دوبله اختصاصی، یکی از پلن‌های زیر را انتخاب کنید.
                  </p>
                  <button
                    onClick={() => {
                      setIsVipSimulated(true);
                      showToast('اشتراک ویژه فعال گردید.');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
                  >
                    خرید آنی اشتراک VIP
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODULE 3: SOFT98 DOWNLOAD BOX */}
        {activeModule === 'soft98' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">جعبه دانلود حرفه‌ای و چندسروره (Shortcode: [sedrazavi_download_box])</h3>
              <p className="text-xs text-slate-400">
                طراحی شده دقیقا متناسب با بالاترین استانداردهای سایت‌های دانلودی نرم‌افزار ایران (سبک سافت ۹۸) با پشتیبانی از چند لینک کمکی، کپی رمز با یک کلیک و گزارش خرابی بدون رفرش.
              </p>

              {/* Rendered Box */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-xl overflow-hidden">
                <div className="flex flex-wrap items-center justify-between p-4 bg-slate-900 border-b border-slate-800 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">پکیج قالب جامع SedRazavi OS نسخه ۵.۰</h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="font-mono text-blue-400">v5.0.0 Stable</span>
                        <span>•</span>
                        <span>حجم: ۴۸.۵ مگابایت</span>
                        <span>•</span>
                        <span>شامل ۴ چایلدتم + افزونه همراه</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono">Windows</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">macOS</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono">Linux</span>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href="#direct"
                      onClick={(e) => { e.preventDefault(); showToast('در حال شروع دانلود با نهایت سرعت سرور ایران...'); }}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>دانلود از سرور پرسرعت ایران (لینک مستقیم)</span>
                      </div>
                      <span className="text-[10px] opacity-80 font-mono">HTTP/2</span>
                    </a>

                    <a
                      href="#mirror"
                      onClick={(e) => { e.preventDefault(); showToast('در حال شروع دانلود از سرور کمکی آلمان...'); }}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-slate-400" />
                        <span>دانلود از سرور پشتیبان آلمان (Mirror 2)</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">CDN</span>
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">رمز فایل فشرده:</span>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700">
                        <span className="font-mono text-emerald-400 font-bold select-all">www.sedrazavi.ir</span>
                        <button
                          onClick={() => handleCopyPassword('www.sedrazavi.ir')}
                          className="text-slate-400 hover:text-white"
                          title="کپی رمز"
                        >
                          {copiedPassword ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => showToast('گزارش خرابی لینک ثبت شد و برای پشتیبانی ارسال گردید.')}
                      className="text-rose-400 hover:text-rose-300 text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>گزارش خرابی لینک</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 4: MAGAZINE & NEWS */}
        {activeModule === 'magazine' && (
          <div className="space-y-6">
            {/* Live Breaking News Ticker */}
            <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold shrink-0 shadow-lg shadow-rose-600/30">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>اخبار فوری تحریریه</span>
              </div>
              <div className="overflow-hidden whitespace-nowrap flex-1">
                <div className="animate-pulse text-slate-300 font-medium">
                  ✦ انتشار رسمی نسخه ۵.۰ قالب SedRazavi با معماری فوق‌سریع Bun و سازگاری کامل با اسپات‌پلیر
                </div>
              </div>
            </div>

            {/* Articles with Reading Time Estimation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: 'راهنمای راه‌اندازی مدرسه آنلاین و محافظت از دوره‌ها در برابر سرقت محتوا',
                  time: '۴ دقیقه',
                  tag: 'آموزش و LMS',
                  date: 'امروز',
                },
                {
                  title: 'مقایسه بازدهی سرورهای دانلود داخلی و اتصال به لینک‌های موقت توکن‌دار',
                  time: '۶ دقیقه',
                  tag: 'شبکه و زیرساخت',
                  date: 'دیروز',
                },
                {
                  title: 'چگونه وبلاگ خبری با تیکر فوری و سئوی رتبه یک در وردپرس بسازیم؟',
                  time: '۳ دقیقه',
                  tag: 'تولید محتوا',
                  date: '۲ روز پیش',
                },
              ].map((art, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <span className="text-[11px] text-blue-400 font-semibold">{art.tag}</span>
                  <h4 className="text-sm font-bold text-white leading-snug">{art.title}</h4>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>زمان مطالعه: {art.time}</span>
                    </span>
                    <span>{art.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 5: ADAPTABLE CLIENT PORTAL */}
        {activeModule === 'portal' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    ع
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">علیرضا میررضوی (دانشجو و مشترک VIP)</h3>
                    <p className="text-xs text-slate-400 mt-0.5">alireza@example.com • عضویت از فروردین ۱۴۰۳</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>پلن اشتراک طلایی فعال ({vipDaysRemaining} روز باقی‌مانده)</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Courses & SpotPlayer */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <GraduationCap className="w-4 h-4 text-blue-400" />
                      <span>لایسنس‌های اسپات‌پلیر من</span>
                    </div>
                    <span className="text-[11px] text-blue-400 font-mono">۲ دوره</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {simulatedLicenses.map((lic, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-300 line-clamp-1">{lic.courseTitle}</span>
                        <span className="font-mono text-emerald-400 font-bold mr-2">{lic.licenseKey}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VIP Downloads */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Download className="w-4 h-4 text-emerald-400" />
                      <span>فایل‌های دانلودی اختصاصی</span>
                    </div>
                    <span className="text-[11px] text-emerald-400">لینک‌های مستقیم</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300">سورس‌کد پکیج جامع SedRazavi OS v5.0</span>
                      <span className="text-blue-400 font-bold cursor-pointer" onClick={() => showToast('در حال آماده‌سازی دانلود...')}>دانلود</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300">کیت المنتور و ۵۰ پترن بلاک گوتنبرگ</span>
                      <span className="text-blue-400 font-bold cursor-pointer" onClick={() => showToast('در حال آماده‌سازی دانلود...')}>دانلود</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
