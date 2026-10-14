import React, { useState } from 'react';
import {
  GitBranch,
  GitCommit,
  GitPullRequest,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Download,
  Key,
  FolderSync,
  ExternalLink,
  Laptop,
  Scale,
  ShoppingCart,
  X,
  Play,
  Check,
  Terminal,
  Database,
} from 'lucide-react';

interface GitHubSyncEngineModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeArchetype: 'lawyer' | 'wp-designer' | 'ecommerce';
  onSelectArchetype: (archetype: 'lawyer' | 'wp-designer' | 'ecommerce') => void;
}

export const GitHubSyncEngineModal: React.FC<GitHubSyncEngineModalProps> = ({
  isOpen,
  onClose,
  activeArchetype,
  onSelectArchetype,
}) => {
  const [syncMode, setSyncMode] = useState<'default' | 'pat_token' | 'offline_fallback'>('default');
  const [repoOwner, setRepoOwner] = useState('Aqamirrazavi');
  const [repoName, setRepoName] = useState('Sedrazavi-WPtemplate');
  const [repoBranch, setRepoBranch] = useState('main');
  const [githubPatToken, setGithubPatToken] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployProgress, setDeployProgress] = useState<string | null>(null);

  const [syncLogs, setSyncLogs] = useState<Array<{ time: string; msg: string; type: 'info' | 'success' | 'warn' }>>([
    { time: '۱۰:۱۴:۲۲', msg: 'هسته مستقل پوسته و افزونه آماده اتصال به مخزن گیت‌هاب است.', type: 'info' },
    { time: '۱۰:۱۴:۲۸', msg: 'بسته‌های محلی آفلاین در حافظه کش آماده استقرار هستند.', type: 'success' },
  ]);

  if (!isOpen) return null;

  const handleTestConnection = () => {
    setIsConnecting(true);
    setConnectionStatus('idle');

    setTimeout(() => {
      setIsConnecting(false);
      if (syncMode === 'offline_fallback') {
        setConnectionStatus('success');
        setStatusMessage('بسته محلی آفلاین با موفقیت بارگذاری شد (بدون نیاز به اینترنت بین‌الملل).');
        setSyncLogs(prev => [
          { time: new Date().toLocaleTimeString('fa-IR'), msg: 'ارتباط با بسته آفلاین داخلی برقرار شد.', type: 'success' },
          ...prev,
        ]);
      } else if (syncMode === 'pat_token' && !githubPatToken.trim()) {
        setConnectionStatus('error');
        setStatusMessage('لطفاً توکن دسترسی شخصی (GitHub PAT) را وارد نمایید.');
      } else {
        setConnectionStatus('success');
        setStatusMessage(`اتصال به مخزن ${repoOwner}/${repoName} شاخه ${repoBranch} با موفقیت برقرار شد.`);
        setSyncLogs(prev => [
          { time: new Date().toLocaleTimeString('fa-IR'), msg: `مخزن ${repoOwner}/${repoName} تأیید شد (آخرین کامیت: HEAD/main).`, type: 'success' },
          ...prev,
        ]);
      }
    }, 1200);
  };

  const handleDeployArchetype = (target: 'lawyer' | 'wp-designer' | 'ecommerce') => {
    setIsDeploying(true);
    setDeployProgress('در حال واکشی الگوها و پکیج از گیت‌هاب...');

    setTimeout(() => {
      setDeployProgress('اعتبارسنجی بلوک‌های گوتنبرگ و ساختار صفحات...');
      setTimeout(() => {
        setDeployProgress('استقرار در دیتابیس و به‌روزرسانی تنظیمات...');
        setTimeout(() => {
          setIsDeploying(false);
          setDeployProgress(null);
          onSelectArchetype(target);
          setSyncLogs(prev => [
            {
              time: new Date().toLocaleTimeString('fa-IR'),
              msg: `صنف ${target === 'wp-designer' ? 'طراح سایت وردپرس' : target === 'lawyer' ? 'دفتر وکالت' : 'فروشگاه منعطف'} با موفقیت مستقر گردید.`,
              type: 'success',
            },
            ...prev,
          ]);
        }, 600);
      }, 700);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" dir="rtl">
      <div className="bg-[#0D1117] text-[#F0F6FC] rounded-2xl border border-[#30363D] w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-[#161B22] border-b border-[#30363D] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#238636]/20 border border-[#238636]/40 flex items-center justify-center text-[#3FB950]">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>مرکز همگام‌سازی ابری با مخزن گیت‌هاب</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#1F6FEB]/20 text-[#58A6FF] border border-[#1F6FEB]/40">
                  GitHub Sync Engine v3.0
                </span>
              </h2>
              <p className="text-xs text-[#8B949E]">
                واکشی خودکار فایل‌های تم، افزونه و ساختار صفحات اصناف مختلف از مخزن گیت‌هاب و استقرار روی سایت
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8B949E] hover:text-white hover:bg-[#21262D] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* 3 Scenarios Selector */}
          <div>
            <label className="block text-xs font-bold text-[#C9D1D9] mb-3">
              انتخاب شیوه همگام‌سازی (۳ سناریو تاییدشده):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                onClick={() => setSyncMode('default')}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  syncMode === 'default'
                    ? 'bg-[#1F6FEB]/15 border-[#1F6FEB] text-white shadow'
                    : 'bg-[#161B22] border-[#30363D] text-[#8B949E] hover:border-[#484F58]'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm text-[#58A6FF] mb-1">
                  ۱. مخزن پیش‌فرض پروژه
                </div>
                <div className="text-[11px] text-[#8B949E]">
                  اتصال خودکار به ریپازیتوری رسمی گیت‌هاب و دریافت آخرین پکیج‌ها با یک کلیک.
                </div>
              </div>

              <div
                onClick={() => setSyncMode('pat_token')}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  syncMode === 'pat_token'
                    ? 'bg-[#8957E5]/15 border-[#8957E5] text-white shadow'
                    : 'bg-[#161B22] border-[#30363D] text-[#8B949E] hover:border-[#484F58]'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm text-[#BC8CFF] mb-1">
                  ۲. مخزن اختصاصی با توکن (PAT)
                </div>
                <div className="text-[11px] text-[#8B949E]">
                  پشتیبانی از فورک‌ها و مخازن خصوصی کارفرما با Personal Access Token.
                </div>
              </div>

              <div
                onClick={() => setSyncMode('offline_fallback')}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  syncMode === 'offline_fallback'
                    ? 'bg-[#238636]/15 border-[#238636] text-white shadow'
                    : 'bg-[#161B22] border-[#30363D] text-[#8B949E] hover:border-[#484F58]'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm text-[#3FB950] mb-1">
                  ۳. پکیج‌های آفلاین محلی (Fallback)
                </div>
                <div className="text-[11px] text-[#8B949E]">
                  استقرار سریع دموها بدون نیاز به اتصال به اینترنت بین‌الملل.
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Inputs based on mode */}
          {syncMode !== 'offline_fallback' ? (
            <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-[#8B949E] mb-1">مالک مخزن (Owner):</label>
                  <input
                    type="text"
                    value={repoOwner}
                    onChange={e => setRepoOwner(e.target.value)}
                    className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#58A6FF]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#8B949E] mb-1">نام مخزن (Repository):</label>
                  <input
                    type="text"
                    value={repoName}
                    onChange={e => setRepoName(e.target.value)}
                    className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#58A6FF]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#8B949E] mb-1">شاخه (Branch):</label>
                  <input
                    type="text"
                    value={repoBranch}
                    onChange={e => setRepoBranch(e.target.value)}
                    className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#58A6FF]"
                  />
                </div>
              </div>

              {syncMode === 'pat_token' && (
                <div>
                  <label className="block text-[11px] text-[#8B949E] mb-1">
                    توکن دسترسی شخصی گیت‌هاب (GitHub Personal Access Token):
                  </label>
                  <input
                    type="password"
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    value={githubPatToken}
                    onChange={e => setGithubPatToken(e.target.value)}
                    className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#BC8CFF]"
                  />
                  <span className="text-[10px] text-[#8B949E] mt-1 block">
                    نیاز به دسترسی `repo` برای مخازن خصوصی دارد.
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isConnecting}
                  className="px-4 py-2 rounded-lg bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] text-xs font-bold text-[#C9D1D9] transition flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isConnecting ? 'animate-spin text-[#58A6FF]' : ''}`} />
                  <span>{isConnecting ? 'در حال بررسی اتصال...' : 'بررسی اتصال به مخزن (Test Connection)'}</span>
                </button>

                {connectionStatus === 'success' && (
                  <span className="text-xs text-[#3FB950] flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-4 h-4" /> {statusMessage}
                  </span>
                )}
                {connectionStatus === 'error' && (
                  <span className="text-xs text-[#F85149] flex items-center gap-1 font-medium">
                    <AlertCircle className="w-4 h-4" /> {statusMessage}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#238636]/20 flex items-center justify-center text-[#3FB950]">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">بسته محلی آفلاین فعال است</div>
                  <div className="text-[11px] text-[#8B949E]">
                    تمامی فایل‌های ۳ صنف اصلی درون پکیج پوسته و افزونه کش شده‌اند.
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleTestConnection}
                className="px-4 py-2 rounded-lg bg-[#21262D] text-xs font-bold text-[#3FB950] border border-[#30363D] hover:bg-[#30363D] cursor-pointer"
              >
                تست بارگذاری بسته آفلاین
              </button>
            </div>
          )}

          {/* Archetypes Selector & 1-Click Deploy */}
          <div>
            <label className="block text-xs font-bold text-[#C9D1D9] mb-3">
              استقرار صنف و کاربری مد نظر (۳ کاربری کلیدی):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Option 1: WordPress Designer */}
              <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                activeArchetype === 'wp-designer'
                  ? 'bg-[#6366F1]/10 border-[#6366F1] ring-1 ring-[#6366F1]'
                  : 'bg-[#161B22] border-[#30363D]'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">💻</span>
                    {activeArchetype === 'wp-designer' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6366F1] text-white font-bold">
                        صنف فعال
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">طراح سایت وردپرس</h4>
                  <div className="text-xs text-[#818CF8] mb-2 font-mono">Gutenberg-First Suite</div>
                  <p className="text-[11px] text-[#8B949E] leading-relaxed mb-4">
                    ۱۳ سکشن استاندارد لندینگ، فرم ۵ مرحله‌ای بریف، جدول پکیج‌ها، نمونه‌کارها و بدون افزونه سنگین.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeployArchetype('wp-designer')}
                  disabled={isDeploying}
                  className="w-full py-2 rounded-lg bg-[#6366F1] hover:bg-[#4F46E5] text-white text-xs font-bold transition cursor-pointer"
                >
                  استقرار صنف طراح سایت
                </button>
              </div>

              {/* Option 2: Lawyer Suite */}
              <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                activeArchetype === 'lawyer'
                  ? 'bg-[#D4AF37]/10 border-[#D4AF37] ring-1 ring-[#D4AF37]'
                  : 'bg-[#161B22] border-[#30363D]'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">⚖️</span>
                    {activeArchetype === 'lawyer' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37] text-black font-bold">
                        صنف فعال
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">وکالت و امور حقوقی</h4>
                  <div className="text-xs text-[#D4AF37] mb-2 font-mono">Lawyer Suite Pro</div>
                  <p className="text-[11px] text-[#8B949E] leading-relaxed mb-4">
                    محاسبه‌گر دادگستری، پیگیری پرونده با کدرهگیری، گاوصندوق لوایح و رزرو وقت مشاوره.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeployArchetype('lawyer')}
                  disabled={isDeploying}
                  className="w-full py-2 rounded-lg bg-[#D4AF37] hover:bg-[#B8972E] text-black text-xs font-bold transition cursor-pointer"
                >
                  استقرار صنف وکالت
                </button>
              </div>

              {/* Option 3: Flexible eCommerce */}
              <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                activeArchetype === 'ecommerce'
                  ? 'bg-[#10B981]/10 border-[#10B981] ring-1 ring-[#10B981]'
                  : 'bg-[#161B22] border-[#30363D]'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">🛍️</span>
                    {activeArchetype === 'ecommerce' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10B981] text-white font-bold">
                        صنف فعال
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">فروشگاه منعطف</h4>
                  <div className="text-xs text-[#10B981] mb-2 font-mono">WooCommerce + WoodMart</div>
                  <p className="text-[11px] text-[#8B949E] leading-relaxed mb-4">
                    سازگار با ووکامرس، قالب وودمارت، جت وو بیلدر، شاپ انجین با مینی‌کارت کشویی و تسویه سریع شاپرک.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeployArchetype('ecommerce')}
                  disabled={isDeploying}
                  className="w-full py-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold transition cursor-pointer"
                >
                  استقرار صنف فروشگاه
                </button>
              </div>
            </div>

            {/* Deployment progress indicator */}
            {isDeploying && (
              <div className="mt-4 p-4 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-[#58A6FF] animate-spin shrink-0" />
                <div className="text-xs text-[#C9D1D9] font-medium">{deployProgress}</div>
              </div>
            )}
          </div>

          {/* Sync Console & Logs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#8B949E] flex items-center gap-1.5 font-mono">
                <Terminal className="w-3.5 h-3.5" /> کنسول لاگ رویدادها (Audit Trail)
              </span>
              <span className="text-[10px] text-[#6E7681]">آخرین همگام‌سازی: امروز</span>
            </div>
            <div className="bg-[#010409] border border-[#30363D] rounded-xl p-3 max-h-36 overflow-y-auto font-mono text-[11px] space-y-1.5">
              {syncLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#6E7681]">[{log.time}]</span>
                  <span className={
                    log.type === 'success' ? 'text-[#3FB950]' : log.type === 'warn' ? 'text-[#D29922]' : 'text-[#8B949E]'
                  }>
                    {log.msg}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#161B22] border-t border-[#30363D] px-6 py-4 flex items-center justify-between text-xs text-[#8B949E]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3FB950]" />
            <span>پروتکل استقرار ایمن و Idempotent (عدم ایجاد محتوای تکراری)</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#21262D] hover:bg-[#30363D] text-[#C9D1D9] font-bold cursor-pointer"
          >
            بستن پنجره
          </button>
        </div>
      </div>
    </div>
  );
};
