import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Quote, Sparkles, Copy, Check, Volume2 } from 'lucide-react';

export interface BannerSlide {
  id: string;
  category: 'آیه قرآن' | 'حدیث' | 'شعر' | 'حکمت' | 'تعهد وکیل';
  text: string;
  source: string;
  translation?: string;
  arabicText?: string;
  persianText?: string;
  isActive?: boolean;
  order?: number;
}

export const DEFAULT_BANNER_SLIDES: BannerSlide[] = [
  {
    id: '1',
    category: 'آیه قرآن',
    text: 'وَأَنِ احْكُم بَيْنَهُم بِمَا أَنزَلَ اللَّهُ وَلَا تَتَّبِعْ أَهْوَاءَهُمْ',
    source: 'قرآن کریم - سوره مبارکه مائده، آیه ۴۹',
    translation: 'و میان آنان بدانچه خداوند نازل کرده داوری کن و از هوس‌هایشان پیروی مکن.',
  },
  {
    id: '2',
    category: 'حدیث',
    text: 'اَلْعَدْلُ اَسَاسُ الْمُلْكِ وَ قِوَامُ الرَّعِیَّةِ',
    source: 'حضرت امیرالمؤمنین امام علی (ع) - غررالحکم',
    translation: 'عدالت، پایه‌ی بنیادین حاکمیت و مایه پایداری جامعه است.',
  },
  {
    id: '3',
    category: 'شعر',
    text: 'بنی آدم اعضای یک پیکرند / که در آفرینش ز یک گوهرند',
    source: 'حکیم مصلح‌الدین سعدی شیرازی - گلستان',
    translation: 'چو عضوی به درد آورد روزگار / دگر عضوها را نماند قرار',
  },
  {
    id: '4',
    category: 'حکمت',
    text: 'عدالت، شالوده و روح هر جامعه پیشرو است و پاسداری از حق، جوهره رسالت وکالت ماست.',
    source: 'قانون اساسی و اخلاق حرفه‌ای وکالت',
  },
  {
    id: '5',
    category: 'تعهد وکیل',
    text: 'همراهی صادقانه، دفاع قاطعانه و پیگیری خستگی‌ناپذیر تا احقاق کامل حق موکلین محترم.',
    source: 'سوگندنامه وکالت پایه یک دادگستری',
  },
];

interface TextBannerSliderProps {
  slides?: BannerSlide[];
}

export const TextBannerSlider: React.FC<TextBannerSliderProps> = ({
  slides = DEFAULT_BANNER_SLIDES,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto rotate every 5 seconds (stops on hover)
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCopyText = () => {
    const active = slides[currentIndex];
    const textToCopy = `«${active.text}» - ${active.source}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentSlide = slides[currentIndex];

  const getBadgeColor = (cat: BannerSlide['category']) => {
    switch (cat) {
      case 'آیه قرآن':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'حدیث':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'شعر':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'تعهد وکیل':
        return 'bg-[#D4AF37]/20 text-[#F3E5AB] border-[#D4AF37]/40';
      default:
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
    }
  };

  return (
    <section
      id="text-banner-slider"
      aria-label="بنر اسلایدر متنی محتوای دینی و ادبی"
      className="relative w-full bg-gradient-to-r from-[#070D1E] via-[#0B132B] to-[#070D1E] border-y border-[#D4AF37]/30 text-white overflow-hidden shadow-md"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative Golden Ambient Accent */}
      <div className="absolute top-0 left-1/4 w-96 h-full bg-[#D4AF37]/5 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-full bg-[#D4AF37]/5 blur-2xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 min-h-[64px] sm:min-h-[72px] flex items-center justify-between gap-3 relative z-10">
        
        {/* Prev Arrow (RTL: on Right side of the text) */}
        <button
          onClick={handlePrev}
          className="p-1.5 rounded-full bg-white/5 hover:bg-[#D4AF37] text-gray-300 hover:text-[#0B132B] border border-white/10 hover:border-[#D4AF37] transition-all cursor-pointer shrink-0"
          title="اسلاید قبلی"
          aria-label="اسلاید قبلی"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Center Content Slide */}
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-center text-center gap-2 sm:gap-4 overflow-hidden px-2">
          
          {/* Badge */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${getBadgeColor(
                currentSlide.category
              )} flex items-center gap-1 shadow-sm`}
            >
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>{currentSlide.category}</span>
            </span>
          </div>

          {/* Main Text with Italic Polish */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-serif font-bold text-[#FDF6E2] leading-relaxed tracking-wide transition-all duration-300">
              «{currentSlide.text}»
            </p>
            {currentSlide.source && (
              <span className="text-[10px] sm:text-xs text-[#D4AF37]/80 mt-0.5 font-sans">
                {currentSlide.source}
                {currentSlide.translation && (
                  <span className="hidden md:inline text-gray-400 mr-2">
                    ({currentSlide.translation})
                  </span>
                )}
              </span>
            )}
          </div>

          {/* Quick Copy button */}
          <button
            onClick={handleCopyText}
            className="hidden sm:inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#D4AF37] transition-colors p-1 rounded-md hover:bg-white/5 shrink-0"
            title="کپی متن و منبع"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">کپی شد</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>اشتراک</span>
              </>
            )}
          </button>
        </div>

        {/* Next Arrow (RTL: on Left side of text) */}
        <button
          onClick={handleNext}
          className="p-1.5 rounded-full bg-white/5 hover:bg-[#D4AF37] text-gray-300 hover:text-[#0B132B] border border-white/10 hover:border-[#D4AF37] transition-all cursor-pointer shrink-0"
          title="اسلاید بعدی"
          aria-label="اسلاید بعدی"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

      </div>

      {/* Slide Navigation Dots (Subtle indicator at bottom) */}
      <div className="flex items-center justify-center gap-1.5 pb-1.5">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-200 rounded-full cursor-pointer ${
              idx === currentIndex
                ? 'w-4 h-1 bg-[#D4AF37]'
                : 'w-1.5 h-1 bg-white/20 hover:bg-white/40'
            }`}
            title={`اسلاید ${idx + 1}`}
            aria-label={`اسلاید ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
