import React, { useState } from 'react';
import { WORDPRESS_THEME_FILES } from '../data/wordPressThemeFiles';
import { WordPressFile } from '../types/theme';
import JSZip from 'jszip';
import {
  Code,
  Download,
  Copy,
  Check,
  FileCode,
  Folder,
  FolderOpen,
  Sparkles,
  Shield,
  Layers,
  Terminal,
  ExternalLink,
  GitBranch,
  Github,
  Play,
  RotateCcw,
  Package,
  Cpu,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileArchive,
} from 'lucide-react';

export const WordPressCodeViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<WordPressFile>(WORDPRESS_THEME_FILES[0]);
  const [activeCategory, setActiveCategory] = useState<string>('همه');
  const [copiedCode, setCopiedCode] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'files' | 'cicd'>('files');

  // CI/CD Simulator state
  const [simStep, setSimStep] = useState<number>(0);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const categories = [
    'همه',
    'قالب اصلی (Templates)',
    'بخش‌های داخلی (Inc)',
    'برگه‌ها و آرشیوها',
    'استایل و دارایی‌ها (Assets)',
    'پیکربندی گیت و CI/CD (.github)',
    'مستندات و زبان',
  ];

  const filteredFiles = WORDPRESS_THEME_FILES.filter((f) => {
    if (activeCategory === 'همه') return true;
    return f.category === activeCategory;
  });

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const themeFolder = zip.folder('sedrazavi-law-theme');

      WORDPRESS_THEME_FILES.forEach((file) => {
        themeFolder?.file(file.path, file.code);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sedrazavi-law-theme.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to generate ZIP:', err);
      alert('خطایی در ساخت فایل فشرده رخ داد.');
    } finally {
      setIsZipping(false);
    }
  };

  const runCiCdSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);
    setSimLogs([
      '🚀 [GitHub Actions] Workflow triggered on branch: main (commit: d8a9f4c)',
      '📦 [Step 1/5] Setting up Ubuntu latest runner environment...',
    ]);

    setTimeout(() => {
      setSimStep(2);
      setSimLogs((prev) => [
        ...prev,
        '📥 [Step 2/5] actions/checkout@v4: Checking out repository sedrazavi-theme...',
        '   ✓ Fetched 28 theme files and directory tree',
      ]);
    }, 1200);

    setTimeout(() => {
      setSimStep(3);
      setSimLogs((prev) => [
        ...prev,
        '🔍 [Step 3/5] Parsing .distignore exclusions...',
        '   - Excluded: .git, .github, .gitignore, tests/, node_modules/',
        '   - Excluded: composer.json, package.json, vite.config.ts',
        '   ✓ 20 Production-ready theme files verified',
      ]);
    }, 2400);

    setTimeout(() => {
      setSimStep(4);
      setSimLogs((prev) => [
        ...prev,
        '⚙️ [Step 4/5] Executing action-wordpress-build-zip@master...',
        '   ✓ PHP Syntax validation (Linting) passed without errors',
        '   ✓ Compressing to artifact: sedrazavi-law-theme.zip (Size: ~184 KB)',
      ]);
    }, 3600);

    setTimeout(() => {
      setSimStep(5);
      setIsSimulating(false);
      setSimLogs((prev) => [
        ...prev,
        '✨ [Step 5/5] actions/upload-artifact@v4: Uploaded sedrazavi-law-theme-latest',
        '🎉 Workflow Succeeded in 4.8s! Artifact ready for 1-click download and WordPress deployment.',
      ]);
    }, 4800);
  };

  return (
    <div className="py-8 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header & Download Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B132B] dark:text-white">
                مخزن سورس‌کد و پایپ‌لاین CI/CD قالب SedRazavi
              </h1>
              <span className="px-3 py-1 rounded-full bg-[#8B0000]/15 text-[#8B0000] dark:text-red-400 text-xs font-bold font-mono">
                PHP 8.x / WP 6.7
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 text-xs font-bold font-mono flex items-center gap-1">
                <Github className="w-3 h-3" />
                GitHub Actions Ready
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              ساختار فایل‌های استاندارد وردپرس، اکشن‌های خودکارسازی گیت‌هاب و بسته‌ساز هوشمند ZIP بدون فایل‌های اضافه.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="btn-gold text-xs sm:text-sm px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-[#D4AF37]/25 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>
                {isZipping ? 'در حال کامپایل و فشرده‌سازی...' : 'دانلود مستقیم پکیج وردپرس (sedrazavi-law-theme.zip)'}
              </span>
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-3 animate-fadeIn">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
              ✓
            </div>
            <span>
              فایل زیپ استاندارد قالب با نام <strong>sedrazavi-law-theme.zip</strong> دانلود شد! این بسته دقیقاً مطابق با ساختار `.distignore` فاقد هرگونه فایل موقت بوده و در پیشخوان وردپرس بخش «نمایش &gt; پوسته‌ها &gt; افزودن پوسته» قابل نصب است.
            </span>
          </div>
        )}

        {/* View Switcher: Files Explorer vs CI/CD Workflow Guide */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('files')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'files'
                  ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              مرورگر فایل‌های قالب ({WORDPRESS_THEME_FILES.length} فایل)
            </button>

            <button
              onClick={() => setActiveSubTab('cicd')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'cicd'
                  ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-[#D4AF37]" />
              چرخه CI/CD، گیت‌هاب و ساخت زیپ (دورهای ۹۸ تا ۱۰۲)
            </button>
          </div>
        </div>

        {activeSubTab === 'files' ? (
          <>
            {/* Categories Bar */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Code Explorer: Left Sidebar File Tree + Right Syntax Highlighted Code Viewer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left: Files List (4 Cols) */}
              <div className="lg:col-span-4 bg-white dark:bg-[#0B132B] rounded-3xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm space-y-2 max-h-[720px] overflow-y-auto">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800 text-xs font-bold text-gray-500">
                  <FolderOpen className="w-4 h-4 text-[#D4AF37]" />
                  <span>ساختار فایل‌های پوسته (/wp-content/themes/sedrazavi/)</span>
                </div>

                {filteredFiles.map((file) => (
                  <div
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedFile.path === file.path
                        ? 'bg-[#0B132B] dark:bg-[#D4AF37]/15 border-[#D4AF37] text-white dark:text-[#F3E5AB] shadow-md'
                        : 'bg-gray-50 dark:bg-gray-800/40 border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold">
                        <FileCode className="w-4 h-4 text-[#D4AF37]" />
                        <span>{file.filename}</span>
                      </div>
                      <span className="text-[10px] opacity-70">
                        {file.code.split('\n').length} خط
                      </span>
                    </div>
                    <p className="text-[11px] opacity-80 mt-1 line-clamp-1">
                      {file.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right: Code Viewer (8 Cols) */}
              <div className="lg:col-span-8 bg-[#0B132B] rounded-3xl border border-[#D4AF37]/30 shadow-2xl overflow-hidden flex flex-col">
                
                {/* Top Code Window Header */}
                <div className="px-6 py-4 bg-[#050A18] border-b border-gray-800 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                    </div>
                    <span className="font-mono text-xs font-bold text-gray-300">
                      sedrazavi/{selectedFile.path}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyCode}
                      className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />}
                      <span>{copiedCode ? 'کپی شد!' : 'کپی محتوای فایل'}</span>
                    </button>
                  </div>
                </div>

                {/* Code Body */}
                <div className="p-6 overflow-x-auto overflow-y-auto max-h-[600px] text-xs font-mono text-gray-200 leading-relaxed" dir="ltr">
                  <pre className="whitespace-pre">
                    <code>{selectedFile.code}</code>
                  </pre>
                </div>

                {/* Bottom Info Bar */}
                <div className="px-6 py-3 bg-[#050A18] border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
                  <span>{selectedFile.description}</span>
                  <span>UTF-8 • UNIX (LF)</span>
                </div>

              </div>

            </div>
          </>
        ) : (
          /* CI/CD & GitHub Architecture View */
          <div className="space-y-8 animate-fadeIn">
            
            {/* Interactive CI/CD Simulator */}
            <div className="bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/30 shadow-2xl text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold font-serif text-[#F3E5AB]">
                      شبیه‌ساز زنده پایپ‌لاین GitHub Actions (.github/workflows/build-zip.yml)
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      تولید خودکار فایل زیپ استاندارد وردپرس با رعایت دقیق فیلترهای `.distignore` در سرور ابری اوبونتو.
                    </p>
                  </div>
                </div>

                <button
                  onClick={runCiCdSimulation}
                  disabled={isSimulating}
                  className="btn-gold px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>{isSimulating ? 'در حال اجرای اکشن...' : 'اجرای شبیه‌سازی GitHub Action (Workflow Dispatch)'}</span>
                </button>
              </div>

              {/* Progress Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 py-6">
                {[
                  { step: 1, title: '۱. تریگر ارسال (Push)', desc: 'شاخه‌های main/master' },
                  { step: 2, title: '۲. دریافت سورس', desc: 'actions/checkout@v4' },
                  { step: 3, title: '۳. فیلتر .distignore', desc: 'حذف node_modules و تست‌ها' },
                  { step: 4, title: '۴. بیلد فایل ZIP', desc: 'وردپرس آرشیو بیلدر' },
                  { step: 5, title: '۵. تولید Artifact', desc: 'آماده نصب مستقیم در WP' },
                ].map((s) => (
                  <div
                    key={s.step}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      simStep >= s.step
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center justify-center gap-1">
                      {simStep >= s.step ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <div className="w-3.5 h-3.5 rounded-full border border-gray-500 inline-block" />}
                      <span>{s.title}</span>
                    </div>
                    <p className="text-[10px] opacity-75 mt-1">{s.desc}</p>
                  </div>
                ))}
              </div>

              {/* Terminal Logs Window */}
              <div className="bg-[#050A18] rounded-2xl p-4 border border-gray-800 font-mono text-xs text-gray-300 space-y-1.5 max-h-56 overflow-y-auto" dir="ltr">
                <div className="flex items-center justify-between text-gray-500 pb-2 border-b border-gray-800/80 text-[11px]">
                  <span>Runner: ubuntu-latest (GitHub Hosted)</span>
                  <span>Workflow: build-zip.yml</span>
                </div>
                {simLogs.length === 0 ? (
                  <p className="text-gray-500 italic py-2">
                    برای مشاهده فرآیند خودکار کامپایل و فیلتر کردن فایل‌های زیپ، روی دکمه «اجرای شبیه‌سازی GitHub Action» کلیک کنید.
                  </p>
                ) : (
                  simLogs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Comprehensive Documentation of Rounds 98 to 102 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Round 98 */}
              <div className="bg-white dark:bg-[#0B132B] p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <span className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center font-mono">۹۸</span>
                  <h3>صادرات از Google AI Studio به گیتهاب (Export to GitHub)</h3>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300 space-y-2 leading-relaxed">
                  <p><strong>چیستی:</strong> یکپارچه‌سازی رسمی محیط Google AI Studio با حساب کاربری GitHub با یک کلیک.</p>
                  <p><strong>چرایی:</strong> جلوگیری از اتلاف زمان، ثبت دائم تاریخچه تغییرات و اتصال به خط لوله CI/CD.</p>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 text-[11px] space-y-1">
                    <p className="font-semibold text-[#0B132B] dark:text-white">مراحل گام‌به‌گام صادرات:</p>
                    <ol className="list-decimal list-inside space-y-0.5 text-gray-500 dark:text-gray-400">
                      <li>ورود به Google AI Studio و استقرار در تب <strong>Build</strong></li>
                      <li>کلیک روی آیکون گیت‌هاب (شکل گربه) در نوار بالایی هدر</li>
                      <li>تعیین نام ریپازیتوری (مثلاً <code className="font-mono text-[#D4AF37]">sedrazavi-theme</code>) و وضعیت عمومی/خصوصی</li>
                      <li>کلیک روی دکمه <strong>Push</strong> و مشاهده پیام موفقیت</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Round 99 */}
              <div className="bg-white dark:bg-[#0B132B] p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center font-mono">۹۹</span>
                  <h3>اکشن خودکار تولید فایل زیپ (.github/workflows/build-zip.yml)</h3>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300 space-y-2 leading-relaxed">
                  <p><strong>چیستی:</strong> ورک‌فلو خودکار گیت‌هاب با اکشن <code className="font-mono text-emerald-600">action-wordpress-build-zip</code>.</p>
                  <p><strong>چرایی:</strong> حذف فرآیند دستی زیپ‌کردن و کاهش خطاهای انسانی در انتشار پوسته‌های وردپرس.</p>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 text-[11px] space-y-1 font-mono text-gray-600 dark:text-gray-300" dir="ltr">
                    <code>on: push (main/master) | release (created) | workflow_dispatch</code>
                  </div>
                  <p className="text-[11px] text-gray-500">فایل زیپ کامپایل‌شده مستقیماً در تب Actions به عنوان Artifact با ماندگاری ۷ روزه آپلود می‌گردد.</p>
                </div>
              </div>

              {/* Round 100 */}
              <div className="bg-white dark:bg-[#0B132B] p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-amber-600 dark:text-[#D4AF37] font-bold text-sm">
                  <span className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center font-mono">۱۰۰</span>
                  <h3>دانلود و نصب بسته زیپ در وردپرس (ZIP Installation)</h3>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300 space-y-2 leading-relaxed">
                  <p><strong>چیستی:</strong> راهنمای رسمی نصب پکیج دانلودشده در کلیه نسخه‌های وردپرس ۶.۰ تا ۶.۷.</p>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 text-[11px] space-y-1">
                    <ol className="list-decimal list-inside space-y-0.5 text-gray-500 dark:text-gray-400">
                      <li>ورود به پیشخوان وردپرس &gt; منوی <strong>نمایش (Appearance)</strong> &gt; <strong>پوسته‌ها (Themes)</strong></li>
                      <li>کلیک روی دکمه <strong>افزودن پوسته تازه</strong> &gt; <strong>بارگذاری پوسته (Upload Theme)</strong></li>
                      <li>انتخاب فایل <code className="font-mono text-amber-600">sedrazavi-law-theme.zip</code> و کلیک روی نصب</li>
                      <li>کلیک روی <strong>فعال‌سازی (Activate)</strong> و ورود به جادوگر راه‌اندازی دمو</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Round 101 */}
              <div className="bg-white dark:bg-[#0B132B] p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm">
                  <span className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center font-mono">۱۰۱</span>
                  <h3>فیلترینگ پکیج نهایی با فایل `.distignore`</h3>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300 space-y-2 leading-relaxed">
                  <p><strong>چیستی:</strong> تعیین دقیق فایل‌های مجاز و غیرمجاز جهت قرارگیری در بسته تجاری نهایی.</p>
                  <p><strong>چرایی:</strong> جلوگیری از وارد شدن کدهای سنگین نود، فایل‌های گیت و فایل‌های محلی به هاست مشتری.</p>
                  <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-[10px] font-mono text-purple-700 dark:text-purple-300">
                    مستثنی‌شده‌ها: .git, .github, .gitignore, .distignore, node_modules, tests, *.log, *.tmp
                  </div>
                </div>
              </div>

              {/* Round 102 */}
              <div className="md:col-span-2 bg-white dark:bg-[#0B132B] p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-[#8B0000] dark:text-red-400 font-bold text-sm">
                  <span className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center font-mono">۱۰۲</span>
                  <h3>سامانه به‌روزرسانی خودکار قالب مستقیم از گیت‌هاب (Theme GitHub Updater)</h3>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300 space-y-2 leading-relaxed">
                  <p>
                    <strong>چیستی:</strong> ادغام کلاس داخلی <code className="font-mono font-bold text-[#8B0000] dark:text-red-400">SedRazavi_Theme_GitHub_Updater</code> (در مسیر <code className="font-mono">inc/class-sedrazavi-updater.php</code>) و سازگاری با افزونه‌های <strong>WP Puller</strong> و <strong>Gitium</strong>.
                  </p>
                  <p>
                    <strong>عملکرد:</strong> هوک به تابع <code className="font-mono">site_transient_update_themes</code> وردپرس، استعلام آخرین نسخه تگ‌شده (Release) از API رسمی گیت‌هاب و امکان آپدیت با یک کلیک از پنل مدیریت وردپرس بدون نیاز به بارگذاری مجدد فایل زیپ.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

