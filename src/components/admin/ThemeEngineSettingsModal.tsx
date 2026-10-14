import React, { useState, useEffect } from 'react';
import {
  Palette,
  Check,
  X,
  Sparkles,
  Layers,
  Settings2,
  Sliders,
  Scale,
  Laptop,
  ShoppingCart,
  Film,
  Eye,
  RefreshCw,
  Save,
  CheckCircle2,
} from 'lucide-react';

export interface ThemeEngineConfig {
  archetype: 'lawyer' | 'wp-designer' | 'ecommerce' | 'video-media';
  colorPalette: 'royal-gold' | 'tech-indigo' | 'emerald-clean' | 'github-dark' | 'monochrome-minimal';
  vectorBackground: 'geometric-scales' | 'circuit-tech' | 'matrix-topography' | 'clean-glow';
}

export const PALETTES = [
  {
    id: 'royal-gold',
    name: 'طلایی و سرمه‌ای سلطنتی',
    desc: 'لوکس، حقوقی، رسمی و باوقار',
    accent: '#D4AF37',
    hover: '#B8972E',
    bg: '#070D1E',
    card: '#0F172A',
    badge: 'وکالت و داوری',
  },
  {
    id: 'tech-indigo',
    name: 'نیلی و بنفش سایبر',
    desc: 'مدرن، پویا، مناسب طراحان سایت و فناوری',
    accent: '#6366F1',
    hover: '#4F46E5',
    bg: '#0F172A',
    card: '#1E293B',
    badge: 'طراحی وب و گوتنبرگ',
  },
  {
    id: 'emerald-clean',
    name: 'سبز زمردی و زغالی',
    desc: 'شفاف، تمیز، عالی برای فروشگاه و سلامت',
    accent: '#10B981',
    hover: '#059669',
    bg: '#064E3B',
    card: '#022C22',
    badge: 'فروشگاه ووکامرس',
  },
  {
    id: 'github-dark',
    name: 'تاریک گیت‌هاب پرایمر',
    desc: 'کنتراست استاندارد توسعه‌دهندگان و مهندسی',
    accent: '#58A6FF',
    hover: '#1F6FEB',
    bg: '#0D1117',
    card: '#161B22',
    badge: 'گیت‌هاب و کدنویسی',
  },
  {
    id: 'monochrome-minimal',
    name: 'خاکستری مینیمال مدرن',
    desc: 'ساده، متمرکز بر محتوا و بدون زوائد',
    accent: '#71717A',
    hover: '#52525B',
    bg: '#18181B',
    card: '#27272A',
    badge: 'استارتاپ و شرکتی',
  },
] as const;

export const VECTOR_BACKGROUNDS = [
  {
    id: 'geometric-scales',
    name: 'نقوش هندسی اسلامی و تذهیب',
    desc: 'الگوهای کلاسیک وکتور با خطوط زرین برای وقار حقوقی',
    icon: '⚖️',
  },
  {
    id: 'circuit-tech',
    name: 'خطوط مداری و سایبری دیجیتال',
    desc: 'مسیرهای برداری برد الکترونیک و خطوط مدرن وب',
    icon: '💻',
  },
  {
    id: 'matrix-topography',
    name: 'کانتورها و ماتریکس گیت‌هاب',
    desc: 'نقشه توپوگرافی انتزاعی و شبکه نقطه‌ای پرایمر',
    icon: '🐙',
  },
  {
    id: 'clean-glow',
    name: 'هاله نوری ملایم و مینیمال',
    desc: 'گرادیان شعاعی نرم بدون المان‌های شلوغ',
    icon: '✨',
  },
] as const;

interface ThemeEngineSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: ThemeEngineConfig;
  onSaveConfig: (config: ThemeEngineConfig) => void;
  onApplyArchetypeView: (archetype: 'lawyer' | 'wp-designer' | 'ecommerce' | 'video-media') => void;
}

export const ThemeEngineSettingsModal: React.FC<ThemeEngineSettingsModalProps> = ({
  isOpen,
  onClose,
  currentConfig,
  onSaveConfig,
  onApplyArchetypeView,
}) => {
  const [config, setConfig] = useState<ThemeEngineConfig>(currentConfig);
  const [activeTab, setActiveTab] = useState<'topic' | 'palette' | 'vector'>('topic');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setConfig(currentConfig);
  }, [currentConfig]);

  if (!isOpen) return null;

  const handleSaveAndApply = () => {
    onSaveConfig(config);
    onApplyArchetypeView(config.archetype);

    // Apply CSS variables to root
    const pal = PALETTES.find((p) => p.id === config.colorPalette);
    if (pal) {
      document.documentElement.style.setProperty('--sr-gold-accent', pal.accent);
      document.documentElement.style.setProperty('--sr-theme-accent', pal.accent);
      document.documentElement.style.setProperty('--sr-accent-hover', pal.hover);
      document.documentElement.style.setProperty('--sr-bg-body', pal.bg);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans"
    >
      <div className="relative w-full max-w-3xl bg-[#0D1117] border border-[#30363D] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#30363D] bg-[#161B22]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#E5C158] p-0.5 shadow-md">
              <div className="w-full h-full rounded-[10px] bg-[#0D1117] flex items-center justify-center text-[#D4AF37]">
                <Settings2 className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>مرکز پیکربندی هسته مستقل و استایل‌ها</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#238636]/20 text-[#3FB950] border border-[#238636]/40">
                  Universal Framework Core
                </span>
              </h2>
              <p className="text-xs text-[#8B949E]">
                انتخاب صنف فعال، پالت رنگی سازمانی و وکتور پس‌زمینه برای اعمال در سراسر سایت
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-[#8B949E] hover:text-white hover:bg-[#21262D] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#30363D] bg-[#0D1117] px-5 pt-3 gap-2">
          {[
            { id: 'topic', label: '۱. انتخاب صنف و کاربری', icon: Layers },
            { id: 'palette', label: '۲. پالت رنگی سازمانی', icon: Palette },
            { id: 'vector', label: '۳. وکتور و پس‌زمینه', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-[#58A6FF] text-white bg-[#161B22]'
                    : 'border-transparent text-[#8B949E] hover:text-[#C9D1D9]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#58A6FF]' : 'text-[#8B949E]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: Topic Archetype */}
          {activeTab === 'topic' && (
            <div className="space-y-4">
              <div className="text-xs text-[#94A3B8]">
                موضوع و صنف مورد نظر را انتخاب کنید. ساختار منوها، فرم‌ها، سکشن‌ها و دموهای متناسب بلافاصله فعال خواهند شد:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: 'lawyer',
                    title: 'دفتر وکالت و مشاوره حقوقی',
                    desc: 'ویترین باوقار با سیستم محاسبه‌گر تعرفه، پیگیری برخط پرونده، استوری‌ها و فرم رزرو نوبت',
                    icon: Scale,
                    accent: '#D4AF37',
                    badge: 'پکیج کامل حقوقی',
                  },
                  {
                    id: 'wp-designer',
                    title: 'طراح سایت وردپرس (گوتنبرگ)',
                    desc: 'لندینگ ۱۳ سکشنی، نمونه‌کارها با Case Study، تعرفه‌ها، فرم بریف چندمرحله‌ای و بنرهای اعتماد',
                    icon: Laptop,
                    accent: '#6366F1',
                    badge: 'Gutenberg-First',
                  },
                  {
                    id: 'ecommerce',
                    title: 'فروشگاه آنلاین منعطف',
                    desc: 'کاتالوگ محصولات، سبد خرید کشویی، فیلتر ایجکس، سازگاری کامل با ووکامرس و وودمارت',
                    icon: ShoppingCart,
                    accent: '#10B981',
                    badge: 'WooCommerce + WoodMart',
                  },
                  {
                    id: 'video-media',
                    title: 'رسانه، استودیو و نمایش ویدئو',
                    desc: 'آرشیو جامع ویدئوها، پلیر پیشرفته با کیفیت ۱۰۸۰p، دسته‌بندی و لینک‌های دانلود فایل و صوت',
                    icon: Film,
                    accent: '#EF4444',
                    badge: 'Media & Streaming Hub',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = config.archetype === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setConfig({ ...config, archetype: item.id as any })}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#58A6FF] bg-[#161B22] shadow-lg'
                          : 'border-[#30363D] bg-[#0D1117] hover:border-[#8B949E]/40 hover:bg-[#161B22]/50'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 left-3 w-5 h-5 rounded-full bg-[#58A6FF] text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${item.accent}20`, color: item.accent }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#8B949E] border border-white/10 mb-1 inline-block">
                            {item.badge}
                          </span>
                          <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                          <p className="text-xs text-[#8B949E] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Color Palette */}
          {activeTab === 'palette' && (
            <div className="space-y-4">
              <div className="text-xs text-[#94A3B8]">
                پالت رنگی دلخواه را انتخاب کنید. متغیرهای CSS و رنگ دکمه‌ها، گرادیان‌ها و کادرها در لحظه سازگار می‌شوند:
              </div>

              <div className="grid grid-cols-1 gap-3">
                {PALETTES.map((pal) => {
                  const isSelected = config.colorPalette === pal.id;
                  return (
                    <div
                      key={pal.id}
                      onClick={() => setConfig({ ...config, colorPalette: pal.id as any })}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-[#58A6FF] bg-[#161B22] shadow-md ring-1 ring-[#58A6FF]'
                          : 'border-[#30363D] bg-[#0D1117] hover:border-[#8B949E]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/10">
                          <div className="w-6 h-6 rounded-md shadow" style={{ backgroundColor: pal.accent }} />
                          <div className="w-6 h-6 rounded-md shadow" style={{ backgroundColor: pal.hover }} />
                          <div className="w-6 h-6 rounded-md shadow border border-white/20" style={{ backgroundColor: pal.bg }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{pal.name}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-[#CBD5E1]">
                              {pal.badge}
                            </span>
                          </div>
                          <div className="text-xs text-[#8B949E]">{pal.desc}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#8B949E]">{pal.accent}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-[#58A6FF] border-[#58A6FF] text-white' : 'border-[#484F58]'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Vector Background */}
          {activeTab === 'vector' && (
            <div className="space-y-4">
              <div className="text-xs text-[#94A3B8]">
                الگوی وکتور گرافیکی پس‌زمینه را انتخاب نمایید تا هویت بصری متناسب با کسب‌وکار در بک‌گراند ترسیم شود:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VECTOR_BACKGROUNDS.map((vec) => {
                  const isSelected = config.vectorBackground === vec.id;
                  return (
                    <div
                      key={vec.id}
                      onClick={() => setConfig({ ...config, vectorBackground: vec.id as any })}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#58A6FF] bg-[#161B22] shadow-md'
                          : 'border-[#30363D] bg-[#0D1117] hover:border-[#8B949E]/40'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl">{vec.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-white mb-1">{vec.name}</div>
                          <div className="text-xs text-[#8B949E] leading-relaxed">{vec.desc}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-[#8B949E]">
                        <span>وضعیت: {isSelected ? 'انتخاب‌شده' : 'غیرفعال'}</span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-[#58A6FF] border-[#58A6FF] text-white' : 'border-[#484F58]'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#30363D] bg-[#161B22] flex items-center justify-between">
          <div className="text-xs text-[#8B949E] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>تنظیمات بلافاصله در لوکال‌استوریج و CSS زنده ذخیره می‌شوند.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#8B949E] hover:text-white hover:bg-[#21262D] transition cursor-pointer"
            >
              انصراف
            </button>
            <button
              type="button"
              onClick={handleSaveAndApply}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#238636] hover:bg-[#2EA043] text-white transition flex items-center gap-2 shadow-lg cursor-pointer"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>اعمال شد!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>ذخیره و اعمال سراسری</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
