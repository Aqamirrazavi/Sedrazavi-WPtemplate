import React, { useState } from 'react';
import {
  Layers,
  ArrowRightLeft,
  Eye,
  EyeOff,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Wifi,
  WifiOff,
  Bell,
  Clock,
  ExternalLink,
  Shield,
  FileCode,
  Users,
  Activity,
  BarChart3,
  TrendingUp,
  Sparkles,
  Zap,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

export const UnifiedDualPanelSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const [activeSubTab, setActiveSubTab] = useState<'sso_impersonation' | 'data_sync' | 'shared_widgets' | 'unified_audit'>('sso_impersonation');

  // Impersonation State
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [impersonatedUser, setImpersonatedUser] = useState({
    id: 'lawyer-42',
    name: 'دکتر علیرضا افشار',
    role: 'وکیل پایه یک دادگستری',
    email: 'alireza.afshar@law.ir',
  });

  // SSO Token Simulator
  const [ssoToken, setSsoToken] = useState<string | null>(null);
  const [ssoCopied, setSsoCopied] = useState(false);

  // Sync Engine State
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline' | 'conflict'>('synced');
  const [syncMode, setSyncMode] = useState<'websocket' | 'sse' | 'polling'>('websocket');
  const [lastSyncTime, setLastSyncTime] = useState('چند لحظه پیش');
  const [conflictModalOpen, setConflictModalOpen] = useState(false);

  // Conflict state
  const [conflictData, setConflictData] = useState({
    field: 'حق‌الوکاله مشاوره حضوری (ساعتی)',
    myVersion: '۳,۵۰۰,۰۰۰ تومان (ویرایش‌شده در پنل فرانت‌اند)',
    otherVersion: '۴,۰۰۰,۰۰۰ تومان (ویرایش‌شده همزمان توسط ادمین در WP-Admin)',
    otherUser: 'ادمین کل سیستم (دکتر رضوی)',
    timestamp: '۱ دقیقه پیش',
  });

  // KPI Shared Data
  const [kpis] = useState([
    { id: '1', title: 'پرونده‌های جاری دفتر', value: '۴۸ فقره', change: '+۱۲٪', trend: 'up' },
    { id: '2', title: 'نوبت‌های مشاوره امروز', value: '۶ جلسه', change: '۲ رزرو جدید', trend: 'neutral' },
    { id: '3', title: 'وصول مطالبات ماه جاری', value: '۲۴۰,۰۰۰,۰۰۰ تومان', change: '+۱۸٪', trend: 'up' },
    { id: '4', title: 'لوایح در انتظار ارسال', value: '۳ فقره', change: 'موعد فردا', trend: 'warning' },
  ]);

  // Generate 5-Minute SSO Token
  const handleGenerateSsoToken = () => {
    const token = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setSsoToken(token);
    setTimeout(() => {
      setSsoToken(null);
    }, 300000); // 5 minutes
  };

  // Manual Trigger Sync
  const handleTriggerManualSync = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
      setLastSyncTime('هم‌اکنون');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#070B19] text-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      {/* Impersonation Fixed Banner if active */}
      {isImpersonating && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#8B0000] text-white px-4 py-2.5 shadow-2xl border-b border-rose-400/40 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <span>
              <strong>حالت مشاهده نیابتی (Impersonation Mode) فعال است:</strong> شما در حال مشاهده و بررسی پنل از دیدگاه <strong>{impersonatedUser.name} ({impersonatedUser.role})</strong> هستید.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-white/70 hidden sm:inline">اقدامات مالی و محرمانه مسدود و کلیه کلیک‌ها در Audit Log ثبت می‌شود.</span>
            <button
              onClick={() => setIsImpersonating(false)}
              className="px-3 py-1 rounded bg-white text-[#8B0000] font-bold text-xs hover:bg-gray-100 transition-colors"
            >
              خروج از Impersonation
            </button>
          </div>
        </div>
      )}

      {/* Header Container */}
      <div className={`max-w-6xl mx-auto mb-8 ${isImpersonating ? 'pt-8' : ''}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#0B132B] via-[#121E42] to-[#0B132B] border border-[#D4AF37]/30 shadow-xl shadow-black/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold mb-2 border border-[#D4AF37]/20">
              <Layers className="w-3.5 h-3.5" />
              <span>فاز ۱۷: یکپارچگی دو پنل (Unified Dual-Panel Integration)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white flex items-center gap-3">
              <ArrowRightLeft className="w-8 h-8 text-[#D4AF37]" />
              اتصال یکپارچه پیشخوان وکیل و مدیریت وردپرس (SSO & Sync)
            </h1>
            <p className="text-gray-300 text-sm mt-1 max-w-2xl">
              همگام‌سازی لحظه‌ای نشست‌ها با Single Session Cookie، ورود بدون نیاز به لاگین مجدد با توکن SSO، حالت مشاهده نیابتی (Impersonation)، و ویجت‌های مشترک داده‌ای.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs border border-white/10 transition-colors"
              >
                بازگشت به صفحه اصلی
              </button>
            )}
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-[#0B132B] font-bold text-xs shadow-md shadow-[#D4AF37]/20 transition-all hover:scale-105"
              >
                میز کار وکیل
              </button>
            )}
          </div>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 p-1.5 rounded-xl bg-[#0B132B]/80 border border-white/10">
          <button
            onClick={() => setActiveSubTab('sso_impersonation')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'sso_impersonation'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>توکن SSO و حالت مشاهده نیابتی (Impersonation)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('data_sync')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'data_sync'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>موتور همگام‌سازی و مدیریت تعارض داده‌ها</span>
          </button>

          <button
            onClick={() => setActiveSubTab('shared_widgets')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'shared_widgets'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>ویجت‌های مشترک دو پنل (Shared KPIs)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('unified_audit')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'unified_audit'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>مرکز اعلانات و لاگ تعاملی دو پنل</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-6xl mx-auto space-y-8">
        {/* TAB 1: SSO & IMPERSONATION */}
        {activeSubTab === 'sso_impersonation' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* SSO Token Card */}
            <div className="bg-[#0B132B] border border-white/10 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">انتقال بدون نیاز به ورود مجدد (Cross-Panel SSO)</h2>
                  <p className="text-xs text-gray-400">تولید توکن رمزنگاری‌شده یکبارمصرف با عمر مفید ۵ دقیقه.</p>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                هنگامی که ادمین در WP-Admin بر روی «ورود به پنل وکیل» کلیک می‌کند یا وکیل از پنل فرانت به محیط پیشخوان وردپرس جابجا می‌شود، توکن امن ۶۴ بایتی در حافظه موقت <code className="text-[#D4AF37]">transient</code> درج شده و انتقال بدون نیاز به ورود دوباره رمز صورت می‌پذیرد.
              </p>

              <div className="p-4 rounded-xl bg-[#121E42]/60 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">وضعیت توکن SSO انتقال:</span>
                  <span className={`text-xs font-bold ${ssoToken ? 'text-emerald-400' : 'text-gray-500'}`}>
                    {ssoToken ? 'فعال (اعتبار ۳۰۰ ثانیه)' : 'صادر نشده'}
                  </span>
                </div>

                {ssoToken ? (
                  <div className="space-y-2">
                    <code className="block p-3 rounded-lg bg-[#0B132B] border border-emerald-500/30 font-mono text-[11px] text-emerald-300 break-all">
                      {ssoToken}
                    </code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(ssoToken);
                        setSsoCopied(true);
                        setTimeout(() => setSsoCopied(false), 2000);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs border border-white/10"
                    >
                      {ssoCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{ssoCopied ? 'کپی شد' : 'کپی توکن'}</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleGenerateSsoToken}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-[#0B132B] font-bold text-xs shadow-md shadow-[#D4AF37]/20 hover:scale-[1.01] transition-all"
                  >
                    تولید توکن آزمایشی انتقال (Generate SSO Token)
                  </button>
                )}
              </div>
            </div>

            {/* Impersonation Card */}
            <div className="bg-[#0B132B] border border-white/10 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">حالت ورود نیابتی ادمین (Impersonation Mode)</h2>
                  <p className="text-xs text-gray-400">بررسی مشکلات فنی یا پرونده‌ای با ورود مستقیم به دیدگاه وکیل مدنظر.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#121E42]/60 border border-white/10 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">وکیل هدف:</span>
                  <span className="font-bold text-white">{impersonatedUser.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">سمت:</span>
                  <span className="text-gray-300">{impersonatedUser.role}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">ایمیل سازمانی:</span>
                  <span className="text-[#D4AF37] font-mono">{impersonatedUser.email}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs space-y-1.5 leading-relaxed">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  قواعد امنیتی حالت Impersonation:
                </div>
                <p>
                  ۱. حداکثر مدت مجاز هر نشست نیابتی ۳۰ دقیقه است.<br />
                  ۲. دسترسی به درگاه‌های پرداخت، رمز عبور اصلی و برداشت‌های مالی در این حالت مسدود است.<br />
                  ۳. بنر قرمز در سراسر صفحه حضور ادمین را نمایان می‌دارد.
                </p>
              </div>

              <button
                onClick={() => setIsImpersonating(!isImpersonating)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                  isImpersonating
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-[#D4AF37] hover:bg-[#B8960F] text-[#0B132B]'
                }`}
              >
                {isImpersonating ? 'خروج از حالت Impersonation' : 'فعال‌سازی حالت ورود نیابتی به عنوان وکیل'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: DATA SYNC & CONCURRENCY */}
        {activeSubTab === 'data_sync' && (
          <div className="bg-[#0B132B] border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-[#D4AF37]" />
                  موتور همگام‌سازی لحظه‌ای و حل تعارض داده‌ها (Sync Engine & Concurrency Control)
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  منبع واحد حقیقت (Single Source of Truth) میان پایگاه داده وردپرس و پیشخوان فرانت‌اند وکلای دفتر.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-gray-300">وضعیت همگام‌سازی:</span>
                  <span className="font-bold text-emerald-400">برخط (Real-time)</span>
                </div>
                <button
                  onClick={handleTriggerManualSync}
                  className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37] text-[#0B132B] font-bold text-xs flex items-center gap-1.5 hover:scale-105 transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                  <span>همگام‌سازی دستی</span>
                </button>
              </div>
            </div>

            {/* Protocols Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#121E42]/60 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>کانال فعال: WebSocket</span>
                  <Wifi className="w-4 h-4" />
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  اتصال پایدار دوطرفه برای انتشار در لحظه تغییرات وضعیت پرونده‌ها، پیام‌های جدید موکل و نوبت‌ها.
                </p>
                <div className="text-[10px] text-gray-500 pt-1">پروتکل: wss://sedrazavi.com:8080/sync</div>
              </div>

              <div className="p-4 rounded-xl bg-[#121E42]/40 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-gray-300">
                  <span>پروتکل جایگزین: SSE</span>
                  <Activity className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  رویدادهای سرور (Server-Sent Events) در زمان فیلتر بودن یا مسدودی پورت‌های سوکت.
                </p>
                <div className="text-[10px] text-gray-500 pt-1">مسیر: /wp-json/sedrazavi/v1/sync/stream</div>
              </div>

              <div className="p-4 rounded-xl bg-[#121E42]/40 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-gray-300">
                  <span>مکانیزم Fallback: Polling</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  استعلام دوره‌ای پس‌زمینه هر ۳۰ ثانیه در شرایط افت شدید سرعت شبکه.
                </p>
                <div className="text-[10px] text-gray-500 pt-1">دوره استعلام: ۳۰ ثانیه</div>
              </div>
            </div>

            {/* Simulated Conflict Warning */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0" />
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-white block">شبیه‌ساز تعارض ویرایش همزمان (Concurrency Conflict Simulator)</span>
                  <span className="text-gray-300">هنگامی که دو کاربر همزمان یک رکورد مالی یا متن قرارداد را ویرایش کنند، قفل خوش‌بینانه فعال می‌شود.</span>
                </div>
              </div>

              <button
                onClick={() => setConflictModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-all flex-shrink-0"
              >
                مشاهده و حل تعارض (Conflict Resolution)
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: SHARED WIDGETS */}
        {activeSubTab === 'shared_widgets' && (
          <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map(kpi => (
                <div key={kpi.id} className="p-5 rounded-2xl bg-[#0B132B] border border-white/10 space-y-3">
                  <span className="text-xs text-gray-400 block">{kpi.title}</span>
                  <div className="text-xl sm:text-2xl font-bold font-serif text-white">{kpi.value}</div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{kpi.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions & Unified Panel Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#0B132B] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#D4AF37]" />
                    روند عملکرد پرونده‌ها و استعلام‌های حقوقی (۳۰ روز اخیر)
                  </h3>
                  <span className="text-xs text-[#D4AF37] font-semibold">همگام میان هر دو پنل</span>
                </div>

                <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2">
                  {[45, 60, 52, 78, 65, 90, 85, 95, 70, 88, 100, 92].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-gradient-to-t from-[#D4AF37]/30 to-[#D4AF37] rounded-t-md transition-all hover:brightness-125"
                        style={{ height: `${val}%` }}
                        title={`روز ${idx + 1}: ${val} مراجعه`}
                      />
                      <span className="text-[10px] text-gray-500 font-mono">{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0B132B] border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-white/10">
                  <Zap className="w-4 h-4 text-[#D4AF37]" />
                  دستورهای میانبر و هاب ارجاعات سریع
                </h3>
                <div className="space-y-2.5 text-xs">
                  <button
                    onClick={() => alert('هدایت به فرم ثبت پرونده جدید موکل')}
                    className="w-full text-right p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between"
                  >
                    <span>ثبت و ارجاع پرونده جدید</span>
                    <span className="text-[#D4AF37]">‹</span>
                  </button>
                  <button
                    onClick={() => alert('هدایت به جدول مواعد و تقویم قضایی')}
                    className="w-full text-right p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between"
                  >
                    <span>تقویم مواعد دادگاه‌ها</span>
                    <span className="text-[#D4AF37]">‹</span>
                  </button>
                  <button
                    onClick={() => alert('هدایت به بخش صدور فاکتور الکترونیک')}
                    className="w-full text-right p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between"
                  >
                    <span>صدور قرارداد و صورتحساب حق‌الوکاله</span>
                    <span className="text-[#D4AF37]">‹</span>
                  </button>
                  <button
                    onClick={() => alert('هدایت به مخزن اسناد و لوایح')}
                    className="w-full text-right p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between"
                  >
                    <span>گاوصندوق اسناد و مدارک موکل</span>
                    <span className="text-[#D4AF37]">‹</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: UNIFIED AUDIT */}
        {activeSubTab === 'unified_audit' && (
          <div className="bg-[#0B132B] border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#D4AF37]" />
                  مرکز اعلانات یکپارچه دو پنل (Unified Notification Hub)
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">اعلان‌های مالی، قضایی و سیستمی به صورت همزمان در هر دو محیط نمایش داده می‌شوند.</p>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                همگام‌شده با سشن کاربر
              </span>
            </div>

            <div className="space-y-3">
              {[
                { id: '1', title: 'دریافت پاسخ لایحه تجدیدنظرخواهی', time: '۱۰ دقیقه پیش', type: 'legal', read: false },
                { id: '2', title: 'پرداخت موفق پیش‌پرداخت قرارداد شماره ۱۴۰۳/۱۸', time: '۱ ساعت پیش', type: 'financial', read: true },
                { id: '3', title: 'رزرو نوبت مشاوره حضوری برای فردا ساعت ۱۶:۰۰', time: '۳ ساعت پیش', type: 'booking', read: true },
                { id: '4', title: 'ورود جدید به پنل با دستگاه MacBook Pro', time: 'دیروز ساعت ۱۱:۲۰', type: 'security', read: true },
              ].map(item => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
                    !item.read ? 'bg-[#121E42] border-[#D4AF37]/40' : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${!item.read ? 'bg-[#D4AF37]' : 'bg-gray-600'}`} />
                    <div>
                      <span className="text-xs font-bold text-white block">{item.title}</span>
                      <span className="text-[11px] text-gray-400">{item.time}</span>
                    </div>
                  </div>

                  <span className="text-[11px] text-[#D4AF37] hover:underline cursor-pointer">
                    مشاهده جزئیات
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CONFLICT RESOLUTION MODAL */}
      {conflictModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" dir="rtl">
          <div className="bg-[#0B132B] border border-amber-500/50 rounded-2xl p-6 max-w-2xl w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                <AlertTriangle className="w-5 h-5" />
                <span>تعارض همزمانی در ذخیره داده (Optimistic Locking Conflict)</span>
              </div>
              <button onClick={() => setConflictModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              فیلد <strong>«{conflictData.field}»</strong> تقریباً همزمان در دو پنل ویرایش شده است. جهت جلوگیری از ناهماهنگی در محاسبات و گزارش‌ها، نسخه مدنظر خود را انتخاب فرمایید:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* My Version */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <div className="font-bold text-emerald-400 flex items-center justify-between">
                  <span>نسخه شما (فرانت‌اند):</span>
                  <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">هم‌اکنون</span>
                </div>
                <div className="text-white font-mono p-3 rounded bg-black/40 border border-emerald-500/20">
                  {conflictData.myVersion}
                </div>
                <button
                  onClick={() => {
                    alert('نسخه شما انتخاب و در پایگاه داده سراسری اعمال شد.');
                    setConflictModalOpen(false);
                  }}
                  className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all"
                >
                  نگه‌داشتن نسخه من
                </button>
              </div>

              {/* Other Version */}
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-2">
                <div className="font-bold text-blue-400 flex items-center justify-between">
                  <span>نسخه همکار / ادمین:</span>
                  <span className="text-[10px] bg-blue-500/20 px-2 py-0.5 rounded">{conflictData.timestamp}</span>
                </div>
                <div className="text-white font-mono p-3 rounded bg-black/40 border border-blue-500/20">
                  {conflictData.otherVersion}
                </div>
                <button
                  onClick={() => {
                    alert('نسخه همکار تایید و جایگزین شد.');
                    setConflictModalOpen(false);
                  }}
                  className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all"
                >
                  پذیرش نسخه همکار
                </button>
              </div>
            </div>

            <div className="text-[11px] text-gray-400 text-center pt-2">
              تغییرات انتخاب‌شده در هر دو پنل در کسری از ثانیه همگام می‌گردد.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
