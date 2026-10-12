import React, { useEffect, useRef, useState, useMemo } from 'react';
import { usePresetConfig } from '../hooks/usePresetConfig';
import { INDUSTRY_PRESETS } from '../data/industryPresets';
import { 
  Sparkles, 
  ExternalLink, 
  Layers, 
  Monitor, 
  Smartphone, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

interface MotionsitesHeroCanvasProps {
  onExplorePreset?: (presetId: string) => void;
  onBookConsultation?: () => void;
}

// Pixel Contract Constants for Motionsites Fixed Scale Canvas
export const DESIGN_WIDTH = 1172;
export const DESIGN_HEIGHT = 657;

export const MotionsitesHeroCanvas: React.FC<MotionsitesHeroCanvasProps> = ({
  onExplorePreset,
  onBookConsultation
}) => {
  const { preset, changePreset } = usePresetConfig();
  const availablePresets = useMemo(() => Object.values(INDUSTRY_PRESETS), []);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [starShadowA, setStarShadowA] = useState('');
  const [starShadowB, setStarShadowB] = useState('');

  // Generate deterministic starfield shadows (Motionsites Box-Shadow Starfield Law)
  useEffect(() => {
    // Layer A: 140 subtle stars
    const starsA: string[] = [];
    for (let i = 0; i < 140; i++) {
      const x = Math.floor((i * 17.3 + (i % 7) * 41) % 100);
      const y = Math.floor((i * 23.7 + (i % 11) * 31) % 100);
      const alpha = (0.08 + ((i % 10) * 0.02)).toFixed(2);
      starsA.push(`${x}vw ${y}vh 0px 0 rgba(255,255,255,${alpha})`);
    }
    setStarShadowA(starsA.join(', '));

    // Layer B: 24 brighter stars with subtle glow
    const starsB: string[] = [];
    for (let i = 0; i < 24; i++) {
      const x = Math.floor((i * 39.1 + 13) % 100);
      const y = Math.floor((i * 47.3 + 19) % 100);
      const alpha = (0.4 + ((i % 5) * 0.08)).toFixed(2);
      starsB.push(`${x}vw ${y}vh 1.2px 0 rgba(255,255,255,${alpha})`);
    }
    setStarShadowB(starsB.join(', '));
  }, []);

  // Compute fixed 1172x657 canvas scale law: min(vw / 1172, vh / 560)
  useEffect(() => {
    const handleResize = () => {
      if (!stageRef.current) return;
      const vw = stageRef.current.clientWidth || window.innerWidth;
      const vh = stageRef.current.clientHeight || 700;
      // Height divisor 560 allows graceful lower bleed over container
      const k = Math.min(vw / 1172, vh / 580);
      // Ensure sensible bounds on small screens
      const clampedK = Math.max(0.32, Math.min(1.2, k));
      setScale(clampedK);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Showcase items mapped from all 6 industry presets + featured scenario previews
  const showcaseItems = useMemo(() => [
    {
      id: 'lawyer',
      title: 'دفتر وکالت و دادرسی',
      kicker: 'امور حقوقی و داوری',
      accent: '#D4AF37',
      bgGradient: 'from-[#1A180E] to-[#0A0905]',
      badge: 'نسخه ۳.۰ حقوقی',
      highlight: 'استعلام پرونده و مشاوره آنلاین',
      stats: '۹۹.۴٪ رضایت موکلین',
      previewTag: 'وکالت / داوری',
    },
    {
      id: 'web_agency',
      title: 'استودیو طراحی وب و وردپرس',
      kicker: 'آژانس خلاق دیجیتال',
      accent: '#6366F1',
      bgGradient: 'from-[#14122E] to-[#080718]',
      badge: 'الگوی وودمارت و المنتور',
      highlight: 'طراحی واکنش‌گرا و توسعه سفارشی',
      stats: '+۱۸۰ پروژه موفق',
      previewTag: 'آژانس UI/UX',
    },
    {
      id: 'engineering',
      title: 'مهندسی سازه و معماری',
      kicker: 'مشاوران ارشد عمران',
      accent: '#F59E0B',
      bgGradient: 'from-[#231A0B] to-[#0E0A04]',
      badge: 'نظام مهندسی و BIM',
      highlight: 'مدیریت پیمان و نظارت عالیه',
      stats: 'گرید ۱ طراحی و نظارت',
      previewTag: 'عمران / معماری',
    },
    {
      id: 'corporate',
      title: 'شرکت تجارت بین‌الملل',
      kicker: 'بازرگانی و توسعه B2B',
      accent: '#0284C7',
      bgGradient: 'from-[#081B2B] to-[#030B13]',
      badge: 'اینکوترمز ۲۰۲۰ و ترخیص',
      highlight: 'سرمایه‌گذاری و تامین مالی',
      stats: '+۱۲ کشور تحت پوشش',
      previewTag: 'تجارت و سرمایه',
    },
    {
      id: 'doctor',
      title: 'کلینیک تخصصی و سلامت',
      kicker: 'مرکز خدمات درمانی',
      accent: '#10B981',
      bgGradient: 'from-[#0A231A] to-[#03110C]',
      badge: 'نوبت‌دهی آنلاین و پرونده سلامت',
      highlight: 'مشاوره آنلاین و پیگیری بیمار',
      stats: 'سامانه یکپارچه مراجعین',
      previewTag: 'پزشکی و سلامت',
    },
    {
      id: 'project_saas',
      title: 'پلتفرم ابری و محصول دیجیتال',
      kicker: 'معرفی پروژه و SaaS',
      accent: '#06B6D4',
      bgGradient: 'from-[#071F28] to-[#020D12]',
      badge: 'میکروسرویس و API آماده',
      highlight: 'داشبورد بلادرنگ و لایسنس',
      stats: '۹۹.۹۹٪ پایداری ابری',
      previewTag: 'SaaS / استارتاپ',
    },
  ], []);

  // Carousel ring navigation
  const nextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % showcaseItems.length);
  };

  const prevCard = () => {
    setActiveCardIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
  };

  const activeItem = showcaseItems[activeCardIndex];

  return (
    <div 
      ref={stageRef}
      className="relative w-full h-[620px] sm:h-[680px] lg:h-[720px] overflow-hidden bg-[#020204] text-white select-none"
      dir="ltr"
    >
      {/* 1. Generative Background Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 65% 50% at 50% 18%, rgba(212,175,55,0.08) 0%, rgba(11,19,43,0.18) 45%, rgba(2,2,4,0) 80%),
            linear-gradient(180deg, rgba(25,127,255,0) 38%, rgba(25,127,255,0.035) 54%, rgba(25,127,255,0.045) 68%, rgba(25,127,255,0.02) 100%),
            #020204
          `
        }}
      />

      {/* 2. Motionsites Generative Starfields */}
      {starShadowA && (
        <div 
          className="absolute left-0 top-0 w-[1px] h-[1px] rounded-full bg-white pointer-events-none opacity-80"
          style={{ boxShadow: starShadowA }}
        />
      )}
      {starShadowB && (
        <div 
          className="absolute left-0 top-0 w-[1.5px] h-[1.5px] rounded-full bg-amber-200 pointer-events-none"
          style={{ boxShadow: starShadowB }}
        />
      )}

      {/* 3. Scaled Design Canvas: Authored at exactly 1172 x 657 px */}
      <div 
        ref={canvasRef}
        className="absolute left-1/2 top-0 w-[1172px] h-[657px] pointer-events-auto"
        style={{
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: '50% 0',
        }}
      >
        {/* Top Floating Badge */}
        <div 
          className="absolute left-[460px] top-[40px] w-[252px] h-[38px] rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-center justify-between px-3.5 py-1 z-30"
          dir="rtl"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: preset.accent_color }} />
            <span className="text-[11px] font-medium tracking-wide text-gray-300">
              ویترین سینمایی چندمنظوره
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-amber-300 font-mono">
            {preset.english_name.split(' ')[0]}
          </span>
        </div>

        {/* H1 Headline (Ink targeted & optical center at 586px) */}
        <div className="absolute left-[586px] top-[95px] -translate-x-1/2 text-center w-[980px] z-30 pointer-events-none" dir="rtl">
          <h1 className="text-[38px] leading-[1.25] font-extrabold tracking-tight text-white mb-3">
            {preset.hero_title}
          </h1>
          <p className="text-[15px] leading-relaxed text-gray-400 max-w-[720px] mx-auto font-normal">
            {preset.hero_desc}
          </p>
        </div>

        {/* Central Action Controls */}
        <div className="absolute left-[586px] top-[228px] -translate-x-1/2 z-30 flex items-center gap-3" dir="rtl">
          <button
            onClick={() => onBookConsultation ? onBookConsultation() : onExplorePreset?.(preset.id)}
            className="h-[44px] px-6 rounded-xl font-medium text-[13px] text-black shadow-lg transition-all duration-200 hover:brightness-110 active:scale-95 flex items-center gap-2"
            style={{ backgroundColor: preset.accent_color }}
          >
            <span>{preset.hero_cta_primary}</span>
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => onExplorePreset?.(preset.id)}
            className="h-[44px] px-5 rounded-xl font-medium text-[13px] text-gray-200 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 backdrop-blur-sm transition-all duration-200 active:scale-95 flex items-center gap-2"
          >
            <span>بررسی دموی آنلاین صنف</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>

        {/* 4. 3D Showcase Carousel Ring: Cards arranged around optical center */}
        <div className="absolute left-0 top-[280px] w-[1172px] h-[360px] z-10 pointer-events-auto">
          {/* Subtle Ring Orbit Guide */}
          <div 
            className="absolute left-1/2 top-[160px] -translate-x-1/2 -translate-y-1/2 w-[980px] h-[220px] rounded-[50%] border border-white/[0.04] pointer-events-none"
            style={{ transform: 'translateX(-50%) translateY(-50%) rotateX(68deg)' }}
          />

          {/* Cards Carousel */}
          <div className="relative w-full h-full flex items-center justify-center">
            {showcaseItems.map((item, idx) => {
              const count = showcaseItems.length;
              // Relative offset from active index
              const offset = (idx - activeCardIndex + count) % count;
              const signedOffset = offset > count / 2 ? offset - count : offset;
              const isCenter = signedOffset === 0;
              const isAdjacent = Math.abs(signedOffset) === 1;
              const isVisible = Math.abs(signedOffset) <= 2;

              if (!isVisible) return null;

              // Spatial 3D transform formula
              const xPos = signedOffset * 220;
              const zPos = -Math.abs(signedOffset) * 110;
              const rotY = signedOffset * -16;
              const cardScale = isCenter ? 1.05 : isAdjacent ? 0.88 : 0.72;
              const opacity = isCenter ? 1 : isAdjacent ? 0.75 : 0.4;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveCardIndex(idx);
                    changePreset(item.id);
                  }}
                  className={`absolute w-[230px] h-[280px] rounded-2xl p-4 cursor-pointer transition-all duration-500 ease-out border backdrop-blur-md shadow-2xl flex flex-col justify-between ${
                    isCenter 
                      ? 'border-white/30 bg-gradient-to-b from-white/[0.12] to-white/[0.03] z-20 shadow-amber-500/10' 
                      : 'border-white/10 bg-gradient-to-b from-white/[0.06] to-black/40 z-10 hover:border-white/20'
                  }`}
                  style={{
                    transform: `translateX(${xPos}px) translateZ(${zPos}px) rotateY(${rotY}deg) scale(${cardScale})`,
                    opacity,
                    boxShadow: isCenter ? `0 20px 40px -15px ${item.accent}33` : 'none',
                  }}
                  dir="rtl"
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span 
                        className="text-[10px] px-2 py-0.5 rounded font-mono font-medium"
                        style={{ 
                          backgroundColor: `${item.accent}25`, 
                          color: item.accent,
                          border: `1px solid ${item.accent}40`
                        }}
                      >
                        {item.previewTag}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {item.badge}
                      </span>
                    </div>

                    <h4 className="text-[15px] font-bold text-white mb-1 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-gray-300 font-normal">
                      {item.kicker}
                    </p>
                  </div>

                  {/* Card Middle: Visual mockup preview */}
                  <div className="w-full h-[105px] rounded-lg bg-black/60 border border-white/10 p-2.5 flex flex-col justify-between overflow-hidden relative group">
                    <div className="flex items-center gap-1.5 border-b border-white/10 pb-1.5" dir="ltr">
                      <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                      <span className="text-[9px] text-gray-500 font-mono ml-auto">
                        {item.id}.demo
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="w-3/4 h-2 rounded bg-white/20" />
                      <div className="w-1/2 h-1.5 rounded bg-white/10" />
                      <div className="text-[10px] text-amber-200/90 font-medium pt-1 line-clamp-1">
                        {item.highlight}
                      </div>
                    </div>

                    <div className="text-[9px] text-gray-400 flex items-center justify-between pt-1 border-t border-white/5">
                      <span>{item.stats}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px]">
                    <span className="text-gray-400">
                      {isCenter ? 'صنف فعال کنونی' : 'کلیک برای انتخاب'}
                    </span>
                    <span 
                      className="font-medium flex items-center gap-1"
                      style={{ color: item.accent }}
                    >
                      {isCenter ? 'فعال ✓' : 'مشاهده ←'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Left/Right Buttons */}
          <button
            onClick={prevCard}
            aria-label="Previous Showcase Item"
            className="absolute left-[80px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-white flex items-center justify-center transition-all z-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextCard}
            aria-label="Next Showcase Item"
            className="absolute right-[80px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-white flex items-center justify-center transition-all z-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 5. Overlapping Browser Mock (Pixel contract §1.5: left 165, top 558, width 842) */}
        <div 
          className="absolute left-[165px] top-[548px] w-[842px] h-[130px] rounded-t-[24px] bg-[#0B0D13] border-t border-x border-white/20 shadow-2xl z-20 backdrop-blur-xl overflow-hidden pointer-events-auto"
          dir="rtl"
        >
          {/* Browser Tab Bar */}
          <div className="h-[38px] bg-black/50 border-b border-white/10 px-4 flex items-center justify-between" dir="ltr">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/30" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/30" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/30" />
            </div>

            <div className="px-5 py-1 rounded-md bg-white/[0.07] border border-white/10 text-[11px] font-mono text-gray-300 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>https://novin-wp.ir/preview/sedrazavi/{preset.id}/</span>
            </div>

            <div className="text-[11px] text-gray-400 font-mono">
              v3.0.0 Pro
            </div>
          </div>

          {/* Browser Inner Page Peek */}
          <div className="p-4 flex items-center justify-between text-xs text-gray-300">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-black"
                style={{ backgroundColor: preset.accent_color }}
              >
                SR
              </div>
              <div>
                <p className="font-bold text-white text-[13px]">{preset.site_title}</p>
                <p className="text-[11px] text-gray-400">{preset.site_tagline}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => onExplorePreset?.(preset.id)}
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] transition-all flex items-center gap-1.5"
              >
                <span>باز کردن دموی کامل</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Navigation Pill (Within Stage viewport) */}
      <div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 bg-black/80 border border-white/15 backdrop-blur-lg px-4 py-2 rounded-full flex items-center gap-3 text-xs"
        dir="rtl"
      >
        <span className="text-gray-400 font-medium">سوییچ سریع صنف:</span>
        <div className="flex items-center gap-1">
          {availablePresets.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                changePreset(p.id);
                const targetIdx = showcaseItems.findIndex(item => item.id === p.id);
                if (targetIdx !== -1) setActiveCardIndex(targetIdx);
              }}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                preset.id === p.id
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {p.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
