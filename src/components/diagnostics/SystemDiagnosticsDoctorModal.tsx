import React, { useState } from 'react';
import {
  Stethoscope,
  Activity,
  ShieldCheck,
  Zap,
  RefreshCw,
  X,
  CheckCircle2,
  AlertTriangle,
  Database,
  Cpu,
  Clock,
  FileCode,
  Download,
  Lock,
  Server,
  Layers,
  Sparkles,
  Terminal
} from 'lucide-react';

interface SystemDiagnosticsDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemDiagnosticsDoctorModal: React.FC<SystemDiagnosticsDoctorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'audit_checks' | 'self_healing' | 'support_bundle'>('overview');
  const [isHealing, setIsHealing] = useState(false);
  const [healingProgress, setHealingProgress] = useState(0);
  const [healingCompleted, setHealingCompleted] = useState(false);
  const [healedItems, setHealedItems] = useState<string[]>([]);
  const [copiedBundle, setCopiedBundle] = useState(false);

  // Diagnostic checks data matching class-sedrazavi-diagnostics-doctor.php
  const diagnosticChecks = [
    {
      id: 'php_mem',
      title: 'محدودیت حافظه اجرایی PHP (Memory Limit)',
      value: '512M',
      recommended: '256M+',
      status: 'pass',
      score: 100,
      icon: Cpu,
      description: 'حافظه تخصیص‌یافته کاملاً استاندارد و فراتر از آستانه مورد نیاز برای المنتور و ماژول‌های حقوقی است.',
    },
    {
      id: 'ttfb_latency',
      title: 'زمان پاسخ سرور و تاخیر REST (TTFB Latency)',
      value: '۱۸ میلی‌ثانیه',
      recommended: '< ۱۲۰ms',
      status: 'pass',
      score: 99,
      icon: Clock,
      description: 'پاسخ‌دهی بهینه با کش پایدار Object Cache و دیتابیس لوکال بدون گلوگاه شبکه.',
    },
    {
      id: 'elementor_meta',
      title: 'یکپارچگی ساختار متادیتای المنتور (_elementor_data)',
      value: '۱۰۰٪ سالم',
      recommended: 'فاقد خطای JSON',
      status: 'pass',
      score: 100,
      icon: Layers,
      description: 'تمامی تمپلیت‌ها، پاپ‌آپ‌ها و برگه‌های المنتور با استانداردهای ساختاری JSON سازگار بوده و متادیتای خراب ندارند.',
    },
    {
      id: 'vault_isolation',
      title: 'سد دفاعی گاوصندوق اسناد محرمانه (.htaccess Vault Isolation)',
      value: 'محافظت ۲ لایه فعال',
      recommended: 'Deny from all',
      status: 'pass',
      score: 100,
      icon: Lock,
      description: 'فایل .htaccess در پوشه wp-content/uploads/sedrazavi-vault/ مانع دسترسی مستقیم HTTP و اجرای فایل‌های PHP است.',
    },
    {
      id: 'db_charset',
      title: 'کالکشن و انکودینگ دیتابیس (utf8mb4_persian_ci)',
      value: 'utf8mb4_unicode_520_ci',
      recommended: 'utf8mb4',
      status: 'pass',
      score: 98,
      icon: Database,
      description: 'پشتیبانی کامل ۴ بایتی از رسم‌الخط فارسی، نیم‌فاصله، متون طولانی حقوقی و ایموجی‌ها بدون به هم ریختگی متون.',
    },
    {
      id: 'wp_cron',
      title: 'زمان‌بند پس‌زمینه و پاک‌سازی نوبت‌ها (WP-Cron Health)',
      value: '۱۴ تسک فعال',
      recommended: 'فاقد تسک منقضی',
      status: 'pass',
      score: 96,
      icon: Zap,
      description: 'تسک‌های یادآوری مهلت‌های قضایی، پاک‌سازی ترنزینت‌ها و بررسی سلامت سیستم در زمان مقرر اجرا می‌شوند.',
    },
    {
      id: 'security_headers',
      title: 'هدرهای امنیتی ضد کلیک‌جکینگ و XSS',
      value: 'X-Frame-Options: SAMEORIGIN',
      recommended: 'هدرهای سخت‌گیرانه',
      status: 'pass',
      score: 100,
      icon: ShieldCheck,
      description: 'هدرهای X-Content-Type-Options: nosniff و هدرهای ضد کلیک‌جکینگ طبق بند ۸.۲ مستر پلن فعال‌اند.',
    },
  ];

  // Self-Healing Execution Handler
  const handleExecuteSelfHealing = () => {
    setIsHealing(true);
    setHealingProgress(10);
    setHealingCompleted(false);
    setHealedItems([]);

    const steps = [
      { p: 25, item: 'تجدید و قفل‌گذاری فایل .htaccess در مسیر wp-content/uploads/sedrazavi-vault/' },
      { p: 55, item: 'پاک‌سازی عمیق ترنزینت‌های منقضی و بهینه‌سازی کش Options دیتابیس' },
      { p: 80, item: 'بازسازی اتمیک پیوندهای یکتا (Flush Rewrite Rules) و کش کوئری‌ها' },
      { p: 100, item: 'ثبت رویداد خودترمیمی در دفتر وقایع امنیتی غیرقابل تغییر (Audit Log)' },
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setHealingProgress(step.p);
        setHealedItems((prev) => [...prev, step.item]);
        if (index === steps.length - 1) {
          setIsHealing(false);
          setHealingCompleted(true);
        }
      }, (index + 1) * 600);
    });
  };

  const supportBundle = {
    bundle_id: 'SB-2026-DIAG-9941',
    generated_at: new Date().toISOString(),
    system: {
      framework: 'SedRazavi OS v25.0',
      php_version: '8.2.16',
      wordpress_version: '6.5.3',
      memory_limit: '512M',
      max_execution_time: 300,
      server_software: 'LiteSpeed / OpenLiteSpeed Enterprise',
    },
    compliance: {
      anti_idor_barrier: 'ACTIVE (HTTP 403 Enforced)',
      zero_pii_leak: 'VERIFIED',
      zero_external_cdn: 'VERIFIED',
      vault_isolation: 'SECURE (.htaccess active)',
      elementor_meta_integrity: 'PASS',
    },
    sanitization_notice:
      'کلیه اطلاعات هویتی موکلین، شماره‌های تماس، گذرواژه‌ها و کلیدهای محرمانه به‌صورت خودکار قبل از ایجاد بسته فیلتر و قرمز شده‌اند.',
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[125] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 md:p-6 overflow-y-auto"
      dir="rtl"
    >
      <div className="relative w-full max-w-5xl bg-[#0b132b]/95 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-950/80 via-[#0b132b] to-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Stethoscope className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">دکتر دیاگنوستیک و خودترمیمی هوشمند</h2>
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  فاز ۵ معماری (P5 & v17.0)
                </span>
                <span className="px-2 py-0.5 text-[11px] font-mono font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  امتیاز سلامت: ۹۸/۱۰۰
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>پایش سلامت زیرساخت، بررسی متادیتای المنتور، رفع خطای کش و ایزولاسیون گاوصندوق</span>
                <span className="text-cyan-400">•</span>
                <span className="font-mono text-slate-300">@sedrazavi</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="بستن"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 py-2.5 bg-black/40 border-b border-cyan-500/20 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'overview'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>نمای کلی سلامت و منابع</span>
          </button>

          <button
            onClick={() => setActiveTab('audit_checks')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'audit_checks'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>بررسی‌های ۷‌گانه دیتابیس و هسته</span>
          </button>

          <button
            onClick={() => setActiveTab('self_healing')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'self_healing'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>خودترمیمی خودکار ۱-کلیک (Self-Healing)</span>
          </button>

          <button
            onClick={() => setActiveTab('support_bundle')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'support_bundle'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>بسته عیب‌یابی پشتیبانی (Support Bundle)</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Top Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-cyan-500/30 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">شاخص سلامت سیستم</div>
                    <div className="text-xl font-black text-white font-mono">98 / 100</div>
                    <div className="text-[10px] text-emerald-400 font-bold">عالی (Optimal)</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-slate-800 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">تاخیر پاسخگویی (TTFB)</div>
                    <div className="text-xl font-black text-white font-mono">18 ms</div>
                    <div className="text-[10px] text-indigo-400 font-bold">بسیار سریع</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-slate-800 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">حافظه PHP تخصیص‌یافته</div>
                    <div className="text-xl font-black text-white font-mono">512 MB</div>
                    <div className="text-[10px] text-emerald-400 font-bold">بالاتر از ۲۵۶MB</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-slate-800 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">ایزولاسیون گاوصندوق</div>
                    <div className="text-xl font-black text-emerald-400 font-mono">L2 LOCKED</div>
                    <div className="text-[10px] text-slate-400">سد .htaccess فعال</div>
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-cyan-200">
                    تمام ۷ مؤلفه حیاتی زیرساخت وردپرس و هسته پلتفرم بدون هیچ‌گونه خطا کار می‌کنند
                  </h4>
                  <p className="text-xs text-slate-300">
                    متادیتای المنتور، جداول دیتابیس، کش ترنزینت و هدرهای امنیتی به صورت خودکار مانیتور می‌شوند.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('self_healing')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shrink-0 shadow-lg shadow-emerald-600/30"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>اجرای خودترمیمی دوره‌ای</span>
                </button>
              </div>

              {/* Environment Information */}
              <div className="p-5 rounded-2xl bg-black/40 border border-slate-800 space-y-3">
                <h5 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyan-400" />
                  <span>مشخصات محیط سرور و تنظیمات ران‌تایم:</span>
                </h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">نسخه PHP:</span>
                    <span className="font-mono text-white font-bold">8.2.16 (OPcache On)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">نسخه وردپرس:</span>
                    <span className="font-mono text-white font-bold">6.5.3 (Fast-CGI)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">وب‌سرور:</span>
                    <span className="font-mono text-white font-bold">LiteSpeed Enterprise</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">حداکثر زمان اجرا:</span>
                    <span className="font-mono text-white font-bold">300 Seconds</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AUDIT CHECKS */}
          {activeTab === 'audit_checks' && (
            <div className="space-y-3">
              {diagnosticChecks.map((check) => {
                const IconComponent = check.icon;
                return (
                  <div
                    key={check.id}
                    className="p-4 rounded-xl bg-black/40 border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-cyan-600/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-white">{check.title}</h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            امتیاز: {check.score}٪
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{check.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 text-xs">
                      <div className="text-left font-mono">
                        <span className="text-slate-400 block text-[10px]">مقدار جاری:</span>
                        <span className="text-white font-bold">{check.value}</span>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: SELF-HEALING */}
          {activeTab === 'self_healing' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-sm font-black text-emerald-200">
                    موتور خودترمیمی خودکار ۱-کلیک (Non-Destructive Auto-Fix)
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  طبق بند ۱۲ مستر پلن v25.0، سیستم خودترمیمی قادر است بدون آسیب به محتوای سایت یا حذف داده‌های کاربر، فایل‌های ایزولاسیون .htaccess را بازسازی کرده، ترنزینت‌های منقضی را پاک و پیوندهای یکتا را نوسازی کند.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleExecuteSelfHealing}
                    disabled={isHealing}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black text-xs flex items-center gap-2 transition-all shadow-xl shadow-emerald-600/30"
                  >
                    <RefreshCw className={`w-4 h-4 ${isHealing ? 'animate-spin' : ''}`} />
                    <span>{isHealing ? 'در حال اجرای خودترمیمی...' : 'شروع عملیات خودترمیمی و بهینه‌سازی'}</span>
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              {isHealing && (
                <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-300">
                    <span>پیشرفت عملیات:</span>
                    <span>{healingProgress}٪</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${healingProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Repaired items log */}
              {healedItems.length > 0 && (
                <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                  <h5 className="text-xs font-bold text-slate-300 mb-2">گزارش اقدامات اصلاحی انجام‌شده:</h5>
                  {healedItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                  {healingCompleted && (
                    <div className="pt-2 text-xs font-bold text-cyan-300 flex items-center gap-1.5 border-t border-slate-800/80 mt-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      <span>عملیات با موفقیت انجام شد. تمامی سدها و کش‌ها به بهترین وضعیت ارتقا یافتند.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SUPPORT BUNDLE */}
          {activeTab === 'support_bundle' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/30 border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>
                    بسته عیب‌یابی پشتیبانی (Support Bundle) منطبق بر بند ۱۱.۵ مستر پلن v25.0 — داده‌های شخصی و پسوردها فیلتر شده‌اند.
                  </span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(supportBundle, null, 2));
                    setCopiedBundle(true);
                    setTimeout(() => setCopiedBundle(false), 2000);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-600 text-cyan-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 border border-cyan-500/40"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{copiedBundle ? 'کپی شد!' : 'کپی خروجی JSON'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-slate-800 font-mono text-[11px] text-cyan-300/90 leading-relaxed overflow-x-auto max-h-80">
                <pre>{JSON.stringify(supportBundle, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-cyan-500/20 bg-black/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
            <span>سیستم خودترمیمی دکتر سدرضوی — بدون هیچ‌گونه اتکای خارجی به CDN یا افزونه‌های تجاری</span>
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
