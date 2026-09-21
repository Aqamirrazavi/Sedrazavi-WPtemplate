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
} from 'lucide-react';

interface AdminAppearanceTabProps {
  profile: LawyerSiteProfile;
  onUpdateProfile: (updated: LawyerSiteProfile) => void;
}

export const AdminAppearanceTab: React.FC<AdminAppearanceTabProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'light' | 'dark' | 'typography' | 'advanced' | 'preview' | 'save_reset'
  >('light');

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

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);

  const handleSave = () => {
    const updated: LawyerSiteProfile = {
      ...profile,
      appearance,
    };
    saveLawyerProfile(updated);
    onUpdateProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
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

        {/* 6 Sub-Tab Navigation Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveSubTab('light')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'light'
                ? 'bg-white dark:bg-[#0B132B] text-amber-600 dark:text-[#F3E5AB] shadow-sm border border-[#D4AF37]/40'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>۱. پالت روز</span>
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
            <span>۲. پالت شب</span>
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
            <span>۳. تایپوگرافی</span>
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
            <span>۴. پیشرفته</span>
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
            <span>۵. پیش‌نمایش زنده</span>
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
            <span>۶. ذخیره و خروجی</span>
          </button>
        </div>
      </div>

      {/* Content for each tab */}
      {/* 1. Light Palette */}
      {activeSubTab === 'light' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
            <strong>راهنما:</strong> این تنظیمات برای تم روشن (پالت روز) اعمال می‌شود. می‌توانید یکی از ۵ پالت رسمی آماده SedRazavi را با یک کلیک انتخاب نموده یا مقادیر را اختصاصی ویرایش کنید.
          </div>

          {/* 5 Ready Day Palettes (Part 2.1) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
              انتخاب سریع از میان ۵ پالت آماده روز (SPEC Part 2.1):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {[
                {
                  id: 'classic-day',
                  title: '۱. کلاسیک SedRazavi (پیش‌فرض)',
                  desc: 'سرمه‌ای + طلایی',
                  colors: { bg: '#F4F6F9', text: '#1C2541', goldPrimary: '#D4AF37', goldSecondary: '#B8960F', border: '#E0E4EC' },
                },
                {
                  id: 'modern-day',
                  title: '۲. مدرن',
                  desc: 'آبی نفتی + سفید',
                  colors: { bg: '#FFFFFF', text: '#2C3E50', goldPrimary: '#3498DB', goldSecondary: '#2980B9', border: '#DEE2E6' },
                },
                {
                  id: 'warm-day',
                  title: '۳. گرم',
                  desc: 'قهوه‌ای + کرم + طلایی',
                  colors: { bg: '#FDF6E3', text: '#5D4037', goldPrimary: '#D4AF37', goldSecondary: '#B8960F', border: '#E8DCC8' },
                },
                {
                  id: 'minimal-day',
                  title: '۴. مینیمال',
                  desc: 'مشکی + سفید',
                  colors: { bg: '#FAFAFA', text: '#212121', goldPrimary: '#000000', goldSecondary: '#424242', border: '#E0E0E0' },
                },
                {
                  id: 'luxury-day',
                  title: '۵. لوکس',
                  desc: 'بنفش سلطنتی + زرین',
                  colors: { bg: '#F3E5F5', text: '#4A148C', goldPrimary: '#FFD700', goldSecondary: '#FFA000', border: '#E1BEE7' },
                },
              ].map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() =>
                    setAppearance({
                      ...appearance,
                      lightPalette: preset.colors,
                    })
                  }
                  className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#D4AF37] bg-white dark:bg-gray-800 text-right transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="block text-[11px] font-bold text-gray-800 dark:text-white group-hover:text-[#D4AF37]">
                      {preset.title}
                    </span>
                    <span className="block text-[10px] text-gray-400 mt-0.5">
                      {preset.desc}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <span className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: preset.colors.bg }} title="پس‌زمینه" />
                    <span className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: preset.colors.text }} title="متن" />
                    <span className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: preset.colors.goldPrimary }} title="تأکیدی" />
                  </div>
                </button>
              ))}
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

          {/* 5 Ready Dark Palettes (Part 2.1) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
              انتخاب سریع از میان ۵ پالت آماده شب (SPEC Part 2.1):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {[
                {
                  id: 'classic-night',
                  title: '۱. کلاسیک شب (پیش‌فرض)',
                  desc: 'سرمه‌ای تیره + طلایی',
                  colors: { bg: '#0B132B', cardBg: '#1A2A4A', text: '#E8ECF1', goldPrimary: '#D4AF37', goldGlow: 'rgba(212, 175, 55, 0.4)' },
                },
                {
                  id: 'modern-night',
                  title: '۲. مدرن شب',
                  desc: 'آبی تیره + نفتی روشن',
                  colors: { bg: '#1A1A2E', cardBg: '#252540', text: '#EAEAEA', goldPrimary: '#3498DB', goldGlow: 'rgba(52, 152, 219, 0.4)' },
                },
                {
                  id: 'warm-night',
                  title: '۳. گرم شب',
                  desc: 'قهوه‌ای تیره + طلایی گرم',
                  colors: { bg: '#2D1B0E', cardBg: '#3D2817', text: '#F5E6D3', goldPrimary: '#D4A574', goldGlow: 'rgba(212, 165, 116, 0.4)' },
                },
                {
                  id: 'minimal-night',
                  title: '۴. مینیمال شب',
                  desc: 'مشکی + خاکستری روشن',
                  colors: { bg: '#121212', cardBg: '#1E1E1E', text: '#E0E0E0', goldPrimary: '#FFFFFF', goldGlow: 'rgba(255, 255, 255, 0.3)' },
                },
                {
                  id: 'luxury-night',
                  title: '۵. لوکس شب',
                  desc: 'بنفش عمیق + طلایی درخشان',
                  colors: { bg: '#1A0B2E', cardBg: '#2A1545', text: '#E8D5F0', goldPrimary: '#FFD700', goldGlow: 'rgba(255, 215, 0, 0.45)' },
                },
              ].map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() =>
                    setAppearance({
                      ...appearance,
                      darkPalette: preset.colors,
                    })
                  }
                  className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#D4AF37] bg-white dark:bg-gray-800 text-right transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="block text-[11px] font-bold text-gray-800 dark:text-white group-hover:text-[#D4AF37]">
                      {preset.title}
                    </span>
                    <span className="block text-[10px] text-gray-400 mt-0.5">
                      {preset.desc}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <span className="w-4 h-4 rounded-full border border-gray-600" style={{ backgroundColor: preset.colors.bg }} title="پس‌زمینه" />
                    <span className="w-4 h-4 rounded-full border border-gray-600" style={{ backgroundColor: preset.colors.cardBg }} title="کارت‌ها" />
                    <span className="w-4 h-4 rounded-full border border-gray-600" style={{ backgroundColor: preset.colors.goldPrimary }} title="تأکیدی" />
                  </div>
                </button>
              ))}
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
