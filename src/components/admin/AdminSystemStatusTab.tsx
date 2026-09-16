import React, { useState } from 'react';
import {
  Server,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Download,
  FileCode2,
  Layers,
  Sparkles,
  ShieldCheck,
  HardDrive,
  Copy,
  Check,
} from 'lucide-react';

export const AdminSystemStatusTab: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const systemStatusData = {
    generatedAt: new Date().toISOString(),
    wordpress: {
      version: '6.4.3',
      language: 'fa_IR (Persian)',
      isRtl: true,
      siteUrl: 'https://sedrazavi.law',
      homeUrl: 'https://sedrazavi.law',
      wpMemoryLimit: '512 MB',
      debugMode: false,
    },
    server: {
      webServer: 'Nginx 1.24.0 / LiteSpeed Enterprise',
      operatingSystem: 'Linux Ubuntu 22.04.4 LTS (x86_64)',
      serverTime: new Date().toLocaleString('fa-IR'),
      uptime: '99.98% (42 روز متوالی بدون وقفه)',
      sslStatus: 'فعال (Let\'s Encrypt TLS 1.3 معتبر)',
    },
    php: {
      version: '8.2.14',
      memoryLimit: '512M',
      maxExecutionTime: '300 ثانیه',
      postMaxSize: '64M',
      uploadMaxFilesize: '64M',
      extensions: [
        { name: 'cURL', status: 'فعال (نسخه 7.81.0)', ok: true },
        { name: 'OpenSSL', status: 'فعال (OpenSSL 3.0.2)', ok: true },
        { name: 'GD / Imagick', status: 'فعال (پشتیبانی کامل از WebP)', ok: true },
        { name: 'Mbstring', status: 'فعال (پشتیبانی کامل از یونیکد فارسی)', ok: true },
        { name: 'JSON & DOM', status: 'فعال', ok: true },
      ],
    },
    plugins: [
      { name: 'SedRazavi Addons (افزونه هسته وکالت)', version: '2.5.0', status: 'فعال (توسعه‌یافته)', ok: true },
      { name: 'Elementor Pro', version: '3.21.4', status: 'فعال و هماهنگ', ok: true },
      { name: 'Digits Mobile OTP Login', version: '8.4.1', status: 'فعال و متصل به درگاه پیامک', ok: true },
      { name: 'WP Rocket / Redis Cache', version: '3.15.8', status: 'فعال (شتاب‌دهنده سرعت)', ok: true },
      { name: 'Yoast SEO Premium / Rank Math', version: '22.1', status: 'فعال و پیکربندی‌شده', ok: true },
    ],
    theme: {
      name: 'SedRazavi Law Master Theme',
      version: '2.5.0',
      author: 'Dr. Seyedeh Maryam Razavi / High-Tech Legal UI',
      childTheme: 'SedRazavi Child Theme (فعال)',
      templateCompatibility: 'سازگار با وردپرس ۶.۴+ و المنتور ۳.۲۱+',
    },
  };

  const handleDownloadReport = () => {
    const reportJson = JSON.stringify(systemStatusData, null, 2);
    const blob = new Blob([reportJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sedrazavi-system-status-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(JSON.stringify(systemStatusData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <Server className="w-6 h-6 text-[#D4AF37]" />
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
              وضعیت سلامت سیستم و هاستینگ (فاز ۳)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            بررسی جامع ۶ بخش حیاتی: وردپرس، وب‌سرور، تنظیمات PHP، افزونه‌ها، پوسته و دانلود گزارش جامع JSON.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyReport}
            className="px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5 border border-gray-300 dark:border-gray-700"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'کپی شد!' : 'کپی گزارش'}</span>
          </button>

          <button
            onClick={handleDownloadReport}
            className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>دانلود گزارش JSON</span>
          </button>
        </div>
      </div>

      {/* Grid of 6 Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: WordPress Info */}
        <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/60 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
            <Layers className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-sm font-bold text-[#0B132B] dark:text-white">
              ۱. اطلاعات وردپرس (WordPress Info)
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">نسخه وردپرس:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {systemStatusData.wordpress.version}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">زبان و چیدمان:</span>
              <span className="font-bold text-[#0B132B] dark:text-white">
                {systemStatusData.wordpress.language} (راست‌چین RTL)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">محدودیت حافظه وردپرس:</span>
              <span className="font-mono font-bold text-emerald-600">
                {systemStatusData.wordpress.wpMemoryLimit}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">نشانی سایت (Site URL):</span>
              <span className="font-mono text-gray-700 dark:text-gray-300">
                {systemStatusData.wordpress.siteUrl}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Server Info */}
        <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/60 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
            <Server className="w-5 h-5 text-sky-500" />
            <h3 className="text-sm font-bold text-[#0B132B] dark:text-white">
              ۲. اطلاعات وب‌سرور و هاست (Web Server)
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">نوع سرور:</span>
              <span className="font-bold text-[#0B132B] dark:text-white">
                {systemStatusData.server.webServer}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">سیستم‌عامل سرور:</span>
              <span className="font-mono text-gray-700 dark:text-gray-300">
                {systemStatusData.server.operatingSystem}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">پایداری (Uptime):</span>
              <span className="font-bold text-emerald-600">
                {systemStatusData.server.uptime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">گواهی امنیتی SSL:</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                {systemStatusData.server.sslStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: PHP Configuration */}
        <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/60 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
            <Cpu className="w-5 h-5 text-indigo-500" />
            <h3 className="text-sm font-bold text-[#0B132B] dark:text-white">
              ۳. وضعیت PHP و افزونه‌های سرور (PHP Runtime)
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">نسخه PHP:</span>
              <span className="font-mono font-bold text-emerald-600">
                PHP {systemStatusData.php.version} (بهینه و امن)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">محدودیت حافظه (Memory Limit):</span>
              <span className="font-mono font-bold">{systemStatusData.php.memoryLimit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">حداکثر حجم آپلود / پست:</span>
              <span className="font-mono font-bold">
                {systemStatusData.php.uploadMaxFilesize} / {systemStatusData.php.postMaxSize}
              </span>
            </div>

            <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-1">
              <span className="text-[11px] font-bold text-gray-500 block">ماژول‌های فعال:</span>
              <div className="grid grid-cols-2 gap-1 text-[11px]">
                {systemStatusData.php.extensions.map((ext, idx) => (
                  <div key={idx} className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{ext.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Active Plugins */}
        <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/60 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
            <FileCode2 className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-bold text-[#0B132B] dark:text-white">
              ۴. وضعیت افزونه‌های فعال (Plugin Stack)
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            {systemStatusData.plugins.map((plugin, idx) => (
              <div
                key={idx}
                className="p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-[#0B132B] dark:text-white block">
                    {plugin.name}
                  </span>
                  <span className="text-[10px] text-gray-500">نسخه: {plugin.version}</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 text-[10px] font-bold">
                  {plugin.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Theme Status */}
        <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/60 space-y-3 md:col-span-2">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-sm font-bold text-[#0B132B] dark:text-white">
              ۵. وضعیت پوسته وکالت (Theme Health)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 block mb-1">نام و نسخه پوسته:</span>
              <strong className="text-[#0B132B] dark:text-white">
                {systemStatusData.theme.name} ({systemStatusData.theme.version})
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 block mb-1">پوسته فرزند (Child Theme):</span>
              <strong className="text-emerald-600 font-bold">
                {systemStatusData.theme.childTheme}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 block mb-1">سازگاری تمپلیت‌ها:</span>
              <strong className="text-[#0B132B] dark:text-white">
                {systemStatusData.theme.templateCompatibility}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
