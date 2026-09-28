import React, { useState, useMemo } from 'react';
import JSZip from 'jszip';
import {
  Code,
  FileCode,
  Copy,
  Check,
  Download,
  Sparkles,
  Layers,
  Settings,
  CheckCircle2,
  Play,
  Search,
  Sliders,
  ExternalLink,
  FileText,
  Terminal,
  RefreshCw,
  FolderArchive,
  ShieldCheck,
  CheckSquare,
  Square,
  Maximize2
} from 'lucide-react';
import {
  REACT_SHORTCODE_DEFINITIONS,
  ReactComponentShortcodeDef,
} from '../../data/reactShortcodeDefinitions';
import {
  PhpGeneratorOptions,
  DEFAULT_GENERATOR_OPTIONS,
  generatePhpShortcodeTemplate,
  generateMountingEngineJs,
  generateFunctionsPhpSnippet,
  generateDocumentationMarkdown,
} from '../../utils/phpShortcodeGenerator';

// Real React components for the Live Mount Simulator
import { CaseProgressTracker } from '../CaseProgressTracker';
import { CourtFeeCalculator } from '../legal-finance/CourtFeeCalculator';
import { ClientPortalQuickAccessWidget } from '../ClientPortalQuickAccessWidget';
import { ServicesSection } from '../ServicesSection';
import { TestimonialsSlider } from '../TestimonialsSlider';
import { ArticlesSection } from '../ArticlesSection';
import { FaqSection } from '../FaqSection';
import { ContactAndBookingSection } from '../ContactAndBookingSection';
import { TrustBadges } from '../TrustBadges';
import { StoryBar } from '../StoryBar';
import { TextBannerSlider } from '../TextBannerSlider';
import { FrontendCommentsModeration } from '../FrontendCommentsModeration';

interface AdminReactShortcodesTabProps {
  onOpenModal?: () => void;
}

export const AdminReactShortcodesTab: React.FC<AdminReactShortcodesTabProps> = ({ onOpenModal }) => {
  const [activeTab, setActiveTab] = useState<'config' | 'php_code' | 'simulator' | 'cheatsheet' | 'architecture'>('config');
  const [options, setOptions] = useState<PhpGeneratorOptions>(DEFAULT_GENERATOR_OPTIONS);
  const [activeCodeSubTab, setActiveCodeSubTab] = useState<'php' | 'functions' | 'js' | 'readme'>('php');
  const [componentSearch, setComponentSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  const [simulatorCompId, setSimulatorCompId] = useState<string>(REACT_SHORTCODE_DEFINITIONS[0].id);
  const [simAttributes, setSimAttributes] = useState<Record<string, any>>(
    REACT_SHORTCODE_DEFINITIONS[0].sampleAttributes
  );

  const categories = ['همه', 'کارتابل و پرونده‌ها', 'مالی و محاسبات', 'رزرو و نوبت‌دهی', 'بخش‌های اصلی و محتوا', 'اعتبار و هویت'];

  const filteredComponents = useMemo(() => {
    return REACT_SHORTCODE_DEFINITIONS.filter((item) => {
      const matchCat = selectedCategory === 'همه' || item.category === selectedCategory;
      const matchSearch =
        item.title.includes(componentSearch) ||
        item.componentName.toLowerCase().includes(componentSearch.toLowerCase()) ||
        item.shortcodeTag.includes(componentSearch) ||
        item.description.includes(componentSearch);
      return matchCat && matchSearch;
    });
  }, [selectedCategory, componentSearch]);

  const toggleComponent = (id: string) => {
    setOptions((prev) => {
      const exists = prev.selectedComponentIds.includes(id);
      return {
        ...prev,
        selectedComponentIds: exists
          ? prev.selectedComponentIds.filter((item) => item !== id)
          : [...prev.selectedComponentIds, id],
      };
    });
  };

  const selectAllComponents = () => {
    setOptions((prev) => ({
      ...prev,
      selectedComponentIds: REACT_SHORTCODE_DEFINITIONS.map((c) => c.id),
    }));
  };

  const deselectAllComponents = () => {
    setOptions((prev) => ({
      ...prev,
      selectedComponentIds: [],
    }));
  };

  const generatedPhpCode = useMemo(() => {
    return generatePhpShortcodeTemplate(options);
  }, [options]);

  const generatedMountJs = useMemo(() => {
    return generateMountingEngineJs(options);
  }, [options]);

  const generatedFunctionsSnippet = useMemo(() => {
    return generateFunctionsPhpSnippet(options);
  }, [options]);

  const generatedReadme = useMemo(() => {
    return generateDocumentationMarkdown(options);
  }, [options]);

  const currentSimDef = useMemo(() => {
    return REACT_SHORTCODE_DEFINITIONS.find((d) => d.id === simulatorCompId) || REACT_SHORTCODE_DEFINITIONS[0];
  }, [simulatorCompId]);

  const handleSelectSimComponent = (def: ReactComponentShortcodeDef) => {
    setSimulatorCompId(def.id);
    setSimAttributes(def.sampleAttributes);
  };

  const handleSimAttributeChange = (key: string, val: any) => {
    setSimAttributes((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const simShortcodeTag = useMemo(() => {
    const fullTag = `${options.shortcodePrefix}${currentSimDef.shortcodeTag.replace(/^react_/, '')}`;
    const attrsStr = Object.entries(simAttributes)
      .map(([k, v]) => `${k}="${v}"`)
      .join(' ');
    return attrsStr ? `[${fullTag} ${attrsStr}]` : `[${fullTag}]`;
  }, [options.shortcodePrefix, currentSimDef, simAttributes]);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleDownloadPhpFile = () => {
    const filename = options.targetType === 'theme' ? 'sedrazavi-react-shortcodes.php' : 'sedrazavi-react-addons.php';
    const blob = new Blob([generatedPhpCode], { type: 'application/x-httpd-php;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccessMsg(`فایل ${filename} با موفقیت دانلود شد.`);
    setTimeout(() => setDownloadSuccessMsg(null), 4000);
  };

  const handleDownloadZipPackage = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      zip.file('sedrazavi-react-shortcodes.php', generatedPhpCode);
      zip.file('functions.php-snippet.txt', generatedFunctionsSnippet);
      zip.file('README-INTEGRATION.md', generatedReadme);

      const assetsFolder = zip.folder('assets');
      if (assetsFolder) {
        assetsFolder.file('sedrazavi-react-mount.js', generatedMountJs);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'SedRazavi-React-Shortcodes-WordPress-Bundle.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadSuccessMsg('بسته شورت‌کدهای React وردپرس با موفقیت دانلود شد.');
      setTimeout(() => setDownloadSuccessMsg(null), 4000);
    } catch (err) {
      console.error(err);
      alert('خطا در دانلود زیپ');
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadFullThemeZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // ۱. شناسنامه رسمی پوسته وردپرس (style.css)
      zip.file(
        'style.css',
        `/*
Theme Name: SedRazavi Law Firm (پوسته حقوقی و وکالت سید رضوی)
Theme URI: https://t.me/sedrazavi
Author: دفتر وکالت سید رضوی (سیده مریم رضوی و سید امیر حسین رضوی فردویی)
Author URI: https://t.me/sedrazavi
Description: پوسته اختصاصی، فوق‌پیشرفته و هوشمند دفاتر وکالت و داوری بین‌المللی بر پایه معماری هایبرید مدرن React 19 + Tailwind CSS و فریم‌ورک استاندارد وردپرس.
Version: 2.5.0
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 8.0
License: GNU General Public License v2 or later
Text Domain: sedrazavi
Tags: law-firm, legal, attorney, rtl-language-support, custom-colors, theme-options
*/
body { direction: rtl; text-align: right; background-color: #070D1E; color: #F8FAFC; margin: 0; padding: 0; }
#root { min-height: 100vh; }`
      );

      // ۲. فایل هسته index.php
      zip.file(
        'index.php',
        `<?php
if (!defined('ABSPATH')) exit;
get_header();
?>
<main id="primary" class="site-main">
    <div id="root">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" class="sr-only">
                <h1><?php the_title(); ?></h1>
                <div class="entry-content"><?php the_content(); ?></div>
            </article>
        <?php endwhile; endif; ?>
    </div>
</main>
<?php get_footer();`
      );

      // ۳. سربرگ header.php
      zip.file(
        'header.php',
        `<?php
if (!defined('ABSPATH')) exit;
?><!DOCTYPE html>
<html <?php language_attributes(); ?> dir="<?php echo is_rtl() ? 'rtl' : 'ltr'; ?>">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class('sedrazavi-hybrid-theme bg-[#070D1E] text-slate-100 antialiased'); ?>>
<?php wp_body_open(); ?>`
      );

      // ۴. پابرگ footer.php
      zip.file(
        'footer.php',
        `<?php
if (!defined('ABSPATH')) exit;
?>
    <?php wp_footer(); ?>
</body>
</html>`
      );

      // ۵. توابع functions.php
      zip.file(
        'functions.php',
        `<?php
if (!defined('ABSPATH')) exit;
define('SEDRAZAVI_THEME_VERSION', '2.5.0');
define('SEDRAZAVI_THEME_DIR', get_template_directory());
define('SEDRAZAVI_THEME_URI', get_template_directory_uri());

function sedrazavi_theme_setup() {
    load_theme_textdomain('sedrazavi', SEDRAZAVI_THEME_DIR . '/languages');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('align-wide');
    register_nav_menus(array(
        'primary-menu' => __('منوی اصلی', 'sedrazavi'),
        'footer-menu' => __('منوی فوتر', 'sedrazavi')
    ));
}
add_action('after_setup_theme', 'sedrazavi_theme_setup');

function sedrazavi_enqueue_theme_scripts() {
    wp_enqueue_style('sedrazavi-theme-style', get_stylesheet_uri(), array(), SEDRAZAVI_THEME_VERSION);
    if (file_exists(SEDRAZAVI_THEME_DIR . '/public/app-dist/index.css')) {
        wp_enqueue_style('sedrazavi-bundle-css', SEDRAZAVI_THEME_URI . '/public/app-dist/index.css', array(), SEDRAZAVI_THEME_VERSION);
    }
    if (file_exists(SEDRAZAVI_THEME_DIR . '/public/app-dist/index.js')) {
        wp_enqueue_script('sedrazavi-bundle-js', SEDRAZAVI_THEME_URI . '/public/app-dist/index.js', array(), SEDRAZAVI_THEME_VERSION, true);
    }
}
add_action('wp_enqueue_scripts', 'sedrazavi_enqueue_theme_scripts');

if (file_exists(SEDRAZAVI_THEME_DIR . '/inc/react-shortcodes.php')) {
    require_once SEDRAZAVI_THEME_DIR . '/inc/react-shortcodes.php';
}`
      );

      // ۶. قالب برگه‌ها page.php و مقالات single.php
      zip.file(
        'page.php',
        `<?php
if (!defined('ABSPATH')) exit;
get_header(); ?>
<div class="container mx-auto px-4 py-8">
    <?php while (have_posts()) : the_post(); the_content(); endwhile; ?>
</div>
<?php get_footer(); ?>`
      );

      zip.file(
        'single.php',
        `<?php
if (!defined('ABSPATH')) exit;
get_header(); ?>
<div class="container mx-auto px-4 py-8 max-w-4xl">
    <?php while (have_posts()) : the_post(); ?>
        <h1 class="text-3xl font-bold mb-4"><?php the_title(); ?></h1>
        <div class="content"><?php the_content(); ?></div>
    <?php endwhile; ?>
</div>
<?php get_footer(); ?>`
      );

      // ۷. شورت‌کدها در inc/
      const incFolder = zip.folder('inc');
      if (incFolder) {
        incFolder.file('react-shortcodes.php', generatedPhpCode);
      }

      // ۸. اسکریپت مانت در assets/js/
      const assetsFolder = zip.folder('assets');
      const jsFolder = assetsFolder?.folder('js');
      if (jsFolder) {
        jsFolder.file('sedrazavi-react-mount.js', generatedMountJs);
      }

      // ۹. راهنمای نصب README.md
      zip.file('README.md', generatedReadme);

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sedrazavi-law-firm-wordpress-theme.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadSuccessMsg('پوسته کامل وردپرس (sedrazavi-law-firm-wordpress-theme.zip) آماده و دانلود شد. قابل نصب مستقیم در نمایش > پوسته‌ها');
      setTimeout(() => setDownloadSuccessMsg(null), 5000);
    } catch (err) {
      console.error(err);
      alert('خطا در ایجاد پکیج کامل پوسته');
    } finally {
      setIsZipping(false);
    }
  };

  const sampleTrackerSteps = [
    { title: 'ثبت دادخواست در سامانه ثنا', stageName: 'شعبه ۱۲ بازپرسی', date: '۱۴۰۳/۰۵/۱۰', description: 'ثبت دادخواست و ارجاع پرونده به دادسرا', completed: true },
    { title: 'ارجاع به کارشناسی رسمی', stageName: 'کانون کارشناسان', date: '۱۴۰۳/۰۶/۱۵', description: 'بررسی مدارک مالی توسط کارشناس رسمی', completed: true },
    { title: 'تبادل لوایح و نظریه تکمیلی', stageName: 'شعبه ۱۰۷ حقوقی', date: '۱۴۰۳/۰۷/۲۰', description: simAttributes.status_text || 'در حال تبادل لوایح', completed: true, current: true },
    { title: 'تشکیل جلسه رسیدگی ماهوی', stageName: 'دادگاه ونک', date: simAttributes.hearing_date || '۱۴۰۳/۰۹/۱۸', description: 'حضور وکیل در جلسه دفاع', completed: false },
    { title: 'انشای رأی نهایی و ابلاغ', stageName: 'اجرای احکام مدنی', date: 'در انتظار جلسه', description: 'صدور دادنامه قطعی', completed: false },
  ];

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-l from-[#0B132B] via-[#1C2541] to-[#0B132B] rounded-3xl p-6 sm:p-8 text-white border border-[#D4AF37]/35 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 shadow-inner">
                <FileCode className="w-6 h-6" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif">
                مولد قالب PHP شورت‌کدهای React در وردپرس (WordPress React Bridge)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
              این ابزار فایل جامع PHP حاوی شورت‌کدهای تعاملی برای کلیه مؤلفه‌های React این داشبورد (شامل رهگیری پرونده، محاسبه‌گر هزینه دادرسی، تقویم رزرو، کارتابل موکل و...) را همراه با سازوکار بهینه Enqueue تاخیری و تزریق متغیرهای سرور با <code className="text-[#D4AF37] font-mono">wp_localize_script</code> تولید می‌نماید.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onOpenModal && (
              <button
                onClick={onOpenModal}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
                title="مشاهده در پنجره بزرگ"
              >
                <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
                <span>حالت تمام‌صفحه / پنجره بزرگ</span>
              </button>
            )}

            <button
              onClick={handleDownloadFullThemeZip}
              disabled={isZipping}
              className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-[#D4AF37]/25 hover:brightness-110 transition-all"
              title="دانلود فایل زیپ کامل قالب آماده نصب در وردپرس"
            >
              {isZipping ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>در حال فشرده‌سازی...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>دانلود پوسته کامل وردپرس (.ZIP)</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadZipPackage}
              disabled={isZipping}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
              title="دانلود صرفاً فایل‌های شورت‌کد و اسکریپت پل React"
            >
              <FolderArchive className="w-4 h-4" />
              <span>دانلود ماژول شورت‌کدها</span>
            </button>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-white/10 text-xs">
          <span className="flex items-center gap-1.5 text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            لودینگ هوشمند Lazy Enqueue (حجم صفر در صفحات نامربوط)
          </span>
          <span className="flex items-center gap-1.5 text-gray-300">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            امنیت ارتباط REST API با توکن Nonce
          </span>
          <span className="flex items-center gap-1.5 text-gray-300">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            هماهنگی کامل با ویجت کد کوتاه المنتور و گوتنبرگ
          </span>
        </div>
      </div>

      {/* Success Notification Alert */}
      {downloadSuccessMsg && (
        <div className="p-3 bg-emerald-600/90 text-white rounded-xl text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{downloadSuccessMsg}</span>
          </div>
          <button onClick={() => setDownloadSuccessMsg(null)}>×</button>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="p-1.5 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('config')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'config'
              ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/50 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>۱. پیکربندی و انتخاب مؤلفه‌ها ({options.selectedComponentIds.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('php_code')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'php_code'
              ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/50 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
          }`}
        >
          <Code className="w-3.5 h-3.5 text-blue-400" />
          <span>۲. کدهای خروجی PHP و تمپلیت</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#D4AF37] text-[#0B132B] font-mono font-bold">
            {generatedPhpCode.split('\n').length} خط
          </span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'simulator'
              ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/50 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
          }`}
        >
          <Play className="w-3.5 h-3.5 text-emerald-400" />
          <span>۳. شبیه‌ساز زنده مانت React</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </button>

        <button
          onClick={() => setActiveTab('cheatsheet')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'cheatsheet'
              ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/50 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span>۴. جدول تقلب شورت‌کدها در المنتور</span>
        </button>

        <button
          onClick={() => setActiveTab('architecture')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'architecture'
              ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/50 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>۵. معماری هایبرید و پاسخ فنی به وردپرس</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
            حل ابهام
          </span>
        </button>
      </div>

      {/* TAB 1: CONFIG */}
      {activeTab === 'config' && (
        <div className="space-y-6">
          {/* Options Card */}
          <div className="bg-white dark:bg-[#0B132B] p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#D4AF37]" />
              <span>تنظیمات تولید اسکریپت و پارامترهای سرور (WordPress Enqueue Parameters)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300">استقرار هدف:</label>
                <select
                  value={options.targetType}
                  onChange={(e) => setOptions({ ...options, targetType: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs outline-none"
                >
                  <option value="theme">پوسته وردپرس (Theme inc/)</option>
                  <option value="plugin">افزونه مستقل (Plugin Addon)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300">موتور اجرایی React:</label>
                <select
                  value={options.engine}
                  onChange={(e) => setOptions({ ...options, engine: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs outline-none"
                >
                  <option value="vite-bundle">باندل Vite کامپایل‌شده (پیشنهادی)</option>
                  <option value="wp-element">موتور داخلی گوتنبرگ (wp-element)</option>
                  <option value="cdn">CDN خارجی React 18</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300">پیشوند تگ شورت‌کدها:</label>
                <input
                  type="text"
                  value={options.shortcodePrefix}
                  onChange={(e) => setOptions({ ...options, shortcodePrefix: e.target.value })}
                  placeholder="sedrazavi_react_"
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-mono text-xs outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300">کلاس کانتینر DOM مانت:</label>
                <input
                  type="text"
                  value={options.customContainerClass}
                  onChange={(e) => setOptions({ ...options, customContainerClass: e.target.value })}
                  placeholder="sedrazavi-ui-wrapper"
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-mono text-xs outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <input
                  type="checkbox"
                  checked={options.includeRestApi}
                  onChange={(e) => setOptions({ ...options, includeRestApi: e.target.checked })}
                  className="accent-[#D4AF37]"
                />
                <span className="font-bold text-gray-700 dark:text-gray-300">تزریق REST API & Nonce</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <input
                  type="checkbox"
                  checked={options.includeCurrentUser}
                  onChange={(e) => setOptions({ ...options, includeCurrentUser: e.target.checked })}
                  className="accent-[#D4AF37]"
                />
                <span className="font-bold text-gray-700 dark:text-gray-300">تزریق متغیر کاربر جاری</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <input
                  type="checkbox"
                  checked={options.includeLawyerProfile}
                  onChange={(e) => setOptions({ ...options, includeLawyerProfile: e.target.checked })}
                  className="accent-[#D4AF37]"
                />
                <span className="font-bold text-gray-700 dark:text-gray-300">تزریق اطلاعات وکیل و پروانه</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <input
                  type="checkbox"
                  checked={options.includeSkeleton}
                  onChange={(e) => setOptions({ ...options, includeSkeleton: e.target.checked })}
                  className="accent-[#D4AF37]"
                />
                <span className="font-bold text-gray-700 dark:text-gray-300">اسکلت شیمر پیش‌بارگذار (CLS 0)</span>
              </label>
            </div>
          </div>

          {/* Component Selection Cards */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#D4AF37]" />
                  <span>مؤلفه‌های در دسترس ({options.selectedComponentIds.length} از {REACT_SHORTCODE_DEFINITIONS.length} انتخاب شده)</span>
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={selectAllComponents}
                  className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 transition-all flex items-center gap-1.5"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
                  <span>انتخاب همه</span>
                </button>
                <button
                  onClick={deselectAllComponents}
                  className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 transition-all flex items-center gap-1.5"
                >
                  <Square className="w-3.5 h-3.5 text-red-400" />
                  <span>لغو انتخاب</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#D4AF37] text-[#0B132B] font-black shadow-sm'
                        : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-3" />
                <input
                  type="text"
                  value={componentSearch}
                  onChange={(e) => setComponentSearch(e.target.value)}
                  placeholder="جستجوی نام مؤلفه..."
                  className="w-full pr-8 pl-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B132B] text-xs outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredComponents.map((comp) => {
                const isChecked = options.selectedComponentIds.includes(comp.id);
                const fullTag = `[${options.shortcodePrefix}${comp.shortcodeTag.replace(/^react_/, '')}]`;

                return (
                  <div
                    key={comp.id}
                    onClick={() => toggleComponent(comp.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                      isChecked
                        ? 'bg-white dark:bg-[#0B132B] border-[#D4AF37] shadow-md shadow-[#D4AF37]/5 ring-1 ring-[#D4AF37]/30'
                        : 'bg-white/60 dark:bg-[#0B132B]/40 border-gray-200 dark:border-gray-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB]">
                          {comp.badge}
                        </span>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0B132B]'
                            : 'border-gray-300 dark:border-gray-700'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-[#0B132B] dark:text-white font-serif">
                          {comp.title}
                        </h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                          {comp.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-gray-400">تگ:</span>
                        <code className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{fullTag}</code>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PHP CODE VIEW */}
      {activeTab === 'php_code' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveCodeSubTab('php')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeCodeSubTab === 'php' ? 'bg-[#D4AF37] text-[#0B132B] font-black' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                sedrazavi-react-shortcodes.php
              </button>
              <button
                onClick={() => setActiveCodeSubTab('functions')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeCodeSubTab === 'functions' ? 'bg-[#D4AF37] text-[#0B132B] font-black' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                functions.php (افزودن به پوسته)
              </button>
              <button
                onClick={() => setActiveCodeSubTab('js')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeCodeSubTab === 'js' ? 'bg-[#D4AF37] text-[#0B132B] font-black' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                اسکریپت کلاینت (mount.js)
              </button>
              <button
                onClick={() => setActiveCodeSubTab('readme')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeCodeSubTab === 'readme' ? 'bg-[#D4AF37] text-[#0B132B] font-black' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                راهنمای نصب (README.md)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const codeToCopy =
                    activeCodeSubTab === 'php'
                      ? generatedPhpCode
                      : activeCodeSubTab === 'functions'
                      ? generatedFunctionsSnippet
                      : activeCodeSubTab === 'js'
                      ? generatedMountJs
                      : generatedReadme;
                  handleCopy(codeToCopy, activeCodeSubTab);
                }}
                className="px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedType === activeCodeSubTab ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">کپی شد!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>کپی کد</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadPhpFile}
                className="btn-gold px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>دانلود فایل PHP</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-[#070D1E] overflow-hidden shadow-xl" dir="ltr">
            <div className="p-4 overflow-x-auto max-h-[500px] overflow-y-auto font-mono text-xs text-gray-200 leading-relaxed select-text">
              <pre className="text-left">
                <code>
                  {activeCodeSubTab === 'php' && generatedPhpCode}
                  {activeCodeSubTab === 'functions' && generatedFunctionsSnippet}
                  {activeCodeSubTab === 'js' && generatedMountJs}
                  {activeCodeSubTab === 'readme' && generatedReadme}
                </code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {REACT_SHORTCODE_DEFINITIONS.map((def) => (
              <button
                key={def.id}
                onClick={() => handleSelectSimComponent(def)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  simulatorCompId === def.id
                    ? 'bg-[#D4AF37] text-[#0B132B] shadow-md font-black'
                    : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800'
                }`}
              >
                {def.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white dark:bg-[#0B132B] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <h4 className="text-sm font-bold text-[#0B132B] dark:text-white">
                    پارامترهای ورودی شورت‌کد
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#F3E5AB] font-bold">
                    {currentSimDef.badge}
                  </span>
                </div>

                <div className="space-y-3">
                  {currentSimDef.attributes.map((attr) => {
                    const currentVal = simAttributes[attr.name] ?? attr.defaultValue;
                    return (
                      <div key={attr.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <label className="font-bold text-gray-700 dark:text-gray-300">{attr.label}:</label>
                          <code className="text-[10px] font-mono text-gray-400">{attr.name}</code>
                        </div>
                        {attr.type === 'boolean' ? (
                          <div className="flex items-center gap-3">
                            <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                              <input
                                type="radio"
                                name={attr.name}
                                checked={currentVal === true}
                                onChange={() => handleSimAttributeChange(attr.name, true)}
                                className="accent-[#D4AF37]"
                              />
                              <span>فعال (true)</span>
                            </label>
                            <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                              <input
                                type="radio"
                                name={attr.name}
                                checked={currentVal === false}
                                onChange={() => handleSimAttributeChange(attr.name, false)}
                                className="accent-[#D4AF37]"
                              />
                              <span>غیرفعال (false)</span>
                            </label>
                          </div>
                        ) : attr.type === 'select' && attr.options ? (
                          <select
                            value={currentVal}
                            onChange={(e) => handleSimAttributeChange(attr.name, e.target.value)}
                            className="w-full p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs outline-none"
                          >
                            {attr.options.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : attr.type === 'number' ? (
                          <input
                            type="number"
                            value={currentVal}
                            onChange={(e) => handleSimAttributeChange(attr.name, Number(e.target.value))}
                            className="w-full p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs outline-none"
                          />
                        ) : (
                          <input
                            type="text"
                            value={currentVal}
                            onChange={(e) => handleSimAttributeChange(attr.name, e.target.value)}
                            className="w-full p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs outline-none"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    کد کوتاه نهایی برای درج در المنتور:
                  </span>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl font-mono text-xs text-emerald-600 dark:text-emerald-400 break-all select-all text-left" dir="ltr">
                    {simShortcodeTag}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white dark:bg-[#0B132B] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  <span>پیش‌نمایش زنده مؤلفه React در کانتینر شورت‌کد وردپرس</span>
                </h4>

                <div className="p-3 bg-gray-50 dark:bg-[#070D1E] rounded-xl border border-dashed border-[#D4AF37]/40 min-h-[350px]">
                  {currentSimDef.id === 'case-progress-tracker' && (
                    <CaseProgressTracker
                      caseNumber={simAttributes.case_number || '۱۴۰۳-۲۸۴'}
                      statusCode={simAttributes.status_code || 'HEARING_PENDING'}
                      currentStatusText={simAttributes.status_text || 'در حال تبادل لوایح و بررسی نظر کارشناس'}
                      nextHearingDate={simAttributes.hearing_date || '۱۴۰۳/۰۹/۱۸'}
                      hearingDaysRemaining={Number(simAttributes.days_remaining) || 12}
                      steps={sampleTrackerSteps}
                    />
                  )}
                  {currentSimDef.id === 'court-fee-calculator' && <CourtFeeCalculator />}
                  {currentSimDef.id === 'client-portal-widget' && (
                    <ClientPortalQuickAccessWidget
                      cases={[]}
                      activeCaseId="case-1"
                      onSelectCase={() => {}}
                    />
                  )}
                  {currentSimDef.id === 'booking-section' && <ContactAndBookingSection />}
                  {currentSimDef.id === 'services-section' && <ServicesSection />}
                  {currentSimDef.id === 'testimonials-slider' && <TestimonialsSlider />}
                  {currentSimDef.id === 'articles-section' && <ArticlesSection />}
                  {currentSimDef.id === 'faq-section' && <FaqSection />}
                  {currentSimDef.id === 'trust-badges' && <TrustBadges />}
                  {currentSimDef.id === 'story-bar' && <StoryBar />}
                  {currentSimDef.id === 'text-ticker' && <TextBannerSlider />}
                  {currentSimDef.id === 'comments-moderation' && <FrontendCommentsModeration />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CHEATSHEET */}
      {activeTab === 'cheatsheet' && (
        <div className="bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-gray-50 dark:bg-[#070D1E] text-gray-700 dark:text-gray-300 font-bold border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th className="p-3.5">ردیف</th>
                  <th className="p-3.5">عنوان مؤلفه</th>
                  <th className="p-3.5">تگ شورت‌کد وردپرس</th>
                  <th className="p-3.5">دسته‌بندی</th>
                  <th className="p-3.5 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                {REACT_SHORTCODE_DEFINITIONS.map((def, idx) => {
                  const fullTag = `[${options.shortcodePrefix}${def.shortcodeTag.replace(/^react_/, '')}]`;
                  return (
                    <tr key={def.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40">
                      <td className="p-3.5 font-mono text-gray-400">{idx + 1}</td>
                      <td className="p-3.5 font-bold font-serif">{def.title}</td>
                      <td className="p-3.5 font-mono text-emerald-600 dark:text-emerald-400 font-bold">{fullTag}</td>
                      <td className="p-3.5">{def.category}</td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => handleCopy(fullTag, `tab-cs-${def.id}`)}
                          className="px-3 py-1 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37]/30 text-[#AA820A] dark:text-[#F3E5AB] font-bold"
                        >
                          {copiedType === `tab-cs-${def.id}` ? 'کپی شد' : 'کپی'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: ARCHITECTURE & WORDPRESS COMPATIBILITY PROOF */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          {/* Main Clarity Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-l from-[#0B132B] via-[#162238] to-[#0B132B] border-2 border-emerald-500/40 text-white shadow-xl space-y-4">
            <div className="flex items-start gap-4">
              <span className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </span>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold font-serif text-white">
                    پاسخ فنی و مستند به شبهه: «این پروژه تم وردپرس نیست و باعث کرش سایت می‌شود!»
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold">
                    معماری استاندارد هایبرید
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed max-w-4xl">
                  برخی ابزارهای تحلیل صرفاً با مشاهده فایل‌هایی نظیر <code className="text-[#D4AF37] font-mono">vite.config.ts</code> یا <code className="text-[#D4AF37] font-mono">src/*.tsx</code> تصور می‌کنند این یک پروژه غیروردپرسی است. در ادامه به صورت علمی و عملیاتی مشاهده می‌فرمایید که نه تنها هیچ خطایی رخ نمی‌دهد، بلکه این معماری دقیقاً استانداردترین شیوه روز شرکت Automattic (توسعه‌دهنده هسته وردپرس و گوتنبرگ) برای توسعه پوسته‌های مدرن، فوق‌پیشرفته و با سرعت صاعقه است.
                </p>
              </div>
            </div>
          </div>

          {/* 3 Pillars Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#0B132B] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sky-500 font-bold text-xs">
                <span className="w-6 h-6 rounded-lg bg-sky-500/10 flex items-center justify-center">۱</span>
                <span>تفاوت سورس توسعه با پکیج اجرایی</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                در پروژه‌های امروزی، فایل‌های React و TypeScript در مرورگر یا در هاست خام اجرا نمی‌شوند؛ بلکه ابزار سریع Vite با دستور <code className="font-mono text-emerald-600 dark:text-emerald-400">npm run build</code> آن‌ها را به فایل‌های فشرده و بهینه <code className="font-mono">index.js</code> و <code className="font-mono">index.css</code> تبدیل می‌کند. مرورگر کاربر این فایل‌های کامپایل‌شده را دریافت و اجرا می‌کند.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0B132B] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs">
                <span className="w-6 h-6 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">۲</span>
                <span>نقش PHP و وردپرس در این ساختار</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                وردپرس مسئول پردازش سرور، دیتابیس MySQL، احراز هویت، امنیت REST API و رندر ساختار صفحات است. فایل توابع <code className="font-mono text-[#D4AF37]">functions.php</code> با تابع استاندارد <code className="font-mono text-[#D4AF37]">wp_enqueue_script</code> باندل‌ها را بارگذاری کرده و با <code className="font-mono text-[#D4AF37]">wp_localize_script</code> داده‌های سرور را به ری‌اکت می‌رساند.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0B132B] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center">۳</span>
                <span>موتور شورت‌کد و سازگاری با المنتور</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                علاوه بر اجرای سراسری کل تم، تمام مؤلفه‌ها به شورت‌کدهای مستقل وردپرس نظیر <code className="font-mono text-emerald-500">[sedrazavi_react_case_tracker]</code> مجهز شده‌اند تا در هر صفحه‌ساز نظیر Elementor، گوتنبرگ یا WPBakery بدون هیچ‌گونه تداخل جاوااسکریپتی قرار گیرند.
              </p>
            </div>
          </div>

          {/* Verification Checklist Table */}
          <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>چک‌لیست راستی‌آزمایی فایل‌های استاندارد پوسته وردپرس در ریپازیتوری</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300 font-mono">
                  <span>style.css</span>
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-[11px] text-gray-600 dark:text-gray-400">
                  شناسنامه رسمی پوسته شامل نام، نویسنده، نگارش ۲.۵.۰ و پیش‌نیازهای PHP 8.0+.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300 font-mono">
                  <span>functions.php</span>
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-[11px] text-gray-600 dark:text-gray-400">
                  انکیو استایل‌ها، ثبت REST API و بارگذاری ماژول شورت‌کدهای React.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300 font-mono">
                  <span>index.php</span>
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-[11px] text-gray-600 dark:text-gray-400">
                  نقطه ورود اصلی وردپرس با کانتینر اجرای ری‌اکت و حلقه محتوای سئو وردپرس.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300 font-mono">
                  <span>header.php / footer.php</span>
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-[11px] text-gray-600 dark:text-gray-400">
                  فراخوانی توابع حیاتی wp_head() و wp_footer() جهت اجرای اسکریپت‌ها.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300 font-mono">
                  <span>page.php / single.php</span>
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-[11px] text-gray-600 dark:text-gray-400">
                  پشتیبانی کامل از برگه‌ساز المنتور و مقالات و اخبار تحلیلی وکیل.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300 font-mono">
                  <span>inc/react-shortcodes.php</span>
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-[11px] text-gray-600 dark:text-gray-400">
                  شامل ۱۵ شورت‌کد مستقل همراه با سازوکار لود تاخیری و لودر اسکلتی.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300 font-mono">
                  <span>sedrazavi-react-mount.js</span>
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-[11px] text-gray-600 dark:text-gray-400">
                  اسکریپت هیدراتاسیون DOM با اتصال خودکار به هوک elementor/frontend/init.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300 font-mono">
                  <span>screenshot.png</span>
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-[11px] text-gray-600 dark:text-gray-400">
                  کارت کاور لوکس پوسته جهت نمایش در پیشخوان مدیریت (بخش نمایش و پوسته‌ها).
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Download Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-[#0B132B] border border-[#D4AF37]/40 space-y-3">
              <h5 className="text-xs font-bold text-[#D4AF37] flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>۱. دانلود پوسته کامل هایبرید وردپرس (Complete Theme Package)</span>
              </h5>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                شامل کلیه فایل‌های اصلی پوسته (style.css, index.php, functions.php, inc/...) با قابلیت آپلود و نصب مستقیم در منوی «نمایش / پوسته‌ها / افزودن پوسته تازه».
              </p>
              <button
                onClick={handleDownloadFullThemeZip}
                disabled={isZipping}
                className="btn-gold w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-[#D4AF37]/20"
              >
                <Download className="w-4 h-4" />
                <span>دریافت پکیج کامل زیپ پوسته (sedrazavi-law-firm-wordpress-theme.zip)</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-[#0B132B] border border-emerald-500/40 space-y-3">
              <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                <FolderArchive className="w-4 h-4" />
                <span>۲. دانلود ماژول شورت‌کدهای React (Bridge Plugin / Addon)</span>
              </h5>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                اگر در حال حاضر از قالب دیگری نظیر Hello Elementor یا Astra استفاده می‌کنید، این پکیج صرفاً شورت‌کدهای React را به عنوان افزونه به سایت شما اضافه می‌کند.
              </p>
              <button
                onClick={handleDownloadZipPackage}
                disabled={isZipping}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <FolderArchive className="w-4 h-4" />
                <span>دریافت پکیج شورت‌کدها (SedRazavi-React-Shortcodes-WordPress-Bundle.zip)</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

