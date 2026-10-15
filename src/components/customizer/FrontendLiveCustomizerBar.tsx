import React, { useState } from 'react';
import {
  SlidersHorizontal, X, Palette, Eye, EyeOff, LayoutGrid,
  Sparkles, Save, RotateCcw, Download, Check, Type,
  Phone, Globe, Layers, ArrowUpRight
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface SectionToggleState {
  hero: boolean;
  bento: boolean;
  services: boolean;
  articles: boolean;
  media: boolean;
  caseTracking: boolean;
  testimonials: boolean;
}

interface FrontendLiveCustomizerBarProps {
  onSwitchScenario?: (scenarioId: string) => void;
  onOpenCatalog?: () => void;
}

export const FrontendLiveCustomizerBar: React.FC<FrontendLiveCustomizerBarProps> = ({
  onSwitchScenario,
  onOpenCatalog
}) => {
  const { info, success } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [activeHue, setActiveHue] = useState<string>('#D97706');
  const [siteTitle, setSiteTitle] = useState('دفتر وکالت و مشاوره حقوقی سیدرضوی');
  const [tagline, setTagline] = useState('دفاع استراتژیک در دعاوی کلان تجاری و بین‌المللی');
  const [phone, setPhone] = useState('۰۲۱-۸۸۲۲۳۳۴۴');
  
  const [sections, setSections] = useState<SectionToggleState>({
    hero: true,
    bento: true,
    services: true,
    articles: true,
    media: true,
    caseTracking: true,
    testimonials: true
  });

  const colorPalettes = [
    { name: 'طلایی لوکس (وکالت و حقوقی)', color: '#D97706', ring: 'ring-amber-500' },
    { name: 'آبی سایبری (فناوری و مهندسی)', color: '#06B6D4', ring: 'ring-cyan-500' },
    { name: 'زمردی تجاری (فروشگاه و سلامت)', color: '#10B981', ring: 'ring-emerald-500' },
    { name: 'بنفش سازمانی (شرکت‌های بین‌الملل)', color: '#8B5CF6', ring: 'ring-purple-500' },
    { name: 'زرشکی و یاقوتی (رسانه و هنر)', color: '#F43F5E', ring: 'ring-rose-500' },
    { name: 'تیره آبسیدین (کنتراست بالا)', color: '#38BDF8', ring: 'ring-sky-500' },
  ];

  const handleApplyColor = (color: string, name: string) => {
    setActiveHue(color);
    document.documentElement.style.setProperty('--primary-hue', color);
    info(`پالت رنگ به "${name}" تغییر یافت.`);
  };

  const toggleSection = (key: keyof SectionToggleState) => {
    setSections(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      info(`سکشن "${key}" ${updated[key] ? 'نمایش داده شد' : 'مخفی شد'}.`);
      return updated;
    });
  };

  const handleExportJson = () => {
    const config = {
      siteTitle,
      tagline,
      phone,
      activeHue,
      sections,
      exportedAt: new Date().toISOString()
    };
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `industry-preset-${Date.now()}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    success('فایل کانفیگ صنف (JSON) با موفقیت دانلود شد.');
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 font-sans">
      {/* Floating Trigger Button */}
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-800 text-amber-400 border border-amber-500/40 shadow-2xl backdrop-blur-xl transition-all cursor-pointer group hover:scale-105"
          title="تنظیم و شخصی‌سازی زنده فرانت‌اند سایت"
        >
          <SlidersHorizontal className="w-4 h-4 transition-transform group-hover:rotate-45" />
          <span className="text-xs font-bold text-white">شخصی‌سازی زنده صفحه (ادمین)</span>
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        </button>
      ) : (
        /* Expanded Live Customizer Drawer */
        <div className="w-80 sm:w-96 rounded-3xl bg-slate-950/95 backdrop-blur-2xl border border-slate-800 shadow-2xl p-5 text-right space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">کاستومایزر درجا و زنده</h4>
                <p className="text-[10px] text-slate-400">ویرایش متون، رنگ‌ها و بلوک‌ها بدون نیاز به پیشخوان</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Scenario & Preset Jump */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-slate-300 flex items-center justify-between">
              <span>سناریوی معماری چیدمان:</span>
              {onOpenCatalog && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenCatalog();
                  }}
                  className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>کاتالوگ اصناف</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'bento-hud', label: 'بنتو HUD' },
                { id: 'dense-matrix', label: 'ماتریس ۳ ستون' },
                { id: 'hybrid-executive', label: 'شرکتی سفید' },
              ].map(sc => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => {
                    if (onSwitchScenario) onSwitchScenario(sc.id);
                  }}
                  className="py-1.5 px-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-[10px] font-bold text-slate-200 text-center transition-colors"
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palettes Picker */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>رنگ سازمانی و پالت صنف:</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {colorPalettes.map(p => (
                <button
                  key={p.color}
                  type="button"
                  onClick={() => handleApplyColor(p.color, p.name)}
                  className={`w-9 h-9 rounded-2xl transition-all flex items-center justify-center cursor-pointer border border-white/10 ${
                    activeHue === p.color ? `scale-110 ring-2 ${p.ring}` : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: p.color }}
                  title={p.name}
                >
                  {activeHue === p.color && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Section Visibility Toggles */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>کنترل نمایش بلوک‌ها و سکشن‌ها:</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { key: 'hero' as const, label: 'اسلایدر هیرو' },
                { key: 'bento' as const, label: 'ابزارک بنتو HUD' },
                { key: 'services' as const, label: 'خدمات و پرونده‌ها' },
                { key: 'articles' as const, label: 'پژوهش و مقالات' },
                { key: 'media' as const, label: 'هاب صوتی و پادکست' },
                { key: 'caseTracking' as const, label: 'استعلام آنلاین' },
              ].map(sec => {
                const isVisible = sections[sec.key];
                return (
                  <button
                    key={sec.key}
                    type="button"
                    onClick={() => toggleSection(sec.key)}
                    className={`py-1.5 px-2.5 rounded-xl text-[11px] font-medium border flex items-center justify-between transition-colors ${
                      isVisible
                        ? 'bg-slate-900 border-slate-700 text-slate-200'
                        : 'bg-slate-950 border-slate-800/60 text-slate-500 opacity-60'
                    }`}
                  >
                    <span>{sec.label}</span>
                    {isVisible ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Brand Title & Contact Edit */}
          <div className="space-y-2 pt-1 border-t border-slate-800">
            <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-emerald-400" />
              <span>عنوان و هویت صنف:</span>
            </div>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              placeholder="نام کسب و کار / عنوان سایت"
            />
          </div>

          {/* Action Export Button */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>دانلود کانفیگ صنف (JSON)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
