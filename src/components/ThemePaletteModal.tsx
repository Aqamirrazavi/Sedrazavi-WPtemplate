import React, { useState } from 'react';
import {
  X,
  Palette,
  Sun,
  Moon,
  Check,
  Sparkles,
  Shield,
  Briefcase,
  Zap,
  Sliders,
} from 'lucide-react';
import { THEME_PALETTES, ThemePalettePreset } from '../data/themePalettes';
import { applyPaletteToDom } from '../utils/themePaletteApplier';
import {
  getStoredLawyerProfile,
  saveLawyerProfile,
  LawyerSiteProfile,
} from '../utils/lawyerCustomizationStorage';
import { useDesignTokens } from '../context/DesignTokensContext';

interface ThemePaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const ThemePaletteModal: React.FC<ThemePaletteModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const { updateToken } = useDesignTokens();
  const [profile, setProfile] = useState<LawyerSiteProfile>(() => getStoredLawyerProfile());
  const [filterCategory, setFilterCategory] = useState<'all' | 'new-scenario' | 'original'>('all');
  const [justAppliedId, setJustAppliedId] = useState<string | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentAppearance = profile.appearance || {
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
  };

  const handleSelectPalette = (preset: ThemePalettePreset, applyMode: 'both' | 'current') => {
    let nextLight = currentAppearance.lightPalette;
    let nextDark = currentAppearance.darkPalette;

    if (applyMode === 'both') {
      nextLight = preset.lightColors;
      nextDark = preset.darkColors;
    } else if (isDarkMode) {
      nextDark = preset.darkColors;
    } else {
      nextLight = preset.lightColors;
    }

    const nextAppearance = {
      ...currentAppearance,
      lightPalette: nextLight,
      darkPalette: nextDark,
    };

    const updatedProfile: LawyerSiteProfile = {
      ...profile,
      appearance: nextAppearance,
    };

    setProfile(updatedProfile);
    saveLawyerProfile(updatedProfile);

    // Apply live CSS variables to DOM
    applyPaletteToDom(nextLight, nextDark);

    // Sync design tokens
    updateToken('color.primary', nextLight.goldPrimary);
    updateToken('color.secondary', nextLight.goldSecondary);
    updateToken('color.background', nextLight.bg);
    updateToken('color.text', nextLight.text);

    setJustAppliedId(preset.id);
    setTimeout(() => setJustAppliedId(null), 2500);
  };

  const filteredPalettes = THEME_PALETTES.filter((p) => {
    if (filterCategory === 'all') return true;
    return p.category === filterCategory;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="theme-palette-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#0B132B] w-full max-w-4xl max-h-[90vh] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col overflow-hidden text-right"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between shrink-0 bg-gradient-to-l from-amber-500/10 via-transparent to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 id="theme-palette-modal-title" className="text-lg font-bold text-gray-900 dark:text-white font-serif flex items-center gap-2">
                <span>انتخاب سناریو و پالت رنگی تم</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-sans font-bold">
                  ۱۱ سناریو
                </span>
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                تغییر و ذخیره سریع رنگ‌بندی پوسته برای هر دو حالت روزانه و شبانه
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Day / Night Switcher inside Modal */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 hover:border-[#D4AF37] transition-all"
              title="سوئیچ بین روز و شب"
            >
              {isDarkMode ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>حالت شب فعال</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>حالت روز فعال</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center rounded-2xl text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
              aria-label="بستن پنجره"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills & Stats */}
        <div className="px-6 py-3 bg-gray-50/80 dark:bg-gray-900/60 border-b border-gray-100 dark:border-gray-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterCategory === 'all'
                  ? 'bg-[#D4AF37] text-[#0B132B] shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:text-[#D4AF37]'
              }`}
            >
              همه ۱۱ پالت
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('new-scenario')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterCategory === 'new-scenario'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>۶ سناریوی جدید حقوقی</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('original')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterCategory === 'original'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 hover:bg-indigo-50 dark:hover:bg-indigo-950/30'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>۵ پالت اولیه پوسته</span>
            </button>
          </div>

          <span className="text-[11px] text-gray-500 dark:text-gray-400">
            حالت مشاهده رنگ‌ها: <strong>{isDarkMode ? 'پالت‌های شب' : 'پالت‌های روز'}</strong>
          </span>
        </div>

        {/* Palettes Grid */}
        <div className="p-6 overflow-y-auto space-y-4 max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPalettes.map((preset) => {
              const activeColors = isDarkMode ? preset.darkColors : preset.lightColors;
              const isCurrentlyActive = isDarkMode
                ? currentAppearance.darkPalette.bg === preset.darkColors.bg &&
                  currentAppearance.darkPalette.goldPrimary === preset.darkColors.goldPrimary
                : currentAppearance.lightPalette.bg === preset.lightColors.bg &&
                  currentAppearance.lightPalette.goldPrimary === preset.lightColors.goldPrimary;

              const isJustApplied = justAppliedId === preset.id;

              return (
                <div
                  key={preset.id}
                  className={`p-4 rounded-2xl border transition-all relative flex flex-col justify-between ${
                    isCurrentlyActive
                      ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 bg-amber-500/5 dark:bg-[#D4AF37]/10 shadow-lg'
                      : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/80 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  {/* Top Tags */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                          preset.category === 'new-scenario'
                            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                            : 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30'
                        }`}
                      >
                        {preset.badge}
                      </span>

                      {isCurrentlyActive && (
                        <span className="text-[10px] font-bold text-[#D4AF37] flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>فعال روی سایت</span>
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white line-clamp-1">
                      {preset.title}
                    </h4>

                    <p className="text-[11px] text-gray-500 dark:text-gray-300 mt-1 line-clamp-2">
                      {preset.desc}
                    </p>

                    <div className="mt-2 p-2 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800/60">
                      <span className="block text-[10px] text-gray-400">حوزه حقوقی پیشنهادی:</span>
                      <span className="block text-[11px] font-semibold text-gray-700 dark:text-gray-200 mt-0.5">
                        {preset.recommendedPractice}
                      </span>
                    </div>
                  </div>

                  {/* Swatches & Action Buttons */}
                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] text-gray-400">
                        {isDarkMode ? 'طیف شبانه:' : 'طیف روزانه:'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 shadow-inner"
                          style={{ backgroundColor: activeColors.bg }}
                          title="پس‌زمینه"
                        />
                        {isDarkMode && 'cardBg' in activeColors && (
                          <span
                            className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 shadow-inner"
                            style={{ backgroundColor: (activeColors as any).cardBg }}
                            title="کارت‌ها"
                          />
                        )}
                        <span
                          className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 shadow-inner"
                          style={{ backgroundColor: activeColors.text }}
                          title="متن"
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 shadow-inner"
                          style={{ backgroundColor: activeColors.goldPrimary }}
                          title="تأکیدی / طلایی"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelectPalette(preset, 'current')}
                        className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all text-center ${
                          isCurrentlyActive
                            ? 'bg-[#D4AF37] text-[#0B132B] border-[#D4AF37]'
                            : 'border-gray-200 dark:border-gray-700 hover:border-[#D4AF37] text-gray-700 dark:text-gray-200'
                        }`}
                      >
                        {isJustApplied ? 'اعمال شد ✓' : `اعمال برای ${isDarkMode ? 'شب' : 'روز'}`}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectPalette(preset, 'both')}
                        className="py-1.5 px-2 rounded-xl text-[11px] font-bold bg-gray-100 dark:bg-gray-700 hover:bg-[#D4AF37] hover:text-[#0B132B] text-gray-800 dark:text-gray-100 transition-all text-center"
                      >
                        اعمال ست کامل (روز+شب)
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 flex items-center justify-between shrink-0">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            نکته: انتخاب هر پالت بلادرنگ در تمام بخش‌های وب‌سایت اعمال شده و در تنظیمات ذخیره می‌گردد.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0B132B] dark:bg-white text-white dark:text-[#0B132B] font-bold text-xs hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-[#0B132B] transition-all"
          >
            تأیید و بستن
          </button>
        </div>
      </div>
    </div>
  );
};
