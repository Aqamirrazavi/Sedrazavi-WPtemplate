import React, { useState } from 'react';
import {
  LawyerSiteProfile,
  saveLawyerProfile,
} from '../../utils/lawyerCustomizationStorage';
import { BannerSlide, DEFAULT_BANNER_SLIDES } from '../TextBannerSlider';
import {
  Sliders,
  List,
  PlusCircle,
  Settings,
  Eye,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit2,
  Check,
  Sparkles,
  BookOpen,
  Quote,
  Clock,
  RotateCw,
  Copy,
} from 'lucide-react';

interface AdminBannerTabProps {
  profile: LawyerSiteProfile;
  onUpdateProfile: (updated: LawyerSiteProfile) => void;
}

export const AdminBannerTab: React.FC<AdminBannerTabProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'list' | 'form' | 'settings' | 'preview'
  >('list');

  const [slides, setSlides] = useState<BannerSlide[]>(
    profile.bannerSlides && profile.bannerSlides.length > 0
      ? profile.bannerSlides
      : DEFAULT_BANNER_SLIDES
  );

  const [bannerSettings, setBannerSettings] = useState(
    profile.bannerSettings || {
      autoRotateSeconds: 5,
      pauseOnHover: true,
      enableCopyButton: true,
    }
  );

  const [showBannerSlider, setShowBannerSlider] = useState<boolean>(
    profile.showBannerSlider ?? true
  );

  // Form editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formArabic, setFormArabic] = useState('');
  const [formPersian, setFormPersian] = useState('');
  const [formSource, setFormSource] = useState('');
  const [formCategory, setFormCategory] = useState<'حدیث' | 'شعر' | 'حکمت' | 'قانون'>('حدیث');
  const [formIsActive, setFormIsActive] = useState(true);

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Reset form
  const resetForm = () => {
    setEditingId(null);
    setFormArabic('');
    setFormPersian('');
    setFormSource('');
    setFormCategory('حدیث');
    setFormIsActive(true);
  };

  const handleStartEdit = (slide: BannerSlide) => {
    setEditingId(slide.id);
    setFormArabic(slide.arabicText || '');
    setFormPersian(slide.persianText);
    setFormSource(slide.source);
    setFormCategory(slide.category || 'حدیث');
    setFormIsActive(slide.isActive);
    setActiveSubTab('form');
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPersian.trim() || !formSource.trim()) return;

    let updatedSlides: BannerSlide[];
    if (editingId) {
      updatedSlides = slides.map((s) =>
        s.id === editingId
          ? {
              ...s,
              text: formArabic.trim() || formPersian.trim(),
              translation: formArabic.trim() ? formPersian.trim() : undefined,
              arabicText: formArabic.trim() || undefined,
              persianText: formPersian.trim(),
              source: formSource.trim(),
              category: formCategory,
              isActive: formIsActive,
            }
          : s
      );
    } else {
      const newSlide: BannerSlide = {
        id: `slide-${Date.now()}`,
        text: formArabic.trim() || formPersian.trim(),
        translation: formArabic.trim() ? formPersian.trim() : undefined,
        arabicText: formArabic.trim() || undefined,
        persianText: formPersian.trim(),
        source: formSource.trim(),
        category: formCategory,
        isActive: formIsActive,
        order: slides.length + 1,
      };
      updatedSlides = [...slides, newSlide];
    }

    setSlides(updatedSlides);
    commitChanges(updatedSlides, bannerSettings, showBannerSlider);
    resetForm();
    setActiveSubTab('list');
  };

  const handleDeleteSlide = (id: string) => {
    if (confirm('آیا از حذف این اسلاید مطمئن هستید؟')) {
      const updated = slides.filter((s) => s.id !== id);
      setSlides(updated);
      commitChanges(updated, bannerSettings, showBannerSlider);
    }
  };

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    const newSlides = [...slides];
    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIndex];
    newSlides[targetIndex] = temp;

    setSlides(newSlides);
    commitChanges(newSlides, bannerSettings, showBannerSlider);
  };

  const handleToggleActive = (id: string) => {
    const updated = slides.map((s) =>
      s.id === id ? { ...s, isActive: !s.isActive } : s
    );
    setSlides(updated);
    commitChanges(updated, bannerSettings, showBannerSlider);
  };

  const commitChanges = (
    newSlides: BannerSlide[],
    newSettings = bannerSettings,
    newShow = showBannerSlider
  ) => {
    const updated: LawyerSiteProfile = {
      ...profile,
      bannerSlides: newSlides,
      bannerSettings: newSettings,
      showBannerSlider: newShow,
    };
    saveLawyerProfile(updated);
    onUpdateProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Preview index state
  const [previewIndex, setPreviewIndex] = useState(0);
  const activeSlidesForPreview = slides.filter((s) => s.isActive);
  const currentPreviewSlide = activeSlidesForPreview[previewIndex % (activeSlidesForPreview.length || 1)];

  return (
    <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <Quote className="w-6 h-6 text-[#D4AF37]" />
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
              مدیریت بنر اسلایدر متنی احادیث و اشعار (فاز ۳)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            ویرایش، افزودن، تغییر ترتیب و تنظیمات زمان چرخش کلمات حکمت‌آمیز و آیات قرآن بالای سایت.
          </p>
        </div>

        {/* 4 Tabs Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveSubTab('list')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'list'
                ? 'bg-white dark:bg-[#0B132B] text-[#D4AF37] shadow-sm border border-[#D4AF37]/40'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B]'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>۱. لیست اسلایدها ({slides.length})</span>
          </button>

          <button
            onClick={() => {
              if (activeSubTab !== 'form') resetForm();
              setActiveSubTab('form');
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'form'
                ? 'bg-white dark:bg-[#0B132B] text-emerald-600 dark:text-emerald-400 shadow-sm border border-[#D4AF37]/40'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B]'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{editingId ? '۲. ویرایش اسلاید' : '۲. افزودن اسلاید جدید'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('settings')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'settings'
                ? 'bg-white dark:bg-[#0B132B] text-indigo-600 dark:text-indigo-400 shadow-sm border border-[#D4AF37]/40'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>۳. تنظیمات اسلایدر</span>
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
            <span>۴. پیش‌نمایش زنده</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>تغییرات اسلایدر با موفقیت ذخیره شد.</span>
        </div>
      )}

      {/* 1. Slide List Tab */}
      {activeSubTab === 'list' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
              ترتیب نمایش اسلایدها را با دکمه‌های بالا/پایین مرتب کنید یا وضعیت فعال بودن را تغییر دهید:
            </span>
            <button
              onClick={() => {
                resetForm();
                setActiveSubTab('form');
              }}
              className="btn-gold px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>افزودن حدیث یا شعر جدید</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  slide.isActive
                    ? 'bg-gray-50/70 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700'
                    : 'bg-gray-100/40 dark:bg-gray-900/40 border-dashed border-gray-300 dark:border-gray-800 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[11px] font-bold">
                        {slide.category || 'حکمت'}
                      </span>
                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                        {slide.source}
                      </span>
                    </div>
                    {slide.arabicText && (
                      <p className="text-xs text-amber-700 dark:text-amber-300/80 font-serif" dir="rtl">
                        «{slide.arabicText}»
                      </p>
                    )}
                    <p className="text-xs font-medium text-[#0B132B] dark:text-gray-200 leading-relaxed">
                      {slide.persianText}
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => handleToggleActive(slide.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                      slide.isActive
                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                        : 'bg-gray-200 dark:bg-gray-800 text-gray-500 border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    {slide.isActive ? 'فعال' : 'غیرفعال'}
                  </button>

                  <button
                    disabled={idx === 0}
                    onClick={() => handleMoveSlide(idx, 'up')}
                    className="p-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-[#D4AF37] disabled:opacity-30"
                    title="انتقال به بالا"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>

                  <button
                    disabled={idx === slides.length - 1}
                    onClick={() => handleMoveSlide(idx, 'down')}
                    className="p-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-[#D4AF37] disabled:opacity-30"
                    title="انتقال به پایین"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleStartEdit(slide)}
                    className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
                    title="ویرایش"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteSlide(slide.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Slide Form Tab */}
      {activeSubTab === 'form' && (
        <form onSubmit={handleSaveForm} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                دسته‌بندی اسلاید:
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium"
              >
                <option value="حدیث">حدیث معصومین (ع)</option>
                <option value="شعر">بیت شعر حقوقی و اخلاقی</option>
                <option value="حکمت">حکمت و سخن بزرگان</option>
                <option value="قانون">اصل حقوقی / قانون اساسی</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                منبع یا گوینده (Source):
              </label>
              <input
                type="text"
                placeholder="مثال: امیرالمؤمنین امام علی (ع) / سعدی شیرازی"
                value={formSource}
                onChange={(e) => setFormSource(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
              متن عربی (اختیاری):
            </label>
            <input
              type="text"
              dir="rtl"
              placeholder="مثال: اَلْعَدْلُ أَسَاسٌ بِهِ قِوَامُ اَلْعَالَمِ"
              value={formArabic}
              onChange={(e) => setFormArabic(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-serif"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
              متن ترجمه یا شعر فارسی (الزامی):
            </label>
            <textarea
              rows={3}
              placeholder="مثال: عدالت شالوده‌ای است که جهان بر آن استوار است..."
              value={formPersian}
              onChange={(e) => setFormPersian(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs leading-relaxed"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={formIsActive}
              onChange={(e) => setFormIsActive(e.target.checked)}
              className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
            />
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              این اسلاید به صورت فعال در چرخش قرار گیرد
            </span>
          </label>

          <div className="flex items-center gap-3 pt-3">
            <button
              type="submit"
              className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{editingId ? 'ذخیره ویرایش اسلاید' : 'افزودن این اسلاید'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                resetForm();
                setActiveSubTab('list');
              }}
              className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-400"
            >
              انصراف
            </button>
          </div>
        </form>
      )}

      {/* 3. Slider Settings Tab */}
      {activeSubTab === 'settings' && (
        <div className="space-y-6 max-w-xl">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
            <strong>تنظیمات کارکرد:</strong> زمان چرخش خودکار و رفتار بنر در هنگام توقف ماوس روی متن.
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showBannerSlider}
              onChange={(e) => {
                setShowBannerSlider(e.target.checked);
                commitChanges(slides, bannerSettings, e.target.checked);
              }}
              className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
            />
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
              نمایش سراسری بنر اسلایدر متنی در هدر سایت
            </span>
          </label>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                مدت زمان چرخش خودکار (ثانیه):
              </span>
              <span className="font-mono font-bold text-[#D4AF37]">
                {bannerSettings.autoRotateSeconds} ثانیه
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="15"
              step="1"
              value={bannerSettings.autoRotateSeconds}
              onChange={(e) => {
                const updated = {
                  ...bannerSettings,
                  autoRotateSeconds: Number(e.target.value),
                };
                setBannerSettings(updated);
                commitChanges(slides, updated, showBannerSlider);
              }}
              className="w-full accent-[#D4AF37]"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={bannerSettings.pauseOnHover}
              onChange={(e) => {
                const updated = {
                  ...bannerSettings,
                  pauseOnHover: e.target.checked,
                };
                setBannerSettings(updated);
                commitChanges(slides, updated, showBannerSlider);
              }}
              className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
            />
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
              توقف چرخش اسلایدر با قرارگیری نشانگر ماوس (Pause on Hover)
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={bannerSettings.enableCopyButton}
              onChange={(e) => {
                const updated = {
                  ...bannerSettings,
                  enableCopyButton: e.target.checked,
                };
                setBannerSettings(updated);
                commitChanges(slides, updated, showBannerSlider);
              }}
              className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
            />
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
              نمایش دکمه کپی متن حدیث / شعر برای کاربران
            </span>
          </label>
        </div>
      )}

      {/* 4. Live Preview Tab */}
      {activeSubTab === 'preview' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                پیش‌نمایش زنده نوار بالای سایت:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setPreviewIndex((prev) =>
                      prev === 0 ? activeSlidesForPreview.length - 1 : prev - 1
                    )
                  }
                  className="p-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300"
                >
                  قبلی
                </button>
                <span className="text-xs font-mono font-bold text-[#D4AF37]">
                  {activeSlidesForPreview.length > 0 ? (previewIndex % activeSlidesForPreview.length) + 1 : 0} /{' '}
                  {activeSlidesForPreview.length}
                </span>
                <button
                  onClick={() => setPreviewIndex((prev) => prev + 1)}
                  className="p-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300"
                >
                  بعدی
                </button>
              </div>
            </div>

            {currentPreviewSlide ? (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white border border-[#D4AF37]/30 shadow-md">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#D4AF37]/20 text-[#F3E5AB] text-xs font-bold">
                      {currentPreviewSlide.category || 'حکمت'}
                    </span>
                    <span className="text-xs text-[#D4AF37] font-bold">
                      {currentPreviewSlide.source}
                    </span>
                  </div>

                  <div className="space-y-1 max-w-xl">
                    {currentPreviewSlide.arabicText && (
                      <div className="text-xs text-[#F3E5AB] font-serif" dir="rtl">
                        «{currentPreviewSlide.arabicText}»
                      </div>
                    )}
                    <div className="text-xs sm:text-sm text-gray-200 font-medium">
                      {currentPreviewSlide.persianText}
                    </div>
                  </div>

                  {bannerSettings.enableCopyButton && (
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `${currentPreviewSlide.arabicText ? currentPreviewSlide.arabicText + ' - ' : ''}${currentPreviewSlide.persianText} (${currentPreviewSlide.source})`
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#F3E5AB] text-xs font-bold flex items-center gap-1.5 border border-[#D4AF37]/30"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>کپی</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-gray-500">
                هیچ اسلاید فعالی برای پیش‌نمایش وجود ندارد.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
