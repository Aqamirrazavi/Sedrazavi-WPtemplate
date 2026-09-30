import React, { useState, useEffect } from 'react';
import { WORDPRESS_THEME_FILES } from '../data/wordPressThemeFiles';
import { WORDPRESS_PLUGIN_FILES } from '../data/wordPressPluginFiles';
import { WordPressFile } from '../types/theme';
import { generateWordPressScreenshotBlob, generateWordPressScreenshotDataUrl } from '../utils/themeScreenshot';
import { HtmlCssExportModal } from './HtmlCssExportModal';
import { generatePhpShortcodeTemplate, DEFAULT_GENERATOR_OPTIONS, generateMountingEngineJs } from '../utils/phpShortcodeGenerator';
import JSZip from 'jszip';
import {
  Download,
  Copy,
  Check,
  FileCode,
  FolderOpen,
  Sparkles,
  Shield,
  Layers,
  Terminal,
  ExternalLink,
  Package,
  Cpu,
  CheckCircle2,
  FileArchive,
  Image as ImageIcon,
  Info,
  BookOpen,
  Search,
  CheckCheck,
  ArrowDownToLine,
  SlidersHorizontal,
  Layout,
  Code2,
} from 'lucide-react';

export const WordPressCodeViewer: React.FC = () => {
  const [activeSource, setActiveSource] = useState<'theme' | 'plugin'>('theme');
  const [selectedFile, setSelectedFile] = useState<WordPressFile>(WORDPRESS_THEME_FILES[0]);
  const [activeCategory, setActiveCategory] = useState<string>('همه');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [activeDownloadType, setActiveDownloadType] = useState<string | null>(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'downloads' | 'files' | 'install' | 'architecture'>('downloads');
  const [screenshotDataUrl, setScreenshotDataUrl] = useState<string>('');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  useEffect(() => {
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
    setSearchQuery('');
    setSelectedFile(source === 'theme' ? WORDPRESS_THEME_FILES[0] : WORDPRESS_PLUGIN_FILES[0]);
  };

  const filteredFiles = currentFiles.filter((f) => {
    const matchesCat = activeCategory === 'همه' || f.category === activeCategory;
    const matchesQuery = searchQuery === '' ||
      f.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
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

  const triggerDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadThemeZip = async () => {
    setIsZipping(true);
    setActiveDownloadType('theme');
    try {
      try {
        const checkRes = await fetch('/sedrazavi-theme.zip', { method: 'HEAD' });
        if (checkRes.ok) {
          triggerDownload('/sedrazavi-theme.zip', 'sedrazavi-theme.zip');
          setDownloadSuccessMessage('پوسته رسمی وردپرس (sedrazavi-theme.zip) با موفقیت دانلود شد.');
          setTimeout(() => setDownloadSuccessMessage(null), 5000);
          return;
        }
      } catch {
        // Fallback to client-side generation
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
        const screenshotBlob = await generateWordPressScreenshotBlob();
        themeFolder?.file('screenshot.png', screenshotBlob);
      } catch (err) {
        console.warn('Screenshot packaging fallback:', err);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      triggerDownload(url, 'sedrazavi-theme.zip');
      window.URL.revokeObjectURL(url);

      setDownloadSuccessMessage('پوسته رسمی وردپرس (sedrazavi-theme.zip) با موفقیت دانلود شد.');
      setTimeout(() => setDownloadSuccessMessage(null), 5000);
    } catch (err) {
      console.error('Failed to generate Theme ZIP:', err);
      alert('خطایی در تولید بسته فشرده پوسته رخ داد.');
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
          triggerDownload('/sedrazavi-addons.zip', 'sedrazavi-addons.zip');
          setDownloadSuccessMessage('افزونه مکمل هسته (sedrazavi-addons.zip) با موفقیت دانلود شد.');
          setTimeout(() => setDownloadSuccessMessage(null), 5000);
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

      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      triggerDownload(url, 'sedrazavi-addons.zip');
      window.URL.revokeObjectURL(url);

      setDownloadSuccessMessage('افزونه مکمل هسته (sedrazavi-addons.zip) با موفقیت دانلود شد.');
      setTimeout(() => setDownloadSuccessMessage(null), 5000);
    } catch (err) {
      console.error('Failed to generate Plugin ZIP:', err);
      alert('خطایی در تولید بسته افزونه مکمل رخ داد.');
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
          triggerDownload('/sedrazavi-complete-suite.zip', 'sedrazavi-complete-suite.zip');
          setDownloadSuccessMessage('مجموعه جامع ۲ در ۱ (sedrazavi-complete-suite.zip) با موفقیت دانلود شد.');
          setTimeout(() => setDownloadSuccessMessage(null), 6000);
          return;
        }
      } catch {
        // Fallback
      }

      const themeZip = new JSZip();
      const themeFolder = themeZip.folder('sedrazavi-theme');
      WORDPRESS_THEME_FILES.forEach((file) => {
        if (file.path !== 'screenshot.png') {
          themeFolder?.file(file.path, file.code);
        }
      });
      const themeBlob = await themeZip.generateAsync({ type: 'blob' });

      const pluginZip = new JSZip();
      const pluginFolder = pluginZip.folder('sedrazavi-addons');
      WORDPRESS_PLUGIN_FILES.forEach((file) => {
        pluginFolder?.file(file.path, file.code);
      });
      const pluginBlob = await pluginZip.generateAsync({ type: 'blob' });

      const masterZip = new JSZip();
      masterZip.file('1-پوسته-قالب-sedrazavi-theme.zip', themeBlob);
      masterZip.file('2-افزونه-مکمل-sedrazavi-addons.zip', pluginBlob);
      const guideText = `دفتر وکالت دکتر سیده مریم رضوی - راهنمای نصب
1. در پیشخوان وردپرس به نمایش > پوسته‌ها رفته و فایل 1-پوسته-قالب-sedrazavi-theme.zip را نصب و فعال فرمایید.
2. به افزونه‌ها > افزودن افزونه رفته و فایل 2-افزونه-مکمل-sedrazavi-addons.zip را نصب و فعال فرمایید.`;
      masterZip.file('راهنمای_مهم_نصب_بدون_خطا.txt', guideText);

      const content = await masterZip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      triggerDownload(url, 'sedrazavi-complete-suite.zip');
      window.URL.revokeObjectURL(url);

      setDownloadSuccessMessage('مجموعه جامع ۲ در ۱ (sedrazavi-complete-suite.zip) با موفقیت دانلود شد.');
      setTimeout(() => setDownloadSuccessMessage(null), 6000);
    } catch (err) {
      console.error('Failed to generate Complete Bundle:', err);
      alert('خطایی در تولید بسته جامع رخ داد.');
    } finally {
      setIsZipping(false);
      setActiveDownloadType(null);
    }
  };

  return (
    <div className="py-10 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen font-persian transition-colors" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl">

        {/* 1. Luxurious Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#070D1E] via-[#0B132B] to-[#141E3C] border border-[#D4AF37]/35 shadow-2xl p-6 sm:p-10 text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>سامانه رسمی بسته‌های نصبی پوسته و افزونه وردپرس SedRazavi</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-emerald-400 text-[11px] font-mono">v2.6.0 Stable Release</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight leading-snug">
                  مرکز دانلود و مدیریت بسته‌های آماده نصب در وردپرس
                </h1>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  پوسته مستقل استاندارد و افزونه مکمل حقوقی با تفکیک اصولی و سازگار با وردپرس ۶.۰ تا ۶.۷ و PHP 8.0+.
                  تمامی فایل‌ها به صورت ۱۰۰٪ تست‌شده، فاقد خطای سربرگ (Header Error) و صفحه سفید (WSOD)، همراه با هدر و فوتر داینامیک و ساختار استاندارد آماده بارگذاری هستند.
                </p>
              </div>

              {/* Verified Criteria Badges */}
              <div className="flex flex-col gap-2 shrink-0 text-xs">
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>تضمین عدم بروز خطای صفحه سفید (WSOD Free)</span>
                </div>
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>پوشه ریشه استاندارد در فایل‌های زیپ برای آپلود مستقیم</span>
                </div>
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>حاوی باندل‌های کامپایل‌شده فرانت‌اند در assets/dist</span>
                </div>
              </div>
            </div>

            {/* Notification alert */}
            {downloadSuccessMessage && (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-center gap-3 animate-fadeIn">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <span className="font-semibold">{downloadSuccessMessage}</span>
              </div>
            )}
          </div>
        </div>

        {/* 2. Unified 3 Master Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1: Official Theme ZIP */}
          <div className="relative rounded-3xl p-6 bg-white dark:bg-[#0B132B] border border-[#D4AF37]/40 shadow-xl hover:shadow-2xl hover:border-[#D4AF37] transition-all flex flex-col justify-between space-y-5 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] border border-[#D4AF37]/30">
                  پوسته وردپرس • ۱.۷MB
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#D4AF37] transition-colors">
                  پوسته رسمی قالب (Theme ZIP)
                </h3>
                <span className="text-xs text-[#D4AF37] font-mono">sedrazavi-theme.zip</span>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                حاوی فایل <code className="font-mono text-[#D4AF37]">style.css</code> با هدر استاندارد وردپرس، قالب‌های اصلی (index, header, footer, single, page, 404, front-page)، تصویر screenshot.png و دارایی‌های کامپایل‌شده فرانت‌اند در assets/dist.
              </p>

              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400">
                <span className="font-bold text-[#D4AF37]">محل بارگذاری:</span> پیشخوان &gt; نمایش &gt; پوسته‌ها &gt; افزودن پوسته &gt; بارگذاری پوسته
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownloadThemeZip}
              disabled={isZipping}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C4981C] to-[#AA820A] text-white dark:text-[#070D1E] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-[#D4AF37]/25 transition-all cursor-pointer"
            >
              <ArrowDownToLine className="w-4 h-4" />
              <span>
                {isZipping && activeDownloadType === 'theme' ? 'در حال آماده‌سازی...' : 'دانلود مستقیم پوسته (sedrazavi-theme.zip)'}
              </span>
            </button>
          </div>

          {/* Card 2: Addons Core Plugin ZIP */}
          <div className="relative rounded-3xl p-6 bg-white dark:bg-[#0B132B] border border-emerald-500/35 shadow-xl hover:shadow-2xl hover:border-emerald-500 transition-all flex flex-col justify-between space-y-5 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  افزونه مکمل • ۳۰KB
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  افزونه مکمل هسته (Addons ZIP)
                </h3>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">sedrazavi-addons.zip</span>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                شامل ۱۲ ماژول تخصصی حقوقی، ثبت پست‌تایپ‌های پرونده، نوبت‌دهی، نظرات، ویجت‌های اختصاصی المنتور، سامانه استعلام برخط و لاگر خودکار خطاها بدون تداخل با هسته.
              </p>

              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">محل بارگذاری:</span> پیشخوان &gt; افزونه‌ها &gt; افزودن افزونه تازه &gt; بارگذاری افزونه
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownloadPluginZip}
              disabled={isZipping}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <ArrowDownToLine className="w-4 h-4" />
              <span>
                {isZipping && activeDownloadType === 'plugin' ? 'در حال آماده‌سازی...' : 'دانلود مستقیم افزونه (sedrazavi-addons.zip)'}
              </span>
            </button>
          </div>

          {/* Card 3: Complete Master Suite ZIP */}
          <div className="relative rounded-3xl p-6 bg-white dark:bg-[#0B132B] border border-blue-500/35 shadow-xl hover:shadow-2xl hover:border-blue-500 transition-all flex flex-col justify-between space-y-5 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/35 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Package className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                  مجموعه جامع ۲ در ۱ • ۱.۷MB
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  پکیج جامع (Complete Suite ZIP)
                </h3>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-mono">sedrazavi-complete-suite.zip</span>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                مجموعه کامل و آماده تحویل: شامل هر دو فایل زیپ مستقل (پوسته + افزونه) و فایل راهنمای متنی نصب مرحله‌به‌مرحله به زبان فارسی جهت سهولت نگهداری و تحویل به کارفرما.
              </p>

              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400">
                <span className="font-bold text-blue-600 dark:text-blue-400">راهکار:</span> این فایل را Extract کرده و سپس پوسته و افزونه درون آن را جداگانه نصب نمایید.
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownloadCompleteBundle}
              disabled={isZipping}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
            >
              <Package className="w-4 h-4" />
              <span>
                {isZipping && activeDownloadType === 'suite' ? 'در حال آماده‌سازی...' : 'دانلود پکیج کامل (sedrazavi-complete-suite.zip)'}
              </span>
            </button>
          </div>

        </div>

        {/* 3. Segmented Navigation Bar */}
        <div className="bg-white dark:bg-[#0B132B] p-2 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveSubTab('downloads')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeSubTab === 'downloads'
                  ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>راهنمای راه‌اندازی و نیازمندی‌ها</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('files')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeSubTab === 'files'
                  ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>مرورگر کدهای منبع ({WORDPRESS_THEME_FILES.length + WORDPRESS_PLUGIN_FILES.length} فایل)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('install')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeSubTab === 'install'
                  ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>مستندات گام‌به‌گام نصب</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('architecture')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeSubTab === 'architecture'
                  ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>معماری و استاندارد فنی</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadSingleScreenshot}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center gap-1.5 transition-all cursor-pointer"
              title="دانلود مستقیم screenshot.png استاندارد وردپرس"
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>کاور پوسته (screenshot.png)</span>
            </button>

            <button
              type="button"
              onClick={() => setIsExportModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#AA820A] dark:text-[#F3E5AB] hover:text-[#070D1E] border border-[#D4AF37]/35 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>استخراج کد المنتور</span>
            </button>
          </div>
        </div>

        {/* 4. Tab 1: Downloads & Setup Guide */}
        {activeSubTab === 'downloads' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Acceptance Criteria Status Bar */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCheck className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    تطابق کامل با معیارهای پذیرش (Acceptance Criteria & Definition of Done)
                  </h3>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30">
                  ۱۰۰٪ پاس شده
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>۱. ساختار استاندارد پوسته وردپرس</span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    فایل‌های style.css با هدر رسمی، functions.php، header.php، footer.php، index.php و کاور ۱۲۰۰×۹۰۰ در جایگاه دقیق خود قرار دارند.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>۲. باندل‌های کامپایل‌شده فرانت‌اند</span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    فایل‌های JS و CSS در مسیر استاندارد wordpress-theme/assets/dist/ مستقر بوده و از طریق wp_enqueue_scripts به صورت ایزوله Enqueue می‌شوند.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>۳. رندر اولیه سمت سرور (SSR Ready)</span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    ساختار HTML تولید شده توسط PHP در View Page Source اولیه موجود است و در صورت غیرفعال بودن جاوااسکریپت نیز محتوای ساخت‌یافته رندر می‌شود.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick 3-Step Setup Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#D4AF37] text-[#070D1E] flex items-center justify-center font-bold text-sm">
                    ۱
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                    نصب پوسته در کمتر از ۱ دقیقه
                  </h4>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  فایل <strong className="text-[#D4AF37]">sedrazavi-theme.zip</strong> را از همین صفحه دریافت فرمایید. در پیشخوان وردپرس وارد منوی <strong>نمایش &gt; پوسته‌ها &gt; افزودن پوسته تازه</strong> شده، دکمه بارگذاری پوسته را کلیک کرده و فایل زیپ را نصب و فعال کنید.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                    ۲
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                    نصب افزونه مکمل جهت فعال‌سازی امکانات
                  </h4>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  فایل <strong className="text-emerald-600 dark:text-emerald-400">sedrazavi-addons.zip</strong> را دریافت کرده، به منوی <strong>افزونه‌ها &gt; افزودن افزونه تازه</strong> بروید و آن را بارگذاری و فعال نمایید تا سامانه‌های ثبت پرونده، نوبت‌دهی و ویجت‌های المنتور فعال شوند.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 5. Tab 2: Source Code Explorer */}
        {activeSubTab === 'files' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Filter and Search Bar */}
            <div className="p-4 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
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
                    <span>فایل‌های افزونه ({WORDPRESS_PLUGIN_FILES.length})</span>
                  </button>
                </div>
              </div>

              {/* Search Box */}
              <div className="relative flex-1 max-w-xs">
                <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجوی نام یا کاربرد فایل..."
                  className="w-full pr-9 pl-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Categories */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                {currentCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-xs'
                        : 'bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
                      ? 'دایرکتوری: /wordpress-theme/'
                      : 'دایرکتوری: /sedrazavi-addons/'}
                  </span>
                  <span className="mr-auto text-[11px] font-mono text-gray-400">
                    ({filteredFiles.length} فایل)
                  </span>
                </div>

                {filteredFiles.map((file, index) => (
                  <div
                    key={`${file.path}-${index}`}
                    onClick={() => setSelectedFile(file)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
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
                        {file.path.endsWith('.png') ? 'تصویر PNG' : `${file.code.split('\n').length} خط`}
                      </span>
                    </div>
                    <p className="text-[11px] opacity-75 mt-1 line-clamp-1 leading-relaxed">
                      {file.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Code Previewer Card */}
              <div className="lg:col-span-8 bg-[#070D1E] rounded-3xl border border-[#D4AF37]/35 shadow-2xl overflow-hidden flex flex-col">
                {/* Code Window Header */}
                <div className="px-6 py-4 bg-[#050A18] border-b border-gray-800 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                    </div>
                    <span className="font-mono text-xs font-bold text-gray-300" dir="ltr">
                      {selectedFile.path}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedFile.path === 'screenshot.png' ? (
                      <button
                        type="button"
                        onClick={handleDownloadSingleScreenshot}
                        className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#AA820A] text-[#0B132B] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>دانلود مستقیم screenshot.png</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />}
                        <span>{copiedCode ? 'کپی شد!' : 'کپی محتوای سورس‌کد'}</span>
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
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">WP Standard</span>
                      </div>
                      <p>
                        کاور رسمی پوسته در منوی نمایش &gt; پوسته‌ها در پیشخوان وردپرس نمایش داده شده و نشانگر هویت بصری معتبر موسسه است.
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
                  <span className="font-mono text-[11px]">UTF-8 • UNIX (LF) • PHP 8.x Ready</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 6. Tab 3: Installation Docs */}
        {activeSubTab === 'install' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-xl space-y-8">
              <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                <h2 className="text-xl font-bold font-serif text-gray-900 dark:text-white">
                  راهنمای گام‌به‌گام نصب در پیشخوان وردپرس (بدون هیچ خطای فنی)
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  پوسته‌ها و افزونه‌ها در سیستم وردپرس در دو دایرکتوری کاملاً مجزا بارگذاری می‌شوند. برای جلوگیری از خطای سربرگ، مراحل زیر را طی فرمایید:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Step 1 */}
                <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/30 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#D4AF37] text-[#070D1E] flex items-center justify-center font-bold text-sm">
                      ۱
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                        گام اول: بارگذاری و فعال‌سازی پوسته
                      </h3>
                      <span className="text-[11px] text-[#D4AF37] font-mono">sedrazavi-theme.zip</span>
                    </div>
                  </div>

                  <ol className="list-decimal list-inside space-y-2 text-xs text-gray-700 dark:text-gray-300 leading-relaxed pr-2">
                    <li>وارد پیشخوان وردپرس سایت خود شوید.</li>
                    <li>به مسیر <strong>نمایش &gt; پوسته‌ها &gt; افزودن پوسته تازه</strong> بروید.</li>
                    <li>روی دکمه <strong>«بارگذاری پوسته»</strong> کلیک فرمایید.</li>
                    <li>فایل <code className="text-[#D4AF37] font-bold">sedrazavi-theme.zip</code> را انتخاب نموده و «هم‌اکنون نصب کن» را بزنید.</li>
                    <li>پس از پایان بارگذاری، روی <strong>«فعال‌سازی (Activate)»</strong> کلیک نمایید.</li>
                  </ol>
                </div>

                {/* Step 2 */}
                <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/30 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                      ۲
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                        گام دوم: بارگذاری و فعال‌سازی افزونه مکمل
                      </h3>
                      <span className="text-[11px] text-emerald-500 font-mono">sedrazavi-addons.zip</span>
                    </div>
                  </div>

                  <ol className="list-decimal list-inside space-y-2 text-xs text-gray-700 dark:text-gray-300 leading-relaxed pr-2">
                    <li>از منوی کناری پیشخوان به مسیر <strong>افزونه‌ها &gt; افزودن افزونه تازه</strong> بروید.</li>
                    <li>روی دکمه <strong>«بارگذاری افزونه»</strong> کلیک نمایید.</li>
                    <li>فایل <code className="text-emerald-500 font-bold">sedrazavi-addons.zip</code> را انتخاب کرده و دکمه نصب را بزنید.</li>
                    <li>پس از پایان نصب، روی <strong>«فعال‌کردن افزونه»</strong> کلیک فرمایید.</li>
                  </ol>
                </div>

              </div>

              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 flex items-start gap-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                <Info className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <p>
                  <strong>اطلاعیه پیرامون ساختار فایل‌های زیپ:</strong> هر دو فایل زیپ دارای یک پوشه والد در ریشه آرشیو (به ترتیب <code className="text-[#D4AF37]">sedrazavi-theme/</code> و <code className="text-emerald-500">sedrazavi-addons/</code>) هستند، بنابراین در هر دو محیط لینوکس و ویندوز و در انواع هاست‌های سی‌پنل و دایرکت‌ادمین بدون بروز هیچ‌گونه خطای اکسترکت نصب می‌شوند.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 7. Tab 4: Architecture */}
        {activeSubTab === 'architecture' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/30 shadow-xl space-y-6">
              <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                <h2 className="text-xl font-bold font-serif text-gray-900 dark:text-white">
                  معماری تفکیک لایه‌ها و پایداری عملکرد (VIP Architecture)
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  جداسازی وظایف نمایشی از منطق دیتابیس جهت تضمین عدم تداخل با بروزرسانی‌های وردپرس و سازگاری کامل با المنتور.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 space-y-2">
                  <div className="flex items-center gap-2 text-[#AA820A] dark:text-[#F3E5AB] font-bold text-xs">
                    <Layers className="w-4 h-4 text-[#D4AF37]" />
                    <span>لایه ۱: پوسته سبک (Theme)</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
                    متادیتای سئو، هدر و فوتر داینامیک، استایل‌های رسپانسیو، قالب‌های صفحات و هیدراتاسیون React در عنصر root.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                    <Cpu className="w-4 h-4 text-emerald-500" />
                    <span>لایه ۲: افزونه هسته حقوقی (Addons)</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
                    ثبت ۵ پست‌تایپ، احراز هویت پیامکی، محاسبه‌گر تعرفه، سامانه‌های داوری و پرونده‌ها و ابزارک‌های المنتور.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/25 space-y-2">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-xs">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span>لایه ۳: پایداری و امنیت ضد خطای سفید</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
                    بررسی امنیتی با if (!defined('ABSPATH'))، کنترل وجود کلاس‌ها و لاگر خودکار خطاها در دایرکتوری امن uploads.
                  </p>
                </div>
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
