import React, { useState } from 'react';
import {
  LawyerSiteProfile,
  saveLawyerProfile,
  resetLawyerProfile,
} from '../../utils/lawyerCustomizationStorage';
import {
  Sun,
  Moon,
  Type,
  Sparkles,
  Eye,
  Save,
  RotateCcw,
  Check,
  Download,
  Copy,
  Sliders,
  Palette,
  Layers,
  ArrowRight,
  Shield,
  Gavel,
  Briefcase,
  Zap,
  Waves,
  Activity,
  Radio,
  Building2,
  GitBranch,
  Search,
} from 'lucide-react';
import { THEME_PALETTES, ThemePalettePreset } from '../../data/themePalettes';
import { VECTOR_BACKGROUND_PRESETS, VectorBackgroundPreset } from '../../data/vectorBackgroundPresets';
import { applyPaletteToDom, generateElementorKitSettings, generateElementorPhpSyncSnippet } from '../../utils/themePaletteApplier';
import { useDesignTokens } from '../../context/DesignTokensContext';
import { LawFirmScenarioManager } from './LawFirmScenarioManager';
import { AdminSeoInspectorTab } from './AdminSeoInspectorTab';

interface AdminAppearanceTabProps {
  profile: LawyerSiteProfile;
  onUpdateProfile: (updated: LawyerSiteProfile) => void;
}

export const AdminAppearanceTab: React.FC<AdminAppearanceTabProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'palettes_30' | 'vector_30' | 'elementor_sync' | 'firm_scenarios' | 'seo_inspector' | 'light' | 'dark' | 'typography' | 'advanced' | 'preview' | 'save_reset'
  >('palettes_30');
  const [paletteCategoryFilter, setPaletteCategoryFilter] = useState<string>('all');
  const [vectorCategoryFilter, setVectorCategoryFilter] = useState<string>('all');

  const [appearance, setAppearance] = useState(
    profile.appearance || {
      lightPalette: {
        bg: '#F4F6F9',
        text: '#0B132B',
        goldPrimary: '#D4AF37',
        goldSecondary: '#AA820A',
        border: '#E2E8F0',
      },
      darkPalette: {
        bg: '#070D1E',
        text: '#F8FAFC',
        cardBg: '#0B132B',
        goldPrimary: '#D4AF37',
        goldGlow: 'rgba(212, 175, 55, 0.25)',
      },
      typography: {
        headingFont: 'Vazirmatn',
        bodyFont: 'Vazirmatn',
        baseFontSize: 16,
        lineHeight: 1.6,
      },
      advanced: {
        borderRadius: 16,
        enableAnimations: true,
        buttonPulse: true,
        hoverLift: true,
      },
    }
  );

  const { updateToken } = useDesignTokens();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);

  const handleSave = () => {
    const updated: LawyerSiteProfile = {
      ...profile,
      appearance,
    };
    saveLawyerProfile(updated);
    onUpdateProfile(updated);

    // Apply live CSS variables to the document
    applyPaletteToDom(appearance.lightPalette, appearance.darkPalette);

    // Synchronize design tokens
    updateToken('color.primary', appearance.lightPalette.goldPrimary);
    updateToken('color.secondary', appearance.lightPalette.goldSecondary);
    updateToken('color.background', appearance.lightPalette.bg);
    updateToken('color.text', appearance.lightPalette.text);

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleApplyFullSuite = (preset: ThemePalettePreset) => {
    const nextApp = {
      ...appearance,
      lightPalette: preset.lightColors,
      darkPalette: preset.darkColors,
    };
    setAppearance(nextApp);
    const updated: LawyerSiteProfile = {
      ...profile,
      appearance: nextApp,
    };
    saveLawyerProfile(updated);
    onUpdateProfile(updated);
    applyPaletteToDom(preset.lightColors, preset.darkColors);
    updateToken('color.primary', preset.lightColors.goldPrimary);
    updateToken('color.secondary', preset.lightColors.goldSecondary);
    updateToken('color.background', preset.lightColors.bg);
    updateToken('color.text', preset.lightColors.text);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSelectVectorPreset = (presetId: string) => {
    const current = appearance.vectorBackground || {
      presetId: 'dynamic-flowing-waves',
      opacity: 0.65,
      speed: 'normal',
      enableGlow: true,
      density: 'balanced',
    };
    const nextVector = {
      ...current,
      presetId,
    };
    const nextApp = {
      ...appearance,
      vectorBackground: nextVector,
    };
    setAppearance(nextApp);
    const updated: LawyerSiteProfile = {
      ...profile,
      appearance: nextApp,
    };
    saveLawyerProfile(updated);
    onUpdateProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleUpdateVectorConfig = (patch: Partial<NonNullable<typeof appearance.vectorBackground>>) => {
    const current = appearance.vectorBackground || {
      presetId: 'dynamic-flowing-waves',
      opacity: 0.65,
      speed: 'normal',
      enableGlow: true,
      density: 'balanced',
    };
    const nextVector = { ...current, ...patch };
    const nextApp = {
      ...appearance,
      vectorBackground: nextVector,
    };
    setAppearance(nextApp);
    const updated: LawyerSiteProfile = {
      ...profile,
      appearance: nextApp,
    };
    saveLawyerProfile(updated);
    onUpdateProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleReset = () => {
    if (confirm('آیا از بازنشانی تنظیمات ظاهری به حالت پیش‌فرض مطمئن هستید؟')) {
      const def = resetLawyerProfile();
      if (def.appearance) setAppearance(def.appearance);
      onUpdateProfile(def);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const generateCssVariables = () => {
    return `:root {
  /* پالت روز - دفتر وکالت دکتر سیده مریم رضوی */
  --sr-bg-light: ${appearance.lightPalette.bg};
  --sr-text-light: ${appearance.lightPalette.text};
  --sr-gold-primary: ${appearance.lightPalette.goldPrimary};
  --sr-gold-secondary: ${appearance.lightPalette.goldSecondary};
  --sr-border-light: ${appearance.lightPalette.border};

  /* تایپوگرافی و هندسه */
  --sr-font-heading: '${appearance.typography.headingFont}', serif;
  --sr-font-body: '${appearance.typography.bodyFont}', sans-serif;
  --sr-font-size-base: ${appearance.typography.baseFontSize}px;
  --sr-line-height: ${appearance.typography.lineHeight};
  --sr-border-radius: ${appearance.advanced.borderRadius}px;
}

[data-theme="dark"], .dark {
  /* پالت شب سلطنتی */
  --sr-bg-dark: ${appearance.darkPalette.bg};
  --sr-text-dark: ${appearance.darkPalette.text};
  --sr-card-bg: ${appearance.darkPalette.cardBg};
  --sr-gold-glow: ${appearance.darkPalette.goldGlow};
}`;
  };

  const handleCopyCss = () => {
    navigator.clipboard.writeText(generateCssVariables());
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 2500);
  };

  const handleDownloadCss = () => {
    const blob = new Blob([generateCssVariables()], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sedrazavi-theme-customizer.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
      {/* Guidance info for buyer lawyer */}
      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span>
            <strong>راهنمای وکیل:</strong> این بخش مختص پالت‌های رنگی، فونت و استایل‌های شب/روز است. جهت ویرایش نام وکیل، شماره پروانه، عکس پرسنلی، بیوگرافی و شبکه‌های اجتماعی از زبانه «۱۶. هویت کامل وکیل» در نوار بالای داشبورد استفاده فرمایید.
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <Palette className="w-6 h-6 text-[#D4AF37]" />
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
              تنظیمات ظاهری، رنگ‌بندی و تایپوگرافی پوسته (فاز ۳)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            سفارشی‌سازی کامل پالت روز، پالت شب سلطنتی، اندازه‌های قلم و استایل اختصاصی دفتر وکالت.
          </p>
        </div>

        {/* 8 Sub-Tab Navigation Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveSubTab('palettes_30')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'palettes_30'
                ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-[#D4AF37] shadow-sm border border-[#D4AF37]/60'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>۱. مخزن ۳۰ تم رنگی (شب و روز)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('vector_30')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'vector_30'
                ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/30 text-amber-900 dark:text-[#F3E5AB] shadow-sm border border-[#D4AF37]'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Waves className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>۲. پس‌زمینه‌های وکتوری (۳۰ مدل)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('light')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'light'
                ? 'bg-white dark:bg-[#0B132B] text-amber-600 dark:text-[#F3E5AB] shadow-sm border border-[#D4AF37]/40'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>۳. پالت روز</span>
          </button>

          <button
            onClick={() => setActiveSubTab('dark')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'dark'
                ? 'bg-white dark:bg-[#0B132B] text-indigo-600 dark:text-indigo-300 shadow-sm border border-[#D4AF37]/40'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>۴. پالت شب</span>
          </button>

          <button
            onClick={() => setActiveSubTab('typography')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'typography'
                ? 'bg-white dark:bg-[#0B132B] text-[#D4AF37] shadow-sm border border-[#D4AF37]/40'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>۵. تایپوگرافی</span>
          </button>

          <button
            onClick={() => setActiveSubTab('advanced')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'advanced'
                ? 'bg-white dark:bg-[#0B132B] text-emerald-600 dark:text-emerald-400 shadow-sm border border-[#D4AF37]/40'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>۶. پیشرفته</span>
          </button>

          <button
            onClick={() => setActiveSubTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'preview'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-sm font-black'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#D4AF37]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>۷. پیش‌نمایش زنده</span>
          </button>

          <button
            onClick={() => setActiveSubTab('elementor_sync')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'elementor_sync'
                ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/30 text-amber-900 dark:text-[#F3E5AB] shadow-sm border border-[#D4AF37]'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>۸. همگام‌ساز رنگ‌های المنتور (Global Sync)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('firm_scenarios')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'firm_scenarios'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm font-black'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#D4AF37]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>۹. سناریوهای دفاتر حقوقی (۴ سناریو بدون حذف داده)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('seo_inspector')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'seo_inspector'
                ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/30 text-emerald-900 dark:text-emerald-200 shadow-sm border border-emerald-500/50'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>۱۰. مدیریت سئو، متاتگ‌ها و اسکیما (SEO Engine)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('save_reset')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'save_reset'
                ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-white shadow-sm border border-[#D4AF37]/40'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>۱۱. ذخیره و خروجی</span>
          </button>
        </div>
      </div>

      {/* Content for each tab */}
      
      {/* 0. 30 Palettes Suite (Master Backend Hub) */}
      {activeSubTab === 'palettes_30' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#D4AF37]/15 to-transparent border border-[#D4AF37]/30 text-xs text-amber-900 dark:text-[#F3E5AB] leading-relaxed">
            <div className="font-bold flex items-center gap-2 mb-1 text-sm text-[#0B132B] dark:text-white">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>مخزن مرکزی ۳۰ تم رنگی حقوقی (پست‌تایپ گرافیکی بک‌اند)</span>
            </div>
            سرکار خانم دکتر رضوی، مطابق درخواست شما این بخش در مدیریت پنل قرار گرفت تا بتوانید از میان ۳۰ تم رنگی دسته‌بندی‌شده (شامل هر دو پالت اختصاصی روز و شب هماهنگ)، تم دلخواه را انتخاب و ذخیره نمایید. تم ذخیره شده در کل فرانت‌اند اعمال شده و کاربر در سایت تنها با دکمه روز/شب (خورشید و ماه) بین حالت روشن و تاریک آن جابجا می‌شود.
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'همه ۳۰ تم' },
              { id: 'classic', label: 'کلاسیک و دادگستری' },
              { id: 'corporate', label: 'شرکتی و پیمانکاری' },
              { id: 'real-estate', label: 'ملکی و سرقفلی' },
              { id: 'criminal', label: 'کیفری و سایبری' },
              { id: 'arbitration', label: 'داوری و بین‌الملل' },
              { id: 'tech', label: 'استارتاپ و مالکیت فکری' },
              { id: 'specialized', label: 'دیوان عدالت و تخصصی' },
              { id: 'luxury', label: 'پریمیوم و لوکس' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setPaletteCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  paletteCategoryFilter === cat.id
                    ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 30 Palettes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {THEME_PALETTES.filter(
              (p) => paletteCategoryFilter === 'all' || p.category === paletteCategoryFilter
            ).map((preset) => {
              const isSelected =
                appearance.lightPalette.goldPrimary === preset.lightColors.goldPrimary &&
                appearance.darkPalette.bg === preset.darkColors.bg;

              return (
                <div
                  key={preset.id}
                  className={`p-4 rounded-2xl border text-right transition-all flex flex-col justify-between relative bg-white dark:bg-gray-800/90 shadow-sm ${
                    isSelected
                      ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/40 shadow-md'
                      : 'border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]/60'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#0B132B] font-bold text-[10px] flex items-center gap-1 shadow-sm">
                      <Check className="w-3 h-3" />
                      <span>تم فعال سایت</span>
                    </span>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB]">
                        {preset.badge}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
                        {preset.recommendedPractice || preset.category}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#0B132B] dark:text-white">
                      {preset.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                      {preset.desc}
                    </p>
                  </div>

                  {/* Visual Swatches for BOTH Day and Night Modes */}
                  <div className="my-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700/60 space-y-2.5">
                    {/* Day Swatch */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 dark:text-amber-400">
                        <Sun className="w-3.5 h-3.5" />
                        <span>پالت روز:</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full border border-gray-300 shadow-xs" style={{ backgroundColor: preset.lightColors.bg }} title="پس‌زمینه روز" />
                        <span className="w-4 h-4 rounded-full border border-gray-300 shadow-xs" style={{ backgroundColor: preset.lightColors.text }} title="متن روز" />
                        <span className="w-4 h-4 rounded-full border border-gray-300 shadow-xs" style={{ backgroundColor: preset.lightColors.goldPrimary }} title="رنگ طلایی/تأکیدی روز" />
                        <span className="w-4 h-4 rounded-full border border-gray-300 shadow-xs" style={{ backgroundColor: preset.lightColors.goldSecondary }} title="رنگ ثانویه روز" />
                      </div>
                    </div>

                    {/* Night Swatch */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-gray-200/60 dark:border-gray-800">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 dark:text-indigo-400">
                        <Moon className="w-3.5 h-3.5" />
                        <span>پالت شب:</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full border border-gray-600 shadow-xs" style={{ backgroundColor: preset.darkColors.bg }} title="پس‌زمینه شب" />
                        <span className="w-4 h-4 rounded-full border border-gray-600 shadow-xs" style={{ backgroundColor: preset.darkColors.text }} title="متن شب" />
                        <span className="w-4 h-4 rounded-full border border-gray-600 shadow-xs" style={{ backgroundColor: preset.darkColors.goldPrimary }} title="رنگ طلایی/تأکیدی شب" />
                        <span className="w-4 h-4 rounded-full border border-gray-600 shadow-xs" style={{ backgroundColor: preset.darkColors.cardBg }} title="باکس‌های شب" />
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button
                    type="button"
                    onClick={() => handleApplyFullSuite(preset)}
                    className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] hover:from-[#1C2541] hover:to-[#0B132B] text-[#D4AF37] border border-[#D4AF37]/50 shadow-sm'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>این تم در حال حاضر در سایت فعال است</span>
                      </>
                    ) : (
                      <>
                        <Palette className="w-4 h-4 text-[#D4AF37]" />
                        <span>انتخاب و اعمال این تم (روز و شب) در فرانت‌اند</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. 30 Animated Vector Line Backgrounds (پست‌تایپ پس‌زمینه‌های وکتوری انیمیشنی) */}
      {activeSubTab === 'vector_30' && (
        <div className="space-y-6">
          {/* Header Explanation Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#D4AF37]/15 to-transparent border border-[#D4AF37]/30 text-xs text-amber-900 dark:text-[#F3E5AB] leading-relaxed">
            <div className="font-bold flex items-center gap-2 mb-1.5 text-sm text-[#0B132B] dark:text-white">
              <Waves className="w-4 h-4 text-[#D4AF37]" />
              <span>مخزن اختصاصی ۳۰ وکتور دیزاین خطی و امواج انیمیشنی (Animated Vector Lines & Wave Mesh)</span>
            </div>
            سرکار خانم دکتر رضوی، مطابق دستور شما، این ۳۰ مدل وکتور الهام‌گرفته از مدرن‌ترین الگوهای وکتور خطی لندینگ پیج (شامل امواج سینوسی روان، کانتورهای تراز توپوگرافی ملکی، شبکه امنیتی اسناد رسمی گیلوش، صور فلکی و گره‌های پیوسته، مدارهای داده سایبری و هندسه اسلیمی) در بک‌اند پیاده‌سازی شدند. هر کدام از این ۳۰ مدل را انتخاب فرمایید، بلافاصله روی لندینگ‌پیج فرانت‌اند اعمال شده و <strong>به صورت کاملاً داینامیک رنگ و درخشش خود را از ۳۰ پالت تم فعال در تب ۱ دریافت می‌کنند.</strong>
          </div>

          {/* Quick Settings Bar: Mode (Static vs Animated), Opacity, Speed & Blend Mode */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                مدل فعال فعلی:
              </span>
              <span className="px-3 py-1 rounded-xl bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] text-xs font-bold shadow-sm">
                {VECTOR_BACKGROUND_PRESETS.find(
                  (p) => p.id === (appearance.vectorBackground?.presetId || 'dynamic-flowing-waves')
                )?.title || '۱. امواج مواج سینوسی روان'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* Static vs Animated Mode Toggle */}
              <div className="flex items-center gap-1 p-1 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                <button
                  type="button"
                  onClick={() => handleUpdateVectorConfig({ mode: 'animated', isAnimated: true })}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    (appearance.vectorBackground?.mode || 'animated') === 'animated'
                      ? 'bg-[#D4AF37] text-[#0B132B] font-black shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                  }`}
                >
                  متحرک و انیمیشنی
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateVectorConfig({ mode: 'static', isAnimated: false })}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    appearance.vectorBackground?.mode === 'static'
                      ? 'bg-[#0B132B] dark:bg-white text-white dark:text-[#0B132B] font-black shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                  }`}
                >
                  ثابت و بدون حرکت (Luxury Static)
                </button>
              </div>

              {/* Opacity slider */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-300">
                  شفافیت:
                </label>
                <input
                  type="range"
                  min="0.15"
                  max="1"
                  step="0.05"
                  value={appearance.vectorBackground?.opacity ?? 0.65}
                  onChange={(e) =>
                    handleUpdateVectorConfig({ opacity: parseFloat(e.target.value) })
                  }
                  className="w-20 accent-[#D4AF37] cursor-pointer"
                />
                <span className="text-xs font-mono text-[#D4AF37] font-bold">
                  {Math.round((appearance.vectorBackground?.opacity ?? 0.65) * 100)}%
                </span>
              </div>

              {/* Speed Buttons (Only when animated) */}
              {(appearance.vectorBackground?.mode || 'animated') === 'animated' && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-300 ml-1">
                    سرعت:
                  </span>
                  {(
                    [
                      { id: 'slow', label: 'آرام' },
                      { id: 'normal', label: 'استاندارد' },
                      { id: 'fast', label: 'پرشتاب' },
                    ] as const
                  ).map((spd) => (
                    <button
                      key={spd.id}
                      type="button"
                      onClick={() => handleUpdateVectorConfig({ speed: spd.id })}
                      className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                        (appearance.vectorBackground?.speed || 'normal') === spd.id
                          ? 'bg-[#D4AF37] text-[#0B132B] font-black shadow-sm'
                          : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-[#D4AF37]'
                      }`}
                    >
                      {spd.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Blend Mode Selection */}
              <div className="flex items-center gap-1.5">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-300">
                  بلندینگ:
                </label>
                <select
                  value={appearance.vectorBackground?.blendMode || 'normal'}
                  onChange={(e) => handleUpdateVectorConfig({ blendMode: e.target.value as any })}
                  className="p-1 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-xs font-bold text-gray-700 dark:text-gray-200"
                >
                  <option value="normal">عادی (Normal)</option>
                  <option value="overlay">هم‌پوشانی (Overlay)</option>
                  <option value="multiply">ضرب در زمینه (Multiply)</option>
                  <option value="soft-light">نور ملایم (Soft Light)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'همه ۳۰ مدل وکتور' },
              { id: 'waves', label: 'امواج سینوسی و روبان‌های سیال' },
              { id: 'contours', label: 'کانتورهای تراز و توپوگرافی' },
              { id: 'guilloche', label: 'شبکه امنیتی گیلوش اسناد رسمی' },
              { id: 'constellation', label: 'صور فلکی و گره‌های پیوسته' },
              { id: 'cyber', label: 'مدارهای سایبری، فتا و بلاک‌چین' },
              { id: 'geometric', label: 'هندسه مدرن، فیبوناچی و منشور' },
              { id: 'architectural', label: 'معماری ستون‌ها و کاخ دادگستری' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setVectorCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  vectorCategoryFilter === cat.id
                    ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 30 Vector Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {VECTOR_BACKGROUND_PRESETS.filter((preset) =>
              vectorCategoryFilter === 'all' ? true : preset.category === vectorCategoryFilter
            ).map((preset) => {
              const isActive =
                (appearance.vectorBackground?.presetId || 'dynamic-flowing-waves') === preset.id;
              return (
                <div
                  key={preset.id}
                  className={`rounded-2xl p-4 border transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md ${
                    isActive
                      ? 'border-[#D4AF37] bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent dark:bg-gray-800/90 ring-2 ring-[#D4AF37]/50'
                      : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/60 hover:border-[#D4AF37]/70 hover:translate-y-[-2px]'
                  }`}
                >
                  {/* Mini Animated Graphic Preview Box */}
                  <div className="relative h-28 w-full rounded-xl overflow-hidden bg-[#070D1E] border border-gray-800 mb-3 flex items-center justify-center">
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 75% 25%, ${appearance.lightPalette.goldPrimary}22 0%, transparent 60%)`,
                      }}
                    />
                    {/* SVG Graphic with dynamic CSS stroke that takes current theme palette gold color */}
                    <svg
                      viewBox="0 0 400 160"
                      className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                    >
                      <defs>
                        <linearGradient id={`preview-grad-${preset.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={appearance.lightPalette.goldPrimary} stopOpacity="0.9" />
                          <stop offset="100%" stopColor={appearance.lightPalette.goldSecondary} stopOpacity="0.4" />
                        </linearGradient>
                      </defs>

                      {/* Wave Flow Graphic */}
                      {preset.category === 'waves' && (
                        <g>
                          {[15, 35, 55, 75, 95, 115, 135].map((y, idx) => (
                            <path
                              key={idx}
                              d={`M 0 ${y} Q 100 ${y - 25 + (idx % 2) * 30} 200 ${y} T 400 ${y + 10}`}
                              fill="none"
                              stroke={`url(#preview-grad-${preset.id})`}
                              strokeWidth={idx % 2 === 0 ? 1.5 : 1}
                              strokeOpacity={0.4 + (idx % 3) * 0.2}
                            />
                          ))}
                        </g>
                      )}

                      {/* Contours Graphic */}
                      {preset.category === 'contours' && (
                        <g>
                          {[25, 45, 65, 85, 105, 125].map((r, idx) => (
                            <ellipse
                              key={idx}
                              cx={280}
                              cy={80}
                              rx={r * 1.6}
                              ry={r * 0.75}
                              fill="none"
                              stroke={`url(#preview-grad-${preset.id})`}
                              strokeWidth={idx % 2 === 0 ? 1.5 : 1}
                              strokeOpacity={0.4 + (idx % 3) * 0.2}
                              transform="rotate(-15 280 80)"
                            />
                          ))}
                        </g>
                      )}

                      {/* Guilloche Mesh Graphic */}
                      {preset.category === 'guilloche' && (
                        <g transform="translate(200, 80)">
                          {[0, 30, 60, 90, 120, 150].map((angle, idx) => (
                            <ellipse
                              key={idx}
                              cx={0}
                              cy={0}
                              rx={140}
                              ry={40}
                              fill="none"
                              stroke={`url(#preview-grad-${preset.id})`}
                              strokeWidth={1}
                              strokeOpacity={0.35 + (idx % 2) * 0.25}
                              transform={`rotate(${angle})`}
                            />
                          ))}
                        </g>
                      )}

                      {/* Constellation Graphic */}
                      {preset.category === 'constellation' && (
                        <g>
                          {[
                            { x: 50, y: 40 }, { x: 130, y: 70 }, { x: 220, y: 35 }, { x: 310, y: 90 }, { x: 370, y: 45 },
                            { x: 90, y: 120 }, { x: 190, y: 135 }, { x: 270, y: 125 },
                          ].map((pt, idx, arr) => (
                            <React.Fragment key={idx}>
                              {idx < arr.length - 1 && (
                                <line
                                  x1={pt.x}
                                  y1={pt.y}
                                  x2={arr[idx + 1].x}
                                  y2={arr[idx + 1].y}
                                  stroke={`url(#preview-grad-${preset.id})`}
                                  strokeWidth={1}
                                  strokeOpacity={0.5}
                                />
                              )}
                              <circle cx={pt.x} cy={pt.y} r={3} fill={appearance.lightPalette.goldPrimary} />
                            </React.Fragment>
                          ))}
                        </g>
                      )}

                      {/* Cyber Matrix Graphic */}
                      {preset.category === 'cyber' && (
                        <g>
                          {[25, 55, 85, 115, 140].map((y, idx) => (
                            <path
                              key={idx}
                              d={`M 0 ${y} L ${120 + idx * 30} ${y} L ${160 + idx * 30} ${y + 20} L 400 ${y + 20}`}
                              fill="none"
                              stroke={`url(#preview-grad-${preset.id})`}
                              strokeWidth={1.4}
                              strokeDasharray="8 6"
                              strokeOpacity={0.6}
                            />
                          ))}
                        </g>
                      )}

                      {/* Geometric / Architecture Graphic */}
                      {(preset.category === 'geometric' || preset.category === 'architectural') && (
                        <g>
                          {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400].map((x, idx) => (
                            <React.Fragment key={idx}>
                              <line
                                x1={x}
                                y1={0}
                                x2={x + 90}
                                y2={160}
                                stroke={`url(#preview-grad-${preset.id})`}
                                strokeWidth={1}
                                strokeOpacity={0.3}
                              />
                              <line
                                x1={x}
                                y1={160}
                                x2={x + 90}
                                y2={0}
                                stroke={appearance.lightPalette.goldSecondary}
                                strokeWidth={0.8}
                                strokeOpacity={0.2}
                              />
                            </React.Fragment>
                          ))}
                        </g>
                      )}
                    </svg>

                    {/* Active Ribbon Badge on Preview */}
                    {isActive && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#0B132B] text-[10px] font-black shadow-md flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>مدل فعال</span>
                      </span>
                    )}

                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm text-[10px] font-mono text-gray-300">
                      {preset.categoryLabel}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#D4AF37] font-mono">
                        مدل شماره #{preset.number}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-amber-500/10 text-amber-800 dark:text-[#F3E5AB]">
                        {preset.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight mt-1 group-hover:text-[#D4AF37] transition-colors">
                      {preset.title}
                    </h4>

                    <p className="text-[11px] text-gray-400 font-mono mt-0.5 truncate">
                      {preset.titleEn}
                    </p>

                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-relaxed line-clamp-2">
                      {preset.desc}
                    </p>

                    <div className="mt-2.5 p-2 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/60 text-[11px] text-gray-500 dark:text-gray-400">
                      <strong className="text-gray-700 dark:text-gray-300">کاربرد پیشنهادی:</strong>{' '}
                      {preset.recommendedUse}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <button
                      type="button"
                      onClick={() => handleSelectVectorPreset(preset.id)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-[#D4AF37] text-gray-800 dark:text-gray-200 hover:text-[#0B132B] shadow-sm'
                      }`}
                    >
                      {isActive ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>فعال روی کل لندینگ‌پیج</span>
                        </>
                      ) : (
                        <>
                          <Waves className="w-4 h-4" />
                          <span>انتخاب و اعمال این مدل در سایت</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2.5 Elementor Global Colors Synchronization Suite */}
      {activeSubTab === 'elementor_sync' && (
        <div className="space-y-6">
          {/* Header Explanation Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#D4AF37]/15 to-transparent border border-[#D4AF37]/30 text-xs text-amber-900 dark:text-[#F3E5AB] leading-relaxed">
            <div className="font-bold flex items-center gap-2 mb-1.5 text-sm text-[#0B132B] dark:text-white">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>موتور همگام‌سازی لحظه‌ای پالت‌های تم با رنگ‌های اصلی المنتور (Elementor Global Colors Sync)</span>
            </div>
            با انتخاب هر کدام از ۳۰ پالت رنگی در تب ۱، سیستم به صورت همزمان متغیرهای جهانی کیت پیش‌فرض المنتور (شامل <code className="font-mono bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded">--e-global-color-primary</code>، <code className="font-mono bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded">--e-global-color-secondary</code>، <code className="font-mono bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded">--e-global-color-text</code> و <code className="font-mono bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded">--e-global-color-accent</code>) را بازنویسی می‌کند. تمامی المان‌های طراحی‌شده با المنتور (دکمه‌ها، آیکون‌ها، عناوین و خطوط تقسیم) بلافاصله رنگ پالت جدید را به خود می‌گیرند.
          </div>

          {/* Real-time Color Variables Status Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400">
                Primary (رنگ اصلی المنتور)
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="w-7 h-7 rounded-xl shadow-sm border border-black/10"
                  style={{ backgroundColor: appearance.lightPalette.goldPrimary }}
                />
                <span className="font-mono text-xs font-bold text-gray-800 dark:text-gray-200">
                  {appearance.lightPalette.goldPrimary}
                </span>
              </div>
              <div className="text-[10px] text-gray-400 font-mono">
                --e-global-color-primary
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400">
                Secondary (رنگ ثانویه لوکس)
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="w-7 h-7 rounded-xl shadow-sm border border-black/10"
                  style={{ backgroundColor: appearance.lightPalette.goldSecondary }}
                />
                <span className="font-mono text-xs font-bold text-gray-800 dark:text-gray-200">
                  {appearance.lightPalette.goldSecondary}
                </span>
              </div>
              <div className="text-[10px] text-gray-400 font-mono">
                --e-global-color-secondary
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400">
                Text (رنگ متون و عناوین حقوقی)
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="w-7 h-7 rounded-xl shadow-sm border border-black/10"
                  style={{ backgroundColor: appearance.lightPalette.text }}
                />
                <span className="font-mono text-xs font-bold text-gray-800 dark:text-gray-200">
                  {appearance.lightPalette.text}
                </span>
              </div>
              <div className="text-[10px] text-gray-400 font-mono">
                --e-global-color-text
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400">
                Accent (آکسان و نشانه‌ها)
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="w-7 h-7 rounded-xl shadow-sm border border-black/10"
                  style={{ backgroundColor: appearance.lightPalette.goldPrimary }}
                />
                <span className="font-mono text-xs font-bold text-gray-800 dark:text-gray-200">
                  {appearance.lightPalette.goldPrimary}
                </span>
              </div>
              <div className="text-[10px] text-gray-400 font-mono">
                --e-global-color-accent
              </div>
            </div>
          </div>

          {/* Live Elementor Widget Synchronization Simulation */}
          <div className="p-6 rounded-3xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#D4AF37]" />
                <span>پیش‌نمایش زنده المان‌های المنتور با رنگ‌های فعال پالت:</span>
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 font-bold">
                همگام‌شده با المنتور ۳.x
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Elementor Button Mockup */}
              <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-3">
                <div className="text-xs font-bold text-gray-600 dark:text-gray-300">
                  دکمه اصلی المنتور (Elementor Button)
                </div>
                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white shadow-sm flex items-center justify-center gap-2 transition-all"
                  style={{
                    backgroundColor: appearance.lightPalette.goldPrimary,
                    borderColor: appearance.lightPalette.goldSecondary,
                  }}
                >
                  <Gavel className="w-4 h-4" />
                  <span>رزرو نوبت مشاوره حقوقی</span>
                </button>
              </div>

              {/* Elementor Icon Box Mockup */}
              <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-2">
                <div className="text-xs font-bold text-gray-600 dark:text-gray-300">
                  جعبه آیکون المنتور (Icon Box)
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="p-2.5 rounded-xl text-white shadow-sm"
                    style={{ backgroundColor: appearance.lightPalette.goldPrimary }}
                  >
                    <Briefcase className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      داوری تجاری و قراردادها
                    </div>
                    <div className="text-[10px] text-gray-400">
                      پشتیبانی از پالت سراسری
                    </div>
                  </div>
                </div>
              </div>

              {/* Elementor Counter Mockup */}
              <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-1">
                <div className="text-xs font-bold text-gray-600 dark:text-gray-300">
                  شمارنده آمار (Elementor Counter)
                </div>
                <div
                  className="text-2xl font-bold font-mono"
                  style={{ color: appearance.lightPalette.goldPrimary }}
                >
                  +۱,۲۸۰
                </div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400">
                  پرونده موفق و مختومه
                </div>
              </div>
            </div>
          </div>

          {/* PHP Hook & JSON Kit Schema Snippet */}
          <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 text-gray-200 space-y-3 dir-ltr text-left">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400">
              <span>WordPress / Elementor Auto-Sync Hook (functions.php)</span>
              <span className="text-[10px] text-[#D4AF37] font-mono">Hook: sedrazavi_after_palette_update</span>
            </div>
            <pre className="font-mono text-[11px] overflow-x-auto leading-relaxed max-h-48 text-gray-300">
              <code>{`// Auto-inject theme palette to Elementor Default Kit Post Meta
add_action('sedrazavi_after_palette_update', function($palette_id) {
    $kit_id = get_option('elementor_active_kit');
    if (!$kit_id) return;
    $settings = get_post_meta($kit_id, '_elementor_page_settings', true) ?: [];
    $settings['system_colors'] = [
        ['_id' => 'primary',   'color' => '${appearance.lightPalette.goldPrimary}'],
        ['_id' => 'secondary', 'color' => '${appearance.lightPalette.goldSecondary}'],
        ['_id' => 'text',      'color' => '${appearance.lightPalette.text}'],
        ['_id' => 'accent',    'color' => '${appearance.lightPalette.goldPrimary}']
    ];
    update_post_meta($kit_id, '_elementor_page_settings', $settings);
    \\Elementor\\Plugin::$instance->files_manager->clear_cache();
});`}</code>
            </pre>
          </div>
        </div>
      )}

      {/* 2.6 Law Firm Scenarios Manager (4 Scenarios with Zero Data Loss) */}
      {activeSubTab === 'firm_scenarios' && (
        <LawFirmScenarioManager
          lawyerProfile={profile}
          onUpdateLawyerProfile={onUpdateProfile}
        />
      )}

      {/* 2.7 SEO Engine, Meta Tags & Schema Inspector */}
      {activeSubTab === 'seo_inspector' && (
        <AdminSeoInspectorTab
          profile={profile}
          onUpdateProfile={onUpdateProfile}
        />
      )}

      {/* 3. Light Palette */}
      {activeSubTab === 'light' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
            <strong>راهنما:</strong> این تنظیمات برای تم روشن (پالت روز) اعمال می‌شود. می‌توانید یکی از ۵ پالت رسمی آماده SedRazavi را با یک کلیک انتخاب نموده یا مقادیر را اختصاصی ویرایش کنید.
          </div>

          {/* 11 Ready Day Palettes (5 Original + 6 New Legal Scenarios) */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>۵ پالت اولیه استاندارد روز (SPEC Part 2.1):</span>
                </label>
                <span className="text-[11px] text-gray-400">کلاسیک، مدرن، گرم، مینیمال و لوکس</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {THEME_PALETTES.filter((p) => p.category === 'original').map((preset) => {
                  const isSelected =
                    appearance.lightPalette.bg === preset.lightColors.bg &&
                    appearance.lightPalette.goldPrimary === preset.lightColors.goldPrimary;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        const newLight = preset.lightColors;
                        setAppearance({
                          ...appearance,
                          lightPalette: newLight,
                        });
                        applyPaletteToDom(newLight, appearance.darkPalette);
                      }}
                      className={`p-3.5 rounded-2xl border text-right transition-all group flex flex-col justify-between relative ${
                        isSelected
                          ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 bg-amber-500/5 dark:bg-[#D4AF37]/10 shadow-md'
                          : 'border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]/60 bg-white dark:bg-gray-800'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2 left-2 w-5 h-5 rounded-full bg-[#D4AF37] text-[#0B132B] flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>
                      )}
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            {preset.badge}
                          </span>
                        </div>
                        <span className="block text-xs font-bold text-gray-800 dark:text-white group-hover:text-[#D4AF37] line-clamp-1">
                          {preset.title}
                        </span>
                        <span className="block text-[10px] text-gray-400 mt-0.5 line-clamp-2">
                          {preset.desc}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-700/60">
                        <span className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600" style={{ backgroundColor: preset.lightColors.bg }} title="پس‌زمینه" />
                        <span className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600" style={{ backgroundColor: preset.lightColors.text }} title="متن" />
                        <span className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600" style={{ backgroundColor: preset.lightColors.goldPrimary }} title="رنگ تأکیدی" />
                        <span className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600" style={{ backgroundColor: preset.lightColors.goldSecondary }} title="رنگ ثانویه" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6 New Legal Scenario Palettes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  <span>۶ سناریوی جدید رنگی تخصصی و پرستیژ حقوقی (New Legal Scenarios):</span>
                </label>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                  ۶ پالت اضافه شده
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {THEME_PALETTES.filter((p) => p.category === 'new-scenario').map((preset) => {
                  const isSelected =
                    appearance.lightPalette.bg === preset.lightColors.bg &&
                    appearance.lightPalette.goldPrimary === preset.lightColors.goldPrimary;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        const newLight = preset.lightColors;
                        setAppearance({
                          ...appearance,
                          lightPalette: newLight,
                        });
                        applyPaletteToDom(newLight, appearance.darkPalette);
                      }}
                      className={`p-3.5 rounded-2xl border text-right transition-all group flex flex-col justify-between relative ${
                        isSelected
                          ? 'border-emerald-500 ring-2 ring-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-md'
                          : 'border-gray-200 dark:border-gray-700 hover:border-emerald-500/60 bg-white dark:bg-gray-800'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2 left-2 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>
                      )}
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                            {preset.badge}
                          </span>
                        </div>
                        <span className="block text-xs font-bold text-gray-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          {preset.title}
                        </span>
                        <span className="block text-[11px] font-semibold text-gray-600 dark:text-gray-300 mt-1">
                          {preset.desc}
                        </span>
                        <span className="block text-[10px] text-gray-400 dark:text-gray-400 mt-1">
                          حوزه پیشنهادی: {preset.recommendedPractice}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-700/60">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600" style={{ backgroundColor: preset.lightColors.bg }} title="پس‌زمینه" />
                          <span className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600" style={{ backgroundColor: preset.lightColors.text }} title="متن" />
                          <span className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600" style={{ backgroundColor: preset.lightColors.goldPrimary }} title="رنگ تأکیدی" />
                          <span className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600" style={{ backgroundColor: preset.lightColors.goldSecondary }} title="رنگ ثانویه" />
                        </div>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold group-hover:underline">
                          انتخاب پالت روز &larr;
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                رنگ پس‌زمینه اصلی (Background):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={appearance.lightPalette.bg}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      lightPalette: { ...appearance.lightPalette, bg: e.target.value },
                    })
                  }
                  className="w-10 h-10 rounded-xl cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={appearance.lightPalette.bg}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      lightPalette: { ...appearance.lightPalette, bg: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono w-28"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                رنگ متن‌های اصلی (Text Primary):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={appearance.lightPalette.text}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      lightPalette: { ...appearance.lightPalette, text: e.target.value },
                    })
                  }
                  className="w-10 h-10 rounded-xl cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={appearance.lightPalette.text}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      lightPalette: { ...appearance.lightPalette, text: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono w-28"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                رنگ طلایی اولیه (Primary Gold Accent):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={appearance.lightPalette.goldPrimary}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      lightPalette: { ...appearance.lightPalette, goldPrimary: e.target.value },
                    })
                  }
                  className="w-10 h-10 rounded-xl cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={appearance.lightPalette.goldPrimary}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      lightPalette: { ...appearance.lightPalette, goldPrimary: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono w-28"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                رنگ طلایی متالیک ثانویه (Secondary Gold):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={appearance.lightPalette.goldSecondary}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      lightPalette: { ...appearance.lightPalette, goldSecondary: e.target.value },
                    })
                  }
                  className="w-10 h-10 rounded-xl cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={appearance.lightPalette.goldSecondary}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      lightPalette: { ...appearance.lightPalette, goldSecondary: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono w-28"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                رنگ کادر و خطوط حاشیه (Border):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={appearance.lightPalette.border}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      lightPalette: { ...appearance.lightPalette, border: e.target.value },
                    })
                  }
                  className="w-10 h-10 rounded-xl cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={appearance.lightPalette.border}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      lightPalette: { ...appearance.lightPalette, border: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono w-28"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Dark Palette */}
      {activeSubTab === 'dark' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-900 dark:text-indigo-200">
            <strong>راهنما:</strong> پالت‌های حالت شب (Dark Mode). می‌توانید از میان ۵ پالت آماده منطبق با استانداردهای SedRazavi انتخاب نموده یا مقادیر را تنظیم فرمایید.
          </div>

          {/* 11 Ready Dark Palettes (5 Original + 6 New Legal Scenarios) */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>۵ پالت اولیه استاندارد شب (SPEC Part 2.1):</span>
                </label>
                <span className="text-[11px] text-gray-400">کلاسیک شب، مدرن، گرم، مینیمال و لوکس</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {THEME_PALETTES.filter((p) => p.category === 'original').map((preset) => {
                  const isSelected =
                    appearance.darkPalette.bg === preset.darkColors.bg &&
                    appearance.darkPalette.goldPrimary === preset.darkColors.goldPrimary;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        const newDark = preset.darkColors;
                        setAppearance({
                          ...appearance,
                          darkPalette: newDark,
                        });
                        applyPaletteToDom(appearance.lightPalette, newDark);
                      }}
                      className={`p-3.5 rounded-2xl border text-right transition-all group flex flex-col justify-between relative ${
                        isSelected
                          ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 bg-[#D4AF37]/10 shadow-md'
                          : 'border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]/60 bg-white dark:bg-gray-800'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2 left-2 w-5 h-5 rounded-full bg-[#D4AF37] text-[#0B132B] flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>
                      )}
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            {preset.badge}
                          </span>
                        </div>
                        <span className="block text-xs font-bold text-gray-800 dark:text-white group-hover:text-[#D4AF37] line-clamp-1">
                          {preset.title}
                        </span>
                        <span className="block text-[10px] text-gray-400 mt-0.5 line-clamp-2">
                          {preset.desc}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-700/60">
                        <span className="w-4 h-4 rounded-full border border-gray-600" style={{ backgroundColor: preset.darkColors.bg }} title="پس‌زمینه" />
                        <span className="w-4 h-4 rounded-full border border-gray-600" style={{ backgroundColor: preset.darkColors.cardBg }} title="کارت‌ها" />
                        <span className="w-4 h-4 rounded-full border border-gray-600" style={{ backgroundColor: preset.darkColors.text }} title="متن" />
                        <span className="w-4 h-4 rounded-full border border-gray-600" style={{ backgroundColor: preset.darkColors.goldPrimary }} title="تأکیدی / درخشش" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6 New Legal Scenario Palettes (Night) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-400" />
                  <span>۶ سناریوی جدید رنگی تخصصی و پرستیژ حقوقی در حالت شب (New Night Scenarios):</span>
                </label>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20">
                  ۶ پالت شب اضافه شده
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {THEME_PALETTES.filter((p) => p.category === 'new-scenario').map((preset) => {
                  const isSelected =
                    appearance.darkPalette.bg === preset.darkColors.bg &&
                    appearance.darkPalette.goldPrimary === preset.darkColors.goldPrimary;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        const newDark = preset.darkColors;
                        setAppearance({
                          ...appearance,
                          darkPalette: newDark,
                        });
                        applyPaletteToDom(appearance.lightPalette, newDark);
                      }}
                      className={`p-3.5 rounded-2xl border text-right transition-all group flex flex-col justify-between relative ${
                        isSelected
                          ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-950/20 shadow-md'
                          : 'border-gray-200 dark:border-gray-700 hover:border-indigo-500/60 bg-white dark:bg-gray-800'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2 left-2 w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>
                      )}
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                            {preset.badge}
                          </span>
                        </div>
                        <span className="block text-xs font-bold text-gray-800 dark:text-white group-hover:text-indigo-400">
                          {preset.title}
                        </span>
                        <span className="block text-[11px] font-semibold text-gray-400 mt-1">
                          {preset.desc}
                        </span>
                        <span className="block text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                          حوزه پیشنهادی: {preset.recommendedPractice}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-700/60">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full border border-gray-600" style={{ backgroundColor: preset.darkColors.bg }} title="پس‌زمینه شب" />
                          <span className="w-4 h-4 rounded-full border border-gray-600" style={{ backgroundColor: preset.darkColors.cardBg }} title="کارت‌ها" />
                          <span className="w-4 h-4 rounded-full border border-gray-600" style={{ backgroundColor: preset.darkColors.text }} title="متن" />
                          <span className="w-4 h-4 rounded-full border border-gray-600" style={{ backgroundColor: preset.darkColors.goldPrimary }} title="تأکیدی / نئون" />
                        </div>
                        <span className="text-[10px] text-indigo-400 font-bold group-hover:underline">
                          انتخاب پالت شب &larr;
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                پس‌زمینه عمیق شب (Deep Navy Background):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={appearance.darkPalette.bg}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      darkPalette: { ...appearance.darkPalette, bg: e.target.value },
                    })
                  }
                  className="w-10 h-10 rounded-xl cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={appearance.darkPalette.bg}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      darkPalette: { ...appearance.darkPalette, bg: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono w-28"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                رنگ پس‌زمینه کارت‌ها در شب (Dark Card Background):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={appearance.darkPalette.cardBg}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      darkPalette: { ...appearance.darkPalette, cardBg: e.target.value },
                    })
                  }
                  className="w-10 h-10 rounded-xl cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={appearance.darkPalette.cardBg}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      darkPalette: { ...appearance.darkPalette, cardBg: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono w-28"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                رنگ متن روشن در شب (Light Text):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={appearance.darkPalette.text}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      darkPalette: { ...appearance.darkPalette, text: e.target.value },
                    })
                  }
                  className="w-10 h-10 rounded-xl cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={appearance.darkPalette.text}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      darkPalette: { ...appearance.darkPalette, text: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono w-28"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                درخشش طلایی کارت‌ها (Gold Glow Effect):
              </label>
              <input
                type="text"
                value={appearance.darkPalette.goldGlow}
                onChange={(e) =>
                  setAppearance({
                    ...appearance,
                    darkPalette: { ...appearance.darkPalette, goldGlow: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Typography */}
      {activeSubTab === 'typography' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                قلم اصلی عناوین (Heading Font Family):
              </label>
              <select
                value={appearance.typography.headingFont}
                onChange={(e) =>
                  setAppearance({
                    ...appearance,
                    typography: { ...appearance.typography, headingFont: e.target.value },
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium"
              >
                <option value="Vazirmatn">وزیرمتن (Vazirmatn - پیش‌فرض استاندارد حقوقی)</option>
                <option value="IRANYekan">ایران‌یکان (IRANYekan)</option>
                <option value="Samim">صمیم (Samim)</option>
                <option value="Shabnam">شبنم (Shabnam)</option>
                <option value="Nastaliq">ایران نستعلیق (برای اشعار و احادیث)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                قلم متن‌های بدنه (Body Font Family):
              </label>
              <select
                value={appearance.typography.bodyFont}
                onChange={(e) =>
                  setAppearance({
                    ...appearance,
                    typography: { ...appearance.typography, bodyFont: e.target.value },
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium"
              >
                <option value="Vazirmatn">وزیرمتن (Vazirmatn)</option>
                <option value="IRANSans">ایران‌سنس (IRANSans)</option>
                <option value="YekanBakh">یکان‌بخش (YekanBakh)</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  اندازه فونت پایه بدنه:
                </span>
                <span className="font-mono font-bold text-[#D4AF37]">
                  {appearance.typography.baseFontSize}px
                </span>
              </div>
              <input
                type="range"
                min="14"
                max="20"
                step="1"
                value={appearance.typography.baseFontSize}
                onChange={(e) =>
                  setAppearance({
                    ...appearance,
                    typography: {
                      ...appearance.typography,
                      baseFontSize: Number(e.target.value),
                    },
                  })
                }
                className="w-full accent-[#D4AF37]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  فاصله بین خطوط (Line Height):
                </span>
                <span className="font-mono font-bold text-[#D4AF37]">
                  {appearance.typography.lineHeight}
                </span>
              </div>
              <input
                type="range"
                min="1.4"
                max="2.0"
                step="0.05"
                value={appearance.typography.lineHeight}
                onChange={(e) =>
                  setAppearance({
                    ...appearance,
                    typography: {
                      ...appearance.typography,
                      lineHeight: Number(e.target.value),
                    },
                  })
                }
                className="w-full accent-[#D4AF37]"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. Advanced */}
      {activeSubTab === 'advanced' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  شعاع انحنای گوشه‌ها (Border Radius):
                </span>
                <span className="font-mono font-bold text-[#D4AF37]">
                  {appearance.advanced.borderRadius}px
                </span>
              </div>
              <input
                type="range"
                min="6"
                max="28"
                step="2"
                value={appearance.advanced.borderRadius}
                onChange={(e) =>
                  setAppearance({
                    ...appearance,
                    advanced: {
                      ...appearance.advanced,
                      borderRadius: Number(e.target.value),
                    },
                  })
                }
                className="w-full accent-[#D4AF37]"
              />
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={appearance.advanced.enableAnimations}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      advanced: {
                        ...appearance.advanced,
                        enableAnimations: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  فعال بودن انیمیشن‌های نرم ورود المان‌ها
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={appearance.advanced.buttonPulse}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      advanced: {
                        ...appearance.advanced,
                        buttonPulse: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  افکت پالس ملایم دکمه رزرو نوبت و تماس سریع
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={appearance.advanced.hoverLift}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      advanced: {
                        ...appearance.advanced,
                        hoverLift: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  بالا آمدن نرم کارت‌ها هنگام هاور ماوس (Hover Lift)
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* 5. Live Preview */}
      {activeSubTab === 'preview' && (
        <div className="space-y-6">
          {/* Quick 1-Click Suite Applicator */}
          <div className="p-5 rounded-3xl bg-gradient-to-l from-amber-500/10 via-[#D4AF37]/5 to-transparent border border-[#D4AF37]/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#D4AF37]" />
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  تست سریع و اعمال همزمان ست دوقلو (پالت روز + پالت شب با هم):
                </h4>
              </div>
              <span className="text-xs text-[#D4AF37] font-bold">۱۱ سناریوی آماده</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              با انتخاب هر ست، هر دو حالت روزانه و شبانه متناسب با حوزه حقوقی مربوطه فوراً تنظیم، ذخیره و در سایت اعمال می‌شوند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 pt-1">
              {THEME_PALETTES.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleApplyFullSuite(preset)}
                  className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-[#D4AF37] text-right transition-all flex flex-col justify-between group shadow-sm hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#D4AF37]">
                      {preset.title.split('.')[1] || preset.title}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500">
                      {preset.badge}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-1">
                      <span className="w-3.5 h-3.5 rounded-full border border-gray-300" style={{ backgroundColor: preset.lightColors.goldPrimary }} title="روز" />
                      <span className="w-3.5 h-3.5 rounded-full border border-gray-600" style={{ backgroundColor: preset.darkColors.bg }} title="شب" />
                    </div>
                    <span className="text-[10px] text-[#D4AF37] font-bold">اعمال ست &larr;</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 block mb-4">
              نمونه زنده کارت خدمت حقوقی با تنظیمات انتخابی فعلی شما:
            </span>

            <div
              className="p-6 transition-all duration-300 max-w-md mx-auto shadow-lg"
              style={{
                borderRadius: `${appearance.advanced.borderRadius}px`,
                backgroundColor: appearance.lightPalette.bg,
                color: appearance.lightPalette.text,
                borderColor: appearance.lightPalette.border,
                borderWidth: '1px',
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-md"
                  style={{
                    backgroundColor: `${appearance.lightPalette.goldPrimary}20`,
                    color: appearance.lightPalette.goldSecondary,
                  }}
                >
                  داوری و تنظیم قرارداد
                </span>
                <span className="text-[11px] text-gray-400 font-mono">ونک - تهران</span>
              </div>

              <h4
                className="text-lg font-bold mt-3 font-serif"
                style={{ color: appearance.lightPalette.text }}
              >
                تنظیم قراردادهای ملکی و داوری تجاری
              </h4>

              <p
                className="text-xs mt-2 text-gray-600 leading-relaxed"
                style={{
                  fontSize: `${appearance.typography.baseFontSize - 2}px`,
                  lineHeight: appearance.typography.lineHeight,
                }}
              >
                این نمونه پیش‌نمایش نحوه اعمال رنگ‌ها، شعاع انحنا، قلم و فواصل بین خطوط را به صورت لحظه‌ای نشان می‌دهد.
              </p>

              <div className="mt-4 pt-3 flex items-center justify-between">
                <button
                  className="px-4 py-2 text-xs font-bold rounded-xl text-white shadow-md flex items-center gap-1.5"
                  style={{
                    backgroundColor: appearance.lightPalette.goldPrimary,
                    borderRadius: `${Math.max(8, appearance.advanced.borderRadius - 4)}px`,
                  }}
                >
                  <span>رزرو وقت مشاوره</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-gray-500 font-medium">دکتر سیده مریم رضوی</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Save, Reset & Export */}
      {activeSubTab === 'save_reset' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300">
            <strong>ذخیره سراسری:</strong> با کلیک روی ذخیره، تنظیمات روی کل وب‌سایت اعمال شده و در کد CSS پوسته خروجی ذخیره خواهد شد.
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSave}
              className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>ذخیره کلیه تنظیمات ظاهری در سایت</span>
            </button>

            <button
              onClick={handleCopyCss}
              className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 border border-gray-300 dark:border-gray-700"
            >
              {copiedCss ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCss ? 'کد CSS کپی شد!' : 'کپی متغیرهای CSS'}</span>
            </button>

            <button
              onClick={handleDownloadCss}
              className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 border border-gray-300 dark:border-gray-700"
            >
              <Download className="w-4 h-4 text-[#D4AF37]" />
              <span>دانلود فایل CSS سفارشی</span>
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-2 border border-red-200 dark:border-red-800 mr-auto"
            >
              <RotateCcw className="w-4 h-4" />
              <span>بازنشانی به پالت پیش‌فرض</span>
            </button>
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>تنظیمات ظاهری با موفقیت ذخیره و در پوسته اعمال شد.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
