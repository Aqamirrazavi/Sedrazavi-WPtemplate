import React, { useState } from 'react';
import {
  Wand2, CheckCircle2, ChevronRight, ChevronLeft, Palette,
  Layers, Sparkles, Film, ShoppingBag, Scale, Headphones,
  Briefcase, HeartPulse, Shield, Globe, Rocket, X, RefreshCw
} from 'lucide-react';
import { INDUSTRY_PRESETS, IndustryPreset } from '../../data/industryPresets';

interface SetupWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPreset: (presetId: string, paletteId?: string, vectorId?: string) => void;
  currentPresetId: string;
}

export const SetupWizardModal: React.FC<SetupWizardModalProps> = ({
  isOpen,
  onClose,
  onApplyPreset,
  currentPresetId,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPreset, setSelectedPreset] = useState<string>(currentPresetId || 'lawyer');
  const [selectedPalette, setSelectedPalette] = useState<string>('royal_navy_gold');
  const [selectedVector, setSelectedVector] = useState<string>('scales_arabesque');
  const [selectedPages, setSelectedPages] = useState<string[]>([
    'front-page', 'videos', 'store', 'portfolio', 'podcast'
  ]);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const archetypes = [
    {
      id: 'lawyer',
      title: 'وکالت و مشاوره حقوقی',
      badge: 'حقوقی و داوری',
      desc: 'قالب اختصاصی دفاتر وکالت، پیگیری پرونده، محاسبه‌گر تعرفه، داستان‌های حقوقی و استعلام کدرهگیری.',
      icon: Scale,
      color: 'from-amber-500 to-yellow-600',
    },
    {
      id: 'web_agency',
      title: 'طراح سایت و آژانس وردپرس',
      badge: 'گوتنبرگ فرست',
      desc: 'لندینگ ۱۳ سکشنی، کیس‌استادی نمونه‌کارها، سرعت ۹۹ در لایت‌هاوس، فرم ۵ مرحله‌ای بریف پروژه.',
      icon: Sparkles,
      color: 'from-indigo-500 to-purple-600',
    },
    {
      id: 'corporate',
      title: 'فروشگاه آنلاین ووکامرس',
      badge: 'وودمارت و فروشگاهی',
      desc: 'کاتالوگ محصولات، سبد خرید کشویی ایجکس، فیلتر ابری ویژگی‌ها و درگاه مستقیم پرداخت.',
      icon: ShoppingBag,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'video_media',
      title: 'رسانه، ویدئو و پادکست',
      badge: 'مدیا سنتر',
      desc: 'آرشیو چندرسانه‌ای با پلیر اختصاصی، لیست پخش صوتی پادکست و مرکز دانلود چندکیفیتی.',
      icon: Film,
      color: 'from-red-500 to-amber-600',
    },
    {
      id: 'project_saas',
      title: 'توسعه‌دهنده و گیت‌هاب سوئیت',
      badge: 'GitHub Primer',
      desc: 'داشبورد ابری توسعه‌دهندگان، هیت‌مپ فعالیت کامیت‌ها، مدیریت ایشوها و مستندات API.',
      icon: Globe,
      color: 'from-blue-500 to-cyan-600',
    },
    {
      id: 'doctor',
      title: 'پزشکی و کلینیک سلامت',
      badge: 'نوبت‌دهی آنلاین',
      desc: 'معرفی خدمات درمانی، رزرو وقت بیمار، مقالات سلامت و تشکیل پرونده الکترونیک پزشکی.',
      icon: HeartPulse,
      color: 'from-rose-500 to-pink-600',
    },
  ];

  const palettes = [
    {
      id: 'royal_navy_gold',
      title: 'طلایی و سرمه‌ای سلطنتی (Royal Navy & Gold)',
      colors: ['#070D1E', '#D4AF37', '#F9F6EE'],
      bestFor: 'دفاتر وکالت، مالی و شرکتی',
    },
    {
      id: 'tech_indigo_violet',
      title: 'نیلی و بنفش سایبر (Tech Indigo & Violet)',
      colors: ['#0F172A', '#6366F1', '#A855F7'],
      bestFor: 'طراحان وب، استارتاپ‌ها و نرم‌افزار',
    },
    {
      id: 'emerald_clean_slate',
      title: 'زمردی پاک و زغالی (Emerald Clean & Slate)',
      colors: ['#064E3B', '#10B981', '#0F172A'],
      bestFor: 'فروشگاه‌های آنلاین و خدمات زیست‌محیطی',
    },
    {
      id: 'github_primer_dark',
      title: 'تاریک گیت‌هاب (GitHub Primer Dark)',
      colors: ['#0D1117', '#161B22', '#58A6FF'],
      bestFor: 'پروژه‌های برنامه‌نویسی و جامعه توسعه‌دهندگان',
    },
  ];

  const vectorPatterns = [
    {
      id: 'scales_arabesque',
      title: 'نقوش هندسی اسلامی و تذهیب مدرن',
      desc: 'خطوط اسلیمی با وقار و اعتبار رسمی برای محیط‌های حقوقی و شرکتی',
    },
    {
      id: 'circuit_matrix',
      title: 'خطوط انتزاعی و شبکه مداری دیجیتال',
      desc: 'چیدمان هندسی مدرن مناسب تکنولوژی، طراحی وب و فریلنسری',
    },
    {
      id: 'topography_dots',
      title: 'ماتریکس نقطه‌ای و کانتورهای گیت‌هاب',
      desc: 'نقطه‌چین‌های مینیمال پرایمر با سبک مدرن توسعه‌دهندگان',
    },
    {
      id: 'minimal_glow',
      title: 'هاله نوری ملایم بدون نویز (Subtle Radial Glow)',
      desc: 'زمینه تمیز و تک‌رنگ با گرادیان خفیف در مرکز صفحه',
    },
  ];

  const handleFinishWizard = () => {
    setIsDeploying(true);
    setTimeout(() => {
      onApplyPreset(selectedPreset, selectedPalette, selectedVector);
      setIsDeploying(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  const togglePage = (pageSlug: string) => {
    setSelectedPages(prev =>
      prev.includes(pageSlug)
        ? prev.filter(p => p !== pageSlug)
        : [...prev, pageSlug]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-sans" dir="rtl">
      <div className="relative w-full max-w-4xl bg-[#0B132B] rounded-3xl border border-[#D4AF37]/50 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="p-6 bg-gradient-to-r from-[#0F172A] via-[#0B132B] to-[#1E293B] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/40 shadow-lg">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                ویزارد راه‌اندازی سریع ۳۰ ثانیه‌ای
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-bold border border-[#D4AF37]/30">
                  Universal Quick Setup
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                پیکربندی صنف، پالت رنگی، وکتور پس‌زمینه و برگه‌های اصلی تنها در ۴ مرحله ساده
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Progress Indicator */}
        <div className="px-6 py-4 bg-black/30 border-b border-gray-800/80 flex items-center justify-between">
          {[
            { step: 1, label: 'صنف و موضوع' },
            { step: 2, label: 'رنگ و وکتور' },
            { step: 3, label: 'برگه‌های اصلی' },
            { step: 4, label: 'نهایی‌سازی و اجرا' },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentStep === item.step
                    ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/30 scale-110'
                    : currentStep > item.step
                    ? 'bg-emerald-500 text-black'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                {currentStep > item.step ? '✓' : item.step}
              </div>
              <span className={`text-xs hidden sm:inline ${currentStep === item.step ? 'text-white font-bold' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Choose Archetype */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-xs text-gray-300">
                موضوع و صنف سایت خود را انتخاب کنید. با این کار ساختار منوها، المان‌ها و پست‌تایپ‌های وردپرس به صورت داینامیک تطبیق می‌یابند:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {archetypes.map((arch) => {
                  const Icon = arch.icon;
                  const isSelected = selectedPreset === arch.id;
                  return (
                    <div
                      key={arch.id}
                      onClick={() => setSelectedPreset(arch.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#0F172A] border-[#D4AF37] shadow-xl shadow-[#D4AF37]/15 ring-2 ring-[#D4AF37]/30'
                          : 'bg-[#0F172A]/60 border-gray-800 hover:border-gray-700 hover:bg-[#0F172A]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${arch.color} text-white flex items-center justify-center shadow-md`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-300 font-bold">
                          {arch.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-white mb-1.5">{arch.title}</h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed">{arch.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Choose Palette & Vector */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Palettes */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-300 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#D4AF37]" />
                  پالت رنگی سراسری سایت (CSS Custom Variables)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {palettes.map((p) => {
                    const isSelected = selectedPalette === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPalette(p.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#0F172A] border-[#D4AF37] shadow-lg ring-1 ring-[#D4AF37]'
                            : 'bg-[#0F172A]/60 border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-black text-white">{p.title}</span>
                          <div className="flex items-center gap-1.5">
                            {p.colors.map((c, i) => (
                              <span
                                key={i}
                                className="w-4 h-4 rounded-full border border-white/20"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-[11px] text-gray-400">{p.bestFor}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Vector Pattern */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-300 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#D4AF37]" />
                  الگوی وکتور پس‌زمینه (SVG Background Vector)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vectorPatterns.map((v) => {
                    const isSelected = selectedVector === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVector(v.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#0F172A] border-[#D4AF37] shadow-lg ring-1 ring-[#D4AF37]'
                            : 'bg-[#0F172A]/60 border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <div className="text-xs font-black text-white mb-1">{v.title}</div>
                        <div className="text-[11px] text-gray-400">{v.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Choose Pages */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="text-xs text-gray-300">
                برگه‌هایی که مایلید به صورت خودکار در منوها و وردپرس نصب و فعال شوند را علامت بزنید:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { slug: 'front-page', title: 'صفحه اصلی (front-page.php)', desc: 'چیدمان اصلی بر اساس صنف فعال' },
                  { slug: 'videos', title: 'آرشیو و نمایش ویدئو (page-videos.php)', desc: 'پلیر سینمایی و فیلتر موضوعی' },
                  { slug: 'podcast', title: 'مرکز پادکست و صوت (page-podcast.php)', desc: 'پلی‌لیست صوتی و دانلود مستقیم' },
                  { slug: 'portfolio', title: 'نمونه‌کارها و پروژه‌ها (page-portfolio.php)', desc: 'کیس‌استادی‌های لایت‌هاوس ۹۹' },
                  { slug: 'store', title: 'فروشگاه آنلاین منعطف (page-store.php)', desc: 'سازگار با وودمارت و ووکامرس' },
                  { slug: 'github-suite', title: 'پیشخوان گیت‌هاب (page-github-suite.php)', desc: 'هیت‌مپ کامیت و لاگ سیستم' },
                ].map((pg) => {
                  const isChecked = selectedPages.includes(pg.slug);
                  return (
                    <div
                      key={pg.slug}
                      onClick={() => togglePage(pg.slug)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'bg-[#0F172A] border-emerald-500/60'
                          : 'bg-[#0F172A]/50 border-gray-800 opacity-60'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-1 rounded text-[#D4AF37] focus:ring-0"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{pg.title}</div>
                        <div className="text-[11px] text-gray-400">{pg.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Summary & Deploy */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#0F172A] border border-gray-800 space-y-3">
                <h4 className="text-xs font-bold text-[#D4AF37]">خلاصه تنظیمات انتخاب شده:</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-400">صنف فعال: </span>
                    <span className="font-bold text-white">
                      {archetypes.find(a => a.id === selectedPreset)?.title}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">پالت رنگ: </span>
                    <span className="font-bold text-white">
                      {palettes.find(p => p.id === selectedPalette)?.title.split('(')[0]}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">وکتور پس‌زمینه: </span>
                    <span className="font-bold text-white">
                      {vectorPatterns.find(v => v.id === selectedVector)?.title}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">تعداد برگه‌ها: </span>
                    <span className="font-bold text-white">{selectedPages.length} برگه</span>
                  </div>
                </div>
              </div>

              {isSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                  <div className="text-sm font-black text-white">راه‌اندازی با موفقیت انجام شد!</div>
                  <div className="text-xs text-gray-300">سایت هم‌اکنون با تنظیمات جدید بارگذاری گردید.</div>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center gap-3 text-xs text-indigo-300">
                  <Rocket className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    با زدن دکمه زیر، هسته قالب فوراً صنف، تم رنگی، وکتور و شورت‌کدهای انتخابی را فعال می‌کند و شما می‌توانید پیش‌نمایش زنده آن را مشاهده کنید.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gradient-to-r from-[#0F172A] via-[#0B132B] to-[#1E293B] border-t border-gray-800 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(s => s - 1)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-300 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
              مرحله قبل
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(s => s + 1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-lg active:scale-95"
            >
              مرحله بعد
              <ChevronLeft className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinishWizard}
              disabled={isDeploying || isSuccess}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black text-xs font-black transition-all shadow-xl active:scale-95 disabled:opacity-50"
            >
              {isDeploying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  در حال اعمال پیکربندی...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  راه‌اندازی فوری ۳۰ ثانیه‌ای
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetupWizardModal;
