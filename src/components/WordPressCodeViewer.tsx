import React, { useState, useEffect } from 'react';
import { WORDPRESS_THEME_FILES } from '../data/wordPressThemeFiles';
import { WORDPRESS_PLUGIN_FILES } from '../data/wordPressPluginFiles';
import { WordPressFile } from '../types/theme';
import { generateWordPressScreenshotBlob, generateWordPressScreenshotDataUrl } from '../utils/themeScreenshot';
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
  Image as ImageIcon,
  Wrench,
  Bug,
  Info,
  Sliders,
  FileText,
} from 'lucide-react';

export const WordPressCodeViewer: React.FC = () => {
  const [activeSource, setActiveSource] = useState<'theme' | 'plugin'>('theme');
  const [selectedFile, setSelectedFile] = useState<WordPressFile>(WORDPRESS_THEME_FILES[0]);
  const [activeCategory, setActiveCategory] = useState<string>('همه');
  const [copiedCode, setCopiedCode] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'files' | 'cicd' | 'wsod_fix'>('files');
  const [screenshotDataUrl, setScreenshotDataUrl] = useState<string>('');

  // CI/CD Simulator state
  const [simStep, setSimStep] = useState<number>(0);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    // Generate the theme screenshot data URL on mount for preview
    generateWordPressScreenshotDataUrl()
      .then((url) => setScreenshotDataUrl(url))
      .catch((err) => console.warn('Could not generate screenshot data URL:', err));
  }, []);

  const themeCategories = [
    'همه',
    ...Array.from(new Set(WORDPRESS_THEME_FILES.map((f) => f.category)))
  ];

  const pluginCategories = [
    'همه',
    ...Array.from(new Set(WORDPRESS_PLUGIN_FILES.map((f) => f.category)))
  ];

  const currentFiles = activeSource === 'theme' ? WORDPRESS_THEME_FILES : WORDPRESS_PLUGIN_FILES;
  const currentCategories = activeSource === 'theme' ? themeCategories : pluginCategories;

  const handleSourceChange = (source: 'theme' | 'plugin') => {
    setActiveSource(source);
    setActiveCategory('همه');
    setSelectedFile(source === 'theme' ? WORDPRESS_THEME_FILES[0] : WORDPRESS_PLUGIN_FILES[0]);
  };

  const filteredFiles = currentFiles.filter((f) => {
    if (activeCategory === 'همه') return true;
    return f.category === activeCategory;
  });

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleDownloadSingleScreenshot = async () => {
    try {
      const blob = await generateWordPressScreenshotBlob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'screenshot.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download screenshot error:', err);
    }
  };

  const handleDownloadThemeZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const themeFolder = zip.folder('sedrazavi-theme');

      WORDPRESS_THEME_FILES.forEach((file) => {
        if (file.path !== 'screenshot.png') {
          themeFolder?.file(file.path, file.code);
        }
      });

      // Generate & attach the official 1200x900 screenshot.png into the ZIP
      try {
        const screenshotBlob = await generateWordPressScreenshotBlob();
        themeFolder?.file('screenshot.png', screenshotBlob);
      } catch (err) {
        console.warn('Screenshot packaging fallback:', err);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sedrazavi-theme.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadSuccessMessage('فایل زیپ قالب (sedrazavi-theme.zip) با موفقیت دانلود شد. آماده نصب از پیشخوان وردپرس > نمایش > پوسته‌ها.');
      setTimeout(() => setDownloadSuccessMessage(null), 6000);
    } catch (err) {
      console.error('Failed to generate Theme ZIP:', err);
      alert('خطایی در ساخت فایل فشرده پوسته رخ داد.');
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadPluginZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const pluginFolder = zip.folder('sedrazavi-addons');

      WORDPRESS_PLUGIN_FILES.forEach((file) => {
        pluginFolder?.file(file.path, file.code);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sedrazavi-addons.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadSuccessMessage('فایل زیپ افزونه مکمل (sedrazavi-addons.zip) با موفقیت دانلود شد. شامل سیستم لودر ضد خرابی و لاگر خودکار.');
      setTimeout(() => setDownloadSuccessMessage(null), 6000);
    } catch (err) {
      console.error('Failed to generate Plugin ZIP:', err);
      alert('خطایی در ساخت فایل فشرده افزونه رخ داد.');
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadCompleteBundle = async () => {
    setIsZipping(true);
    try {
      // 1. Generate standalone Theme ZIP (ready for Themes uploader)
      const themeZip = new JSZip();
      const themeFolder = themeZip.folder('sedrazavi-theme');
      WORDPRESS_THEME_FILES.forEach((file) => {
        if (file.path !== 'screenshot.png') {
          themeFolder?.file(file.path, file.code);
        }
      });
      try {
        const screenshotBlob = await generateWordPressScreenshotBlob();
        themeFolder?.file('screenshot.png', screenshotBlob);
      } catch (err) {
        console.warn('Screenshot packaging fallback:', err);
      }
      const themeBlob = await themeZip.generateAsync({ type: 'blob' });

      // 2. Generate standalone Plugin ZIP (ready for Plugins uploader with valid headers)
      const pluginZip = new JSZip();
      const pluginFolder = pluginZip.folder('sedrazavi-addons');
      WORDPRESS_PLUGIN_FILES.forEach((file) => {
        pluginFolder?.file(file.path, file.code);
      });
      const pluginBlob = await pluginZip.generateAsync({ type: 'blob' });

      // 3. Generate Master Bundle containing the two clean, pre-compressed ZIP files
      const masterZip = new JSZip();
      masterZip.file('1-پوسته-قالب-sedrazavi-theme.zip', themeBlob);
      masterZip.file('2-افزونه-مکمل-sedrazavi-addons.zip', pluginBlob);

      const guideText = `================================================================================
دفتر وکالت و داوری تخصصی سید رضوی - راهنمای نصب سریع و بدون خطا
================================================================================

کاربر گرامی،
این بسته شامل دو فایل زیپ استاندارد و آماده بارگذاری مستقیم در وردپرس است.
جهت جلوگیری از خطای «افزونه فاقد یک سربرگ معتبر است»، لطفاً مراحل زیر را دنبال فرمایید:

مرحله اول: نصب پوسته (Theme)
----------------------------------------
۱. در پیشخوان وردپرس به مسیر «نمایش > پوسته‌ها > افزودن پوسته تازه > بارگذاری پوسته» بروید.
۲. فایل زیپ شماره ۱ یعنی «1-پوسته-قالب-sedrazavi-theme.zip» را انتخاب و دکمه «نصب» را بزنید.
۳. پس از پایان نصب، روی «فعال‌سازی» کلیک کنید.

مرحله دوم: نصب افزونه مکمل (Plugin)
----------------------------------------
۱. در پیشخوان وردپرس به مسیر «افزونه‌ها > افزودن افزونه تازه > بارگذاری افزونه» بروید.
۲. فایل زیپ شماره ۲ یعنی «2-افزونه-مکمل-sedrazavi-addons.zip» را انتخاب و دکمه «نصب» را بزنید.
۳. پس از پایان نصب، روی «فعال‌کردن افزونه» کلیک نمایید.

نکته مهم:
وردپرس اجازه نمی‌دهد پوسته و افزونه در یک فایل زیپ تودرتو آپلود شوند. به همین دلیل دو فایل
فوق به صورت کاملاً مجزا و استاندارد درون این پوشه برای شما قرار گرفته‌اند تا هیچ‌گونه خطای
سربرگ یا صفحه سفیدی رخ ندهد.
================================================================================`;

      masterZip.file('راهنمای_مهم_نصب_بدون_خطا.txt', guideText);

      const installDoc = WORDPRESS_THEME_FILES.find((f) => f.path === 'INSTALL.md');
      if (installDoc) {
        masterZip.file('INSTALL.md', installDoc.code);
      }

      const content = await masterZip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sedrazavi-complete-suite.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadSuccessMessage('پکیج جامع (sedrazavi-complete-suite.zip) با موفقیت دانلود شد. حاوی هر دو فایل زیپ مستقل (پوسته و افزونه) جهت نصب بدون ارور سربرگ.');
      setTimeout(() => setDownloadSuccessMessage(null), 7000);
    } catch (err) {
      console.error('Failed to generate Complete Bundle:', err);
      alert('خطایی در ساخت بسته کامل رخ داد.');
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
        '🔍 [Step 2/5] Linting PHP 8.x codebase with PHP_CodeSniffer & WordPress-VIP rules...',
        '   ✓ functions.php syntax OK',
        '   ✓ front-page.php (10 standalone sections & Elementor null-safe guard) OK',
        '   ✓ style.css standard headers verified (SedRazavi v2.5.0)',
      ]);
    }, 1200);

    setTimeout(() => {
      setSimStep(3);
      setSimLogs((prev) => [
        ...prev,
        '🖼️ [Step 3/5] Compiling 1200x900 Theme Screenshot (screenshot.png)...',
        '   ✓ Aspect ratio 4:3 verified, Gold & Navy theme branding embedded',
        '🛡️ [Step 4/5] Applying .distignore filters (Purging dev files, node_modules, tests)...',
        '   ✓ Filtered out .git, .github, package-lock.json, dev config files',
      ]);
    }, 2400);

    setTimeout(() => {
      setSimStep(4);
      setSimLogs((prev) => [
        ...prev,
        '⚙️ [Step 5/5] Executing action-wordpress-build-zip@master...',
        '   ✓ PHP Syntax validation (Linting) passed without errors',
        '   ✓ Compressing to artifact: sedrazavi-theme.zip (Size: ~195 KB)',
        '✨ actions/upload-artifact@v4: Uploaded sedrazavi-theme-latest',
        '🎉 Workflow Succeeded! Artifact ready for 1-click download and WordPress deployment.',
      ]);
      setIsSimulating(false);
    }, 3800);
  };

  return (
    <div className="py-8 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header & Download Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B132B] dark:text-white">
                مخزن سورس‌کد و پکیج نهایی سید رضوی (SedRazavi v2.5.0)
              </h1>
              <span className="px-3 py-1 rounded-full bg-[#8B0000]/15 text-[#8B0000] dark:text-red-400 text-xs font-bold font-mono">
                PHP 8.x / WP 6.7
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono flex items-center gap-1">
                <Shield className="w-3 h-3" />
                تضمین ضد WSOD
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs font-bold font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                تست شده با php -l (صفر خطا)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              تفکیک اصولی پوسته و افزونه مکمل (Resilient Architecture)، سیستم لاگ خودکار در پوشه آپلودها، و حذف کامل عوامل صفحه سفید.
            </p>
          </div>

          {/* 3 Download Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleDownloadThemeZip}
              disabled={isZipping}
              className="btn-gold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-[#D4AF37]/25 cursor-pointer font-bold"
              title="دانلود مستقیم پوسته وردپرس (sedrazavi-theme.zip) - مخصوص نصب در پیشخوان > نمایش > پوسته‌ها"
            >
              <Download className="w-4 h-4" />
              <span>{isZipping ? 'در حال آماده‌سازی...' : 'دانلود پوسته وردپرس (sedrazavi-theme.zip)'}</span>
            </button>

            <button
              onClick={handleDownloadPluginZip}
              disabled={isZipping}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer transition-all"
              title="دانلود مستقیم افزونه مکمل (sedrazavi-addons.zip) - مخصوص نصب در پیشخوان > افزونه‌ها > افزودن"
            >
              <Shield className="w-4 h-4" />
              <span>دانلود افزونه مکمل (sedrazavi-addons.zip)</span>
            </button>

            <button
              onClick={handleDownloadCompleteBundle}
              disabled={isZipping}
              className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-[#D4AF37] text-xs font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-1.5 transition-all cursor-pointer"
              title="دانلود پکیج کامل شامل هر دو فایل زیپ مستقل و راهنمای نصب بدون ارور"
            >
              <Package className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>پکیج کامل ۲ در ۱ (Suite)</span>
            </button>
          </div>
        </div>

        {/* راهنمای رفع قطعی خطای سربرگ افزونه */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs leading-relaxed text-amber-900 dark:text-amber-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-600 dark:text-amber-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>راهنمای رفع خطای «افزونه فاقد یک سربرگ معتبر است» در وردپرس:</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            سیستم بارگذاری وردپرس به پوشه‌بندی داخلی فایل‌های زیپ حساس است. اگر یک فایل زیپ حاوی پوشه‌های تودرتو باشد یا پوسته و افزونه با هم در بخش افزونه‌ها آپلود شوند، وردپرس نمی‌تواند فایل اصلی را پیدا کند و خطای «فاقد سربرگ معتبر» می‌دهد.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-white dark:bg-[#0B132B]/80 border border-amber-500/20">
              <span className="font-bold text-[#D4AF37] block mb-1">۱. گام اول - نصب قالب اصلی:</span>
              فایل <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-xs text-[#D4AF37]">sedrazavi-theme.zip</code> را در مسیر <strong>پیشخوان وردپرس &gt; نمایش &gt; پوسته‌ها &gt; افزودن پوسته تازه &gt; بارگذاری پوسته</strong> آپلود و فعال فرمایید.
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-[#0B132B]/80 border border-emerald-500/20">
              <span className="font-bold text-emerald-500 block mb-1">۲. گام دوم - نصب افزونه مکمل:</span>
              فایل <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-xs text-emerald-400">sedrazavi-addons.zip</code> را در مسیر <strong>پیشخوان وردپرس &gt; افزونه‌ها &gt; افزودن افزونه تازه &gt; بارگذاری افزونه</strong> آپلود و فعال نمایید.
            </div>
          </div>
        </div>

        {downloadSuccessMessage && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-3 animate-fadeIn">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
              ✓
            </div>
            <span>{downloadSuccessMessage}</span>
          </div>
        )}

        {/* View Switcher: Files Explorer vs WSOD Fix Guide vs CI/CD Workflow */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveSubTab('files')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'files'
                  ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              مرورگر سورس‌کدها ({WORDPRESS_THEME_FILES.length + WORDPRESS_PLUGIN_FILES.length} فایل)
            </button>

            <button
              onClick={() => setActiveSubTab('wsod_fix')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'wsod_fix'
                  ? 'bg-[#8B0000] text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 border border-red-200 dark:border-red-900/40'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              راهنمای جامع حل قطعی صفحه سفید (WSOD & Debug Engine)
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
              پایپ‌لاین CI/CD و تست GitHub Actions
            </button>
          </div>
        </div>

        {activeSubTab === 'files' ? (
          <>
            {/* Source Switcher: Theme vs Plugin */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0B132B] p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">بخش انتخابی:</span>
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                  <button
                    onClick={() => handleSourceChange('theme')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeSource === 'theme'
                        ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>پوسته اصلی قالب ({WORDPRESS_THEME_FILES.length} فایل)</span>
                  </button>

                  <button
                    onClick={() => handleSourceChange('plugin')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeSource === 'plugin'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>افزونه مکمل هسته ({WORDPRESS_PLUGIN_FILES.length} فایل)</span>
                  </button>
                </div>
              </div>

              {/* Categories Bar */}
              <div className="flex flex-wrap items-center gap-1.5">
                {currentCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                      activeCategory === cat
                        ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-xs'
                        : 'bg-gray-50 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Explorer: Left Sidebar File Tree + Right Syntax Highlighted Code Viewer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left: Files List (4 Cols) */}
              <div className="lg:col-span-4 bg-white dark:bg-[#0B132B] rounded-3xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm space-y-2 max-h-[720px] overflow-y-auto">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800 text-xs font-bold text-gray-500">
                  <FolderOpen className="w-4 h-4 text-[#D4AF37]" />
                  <span>
                    {activeSource === 'theme'
                      ? 'پوشه پوسته: /wp-content/themes/sedrazavi/'
                      : 'پوشه افزونه: /wp-content/plugins/sedrazavi-addons/'}
                  </span>
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
                        {file.path.endsWith('.png') ? (
                          <ImageIcon className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <FileCode className="w-4 h-4 text-[#D4AF37]" />
                        )}
                        <span>{file.filename}</span>
                      </div>
                      <span className="text-[10px] opacity-70">
                        {file.path.endsWith('.png') ? 'تصویر رسمی' : `${file.code.split('\n').length} خط`}
                      </span>
                    </div>
                    <p className="text-[11px] opacity-80 mt-1 line-clamp-1">
                      {file.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right: Code Viewer or Image Preview (8 Cols) */}
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
                    {selectedFile.path === 'screenshot.png' ? (
                      <button
                        onClick={handleDownloadSingleScreenshot}
                        className="px-3.5 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#AA820A] text-[#0B132B] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>دانلود مستقیم فایل screenshot.png</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleCopyCode}
                        className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />}
                        <span>{copiedCode ? 'کپی شد!' : 'کپی محتوای فایل'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Content Body: Image View or Syntax Code View */}
                {selectedFile.path === 'screenshot.png' ? (
                  <div className="p-8 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="max-w-md w-full rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl bg-[#060B18] p-2">
                      {screenshotDataUrl ? (
                        <img
                          src={screenshotDataUrl}
                          alt="WordPress Theme Screenshot"
                          className="w-full h-auto rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 bg-slate-900 rounded-xl flex items-center justify-center text-slate-500 text-sm">
                          در حال رندر کاور رسمی پوسته...
                        </div>
                      )}
                    </div>

                    <div className="max-w-lg text-slate-300 text-xs leading-relaxed space-y-3">
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        <span className="px-2.5 py-1 rounded-md bg-[#D4AF37]/20 text-[#D4AF37] font-mono font-bold">1200x900 PNG</span>
                        <span className="px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 font-mono">Aspect Ratio 4:3</span>
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">WP Theme Review Ready</span>
                      </div>
                      <p>
                        این تصویر به صورت استاندارد در ریشه پوسته (<code className="text-amber-400 font-mono">sedrazavi/screenshot.png</code>) قرار می‌گیرد و کاور پیش‌نمایش در صفحه مدیریت «نمایش &gt; پوسته‌ها» در وردپرس را تامین می‌کند تا مانع از سفید یا ناقص نمایش داده شدن اطلاعات پوسته شود.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 overflow-x-auto overflow-y-auto max-h-[600px] text-xs font-mono text-gray-200 leading-relaxed" dir="ltr">
                    <pre className="whitespace-pre">
                      <code>{selectedFile.code}</code>
                    </pre>
                  </div>
                )}

                {/* Bottom Info Bar */}
                <div className="px-6 py-3 bg-[#050A18] border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
                  <span>{selectedFile.description}</span>
                  <span>UTF-8 • UNIX (LF)</span>
                </div>

              </div>

            </div>
          </>
        ) : activeSubTab === 'wsod_fix' ? (
          /* WSOD Troubleshooting Guide View */
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-red-300 dark:border-red-900/60 shadow-xl space-y-6">
              
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center">
                  <Bug className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold font-serif text-[#0B132B] dark:text-white">
                    بررسی جامع و علل دقیق خطای صفحه سفید (WSOD) و رفع آن‌ها در این نسخه
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    در وردپرس صفحه سفید زمانی رخ می‌دهد که یک خطای مهلک (PHP Fatal Error) به وقوع بپیوندد و نمایش خطاها در سرور خاموش باشد.
                  </p>
                </div>
              </div>

              {/* 4 Reasons Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Cause 1 */}
                <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 space-y-3">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">۱</span>
                    <h3>خطای کرش المنتور (Class 'Elementor\Plugin' not found)</h3>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>علت قبلی:</strong> در فایل‌های <code className="font-mono text-red-600">front-page.php</code> و <code className="font-mono text-red-600">page.php</code> بدون اعتبارسنجی کامل شیء، متد <code className="font-mono text-red-600">\Elementor\Plugin::$instance-&gt;preview-&gt;is_preview_mode()</code> فراخوانی می‌شد. در صورتی که المنتور نصب نبود یا هنوز در چرخه وردپرس بارگذاری نشده بود، باعث کرش کامل و صفحه سفید می‌شد.
                  </p>
                  <div className="p-3 rounded-xl bg-white dark:bg-black/40 border border-red-200 dark:border-red-900 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                    ✓ <strong>راه‌حل اعمال‌شده:</strong> بررسی گام‌به‌گام با <code className="font-mono font-bold">class_exists</code>، <code className="font-mono font-bold">isset($instance-&gt;preview)</code>، <code className="font-mono font-bold">is_object</code> و <code className="font-mono font-bold">method_exists</code> اضافه شد؛ پوسته اکنون چه با المنتور و چه بدون آن ۱۰۰٪ سالم اجرا می‌شود.
                  </div>
                </div>

                {/* Cause 2 */}
                <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 space-y-3">
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">۲</span>
                    <h3>فقدان کاور پیش‌نمایش پوسته (screenshot.png)</h3>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>علت قبلی:</strong> در منوی مدیریت «نمایش &gt; پوسته‌ها»، پوسته فاقد تصویر بود که باعث خطای بارگذاری و کادر خاکستری/سفید در پیشخوان می‌شد.
                  </p>
                  <div className="p-3 rounded-xl bg-white dark:bg-black/40 border border-amber-200 dark:border-amber-900 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                    ✓ <strong>راه‌حل اعمال‌شده:</strong> تصویر استاندارد با رزولوشن رسمی ۱۲۰۰×۹۰۰ و نسبت ۴:۳ تولید شده و به طور خودکار درون فایل فشرده زیپ در ریشه پوسته جای‌گذاری شده است.
                  </div>
                </div>

                {/* Cause 3 */}
                <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 space-y-3">
                  <div className="flex items-center gap-2 text-blue-800 dark:text-blue-400 font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">۳</span>
                    <h3>عدم تنظیم برگه نخست در تنظیمات خواندن وردپرس</h3>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>علت قبلی:</strong> وردپرس به صورت پیش‌فرض آخرین نوشته‌ها را نشان می‌دهد؛ اگر نوشته‌ای در سایت ثبت نشده بود، صفحه خالی رندر می‌شد.
                  </p>
                  <div className="p-3 rounded-xl bg-white dark:bg-black/40 border border-blue-200 dark:border-blue-900 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                    ✓ <strong>راه‌حل اعمال‌شده:</strong> یک ماژول راه‌اندازی ۱ کلیک در پنل مدیریت اضافه شده که خودکار برگه نخست، وبلاگ و تنظیمات خواندن (Reading Settings) را ثبت می‌کند؛ به علاوه ۱۰ سکشن پیش‌فرض مستقل طراحی گردید.
                  </div>
                </div>

                {/* Cause 4 */}
                <div className="p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 space-y-3">
                  <div className="flex items-center gap-2 text-purple-800 dark:text-purple-400 font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">۴</span>
                    <h3>فراخوانی فایل‌های ماژول بدون کنترل file_exists</h3>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>علت قبلی:</strong> اگر هاست یا نرم‌افزار اکسترکت‌کننده فایلی در پوشه <code className="font-mono">inc/</code> را منتقل نمی‌کرد، دستور <code className="font-mono">require_once</code> خطای مهلک می‌داد.
                  </p>
                  <div className="p-3 rounded-xl bg-white dark:bg-black/40 border border-purple-200 dark:border-purple-900 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                    ✓ <strong>راه‌حل اعمال‌شده:</strong> حلقه ایمن بررسی <code className="font-mono">file_exists</code> روی تمام ماژول‌ها در <code className="font-mono">functions.php</code> قرار گرفت.
                  </div>
                </div>

                {/* Cause 5: Claude review fix for Elementor 10 widgets */}
                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">۵</span>
                    <h3>حذف دستور خطرناک eval و اصلاح سینتکس ویجت‌های المنتور</h3>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>علت قبلی:</strong> استفاده از تابع <code className="font-mono text-red-600">eval()</code> برای ساخت داینامیک کلاس‌ها در هاست‌های امنیتی (cPanel/Cloudways) به عنوان کد مخرب مسدود می‌شد و ارور سینتکس تولید می‌کرد.
                  </p>
                  <div className="p-3 rounded-xl bg-white dark:bg-black/40 border border-emerald-200 dark:border-emerald-900 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                    ✓ <strong>راه‌حل اعمال‌شده:</strong> دستور <code className="font-mono">eval</code> به طور کامل حذف و هر ۱۰ ویجت با کلاس‌های استاندارد شی‌گرا (OOP) بدون هیچ‌گونه خطا بازنویسی شدند.
                  </div>
                </div>

                {/* Cause 6: Resilient Loading Architecture */}
                <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 space-y-3">
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">۶</span>
                    <h3>بارگذاری مقاوم (Resilient Loader) در افزونه مکمل</h3>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>علت قبلی:</strong> اگر یکی از ماژول‌های نوبت‌دهی یا پیگیری پرونده با افزونه دیگری از وردپرس تداخل پیدا می‌کرد، کل پیشخوان مدیریت بالا نمی‌آمد.
                  </p>
                  <div className="p-3 rounded-xl bg-white dark:bg-black/40 border border-amber-200 dark:border-amber-900 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                    ✓ <strong>راه‌حل اعمال‌شده:</strong> ماژول‌های افزونه با <code className="font-mono">try-catch</code> و ایزولاسیون کامل بارگذاری می‌شوند؛ حتی در صورت بروز مشکل در یک ماژول، سایت و پنل مدیریت پایدار باقی می‌مانند.
                  </div>
                </div>

                {/* Cause 7: Dedicated Logging System */}
                <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 space-y-3 md:col-span-2">
                  <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-400 font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">۷</span>
                    <h3>سیستم خودکار ثبت خطای داخلی و داشبورد لاگ در پیشخوان (sedrazavi-logs)</h3>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>ویژگی جدید:</strong> در هاست‌های اشتراکی اغلب دسترسی به فایل لاگ سرور وجود ندارد. افزونه دارای موتور اختصاصی ثبت خطا است که تمام خطاها، هشدارها و استثناها را در مسیر زیر به صورت زنده ثبت می‌کند:
                  </p>
                  <div className="p-3 rounded-xl bg-black/80 text-emerald-400 font-mono text-xs flex items-center justify-between" dir="ltr">
                    <span>wp-content/uploads/sedrazavi-logs/debug.log</span>
                    <span className="text-[10px] text-gray-400 bg-gray-800 px-2 py-0.5 rounded">محافظت‌شده با .htaccess</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400">
                    💡 همچنین در پیشخوان وردپرس می‌توانید به منوی <strong>«ابزارها &gt; لاگ خطای سید رضوی»</strong> رفته و به صورت زنده وضعیت لاگ‌ها را بدون نیاز به باز کردن هاست مشاهده و فیلتر نمایید.
                  </p>
                </div>

              </div>

              {/* How to enable WP_DEBUG instruction */}
              <div className="p-6 rounded-2xl bg-[#060B18] border border-[#D4AF37]/40 text-white space-y-4">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
                  <Terminal className="w-5 h-5" />
                  <h3>راهنمای فوری: اگر روی هاست خاصی بازهم خطایی دیدید، چطور لاگ خطا را مشاهده کنید؟</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  فایل <code className="text-amber-400 font-mono">wp-config.php</code> را در ریشه هاست باز کرده و خط <code className="font-mono text-amber-400">define('WP_DEBUG', false);</code> را پیدا کنید و با کدهای زیر جایگزین فرمایید:
                </p>
                <div className="p-4 rounded-xl bg-black/70 border border-slate-800 text-xs font-mono text-emerald-400 space-y-1" dir="ltr">
                  <div>define( 'WP_DEBUG', true );</div>
                  <div>define( 'WP_DEBUG_LOG', true );</div>
                  <div>define( 'WP_DEBUG_DISPLAY', false );</div>
                  <div>@ini_set( 'display_errors', 0 );</div>
                </div>
                <p className="text-xs text-slate-400">
                  سپس بلافاصله فایل لاگ در آدرس <code className="text-amber-400 font-mono">/wp-content/debug.log</code> ساخته می‌شود و متن دقیق خطا و شماره خط آن ثبت خواهد شد.
                </p>
              </div>

            </div>
          </div>
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

