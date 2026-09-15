import React, { useState } from 'react';
import {
  Save,
  RotateCcw,
  Sliders,
  Image,
  Layers,
  Share2,
  Sparkles,
  Check,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Eye,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  Shield,
  FileText,
  Instagram,
  Linkedin,
  Send,
  Video,
  AlertCircle
} from 'lucide-react';
import {
  LawyerSiteProfile,
  LawyerSlideItem,
  saveLawyerProfile,
  resetLawyerProfile
} from '../utils/lawyerCustomizationStorage';
import { StoryItem } from '../types/theme';

interface LawyerCustomizerTabProps {
  profile: LawyerSiteProfile;
  onUpdateProfile: (updated: LawyerSiteProfile) => void;
}

export const LawyerCustomizerTab: React.FC<LawyerCustomizerTabProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [formData, setFormData] = useState<LawyerSiteProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeSubSection, setActiveSubSection] = useState<'identity' | 'slider' | 'stories' | 'gallery' | 'social' | 'seo'>('identity');

  // Editing state for Hero Slider
  const [editingSlideIndex, setEditingSlideIndex] = useState<number | null>(null);
  const [slideEditState, setSlideEditState] = useState<LawyerSlideItem | null>(null);

  // Editing state for Stories
  const [editingStoryIndex, setEditingStoryIndex] = useState<number | null>(null);
  const [storyEditState, setStoryEditState] = useState<StoryItem | null>(null);

  // New Gallery Item state
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('دفتر وکالت');
  const [newGalleryCaption, setNewGalleryCaption] = useState('');

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    saveLawyerProfile(formData);
    onUpdateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleReset = () => {
    if (confirm('آیا از بازنشانی کلیه تنظیمات اختصاصی به مقادیر پیش‌فرض اطمینان دارید؟')) {
      const def = resetLawyerProfile();
      setFormData(def);
      onUpdateProfile(def);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  // --- مدیریت اسلایدر ---
  const handleOpenEditSlide = (index: number) => {
    setEditingSlideIndex(index);
    setSlideEditState({ ...formData.heroSlider[index] });
  };

  const handleSaveSlide = () => {
    if (editingSlideIndex === null || !slideEditState) return;
    const updated = [...formData.heroSlider];
    updated[editingSlideIndex] = slideEditState;
    const newProfile = { ...formData, heroSlider: updated };
    setFormData(newProfile);
    setEditingSlideIndex(null);
    setSlideEditState(null);
  };

  const handleAddSlide = () => {
    const newSlide: LawyerSlideItem = {
      id: `slide-${Date.now()}`,
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200',
      title: 'عنوان اسلاید جدید معرفی وکیل',
      subtitle: 'زیرعنوان و تخصص برجسته حقوقی',
      badge: 'افتخار حرفه‌ای',
      description: 'توضیحات کوتاه مرتبط با این خدمت یا دستاورد قضایی...',
      ctaText: 'رزرو نوبت مشاوره',
      ctaLink: '#booking',
    };
    const updated = [...formData.heroSlider, newSlide];
    setFormData({ ...formData, heroSlider: updated });
    setEditingSlideIndex(updated.length - 1);
    setSlideEditState(newSlide);
  };

  const handleDeleteSlide = (index: number) => {
    if (formData.heroSlider.length <= 1) {
      alert('حداقل یک اسلاید برای نمایش الزامی است.');
      return;
    }
    const updated = formData.heroSlider.filter((_, idx) => idx !== index);
    setFormData({ ...formData, heroSlider: updated });
  };

  // --- مدیریت استوری‌ها ---
  const handleOpenEditStory = (index: number) => {
    setEditingStoryIndex(index);
    setStoryEditState({ ...formData.stories[index] });
  };

  const handleSaveStory = () => {
    if (editingStoryIndex === null || !storyEditState) return;
    const updated = [...formData.stories];
    updated[editingStoryIndex] = storyEditState;
    const newProfile = { ...formData, stories: updated };
    setFormData(newProfile);
    setEditingStoryIndex(null);
    setStoryEditState(null);
  };

  const handleAddStory = () => {
    const newStory: StoryItem = {
      id: `st-${Date.now()}`,
      author: formData.lawyerName,
      title: 'استوری جدید',
      category: 'نکات حقوقی',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=200',
      isUnseen: true,
      slides: [
        {
          image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
          title: 'تیتر مهم استوری جدید',
          text: 'متن آموزشی حقوقی برای موکلین و بازدیدکنندگان سایت...',
          caption: 'نکته کاربردی',
          ctaText: 'مشاوره آنلاین',
          ctaLink: '#booking',
        },
      ],
    };
    const updated = [newStory, ...formData.stories];
    setFormData({ ...formData, stories: updated });
    setEditingStoryIndex(0);
    setStoryEditState(newStory);
  };

  const handleDeleteStory = (index: number) => {
    if (confirm('آیا از حذف این استوری اطمینان دارید؟')) {
      const updated = formData.stories.filter((_, idx) => idx !== index);
      setFormData({ ...formData, stories: updated });
    }
  };

  // --- مدیریت گالری تصاویر ---
  const handleAddGalleryImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryUrl.trim() || !newGalleryTitle.trim()) return;
    const newItem = {
      id: `gal-${Date.now()}`,
      url: newGalleryUrl.trim(),
      title: newGalleryTitle.trim(),
      category: newGalleryCategory,
      caption: newGalleryCaption.trim() || 'تصویر فعالیت‌های رسمی دفتر وکالت',
    };
    setFormData({
      ...formData,
      galleryImages: [newItem, ...formData.galleryImages],
    });
    setNewGalleryUrl('');
    setNewGalleryTitle('');
    setNewGalleryCaption('');
  };

  const handleDeleteGalleryImage = (id: string) => {
    setFormData({
      ...formData,
      galleryImages: formData.galleryImages.filter((g) => g.id !== id),
    });
  };

  return (
    <div className="space-y-6 text-right font-persian">
      {/* Top Banner with Actions */}
      <div className="p-5 rounded-3xl bg-gradient-to-l from-[#0B132B] via-[#1C2541] to-[#0B132B] border border-[#D4AF37]/30 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-lg font-bold font-serif text-white">
              تنظیمات شخصی‌سازی هویت وکیل (بدون نیاز به المنتور)
            </h2>
          </div>
          <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
            این پنل به شما (یا هر وکیلی که از این سامانه استفاده می‌کند) اجازه می‌دهد نام، تصاویر، بیوگرافی، شبکه‌های اجتماعی، اسلایدر تصاویر و استوری‌ها را به صورت کاملاً مستقل و یکپارچه در تمام صفحات وب‌سایت شخصی‌سازی کند.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="بازنشانی به پیش‌فرض پوسته"
          >
            <RotateCcw className="w-4 h-4" />
            <span>ریست پیش‌فرض</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            className="btn-gold px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#D4AF37]/30"
          >
            <Save className="w-4 h-4" />
            <span>ذخیره تغییرات در کل سایت</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>تغییرات با موفقیت ذخیره شد و در تمامی صفحات فرانت‌اند و متاتگ‌های سئو اعمال گردید.</span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400">به‌روزرسانی آنی</span>
        </div>
      )}

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-800">
        <button
          type="button"
          onClick={() => setActiveSubSection('identity')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeSubSection === 'identity'
              ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
              : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>هویت، نام و مشخصات وکیل</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubSection('slider')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeSubSection === 'slider'
              ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
              : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>اسلایدر تصاویر و عناوین وکیل ({formData.heroSlider.length} اسلاید)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubSection('stories')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeSubSection === 'stories'
              ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
              : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>استوری‌های صفحه اصلی ({formData.stories.length} مورد)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubSection('gallery')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeSubSection === 'gallery'
              ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
              : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
          }`}
        >
          <Image className="w-4 h-4" />
          <span>گالری عکس‌ها و تصاویر دفتر ({formData.galleryImages.length} عکس)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubSection('social')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeSubSection === 'social'
              ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
              : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>لینک شبکه‌های اجتماعی</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubSection('seo')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeSubSection === 'seo'
              ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
              : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>عنوان سایت و سئو (Meta SEO)</span>
        </button>
      </div>

      {/* ══════════ تب ۱: هویت، نام و مشخصات وکیل ══════════ */}
      {activeSubSection === 'identity' && (
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
          <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
            <h3 className="text-sm font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
              <User className="w-4 h-4 text-[#D4AF37]" />
              <span>مشخصات فردی، آکادمیک و مدارک وکالت</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              با تغییر این مشخصات، نام و القاب وکیل در هدر، فوتر، برگه‌های درباره وکیل و تمامی بخش‌های سایت همگام می‌گردد.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                نام کامل و رسمی وکیل:
              </label>
              <input
                type="text"
                value={formData.lawyerName}
                onChange={(e) => setFormData({ ...formData, lawyerName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                عنوان شغلی و سمَت:
              </label>
              <input
                type="text"
                value={formData.lawyerTitle}
                onChange={(e) => setFormData({ ...formData, lawyerTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                مدرک تحصیلی و دانشگاه:
              </label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                شماره پروانه وکالت:
              </label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                سابقه وکالت (سال):
              </label>
              <input
                type="number"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                تلفن دفتر وکالت:
              </label>
              <input
                type="text"
                dir="ltr"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                شماره موبایل و پیام‌رسان‌ها:
              </label>
              <input
                type="text"
                dir="ltr"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                ایمیل رسمی وکیل:
              </label>
              <input
                type="email"
                dir="ltr"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                ساعات کاری و پذیرش:
              </label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              آدرس دفتر وکالت:
            </label>
            <input
              type="text"
              value={formData.officeAddress}
              onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                شعار اصلی وکیل (Slogan):
              </label>
              <input
                type="text"
                value={formData.slogan}
                onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                توضیح تکمیلی زیر شعار:
              </label>
              <input
                type="text"
                value={formData.subSlogan}
                onChange={(e) => setFormData({ ...formData, subSlogan: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
          </div>

          {/* تصاویر اصلی پرتره و بنر */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
            <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">
              تصاویر اصلی پرتره و بنر هدر وکیل:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                  آدرس تصویر پرتره رسمی وکیل (URL):
                </label>
                <input
                  type="url"
                  dir="ltr"
                  value={formData.portraitImage}
                  onChange={(e) => setFormData({ ...formData, portraitImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                />
                <div className="mt-2 flex items-center gap-3">
                  <img
                    src={formData.portraitImage}
                    alt="پیش‌نمایش پرتره"
                    className="w-14 h-14 rounded-xl object-cover border border-[#D4AF37]"
                  />
                  <span className="text-[11px] text-gray-400">پیش‌نمایش پرتره جهت درج در بخش درباره وکیل و هدر</span>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                  آدرس تصویر بنر پس‌زمینه (URL):
                </label>
                <input
                  type="url"
                  dir="ltr"
                  value={formData.heroBannerImage}
                  onChange={(e) => setFormData({ ...formData, heroBannerImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                />
                <div className="mt-2 flex items-center gap-3">
                  <img
                    src={formData.heroBannerImage}
                    alt="پیش‌نمایش بنر"
                    className="w-24 h-14 rounded-xl object-cover border border-gray-300 dark:border-gray-700"
                  />
                  <span className="text-[11px] text-gray-400">پیش‌نمایش بنر پس‌زمینه هدر سایت</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ تب ۲: اسلایدر تصاویر و عناوین وکیل (زیر استوری‌ها) ══════════ */}
      {activeSubSection === 'slider' && (
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                  مدیریت اسلایدر کاروسل صفحه اصلی (زیر استوری‌ها)
                </h3>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                شما می‌توانید تصاویر اختصاصی خود، تیترها، زیرعنوان‌ها، بج‌ها و توضیحات هر اسلاید را ویرایش، حذف یا اسلاید جدید اضافه کنید.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddSlide}
              className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>افزودن اسلاید جدید</span>
            </button>
          </div>

          {/* Modal / Form for editing single slide */}
          {editingSlideIndex !== null && slideEditState && (
            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border-2 border-[#D4AF37]/50 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#0B132B] dark:text-[#F3E5AB] flex items-center gap-1.5">
                  <Edit2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>ویرایش اسلاید شماره {editingSlideIndex + 1}</span>
                </h4>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingSlideIndex(null);
                      setSlideEditState(null);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-xs font-semibold"
                  >
                    انصراف
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveSlide}
                    className="btn-gold px-4 py-1.5 rounded-lg text-xs font-bold"
                  >
                    تایید این اسلاید
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    عنوان اصلی اسلاید (H2):
                  </label>
                  <input
                    type="text"
                    value={slideEditState.title}
                    onChange={(e) => setSlideEditState({ ...slideEditState, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    زیرعنوان اسلاید:
                  </label>
                  <input
                    type="text"
                    value={slideEditState.subtitle}
                    onChange={(e) => setSlideEditState({ ...slideEditState, subtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    متن برچسب (Badge):
                  </label>
                  <input
                    type="text"
                    value={slideEditState.badge}
                    onChange={(e) => setSlideEditState({ ...slideEditState, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    آدرس تصویر اسلاید (URL):
                  </label>
                  <input
                    type="url"
                    dir="ltr"
                    value={slideEditState.image}
                    onChange={(e) => setSlideEditState({ ...slideEditState, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  متن توضیحات اسلاید:
                </label>
                <textarea
                  rows={2}
                  value={slideEditState.description}
                  onChange={(e) => setSlideEditState({ ...slideEditState, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    متن دکمه اکشن (CTA):
                  </label>
                  <input
                    type="text"
                    value={slideEditState.ctaText || ''}
                    onChange={(e) => setSlideEditState({ ...slideEditState, ctaText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    لینک دکمه (مثال: booking# یا صفحه مورد نظر):
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={slideEditState.ctaLink || ''}
                    onChange={(e) => setSlideEditState({ ...slideEditState, ctaLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* List of current slides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formData.heroSlider.map((slide, idx) => (
              <div
                key={slide.id || idx}
                className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 shadow-sm flex flex-col justify-between group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <span className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-[#0B132B]/80 text-[#D4AF37] text-[10px] font-bold backdrop-blur-sm">
                    اسلاید {idx + 1}
                  </span>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-[#D4AF37] text-[#0B132B] text-[10px] font-bold">
                    {slide.badge}
                  </span>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#0B132B] dark:text-white line-clamp-1">
                      {slide.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                      {slide.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleOpenEditSlide(idx)}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 text-[#0B132B] dark:text-white border border-gray-300 dark:border-gray-600 text-[11px] font-bold hover:border-[#D4AF37] flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3 text-[#D4AF37]" />
                      <span>ویرایش متن و تصویر</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteSlide(idx)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                      title="حذف اسلاید"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════ تب ۳: استوری‌های صفحه اصلی ══════════ */}
      {activeSubSection === 'stories' && (
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                  مدیریت و ویرایش استوری‌های وکیل در بالای صفحه اصلی
                </h3>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                استوری‌های اختصاصی جهت انتشار نکات کاربردی، پرونده‌های موفق اخیر و ارتباط تصویری با مراجعین.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddStory}
              className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>افزودن استوری جدید</span>
            </button>
          </div>

          {/* Edit Story form if active */}
          {editingStoryIndex !== null && storyEditState && (
            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border-2 border-[#D4AF37]/50 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#0B132B] dark:text-[#F3E5AB]">
                  ویرایش استوری: {storyEditState.title}
                </h4>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingStoryIndex(null);
                      setStoryEditState(null);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-xs font-semibold"
                  >
                    انصراف
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveStory}
                    className="btn-gold px-4 py-1.5 rounded-lg text-xs font-bold"
                  >
                    تایید تغییرات استوری
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    عنوان کوتاه استوری (روی آیکون):
                  </label>
                  <input
                    type="text"
                    value={storyEditState.title}
                    onChange={(e) => setStoryEditState({ ...storyEditState, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    دسته‌بندی موضوعی:
                  </label>
                  <input
                    type="text"
                    value={storyEditState.category}
                    onChange={(e) => setStoryEditState({ ...storyEditState, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    تصویر آواتار گرد استوری:
                  </label>
                  <input
                    type="url"
                    dir="ltr"
                    value={storyEditState.image}
                    onChange={(e) => setStoryEditState({ ...storyEditState, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              {/* First Slide Details */}
              {storyEditState.slides && storyEditState.slides[0] && (
                <div className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-3">
                  <span className="text-[11px] font-bold text-[#D4AF37] block">
                    محتوای اسلاید اول استوری:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="تیتر اسلاید"
                      value={storyEditState.slides[0].title}
                      onChange={(e) => {
                        const newSlides = [...storyEditState.slides];
                        newSlides[0] = { ...newSlides[0], title: e.target.value };
                        setStoryEditState({ ...storyEditState, slides: newSlides });
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-xs"
                    />

                    <input
                      type="url"
                      dir="ltr"
                      placeholder="آدرس تصویر اصلی اسلاید (URL)"
                      value={storyEditState.slides[0].image}
                      onChange={(e) => {
                        const newSlides = [...storyEditState.slides];
                        newSlides[0] = { ...newSlides[0], image: e.target.value };
                        setStoryEditState({ ...storyEditState, slides: newSlides });
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-xs font-mono"
                    />
                  </div>

                  <textarea
                    rows={3}
                    placeholder="متن کامل و آموزنده استوری..."
                    value={storyEditState.slides[0].text}
                    onChange={(e) => {
                      const newSlides = [...storyEditState.slides];
                      newSlides[0] = { ...newSlides[0], text: e.target.value };
                      setStoryEditState({ ...storyEditState, slides: newSlides });
                    }}
                    className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-xs leading-relaxed"
                  />
                </div>
              )}
            </div>
          )}

          {/* List of current stories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {formData.stories.map((st, idx) => (
              <div
                key={st.id || idx}
                className="p-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 text-center space-y-2 flex flex-col items-center justify-between"
              >
                <div className="relative w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB]">
                  <img
                    src={st.image}
                    alt={st.title}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0B132B] dark:text-white">{st.title}</h4>
                  <span className="text-[10px] text-gray-400 block">{st.category}</span>
                </div>
                <div className="flex items-center gap-1 pt-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEditStory(idx)}
                    className="p-1 rounded-md text-[#D4AF37] hover:bg-[#D4AF37]/10"
                    title="ویرایش استوری"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteStory(idx)}
                    className="p-1 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                    title="حذف استوری"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════ تب ۴: گالری عکس‌ها و تصاویر وکیل ══════════ */}
      {activeSubSection === 'gallery' && (
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <Image className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                گالری عکس‌ها، محیط دفتر و فعالیت‌های وکیل
              </h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              تصاویر محیط کار، جلسات داوری و همایش‌ها را در اینجا مدیریت فرمایید.
            </p>
          </div>

          {/* Form to add new gallery item */}
          <form onSubmit={handleAddGalleryImage} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-3">
            <span className="text-xs font-bold text-[#0B132B] dark:text-white block">
              افزودن تصویر جدید به گالری رسمی:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="url"
                required
                dir="ltr"
                placeholder="آدرس اینترنتی تصویر (URL)"
                value={newGalleryUrl}
                onChange={(e) => setNewGalleryUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-xs font-mono"
              />
              <input
                type="text"
                required
                placeholder="عنوان تصویر (مثال: اتاق داوری)"
                value={newGalleryTitle}
                onChange={(e) => setNewGalleryTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-xs"
              />
              <input
                type="text"
                placeholder="دسته‌بندی (مثال: دفتر وکالت)"
                value={newGalleryCategory}
                onChange={(e) => setNewGalleryCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-xs"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="توضیح کوتاه تصویر (Caption)..."
                value={newGalleryCaption}
                onChange={(e) => setNewGalleryCaption(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-xs"
              />
              <button
                type="submit"
                className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>ثبت در گالری</span>
              </button>
            </div>
          </form>

          {/* Current Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {formData.galleryImages.map((item) => (
              <div
                key={item.id}
                className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 shadow-sm flex flex-col justify-between group"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#0B132B]/80 text-[#D4AF37] text-[10px] font-bold backdrop-blur-sm">
                    {item.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteGalleryImage(item.id)}
                    className="absolute top-2 left-2 p-1.5 rounded-md bg-red-600 text-white shadow-md opacity-90 hover:opacity-100"
                    title="حذف از گالری"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-bold text-[#0B132B] dark:text-white line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════ تب ۵: شبکه‌های اجتماعی ══════════ */}
      {activeSubSection === 'social' && (
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                مدیریت لینک‌ها و کانال‌های رسمی وکیل در شبکه‌های اجتماعی
              </h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              این لینک‌ها در فوتر، هدر، مودال ارتباط و بخش‌های معرفی وکیل در دسترس مخاطبین قرار می‌گیرند.
            </p>
          </div>

          <div className="space-y-4">
            {formData.socialAccounts.map((acc, idx) => (
              <div
                key={acc.id || idx}
                className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
              >
                <div className="sm:col-span-3 flex items-center gap-2">
                  <span className="font-bold text-xs text-[#0B132B] dark:text-white">
                    {acc.name} ({acc.nameEn}):
                  </span>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[10px] text-gray-400 mb-0.5">آیدی / نام کاربری:</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={acc.handle}
                    onChange={(e) => {
                      const updated = [...formData.socialAccounts];
                      updated[idx] = { ...updated[idx], handle: e.target.value };
                      setFormData({ ...formData, socialAccounts: updated });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-xs font-mono"
                  />
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-[10px] text-gray-400 mb-0.5">آدرس مستقیم (URL):</label>
                  <input
                    type="url"
                    dir="ltr"
                    value={acc.url}
                    onChange={(e) => {
                      const updated = [...formData.socialAccounts];
                      updated[idx] = { ...updated[idx], url: e.target.value };
                      setFormData({ ...formData, socialAccounts: updated });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-xs font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════ تب ۶: عنوان سایت و سئو ══════════ */}
      {activeSubSection === 'seo' && (
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                پیکربندی عنوان سایت، زیرعنوان و متاتگ‌های سئو (SEO Meta)
              </h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              تنظیم دقیق این فیلدها تضمین می‌کند که سایت در نتایج جستجوی گوگل با نام وکیل جدید و کلیدواژه‌های اختصاصی ایشان رتبه بالا بگیرد.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                عنوان اصلی سایت (Site Title - تگ Title و هدر):
              </label>
              <input
                type="text"
                value={formData.siteTitle}
                onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                شعار / زیرعنوان سایت (Tagline):
              </label>
              <input
                type="text"
                value={formData.siteSubtitle}
                onChange={(e) => setFormData({ ...formData, siteSubtitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                توضیحات متا برای موتورهای جستجو (Meta Description):
              </label>
              <textarea
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white leading-relaxed focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                کلیدواژه‌های هدف سئو (کلمات کلیدی با ویرگول جدا شود):
              </label>
              <input
                type="text"
                value={formData.metaKeywords}
                onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                آدرس دامنه رسمی سایت (Canonical URL):
              </label>
              <input
                type="url"
                dir="ltr"
                value={formData.canonicalUrl}
                onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Save Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 flex items-center justify-between shadow-sm">
        <p className="text-[11px] text-gray-400">
          💡 تمام تنظیمات به صورت لوکال در سامانه ذخیره شده و پس از ذخیره بدون نیاز به هیچ کدی در فرانت‌اند اعمال می‌گردند.
        </p>

        <button
          type="button"
          onClick={() => handleSave()}
          className="btn-gold px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#D4AF37]/25"
        >
          <Save className="w-4 h-4" />
          <span>ذخیره نهایی تنظیمات و هویت</span>
        </button>
      </div>
    </div>
  );
};
