import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Sliders,
  CheckCircle2,
  Code2,
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  Check,
  Eye,
  Settings,
  FileCode,
  Share2,
  MessageSquare,
  User,
  Navigation,
  Compass,
  Tag,
  Image,
  Video,
  Database,
  Cpu,
  RefreshCw,
  Sun,
  Moon,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface ElementorWidgetDef {
  id: string;
  name: string;
  title: string;
  icon: string;
  category: string;
  description: string;
  controls: {
    name: string;
    label: string;
    type: 'text' | 'select' | 'switcher' | 'color';
    defaultVal: any;
    options?: string[];
  }[];
}

export const FullElementorIntegrationSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'fallback_hierarchy' | 'custom_widgets' | 'theme_builder_header_footer' | 'schema_cache' | 'acf_taxonomies_media'
  >('fallback_hierarchy');

  // Fallback Hierarchy state
  const [activeFallbackLevel, setActiveFallbackLevel] = useState<'level1' | 'level2' | 'level3'>('level1');
  const [selectedPostType, setSelectedPostType] = useState<'post' | 'service' | 'video' | 'case' | 'page'>('post');

  // Preview Device State
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // 8 Custom Widgets from Part 20.2
  const [customWidgets] = useState<ElementorWidgetDef[]>([
    {
      id: 'sedrazavi_comments',
      name: 'sedrazavi_comments',
      title: 'کامنت‌های اختصاصی وکلایی',
      icon: 'MessageSquare',
      category: 'SedRazavi Widgets',
      description: 'سامانه نظرات تخصصی با استایل طلایی و سرمه‌ای، تفکیک پاسخ وکیل و تاییدیه‌های حقوقی',
      controls: [
        { name: 'show_avatar', label: 'نمایش آواتار کاربران', type: 'switcher', defaultVal: true },
        { name: 'comments_per_page', label: 'تعداد در هر صفحه', type: 'select', defaultVal: '10', options: ['5', '10', '20'] },
        { name: 'accent_color', label: 'رنگ آکسان حاشیه', type: 'color', defaultVal: '#D4AF37' }
      ]
    },
    {
      id: 'sedrazavi_related_posts',
      name: 'sedrazavi_related_posts',
      title: 'پست‌ها و پرونده‌های مرتبط',
      icon: 'Layers',
      category: 'SedRazavi Widgets',
      description: 'فیلتر هوشمند مقالات مشابه بر پایه دسته‌بندی، تگ‌ها یا موضوعات هم‌پوشان دیوان و ملکی',
      controls: [
        { name: 'posts_count', label: 'تعداد پست‌های مشابه', type: 'select', defaultVal: '3', options: ['2', '3', '4', '6'] },
        { name: 'show_thumb', label: 'نمایش تصویر شاخص', type: 'switcher', defaultVal: true },
        { name: 'match_criteria', label: 'مبنای شباهت', type: 'select', defaultVal: 'دسته‌بندی و برچسب', options: ['دسته‌بندی و برچسب', 'نویسنده وکیل', 'موضوع دادگاه'] }
      ]
    },
    {
      id: 'sedrazavi_post_navigation',
      name: 'sedrazavi_post_navigation',
      title: 'ناوبری مطلب قبلی و بعدی',
      icon: 'Navigation',
      category: 'SedRazavi Widgets',
      description: 'لینک ورق‌زدن و مرور ترتیبی مقالات و مستندات قانونی همراه با پیش‌نمایش تصویر و عنوان',
      controls: [
        { name: 'show_arrows', label: 'نمایش آیکون فلش شیک', type: 'switcher', defaultVal: true },
        { name: 'prev_text', label: 'متن پیوند قبلی', type: 'text', defaultVal: 'مطلب پیشین حقوقی' },
        { name: 'next_text', label: 'متن پیوند بعدی', type: 'text', defaultVal: 'مطلب بعدی حقوقی' }
      ]
    },
    {
      id: 'sedrazavi_author_box',
      name: 'sedrazavi_author_box',
      title: 'باکس بیوگرافی وکیل نویسنده',
      icon: 'User',
      category: 'SedRazavi Widgets',
      description: 'کارت معرفی جامع وکیل با شماره پروانه، رتبه علمی، سال‌های سابقه و شبکه‌های اجتماعی',
      controls: [
        { name: 'show_license', label: 'نمایش شماره پروانه وکالت', type: 'switcher', defaultVal: true },
        { name: 'show_socials', label: 'نمایش لینک‌های ایتا و تلگرام', type: 'switcher', defaultVal: true },
        { name: 'layout_style', label: 'طرح‌بندی کارت', type: 'select', defaultVal: 'کلاسیک با حاشیه طلایی', options: ['کلاسیک با حاشیه طلایی', 'مدرن مینیمال'] }
      ]
    },
    {
      id: 'sedrazavi_share_buttons',
      name: 'sedrazavi_share_buttons',
      title: 'دکمه‌های اشتراک‌گذاری قانونی',
      icon: 'Share2',
      category: 'SedRazavi Widgets',
      description: 'دکمه‌های مستقیم اشتراک در تلگرام، ایتا، بله، لینکدین و کپی پیوند امن مقاله',
      controls: [
        { name: 'enable_eitaa', label: 'اشتراک‌گذاری در پیام‌رسان ایتا', type: 'switcher', defaultVal: true },
        { name: 'enable_bale', label: 'اشتراک‌گذاری در پیام‌رسان بله', type: 'switcher', defaultVal: true },
        { name: 'enable_copy', label: 'دکمه کپی فوری پیوند کوتاه', type: 'switcher', defaultVal: true }
      ]
    },
    {
      id: 'sedrazavi_breadcrumbs',
      name: 'sedrazavi_breadcrumbs',
      title: 'شکسته‌نما (Breadcrumbs) با اسکیما',
      icon: 'Compass',
      category: 'SedRazavi Widgets',
      description: 'مسیر سلسله‌مراتبی ناوبری با تولید اتوماتیک کدهای ساختاریافته BreadcrumbList در گوگل',
      controls: [
        { name: 'separator_char', label: 'نویسه جداکننده', type: 'select', defaultVal: '»', options: ['»', '›', '/'] },
        { name: 'show_home_icon', label: 'نمایش آیکون خانه', type: 'switcher', defaultVal: true }
      ]
    },
    {
      id: 'sedrazavi_post_meta',
      name: 'sedrazavi_post_meta',
      title: 'متادیتای کامل پست وکیل',
      icon: 'FileCode',
      category: 'SedRazavi Widgets',
      description: 'نمایش تاریخ هجری شمسی، زمان تقریبی مطالعه، دسته‌بندی تخصصی، تعداد بازدید و دیدگاه‌ها',
      controls: [
        { name: 'show_reading_time', label: 'نمایش زمان تخمینی مطالعه', type: 'switcher', defaultVal: true },
        { name: 'date_format', label: 'فرمت تاریخ شمسی', type: 'select', defaultVal: '۱۴۰۳/۰۶/۲۱', options: ['۱۴۰۳/۰۶/۲۱', '۲۱ شهریور ۱۴۰۳'] }
      ]
    },
    {
      id: 'sedrazavi_post_content',
      name: 'sedrazavi_post_content',
      title: 'محتوای اصلی پست با تایپوگرافی ویژه',
      icon: 'Code2',
      category: 'SedRazavi Widgets',
      description: 'رندر محتوای ویرایشگر با استایل‌های اختصاصی، فاصله‌گذاری دقیق و استناد به مواد قانونی',
      controls: [
        { name: 'enable_dropcap', label: 'حرف اول بزرگ (DropCap)', type: 'switcher', defaultVal: false },
        { name: 'highlight_legal_codes', label: 'برجسته‌سازی خودکار مواد قانونی', type: 'switcher', defaultVal: true }
      ]
    }
  ]);

  const [selectedWidget, setSelectedWidget] = useState<ElementorWidgetDef>(customWidgets[0]);
  const [widgetOptions, setWidgetOptions] = useState<Record<string, any>>({
    show_avatar: true,
    comments_per_page: '10',
    accent_color: '#D4AF37'
  });
  const [copiedCode, setCopiedCode] = useState(false);

  // Schema Integration Mock Data
  const [selectedSchemaType, setSelectedSchemaType] = useState<'article' | 'video' | 'breadcrumb' | 'comment'>('article');

  const articleSchemaCode = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: 'دفتر وکالت سید امیر حسین رضوی',
      headline: 'راهنمای گام‌به‌گام پیگیری چک صیادی در دادگاه حقوقی',
      author: {
        '@type': 'Person',
        name: 'سید امیر حسین رضوی فردویی',
        jobTitle: 'وکیل پایه یک دادگستری'
      },
      datePublished: '2024-09-20T10:00:00+03:30',
      dateModified: '2024-09-21T12:00:00+03:30'
    },
    null,
    2
  );

  const videoSchemaCode = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'نکات کلیدی دفاع در کمیسیون ماده ۱۰۰ شهرداری',
      description: 'تحلیل تخصصی آرای وحدت رویه دیوان عدالت اداری در دعاوی تخلفات ساختمانی',
      thumbnailUrl: 'https://sedrazavi.com/uploads/video-thumb.jpg',
      uploadDate: '2024-09-21T08:30:00+03:30',
      duration: 'PT24M15S'
    },
    null,
    2
  );

  const handleCopyPhpTag = () => {
    const code = `<?php
// SedRazavi Elementor Integration Hook
if ( function_exists( 'elementor_theme_do_location' ) ) {
    elementor_theme_do_location( 'single' );
} else {
    get_template_part( 'template-parts/content', '${selectedPostType}' );
}
?>`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="py-8 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-right" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] text-[#0B132B] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20 font-bold">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B132B] dark:text-white">
                    یکپارچگی کامل با المنتور (فاز ۲۰ - Full Elementor Suite)
                  </h1>
                  <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] text-xs font-bold">
                    Theme Builder Pro &amp; Native
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  پشتیبانی از سلسله‌مراتب ۳ سطحی جایگزینی (Fallback)، ۸ ویجت اختصاصی حقوقی، ساخت هدر/فوتر داینامیک و تگ‌های ACF
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-bold hover:bg-gray-50 transition-colors"
              >
                پیشخوان وکیل
              </button>
            )}
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-4 py-2.5 rounded-xl bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] text-xs font-bold shadow-md hover:bg-[#1C2541] transition-colors"
              >
                بازگشت به سایت
              </button>
            )}
          </div>
        </div>

        {/* 5 Sub-Tabs corresponding to Part 20.1 to 20.5 */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveSubTab('fallback_hierarchy')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'fallback_hierarchy'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>سلسله‌مراتب جایگزینی ۳ سطحی (۲۰.۱)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('custom_widgets')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'custom_widgets'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>۸ ویجت اختصاصی حقوقی (۲۰.۲)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('theme_builder_header_footer')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'theme_builder_header_footer'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>هدر، فوتر و سایدبار Theme Builder (۲۰.۳)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('schema_cache')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'schema_cache'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>یکپارچگی Schema و سازگاری کش (۲۰.۴)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('acf_taxonomies_media')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'acf_taxonomies_media'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>تگ‌های داینامیک ACF و رسانه (۲۰.۵)</span>
          </button>
        </div>

        {/* SUBTAB 1: Fallback Hierarchy (20.1) */}
        {activeSubTab === 'fallback_hierarchy' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif">
                    سلسله‌مراتب هوشمند ۳ سطحی رندر قالب تک‌مطلب (Single Post Hierarchy)
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    عدم نمایش نادرست قالب‌های سیستمی در منوی فرانت‌اند و مگامنو؛ سیستم به ترتیب اولویت قالب را لود می‌کند.
                  </p>
                </div>
                <button
                  onClick={handleCopyPhpTag}
                  className="px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37]/15 text-gray-700 dark:text-gray-200 hover:text-[#D4AF37] text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>کپی کد هوک تمپلت</span>
                </button>
              </div>

              {/* 3 Hierarchy Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  onClick={() => setActiveFallbackLevel('level1')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    activeFallbackLevel === 'level1'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">سطح ۱: Elementor Pro</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-white text-[10px] font-bold">اولویت اول</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                    در صورت فعال بودن المنتور پرو، تمپلت طراحی‌شده در Theme Builder با شرایط شرطی (Include/Exclude) رندر می‌شود.
                  </p>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
                    elementor_theme_do_location('single')
                  </span>
                </div>

                <div
                  onClick={() => setActiveFallbackLevel('level2')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    activeFallbackLevel === 'level2'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">سطح ۲: Elementor Free</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-bold">اولویت دوم</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                    در نبود نسخه پرو، از تمپلت‌های المان‌های رایگان المنتور با رندر کانتینرهای فلکس‌باکس استفاده می‌شود.
                  </p>
                  <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-bold block">
                    do_shortcode('[elementor-template id="..."]')
                  </span>
                </div>

                <div
                  onClick={() => setActiveFallbackLevel('level3')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    activeFallbackLevel === 'level3'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">سطح ۳: PHP Native Fallback</span>
                    <span className="px-2 py-0.5 rounded-full bg-gray-500 text-white text-[10px] font-bold">پشتیبان امن</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                    حتی اگر المنتور کاملاً غیرفعال شود، قالب به فایل‌های استاندارد PHP قالب بدون هیچ‌گونه خرابی سوئیچ می‌کند.
                  </p>
                  <span className="text-[11px] font-mono text-gray-600 dark:text-gray-300 font-bold block">
                    get_template_part('single')
                  </span>
                </div>
              </div>

              {/* Post Types Supported */}
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 space-y-3">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  پشتیبانی اختصاصی از ۵ نوع محتوا (Post Types Support):
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
                  <button
                    onClick={() => setSelectedPostType('post')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedPostType === 'post'
                        ? 'border-[#D4AF37] bg-white dark:bg-[#0B132B] font-bold text-[#D4AF37]'
                        : 'border-gray-200 dark:border-gray-800 text-gray-500'
                    }`}
                  >
                    <span>مقالات وبلاگ</span>
                    <span className="block font-mono text-[10px] mt-1 text-gray-400">single.php</span>
                  </button>

                  <button
                    onClick={() => setSelectedPostType('service')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedPostType === 'service'
                        ? 'border-[#D4AF37] bg-white dark:bg-[#0B132B] font-bold text-[#D4AF37]'
                        : 'border-gray-200 dark:border-gray-800 text-gray-500'
                    }`}
                  >
                    <span>خدمات حقوقی</span>
                    <span className="block font-mono text-[10px] mt-1 text-gray-400">single-service.php</span>
                  </button>

                  <button
                    onClick={() => setSelectedPostType('video')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedPostType === 'video'
                        ? 'border-[#D4AF37] bg-white dark:bg-[#0B132B] font-bold text-[#D4AF37]'
                        : 'border-gray-200 dark:border-gray-800 text-gray-500'
                    }`}
                  >
                    <span>کارگاه‌های ویدئویی</span>
                    <span className="block font-mono text-[10px] mt-1 text-gray-400">single-video.php</span>
                  </button>

                  <button
                    onClick={() => setSelectedPostType('case')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedPostType === 'case'
                        ? 'border-[#D4AF37] bg-white dark:bg-[#0B132B] font-bold text-[#D4AF37]'
                        : 'border-gray-200 dark:border-gray-800 text-gray-500'
                    }`}
                  >
                    <span>پرونده‌های موفق</span>
                    <span className="block font-mono text-[10px] mt-1 text-gray-400">single-case.php</span>
                  </button>

                  <button
                    onClick={() => setSelectedPostType('page')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedPostType === 'page'
                        ? 'border-[#D4AF37] bg-white dark:bg-[#0B132B] font-bold text-[#D4AF37]'
                        : 'border-gray-200 dark:border-gray-800 text-gray-500'
                    }`}
                  >
                    <span>برگه‌های استاندارد</span>
                    <span className="block font-mono text-[10px] mt-1 text-gray-400">page.php</span>
                  </button>
                </div>
              </div>

              {/* Critical Rule Notification */}
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="leading-relaxed">
                  <strong>قانون طلایی پارت ۲۰:</strong> تمپلت‌های تک‌مطلب هرگز در لیست «برگه‌های وردپرس» ذخیره نمی‌شوند و به صورت خودکار از خروجی منوها، مگامنو، نقشه سایت Sitemap و جستجوی آژاکس حذف می‌گردند (noindex, nofollow).
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: 8 Custom Elementor Widgets (20.2) */}
        {activeSubTab === 'custom_widgets' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* List of 8 Widgets (5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white font-serif mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>دسته اختصاصی SedRazavi Widgets (۸ ویجت):</span>
              </h3>

              {customWidgets.map((w) => (
                <div
                  key={w.id}
                  onClick={() => {
                    setSelectedWidget(w);
                    const initial: Record<string, any> = {};
                    w.controls.forEach((c) => (initial[c.name] = c.defaultVal));
                    setWidgetOptions(initial);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedWidget.id === w.id
                      ? 'bg-white dark:bg-[#0B132B] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10 ring-2 ring-[#D4AF37]/20'
                      : 'bg-white/80 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-[#D4AF37] font-bold">{w.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">
                      {w.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1 font-serif">
                    {w.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {w.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Widget Interactive Controls & Preview (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#D4AF37]" />
                    <span>کنترل‌های زنده المنتور: {selectedWidget.title}</span>
                  </h3>
                  <span className="text-xs font-mono text-gray-400">{selectedWidget.name}.php</span>
                </div>

                {/* Dynamic Controls Form */}
                <div className="space-y-4 text-xs">
                  {selectedWidget.controls.map((control) => (
                    <div
                      key={control.name}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800"
                    >
                      <div>
                        <span className="font-bold text-gray-800 dark:text-gray-200 block">{control.label}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{control.name}</span>
                      </div>

                      {control.type === 'switcher' && (
                        <input
                          type="checkbox"
                          checked={widgetOptions[control.name] || false}
                          onChange={(e) =>
                            setWidgetOptions({ ...widgetOptions, [control.name]: e.target.checked })
                          }
                          className="rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                      )}

                      {control.type === 'select' && (
                        <select
                          value={widgetOptions[control.name] || control.defaultVal}
                          onChange={(e) =>
                            setWidgetOptions({ ...widgetOptions, [control.name]: e.target.value })
                          }
                          className="py-1.5 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0B132B] text-xs"
                        >
                          {control.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}

                      {control.type === 'text' && (
                        <input
                          type="text"
                          value={widgetOptions[control.name] || ''}
                          onChange={(e) =>
                            setWidgetOptions({ ...widgetOptions, [control.name]: e.target.value })
                          }
                          className="py-1 px-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0B132B] text-xs"
                        />
                      )}

                      {control.type === 'color' && (
                        <input
                          type="color"
                          value={widgetOptions[control.name] || control.defaultVal}
                          onChange={(e) =>
                            setWidgetOptions({ ...widgetOptions, [control.name]: e.target.value })
                          }
                          className="w-8 h-8 rounded border-0 cursor-pointer"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Live Widget Render Sandbox */}
                <div className="p-5 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 pb-2 border-b border-gray-200 dark:border-gray-800">
                    <span className="font-bold">پیش‌نمایش بصری ویجت در صفحه تک‌مطلب:</span>
                    <span className="text-[10px] text-emerald-500 font-bold">Elementor Canvas Ready</span>
                  </div>

                  {/* Render Mock based on widget */}
                  {selectedWidget.id === 'sedrazavi_author_box' && (
                    <div className="p-4 rounded-xl bg-white dark:bg-[#0B132B] border border-[#D4AF37]/40 flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#AA820A] text-[#0B132B] font-bold flex items-center justify-center text-sm font-serif">
                        سر
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 dark:text-white font-serif">
                            سید امیر حسین رضوی فردویی
                          </span>
                          <span className="text-[10px] text-[#D4AF37] font-bold font-mono">
                            پروانه ۱۲۳۴۵
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          وکیل پایه یک دادگستری با بیش از ۲۰ سال سابقه درخشان در دعاوی دیوان عدالت اداری، بورس و شرکت‌ها
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedWidget.id === 'sedrazavi_comments' && (
                    <div className="p-4 rounded-xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 dark:text-white">نظرات و پرسش‌های حقوقی (۲ دیدگاه)</span>
                        <span className="text-[10px] text-[#D4AF37]">پاسخ مستقیم توسط وکیل</span>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 text-[11px]">
                        <span className="font-bold block text-gray-800 dark:text-gray-200">مهندس کاظمی:</span>
                        <span className="text-gray-500 dark:text-gray-400">آیا امکان ابطال اجراییه ثبتی چک صیادی قدیمی وجود دارد؟</span>
                      </div>
                    </div>
                  )}

                  {selectedWidget.id === 'sedrazavi_share_buttons' && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 text-xs">
                      <span className="font-bold text-gray-500 ml-2">اشتراک‌گذاری مطلب:</span>
                      <span className="px-3 py-1 rounded-lg bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] font-bold">
                        ایتا
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-500 font-bold">
                        بله
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-sky-500/10 text-sky-500 font-bold">
                        تلگرام
                      </span>
                      <button
                        onClick={() => alert('پیوند کوتاه کپی شد')}
                        className="px-2.5 py-1 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                      >
                        کپی لینک
                      </button>
                    </div>
                  )}

                  {!['sedrazavi_author_box', 'sedrazavi_comments', 'sedrazavi_share_buttons'].includes(selectedWidget.id) && (
                    <div className="p-4 rounded-xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 text-xs text-center text-gray-500 py-6">
                      <FileCode className="w-8 h-8 mx-auto text-[#D4AF37] mb-2" />
                      <span>کامپوننت ویجت {selectedWidget.title} در حالت آماده به رندر قرار دارد.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: Theme Builder Header, Footer & Sidebar (20.3) */}
        {activeSubTab === 'theme_builder_header_footer' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif">
                    طراحی هدر، فوتر و سایدبار اختصاصی در Elementor Theme Builder
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    پشتیبانی از هدر چسبنده (Sticky Header)، سوئیچر حالت شب، فوتر ۴ ستونه و موقعیت‌های داینامیک سایدبار
                  </p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">
                  Theme Locations Registered
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Header Location */}
                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">هدر سایت (Header Location)</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-bold">
                      Sticky Ready
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    شامل لوگو طلایی، مگامنو ۶ دپارتمانی، جستجوی آژاکس، دکمه رزرو فوری و سوئیچ تم شب با افکت بلور پس‌زمینه هنگام اسکرول.
                  </p>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-800 text-[11px] text-gray-400 font-mono">
                    شرایط: Entire Site (Exclude Admin Pages)
                  </div>
                </div>

                {/* Footer Location */}
                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">فوتر سایت (Footer Location)</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold">
                      ۴ ستونه
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    ویجت‌های معرفی وکیل، دسترسی به مقالات اخیر، فرم مشاوره سریع، نماد اعتماد الکترونیک و حقوق کپی‌رایت شرکتی.
                  </p>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-800 text-[11px] text-gray-400 font-mono">
                    شرایط: Entire Site (Exclude Admin Pages)
                  </div>
                </div>

                {/* Sidebar Location */}
                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">سایدبار وبلاگ (Sidebar Location)</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                      ابزارک‌ها
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    ویجت دانلود فرم‌های دادخواست، محاسبه‌گر خسارت تاخیر تادیه، کارت تماس فوری با دفتر و آرشیو موضوعی پرونده‌ها.
                  </p>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-800 text-[11px] text-gray-400 font-mono">
                    شرایط: Single Post, Single Service, Archive
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: Schema Integration & Cache Compatibility (20.4) */}
        {activeSubTab === 'schema_cache' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif">
                    تولید خودکار کدهای ساختاریافته Schema و سازگاری با سیستم‌های کشینگ
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    انطباق با Google Rich Snippets و پاک‌سازی اتوماتیک کش WP Rocket, LiteSpeed و کش کانتینرهای المنتور
                  </p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 font-bold">
                  JSON-LD Ready
                </span>
              </div>

              {/* Schema Generator Selector */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedSchemaType('article')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                      selectedSchemaType === 'article'
                        ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B]'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    Article &amp; LegalService Schema
                  </button>
                  <button
                    onClick={() => setSelectedSchemaType('video')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                      selectedSchemaType === 'video'
                        ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B]'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    VideoObject Schema
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-gray-900 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed border border-gray-800" dir="ltr">
                  <pre>{selectedSchemaType === 'article' ? articleSchemaCode : videoSchemaCode}</pre>
                </div>
              </div>

              {/* Cache Compatibility Grid */}
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 space-y-3">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  هماهنگی و پاک‌سازی اتوماتیک با ۳ افزونه محبوب کشینگ:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800">
                    <span className="font-bold text-indigo-500 block mb-1">WP Rocket Cache</span>
                    <span className="text-gray-500 text-[11px]">اجرای rocket_clean_post هنگام انتشار مقالات</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800">
                    <span className="font-bold text-emerald-500 block mb-1">LiteSpeed Web Cache</span>
                    <span className="text-gray-500 text-[11px]">ارسال دستور litespeed_purge_post به وب‌سرور</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800">
                    <span className="font-bold text-[#D4AF37] block mb-1">Elementor CSS Cache</span>
                    <span className="text-gray-500 text-[11px]">پاک‌سازی کدهای تولیدی files_manager المنتور</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 5: ACF Dynamic Tags & Media (20.5) */}
        {activeSubTab === 'acf_taxonomies_media' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif">
                    تگ‌های داینامیک ACF (Advanced Custom Fields) و مدیا
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    اتصال مستقیم فیلدهای متادیتای سفارشی وکیل به ویجت‌های المنتور بدون نیاز به کدنویسی
                  </p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] font-bold">
                  ACF Dynamic Tags Ready
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 space-y-2">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">فیلدهای سفارشی متصل‌شده:</h4>
                  <ul className="space-y-1.5 text-gray-500 font-mono text-[11px]">
                    <li>• lawyer_license_number (متن - شماره پروانه)</li>
                    <li>• case_verdict_result (متن - نتیجه دادنامه)</li>
                    <li>• consultation_fee_hourly (عدد - حق‌الوکاله ساعتی)</li>
                    <li>• court_branch_jurisdiction (انتخابی - مرجع قضایی)</li>
                    <li>• legal_attached_docs (فایل ضمیمه PDF)</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 space-y-2">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">پیش‌نمایش در ابعاد مختلف (Preview):</h4>
                  <p className="text-gray-500 leading-relaxed text-[11px]">
                    تست و اعتبارسنجی رندر بدون شکستگی در ابعاد دسکتاپ (۱۴۴۰px)، تبلت (۷۶۸px) و موبایل (۳۷۵px) با قابلیت شبیه‌سازی لمسی.
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-2 rounded-lg ${previewDevice === 'desktop' ? 'bg-[#D4AF37] text-white' : 'bg-gray-200 dark:bg-gray-800'}`}
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewDevice('tablet')}
                      className={`p-2 rounded-lg ${previewDevice === 'tablet' ? 'bg-[#D4AF37] text-white' : 'bg-gray-200 dark:bg-gray-800'}`}
                    >
                      <Tablet className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-2 rounded-lg ${previewDevice === 'mobile' ? 'bg-[#D4AF37] text-white' : 'bg-gray-200 dark:bg-gray-800'}`}
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
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
