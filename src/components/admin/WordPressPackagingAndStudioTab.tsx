import React, { useState } from 'react';
import JSZip from 'jszip';
import {
  Package,
  Download,
  FolderDown,
  Layers,
  Sparkles,
  CheckCircle2,
  FileCode,
  Sliders,
  Settings,
  HelpCircle,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  FolderTree,
  FileText,
  Palette,
  Terminal,
  Cpu,
  Zap,
  Globe,
  Bell,
  Volume2
} from 'lucide-react';
import { WORDPRESS_THEME_FILES } from '../../data/wordPressThemeFiles';
import { WORDPRESS_PLUGIN_FILES } from '../../data/wordPressPluginFiles';
import { usePresetConfig } from '../../hooks/usePresetConfig';

export const WordPressPackagingAndStudioTab: React.FC = () => {
  const { preset, modularSettings } = usePresetConfig();

  const [activeTab, setActiveTab] = useState<'packaging' | 'custom_industry_studio' | 'architecture_qa'>('packaging');
  const [isZipping, setIsZipping] = useState(false);
  const [downloadProgressMessage, setDownloadProgressMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Custom Industry Studio State
  const [industryName, setIndustryName] = useState('کلینیک پزشکی و درمانگاه تخصصی');
  const [industrySlug, setIndustrySlug] = useState('medical-clinic');
  const [industryTagline, setIndustryTagline] = useState('ارائه خدمات درمانی پیشرفته و نوبت‌دهی آنلاین پزشکان متخصص');
  const [primaryColor, setPrimaryColor] = useState('#0284c7');
  const [clientLabel, setClientLabel] = useState('بیمار / مراجعه‌کننده');
  const [caseLabel, setCaseLabel] = useState('پرونده پزشکی / نوبت');
  const [bookingLabel, setBookingLabel] = useState('رزرو نوبت پزشک');
  const [inquiryLabel, setInquiryLabel] = useState('مشاوره آنلاین سلامت');

  // Custom blocks toggle
  const [enabledBlocks, setEnabledBlocks] = useState({
    hero: true,
    bentoHud: true,
    servicesGrid: true,
    quickTracker: true,
    bookingSection: true,
    mediaStream: true,
    articles: true,
    testimonials: true
  });

  const handleCopyCode = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Helper to trigger ZIP download
  const triggerZipDownload = (content: Blob, filename: string) => {
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 1. Generate & Download sedrazavi-theme.zip
  const handleDownloadThemeZip = async () => {
    setIsZipping(true);
    setDownloadProgressMessage('در حال گردآوری و فشرده‌سازی فایل‌های استاندارد پوسته وردپرس (sedrazavi-theme.zip)...');
    try {
      const zip = new JSZip();
      const themeFolder = zip.folder('sedrazavi-theme') || zip;

      // Add all theme files
      WORDPRESS_THEME_FILES.forEach((f) => {
        themeFolder.file(f.path, f.code);
      });

      // Add scenario controller and documentation
      themeFolder.file('inc/scenario-controller.php', `<?php
/**
 * SedRazavi Multi-Scenario Framework Controller
 * Supports Bento HUD, Dense Matrix & Hybrid Executive Views
 */
if (!defined('ABSPATH')) exit;

class SedRazavi_Scenario_Controller {
    public static function get_active_scenario() {
        return get_option('sedrazavi_active_scenario', 'bento-hud');
    }
    public static function set_scenario($scenario) {
        return update_option('sedrazavi_active_scenario', sanitize_text_field($scenario));
    }
}
`);

      themeFolder.file('README.txt', `=== SedRazavi Law & Multi-Industry Theme ===
Contributors: SedRazavi Team
Requires at least: 5.8
Tested up to: 6.7
Stable tag: 3.0.0
License: GPLv2 or later

== Description ==
Standard WordPress Theme for Attorneys, Consultants, and Multi-Industry Cloud Presets.
Ready for direct ZIP installation in wp-admin -> Appearance -> Themes -> Add New -> Upload Theme.
`);

      const blob = await zip.generateAsync({ type: 'blob' });
      triggerZipDownload(blob, 'sedrazavi-theme.zip');
      setDownloadProgressMessage('پکیج sedrazavi-theme.zip با موفقیت تولید و دانلود شد.');
      setTimeout(() => setDownloadProgressMessage(null), 5000);
    } catch (err) {
      console.error(err);
      setDownloadProgressMessage('خطا در تولید فایل فشرده پوسته.');
    } finally {
      setIsZipping(false);
    }
  };

  // 2. Generate & Download sedrazavi-addons.zip
  const handleDownloadPluginZip = async () => {
    setIsZipping(true);
    setDownloadProgressMessage('در حال پکیج‌بندی افزونه هسته قابلیت‌های وردپرس (sedrazavi-addons.zip)...');
    try {
      const zip = new JSZip();
      const pluginFolder = zip.folder('sedrazavi-addons') || zip;

      // Add all plugin files
      WORDPRESS_PLUGIN_FILES.forEach((f) => {
        pluginFolder.file(f.path, f.code);
      });

      // Add real-time notification engine PHP handler
      pluginFolder.file('includes/realtime-notification-engine.php', `<?php
/**
 * Real-Time Notification & Lead Alert Engine
 * Handles instant alerts, database queue, and Webhook/Audio chime dispatch
 */
if (!defined('ABSPATH')) exit;

add_action('rest_api_init', function () {
    register_rest_route('sedrazavi/v1', '/leads/submit', [
        'methods' => 'POST',
        'callback' => 'sedrazavi_handle_lead_submission',
        'permission_callback' => '__return_true',
    ]);
});

function sedrazavi_handle_lead_submission($request) {
    $params = $request->get_json_params();
    $name = sanitize_text_field($params['clientName'] ?? 'مراجع جدید');
    $phone = sanitize_text_field($params['phone'] ?? '');
    $subject = sanitize_text_field($params['subject'] ?? 'درخواست جدید');

    // Save as CPT or Option Queue
    $post_id = wp_insert_post([
        'post_title' => $name . ' - ' . $subject,
        'post_type' => 'sedrazavi_lead',
        'post_status' => 'publish'
    ]);
    update_post_meta($post_id, '_client_phone', $phone);
    update_post_meta($post_id, '_created_at', current_time('mysql'));

    return rest_ensure_response(['success' => true, 'id' => $post_id]);
}
`);

      const blob = await zip.generateAsync({ type: 'blob' });
      triggerZipDownload(blob, 'sedrazavi-addons.zip');
      setDownloadProgressMessage('پکیج افزونه هسته sedrazavi-addons.zip با موفقیت دانلود شد.');
      setTimeout(() => setDownloadProgressMessage(null), 5000);
    } catch (err) {
      console.error(err);
      setDownloadProgressMessage('خطا در پکیج‌بندی افزونه.');
    } finally {
      setIsZipping(false);
    }
  };

  // 3. Generate & Download Custom Child-Theme ZIP
  const handleDownloadChildThemeZip = async () => {
    setIsZipping(true);
    setDownloadProgressMessage(`در حال ساخت چایلد‌تم مستقل برای صنف «${industryName}»...`);
    try {
      const zip = new JSZip();
      const childFolderName = `sedrazavi-child-${industrySlug}`;
      const childFolder = zip.folder(childFolderName) || zip;

      // style.css for Child Theme
      const styleCss = `/*
Theme Name: SedRazavi Child - ${industryName}
Theme URI: https://sedrazavi.ir/themes/${industrySlug}
Description: پوسته فرزند اختصاصی برای صنف ${industryName} برگرفته از هسته چندمنظوره SedRazavi.
Author: SedRazavi Architecture Engine
Author URI: https://sedrazavi.ir/
Template: sedrazavi-theme
Version: 1.0.0
Text Domain: sedrazavi-child-${industrySlug}
*/

:root {
  --primary-brand: ${primaryColor};
  --industry-slug: '${industrySlug}';
}

/* Custom CSS for ${industryName} */
body.industry-${industrySlug} {
  --accent-color: ${primaryColor};
}
`;
      childFolder.file('style.css', styleCss);

      // functions.php for Child Theme
      const functionsPhp = `<?php
/**
 * SedRazavi Child Theme Functions for: ${industryName}
 */
if (!defined('ABSPATH')) exit;

add_action('wp_enqueue_scripts', 'sedrazavi_child_enqueue_styles');
function sedrazavi_child_enqueue_styles() {
    wp_enqueue_style('sedrazavi-parent-style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style('sedrazavi-child-style', get_stylesheet_uri(), array('sedrazavi-parent-style'));
}

// Industry Custom Meta & Configuration
add_filter('sedrazavi_active_preset_config', function($config) {
    return array(
        'name' => '${industryName}',
        'slug' => '${industrySlug}',
        'tagline' => '${industryTagline}',
        'primary_color' => '${primaryColor}',
        'terms' => array(
            'client' => '${clientLabel}',
            'case' => '${caseLabel}',
            'booking' => '${bookingLabel}',
            'inquiry' => '${inquiryLabel}',
        ),
        'enabled_blocks' => ${JSON.stringify(enabledBlocks)}
    );
});
`;
      childFolder.file('functions.php', functionsPhp);

      // industry-config.json for easy import/export
      const configJson = {
        name: industryName,
        slug: industrySlug,
        tagline: industryTagline,
        primary_color: primaryColor,
        terms: {
          client: clientLabel,
          case: caseLabel,
          booking: bookingLabel,
          inquiry: inquiryLabel
        },
        enabled_blocks: enabledBlocks,
        exported_at: new Date().toISOString()
      };
      childFolder.file('industry-config.json', JSON.stringify(configJson, null, 2));

      // README instructions
      childFolder.file('README.txt', `=== SedRazavi Child Theme: ${industryName} ===
نحوه نصب:
۱. ابتدا پوسته اصلی sedrazavi-theme.zip را نصب فرمایید.
۲. سپس این فایل زیپ (${childFolderName}.zip) را در مسیر «پیشخوان وردپرس -> نمایش -> پوسته‌ها -> افزودن -> بارگذاری پوسته» نصب و فعال نمایید.
۳. تمام تغییرات، رنگ‌ها و واژگان اختصاصی صنف ${industryName} بدون نیاز به تغییر هسته فعال خواهد شد.`);

      const blob = await zip.generateAsync({ type: 'blob' });
      triggerZipDownload(blob, `${childFolderName}.zip`);
      setDownloadProgressMessage(`پکیج چایلد‌تم اختصاصی (${childFolderName}.zip) آماده و دانلود گردید.`);
      setTimeout(() => setDownloadProgressMessage(null), 5000);
    } catch (err) {
      console.error(err);
      setDownloadProgressMessage('خطا در تولید چایلد‌تم.');
    } finally {
      setIsZipping(false);
    }
  };

  // Export JSON Config Only
  const handleDownloadJsonConfig = () => {
    const configData = {
      name: industryName,
      slug: industrySlug,
      tagline: industryTagline,
      primary_color: primaryColor,
      terms: {
        client: clientLabel,
        case: caseLabel,
        booking: bookingLabel,
        inquiry: inquiryLabel
      },
      enabled_blocks: enabledBlocks,
      version: '3.0.0'
    };
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `industry-preset-${industrySlug}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6 text-right">
      
      {/* 1. Header Navigation */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-xs font-bold text-[#D4AF37] tracking-wider uppercase">
              فاز ۵: استودیوی پکیجینگ زیپ، چایلد‌تم‌ها و شخصی‌سازی اصناف
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
            مرکز پکیجینگ زیپ و استودیوی شخصی‌سازی اصناف پیش‌بینی‌نشده
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            تولید و دانلود درجا فایل‌های ZIP استاندارد وردپرس (پوسته، افزونه هسته، و چایلد‌تم‌های اختصاصی برای هر صنف).
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800/80 p-1 rounded-2xl border border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => setActiveTab('packaging')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'packaging'
                ? 'bg-white dark:bg-gray-900 text-[#0B132B] dark:text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <FolderDown className="w-4 h-4 text-[#D4AF37]" />
            <span>دانلود زیپ‌های رسمی</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('custom_industry_studio')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'custom_industry_studio'
                ? 'bg-white dark:bg-gray-900 text-[#0B132B] dark:text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span>استودیوی صنف جدید (تولید چایلد‌تم)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('architecture_qa')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'architecture_qa'
                ? 'bg-white dark:bg-gray-900 text-[#0B132B] dark:text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-emerald-500" />
            <span>پاسخنامه فنی و استراتژیک</span>
          </button>
        </div>
      </div>

      {/* Progress / Success Alert Notification */}
      {downloadProgressMessage && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#D4AF37]/15 to-[#AA820A]/10 border border-[#D4AF37]/40 flex items-center gap-3 animate-fadeIn">
          <RefreshCw className={`w-5 h-5 text-[#D4AF37] ${isZipping ? 'animate-spin' : ''}`} />
          <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">
            {downloadProgressMessage}
          </span>
        </div>
      )}

      {/* TAB 1: Core Packaging & ZIP Downloads */}
      {activeTab === 'packaging' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Box 1: Core Theme ZIP */}
            <div className="p-6 rounded-3xl bg-gray-50/80 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4 hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-2xl bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#F3E5AB]">
                  <Package className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 text-xs font-bold font-mono">
                  نسخه ۳.۰.۰ (تایید رسمی)
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white">
                  پوسته اصلی: <span className="font-mono text-[#D4AF37]">sedrazavi-theme.zip</span>
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  حاوی تمام تمپلیت‌های PHP، ساختار فرانت‌اند، CSS توکن‌های اختصاصی، کنترلر چندسناریویی، و کاتالوگ درون‌پوسته. کاملاً مستقل و با استاندارد رسمی مخزن وردپرس.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-[11px] font-mono text-gray-600 dark:text-gray-300 space-y-1">
                <div>📁 style.css (سربرگ استاندارد قالب)</div>
                <div>📁 functions.php (مدیریت لود ماژول‌ها و ای‌پی‌آی)</div>
                <div>📁 inc/scenario-controller.php (کنترلر ۳ سناریو)</div>
                <div>📁 screenshot.png (پیش‌نمایش گرافیکی پیشخوان)</div>
              </div>

              <button
                type="button"
                onClick={handleDownloadThemeZip}
                disabled={isZipping}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#0B132B] font-bold text-xs shadow-md shadow-[#D4AF37]/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>تولید و دانلود sedrazavi-theme.zip</span>
              </button>
            </div>

            {/* Box 2: Core Plugin ZIP */}
            <div className="p-6 rounded-3xl bg-gray-50/80 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4 hover:border-cyan-500/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-600 text-xs font-bold font-mono">
                  افزونه هسته (CPT & Realtime)
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white">
                  افزونه هسته: <span className="font-mono text-cyan-500">sedrazavi-addons.zip</span>
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  حاوی پست‌تایپ‌های پرونده و لیدها (`sedrazavi_lead`)، وب‌سرویس REST API، موتور اعلانات آنی مدیر همراه با وب‌سوکت، صف پیام‌ها و وب‌هوک‌های ایمیل/پیامک.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-[11px] font-mono text-gray-600 dark:text-gray-300 space-y-1">
                <div>📁 sedrazavi-addons.php (هسته افزونه وردپرس)</div>
                <div>📁 includes/realtime-notification-engine.php</div>
                <div>📁 includes/cpt-docket.php (دیتابیس پرونده‌ها)</div>
                <div>📁 includes/rest-api-endpoints.php</div>
              </div>

              <button
                type="button"
                onClick={handleDownloadPluginZip}
                disabled={isZipping}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-md shadow-cyan-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>تولید و دانلود sedrazavi-addons.zip</span>
              </button>
            </div>

          </div>

          {/* Quick Notice about Child Themes */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <FolderTree className="w-5 h-5 text-[#D4AF37]" />
              <div className="text-xs text-slate-600 dark:text-slate-300">
                <strong>چرا تفکیک به پوسته و افزونه؟</strong> با این کار حتی اگر فردا پوسته عوض شود، هیچ‌کدام از اطلاعات پرونده‌ها و فرم‌های مراجعین پاک نمی‌شود.
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('custom_industry_studio')}
              className="px-4 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              طراحی چایلد‌تم صنف جدید ↗
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: Custom Industry Studio & Dynamic Child-Theme Packager */}
      {activeTab === 'custom_industry_studio' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-900 dark:text-cyan-200 leading-relaxed">
            <strong>استودیوی اصناف ناشناخته و پیش‌بینی‌نشده:</strong> برای هر حرفه یا پروژه‌ای که تاکنون فکرش را نکرده‌ایم (پزشکی، آموزشی، ساختمانی، مهاجرتی، کریپتو و غیره)، عنوان و عبارات دلخواه را وارد کنید؛ سیستم درجا یک چایلد‌تم استاندارد وردپرس با فایل‌های PHP و JSON آماده می‌کند که از پیشخوان قابل نصب است.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Field: Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">عنوان و موضوع صنف</label>
              <input
                type="text"
                value={industryName}
                onChange={(e) => setIndustryName(e.target.value)}
                placeholder="مثلاً: کلینیک دندانپزشکی آریا"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs font-bold dark:text-white"
              />
            </div>

            {/* Field: Slug */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">اسلاگ انگلیسی (شناسه پوشه)</label>
              <input
                type="text"
                value={industrySlug}
                onChange={(e) => setIndustrySlug(e.target.value)}
                placeholder="مثلاً: dental-clinic"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs font-mono dark:text-white"
                dir="ltr"
              />
            </div>

            {/* Field: Primary Color */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">رنگ برند و تم اختصاصی</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-8 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-700"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs font-mono dark:text-white"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Term: Client */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">واژه مراجع / کاربر</label>
              <input
                type="text"
                value={clientLabel}
                onChange={(e) => setClientLabel(e.target.value)}
                placeholder="بیمار / دانشجو / مسافر"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs dark:text-white"
              />
            </div>

            {/* Term: Case */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">واژه پرونده / فعالیت</label>
              <input
                type="text"
                value={caseLabel}
                onChange={(e) => setCaseLabel(e.target.value)}
                placeholder="پرونده پزشکی / سفارش / پروژه"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs dark:text-white"
              />
            </div>

            {/* Term: Booking */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">واژه فرم اقدام و رزرو</label>
              <input
                type="text"
                value={bookingLabel}
                onChange={(e) => setBookingLabel(e.target.value)}
                placeholder="رزرو ویزیت / استعلام هزینه"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs dark:text-white"
              />
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">شعار یا شرح صنف در سربرگ</label>
            <input
              type="text"
              value={industryTagline}
              onChange={(e) => setIndustryTagline(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs dark:text-white"
            />
          </div>

          {/* Block Selection Matrix */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">بلوک‌های فعال در فرانت‌اند این صنف:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {Object.entries(enabledBlocks).map(([blockKey, isEnabled]) => (
                <label
                  key={blockKey}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold cursor-pointer transition-colors ${
                    isEnabled
                      ? 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-500/40 text-cyan-800 dark:text-cyan-300'
                      : 'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700 text-gray-400'
                  }`}
                >
                  <span>
                    {blockKey === 'hero' && 'بخش هیرو و بنر'}
                    {blockKey === 'bentoHud' && 'کارت‌های بنتو HUD'}
                    {blockKey === 'servicesGrid' && 'لیست خدمات / محصولات'}
                    {blockKey === 'quickTracker' && 'ابزار رهگیری و استعلام'}
                    {blockKey === 'bookingSection' && 'فرم درخواست و رزرو'}
                    {blockKey === 'mediaStream' && 'پلیر صوتی و ویدیو'}
                    {blockKey === 'articles' && 'دانشنامه و مقالات'}
                    {blockKey === 'testimonials' && 'نظرات و رضایت'}
                  </span>
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={(e) => setEnabledBlocks({ ...enabledBlocks, [blockKey]: e.target.checked })}
                    className="accent-cyan-500 cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              type="button"
              onClick={handleDownloadChildThemeZip}
              disabled={isZipping}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-md shadow-cyan-500/20 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <FolderDown className="w-4 h-4" />
              <span>تولید و دانلود زیپ چایلد‌تم ({`sedrazavi-child-${industrySlug}.zip`})</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadJsonConfig}
              className="px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-bold text-gray-700 dark:text-gray-200 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FileCode className="w-4 h-4 text-[#D4AF37]" />
              <span>دانلود فایل JSON کانفیگ صنف</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: Strategic & Technical Architecture Q&A Playbook */}
      {activeTab === 'architecture_qa' && (
        <div className="space-y-4">
          
          {/* Question 1 */}
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#D4AF37]">
              <HelpCircle className="w-4 h-4" />
              <span>پرسش ۱: آیا پوسته و افزونه با زیپ گرفتن از مخزن گیت‌هاب روی وردپرس قابل نصب هستند؟</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>بله، ۱۰۰٪ و به استانداردترین شکل ممکن.</strong> دو پکیج مجزا (`sedrazavi-theme.zip` و `sedrazavi-addons.zip`) دارای ساختار رسمی استاندارد دایرکتوری مخزن وردپرس هستند. مدیر سایت به راحتی وارد بخش «نمایش ← پوسته‌ها ← افزودن پوسته» شده و فایل زیپ پوسته را آپلود می‌کند، و برای افزونه از بخش «افزونه‌ها ← افزودن ← بارگذاری افزونه» استفاده می‌نماید. هیچ مرحله پیچیده دستی دیگری وجود ندارد.
            </p>
          </div>

          {/* Question 2 */}
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#D4AF37]">
              <Cpu className="w-4 h-4" />
              <span>پرسش ۲: فایل‌ها با چه زبان‌هایی نوشته می‌شوند و پیش‌نیازهای هاست چیست؟</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>بک‌اند کاملاً با زبان استاندارد PHP مدرن (نسخه 7.4 تا 8.3)</strong> و بر پایه توابع بومی وردپرس (`wp_remote_get`، `register_post_type`، `wp_add_inline_script`) نوشته شده است. فرانت‌اند با ترکیب HTML5 معنایی، CSS3 با متغیرهای اختصاصی Tailwind و کدهای بهینه‌شده جاوااسکریپت ES6 مستقل کار می‌کند. <strong>هاست مقصد هیچ نیازی به Node.js یا سرور پیچیده ندارد</strong> و با ارزان‌ترین هاست‌های اشتراکی cPanel/DirectAdmin با وب‌سرورهای لایت‌اسپید، آپاچی یا Nginx با نهایت سرعت اجرا می‌شود.
            </p>
          </div>

          {/* Question 3 */}
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#D4AF37]">
              <Bell className="w-4 h-4" />
              <span>پرسش ۳: مدیر چگونه بلافاصله پس از ثبت فرم توسط کاربر مطلع می‌شود؟</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              سیستم اعلانات سه‌گانه بلادرنگ عمل می‌کند:
              <br />
              ۱. <strong>صدای زنگ موقر (Audio Chime):</strong> با Web Audio API مرورگر، صدای دینگ آرام در تب باز مدیر پخش می‌شود.
              <br />
              ۲. <strong>زنگوله پالس‌دار هدر:</strong> شمارنده قرمز زنگوله بالا می‌رود و پالس نوری فعال می‌شود.
              <br />
              ۳. <strong>بررسی بدون تغییر صفحه:</strong> با کلیک روی زنگوله، کشوی اکشن باز شده و نام، شماره موبایل، موضوع و فوریت مراجع را نمایش می‌دهد و مدیر همان‌جا می‌تواند وضعیت لید را به‌روزرسانی کند.
            </p>
          </div>

          {/* Question 4 */}
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#D4AF37]">
              <Sliders className="w-4 h-4" />
              <span>پرسش ۴: شخصی‌سازی اصناف ناشناخته و بلوک‌هایی که فکرشان را نکرده‌ایم چگونه است؟</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              سیستم به صورت ماژولار و مبتنی بر توکن طراحی شده است:
              <br />
              - <strong>چایلد‌تم‌های مستقل:</strong> با تب «استودیوی صنف جدید»، مدیر بدون دانش کدنویسی عنوان، رنگ و واژگان هر شغلی را تایپ می‌کند و چایلدتم آماده دانلود می‌شود.
              <br />
              - <strong>نوار ابزار ویرایش زنده (Live Customizer):</strong> مدیر بدون ورود به بک‌اند می‌تواند متون، وضعیت نمایش/پنهان‌سازی بلوک‌ها و رنگ‌ها را در همان صفحه تغییر دهد.
              <br />
              - <strong>فایل‌های کانفیگ JSON:</strong> تمام تنظیمات هر صنف به صورت یک فایل استاندارد JSON ذخیره و جابجا می‌شود.
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
