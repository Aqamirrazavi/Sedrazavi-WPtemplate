import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  Sparkles,
  Phone,
  ShieldCheck,
  ArrowLeft,
  Pause,
  Play,
  Maximize2
} from 'lucide-react';
import { LawyerSlideItem } from '../utils/lawyerCustomizationStorage';

interface LawyerHeroSliderProps {
  slides: LawyerSlideItem[];
  lawyerName?: string;
  onOpenBooking?: () => void;
  onOpenQuickCallback?: () => void;
}

export const LawyerHeroSlider: React.FC<LawyerHeroSliderProps> = ({
  slides,
  lawyerName,
  onOpenBooking,
  onOpenQuickCallback,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeSlide = slides && slides.length > 0 ? slides[currentIndex] : null;

  // Auto slide
  useEffect(() => {
    if (!isPlaying || !slides || slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, slides, currentIndex]);

  if (!slides || slides.length === 0 || !activeSlide) return null;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Touch Swipe for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) {
      // Swiped left (in RTL: next)
      goToNext();
    } else if (diff < -50) {
      // Swiped right (in RTL: prev)
      goToPrev();
    }
    setTouchStartX(null);
  };

  return (
    <section
      aria-label="اسلایدر معرفی و افتخارات وکیل"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-8"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 bg-[#0B132B] min-h-[360px] sm:min-h-[420px] md:min-h-[460px] flex items-center group">
        
        {/* Background Slide Image with Crossfade */}
        {slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
            style={{ transition: 'opacity 1s ease-in-out, transform 8s ease-out' }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              loading={idx === 0 ? 'eager' : 'lazy'}
              className="w-full h-full object-cover object-center"
            />
            {/* Dual gradient overlay for text readability & brand atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/75 to-[#0B132B]/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/90 via-[#0B132B]/50 to-transparent" />
          </div>
        ))}

        {/* Golden ambient decorative glow */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Slide Content Overlay */}
        <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-3xl text-right space-y-4 text-white">
          
          {/* Badge */}
          {activeSlide.badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-bold shadow-sm backdrop-blur-md animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{activeSlide.badge}</span>
            </div>
          )}

          {/* Slide Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif leading-tight text-white drop-shadow-md">
            {activeSlide.title}
          </h2>

          {/* Subtitle */}
          {activeSlide.subtitle && (
            <p className="text-sm sm:text-base md:text-lg text-[#F3E5AB] font-semibold leading-relaxed">
              {activeSlide.subtitle}
            </p>
          )}

          {/* Description */}
          {activeSlide.description && (
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed hidden sm:block">
              {activeSlide.description}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {activeSlide.ctaText && (
              <a
                href={activeSlide.ctaLink || '#booking'}
                onClick={(e) => {
                  if (activeSlide.ctaLink === '#booking' && onOpenBooking) {
                    e.preventDefault();
                    onOpenBooking();
                  }
                }}
                className="btn-gold px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#D4AF37]/25"
              >
                <span>{activeSlide.ctaText}</span>
                <ArrowLeft className="w-4 h-4" />
              </a>
            )}

            {onOpenQuickCallback && (
              <button
                type="button"
                onClick={onOpenQuickCallback}
                className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>درخواست تماس فوری</span>
              </button>
            )}
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="absolute left-4 sm:left-6 bottom-6 sm:bottom-8 z-20 flex items-center gap-2">
          
          {/* Pause / Play Toggle */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all text-xs"
            title={isPlaying ? 'توقف خودکار' : 'پخش خودکار'}
            aria-label="توقف یا پخش اسلایدر"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Prev Button (In RTL, Prev is right icon) */}
          <button
            type="button"
            onClick={goToPrev}
            className="w-10 h-10 rounded-full bg-[#0B132B]/70 hover:bg-[#D4AF37] hover:text-[#0B132B] border border-[#D4AF37]/40 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md"
            aria-label="اسلاید قبلی"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={goToNext}
            className="w-10 h-10 rounded-full bg-[#0B132B]/70 hover:bg-[#D4AF37] hover:text-[#0B132B] border border-[#D4AF37]/40 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md"
            aria-label="اسلاید بعدی"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="absolute right-6 bottom-6 sm:bottom-8 z-20 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? 'w-8 h-2.5 bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/50'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`رفتن به اسلاید ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
