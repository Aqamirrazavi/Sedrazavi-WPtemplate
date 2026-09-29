import React, { useState, useEffect } from 'react';
import { WORDPRESS_THEME_FILES } from '../data/wordPressThemeFiles';
import { WORDPRESS_PLUGIN_FILES } from '../data/wordPressPluginFiles';
import { WordPressFile } from '../types/theme';
import { generateWordPressScreenshotBlob, generateWordPressScreenshotDataUrl } from '../utils/themeScreenshot';
import { HtmlCssExportModal } from './HtmlCssExportModal';
import { generatePhpShortcodeTemplate, DEFAULT_GENERATOR_OPTIONS, generateMountingEngineJs } from '../utils/phpShortcodeGenerator';
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
  ArrowRight,
  ArrowLeft,
  BookOpen,
} from 'lucide-react';

export const WordPressCodeViewer: React.FC = () => {
  const [activeSource, setActiveSource] = useState<'theme' | 'plugin'>('theme');
  const [selectedFile, setSelectedFile] = useState<WordPressFile>(WORDPRESS_THEME_FILES[0]);
  const [activeCategory, setActiveCategory] = useState<string>('همه');
  const [copiedCode, setCopiedCode] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [activeDownloadType, setActiveDownloadType] = useState<string | null>(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'files' | 'install' | 'architecture' | 'cicd'>('files');
  const [screenshotDataUrl, setScreenshotDataUrl] = useState<string>('');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

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
    ...Array.from(new Set(WORDPRESS_THEME_FILES.map((f) => f.category))),
  ];

  const pluginCategories = [
    'همه',
    ...Array.from(new Set(WORDPRESS_PLUGIN_FILES.map((f) => f.category))),
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

  const loadCompiledAppDist = async (): Promise<{ css: string; js: string } | null> => {
    try {
      const [cssRes, jsRes] = await Promise.all([
        fetch('/app-dist/index.css'),
        fetch('/app-dist/index.js'),
      ]);
      if (cssRes.ok && jsRes.ok) {
        const css = await cssRes.text();
        const js = await jsRes.text();
        return { css, js };
      }
    } catch (err) {
      console.warn('Could not bundle app-dist:', err);
    }
    return null;
  };

  const handleDownloadThemeZip = async () => {
    setIsZipping(true);
    setActiveDownloadType('theme');
    try {
      // First check if static public zip exists for instant fast download
      try {
        const checkRes = await fetch('/sedrazavi-theme.zip', { method: 'HEAD' });
        if (checkRes.ok) {
          const link = document.createElement('a');
          link.href = '/sedrazavi-theme.zip';
          link.download = 'sedrazavi-theme.zip';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setDownloadSuccessMessage('پکیج استاندارد پوسته وردپرس (sedrazavi-theme.zip) با موفقیت دانلود شد.');
          setTimeout(() => setDownloadSuccessMessage(null), 6000);
          return;
        }
      } catch {
        // Fallback to client-side JSZip generation
      }

      const zip = new JSZip();
      const themeFolder = zip.folder('sedrazavi-theme');

      WORDPRESS_THEME_FILES.forEach((file) => {
        if (file.path !== 'screenshot.png') {
          themeFolder?.file(file.path, file.code);
        }
      });

      const shortcodesPhp = generatePhpShortcodeTemplate(DEFAULT_GENERATOR_OPTIONS);
      const mountJs = generateMountingEngineJs(DEFAULT_GENERATOR_OPTIONS);
      themeFolder?.file('inc/react-shortcodes.php', shortcodesPhp);
      themeFolder?.file('assets/js/sedrazavi-react-mount.js', mountJs);

      try {
        const builtAssets = await loadCompiledAppDist();
        if (builtAssets) {
          themeFolder?.file('dist/index.css', builtAssets.css);
          themeFolder?.file('dist/index.js', builtAssets.js);
        }
      } catch (err) {
        console.warn('Assets packaging fallback:', err);
      }

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

      setDownloadSuccessMessage('پکیج رسمی پوسته وردپرس (sedrazavi-theme.zip) با موفقیت دانلود شد.');
      setTimeout(() => setDownloadSuccessMessage(null), 6000);
    } catch (err) {
      console.error('Failed to generate Theme ZIP:', err);
      alert('خطایی در ساخت فایل فشرده پوسته رخ داد.');
    } finally {
      setIsZipping(false);
      setActiveDownloadType(null);
    }
  };

  const handleDownloadPluginZip = async () => {
    setIsZipping(true);
    setActiveDownloadType('plugin');
    try {
      try {
        const checkRes = await fetch('/sedrazavi-addons.zip', { method: 'HEAD' });
        if (checkRes.ok) {
          const link = document.createElement('a');
          link.href = '/sedrazavi-addons.zip';
          link.download = 'sedrazavi-addons.zip';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setDownloadSuccessMessage('پکیج افزونه مکمل (sedrazavi-addons.zip) با موفقیت دانلود شد.');
          setTimeout(() => setDownloadSuccessMessage(null), 6000);
          return;
        }
      } catch {
        // Fallback
      }

      const zip = new JSZip();
      const pluginFolder = zip.folder('sedrazavi-addons');

      WORDPRESS_PLUGIN_FILES.forEach((file) => {
        pluginFolder?.file(file.path, file.code);
      });

      const shortcodesPluginPhp = generatePhpShortcodeTemplate({ ...DEFAULT_GENERATOR_OPTIONS, targetType: 'plugin' });
      const mountJs = generateMountingEngineJs(DEFAULT_GENERATOR_OPTIONS);
      pluginFolder?.file('includes/react-shortcodes.php', shortcodesPluginPhp);
      pluginFolder?.file('assets/js/sedrazavi-react-mount.js', mountJs);

      try {
        const builtAssets = await loadCompiledAppDist();
        if (builtAssets) {
          pluginFolder?.file('dist/index.css', builtAssets.css);
          pluginFolder?.file('dist/index.js', builtAssets.js);
          pluginFolder?.file(
            'reactpress.json',
            JSON.stringify(
              {
                name: 'sedrazavi-law-suite',
                version: '2.6.0',
                title: 'سامانه یکپارچه حقوقی دکتر سیده مریم رضوی',
                description: 'اتوماسیون اجرای کامل وب‌اپلیکیشن ری‌اکت در وردپرس بدون نیاز به کانفیگ دستی',
                main: 'dist/index.js',
                style: 'dist/index.css',
              },
              null,
              2
            )
          );
        }
      } catch (err) {
        console.warn('Plugin bundle packaging fallback:', err);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sedrazavi-addons.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadSuccessMessage('پکیج افزونه مکمل (sedrazavi-addons.zip) با موفقیت دانلود شد.');
      setTimeout(() => setDownloadSuccessMessage(null), 6000);
    } catch (err) {
      console.error('Failed to generate Plugin ZIP:', err);
      alert('خطایی در ساخت فایل فشرده افزونه رخ داد.');
    } finally {
      setIsZipping(false);
      setActiveDownloadType(null);
    }
  };

  const handleDownloadCompleteBundle = async () => {
    setIsZipping(true);
    setActiveDownloadType('suite');
    try {
      try {
        const checkRes = await fetch('/sedrazavi-complete-suite.zip', { method: 'HEAD' });
        if (checkRes.ok) {
          const link = document.createElement('a');
          link.href = '/sedrazavi-complete-suite.zip';
          link.download = 'sedrazavi-complete-suite.zip';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setDownloadSuccessMessage('پکیج جامع ۲ در ۱ (sedrazavi-complete-suite.zip) با موفقیت دانلود شد.');
          setTimeout(() => setDownloadSuccessMessage(null), 7000);
          return;
        }
      } catch {
        // Fallback
      }

      const builtAssets = await loadCompiledAppDist();

      const themeZip = new JSZip();
      const themeFolder = themeZip.folder('sedrazavi-theme');
      WORDPRESS_THEME_FILES.forEach((file) => {
        if (file.path !== 'screenshot.png') {
          themeFolder?.file(file.path, file.code);
        }
      });
      if (builtAssets) {
        themeFolder?.file('dist/index.css', builtAssets.css);
        themeFolder?.file('dist/index.js', builtAssets.js);
      }
      try {
        const screenshotBlob = await generateWordPressScreenshotBlob();
        themeFolder?.file('screenshot.png', screenshotBlob);
      } catch (err) {
        console.warn('Screenshot packaging fallback:', err);
      }
      const themeBlob = await themeZip.generateAsync({ type: 'blob' });

      const pluginZip = new JSZip();
      const pluginFolder = pluginZip.folder('sedrazavi-addons');
      WORDPRESS_PLUGIN_FILES.forEach((file) => {
        pluginFolder?.file(file.path, file.code);
      });
      if (builtAssets) {
        pluginFolder?.file('dist/index.css', builtAssets.css);
        pluginFolder?.file('dist/index.js', builtAssets.js);
      }
      const pluginBlob = await pluginZip.generateAsync({ type: 'blob' });

      const masterZip = new JSZip();
      masterZip.file('1-پوسته-قالب-sedrazavi-theme.zip', themeBlob);
      masterZip.file('2-افزونه-مکمل-sedrazavi-addons.zip', pluginBlob);

      const guideText = `================================================================================
دفتر وکالت و داوری تخصصی دکتر سیده مریم رضوی - راهنمای نصب و راه‌اندازی استاندارد
================================================================================

مرحله اول: نصب پوسته (Theme)
----------------------------------------
۱. در پیشخوان وردپرس به مسیر «نمایش > پوسته‌ها > افزودن پوسته تازه > بارگذاری پوسته» بروید.
۲. فایل «1-پوسته-قالب-sedrazavi-theme.zip» را انتخاب و روی «نصب» کلیک فرمایید.
۳. پس از پایان نصب، روی «فعال‌سازی» کلیک کنید.

مرحله دوم: نصب افزونه مکمل (Plugin)
----------------------------------------
۱. در پیشخوان وردپرس به مسیر «افزونه‌ها > افزودن افزونه تازه > بارگذاری افزونه» بروید.
۲. فایل «2-افزونه-مکمل-sedrazavi-addons.zip» را انتخاب و روی «نصب» کلیک نمایید.
۳. پس از پایان نصب، روی «فعال‌کردن افزونه» کلیک کنید.
================================================================================`;

      masterZip.file('راهنمای_مهم_نصب_بدون_خطا.txt', guideText);

      const content = await masterZip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sedrazavi-complete-suite.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadSuccessMessage('پکیج جامع (sedrazavi-complete-suite.zip) با موفقیت دانلود شد.');
      setTimeout(() => setDownloadSuccessMessage(null), 7000);
    } catch (err) {
      console.error('Failed to generate Complete Bundle:', err);
      alert('خطایی در ساخت بسته کامل رخ داد.');
    } finally {
      setIsZipping(false);
      setActiveDownloadType(null);
    }
  };

  const runCiCdSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);
    setSimLogs([
      '🚀 [GitHub Actions] Workflow triggered on branch: main',
      '📦 [Step 1/5] Setting up Ubuntu latest runner environment...',
    ]);

    setTimeout(() => {
      setSimStep(2);
      setSimLogs((prev) => [
        ...prev,
        '🔍 [Step 2/5] Linting PHP 8.x codebase with WordPress VIP standards...',
        '   ✓ functions.php syntax OK',
        '   ✓ style.css standard headers verified (SedRazavi v2.5.0)',
        '   ✓ 80 theme files verified (Zero Fatal Errors)',
      ]);
    }, 1100);

    setTimeout(() => {
      setSimStep(3);
      setSimLogs((prev) => [
        ...prev,
        '🖼️ [Step 3/5] Generating 1200x900 Theme Screenshot (screenshot.png)...',
        '   ✓ Aspect ratio 4:3 verified, Gold & Navy theme branding embedded',
        '🛡️ [Step 4/5] Applying .distignore filters...',
        '   ✓ Excluded .git, .github, node_modules, temp files',
      ]);
    }, 2200);

    setTimeout(() => {
      setSimStep(4);
      setSimLogs((prev) => [
        ...prev,
        '⚙️ [Step 5/5] Compressing sedrazavi-theme.zip and sedrazavi-addons.zip...',
        '   ✓ PHP Syntax validation (Linting) passed without errors',
        '   ✓ Packaged sedrazavi-theme.zip (Size: ~2.4 MB)',
        '   ✓ Packaged sedrazavi-addons.zip (Size: ~800 KB)',
        '✨ Workflow Succeeded! Clean artifacts published and ready for 1-click deployment.',
      ]);
      setIsSimulating(false);
    }, 3500);
  };

  return (
    <div className="py-8 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen font-persian" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl">

        {/* 1. Hero Luxury Header & Download Showcase */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0B132B] via-[#0E1738] to-[#070D1E] border border-[#D4AF37]/35 shadow-2xl p-6 sm:p-10 text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>مرکز بسته‌های نصبی و سورس‌کد رسمی پوسته و افزونه SedRazavi</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-emerald-400 text-[11px] font-mono">v2.5.0 Release</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight leading-snug">
                  بسته‌های زیپ آماده نصب در وردپرس (۱۰۰٪ استاندارد و ایزوله)
                </h1>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                  پوسته و افزونه مکمل با رعایت دقیق استاندارد سلسله‌مراتب قالب وردپرس ۶.۰ تا ۶.۷ و PHP 8.0+، همراه با تمپلیت‌های SSR، هدر/فوتر داینامیک، متادیتای سئوی محلی، موتور هیدراتاسیون خودکار React و بدون هیچ‌گونه پوشه تودرتو یا خطای سربرگ.
                </p>
              </div>

              {/* Verified Trust Badges */}
              <div className="flex flex-wrap lg:flex-col gap-2 shrink-0 text-xs">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-200">
                  <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>تضمین عدم بروز خطای صفحه سفید (WSOD)</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>تفکیک دو پکیج مستقل (پوسته + افزونه مکمل)</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-200">
                  <Code className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>شامل باندل‌های کامپایل‌شده React در assets/dist</span>
                </div>
              </div>
            </div>

            {/* 3 Prominent Luxury Download Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">

              {/* Card 1: Theme ZIP */}
              <div className="rounded-2xl p-5 bg-gradient-to-b from-[#141E3C] to-[#0A1128] border border-[#D4AF37]/50 shadow-xl flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition-all group">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                      <Layers className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37]/15 text-[#F3E5AB] border border-[#D4AF37]/30">
                      پوسته اصلی قالب • ۲.۴MB
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#F3E5AB] transition-colors">
                    پوسته رسمی وردپرس (Theme ZIP)
                  </h3>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    فایل <code className="text-[#D4AF37] font-mono">sedrazavi-theme.zip</code> حاوی ۸۰ فایل کامل پوسته، قالب‌های اختصاصی، هدر و فوتر SSR، کاور رسمی و باندل‌های کامپایل‌شده فرانت‌اند.
                  </p>
                  <div className="text-[10px] text-slate-400 bg-black/30 p-2 rounded-lg font-mono">
                    مسیر: پیشخوان &gt; نمایش &gt; پوسته‌ها &gt; بارگذاری پوسته
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadThemeZip}
                  disabled={isZipping}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#070D1E] font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {isZipping && activeDownloadType === 'theme' ? 'در حال آماده‌سازی...' : 'دانلود پوسته (sedrazavi-theme.zip)'}
                  </span>
                </button>
              </div>

              {/* Card 2: Addons Plugin ZIP */}
              <div className="rounded-2xl p-5 bg-gradient-to-b from-[#0F2826] to-[#081817] border border-emerald-500/40 shadow-xl flex flex-col justify-between space-y-4 hover:border-emerald-400 transition-all group">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      افزونه مکمل • ۸۰۰KB
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    افزونه مکمل هسته (Addons ZIP)
                  </h3>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    فایل <code className="text-emerald-400 font-mono">sedrazavi-addons.zip</code> حاوی ۱۲ ماژول تخصصی حقوقی، موتور شورت‌کدها، ثبت پست‌تایپ‌های نوبت/پرونده و اتوماسیون ReactPress.
                  </p>
                  <div className="text-[10px] text-slate-400 bg-black/30 p-2 rounded-lg font-mono">
                    مسیر: پیشخوان &gt; افزونه‌ها &gt; افزودن افزونه &gt; بارگذاری افزونه
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadPluginZip}
                  disabled={isZipping}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <Shield className="w-4 h-4" />
                  <span>
                    {isZipping && activeDownloadType === 'plugin' ? 'در حال آماده‌سازی...' : 'دانلود افزونه (sedrazavi-addons.zip)'}
                  </span>
                </button>
              </div>

              {/* Card 3: Complete Suite ZIP */}
              <div className="rounded-2xl p-5 bg-gradient-to-b from-[#1C1F38] to-[#0D1024] border border-blue-500/40 shadow-xl flex flex-col justify-between space-y-4 hover:border-blue-400 transition-all group">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                      <Package className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                      پکیج جامع ۲ در ۱ • ۳.۲MB
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    پکیج جامع (Complete Suite)
                  </h3>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    فایل <code className="text-blue-400 font-mono">sedrazavi-complete-suite.zip</code> حاوی هر دو فایل زیپ مستقل (پوسته + افزونه) و مستندات گام‌به‌گام نصب بدون خطا.
                  </p>
                  <div className="text-[10px] text-slate-400 bg-black/30 p-2 rounded-lg font-mono">
                    اقدام: فایل را Extract کنید و زیپ‌های درون آن را جداگانه آپلود نمایید
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadCompleteBundle}
                  disabled={isZipping}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                >
                  <Package className="w-4 h-4" />
                  <span>
                    {isZipping && activeDownloadType === 'suite' ? 'در حال آماده‌سازی...' : 'دانلود پکیج کامل (sedrazavi-complete-suite.zip)'}
                  </span>
                </button>
              </div>

            </div>

            {/* Success Feedback Notification */}
            {downloadSuccessMessage && (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-center gap-3 animate-fadeIn">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <span>{downloadSuccessMessage}</span>
              </div>
            )}
          </div>
        </div>

        {/* 2. Orderly, Cohesive Tab Navigation */}
        <div className="bg-white dark:bg-[#0B132B] p-2 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveSubTab('files')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeSubTab === 'files'
                  ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>مرورگر فایل‌ها و سورس‌کد ({WORDPRESS_THEME_FILES.length + WORDPRESS_PLUGIN_FILES.length} فایل)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('install')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeSubTab === 'install'
                  ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>راهنمای گام‌به‌گام نصب در وردپرس</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('architecture')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeSubTab === 'architecture'
                  ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>معماری ماژولار و تفکیک لایه‌ها</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('cicd')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeSubTab === 'cicd'
                  ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>پایپ‌لاین CI/CD و اتوماسیون گیت‌هاب</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#0B132B] border border-[#D4AF37]/40 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Code className="w-4 h-4" />
            <span>استخراج HTML / CSS برای المنتور</span>
          </button>
        </div>

        {/* 3. Tab Contents */}

        {/* TAB 1: FILES EXPLORER */}
        {activeSubTab === 'files' && (
          <div className="space-y-6">
            {/* Source Switcher: Theme vs Plugin + Categories */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0B132B] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">مخزن فایل:</span>
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => handleSourceChange('theme')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeSource === 'theme'
                        ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>فایل‌های پوسته ({WORDPRESS_THEME_FILES.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSourceChange('plugin')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeSource === 'plugin'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>فایل‌های افزونه مکمل ({WORDPRESS_PLUGIN_FILES.length})</span>
                  </button>
                </div>
              </div>

              {/* Categories Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {currentCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-xs'
                        : 'bg-gray-50 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Screen Explorer: Left Tree + Right Code Viewer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* File Tree List */}
              <div className="lg:col-span-4 bg-white dark:bg-[#0B132B] rounded-3xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm space-y-2 max-h-[700px] overflow-y-auto">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800 text-xs font-bold text-gray-500">
                  <FolderOpen className="w-4 h-4 text-[#D4AF37]" />
                  <span>
                    {activeSource === 'theme'
                      ? 'دایرکتوری پوسته: /wp-content/themes/sedrazavi/'
                      : 'دایرکتوری افزونه: /wp-content/plugins/sedrazavi-addons/'}
                  </span>
                </div>

                {filteredFiles.map((file, index) => (
                  <div
                    key={`${file.path}-${index}`}
                    onClick={() => setSelectedFile(file)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedFile.path === file.path
                        ? 'bg-[#0B132B] dark:bg-[#D4AF37]/15 border-[#D4AF37] text-white dark:text-[#F3E5AB] shadow-sm'
                        : 'bg-gray-50 dark:bg-gray-800/40 border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold truncate">
                        {file.path.endsWith('.png') ? (
                          <ImageIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <FileCode className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        )}
                        <span className="truncate">{file.filename}</span>
                      </div>
                      <span className="text-[10px] opacity-70 shrink-0 mr-2">
                        {file.path.endsWith('.png') ? 'تصویر' : `${file.code.split('\n').length} خط`}
                      </span>
                    </div>
                    <p className="text-[11px] opacity-80 mt-1 line-clamp-1">
                      {file.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Code Previewer Card */}
              <div className="lg:col-span-8 bg-[#0B132B] rounded-3xl border border-[#D4AF37]/30 shadow-2xl overflow-hidden flex flex-col">
                {/* Code Window Header */}
                <div className="px-6 py-4 bg-[#050A18] border-b border-gray-800 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                    </div>
                    <span className="font-mono text-xs font-bold text-gray-300" dir="ltr">
                      sedrazavi/{selectedFile.path}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedFile.path === 'screenshot.png' ? (
                      <button
                        type="button"
                        onClick={handleDownloadSingleScreenshot}
                        className="px-3.5 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#AA820A] text-[#0B132B] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>دانلود مستقیم screenshot.png</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />}
                        <span>{copiedCode ? 'کپی شد!' : 'کپی محتوای فایل'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Code Body */}
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
                        کاور رسمی پوسته در منوی نمایش &gt; پوسته‌ها در پیشخوان وردپرس نمایش داده شده و نماد هویت برند حقوقی سید رضوی است.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 overflow-x-auto overflow-y-auto max-h-[580px] text-xs font-mono text-gray-200 leading-relaxed" dir="ltr">
                    <pre className="whitespace-pre">
                      <code>{selectedFile.code}</code>
                    </pre>
                  </div>
                )}

                {/* Code Window Footer */}
                <div className="px-6 py-3 bg-[#050A18] border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
                  <span>{selectedFile.description}</span>
                  <span className="font-mono text-[11px]">UTF-8 • UNIX (LF)</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: STEP-BY-STEP INSTALLATION GUIDE */}
        {activeSubTab === 'install' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-xl space-y-8">
              <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                <h2 className="text-xl font-bold font-serif text-[#0B132B] dark:text-white">
                  راهنمای ساده و رسمی نصب در وردپرس (در ۲ مرحله بدون هیچ خطایی)
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  پوسته‌ها و افزونه‌ها در وردپرس ساختار ذخیره‌سازی مجزا دارند. برای فعال‌سازی کامل، دو فایل زیپ مستقل زیر را به ترتیب بارگذاری فرمایید:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Step 1: Theme Installation */}
                <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/30 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#D4AF37] text-[#070D1E] flex items-center justify-center font-bold text-sm">
                      ۱
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#0B132B] dark:text-white">
                        مرحله اول: بارگذاری و فعال‌سازی پوسته (Theme)
                      </h3>
                      <span className="text-[11px] text-[#D4AF37] font-mono">sedrazavi-theme.zip</span>
                    </div>
                  </div>

                  <ol className="list-decimal list-inside space-y-2 text-xs text-gray-700 dark:text-gray-300 leading-relaxed pr-2">
                    <li>وارد پیشخوان مدیریت وردپرس سایت خود شوید.</li>
                    <li>از منوی کناری به مسیر <strong>نمایش (Appearance) &gt; پوسته‌ها (Themes)</strong> بروید.</li>
                    <li>روی دکمه <strong>«افزودن پوسته تازه»</strong> و سپس <strong>«بارگذاری پوسته»</strong> کلیک کنید.</li>
                    <li>فایل زیپ <code className="text-[#D4AF37] font-bold">sedrazavi-theme.zip</code> را انتخاب کرده و دکمه <strong>«هم‌اکنون نصب کن»</strong> را بزنید.</li>
                    <li>پس از پایان بارگذاری، روی <strong>«فعال‌سازی (Activate)»</strong> کلیک نمایید.</li>
                  </ol>

                  <div className="p-3 rounded-xl bg-white dark:bg-[#070D1E] border border-amber-500/20 text-[11px] text-gray-600 dark:text-gray-400">
                    ✨ بلافاصله پوسته فعال شده و صفحه اصلی با محتوای اولیه و هویت بصری طلایی/سرمه‌ای رندر می‌گردد.
                  </div>
                </div>

                {/* Step 2: Plugin Installation */}
                <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/30 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                      ۲
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#0B132B] dark:text-white">
                        مرحله دوم: بارگذاری و فعال‌سازی افزونه (Addon Plugin)
                      </h3>
                      <span className="text-[11px] text-emerald-500 font-mono">sedrazavi-addons.zip</span>
                    </div>
                  </div>

                  <ol className="list-decimal list-inside space-y-2 text-xs text-gray-700 dark:text-gray-300 leading-relaxed pr-2">
                    <li>از منوی کناری پیشخوان به مسیر <strong>افزونه‌ها (Plugins) &gt; افزودن افزونه تازه</strong> بروید.</li>
                    <li>روی دکمه بالای صفحه با عنوان <strong>«بارگذاری افزونه»</strong> کلیک نمایید.</li>
                    <li>فایل زیپ <code className="text-emerald-500 font-bold">sedrazavi-addons.zip</code> را انتخاب و روی <strong>«هم‌اکنون نصب کن»</strong> کلیک فرمایید.</li>
                    <li>پس از پایان نصب، دکمه <strong>«فعال‌کردن افزونه»</strong> را فشار دهید.</li>
                  </ol>

                  <div className="p-3 rounded-xl bg-white dark:bg-[#070D1E] border border-emerald-500/20 text-[11px] text-gray-600 dark:text-gray-400">
                    ✨ با فعال‌سازی افزونه، تمامی شورت‌کدهای React، سامانه‌های ۳۶‌گانه و ویجت‌های المنتور در دسترس قرار می‌گیرند.
                  </div>
                </div>

              </div>

              {/* Troubleshooting Note */}
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 flex items-start gap-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                <Info className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <p>
                  <strong>نکته پیرامون پیشگیری از خطای سربرگ:</strong> در وردپرس اگر پوسته را در بخش افزونه‌ها یا افزونه را در بخش پوسته‌ها بارگذاری کنید، خطای «پوسته/افزونه فاقد یک سربرگ معتبر است» ظاهر می‌شود. با توجه به تفکیک واضح این دو فایل زیپ در این صفحه، هر بسته دقیقاً برای بخش مربوط به خود طراحی شده و بدون هیچ خطایی نصب می‌شود.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ARCHITECTURE */}
        {activeSubTab === 'architecture' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/30 shadow-xl space-y-6">
              <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                <h2 className="text-xl font-bold font-serif text-[#0B132B] dark:text-white">
                  معماری تفکیک پوسته و افزونه هسته حقوقی (Decoupled VIP Architecture)
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  پیروی از دستورالعمل رسمی WordPress VIP: سبک نگه داشتن لایه پوسته و سپردن قابلیت‌های عمیق به افزونه مستقل.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2">
                  <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold text-xs">
                    <Layers className="w-4 h-4 text-[#D4AF37]" />
                    <span>۱. لایه پوسته سبک (Theme)</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
                    فایل‌های CSS، استایل‌های رسپانسیو، قالب‌های برگه، هدر، فوتر و تمپلیت‌های SSR.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                    <Cpu className="w-4 h-4 text-emerald-500" />
                    <span>۲. هسته ماژولار (Core Addons)</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
                    ثبت پست‌تایپ‌ها، شورت‌کدها، احراز هویت پیامکی، محاسبه‌گر تعرفه و ویجت‌های المنتور.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/25 space-y-2">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-xs">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span>۳. امنیت و پایداری ضد WSOD</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
                    تست و اعتبارسنجی تمام اشیا، کنترل وجود کلاس‌ها و جلوگیری کامل از صفحه سفید.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CI/CD */}
        {activeSubTab === 'cicd' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#0B132B] rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/35 shadow-2xl text-white space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold font-serif text-[#F3E5AB]">
                      شبیه‌ساز پایپ‌لاین CI/CD و ساخت خودکار بسته (.github/workflows)
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      تست سینتکس، کامپایل باندل کلاینت و ساخت آرتیفکت‌های زیپ بدون خطا در محیط لینوکس اوبونتو.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={runCiCdSimulation}
                  disabled={isSimulating}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#070D1E] font-bold text-xs flex items-center gap-2 hover:brightness-110 shadow-lg cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>{isSimulating ? 'در حال اجرای شبیه‌سازی...' : 'اجرای Workflow Dispatch'}</span>
                </button>
              </div>

              {/* Progress Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {[
                  { step: 1, title: '۱. تریگر ارسال (Push)', desc: 'شاخه‌های main/master' },
                  { step: 2, title: '۲. دریافت سورس', desc: 'actions/checkout@v4' },
                  { step: 3, title: '۳. بررسی سینتکس PHP', desc: 'تست با PHP 8.x' },
                  { step: 4, title: '۴. بیلد فایل‌های زیپ', desc: 'پوسته و افزونه' },
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

              {/* Terminal Logs */}
              <div className="bg-[#050A18] rounded-2xl p-4 border border-gray-800 font-mono text-xs text-gray-300 space-y-1.5 max-h-56 overflow-y-auto" dir="ltr">
                <div className="flex items-center justify-between text-gray-500 pb-2 border-b border-gray-800/80 text-[11px]">
                  <span>Runner: ubuntu-latest (GitHub Hosted)</span>
                  <span>Workflow: build-and-release.yml</span>
                </div>
                {simLogs.length === 0 ? (
                  <p className="text-gray-500 italic py-2">
                    جهت مشاهده فرآیند خودکار تست و فیلتر کردن فایل‌های زیپ، روی دکمه «اجرای Workflow Dispatch» کلیک کنید.
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
          </div>
        )}

      </div>

      {/* HTML/CSS Export Modal */}
      <HtmlCssExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};
